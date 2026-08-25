import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Proyectos from "@/components/Proyectos";
import AtractivosValle from "@/components/AtractivosValle";
import Testimonios from "@/components/Testimonios";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getSiteContent, getProjectsContent, getTestimoniosContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();
  const allProjects = await getProjectsContent();
  const projects = allProjects.filter((p) => p.activo !== false && !p.clausurado);
  const testimonies = await getTestimoniosContent();

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
