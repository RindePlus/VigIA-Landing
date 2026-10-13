# ADR 0001 — Adopción del estándar de ingeniería y flujo de desarrollo frontend

- **Estado:** Aceptado
- **Fecha:** 2026-10-13
- **Ámbito:** repositorio `RindePlus/VigIA-Landing`

## Contexto

VigIA-Landing es la landing de marketing de VigIA: un sitio estático construido con Astro 7 y React 19 como islas, con estilos en CSS plano basados en design tokens, publicado en GitHub Pages desde la carpeta `docs/` de `main`. No tiene backend, base de datos, API ni secretos de servidor. Su ciclo de cambio es rápido y visual: la mayoría de las tareas son ajustes de copy, layout, animación o contenido que se validan mirando el sitio en el navegador.

RindePlus tiene un estándar de ingeniería corporativo que cubre convenciones de ramas y commits, revisión por Pull Request, calidad de UI y uso de asistentes de IA (Claude Code). Ese estándar está pensado para productos full-stack, con piezas específicas de backend: migraciones de esquema, backups de base de datos previos al deploy, análisis de breaking changes en APIs y un flujo de release con rama de integración.

Hacía falta definir qué parte del estándar aplica a un producto frontend de marketing, qué parte no, y cómo debe comportarse el asistente de IA para no interferir con el ritmo de trabajo del desarrollador.

## Decisión

Adoptamos deliberadamente el estándar corporativo en las prácticas que aportan valor a un sitio frontend, y prescindimos de las que solo tienen sentido con backend o datos.

### Lo que se adopta

1. **Conventional Commits en inglés** (`type(scope): description`) como formato único de commits y títulos de PR. Validado en Claude Code por un hook `PreToolUse` y, fuera de él, por un hook `commit-msg` opt-in (`pnpm hooks:install`).
2. **Ramas cortas `<type>/<slug>`** (`feat/`, `fix/`, `style/`, `refactor/`, `perf/`, `docs/`, `chore/`, `test/`) creadas desde `main`.
3. **Revisión obligatoria por Pull Request** contra `main`, con una plantilla orientada a frontend: screenshots antes/después, prueba en mobile y desktop, temas claro y oscuro, accesibilidad (contraste WCAG AA, foco, `alt`, `prefers-reduced-motion`), SEO básico y build actualizado.
4. **Gate de calidad local** con `pnpm validate` (ESLint + `astro check` + build) antes de abrir un PR.
5. **Calidad UI/UX como estándar explícito** a través de la skill `ui-design`, adaptada a las convenciones del repo (secciones estáticas en `.astro`, islas React solo donde hay interactividad, tokens CSS en lugar de valores sueltos, movimiento que respeta las preferencias del usuario).
6. **Arquitectura de IA mínima:** un agente principal con dos skills a demanda (`ui-design` y `self-review-checklist`), sin subagentes.
7. **Registro de decisiones en ADRs** dentro de `doc/adr/`. No se usa `docs/` porque es la salida del build y Astro la vacía en cada `pnpm build`.

### Política de Git para el asistente de IA

El asistente **no commitea ni pushea por iniciativa propia**. Los cambios quedan en el working tree hasta que el desarrollador los revisa en el navegador y decide:

- `git commit` solo ante un pedido explícito o el comando `/commit`.
- `git push` solo al abrir un PR con `/pr`.
- Prohibido el push directo a `main` y el commit en ramas protegidas.

Esta política se apoya en tres capas, de la más blanda a la más dura:

1. **Instrucción** en `CLAUDE.md`.
2. **Confirmación obligatoria**: reglas `ask` en `.claude/settings.json` para `git commit`, `git push` y `gh pr create`; reglas `deny` para `gh pr merge` y `gh pr review`.
3. **Bloqueo técnico**: el hook `git-guard.sh` rechaza commits en `main`/`master`, pushes hacia esas ramas y mensajes fuera de formato.

Un hook `Stop` informa al final de cada turno qué archivos quedaron sin commitear, sin bloquear ni actuar.

### Lo que no se adopta, y por qué

| Pieza del estándar full-stack | Motivo para prescindir |
|---|---|
| Rama de integración `develop` y flujo de release separado | Un sitio estático no necesita una etapa de integración: cada PR es pequeño, se valida con un build y su efecto se ve completo en el navegador. Un modelo `main` + ramas cortas reduce la ceremonia sin perder control, porque el merge a `main` sigue siendo una decisión humana. |
| Skills de migraciones de base de datos y de endpoints de API | No hay base de datos ni API. |
| Backups de base de datos previos al deploy y planes de rollback de datos | No hay datos persistentes. El rollback de un sitio estático es revertir el commit. |
| Subagente de release (riesgo de migraciones, breaking changes de API) | Su análisis no tiene objeto en este repo. Las release notes salen del historial de conventional commits. |
| Subagente de QA dedicado | El costo de coordinar un subagente supera el beneficio en un repo de este tamaño. Lo reemplazan `pnpm validate`, la skill `self-review-checklist` y la revisión humana del PR. |
| Pipelines de build y deploy de contenedores | El deploy es GitHub Pages sobre archivos estáticos. |
| Hooks de contexto por turno y detección de sesiones paralelas | Agregan ruido en cada interacción sin un riesgo equivalente que mitigar. |
| Dependencias de tooling en Python | Los hooks se apoyan solo en bash, git y Node, que el proyecto ya requiere. |

## Consecuencias

**Positivas**

- Historial legible y homogéneo con el resto de la organización.
- Ningún cambio llega a producción sin un PR revisado por una persona.
- El desarrollador controla cuándo se commitea: puede iterar varias veces sobre un cambio visual antes de fijarlo.
- La configuración del asistente es pequeña, verificable y sin dependencias ajenas al stack.

**Negativas / costos**

- Commitear y pushear requiere un paso explícito (`/commit`, `/pr`) y una confirmación. Es fricción buscada.
- El build en `docs/` se commitea junto al código. Requiere regenerarlo antes de cada PR; la plantilla y la skill de self-review lo recuerdan.
- El hook `commit-msg` es opt-in; quien commitee fuera de Claude Code sin activarlo depende de la revisión del PR.

**Pendientes operativos**

- Crear la rama `main` en el remoto, fijarla como rama por defecto y activar su protección en GitHub (PR obligatorio, sin force push).
- Definir el dominio final (`public/CNAME` y `site` en `astro.config.mjs`).
- Evaluar mover el build a un workflow de GitHub Actions que publique en Pages, para dejar de commitear `docs/`. Si se adopta, se registra en un ADR nuevo.
