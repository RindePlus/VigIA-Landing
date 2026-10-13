## Summary
<!-- 1-3 bullets: qué cambia y por qué. -->
-

## Commits
<!-- git log --oneline origin/main..HEAD -->

## Screenshots / video
<!-- Antes / después en mobile (≤ 390px) y desktop. Obligatorio si cambia algo visible. -->

| Antes | Después |
|---|---|
|  |  |

## Test plan
- [ ] Probado en `pnpm dev` (mobile y desktop)
- [ ] Probado en tema claro y oscuro
- [ ]

## Checklist
**Calidad**
- [ ] `pnpm validate` pasa (lint + typecheck + build)
- [ ] El diff contiene solo cambios de esta tarea (sin `console.log`, archivos temporales ni reformateos ajenos)
- [ ] `docs/` regenerado con `pnpm build` en el último commit (es lo que publica GitHub Pages al mergear)

**UI / UX y accesibilidad**
- [ ] Contraste WCAG AA en textos sobre fondos (incluidos videos/imágenes)
- [ ] Navegable con teclado, con foco visible; tap targets ≥ 44px en mobile
- [ ] Imágenes con `alt` (o `alt=""` si son decorativas); videos sin audio automático
- [ ] Respeta `prefers-reduced-motion` si agrega animaciones
- [ ] Sin layout shift visible al cargar (imágenes/videos con dimensiones)

**Contenido y SEO**
- [ ] Textos revisados (ortografía, tono, datos y números verificados)
- [ ] `<title>` y meta description actualizados si cambia una página

**Git**
- [ ] Rama `feat/<slug>` / `fix/<slug>` / … y commits en conventional commits
- [ ] Base del PR: `main` (sin pushes directos a `main`)
