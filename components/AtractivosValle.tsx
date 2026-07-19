import Image from "next/image";

const ATRACTIVOS = [
  {
    titulo: "Clima privilegiado",
    texto: "Temperatura templada todo el año, ideal para vivir o vacacionar.",
  },
  {
    titulo: "Cercanía a Machu Picchu",
    texto: "Ubicación estratégica dentro del corredor turístico más visitado del Perú.",
  },
  {
    titulo: "Naturaleza y sostenibilidad",
    texto: "Terrenos integrados a paisajes andinos preservados y de bajo impacto.",
  },
  {
    titulo: "Alta plusvalía",
    texto: "Zona en constante crecimiento turístico e inmobiliario.",
  },
];

export default function AtractivosValle() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-t border-brand-gray/10 py-[8%]">
      <div className="absolute inset-0">
        <Image
          src="/images/global/valle-sagrado-bg.jpg"
          alt="Valle Sagrado, Cusco"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-brand-ink/60" />
      </div>

      <div className="relative mx-auto w-[90%]">
        <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[04] VALLE SAGRADO</p>
        <h2 className="mt-[0.4em] max-w-[24ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
          Un entorno que se vuelve patrimonio
        </h2>

        <div className="mt-[3em] grid grid-cols-1 gap-[2em] sm:grid-cols-2 lg:grid-cols-4">
          {ATRACTIVOS.map((item) => (
            <div key={item.titulo} className="border-t border-brand-gray/15 pt-[1.5em]">
              <h3 className="font-display text-[1.15rem] font-normal text-brand-gray">
                {item.titulo}
              </h3>
              <p className="mt-[0.6em] text-[0.9rem] leading-[1.6] text-brand-gray/65">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
