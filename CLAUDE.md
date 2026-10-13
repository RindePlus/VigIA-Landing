# Guía de trabajo para Claude — RindePlus/VigIA-Landing

Reglas para Claude (y para quien use Claude Code en este repo) sobre código, ramas, commits y PRs. La racional de este estándar está en [ADR 0001](doc/adr/0001-workflow-and-engineering-standards.md); el modelo de ramas con `develop` está en [ADR 0002](doc/adr/0002-develop-integration-branch.md).

## Qué es este repo

Landing page de **VigIA**, el sistema de monitoreo de cultivos de RindePlus. Es un **sitio estático de marketing**: no tiene backend, base de datos, API ni autenticación propia. El botón "Ingresar" solo enlaza a la app, que vive en otro repositorio.

## Stack técnico

| Capa | Stack |
|---|---|
| **Framework** | Astro 7 (salida estática, una página HTML por archivo de `src/pages/`) |
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

`MODULO_VIGIA.md` describe la plataforma VigIA (incluido su backend) como **fuente de contenido** para la landing. No implica que este repo tenga backend: no agregues dependencias ni tooling de servidor.

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
  - `git commit`, `git push` y `gh pr create` piden confirmación siempre (reglas `ask`).
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

## Skills

| Skill | Cuándo |
|---|---|
| `ui-design` | **Prioritaria.** Cualquier trabajo visual: secciones, componentes, paleta, tipografía, animaciones, responsive, accesibilidad. Incluye las convenciones de implementación Astro + islas + tokens CSS de este repo. |
| `self-review-checklist` | Al cerrar una tarea, antes de `/commit` o `/pr`. |

No hay subagentes: el tamaño del repo no lo justifica. La validación la cubren `pnpm validate`, la skill de self-review y la revisión humana del PR.

## Decisiones de arquitectura (ADRs)

Viven en [`doc/adr/`](doc/adr/) (no en `docs/`, que es la salida del build). Un archivo por decisión, `NNNN-titulo.md`, en español. Si tomás una decisión estructural (framework, deploy, política de ramas, dominio), proponé un ADR nuevo. Un ADR aceptado no se edita: se reemplaza con uno nuevo que lo marque como superado.

## Convenciones de lenguaje

- **Español**: `CLAUDE.md`, ADRs, skills, comentarios que explican por qué, copy del sitio, body de PRs.
- **Inglés**: commits, títulos de PR, nombres de ramas, identificadores de código.

## Secretos

El sitio es público: todo lo que entra en `src/` o `public/` se publica. Nunca commitear `.env*`, tokens ni credenciales. Si detectás un secreto en el historial, pará y avisá al usuario.

## Acciones que requieren confirmación explícita

`git push --force` (incluido `--force-with-lease`), `git reset --hard`, borrar ramas locales o remotas, reescribir historia publicada, cerrar PRs, y cualquier cambio en la configuración de GitHub Pages o del dominio.
