import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const superuserEmail = process.env.SUPERUSER_EMAIL;

  if (!superuserEmail) {
    console.error("Error: SUPERUSER_EMAIL no está definido en las variables de entorno.");
    process.exit(1);
  }

  console.log(`Seeding superuser: ${superuserEmail}`);

  await prisma.allowedEmail.upsert({
    where: { email: superuserEmail },
    update: { isSuperuser: true },
    create: {
      email: superuserEmail,
      isSuperuser: true,
    },
  });


  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
