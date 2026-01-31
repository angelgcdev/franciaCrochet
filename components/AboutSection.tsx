import Image from "next/image";

const AboutSection = () => {
  return (
    <>
      <section id="sobre-mi" className="h-[90vh] scroll-mt-[10vh]">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center gap-4">
          <p className="row-start-1 uppercase text-muted-foreground text-start self-start">
            Sobre mi
          </p>

          <div className="flex flex-col sm:flex-row h-[80%] sm:h-[70%] gap-4 sm:gap-8 items-center lg:w-[80%] xl:w-[70%] 2xl:w-[60%]">
            <div className="flex flex-col h-full items-center justify-center gap-4 flex-1 text-center sm:text-end">
              <p
                className={`font-bold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl row-start-2`}
              >
                Cada puntada cuenta una historia
              </p>

              <p className="text-[#6E6666] leading-relaxed tracking-normal text-base md:text-lg row-start-3">
                Soy Francia, artesana apasionada del crochet, creando piezas
                únicas que acompañan y cuidan a los más pequeños del hogar.
              </p>
              <p className="text-[#6E6666] leading-relaxed tracking-normal text-base md:text-lg row-start-3">
                Cada producto nace del amor y la paciencia, usando solo
                materiales de alta calidad para proteger la delicada piel de tu
                bebé y brindarle comodidad en cada momento.
              </p>
              <p className="text-[#6E6666] leading-relaxed tracking-normal text-base md:text-lg row-start-3">
                Me especializo en ropita para bebés y amigurumis personalizados
                que se convierten en los compañeros perfectos para los primeros
                años de vida.
              </p>
            </div>

            {/* Imagen */}
            <div className="relative w-[50%] sm:w-full  h-[20vh] sm:h-[90%] mx-auto flex-1 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://res.cloudinary.com/dngkwtctt/image/upload/v1762649073/Generated_Image_November_08_2025_-_8_04PM_yc8stk.png"
                alt="Descripción de la imagen"
                fill
                className="object-cover transform transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
