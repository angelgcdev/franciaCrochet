"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="h-[90vh]">
      <Card className="bg-[#F9EFEE] h-full">
        <CardContent className="h-full">
          <div className="h-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center sm:w-[90%] lg:w-[80%] mx-auto">
            <div className="grid justify-items-center h-[50%] flex-2 sm:flex-1 grid-rows-[auto_auto_auto_auto] text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start w-full row-start-2">
                <Heart className="text-[#DC999E] fill-[#DC999E]" />
                <Badge
                  variant="secondary"
                  className="uppercase tracking-wider text-xs md:text-sm text-gray-500"
                >
                  Hecho a mano con amor
                </Badge>
              </div>

              <h1
                className={`font-bold text-[#592525] leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl row-start-3`}
              >
                Tejidos hechos con amor 💕 para los más pequeños del hogar
              </h1>

              <p className="text-muted-foreground leading-relaxed tracking-normal text-base row-start-4">
                Cada pieza es única, tejida con dedicación y cariño para crear
                recuerdos especiales que durarán toda la vida.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 row-start-5">
                <Button
                  className="text-base font-semibold rounded-full bg-[#DC999E] hover:bg-[#C27E84] tracking-wide"
                  onClick={scrollToProducts}
                >
                  Ver catálogo
                </Button>
                <Button
                  variant="outline"
                  className="text-base font-semibold rounded-full bg-transparent tracking-wide hover:bg-[#A68F72]"
                  asChild
                >
                  <a
                    href="https://wa.me/1234567890?text=Hola%20👋%20quiero%20conocer%20más%20sobre%20tus%20productos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contactar por WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex-1 rounded-2xl overflow-hidden self-center">
              <Image
                src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762225304/imagen_tcwipe.jpg"
                alt="Productos tejidos a mano"
                width={500}
                height={500}
                className=" object-cover rounded-2xl
                  w-full h-auto
                  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                loading="lazy"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HeroSection;
