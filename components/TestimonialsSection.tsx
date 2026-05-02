"use client";

import { Playwrite_US_Trad } from "next/font/google";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const testimonials = [
  {
    id: 1,
    name: "olauwu_ mari",
    text: "Muy bonito trabajo, lo recomiendo. Hice mi pedido, llegó súper bien y es confiable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Laura Martínez",
    text: "El amigurumi que pedí para mi hija es adorable. Francia es muy atenta y el trabajo es impecable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    text: "Compré un conjunto de gorro y botitas. Los colores son preciosos y la calidad es increíble.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="experiencias"
      className="bg-white py-20 scroll-mt-20 md:py-24"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="stitch-caption font-semibold uppercase tracking-[0.25em] text-primary">
            Experiencias
          </p>
          <h2
            className={`${playwriteUS.className} stitch-h2 mt-4 font-semibold text-foreground`}
          >
            Lo que dicen nuestros clientes
          </h2>
          <p className="stitch-body mt-4 text-muted-foreground">
            La mejor parte de cada pedido es saber que una pieza tejida llegó a
            una nueva historia.
          </p>
        </motion.div>

        <div className="thread-divider" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card className="h-full rounded-2xl border-border/80 bg-background p-6 shadow-lg shadow-primary/5">
                <CardContent className="flex h-full flex-col px-0 py-0">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-6 fill-accent text-accent"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="stitch-body flex-1 text-muted-foreground">
                    “{testimonial.text}”
                  </p>
                  <p className="stitch-body mt-6 font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
