"use client";

import { Handlee } from "next/font/google";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
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
      className="bg-[linear-gradient(180deg,#fff7fb_0%,#faf1f6_100%)] px-space-16 py-space-48 scroll-mt-20 md:px-space-32 md:py-space-64"
    >
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-[640px] text-center"
        >
          {/* <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-primary-400">
            Experiencias
          </p> */}

          <h2
            className={`${handlee.className} mt-space-16 text-[clamp(32px,3.2vw,48px)] leading-[1.2] tracking-[-0.02em] text-primary-400`}
          >
            La confianza de nuestros clientes nos inspira{" "}
          </h2>

          <p className="mx-auto mt-space-16 max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-fg-secondary">
            Cada opinión refleja el cariño y la dedicación que ponemos en cada
            tejido.
          </p>
        </motion.div>

        <div className="mt-space-48 grid grid-cols-1 gap-space-24 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card className="h-full rounded-[24px] border-transparent bg-white/92 p-space-24 shadow-[0_16px_36px_rgba(119,79,132,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(119,79,132,0.12)]">
                <CardContent className="flex h-full flex-col px-0 py-0">
                  <div className="mb-space-16 flex gap-space-8">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-5 fill-primary-300 text-primary-300"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="flex-1 text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-fg-secondary">
                    “{testimonial.text}”
                  </p>

                  <p
                    className={`${handlee.className} mt-space-24 text-[clamp(22px,1.8vw,28px)] leading-[1.2] tracking-[-0.02em] text-fg-primary`}
                  >
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
