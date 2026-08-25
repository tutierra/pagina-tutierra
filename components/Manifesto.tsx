import AreaScaledCornerImage from "./AreaScaledCornerImage";
import Reveal from "./Reveal";

interface ManifestoProps {
  content?: {
    misionTitle?: string;
    misionText?: string;
    misionItalic?: string;
    visionTitle?: string;
    visionText?: string;
    visionItalic?: string;
    image?: string;
  };
}

export default function Manifesto({ content }: ManifestoProps) {
  const safeContent = content || {};

  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-brand-gray/10 py-[8%]">
      <AreaScaledCornerImage
        src={safeContent?.image || "/images/global/manifesto-equipo.png"}
        alt="Equipo Tutierra"
        ratio={2000 / 1333}
        areaFraction={0.25}
        cssVar="--manifesto-figure-w"
      />

      <div className="relative z-10 w-[90%] mx-auto md:mx-0 md:ml-[10%] flex flex-col gap-[3.5em] md:max-w-[42%]">
        <Reveal>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-tech-green">
            {safeContent?.misionTitle || "Misión"}
          </h2>
          <p className="mt-[0.6em] text-[1rem] leading-[1.7] text-brand-gray/75">
            {safeContent?.misionText || "Desarrollar proyectos inmobiliarios sostenibles en ubicaciones estratégicas, ofreciendo terrenos con saneamiento urbano e independización garantizada."}
          </p>
          <p className="mt-[0.6em] text-[1rem] italic leading-[1.7] text-brand-gray/60">
            {safeContent?.misionItalic || "Brindando oportunidades de inversión seguras y rentables, integrando la naturaleza y el respeto por el entorno."}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-tech-green">
            {safeContent?.visionTitle || "Visión"}
          </h2>
          <p className="mt-[0.6em] text-[1rem] leading-[1.7] text-brand-gray/75">
            {safeContent?.visionText || "Ser el grupo inmobiliario de referencia en Cusco, liderando el desarrollo de comunidades planificadas y sostenibles con absoluta seguridad legal."}
          </p>
          <p className="mt-[0.6em] text-[1rem] italic leading-[1.7] text-brand-gray/60">
            {safeContent?.visionItalic || "Inspirando un estilo de vida consciente y creando valor patrimonial intergeneracional para nuestros clientes."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
