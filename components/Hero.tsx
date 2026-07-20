import Link from "next/link";
import RoundCarousel from "./RoundCarousel";
import { PROYECTOS } from "@/lib/site-data";

const CAROUSEL_IMAGES = PROYECTOS.map((p) => ({ src: p.imagenPrincipal }));

export default function Hero() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-end overflow-hidden pb-[5.6%] pt-[24.5%] md:pt-[9.8%]">
      <div className="relative z-10 mx-auto flex w-[90%] flex-col items-center gap-[2em] lg:flex-row lg:items-center lg:justify-between lg:gap-[4%]">
        <div className="w-full lg:max-w-[54%]">
          <p className="mb-[0.714em] text-[0.5355rem] tracking-[0.119em] text-tech-green">
            TUTIERRA · GRUPO INMOBILIARIO · CUSCO, PERÚ
          </p>

          <h1 className="font-display font-light leading-[0.95] text-brand-gray text-[clamp(1.4875rem,4.165vw,3.8675rem)]">
            Creamos y
            <br />
            unimos <span className="font-serif italic text-tech-green">familias.</span>
          </h1>

          <p className="mt-[0.952em] max-w-[46ch] text-[clamp(0.595rem,0.952vw,0.74375rem)] leading-[1.6] text-brand-gray/75">
            Desarrollamos proyectos inmobiliarios sostenibles en el Valle Sagrado, ofreciendo
            terrenos con saneamiento urbano e independización garantizada.
          </p>

          <div className="mt-[1.428em] flex flex-wrap items-center gap-[0.714em]">
            <Link
              href="/proyectos"
              className="rounded-full bg-tech-green px-[1.071em] py-[0.5355em] text-[0.56525rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97]"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contactanos"
              className="rounded-full border border-brand-gray/30 px-[1.071em] py-[0.5355em] text-[0.56525rem] text-brand-gray transition-all duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97] hover:border-tech-green hover:text-tech-green"
            >
              Agenda una visita
            </Link>
          </div>
        </div>

        <div className="relative aspect-[9/16] h-[clamp(180px,32vw,420px)] shrink-0">
          <div className="pointer-events-none absolute inset-[-15%] rounded-full bg-tech-green/10 blur-3xl" />
          <div className="pointer-events-none relative h-full w-full">
            <RoundCarousel images={CAROUSEL_IMAGES} imageWidth={170} imageHeight={300} cornerRadius={26} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-[4.2%] grid w-[90%] grid-cols-1 gap-[1.05em] border-t border-brand-gray/10 pt-[1.4em] sm:grid-cols-3 sm:gap-[1.4em]">
        <div>
          <p className="font-display text-[clamp(1.05rem,2.1vw,1.75rem)] font-light text-brand-gray">6</p>
          <p className="text-[0.56rem] text-brand-gray/60">Proyectos en el Valle Sagrado</p>
        </div>
        <div>
          <p className="font-display text-[clamp(1.05rem,2.1vw,1.75rem)] font-light text-brand-gray">100%</p>
          <p className="text-[0.56rem] text-brand-gray/60">Saneamiento garantizado</p>
        </div>
        <div>
          <p className="font-display text-[clamp(1.05rem,2.1vw,1.75rem)] font-light text-brand-gray">2026</p>
          <p className="text-[0.56rem] text-brand-gray/60">Nueva etapa de expansión</p>
        </div>
      </div>
    </section>
  );
}
