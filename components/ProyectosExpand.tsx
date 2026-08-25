"use client";

import Link from "next/link";

export default function ProyectosExpand({ items }: { items: any[] }) {
  const safeItems = (items || []).filter(Boolean);

  return (
    <>
      {/* Desktop: paneles expansivos */}
      <div className="hidden h-[clamp(440px,72vh,680px)] w-full overflow-hidden rounded-[1.2rem] lg:flex">
        {safeItems.map((proyecto, i) => {
          const slug = proyecto.slug || proyecto.id || "";
          const nombre = proyecto.nombre || proyecto.title || proyecto.name || "Proyecto";
          const ubicacion = proyecto.ubicacion || proyecto.location || "Valle Sagrado, Cusco";
          const precioDesde = proyecto.precioDesde || proyecto.price || proyecto.initialPrice || "";
          const areaDesde = proyecto.extension || proyecto.areaDesde || proyecto.area || "";
          const imagenPrincipal = proyecto.imagenPrincipal || proyecto.image || proyecto.coverImage || "/images/proyectos/proyecto-chinchero-01.jpg";
          const logoSrc = proyecto.logoUrl || proyecto.logo;

          return (
            <Link
              key={slug || i}
              href={`/proyectos/${slug}`}
              className="group relative h-full min-w-0 flex-1 cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out-strong hover:grow-[5]"
            >
              {/* Imagen de fondo (Escala de grises inactiva, Saturación 80% al hacer hover) */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale transition-[filter,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:saturate-[0.8] group-hover:scale-105"
                style={{ backgroundImage: `url(${imagenPrincipal})` }}
              />
              
              {/* Tinte de marca (se desvanece en hover) */}
              <div className="absolute inset-0 bg-money-green/55 transition-opacity duration-500 ease-out group-hover:opacity-0" />
              
              {/* Gradiente oscuro superpuesto para elevadísimo contraste (aparece en hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

              {/* Renderizado del Logotipo / Fallback en Tarjetas Inactivas */}
              <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                {logoSrc ? (
                  <img 
                    src={logoSrc} 
                    alt={nombre} 
                    className="max-h-16 max-w-[80%] object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] brightness-100"
                  />
                ) : (
                  <span className="text-white font-semibold tracking-wider text-sm md:text-base uppercase text-center drop-shadow-md border-y border-white/70 px-4 py-1.5 whitespace-nowrap">
                    {nombre}
                  </span>
                )}
              </div>

              {/* Contenido (Tarjeta activa/desplegada - Tipografía Blanca y Alto Contraste) */}
              <div className="absolute inset-x-0 bottom-0 z-10 translate-y-4 p-[1.8em] text-center opacity-0 transition-all duration-500 ease-out-strong group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
                <p className="font-display text-[0.8rem] font-medium text-white/90 tracking-[0.15em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {ubicacion}
                </p>
                <h3 className="mt-[0.2em] font-display text-[clamp(1.3rem,1.7vw,2rem)] font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {nombre}
                </h3>
                <p className="mx-auto mt-[0.5em] max-w-[34ch] text-[0.9rem] leading-[1.5] text-white font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {proyecto.clausurado ? (
                    <span className="font-bold text-red-400 tracking-wide drop-shadow-md">100% VENDIDO</span>
                  ) : (
                    precioDesde ? `Desde ${precioDesde} · ${areaDesde}` : areaDesde
                  )}
                </p>
                <span className="mt-[0.9em] inline-block text-[0.85rem] text-white font-semibold underline underline-offset-4 decoration-white/60 hover:decoration-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all">
                  Descubre el proyecto →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Móvil: cards verticales con alto contraste y texto blanco */}
      <div className="flex flex-col gap-[1.2em] lg:hidden">
        {safeItems.map((proyecto, i) => {
          const slug = proyecto.slug || proyecto.id || "";
          const nombre = proyecto.nombre || proyecto.title || proyecto.name || "Proyecto";
          const ubicacion = proyecto.ubicacion || proyecto.location || "Valle Sagrado, Cusco";
          const precioDesde = proyecto.precioDesde || proyecto.price || proyecto.initialPrice || "";
          const areaDesde = proyecto.extension || proyecto.areaDesde || proyecto.area || "";
          const imagenPrincipal = proyecto.imagenPrincipal || proyecto.image || proyecto.coverImage || "/images/proyectos/proyecto-chinchero-01.jpg";

          return (
            <Link
              key={`m-${slug || i}`}
              href={`/proyectos/${slug}`}
              className="relative h-[clamp(220px,45vh,320px)] overflow-hidden rounded-[1.1rem] block group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center saturate-[0.85] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${imagenPrincipal})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              {proyecto.clausurado && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-lg">
                  Vendido
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-[1.4em]">
                <p className="font-display text-[0.8rem] font-medium text-white/90 tracking-[0.15em] uppercase drop-shadow-md">
                  {ubicacion}
                </p>
                <h3 className="mt-[0.1em] font-display text-[1.4rem] font-normal text-white drop-shadow-md">
                  {nombre}
                </h3>
                <p className="mt-[0.4em] max-w-[46ch] text-[0.9rem] leading-[1.5] text-white/90 drop-shadow-md">
                  {proyecto.clausurado ? (
                    <span className="font-bold text-red-400 tracking-wide">100% VENDIDO</span>
                  ) : (
                    precioDesde ? `Desde ${precioDesde} · ${areaDesde}` : areaDesde
                  )}
                </p>
                <span className="mt-[0.6em] inline-block text-[0.8rem] text-white font-semibold underline underline-offset-4 drop-shadow-md">
                  Descubre el proyecto →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
