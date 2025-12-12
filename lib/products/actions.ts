"use server";

import { ImageData } from "@/app/admin/products/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// types/product.ts
export interface CreateProductDto {
  name: string;
  description?: string;
  price?: number;
  category_id: number;
}

export async function createProductInfo(
  data: CreateProductDto,
  imageData?: ImageData
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      ok: false,
      message: "No autorizado",
    };
  }

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Crear el producto
      const product = await tx.product.create({
        data: {
          ...data,
          user_id: +userId,
        },
      });

      // Crear registro de la imagen
      if (imageData) {
        await tx.productImage.create({
          data: {
            product_id: product.id,
            image_url: imageData.image_url,
            public_id: imageData.public_id, // aqui falta esta informacion
          },
        });
      }

      return product;
    });

    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    console.log("Error :", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
}

export async function deleteProductInfo(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      ok: false,
      message: "No autorizado",
    };
  }

  try {
    // Opción 1: Usar $transaction para eliminar primero las imágenes relacionadas
    await prisma.$transaction(async (tx) => {
      // Borrar imágenes del producto
      await tx.productImage.deleteMany({
        where: {
          product_id: id,
        },
      });

      // Borrar el producto
      await tx.product.delete({
        where: {
          id,
        },
      });
    });

    return {
      ok: true,
      data: { id },
    };
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
}
