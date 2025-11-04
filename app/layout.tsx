import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Cargamos la fuente
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Francia Crochet 🧶",
  description: "Tienda artesanal de tejidos y accesorios crochet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} antialiased`}>{children}</body>
    </html>
  );
}
