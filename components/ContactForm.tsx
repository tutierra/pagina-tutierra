"use client";

import { useState } from "react";
import { PROYECTOS, CONTACT } from "@/lib/site-data";

export default function ContactForm({ proyectoPreseleccionado }: { proyectoPreseleccionado?: string }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [proyecto, setProyecto] = useState(proyectoPreseleccionado ?? "");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const proyectoLabel =
      PROYECTOS.find((p) => p.slug === proyecto)?.nombre ?? "No especificado";

    const texto = encodeURIComponent(
      `Hola, soy ${nombre}.\n` +
        `Teléfono: ${telefono}\n` +
        `Email: ${email}\n` +
        `Proyecto de interés: ${proyectoLabel}\n` +
        `Mensaje: ${mensaje || "Quiero agendar una visita."}`
    );

    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${texto}`, "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[1.4em]">
      <div className="grid grid-cols-1 gap-[1.4em] sm:grid-cols-2">
        <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
          Nombre completo
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="rounded-[0.6rem] border border-brand-gray/20 bg-transparent px-[1em] py-[0.8em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
            placeholder="Tu nombre"
          />
        </label>
        <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
          Teléfono / WhatsApp
          <input
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="rounded-[0.6rem] border border-brand-gray/20 bg-transparent px-[1em] py-[0.8em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
            placeholder="+51 9xx xxx xxx"
          />
        </label>
      </div>

      <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
        Correo electrónico
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-[0.6rem] border border-brand-gray/20 bg-transparent px-[1em] py-[0.8em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
          placeholder="tucorreo@email.com"
        />
      </label>

      <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
        Proyecto de interés
        <select
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          className="rounded-[0.6rem] border border-brand-gray/20 bg-background px-[1em] py-[0.8em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
        >
          <option value="">Aún no estoy seguro</option>
          {PROYECTOS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
        Mensaje (opcional)
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={4}
          className="resize-none rounded-[0.6rem] border border-brand-gray/20 bg-transparent px-[1em] py-[0.8em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
          placeholder="Quiero agendar una visita al proyecto..."
        />
      </label>

      <button
        type="submit"
        className="mt-[0.5em] rounded-full bg-tech-green px-[1.8em] py-[0.9em] text-[0.95rem] text-brand-ink transition-transform duration-160 ease-out hover:scale-[0.97]"
      >
        Enviar por WhatsApp
      </button>

      {enviado && (
        <p className="text-[0.85rem] text-tech-green">
          Se abrió WhatsApp con tu mensaje. Si no se abrió, escríbenos directo al {CONTACT.phone}.
        </p>
      )}
    </form>
  );
}
