import Image from "next/image";
import { Playwrite_US_Trad } from "next/font/google";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

function Footer() {
  const message = "Hola 👋 quiero conocer más sobre tus productos";

  return (
    <footer
      id="contacto"
      className="border-t border-border/70 bg-[linear-gradient(180deg,#fff8f7_0%,#f7dcdf_100%)]"
    >
      <div className="section-shell py-space-48 md:py-space-64">
        <div className="grid gap-space-48 md:grid-cols-[1fr_1fr_1fr]">
          <div className="flex flex-col gap-space-16">
            <div
              className={`${playwriteUS.className} stitch-h2 font-bold text-primary`}
            >
              <h2>Francia Crochet</h2>
            </div>
            <p className="stitch-body max-w-md text-fg-muted">
              Tejidos artesanales hechos con amor para bebés, regalos
              especiales y pedidos personalizados.
            </p>
          </div>

          <div className="flex flex-col gap-space-16">
            <h3 className="stitch-h2 font-semibold text-fg-primary">
              Contáctame
            </h3>
            <p className="stitch-body text-fg-muted">
              ¿Tienes una idea o quieres consultar disponibilidad? Escríbeme y
              la tejemos juntas.
            </p>
            <Button
              variant="outline"
              className="stitch-button w-fit border-primary/30 bg-white/75 text-primary hover:bg-secondary-100"
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
                Enviar mensaje
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-space-16">
            <h3 className="stitch-h2 font-semibold text-fg-primary">
              Síguenos en
            </h3>
            <div className="flex gap-space-16">
              {[
                { label: "TikTok", href: "https://www.tiktok.com/@wfrancia.crochet_", icon: "/tiktok.svg" },
                { label: "Instagram", href: "https://www.instagram.com/francia.crochet_/", icon: "/instagram.svg" },
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582653155695", icon: "/facebook.svg" },
              ].map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="outline"
                  className="size-12 rounded-2xl border-primary/25 bg-white/75 hover:bg-secondary-100"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Image src={social.icon} alt="" width={24} height={24} />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="stitch-caption mt-space-48 border-t border-border/70 pt-space-24 text-center">
          <p>
            © {new Date().getFullYear()} Francia Crochet. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
