"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";

//Esquema de validacion con zod
const loginSchema = z.object({
  email: z.string().email("Correo no válido").nonempty("Correo requerido"),
  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .nonempty("Contraseña requerida"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, formState } = form;
  const { isSubmitting, isDirty } = formState;

  // Estados
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginInput) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Credenciales incorrectas");
      return;
    }

    toast.success("Login exitoso");
    router.push("/admin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* --- FORMULARIO --- */}
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center gap-2 mb-6 text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground">
                  Inicia sesión en tu cuenta de Francia Crochet
                </p>
              </div>

              {/* EMAIL */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ejemplo@ejemplo.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          autoComplete="new-password"
                          {...field}
                        />
                        {/* BOTÓN MOSTRAR/OCULTAR */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BOTÓN SUBMIT */}
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="w-full mt-4"
              >
                {isSubmitting ? "Verificando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </Form>

          {/* --- IMAGEN DERECHA --- */}
          <div className="relative hidden md:block bg-[#f2eade]">
            <Image
              fill
              src="https://res.cloudinary.com/dngkwtctt/image/upload/v1763217522/Generated_Image_November_15_2025_-_10_28AM_1_1_hfzk6j.png"
              alt="Image"
              className="object-scale-down"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
