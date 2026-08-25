"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface RoundCarouselImage {
  src: string;
  title?: string;
  subtitle?: string;
  price?: string;
  badge?: string;
}

interface RoundCarouselProps {
  images: RoundCarouselImage[];
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string;
  dwell?: number;
  style?: React.CSSProperties;
}

export default function RoundCarousel({
  images,
  imageWidth = 13.75,
  imageHeight = 13.75,
  spacing = 3,
  speed = 7,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -7,
  perspective = 187.5,
  cornerRadius = 1.375,
  innerDim = 3.5,
  background = "transparent",
  dwell = 0,
  style = {},
}: RoundCarouselProps) {
  let items = images || [];
  if (items.length === 1) {
    items = [items[0], items[0], items[0], items[0]];
  } else if (items.length === 2) {
    items = [items[0], items[1], items[0], items[1]];
  } else if (items.length === 3) {
    items = [items[0], items[1], items[2], items[0], items[1], items[2]];
  }
  const count = items.length;

  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  // Modo dwell: gira una carta, se detiene `dwell` segundos, avanza.
  const targetRef = useRef(0);
  const dwellAccRef = useRef(0);

  const angle = 360 / count;
  const factor = 1 + spacing * 0.15;
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx = cornerRadius;
  const dir = direction === "left" ? -1 : 1;
  const degPerSec = speed * 6 * dir;

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => {
      const t = `translateZ(${-radius}rem) rotateY(${rotYRef.current}deg)`;
      ring.style.transform = t;
      // Safari móvil a veces solo respeta la propiedad -webkit- en cadenas
      // 3D anidadas (preserve-3d + perspective); se fija en paralelo.
      ring.style.setProperty("-webkit-transform", t);
    };
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;

      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          // Inercia tras soltar el drag.
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else if (dwell > 0) {
          // Paso + pausa: avanza hacia la siguiente carta, luego espera.
          const diff = targetRef.current - rotYRef.current;
          const step = degPerSec * 3 * f; // velocidad de transición entre cartas
          if (Math.abs(diff) <= Math.abs(step) || Math.abs(step) < 0.001) {
            rotYRef.current = targetRef.current;
            dwellAccRef.current += dt;
            if (dwellAccRef.current >= dwell) {
              dwellAccRef.current = 0;
              targetRef.current -= angle * dir;
            }
          } else {
            rotYRef.current += Math.sign(diff) * Math.abs(step);
          }
        } else {
          // Rotación continua.
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count, dwell, angle, dir]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!drag) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.active = false;
    if (dwell > 0) {
      // Al soltar, ancla a la carta más cercana para retomar el ciclo.
      targetRef.current = Math.round(rotYRef.current / angle) * angle;
      dwellAccRef.current = 0;
    }
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: `${radiusPx}rem`,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };


  return (
    <div
      style={{
        ...style,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // overflow visible: sin esto la carta frontal (más grande por la
        // perspectiva) se recortaba contra el borde del contenedor.
        overflow: "visible",
        background,
        perspective: `${perspective}rem`,
        WebkitPerspective: `${perspective}rem`,
        cursor: drag ? "grab" : "default",
        // pan-y: deja pasar el scroll vertical de la página en móvil; el drag
        // horizontal del carrusel sigue funcionando.
        touchAction: "pan-y",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
          WebkitTransform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: `${imageWidth}rem`,
            height: `${imageHeight}rem`,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
        >
          {items.map((img, i) => {
            const src = img?.src;
            const cardTransform = `rotateY(${i * angle}deg) translateZ(${radius}rem)`;
            return (
              <div
                key={i}
                className="rc-card"
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: cardTransform,
                  WebkitTransform: cardTransform,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
                >
                  <div
                    style={{
                      ...faceBase,
                      backgroundColor: src ? "transparent" : "#222",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    }}
                  >
                    {src && (
                      <img
                        src={src}
                        alt=""
                        draggable={false}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      ...faceBase,
                      transform: "rotateY(180deg)",
                      WebkitTransform: "rotateY(180deg)",
                      backgroundColor: src ? "transparent" : "#181818",
                    }}
                  >
                    {src && (
                      <img
                        src={src}
                        alt=""
                        draggable={false}
                        className="w-full h-full object-cover select-none pointer-events-none"
                        style={{ filter: `brightness(${innerDim / 10})` }}
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
