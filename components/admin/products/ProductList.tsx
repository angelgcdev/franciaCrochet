"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, SquarePen, Trash2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductInfo, ProductListProps } from "@/app/admin/products/types";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import ProductModalForm from "./ProductModalForm";
import Image from "next/image";
import { toast } from "sonner";
import { deleteProductInfo } from "@/lib/products/actions";
import { deleteImageFromCloudinary } from "@/lib/utils/deleteImageFromCloudinary";
import { useState } from "react";

export const ProductList = ({
  products,
  categories,
  hasMore,
  nextCursor,
  fetchProducts,
}: ProductListProps) => {
  // Estados
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async (product: ProductInfo) => {
    setIsDeleting(true);

    try {
      const id = product.id;
      const publicId = product.images?.[0]?.public_id;

      const res = await deleteProductInfo(id);

      if (!res.ok) {
        toast.error(res.message);
        setIsDeleting(false);
        return;
      }

      if (publicId) {
        const result = await deleteImageFromCloudinary(publicId);
        if (!result.ok) {
          toast.error(res.message);
          setIsDeleting(false);
          return;
        }
      }

      toast.success("Producto eliminado Correctamente:");
      fetchProducts(null, true);
    } catch (error) {
      toast.error("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para cargar la siguiente página
  const loadMore = () => {
    if (!nextCursor) return; // no hay más datos
    fetchProducts(nextCursor);
  };

  return (
    <>
      {isDeleting && (
        <div className="fixed inset-0 bg-black opacity-40 flex flex-col items-center justify-center z-50">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white text-xl ">Eliminando...</p>
        </div>
      )}

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4 text-gray-500">Cargando...</div>
        }
        endMessage={
          <p className="text-center text-gray-500 py-4">
            No hay más registros para mostrar
          </p>
        }
      >
        <div className="bg-[#F2EADF] m-4 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-end mb-4">
            <Badge className="bg-[#8C6B64] font-bold">
              {products.length} productos
            </Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Fecha de creación</TableHead>
                <TableHead>Fecha de modificación</TableHead>
                <TableHead className="w-[50px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-[#D9CFCF]">
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src={product.images?.[0].image_url || "placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {product.name}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {product.category.name}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {product.price} BOB
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-muted-foreground">
                    {formatRelativeWithDateFns(product.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatRelativeWithDateFns(product.updated_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ProductModalForm
                        product={product}
                        categories={categories}
                        fetchProducts={() => fetchProducts(null, true)}
                        trigger={
                          <Button
                            variant="outline"
                            className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                            size="sm"
                          >
                            <SquarePen className="w-4 h-4 mr-1" />
                          </Button>
                        }
                      ></ProductModalForm>

                      <Button
                        variant="outline"
                        className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                        size="sm"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </InfiniteScroll>
    </>
  );
};
