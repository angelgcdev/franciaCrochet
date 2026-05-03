"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Box, ChartSpline } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();

  // Mapa de títulos según la ruta actual
  const currentPage = useMemo(() => {
    if (pathname.includes("/admin/dashboard"))
      return { title: "Dashboard", icon: ChartSpline };
    if (pathname.includes("/admin/products"))
      return { title: "Productos", icon: Box };
    return { title: "Social Media Droid", icon: ChartSpline }; // fallback
  }, [pathname]);

  const Icon = currentPage.icon;

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-secondary-400 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          <h1 className="text-lg font-bold">{currentPage.title}</h1>
        </div>{" "}
      </div>
    </header>
  );
}
