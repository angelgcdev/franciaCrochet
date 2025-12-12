import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@admin.com";
  const password = "123456";

  const passwordHash = await hash(password, 10);

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        name: "Administrador",
        password: passwordHash,
      },
    });

    console.log("✔ Usuario creado correctamente");
  } else {
    console.log("⚠ Ya existe un usuario con ese email");
  }

  // Segundo usuario
  const email2 = "user@user.com";
  const password2 = "123456";

  const passwordHash2 = await hash(password2, 10);

  const existing2 = await prisma.user.findUnique({
    where: { email: email2 },
  });

  if (!existing2) {
    await prisma.user.create({
      data: {
        email: email2,
        name: "Usuario Normal",
        password: passwordHash2,
      },
    });
    console.log("✔ Usuario normal creado correctamente");
  } else {
    console.log("⚠ Ya existe un usuario normal con ese email");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
