"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RadialCardCarousel from "@/components/RadialCardCarousel"
import Reveal from "@/components/Reveal"

interface Testimonio {
  nombre: string
  proyecto: string
  texto: string
  imagen: string
}

interface TestimoniosInteractiveSectionProps {
  testimonios: Testimonio[]
}

export default function TestimoniosInteractiveSection({
  testimonios,
}: TestimoniosInteractiveSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const carouselItems = testimonios.map((t) => t.imagen)

  return (
    <section className="flex min-h-dvh w-full flex-col justify-center items-center py-[8%] border-t border-brand-gray/10">
      <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-[3em] items-center">
          
          {/* Left Column: Radial Carousel of client photos */}
          <div className="relative w-full h-[52vh] overflow-visible pointer-events-none select-none">
            <RadialCardCarousel
              items={carouselItems}
              onActiveIndexChange={(index) => {
                setActiveIndex(index)
              }}
            />
          </div>

          {/* Right Column: Active Client Testimonial Text & Info */}
          <div className="relative flex flex-col justify-center pl-0 lg:pl-6">
            <Reveal>
              <div className="min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col justify-center"
                  >
                    {/* Big Quote Symbol */}
                    <span className="text-tech-green text-6xl font-serif leading-none select-none">“</span>
                    
                    <blockquote className="text-[clamp(1.15rem,2.2vw,1.45rem)] leading-[1.65] text-brand-gray/90 font-light italic mt-1 max-w-[42ch]">
                      {testimonios[activeIndex]?.texto}
                    </blockquote>
                    
                    <div className="mt-8 border-t border-brand-gray/10 pt-5">
                      <cite className="not-italic text-[1.15rem] font-semibold text-brand-gray block">
                        {testimonios[activeIndex]?.nombre}
                      </cite>
                      <span className="text-[0.85rem] font-medium tracking-wide uppercase text-tech-green/80 mt-1 block">
                        {testimonios[activeIndex]?.proyecto}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
