"use server";

import { prisma } from "@/lib/prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany();

    return {
      ok: true,
      data: categories,
    };
  } catch (error) {
    console.log("Error fetching categories:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
}
