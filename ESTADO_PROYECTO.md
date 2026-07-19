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
