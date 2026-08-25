"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface Amenity {
  id: string;
  label: string;
  desc: string;
  icon: any; // Can be ReactNode or image path string
}

const FALLBACK_ICONS: Record<string, React.ReactNode> = {
  seguridad: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  piscina: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  clubhouse: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  parque: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  parrillas: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  mirador: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

const DEFAULT_AMENITIES: Amenity[] = [
  {
    id: "seguridad",
    label: "Garita de Seguridad",
    desc: "Control de acceso peatonal y vehicular vigilado las 24 horas y cerco perimétrico.",
    icon: "seguridad"
  },
  {
    id: "piscina",
    label: "Piscina Climatizada",
    desc: "Piscina templada e integrada con el entorno, ideal para disfrutar en el clima templado del valle.",
    icon: "piscina"
  },
  {
    id: "clubhouse",
    label: "Club House",
    desc: "Salón social de uso común para eventos, equipado con terraza panorámica, BBQ y chimenea central.",
    icon: "clubhouse"
  },
  {
    id: "parque",
    label: "Parque Central",
    desc: "Gran área verde central con juegos infantiles, senderos para caminatas y árboles nativos.",
    icon: "parque"
  },
  {
    id: "parrillas",
    label: "Zona de Parrillas",
    desc: "Estaciones de asado independientes, con mesas de piedra y todo el equipamiento necesario.",
    icon: "parrillas"
  },
  {
    id: "mirador",
    label: "Mirador Panorámico",
    desc: "Punto con vistas despejadas en altura hacia la cordillera y los nevados del Valle Sagrado.",
    icon: "mirador"
  }
];

interface InteractiveMasterPlanProps {
  imagenPlano: string;
  amenities?: { id: string; label: string; desc: string; icon: string }[];
}

export default function InteractiveMasterPlan({ imagenPlano, amenities }: InteractiveMasterPlanProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const listItems = amenities && amenities.length > 0 ? amenities : DEFAULT_AMENITIES;

  const renderIcon = (icon: any, isActive: boolean) => {
    if (typeof icon === "string" && (icon.startsWith("/") || icon.startsWith("http"))) {
      return (
        <img
          src={icon}
          alt=""
          className={`h-5 w-5 object-contain transition-all duration-200 ${
            isActive ? "filter brightness-0" : "filter brightness-0 invert opacity-60"
          }`}
        />
      );
    }
    
    // Si es un id de texto de los fallbacks
    const fallbackId = typeof icon === "string" ? icon : "";
    return FALLBACK_ICONS[fallbackId] || FALLBACK_ICONS.seguridad;
  };

  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%] bg-transparent">
      <div className="mx-auto w-[90%]">
        <Reveal>
          <div className="mb-12 text-center lg:text-left">
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green uppercase font-semibold">Master Plan</p>
            <h2 className="mt-[0.4em] font-display text-[clamp(2rem,3.5vw,2.8rem)] font-light text-brand-gray">
              Distribución de Terrenos y Áreas Comunes
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-[3.5rem] lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Left Column: Fixed High Quality Plan Image */}
          <Reveal>
            <div className="relative w-full aspect-[16/10] border border-brand-gray/10 bg-white/[0.01] rounded-[1.5rem] p-[0.5rem] ring-1 ring-white/5 overflow-hidden group">
              <div className="relative w-full h-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src={imagenPlano}
                  alt="Plano del Proyecto"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </Reveal>

          {/* Right Column: Amenities list with hover highlight */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4">
              {listItems.map((a) => {
                const isActive = activeId === a.id;
                return (
                  <div
                    key={a.id}
                    onMouseEnter={() => setActiveId(a.id)}
                    onMouseLeave={() => setActiveId(null)}
                    className={`flex items-start gap-4 p-4 rounded-[1.2rem] border transition-all duration-200 cursor-default ${
                      isActive
                        ? "border-tech-green bg-white/[0.04] translate-x-2"
                        : "border-brand-gray/10 bg-white/[0.01]"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-tech-green text-brand-ink scale-105"
                          : "bg-white/5 text-brand-gray/60"
                      }`}
                    >
                      {renderIcon(a.icon, isActive)}
                    </span>

                    <div className="flex flex-col">
                      <h3
                        className={`font-display text-[1.1rem] font-normal transition-colors duration-200 ${
                          isActive ? "text-tech-green" : "text-brand-gray"
                        }`}
                      >
                        {a.label}
                      </h3>
                      <p className="mt-[0.2em] text-[0.88rem] leading-[1.5] text-brand-gray/60">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
