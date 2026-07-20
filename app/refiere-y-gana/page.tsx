import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Refiere y Gana | Tutierra Grupo Inmobiliario",
  description: "Recomienda Tutierra a tus contactos y gana una comisión por cada venta cerrada.",
};

const PASOS = [
  {
    numero: "01",
    titulo: "Refiere",
    texto: "Comparte el contacto de un familiar o amigo interesado en invertir en un terreno.",
  },
  {
    numero: "02",
    titulo: "Se agenda la visita",
    texto: "Nuestro equipo comercial contacta a tu referido y lo acompaña en todo el proceso.",
  },
  {
    numero: "03",
    titulo: "Se concreta la venta",
    texto: "Cuando tu referido firma su contrato, tu comisión queda confirmada.",
  },
  {
    numero: "04",
    titulo: "Recibe tu comisión",
    texto: "Te pagamos directamente al cerrar la operación, sin letras chicas.",
  },
];

export default function RefiereYGanaPage() {
  const whatsappMsg = encodeURIComponent(
    "Hola, quiero participar del programa Refiere y Gana de Tutierra."
  );

  return (
    <>
      <section className="relative flex min-h-dvh w-full items-end overflow-hidden pt-[35%] pb-[6%] md:pt-[12%]">
        <Image
          src="/images/referidos/handshake.jpg"
          alt="Refiere y Gana Tutierra"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="relative mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">REFIERE Y GANA</p>
          <h1 className="mt-[0.4em] max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light text-brand-gray">
            Comparte una oportunidad. Gana por cada referido.
          </h1>
          <p className="mt-[1em] max-w-[52ch] text-[1.05rem] leading-[1.7] text-brand-gray/75">
            Convierte tu red de contactos en ingresos. Recibe una comisión por cada persona
            que refieras y complete la compra de un terreno Tutierra.
          </p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[2em] inline-block rounded-full bg-tech-green px-[1.8em] py-[0.9em] text-[0.95rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97]"
          >
            Quiero ser referido
          </a>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto w-[90%]">
          <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">CÓMO FUNCIONA</p>
          <h2 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
            Cuatro pasos, sin complicaciones
          </h2>

          <div className="mt-[3em] grid grid-cols-1 gap-[2em] sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((paso) => (
              <div key={paso.numero} className="border-t border-brand-gray/15 pt-[1.5em]">
                <span className="font-display text-[2rem] font-light text-tech-green">
                  {paso.numero}
                </span>
                <h3 className="mt-[0.4em] font-display text-[1.15rem] font-normal text-brand-gray">
                  {paso.titulo}
                </h3>
                <p className="mt-[0.6em] text-[0.9rem] leading-[1.6] text-brand-gray/65">
                  {paso.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto flex w-[90%] flex-col items-start justify-between gap-[2em] rounded-[1.2rem] bg-money-green/40 p-[6%] md:flex-row md:items-center">
          <div>
            <h2 className="max-w-[26ch] font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-light text-brand-gray">
              ¿Listo para ganar refiriendo a Tutierra?
            </h2>
            <p className="mt-[0.8em] max-w-[46ch] text-[0.95rem] text-brand-gray/75">
              Escríbenos y te explicamos el detalle de comisiones según el proyecto.
            </p>
          </div>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-tech-green px-[1.8em] py-[0.9em] text-[0.95rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97]"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
