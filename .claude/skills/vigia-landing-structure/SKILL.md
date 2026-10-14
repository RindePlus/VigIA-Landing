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

Si el pedido contradice estas fuentes, avisá antes de escribir y proponé actualizar el documento primero.

## La oferta

**Un público, una acción.**

- **Público:** productores (extensivos e intensivos, en secano o bajo riego) y asesores agronómicos.
- **Problema:** el estrés hídrico y térmico se ve a campo cuando el rinde ya está comprometido.
- **Promesa:** VigIA BioEstrés te avisa con días de margen, por ambiente, para aplicar el bioinsumo o regar a tiempo.
- **Acción única:** **Quiero ver mis lotes en VigIA**. Abre WhatsApp para agendar una demo de 20 minutos con los lotes del cliente. Mismo texto en el hero y en el cierre.
- **Tipo de página:** relato largo con hero (tipo B de `landing-page-design`): hay que educar sobre el estrés invisible antes de pedir la acción.

## Estructura fija

```
1. Hero · 2. El problema · 3. Cómo funciona    ← recorrido del mismo lote (.vg-journey)
4. Frase destacada · 5. Beneficios · 6. Para quién es
7. Clientes · 8. Preguntas frecuentes · 9. Cierre · Footer
```

| Sección | Trabajo que hace | No hace |
|---|---|---|
| 1. Hero | Resultado + para quién + CTA + gráfico animado. | Listar funciones. |
| 2. El problema | Por qué el estrés se detecta tarde. Tipos de estrés. | Hablar de VigIA. |
| 3. Cómo funciona | Tres pasos, alertas de ejemplo, canales (plataforma y WhatsApp). | Detallar fórmulas. |
| 4. Frase destacada | Una idea en dos líneas, grande. | Llevar botón ni título. |
| 5. Beneficios | Tres resultados, cada uno con su prueba. | Repetir los pasos. |
| 6. Para quién es | Productores y asesores: qué gana cada uno. | Sumar perfiles sin respaldo. |
| 8. Preguntas | Objeciones reales: sensores, carga, cultivos, canales, secano, productos, precio. | Respuestas de más de 40 palabras. |
| 9. Cierre | Urgencia + demo de 20 minutos + el mismo CTA. | Un CTA distinto. |

Cambiar el orden, sumar o quitar una sección es una **decisión de estructura**: se acuerda con el usuario y se registra en `ESTRUCTURA_LANDING.md` (tabla "Decisiones") antes de tocar código.

## Reglas de contenido

**Nunca:**
- Inteligencia artificial: "IA", "modelos", "algoritmos", "machine learning". "VigIA" es sólo marca.
- Imágenes satelitales, índices espectrales (NDVI, NDRE, NDWI), drones.
- Estrés biótico: plagas, enfermedades, fungicidas, insecticidas. Tampoco estrés nutricional.
- Mapas, "diagnóstico", "prescripción", "manejo variable".
- Herbicidas.
- Productos o marcas de insumos. Las acciones son genéricas: bioinsumo o riego.
- Números que no salgan del motor. Sí valen: 4 días, 14 días, 210 días, USD/mm.

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
3. El markup (`index.astro`) sólo lee de `src/data/`.
4. SEO: si cambia el hero o las preguntas, revisá `<title>`, la meta description y el JSON-LD `FAQPage`.
5. Cerrá con `self-review-checklist`.

## Checklist de contenido

- [ ] Cada afirmación tiene respaldo en MODULO_VIGIA §10.
- [ ] Sin IA, satélite, biótico, mapas, Herbicidas ni marcas de insumos.
- [ ] Un solo CTA principal, con el mismo texto en el hero y en el cierre.
- [ ] Presupuesto de texto respetado.
- [ ] "VigIA BioEstrés" en títulos, SEO y cierre.
- [ ] Copy en `src/data/`, no en el markup.
- [ ] `ESTRUCTURA_LANDING.md` refleja lo implementado.
