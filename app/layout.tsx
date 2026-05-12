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
  title: {
    default: "Francia Crochet",
    template: "%s | Francia Crochet",
  },
  description:
    "Tejidos artesanales, amigurumis y pedidos personalizados hechos a mano.",
  metadataBase: new URL("https://francia-crochet.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "https://francia-crochet.vercel.app",
    siteName: "Francia Crochet",
    title: "Francia Crochet — Tejidos Artesanales",
    description:
      "Descubre nuestra colección de tejidos a mano, amigurumis y pedidos personalizados.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Francia Crochet — Tejidos Artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francia Crochet — Tejidos Artesanales",
    description:
      "Tejidos artesanales, amigurumis y pedidos personalizados hechos a mano.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${varelaRound.variable} ${varelaRound.className} ${geistMono.variable} ${handlee.variable} bg-background text-foreground antialiased`}
      >
        <SessionProvider>
          <CategoriesProvider>{children}</CategoriesProvider>
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
