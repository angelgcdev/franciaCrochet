"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const message = "Hola \u{1F44B} quiero conocer más sobre tus productos";

  return (
    <section id="inicio" className="h-[90vh] scroll-mt-[10vh]">
      <div className="container mx-auto px-4 py-12 h-full flex flex-col sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-4 flex-1">
          <h1
            className={`font-bold leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl row-start-2 text-center`}
          >
            Tejidos hechos a mano con amor{" "}
            <span className="inline-block">
              <Heart className="h-10 w-10 text-[#f28080] fill-[#f28080] animate-pulse" />
            </span>{" "}
            para los más pequeños del hogar
          </h1>

          <p className="text-[#6E6666] leading-relaxed tracking-normal text-base md:text-lg row-start-3 text-center">
            Detrás de cada uno de nuestros tejidos hay horas de dedicación y
            mucho amor. Más que un producto, ofrecemos un abrazo cálido que
            protege y acompaña a tus seres queridos, creando recuerdos que
            quedarán en el corazón
          </p>

          <div className="flex flex-col w-full min-[500px]:flex-row min-[500px]:w-auto gap-4 row-start-4  justify-start items-center">
            <Button
              className="text-base font-semibold rounded-full bg-[#F28080] hover:bg-[#F25E5E] tracking-wide cursor-pointer transform transition-transform duration-300 hover:scale-105 w-full min-[500px]:w-auto"
              onClick={scrollToProducts}
            >
              <span style={{ textShadow: "1px 1px 4px #0D0000" }}>
                Ver catálogo
              </span>
            </Button>
            <Button
              variant="outline"
              className="text-base font-semibold bg-transparent border-2 rounded-full tracking-wide hover:bg-[#D9A29E] transform transition-transform duration-300 hover:scale-105 w-full w-full min-[500px]:w-auto"
              asChild
            >
              <a
                href={`https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                  message,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative w-full  h-[20vh] sm:h-full mx-auto flex-1">
          <Image
            src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649139/Adobe_Express_-_file_2_fefo0x.png"
            alt="Descripción de la imagen"
            fill
            className="object-contain transform transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
