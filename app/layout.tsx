import type { Metadata } from "next";
import { grotesk, groteskDisplay, breeSerif } from "./fonts";
import GradientCanvas from "@/components/3d/gradient-canvas";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollJacker from "@/components/ScrollJacker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutierra | Grupo Inmobiliario",
  description:
    "Desarrollamos proyectos inmobiliarios sostenibles en el Valle Sagrado, Cusco. Creamos y unimos familias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${grotesk.variable} ${groteskDisplay.variable} ${breeSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GradientCanvas />
        <ScrollJacker />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
