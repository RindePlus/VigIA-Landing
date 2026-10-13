---
description: Crea una rama de trabajo <type>/<slug> desde main actualizado
argument-hint: [descripción opcional de la tarea]
---

1. **Working tree limpio** — `git status --short`. Si hay cambios, **parate** y preguntá: ¿se llevan a la rama nueva (`git switch -c` los conserva), se commitean antes con `/commit`, o se guardan con `git stash`? No pises trabajo.

2. **Nombre** — inferí `<type>/<slug>` de `$ARGUMENTS` o del último pedido:
   - `type` ∈ `feat`, `fix`, `style`, `refactor`, `perf`, `docs`, `chore`, `test`.
   - `slug` en kebab-case, 2-4 palabras: `feat/pricing-faq`, `fix/header-mobile-menu`, `style/hero-spacing`.
   - Confirmá el nombre con el usuario antes de crear nada.

3. **Crear**:
   ```bash
   git fetch origin
   git switch -c <type>/<slug> origin/main
   ```
   Si el usuario eligió llevarse los cambios actuales, usá `git switch -c <type>/<slug>` (sin base) para no perderlos.

4. **Reportá** la rama creada y su base. No pushees: la rama sube recién con `/pr`.
