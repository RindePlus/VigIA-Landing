# ADR 0002 — Rama de integración `develop` y releases hacia `main`

- **Estado:** Aceptado
- **Fecha:** 2026-10-13
- **Reemplaza:** el modelo de ramas de [ADR 0001](0001-workflow-and-engineering-standards.md) (`main` + ramas cortas, PRs contra `main`). El resto de ADR 0001 sigue vigente.

## Contexto

ADR 0001 adoptó un modelo simple: ramas cortas desde `main` y PRs directos contra `main`. Como GitHub Pages publica `docs/` de `main`, cada PR mergeado salía al aire en el momento.

Eso deja dos huecos para una landing de marketing:

- **No hay dónde ver varios cambios juntos antes de publicarlos.** Un rediseño de sección, un ajuste de copy y un video nuevo pueden estar bien por separado y mal en conjunto (ritmo de la página, tiempos de carga, coherencia del mensaje).
- **Publicar es un efecto lateral de mergear.** No se puede aprobar un cambio y decidir por separado cuándo sale, por ejemplo para coordinarlo con una campaña o con un lanzamiento del producto.

Además, el estándar corporativo de RindePlus usa `develop` como rama de integración en los productos que la necesitan, y el repositorio ya tiene creadas `main` y `develop`.

## Decisión

Adoptamos un modelo de dos ramas permanentes:

| Rama | Rol | Recibe cambios de |
|---|---|---|
| `main` | Producción: lo que GitHub Pages publica. | Solo PRs de release desde `develop`. |
| `develop` | Integración: features revisadas, pendientes de publicar. | Solo PRs desde feature branches. |
| `<type>/<slug>` | Trabajo, una rama por tarea, creada desde `develop`. | Commits del desarrollador. |

Reglas:

1. `main` y `develop` son ramas protegidas: sin commits ni pushes directos, sin force push. Los merges los hace una persona desde GitHub.
2. `/branch-new` crea las ramas desde `origin/develop`. `/pr` abre los PRs contra `develop`, nunca contra `main`.
3. Un nuevo comando `/release` verifica que `develop` valide y que su `docs/` corresponda al build, y abre el PR `develop → main` con notas de release agrupadas por tipo de conventional commit. No pushea, no mergea ni aprueba.
4. Los arreglos urgentes también pasan por `develop` (`fix/<slug>` → `/pr` → `/release`). No hay hotfix directo a `main`: el costo es un PR extra, a cambio de que `develop` nunca quede atrás de `main`.
5. Los conflictos en `docs/` no se resuelven a mano: se regenera con `pnpm build` y se commitea el resultado.

Refuerzos técnicos:

- El hook `git-guard.sh` trata `develop` como rama protegida, igual que `main`: bloquea commits en ella y pushes hacia ella.
- Las reglas de `.claude/settings.json` no cambian: `git commit`, `git push` y `gh pr create` piden confirmación; `gh pr merge` y `gh pr review` siguen denegados.

## Alternativas consideradas

- **Mantener `main` + ramas cortas (ADR 0001).** Más simple, pero no resuelve la revisión en conjunto ni separa aprobar de publicar.
- **Ambientes de preview por PR** (deploys efímeros por rama). Resuelve ver cada cambio, no ver cambios juntos, y agrega infraestructura que hoy no tenemos sobre GitHub Pages.
- **Gitflow completo** (ramas `release/*` y `hotfix/*`). Excesivo para un sitio estático sin versiones ni datos que migrar.

## Consecuencias

**Positivas**

- Publicar es una decisión explícita y separada (el PR de release), con notas de lo que sale.
- `develop` permite revisar la landing completa con todos los cambios integrados antes de publicarla.
- Mismo modelo que el resto de la organización.

**Negativas / costos**

- Un PR más por publicación y un paso más hasta producción, incluidos los arreglos urgentes.
- `docs/` se commitea en cada feature y puede generar conflictos al integrar ramas en paralelo; la regla 5 los vuelve mecánicos.
- Hasta que exista un preview de `develop`, la revisión en conjunto se hace localmente (`git switch develop && pnpm dev`).

**Pendientes operativos**

- Proteger `develop` y `main` en GitHub (PR obligatorio, sin force push, sin borrado).
- Fijar `main` como rama por defecto y mantener GitHub Pages sobre `main` con la carpeta `/docs`.
- Integrar en `develop` el trabajo inicial de `feat/astro-landing-scaffold` con un PR y luego borrar esa rama.
- Evaluar un preview de `develop` (por ejemplo, un workflow de GitHub Actions que publique el build en otro destino). Si se adopta, se registra en un ADR nuevo.
