import { prisma } from "@/lib/prisma";
import { UserManagementList } from "./user-management-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "SUPERUSER") {
    redirect("/admin/dashboard");
  }

  const allowedEmails = await prisma.allowedEmail.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Acceso</h1>
        <p className="text-muted-foreground mt-2">
          Administra los correos electrónicos que tienen permiso para acceder al panel administrativo.
        </p>
      </div>

      <UserManagementList initialEmails={JSON.parse(JSON.stringify(allowedEmails))} />
    </div>
  );
}
