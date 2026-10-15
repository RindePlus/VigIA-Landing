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

**Un solo CTA principal en toda la página:** **Contactanos para empezar a usar VigIA**. Abre WhatsApp con el mensaje "Hola, quiero empezar a usar VigIA BioEstrés". Va en el hero y en el cierre con el mismo texto. El botón secundario del hero ("Cómo funciona") es un enlace interno, no compite.

---

## 1. Hero (`#inicio`)

| Elemento | Contenido |
|---|---|
| Etiqueta | ESTRÉS HÍDRICO Y TÉRMICO |
| Título (h1) | **Detectá el estrés antes de que se convierta en merma** |
| Bajada | VigIA BioEstrés cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos. |
| Tarjetas | Tres tarjetas con ícono, en fila (en celular, una debajo de otra):<br>• **Aviso anticipado** (campana): Alerta a 4 días y el período crítico a 14.<br>• **Por ambiente** (cuadrícula): En secano o bajo riego.<br>• **En tu WhatsApp** (logo de WhatsApp): Y en la plataforma, con el detalle. |
| Botones | **Contactanos para empezar a usar VigIA** (WhatsApp, con flecha) · **Cómo funciona** (baja a `#como-funciona`). Van en una fila propia, **centrada debajo de las dos columnas**, en tamaño grande: el principal en azul intenso, sin halo; el secundario con borde y fondo. En celular, a todo el ancho, debajo del gráfico. |
| Visual | El gráfico termina a la altura de las tarjetas (la columna de texto ya no lleva los botones). `BalanceChart.astro`, simplificado: sólo la línea de agua útil, el umbral, "Hoy" y la zona de pronóstico (sin chips de datos, lluvia ni "Ejemplo ilustrativo"). La línea se dibuja y, justo antes de tocar el umbral, aparece la notificación **"Alerta enviada · Estrés hídrico en 4 días"** con el logo de WhatsApp, y late el punto del cruce. En escritorio la notificación va sobre el gráfico (arriba a la derecha); en celular, debajo. Sin video. |

## 2. El problema (`#problema`)

Se mantiene de la versión 1.

| Elemento | Contenido |
|---|---|
| Etiqueta | EL PROBLEMA |
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Disposición:** etiqueta, título, bajada y razones van en la columna izquierda; el gráfico, a la derecha, queda centrado verticalmente entre el título y las razones.

**Tres razones**, sin numerar, cada una con un ícono ámbar (el color de este capítulo) y separadas por una línea fina: planta (el síntoma llega tarde), reloj de arena (el bioinsumo necesita llegar antes) y nube con sol (el pronóstico regional no conoce tu lote).

1. **El síntoma llega tarde.** Cuando la hoja se enrolla, el rinde ya está comprometido.
2. **El bioinsumo necesita llegar antes.** Aplicado cuando el estrés ya pasó, protege poco.
3. **El pronóstico regional no conoce tu lote.** No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.

**Qué estrés mitiga VigIA:** el rótulo va centrado entre dos líneas, en mayúsculas y oscuro, y debajo tres columnas a todo el ancho de la sección, sin caja. Cada una con una barrita y un ícono de su color: gota azul, termómetro ámbar y alerta roja.

| Estrés | Línea |
|---|---|
| Hídrico | Falta agua útil en el suelo para la etapa del cultivo. |
| Térmico (DPV) | El aire seca a la planta más rápido de lo que repone. |
| Combinado | Las dos cosas el mismo día: el escenario más dañino. |

**Visual:** `ProblemChart.astro`, simplificado como el del hero (mismas etiquetas grandes, sin lluvia ni "+6 días"): la línea gris cruza el umbral en silencio, el área roja "Rinde perdido" y la línea roja "Lo ves a campo" al final. Como cierre, una alerta roja **"Se ve a campo 6 días tarde · El bioinsumo ya no llega a tiempo"** cuelga del borde inferior de la tarjeta, debajo de "Lo ves a campo" (en celular, debajo del gráfico). Después, el video `problema`.

## 3. Cómo funciona (`#como-funciona`)

Es el capítulo "con VigIA" del recorrido. **Lo principal son los dos canales de la alerta**, que es lo que recibe el cliente; los pasos van después y cortos.

| Elemento | Contenido |
|---|---|
| Etiqueta | CÓMO FUNCIONA |
| Título | **Te avisa antes, por WhatsApp y en la plataforma** |
| Bajada | VigIA sigue cada ambiente día a día. Cuando se viene el estrés, te avisa con margen para aplicar el bioinsumo o regar. |

**Bloque principal (dos columnas):** a la izquierda, la etiqueta, el título, la bajada y los dos canales en tarjetas compactas, con el ícono sin fondo en su color: **En tu WhatsApp** (verde WhatsApp) y **En la plataforma** (azul). A la derecha, alineado abajo (termina a la altura de la tarjeta de la plataforma y no se cruza con el título), un recuadro 4:3 (la proporción del video) que llena `WhatsAppMock.astro`, así no cambia de tamaño al pasar al video. El mensaje es simple: **⚠️ Estrés hídrico en 4 días** · Lote 12 · Ambiente 2 · Planificá riego o bioinsumo. Después, el video `resolucion` y el cierre **✅ Resuelta a tiempo**.

**Panel con dos subsecciones** (una tarjeta grande, lado a lado; en celular, una debajo de otra):

- **Qué te avisa**: las tres alertas del motor contadas en lenguaje de campo, cada una con un ícono del color de su severidad.

  | Ícono y color | Título | Texto |
  |---|---|---|
  | Gota, ámbar | Falta de agua que se viene | Te avisa 4 días antes de que al suelo le falte agua para tu cultivo. |
  | Calendario, azul | Etapa crítica del cultivo | 14 días antes de la etapa que define el rinde, para aplicar el bioinsumo preventivo. |
  | Termómetro, rojo | Calor y sequía juntos | Cuando se suman el estrés hídrico y el térmico, para actuar ese mismo día. |

- **Cómo lo hace**: tres pasos numerados (la cifra sola, sin círculo ni fondo).

  | Paso | Título | Texto |
  |---|---|---|
  | 1 | Se cargan tus lotes | Ambientes, suelo y cultivo. El clima se conecta solo. |
  | 2 | Calcula cada día | Balance hídrico y DPV contra los umbrales de tu cultivo. |
  | 3 | Te avisa a tiempo | Cargás lluvias y riegos, y el cálculo se ajusta. |

  El paso 1 usa una redacción neutral ("se cargan") hasta confirmar quién hace el alta de lotes (pregunta abierta 1).

**Al pie, una línea:**

> **¿Hacés cultivos de servicio?** VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado.

## 4. Frase destacada

Sección propia, fuera del recorrido, con tipografía grande (sección B11 de `landing-page-design`).

> **Que el bioinsumo llegue antes que el estrés,**
> **no después del daño.**

- **Palabras resaltadas con los colores de la historia:** "antes" en verde (a tiempo) y "después del daño" en rojo (tarde). En `src/data/vigia.js` se marcan con `*verde*` y `_rojo_`.
- Cada palabra pasa de un tono apagado (≈30 % de opacidad) al color pleno a medida que cruza una línea de activación, en orden de lectura, con `--ease-fluid`.
- Con `prefers-reduced-motion` o sin JS, el texto se ve completo y sin animar.
- Es texto HTML (un `<p>`, no un heading), legible por lectores de pantalla.

## 5. Beneficios (`#beneficios`)

| Elemento | Contenido |
|---|---|
| Etiqueta | BENEFICIOS |
| Título | **Lo que ganás en cada campaña** |

Tres tarjetas: ícono verde sin fondo, título, texto y el resultado marcado al pie con un tilde.

| Título | Texto | Resultado |
|---|---|---|
| **Días de ventaja** | El balance hídrico y el DPV marcan el estrés antes que la hoja. | Llegás a tiempo a la falta de agua y al golpe de calor. |
| **Insumo donde hace falta** | VigIA mira cada ambiente: aplicás o regás donde se viene el estrés, no en todo el lote. | Menor costo por hectárea. |
| **Menos merma** | Cada alerta dice qué ambiente y en qué etapa. Sabés qué lote recorrer primero. | Campañas más previsibles. |

## 6. Para quién es (`#para-quien`)

| Elemento | Contenido |
|---|---|
| Etiqueta | PARA QUIÉN ES |
| Título | **Pensado para el productor y su asesor** |

Dos tarjetas. Cada una con encabezado (ícono verde grande, título y una línea), tres puntos con tilde y el **beneficio clave** al pie, separado por una línea fina (rótulo en gris, sin fondo).

**Productores** (tractor) · *Extensivos e intensivos, en secano o bajo riego.*
- Todos tus lotes y ambientes en un solo lugar, campaña tras campaña.
- El aviso en tu WhatsApp antes de los períodos que definen el rinde.
- Bajo riego, un plan mensual con costo y rinde esperado.

Beneficio clave: Menos merma y menos insumo desperdiciado.

**Asesores e ingenieros agrónomos** (planilla) · *Más hectáreas bajo control, con el mismo tiempo.*
- Sabés qué lote y qué ambiente mirar antes de salir al campo.
- Las alertas de todos tus clientes, en la plataforma y en WhatsApp.
- Reportes en PDF listos para compartir con cada productor.

Beneficio clave: Recomendaciones más rápidas y fáciles de defender.

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
| Botón | **Contactanos para empezar a usar VigIA** (WhatsApp) |

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
| 3. Cómo funciona | `WhatsAppMock.astro`, 4,5 s, más 3,2 s de cierre "Resuelta" después del video | `resolucion.mp4` (5,5 s, 1,5 MB): clip 3B → 3C, la pulverizadora al amanecer y el lote sano. |

**Estado:** los dos videos están en `public/videos/` con poster y cargados en `src/data/videos.js`. Los clips crudos y los masters están en `media-src/` (fuera del repo).

### Criterios

- **El mismo lote cuenta la historia:** VigIA vigila (1), sin aviso se pierde rinde (2), con el aviso se actúa a tiempo (3). La luz acompaña: mediodía seco en 2, amanecer en 3.
- **Interfaz en código, campo en video.** Lo que es interfaz (gráfico, alertas, celular) se anima en SVG y CSS: se ve nítido, sigue el tema y se corrige en minutos. El campo real va en video.
- **Sin texto dentro del video.** Los textos van en HTML.
- **Sin drones, satélites, HUD, robots ni marcas** en ningún medio.

### Requisitos técnicos

- Los videos se reproducen a **0,75x** (`playbackRate`): el campo se mira con calma. Las animaciones en código mantienen su velocidad. Con eso, `problema` dura unos 6,8 s y `resolucion` unos 7,3 s.
- `<video muted playsinline preload="none">` con `poster`. El video empieza a bajar cuando la sección entra en pantalla, mientras corre la animación.
- **Sólo MP4 (H.264)**, 960×720, 24 fps, sin audio. Con follaje fino, a igual calidad el WebM pesaba más. `webm` queda como campo opcional.
- Peso: hasta 4 MB por clip, priorizando que se vea bien (SSIM ≥ 0,98 contra el master).
- Con `prefers-reduced-motion` o sin JS: la animación queda en su estado final y el video no se muestra.
- Los videos quedan en el historial de git para siempre (por `docs/`). Si van a cambiar seguido, conviene un CDN.

### Rótulo y encuadre

- **Rótulo de capítulo:** durante el video aparece arriba a la izquierda, sin caja, en mayúsculas blancas con un ícono al principio: ⚠ rojo "Sin aviso · el daño se ve a campo" y ✓ verde "Con el aviso · se aplica a tiempo". Un degradé oscuro suave arriba del video lo hace legible sobre el cielo claro. Aparece 1,2 s después de que arranca el video, cuando la escena ya se leyó. Campos `rotulo` y `tono` en `src/data/videos.js`.
- **Encuadre:** en celular el contenedor es casi cuadrado y el video 4:3 se recorta a los costados. El campo `encuadre` (`object-position`) conserva los silos y la pulverizadora.

### Cierre espejo en Cómo funciona

Al terminar el video de resolución vuelve el celular y, durante 3,2 s, el aviso "⚠️ Estrés hídrico en 4 días" se cruza con "✅ Resuelta a tiempo", con un borde verde en el mensaje. Después reinicia el ciclo. Es el espejo del "Sin aviso" del gráfico del problema.

- Lo maneja `MediaStory` con la prop `cierre` (ms) y la etapa `data-stage="cierre"`; el texto está en `COMO_FUNCIONA.mensaje.resuelta`.
- Es narrativo: no afirma que la plataforma registre la aplicación ni que el balance vuelva sobre el umbral (el video muestra una aplicación de bioinsumo, no un riego).
- Con movimiento reducido no hay etapas: se ve el aviso original.

## Recorrido: hilo y fondo

Las secciones 1 a 3 comparten un contenedor (`.vg-journey`) con un fondo que cambia por etapas y un hilo que se dibuja con el scroll (`JourneyThread.astro`).

| Sección | Hilo | Fondo |
|---|---|---|
| 1. Hero | Verde: VigIA vigila el lote. Punto **1**. | El color normal de la página. |
| 2. El problema | Ámbar y rojo: el agua cruza el umbral sin aviso. Punto **2**. | Arena, marcado (`--vg-bg-seco`). |
| 3. Cómo funciona | Vuelve a verde: el lote se salvó. Punto **3**. | Verde agua, marcado (`--vg-bg-agua`). |

- El color cambia **en el borde de cada sección**, con un fundido corto de 80 px dentro del margen entre secciones: el salto se nota y no invade el contenido. Al final del recorrido vuelve igual de corto al color de la página. El hilo no termina en seco: pasa por la línea de cultivos de servicio (`data-vg-end`), baja por el costado y dobla para entrar de costado en la frase destacada, a la altura de su renglón del medio, en un punto verde que se rellena y late cuando el hilo llega. Así el recorrido del lote termina en la moraleja.
- Con movimiento reducido, el hilo aparece completo y quieto.
- El fondo por etapas es una **excepción provisoria** a la regla de fondos planos (ver `CLAUDE.md`).

---

## Plan de implementación

De la versión 1 a la versión 2. Cada paso deja la página funcionando.

| # | Qué | Archivos |
|---|---|---|
| 1 | **Datos.** `src/data/vigia.js` pasa a un objeto por sección: `HERO`, `PROBLEMA`, `COMO_FUNCIONA`, `FRASE`, `BENEFICIOS`, `PARA_QUIEN`, `PREGUNTAS`, `CIERRE` y `SEO`. Se borran `INTRO`, `MEJORA.datos` y el perfil "Empresas y grupos". El texto del CTA y el mensaje de WhatsApp quedan en un solo lugar. | `src/data/vigia.js` |
| 2 | **Marca y SEO.** Títulos y descripciones por defecto con "VigIA BioEstrés", `og:image` y tags sociales. Prop para inyectar JSON-LD. Logo del header: `vigia-biostres-logo.png` (versión blanca en modo oscuro). | `BaseLayout.astro`, `Header.jsx`, `public/og.jpg` |
| 3 | **Hero.** Copy nuevo, tarjetas con ícono, CTA principal y gráfico simplificado con notificación. | `index.astro` |
| 4 | **Cómo funciona.** Pasos en fila (`<ol>`), alertas y canales en dos columnas con el video de resolución, línea de cultivos de servicio. Se elimina `.vg-datos`. El punto 3 del hilo pasa a `#como-funciona`. | `index.astro`, `sections.css`, `JourneyThread.astro` |
| 5 | **Frase destacada.** Componente con palabras que se encienden al hacer scroll (un `IntersectionObserver`, sin listener de scroll) y estado final sin JS. | `TaglineReveal.astro`, `sections.css` |
| 6 | **Beneficios.** Tres tarjetas con resultado. | `index.astro`, `sections.css` |
| 7 | **Para quién es.** Dos perfiles con puntos y beneficio clave. | `index.astro`, `sections.css` |
| 8 | **Preguntas frecuentes.** `<details>` accesibles y JSON-LD `FAQPage`. | `index.astro`, `sections.css`, `BaseLayout.astro` |
| 9 | **Cierre.** Titular, texto de la demo y CTA. | `index.astro` |
| 10 | **Header.** Menú: Cómo funciona · Beneficios · Para quién · Preguntas · Contacto. | `Header.jsx` |
| 11 | **Videos.** Verificar el fundido animación → video en las secciones 2 y 3, el poster y la descarga anticipada. Hecho, con rótulo, encuadre y cierre "Resuelta". | `MediaStory.astro`, `WhatsAppMock.astro` |
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
| 10 | Prueba en el hero | No lleva: la prueba social queda en el carrusel "Confían en nosotros". |
| 11 | Logo | El header usa el logo de VigIA BioEstrés. |
| 12 | Reversión de riesgo | No lleva: el cierre termina en el CTA. |
| 13 | Texto del CTA | **Contactanos para empezar a usar VigIA** (reemplaza "Quiero ver mis lotes en VigIA" y "Empezá a usar VigIA"): dice qué pasa al tocarlo y para qué; abre WhatsApp. |
| 14 | "Ejemplo ilustrativo" | Se quita de los tres medios (gráficos y celular). |

## Preguntas abiertas

1. **Alta de lotes (pendiente de consultar con la empresa):** ¿la carga inicial de lotes, ambientes y suelo la hace el equipo de VigIA o el usuario? Mientras tanto, el paso 1 y la pregunta "¿Qué tengo que cargar yo?" usan una redacción neutral ("se cargan"). Cuando se confirme, pasar a "Cargamos tus lotes" o "Cargás tus lotes".
2. **Legales:** ¿hay política de privacidad y términos para enlazar en el footer?
