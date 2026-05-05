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
import { useMemo } from "react";

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
  const email = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("email") || "usuario@ejemplo.com";
    }
    return "usuario@ejemplo.com";
  }, []);
  const { state, setOpenMobile } = useSidebar();

  const user = {
    email,
    avatar: "/images/user.png",
  };

  console.log("Estado del UseSidebar:", state);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-secondary-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-16 hover:bg-secondary-300 focus:bg-secondary-300 active:bg-secondary-300"
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
                  className={`text-base font-bold text-primary-400 ${playwriteUS.className}`}
                >
                  Francia Crochet
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="bg-secondary-200">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-secondary-200">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
