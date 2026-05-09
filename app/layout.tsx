import type { Metadata } from "next";
import { Geist_Mono, Handlee, Varela_Round } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "./providers/SessionProvider";
import { CategoriesProvider } from "@/context/CategoryContext";

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handlee = Handlee({
  variable: "--font-handlee",
  weight: "400",
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
        className={`${varelaRound.variable} ${geistMono.variable} ${handlee.variable} bg-background text-foreground antialiased`}
      >
        <SessionProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
