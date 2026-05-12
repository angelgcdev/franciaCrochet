"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProductModalForm from "@/components/admin/products/ProductModalForm";
import { useCategories } from "@/context/CategoryContext";
import { Handlee } from "next/font/google";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export default function ProductsHeader({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { categories } = useCategories();

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set("query", searchTerm);
      } else {
        params.delete("query");
      }

      // Prevent pushing the exact same URL if query hasn't changed from initial
      if (
        searchTerm !== initialQuery ||
        searchParams.get("query") !== params.get("query")
      ) {
        router.replace(`${pathname}?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams, initialQuery]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <header className="py-4 px-4 sm:py-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <h1 className={`${handlee.className} text-3xl text-primary-400`}>
            Productos
          </h1>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-10 pr-10 w-full sm:w-64 rounded-xl bg-white shadow-sm border-border focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:border-primary-400"
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

          <ProductModalForm
            categories={categories}
            fetchProducts={handleRefresh}
            trigger={
              <Button className="h-12 w-full sm:w-auto px-6 bg-primary-400 hover:bg-primary-500 cursor-pointer font-medium rounded-xl shadow-md transition-transform hover:-translate-y-1 text-primary">
                <Plus />
                <span>Nuevo Producto</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
