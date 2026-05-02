"use client";

import Image from "next/image";
import { Playwrite_US_Trad } from "next/font/google";
import { motion } from "framer-motion";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="bg-white px-space-24 py-20 scroll-mt-20 md:py-24">
      <div className="section-shell">
        <div className="thread-divider" />

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-primary/20 bg-secondary/60" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-xl shadow-primary/10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649073/Generated_Image_November_08_2025_-_8_04PM_yc8stk.png"
                  alt="Francia Crochet trabajando piezas artesanales"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center lg:text-left"
          >
            <p className="stitch-caption font-semibold uppercase tracking-[0.25em] text-primary">
              Sobre mí
            </p>
            <h2
              className={`${playwriteUS.className} stitch-h2 mt-4 font-semibold text-foreground`}
            >
              Cada puntada cuenta una historia
            </h2>
            <div className="stitch-body mt-6 space-y-4 text-muted-foreground">
              <p>
                Soy Francia, artesana apasionada del crochet. Creo piezas
                únicas que acompañan y cuidan a los más pequeños del hogar.
              </p>
              <p>
                Cada producto nace del amor y la paciencia, usando materiales
                de calidad para proteger la delicada piel de tu bebé y darle
                comodidad en cada momento.
              </p>
              <p>
                Me especializo en ropita para bebés, accesorios y amigurumis
                personalizados que se convierten en compañeros para los
                primeros años de vida.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
