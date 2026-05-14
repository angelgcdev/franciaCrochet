"use client";

import Image from "next/image";
import { Handlee } from "next/font/google";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { id: "productos", label: "Catálogo" },
  { id: "sobre-mi", label: "Historia" },
  { id: "pedido-personalizado", label: "A medida" },
  { id: "experiencias", label: "Opiniones" },
  { id: "contacto", label: "Contáctame" },
];

const handlee = Handlee({
  weight: "400",
  variable: "--font-handlee",
  subsets: ["latin"],
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-xl px-space-16 shadow-[0_8px_24px_rgba(119,79,132,0.08)] backdrop-blur-md md:px-space-32">
      <div className="section-shell flex h-space-64 items-center justify-between gap-space-16 md:h-[72px]">
        <div
          onClick={() => scrollToSection("inicio")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToSection("inicio");
            }
          }}
          className="flex cursor-pointer items-center justify-center gap-2 transition-transform duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          <div className="relative size-12 overflow-hidden rounded-full border border-primary-200/70 bg-primary shadow-[0_8px_24px_rgba(119,79,132,0.10)]">
            <Image
              src="/images/logo.png"
              alt="Logo de Francia Crochet"
              fill
              priority
              className="object-contain"
              sizes="48px"
            />
          </div>

          <h2
            className={`${handlee.className} truncate text-[clamp(24px,2.5vw,32px)] leading-[1.1] tracking-[-0.02em] text-primary-400 transition-colors duration-200 group-hover:text-primary-400`}
          >
            Francia Crochet
          </h2>
        </div>

        <nav
          className={`${handlee.className} hidden items-center gap-space-24 md:flex`}
        >
          {links.map(({ id, label }) => (
            <button
              suppressHydrationWarning
              key={id}
              onClick={() => scrollToSection(id)}
              className="cursor-pointer rounded-lg px-space-8 py-space-8 text-lg leading-[1.6] text-fg-secondary transition-[color,background-color,transform] duration-200 hover:bg-primary-100/45 hover:text-primary-400 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              {label}
            </button>
          ))}
        </nav>

        <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button
              suppressHydrationWarning
              className="flex size-12 cursor-pointer items-center justify-center rounded-xl border border-border bg-white/92 text-primary-400 shadow-[0_4px_12px_rgba(119,79,132,0.10)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-secondary hover:shadow-[0_6px_16px_rgba(119,79,132,0.12)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 md:hidden"
              aria-label="Abrir menú"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="x-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="size-6" strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="size-6" strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={8}
            className={`${handlee.className} w-56 rounded-2xl border-border bg-white/98 p-space-8 shadow-[0_20px_40px_rgba(119,79,132,0.12)]`}
          >
            {links.map(({ id, label }) => (
              <DropdownMenuItem
                key={id}
                onSelect={() => scrollToSection(id)}
                className="cursor-pointer rounded-xl px-space-16 py-space-8 text-base leading-[1.6] text-fg-secondary outline-none transition-[color,background-color,transform] duration-200 hover:bg-primary-100/45 hover:text-primary-400 focus:bg-secondary focus:text-primary-400 active:scale-[0.98]"
              >
                <div>{label}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
