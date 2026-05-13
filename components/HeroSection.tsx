"use client";

import Image from "next/image";
import { Handlee } from "next/font/google";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const message = "Hola, quiero conocer más sobre tus productos.";

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] w-full items-center justify-center scroll-mt-20"
    >
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dngkwtctt/image/upload/v1778381057/fondo2-frc_qmq7ja.png"
          alt="Fondo de tejidos y muñeca a crochet"
          fill
          priority
          className="object-cover object-[center_right] md:object-center"
          sizes="100vw"
        />
        {/* Overlay suave en móviles para asegurar legibilidad si la imagen recorta distinto */}
        <div className="absolute inset-0 bg-fg-primary/40 md:bg-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] items-center justify-center px-6 lg:justify-start lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex w-full max-w-[600px] flex-col items-center text-center lg:ml-[5%]"
        >
          <h1
            className={`${handlee.className} text-[clamp(44px,5vw,68px)] leading-[1.2] tracking-[-0.02em] text-secondary md:text-fg-primary`}
          >
            Amigurumis y tejidos hechos a mano con amor, calidad y detalle{" "}
          </h1>

          <p className="mt-12 w-full text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-secondary-400 md:mt-6 md:text-fg-secondary">
            Creamos piezas únicas y personalizadas para momentos especiales e
            inolvidables. Cada tejido está elaborado artesanalmente con
            dedicación y materiales de calidad.
          </p>

          <div className="mt-16 flex w-full flex-col justify-center gap-6 sm:flex-row sm:gap-4 md:mt-8">
            <Button
              onClick={scrollToProducts}
              className="h-12 rounded-full bg-primary-400 px-8 text-sm font-bold tracking-[0.05em] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary-500 hover:shadow-lg"
            >
              Ver Catálogo
            </Button>

            <Button
              asChild
              className="h-12 rounded-full bg-secondary-200 px-8 text-sm font-bold  tracking-[0.05em] text-fg-secondary shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-secondary-400 hover:shadow-lg"
            >
              <a
                href={`https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                  message,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Realiza tu pedido por WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
