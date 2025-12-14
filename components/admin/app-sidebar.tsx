"use client";

import { Playwrite_US_Trad } from "next/font/google";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Box, CircleGauge } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: CircleGauge,
    },
    {
      title: "Productos",
      url: "/admin/products",
      icon: Box,
    },
  ],
};

const playwriteUS = Playwrite_US_Trad({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [email, setEmail] = useState("usuario@ejemplo.com");
  const { state, setOpenMobile } = useSidebar(); // <- aquí obtenés el estado ("expanded" | "collapsed")

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }

    // Obtener rol y actualizar menú si es ADM
    const role = localStorage.getItem("role");
  }, []);

  const user = {
    email,
    avatar: "/images/user.png",
  };

  console.log("Estado del UseSidebar:", state);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-[#f2eade]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-16 hover:bg-[#D9CFCF] focus:bg-[#D9CFCF] active:bg-[#D9CFCF]"
            >
              <a href="#">
                <div className="relative w-14 h-14">
                  <Image
                    src="/images/logo.png"
                    alt="logo de la empresa"
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className={`text-base font-bold text-[#DC999E] ${playwriteUS.className}`}
                >
                  Francia Crochet
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="bg-[#f2eade]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#f2eade]">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
