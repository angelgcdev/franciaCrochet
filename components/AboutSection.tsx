import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="h-screen">
      <Card className="bg-[#F9EFEE] h-full">
        <CardContent className="h-full">
          <div className="h-full p-4 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center sm:w-[90%] lg:w-[80%] mx-auto">
            <div
              className="w-full grid justify-items-center items-center [@media(min-width:480px)]:w-[80%] 
sm:flex-1 grid-rows-[auto_auto_auto] gap-8 text-center md:text-left "
            >
              <div className="row-start-1 uppercase text-gray-500 w-full text-start">
                Sobre mí
              </div>

              <h1
                className={`font-bold text-[#443732] leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl row-start-2`}
              >
                Cada puntada cuenta una historia{" "}
              </h1>

              <div className="row-start-3">
                <p className="text-muted-foreground leading-relaxed tracking-normal text-base">
                  Soy Francia, artesana apasionada del crochet con más de 5 años
                  de experiencia creando piezas únicas para los más pequeños del
                  hogar.
                </p>
                <p className="text-muted-foreground leading-relaxed tracking-normal text-base">
                  Cada producto que creo está hecho con materiales
                  hipoalergénicos de la más alta calidad, pensando siempre en la
                  seguridad y comodidad de tu bebé. Mi trabajo es mi pasión, y
                  cada puntada lleva mi amor y dedicación.
                </p>
                <p className="text-muted-foreground leading-relaxed tracking-normal text-base">
                  Me especializo en mantitas, ropita para bebés y amigurumis
                  personalizados que se convierten en los compañeros perfectos
                  para los primeros años de vida.
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center w-full h-full">
              <Image
                src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649073/Generated_Image_November_08_2025_-_8_04PM_yc8stk.png"
                alt="Tejiendo con amor"
                width={500}
                height={500}
                className=" object-cover rounded-2xl
                  w-full h-full md:h-[70%]
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

export default AboutSection;
