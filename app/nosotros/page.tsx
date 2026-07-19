import type { Metadata } from "next";
import Image from "next/image";
import Manifesto from "@/components/Manifesto";
import CtaDoble from "@/components/CtaDoble";

export const metadata: Metadata = {
  title: "Nosotros | Tutierra Grupo Inmobiliario",
  description: "Conoce la historia, misión, visión y valores de Tutierra Grupo Inmobiliario.",
};

const VALORES = [
  {
    titulo: "Sostenibilidad",
    texto: "Cada proyecto respeta el paisaje andino y minimiza su impacto ambiental.",
  },
  {
    titulo: "Transparencia",
    texto: "Información legal clara y saneamiento garantizado en cada lote.",
  },
  {
    titulo: "Familia",
    texto: "Creamos y unimos familias construyendo patrimonio real y duradero.",
  },
  {
    titulo: "Innovación",
    texto: "Procesos digitales y acompañamiento cercano durante toda la inversión.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative flex min-h-dvh w-full items-end overflow-hidden pt-[35%] pb-[6%] md:pt-[12%]">
        <Image
          src="/images/nosotros/oficina.jpg"
          alt="Equipo Tutierra"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="relative mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">NOSOTROS</p>
          <h1 className="mt-[0.4em] max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            Construimos confianza, un terreno a la vez.
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            Tutierra nació en Cusco con un propósito claro: transformar tierras del Valle
            Sagrado en oportunidades de inversión seguras, sostenibles y con respaldo legal
            real para cada familia.
          </p>
        </div>
      </section>

      <Manifesto />

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[03] VALORES</p>
          <h2 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
            Lo que nos guía
          </h2>

          <div className="mt-[3em] grid grid-cols-1 gap-[2em] sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((valor) => (
              <div key={valor.titulo} className="border-t border-brand-gray/15 pt-[1.5em]">
                <h3 className="font-display text-[1.15rem] font-normal text-brand-gray">
                  {valor.titulo}
                </h3>
                <p className="mt-[0.6em] text-[0.9rem] leading-[1.6] text-brand-gray/65">
                  {valor.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto grid w-[90%] grid-cols-1 items-center gap-[3em] md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem]">
            <Image
              src="/images/nosotros/equipo.jpg"
              alt="Equipo Tutierra"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[04] EQUIPO</p>
            <h2 className="mt-[0.4em] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-brand-gray">
              Personas detrás de cada proyecto
            </h2>
            <p className="mt-[1em] max-w-[46ch] text-[1rem] leading-[1.7] text-brand-gray/75">
              Un equipo multidisciplinario de asesores legales, ingenieros y especialistas
              comerciales acompaña a cada cliente desde la elección del lote hasta la
              independización final.
            </p>
          </div>
        </div>
      </section>

      <CtaDoble />
    </>
  );
}
