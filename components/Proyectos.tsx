import Link from "next/link";
import ProyectosCoverflow from "./ProyectosCoverflow";
import Reveal from "./Reveal";

interface ProyectosProps {
  projects: any[];
}

export default function Proyectos({ projects }: ProyectosProps) {
  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
      <div className="mx-auto w-[90%]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-[1.5em]">
            <div>

              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
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
        </Reveal>

        <Reveal delay={0.12} className="mt-[3em]">
          <ProyectosCoverflow proyectos={projects} />
        </Reveal>
      </div>
    </section>
  );
}
