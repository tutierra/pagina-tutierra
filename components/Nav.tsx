"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { CONTACT } from "@/lib/site-data";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/refiere-y-gana", label: "Refiere y Gana" },
  { href: "/contactanos", label: "Contáctanos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center"
    >
      <nav className="relative flex items-center gap-[1.28em] overflow-hidden rounded-b-[1.04em] border border-t-0 border-white/15 bg-white/10 px-[1.28em] py-[0.72em] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:gap-[1.92em] sm:px-[1.6em]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />
        <Link href="/" className="shrink-0 text-brand-gray" aria-label="Tutierra — Inicio">
          <Logo className="text-[0.8rem] sm:text-[0.92rem]" />
        </Link>

        <ul className="hidden items-center gap-[1.6em] md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[0.72rem] tracking-[0.01em] text-brand-gray/85 transition-colors duration-200 ease-out hover:text-tech-green ${
                    active ? "text-tech-green" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-[0.28em] left-0 h-[1.5px] bg-tech-green transition-[width] duration-200 ease-out ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-full bg-tech-green px-[1.04em] py-[0.44em] text-[0.656rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.96] active:scale-[0.96] md:block"
        >
          Agenda una visita
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="flex h-[1.6em] w-[1.6em] shrink-0 flex-col items-center justify-center gap-[0.24em] md:hidden"
        >
          <span
            className={`block h-[1.5px] w-[0.96em] bg-brand-gray transition-transform duration-200 ease-out ${
              open ? "translate-y-[0.288em] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-[0.96em] bg-brand-gray transition-opacity duration-200 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-[0.96em] bg-brand-gray transition-transform duration-200 ease-out ${
              open ? "-translate-y-[0.288em] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`absolute left-1/2 top-full mt-[0.48em] w-[88vw] max-w-[22rem] -translate-x-1/2 overflow-hidden rounded-[0.96em] border border-white/15 bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-1px_0_0_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? "max-h-[30rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-[0.88em] p-[6%]">
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              className={`transition-[opacity,transform] duration-300 ease-out-strong ${
                open ? "translate-y-0 opacity-100" : "translate-y-[0.6em] opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                className={`text-[0.84rem] text-brand-gray/90 transition-colors duration-200 ease-out hover:text-tech-green ${
                  pathname === link.href ? "text-tech-green" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            className={`transition-[opacity,transform] duration-300 ease-out-strong ${
              open ? "translate-y-0 opacity-100" : "translate-y-[0.6em] opacity-0"
            }`}
            style={{ transitionDelay: open ? `${LINKS.length * 45}ms` : "0ms" }}
          >
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-tech-green px-[1.12em] py-[0.48em] text-[0.72rem] text-brand-ink transition-transform duration-160 ease-out-strong active:scale-[0.96]"
            >
              Agenda una visita
            </a>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
