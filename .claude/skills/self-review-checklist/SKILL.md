---
name: self-review-checklist
description: Auto-revisión antes de dar una tarea por cerrada, de /commit o de /pr en la landing. Cubre lint, typecheck, build de docs/, diff limpio, secretos, responsive, temas, accesibilidad y criterios de aceptación.
---

# Skill: Self-review checklist

Pasada rápida al terminar una tarea. Si algún ítem queda en rojo, **no se abre PR**: se arregla primero. Esta skill no commitea ni pushea; solo verifica e informa.

## 1. Validación automática

```bash
pnpm validate   # pnpm lint && pnpm typecheck && pnpm build
```

- `lint`: ESLint sobre las islas React (`.js`/`.jsx`). Cero errores.
- `typecheck`: `astro check` sobre `.astro` y tipos de props. Cero errores.
- `build`: genera `docs/`. Si cambia archivos de `docs/` que no esperabas, el build commiteado estaba desactualizado: avisá.

## 2. Diff limpio

```bash
git status --short
git diff --stat
```

Cada línea del diff tiene que explicarse por la tarea. Quitá:
- `console.log`, `debugger`, código comentado.
- Temporales (`.tmp`, `.bak`, `.DS_Store`, capturas sueltas).
- Reformateos de archivos que no eran parte del cambio.
- Videos o imágenes pesados en `public/` sin optimizar (apuntá a < 2-3 MB por video de fondo).

## 3. Secretos

```bash
git diff | grep -iE "password|secret|token|api[_-]?key|bearer"
```

La landing es un sitio estático público: **todo** lo que entra en `src/` o `public/` termina servido en GitHub Pages. Nada de claves, tokens ni URLs internas. Los `.env*` están en `.gitignore`.

## 4. Verificación visual

Si el cambio es visible, **miralo renderizado vos antes de cerrar** (skill `playwright-cli`, ver `CLAUDE.md`):

```bash
npx -y @playwright/cli@0.1.22 open
# resize 390 844 y 1440 900 · set-color-scheme light/dark · goto http://localhost:4321/
# Para página completa: recorrer la página antes (las imágenes cargan al hacer scroll).
npx -y @playwright/cli@0.1.22 close
```

- Si levantaste un `astro dev` propio, cortalo con `pnpm astro dev stop`, no sólo matando el proceso de pnpm: si no, queda ocupando el puerto. Si el usuario ya tiene el suyo, usá ese.
- Las capturas van a la carpeta temporal, nunca al repo.

Detector de patrones de IA y contraste (skill `impeccable`), sobre el build:

```bash
sh .claude/skills/impeccable/scripts/impeccable detect --json docs/index.html
```

Hoy quedan 2 hallazgos conocidos y falsos (`cramped-padding` en la lista de preguntas y en `.vg-section`). Cualquier otro se arregla o se justifica. Las reglas visuales están en `DESIGN.md`.

Después, indicá al usuario qué mirar en `pnpm dev` (http://localhost:4321):
- Mobile (≤ 390px) y desktop.
- Tema claro y oscuro.
- Con `prefers-reduced-motion: reduce` si el cambio anima algo.
- Navegación con teclado: orden de foco y foco visible.

## 5. Accesibilidad y contenido

- Contraste WCAG AA, incluido texto sobre video o imagen.
- `alt` en imágenes (`alt=""` si son decorativas), `aria-hidden` en íconos decorativos.
- Jerarquía de headings sin saltos (un solo `h1` por página).
- Ortografía, tono y cifras del copy verificados; los datos viven en `src/data/`.
- Si cambió el copy: checklist de contenido de `vigia-landing-structure` (cada afirmación con respaldo en `doc/landing/MODULO_VIGIA.md` §10, sin IA, satélite ni estrés biótico; herbicidas sólo como carry-over).
- `<title>` y meta description correctos si cambió una página.

## 6. Criterios de aceptación

Releé el pedido original. Para cada punto: ¿está implementado tal cual se pidió? Lo que quede fuera, anotalo para el body del PR.

## Salida esperada

Un resumen corto: ✅ / ❌ por sección, los errores concretos (archivo y línea) y la lista de verificaciones visuales que quedan a cargo del usuario. Los cambios siguen en el working tree.
