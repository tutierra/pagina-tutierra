import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter | Tutierra Grupo Inmobiliario",
  description:
    "Suscríbete al newsletter de Tutierra y recibe nuevos lotes, avances de obra y oportunidades de inversión en el Valle Sagrado antes que nadie.",
};

const BENEFICIOS = [
  { titulo: "Nuevos lotes primero", texto: "Enterate de cada lanzamiento antes de que salga al público." },
  { titulo: "Avances de obra", texto: "Fotos y progreso real de cada proyecto en el valle." },
  { titulo: "Oportunidades", texto: "Precios de preventa y promociones exclusivas para suscriptores." },
];

export default function NewsletterPage() {
  return (
    <section className="flex min-h-dvh w-full flex-col justify-center pt-[30%] pb-[10%] md:pt-[10%] lg:pb-[6%]">
      <div className="mx-auto grid w-[90%] grid-cols-1 items-center gap-[3em] lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">NEWSLETTER</p>
          <h1 className="mt-[0.4em] max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] text-brand-gray">
            El Valle Sagrado en tu <span className="font-serif italic text-tech-green">correo</span>
          </h1>
          <p className="mt-[1.2em] max-w-[48ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] text-brand-gray/75">
            Una vez al mes: nuevos lotes, avances de obra y oportunidades de inversión con
            respaldo legal. Nada de spam, solo tierra que vale la pena.
          </p>

          <div className="mt-[2.5em] flex flex-col gap-[1.4em]">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.titulo} delay={0.1 + i * 0.08}>
                <div className="group flex items-start gap-[1em]">
                  <span className="mt-[0.15em] flex h-[1.8em] w-[1.8em] shrink-0 items-center justify-center rounded-full bg-tech-green/15 text-tech-green transition-colors duration-300 ease-out group-hover:bg-tech-green group-hover:text-brand-ink">
                    <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-normal text-brand-gray">{b.titulo}</h3>
                    <p className="mt-[0.1em] text-[0.9rem] leading-[1.5] text-brand-gray/60">{b.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-[1.5rem] bg-white/[0.04] p-[0.5rem] ring-1 ring-white/10">
            <div className="rounded-[1.2rem] border border-brand-gray/10 p-[8%] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <h2 className="font-display text-[1.4rem] font-light text-brand-gray">Suscríbete gratis</h2>
              <p className="mt-[0.3em] text-[0.9rem] text-brand-gray/55">
                Un correo al mes. Cero relleno.
              </p>
              <div className="mt-[1.6em]">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
