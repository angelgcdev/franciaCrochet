import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    const categories = await prisma.category.findMany();

    console.log(categories);
  } catch (error) {
    console.error(error);
  }
}

test();
