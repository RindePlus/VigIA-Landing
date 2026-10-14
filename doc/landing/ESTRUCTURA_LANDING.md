# Estructura de la landing de VigIA BioEstrés

Plan de contenido de la home. Define qué secciones tiene la página, en qué orden, qué dice cada una y con qué medios. Lo que se afirma sale de [`MODULO_VIGIA.md`](MODULO_VIGIA.md) (sección 10). Lo visual lo resuelven `landing-page-design` (Parte B) y las traducciones de `CLAUDE.md`. La estructura y el copy los cuida la skill `vigia-landing-structure`.

**Estado:** versión 2, **implementada** en `src/pages/index.astro`, con los textos en `src/data/vigia.js`. Quedan las [preguntas abiertas](#preguntas-abiertas) y los opcionales de video.

**Qué cambia respecto de la versión 1:**

- La marca pasa a ser **VigIA BioEstrés**.
- El hero se apoya en el resultado ("antes de que se convierta en merma") y no en el nombre del submódulo.
- "La mejora real" pasa a **Cómo funciona**, con tres pasos.
- Se suman **Frase destacada**, **Beneficios** y **Preguntas frecuentes**, que pide `landing-page-design`.
- **Para quién es** pasa a dos perfiles con más detalle.
- El cierre usa el titular y la oferta del copy nuevo: una demo de 20 minutos con los lotes del cliente.

## Reglas de contenido

- **No mencionar inteligencia artificial.** Ni "IA", ni "modelos", ni "algoritmos inteligentes". "VigIA" es sólo nombre de marca. El respaldo es agronómico: clima, DPV, balance hídrico, fenología y suelo.
- **Sólo lo que el producto hace.** Sin imágenes satelitales ni índices espectrales, sin estrés biótico (plagas, enfermedades), sin mapas, sin diagnóstico. La tabla de [MODULO_VIGIA §10.4](MODULO_VIGIA.md#104-el-copy-propuesto-punto-por-punto) dice qué se puede decir y cómo.
- **Marca:** **VigIA BioEstrés** en títulos, SEO y cierre; "VigIA" solo, dentro del texto corrido, cuando ya se nombró.
- **Herbicidas no aparece.**
- **Acciones genéricas:** "bioinsumo" o "riego", sin productos ni marcas.
- **Alertas en dos canales:** la plataforma y WhatsApp, presentado como disponible.
- **Sin números inventados.** Sólo los que salen del motor: 4 días, 14 días, 210 días. Nada de "reducí 30 % la merma".
- **Tono:** voseo rioplatense, frases cortas, beneficio primero. Sin guiones dentro de las frases (regla de `landing-page-design`).

## Presupuesto de texto

| Elemento | Máximo |
|---|---|
| Título del hero | 10 palabras |
| Bajada del hero | 35 palabras |
| Título de sección | 8 palabras |
| Bajada de sección | 30 palabras |
| Texto de tarjeta, paso o ítem | 20 palabras |
| Ítems por lista | 3 o 4 |
| Respuesta de FAQ | 40 palabras |

## Mapa de la página

```
Header ─ Cómo funciona · Beneficios · Para quién · Preguntas · Contacto · [Ingresar]
│
│  ┌─ recorrido (.vg-journey: fondo por etapas + hilo) ─┐
├─ 1. Hero                 #inicio          · punto 1 · gráfico de balance (código)
├─ 2. El problema          #problema        · punto 2 · gráfico sin aviso → video problema
├─ 3. Cómo funciona        #como-funciona   · punto 3 · celular WhatsApp → video resolución
│  └────────────────────────────────────────────────────┘
├─ 4. Frase destacada                         (palabras que se encienden al hacer scroll)
├─ 5. Beneficios           #beneficios
├─ 6. Para quién es        #para-quien
├─ 7. Clientes             #clientes        (carrusel)
├─ 8. Preguntas frecuentes #preguntas
├─ 9. Cierre (CTA)
└─ Footer                  #contacto
```

**Un solo CTA principal en toda la página:** **Quiero ver mis lotes en VigIA**. Abre WhatsApp con el mensaje "Hola, quiero ver mis lotes en VigIA BioEstrés". Va en el hero y en el cierre con el mismo texto. El botón secundario del hero ("Cómo funciona") es un enlace interno, no compite.

---

## 1. Hero (`#inicio`)

| Elemento | Contenido |
|---|---|
| Etiqueta | ESTRÉS HÍDRICO Y TÉRMICO |
| Título (h1) | **Detectá el estrés antes de que se convierta en merma** |
| Bajada | VigIA BioEstrés cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos. |
| Puntos | • Alertas a 4 días y aviso del período crítico a 14<br>• Por ambiente, en secano o bajo riego<br>• En la plataforma y en tu WhatsApp |
| Botones | **Quiero ver mis lotes en VigIA** (WhatsApp) · **Cómo funciona** (baja a `#como-funciona`) |
| Prueba | Lo usan productores y asesores de Aapresid, CREA, Agroconsultor y SpeedAgro. |
| Visual | `BalanceChart.astro` animado: entran los datos, se dibuja el balance y aparece "Estrés hídrico moderado en 4 días". Sin video. |

## 2. El problema (`#problema`)

Se mantiene de la versión 1.

| Elemento | Contenido |
|---|---|
| Etiqueta | EL PROBLEMA |
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Tres razones** (01 a 03):

1. **El síntoma llega tarde.** Cuando la hoja se enrolla, el rinde ya está comprometido.
2. **El bioinsumo necesita llegar antes.** Aplicado cuando el estrés ya pasó, protege poco.
3. **El pronóstico regional no conoce tu lote.** No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.

**Qué estrés mitiga VigIA** (franja de tres etiquetas):

| Estrés | Línea |
|---|---|
| Hídrico | Falta agua útil en el suelo para la etapa del cultivo. |
| Térmico (DPV) | El aire seca a la planta más rápido de lo que repone. |
| Combinado | Las dos cosas el mismo día: el escenario más dañino. |

**Visual:** `ProblemChart.astro` (el agua cruza el umbral sin aviso, "Rinde perdido") y después el video `problema` (el lote se marchita y la mano toca una hoja seca).

## 3. Cómo funciona (`#como-funciona`)

Reemplaza a "La mejora real". Es el capítulo "con VigIA" del recorrido.

| Elemento | Contenido |
|---|---|
| Etiqueta | CÓMO FUNCIONA |
| Título | **De la alerta a la decisión, en un solo flujo** |
| Bajada | VigIA sigue cada ambiente día a día y te avisa cuando todavía hay margen para aplicar el bioinsumo o regar. |

**Tres pasos** (numerados, en fila en escritorio):

| Paso | Título | Texto |
|---|---|---|
| 1 | Tus lotes, en VigIA | Se cargan tus lotes, ambientes, suelo, siembra y cultivo. El clima del lote se conecta solo, con pronóstico a 14 días. |
| 2 | VigIA calcula cada día | Balance hídrico por ambiente y DPV contra los umbrales de tu cultivo en su etapa. |
| 3 | Te avisa y actuás | Alerta con severidad, ambiente y acción sugerida. Cargás lluvias y riegos, y el cálculo se ajusta. |

**Alertas y canales** (dos columnas, como en la versión 1):

- **Izquierda:** tres alertas de ejemplo y las dos líneas de canales.

  | Severidad | Alerta | Acción |
  |---|---|---|
  | Alerta | Estrés hídrico moderado en 4 días | Planificar riego o bioinsumo entre hoy y 3 días. |
  | Preventiva | Período crítico en 14 días | Bioinsumo preventivo antes del estadio. |
  | Crítica | Estrés hídrico y térmico combinado | Bioinsumo hídrico más antiestrés térmico, ya. |

  - **En la plataforma:** el panel del lote, con el balance hídrico y el DPV que explican la alerta.
  - **En tu WhatsApp:** el aviso te llega al celular sin tener que entrar.
- **Derecha:** `WhatsAppMock.astro` (llega el mensaje de VigIA) y después el video `resolucion` (la pulverizadora aplica al amanecer y el lote sano).

**Al pie, una línea:**

> **¿Hacés cultivos de servicio?** VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado.

La fila "Cómo lo logra" de la versión 1 (clima, cultivo, lluvias, suelo) se absorbe en los pasos 1 y 2.

## 4. Frase destacada

Sección propia, fuera del recorrido, con tipografía grande (sección B11 de `landing-page-design`).

> **Que el bioinsumo llegue antes que el estrés,**
> **no después del daño.**

- Cada palabra pasa de un tono apagado (≈30 % de opacidad) al color pleno a medida que cruza una línea de activación, en orden de lectura, con `--ease-fluid`.
- Con `prefers-reduced-motion` o sin JS, el texto se ve completo y sin animar.
- Es texto HTML (un `<p>`, no un heading), legible por lectores de pantalla.

## 5. Beneficios (`#beneficios`)

| Elemento | Contenido |
|---|---|
| Etiqueta | BENEFICIOS |
| Título | **Lo que ganás en cada campaña** |

Tres tarjetas: título, texto y una línea de resultado.

| Título | Texto | Resultado |
|---|---|---|
| **Días de ventaja** | El balance hídrico y el DPV marcan el estrés antes que la hoja. Te enterás con margen para actuar. | Llegás a tiempo al déficit hídrico y a los golpes de calor. |
| **Insumo donde hace falta** | VigIA trabaja por ambiente: aplicás o regás donde el estrés se viene, no en todo el lote. | Menor costo por hectárea. |
| **Menos merma** | Cada alerta dice la etapa del cultivo, la severidad y el ambiente. Sabés qué lote recorrer primero. | Campañas más previsibles. |

## 6. Para quién es (`#para-quien`)

| Elemento | Contenido |
|---|---|
| Etiqueta | PARA QUIÉN ES |
| Título | **Para quien decide sobre el lote** |

Dos columnas, cada una con subtítulo, tres puntos y un beneficio clave.

**Productores, extensivos e intensivos** · *Proteger el margen de cada hectárea.*
- Todos tus lotes y ambientes en un solo lugar, campaña tras campaña.
- Alertas antes de los períodos críticos que definen el rinde.
- Bajo riego, un plan mensual con costo y rinde esperado.

Beneficio clave: menos merma y menos insumo desperdiciado.

**Asesores e ingenieros agrónomos** · *Más hectáreas bajo control, con el mismo tiempo.*
- Sabés qué lote y qué ambiente mirar antes de salir al campo.
- Recomendaciones respaldadas por clima, balance hídrico y fenología.
- Reportes en PDF listos para compartir con cada productor.

Beneficio clave: recomendaciones más rápidas y fáciles de defender.

Nota al pie: "En secano o bajo riego."

## 7. Clientes (`#clientes`)

Carrusel **Confían en nosotros**, sin cambios.

## 8. Preguntas frecuentes (`#preguntas`)

Acordeón con `<details>`, sin JS. Las mismas preguntas van como datos estructurados `FAQPage` (JSON-LD) para buscadores.

| Pregunta | Respuesta |
|---|---|
| ¿Necesito sensores o estaciones en el campo? | No. VigIA toma el clima en las coordenadas de cada lote. Si medís lluvias o agua útil, las cargás y el cálculo se ajusta. |
| ¿Qué tengo que cargar yo? | Al empezar se cargan tus lotes, ambientes y suelo. Después sólo sumás lluvias y riegos cuando pasan. |
| ¿Qué cultivos sigue? | Los cultivos de la campaña (en soja, con la fenología ajustada por latitud y grupo de madurez) y cultivos de servicio: centeno, cebada y vicia. |
| ¿Cómo me llegan las alertas? | En la plataforma, en el panel de cada lote, y por WhatsApp, sin tener que entrar. |
| ¿Sirve en secano? | Sí. En secano te avisa a tiempo para el bioinsumo. Bajo riego, además, te arma un plan mensual con su costo. |
| ¿Me recomienda productos? | Te sugiere la acción (bioinsumo hídrico, antiestrés térmico o riego), sin marcas. Vos o tu asesor elegís el producto. |
| ¿Cuánto cuesta? | Depende de la cantidad de lotes. En la demo vemos tus lotes y te armamos la propuesta. |

## 9. Cierre (CTA final)

| Elemento | Contenido |
|---|---|
| Título | **La próxima merma ya se está gestando en algún lote. Encontrala primero.** |
| Texto | Agendá una demo de 20 minutos y te mostramos VigIA BioEstrés funcionando sobre tus lotes, con datos de tu campaña actual. |
| Botón | **Quiero ver mis lotes en VigIA** (WhatsApp) |

## Footer (`#contacto`)

Sin cambios de contenido: email, Instagram, WhatsApp y oficina. Suma los enlaces a privacidad y términos si existen (pregunta abierta 2).

## SEO

| Campo | Valor |
|---|---|
| `<title>` | VigIA BioEstrés · Anticipá el estrés hídrico y térmico de tus lotes |
| Meta description | Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp. |
| `og:image` | 1200×630 desde `media-src/imagenes/3.3.jpg` (el lote sano), con el logo. |
| Datos estructurados | `FAQPage` con las preguntas de la sección 8. |
| Indexar | Sí: es la página principal del dominio. |

---

## Medios: animaciones y videos

Cada sección del recorrido tiene **un** medio, dentro de `MediaStory.astro`: primero una animación en código y, si hay video, un fundido al video. Al terminar vuelve a empezar.

| Sección | Animación en código | Video (`public/videos/`) |
|---|---|---|
| 1. Hero | `BalanceChart.astro`, 7,5 s | Ninguno: el gráfico es la propuesta del producto. |
| 2. El problema | `ProblemChart.astro`, 6,5 s | `problema.mp4` (5,1 s, 2,9 MB): clip 2B, el lote se marchita y la mano toca una hoja. |
| 3. Cómo funciona | `WhatsAppMock.astro`, 4,5 s | `resolucion.mp4` (5,5 s, 1,5 MB): clip 3B → 3C, la pulverizadora al amanecer y el lote sano. |

**Estado:** los dos videos están en `public/videos/` con poster y cargados en `src/data/videos.js`. Los clips crudos y los masters están en `media-src/` (fuera del repo).

### Criterios

- **El mismo lote cuenta la historia:** VigIA vigila (1), sin aviso se pierde rinde (2), con el aviso se actúa a tiempo (3). La luz acompaña: mediodía seco en 2, amanecer en 3.
- **Interfaz en código, campo en video.** Lo que es interfaz (gráfico, alertas, celular) se anima en SVG y CSS: se ve nítido, sigue el tema y se corrige en minutos. El campo real va en video.
- **Sin texto dentro del video.** Los textos van en HTML.
- **Sin drones, satélites, HUD, robots ni marcas** en ningún medio.

### Requisitos técnicos

- `<video muted playsinline preload="none">` con `poster`. El video empieza a bajar cuando la sección entra en pantalla, mientras corre la animación.
- **Sólo MP4 (H.264)**, 960×720, 24 fps, sin audio. Con follaje fino, a igual calidad el WebM pesaba más. `webm` queda como campo opcional.
- Peso: hasta 4 MB por clip, priorizando que se vea bien (SSIM ≥ 0,98 contra el master).
- Con `prefers-reduced-motion` o sin JS: la animación queda en su estado final y el video no se muestra.
- Los videos quedan en el historial de git para siempre (por `docs/`). Si van a cambiar seguido, conviene un CDN.

### Mejoras opcionales

- **Cierre espejo en Cómo funciona:** al terminar el video, la alerta del celular pasa a "Resuelta ✓".
- **Rótulo HTML** sobre el video ("Sin aviso" / "Con VigIA"), para que el cambio de animación a video se lea solo.

## Recorrido: hilo y fondo

Las secciones 1 a 3 comparten un contenedor (`.vg-journey`) con un fondo que cambia por etapas y un hilo que se dibuja con el scroll (`JourneyThread.astro`).

| Sección | Hilo | Fondo |
|---|---|---|
| 1. Hero | Verde: VigIA vigila el lote. Punto **1**. | Verde muy suave. |
| 2. El problema | Ámbar y rojo: el agua cruza el umbral sin aviso. Punto **2**. | Arena. |
| 3. Cómo funciona | Vuelve a verde: el lote se salvó. Punto **3**. | Verde agua. |

- Cada color se funde con el siguiente a lo largo de unos 520 px. El hilo termina en la línea de cultivos de servicio (`data-vg-end`).
- Con movimiento reducido, el hilo aparece completo y quieto.
- El fondo por etapas es una **excepción provisoria** a la regla de fondos planos (ver `CLAUDE.md`).

---

## Plan de implementación

De la versión 1 a la versión 2. Cada paso deja la página funcionando.

| # | Qué | Archivos |
|---|---|---|
| 1 | **Datos.** `src/data/vigia.js` pasa a un objeto por sección: `HERO`, `PROBLEMA`, `COMO_FUNCIONA`, `FRASE`, `BENEFICIOS`, `PARA_QUIEN`, `PREGUNTAS`, `CIERRE` y `SEO`. Se borran `INTRO`, `MEJORA.datos` y el perfil "Empresas y grupos". El texto del CTA y el mensaje de WhatsApp quedan en un solo lugar. | `src/data/vigia.js` |
| 2 | **Marca y SEO.** Títulos y descripciones por defecto con "VigIA BioEstrés", `og:image` y tags sociales. Prop para inyectar JSON-LD. Logo del header: `vigia-biostres-logo.png` (versión blanca en modo oscuro). | `BaseLayout.astro`, `Header.jsx`, `public/og.jpg` |
| 3 | **Hero.** Copy nuevo, CTA principal y línea de prueba. | `index.astro` |
| 4 | **Cómo funciona.** Pasos en fila (`<ol>`), alertas y canales en dos columnas con el video de resolución, línea de cultivos de servicio. Se elimina `.vg-datos`. El punto 3 del hilo pasa a `#como-funciona`. | `index.astro`, `sections.css`, `JourneyThread.astro` |
| 5 | **Frase destacada.** Componente con palabras que se encienden al hacer scroll (un `IntersectionObserver`, sin listener de scroll) y estado final sin JS. | `TaglineReveal.astro`, `sections.css` |
| 6 | **Beneficios.** Tres tarjetas con resultado. | `index.astro`, `sections.css` |
| 7 | **Para quién es.** Dos perfiles con puntos y beneficio clave. | `index.astro`, `sections.css` |
| 8 | **Preguntas frecuentes.** `<details>` accesibles y JSON-LD `FAQPage`. | `index.astro`, `sections.css`, `BaseLayout.astro` |
| 9 | **Cierre.** Titular, texto de la demo y CTA. | `index.astro` |
| 10 | **Header.** Menú: Cómo funciona · Beneficios · Para quién · Preguntas · Contacto. | `Header.jsx` |
| 11 | **Videos.** Verificar el fundido animación → video en las secciones 2 y 3, el poster y la descarga anticipada. Opcionales: cierre "Resuelta ✓" y rótulo HTML. | `MediaStory.astro`, `WhatsAppMock.astro` |
| 12 | **Resto del sitio.** "VigIA BioEstrés" en `/pricing` y en la 404. | `pricing.astro`, `404.astro` |
| 13 | **Verificación.** Ver abajo. | — |

### Verificación

- `pnpm validate` en verde y `docs/` reconstruido.
- Capturas en escritorio (1440 px) y celular (390 px), en tema claro y oscuro.
- Búsqueda en `src/`: sin "IA" fuera de "VigIA", sin "inteligencia artificial", "satélite", "NDVI", "plaga", "fungicida" ni "Herbicidas".
- Teclado: foco visible en menú, botones, preguntas frecuentes y carrusel.
- `prefers-reduced-motion`: el hilo, las animaciones y la frase destacada quedan quietas y completas.
- Videos: con la red en "Fast 4G", arrancan sin quedarse en el poster.
- Un solo `h1`; títulos de sección en `h2`, sin saltos.
- Alto de la página: cerca de 5.000 px en escritorio (la versión 1 tenía unos 3.900; se suman frase, beneficios y preguntas).

## Decisiones

| # | Tema | Decisión |
|---|---|---|
| 1 | Nombre visible | **VigIA BioEstrés** (reemplaza la decisión anterior de usar sólo "VigIA"). |
| 2 | WhatsApp en el lanzamiento | Va a estar listo cuando se publique la landing. Se presenta como disponible. |
| 3 | Alcance de lo que se promete | Sólo lo que el producto hace hoy, más WhatsApp. Sin satélite, sin estrés biótico, sin mapas. |
| 4 | Inteligencia artificial | No se menciona. |
| 5 | Logos del carrusel | Iguales que en la landing de Rinde Plus. |
| 6 | Precios en el menú | Fuera del menú mientras no haya precios. `/pricing` sigue existiendo. |
| 7 | Video en el hero | No lleva: el gráfico animado muestra el producto. |
| 8 | Formato de video | Sólo MP4 (H.264). |
| 9 | Variante del video del problema | Sólo el clip 2B, sin el inserto del suelo agrietado (2A). |
| 10 | Prueba en el hero | Se nombran Aapresid, CREA, Agroconsultor y SpeedAgro. **Antes de publicar, confirmar que autorizan la mención.** |
| 11 | Logo | El header usa el logo de VigIA BioEstrés. |
| 12 | Reversión de riesgo | No lleva: el cierre termina en el CTA. |

## Preguntas abiertas

1. **Alta de lotes (pendiente de consultar con la empresa):** ¿la carga inicial de lotes, ambientes y suelo la hace el equipo de VigIA o el usuario? Mientras tanto, el paso 1 y la pregunta "¿Qué tengo que cargar yo?" usan una redacción neutral ("se cargan"). Cuando se confirme, pasar a "Cargamos tus lotes" o "Cargás tus lotes".
2. **Legales:** ¿hay política de privacidad y términos para enlazar en el footer?
