"use client";

import { useState } from "react";
import { PROYECTOS } from "@/lib/site-data";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm({ proyectoPreseleccionado }: { proyectoPreseleccionado?: string }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [proyecto, setProyecto] = useState(proyectoPreseleccionado ?? "");
  const [mensaje, setMensaje] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);

    const proyectoLabel =
      PROYECTOS.find((p) => p.slug === proyecto)?.nombre ?? "No especificado";

    try {
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          proyecto: proyectoLabel,
          mensaje,
          origen: "Formulario Principal de Contacto",
        }),
      });
    } catch (err) {
      console.error("Error al registrar lead:", err);
    }

    setCargando(false);
    setShowPopup(true);
    setNombre("");
    setTelefono("");
    setEmail("");
    setMensaje("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[1.4em]">
        <div className="grid grid-cols-1 gap-[1.4em] sm:grid-cols-2">
          <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
            Nombre completo
            <input
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-[1em] py-[0.8em] text-[0.95rem] text-white outline-none transition-colors duration-200 ease-out focus:border-tech-green"
              placeholder="Tu nombre"
            />
          </label>
          <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
            Teléfono / WhatsApp
            <input
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-[1em] py-[0.8em] text-[0.95rem] text-white outline-none transition-colors duration-200 ease-out focus:border-tech-green"
              placeholder="+51 9xx xxx xxx"
            />
          </label>
        </div>

        <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
          Correo electrónico
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-[1em] py-[0.8em] text-[0.95rem] text-white outline-none transition-colors duration-200 ease-out focus:border-tech-green"
            placeholder="tucorreo@email.com"
          />
        </label>

        <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
          Proyecto de interés
          <select
            value={proyecto}
            onChange={(e) => setProyecto(e.target.value)}
            className="rounded-[0.6rem] border border-brand-gray/20 bg-brand-ink px-[1em] py-[0.8em] text-[0.95rem] text-white outline-none transition-colors duration-200 ease-out focus:border-tech-green cursor-pointer"
          >
            <option value="">Aún no estoy seguro</option>
            {PROYECTOS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
          Mensaje (opcional)
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            className="resize-none rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-[1em] py-[0.8em] text-[0.95rem] text-white outline-none transition-colors duration-200 ease-out focus:border-tech-green"
            placeholder="Quiero agendar una visita al proyecto..."
          />
        </label>

        <button
          type="submit"
          disabled={cargando}
          className="mt-[0.5em] rounded-full bg-tech-green px-[1.8em] py-[0.9em] text-[0.95rem] text-brand-ink font-semibold transition-transform duration-160 ease-out hover:scale-[0.98] active:scale-[0.98] cursor-pointer disabled:opacity-50"
        >
          {cargando ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>

      {/* POPUP MODAL DE AGRADECIMIENTO */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-md w-full bg-brand-ink border border-tech-green/40 p-8 rounded-[1.5rem] text-center shadow-2xl flex flex-col items-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tech-green/15 text-tech-green border border-tech-green/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-display text-[1.5rem] text-white font-light">
                ¡Gracias por contactarnos!
              </h3>

              <p className="text-[0.95rem] text-brand-gray/80 leading-[1.6]">
                Un asesor se contactará lo más pronto posible contigo.
              </p>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-2 rounded-full bg-tech-green px-8 py-2.5 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.97]"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
