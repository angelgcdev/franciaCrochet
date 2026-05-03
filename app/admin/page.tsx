"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      
      <Card className="rounded-xl max-w-md">
        <CardContent className="pt-6">
          <Button
            variant="destructive"
            className="h-12 px-6 rounded-lg"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
