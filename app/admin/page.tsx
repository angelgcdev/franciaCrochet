"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className={`${handlee.className} text-3xl text-primary-400`}>Panel de Administración</h1>
      
      <Card className="rounded-xl max-w-md border-border shadow-sm">
        <CardContent className="pt-6">
          <Button
            variant="destructive"
            className="h-12 px-6 rounded-xl shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
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

