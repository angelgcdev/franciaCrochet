import Image from "next/image";
import { Handlee } from "next/font/google";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

function Footer() {
  const message = "Hola 👋 quiero conocer más sobre tus productos";

  return (
    <footer id="contacto" className="bg-transparent px-space-24">
      <div className="py-space-48 md:py-space-64">
        <div className="text-center flex flex-col gap-8">
          <div className="flex items-center justify-center gap-4">
            <p
              className={`${handlee.className} text-2xl text-primary md:text-primary-400`}
            >
              Hablemos de tu próximo tejido especial{" "}
            </p>
            <div className="flex gap-2">
              {[
                {
                  label: "TikTok",
                  href: "https://www.tiktok.com/@wfrancia.crochet_",
                  icon: "/tiktok.svg",
                },
                {
                  label: "Whatsapp",
                  href: `https://api.whatsapp.com/send?phone=59178614070&text=${encodeURIComponent(
                    message,
                  )}`,
                  icon: "/Whatsapp.svg",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/francia.crochet_/",
                  icon: "/instagram.svg",
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61582653155695",
                  icon: "/facebook.svg",
                },
              ].map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="outline"
                  className="size-12 rounded-2xl border-primary/25 bg-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-primary-100"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Image src={social.icon} alt="" width={36} height={36} />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <p className="text-secondary md:text-fg-muted">
            © {new Date().getFullYear()}{" "}
            <span className={`${handlee.className}`}>Francia Crochet</span>.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
