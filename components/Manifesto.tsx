import AreaScaledCornerImage from "./AreaScaledCornerImage";
import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-brand-gray/10 py-[8%]">
      <AreaScaledCornerImage
        src="/images/global/manifesto-equipo.png"
        alt="Equipo Tutierra"
        ratio={2000 / 1333}
        areaFraction={0.25}
        cssVar="--manifesto-figure-w"
      />

      <div className="relative z-10 mx-auto grid w-[90%] grid-cols-1 gap-[4em] md:grid-cols-2">
        <Reveal>
          <span className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-tech-green">
            [01]
          </span>
          <h2 className="mt-[0.3em] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-brand-gray">
            Misión
          </h2>
          <p className="mt-[1em] max-w-[42ch] text-[1rem] leading-[1.7] text-brand-gray/75">
            Desarrollar proyectos inmobiliarios sostenibles en ubicaciones estratégicas,
            ofreciendo terrenos con saneamiento urbano e independización garantizada.
          </p>
          <p className="mt-[1em] max-w-[42ch] text-[1rem] italic leading-[1.7] text-brand-gray/60">
            Brindando oportunidades de inversión seguras y rentables, integrando la naturaleza
            y el respeto por el entorno.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <span className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-tech-green">
            [02]
          </span>
          <h2 className="mt-[0.3em] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-brand-gray">
            Visión
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
