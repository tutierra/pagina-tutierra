import Link from "next/link";

export default function CtaDoble() {
  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-[1.5em] md:grid-cols-2">
        <div className="rounded-[1.2rem] bg-money-green/40 p-[8%]">
          <p className="text-[0.85rem] tracking-[0.15em] text-tech-green">REFIERE Y GANA</p>
          <h3 className="mt-[0.4em] max-w-[20ch] font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light text-brand-gray">
            Recomienda Tutierra y recibe una comisión por cada venta cerrada.
          </h3>
          <Link
            href="/refiere-y-gana"
            className="mt-[1.5em] inline-block rounded-full bg-tech-green px-[1.6em] py-[0.8em] text-[0.9rem] text-brand-ink transition-transform duration-160 ease-out hover:scale-[0.97]"
          >
            Conoce el programa
          </Link>
        </div>

        <div className="rounded-[1.2rem] border border-brand-gray/15 p-[8%]">
          <p className="text-[0.85rem] tracking-[0.15em] text-tech-green">AGENDA UNA VISITA</p>
          <h3 className="mt-[0.4em] max-w-[20ch] font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light text-brand-gray">
            Conoce en persona el terreno que va a ser tu próxima inversión.
          </h3>
          <Link
            href="/contactanos"
            className="mt-[1.5em] inline-block rounded-full border border-brand-gray/30 px-[1.6em] py-[0.8em] text-[0.9rem] text-brand-gray transition-all duration-160 ease-out hover:scale-[0.97] hover:border-tech-green hover:text-tech-green"
          >
            Hablar con un asesor
          </Link>
        </div>
      </div>
    </section>
  );
}
