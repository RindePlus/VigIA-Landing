# Guía de trabajo para Claude — RindePlus/VigIA-Landing

Reglas para Claude (y para quien use Claude Code en este repo) sobre código, ramas, commits y PRs. La racional de este estándar está en [ADR 0001](doc/adr/0001-workflow-and-engineering-standards.md); el modelo de ramas con `develop` está en [ADR 0002](doc/adr/0002-develop-integration-branch.md).

## Qué es este repo

Landing page de **VigIA**, el sistema de monitoreo de cultivos de RindePlus. Es un **sitio estático de marketing**: no tiene backend, base de datos, API ni autenticación propia. El botón "Ingresar" solo enlaza a la app, que vive en otro repositorio.

El sitio está en **español** (raíz: `/`, `/pricing`…) **e inglés** (`/en/`, `/en/pricing`…), ver [ADR 0004](doc/adr/0004-sitio-bilingue-es-en.md). Las legales están sólo en español.

## Stack técnico

| Capa | Stack |
|---|---|
| **Framework** | Astro 7 (salida estática, una página HTML por archivo de `src/pages/`; i18n nativo, `es` + `en`) |
| **Interactividad** | React 19 como **islas** (`client:load` / `client:idle` / `client:visible`) |
| **Estilos** | CSS plano con design tokens `--gh-*` en `src/styles/global.css`. Sin Tailwind |
| **Lenguaje** | JavaScript/JSX + TypeScript para chequeo de tipos (`astro/tsconfigs/strict`) |
| **Calidad** | ESLint 9 (islas React) · `astro check` (tipos en `.astro`) |
| **Deploy** | GitHub Pages sirviendo `docs/` de la rama `main` (releases desde `develop`) |
| **Tooling** | pnpm · Node ≥ 22.12 |

Comandos:

```bash
pnpm dev         # http://localhost:4321
pnpm lint        # ESLint
pnpm typecheck   # astro check
pnpm build       # genera docs/
pnpm validate    # lint + typecheck + build — gate antes de /pr
```

**`docs/` es la salida del build** y Astro la vacía en cada `pnpm build`. Nunca guardes ahí documentación ni archivos a mano: la documentación del repo va en la raíz o en `doc/`. El build de `docs/` sí se commitea, porque es lo que publica GitHub Pages.

[`doc/landing/MODULO_VIGIA.md`](doc/landing/MODULO_VIGIA.md) describe la plataforma VigIA (incluido su backend) como **fuente de contenido** para la landing. No implica que este repo tenga backend: no agregues dependencias ni tooling de servidor.

**`media-src/` es material de trabajo y está en `.gitignore`:** imágenes de Nano Banana (`imagenes/`), clips de Higgsfield (`clips-crudos/`) y archivos de edición (`edicion/`). Los nombres siguen los números de [`doc/landing/PROMPTS_IMAGENES.md`](doc/landing/PROMPTS_IMAGENES.md) (`1.1-sol-alerta.png`, `2B-hojas.mp4`). Nunca la saques del `.gitignore`: solo los videos finales comprimidos pasan a `public/videos/`.

## REGLA ESTRICTA DE GIT

> **REGLA ESTRICTA DE GIT:** El agente NUNCA debe ejecutar `git commit` ni `git push` automáticamente tras realizar cambios en el código.
> - Tras cada instrucción o edición, los cambios deben permanecer únicamente en el *working tree* (archivos modificados localmente) para que el desarrollador pueda revisarlos y probarlos en el navegador.
> - El agente solo ejecuta `git commit` cuando el usuario lo pida explícitamente o invoque el comando `/commit`.
> - El agente solo hace `git push` al abrir un Pull Request formal mediante el comando `/pr`.
> - Queda prohibido hacer push directo a `main` o commitear en ramas protegidas.

Cómo se aplica en la práctica:

- En este repo las ramas protegidas son `main` **y** `develop`: la prohibición de push directo y de commits aplica a las dos.

- "Terminé la tarea" **no** es un pedido de commit. Al terminar, resumí qué cambió y qué conviene mirar en el navegador; no ofrezcas commitear en cada turno.
- Tampoco ejecutes `git add`, `git stash`, `git reset`, `git checkout -- <archivo>` ni `git restore` sobre cambios del desarrollador sin pedido explícito.
- Refuerzos técnicos (en `.claude/settings.json`):
  - `git push` y `gh pr create` piden confirmación siempre (reglas `ask`).
  - `git commit` no pide confirmación en consola: el pedido explícito del usuario ("haz commit", `/commit`) ya es la aprobación, y se ejecuta directo, sin mostrar el mensaje para un OK previo. Sin ese pedido, sigue sin commitearse nada.
  - `gh pr merge` y `gh pr review` están denegados: los merges a `develop` y a `main` los hace una persona.
  - El hook `git-guard.sh` bloquea commits en `main`/`develop`/`master`, pushes hacia esas ramas y mensajes fuera de conventional commits.
  - El hook `stop.sh` muestra al final de cada turno los archivos sin commitear, como recordatorio para el desarrollador.

Si un hook bloquea, leé el motivo y corregí. Nunca uses `--no-verify` ni lo esquives con otra forma del comando.

## Ramas — main + develop

| Rama | Rol | Recibe cambios de |
|---|---|---|
| `main` | Producción. GitHub Pages publica `docs/` de `main`: lo que se mergea acá sale al aire. | Solo PRs de release desde `develop` (`/release`). |
| `develop` | Integración. Acumula features ya revisadas para probarlas juntas antes de publicar. | Solo PRs desde feature branches (`/pr`). |
| `<type>/<slug>` | Trabajo. Ramas cortas, una por tarea, creadas desde `develop`. | Commits del desarrollador. |

- `main` y `develop` son **protegidas**: ni commits ni pushes directos. Los merges los hace una persona desde GitHub.
- Feature branches con formato `<type>/<slug>`:
  - `type` ∈ `feat`, `fix`, `style`, `refactor`, `perf`, `docs`, `chore`, `test`.
  - `slug` en kebab-case, 2-4 palabras: `feat/pricing-faq`, `fix/header-mobile-menu`, `style/hero-spacing`.
- Si estás en `main` o `develop` y el pedido implica editar código, **antes de editar** proponé una rama con `/branch-new`. Si la rama actual no corresponde al pedido, avisá antes de mezclar temas.
- Preguntas exploratorias (explicar, buscar, leer) no requieren rama.
- **Arreglos urgentes en producción**: también pasan por `develop` (rama `fix/<slug>` → `/pr` → `/release`). No hay hotfix directo a `main`.
- **Conflictos en `docs/`**: son archivos generados. No se resuelven a mano: se toma cualquiera de los dos lados, se corre `pnpm build` y se commitea el resultado.

## Commits — conventional commits en inglés

Formato: `type(scope): description`

- `type` ∈ `feat`, `fix`, `style`, `refactor`, `perf`, `docs`, `chore`, `test`, `build`, `ci`.
  - `style` = cambio solo visual o de formato, sin cambiar comportamiento.
- `scope` opcional, kebab-case, la zona tocada: `home`, `pricing`, `header`, `footer`, `whatsapp`, `seo`, `deps`.
- `description` en **inglés**, minúsculas, imperativo, sin punto final, ≤ 72 caracteres.

Ejemplos del historial: `feat(home): add clients carousel from landing` · `docs(estructura): add content optimization plan`.

Fuera de Claude Code, el hook opcional `.githooks/commit-msg` valida lo mismo: `pnpm hooks:install` (una vez por clone).

## Pull Requests

- Los de feature se abren con `/pr`, siempre contra `develop`, usando [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).
- Título en formato conventional commit. Body en español: summary, commits, screenshots, test plan y checklist de frontend.
- Antes de abrir: skill `self-review-checklist` y `pnpm validate` en verde.
- El release `develop → main` se abre con `/release`, que agrupa los commits en notas de release. Es el único PR contra `main`.
- Claude **nunca** mergea ni aprueba PRs.

## Slash-commands

| Comando | Qué hace |
|---|---|
| `/branch-new [descripción]` | Crea `<type>/<slug>` desde `origin/develop`. |
| `/commit` | Arma un commit conventional desde el diff, con confirmación. No pushea. |
| `/pr` | Valida, pushea la feature branch y abre el PR contra `develop`. Único punto donde Claude hace `git push`. |
| `/release` | Verifica el build de `develop` y abre el PR `develop → main` con notas de release. No pushea, no mergea. |

## Diseño — sistema visual

La guía de diseño es la skill **`landing-page-design`** (ver [ADR 0003](doc/adr/0003-landing-page-design-skill.md)): minimalista y moderno, con movimiento que acompaña sin recargar. Sus reglas se traducen a este repo así:

- **Escalas como tokens CSS**, no clases de Tailwind: `--text-*` / `--leading-*` (tipografía), `--space-*` (espaciado), `--ease-fluid` y `--dur-*` (movimiento), todos en `src/styles/global.css`. Ningún tamaño, espaciado ni curva suelta en los componentes.
- **Paleta de campo** (decisión 49 de `ESTRUCTURA_LANDING.md`, [ADR 0005](doc/adr/0005-rediseno-visual-agro-tecnico.md)): fondo piedra `--gh-canvas` (gris apenas cálido; el crema lo marca Impeccable como plantilla), tinta verde casi negra, verde bosque `--vg-forest` como único color de marca. El color tiene significado: verde campo `--vg-campo` = cultivo a salvo, ámbar `--vg-sev-alerta` = alerta o umbral, rojo `--vg-sev-critico` = pérdida, tierra `--vg-carbono` = carbono, verde agua `--vg-agua` = el tramo del hilo de "Lo que hace VigIA". Nada de azules, celestes ni lima. Los nombres `--gh-*` quedan por compatibilidad; los valores ya no son los de GitHub.
- **Tipografía**: IBM Plex Sans (Google Fonts) para títulos y texto, pesos hasta 700, sin itálicas, sin degradés en el texto. Chivo Mono (`--font-data`, clase `.vg-data`; cero liso, sin punto) **sólo** para datos y medidas: cifras e indicadores de Impacto y tablas, con el separador de miles en la tipografía normal (`.vg-sep`). `text-wrap: pretty` en títulos y texto (los renglones se llenan al máximo, sin palabra suelta al final); `balance` sólo en la frase destacada centrada.
- **Íconos**: Phosphor vía `react-icons/pi`. Monocromos en su color (verde `--vg-icon-green`, severidades, WhatsApp, etc.), **sin fondo ni círculo tintado**. Lo mismo para números de pasos y rótulos: nada de "badges" con fondo de color y texto flúor. Única excepción: el botón flotante de WhatsApp usa el logo oficial (`SiWhatsapp` de `react-icons/si`), porque es un logo de marca y la versión a línea de Phosphor no se reconoce bien sobre el verde.
- **Movimiento**: toda transición usa `var(--ease-fluid)`. Las apariciones al hacer scroll se activan con el atributo `data-reveal` (y `style="--reveal-delay: …"` para escalonar): sólo opacidad y una subida corta, sin desenfoque, y sólo en grupos de contenido (listas, tarjetas, medios); títulos, bajadas y el hero están de entrada. Sin animaciones infinitas (pulsos). El observer está en `BaseLayout.astro`. No pongas `data-reveal` en elementos que usa el hilo como ancla (`data-vg-node`, `data-vg-end`). Todo respeta `prefers-reduced-motion`.
- **Modo oscuro**: fondos neutros de la paleta de la skill (`#181818`, `#1f1f1f`, `#272727`, `#313131`, `#131209`).

Excepciones acordadas a la skill:

- **Header**: ancho de contenido, se oculta al bajar. Arriba de todo es transparente y sin línea (se funde con el hero); con scroll (`header--scrolled`) o con el menú de celular abierto toma fondo translúcido con desenfoque y una línea fina abajo. No es la píldora flotante que propone la skill.
- **Hilo del recorrido** (`.vg-journey`, `JourneyThread`): sobre el fondo plano de la página (sin degradé por etapas desde la decisión 49), con puntos sin número anclados a los títulos (`data-vg-node`).
- **Etiquetas de sección sobrias** (decisión 49, [ADR 0005](doc/adr/0005-rediseno-visual-agro-tecnico.md)): texto chico en gris, sin mayúsculas, sin espaciado extra ni colores por sección. Impeccable las prohíbe; acá se conservan a pedido, en esa versión discreta.
- **Estrategia y estructura (Parte A de la skill)**: en este repo la reemplaza `vigia-landing-structure`, que fija las secciones (incluidas frase destacada, cómo funciona y preguntas frecuentes), el CTA único y qué se puede afirmar del producto.

## Convenciones de implementación

- **Estático primero**: secciones en `.astro` (cero JS). Isla React solo si hay estado o eventos, con la directiva más perezosa que sirva: `client:visible` > `client:idle` > `client:load`.
- Efectos chicos sin estado: `<script>` inline en el `.astro`, no una isla.
- **Nombres**: componentes `PascalCase.astro` / `PascalCase.jsx`, hooks `useCamelCase.js`, datos `camelCase.js`.
- **Estilos**: CSS plano con tokens (`--gh-*` tema, `--vg-*` marca, escalas de arriba). Sin hex sueltos en componentes: si falta un token, se agrega. Claro y oscuro se resuelven con los tokens, no con overrides por componente.
- **Contenido** (copy, clientes, números) en `src/data/`, no en el markup.
- **Dos idiomas** (ADR 0004): el copy está en `src/data/vigia.js` (español, la fuente) y `src/data/vigia.en.js` (inglés), **con las mismas claves**. Todo texto nuevo o cambiado va en los dos, y el inglés sigue [`doc/landing/TRADUCCION_EN.md`](doc/landing/TRADUCCION_EN.md) (adaptación, no traducción literal; glosario agronómico). Los componentes toman el idioma de `Astro.currentLocale` con `contenido(idiomaDe(...))` de `src/i18n/idiomas.js`; las islas React reciben los textos por props. Las vistas compartidas viven en `src/views/`; `src/pages/` y `src/pages/en/` sólo las montan.
- **Medios**: imágenes por Astro assets con dimensiones; videos `muted playsinline` con poster.
- **Props de React en `.astro`**: `className`, no `class` (`pnpm typecheck` lo exige).

## Skills

| Skill | Cuándo |
|---|---|
| `vigia-landing-structure` | **Prioritaria para contenido.** Secciones, orden, copy, CTA, preguntas frecuentes y qué se puede afirmar del producto. Propia del repo: se edita acá. |
| `landing-page-design` | **Prioritaria para lo visual** (Parte B): tipografía, espaciado, color, íconos, movimiento, estados. Aplicala con las traducciones y excepciones de "Diseño — sistema visual". Su Parte A la reemplaza `vigia-landing-structure`. |
| `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-performance` | Animaciones: crearlas, revisarlas o encontrar dónde sumarlas. Siempre dentro de los tokens de movimiento del repo. |
| `apple-design`, `break-ui`, `prototype`, `pick-ui-library`, `animation-vocabulary` | A demanda: movimiento físico, pruebas con datos extremos, variantes para comparar, elección de librerías y nombres de efectos. |
| `impeccable` | Crítica y auditoría visual (`critique`, `audit`, `polish`…) y su detector de patrones de IA (`scripts/impeccable detect`). Sus reglas se aplican con las traducciones de "Diseño — sistema visual". Las críticas se guardan en `.impeccable/` (fuera de git). |
| `playwright-cli` | Ver cómo queda la página: capturas en celular (390 px) y escritorio, tema claro y oscuro. Se corre con `npx -y @playwright/cli@0.1.22` (sin dependencia en `package.json`) contra `pnpm dev`; las capturas van fuera del repo. Para capturas de página completa, recorrer la página antes (las imágenes cargan al hacer scroll). Instalada con `playwright-cli install --skills`, por eso no está en `skills-lock.json`. |
| `self-review-checklist` | Al cerrar una tarea, antes de `/commit` o `/pr`. |

Las skills de terceros se instalan con `npx skills add` y quedan registradas en `skills-lock.json`. No las edites: las adaptaciones al repo van en este archivo. Las skills propias (`vigia-landing-structure`, `self-review-checklist`) no están en el lock y se editan directamente.

No hay subagentes: el tamaño del repo no lo justifica. La validación la cubren `pnpm validate`, la skill de self-review y la revisión humana del PR.

## Decisiones de arquitectura (ADRs)

Viven en [`doc/adr/`](doc/adr/) (no en `docs/`, que es la salida del build). Un archivo por decisión, `NNNN-titulo.md`, en español. Si tomás una decisión estructural (framework, deploy, política de ramas, dominio), proponé un ADR nuevo. Un ADR aceptado no se edita: se reemplaza con uno nuevo que lo marque como superado.

## Convenciones de lenguaje

- **Español**: `CLAUDE.md`, ADRs, skills, comentarios que explican por qué (también en `vigia.en.js`), copy del sitio, body de PRs.
- **Copy en inglés**: sólo en `src/data/vigia.en.js`, con las reglas de `doc/landing/TRADUCCION_EN.md`.
- **Inglés**: commits, títulos de PR, nombres de ramas, identificadores de código.

## Secretos

El sitio es público: todo lo que entra en `src/` o `public/` se publica. Nunca commitear `.env*`, tokens ni credenciales. Si detectás un secreto en el historial, pará y avisá al usuario.

## Acciones que requieren confirmación explícita

`git push --force` (incluido `--force-with-lease`), `git reset --hard`, borrar ramas locales o remotas, reescribir historia publicada, cerrar PRs, y cualquier cambio en la configuración de GitHub Pages o del dominio.
