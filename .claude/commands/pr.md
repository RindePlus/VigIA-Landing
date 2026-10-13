---
description: Valida la rama, la pushea y abre un Pull Request contra main. Único momento en que Claude hace git push.
---

El usuario quiere abrir un PR. Seguí este flujo estricto:

## 1. Chequeos previos

- Rama actual: si es `main` o `master` → **parate**. No se abren PRs desde ramas protegidas.
- Nombre de rama con formato `<type>/<slug>`. Si no lo cumple, avisá antes de seguir.
- Working tree limpio (`git status --short` vacío). Si no, preguntá si commitear con `/commit` o dejarlo afuera.
- `gh auth status` OK. Si falla, pedile al usuario que corra `! gh auth login`.

## 2. Validación (self-review)

Aplicá la skill `self-review-checklist`. Como mínimo:

```bash
pnpm validate   # lint + typecheck + build
git status --short
```

- Si `pnpm build` cambia archivos de `docs/`, el build commiteado está desactualizado: avisá y proponé `/commit` del build antes de seguir.
- Si algo falla, mostrá el error y **pará**. El PR no se abre con la validación en rojo.

## 3. Push

```bash
git push -u origin <rama>
```

Si el remoto divergió, pará y preguntá. Nunca `--force` sin confirmación explícita. Nunca push a `main`.

## 4. Título y body

- **Título**: conventional commit que resuma el PR (`type(scope): description`, en inglés).
- **Body**: usá `.github/PULL_REQUEST_TEMPLATE.md`. Completá Summary, Commits (`git log --oneline origin/main..HEAD`) y Test plan desde el diff; marcá los ítems del checklist que verificaste y dejá sin marcar los que requieren revisión humana (screenshots, contraste sobre video, etc.).

## 5. Crear el PR

```bash
gh pr create --base main --head <rama> --title "<título>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

## 6. Reportar

Devolvé la URL del PR y la lista de ítems del checklist que quedaron para revisión humana.

## Qué NO hacés

- Mergear ni aprobar el PR: el merge a `main` publica el sitio y lo hace una persona desde GitHub.
- Pushear a `main` ni a ramas ajenas.
- Abrir el PR con la validación fallando.
