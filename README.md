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
pnpm check     # chequeo de tipos de los .astro (alias: pnpm typecheck)
pnpm lint      # eslint de las islas React
pnpm validate  # lint + typecheck + build, antes de abrir un PR
```

Requiere Node `>=22.12`.

## Flujo de trabajo

- Ramas `<type>/<slug>` desde `develop`, commits en conventional commits y PR contra `develop` con [la plantilla](.github/PULL_REQUEST_TEMPLATE.md).
- Publicación: PR de release `develop → main` (`/release`). Al mergear a `main`, GitHub Pages publica `docs/`.
- Validación local de commits (una vez por clone): `pnpm hooks:install`.
- Reglas para Claude Code: [CLAUDE.md](CLAUDE.md). Racional: [ADR 0001](doc/adr/0001-workflow-and-engineering-standards.md) y [ADR 0002](doc/adr/0002-develop-integration-branch.md).

## Deploy

Igual que Landing: GitHub Pages publicando la carpeta `docs/` de `main`. A `main` solo llegan releases desde `develop`.

Dominio: **https://vigiabioestres.com/** (también `www.`).

### Puntos a tener en cuenta

1. **No borrar el `CNAME`.**
   - GitHub lo creó en la raíz de `main` (commit `fdf3724`) con el contenido `vigiabioestres.com`. `develop` todavía no lo tiene. Mergear `develop → main` no lo borra, pero conviene traerlo con `git fetch` y no sacarlo de `main`.
   - Si se borra, o si un deploy lo pisa, el sitio deja de responder en el dominio.
   - GitHub Pages lee el `CNAME` de la carpeta que publica. Como Astro vacía `docs/` en cada `pnpm build`, ahí no se puede crear a mano: va en `public/CNAME`, y el build lo copia a `docs/CNAME`. Lo mismo vale si algún día se publica con GitHub Actions.

2. **Cómo publicar.**
   - Para que se vea el build de Astro, Settings → Pages → Source tiene que ser **Deploy from a branch → `main` / `/docs`**. Si apunta a la raíz de `main` (`/`), ahí no hay `index.html` y el sitio no carga.
   - Alternativa: Source → **GitHub Actions**, con un workflow que corra `pnpm build` y publique `docs/`. Es un cambio de deploy y requiere un ADR nuevo.

3. **Rutas en la raíz del dominio.**
   - El sitio se sirve en `https://vigiabioestres.com/`, no en `rindeplus.github.io/VigIA-Landing/`. Por eso `base` en `astro.config.mjs` queda en `/` y no lleva el nombre del repo. `site` tiene que ser `https://vigiabioestres.com`.
   - Los assets se importan desde `src/` o se referencian desde `public/` con rutas que empiezan en `/` (por ejemplo, `/marca/vigia.png`). Nunca con el nombre del repo adelante.

`public/CNAME` y `site` en `astro.config.mjs` ya apuntan a `vigiabioestres.com`. Si cambia el dominio, se actualizan los dos juntos.

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

Estructura y contenido planificado de la home: [doc/landing/ESTRUCTURA_LANDING.md](doc/landing/ESTRUCTURA_LANDING.md).

Prompts para generar los videos de los módulos y el fondo: [doc/landing/PROMPTS_VIDEOS.md](doc/landing/PROMPTS_VIDEOS.md).

Prompts de las imágenes base de esos videos (Nano Banana): [doc/landing/PROMPTS_IMAGENES.md](doc/landing/PROMPTS_IMAGENES.md).

Documentación funcional y técnica del módulo VigIA: [doc/landing/MODULO_VIGIA.md](doc/landing/MODULO_VIGIA.md). No va en `docs/` porque esa carpeta es la salida del build y se regenera.
