"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal fade-up al entrar en viewport. IntersectionObserver propio (no framer
 * whileInView) porque con el ScrollJacker en móvil el disparo de framer podía
 * no ejecutarse y dejaba la sección invisible. Failsafes: si no hay IO, o si
 * nunca intersecta en 1.2s, se muestra igual. El contenido NUNCA queda oculto.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    // Failsafe: si por lo que sea nunca intersecta, revelar de todos modos.
    const t = setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 1200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
