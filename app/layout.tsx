import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "./providers/SessionProvider";
import { CategoriesProvider } from "@/context/CategoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Francia Crochet",
  description:
    "Tejidos artesanales, amigurumis y pedidos personalizados hechos a mano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background`}
      >
        <SessionProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
