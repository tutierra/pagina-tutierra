import Image from "next/image";
import Link from "next/link";
import type { Proyecto } from "@/lib/site-data";

export default function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[1.2rem]"
    >
      <Image
        src={proyecto.imagenPrincipal}
        alt={proyecto.nombre}
        fill
        sizes="(max-width: 768px) 90vw, 30vw"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-[8%]">
        <p className="text-[0.8rem] tracking-[0.15em] text-tech-green">{proyecto.ubicacion}</p>
        <h3 className="mt-[0.3em] font-display text-[clamp(1.3rem,2vw,1.8rem)] font-light text-brand-gray">
          {proyecto.nombre}
        </h3>
        <p className="mt-[0.6em] text-[0.85rem] text-brand-gray/70">
          Desde {proyecto.precioDesde} · {proyecto.areaDesde}
        </p>
        <span className="mt-[1em] inline-flex items-center gap-[0.5em] text-[0.85rem] text-brand-gray transition-colors duration-200 ease-out group-hover:text-tech-green">
          Descubre el proyecto
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-[0.3em]">→</span>
        </span>
      </div>
    </Link>
  );
}
