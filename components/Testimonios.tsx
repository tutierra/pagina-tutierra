import Image from "next/image";

const TESTIMONIOS = [
  {
    nombre: "Sandra Fuentes",
    proyecto: "Propietaria en Tutierra Urubamba",
    texto:
      "El proceso fue transparente de principio a fin. Hoy tenemos un terreno saneado y con proyección real de crecimiento.",
    imagen: "/images/testimonios/cliente-01.jpg",
  },
];

export default function Testimonios() {
  return (
    <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
      <div className="mx-auto w-[90%]">
        <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[05] TESTIMONIOS</p>
        <h2 className="mt-[0.4em] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
          Familias que ya construyen su patrimonio
        </h2>

        <div className="mt-[3em] grid grid-cols-1 gap-[2em] md:grid-cols-2">
          {TESTIMONIOS.map((t) => (
            <div
              key={t.nombre}
              className="flex items-start gap-[1.5em] rounded-[1.2rem] border border-brand-gray/10 p-[6%]"
            >
              <div className="relative h-[4.5em] w-[4.5em] shrink-0 overflow-hidden rounded-full">
                <Image src={t.imagen} alt={t.nombre} fill className="object-cover" />
              </div>
              <div>
                <p className="text-[1rem] leading-[1.6] text-brand-gray/85">“{t.texto}”</p>
                <p className="mt-[1em] text-[0.9rem] text-brand-gray">{t.nombre}</p>
                <p className="text-[0.8rem] text-brand-gray/55">{t.proyecto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
