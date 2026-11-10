# ADR 0011 — Sólo la política de privacidad del sitio en la landing

- **Estado:** Propuesto
- **Fecha:** 2026-11-09
- **Reemplaza en parte a:** [ADR 0010](0010-legales-en-tres-idiomas.md) (los términos y condiciones)

## Contexto

El [ADR 0010](0010-legales-en-tres-idiomas.md) dejó en la landing la política de privacidad y unos términos y condiciones, en los tres idiomas. Los términos que importan son los de la plataforma VigIA: regulan el servicio y los datos que se cargan, y cada usuario los acepta al ingresar. Tener otros términos en la landing duplicaba ese documento con un alcance confuso.

La landing de Rinde Plus (rindeplus.com, de la misma sociedad) ya resolvió lo mismo: una política de privacidad del sitio y de los canales de contacto, y los documentos de la plataforma, sólo nombrados.

## Decisión

- **La landing tiene sólo su política de privacidad** (`/privacidad/`, `/en/privacidad/`, `/pt/privacidad/`), que cubre el sitio y los canales de contacto, con la misma estructura y criterio que la de Rinde Plus, adaptada a lo que hace este sitio.
- **Se quita `/terminos`** en los tres idiomas, con su texto, su enlace del footer y su entrada en el sitemap. Las URLs viejas caen en el 404, que lleva a la home del idioma.
- **La política nombra, sin enlace,** los Términos y condiciones y la Política de privacidad de la plataforma, disponibles en ella.
- **El aviso sobre los resultados no se pierde:** pasa a una nota fija bajo los indicadores de Impacto (de dónde salen las cifras, el carbono como estimación, cada lote responde distinto), junto a las cifras que aclara. Que VigIA acompaña la decisión del productor y no la reemplaza va en los términos de la plataforma.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Mantener los términos del sitio | Duplican los de la plataforma; el visitante no contrata nada en la landing. |
| Enlazar los documentos de la plataforma | La plataforma de VigIA todavía no tiene dominio propio; un enlace a rutas ajenas se rompe cuando cambian. |
| Dejar el aviso de los resultados sólo en los términos de la plataforma | La publicidad la ve quien nunca entra a la plataforma; el aviso tiene que estar junto a las cifras. |

## Consecuencias

- **Si el sitio cambia lo que hace con los datos** (un formulario, analítica, cookies, Cloudflare u otro hosting), se actualiza la política en los tres idiomas antes de publicarlo.
- **Coherencia con Rinde Plus:** un cambio de criterio en una de las dos políticas se revisa en la otra.
