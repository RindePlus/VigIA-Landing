---
description: Abre el PR de release develop → main con notas agrupadas por tipo. Nunca mergea ni aprueba.
---

El usuario quiere publicar lo que está en `develop`. Mergear a `main` publica el sitio en GitHub Pages, así que este comando **solo prepara y abre el PR**: el merge lo hace una persona.

## 1. Chequeos previos

- `git fetch origin`.
- Working tree limpio. Este comando no commitea nada.
- `gh auth status` OK.
- Pendiente de release: `git log --oneline origin/main..origin/develop`. Si está vacío, avisá que no hay nada para publicar y terminá.
- Si ya existe un PR abierto `develop → main` (`gh pr list --base main --head develop`), devolvé su URL en vez de abrir otro.

## 2. Verificar el build de develop

```bash
git switch --detach origin/develop
pnpm install --frozen-lockfile
pnpm validate
git status --short docs/
git switch -   # volver a la rama anterior
```

- Si `pnpm validate` falla, mostrá el error y **pará**.
- Si `docs/` cambia tras el build, el sitio publicado no coincidiría con el código: avisá y proponé una rama `chore/rebuild-docs` con `/branch-new` + `/commit` + `/pr` antes del release. Descartá esos cambios locales (`git restore docs/`) solo tras confirmarlo con el usuario.

## 3. Notas de release

Agrupá `git log --format='%s' origin/main..origin/develop` por tipo de conventional commit:

```markdown
## Release

### Features
- …
### Fixes
- …
### Visual / style
- …
### Otros (refactor, perf, docs, chore)
- …

## Checklist antes de mergear
- [ ] Revisado en el preview de `develop` (mobile y desktop, claro y oscuro)
- [ ] `docs/` corresponde al build de `develop`
- [ ] Copy y cifras finales aprobados
```

## 4. Crear el PR

```bash
gh pr create --base main --head develop --title "chore(release): publish <resumen corto>" --body "$(cat <<'EOF'
<notas>
EOF
)"
```

## 5. Reportar

Devolvé la URL. Recordá que el merge a `main` lo hace una persona desde GitHub y que al mergear se publica el sitio.

## Qué NO hacés

- Mergear, aprobar o cerrar el PR.
- Pushear a `develop` o `main`.
- Abrir PRs contra `main` desde una rama que no sea `develop`.
