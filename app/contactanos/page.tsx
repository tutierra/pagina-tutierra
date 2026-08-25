import type { Metadata } from "next";
import { CONTACT, SOCIAL } from "@/lib/site-data";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contáctanos | Tutierra Grupo Inmobiliario",
  description: "Agenda una visita o escríbenos directamente a Tutierra Grupo Inmobiliario.",
};

type Props = { searchParams: Promise<{ proyecto?: string }> };

export default async function ContactanosPage({ searchParams }: Props) {
  const { proyecto } = await searchParams;

  return (
    <>
      <section className="flex min-h-dvh w-full flex-col justify-center pt-[35%] pb-[8%] md:pt-[12%]">
        <div className="mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">CONTÁCTANOS</p>
          <h1 className="mt-[0.4em] max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            Agenda tu visita al Valle Sagrado
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            Completa el formulario o escríbenos directo. Un asesor te confirmará fecha y hora
            de visita a los proyectos que te interesen.
          </p>

          <div className="mt-[4em] grid grid-cols-1 gap-[3em] md:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-[2.5em]">
              <div>
                <h3 className="text-[0.85rem] tracking-[0.15em] text-tech-green">TELÉFONO / WHATSAPP</h3>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[0.4em] block text-[1.1rem] text-brand-gray transition-colors duration-200 ease-out hover:text-tech-green"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <h3 className="text-[0.85rem] tracking-[0.15em] text-tech-green">EMAIL</h3>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-[0.4em] block text-[1.1rem] text-brand-gray transition-colors duration-200 ease-out hover:text-tech-green"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <h3 className="text-[0.85rem] tracking-[0.15em] text-tech-green">OFICINA</h3>
                <p className="mt-[0.4em] text-[1.1rem] text-brand-gray">{CONTACT.address}</p>
                <p className="mt-[0.2em] text-[0.9rem] text-brand-gray/60">{CONTACT.hours}</p>
              </div>
              <div>
                <h3 className="text-[0.85rem] tracking-[0.15em] text-tech-green">REDES SOCIALES</h3>
                <div className="mt-[0.6em] flex gap-[1.2em] text-[0.95rem] text-brand-gray/80">
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">Instagram</a>
                  <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">Facebook</a>
                  <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">TikTok</a>
                </div>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-brand-gray/15 p-[6%]">
              <ContactForm proyectoPreseleccionado={proyecto} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
