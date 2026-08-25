"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { Proyecto } from "@/lib/site-data";
import ProyectoModal from "./ProyectoModal";

/**
 * Coverflow de proyectos — adaptado de un componente Originkit para Framer.
 * Mecánica intacta: una tarjeta activa grande y "tablillas" delgadas a los
 * costados, todas posicionadas por su offset relativo al índice activo vía un
 * único MotionValue (pos) que mueve un rAF propio. Se le quitó todo lo
 * específico de Framer (RenderTarget, export/thumbnail, controles de
 * propiedades) y se le agregó overlay de datos del proyecto + navegación.
 */

const RENDER_RANGE = 6;

type Sizing = { restWidth: number; restHeight: number; activeWidth: number; activeHeight: number };

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count;
  if (rel > count / 2) rel -= count;
  return rel;
}

function xForRel(rel: number, s: Sizing, gap: number): number {
  const ar = Math.abs(rel);
  const c1 = s.activeWidth / 2 + gap + s.restWidth / 2;
  const pitch = s.restWidth + gap;
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
  return (rel < 0 ? -1 : 1) * mag;
}

function blendForRel(rel: number): number {
  return Math.min(Math.abs(rel), 1);
}

function Card({
  proyecto,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  onSelect,
  onOpenDetail,
}: {
  proyecto: Proyecto;
  index: number;
  pos: MotionValue<number>;
  count: number;
  R: number;
  sizing: Sizing;
  gap: number;
  radius: number;
  onSelect: (index: number) => void;
  onOpenDetail: (proyecto: Proyecto) => void;
}) {
  const x = useTransform(pos, (p) => xForRel(relOf(index, p, count), sizing, gap));
  const opacity = useTransform(pos, (p) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
  });
  const zIndex = useTransform(pos, (p) => Math.round(1000 - Math.abs(relOf(index, p, count)) * 100));
  const width = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
  });
  const height = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
  });
  const borderRadius = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    const w = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
    const h = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
    return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 2);
  });
  const boxShadow = useTransform(pos, (p) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "0 24px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
      : "0 14px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)"
  );
  const captionOpacity = useTransform(pos, (p) => 1 - blendForRel(relOf(index, p, count)));
  const captionPointerEvents = useTransform(pos, (p) =>
    Math.abs(relOf(index, p, count)) < 0.5 ? "auto" : "none"
  );

  return (
    <motion.div
      onClick={() => {
        if (Math.abs(relOf(index, pos.get(), count)) < 0.5) {
          onOpenDetail(proyecto);
        } else {
          onSelect(index);
        }
      }}
      style={{ position: "absolute", left: "50%", bottom: 0, x, zIndex, opacity, cursor: "pointer" }}
    >
      <motion.div
        style={{
          x: "-50%",
          width,
          height,
          borderRadius,
          overflow: "hidden",
          background: "#0e5336",
          boxShadow,
        }}
      >
        <img
          src={proyecto.imagenPrincipal}
          alt={proyecto.nombre}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none", userSelect: "none" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        {proyecto.clausurado && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-20">
            Vendido
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent" />
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 p-[6%]"
          style={{
            opacity: captionOpacity,
            pointerEvents: captionPointerEvents,
            // Tamaño de fuente atado al ancho de la tarjeta activa (no fijo en rem),
            // así el caption escala junto con la tarjeta en cualquier pantalla.
            // Piso de 11px para que no quede ilegible en tarjetas chicas de mobile.
            fontSize: Math.max(11, sizing.activeWidth / 34),
          }}
        >
          <p className="text-[0.8em] tracking-[0.15em] text-tech-green">{proyecto.ubicacion}</p>
          <h3 className="mt-[0.3em] font-display text-[1.5em] font-light text-brand-gray">
            {proyecto.nombre}
          </h3>
          <p className="mt-[0.6em] text-[0.85em] text-brand-gray/70">
            {proyecto.clausurado ? (
              <span className="font-semibold text-red-500 tracking-wide">100% VENDIDO</span>
            ) : (
              `Desde ${proyecto.precioDesde} · ${proyecto.areaDesde}`
            )}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(proyecto);
            }}
            className="mt-[1em] inline-flex items-center gap-[0.5em] text-[0.85em] text-brand-gray transition-colors duration-200 ease-out hover:text-tech-green"
          >
            Descubre el proyecto <span>→</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Anterior" : "Siguiente"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute top-1/2 z-[2000] flex h-[3em] w-[3em] -translate-y-1/2 items-center justify-center rounded-full bg-brand-gray text-brand-ink shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-transform duration-160 ease-out-strong hover:scale-[0.94] active:scale-[0.94]"
      style={{ [isLeft ? "left" : "right"]: "0" }}
    >
      <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

export default function ProyectosCoverflow({ proyectos }: { proyectos: Proyecto[] }) {
  const count = proyectos.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [openProyecto, setOpenProyecto] = useState<Proyecto | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sizing: Sizing = useMemo(() => {
    // En pantallas angostas la tarjeta activa domina casi todo el ancho
    // (estilo carrusel de una tarjeta con vecinas asomando); en desktop
    // se ve la composición completa tipo coverflow.
    const activeFraction = containerWidth < 640 ? 0.72 : 0.42;
    const activeWidth = containerWidth * activeFraction;
    const activeHeight = activeWidth / 1.5;
    const restWidth = activeWidth / 3;
    const restHeight = restWidth / 0.7407;
    return { activeWidth, activeHeight, restWidth, restHeight };
  }, [containerWidth]);

  const stageHeight = Math.max(sizing.activeHeight, sizing.restHeight);
  const gap = sizing.activeWidth * 0.06;
  const radius = 5;
  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1));

  const pos = useMotionValue(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number | null>(null);
  const autoplayingRef = useRef(true);
  const dwellAccRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion);
  reducedRef.current = prefersReducedMotion;

  const moveDur = 0.5;
  const dwell = 2.6;

  const tick = useCallback(
    (t: number) => {
      const last = lastTRef.current ?? t;
      const dt = Math.min((t - last) / 1000, 1 / 30);
      lastTRef.current = t;

      const cur = pos.get();
      const diff = targetRef.current - cur;
      const step = (1 / moveDur) * dt;
      const arriving = reducedRef.current || Math.abs(diff) <= step;

      if (arriving) {
        pos.set(targetRef.current);
        if (autoplayingRef.current) {
          dwellAccRef.current += dt;
          if (dwellAccRef.current >= dwell) {
            dwellAccRef.current = 0;
            targetRef.current += 1;
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        rafRef.current = null;
        lastTRef.current = null;
        return;
      }

      pos.set(cur + Math.sign(diff) * step);
      rafRef.current = requestAnimationFrame(tick);
    },
    [pos]
  );

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const goNext = useCallback(() => {
    autoplayingRef.current = false;
    targetRef.current += 1;
    ensureRunning();
  }, [ensureRunning]);
  const goPrev = useCallback(() => {
    autoplayingRef.current = false;
    targetRef.current -= 1;
    ensureRunning();
  }, [ensureRunning]);
  const openDetail = useCallback((proyecto: Proyecto) => {
    autoplayingRef.current = false;
    setOpenProyecto(proyecto);
  }, []);
  const goTo = useCallback(
    (index: number) => {
      autoplayingRef.current = false;
      const cur = targetRef.current;
      let d = index - cur;
      d = ((d % count) + count) % count;
      if (d > count / 2) d -= count;
      targetRef.current = cur + d;
      ensureRunning();
    },
    [ensureRunning, count]
  );

  useEffect(() => {
    ensureRunning();
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [ensureRunning]);

  const isHoveredRef = useRef(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
      onFocus={() => (isHoveredRef.current = true)}
      onBlur={() => (isHoveredRef.current = false)}
      className="relative w-full outline-none"
      style={{ height: stageHeight || 1 }}
    >
      {containerWidth > 0 && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            isolation: "isolate",
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {proyectos.map((proyecto, i) => (
            <Card
              key={proyecto.slug}
              proyecto={proyecto}
              index={i}
              pos={pos}
              count={count}
              R={R}
              sizing={sizing}
              gap={gap}
              radius={radius}
              onSelect={goTo}
              onOpenDetail={openDetail}
            />
          ))}
        </div>
      )}
      <ArrowButton side="left" onClick={goPrev} />
      <ArrowButton side="right" onClick={goNext} />
      <ProyectoModal proyecto={openProyecto} onClose={() => setOpenProyecto(null)} />
    </div>
  );
}
