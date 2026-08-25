import type { Metadata } from "next";
import Script from "next/script";
import { grotesk, groteskDisplay, breeSerif } from "./fonts";
import GradientCanvas from "@/components/3d/gradient-canvas";
import Nav from "@/components/Nav";
import ScrollJacker from "@/components/ScrollJacker";
import FloatingPills from "@/components/FloatingPills";
import CookieConsent from "@/components/CookieConsent";
import GlobalFooter from "@/components/GlobalFooter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
      <head>
        {/* Preconexión de red para Supabase Storage */}
        <link rel="preconnect" href="https://qqygqderrewsjvoeoqww.supabase.co" />
        <link rel="dns-prefetch" href="https://qqygqderrewsjvoeoqww.supabase.co" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PSVLVRDC');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSVLVRDC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GradientCanvas />
        <ScrollJacker />
        <Nav />
        <main className="flex-1">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <GlobalFooter />
        <FloatingPills />
        <CookieConsent />
      </body>
    </html>
  );
}
