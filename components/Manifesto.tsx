import AreaScaledCornerImage from "./AreaScaledCornerImage";
import Reveal from "./Reveal";

interface ManifestoProps {
  content: {
    misionTitle: string;
    misionText: string;
    misionItalic: string;
    visionTitle: string;
    visionText: string;
    visionItalic: string;
    image?: string;
  };
}

export default function Manifesto({ content }: ManifestoProps) {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-brand-gray/10 py-[8%]">
      <AreaScaledCornerImage
        src={content.image || "/images/global/manifesto-equipo.png"}
        alt="Equipo Tutierra"
        ratio={2000 / 1333}
        areaFraction={0.25}
        cssVar="--manifesto-figure-w"
      />

      <div className="relative z-10 w-[90%] mx-auto md:mx-0 md:ml-[10%] flex flex-col gap-[3.5em] md:max-w-[42%]">
        <Reveal>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-tech-green">
            {content.misionTitle}
          </h2>
          <p className="mt-[0.6em] text-[1rem] leading-[1.7] text-brand-gray/75">
            {content.misionText}
          </p>
          <p className="mt-[0.6em] text-[1rem] italic leading-[1.7] text-brand-gray/60">
            {content.misionItalic}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-tech-green">
            {content.visionTitle}
          </h2>
          <p className="mt-[0.6em] text-[1rem] leading-[1.7] text-brand-gray/75">
            {content.visionText}
          </p>
          <p className="mt-[0.6em] text-[1rem] italic leading-[1.7] text-brand-gray/60">
            {content.visionItalic}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
