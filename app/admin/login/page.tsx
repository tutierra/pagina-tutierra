"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error de red o de servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-brand-ink px-4 py-12">
      <div className="w-full max-w-[420px] rounded-[1.5rem] bg-white/[0.03] p-[0.5rem] ring-1 ring-white/10 shadow-2xl">
        <div className="rounded-[1.2rem] border border-brand-gray/10 p-8 text-center bg-brand-ink/90">
          <div className="flex justify-center mb-6">
            <Image
              src="/emblem-white.png"
              alt="Tutierra"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          <h1 className="font-display text-[1.8rem] font-light text-brand-gray tracking-wide">
            Panel de Control
          </h1>
          <p className="mt-1 text-[0.85rem] text-brand-gray/55">
            Ingresa tus credenciales para administrar Tutierra
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 text-left">
            <div>
              <label className="text-[0.75rem] font-semibold tracking-wider text-brand-gray/60 uppercase">
                Usuario
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-[0.8rem] border border-brand-gray/10 bg-white/[0.02] px-4 py-3 text-[0.95rem] text-brand-gray placeholder-brand-gray/30 outline-none focus:border-tech-green transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-[0.75rem] font-semibold tracking-wider text-brand-gray/60 uppercase">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-[0.8rem] border border-brand-gray/10 bg-white/[0.02] px-4 py-3 text-[0.95rem] text-brand-gray placeholder-brand-gray/30 outline-none focus:border-tech-green transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[0.85rem] text-red-400 mt-2 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full bg-tech-green py-3 text-[0.9rem] font-semibold text-brand-ink transition-all hover:scale-[0.98] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
