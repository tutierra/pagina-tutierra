"use client";

import { useState } from "react";
import Image from "next/image";

interface ProyectoCarouselProps {
  imagenes: string[];
}

export default function ProyectoCarousel({ imagenes }: ProyectoCarouselProps) {
  const [index, setIndex] = useState(0);

  function handlePrev() {
    setIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  }

  function handleNext() {
    setIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Viewport */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-brand-gray/10 group bg-black/20">
        <Image
          src={imagenes[index]}
          alt={`Vista de proyecto ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 ease-out"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/65 hover:scale-105 active:scale-95 z-10"
          aria-label="Imagen anterior"
        >
          <span className="text-[1.2rem]">←</span>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/65 hover:scale-105 active:scale-95 z-10"
          aria-label="Imagen siguiente"
        >
          <span className="text-[1.2rem]">→</span>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-[0.8rem] text-brand-gray/90 backdrop-blur-sm">
          {index + 1} / {imagenes.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {imagenes.map((img, idx) => (
          <button
            key={img}
            onClick={() => setIndex(idx)}
            className={`relative aspect-[16/10] w-[100px] shrink-0 overflow-hidden rounded-[0.6rem] border transition-all ${
              idx === index
                ? "border-tech-green ring-1 ring-tech-green scale-[0.98]"
                : "border-brand-gray/10 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
