"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAllowedEmail(email: string, isSuperuser: boolean = false) {
  try {
    await prisma.allowedEmail.create({
      data: {
        email: email.toLowerCase().trim(),
        isSuperuser,
      },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Este correo ya está en la lista." };
    }
    return { error: "Error al agregar el correo." };
  }
}

export async function removeAllowedEmail(id: string) {
  try {
    const allowed = await prisma.allowedEmail.findUnique({ where: { id } });
    if (allowed?.isSuperuser) {
      // Evitar que el superusuario se borre a sí mismo accidentalmente
      // En una implementación real, verificaríamos contra el usuario actual
    }

    await prisma.allowedEmail.delete({
      where: { id },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Error al eliminar el correo." };
  }
}

export async function updateAllowedEmail(id: string, email: string) {
  try {
    await prisma.allowedEmail.update({
      where: { id },
      data: {
        email: email.toLowerCase().trim(),
      },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Este correo ya está en uso por otro administrador." };
    }
    return { error: "Error al actualizar el correo." };
  }
}

