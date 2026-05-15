"use client";

import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductInfo, Category } from "@/app/admin/products/types";
import { toast } from "sonner";
import {
  deleteProductInfo,
  toggleProductVisibility,
} from "@/lib/products/actions";
import { deleteImageFromCloudinary } from "@/lib/utils/deleteImageFromCloudinary";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

export interface ProductListClientProps {
  initialProducts: ProductInfo[];
  initialHasMore: boolean;
  initialNextCursor: number | null;
  categories: Category[];
  query: string;
}

export const ProductListClient = ({
  initialProducts,
  initialHasMore,
  initialNextCursor,
  categories,
  query,
}: ProductListClientProps) => {
  const [products, setProducts] = useState<ProductInfo[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [nextCursor, setNextCursor] = useState<number | null>(
    initialNextCursor,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductInfo | null>(
    null,
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  // Sincronizar estado local con las props del servidor cuando cambian
  useEffect(() => {
    setProducts(initialProducts);
    setHasMore(initialHasMore);
    setNextCursor(initialNextCursor);
  }, [initialProducts, initialHasMore, initialNextCursor]);

  // Fetch more products for infinite scroll (client-side pagination)
  const fetchMore = useCallback(async () => {
    if (!nextCursor) return;

    const params = new URLSearchParams();
    params.set("cursor", String(nextCursor));
    params.set("limit", "20");
    if (query) params.set("search", query);

    try {
      const res = await fetch(`/api/products?${params.toString()}`, {
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Error al cargar más productos");
        return;
      }

      const data = await res.json();

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const uniqueNew = data.data.filter(
          (item: ProductInfo) => !ids.has(item.id),
        );
        return [...prev, ...uniqueNew];
      });
      setHasMore(data.hasMore);
      setNextCursor(data.nextCursor || null);
    } catch {
      toast.error("Error de conexión");
    }
  }, [nextCursor, query]);

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
      router.refresh();
    } catch {
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
      toast.success(
        newVisibility
          ? "Producto visible en la tienda"
          : "Producto oculto en la tienda",
      );
      router.refresh();
    } catch {
      toast.error("Error al cambiar visibilidad");
    }
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
            <AlertDialogTitle className="text-xl">
              ¿Eliminar producto?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              ¿Estás seguro de eliminar{" "}
              <span className="font-semibold text-foreground">
                {productToDelete?.name}
              </span>
              ? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              onClick={cancelDelete}
              className="rounded-lg h-11"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg h-11"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4 text-muted-foreground">
            Cargando...
          </div>
        }
        endMessage={
          <p className="text-center text-muted-foreground py-4">
            No hay más registros
          </p>
        }
      >
        <div className="bg-secondary-200 m-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-end mb-4">
            <Badge className="bg-fg-secondary text-secondary">
              {products.length} productos
            </Badge>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categories={categories}
                fetchProducts={() => router.refresh()}
                handleDeleteProduct={handleDeleteClick}
                handleToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
