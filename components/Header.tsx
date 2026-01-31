"use client";

import { Playwrite_US_Trad } from "next/font/google";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const links = [
  { id: "productos", label: "Productos" },
  { id: "sobre-mi", label: "Sobre mí" },
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
    }
  };

  return (
    <header className="h-[10vh] sticky top-0 z-50 w-full border-b border-border/40 bg-background backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-full items-center justify-between max-w-[90%] m-auto">
        <div
          onClick={() => scrollToSection("inicio")}
          tabIndex={0} // Para que sea focusable con teclado
          role="button" // Para accesibilidad, que lo reconozca como botón
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              scrollToSection("inicio");
            }
          }}
          className={`text-2xl font-bold text-primary cursor-pointer 
              ${playwriteUS.className} 
              transition-colors duration-200 
              hover:text-primary/80 
              active:scale-95 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
              `}
        >
          <h1>Francia Crochet</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-[#0D0000] font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu with DropdownMenu from shadcn */}
        <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button className="md:hidden h-10 w-10 p-0 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="x-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-primary" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-8 w-8 text-primary" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="bottom" className="w-48">
            {links.map(({ id, label }) => (
              <DropdownMenuItem
                key={id}
                onSelect={() => scrollToSection(id)}
                className="cursor-pointer text-base"
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
