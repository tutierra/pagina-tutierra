import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ImageGallery from "@/components/ImageGallery";
import TestimoniosInteractiveSection from "@/components/TestimoniosInteractiveSection";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getTestimoniosContent, getSiteContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Testimonios | Tutierra Grupo Inmobiliario",
  description:
    "Descubre las opiniones y experiencias de las familias que ya invirtieron en terrenos saneados de Tutierra en Cusco y el Valle Sagrado.",
};

export default async function TestimoniosPage() {
  const testimonios = await getTestimoniosContent();
  const siteContent = await getSiteContent();
  const heroImages = siteContent.general?.testimoniosHeroImages && siteContent.general.testimoniosHeroImages.length > 0
    ? siteContent.general.testimoniosHeroImages
    : testimonios.map((t) => t.imagen);

  const pageTitle = siteContent.general?.testimoniosTitle || "Familias que ya construyen su patrimonio con nosotros";
  const pageDesc = siteContent.general?.testimoniosDescription || "Conoce las historias y experiencias reales de quienes han invertido en terrenos con saneamiento urbano e independización garantizada en el Valle Sagrado de Cusco.";

  const renderStyledTitle = (text: string) => {
    const words = text.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(" ")}{" "}
          <span className="font-serif italic text-tech-green">{lastWord}</span>
        </>
      );
    }
    return text;
  };

  return (
    <div id="testimonios-page-root">
      {/* Hero Section */}
      <section className="relative overflow-hidden flex min-h-dvh w-full flex-col justify-center items-center text-center pt-[35%] pb-[8%] md:pt-[15%] md:pb-[4%]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <ImageGallery images={heroImages} />
        </div>

        <div className="relative mx-auto w-[90%] flex flex-col items-center z-10">
          <Reveal>
            <div className="flex justify-center mb-[1em]">
              <img
                src="/emblem-white.png"
                alt="Tutierra"
                className="h-[3rem] w-auto object-contain"
              />
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="mt-[0.5em] max-w-[28ch] font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] text-brand-gray text-center">
              {renderStyledTitle(pageTitle)}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-[1.2em] max-w-[54ch] text-[1.1rem] leading-[1.7] text-brand-gray/70">
              {pageDesc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Interactive 3D Carousel of Testimonials */}
      <TestimoniosInteractiveSection testimonios={testimonios} />

      <UnifiedContactFooter />
    </div>
  );
}
