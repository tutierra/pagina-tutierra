import type { Metadata } from "next";
import { PROYECTOS } from "@/lib/site-data";
import ProyectoCard from "@/components/ProyectoCard";

export const metadata: Metadata = {
  title: "Proyectos | Tutierra Grupo Inmobiliario",
  description: "Descubre los 6 proyectos inmobiliarios de Tutierra en el Valle Sagrado, Cusco.",
};

export default function ProyectosPage() {
  return (
    <>
      <section className="flex min-h-dvh w-full flex-col justify-center pt-[35%] pb-[6%] md:pt-[12%]">
        <div className="mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">PROYECTOS</p>
          <h1 className="mt-[0.4em] max-w-[24ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            Seis desarrollos en el corazón del Valle Sagrado
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            Cada proyecto Tutierra cuenta con saneamiento físico legal garantizado e
            independización individual por lote.
          </p>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center pb-[8%]">
        <div className="mx-auto grid w-[90%] grid-cols-1 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3">
          {PROYECTOS.map((proyecto) => (
            <ProyectoCard key={proyecto.slug} proyecto={proyecto} />
          ))}
        </div>
      </section>
    </>
  );
}
