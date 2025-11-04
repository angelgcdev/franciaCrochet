"use client";

import { Playwrite_US_Trad } from "next/font/google";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[10vh]">
      <div className="flex h-full items-center justify-between max-w-[90%] m-auto">
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl font-bold text-[#DC999E] ${playwriteUS.className}`}
          >
            Francia Crochet
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm font-medium hover:text-[#DC999E] transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu with DropdownMenu from shadcn */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="bottom" className="w-48">
            {links.map(({ id, label }) => (
              <DropdownMenuItem
                key={id}
                onSelect={() => scrollToSection(id)}
                className="cursor-pointer"
              >
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
