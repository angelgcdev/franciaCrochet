"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Mail, 
  ShieldCheck, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { addAllowedEmail, removeAllowedEmail } from "./actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface AllowedEmail {
  id: string;
  email: string;
  isSuperuser: boolean;
  created_at: string;
}

export function UserManagementList({ initialEmails }: { initialEmails: AllowedEmail[] }) {
  const [emails, setEmails] = useState(initialEmails);
  const [newEmail, setNewEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsAdding(true);
    const result = await addAllowedEmail(newEmail);
    setIsAdding(false);

    if (result.success) {
      toast.success("Correo agregado correctamente");
      setNewEmail("");
      // Nota: revalidatePath actualizará el servidor, pero para UX instantáneo podemos recargar o actualizar estado
      window.location.reload(); 
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`¿Estás seguro de que quieres revocar el acceso a ${email}?`)) return;

    const result = await removeAllowedEmail(id);
    if (result.success) {
      toast.success("Acceso revocado");
      window.location.reload();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_350px]">
      {/* --- LISTA DE CORREOS --- */}
      <Card className="rounded-2xl overflow-hidden border-border bg-white shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary-500" />
            Correos Autorizados
          </CardTitle>
          <CardDescription>
            Solo estos correos pueden iniciar sesión en el administrador.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right pr-6">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {emails.map((item) => (
                  <TableRow key={item.id} className="group transition-colors hover:bg-muted/50">
                    <TableCell className="font-medium pl-6 py-4">
                      {item.email}
                    </TableCell>
                    <TableCell>
                      {item.isSuperuser ? (
                        <Badge variant="default" className="bg-primary-500 hover:bg-primary-600 rounded-lg px-2 py-0.5">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Superuser
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="rounded-lg px-2 py-0.5">
                          Administrador
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {!item.isSuperuser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id, item.email)}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* --- FORMULARIO DE AGREGAR --- */}
      <div className="space-y-6">
        <Card className="rounded-2xl border-border bg-white shadow-sm sticky top-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary-500" />
              Nuevo Acceso
            </CardTitle>
            <CardDescription>
              Añade un correo para permitirle la entrada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="usuario@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="rounded-xl border-border focus:ring-primary-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium h-11 transition-all"
                disabled={isAdding}
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Autorizar Correo"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="p-4 rounded-2xl bg-secondary-50 border border-secondary-100 flex gap-3">
          <AlertCircle className="h-5 w-5 text-secondary-500 shrink-0" />
          <p className="text-xs text-secondary-700 leading-relaxed">
            <strong>Importante:</strong> Los usuarios autorizados deben iniciar sesión con su cuenta de Google. No se requiere contraseña adicional.
          </p>
        </div>
      </div>
    </div>
  );
}
