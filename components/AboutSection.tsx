"use client";

import Image from "next/image";
import { Handlee } from "next/font/google";
import { motion } from "framer-motion";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

const AboutSection = () => {
  return (
    <section
      id="sobre-mi"
      className="bg-[linear-gradient(180deg,#fff7fb_0%,#faf1f6_100%)] px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <div className="grid items-center gap-space-32 lg:grid-cols-[minmax(320px,440px)_minmax(0,1fr)] lg:gap-space-48">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[440px]"
          >
            <div className="absolute inset-0 translate-x-space-8 translate-y-space-8 rounded-[24px] bg-primary-100/50" />
            <div className="relative overflow-hidden rounded-[24px] bg-white p-space-16 shadow-[0_20px_48px_rgba(119,79,132,0.10)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                <Image
                  src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649073/Generated_Image_November_08_2025_-_8_04PM_yc8stk.png"
                  alt="Francia Crochet trabajando piezas artesanales"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-[640px] text-center lg:text-left"
          >
            {/* <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-primary-400">
              Sobre mí
            </p> */}

            <h2
              className={`${handlee.className} mt-space-16 text-[clamp(32px,3.2vw,48px)] leading-[1.2] tracking-[-0.02em] text-primary-400`}
            >
              Cada puntada cuenta una historia
            </h2>

            <div className="mt-space-24 space-y-space-16 text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
              <p>
                Somos un emprendimiento familiar apasionado por crear tejidos
                artesanales hechos a mano con amor, detalle y dedicación.
              </p>
              <p>
                Cada producto nace del amor y la paciencia, usando materiales de
                calidad para proteger la delicada piel de tu bebé y darle
                comodidad en cada momento.
              </p>
              <p>
                Hoy elaboramos amigurumis personalizados, tejidos para bebés,
                llaveros y accesorios artesanales hechos completamente a mano,
                cuidando cada puntada para crear piezas especiales para cada
                cliente. Realizamos envíos a toda Bolivia y también pedidos
                internacionales.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
