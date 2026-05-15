import { prisma } from "@/lib/prisma";

export async function getAllProductsService(
  user_id: string,
  cursor: number | null = null,
  limit: number = 20,
  search: string | null = null
) {
  const products = await prisma.product.findMany({
    where: {
      user_id,
      ...(cursor ? { id: { lt: cursor } } : {}),
      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },
    include: {
      category: true,
      user: true,
      images: true,
    },
    take: limit,
    orderBy: {
      id: "desc",
    },
  });

  const nextCursor =
    products.length > 0 ? products[products.length - 1].id : null;
  return {
    data: products,
    nextCursor,
    hasMore: products.length === limit,
  };
}
