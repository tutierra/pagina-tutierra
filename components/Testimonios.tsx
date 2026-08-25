import Image from "next/image";
import Reveal from "./Reveal";

interface Testimonio {
  nombre: string;
  proyecto: string;
  texto: string;
  imagen: string;
}

interface TestimoniosProps {
  testimonies: Testimonio[];
}

export default function Testimonios({ testimonies }: TestimoniosProps) {
  // Muestra solo los primeros 2 o 3 en la página de inicio
  const items = testimonies.slice(0, 2);

  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%] bg-transparent">
      <div className="mx-auto w-[90%]">
        <Reveal>
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[05] TESTIMONIOS</p>
          <h2 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
            Familias que ya construyen su patrimonio
          </h2>
        </Reveal>

        <div className="mt-[3em] grid grid-cols-1 gap-[2em] md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.nombre} delay={i * 0.08}>
              <div className="rounded-[1.5rem] bg-white/[0.03] p-[0.4rem] ring-1 ring-white/10">
                <div className="flex items-start gap-[1.5em] rounded-[1.2rem] border border-brand-gray/10 p-[6%] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                  <div className="relative h-[4.5em] w-[4.5em] shrink-0 overflow-hidden rounded-full bg-black/25">
                    <Image src={t.imagen} alt={t.nombre} fill sizes="10vw" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[1rem] leading-[1.6] text-brand-gray/85">“{t.texto}”</p>
                    <p className="mt-[1em] text-[0.9rem] text-brand-gray">{t.nombre}</p>
                    <p className="text-[0.8rem] text-brand-gray/55">{t.proyecto}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
