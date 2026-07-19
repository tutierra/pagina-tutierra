import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROYECTOS } from "@/lib/site-data";
import ProyectoCard from "@/components/ProyectoCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = PROYECTOS.find((p) => p.slug === slug);
  if (!proyecto) return {};
  return {
    title: `${proyecto.nombre} | Tutierra Grupo Inmobiliario`,
    description: proyecto.resumen,
  };
}

export default async function ProyectoDetailPage({ params }: Props) {
  const { slug } = await params;
  const proyecto = PROYECTOS.find((p) => p.slug === slug);
  if (!proyecto) notFound();

  const otros = PROYECTOS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-dvh w-full items-end overflow-hidden pt-[35%] pb-[6%] md:pt-[12%]">
        <Image
          src={proyecto.imagenPrincipal}
          alt={proyecto.nombre}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />

        <div className="relative mx-auto w-[90%]">
          <Link
            href="/proyectos"
            className="text-[0.85rem] text-brand-gray/70 transition-colors duration-200 ease-out hover:text-tech-green"
          >
            ← Todos los proyectos
          </Link>
          <p className="mt-[1em] text-[0.85rem] tracking-[0.2em] text-tech-green">
            {proyecto.ubicacion.toUpperCase()}
          </p>
          <h1 className="mt-[0.3em] max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            {proyecto.nombre}
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            {proyecto.resumen}
          </p>

          <div className="mt-[2em] flex flex-wrap gap-[3em]">
            <div>
              <p className="text-[0.8rem] text-brand-gray/55">Desde</p>
              <p className="font-display text-[1.4rem] font-light text-brand-gray">
                {proyecto.precioDesde}
              </p>
            </div>
            <div>
              <p className="text-[0.8rem] text-brand-gray/55">Área desde</p>
              <p className="font-display text-[1.4rem] font-light text-brand-gray">
                {proyecto.areaDesde}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto grid w-[90%] grid-cols-1 gap-[3em] md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light text-brand-gray">
              Sobre el proyecto
            </h2>
            <p className="mt-[1em] max-w-[60ch] text-[1rem] leading-[1.75] text-brand-gray/75">
              {proyecto.descripcion}
            </p>

            <div className="mt-[3em] grid grid-cols-1 gap-[1.5em] sm:grid-cols-2">
              {proyecto.galeria.slice(1).map((img, i) => (
                <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-[1rem]">
                  <Image
                    src={img}
                    alt={`${proyecto.nombre} imagen ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.2rem] border border-brand-gray/15 p-[8%]">
            <h3 className="font-display text-[1.2rem] font-normal text-brand-gray">
              Características
            </h3>
            <ul className="mt-[1.2em] flex flex-col gap-[0.8em]">
              {proyecto.caracteristicas.map((c) => (
                <li key={c} className="flex items-start gap-[0.6em] text-[0.9rem] text-brand-gray/75">
                  <span className="mt-[0.15em] text-tech-green">✓</span>
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href={`/contactanos?proyecto=${proyecto.slug}`}
              className="mt-[2em] block rounded-full bg-tech-green px-[1.6em] py-[0.9em] text-center text-[0.9rem] text-brand-ink transition-transform duration-160 ease-out hover:scale-[0.97]"
            >
              Agendar visita a este proyecto
            </Link>
          </aside>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto w-[90%]">
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light text-brand-gray">
            Otros proyectos
          </h2>
          <div className="mt-[2em] grid grid-cols-1 gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((p) => (
              <ProyectoCard key={p.slug} proyecto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
