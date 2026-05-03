"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, SquarePen, Trash2, MoreHorizontal } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductInfo, ProductListProps } from "@/app/admin/products/types";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import ProductModalForm from "./ProductModalForm";
import Image from "next/image";
import { toast } from "sonner";
import { deleteProductInfo } from "@/lib/products/actions";
import { deleteImageFromCloudinary } from "@/lib/utils/deleteImageFromCloudinary";
import { useState } from "react";

const ProductCard = ({
  product,
  categories,
  fetchProducts,
  handleDeleteProduct,
}: {
  product: ProductInfo;
  categories: { id: number; name: string }[];
  fetchProducts: () => void;
  handleDeleteProduct: (product: ProductInfo) => void;
}) => {
  return (
    <Card className="rounded-xl bg-white shadow-sm border border-secondary-400 p-4">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-lg">
                <ProductModalForm
                  product={product}
                  categories={categories}
                  fetchProducts={fetchProducts}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <SquarePen className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuItem
                  onClick={() => handleDeleteProduct(product)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <Badge variant="secondary" className="text-xs">
              {product.category.name}
            </Badge>
            <span className="font-bold text-primary-400">
              {product.price} BOB
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const ProductList = ({
  products,
  categories,
  hasMore,
  nextCursor,
  fetchProducts,
}: ProductListProps) => {
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

      toast.success("Producto eliminado correctamente");
      fetchProducts(null, true);
    } catch (error) {
      toast.error("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
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

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4 text-muted-foreground">Cargando...</div>
        }
        endMessage={
          <p className="text-center text-muted-foreground py-4">
            No hay más registros para mostrar
          </p>
        }
      >
        <div className="bg-secondary-200 m-4 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-end mb-4">
            <Badge className="bg-fg-secondary font-bold">
              {products.length} productos
            </Badge>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categories={categories}
                fetchProducts={() => fetchProducts(null, true)}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block">
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
                  <TableRow key={product.id} className="hover:bg-secondary-300">
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={product.images?.[0]?.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {product.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {product.category.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {product.price} BOB
                      </p>
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
                        />
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
        </div>
      </InfiniteScroll>
    </>
  );
};