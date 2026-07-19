import localFont from "next/font/local";

export const grotesk = localFont({
  src: [
    { path: "../public/fonts/NHaasGroteskTXPro-55Rg.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/NHaasGroteskTXPro-65Md.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/NHaasGroteskTXPro-75Bd.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

export const groteskDisplay = localFont({
  src: [
    { path: "../public/fonts/NHaasGroteskDSPro-25Th.otf", weight: "300", style: "normal" },
  ],
  variable: "--font-grotesk-display",
  display: "swap",
});

export const breeSerif = localFont({
  src: [{ path: "../public/fonts/BreeSerif-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-bree-serif",
  display: "swap",
});
