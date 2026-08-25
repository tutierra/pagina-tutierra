"use client";

import { useState, useEffect } from "react";

interface SiteContent {
  hero: { title: string; description: string; images?: string[] };
  manifesto: { misionTitle: string; misionText: string; misionItalic: string; visionTitle: string; visionText: string; visionItalic: string; image?: string };
  founder: { title: string; text: string; name: string; role: string; img: string };
  general?: { valleBgImage?: string; refiereGanaImg?: string; testimoniosHeroImages?: string[]; testimoniosTitle?: string; testimoniosDescription?: string; proyectosConcluidos?: { id: string; nombre: string; ubicacion: string; logo: string }[] };
  nosotros?: {
    timeline: { year: string; titulo: string; texto: string; img: string }[];
    cifras: { valor: string; label: string }[];
    equipo: { area: string; personas: { nombre: string; puesto: string; foto: string }[] }[];
  };
}

interface Project {
  slug: string;
  nombre: string;
  ubicacion: string;
  precioDesde: string;
  areaDesde: string;
  resumen: string;
  descripcion: string;
  caracteristicas: string[];
  imagenPrincipal: string;
  videoHero?: string;
  galeria: string[];
  logo: string;
  extension: string;
  lotesDisponiblesPct: number;
  areasComunes: (string | { label: string; icon: string })[];
  beneficiosCortos: (string | { label: string; icon: string })[];
  masterPlanAmenities?: { id: string; label: string; desc: string; icon: string }[];
  mapLink?: string;
  activo?: boolean;
  clausurado?: boolean;
}

interface BlogPost {
  slug: string;
  titulo: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
  resumen: string;
  contenido: string;
  imagen: string;
}

interface Testimonio {
  nombre: string;
  proyecto: string;
  texto: string;
  imagen: string;
}

const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    title: "Creamos y unimos familias.",
    description: "Desarrollamos proyectos inmobiliarios sostenibles en el Valle Sagrado, ofreciendo terrenos con saneamiento urbano e independización garantizada.",
    images: ["/images/proyectos/proyecto-chinchero-01.jpg"]
  },
  manifesto: {
    misionTitle: "Misión",
    misionText: "Desarrollar proyectos inmobiliarios sostenibles en ubicaciones estratégicas, ofreciendo terrenos con saneamiento urbano e independización garantizada.",
    misionItalic: "Brindando oportunidades de inversión seguras y rentables, integrando la naturaleza y el respeto por el entorno.",
    visionTitle: "Visión",
    visionText: "Ser el grupo inmobiliario de referencia en Cusco, liderando el desarrollo de comunidades planificadas y sostenibles con absoluta seguridad legal.",
    visionItalic: "Inspirando un estilo de vida consciente y creando valor patrimonial intergeneracional para nuestros clientes.",
    image: "/images/global/manifesto-equipo.png"
  },
  founder: {
    title: "Una visión nacida en el Valle Sagrado",
    text: "“Crecí viendo cómo muchas familias soñaban con un pedazo de tierra propio, pero se topaban con trámites, informalidad y promesas vacías. Fundé Tutierra para que ese sueño fuera seguro, legal y real. Cada lote que entregamos es una familia que echa raíces.”",
    name: "Carlos Mendoza",
    role: "Fundador y Director General",
    img: "/images/testimonios/cliente-01.jpg"
  },
  general: {
    valleBgImage: "/images/global/valle-sagrado-bg.jpg",
    refiereGanaImg: "/images/referidos/handshake.jpg",
    testimoniosHeroImages: [],
    testimoniosTitle: "Familias que ya construyen su patrimonio con nosotros",
    testimoniosDescription: "Conoce las historias y experiencias reales de quienes han invertido en terrenos con saneamiento urbano e independización garantizada en el Valle Sagrado de Cusco.",
    proyectosConcluidos: []
  },
  nosotros: {
    timeline: [],
    cifras: [],
    equipo: []
  }
};

function safeMergeContent(defaultObj: SiteContent, incomingObj: any): SiteContent {
  if (!incomingObj) return defaultObj;
  return {
    hero: { ...defaultObj.hero, ...(incomingObj.hero || {}) },
    manifesto: { ...defaultObj.manifesto, ...(incomingObj.manifesto || {}) },
    founder: { ...defaultObj.founder, ...(incomingObj.founder || {}) },
    general: { ...defaultObj.general, ...(incomingObj.general || {}) },
    nosotros: {
      timeline: incomingObj.nosotros?.timeline || defaultObj.nosotros?.timeline || [],
      cifras: incomingObj.nosotros?.cifras || defaultObj.nosotros?.cifras || [],
      equipo: incomingObj.nosotros?.equipo || defaultObj.nosotros?.equipo || [],
    },
  };
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"general" | "nosotros" | "proyectos" | "blog" | "testimonios" | "imagenes">("general");

  // Data States (Inicializado siempre con datos por defecto para que NUNCA sea nulo)
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);

  // Selected indices
  const [selectedProjIndex, setSelectedProjIndex] = useState<number>(0);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number>(0);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number>(0);

  // Upload States for independent Uploads tab
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // General Save Status Alert
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/get-data");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      setContent(safeMergeContent(DEFAULT_SITE_CONTENT, data.content));
      setProjects(Array.isArray(data.projects) ? data.projects : []);
      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setTestimonios(Array.isArray(data.testimonios) ? data.testimonios : []);
    } catch (err) {
      console.error("Error fetching admin data", err);
    } finally {
      setLoading(false);
    }
  }

  // Reusable inline upload handler
  async function uploadFileDirectly(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        return data.url;
      } else {
        alert(data.error || "Error al subir la imagen");
      }
    } catch (err) {
      alert("Error al conectar con la API de subida");
    }
    return null;
  }

  async function saveGeneralContent() {
    setSaveStatus("guardando...");
    try {
      const res = await fetch("/api/admin/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveStatus("¡Contenido general guardado con éxito!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error al guardar");
      }
    } catch (err) {
      setSaveStatus("Error al conectar");
    }
  }

  async function saveProjectsData() {
    setSaveStatus("guardando...");
    try {
      const res = await fetch("/api/admin/save-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (res.ok) {
        setSaveStatus("¡Proyectos guardados con éxito!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error al guardar");
      }
    } catch (err) {
      setSaveStatus("Error al conectar");
    }
  }

  async function savePostsData() {
    setSaveStatus("guardando...");
    try {
      const res = await fetch("/api/admin/save-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
      if (res.ok) {
        setSaveStatus("¡Artículos del blog guardados con éxito!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error al guardar");
      }
    } catch (err) {
      setSaveStatus("Error al conectar");
    }
  }

  async function saveTestimoniosData() {
    setSaveStatus("guardando...");
    try {
      const res = await fetch("/api/admin/save-testimonios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonios),
      });
      if (res.ok) {
        setSaveStatus("¡Testimonios guardados con éxito!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error al guardar");
      }
    } catch (err) {
      setSaveStatus("Error al conectar");
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setUploadedUrl("");

    const url = await uploadFileDirectly(uploadFile);
    if (url) {
      setUploadedUrl(url);
    }
    setUploading(false);
  }

  function handleLogout() {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/admin/login";
  }

  async function triggerRevalidate() {
    setSaveStatus("Actualizando sitio...");
    try {
      const res = await fetch("/api/admin/revalidate", { method: "POST" });
      if (res.ok) {
        setSaveStatus("¡Sitio actualizado con éxito!");
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus("Error al actualizar");
      }
    } catch (err) {
      setSaveStatus("Error al conectar");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-brand-ink text-brand-gray">
        <p className="text-[1.2rem] font-light">Cargando base de datos del CMS...</p>
      </div>
    );
  }

  const currentProj = projects[selectedProjIndex];
  const currentPost = posts[selectedPostIndex];

  return (
    <div className="min-h-dvh bg-brand-ink text-brand-gray p-8 font-sans">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-gray/10 pb-6 mb-8">
          <div>
            <h1 className="font-display text-[2rem] font-light text-brand-gray">
              Administración de Tutierra
            </h1>
            <p className="text-[0.85rem] text-brand-gray/55 mt-1">
              Modifica textos, precios, imágenes, carruseles y disponibilidad del sitio en tiempo real
            </p>
          </div>
          <div className="flex gap-3 self-start">
            <button
              onClick={triggerRevalidate}
              className="rounded-full bg-tech-green text-brand-ink px-5 py-2 text-[0.8rem] font-semibold hover:scale-[0.97] active:scale-[0.97] transition-transform"
            >
              🔄 Actualizar Cambios en la Web
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-red-500/30 px-5 py-2 text-[0.8rem] text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Tab Buttons */}
        <div className="flex border-b border-brand-gray/10 mb-8 overflow-x-auto gap-2">
          {(["general", "nosotros", "proyectos", "blog", "testimonios", "imagenes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-[0.9rem] font-medium tracking-wide border-b-2 transition-all capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "border-tech-green text-tech-green bg-white/[0.02]"
                  : "border-transparent text-brand-gray/70 hover:text-brand-gray"
              }`}
            >
              {tab === "general" ? "Páginas Generales" : tab}
            </button>
          ))}
        </div>

        {/* Floating status alert */}
        {saveStatus && (
          <div className="fixed bottom-8 right-8 z-50 rounded-full bg-tech-green px-6 py-3 text-[0.85rem] font-semibold text-brand-ink shadow-lg animate-bounce">
            {saveStatus}
          </div>
        )}

        {/* Tab Content: GENERAL */}
        {activeTab === "general" && content && (
          <div className="flex flex-col gap-8 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
            <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2">
              Sección de Inicio (Hero)
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título del Hero</label>
                <input
                  type="text"
                  value={content?.hero?.title ?? ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...(prev || DEFAULT_SITE_CONTENT),
                      hero: { ...((prev || DEFAULT_SITE_CONTENT).hero || {}), title: e.target.value },
                    }))
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Descripción del Hero</label>
                <textarea
                  rows={3}
                  value={content?.hero?.description ?? ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...(prev || DEFAULT_SITE_CONTENT),
                      hero: { ...((prev || DEFAULT_SITE_CONTENT).hero || {}), description: e.target.value },
                    }))
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>

              {/* Visual Editor for Homepage Hero Carousel Images */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">
                  Imágenes del Carrusel del Hero (Página Principal)
                </label>
                
                {/* Thumbnails Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-2">
                  {(content?.hero?.images || []).map((img, idx) => (
                    <div key={idx} className="relative aspect-[9/16] overflow-hidden rounded-[0.8rem] border border-brand-gray/10 group bg-black/25">
                      <img src={img} alt="Hero carrusel" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setContent((prev) => {
                            const cur = prev || DEFAULT_SITE_CONTENT;
                            const curHero = cur.hero || { title: "", description: "", images: [] };
                            const updatedImages = (curHero.images || []).filter((_, i) => i !== idx);
                            return { ...cur, hero: { ...curHero, images: updatedImages } };
                          });
                        }}
                        className="absolute top-2 right-2 bg-red-600/80 text-white rounded-full h-6 w-6 flex items-center justify-center text-[0.7rem] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 font-bold"
                        title="Eliminar de la galería"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Add Image Card Button */}
                  <div className="relative aspect-[9/16] border border-dashed border-brand-gray/30 hover:border-tech-green/50 rounded-[0.8rem] flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/[0.01] hover:bg-white/[0.02]">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadFileDirectly(e.target.files[0]);
                          if (url) {
                            const updated = { ...content };
                            updated.hero.images = [...(updated.hero.images || []), url];
                            setContent(updated);
                          }
                        }
                      }}
                    />
                    <span className="text-[1.3rem] text-tech-green font-bold leading-none">+</span>
                    <span className="text-[0.7rem] text-brand-gray/55 mt-1">Subir Foto</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2 mt-4">
              Manifiesto (Misión y Visión)
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título Misión</label>
                <input
                  type="text"
                  value={content.manifesto.misionTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      manifesto: { ...content.manifesto, misionTitle: e.target.value },
                    })
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Cuerpo Misión</label>
                <textarea
                  rows={3}
                  value={content.manifesto.misionText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      manifesto: { ...content.manifesto, misionText: e.target.value },
                    })
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Texto Destacado Itálico Misión</label>
                <textarea
                  rows={2}
                  value={content.manifesto.misionItalic}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      manifesto: { ...content.manifesto, misionItalic: e.target.value },
                    })
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título Visión</label>
                <input
                  type="text"
                  value={content.manifesto.visionTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      manifesto: { ...content.manifesto, visionTitle: e.target.value },
                    })
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Cuerpo Visión</label>
                <textarea
                  rows={3}
                  value={content.manifesto.visionText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      manifesto: { ...content.manifesto, visionText: e.target.value },
                    })
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Texto Destacado Itálico Visión</label>
                <textarea
                  rows={2}
                  value={content?.manifesto?.visionItalic ?? ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...(prev || DEFAULT_SITE_CONTENT),
                      manifesto: { ...((prev || DEFAULT_SITE_CONTENT).manifesto || {}), visionItalic: e.target.value },
                    }))
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              {/* Manifesto Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Imagen de Sección Misión y Visión</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {content?.manifesto?.image && (
                    <div className="relative h-20 w-20 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                      <img src={content.manifesto.image} alt="Manifiesto" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={content?.manifesto?.image ?? ""}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...(prev || DEFAULT_SITE_CONTENT),
                          manifesto: { ...((prev || DEFAULT_SITE_CONTENT).manifesto || {}), image: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Imagen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              setContent((prev) => ({
                                ...(prev || DEFAULT_SITE_CONTENT),
                                manifesto: { ...((prev || DEFAULT_SITE_CONTENT).manifesto || {}), image: url },
                              }));
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2 mt-4">
              Historia y Fundador
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título Fundador</label>
                <input
                  type="text"
                  value={content?.founder?.title ?? ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...(prev || DEFAULT_SITE_CONTENT),
                      founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), title: e.target.value },
                    }))
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div>
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Cita/Frase del Fundador</label>
                <textarea
                  rows={3}
                  value={content?.founder?.text ?? ""}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...(prev || DEFAULT_SITE_CONTENT),
                      founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), text: e.target.value },
                    }))
                  }
                  className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Nombre</label>
                  <input
                    type="text"
                    value={content?.founder?.name ?? ""}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...(prev || DEFAULT_SITE_CONTENT),
                        founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), name: e.target.value },
                      }))
                    }
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Puesto</label>
                  <input
                    type="text"
                    value={content?.founder?.role ?? ""}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...(prev || DEFAULT_SITE_CONTENT),
                        founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), role: e.target.value },
                      }))
                    }
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
              </div>

              {/* Founder Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Imagen del Fundador</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {content?.founder?.img && (
                    <div className="relative h-20 w-20 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                      <img src={content.founder.img} alt="Fundador" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={content?.founder?.img ?? ""}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...(prev || DEFAULT_SITE_CONTENT),
                          founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), img: e.target.value },
                        }))
                      }
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              setContent((prev) => ({
                                ...(prev || DEFAULT_SITE_CONTENT),
                                founder: { ...((prev || DEFAULT_SITE_CONTENT).founder || {}), img: url },
                              }));
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2 mt-4">
              Imágenes de Otras Páginas
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {/* valleBgImage Upload */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Imagen de Fondo "Atractivos del Valle" (Inicio)</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {content.general?.valleBgImage && (
                    <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                      <img src={content.general.valleBgImage} alt="Fondo Valle" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={content.general?.valleBgImage || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          general: { ...(content.general || {}), valleBgImage: e.target.value },
                        })
                      }
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      placeholder="/images/global/valle-sagrado-bg.jpg"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              setContent({
                                ...content,
                                general: { ...(content.general || {}), valleBgImage: url },
                              });
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* refiereGanaImg Upload */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Imagen Superior "Refiere y Gana"</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {content.general?.refiereGanaImg && (
                    <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                      <img src={content.general.refiereGanaImg} alt="Refiere y Gana" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={content.general?.refiereGanaImg || ""}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          general: { ...(content.general || {}), refiereGanaImg: e.target.value },
                        })
                      }
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      placeholder="/images/referidos/handshake.jpg"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              setContent({
                                ...content,
                                general: { ...(content.general || {}), refiereGanaImg: url },
                              });
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonios Page Title & Tagline */}
              <div className="grid grid-cols-1 gap-6 border-t border-brand-gray/10 pt-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título de la Página de Testimonios</label>
                  <input
                    type="text"
                    value={content.general?.testimoniosTitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        general: { ...(content.general || {}), testimoniosTitle: e.target.value },
                      })
                    }
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    placeholder="Familias que ya construyen su patrimonio con nosotros"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Descripción / Bajada de la Página de Testimonios</label>
                  <textarea
                    rows={2}
                    value={content.general?.testimoniosDescription || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        general: { ...(content.general || {}), testimoniosDescription: e.target.value },
                      })
                    }
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    placeholder="Conoce las historias y experiencias reales..."
                  />
                </div>
              </div>

              {/* Testimonios Hero Gallery Upload */}
              <div className="flex flex-col gap-2 border-t border-brand-gray/10 pt-6">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">
                  Imágenes de Fondo del Hero de Testimonios (Carrusel)
                </label>
                <p className="text-[0.75rem] text-brand-gray/60 mb-3">
                  Sube fotos de las visitas, eventos o terrenos para el fondo de testimonios.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {(content.general?.testimoniosHeroImages || []).map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem] border border-brand-gray/10 group bg-black/25">
                      <img src={img} alt="Testimonio Hero" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...content };
                          if (updated.general) {
                            updated.general.testimoniosHeroImages = (updated.general.testimoniosHeroImages || []).filter((_, i) => i !== idx);
                            setContent(updated);
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-[0.75rem] hover:scale-105"
                        title="Eliminar Foto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="relative aspect-[16/10] border border-dashed border-brand-gray/20 hover:border-tech-green/40 rounded-[0.8rem] flex flex-col items-center justify-center text-brand-gray/40 hover:text-tech-green cursor-pointer transition-colors">
                    <span className="text-[1.5rem] font-light">+</span>
                    <span className="text-[0.75rem] mt-1 font-semibold">Subir Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                         if (e.target.files && e.target.files[0]) {
                           const url = await uploadFileDirectly(e.target.files[0]);
                           if (url) {
                             const updated = { ...content };
                             if (!updated.general) updated.general = {};
                             updated.general.testimoniosHeroImages = [...(updated.general.testimoniosHeroImages || []), url];
                             setContent(updated);
                           }
                         }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Sección Proyectos Concluidos (Logos sin interacción) */}
              <div className="flex flex-col gap-4 border-t border-brand-gray/10 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold">
                      Proyectos Concluidos (Logos sin interacción)
                    </label>
                    <p className="text-[0.75rem] text-brand-gray/60 mt-0.5">
                      Añade proyectos pasados para mostrar sus logos en la sección fija "Proyectos Culminados".
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...content };
                      if (!updated.general) updated.general = {};
                      const list = updated.general.proyectosConcluidos || [];
                      updated.general.proyectosConcluidos = [
                        ...list,
                        {
                          id: `conc-${Date.now()}`,
                          nombre: "Nuevo Proyecto Concluido",
                          ubicacion: "Valle Sagrado, Cusco",
                          logo: ""
                        }
                      ];
                      setContent(updated);
                    }}
                    className="rounded-full bg-tech-green/10 border border-tech-green/30 text-tech-green px-4 py-1.5 text-[0.8rem] font-semibold hover:bg-tech-green/20 transition-colors"
                  >
                    + Agregar Proyecto Concluido
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {(content.general?.proyectosConcluidos || []).map((item, idx) => (
                    <div key={item.id || idx} className="relative bg-white/[0.03] border border-brand-gray/15 rounded-[1rem] p-5 flex flex-col gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...content };
                          if (updated.general?.proyectosConcluidos) {
                            updated.general.proyectosConcluidos = updated.general.proyectosConcluidos.filter((_, i) => i !== idx);
                            setContent(updated);
                          }
                        }}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-[0.8rem] font-semibold"
                        title="Eliminar"
                      >
                        ✕ Eliminar
                      </button>

                      <div className="grid grid-cols-1 gap-3 pr-16">
                        <div>
                          <label className="block text-[0.75rem] text-brand-gray/70 uppercase font-semibold mb-1">Nombre del Proyecto</label>
                          <input
                            type="text"
                            value={item.nombre}
                            onChange={(e) => {
                              const updated = { ...content };
                              if (updated.general?.proyectosConcluidos) {
                                updated.general.proyectosConcluidos[idx].nombre = e.target.value;
                                setContent(updated);
                              }
                            }}
                            className="w-full rounded-[0.5rem] border border-brand-gray/20 bg-white/[0.06] px-3 py-2 text-[0.85rem] text-white outline-none focus:border-tech-green"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.75rem] text-brand-gray/70 uppercase font-semibold mb-1">Ubicación</label>
                          <input
                            type="text"
                            value={item.ubicacion}
                            onChange={(e) => {
                              const updated = { ...content };
                              if (updated.general?.proyectosConcluidos) {
                                updated.general.proyectosConcluidos[idx].ubicacion = e.target.value;
                                setContent(updated);
                              }
                            }}
                            className="w-full rounded-[0.5rem] border border-brand-gray/20 bg-white/[0.06] px-3 py-2 text-[0.85rem] text-white outline-none focus:border-tech-green"
                          />
                        </div>
                      </div>

                      {/* Logo Upload */}
                      <div className="flex flex-col gap-1.5 pt-1 border-t border-brand-gray/10">
                        <label className="block text-[0.75rem] text-brand-gray/70 uppercase font-semibold">Logo (SVG o PNG)</label>
                        <div className="flex items-center gap-3">
                          {item.logo ? (
                            <div className="h-12 w-24 border border-brand-gray/10 rounded-[0.5rem] bg-black/40 flex items-center justify-center p-1.5 shrink-0">
                              <img src={item.logo} alt="Logo" className="max-h-full max-w-full object-contain filter brightness-0 invert" />
                            </div>
                          ) : (
                            <div className="h-12 w-24 border border-dashed border-brand-gray/20 rounded-[0.5rem] flex items-center justify-center text-[0.7rem] text-brand-gray/40 shrink-0">
                              Sin Logo
                            </div>
                          )}
                          <input
                            type="text"
                            value={item.logo}
                            onChange={(e) => {
                              const updated = { ...content };
                              if (updated.general?.proyectosConcluidos) {
                                updated.general.proyectosConcluidos[idx].logo = e.target.value;
                                setContent(updated);
                              }
                            }}
                            className="flex-1 rounded-[0.5rem] border border-brand-gray/20 bg-white/[0.06] px-3 py-2 text-[0.85rem] text-white outline-none focus:border-tech-green"
                            placeholder="/uploads/logo.svg"
                          />
                          <div className="relative overflow-hidden rounded-[0.5rem] bg-tech-green text-brand-ink font-semibold px-4 py-2 text-[0.75rem] cursor-pointer shrink-0">
                            <span>Subir</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const url = await uploadFileDirectly(e.target.files[0]);
                                  if (url) {
                                    const updated = { ...content };
                                    if (updated.general?.proyectosConcluidos) {
                                      updated.general.proyectosConcluidos[idx].logo = url;
                                      setContent(updated);
                                    }
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={saveGeneralContent}
              className="mt-6 self-start rounded-full bg-tech-green px-8 py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98]"
            >
              Guardar Cambios Generales
            </button>
          </div>
        )}

        {/* Tab Content: NOSOTROS */}
        {activeTab === "nosotros" && content && content.nosotros && (
          <div className="flex flex-col gap-10">
            {/* 1. Cifras / Estadísticas */}
            <div className="bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
              <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2 mb-6">
                Cifras e Indicadores (Página Nosotros)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(content.nosotros.cifras || []).map((cifra, idx) => (
                  <div key={idx} className="border border-brand-gray/10 rounded-[0.8rem] p-4 bg-white/[0.01]">
                    <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider block mb-2">Indicador {idx + 1}</span>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Valor (ej. +320)</label>
                        <input
                          type="text"
                          value={cifra.valor}
                          onChange={(e) => {
                            const updated = { ...content };
                            if (updated.nosotros) {
                              updated.nosotros.cifras[idx].valor = e.target.value;
                              setContent(updated);
                            }
                          }}
                          className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-2 text-[0.9rem] text-brand-gray outline-none focus:border-tech-green"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Etiqueta (ej. Lotes vendidos)</label>
                        <input
                          type="text"
                          value={cifra.label}
                          onChange={(e) => {
                            const updated = { ...content };
                            if (updated.nosotros) {
                              updated.nosotros.cifras[idx].label = e.target.value;
                              setContent(updated);
                            }
                          }}
                          className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-2 text-[0.9rem] text-brand-gray outline-none focus:border-tech-green"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Línea de Tiempo (Timeline) */}
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
              {/* Timeline Items Sidebar */}
              <div className="flex flex-col gap-2 bg-white/[0.01] border border-brand-gray/10 rounded-[1.2rem] p-4 h-fit">
                <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider px-2 mb-2">Línea de Tiempo</span>
                {(content.nosotros.timeline || []).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMilestoneIndex(idx)}
                    className={`text-left px-4 py-3 rounded-[0.8rem] text-[0.9rem] transition-colors line-clamp-1 ${
                      selectedMilestoneIndex === idx
                        ? "bg-tech-green text-brand-ink font-semibold"
                        : "text-brand-gray/70 hover:bg-white/[0.03]"
                    }`}
                  >
                    {t.year} - {t.titulo || `Hito ${idx + 1}`}
                  </button>
                ))}

                <button
                  onClick={() => {
                    const updated = { ...content };
                    if (updated.nosotros) {
                      const newMilestone = {
                        year: "2027",
                        titulo: "Nuevo Logro",
                        texto: "Descripción del hito alcanzado.",
                        img: "/images/nosotros/oficina.jpg",
                      };
                      updated.nosotros.timeline = [...updated.nosotros.timeline, newMilestone];
                      setContent(updated);
                      setSelectedMilestoneIndex(updated.nosotros.timeline.length - 1);
                    }
                  }}
                  className="mt-4 border border-dashed border-brand-gray/30 rounded-[0.8rem] px-4 py-3 text-[0.85rem] text-tech-green hover:bg-tech-green/10 text-center transition-colors font-semibold"
                >
                  + Agregar Hito
                </button>
              </div>

              {/* Milestone Form */}
              {content.nosotros.timeline[selectedMilestoneIndex] && (
                <div className="flex flex-col gap-6 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
                  <h3 className="text-[1.1rem] text-tech-green font-display font-light border-b border-brand-gray/10 pb-2">
                    Hito: {content.nosotros.timeline[selectedMilestoneIndex].year} - {content.nosotros.timeline[selectedMilestoneIndex].titulo}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Año</label>
                      <input
                        type="text"
                        value={content.nosotros.timeline[selectedMilestoneIndex].year}
                        onChange={(e) => {
                          const updated = { ...content };
                          if (updated.nosotros) {
                            updated.nosotros.timeline[selectedMilestoneIndex].year = e.target.value;
                            setContent(updated);
                          }
                        }}
                        className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título del Hito</label>
                      <input
                        type="text"
                        value={content.nosotros.timeline[selectedMilestoneIndex].titulo}
                        onChange={(e) => {
                          const updated = { ...content };
                          if (updated.nosotros) {
                            updated.nosotros.timeline[selectedMilestoneIndex].titulo = e.target.value;
                            setContent(updated);
                          }
                        }}
                        className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Descripción corta</label>
                    <textarea
                      rows={3}
                      value={content.nosotros.timeline[selectedMilestoneIndex].texto}
                      onChange={(e) => {
                        const updated = { ...content };
                        if (updated.nosotros) {
                          updated.nosotros.timeline[selectedMilestoneIndex].texto = e.target.value;
                          setContent(updated);
                        }
                      }}
                      className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                  </div>

                  {/* Milestone image upload */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Foto del Hito</label>
                    <div className="flex items-center gap-4 flex-wrap">
                      {content.nosotros.timeline[selectedMilestoneIndex].img && (
                        <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                          <img src={content.nosotros.timeline[selectedMilestoneIndex].img} alt="Hito" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-[200px] flex gap-2">
                        <input
                          type="text"
                          value={content.nosotros.timeline[selectedMilestoneIndex].img}
                          onChange={(e) => {
                            const updated = { ...content };
                            if (updated.nosotros) {
                              updated.nosotros.timeline[selectedMilestoneIndex].img = e.target.value;
                              setContent(updated);
                            }
                          }}
                          className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                        />
                        <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                          <span>Subir Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await uploadFileDirectly(e.target.files[0]);
                                if (url) {
                                  const updated = { ...content };
                                  if (updated.nosotros) {
                                    updated.nosotros.timeline[selectedMilestoneIndex].img = url;
                                    setContent(updated);
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de eliminar este hito?")) {
                        const updated = { ...content };
                        if (updated.nosotros) {
                          updated.nosotros.timeline = updated.nosotros.timeline.filter((_, idx) => idx !== selectedMilestoneIndex);
                          setContent(updated);
                          setSelectedMilestoneIndex(0);
                        }
                      }
                    }}
                    className="self-start rounded-full border border-red-500/30 px-6 py-2 text-[0.8rem] text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Eliminar Hito
                  </button>
                </div>
              )}
            </div>

            {/* 3. Equipo de Trabajo */}
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
              {/* Sidebar list for Team Groups */}
              <div className="flex flex-col gap-2 bg-white/[0.01] border border-brand-gray/10 rounded-[1.2rem] p-4 h-fit">
                <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider px-2 mb-2">Áreas del Equipo</span>
                {(content.nosotros.equipo || []).map((g, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedGroupIndex(idx);
                      setSelectedPersonIndex(0);
                    }}
                    className={`text-left px-4 py-3 rounded-[0.8rem] text-[0.9rem] transition-colors ${
                      selectedGroupIndex === idx
                        ? "bg-tech-green text-brand-ink font-semibold"
                        : "text-brand-gray/70 hover:bg-white/[0.03]"
                    }`}
                  >
                    {g.area}
                  </button>
                ))}

                <button
                  onClick={() => {
                    const updated = { ...content };
                    if (updated.nosotros) {
                      const newArea = {
                        area: "Nueva Área",
                        personas: [
                          {
                            nombre: "Nuevo Integrante",
                            puesto: "Asesor Comercial",
                            foto: "/images/testimonios/cliente-01.jpg",
                          }
                        ]
                      };
                      updated.nosotros.equipo = [...(updated.nosotros.equipo || []), newArea];
                      setContent(updated);
                      setSelectedGroupIndex(updated.nosotros.equipo.length - 1);
                      setSelectedPersonIndex(0);
                    }
                  }}
                  className="mt-4 border border-dashed border-brand-gray/30 rounded-[0.8rem] px-4 py-3 text-[0.85rem] text-tech-green hover:bg-tech-green/10 text-center transition-colors font-semibold"
                >
                  + Agregar Área
                </button>
              </div>

              {/* Group People Form */}
              {content.nosotros.equipo[selectedGroupIndex] && (
                <div className="flex flex-col gap-6 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
                  <div className="flex justify-between items-center border-b border-brand-gray/10 pb-4">
                    <h3 className="text-[1.1rem] text-tech-green font-display font-light">
                      Integrantes de: {content.nosotros.equipo[selectedGroupIndex].area}
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.nosotros.equipo[selectedGroupIndex].area}
                        onChange={(e) => {
                          const updated = { ...content };
                          if (updated.nosotros) {
                            updated.nosotros.equipo[selectedGroupIndex].area = e.target.value;
                            setContent(updated);
                          }
                        }}
                        className="rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green max-w-[200px]"
                        placeholder="Nombre de área"
                      />
                      <button
                        onClick={() => {
                          if (confirm("¿Estás seguro de eliminar esta área completa junto con todos sus integrantes?")) {
                            const updated = { ...content };
                            if (updated.nosotros) {
                              updated.nosotros.equipo = updated.nosotros.equipo.filter((_, idx) => idx !== selectedGroupIndex);
                              setContent(updated);
                              setSelectedGroupIndex(0);
                              setSelectedPersonIndex(0);
                            }
                          }
                        }}
                        className="rounded-[0.6rem] border border-red-500/30 px-3 py-1.5 text-[0.8rem] text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Eliminar Área
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    {/* List of Persons in selected group */}
                    <div className="flex flex-col gap-2">
                      {content.nosotros.equipo[selectedGroupIndex].personas.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedPersonIndex(idx)}
                          className={`text-left px-3 py-2 rounded-[0.6rem] text-[0.85rem] transition-colors line-clamp-1 ${
                            selectedPersonIndex === idx
                              ? "bg-tech-green/20 text-tech-green border border-tech-green/30"
                              : "text-brand-gray/70 hover:bg-white/[0.02]"
                          }`}
                        >
                          {p.nombre || `Persona ${idx + 1}`}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          const updated = { ...content };
                          if (updated.nosotros) {
                            const newPerson = {
                              nombre: "Nuevo Integrante",
                              puesto: "Asesor Comercial",
                              foto: "/images/testimonios/cliente-01.jpg",
                            };
                            updated.nosotros.equipo[selectedGroupIndex].personas = [
                              ...updated.nosotros.equipo[selectedGroupIndex].personas,
                              newPerson,
                            ];
                            setContent(updated);
                            setSelectedPersonIndex(updated.nosotros.equipo[selectedGroupIndex].personas.length - 1);
                          }
                        }}
                        className="mt-2 border border-dashed border-brand-gray/20 rounded-[0.6rem] px-3 py-2 text-[0.75rem] text-tech-green hover:bg-tech-green/5 text-center font-semibold"
                      >
                        + Nuevo Integrante
                      </button>
                    </div>

                    {/* Editor Form for Selected Person */}
                    {content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex] && (
                      <div className="flex flex-col gap-4 bg-white/[0.01] border border-brand-gray/10 rounded-[0.8rem] p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Nombre Completo</label>
                            <input
                              type="text"
                              value={content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].nombre}
                              onChange={(e) => {
                                const updated = { ...content };
                                if (updated.nosotros) {
                                  updated.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].nombre = e.target.value;
                                  setContent(updated);
                                }
                              }}
                              className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-2 text-[0.9rem] text-brand-gray outline-none focus:border-tech-green"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Cargo / Puesto</label>
                            <input
                              type="text"
                              value={content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].puesto}
                              onChange={(e) => {
                                const updated = { ...content };
                                if (updated.nosotros) {
                                  updated.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].puesto = e.target.value;
                                  setContent(updated);
                                }
                              }}
                              className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-2 text-[0.9rem] text-brand-gray outline-none focus:border-tech-green"
                            />
                          </div>
                        </div>

                        {/* Person Avatar Upload */}
                        <div className="flex flex-col gap-2">
                          <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Foto del Integrante</label>
                          <div className="flex items-center gap-4 flex-wrap">
                            {content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].foto && (
                              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-brand-gray/10 bg-black/25">
                                <img src={content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].foto} alt="Avatar" className="h-full w-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-[200px] flex gap-2">
                              <input
                                type="text"
                                value={content.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].foto}
                                onChange={(e) => {
                                  const updated = { ...content };
                                  if (updated.nosotros) {
                                    updated.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].foto = e.target.value;
                                    setContent(updated);
                                  }
                                }}
                                className="flex-1 rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-2 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green"
                              />
                              <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-4 py-2 text-[0.75rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                                <span>Subir Foto</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const url = await uploadFileDirectly(e.target.files[0]);
                                      if (url) {
                                        const updated = { ...content };
                                        if (updated.nosotros) {
                                          updated.nosotros.equipo[selectedGroupIndex].personas[selectedPersonIndex].foto = url;
                                          setContent(updated);
                                        }
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm("¿Estás seguro de eliminar este integrante?")) {
                              const updated = { ...content };
                              if (updated.nosotros) {
                                updated.nosotros.equipo[selectedGroupIndex].personas = updated.nosotros.equipo[selectedGroupIndex].personas.filter((_, idx) => idx !== selectedPersonIndex);
                                setContent(updated);
                                setSelectedPersonIndex(0);
                              }
                            }
                          }}
                          className="self-start mt-2 text-red-400 hover:text-red-500 text-[0.75rem] font-semibold"
                        >
                          Eliminar de este Grupo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveGeneralContent}
              className="mt-6 self-start rounded-full bg-tech-green px-8 py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98]"
            >
              Guardar Contenido Nosotros
            </button>
          </div>
        )}

        {/* Tab Content: PROYECTOS */}
        {activeTab === "proyectos" && currentProj && (
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
            {/* Project List Selector */}
            <div className="flex flex-col gap-2 bg-white/[0.01] border border-brand-gray/10 rounded-[1.2rem] p-4 h-fit">
              <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider px-2 mb-2">Proyectos</span>
              {projects.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedProjIndex(idx)}
                  className={`text-left px-4 py-3 rounded-[0.8rem] text-[0.9rem] transition-colors ${
                    selectedProjIndex === idx
                      ? "bg-tech-green text-brand-ink font-semibold"
                      : "text-brand-gray/70 hover:bg-white/[0.03]"
                  }`}
                >
                  {p.nombre}
                </button>
              ))}

              <button
                onClick={() => {
                  const newProj: Project = {
                    slug: `nuevo-proyecto-${Date.now()}`,
                    nombre: "Nuevo Proyecto",
                    ubicacion: "Chinchero, Cusco",
                    precioDesde: "USD 25,000",
                    areaDesde: "180 m²",
                    resumen: "Terrenos hermosos en el Valle Sagrado.",
                    descripcion: "Descripción del nuevo proyecto inmobiliario de Tutierra.",
                    caracteristicas: [
                      "Saneamiento físico legal garantizado",
                      "Independización individual"
                    ],
                    imagenPrincipal: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
                    videoHero: "",
                    galeria: [
                      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80"
                    ],
                    logo: "/logo.svg",
                    extension: "180 m² – 450 m²",
                    lotesDisponiblesPct: 100,
                    areasComunes: ["Áreas verdes"],
                    beneficiosCortos: ["Saneamiento legal", "Independización"],
                    masterPlanAmenities: [
                      { id: "seguridad", label: "Garita de Seguridad", desc: "Acceso peatonal y vehicular vigilado.", icon: "/images/global/emblem-white.png" }
                    ],
                    mapLink: "",
                    activo: true,
                    clausurado: false,
                  };
                  setProjects([...projects, newProj]);
                  setSelectedProjIndex(projects.length);
                }}
                className="mt-4 border border-dashed border-brand-gray/30 rounded-[0.8rem] px-4 py-3 text-[0.85rem] text-tech-green hover:bg-tech-green/10 text-center transition-colors font-semibold"
              >
                + Nuevo Proyecto
              </button>
            </div>

            {/* Project Editor Form */}
            <div className="flex flex-col gap-8 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
              <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2">
                Editar: {currentProj.nombre}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Nombre del Proyecto</label>
                  <input
                    type="text"
                    value={currentProj.nombre}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].nombre = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={currentProj.ubicacion}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].ubicacion = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Precio Desde</label>
                  <input
                    type="text"
                    value={currentProj.precioDesde}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].precioDesde = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Área Desde</label>
                  <input
                    type="text"
                    value={currentProj.areaDesde}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].areaDesde = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Enlace del Proyecto (Ruta/Slug)</label>
                  <input
                    type="text"
                    value={currentProj.slug}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].slug = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Locación del Mapa (Dirección, Coordenadas o Link)</label>
                  <input
                    type="text"
                    value={currentProj.mapLink || ""}
                    placeholder="Ej. -13.3912, -72.0492"
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].mapLink = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Resumen Corto</label>
                  <input
                    type="text"
                    value={currentProj.resumen}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].resumen = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Descripción Completa</label>
                  <textarea
                    rows={4}
                    value={currentProj.descripcion}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].descripcion = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Lotes Disponibles (%)</label>
                  <input
                    type="number"
                    value={currentProj.lotesDisponiblesPct}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].lotesDisponiblesPct = Number(e.target.value);
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Extensión Completa (Lotes)</label>
                  <input
                    type="text"
                    value={currentProj.extension}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].extension = e.target.value;
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
              </div>

              {/* Beneficios Cortos List Editor */}
              <div className="flex flex-col gap-8 border-t border-brand-gray/10 pt-6">
                <div>
                  <label className="block text-[0.8rem] text-brand-gray/60 uppercase font-semibold mb-3">
                    Beneficios Cortos
                  </label>
                  <div className="flex flex-col gap-3">
                    {(currentProj.beneficiosCortos || []).map((item, idx) => {
                      const norm = typeof item === "string" ? { label: item, icon: "check" } : item;
                      return (
                        <div key={idx} className="flex gap-2 items-center bg-white/[0.01] border border-brand-gray/10 rounded-[0.8rem] p-2">
                          <input
                            type="text"
                            value={norm.label}
                            placeholder="Beneficio"
                            onChange={(e) => {
                              const list = [...projects];
                              const copy = [...list[selectedProjIndex].beneficiosCortos];
                              copy[idx] = { label: e.target.value, icon: norm.icon };
                              list[selectedProjIndex].beneficiosCortos = copy;
                              setProjects(list);
                            }}
                            className="flex-1 rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green"
                          />
                          <select
                            value={norm.icon}
                            onChange={(e) => {
                              const list = [...projects];
                              const copy = [...list[selectedProjIndex].beneficiosCortos];
                              copy[idx] = { label: norm.label, icon: e.target.value };
                              list[selectedProjIndex].beneficiosCortos = copy;
                              setProjects(list);
                            }}
                            className="rounded-[0.6rem] border border-brand-gray/10 bg-[#0c1e16] px-2 py-1.5 text-[0.8rem] text-brand-gray outline-none focus:border-tech-green cursor-pointer"
                          >
                            <option value="check">✓ Check</option>
                            <option value="droplet">💧 Agua/Luz</option>
                            <option value="shield">🛡️ Seguridad</option>
                            <option value="leaf">🍃 Áreas Verdes</option>
                            <option value="road">🛣️ Vías</option>
                            <option value="pin">📍 Ubicación</option>
                            <option value="flame">🔥 Parrilla</option>
                            <option value="sun">☀️ Clima</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...projects];
                              list[selectedProjIndex].beneficiosCortos = list[selectedProjIndex].beneficiosCortos.filter((_, i) => i !== idx);
                              setProjects(list);
                            }}
                            className="text-red-400 hover:text-red-500 font-bold px-2 py-1 text-[0.85rem]"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => {
                        const list = [...projects];
                        list[selectedProjIndex].beneficiosCortos = [...(list[selectedProjIndex].beneficiosCortos || []), { label: "Nuevo Beneficio", icon: "check" }];
                        setProjects(list);
                      }}
                      className="self-start text-[0.8rem] text-tech-green hover:underline font-semibold"
                    >
                      + Agregar Beneficio
                    </button>
                  </div>
                </div>

                {/* Areas Comunes List Editor */}
                <div className="border-t border-brand-gray/10 pt-6">
                  <label className="block text-[0.8rem] text-brand-gray/60 uppercase font-semibold mb-3">
                    Áreas Comunes
                  </label>
                  <div className="flex flex-col gap-3">
                    {(currentProj.areasComunes || []).map((item, idx) => {
                      const norm = typeof item === "string" ? { label: item, icon: "check" } : item;
                      return (
                        <div key={idx} className="flex gap-2 items-center bg-white/[0.01] border border-brand-gray/10 rounded-[0.8rem] p-2">
                          <input
                            type="text"
                            value={norm.label}
                            placeholder="Área común"
                            onChange={(e) => {
                              const list = [...projects];
                              const copy = [...list[selectedProjIndex].areasComunes];
                              copy[idx] = { label: e.target.value, icon: norm.icon };
                              list[selectedProjIndex].areasComunes = copy;
                              setProjects(list);
                            }}
                            className="flex-1 rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green"
                          />
                          <select
                            value={norm.icon}
                            onChange={(e) => {
                              const list = [...projects];
                              const copy = [...list[selectedProjIndex].areasComunes];
                              copy[idx] = { label: norm.label, icon: e.target.value };
                              list[selectedProjIndex].areasComunes = copy;
                              setProjects(list);
                            }}
                            className="rounded-[0.6rem] border border-brand-gray/10 bg-[#0c1e16] px-2 py-1.5 text-[0.8rem] text-brand-gray outline-none focus:border-tech-green cursor-pointer"
                          >
                            <option value="check">✓ Check</option>
                            <option value="droplet">💧 Agua/Luz</option>
                            <option value="shield">🛡️ Seguridad</option>
                            <option value="leaf">🍃 Áreas Verdes</option>
                            <option value="road">🛣️ Vías</option>
                            <option value="pin">📍 Ubicación</option>
                            <option value="flame">🔥 Parrilla</option>
                            <option value="sun">☀️ Clima</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const list = [...projects];
                              list[selectedProjIndex].areasComunes = list[selectedProjIndex].areasComunes.filter((_, i) => i !== idx);
                              setProjects(list);
                            }}
                            className="text-red-400 hover:text-red-500 font-bold px-2 py-1 text-[0.85rem]"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => {
                        const list = [...projects];
                        list[selectedProjIndex].areasComunes = [...(list[selectedProjIndex].areasComunes || []), { label: "Nueva Área Común", icon: "check" }];
                        setProjects(list);
                      }}
                      className="self-start text-[0.8rem] text-tech-green hover:underline font-semibold"
                    >
                      + Agregar Área Común
                    </button>
                  </div>
                </div>

                {/* Master Plan Amenities List Editor */}
                <div className="border-t border-brand-gray/10 pt-6">
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">
                    Amenidades del Master Plan (Garita, Piscina, Club House, etc.)
                  </label>
                  <p className="text-[0.75rem] text-brand-gray/60 mb-3">
                    Aquí configuras los puntos interactivos del plano del proyecto (Segunda Imagen). Sube el icono, define el título y añade la descripción.
                  </p>

                  <div className="flex flex-col gap-4">
                    {(currentProj.masterPlanAmenities || []).map((amenity, idx) => (
                      <div key={idx} className="flex flex-col gap-4 bg-white/[0.01] border border-brand-gray/10 rounded-[1rem] p-4 relative">
                        <button
                          type="button"
                          onClick={() => {
                            const list = [...projects];
                            list[selectedProjIndex].masterPlanAmenities = (list[selectedProjIndex].masterPlanAmenities || []).filter((_, i) => i !== idx);
                            setProjects(list);
                          }}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-500 font-semibold text-[0.8rem]"
                        >
                          Eliminar ✕
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Título de la Amenidad</label>
                            <input
                              type="text"
                              value={amenity.label}
                              placeholder="Ej. Garita de Seguridad"
                              onChange={(e) => {
                                const list = [...projects];
                                const copy = [...(list[selectedProjIndex].masterPlanAmenities || [])];
                                copy[idx] = { ...copy[idx], label: e.target.value };
                                list[selectedProjIndex].masterPlanAmenities = copy;
                                setProjects(list);
                              }}
                              className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green"
                            />
                          </div>

                          <div>
                            <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Icono de la Amenidad (SVG o PNG transparente)</label>
                            <div className="flex items-center gap-3">
                              {amenity.icon && (
                                <div className="h-9 w-9 overflow-hidden rounded-[0.4rem] border border-brand-gray/10 bg-white/[0.03] flex items-center justify-center p-1.5 shrink-0">
                                  <img src={amenity.icon} alt="Icon" className="max-h-full max-w-full object-contain filter brightness-0 invert" />
                                </div>
                              )}
                              <input
                                type="text"
                                value={amenity.icon || ""}
                                onChange={(e) => {
                                  const list = [...projects];
                                  const copy = [...(list[selectedProjIndex].masterPlanAmenities || [])];
                                  copy[idx] = { ...copy[idx], icon: e.target.value };
                                  list[selectedProjIndex].masterPlanAmenities = copy;
                                  setProjects(list);
                                }}
                                className="flex-1 rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.8rem] text-brand-gray outline-none focus:border-tech-green"
                                placeholder="Ruta del icono"
                              />
                              <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-4 py-2 text-[0.75rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform shrink-0 flex items-center justify-center">
                                <span>Subir Icono</span>
                                <input
                                  type="file"
                                  accept="image/svg+xml, image/png, image/jpeg, image/webp"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const url = await uploadFileDirectly(e.target.files[0]);
                                      if (url) {
                                        const list = [...projects];
                                        const copy = [...(list[selectedProjIndex].masterPlanAmenities || [])];
                                        copy[idx] = { ...copy[idx], icon: url };
                                        list[selectedProjIndex].masterPlanAmenities = copy;
                                        setProjects(list);
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[0.75rem] text-brand-gray/60 mb-1">Descripción de la Amenidad</label>
                          <textarea
                            rows={2}
                            value={amenity.desc}
                            placeholder="Descripción del beneficio..."
                            onChange={(e) => {
                              const list = [...projects];
                              const copy = [...(list[selectedProjIndex].masterPlanAmenities || [])];
                              copy[idx] = { ...copy[idx], desc: e.target.value };
                              list[selectedProjIndex].masterPlanAmenities = copy;
                              setProjects(list);
                            }}
                            className="w-full rounded-[0.6rem] border border-brand-gray/10 bg-white/[0.02] px-3 py-1.5 text-[0.85rem] text-brand-gray outline-none focus:border-tech-green"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        const list = [...projects];
                        const newAmenity = {
                          id: `amenity-${Date.now()}`,
                          label: "Nueva Amenidad",
                          desc: "Descripción corta de este beneficio del master plan.",
                          icon: "/images/global/emblem-white.png"
                        };
                        list[selectedProjIndex].masterPlanAmenities = [...(list[selectedProjIndex].masterPlanAmenities || []), newAmenity];
                        setProjects(list);
                      }}
                      className="self-start mt-2 text-[0.8rem] text-tech-green hover:underline font-semibold"
                    >
                      + Agregar Amenidad del Master Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.01] border border-brand-gray/10 rounded-[0.8rem] p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`active-${currentProj.slug}`}
                    checked={currentProj.activo !== false}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].activo = e.target.checked;
                      setProjects(list);
                    }}
                    className="h-5 w-5 rounded border-brand-gray/10 bg-white/[0.02] text-tech-green focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor={`active-${currentProj.slug}`} className="text-[0.9rem] text-brand-gray/80 font-semibold cursor-pointer">
                    Publicado (Visible en la Web)
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`closed-${currentProj.slug}`}
                    checked={!!currentProj.clausurado}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].clausurado = e.target.checked;
                      setProjects(list);
                    }}
                    className="h-5 w-5 rounded border-brand-gray/10 bg-white/[0.02] text-tech-green focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor={`closed-${currentProj.slug}`} className="text-[0.9rem] text-brand-gray/80 font-semibold cursor-pointer">
                    Clausurado (Marcar como 100% Vendido)
                  </label>
                </div>
              </div>

              {/* Direct Image Upload for Main Project Image */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Imagen Principal del Proyecto (Carrusel Inicio)</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {currentProj.imagenPrincipal && (
                    <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                      <img src={currentProj.imagenPrincipal} alt="Proyecto" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={currentProj.imagenPrincipal}
                      onChange={(e) => {
                        const list = [...projects];
                        list[selectedProjIndex].imagenPrincipal = e.target.value;
                        setProjects(list);
                      }}
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              const list = [...projects];
                              list[selectedProjIndex].imagenPrincipal = url;
                              setProjects(list);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Image Upload for Project Logo */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">
                  Logo del Proyecto (SVG o PNG con fondo transparente)
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  {currentProj.logo && (
                    <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-white/[0.03] flex items-center justify-center p-2">
                      <img src={currentProj.logo} alt="Logo proyecto" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={currentProj.logo || ""}
                      onChange={(e) => {
                        const list = [...projects];
                        list[selectedProjIndex].logo = e.target.value;
                        setProjects(list);
                      }}
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Logo</span>
                      <input
                        type="file"
                        accept="image/svg+xml, image/png, image/jpeg, image/webp"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              const list = [...projects];
                              list[selectedProjIndex].logo = url;
                              setProjects(list);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Video Upload for Hero Video */}
              <div className="flex flex-col gap-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Video de Fondo del Hero (MP4)</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {currentProj.videoHero && (
                    <div className="text-[0.8rem] text-brand-gray/50 font-mono select-all bg-white/[0.02] border border-brand-gray/10 px-3 py-2 rounded-[0.6rem] max-w-[200px] overflow-hidden truncate">
                      {currentProj.videoHero}
                    </div>
                  )}
                  <div className="flex-1 min-w-[200px] flex gap-2">
                    <input
                      type="text"
                      value={currentProj.videoHero || ""}
                      onChange={(e) => {
                        const list = [...projects];
                        list[selectedProjIndex].videoHero = e.target.value;
                        setProjects(list);
                      }}
                      className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      placeholder="/videos/chinchero-bg.mp4"
                    />
                    <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                      <span>Subir Video</span>
                      <input
                        type="file"
                        accept="video/mp4, video/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await uploadFileDirectly(e.target.files[0]);
                            if (url) {
                              const list = [...projects];
                              list[selectedProjIndex].videoHero = url;
                              setProjects(list);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Project Gallery Editor */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">
                  Galería de Fotos del Proyecto (Carrusel Detalle)
                </label>
                
                {/* Thumbnails Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-2">
                  {currentProj.galeria.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem] border border-brand-gray/10 group bg-black/25">
                      <img src={img} alt="Vista galería" className="h-full w-full object-cover" />
                      <button
                        onClick={() => {
                          const list = [...projects];
                          list[selectedProjIndex].galeria = currentProj.galeria.filter((_, i) => i !== idx);
                          setProjects(list);
                        }}
                        className="absolute top-2 right-2 bg-red-600/80 text-white rounded-full h-6 w-6 flex items-center justify-center text-[0.7rem] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 font-bold"
                        title="Eliminar de la galería"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Add Image Card Button */}
                  <div className="relative aspect-[16/10] border border-dashed border-brand-gray/30 hover:border-tech-green/50 rounded-[0.8rem] flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white/[0.01] hover:bg-white/[0.02]">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadFileDirectly(e.target.files[0]);
                          if (url) {
                            const list = [...projects];
                            list[selectedProjIndex].galeria = [...currentProj.galeria, url];
                            setProjects(list);
                          }
                        }
                      }}
                    />
                    <span className="text-[1.3rem] text-tech-green font-bold leading-none">+</span>
                    <span className="text-[0.7rem] text-brand-gray/55 mt-1">Subir Foto</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Características (Una por línea)</label>
                  <textarea
                    rows={4}
                    value={currentProj.caracteristicas.join("\n")}
                    onChange={(e) => {
                      const list = [...projects];
                      list[selectedProjIndex].caracteristicas = e.target.value.split("\n");
                      setProjects(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green font-mono text-[0.85rem]"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveProjectsData}
                  className="rounded-full bg-tech-green px-8 py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98]"
                >
                  Guardar Todos los Proyectos
                </button>
                <button
                  onClick={() => {
                    if (confirm("¿Estás seguro de eliminar este proyecto por completo de la base de datos?")) {
                      const list = projects.filter((_, idx) => idx !== selectedProjIndex);
                      setProjects(list);
                      setSelectedProjIndex(0);
                    }
                  }}
                  className="rounded-full border border-red-500/30 px-6 py-3 text-[0.85rem] text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Eliminar Proyecto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: BLOG */}
        {activeTab === "blog" && currentPost && (
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar list */}
            <div className="flex flex-col gap-2 bg-white/[0.01] border border-brand-gray/10 rounded-[1.2rem] p-4 h-fit">
              <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider px-2 mb-2">Artículos</span>
              {posts.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedPostIndex(idx)}
                  className={`text-left px-4 py-3 rounded-[0.8rem] text-[0.9rem] transition-colors line-clamp-2 ${
                    selectedPostIndex === idx
                      ? "bg-tech-green text-brand-ink font-semibold"
                      : "text-brand-gray/70 hover:bg-white/[0.03]"
                  }`}
                >
                  {p.titulo}
                </button>
              ))}

              <button
                onClick={() => {
                  const newPost: BlogPost = {
                    slug: `nuevo-articulo-${Date.now()}`,
                    titulo: "Nuevo Artículo de Prueba",
                    fecha: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }),
                    autor: "Equipo Tutierra",
                    tiempoLectura: "5 min de lectura",
                    resumen: "Resumen preliminar del artículo.",
                    contenido: "<p>Escribe el cuerpo del artículo aquí.</p>",
                    imagen: "/images/proyectos/proyecto-urubamba-01.jpg",
                  };
                  setPosts([...posts, newPost]);
                  setSelectedPostIndex(posts.length);
                }}
                className="mt-4 border border-dashed border-brand-gray/30 rounded-[0.8rem] px-4 py-3 text-[0.85rem] text-tech-green hover:bg-tech-green/10 text-center transition-colors font-semibold"
              >
                + Nuevo Artículo
              </button>
            </div>

            {/* Post editor form */}
            <div className="flex flex-col gap-8 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
              <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2">
                Editar Artículo: {currentPost.titulo}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Título del Artículo</label>
                  <input
                    type="text"
                    value={currentPost.titulo}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].titulo = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Ruta del Enlace (Slug)</label>
                  <input
                    type="text"
                    value={currentPost.slug}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].slug = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Autor</label>
                  <input
                    type="text"
                    value={currentPost.autor}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].autor = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Tiempo de Lectura</label>
                  <input
                    type="text"
                    value={currentPost.tiempoLectura}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].tiempoLectura = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Resumen del Artículo</label>
                  <input
                    type="text"
                    value={currentPost.resumen}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].resumen = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                  />
                </div>

                {/* Direct image upload for Blog post */}
                <div className="flex flex-col gap-2">
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Foto Principal (Imagen)</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    {currentPost.imagen && (
                      <div className="relative h-20 w-32 overflow-hidden rounded-[0.8rem] border border-brand-gray/10 bg-black/25">
                        <img src={currentPost.imagen} alt="Blog" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-[200px] flex gap-2">
                      <input
                        type="text"
                        value={currentPost.imagen}
                        onChange={(e) => {
                          const list = [...posts];
                          list[selectedPostIndex].imagen = e.target.value;
                          setPosts(list);
                        }}
                        className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                      />
                      <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                        <span>Subir Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await uploadFileDirectly(e.target.files[0]);
                              if (url) {
                                const list = [...posts];
                                list[selectedPostIndex].imagen = url;
                                setPosts(list);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Contenido (Código HTML)</label>
                  <textarea
                    rows={12}
                    value={currentPost.contenido}
                    onChange={(e) => {
                      const list = [...posts];
                      list[selectedPostIndex].contenido = e.target.value;
                      setPosts(list);
                    }}
                    className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green font-mono text-[0.85rem] leading-[1.5]"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={savePostsData}
                  className="rounded-full bg-tech-green px-8 py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98]"
                >
                  Guardar Todos los Artículos
                </button>
                <button
                  onClick={() => {
                    if (confirm("¿Estás seguro de eliminar este artículo?")) {
                      const list = posts.filter((_, idx) => idx !== selectedPostIndex);
                      setPosts(list);
                      setSelectedPostIndex(0);
                    }
                  }}
                  className="rounded-full border border-red-500/30 px-6 py-3 text-[0.85rem] text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Eliminar Artículo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: TESTIMONIOS */}
        {activeTab === "testimonios" && (
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar list */}
            <div className="flex flex-col gap-2 bg-white/[0.01] border border-brand-gray/10 rounded-[1.2rem] p-4 h-fit">
              <span className="text-[0.75rem] font-semibold text-brand-gray/45 uppercase tracking-wider px-2 mb-2">Testimonios</span>
              {testimonios.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTestimonialIndex(idx)}
                  className={`text-left px-4 py-3 rounded-[0.8rem] text-[0.9rem] transition-colors line-clamp-1 ${
                    selectedTestimonialIndex === idx
                      ? "bg-tech-green text-brand-ink font-semibold"
                      : "text-brand-gray/70 hover:bg-white/[0.03]"
                  }`}
                >
                  {t.nombre || `Testimonio ${idx + 1}`}
                </button>
              ))}

              <button
                onClick={() => {
                  const newT = {
                    nombre: "Nuevo Cliente",
                    proyecto: "Propietario en Tutierra Chinchero",
                    texto: "Excelente atención y respaldo legal.",
                    imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=80",
                  };
                  setTestimonios([...testimonios, newT]);
                  setSelectedTestimonialIndex(testimonios.length);
                }}
                className="mt-4 border border-dashed border-brand-gray/30 rounded-[0.8rem] px-4 py-3 text-[0.85rem] text-tech-green hover:bg-tech-green/10 text-center transition-colors font-semibold"
              >
                + Nuevo Testimonio
              </button>
            </div>

            {/* Testimonio Editor Form */}
            {testimonios[selectedTestimonialIndex] && (
              <div className="flex flex-col gap-8 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8">
                <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2">
                  Editar Testimonio: {testimonios[selectedTestimonialIndex].nombre}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Nombre del Cliente</label>
                    <input
                      type="text"
                      value={testimonios[selectedTestimonialIndex].nombre}
                      onChange={(e) => {
                        const list = [...testimonios];
                        list[selectedTestimonialIndex].nombre = e.target.value;
                        setTestimonios(list);
                      }}
                      className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Condición / Proyecto</label>
                    <input
                      type="text"
                      value={testimonios[selectedTestimonialIndex].proyecto}
                      onChange={(e) => {
                        const list = [...testimonios];
                        list[selectedTestimonialIndex].proyecto = e.target.value;
                        setTestimonios(list);
                      }}
                      className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Texto del Testimonio</label>
                    <textarea
                      rows={3}
                      value={testimonios[selectedTestimonialIndex].texto}
                      onChange={(e) => {
                        const list = [...testimonios];
                        list[selectedTestimonialIndex].texto = e.target.value;
                        setTestimonios(list);
                      }}
                      className="w-full rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                    />
                  </div>

                  {/* Direct upload for testimonial photo */}
                  <div className="flex flex-col gap-2">
                    <label className="block text-[0.85rem] text-brand-gray/80 uppercase font-semibold mb-1">Foto del Cliente (Imagen de Carrusel)</label>
                    <div className="flex items-center gap-4 flex-wrap">
                      {testimonios[selectedTestimonialIndex].imagen && (
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-brand-gray/10 bg-black/25">
                          <img src={testimonios[selectedTestimonialIndex].imagen} alt="Cliente" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-[200px] flex gap-2">
                        <input
                          type="text"
                          value={testimonios[selectedTestimonialIndex].imagen}
                          onChange={(e) => {
                            const list = [...testimonios];
                            list[selectedTestimonialIndex].imagen = e.target.value;
                            setTestimonios(list);
                          }}
                          className="flex-1 rounded-[0.6rem] border border-brand-gray/20 bg-white/[0.06] px-4 py-3 text-[0.95rem] text-white outline-none focus:border-tech-green"
                        />
                        <div className="relative overflow-hidden rounded-[0.6rem] bg-tech-green text-brand-ink font-semibold px-5 py-3 text-[0.85rem] cursor-pointer hover:scale-[0.97] active:scale-[0.97] transition-transform flex items-center justify-center shrink-0">
                          <span>Subir Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await uploadFileDirectly(e.target.files[0]);
                                if (url) {
                                  const list = [...testimonios];
                                  list[selectedTestimonialIndex].imagen = url;
                                  setTestimonios(list);
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={saveTestimoniosData}
                    className="rounded-full bg-tech-green px-8 py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98]"
                  >
                    Guardar Todos los Testimonios
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de eliminar este testimonio?")) {
                        const list = testimonios.filter((_, idx) => idx !== selectedTestimonialIndex);
                        setTestimonios(list);
                        setSelectedTestimonialIndex(0);
                      }
                    }}
                    className="rounded-full border border-red-500/30 px-6 py-3 text-[0.85rem] text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Eliminar Testimonio
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: IMAGES UPLOAD TOOL */}
        {activeTab === "imagenes" && (
          <div className="flex flex-col gap-8 bg-white/[0.02] border border-brand-gray/10 rounded-[1.2rem] p-8 max-w-[600px] mx-auto">
            <h2 className="text-[1.2rem] font-display font-light text-tech-green border-b border-brand-gray/10 pb-2 text-center">
              Herramienta de Carga de Imágenes
            </h2>

            <form onSubmit={handleUpload} className="flex flex-col gap-6">
              <div className="border border-dashed border-brand-gray/30 rounded-[1rem] p-8 text-center bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFile(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-[0.9rem] text-brand-gray/60 block">
                  {uploadFile ? `Archivo seleccionado: ${uploadFile.name}` : "Arrastra o selecciona una foto/video de tu computadora"}
                </span>
                <span className="text-[0.75rem] text-brand-gray/40 mt-1 block">Formatos: JPG, PNG, WEBP, MP4. Máx: 50MB</span>
              </div>

              <button
                type="submit"
                disabled={!uploadFile || uploading}
                className="w-full rounded-full bg-tech-green py-3 text-[0.9rem] font-semibold text-brand-ink transition-transform hover:scale-[0.98] active:scale-[0.98] disabled:opacity-50"
              >
                {uploading ? "Subiendo archivo..." : "Subir al Servidor"}
              </button>
            </form>

            {uploadedUrl && (
              <div className="mt-4 p-4 rounded-[0.8rem] bg-tech-green/10 border border-tech-green/20 text-center">
                <p className="text-[0.85rem] text-tech-green font-semibold">¡Archivo subido con éxito!</p>
                <p className="text-[0.8rem] text-brand-gray/70 mt-1 font-mono break-all select-all selection:bg-tech-green/30">
                  {uploadedUrl}
                </p>
                <p className="text-[0.75rem] text-brand-gray/55 mt-2">
                  Puedes copiar esta ruta o subir archivos directamente desde los formularios de proyectos, artículos del blog o fundador.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
