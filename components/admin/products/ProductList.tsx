import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllProductsService } from "@/lib/products/service";
import { ProductListClient } from "./ProductListClient";
import { ProductInfo } from "@/app/admin/products/types";

interface ProductListProps {
  query: string;
  categories: { id: number; name: string }[];
}

export async function ProductList({ query, categories }: ProductListProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No autorizado. Inicia sesión para ver los productos.
      </div>
    );
  }

  const userId = session.user.id;
  const result = await getAllProductsService(userId, null, 20, query || null);

  return (
    <ProductListClient
      initialProducts={result.data as ProductInfo[]}
      initialHasMore={result.hasMore}
      initialNextCursor={result.nextCursor}
      categories={categories}
      query={query}
    />
  );
}
