"use client";

import Image from "next/image";
import { Playwrite_US_Trad } from "next/font/google";
import { ArrowDown, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const message = "Hola 👋 quiero conocer más sobre tus productos";

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fff8f7_0%,#f7dcdf_100%)] scroll-mt-20 flex min-h-screen w-full items-center"
    >
      <div className="absolute inset-x-0 top-0 h-24 yarn-line opacity-30" />
      <div className="absolute -left-24 top-32 size-64 rounded-2xl border border-primary/20" />
      <div className="absolute -right-32 bottom-16 size-80 rounded-2xl border border-accent/20" />

      <div className="section-shell relative grid items-center gap-12 md:grid-cols-2 py-space-64">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <p className="stitch-caption mb-space-16 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white/75 px-space-16 py-space-8 font-medium text-primary shadow-sm">
            <Heart className="size-5 fill-primary" aria-hidden="true" />
            Tejidos hechos a mano en Bolivia
          </p>

          <h1
            className={`${playwriteUS.className} stitch-h1 max-w-3xl font-bold text-fg-primary`}
          >
            Francia Crochet
          </h1>

          <p className="stitch-h2 mt-space-16 max-w-2xl font-semibold text-fg-secondary">
            Piezas suaves, únicas y tejidas con paciencia para acompañar los
            primeros abrazos de tu bebé.
          </p>

          <p className="stitch-body mt-space-16 max-w-2xl text-fg-muted">
            Cada amigurumi, conjunto y accesorio nace con materiales pensados
            para la comodidad de los más pequeños y la emoción de regalar algo
            hecho a mano.
          </p>

          <div className="mt-space-32 flex w-full flex-col gap-space-16 min-[520px]:w-auto min-[520px]:flex-row">
            <Button
              className="stitch-button bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-500 active:bg-primary-600"
              onClick={scrollToProducts}
            >
              Ver catálogo
              <ArrowDown className="ml-2 size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              className="stitch-button border-primary/30 bg-white/80 text-primary hover:bg-secondary-200"
              asChild
            >
              <a
                href={`https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                  message,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 size-5" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* Decorative Backdrops */}
          <div className="absolute -left-space-8 top-space-8 z-0 hidden h-32 w-32 rounded-2xl bg-white/70 shadow-xl md:block" />
          <div className="absolute -right-space-8 bottom-space-16 z-0 hidden h-24 w-24 rounded-2xl bg-secondary-300 shadow-lg md:block" />
          
          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/80 bg-white p-space-8 shadow-2xl shadow-primary/10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary-200">
              <Image
                src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649139/Adobe_Express_-_file_2_fefo0x.png"
                alt="Muñeco tejido de Francia Crochet"
                fill
                priority
                className="object-contain p-space-24 transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Floating Artisan Tag */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -right-space-16 -top-space-16 z-20 hidden rounded-full bg-accent-foreground px-space-16 py-space-8 text-sm font-bold text-white shadow-lg md:block"
          >
            100% Artesanal
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
