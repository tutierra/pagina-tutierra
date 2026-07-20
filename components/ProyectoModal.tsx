"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Proyecto } from "@/lib/site-data";

const SLIDE_MS = 3000;

const ICON_RULES: { test: RegExp; icon: string }[] = [
  { test: /agua|luz|domicil/i, icon: "droplet" },
  { test: /vigilad|seguridad|cerco|porton/i, icon: "shield" },
  { test: /verde|parque|jardin/i, icon: "leaf" },
  { test: /via|pista|vereda|acceso|asfalt|afirmad/i, icon: "road" },
  { test: /rio|salinera|mirador|estacion|tren/i, icon: "pin" },
  { test: /parrilla|bbq/i, icon: "flame" },
  { test: /saneamiento|legal|independiz/i, icon: "check" },
  { test: /plusvalia|clima|precio/i, icon: "sun" },
];

function iconFor(label: string): string {
  const rule = ICON_RULES.find((r) => r.test.test(label));
  return rule ? rule.icon : "check";
}

function Icon({ name, className }: { name: string; className?: string }) {
  const common = { className, width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "droplet":
      return <svg {...common}><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M5 20c8 0 14-6 14-14V4h-2C9 4 5 10 5 18v2z" /></svg>;
    case "road":
      return <svg {...common}><path d="M8 3 4 21M16 3l4 18M12 8v3M12 15v3" /></svg>;
    case "pin":
      return <svg {...common}><path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "flame":
      return <svg {...common}><path d="M12 22c4 0 6-2.5 6-6 0-3-2-4.5-3-7-.5 2-1.5 2.5-2 2-1-1-1-3.5-1-5-3 2-5 5.5-5 9 0 3.5 1.5 7 5 7z" /></svg>;
    case "sun":
      return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>;
    default:
      return <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>;
  }
}

function ProjectMonogram({ ubicacion }: { ubicacion: string }) {
  const initials = ubicacion
    .split(/[,\s]+/)[0]
    .slice(0, 2)
    .toUpperCase();
  return (
    // Monograma provisional por proyecto: hereda el lenguaje radial del logo
    // Tutierra (anillos concéntricos segmentados) hasta tener logos reales.
    <div
      className="relative flex h-[2.8em] w-[2.8em] shrink-0 items-center justify-center rounded-full bg-tech-green/15"
      title={`Logo provisional — ${ubicacion}`}
    >
      <svg viewBox="0 0 48 48" fill="none" className="absolute inset-0 h-full w-full text-tech-green/50">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="26 9" strokeLinecap="round" />
        <circle cx="24" cy="24" r="17.5" stroke="currentColor" strokeWidth="1" strokeDasharray="17 11" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span className="font-display text-[0.9em] text-tech-green">{initials}</span>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[0.4em] rounded-full border border-brand-gray/15 px-[0.7em] py-[0.35em] text-[0.75em] text-brand-gray/85">
      <Icon name={iconFor(label)} className="shrink-0 text-tech-green" />
      {label}
    </div>
  );
}

export default function ProyectoModal({
  proyecto,
  onClose,
}: {
  proyecto: Proyecto | null;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [displayProyecto, setDisplayProyecto] = useState<Proyecto | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setSlide(0);
  }, [proyecto]);

  // Mount-state pattern: al cerrar, el proyecto se sigue mostrando durante la
  // animación de salida (200ms) en vez de desaparecer de golpe.
  useEffect(() => {
    if (proyecto) {
      setDisplayProyecto(proyecto);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const t = setTimeout(() => setDisplayProyecto(null), 200);
    return () => clearTimeout(t);
  }, [proyecto]);

  useEffect(() => {
    if (!proyecto) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [proyecto, onClose]);

  useEffect(() => {
    if (!proyecto || proyecto.galeria.length < 2) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % proyecto.galeria.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [proyecto]);

  if (!displayProyecto) return null;

  return (
    <div
      className={`fixed inset-0 z-[3000] flex items-center justify-center bg-brand-ink/80 p-[4%] backdrop-blur-sm transition-opacity duration-200 ease-out-strong ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-[1.5rem] bg-white/[0.05] p-[0.4rem] ring-1 ring-white/15 transition-[transform,opacity] duration-200 ease-out-strong ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } h-[85vh] w-full sm:h-[50vh] sm:w-[50vw]`}
      >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.2rem] bg-[#0c1e16] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:flex-row">
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-[3%] top-[3%] z-20 flex h-[2.2em] w-[2.2em] items-center justify-center rounded-full bg-brand-ink/60 text-brand-gray transition-colors duration-160 ease-out hover:bg-brand-ink/90"
        >
          <svg width="42%" height="42%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="relative h-[32%] w-full shrink-0 overflow-hidden sm:h-full sm:w-[45%]">
          {displayProyecto.galeria.map((src, i) => (
            <div key={src} className="absolute inset-0 transition-opacity duration-700 ease-out" style={{ opacity: i === slide ? 1 : 0 }}>
              <Image src={src} alt={`${displayProyecto.nombre} foto ${i + 1}`} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-[0.5em] p-[4%]">
            {displayProyecto.galeria.map((src, i) => (
              <span
                key={src}
                className="h-[0.4em] w-[0.4em] rounded-full transition-colors duration-200 ease-out"
                style={{ background: i === slide ? "var(--color-tech-green)" : "rgba(228,236,230,0.35)" }}
              />
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-hidden p-[5%] pb-0">
            <div className="flex items-start justify-between gap-[1em] pr-[2.5em]">
              <div>
                <p className="text-[0.78em] tracking-[0.15em] text-tech-green">{displayProyecto.ubicacion}</p>
                <h3 className="mt-[0.15em] font-display text-[1.4em] font-light text-brand-gray">{displayProyecto.nombre}</h3>
              </div>
              <ProjectMonogram ubicacion={displayProyecto.ubicacion} />
            </div>

            <div className="mt-[0.7em] grid grid-cols-2 gap-[1em] text-[0.8em]">
              <div>
                <p className="flex items-center gap-[0.4em] text-brand-gray/50">
                  <Icon name="road" className="shrink-0" /> Extensión
                </p>
                <p className="mt-[0.2em] text-brand-gray">{displayProyecto.extension}</p>
              </div>
              <div>
                <p className="text-brand-gray/50">Lotes disponibles</p>
                <div className="mt-[0.3em] h-[0.4em] w-full overflow-hidden rounded-full bg-brand-gray/15">
                  <div className="h-full rounded-full bg-tech-green" style={{ width: `${displayProyecto.lotesDisponiblesPct}%` }} />
                </div>
                <p className="mt-[0.2em] text-brand-gray">{displayProyecto.lotesDisponiblesPct}% disponible</p>
              </div>
            </div>

            <div className="mt-[0.7em]">
              <p className="text-[0.75em] text-brand-gray/50">Beneficios</p>
              <div className="mt-[0.35em] flex flex-wrap gap-[0.35em]">
                {displayProyecto.beneficiosCortos.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </div>
            </div>

            <div className="mt-[0.6em]">
              <p className="text-[0.75em] text-brand-gray/50">Áreas comunes</p>
              <div className="mt-[0.35em] flex flex-wrap gap-[0.35em]">
                {displayProyecto.areasComunes.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end p-[5%] pt-[0.8em]">
            <Link
              href={`/proyectos/${displayProyecto.slug}`}
              className="group inline-flex items-center gap-[0.6em] rounded-full bg-tech-green py-[0.35em] pl-[1.4em] pr-[0.35em] text-[0.85em] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97]"
            >
              Conoce más
              <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-brand-ink/10 transition-transform duration-200 ease-out-strong group-hover:translate-x-[0.15em]">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
