# ADR 0008 — Versión en portugués de Brasil

- **Estado:** Propuesto
- **Fecha:** 2026-10-20
- **Amplía:** [ADR 0004](0004-sitio-bilingue-es-en.md)

## Contexto

El [ADR 0004](0004-sitio-bilingue-es-en.md) dejó el sitio en español (raíz) e inglés (`/en/`). Hay clientes en Brasil, y para ellos el español se entiende a medias y el inglés no es el idioma del campo.

## Decisión

Se suma el portugués de Brasil bajo `/pt/`, con el mismo esquema que el inglés:

- **Rutas:** `/pt/`, `/pt/pricing` y `/pt/educacion` montan las mismas vistas de `src/views/`; el idioma sale de la ruta (`Astro.currentLocale`, locales `es`, `en` y `pt` en `astro.config.mjs`).
- **Contenido:** `src/data/vigia.pt.js`, con las mismas claves que `vigia.js` y `vigia.en.js`.
- **Traducción:** adaptación, no traducción literal, con el glosario agronómico de Brasil en [`TRADUCCION_PT.md`](../landing/TRADUCCION_PT.md) (talhão, zona de manejo, água disponível, estádio, safra, plantas de cobertura, dessecação, sequeiro).
- **`src/i18n/idiomas.js`** deja de suponer dos idiomas: las rutas alternativas, `hreflang` y `og:locale:alternate` salen de la lista de idiomas, y el selector del header muestra los tres.
- **Legales:** quedan en español, enlazadas como *(em espanhol)*, igual que desde el inglés.
- **Atención:** el equipo responde en español; el cierre y el botón flotante lo aclaran en portugués.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Traducir con el mismo glosario que el inglés | El agro de Brasil tiene su propio vocabulario; los calcos del español (*lote*, *ambiente*, *rinde*, *campanha*) suenan a traducción. |
| Portugués neutro (Brasil y Portugal) | El público es Brasil; el portugués europeo cambia vocabulario y ortografía. |
| `/pt-br/` como ruta | Hay una sola variante de portugués en el sitio; `/pt/` es más corta y `lang="pt-BR"` ya dice la variante. |

## Consecuencias

- **Cada texto nuevo va en tres archivos** (`vigia.js`, `vigia.en.js`, `vigia.pt.js`), con la misma clave.
- **Los textos en portugués son más largos:** cualquier cambio de diseño se revisa también en `/pt/` (títulos, tarjetas, etiquetas de los gráficos).
- Conviene que alguien de Brasil revise el copy antes del release (lista en `TRADUCCION_PT.md`, sección 9).
