"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const WIDTH_CAP_FRACTION = 0.42;

type AreaScaledCornerImageProps = {
  src: string;
  alt: string;
  ratio: number; // width / height
  areaFraction: number; // fraction of viewport area the image should cover
  cssVar: string; // CSS custom property name exposing the rendered width, for siblings to reserve space
  priority?: boolean;
};

export default function AreaScaledCornerImage({
  src,
  alt,
  ratio,
  areaFraction,
  cssVar,
  priority,
}: AreaScaledCornerImageProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    function update() {
      const raw = Math.sqrt(areaFraction * ratio * window.innerWidth * window.innerHeight);
      // En pantallas verticales (retrato) el % de área da un ancho desproporcionado
      // (ej. 20% del área de un móvil vertical ocuparía ~75% del ancho). El techo
      // solo aplica en retrato; en horizontal (el caso pedido) siempre se respeta
      // el % de área exacto, sin importar cuánto ancho ocupe.
      const isPortrait = window.innerHeight > window.innerWidth;
      const width = isPortrait ? Math.min(raw, window.innerWidth * WIDTH_CAP_FRACTION) : raw;
      setSize({ width, height: width / ratio });
      document.documentElement.style.setProperty(cssVar, `${width}px`);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ratio, areaFraction, cssVar]);

  if (!size) return null;

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 z-0"
      style={{ width: size.width, height: size.height }}
    >
      <Image src={src} alt={alt} fill className="object-contain object-bottom" priority={priority} />
    </div>
  );
}
