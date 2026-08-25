import fs from "fs";
import path from "path";
import { PROYECTOS, POSTS, Proyecto, Post } from "./site-data";

const DATA_DIR = path.join(process.cwd(), "data");
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
    refiereGanaImg: "/images/referidos/handshake.jpg"
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
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getSiteContent() {
  ensureDir();
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading site-content.json:", e);
  }
  return DEFAULT_CONTENT;
}

export function saveSiteContent(data: any) {
  ensureDir();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getProjectsContent(): Proyecto[] {
  ensureDir();
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      return JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading projects-content.json:", e);
  }
  return PROYECTOS;
}

export function saveProjectsContent(data: any) {
  ensureDir();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getPostsContent(): Post[] {
  ensureDir();
  try {
    if (fs.existsSync(POSTS_FILE)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading posts-content.json:", e);
  }
  return POSTS;
}

export function savePostsContent(data: any) {
  ensureDir();
  fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export interface Testimonio {
  nombre: string;
  proyecto: string;
  texto: string;
  imagen: string;
}

export function getTestimoniosContent(): Testimonio[] {
  ensureDir();
  try {
    if (fs.existsSync(TESTIMONIOS_FILE)) {
      return JSON.parse(fs.readFileSync(TESTIMONIOS_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading testimonios-content.json:", e);
  }
  return [];
}

export function saveTestimoniosContent(data: Testimonio[]) {
  ensureDir();
  fs.writeFileSync(TESTIMONIOS_FILE, JSON.stringify(data, null, 2), "utf-8");
}
