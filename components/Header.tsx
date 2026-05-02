"use client";

import { useState } from "react";
import { Playwrite_US_Trad } from "next/font/google";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "pedido-personalizado", label: "A medida" },
  { id: "experiencias", label: "Experiencias" },
  { id: "contacto", label: "Contacto" },
];

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
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
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 px-space-24 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <div className="section-shell flex h-space-64 items-center justify-between md:h-20">
        <div
          onClick={() => scrollToSection("inicio")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToSection("inicio");
            }
          }}
          className={`${playwriteUS.className} group inline-flex cursor-pointer items-center gap-4 text-primary transition-colors duration-200 hover:text-primary/80 active:scale-95 focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-primary`}
        >
          {/* <span className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-white text-primary shadow-sm transition-transform duration-200 group-hover:-rotate-6 md:size-12 md:rounded-2xl">
            <ShoppingBag className="size-5 md:size-6" aria-hidden="true" />
          </span> */}
          <h2 className="truncate font-bold">Francia Crochet</h2>
        </div>

        <nav className="hidden items-center gap-1 rounded-2xl border border-border/80 bg-white/75 px-2 py-2 shadow-sm md:flex">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="rounded-lg px-4 py-2 text-sm font-medium leading-5 text-foreground/75 transition-colors hover:bg-secondary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {label}
            </button>
          ))}
        </nav>

        <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button
              className="flex size-12 items-center justify-center rounded-2xl border border-border bg-white text-primary shadow-sm md:hidden"
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
            className="w-56 rounded-2xl border-border bg-white p-2 shadow-xl"
          >
            {links.map(({ id, label }) => (
              <DropdownMenuItem
                key={id}
                onSelect={() => scrollToSection(id)}
                className="cursor-pointer rounded-lg text-base leading-6"
              >
                <div className="text-foreground">{label}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
