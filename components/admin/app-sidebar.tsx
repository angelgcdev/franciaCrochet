"use client";

import { Handlee } from "next/font/google";

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
import { Box, CircleGauge, Users } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useMemo, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const { state } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = useMemo(() => {
    const items = [...data.navMain];
    if (session?.user?.role === "SUPERUSER") {
      items.push({
        title: "Usuarios",
        url: "/admin/users",
        icon: Users,
      });
    }
    return items;
  }, [session]);


  const user = {
    email: session?.user?.email || "usuario@ejemplo.com",
    name: session?.user?.name || "Usuario",
    avatar: session?.user?.image || "/images/user.png",
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
                <div className="relative size-12 bg-primary rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="logo de la empresa"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <span
                  className={`text-[clamp(20px,2vw,24px)] font-bold text-primary-400 ${handlee.className}`}
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
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="bg-secondary-200">
        {mounted && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
