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
      className="relative isolate overflow-hidden bg-background px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-[88px]"
    >
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12px 12px, rgba(243, 194, 255, 0.28) 3px, transparent 3px), radial-gradient(circle at 28px 28px, rgba(233, 224, 229, 0.8) 3px, transparent 3px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-space-64 bg-secondary/60" />

      <div className="section-shell relative grid items-center gap-space-32 md:grid-cols-[minmax(0,1fr)_minmax(320px,416px)] md:gap-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex max-w-[440px] flex-col items-start"
        >
          <h1
            className={`${handlee.className} max-w-[360px] text-left text-[clamp(40px,4.8vw,56px)] leading-[1.2] tracking-[-0.02em] text-fg-primary`}
          >
            Tejidos con amor para tu bebé.
          </h1>

          <p className="mt-space-32 max-w-[432px] text-left text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
            Piezas únicas hechas a mano a crochet y palillo. Diseñadas para
            abrazar, abrigar y acompañar los primeros pasos de tu pequeño
            tesoro.
          </p>

          <div className="mt-space-32 flex w-full max-w-[224px] flex-col gap-space-16">
            <Button
              onClick={scrollToProducts}
              className="h-12 w-full cursor-pointer rounded-full bg-primary px-space-24 text-base font-semibold uppercase tracking-[0.01em] text-fg-primary shadow-[0_12px_24px_rgba(243,194,255,0.42)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-primary-100 hover:shadow-[0_16px_28px_rgba(243,194,255,0.48)] active:scale-[0.98]"
            >
              VER CATÁLOGO
            </Button>

            <Button
              variant="outline"
              className="h-12 w-full cursor-pointer rounded-full border-0 bg-primary-400 px-space-24 text-base font-semibold uppercase tracking-[0.01em] text-white shadow-[0_12px_24px_rgba(119,79,132,0.24)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-primary-500 hover:shadow-[0_16px_28px_rgba(119,79,132,0.28)] active:scale-[0.98]"
              asChild
            >
              <a
                href={`https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                  message,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WHATSAPP
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="mx-auto w-full max-w-[416px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(119,79,132,0.14)] transition-transform duration-300 hover:-translate-y-1">
            <Image
              src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649139/Adobe_Express_-_file_2_fefo0x.png"
              alt="Conejo tejido a crochet de Francia Crochet"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 416px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
