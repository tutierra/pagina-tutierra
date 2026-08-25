export const CONTACT = {
  phone: "+51 925 561 830",
  whatsapp: "51925561830",
  whatsappUrl: "https://api.whatsapp.com/send?phone=51925561830&text=Estuve%20navegando%20en%20la%20web%20y%20me%20gustar%C3%ADa%20invertir",
  email: "tutierrab@gmail.com",
  address: "Av. El Sol 123, Cusco, Perú",
  hours: "Lun - Sáb: 9:00 am - 7:00 pm",
  domain: "grupotutierra.com",
};

export const SOCIAL = {
  instagram: "https://instagram.com/tutierra.pe",
  facebook: "https://facebook.com/tutierragrupoinmobiliario",
  tiktok: "https://tiktok.com/@tutierra.pe",
};

export type Proyecto = {
  id?: string;
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
  title?: string;
  location?: string;
  status?: string;
  estado?: string;
  finalizado?: boolean;
  isCompleted?: boolean;
};

export const PROYECTOS: Proyecto[] = [
  {
    slug: "chinchero",
    nombre: "Tutierra Chinchero",
    ubicacion: "Chinchero, Cusco",
    precioDesde: "USD 28,000",
    areaDesde: "180 m²",
    resumen: "Terrenos con vista a los Andes, a 15 min del aeropuerto internacional.",
    descripcion:
      "Proyecto ubicado en las alturas de Chinchero, con vista panorámica a la cordillera. Saneamiento urbano garantizado e independización individual para cada lote.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Pistas y veredas",
      "Agua y luz domiciliaria",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-chinchero-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-chinchero-01.jpg",
      "/images/proyectos/proyecto-chinchero-02.jpg",
      "/images/proyectos/proyecto-chinchero-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "180 m² – 420 m²",
    lotesDisponiblesPct: 62,
    areasComunes: ["Mirador", "Portón vigilado", "Áreas verdes", "Vías asfaltadas"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Agua y luz", "Cerco perimétrico"],
  },
  {
    slug: "pisac",
    nombre: "Tutierra Pisac",
    ubicacion: "Pisac, Valle Sagrado",
    precioDesde: "USD 32,000",
    areaDesde: "200 m²",
    resumen: "A orillas del río Vilcanota, entorno natural y turístico consolidado.",
    descripcion:
      "Terrenos junto al valle de Pisac, zona de alta plusvalía turística. Ideal para proyectos de hospedaje o vivienda vacacional.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Zona turística consolidada",
      "Acceso asfaltado",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-pisac-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-pisac-01.jpg",
      "/images/proyectos/proyecto-pisac-02.jpg",
      "/images/proyectos/proyecto-pisac-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "200 m² – 480 m²",
    lotesDisponiblesPct: 48,
    areasComunes: ["Acceso al río", "Zona de parrillas", "Áreas verdes", "Portón vigilado"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Acceso asfaltado", "Cerco perimétrico"],
  },
  {
    slug: "urubamba",
    nombre: "Tutierra Urubamba",
    ubicacion: "Urubamba, Valle Sagrado",
    precioDesde: "USD 30,000",
    areaDesde: "220 m²",
    resumen: "El corazón del Valle Sagrado, clima templado todo el año.",
    descripcion:
      "Desarrollo residencial en Urubamba, con clima privilegiado y cercanía a los principales atractivos del valle.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Clima templado todo el año",
      "Áreas verdes comunes",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-urubamba-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-urubamba-01.jpg",
      "/images/proyectos/proyecto-urubamba-02.jpg",
      "/images/proyectos/proyecto-urubamba-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "220 m² – 500 m²",
    lotesDisponiblesPct: 71,
    areasComunes: ["Parque central", "Áreas verdes", "Zona de parrillas", "Portón vigilado"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Clima templado", "Cerco perimétrico"],
  },
  {
    slug: "maras",
    nombre: "Tutierra Maras",
    ubicacion: "Maras, Cusco",
    precioDesde: "USD 25,000",
    areaDesde: "250 m²",
    resumen: "Terrenos amplios cerca de las icónicas Salineras de Maras.",
    descripcion:
      "Lotes de gran extensión en Maras, ideales para proyectos agroturísticos o segunda vivienda con vistas abiertas.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Lotes de gran extensión",
      "Cercanía a Salineras de Maras",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-maras-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-maras-01.jpg",
      "/images/proyectos/proyecto-maras-02.jpg",
      "/images/proyectos/proyecto-maras-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "250 m² – 600 m²",
    lotesDisponiblesPct: 55,
    areasComunes: ["Cerca de Salineras", "Áreas verdes", "Vías afirmadas", "Portón vigilado"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Lotes amplios", "Cerco perimétrico"],
  },
  {
    slug: "ollantaytambo",
    nombre: "Tutierra Ollantaytambo",
    ubicacion: "Ollantaytambo, Cusco",
    precioDesde: "USD 35,000",
    areaDesde: "190 m²",
    resumen: "Puerta de entrada a Machu Picchu, alta demanda turística.",
    descripcion:
      "Proyecto en Ollantaytambo, punto estratégico de acceso a Machu Picchu, con fuerte proyección de plusvalía por flujo turístico.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Alta plusvalía turística",
      "Cercanía a estación de tren",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-ollantaytambo-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-ollantaytambo-01.jpg",
      "/images/proyectos/proyecto-ollantaytambo-02.jpg",
      "/images/proyectos/proyecto-ollantaytambo-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "190 m² – 410 m²",
    lotesDisponiblesPct: 39,
    areasComunes: ["Cerca de la estación", "Áreas verdes", "Zona de parrillas", "Portón vigilado"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Alta plusvalía", "Cerco perimétrico"],
  },
  {
    slug: "calca",
    nombre: "Tutierra Calca",
    ubicacion: "Calca, Valle Sagrado",
    precioDesde: "USD 22,000",
    areaDesde: "210 m²",
    resumen: "Tranquilidad rural con proyección de crecimiento urbano.",
    descripcion:
      "Terrenos en Calca, zona en expansión con precios de entrada accesibles y alto potencial de revalorización.",
    caracteristicas: [
      "Saneamiento físico legal garantizado",
      "Independización individual",
      "Precio de entrada accesible",
      "Zona en expansión urbana",
      "Cerco perimétrico",
    ],
    imagenPrincipal: "/images/proyectos/proyecto-calca-01.jpg",
    galeria: [
      "/images/proyectos/proyecto-calca-01.jpg",
      "/images/proyectos/proyecto-calca-02.jpg",
      "/images/proyectos/proyecto-calca-03.jpg",
    ],
    logo: "/logo.svg",
    extension: "210 m² – 460 m²",
    lotesDisponiblesPct: 80,
    areasComunes: ["Áreas verdes", "Zona en expansión", "Vías afirmadas", "Portón vigilado"],
    beneficiosCortos: ["Saneamiento legal", "Independización", "Precio accesible", "Cerco perimétrico"],
  },
];

export type Post = {
  slug: string;
  titulo: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
  resumen: string;
  contenido: string;
  imagen: string;
};

export const POSTS: Post[] = [
  {
    slug: "guia-comprar-terreno-valle-sagrado",
    titulo: "Guía definitiva para comprar terrenos en el Valle Sagrado",
    fecha: "24 Ago 2026",
    autor: "Equipo Tutierra",
    tiempoLectura: "5 min de lectura",
    resumen: "Descubre los aspectos legales clave, desde el saneamiento físico legal hasta la independización individual, para una compra segura.",
    contenido: `<p>Comprar un terreno en el Valle Sagrado es el sueño de muchas familias que buscan reconectar con la naturaleza, respirar aire puro y disfrutar de un clima templado y soleado durante todo el año. Sin embargo, realizar una transacción en zonas rurales o de expansión urbana en Cusco requiere especial cuidado legal.</p>

<h3>1. Saneamiento Físico Legal</h3>
<p>El saneamiento es el proceso por el cual se regulariza el derecho de propiedad de un terreno. Esto significa que el terreno debe contar con títulos de propiedad inscritos de manera limpia en la Superintendencia Nacional de los Registros Públicos (SUNARP), sin cargas, gravámenes o disputas de linderos.</p>

<h3>2. Independización Individual por Lote</h3>
<p>Muchos desarrolladores venden terrenos bajo la modalidad de acciones y derechos (copropiedad). Aunque es legal, esto significa que no eres dueño de un lote específico, sino de un porcentaje del total de la matriz. En Tutierra, garantizamos la <strong>independización individual</strong>, lo que significa que cada lote cuenta con su propia partida registral única en SUNARP.</p>

<h3>3. Zonificación y Servicios</h3>
<p>Asegúrate de que el proyecto cuente con los permisos de habilitación urbana o zonificación residencial que permitan la edificación. Asimismo, la factibilidad de agua y luz domiciliaria es vital para que puedas iniciar la construcción de tu casa de campo sin demoras administrativas.</p>

<p>En conclusión, invertir con una inmobiliaria formal que certifique cada uno de estos puntos en su contrato es la mejor garantía para proteger tu patrimonio familiar y construir tu futuro hogar en los Andes.</p>`,
    imagen: "/images/proyectos/proyecto-urubamba-01.jpg"
  },
  {
    slug: "por-que-invertir-en-cusco-hoy",
    titulo: "¿Por qué invertir en Cusco hoy? Plusvalía y calidad de vida",
    fecha: "18 Ago 2026",
    autor: "Juan Pablo Delgado",
    tiempoLectura: "4 min de lectura",
    resumen: "El Valle Sagrado de los Incas se ha consolidado como uno de los polos de inversión inmobiliaria y turística de mayor crecimiento en el Perú.",
    contenido: `<p>El mercado inmobiliario en Cusco, y en especial en el Valle Sagrado (Urubamba, Pisac, Chinchero), está viviendo un auge sin precedentes. No se trata solo de un destino turístico de clase mundial, sino de un refugio residencial altamente codiciado por inversionistas nacionales y extranjeros.</p>

<h3>Plusvalía en Aceleración</h3>
<p>La proximidad de proyectos de infraestructura clave, como el futuro Aeropuerto Internacional de Chinchero, está impulsando significativamente el valor del metro cuadrado. Los terrenos adquiridos hoy en preventa experimentan un retorno de inversión estimado de entre 15% y 25% anual por concepto de plusvalía pura.</p>

<h3>Calidad de Vida Sin Comparación</h3>
<p>El Valle Sagrado ofrece un microclima cálido, tierras fértiles y la tranquilidad de la vida de campo, pero con todas las comodidades modernas a corta distancia: excelentes restaurantes, clínicas, colegios y una comunidad vibrante de profesionales independientes que teletrabajan rodeados de montañas sagradas.</p>

<p>Ya sea que busques rentabilizar tu dinero a través de alquileres de corta estadía (Airbnb) o edificar una segunda vivienda familiar, Cusco se posiciona hoy como la inversión de tierra más segura y gratificante del país.</p>`,
    imagen: "/images/proyectos/proyecto-pisac-01.jpg"
  },
  {
    slug: "construccion-sostenible-casa-campo",
    titulo: "Construcción sostenible: Cómo edificar en armonía con los Andes",
    fecha: "10 Ago 2026",
    autor: "Arq. Sofía Mendoza",
    tiempoLectura: "6 min de lectura",
    resumen: "Aprende las mejores prácticas de arquitectura bioclimática y materiales locales para construir una casa de campo eficiente en la sierra.",
    contenido: `<p>Edificar en el Valle Sagrado implica una responsabilidad con el paisaje y la cultura. La arquitectura andina contemporánea busca un diálogo directo entre la modernidad y las técnicas tradicionales de construcción sostenible.</p>

<h3>1. Materiales de Origen Local</h3>
<p>El uso del adobe, la piedra local, la madera y la teja artesanal no solo responde a una estética rústica y elegante, sino a una gran eficiencia térmica. El adobe funciona como un excelente aislante térmico natural: absorbe el calor del sol durante el día y lo libera gradualmente durante las frías noches andinas.</p>

<h3>2. Arquitectura Bioclimática</h3>
<p>Diseñar con orientación hacia el norte geográfico maximiza la captación de radiación solar en los ambientes principales de la casa. El uso de ventanales con doble acristalamiento (termopaneles) y aleros calculados previene pérdidas de calor y mantiene la casa templada sin necesidad de calefacción artificial activa.</p>

<h3>3. Gestión Eficiente del Agua y Energía</h3>
<p>En zonas de campo, el tratamiento de aguas grises para riego de jardines y la instalación de paneles solares o termas solares aprovechan al máximo la alta radiación solar del valle, minimizando el impacto ambiental de la vivienda.</p>

<p>Construir de manera sostenible en los Andes no solo protege la ecología del Valle Sagrado, sino que crea un hogar sumamente confortable, eficiente y conectado con la mística del entorno.</p>`,
    imagen: "/images/proyectos/proyecto-chinchero-02.jpg"
  }
];
