import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Proyectos from "@/components/Proyectos";
import AtractivosValle from "@/components/AtractivosValle";
import Testimonios from "@/components/Testimonios";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getSiteContent, getProjectsContent, getTestimoniosContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const content = getSiteContent();
  // Solo incluye proyectos activos y que NO estén culminados/clausurados
  const projects = getProjectsContent().filter((p) => p.activo !== false && !p.clausurado);
  const testimonies = getTestimoniosContent();

  return (
    <>
      <Hero content={content.hero} projects={projects} />
      <Proyectos projects={projects} />
      <Manifesto content={content.manifesto} />
      <AtractivosValle bgImage={content.general?.valleBgImage} />
      <Testimonios testimonies={testimonies} />
      <UnifiedContactFooter />
    </>
  );
}
