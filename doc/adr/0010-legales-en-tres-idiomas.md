# ADR 0010 — Legales en los tres idiomas

- **Estado:** Propuesto
- **Fecha:** 2026-11-09
- **Reemplazado en parte por:** [ADR 0011](0011-solo-politica-de-privacidad-en-la-landing.md) (los términos salen de la landing)
- **Reemplaza en parte a:** [ADR 0004](0004-sitio-bilingue-es-en.md) (punto 8) y [ADR 0008](0008-version-en-portugues.md) (legales)

## Contexto

Los ADR 0004 y 0008 dejaron la política de privacidad y los términos sólo en español, y los enlazaban desde `/en/` y `/pt/` con la aclaración *(Spanish)* / *(em espanhol)*. Eran un borrador: traducir un texto legal que todavía iba a cambiar era riesgoso.

Los textos ya se revisaron (responsable del sitio, datos que se tratan, alojamiento en GitHub Pages, transferencias internacionales, plazos y leyendas de la Ley 25.326, derechos bajo la LGPD de Brasil, alcance de los resultados, ley aplicable y jurisdicción) y el sitio tiene clientes en Brasil y visitantes que no leen español. Un visitante tiene que poder entender qué se hace con sus datos en su idioma, y la LGPD pide que la información al titular sea clara.

## Decisión

- **Rutas:** `/en/privacidad/`, `/en/terminos/`, `/pt/privacidad/` y `/pt/terminos/`, con el mismo slug que en español, como `/en/pricing/` y `/en/educacion/`. Montan una vista compartida, `src/views/LegalPage.astro`.
- **Contenido:** `src/data/legal.js` (español, la fuente), `legal.en.js` y `legal.pt.js`, con las mismas claves; los importa sólo la vista (no `src/i18n/idiomas.js`, que también entra en el bundle del header).
- **Traducción:** fiel, sin sumar ni quitar compromisos. Los nombres de leyes y organismos van con su nombre oficial (Ley 25.326, Agencia de Acceso a la Información Pública) y una aclaración en el idioma si hace falta.
- **Prevalece el español:** cada texto lo dice. Si hay diferencias entre versiones, vale la española.
- **SEO:** las legales pasan a tener `hreflang` y alternativas en el sitemap, como la home. El selector de idioma lleva a la misma página legal en el otro idioma.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Seguir sólo en español | El visitante de Brasil o de habla inglesa no entiende qué se hace con sus datos; la LGPD pide información clara al titular. |
| Slugs traducidos (`/en/privacy/`, `/pt/termos/`) | El resto del sitio usa el mismo slug en todos los idiomas (`/en/pricing/`); traducirlos exige un mapa de rutas en `idiomas.js` sólo para dos páginas. |

## Consecuencias

- **Cada cambio legal va en tres archivos** y cambia la fecha de `LEGAL_UI` en los tres.
- **Si el sitio cambia lo que hace con los datos** (un formulario, analítica, cookies, otro hosting), hay que actualizar la política en los tres idiomas antes de publicarlo.
- Conviene que un abogado revise las versiones antes del release, sobre todo la de portugués frente a la LGPD.
