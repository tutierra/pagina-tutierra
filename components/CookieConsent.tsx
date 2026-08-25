"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Preference switches
  const [essential] = useState(true); // Always true
  const [marketing, setMarketing] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    // Check if user already made a choice
    const savedConsent = localStorage.getItem("tutierra_cookie_consent");
    if (!savedConsent) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Apply existing marketing cookies/scripts
      applyCookiePreferences(JSON.parse(savedConsent));
    }
  }, []);

  function applyCookiePreferences(prefs: { essential: boolean; marketing: boolean; analytics: boolean }) {
    // Save to localStorage and document.cookie
    localStorage.setItem("tutierra_cookie_consent", JSON.stringify(prefs));
    document.cookie = `tutierra_cookie_marketing=${prefs.marketing ? "true" : "false"}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `tutierra_cookie_analytics=${prefs.analytics ? "true" : "false"}; path=/; max-age=31536000; SameSite=Lax`;

    // Enable Marketing / Tracking scripts if accepted
    if (prefs.marketing && typeof window !== "undefined") {
      (window as any).marketingCookiesEnabled = true;
      console.log("Cookies impresindibles de marketing activadas correctamente.");
    }
  }

  function handleAcceptAll() {
    const prefs = { essential: true, marketing: true, analytics: true };
    applyCookiePreferences(prefs);
    setIsVisible(false);
  }

  function handleAcceptMarketingOnly() {
    const prefs = { essential: true, marketing: true, analytics: false };
    applyCookiePreferences(prefs);
    setIsVisible(false);
  }

  function handleSaveCustom() {
    const prefs = { essential: true, marketing, analytics };
    applyCookiePreferences(prefs);
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-[480px] z-[6000]"
        >
          <div className="bg-brand-ink/95 border border-brand-gray/20 p-6 rounded-[1.5rem] shadow-2xl backdrop-blur-md text-brand-gray flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[1.2rem]">🍪</span>
                <h4 className="font-display text-[1.1rem] text-white font-light">
                  Preferencias de Cookies
                </h4>
              </div>
              <span className="text-[0.7rem] bg-tech-green/10 border border-tech-green/30 text-tech-green px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                Marketing Activo
              </span>
            </div>

            <p className="text-[0.82rem] leading-[1.6] text-brand-gray/80">
              Utilizamos cookies impresindibles para el correcto funcionamiento de la web y cookies de{" "}
              <strong className="text-white">marketing</strong> para mostrarte proyectos inmobiliarios relevantes en tus redes sociales y medir el rendimiento.
            </p>

            {/* Modal de Configuración Personalizada */}
            {showConfig && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-3 border-t border-brand-gray/15 pt-3 mt-1"
              >
                <div className="flex items-center justify-between text-[0.8rem]">
                  <span className="font-semibold text-white">1. Impresindibles (Técnicas)</span>
                  <span className="text-tech-green font-semibold">Siempre Activa</span>
                </div>
                <div className="flex items-center justify-between text-[0.8rem]">
                  <span className="font-semibold text-white">2. Cookies de Marketing</span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-4 w-4 rounded accent-tech-green cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between text-[0.8rem]">
                  <span className="font-semibold text-white">3. Analítica y Estadísticas</span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-4 w-4 rounded accent-tech-green cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* Acciones */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-gray/10">
              {showConfig ? (
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 rounded-full bg-tech-green px-4 py-2.5 text-[0.8rem] font-semibold text-brand-ink hover:scale-[0.98] transition-transform text-center"
                >
                  Guardar Mi Configuración
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 rounded-full bg-tech-green px-4 py-2.5 text-[0.8rem] font-semibold text-brand-ink hover:scale-[0.98] transition-transform text-center"
                  >
                    Aceptar Todas
                  </button>
                  <button
                    onClick={handleAcceptMarketingOnly}
                    className="rounded-full bg-white/[0.06] border border-brand-gray/20 px-4 py-2.5 text-[0.8rem] font-medium text-brand-gray hover:text-white transition-colors"
                  >
                    Marketing
                  </button>
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="text-[0.75rem] text-brand-gray/60 hover:text-brand-gray underline px-2 py-1"
                  >
                    Ajustar
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
