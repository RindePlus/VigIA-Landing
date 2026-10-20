---
name: vigia-landing-structure
description: Estructura, copy y afirmaciones de la landing de VigIA BioEstrés. Usala cada vez que agregues, quites, reordenes o redactes una sección, un título, un CTA, una pregunta frecuente o un texto de src/data/vigia.js, y antes de aprobar cualquier copy. En este repo reemplaza la Parte A (estrategia y estructura) de landing-page-design; la Parte B (sistema visual) sigue vigente.
---

# Estructura y contenido de la landing de VigIA BioEstrés

Esta skill decide **qué dice la página y en qué orden**. Cómo se ve lo deciden `landing-page-design` (Parte B) y las traducciones de `CLAUDE.md` ("Diseño — sistema visual").

## Fuentes de verdad

Leelas antes de tocar contenido, en este orden:

1. [`doc/landing/MODULO_VIGIA.md`](../../../doc/landing/MODULO_VIGIA.md), **sección 10**: qué se puede afirmar del producto y qué no. Si un texto no tiene respaldo ahí, no va.
2. [`doc/landing/ESTRUCTURA_LANDING.md`](../../../doc/landing/ESTRUCTURA_LANDING.md): secciones, orden, copy aprobado, medios y decisiones.
3. `src/data/vigia.js`: el copy implementado. El markup no lleva texto propio.
4. `src/data/vigia.en.js` y [`doc/landing/TRADUCCION_EN.md`](../../../doc/landing/TRADUCCION_EN.md): la versión en inglés (mismas claves) y su glosario y reglas.

Si el pedido contradice estas fuentes, avisá antes de escribir y proponé actualizar el documento primero.

## La oferta

**Un público, una acción.**

- **Público:** productores (extensivos e intensivos, en secano o bajo riego) y asesores agronómicos.
- **Problema:** el estrés hídrico y térmico se ve a campo cuando el rinde ya está comprometido.
- **Promesa:** VigIA BioEstrés te avisa con días de margen, por ambiente, para aplicar el bioinsumo o regar a tiempo.
- **Acción única:** **Contactanos para empezar a usar VigIA**. Abre WhatsApp para agendar una demo de 20 minutos con los lotes del cliente. Mismo texto en el hero y en Preguntas (el cierre).
- **Tipo de página:** relato largo con hero (tipo B de `landing-page-design`): hay que educar sobre el estrés invisible antes de pedir la acción.

## Estructura fija

```
1. Hero · 2. El problema · 3. Lo que hace VigIA · 4. La solución    ← recorrido del mismo lote (.vg-journey)
5. Frase destacada · 6. Impacto · 7. Sobre nosotros + 8. Clientes (juntos)
9. Preguntas frecuentes + cierre (CTA al pie) · Footer
```

| Sección | Trabajo que hace | No hace |
|---|---|---|
| 1. Hero | Resultado + para quién + CTA + gráfico animado. | Listar funciones. |
| 2. El problema | Por qué el estrés se detecta tarde. | Hablar de VigIA. |
| 3. Lo que hace VigIA | Cuatro tarjetas con foto: picos de estrés, desde antes de la siembra, el agua y los bioinsumos. Cuentan también las cuatro alertas y su acción. Debajo, cultivos de servicio y carry-over de herbicidas. | Explicar canales o pasos (eso es Cómo funciona). |
| 4. La solución | Canales (plataforma y WhatsApp) y cómo lo hace (tres pasos). | Detallar fórmulas. |
| 5. Frase destacada | Una idea en dos líneas, grande. | Llevar botón ni título. |
| 6. Impacto | Datos medidos en campo: contexto, grano y carbono con desglose por cultivo, y calculadora. | Repetir lo que hace el producto. |
| 7. Sobre nosotros | Las personas detrás del producto, con foto y logo de su empresa. | Inventar cargos o trayectorias. |
| 9. Preguntas | Objeciones reales: sensores, carga, cultivos, canales, secano. | Respuestas de más de 40 palabras. |
| 8. Clientes | Carrusel de logos al pie de Sobre nosotros, sin título a la vista. | Sumar socios (van en Sobre nosotros). |
| Cierre (en 9, bajo el título) | Una línea chica que sigue al título ("¿Te quedó alguna duda? Escribinos.") + el mismo CTA. | Un CTA distinto; volver a ser una sección propia. |

Cambiar el orden, sumar o quitar una sección es una **decisión de estructura**: se acuerda con el usuario y se registra en `ESTRUCTURA_LANDING.md` (tabla "Decisiones") antes de tocar código.

## Reglas de contenido

**Nunca:**
- Inteligencia artificial: "IA", "modelos", "algoritmos", "machine learning". "VigIA" es sólo marca.
- Imágenes satelitales, índices espectrales (NDVI, NDRE, NDWI), drones.
- Estrés biótico: plagas, enfermedades, fungicidas, insecticidas. Tampoco estrés nutricional.
- Mapas, "diagnóstico", "prescripción", "manejo variable".
- Herbicidas. Única excepción: el carry-over de herbicidas debajo de las tarjetas de Lo que hace VigIA, como módulo de VigIA y con enlace, sin nombrar a RindePlus (decisión 46).
- Que VigIA BioEstrés es parte, producto o "una solución" de Rinde Plus: la plataforma tiene otros socios. Rinde Plus se nombra como lugar para buscar otros servicios (decisión 40).
- Productos o marcas de insumos. Las acciones son genéricas: bioinsumo o riego.
- Números que no salgan del motor. Sí valen: 4 días, 14 días, 210 días, USD/mm. Excepción: los resultados medidos en campo de la sección Impacto, siempre con fuente (decisión 19).

**Siempre:**
- **VigIA BioEstrés** en títulos, SEO y cierre; "VigIA" solo cuando ya se nombró.
- Alertas en dos canales: la plataforma y WhatsApp, presentado como disponible.
- "Por ambiente" cuando hables de precisión dentro del lote.
- Voseo rioplatense, frases cortas, beneficio primero y después la prueba.
- Sin guiones dentro de las frases. Sin exclamaciones. Mayúscula sólo al inicio de los títulos.

**Ante una afirmación nueva:** buscala en MODULO_VIGIA §10.2 (capacidades) y §10.4 (copy revisado). ✅ va tal cual, ⚠️ va con la redacción indicada, ❌ no va. Si no está, preguntá.

## Presupuesto de texto

| Elemento | Máximo |
|---|---|
| Título del hero | 10 palabras |
| Bajada del hero | 35 palabras |
| Título de sección | 8 palabras |
| Bajada de sección | 30 palabras |
| Tarjeta, paso o ítem | 20 palabras |
| Ítems por lista | 3 o 4 |
| Respuesta de FAQ | 40 palabras |

Si un texto no entra, se recorta la idea, no la letra.

## Medios

- **Interfaz en código** (gráficos, alertas, celular): SVG y CSS dentro de `MediaStory.astro`.
- **Campo en video:** sólo en El problema (`problema.mp4`) y Cómo funciona (`resolucion.mp4`). El hero no lleva video.
- Un medio por sección, sin texto dentro del video, sin drones ni HUD.
- Nuevos clips: el proceso está en `doc/landing/PROMPTS_VIDEOS.md` y `PROMPTS_IMAGENES.md`; el material crudo va a `media-src/` (fuera del repo).

## Cómo trabajar un cambio de contenido

1. Ubicá la sección en `ESTRUCTURA_LANDING.md` y el respaldo en MODULO_VIGIA §10.
2. Si cambia el copy aprobado, actualizá primero el documento y después `src/data/vigia.js`.
3. Hacé el mismo cambio en `src/data/vigia.en.js`, adaptado (no literal) con el glosario de `TRADUCCION_EN.md`. Si aparece un término o una frase nueva que no va literal, sumala al documento con el porqué.
4. El markup (`src/views/HomePage.astro`) sólo lee de `src/data/`.
5. SEO: si cambia el hero o las preguntas, revisá `<title>`, la meta description y el JSON-LD `FAQPage` (en los dos idiomas).
6. Cerrá con `self-review-checklist`.

## Checklist de contenido

- [ ] Cada afirmación tiene respaldo en MODULO_VIGIA §10.
- [ ] Sin IA, satélite, biótico, mapas, Herbicidas ni marcas de insumos.
- [ ] Un solo CTA principal, con el mismo texto en el hero y en el cierre (en Preguntas).
- [ ] Presupuesto de texto respetado.
- [ ] "VigIA BioEstrés" en títulos, SEO y cierre.
- [ ] Copy en `src/data/`, no en el markup.
- [ ] El cambio está también en `vigia.en.js`, adaptado según `TRADUCCION_EN.md` y con las mismas afirmaciones.
- [ ] `ESTRUCTURA_LANDING.md` refleja lo implementado.
