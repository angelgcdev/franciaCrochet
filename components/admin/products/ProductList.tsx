"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, SquarePen, Trash2, ArrowRightToLine, Pencil, Eye, EyeClosed } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductInfo, ProductListProps } from "@/app/admin/products/types";
import Image from "next/image";
import { toast } from "sonner";
import { deleteProductInfo, toggleProductVisibility } from "@/lib/products/actions";
import { deleteImageFromCloudinary } from "@/lib/utils/deleteImageFromCloudinary";
import { useState } from "react";
import ProductModalForm from "./ProductModalForm";


const ProductCard = ({
  product,
  categories,
  fetchProducts,
  handleDeleteProduct,
  handleToggleVisibility,
}: {
  product: ProductInfo;
  categories: { id: number; name: string }[];
  fetchProducts: () => void;
  handleDeleteProduct: (product: ProductInfo) => void;
  handleToggleVisibility: (product: ProductInfo) => void;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Card className="rounded-xl shadow-sm border border-secondary-400 p-4 bg-secondary-200 h-full">
        <div className="flex flex-row gap-4 items-center h-full">
          <div className="relative w-[100px] h-[130px] rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={product.images?.[0]?.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base truncate">{product.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0 text-primary-400 font-semibold hover:bg-primary-100">
                    <ArrowRightToLine className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 bg-secondary-200 shadow-lg border border-secondary-400">
                  <DropdownMenuItem onClick={() => setShowEditModal(true)} className="h-10 px-3 rounded-lg cursor-pointer focus:bg-secondary-200">
                    <Pencil className="mr-3 h-4 w-4 text-fg-secondary" />
                    <span className="text-sm">Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleVisibility(product)} className="h-10 px-3 rounded-lg cursor-pointer focus:bg-secondary-200">
                    {product.is_visible !== false ? (<><Eye className="mr-3 h-4 w-4 text-green-600" /><span className="text-sm">Ocultar</span></>) : (<><EyeClosed className="mr-3 h-4 w-4 text-gray-500" /><span className="text-sm">Mostrar</span></>)}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteProduct(product)} className="h-10 px-3 rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-red-50">
                    <Trash2 className="mr-3 h-4 w-4" />
                    <span className="text-sm">Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 items-center">
                <Badge variant="secondary" className="text-xs bg-secondary-300 text-fg-secondary">{product.category.name}</Badge>
                <Badge variant="secondary" className={`text-xs ${product.is_visible !== false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {product.is_visible !== false ? "Visible" : "Oculto"}
                </Badge>
              </div>
              <span className="font-bold text-primary-400 text-base">{product.price} BOB</span>
            </div>
          </div>
        </div>
      </Card>

      <ProductModalForm product={product} categories={categories} fetchProducts={fetchProducts} open={showEditModal} onOpenChange={setShowEditModal} trigger={<span className="hidden" />} />
    </>
  );
};

export const ProductList = ({ products, categories, hasMore, nextCursor, fetchProducts }: ProductListProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductInfo | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = (product: ProductInfo) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    setShowDeleteDialog(false);

    try {
      const id = productToDelete.id;
      const publicId = productToDelete.images?.[0]?.public_id;
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

      toast.success("Producto eliminado correctamente");
      fetchProducts(null, true);
    } catch (error) {
      toast.error("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowDeleteDialog(false);
  };

  const handleToggleVisibility = async (product: ProductInfo) => {
    try {
      const newVisibility = product.is_visible === false ? true : false;
      const res = await toggleProductVisibility(product.id, newVisibility);
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success(newVisibility ? "Producto visible en tienda" : "Producto ocultado");
      fetchProducts(null, true);
    } catch (error) {
      toast.error("Error al cambiar visibilidad");
    }
  };

  const loadMore = () => {
    if (!nextCursor) return;
    fetchProducts(nextCursor);
  };

  return (
    <>
      {isDeleting && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white text-xl mt-2">Eliminando...</p>
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              ¿Estás seguro de eliminar <span className="font-semibold text-foreground">{productToDelete?.name}</span>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={cancelDelete} className="rounded-lg h-11">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg h-11">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div className="text-center py-4 text-muted-foreground">Cargando...</div>}
        endMessage={<p className="text-center text-muted-foreground py-4">No hay más registros</p>}
      >
        <div className="bg-secondary-200 m-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-end mb-4">
            <Badge className="bg-fg-secondary font-bold">{products.length} productos</Badge>
          </div>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} categories={categories} fetchProducts={() => fetchProducts(null, true)} handleDeleteProduct={handleDeleteClick} handleToggleVisibility={handleToggleVisibility} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
