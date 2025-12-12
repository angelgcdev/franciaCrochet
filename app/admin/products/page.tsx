"use client";

import { ProductList } from "@/components/admin/products/ProductList";
import ProductModalForm from "@/components/admin/products/ProductModalForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "./api";
import { toast } from "sonner";
import { ProductInfo } from "./types";
import { useCategories } from "@/context/CategoryContext";

const ProductsPage = () => {
  // Estados
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  // Contextos
  const { categories, fetchCategories } = useCategories();
  console.log("Categorias formulario:", categories);

  // Funcion para obtener datos de los productos
  const fetchProducts = useCallback(
    async (cursor: number | null, reset = false) => {
      const res = await getProducts(cursor);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      if (reset) {
        // 🔄 refresco total (reemplaza todo)
        setProducts(res.data.data);
      } else {
        // ➕ scroll infinito (acumula)
        setProducts((prev) => {
          const ids = new Set(prev.map((p) => p.id));
          const uniqueNew = res.data.data.filter(
            (item: ProductInfo) => !ids.has(item.id)
          );
          return [...prev, ...uniqueNew];
        });
      }

      setHasMore(res.data.hasMore);
      setNextCursor(res.data.nextCursor || null);
    },
    []
  );

  // Efectos
  useEffect(() => {
    async function loadIntial() {
      await fetchProducts(null);
    }
    loadIntial();
  }, [fetchProducts]);

  console.log("aquiiu:", products);
  return (
    <div className=" ">
      <header className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div className="flex gap-4 ">
          <ProductModalForm
            categories={categories}
            fetchProducts={() => fetchProducts(null, true)}
            trigger={
              <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-700">
                <Plus />
                <span>Nuevo Producto</span>
              </Button>
            }
          />
        </div>
      </header>

      <ProductList
        products={products}
        categories={categories}
        fetchProducts={fetchProducts}
        hasMore={hasMore}
        nextCursor={nextCursor}
      />
    </div>
  );
};

export default ProductsPage;
