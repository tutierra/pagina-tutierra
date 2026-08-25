import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

export default function UnifiedContactFooter({
  proyectoPreseleccionado,
  projects,
}: {
  proyectoPreseleccionado?: string;
  projects?: any[];
}) {
  return (
    <section className="flex min-h-dvh lg:h-dvh lg:min-h-0 flex-col justify-between border-t border-brand-gray/10 pt-[5vh] lg:pt-[4vh] pb-0 bg-transparent">
      <div className="mx-auto w-[90%] flex-1 flex items-center py-[2%]">
        <div className="grid grid-cols-1 gap-[3em] lg:grid-cols-[1fr_1.1fr] items-center w-full">
          <Reveal>
            <div>
              <p className="text-[0.85rem] tracking-[0.2em] text-tech-green uppercase font-semibold">Invierte Seguro</p>
              <h2 className="mt-[0.4em] max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
                Haz realidad tu propio espacio en el valle
              </h2>
              <p className="mt-[1.2em] max-w-[48ch] text-[1rem] leading-[1.7] text-brand-gray/70">
                Agenda una asesoría personalizada. Te ayudamos a encontrar el lote ideal que se adapte a tus planes familiares, con total seguridad legal y urbana.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[1.5rem] bg-white/[0.04] p-[0.5rem] ring-1 ring-white/10">
              <div className="rounded-[1.2rem] border border-brand-gray/10 p-[6%] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                <ContactForm proyectoPreseleccionado={proyectoPreseleccionado} projects={projects} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <Footer isUnified />
    </section>
  );
}
