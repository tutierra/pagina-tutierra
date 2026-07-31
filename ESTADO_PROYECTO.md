# Estado del proyecto — Página Tutierra

Proyecto: `/pagina-tutierra` (Next.js 16 + TypeScript + Tailwind v4).
NO confundir con carpeta vieja `../tutierra/` — separada, no tocar.

## Marca
Tutierra Grupo Inmobiliario, Cusco. Slogan: "Creamos y unimos familias".
Logo: `public/logo.svg`. Fuentes reales en `public/fonts/` (NHaasGrotesk + BreeSerif), cargadas en `app/fonts.ts`.
Colores en `app/globals.css` (`@theme inline`): money-green `#0e5336`, tech-green `#39a784`, brand-gray `#e4ece6`, brand-ink `#141414`.

## Stack especial
`@shadergradient/react` + `@react-three/fiber` + `three@0.150.1` (PIN OBLIGATORIO — versión nueva de three rompe el shader con error `uv2_pars_vertex`). Background 3D en `components/3d/gradient-canvas.tsx`, global via `app/layout.tsx`.

## Skills en uso
high-end-visual-design, brandkit, minimalist-ui, emil-design-eng, ux-copy.

## Sitemap (completo, construido)
- `/` home
- `/nosotros`
- `/proyectos` (listado)
- `/proyectos/[slug]` — 6 proyectos ficticios: chinchero, pisac, urubamba, maras, ollantaytambo, calca
- `/refiere-y-gana`
- `/contactanos` (formulario → WhatsApp, sin backend real)

Datos centralizados en `lib/site-data.ts` (CONTACT, SOCIAL, PROYECTOS) — todo placeholder.

## Layout / comportamiento
Cada `<section>` es `min-h-screen`. Scroll-jacking en `components/ScrollJacker.tsx`: cualquier gesto de scroll (wheel/touch) salta sección completa según dirección, cooldown 900ms, ignora inputs/textarea/select. Sin CSS scroll-snap (se quitó, conflictuaba con el JS).
Todo el layout en %/rem/clamp() — nada en px fijos, para escalar sin deformar.

## Imágenes
Stock de Unsplash en `public/images/{proyectos,nosotros,testimonios,referidos,global}/` con nombres descriptivos — reemplazar por fotos finales manteniendo el mismo nombre de archivo.

## Bugs ya resueltos (no repetir)
1. Variables de color Tailwind circulares en `@theme inline` (mismo nombre en `:root` y en `@theme`) → botones quedaban transparentes. Fix: definir valores directo dentro de `@theme inline`, sin redirección circular.
2. `three` última versión incompatible con `@shadergradient/react` → pinear `three@^0.150.0`.

## Pendiente / por confirmar con el cliente
- Datos de contacto y redes sociales son placeholder (`lib/site-data.ts`) — reemplazar por reales
- Fotos finales de los 6 proyectos (reemplazar en `public/images/proyectos/`)
- Backend real para el formulario de contacto (hoy solo abre WhatsApp con mensaje prellenado)
- Deploy a dominio `grupotutierra.com`

## Dev server
`.claude/launch.json` en la raíz del working directory tiene config `pagina-tutierra-dev` (puerto 3000, corre `npm --prefix pagina-tutierra run dev`). Usar `preview_start` con ese nombre, NO crear uno nuevo.

---

## Estado actual (sesión de rediseño — rama `diseno-mejoras-skills`)

**Git:** respawn seguro en rama `main` (commit "Checkpoint: full site build..."). Todo el trabajo nuevo va en rama `diseno-mejoras-skills`. Si algo falla: `git checkout main`. IP LAN actual del celu: cambia según red (usar `ipconfig getifaddr en1`).

**Dependencia agregada:** `framer-motion` (instalado con `--legacy-peer-deps` por el pin de three@0.150).

**Componentes nuevos creados:**
- `Reveal.tsx` — fade-up al entrar en viewport. IntersectionObserver PROPIO + failsafe 1.2s (NO usar framer whileInView: fallaba con ScrollJacker en móvil y dejaba secciones invisibles).
- `RoundCarousel.tsx` — carrusel circular 3D (galería Hero). Con prefijos `-webkit-` (transform-style/perspective/backface) para Safari móvil. Modo `dwell` (pausa por carta). `overflow:visible` (no recortar carta frontal). Hover: imagen zoom 5% (`.rc-card:hover .rc-img` en globals.css, solo punteros finos).
- `ProyectosCoverflow.tsx` + `ProyectoModal.tsx` — coverflow sección 3 con modal de detalle (chips con íconos, monograma radial por proyecto, anim entrada/salida, bloquea scroll de fondo con position:fixed).
- `TimelineExpand.tsx` — timeline "paneles expansivos" (grayscale→color+crece al hover via flex-grow; móvil = cards verticales).
- `CountUp.tsx` — contador animado de cifras al entrar en viewport.
- `NewsletterForm.tsx` + `app/newsletter/page.tsx` — página newsletter (sin backend).
- `AreaScaledCornerImage.tsx` — imagen esquina escalada por % de área (ya no se usa en Hero, quedó de iteraciones).

**Bugs resueltos importantes (no repetir):**
3. Shader WebGL (three.js ~745KB) bloqueaba el hilo principal en móvil → congelaba TODA animación. Fix en `gradient-canvas.tsx`: el Canvas WebGL solo monta en desktop con recursos (`useHeavyGfxAllowed`: pointer fino, ≥1024px, cores/mem, no reduced-motion). Móvil/flojos → gradiente CSS de marca. Fallback bg `#05100b` (no negro).
4. `min-h-screen` → `min-h-dvh` en todo el sitio (barra navegador móvil).
5. ScrollJacker: permitía scroll nativo dentro de sección con contenido sin ver (antes cortaba contenido).

**Sistema tipográfico:** `html { font-size: clamp(16px, 1.1111vw, 1000px) }` en globals.css — todo escala proporcional arriba de 1440px. Curvas easing custom en `@theme`: `--ease-out-strong`, etc.

**Nav (`Nav.tsx`):** pill glass flotante con efecto liquid-glass. Logo = link a home. Links: Nosotros, Proyectos, Newsletter, Contáctanos + "Refiere y Gana" como pill verde al final. Sin "Home" ni "Agenda una visita". Menú móvil con stagger.

**Página `/nosotros` (reconstruida):** 1) Fundador (foto + cita), 2) Timeline 14 hitos (TimelineExpand), 3) Equipo 11 personas agrupado por área (Gerencia 2 / Comercial 3 / Marketing 3 / Administrativo 3), avatares foto grayscale→color al hover (Avatar acepta `foto`), 4) Contacto: cifras (CountUp) izq + ContactForm der. Footer global.

**Microinteracciones aplicadas** (skill emil): active:scale en todos los CTA, hover en avatares/cifras/foto fundador, links con flecha/subrayado.

**Pendiente:**
- Nombres y fotos reales del equipo (11) — hoy placeholder (misma foto `cliente-01.jpg` × 11).
- Foto real del fundador (hoy `cliente-01.jpg`, no coincide con nombre "Carlos Mendoza").
- Optimización propuesta NO aplicada aún: cargar three.js solo en home (sacar `GradientCanvas` del layout global) → ~745KB menos en el resto de páginas en desktop.
- Newsletter/ContactForm sin backend real.
- Merge `diseno-mejoras-skills` → `main` cuando esté aprobado.
