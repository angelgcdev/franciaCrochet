import { prisma } from "@/lib/prisma";

export async function getPublicProductsService(
  cursor: number | null = null,
  limit: number = 20
) {
  const products = await prisma.product.findMany({
    where: {
      ...(cursor ? { id: { lt: cursor } } : {}), // Traer productos con id menor al cursor
    },
    include: {
      category: true,
      // user: true,
      images: true,
    },
    take: limit, // Cuántos traer por página
    orderBy: {
      id: "desc", // Orden descendente para que el cursor funcione bien
    },
  });

  const nextCursor =
    products.length > 0 ? products[products.length - 1].id : null;
  return {
    data: products,
    nextCursor,
    hasMore: products.length === limit, // Si trajiste menos que limit, no hay más
  };
}
