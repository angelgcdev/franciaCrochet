import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María González",
    text: "La mantita que compré para mi bebé es hermosa y de excelente calidad. Se nota el amor con el que está hecha. ¡Totalmente recomendado!",
    rating: 5,
  },
  {
    id: 2,
    name: "Laura Martínez",
    text: "El amigurumi que pedí para mi hija es adorable. Francia es muy atenta y el trabajo es impecable. Volveré a comprar sin duda.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    text: "Compré un conjunto de gorro y botitas y quedé encantada. Los colores son preciosos y la calidad es increíble. ¡Gracias Francia!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-[#F2EADF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-pretty leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
