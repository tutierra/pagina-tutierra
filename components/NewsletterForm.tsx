"use client";

import { useState } from "react";

// Sin backend real todavía: valida el correo y muestra confirmación local.
// Conectar luego a un servicio (Mailchimp, Resend, etc.).
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-start gap-[0.6em] rounded-[1rem] border border-tech-green/40 bg-tech-green/10 p-[1.4em]">
        <span className="flex h-[2.2em] w-[2.2em] items-center justify-center rounded-full bg-tech-green text-brand-ink">
          <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-[1rem] text-brand-gray">Listo, {email.split("@")[0]}.</p>
        <p className="text-[0.9rem] leading-[1.6] text-brand-gray/65">
          Te sumamos a la lista. Vas a recibir nuevos lotes, avances de obra y oportunidades
          antes que nadie.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[1em]">
      <label className="flex flex-col gap-[0.5em] text-[0.85rem] text-brand-gray/70">
        Correo electrónico
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@email.com"
          className="rounded-[0.6rem] border border-brand-gray/20 bg-transparent px-[1em] py-[0.9em] text-[0.95rem] text-brand-gray outline-none transition-colors duration-200 ease-out focus:border-tech-green"
        />
      </label>
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-[0.6em] rounded-full bg-tech-green py-[0.35em] pl-[1.4em] pr-[0.35em] text-[0.95rem] text-brand-ink transition-transform duration-160 ease-out-strong hover:scale-[0.98] active:scale-[0.97]"
      >
        Suscribirme
        <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-brand-ink/10 transition-transform duration-200 ease-out-strong group-hover:translate-x-[0.15em]">
          →
        </span>
      </button>
      <p className="text-[0.78rem] leading-[1.5] text-brand-gray/45">
        Sin spam. Puedes darte de baja cuando quieras.
      </p>
    </form>
  );
}
