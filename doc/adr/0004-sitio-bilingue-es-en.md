# ADR 0004 — Sitio en español e inglés

- **Estado:** Propuesto
- **Fecha:** 2026-10-16

## Contexto

El header ya tenía un selector de idioma (ES / EN), pero sólo cambiaba la sigla del botón: no había versión en inglés. Queremos que la landing se pueda leer en inglés para un público internacional (socios, inversores y productores fuera de Argentina) sin perder calidad de contenido ni de SEO.

Opciones evaluadas:

| Opción | Cómo funciona | Por qué sí / por qué no |
|---|---|---|
| Widget de traducción automática (Google Translate, Weglot, etc.) | Un script traduce la página en el navegador. | ❌ Traducción literal: no conoce la jerga agronómica ni el tono de marca. Suma JavaScript externo, Weglot es pago por mes y los buscadores no indexan bien el resultado. |
| API de traducción en tiempo real (DeepL, Google Cloud Translation) | El sitio pide la traducción al cargar. | ❌ El sitio es estático y sin backend: la clave de la API quedaría pública. Además, la calidad depende de cada llamada y no se puede revisar antes de publicar. |
| Diccionario en el cliente (cambiar textos con JS sin recargar) | Los dos idiomas viajan en la página y un script los intercambia. | ❌ Google ve una sola versión, la página pesa el doble y hay un parpadeo de textos al cargar. |
| **Una página estática por idioma** (rutas `/` y `/en/`) | Astro genera cada página dos veces, con el contenido de cada idioma. | ✅ Es lo que hacen los sitios de producto (Stripe, Vercel, Notion). Cero JavaScript extra, cada idioma se indexa por separado y la traducción se escribe y se revisa como cualquier otro contenido. |

## Decisión

1. **Rutas:** español en la raíz (`/`, `/pricing`, `/educacion`) e inglés bajo `/en/` (`/en/`, `/en/pricing`, `/en/educacion`). Se usa el soporte nativo de Astro (`i18n` en `astro.config.mjs`, `prefixDefaultLocale: false`).
2. **Una vista por página, compartida:** el markup vive en `src/views/` (`HomePage`, `PricingPage`, `EducacionPage`); `src/pages/x.astro` y `src/pages/en/x.astro` sólo la montan. El idioma sale de la ruta (`Astro.currentLocale`), así no hay dos copias del markup que puedan desparejarse.
3. **Contenido por idioma con las mismas claves:** `src/data/vigia.js` (español, la fuente) y `src/data/vigia.en.js` (inglés). Los números de Impacto son compartidos (`src/data/impactoDatos.js`); sólo cambia su formato. `src/i18n/idiomas.js` elige el contenido y arma las rutas.
4. **La traducción es una adaptación ("transcreation"), no literal:** la escribe el equipo (con ayuda de Claude) siguiendo el glosario y las reglas de [`doc/landing/TRADUCCION_EN.md`](../landing/TRADUCCION_EN.md), y conviene que la revise alguien con inglés nativo y conocimiento agronómico antes del release. No se usa ninguna API ni servicio de traducción en tiempo de ejecución.
5. **Cambio de idioma:** el selector del header enlaza a la misma página en el otro idioma. La transición es la nativa del navegador entre documentos (`@view-transition`): la página se funde con la nueva en lugar de mostrar la recarga en blanco, y el header queda quieto. Antes de salir se guarda la sección visible; la página nueva vuelve a ese punto. Donde el navegador no soporta la transición (Firefox, hoy), la página carga como siempre. Con movimiento reducido, sin fundido.
6. **No se redirige por idioma del navegador:** cada URL muestra siempre su idioma (lo que esperan los buscadores y quien comparte un enlace).
7. **SEO:** `<html lang>`, `hreflang` (es, en, x-default → español) y `og:locale` por página.
8. **Fuera de alcance por ahora:** las páginas legales (privacidad y términos) quedan sólo en español hasta que las revise asesoría legal; desde la versión en inglés se enlazan con la aclaración "(Spanish)". El 404 es único y cambia sus textos si la ruta empieza con `/en/`.

## Consecuencias

- Cada cambio de copy se hace en los dos archivos de contenido. Las claves tienen que coincidir (`pnpm typecheck` falla si una vista usa una clave que falta en uno de ellos).
- El equipo atiende en español: en inglés, el cierre y el botón flotante lo aclaran ("Our team replies in Spanish"). Si eso cambia, se quita la nota.
- Las vistas pasan de `src/pages/` a `src/views/`; `src/pages/` queda como mapa de rutas.
- Sumar un tercer idioma es agregar su archivo de contenido, el código en `IDIOMAS` y las páginas en `src/pages/<código>/`.
