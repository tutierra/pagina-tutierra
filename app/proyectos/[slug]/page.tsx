import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProyectoCard from "@/components/ProyectoCard";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import Reveal from "@/components/Reveal";
import ProyectoCarousel from "@/components/ProyectoCarousel";
import InteractiveMasterPlan from "@/components/InteractiveMasterPlan";
import { getProjectsContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export function slugify(text: string): string {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function findMatchingProyecto(projects: any[], targetSlug: string) {
  const decoded = decodeURIComponent(targetSlug || "").trim().toLowerCase();
  const targetSlugified = slugify(decoded);

  return projects.find((p: any) => {
    const pSlug = (p.slug || "").trim().toLowerCase();
    const pId = (p.id || "").toString().trim().toLowerCase();
    const pNombreSlug = slugify(p.nombre || p.title || p.name || "");

    return (
      pSlug === decoded ||
      pId === decoded ||
      pNombreSlug === decoded ||
      pSlug === targetSlugified ||
      pNombreSlug === targetSlugified ||
      pSlug === targetSlug ||
      pId === targetSlug
    );
  });
}

export async function generateStaticParams() {
  const projectsData = await getProjectsContent();
  const projects = projectsData.filter((p) => p.activo !== false && !p.clausurado);
  return projects.map((p) => ({ slug: p.slug || slugify(p.nombre) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjectsContent();
  const proyecto = findMatchingProyecto(projects, slug);
  if (!proyecto || proyecto.clausurado || proyecto.activo === false) return {};
  return {
    title: `${proyecto.nombre} | Tutierra Grupo Inmobiliario`,
    description: proyecto.resumen,
  };
}

export default async function ProyectoDetailPage({ params }: Props) {
  const { slug } = await params;
  const projects = await getProjectsContent();
  const proyecto = findMatchingProyecto(projects, slug);
  
  if (!proyecto || proyecto.clausurado || proyecto.activo === false) {
    notFound();
  }

  const pSlug = proyecto.slug || proyecto.id;
  const otros = projects.filter((p) => (p.slug !== pSlug && p.id !== pSlug) && p.activo !== false && !p.clausurado).slice(0, 3);
  const imagenPlano = proyecto.galeria[2] || proyecto.imagenPrincipal;

  const mapQuery = proyecto.mapLink || proyecto.ubicacion;
  const mapsEmbedUrl = mapQuery.startsWith("http") 
    ? mapQuery 
    : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      {/* HERO SECTION WITH VIDEO */}
      <section className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <video
            src={proyecto.videoHero || "/videos/chinchero-bg.mp4"}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/20" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <div className="flex justify-center mb-4">
              <img
                src={proyecto.logo || "/emblem-white.png"}
                alt={proyecto.nombre}
                className="h-[4.5rem] w-[12rem] object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <span className="text-[0.8rem] tracking-[0.3em] text-tech-green uppercase font-semibold block drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
              PROYECTO EXCLUSIVO
            </span>
          </Reveal>

          <Reveal delay={0.24}>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-none text-brand-gray tracking-wide mt-2 uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              {proyecto.nombre}
            </h1>
          </Reveal>

          <Reveal delay={0.36}>
            <p className="font-serif italic text-tech-green text-[clamp(1.1rem,2vw,1.4rem)] mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {proyecto.resumen}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GENERAL DATA SECTION */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%] bg-transparent">
        <div className="mx-auto w-[90%]">
          <div className="grid grid-cols-1 gap-[3.5rem] lg:grid-cols-[1fr_1.1fr] items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[0.85rem] tracking-[0.2em] text-tech-green uppercase font-semibold">Datos Generales</p>
                  <h2 className="mt-[0.4em] max-w-[20ch] font-display text-[clamp(2rem,3.5vw,2.8rem)] font-light text-brand-gray">
                    Ubicación de alta plusvalía en Cusco
                  </h2>
                  <p className="mt-[1em] max-w-[48ch] text-[1rem] leading-[1.7] text-brand-gray/70">
                    {proyecto.descripcion}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-brand-gray/15 pt-6">
                  <div>
                    <p className="text-[0.8rem] text-brand-gray/55 uppercase tracking-wider">Áreas de los Lotes</p>
                    <p className="font-display text-[1.4rem] font-light text-tech-green mt-1">
                      {proyecto.extension}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] text-brand-gray/55 uppercase tracking-wider">Precio Desde</p>
                    <p className="font-display text-[1.4rem] font-light text-tech-green mt-1">
                      {proyecto.precioDesde}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-brand-gray/15 pt-6">
                  <p className="text-[0.8rem] text-brand-gray/55 uppercase tracking-wider">Características Destacadas</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {(proyecto.caracteristicas || []).map((c: string) => (
                      <li key={c} className="flex items-start gap-[0.5rem] text-[0.9rem] text-brand-gray/75">
                        <span className="text-tech-green mt-[0.1em]">✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-brand-gray/10 bg-white/[0.02] p-[0.5rem] ring-1 ring-white/10">
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1.2rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MASTER PLAN */}
      <InteractiveMasterPlan imagenPlano={imagenPlano} amenities={proyecto.masterPlanAmenities} />

      {/* GALLERY */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%] bg-transparent">
        <div className="mx-auto w-[90%]">
          <Reveal>
            <div className="mb-8">
              <p className="text-[0.85rem] tracking-[0.2em] text-tech-green uppercase font-semibold">Galería de Imágenes</p>
              <h2 className="mt-[0.4em] font-display text-[clamp(2rem,3.5vw,2.8rem)] font-light text-brand-gray">
                Vistas del Proyecto
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ProyectoCarousel imagenes={proyecto.galeria} />
          </Reveal>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%] bg-transparent">
        <div className="mx-auto w-[90%]">
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light text-brand-gray">
            Otros proyectos
          </h2>
          <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((p) => (
              <ProyectoCard key={p.slug || p.id} proyecto={p} />
            ))}
          </div>
        </div>
      </section>

      <UnifiedContactFooter />
    </>
  );
}
