# Prompts de video y fondo para la landing de VigIA

Prompts para generar los videos de los tres módulos y el fondo que avanza con el scroll. El plan general (estructura, historia, especificaciones) está en [ESTRUCTURA_LANDING.md](ESTRUCTURA_LANDING.md), sección *Animaciones y video*.

Los prompts están en inglés porque los generadores de video suelen responder mejor así. Cada uno tiene un **prompt negativo** con lo que hay que evitar.

## Reglas para todos los clips

- **El mismo lote en todo.** Primero se genera la [imagen base](#0-imagen-base-del-lote) y se usa como referencia (*image-to-video* o *start frame*) en cada clip.
- **Nada de IA a la vista:** ni drones o satélites escaneando, ni pantallas tipo HUD, ni robots o cerebros digitales.
- **Sin texto, logos ni marcas** dentro del video. Las pulverizadoras, los pivotes y los celulares van sin marca.
- **Cámara lenta y estable,** sin cortes dentro de cada clip. Los cortes se arman en la edición.
- **Formato:** 4:3 (1440×1080), sin sonido.
- **El tramo de datos (gráfico o celular) no se genera con IA.** Los generadores deforman números, textos y líneas. Se arma en motion graphics o se exporta de las animaciones de la página (ver [Tramo de datos](#tramo-de-datos-gráfico-y-celular)).

---

## 0. Imagen base del lote

Referencia visual para todos los clips.

**Prompt**

```
Photorealistic wide shot of a soybean field in the Argentine Pampas at golden hour.
Flat horizon in the lower third, neat crop rows in vegetative stage leading toward
the horizon, low warm sun from the left, a line of eucalyptus trees and two distant
grain silos on the horizon, clear sky with a thin warm haze. Natural, slightly muted
colors, soft greens. Cinematic, shallow depth of field, 4:3.
```

**Negativo**

```
people, machinery, text, logos, watermark, drones, satellite overlay, HUD, graphics,
oversaturated colors, dramatic clouds, mountains, fisheye
```

---

## 1. Mitigación de Estrés: "Los datos ven lo que el campo todavía no muestra"

Estructura del video: **datos (0–3 s) → transición: el punto de la alerta se convierte en el sol (3–4 s) → campo real (4–9 s).**

### Clip 1A · Campo real (5 s)

**Prompt**

```
Image-to-video from the reference soybean field. Hot late afternoon: the sun is a small,
intense point of light near the top center of the frame, visible heat shimmer rising
above the canopy, leaves gently moving in a dry breeze. The plants still look green and
healthy. Very slow push-in, steady camera, no cuts. Photorealistic, natural warm colors.
```

**Negativo**

```
wilting plants, brown leaves, rain, clouds covering the sun, people, machinery, text,
logos, drones, HUD, fast camera movement
```

**Para la transición:** que el primer fotograma tenga el sol chico y centrado. En la edición se hace zoom al punto de la alerta del gráfico y se funde con el sol en la misma posición.

---

## 2. El problema que resuelve: "Sin aviso, el estrés se ve tarde"

Estructura: **datos sin VigIA (0–3 s) → transición: el área roja se funde en suelo agrietado (3–4 s) → campo real (4–9 s).**

### Clip 2A · Suelo agrietado (2 s, arranque de la transición)

**Prompt**

```
Extreme close-up, top-down view of dry cracked soil between soybean rows, warm
reddish-orange light, the cracks slowly widening, dust particles in the air.
Static camera that slowly pulls back. Photorealistic.
```

**Negativo**

```
water, puddles, green grass, people, text, logos, cartoon, oversaturated red
```

### Clip 2B · Hojas que se enrollan (4–5 s)

**Prompt**

```
Image-to-video from the reference soybean field, close-up of soybean plants under harsh
midday sun. Time-lapse: the leaves slowly curl and wilt, the green turns dull grey-green,
the soil between the rows dries out. In the final second, a farmer's hand enters the
frame and gently touches a wilted plant. Warm, dusty, slightly reddish tones.
Still camera, photorealistic.
```

**Negativo**

```
dead brown field, fire, smoke, rain, face of a person, machinery, text, logos, drones, HUD
```

**Para la transición:** el rojo del área "Rinde perdido" del gráfico se agranda hasta llenar la pantalla y se funde con el tono rojizo del clip 2A.

---

## 3. La mejora real: "Te llega el aviso, actuás a tiempo"

Estructura: **celular con el aviso (0–3 s) → transición: el celular de la interfaz pasa a un celular real (3–4 s) → acción (4–7 s) → lote sano (7–9 s).**

### Clip 3A · El celular en el campo (2 s)

**Prompt**

```
Close-up of a farmer's hand holding a smartphone in the reference soybean field at dawn,
soft blue morning light, the phone screen is a solid bright green (chroma key) for
compositing, slight natural camera drift. The farmer lowers the phone and the field
comes into focus behind it.
```

**Negativo**

```
readable screen content, app interface, brand logos, face of a person, text, night,
rain, HUD
```

**Para la transición:** la pantalla verde se reemplaza en la edición por el mensaje de WhatsApp de VigIA, el mismo del tramo de datos. Así el celular de la interfaz "se convierte" en el celular real.

### Clip 3B · La acción (3 s)

Elegir una de las dos versiones, según el manejo que se quiera mostrar.

**Prompt (aplicación)**

```
Wide shot at dawn: a modern self-propelled sprayer with no logos crosses the reference
soybean field applying a fine mist, low sun backlighting the spray droplets.
Slow lateral tracking shot, photorealistic, soft warm light.
```

**Prompt (riego)**

```
Wide shot at dawn: a center pivot irrigation system starts over the reference soybean
field, water drops sparkling in the low sun, light mist. Slow lateral tracking shot,
photorealistic, soft warm light.
```

**Negativo**

```
brand logos, text, warning labels, chemical drums, protective suits, dust storm,
people close-up, drones, HUD
```

### Clip 3C · El lote sano (2 s)

**Prompt**

```
Image-to-video from the reference soybean field, now lush and healthy green under soft
morning light, dew on the leaves, gentle breeze. Slow pull-back revealing the whole
field, calm and steady. Photorealistic, fresh natural colors.
```

**Negativo**

```
wilting, dry soil, people, machinery, text, logos, drones, HUD, oversaturated green
```

**Opcional al cierre:** medio segundo del gráfico con la línea de agua útil que vuelve a subir por encima del umbral, como espejo del video 1.

---

## Tramo de datos (gráfico y celular)

No se genera con IA. Opciones:

1. **Exportar las animaciones de la página** (recomendado): el gráfico del módulo 1, el gráfico "sin VigIA" del módulo 2 y el celular del módulo 3, en tema oscuro y 1440×1080. Tienen exactamente la estética de la página.
2. **Rearmarlo en motion graphics** (After Effects, Jitter, Canva) con esta guía de estilo:

| Elemento | Valor |
|---|---|
| Fondo de la tarjeta | `#161b22`, bordes redondeados de 16 px |
| Línea de agua útil | verde `#8fd14f`, 3 px; punteada en el pronóstico |
| Umbral del cultivo | ámbar `#e3b341`, línea discontinua |
| Zona de pronóstico | azul oscuro `#131d33` |
| Lluvia | barras azules `#6b93ff` |
| Alerta y "Rinde perdido" | rojo `#ff7b72` |
| Datos de entrada | chips azules: 34 °C · HR 40 % · DPV 3,2 kPa · Lluvia 12 mm |
| Tipografía | Inter |

---

## 4. Fondo que avanza con el scroll

Un fondo muy simple, que acompaña la historia de los tres módulos y avanza **sólo cuando el usuario baja** (no se reproduce solo).

**Criterios**

- **Poco contenido:** horizonte bajo, mucho cielo, desenfocado, bajo contraste y colores pastel. Que se lea como un clima, no como una imagen.
- **Debajo de todo:** se muestra con poca opacidad (10-20 %) sobre los colores de fondo actuales, así no tapa ni el texto ni el hilo.
- **Zonas libres:** nada en el 15 % izquierdo (por donde pasa el hilo) ni en el centro (donde está el texto). Los detalles, si hay, en los bordes de abajo y a la derecha.
- **La misma historia:** amanecer verde (lote sano) → tarde seca y arena (estrés) → mañana fresca verde agua (recuperación).

### Opción A (recomendada): tres imágenes que se funden

Son tres imágenes fijas, una por módulo, que se funden entre sí a medida que se baja. Es lo más liviano, menos de 300 KB en total.

**Prompt base** (se repite cambiando sólo la parte de la escena):

```
Ultra-minimal, abstract landscape background. A very low, flat agricultural horizon in the
bottom fifth of the frame, the rest is a soft, empty sky. Heavily blurred, low detail,
low contrast, pastel colors, gentle gradient. Nothing in the left 15% and nothing in the
center of the frame. 16:9, 2560x1440. [ESCENA]
```

| Imagen | [ESCENA] |
|---|---|
| 1 · Sano | `Fresh early morning, soft light greens and pale mint sky, a faint line of crops on the horizon.` |
| 2 · Seco | `Hot dry afternoon, pale sand and soft amber haze, the horizon slightly washed out by heat shimmer.` |
| 3 · Recuperación | `Cool calm morning after irrigation, soft water-green and pale teal sky, a faint mist over the horizon.` |

**Negativo**

```
people, machinery, animals, text, logos, sun disk, clouds with strong shapes, high contrast,
saturated colors, sharp details, objects in the center, drones, HUD
```

**Versión para modo oscuro:** el mismo prompt, cambiando `pastel colors` por `very dark, deep muted colors, night-like` y las escenas por:

- `deep green night`
- `dark brown dusk`
- `deep teal blue hour`

### Opción B: un video que avanza con el scroll

Más fluido, pero mucho más pesado.

**Prompt**

```
Ultra-minimal, abstract, slow continuous time-lapse of a very low, flat agricultural
horizon in the bottom fifth of the frame, mostly empty sky. It starts at a fresh early
morning with soft light greens, transitions into a hot dry afternoon with pale sand and
amber haze, and ends at a cool calm morning with soft water-green tones and a faint mist.
Heavily blurred, low detail, low contrast, pastel colors. Locked camera, no cuts,
nothing in the left 15% or the center of the frame. 16:9, 12 seconds.
```

**Negativo:** el mismo de la opción A.

**Para que avance con el scroll:** el video tiene que exportarse con todos los fotogramas como fotogramas clave (en ffmpeg, `-g 1`) o como una secuencia de unas 60 imágenes WebP. Si no, al bajar se ve a saltos. Por eso pesa varios MB más que la opción A.

---

## Orden sugerido

1. Generar la **imagen base del lote** y aprobarla.
2. Generar los clips reales: 1A, 2A, 2B, 3A, 3B, 3C.
3. Exportar o armar los tramos de datos.
4. Editar los tres videos (8–10 s cada uno) con sus transiciones.
5. Generar las tres imágenes de fondo (claro y oscuro).
6. Integrar en la página: videos en `src/data/videos.js` y fondo en el recorrido de los módulos.
