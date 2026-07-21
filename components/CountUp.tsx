"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta ascendente al entrar en viewport. Recibe el string tal cual
 * ("+320", "100%", "10") y anima solo la parte numérica, respetando prefijo
 * ("+") y sufijo ("%"). Respeta prefers-reduced-motion (muestra el final).
 */
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d[\d,.]*)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";
  const target = Number(numStr.replace(/[,.]/g, ""));
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(Number.isFinite(target) ? "0" : numStr);

  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const el = ref.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!el || typeof IntersectionObserver === "undefined" || reduce) {
      setDisplay(numStr);
      return;
    }
    let raf = 0;
    let started = false;
    const run = (t0: number) => {
      const step = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const current = target * eased;
        setDisplay(
          decimals > 0
            ? current.toFixed(decimals)
            : Math.round(current).toLocaleString("es-PE")
        );
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          run(performance.now());
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, numStr, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
