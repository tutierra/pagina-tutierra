"use client";

import Link from "next/link";
import type { Proyecto } from "@/lib/site-data";

export default function ProyectosExpand({ items }: { items: Proyecto[] }) {
  return (
    <>
      {/* Desktop: paneles expansivos */}
      <div className="hidden h-[clamp(440px,72vh,680px)] w-full overflow-hidden rounded-[1.2rem] lg:flex">
        {items.map((proyecto, i) => {
          const shortName = proyecto.nombre.replace("Tutierra ", "");
          return (
            <Link
              key={proyecto.slug}
              href={`/proyectos/${proyecto.slug}`}
              className="group relative h-full min-w-0 flex-1 cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out-strong hover:grow-[5]"
            >
              {/* Imagen de fondo */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                style={{ backgroundImage: `url(${proyecto.imagenPrincipal})` }}
              />
              {/* Tinte de marca (se desvanece en hover) */}
              <div className="absolute inset-0 bg-money-green/55 transition-opacity duration-500 ease-out group-hover:opacity-0" />
              {/* Gradiente inferior para legibilidad (aparece en hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/30 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

              {/* Nombre Corto (siempre visible, centrado) */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border-y border-brand-gray/70 px-[0.4em] py-[0.15em] transition-opacity duration-300 ease-out group-hover:opacity-0 whitespace-nowrap">
                <p className="font-display text-[1.2rem] font-light leading-none text-brand-gray tracking-[0.12em] uppercase">
                  {shortName}
                </p>
              </div>

              {/* Contenido (aparece en hover) */}
              <div className="absolute inset-x-0 bottom-0 z-10 translate-y-4 p-[1.6em] text-center opacity-0 transition-all duration-500 ease-out-strong group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
                <p className="font-display text-[0.8rem] font-light text-tech-green tracking-[0.1em] uppercase">
                  {proyecto.ubicacion}
                </p>
                <h3 className="mt-[0.2em] font-display text-[clamp(1.2rem,1.5vw,1.8rem)] font-light text-brand-gray">
                  {proyecto.nombre}
                </h3>
                <p className="mx-auto mt-[0.5em] max-w-[34ch] text-[0.85rem] leading-[1.5] text-brand-gray/85">
                  {proyecto.clausurado ? (
                    <span className="font-semibold text-red-500 tracking-wide">100% VENDIDO</span>
                  ) : (
                    `Desde ${proyecto.precioDesde} · ${proyecto.areaDesde}`
                  )}
                </p>
                <span className="mt-[0.8em] inline-block text-[0.8rem] text-tech-green font-medium transition-transform duration-200 group-hover:translate-x-1">
                  Descubre el proyecto →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Móvil: cards verticales con imagen */}
      <div className="flex flex-col gap-[1.2em] lg:hidden">
        {items.map((proyecto) => (
          <Link
            key={`m-${proyecto.slug}`}
            href={`/proyectos/${proyecto.slug}`}
            className="relative h-[clamp(220px,45vh,320px)] overflow-hidden rounded-[1.1rem] block group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${proyecto.imagenPrincipal})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-brand-ink/10" />
            {proyecto.clausurado && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
                Vendido
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 p-[1.4em]">
              <p className="font-display text-[0.8rem] font-light text-tech-green tracking-[0.1em] uppercase">
                {proyecto.ubicacion}
              </p>
              <h3 className="mt-[0.1em] font-display text-[1.3rem] font-light text-brand-gray">
                {proyecto.nombre}
              </h3>
              <p className="mt-[0.4em] max-w-[46ch] text-[0.85rem] leading-[1.5] text-brand-gray/75">
                {proyecto.clausurado ? (
                  <span className="font-semibold text-red-500 tracking-wide">100% VENDIDO</span>
                ) : (
                  `Desde ${proyecto.precioDesde} · ${proyecto.areaDesde}`
                )}
              </p>
              <span className="mt-[0.6em] inline-block text-[0.75rem] text-tech-green font-medium">
                Descubre el proyecto →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
