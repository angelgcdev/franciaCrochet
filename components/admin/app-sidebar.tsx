"use client";

import * as React from "react";
import { Playwrite_US_Trad } from "next/font/google";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Box, CircleGauge } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import { Separator } from "../ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
  return (
    <Sidebar className="p-0" collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-[#f2eade] py-2 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-16">
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
      <SidebarContent className="p-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
