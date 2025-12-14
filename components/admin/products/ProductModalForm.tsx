"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { Loader2, Trash, Upload } from "lucide-react";
import { Category, ImageData, ProductInfo } from "@/app/admin/products/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProductInfo, updateProductInfo } from "@/lib/products/actions";
import { compressImage } from "@/lib/utils/compressImage";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImageToCloudinary";
import Image from "next/image";
import { deleteImageFromCloudinary } from "@/lib/utils/deleteImageFromCloudinary";

export interface Props {
  fetchProducts: () => void;
  trigger: ReactNode;
  product?: ProductInfo;
  categories: Category[];
}

const ProductSchema = z.object({
  name: z.string(),
  image_url: z.string().optional(),
  description: z.string().optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => parseFloat(String(val).replace(",", ".")))
    .refine((val) => !isNaN(val), "Debe ingresar un número válido")
    .refine((val) => val >= 0, "El precio no puede ser menor que cero"),
  category_id: z.string().nonempty("Debe seleccionar una categoría"),
});

export type ProductFormInput = z.input<typeof ProductSchema>; // antes del transform
export type ProductFormOutput = z.output<typeof ProductSchema>; // después del transform

const ProductModalForm = ({
  fetchProducts,
  trigger,
  product,
  categories,
}: Props) => {
  const isEditing = !!product;

  // 1. Estados
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false);

  // 4. Librerias
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<ProductFormInput, any, ProductFormOutput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name || "",
      image_url: product?.images[0]?.image_url || "",
      description: product?.description || "",
      price: product?.price || undefined,
      category_id: product?.category_id ? product.category_id.toString() : "",
    },
  });

  const {
    reset,
    formState: { isDirty, isSubmitting },
  } = form;

  // Efectos
  useEffect(() => {
    if (isOpen) {
      reset({
        name: product?.name || "",
        image_url: product?.images[0]?.image_url || "",
        description: product?.description || "",
        price: product?.price || undefined,
        category_id: product?.category_id ? product.category_id.toString() : "",
      });

      setImageChanged(false);

      // Setear preview con la imagen guardada si estamos editando y hay imagen
      if (isEditing && product?.images[0]?.image_url) {
        setPreviewUrl(product.images[0].image_url);
        setSelectedFile(null);
      } else {
        // Si es creación o no hay imagen, limpiar preview
        setPreviewUrl(null);
        setSelectedFile(null);
      }
    } else {
      // Cuando se cierra, limpiar todo
      reset();
      setPreviewUrl(null);
      setSelectedFile(null);
      setImageChanged(false);
    }
  }, [isOpen, product, reset, isEditing]);

  // funcion on submit
  const onSubmit = async (productDataForm: ProductFormOutput) => {
    if (!isEditing && !previewUrl && !selectedFile) {
      toast.error("Debes subir una imagen para el producto.");
      return;
    }

    const categoryIdNum = Number(productDataForm.category_id);
    const publicId = product?.images?.[0]?.public_id;

    let imageData: ImageData | undefined;

    if (selectedFile) {
      const uploaded = await uploadImageToCloudinary(selectedFile);
      // Suponiendo que uploadImageToCloudinary devuelve un objeto { image_url, public_id }
      imageData = uploaded;
    } else {
      // No enviar nada, mantener imagen actutal
      imageData = undefined;
    }

    console.log("Datos de la imagen:", imageData);

    // Excluir image_url para que no se guarde directamente
    const { image_url, ...productDataFormWithoutImage } = productDataForm;
    const productData = {
      ...productDataFormWithoutImage,
      category_id: categoryIdNum,
    };
    if (isEditing) {
      // Modo edición
      console.log("Datos a actualizar del producto:", productData);
      console.log("Datos a actualizar de la imagen del producto:", imageData);

      const res = await updateProductInfo(product.id, productData, imageData);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      if (imageData && publicId) {
        const result = await deleteImageFromCloudinary(publicId);
        if (!result.ok) {
          toast.error(res.message);
          return;
        }
      }

      toast.success(`Producto actualizado correctamente.`);
    } else {
      // Modo agregar
      console.log("Producto a guardar:", productData);

      const res = await createProductInfo(productData, imageData);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Guardado correctamente");
    }

    //Actualizar datos del servidor
    fetchProducts();

    //Cerrar el modal
    setIsOpen(false);

    // limpiar imagen
    setSelectedFile(null);
    setPreviewUrl(null);

    reset();
  };

  const handleFile = async (file: File) => {
    try {
      setLoading(true);

      const compressed = await compressImage(file);
      const previewUrl = URL.createObjectURL(compressed);

      setSelectedFile(compressed);
      setPreviewUrl(previewUrl);
      setImageChanged(true);
    } catch (err) {
      console.error("Error al comprimir:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          form.reset();

          // limpiar imagen
          setSelectedFile(null);
          setPreviewUrl(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="overflow-auto h-[70vh] sm:h-auto bg-[#F2EADF]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? "Editar Producto" : "Agrega un nuevo producto"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza la información del producto."
              : "Completa la información del producto."}
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full border rounded bg-[#F2EADF] ">
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Imagen</FormLabel>

                      <div className="flex flex-col gap-4 items-center">
                        {!previewUrl && (
                          <label
                            className={`mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#8C6B64] rounded-lg cursor-pointer hover:bg-muted ${
                              loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <Upload className="w-6 h-6 mb-2" />
                            <span>Seleccionar imagen</span>

                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={loading}
                              onChange={(e) => {
                                if (!e.target.files) return;
                                handleFile(e.target.files[0]);
                              }}
                            />
                          </label>
                        )}

                        {/* Loading */}
                        {loading && (
                          <div className="flex items-center gap-2 mt-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <p>Subiendo imagen...</p>
                          </div>
                        )}
                      </div>

                      {previewUrl && (
                        <div className="w-full flex justify-center items-center">
                          <Card className="relative inline-block p-0 border rounded-lg shadow-sm max-w-[300px] max-h-[300px]">
                            {/* Botón eliminar */}
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewUrl(null);
                                setSelectedFile(null);
                                setImageChanged(true);
                              }}
                              className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors"
                            >
                              <Trash className="w-4 h-4" />
                            </button>

                            <CardContent className="p-0">
                              <Image
                                src={previewUrl}
                                alt="preview"
                                width={150}
                                height={150}
                                className="rounded-lg object-contain max-w-[300px] max-h-[300px]"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          className="border-[#8C6B64]/30"
                          id="name"
                          placeholder="Nombre del producto"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          className="overflow-auto max-h-40 resize-y border-[#8C6B64]/30"
                          id="tiktok-comment-text"
                          placeholder="Escribe alguna descripción......"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 items-center justify-evenly">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio (BOB)</FormLabel>
                        <FormControl>
                          <Input
                            className="border-[#8C6B64]/30"
                            type="text"
                            inputMode="decimal" // ayuda en móviles
                            id="price"
                            placeholder="Ingresar el precio"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) => {
                              // Permite tanto coma como punto
                              const raw = e.target.value.replace(",", ".");
                              // Acepta vacío sin poner 0 inmediatamente
                              field.onChange(raw);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value?.toString() ?? ""}
                          >
                            <SelectTrigger className="border-[#8C6B64]/30">
                              <SelectValue placeholder="Selecciona una opción." />
                            </SelectTrigger>
                            <SelectContent className="bg-[#F2EADF]">
                              {categories.map((category) => (
                                <SelectItem
                                  className=" bg-[#F2EADF]
    data-[highlighted]:bg-[#D9CFCF]
    data-[state=checked]:bg-[#CBB6B6]
    data-[state=checked]:font-semibold
    data-[highlighted]:text-foreground
    cursor-pointer
  "
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setIsOpen(false);
                form.reset();

                // limpiar imagen seleccionada
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="bg-black hover:bg-black/40 text-white"
            >
              Cancelar
            </Button>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={
                (!isDirty && !imageChanged) ||
                isSubmitting ||
                (!isEditing && !previewUrl && !selectedFile)
              }
              className="bg-black hover:bg-black/40 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  {isEditing ? "Actualizando..." : "Guardando..."}
                </>
              ) : (
                <>{isEditing ? "Actualizar Producto" : "Guardar Producto"}</>
              )}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModalForm;
