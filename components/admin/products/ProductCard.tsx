"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightToLine, Pencil, Eye, EyeClosed, Trash2 } from "lucide-react";
import { ProductInfo } from "@/app/admin/products/types";
import Image from "next/image";
import { useState } from "react";
import ProductModalForm from "./ProductModalForm";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export interface ProductCardProps {
  product: ProductInfo;
  categories: { id: number; name: string }[];
  fetchProducts: () => void;
  handleDeleteProduct: (product: ProductInfo) => void;
  handleToggleVisibility: (product: ProductInfo) => void;
}

const ProductCard = ({
  product,
  categories,
  fetchProducts,
  handleDeleteProduct,
  handleToggleVisibility,
}: ProductCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Card className="rounded-xl shadow-sm border border-border p-4 bg-white h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex flex-row gap-4 items-center h-full">
          <div className="relative w-[100px] h-[130px] rounded-lg overflow-hidden shrink-0">
            <Image
              src={product.images?.[0]?.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`${handlee.className} text-lg font-semibold truncate text-primary-500`}>
                {product.name}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0 text-primary-400 font-semibold hover:bg-primary-100 rounded-full"
                  >
                    <ArrowRightToLine className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-xl p-2 bg-white shadow-lg border border-border"
                >
                  <DropdownMenuItem
                    onClick={() => setShowEditModal(true)}
                    className="h-10 px-3 rounded-lg cursor-pointer focus:bg-primary-100"
                  >
                    <Pencil className="mr-3 h-4 w-4 text-primary-400" />
                    <span className="text-sm">Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleToggleVisibility(product)}
                    className="h-10 px-3 rounded-lg cursor-pointer focus:bg-primary-100"
                  >
                    {product.is_visible !== false ? (
                      <>
                        <Eye className="mr-3 h-4 w-4 text-green-600" />
                        <span className="text-sm">Ocultar</span>
                      </>
                    ) : (
                      <>
                        <EyeClosed className="mr-3 h-4 w-4 text-gray-500" />
                        <span className="text-sm">Mostrar</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteProduct(product)}
                    className="h-10 px-3 rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-red-50"
                  >
                    <Trash2 className="mr-3 h-4 w-4" />
                    <span className="text-sm">Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 items-center">
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary-100 text-primary-700 rounded-full px-3 py-0.5 border-none"
                >
                  {product.category.name}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs rounded-full px-3 py-0.5 border-none ${product.is_visible !== false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {product.is_visible !== false ? "Visible" : "Oculto"}
                </Badge>
              </div>
              <span className="font-bold text-primary-400 text-base">
                {product.price} BOB
              </span>
            </div>
          </div>
        </div>
      </Card>

      <ProductModalForm
        product={product}
        categories={categories}
        fetchProducts={fetchProducts}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        trigger={<span className="hidden" />}
      />
    </>
  );
};

export default ProductCard;
