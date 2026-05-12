import { Suspense } from "react";
import { ProductList } from "@/components/admin/products/ProductList";
import { ProductListSkeleton } from "@/components/admin/products/ProductListSkeleton";
import ProductsHeader from "@/components/admin/products/ProductsHeader";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return categories;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;
  const categories = await getCategories();

  return (
    <div>
      <ProductsHeader initialQuery={query} />

      <Suspense key={query} fallback={<ProductListSkeleton />}>
        <ProductList query={query} categories={categories} />
      </Suspense>
    </div>
  );
}
