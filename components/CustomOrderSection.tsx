"use client";

import { Handlee } from "next/font/google";
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

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
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
      className="bg-[linear-gradient(180deg,#faf1f6_0%,#fff7fb_100%)] px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <div className="grid items-start gap-space-32 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-space-48">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-[560px]"
          >
            {/* <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-primary-400">
              Pedido personalizado
            </p> */}

            <h2
              className={`${handlee.className} mt-space-16 text-[clamp(32px,3.2vw,48px)] leading-[1.2] tracking-[-0.02em] text-primary-400`}
            >
              Tejemos tu idea a medida
            </h2>

            <p className="mt-space-24 max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
              Si tienes una foto, color o personaje en mente, envíame la idea y
              coordinamos materiales, tiempos y detalles por WhatsApp.
            </p>

            <div className="mt-space-32 rounded-[24px] bg-white/90 p-space-24 shadow-[0_16px_36px_rgba(119,79,132,0.08)]">
              <div className="flex items-start gap-space-16">
                <span className="flex size-space-48 shrink-0 items-center justify-center rounded-[16px] bg-primary-100 text-primary-400 shadow-[0_8px_18px_rgba(243,194,255,0.32)]">
                  <MessageCircle className="size-6" aria-hidden="true" />
                </span>

                <div>
                  <h3
                    className={`${handlee.className} text-[clamp(24px,2.2vw,32px)] leading-[1.2] tracking-[-0.02em] text-fg-primary`}
                  >
                    Respuesta directa
                  </h3>
                  <p className="mt-space-8 text-[clamp(15px,1.3vw,17px)] leading-[1.6] text-fg-secondary">
                    El formulario no guarda datos: prepara tu mensaje y lo abre
                    en WhatsApp para continuar la conversación.
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
            className="rounded-[24px] bg-white p-space-24 shadow-[0_20px_48px_rgba(119,79,132,0.10)]"
          >
            <div className="grid gap-space-16">
              <div className="grid gap-space-8">
                <Label
                  htmlFor="custom-name"
                  className="text-sm font-medium text-fg-primary"
                >
                  Nombre
                </Label>
                <Input
                  id="custom-name"
                  placeholder="Tu nombre"
                  className="h-12 rounded-lg border-border/70 bg-secondary px-space-16"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-sm leading-[1.4] text-destructive">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-space-8">
                <Label
                  htmlFor="custom-contact"
                  className="text-sm font-medium text-fg-primary"
                >
                  Contacto
                </Label>
                <Input
                  id="custom-contact"
                  placeholder="Teléfono o correo"
                  className="h-12 rounded-lg border-border/70 bg-secondary px-space-16"
                  aria-invalid={!!errors.contact}
                  {...register("contact")}
                />
                {errors.contact ? (
                  <p className="text-sm leading-[1.4] text-destructive">
                    {errors.contact.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-space-8">
                <Label
                  htmlFor="custom-idea"
                  className="text-sm font-medium text-fg-primary"
                >
                  Cuéntame tu idea
                </Label>
                <Textarea
                  id="custom-idea"
                  placeholder="Ej. Un conejito tejido en tonos rosa y crema para regalo..."
                  className="min-h-40 rounded-lg border-border/70 bg-secondary px-space-16 py-space-16"
                  aria-invalid={!!errors.idea}
                  {...register("idea")}
                />
                {errors.idea ? (
                  <p className="text-sm leading-[1.4] text-destructive">
                    {errors.idea.message}
                  </p>
                ) : null}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-space-24 h-12 w-full rounded-full bg-primary px-space-24 text-base font-semibold leading-6 text-primary-400 shadow-[0_12px_24px_rgba(243,194,255,0.42)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-primary-100 hover:shadow-[0_16px_28px_rgba(243,194,255,0.48)] active:scale-[0.98]"
            >
              <Send className="size-5" aria-hidden="true" />
              Envía tu idea por WhatsApp
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default CustomOrderSection;
