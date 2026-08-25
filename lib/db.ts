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
    image: "/images/global/manifesto-equipo.png"
  },
  founder: {
    title: "Una visión nacida en el Valle Sagrado",
    text: "“Crecí viendo cómo muchas familias soñaban con un pedazo de tierra propio, pero se topaban con trámites, informalidad y promesas vacías. Fundé Tutierra para que ese sueño fuera seguro, legal y real. Cada lote que entregamos es una familia que echa raíces.”",
    name: "Carlos Mendoza",
    "role": "Fundador y Director General",
    img: "/images/testimonios/cliente-01.jpg"
  },
  general: {
    valleBgImage: "/images/global/valle-sagrado-bg.jpg",
    refiereGanaImg: "/images/referidos/handshake.jpg",
    proyectosConcluidos: []
  },
  nosotros: {
    timeline: [
      { "year": "2016", "titulo": "Nace Tutierra", "texto": "Fundada en Cusco con un propósito: crear y unir familias a través de la tierra.", "img": "/images/nosotros/oficina.jpg" }
    ],
    cifras: [
      { "valor": "6", "label": "Proyectos activos en el Valle Sagrado" }
    ],
    equipo: [
      {
        "area": "Gerencia",
        "personas": [
          { "nombre": "Lucía Ramírez", "puesto": "Gerente Comercial", "foto": "/images/testimonios/cliente-01.jpg" }
        ]
      }
    ]
  }
};

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {}
}

export async function getSiteContent() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", "general_content")
        .single();
      if (!error && data?.data) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching site_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "site-content.json");
    if (fs.existsSync(orig)) {
      return JSON.parse(fs.readFileSync(orig, "utf-8"));
    }
  } catch (e) {}
  return DEFAULT_CONTENT;
}

export async function saveSiteContent(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}

  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert({ id: "general_content", data: data, updated_at: new Date().toISOString() });
      if (error) console.error("Error al guardar site_content en Supabase DB:", error);
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
      if (!error && data?.data) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching projects_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      return JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "projects-content.json");
    if (fs.existsSync(orig)) {
      return JSON.parse(fs.readFileSync(orig, "utf-8"));
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
      if (!error && data?.data) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching posts_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(POSTS_FILE)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "posts-content.json");
    if (fs.existsSync(orig)) {
      return JSON.parse(fs.readFileSync(orig, "utf-8"));
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
      if (!error && data?.data) {
        return data.data;
      }
    } catch (e) {
      console.error("Error fetching testimonios_content from Supabase DB:", e);
    }
  }

  ensureDir();
  try {
    if (fs.existsSync(TESTIMONIOS_FILE)) {
      return JSON.parse(fs.readFileSync(TESTIMONIOS_FILE, "utf-8"));
    }
    const orig = path.join(ORIGINAL_DATA_DIR, "testimonios-content.json");
    if (fs.existsSync(orig)) {
      return JSON.parse(fs.readFileSync(orig, "utf-8"));
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
