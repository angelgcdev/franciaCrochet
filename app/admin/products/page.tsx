"use client";

import { ProductList } from "@/components/admin/products/ProductList";
import ProductModalForm from "@/components/admin/products/ProductModalForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "./api";
import { toast } from "sonner";
import { ProductInfo } from "./types";
import { useCategories } from "@/context/CategoryContext";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearch, setDisplaySearch] = useState("");

  const { categories } = useCategories();

  const fetchProducts = useCallback(
    async (cursor: number | null, reset = false, search: string | null = null) => {
      const res = await getProducts(cursor, 20, search);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      if (reset) {
        setProducts(res.data.data);
      } else {
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDisplaySearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    async function loadInitial() {
      await fetchProducts(null, true, displaySearch || null);
    }
    loadInitial();
  }, [displaySearch, fetchProducts]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplaySearch("");
  };

  return (
    <div className="">
      <header className="py-4 px-4 sm:py-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Productos</h1>

            <ProductModalForm
              categories={categories}
              fetchProducts={() => fetchProducts(null, true, displaySearch || null)}
              trigger={
                <Button className="h-12 px-4 sm:px-6 bg-primary-400 hover:bg-primary-500 cursor-pointer font-medium rounded-lg sm:hidden">
                  <Plus />
                  <span>Nuevo Producto</span>
                </Button>
              }
            />
          </div>

          <div className="hidden sm:flex gap-4">
            <ProductModalForm
              categories={categories}
              fetchProducts={() => fetchProducts(null, true, displaySearch || null)}
              trigger={
                <Button className="h-12 px-6 bg-primary-400 hover:bg-primary-500 cursor-pointer font-medium rounded-lg">
                  <Plus />
                  <span>Nuevo Producto</span>
                </Button>
              }
            />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 pl-10 pr-10 w-64 rounded-lg bg-secondary-100"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>
          </div>

          <div className="relative sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-10 pr-10 w-full rounded-lg bg-secondary-100"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <ProductList
        products={products}
        categories={categories}
        fetchProducts={() => fetchProducts(null, true, displaySearch || null)}
        hasMore={hasMore}
        nextCursor={nextCursor}
      />
    </div>
  );
};

export default ProductsPage;
