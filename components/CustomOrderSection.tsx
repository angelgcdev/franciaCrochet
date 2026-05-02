"use client";

import { Playwrite_US_Trad } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const customOrderSchema = z.object({
  name: z.string().min(2, "Escribe tu nombre."),
  contact: z.string().min(6, "Agrega un teléfono o correo válido."),
  idea: z
    .string()
    .min(12, "Cuéntame un poco más sobre tu idea.")
    .max(600, "La idea debe tener menos de 600 caracteres."),
});

type CustomOrderForm = z.infer<typeof customOrderSchema>;

const CustomOrderSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomOrderForm>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      name: "",
      contact: "",
      idea: "",
    },
  });

  const onSubmit = (values: CustomOrderForm) => {
    const message = `
Hola 👋 quiero hacer un pedido personalizado:

Nombre: ${values.name}
Contacto: ${values.contact}
Idea: ${values.idea}
`;

    toast.success("Tu idea está lista para enviarse por WhatsApp.");
    window.open(
      `https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="pedido-personalizado"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7dcdf_0%,#fff8f7_100%)] px-space-24 py-20 scroll-mt-20 md:py-24"
    >
      <div className="absolute inset-x-0 bottom-0 h-24 yarn-line opacity-25" />
      <div className="section-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="stitch-caption font-semibold uppercase tracking-[0.25em] text-primary">
              Pedido personalizado
            </p>
            <h2
              className={`${playwriteUS.className} stitch-h2 mt-4 font-semibold text-foreground`}
            >
              Tejemos tu idea a medida
            </h2>
            <p className="stitch-body mt-6 max-w-xl text-muted-foreground">
              Si tienes una foto, color o personaje en mente, envíame la idea y
              coordinamos materiales, tiempos y detalles por WhatsApp.
            </p>

            <div className="mt-8 rounded-2xl border border-white/70 bg-white/65 p-6 shadow-lg shadow-primary/5">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <MessageCircle className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="stitch-body font-semibold text-foreground">
                    Respuesta directa
                  </h3>
                  <p className="stitch-body mt-2 text-muted-foreground">
                    El formulario no guarda datos: prepara tu mensaje y lo
                    abre en WhatsApp para continuar la conversación.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-border/80 bg-white p-6 shadow-2xl shadow-primary/10"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="custom-name">Nombre</Label>
                <Input
                  id="custom-name"
                  placeholder="Tu nombre"
                  className="h-12 rounded-lg bg-background px-4"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="stitch-caption text-destructive">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="custom-contact">Contacto</Label>
                <Input
                  id="custom-contact"
                  placeholder="Teléfono o correo"
                  className="h-12 rounded-lg bg-background px-4"
                  aria-invalid={!!errors.contact}
                  {...register("contact")}
                />
                {errors.contact ? (
                  <p className="stitch-caption text-destructive">
                    {errors.contact.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="custom-idea">Cuéntame tu idea</Label>
                <Textarea
                  id="custom-idea"
                  placeholder="Ej. Un conejito tejido en tonos rosa y crema para regalo..."
                  className="min-h-40 rounded-lg bg-background px-4"
                  aria-invalid={!!errors.idea}
                  {...register("idea")}
                />
                {errors.idea ? (
                  <p className="stitch-caption text-destructive">
                    {errors.idea.message}
                  </p>
                ) : null}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-lg bg-primary px-6 text-base font-semibold leading-6 hover:bg-primary/90"
            >
              <Send className="size-6" aria-hidden="true" />
              Enviar idea por WhatsApp
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
