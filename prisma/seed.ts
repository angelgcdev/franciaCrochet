import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Las categorías se pueden seguir pre-cargando
  const categories = [
    { name: "Bufandas" },
    { name: "Amigurumis" },
    { name: "Gorros" },
    { name: "Decoración" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  console.log("✔ Categorías pre-cargadas correctamente");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
