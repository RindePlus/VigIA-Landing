# VigIA Landing

Landing page de **VigIA**, el sistema de monitoreo de cultivos que se separa de Rinde Plus.
Sigue la estructura y el diseño de `Landing` (Rinde Plus), pero con **Astro + React** en vez de Vite + React SPA.

## Por qué Astro

- Cada página es HTML estático prerenderizado (mejor SEO y carga inicial).
- React se usa solo en las **islas** que necesitan interactividad (header, widget de WhatsApp, animaciones de scroll).
- El ruteo es por archivo en `src/pages/`: no hace falta el router manual ni el truco de `404.html` + `sessionStorage` de Landing.

## Comandos

```bash
pnpm install
pnpm dev       # servidor local en http://localhost:4321
pnpm build     # genera el sitio estático en docs/
pnpm preview   # sirve el build
pnpm check     # chequeo de tipos de los .astro
pnpm lint      # eslint de las islas React
```

Requiere Node `>=22.12`.

## Deploy

Igual que Landing: GitHub Pages publicando la carpeta `docs/` de `main`.
Pendiente: definir dominio, agregar `public/CNAME` y `site` en `astro.config.mjs`.

## Estructura

```
src/
├── assets/            # logos de VigIA (claro/oscuro)
├── components/
│   ├── Header.jsx     # isla React (client:load): menú, toggle de tema, "Ingresar"
│   ├── Footer.astro   # estático, sin JS
│   ├── WhatsAppWidget.jsx  # isla React (client:idle); openWhatsApp() la abre desde otras islas
├── data/
│   ├── social.js      # contacto, WhatsApp, URL de la app
│   └── modules.js     # módulos de VigIA que muestra la home
├── hooks/
│   ├── useTheme.js    # tema claro/oscuro system-first
├── layouts/
│   └── BaseLayout.astro    # <head>, script anti-flash de tema, header, footer, WhatsApp
├── pages/             # una ruta por archivo
│   ├── index.astro
│   ├── pricing.astro
│   └── 404.astro
└── styles/
    ├── global.css     # tokens --gh-* (copiados de Landing) + reset
    └── sections.css   # estilos base de secciones
```

## Equivalencias con Landing

| Landing (Vite SPA)                        | VigIA-Landing (Astro)                      |
|-------------------------------------------|--------------------------------------------|
| `index.html` + `src/main.jsx`             | `src/layouts/BaseLayout.astro`             |
| `App.jsx` (router manual, `navigate()`)   | `src/pages/*.astro` + `<a href>`           |
| `src/index.css`                           | `src/styles/global.css`                    |
| `useRpTheme` (atributo puesto al montar)  | `useTheme` + script inline (sin flash)     |
| Widget de WhatsApp dentro de `App.jsx`    | `WhatsAppWidget.jsx` (isla propia)         |
| `vite.config.js` (plugin 404.html)        | `astro.config.mjs` (`outDir: ./docs`)      |

Estructura y contenido planificado de la home: [ESTRUCTURA_LANDING.md](ESTRUCTURA_LANDING.md).

Prompts para generar los videos de los módulos y el fondo: [PROMPTS_VIDEOS.md](PROMPTS_VIDEOS.md).

Documentación funcional y técnica del módulo VigIA: [MODULO_VIGIA.md](MODULO_VIGIA.md). No va en `docs/` porque esa carpeta es la salida del build y se regenera.
