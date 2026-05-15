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
  AlertCircle,
  UserX,
  Pencil
} from "lucide-react";
import { addAllowedEmail, removeAllowedEmail, updateAllowedEmail } from "./actions";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [emailToDelete, setEmailToDelete] = useState<{id: string, email: string} | null>(null);
  const [emailToEdit, setEmailToEdit] = useState<AllowedEmail | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);


  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setIsAdding(true);
    const result = await addAllowedEmail(newEmail);
    setIsAdding(false);

    if (result.success) {
      toast.success("Correo agregado correctamente");
      setNewEmail("");
      window.location.reload(); 
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async () => {
    if (!emailToDelete) return;

    setIsDeleting(emailToDelete.id);
    const result = await removeAllowedEmail(emailToDelete.id);
    setIsDeleting(null);

    if (result.success) {
      toast.success("Acceso revocado");
      setEmailToDelete(null);
      window.location.reload();
    } else {
      toast.error(result.error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailToEdit || !editValue) return;

    setIsUpdating(true);
    const result = await updateAllowedEmail(emailToEdit.id, editValue);
    setIsUpdating(false);

    if (result.success) {
      toast.success("Correo actualizado correctamente");
      setEmailToEdit(null);
      window.location.reload();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_350px]">
      {/* Diálogo de Edición */}
      <Dialog open={!!emailToEdit} onOpenChange={(open) => !open && setEmailToEdit(null)}>
        <DialogContent className="rounded-2xl border-border sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-primary-500" />
              Editar Correo
            </DialogTitle>
            <DialogDescription>
              Modifica el correo electrónico autorizado.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-email">Correo Electrónico</Label>
              <Input
                id="edit-email"
                type="email"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="rounded-xl border-border focus:ring-primary-500"
                required
              />
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEmailToEdit(null)}
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isUpdating}
                className="rounded-xl bg-primary-500 hover:bg-primary-600 text-white min-w-[100px]"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación */}
      <AlertDialog open={!!emailToDelete} onOpenChange={(open) => !open && setEmailToDelete(null)}>
        <AlertDialogContent className="rounded-2xl border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <UserX className="h-5 w-5" />
              Revocar Acceso
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar a <strong>{emailToDelete?.email}</strong>? 
              Esta persona ya no podrá acceder al panel administrativo de forma inmediata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-xl bg-destructive hover:bg-destructive/90 text-white"
            >
              Confirmar Eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                    <TableCell className="font-medium pl-6 py-4 text-fg-primary">
                      {item.email}
                    </TableCell>
                    <TableCell>
                      {item.isSuperuser ? (
                        <Badge variant="default" className="bg-primary-500 hover:bg-primary-600 rounded-lg px-2 py-0.5">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          Superuser
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="rounded-lg px-2 py-0.5 border-secondary-200 text-secondary-700">
                          Administrador
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEmailToEdit(item);
                          setEditValue(item.email);
                        }}
                        className="h-9 w-9 text-muted-foreground hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {!item.isSuperuser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting === item.id}
                          onClick={() => setEmailToDelete({ id: item.id, email: item.email })}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                        >
                          {isDeleting === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
