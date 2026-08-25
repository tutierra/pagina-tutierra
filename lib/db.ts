import fs from "fs";
import path from "path";
import { PROYECTOS, POSTS, Proyecto, Post } from "./site-data";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const DATA_DIR = process.env.VERCEL
  ? "/tmp"
  : path.join(process.cwd(), "data");

const ORIGINAL_DATA_DIR = path.join(process.cwd(), "data");

const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects-content.json");
const POSTS_FILE = path.join(DATA_DIR, "posts-content.json");
const TESTIMONIOS_FILE = path.join(DATA_DIR, "testimonios-content.json");

const DEFAULT_CONTENT = {
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

function mergeDeep(target: any, source: any) {
  if (!source) return target;
  if (!target) return source;
  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (source[key] !== undefined && source[key] !== null) {
      if (typeof source[key] === "object" && !Array.isArray(source[key])) {
        output[key] = mergeDeep(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  });
  return output;
}

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {}
}

export async function getSiteContent() {
  let rawContent: any = null;

  if (supabase) {
    try {
      // 1. Consultar Supabase buscando id = 'main_content' (tabla site_content)
      const { data: mainData, error: mainErr } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "main_content")
        .single();

      if (!mainErr && mainData?.data) {
        rawContent = mainData.data;
      } else {
        // Fallback a 'general_content'
        const { data: genData, error: genErr } = await supabase
          .from("site_content")
          .select("data")
          .eq("id", "general_content")
          .single();
        if (!genErr && genData?.data) {
          rawContent = genData.data;
        }
      }
    } catch (e) {
      console.error("Error fetching site_content from Supabase DB:", e);
    }
  }

  if (!rawContent) {
    ensureDir();
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        rawContent = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
      } else {
        const orig = path.join(ORIGINAL_DATA_DIR, "site-content.json");
        if (fs.existsSync(orig)) {
          rawContent = JSON.parse(fs.readFileSync(orig, "utf-8"));
        }
      }
    } catch (e) {}
  }

  return mergeDeep(DEFAULT_CONTENT, rawContent || {});
}

export async function saveSiteContent(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}

  if (supabase) {
    try {
      // Upsert a Supabase a id = 'main_content' y 'general_content'
      await Promise.all([
        supabase.from("site_content").upsert({
          id: "main_content",
          data: data,
          updated_at: new Date().toISOString(),
        }),
        supabase.from("site_content").upsert({
          id: "general_content",
          data: data,
          updated_at: new Date().toISOString(),
        }),
      ]);
    } catch (err) {
      console.error("Supabase site_content upsert error:", err);
    }
  }
}

export async function getProjectsContent(): Promise<Proyecto[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "projects_content")
        .single();
      if (!error && Array.isArray(data?.data) && data.data.length > 0) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching projects_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "projects-content.json");
    if (fs.existsSync(orig)) {
      const parsedOrig = JSON.parse(fs.readFileSync(orig, "utf-8"));
      if (Array.isArray(parsedOrig) && parsedOrig.length > 0) return parsedOrig;
    }
  } catch (e) {}
  return PROYECTOS;
}

export async function saveProjectsContent(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}

  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: "projects_content", data: data, updated_at: new Date().toISOString() });
      if (error) console.error("Error al guardar projects_content en Supabase DB:", error);
    } catch (err) {
      console.error("Supabase projects upsert error:", err);
    }
  }
}

export async function getPostsContent(): Promise<Post[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "posts_content")
        .single();
      if (!error && Array.isArray(data?.data) && data.data.length > 0) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching posts_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "posts-content.json");
    if (fs.existsSync(orig)) {
      const parsedOrig = JSON.parse(fs.readFileSync(orig, "utf-8"));
      if (Array.isArray(parsedOrig) && parsedOrig.length > 0) return parsedOrig;
    }
  } catch (e) {}
  return POSTS;
}

export async function savePostsContent(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}

  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: "posts_content", data: data, updated_at: new Date().toISOString() });
      if (error) console.error("Error al guardar posts_content en Supabase DB:", error);
    } catch (err) {
      console.error("Supabase posts upsert error:", err);
    }
  }
}

export interface Testimonio {
  nombre: string;
  proyecto: string;
  texto: string;
  imagen: string;
}

export async function getTestimoniosContent(): Promise<Testimonio[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "testimonios_content")
        .single();
      if (!error && Array.isArray(data?.data) && data.data.length > 0) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching testimonios_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(TESTIMONIOS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(TESTIMONIOS_FILE, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "testimonios-content.json");
    if (fs.existsSync(orig)) {
      const parsedOrig = JSON.parse(fs.readFileSync(orig, "utf-8"));
      if (Array.isArray(parsedOrig) && parsedOrig.length > 0) return parsedOrig;
    }
  } catch (e) {}
  return [];
}

export async function saveTestimoniosContent(data: Testimonio[]) {
  ensureDir();
  try {
    fs.writeFileSync(TESTIMONIOS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}

  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: "testimonios_content", data: data, updated_at: new Date().toISOString() });
      if (error) console.error("Error al guardar testimonios_content en Supabase DB:", error);
    } catch (err) {
      console.error("Supabase testimonios upsert error:", err);
    }
  }
}
