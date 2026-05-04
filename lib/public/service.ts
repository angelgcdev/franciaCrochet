import { prisma } from "@/lib/prisma";

export async function getPublicProductsService(
  cursor: number | null = null,
  limit: number = 20
) {
  const cursorFilter = cursor ? { id: { lt: cursor } } : {};

  const products = await prisma.product.findMany({
    where: {
      is_visible: true,
      ...cursorFilter,
    },
    include: {
      category: true,
      images: true,
    },
    take: limit,
    orderBy: {
      id: "desc",
    },
  });

  const nextCursor = products.length > 0 ? products[products.length - 1].id : null;
  return {
    data: products,
    nextCursor,
    hasMore: products.length === limit,
  };
}
