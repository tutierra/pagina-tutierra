type TimelineItem = { year: string; titulo: string; texto: string; img: string };

/**
 * Timeline de paneles expansivos (adaptado de un efecto SCSS de "expanding
 * panels"). Desktop: fila horizontal de paneles con imagen en grayscale; al
 * pasar el cursor el panel crece (flex-grow), la imagen se colorea y aparece
 * el contenido. Móvil (sin hover): cards verticales con imagen siempre visible.
 */
export default function TimelineExpand({ items }: { items: TimelineItem[] }) {
  return (
    <>
      {/* Desktop: paneles expansivos */}
      <div className="hidden h-[clamp(440px,72vh,680px)] w-full overflow-hidden rounded-[1.2rem] lg:flex">
        {items.map((item, i) => (
          <div
            key={`${item.year}-${i}`}
            className="group relative h-full min-w-0 flex-1 cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out-strong hover:grow-[5]"
          >
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            {/* Tinte de marca (se desvanece en hover) */}
            <div className="absolute inset-0 bg-money-green/55 transition-opacity duration-500 ease-out group-hover:opacity-0" />
            {/* Gradiente inferior para legibilidad (aparece en hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/30 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

            {/* Año (siempre visible, centrado) */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border-y border-brand-gray/70 px-[0.3em] py-[0.1em] transition-opacity duration-300 ease-out group-hover:opacity-0">
              <p className="font-display text-[1.6rem] font-light leading-none text-brand-gray">
                {item.year}
              </p>
            </div>

            {/* Contenido (aparece en hover) */}
            <div className="absolute inset-x-0 bottom-0 z-10 translate-y-4 p-[1.6em] text-center opacity-0 transition-all duration-500 ease-out-strong group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
              <p className="font-display text-[1.1rem] font-light text-tech-green">{item.year}</p>
              <h3 className="mt-[0.2em] font-display text-[clamp(1.1rem,1.4vw,1.5rem)] font-normal text-brand-gray">
                {item.titulo}
              </h3>
              <p className="mx-auto mt-[0.5em] max-w-[34ch] text-[0.85rem] leading-[1.5] text-brand-gray/80">
                {item.texto}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Móvil: cards verticales con imagen */}
      <div className="flex flex-col gap-[1.2em] lg:hidden">
        {items.map((item, i) => (
          <div
            key={`m-${item.year}-${i}`}
            className="relative h-[clamp(200px,42vh,300px)] overflow-hidden rounded-[1.1rem]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-brand-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-[1.4em]">
              <p className="font-display text-[1.4rem] font-light text-tech-green">{item.year}</p>
              <h3 className="mt-[0.1em] font-display text-[1.15rem] font-normal text-brand-gray">
                {item.titulo}
              </h3>
              <p className="mt-[0.4em] max-w-[46ch] text-[0.9rem] leading-[1.5] text-brand-gray/75">
                {item.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
