---
description: Arma un commit con mensaje conventional a partir del diff. Solo corre cuando el usuario lo invoca.
---

El usuario pidió commitear. Este comando es **la única vía** por la que Claude commitea en este repo (además de un pedido explícito en el chat). Seguí el flujo completo:

1. **Rama actual** — `git rev-parse --abbrev-ref HEAD`.
   - Si es `main` o `master` → **parate**. Proponé crear una rama con `/branch-new` y terminá acá.

2. **Working tree** — `git status --short` y `git diff --cached --stat`.
   - Sin cambios → avisá y terminá.
   - Sin nada staged pero con modificaciones → mostrá la lista y **preguntá qué stagear**. No hagas `git add -A` sin confirmar; dejá afuera `.env*`, logs y temporales.
   - Si el cambio toca `src/` o `public/`, recordá que `docs/` debe regenerarse con `pnpm build` para que GitHub Pages publique lo mismo que está en el código. Preguntá si lo corrés antes de commitear.

3. **Armá el mensaje** desde `git diff --cached`:
   - `type` ∈ `feat`, `fix`, `style` (solo visual/formato), `refactor`, `perf`, `docs`, `chore`, `test`, `build`, `ci`.
   - `scope` opcional en kebab-case, inferido de la zona tocada: `home`, `pricing`, `header`, `footer`, `whatsapp`, `seo`, `deps`…
   - `description` en **inglés**, minúsculas, imperativo, sin punto final, ≤ 72 caracteres.
   - Si el diff mezcla temas, proponé dividirlo en varios commits.

4. **Confirmá con el usuario**: mostrá el mensaje en un bloque de código y esperá el OK. Iterá si pide cambios.

5. **Commiteá**:
   ```bash
   git commit -m "$(cat <<'EOF'
   <mensaje final>
   EOF
   )"
   ```
   - Nunca `--no-verify`, `--no-gpg-sign` ni `--amend` sobre commits pusheados, salvo pedido explícito.
   - Si el hook `git-guard` bloquea, leé el motivo, corregí y reintentá.

6. **Reportá** el sha corto y el subject. **No pushees**: el push ocurre solo en `/pr`.
