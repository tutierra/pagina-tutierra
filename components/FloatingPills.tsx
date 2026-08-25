"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/site-data";

export default function FloatingPills() {
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+51");
  const [terms, setTerms] = useState(false);
  const [platform, setPlatform] = useState<"zoom" | "teams">("zoom");
  
  // Success states
  const [showSuccessCall, setShowSuccessCall] = useState(false);
  const [showSuccessVideo, setShowSuccessVideo] = useState(false);

  // Calendar States
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 AM");

  // Escape key listener to close modales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setIsCallOpen(false);
        setIsVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Helper to generate days of the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 0 = Sunday
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    setSelectedDay(null);
  };

  // Country calling codes
  const COUNTRIES = [
    { name: "Perú", code: "+51", label: "PE (+51)" },
    { name: "Estados Unidos", code: "+1", label: "US (+1)" },
    { name: "España", code: "+34", label: "ES (+34)" },
    { name: "México", code: "+52", label: "MX (+52)" },
    { name: "Colombia", code: "+57", label: "CO (+57)" },
    { name: "Chile", code: "+56", label: "CL (+56)" },
    { name: "Argentina", code: "+54", label: "AR (+54)" },
    { name: "Bolivia", code: "+591", label: "BO (+591)" },
    { name: "Brasil", code: "+55", label: "BR (+55)" },
    { name: "Costa Rica", code: "+506", label: "CR (+506)" },
    { name: "Ecuador", code: "+593", label: "EC (+593)" },
    { name: "El Salvador", code: "+503", label: "SV (+503)" },
    { name: "Guatemala", code: "+502", label: "GT (+502)" },
    { name: "Honduras", code: "+504", label: "HN (+504)" },
    { name: "Nicaragua", code: "+505", label: "NI (+505)" },
    { name: "Panamá", code: "+507", label: "PA (+507)" },
    { name: "Paraguay", code: "+595", label: "PY (+595)" },
    { name: "Puerto Rico", code: "+1-787", label: "PR (+1)" },
    { name: "República Dominicana", code: "+1-809", label: "DO (+1)" },
    { name: "Uruguay", code: "+598", label: "UY (+598)" },
    { name: "Venezuela", code: "+58", label: "VE (+58)" },
    { name: "Canadá", code: "+1", label: "CA (+1)" },
    { name: "Reino Unido", code: "+44", label: "GB (+44)" },
    { name: "Alemania", code: "+49", label: "DE (+49)" },
    { name: "Francia", code: "+33", label: "FR (+33)" },
    { name: "Italia", code: "+39", label: "IT (+39)" }
  ];

  // Static Time Slots: 8 AM to 10:30 PM (every 30 mins)
  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM"
  ];

  // Redirection URL for WhatsApp
  const whatsappUrl = "https://api.whatsapp.com/send?phone=51925561830&text=Estuve%20navegando%20en%20la%20web%20y%20me%20gustar%C3%ADa%20invertir";

  // Submissions
  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !terms) {
      alert("Por favor completa todos los campos y acepta los términos.");
      return;
    }
    try {
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          telefono: `${countryCode} ${phone}`,
          email,
          origen: "Modal de Solicitud de Llamada (Floating Pills)",
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setShowSuccessCall(true);
    setTimeout(() => {
      setShowSuccessCall(false);
      setIsCallOpen(false);
      setName("");
      setPhone("");
      setEmail("");
      setTerms(false);
    }, 3000);
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !selectedDay || !selectedTime) {
      alert("Por favor completa los campos y selecciona fecha/hora.");
      return;
    }
    const fechaStr = `${selectedDay} de ${monthNames[currentMonth]} ${currentYear} a las ${selectedTime} (${platform.toUpperCase()})`;
    try {
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          telefono: `${countryCode} ${phone}`,
          email,
          mensaje: `Agendó Video Cita para el ${fechaStr}`,
          origen: "Modal de Video Cita (Floating Pills)",
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setShowSuccessVideo(true);
    setTimeout(() => {
      setShowSuccessVideo(false);
      setIsVideoOpen(false);
      setName("");
      setPhone("");
      setEmail("");
      setSelectedDay(today.getDate());
      setSelectedTime("10:00 AM");
    }, 3000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end md:bottom-8 md:right-8">
        {/* Pill 1: WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 items-center justify-end rounded-full border border-white/10 bg-brand-ink/65 p-3 text-brand-gray shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 ease-out-strong hover:bg-tech-green hover:text-brand-ink hover:border-tech-green/20"
        >
          <span className="max-w-0 overflow-hidden pr-0 text-[0.72rem] font-medium tracking-wide uppercase transition-all duration-300 ease-out-strong group-hover:max-w-[120px] group-hover:pr-2.5">
            WhatsApp
          </span>
          <svg
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.012 2c-5.506 0-9.97 4.463-9.97 9.97 0 1.918.543 3.707 1.483 5.23L2.005 22l4.908-1.428A9.92 9.92 0 0012.01 22c5.506 0 9.97-4.462 9.97-9.97C21.98 6.463 17.518 2 12.012 2zm0 1.782c4.526 0 8.188 3.662 8.188 8.188 0 4.526-3.662 8.188-8.188 8.188a8.136 8.136 0 01-4.29-1.218l-.307-.183-2.902.845.86-2.812-.202-.32a8.14 8.14 0 01-1.347-4.5c0-4.526 3.662-8.188 8.188-8.188zm-3.6 4.38a.65.65 0 00-.473.22c-.162.179-.623.608-.623 1.483 0 .876.637 1.722.725 1.842.088.12 1.252 1.91 3.033 2.68.424.183.754.292 1.012.374.426.135.814.116 1.12.07.342-.05 1.05-.43 1.2-.845.15-.415.15-.77.106-.845-.044-.075-.162-.12-.341-.21-.179-.09-1.05-.518-1.212-.578-.162-.06-.28-.09-.398.09-.118.18-.457.578-.56.697-.103.12-.206.135-.385.045-.179-.09-.757-.279-1.442-.89-.533-.475-.893-1.062-.997-1.242-.104-.18-.01-.277.08-.367.08-.08.18-.21.27-.315.09-.105.118-.18.177-.3a.327.327.327 0 00-.015-.315c-.044-.09-.398-.96-.546-1.315-.144-.347-.291-.3-.398-.306-.103-.005-.221-.005-.339-.005z" />
          </svg>
        </a>

        {/* Pill 2: Llamar */}
        <button
          onClick={() => {
            setIsCallOpen(true);
            setIsVideoOpen(false);
          }}
          className="group flex h-12 items-center justify-end rounded-full border border-white/10 bg-brand-ink/65 p-3.5 text-brand-gray shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 ease-out-strong hover:bg-tech-green hover:text-brand-ink hover:border-tech-green/20"
        >
          <span className="max-w-0 overflow-hidden pr-0 text-[0.72rem] font-medium tracking-wide uppercase transition-all duration-300 ease-out-strong group-hover:max-w-[120px] group-hover:pr-2.5">
            Llamar
          </span>
          <svg
            className="h-4.5 w-4.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </button>

        {/* Pill 3: Video Cita */}
        <button
          onClick={() => {
            setIsVideoOpen(true);
            setIsCallOpen(false);
          }}
          className="group flex h-12 items-center justify-end rounded-full border border-white/10 bg-brand-ink/65 p-3.5 text-brand-gray shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 ease-out-strong hover:bg-tech-green hover:text-brand-ink hover:border-tech-green/20"
        >
          <span className="max-w-0 overflow-hidden pr-0 text-[0.72rem] font-medium tracking-wide uppercase transition-all duration-300 ease-out-strong group-hover:max-w-[120px] group-hover:pr-2.5">
            Video Cita
          </span>
          <svg
            className="h-4.5 w-4.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {/* CALL POPUP MODAL */}
        {isCallOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full bg-brand-ink/95 border border-white/10 p-6 md:p-10 rounded-2xl flex flex-col md:flex-row gap-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCallOpen(false)}
                className="absolute top-4 right-4 text-brand-gray/60 hover:text-brand-gray transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Form */}
              <div className="w-full md:w-3/5 flex flex-col justify-center">
                {showSuccessCall ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tech-green/10 text-tech-green mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-display text-brand-gray mb-2">¡Gracias!</h3>
                    <p className="text-xs text-brand-gray/80">Un asesor se contactará lo más pronto posible contigo.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col border-b border-white/15 pb-2">
                      <label className="text-[0.62rem] tracking-widest text-brand-gray/55 uppercase font-medium">Nombre</label>
                      <input
                        type="text"
                        required
                        placeholder="INGRESE SU NOMBRE COMPLETO"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent text-sm text-brand-gray outline-none mt-1 uppercase placeholder:text-brand-gray/30"
                      />
                    </div>

                    <div className="flex flex-col border-b border-white/15 pb-2">
                      <label className="text-[0.62rem] tracking-widest text-brand-gray/55 uppercase font-medium">Móvil</label>
                      <div className="flex items-center gap-2 mt-1">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-transparent text-sm text-brand-gray outline-none cursor-pointer border-none p-0 max-w-[80px]"
                        >
                          {COUNTRIES.map((country) => (
                            <option key={`call-${country.code}-${country.name}`} value={country.code} className="bg-brand-ink text-brand-gray">
                              {country.label}
                            </option>
                          ))}
                        </select>
                        <span className="text-brand-gray/30">|</span>
                        <input
                          type="tel"
                          required
                          placeholder="NÚMERO DE TELÉFONO"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-transparent text-sm text-brand-gray outline-none flex-1 placeholder:text-brand-gray/30"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col border-b border-white/15 pb-2">
                      <label className="text-[0.62rem] tracking-widest text-brand-gray/55 uppercase font-medium">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="INGRESE SU CORREO ELECTRÓNICO"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent text-sm text-brand-gray outline-none mt-1 uppercase placeholder:text-brand-gray/30"
                      />
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        required
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        className="accent-tech-green mt-0.5"
                      />
                      <span className="text-[0.62rem] leading-snug text-brand-gray/60">
                        Al enviar, aceptas nuestros <span className="underline hover:text-brand-gray">términos y condiciones*</span>
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full mt-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 py-3 text-[0.7rem] font-bold tracking-widest text-brand-gray uppercase transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:scale-[0.98]"
                    >
                      Confirmar Ahora
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Connection info */}
              <div className="w-full md:w-2/5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-[0.62rem] tracking-[0.25em] text-brand-gray/50 uppercase font-semibold">Conéctate con</h4>
                    <h3 className="text-xl font-display font-light text-brand-gray tracking-wide mt-1 uppercase">TUTIERRA</h3>
                  </div>

                  <div className="flex flex-col gap-4 text-xs">
                    {/* Phone */}
                    <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-brand-gray/80 hover:text-tech-green transition-colors">
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="font-medium">{CONTACT.phone}</span>
                    </a>

                    {/* Address */}
                    <div className="flex items-start gap-3 text-brand-gray/80">
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="leading-snug">{CONTACT.address}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 md:mt-0 rounded-lg border border-white/10 hover:border-tech-green/30 bg-brand-ink hover:bg-white/5 py-3.5 text-center text-[0.62rem] font-bold tracking-widest text-brand-gray/80 hover:text-tech-green uppercase transition-all duration-300"
                >
                  Conectar con un asesor
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}

        {/* VIDEO CALL POPUP MODAL */}
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full bg-brand-ink/95 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col gap-4 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-brand-gray/60 hover:text-brand-gray transition-colors z-10"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center md:text-left border-b border-white/10 pb-3">
                <h3 className="text-base md:text-lg font-display font-light text-brand-gray tracking-widest uppercase">
                  Reúnete con nuestro <span className="font-serif italic text-tech-green">asesor</span>
                </h3>
              </div>

              {/* Content grid */}
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Left Column: Form & Platform */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                  {showSuccessVideo ? (
                    <div className="text-center py-12 flex-1 flex flex-col justify-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-tech-green/10 text-tech-green mb-4 mx-auto">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-display text-brand-gray mb-2">¡Gracias!</h3>
                      <p className="text-xs text-brand-gray/80 max-w-xs mx-auto">
                        Un asesor se contactará lo más pronto posible contigo.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleVideoSubmit} className="flex flex-col gap-4">
                      
                      {/* Input: Name */}
                      <div className="flex flex-col border-b border-white/15 pb-1">
                        <label className="text-[0.58rem] tracking-widest text-brand-gray/55 uppercase font-medium">Nombre</label>
                        <input
                          type="text"
                          required
                          placeholder="INGRESE SU NOMBRE"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-transparent text-xs text-brand-gray outline-none mt-1 uppercase placeholder:text-brand-gray/30"
                        />
                      </div>

                      {/* Input: Phone */}
                      <div className="flex flex-col border-b border-white/15 pb-1">
                        <label className="text-[0.58rem] tracking-widest text-brand-gray/55 uppercase font-medium">Móvil</label>
                        <div className="flex items-center gap-2 mt-1">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="bg-transparent text-xs text-brand-gray outline-none cursor-pointer border-none p-0 max-w-[80px]"
                          >
                            {COUNTRIES.map((country) => (
                              <option key={`video-${country.code}-${country.name}`} value={country.code} className="bg-brand-ink text-brand-gray">
                                {country.label}
                              </option>
                            ))}
                          </select>
                          <span className="text-brand-gray/30">|</span>
                          <input
                            type="tel"
                            required
                            placeholder="NÚMERO DE MÓVIL"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-transparent text-xs text-brand-gray outline-none flex-1 placeholder:text-brand-gray/30"
                          />
                        </div>
                      </div>

                      {/* Input: Email */}
                      <div className="flex flex-col border-b border-white/15 pb-1">
                        <label className="text-[0.58rem] tracking-widest text-brand-gray/55 uppercase font-medium">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="INGRESE SU CORREO ELECTRÓNICO"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent text-xs text-brand-gray outline-none mt-1 uppercase placeholder:text-brand-gray/30"
                        />
                      </div>

                      {/* Platform Selector (Zoom vs Teams) */}
                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => setPlatform("zoom")}
                          className={`flex-1 rounded-lg border py-2.5 text-[0.68rem] tracking-widest font-bold uppercase transition-all duration-200 ${
                            platform === "zoom"
                              ? "bg-white/10 border-white/20 text-brand-gray shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                              : "border-white/10 text-brand-gray/50 hover:bg-white/5 hover:text-brand-gray"
                          }`}
                        >
                          Zoom
                        </button>
                        <button
                          type="button"
                          onClick={() => setPlatform("teams")}
                          className={`flex-1 rounded-lg border py-2.5 text-[0.68rem] tracking-widest font-bold uppercase transition-all duration-200 ${
                            platform === "teams"
                              ? "bg-white/10 border-white/20 text-brand-gray shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                              : "border-white/10 text-brand-gray/50 hover:bg-white/5 hover:text-brand-gray"
                          }`}
                        >
                          Teams
                        </button>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={!selectedDay || !selectedTime}
                        className="w-full mt-4 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 py-3 text-[0.68rem] font-bold tracking-widest text-brand-gray uppercase transition-all duration-200 hover:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Confirmar Cita
                      </button>
                    </form>
                  )}
                </div>

                {/* Right Column: Date picker & Slots */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                  <div>
                    <h4 className="text-[0.58rem] tracking-[0.2em] text-brand-gray/50 uppercase font-semibold">
                      Selecciona fecha y hora (Zona Horaria - GMT-5)
                    </h4>
                  </div>

                  {/* Calendar grid */}
                  <div className="border border-white/10 rounded-xl p-4 bg-brand-ink/40">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <button type="button" onClick={prevMonth} className="text-brand-gray/70 hover:text-brand-gray transition-colors">
                        &larr;
                      </button>
                      <span className="font-semibold uppercase tracking-wider text-brand-gray">
                        {monthNames[currentMonth]} {currentYear}
                      </span>
                      <button type="button" onClick={nextMonth} className="text-brand-gray/70 hover:text-brand-gray transition-colors">
                        &rarr;
                      </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[0.55rem] font-bold text-brand-gray/40 uppercase mb-1">
                      {daysOfWeek.map((day) => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty blocks for padding before first day */}
                      {Array.from({ length: firstDay }).map((_, idx) => (
                        <div key={`empty-${idx}`} />
                      ))}

                      {/* Month Days */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNumber = idx + 1;
                        const isSelected = selectedDay === dayNumber;
                        const isPast = currentYear === today.getFullYear() && currentMonth === today.getMonth() && dayNumber < today.getDate();
                        
                        return (
                          <button
                            key={`day-${dayNumber}`}
                            type="button"
                            onClick={() => !isPast && setSelectedDay(dayNumber)}
                            disabled={isPast}
                            className={`aspect-square rounded-full flex items-center justify-center text-[0.7rem] transition-all ${
                              isSelected
                                ? "bg-tech-green text-brand-ink font-bold"
                                : isPast
                                ? "text-brand-gray/25 cursor-default"
                                : "text-brand-gray/75 hover:bg-white/10 hover:text-brand-gray"
                            }`}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h5 className="text-[0.58rem] tracking-wider text-brand-gray/40 uppercase font-semibold mb-2">Horarios Disponibles</h5>
                    <div className="relative">
                      <select
                        value={selectedTime || ""}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-brand-ink/60 px-3 py-2 text-[0.7rem] text-brand-gray outline-none cursor-pointer focus:border-white/20"
                      >
                        <option value="" disabled className="bg-brand-ink text-brand-gray/40">Selecciona un horario</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time} className="bg-brand-ink text-brand-gray">
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
