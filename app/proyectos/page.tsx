import type { Metadata } from "next";
import ProyectosExpand from "@/components/ProyectosExpand";
import Reveal from "@/components/Reveal";
import UnifiedContactFooter from "@/components/UnifiedContactFooter";
import { getProjectsContent, getSiteContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Proyectos | Tutierra Grupo Inmobiliario",
  description: "Descubre los proyectos inmobiliarios de Tutierra en el Valle Sagrado, Cusco.",
};

export default async function ProyectosPage() {
  const projectsData = await getProjectsContent();
  const allDbProjects = projectsData.filter((p) => p.activo !== false);

  // 1. Proyectos Activos (En Venta)
  const proyectosEnVenta = allDbProjects.filter(
    (p) => !p.clausurado && (p.lotesDisponiblesPct ?? 100) > 0
  );

  // 2. Proyectos Concluidos
  const dbConcluidos = allDbProjects
    .filter((p) => p.clausurado === true || p.lotesDisponiblesPct === 0)
    .map((p) => ({ id: p.slug, nombre: p.nombre, ubicacion: p.ubicacion, logo: p.logo }));

  const siteContent = await getSiteContent();
  const manualConcluidos = siteContent.general?.proyectosConcluidos || [];

  const proyectosConcluidos = [...dbConcluidos, ...manualConcluidos];

  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-[50dvh] w-full flex-col justify-center pt-[35%] pb-[4%] md:pt-[12%]">
        <div className="mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">PROYECTOS</p>
          <h1 className="mt-[0.4em] max-w-[24ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            Desarrollos en el corazón del Valle Sagrado
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            Cada proyecto Tutierra cuenta con saneamiento físico legal garantizado e
            independización individual por lote.
          </p>
        </div>
      </section>

      {/* Proyectos En Venta (Desplegable Acordeón) */}
      <section className="flex flex-col justify-center pb-[8%]">
        <div className="mx-auto w-[90%]">
          <div className="mb-6 flex items-center justify-between border-b border-brand-gray/10 pb-4">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light text-brand-gray">
              Proyectos <span className="font-serif italic text-tech-green">En Venta</span>
            </h2>
            <span className="text-[0.85rem] text-brand-gray/60 bg-white/[0.04] border border-brand-gray/10 px-4 py-1.5 rounded-full font-medium">
              {proyectosEnVenta.length} Disponibles
            </span>
          </div>

          <ProyectosExpand items={proyectosEnVenta} />
          <p className="mt-[1.4em] text-[0.8rem] text-brand-gray/45 hidden lg:block text-center">
            Pasa el cursor sobre cada proyecto para descubrirlo.
          </p>
        </div>
      </section>

      {/* Sección Proyectos Concluidos */}
      {proyectosConcluidos.length > 0 && (
        <section className="w-full pb-[10%] pt-[4%] border-t border-brand-gray/10">
          <div className="mx-auto w-[90%]">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <p className="text-[0.8rem] tracking-[0.2em] uppercase text-tech-green font-semibold">
                    Historial de Éxito
                  </p>
                  <h2 className="mt-[0.2em] font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-brand-gray">
                    Proyectos <span className="font-serif italic text-brand-gray/60">Concluidos</span>
                  </h2>
                </div>
                <p className="max-w-[40ch] text-[0.95rem] text-brand-gray/60 leading-[1.6]">
                  Desarrollos 100% entregados e independizados a sus propietarios en el Valle Sagrado.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosConcluidos.map((proyecto: any, idx: number) => (
                <Reveal key={proyecto.id || idx} delay={idx * 0.1}>
                  <div className="relative flex flex-col items-center justify-between rounded-[1.5rem] border border-brand-gray/15 bg-white/[0.02] p-8 text-center min-h-[200px] select-none">
                    <div className="flex w-full justify-between items-center mb-6">
                      <span className="text-[0.75rem] uppercase tracking-wider text-brand-gray/50 font-medium truncate max-w-[60%]">
                        {proyecto.ubicacion}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-tech-green/30 bg-tech-green/10 px-3 py-1 text-[0.7rem] font-semibold text-tech-green uppercase tracking-wider shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-tech-green" />
                        CONCLUIDO
                      </span>
                    </div>

                    <div className="my-auto flex h-[4.5rem] w-full items-center justify-center py-2">
                      {proyecto.logo ? (
                        <img
                          src={proyecto.logo}
                          alt={proyecto.nombre}
                          className="max-h-full max-w-[80%] object-contain filter brightness-0 invert opacity-75"
                        />
                      ) : (
                        <h3 className="font-display text-[1.3rem] font-light text-brand-gray/80">
                          {proyecto.nombre}
                        </h3>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <UnifiedContactFooter />
    </>
  );
}
