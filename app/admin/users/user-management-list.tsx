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
    <div className="flex flex-col gap-12 max-w-4xl mx-auto font-varela">
      {/* Diálogo de Edición */}
      <Dialog open={!!emailToEdit} onOpenChange={(open) => !open && setEmailToEdit(null)}>
        <DialogContent className="rounded-lg border-border sm:max-w-[425px] bg-secondary shadow-xl border-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-handlee text-2xl text-primary-400">
              <Pencil className="h-5 w-5" />
              Editar Correo Autorizado
            </DialogTitle>
            <DialogDescription className="font-varela text-on-surface-variant">
              Modifica el correo electrónico para actualizar sus credenciales de acceso.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-on-surface-variant font-medium">Correo Electrónico</Label>
              <Input
                id="edit-email"
                type="email"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="rounded-lg border-outline-variant bg-white focus:ring-primary/20 focus:border-primary h-12"
                required
              />
            </div>
            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEmailToEdit(null)}
                className="rounded-lg border-outline-variant hover:bg-surface-container"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isUpdating}
                className="rounded-lg bg-primary-400 hover:bg-primary-500 text-white min-w-[120px] shadow-sm"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar Cambios"}
              </Button>
            </DialogFooter>


          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación */}
      <AlertDialog open={!!emailToDelete} onOpenChange={(open) => !open && setEmailToDelete(null)}>
        <AlertDialogContent className="rounded-lg border-border bg-secondary shadow-xl border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-error font-handlee text-2xl">
              <UserX className="h-6 w-6" />
              Revocar Acceso
            </AlertDialogTitle>
            <AlertDialogDescription className="font-varela text-on-surface-variant">
              ¿Estás seguro de que deseas eliminar a <strong>{emailToDelete?.email}</strong>? 
              Esta persona ya no podrá acceder al panel administrativo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg border-outline-variant">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="rounded-lg bg-error hover:bg-error/90 text-white shadow-sm"
            >
              Confirmar Eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* --- FORMULARIO DE AGREGAR (ARRIBA) --- */}
      <Card className="rounded-lg border-border bg-surface-container-low shadow-sm overflow-hidden border-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary-container" />
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 font-handlee text-primary-400">
            <Plus className="h-6 w-6" />
            Nuevo Acceso Administrativo
          </CardTitle>
          <CardDescription className="font-varela">
            Añade un nuevo correo electrónico a la lista blanca para autorizar su ingreso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full space-y-2">
              <Label htmlFor="new-email" className="text-on-surface-variant ml-1">Correo del Administrador</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
                <Input
                  id="new-email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="rounded-lg border-outline-variant bg-white pl-10 h-12 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="rounded-lg bg-primary-400 hover:bg-primary-500 text-white font-medium h-12 px-8 shadow-sm transition-all hover:shadow-md active:scale-95 disabled:opacity-50"
              disabled={isAdding}
            >
              {isAdding ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Autorizar Acceso"
              )}
            </Button>

          </form>

          <div className="mt-6 p-4 rounded-lg bg-primary-container/20 border border-primary-container/30 flex gap-3 items-center">
            <AlertCircle className="h-5 w-5 text-primary shrink-0" />
            <p className="text-xs text-on-primary-container font-varela leading-relaxed">
              <strong>Nota:</strong> Solo correos de Google son compatibles con el sistema de autenticación actual.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- LISTA DE CORREOS (ABAJO) --- */}
      <Card className="rounded-lg overflow-hidden border-none bg-white shadow-md">
        <CardHeader className="border-b border-surface-container-high bg-surface-container-lowest">
          <CardTitle className="text-xl flex items-center gap-2 font-handlee text-on-surface">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Correos Autorizados
          </CardTitle>
          <CardDescription className="font-varela">
            Lista de personas con permiso para gestionar la tienda.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-surface-container-low">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="pl-6 font-varela text-on-surface-variant uppercase text-[11px] tracking-wider">Correo Electrónico</TableHead>
                <TableHead className="font-varela text-on-surface-variant uppercase text-[11px] tracking-wider text-center">Rol de Acceso</TableHead>
                <TableHead className="text-right pr-6 font-varela text-on-surface-variant uppercase text-[11px] tracking-wider">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {emails.map((item) => (
                  <TableRow key={item.id} className="group transition-colors hover:bg-surface-container-lowest border-surface-container">
                    <TableCell className="font-medium pl-6 py-5 text-on-surface font-varela">
                      {item.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.isSuperuser ? (
                        <Badge variant="secondary" className="bg-primary-container text-on-primary-container rounded-lg px-3 py-1 font-varela border-none">
                          Superusuario
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="rounded-lg px-3 py-1 font-varela border-outline-variant text-on-surface-variant bg-transparent">
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
                        className="h-9 w-9 text-outline hover:text-primary hover:bg-primary-container/30 rounded-lg transition-all"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {!item.isSuperuser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting === item.id}
                          onClick={() => setEmailToDelete({ id: item.id, email: item.email })}
                          className="h-9 w-9 text-outline hover:text-error hover:bg-error-container/30 rounded-lg transition-all"
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
    </div>
  );
}

