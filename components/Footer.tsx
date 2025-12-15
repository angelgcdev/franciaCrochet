import { Button } from "@/components/ui/button";
import { Playwrite_US_Trad } from "next/font/google";
import Image from "next/image";

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

function Footer() {
  const message = "Hola \u{1F44B} quiero conocer más sobre tus productos";

  return (
    <footer id="contacto" className="bg-[#F9EFEE] border-t border-border/40">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div
              className={`text-2xl font-bold text-[#DC999E] ${playwriteUS.className}`}
            >
              <h1>Francia Crochet</h1>
            </div>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Tejidos artesanales hechos con amor para los más pequeños del
              hogar.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-lg">Contáctame</h4>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              ¿Tienes alguna pregunta o quieres hacer un pedido personalizado?
              ¡Contáctame!
            </p>
            <Button
              variant="outline"
              className="w-fit rounded-full bg-transparent"
              asChild
            >
              <a
                href={`https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                  message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/Whatsapp.svg"
                  alt="Logo de Whatsapp"
                  width={48}
                  height={48}
                />
                Enviar mensaje
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-lg">Síguenos en:</h4>
            <div className="flex gap-4">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-transparent"
                asChild
              >
                <a
                  href="https://www.tiktok.com/@wfrancia.crochet_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src="/tiktok.svg"
                    alt="Logo de tiktok"
                    width={48}
                    height={48}
                  />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-transparent"
                asChild
              >
                <a
                  href="https://www.instagram.com/francia.crochet_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src="/instagram.svg"
                    alt="Logo de tiktok"
                    width={48}
                    height={48}
                  />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full bg-transparent"
                asChild
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61582653155695"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Image
                    src="/facebook.svg"
                    alt="Logo de Facebook"
                    width={48}
                    height={48}
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
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
