"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const AdminPage = () => {
  return (
    <div>
      <h1>AdminPage</h1>

      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default AdminPage;
