"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RoundCarousel from "./RoundCarousel";
import Logo from "./Logo";
interface HeroProps {
  content: { title: string; description: string; images?: string[] };
  projects: any[];
}

export default function Hero({ content, projects }: HeroProps) {
  const CAROUSEL_IMAGES = content.images && content.images.length > 0
    ? content.images.map((img) => ({ src: img }))
    : projects.map((p) => ({ src: p.imagenPrincipal }));

  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-end overflow-hidden pb-[5.6%] pt-[24.5%] md:pt-[9.8%]">
      <div className="relative z-10 mx-auto flex w-[90%] flex-col items-center gap-[2em] lg:flex-row lg:items-center lg:justify-between lg:gap-[4%]">
        <div className="w-full lg:max-w-[54%]">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo className="mb-[0.7em] text-[4.4rem] text-brand-gray ml-0" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-[0.95] text-brand-gray text-[clamp(1.4875rem,4.165vw,3.8675rem)]"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[0.952em] max-w-[46ch] text-[clamp(0.595rem,0.952vw,0.74375rem)] leading-[1.6] text-brand-gray/75"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[1.428em] flex flex-wrap items-center gap-[0.714em]"
          >
            <Link
              href="/proyectos"
              className="rounded-full bg-tech-green px-[1.071em] py-[0.5355em] text-[0.56525rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97]"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contactanos"
              className="rounded-full border border-brand-gray/30 px-[1.071em] py-[0.5355em] text-[0.56525rem] text-brand-gray transition-all duration-160 ease-out-strong hover:scale-[0.97] active:scale-[0.97] hover:border-tech-green hover:text-tech-green"
            >
              Agenda una visita
            </Link>
          </motion.div>
        </div>

        <div className="relative aspect-[9/16] h-[32rem] shrink-0 lg:mr-[3%]">
          <div className="pointer-events-none absolute inset-[-15%] rounded-full bg-tech-green/10 blur-3xl" />
          <div className="relative h-full w-full">
            <RoundCarousel
              images={CAROUSEL_IMAGES}
              imageWidth={16.5}
              imageHeight={29.2}
              cornerRadius={2.2}
              speed={4}
              dwell={2.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
