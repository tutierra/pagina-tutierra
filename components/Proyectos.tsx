import Link from "next/link";
import { PROYECTOS } from "@/lib/site-data";
import ProyectosCoverflow from "./ProyectosCoverflow";

export default function Proyectos() {
  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
      <div className="mx-auto w-[90%]">
        <div className="flex flex-wrap items-end justify-between gap-[1.5em]">
          <div>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[03] PROYECTOS</p>
            <h2 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
              Nuestros desarrollos
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="text-[0.9rem] text-brand-gray/70 transition-colors duration-200 ease-out hover:text-tech-green"
          >
            Ver todos los proyectos →
          </Link>
        </div>

        <div className="mt-[3em]">
          <ProyectosCoverflow proyectos={PROYECTOS} />
        </div>
      </div>
    </section>
  );
}
