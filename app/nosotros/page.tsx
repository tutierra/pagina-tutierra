import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import TimelineExpand from "@/components/TimelineExpand";
import ContactForm from "@/components/ContactForm";
import { CONTACT, SOCIAL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Nosotros | Tutierra Grupo Inmobiliario",
  description:
    "La historia de Tutierra: desde su fundación en Cusco hasta convertirse en referente de desarrollo inmobiliario sostenible en el Valle Sagrado.",
};

const TIMELINE: { year: string; titulo: string; texto: string; img: string }[] = [
  { year: "2016", titulo: "Nace Tutierra", texto: "Fundada en Cusco con un propósito: crear y unir familias a través de la tierra.", img: "/images/nosotros/oficina.jpg" },
  { year: "2016", titulo: "Primer terreno en Chinchero", texto: "Adquirimos nuestro primer predio con vista a la cordillera.", img: "/images/proyectos/proyecto-chinchero-01.jpg" },
  { year: "2017", titulo: "Primeras 10 familias", texto: "Entregamos los primeros lotes saneados a familias cusqueñas.", img: "/images/nosotros/equipo.jpg" },
  { year: "2018", titulo: "Saneamiento certificado", texto: "Formalizamos el proceso legal e independización individual de cada lote.", img: "/images/proyectos/proyecto-chinchero-02.jpg" },
  { year: "2018", titulo: "Proyecto Pisac", texto: "Expandimos hacia el corredor turístico del Valle Sagrado.", img: "/images/proyectos/proyecto-pisac-01.jpg" },
  { year: "2019", titulo: "Oficina en Av. El Sol", texto: "Abrimos nuestra sede central en el corazón de Cusco.", img: "/images/proyectos/proyecto-pisac-02.jpg" },
  { year: "2020", titulo: "Ventas digitales", texto: "Lanzamos el acompañamiento remoto y la reserva en línea de lotes.", img: "/images/proyectos/proyecto-urubamba-02.jpg" },
  { year: "2021", titulo: "Proyecto Urubamba", texto: "Desarrollamos en el corazón del valle, de clima templado todo el año.", img: "/images/proyectos/proyecto-urubamba-01.jpg" },
  { year: "2022", titulo: "100 lotes vendidos", texto: "Superamos el centenar de lotes entregados con respaldo legal.", img: "/images/proyectos/proyecto-maras-02.jpg" },
  { year: "2023", titulo: "Proyecto Maras", texto: "Lotes de gran extensión junto a las icónicas salineras.", img: "/images/proyectos/proyecto-maras-01.jpg" },
  { year: "2024", titulo: "Proyecto Ollantaytambo", texto: "Llegamos a la puerta de entrada a Machu Picchu.", img: "/images/proyectos/proyecto-ollantaytambo-01.jpg" },
  { year: "2024", titulo: "Alianza notarial", texto: "Convenio para agilizar la independización y titulación de cada cliente.", img: "/images/proyectos/proyecto-ollantaytambo-02.jpg" },
  { year: "2025", titulo: "Proyecto Calca", texto: "Abrimos una zona en expansión con precios de entrada accesibles.", img: "/images/proyectos/proyecto-calca-01.jpg" },
  { year: "2026", titulo: "Nueva etapa", texto: "Iniciamos nuestra expansión con seis proyectos activos en el valle.", img: "/images/proyectos/proyecto-calca-02.jpg" },
];

const EQUIPO_GRUPOS: { area: string; personas: { nombre: string; puesto: string }[] }[] = [
  {
    area: "Gerencia",
    personas: [
      { nombre: "Lucía Ramírez", puesto: "Gerente Comercial" },
      { nombre: "Sergio Ballón", puesto: "Gerente de Marketing" },
    ],
  },
  {
    area: "Equipo Comercial",
    personas: [
      { nombre: "Rosa Huamán", puesto: "Asesora de Inversiones" },
      { nombre: "Diego Salas", puesto: "Ejecutivo de Ventas" },
      { nombre: "Karina Puma", puesto: "Asesora Comercial" },
    ],
  },
  {
    area: "Equipo de Marketing",
    personas: [
      { nombre: "Paola Cárdenas", puesto: "Community Manager" },
      { nombre: "Bruno Ttito", puesto: "Diseñador Gráfico" },
      { nombre: "Mía Choque", puesto: "Contenido y Publicidad" },
    ],
  },
  {
    area: "Equipo Administrativo",
    personas: [
      { nombre: "Andrés Quispe", puesto: "Administrador" },
      { nombre: "Valeria Ríos", puesto: "Contabilidad" },
      { nombre: "Martín Flores", puesto: "Asistente Administrativo" },
    ],
  },
];

const CIFRAS: { valor: string; label: string }[] = [
  { valor: "6", label: "Proyectos activos en el Valle Sagrado" },
  { valor: "+320", label: "Lotes vendidos y saneados" },
  { valor: "10", label: "Años construyendo confianza" },
  { valor: "+300", label: "Familias con patrimonio propio" },
  { valor: "100%", label: "Saneamiento legal garantizado" },
  { valor: "+45", label: "Hectáreas desarrolladas" },
];

function Avatar({ nombre }: { nombre: string }) {
  const initials = nombre
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[1.2rem] bg-money-green/30">
      <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 h-full w-full text-tech-green/25">
        <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="2" strokeDasharray="60 22" strokeLinecap="round" />
        <circle cx="100" cy="100" r="66" stroke="currentColor" strokeWidth="1.5" strokeDasharray="40 26" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light text-tech-green">{initials}</span>
    </div>
  );
}

export default function NosotrosPage() {
  return (
    <>
      {/* 1 — Fundador */}
      <section className="flex min-h-dvh w-full items-center pt-[30%] pb-[8%] md:pt-[10%]">
        <div className="mx-auto grid w-[90%] grid-cols-1 items-center gap-[3em] lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[01] EL FUNDADOR</p>
            <h1 className="mt-[0.4em] max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] text-brand-gray">
              Una visión nacida en el <span className="font-serif italic text-tech-green">Valle Sagrado</span>
            </h1>
            <p className="mt-[1.2em] max-w-[50ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.7] text-brand-gray/75">
              “Crecí viendo cómo muchas familias soñaban con un pedazo de tierra propio, pero
              se topaban con trámites, informalidad y promesas vacías. Fundé Tutierra para que
              ese sueño fuera seguro, legal y real. Cada lote que entregamos es una familia que
              echa raíces.”
            </p>
            <p className="mt-[1.4em] font-display text-[1.1rem] text-brand-gray">Carlos Mendoza</p>
            <p className="text-[0.9rem] text-brand-gray/55">Fundador y Director General</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[1.5rem] bg-white/[0.04] p-[0.5rem] ring-1 ring-white/10">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src="/images/testimonios/cliente-01.jpg"
                  alt="Carlos Mendoza, fundador de Tutierra"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Timeline */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto w-[90%]">
          <Reveal>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[02] NUESTRA HISTORIA</p>
            <h2 className="mt-[0.4em] max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
              De una idea a un referente del valle
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-[3em]">
            <TimelineExpand items={TIMELINE} />
          </Reveal>
          <p className="mt-[1.4em] text-[0.8rem] text-brand-gray/45 lg:block">
            Pasa el cursor sobre cada hito para descubrirlo.
          </p>
        </div>
      </section>

      {/* 3 — Equipo */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[10%] lg:py-[6%]">
        <div className="mx-auto w-[90%]">
          <Reveal>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[03] NUESTRO EQUIPO</p>
            <h2 className="mt-[0.4em] max-w-[22ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
              Personas detrás de cada terreno
            </h2>
            <p className="mt-[1em] max-w-[52ch] text-[1rem] leading-[1.7] text-brand-gray/70">
              Once personas en cuatro áreas acompañan a cada familia desde la elección del
              lote hasta la independización final.
            </p>
          </Reveal>

          <div className="mt-[3em] flex flex-col gap-[3em]">
            {EQUIPO_GRUPOS.map((grupo, gi) => (
              <div key={grupo.area}>
                <Reveal>
                  <div className="flex items-center gap-[1em]">
                    <h3 className="shrink-0 text-[0.8rem] tracking-[0.15em] text-tech-green">
                      {grupo.area.toUpperCase()}
                    </h3>
                    <span className="h-px flex-1 bg-brand-gray/15" />
                    <span className="shrink-0 text-[0.75rem] text-brand-gray/40">
                      {String(grupo.personas.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>

                <div className="mt-[1.4em] grid grid-cols-2 gap-[1.5em] sm:grid-cols-3 lg:grid-cols-4">
                  {grupo.personas.map((persona, i) => (
                    <Reveal key={persona.nombre} delay={Math.min(i * 0.06 + gi * 0.03, 0.4)}>
                      <div>
                        <Avatar nombre={persona.nombre} />
                        <h4 className="mt-[0.9em] font-display text-[1.05rem] font-normal text-brand-gray">
                          {persona.nombre}
                        </h4>
                        <p className="mt-[0.2em] text-[0.85rem] text-brand-gray/55">{persona.puesto}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Contacto + cifras */}
      <section className="flex min-h-dvh flex-col justify-center border-t border-brand-gray/10 py-[8%]">
        <div className="mx-auto w-[90%]">
          <Reveal>
            <p className="text-[0.85rem] tracking-[0.2em] text-tech-green">[04] CONTÁCTANOS</p>
            <h2 className="mt-[0.4em] max-w-[22ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-brand-gray">
              Hablemos de tu próxima inversión
            </h2>
          </Reveal>

          <div className="mt-[3em] grid grid-cols-1 gap-[3em] lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <div className="grid grid-cols-2 gap-[1.5em]">
                  {CIFRAS.map((cifra) => (
                    <div key={cifra.label} className="border-t border-brand-gray/15 pt-[1em]">
                      <p className="font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-light text-brand-gray">
                        {cifra.valor}
                      </p>
                      <p className="mt-[0.2em] text-[0.85rem] leading-[1.4] text-brand-gray/60">
                        {cifra.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-[2.5em] flex flex-col gap-[1.4em]">
                  <div>
                    <h3 className="text-[0.8rem] tracking-[0.15em] text-tech-green">TELÉFONO / WHATSAPP</h3>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-[0.3em] block text-[1.05rem] text-brand-gray transition-colors duration-200 ease-out hover:text-tech-green"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[0.8rem] tracking-[0.15em] text-tech-green">OFICINA</h3>
                    <p className="mt-[0.3em] text-[1.05rem] text-brand-gray">{CONTACT.address}</p>
                    <p className="text-[0.85rem] text-brand-gray/55">{CONTACT.hours}</p>
                  </div>
                  <div className="flex gap-[1.2em] text-[0.9rem] text-brand-gray/80">
                    <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">Instagram</a>
                    <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">Facebook</a>
                    <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-tech-green">TikTok</a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[1.5rem] bg-white/[0.04] p-[0.5rem] ring-1 ring-white/10">
                <div className="rounded-[1.2rem] border border-brand-gray/10 p-[6%] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
