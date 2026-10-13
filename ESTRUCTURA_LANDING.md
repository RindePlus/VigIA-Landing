# Estructura de la landing de VigIA

Plan de contenido y de optimización de la home. La página se organiza en **3 módulos principales** (Introducción, Qué problema resuelve y La mejora real), más una sección corta **Para quién es** y los bloques de soporte: clientes, CTA final y contacto.

**Estado:** implementado en `src/pages/index.astro`, con los textos en `src/data/vigia.js`.

El objetivo de esta versión es **una página más corta, con un mensaje por módulo**. Las animaciones y los videos se suman en una segunda etapa (ver [Animaciones y video](#animaciones-y-video)).

## Reglas de contenido

- **No mencionar Inteligencia Artificial.** Ni "IA", ni "modelos inteligentes", ni "proyección con IA". "VigIA" queda sólo como nombre de marca. El respaldo del producto es agronómico: clima, DPV, balance hídrico, fenología y suelo.
- **Marca:** se presenta como **VigIA**, sin "BioEstrés".
- **Herbicidas no aparece.** Está fuera del alcance del nuevo producto.
- **Las acciones recomendadas son genéricas:** "bioinsumo" o "riego", sin productos ni marcas. Más adelante se suma la recomendación de insumos con el socio comercial.
- **Las alertas llegan por dos canales:** dentro de la plataforma y como notificación al celular por WhatsApp. WhatsApp va a estar listo al publicar, así que se presenta como disponible.
- **Tono:** voseo rioplatense, frases cortas, igual que la landing de Rinde Plus.

## Presupuesto de texto

Para que la página no se haga larga, cada tipo de texto tiene un máximo:

| Elemento | Máximo |
|---|---|
| Título de módulo | 8 palabras |
| Bajada de módulo | 30 palabras |
| Texto de tarjeta o ítem | 20 palabras |
| Ítems por lista | 3 o 4 |

## Mapa de la página

```
Header ─ El problema · La mejora · Para quién · Clientes · Contacto · [Ingresar]
│
├─ 1. INTRODUCCIÓN            #inicio
├─    Clientes (carrusel)      #clientes        ← ya implementado
├─ 2. QUÉ PROBLEMA RESUELVE   #problema
├─ 3. LA MEJORA REAL          #mejora
│     · Alertas predictivas
│     · En la plataforma y en tu WhatsApp
│     · Cómo lo logra (los datos)
│     · Cultivos de servicio (una línea)
├─    Para quién es            #para-quien
├─    CTA final                                 ← ya implementado
└─ Footer / contacto           #contacto        ← ya implementado
```

---

## 1. Introducción (`#inicio`)

| Elemento | Contenido |
|---|---|
| Marca | **VigIA** (logo en el header) |
| Etiqueta | ESTRÉS HÍDRICO Y TÉRMICO |
| Título | **Mitigación de Estrés** |
| Descripción | Anticipá el estrés hídrico y térmico antes de que se manifieste. VigIA cruza el clima, el balance hídrico y el suelo de cada lote, y te avisa a tiempo para aplicar el bioinsumo. |
| Puntos clave | • Monitoreo de temperatura, humedad y DPV<br>• Pronóstico climático y balance hídrico por ambiente<br>• Alertas tempranas en la plataforma y por WhatsApp |
| Botones | **Quiero una demo** (abre WhatsApp) · **Cómo funciona** (baja a `#mejora`) |
| Visual | Gráfico del balance hídrico con la alerta "Estrés hídrico moderado en 4 días" (ya existe, `BalanceChart.astro`). Lugar reservado para video en la etapa 2. |

Debajo va el carrusel **Confían en nosotros**, sin cambios.

---

## 2. Qué problema resuelve (`#problema`)

Une las secciones actuales "El estrés se ve cuando ya costó rinde" y "Qué estrés mitiga".

| Elemento | Contenido |
|---|---|
| Etiqueta | EL PROBLEMA QUE RESUELVE |
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Tres razones** (numeradas 01-03):

1. **El estrés se ve tarde.** Cuando la hoja se enrolla, el rinde ya está comprometido.
2. **El bioinsumo necesita llegar antes.** Aplicado cuando el estrés ya pasó, protege poco.
3. **El pronóstico regional no conoce tu lote.** No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.

**Qué estrés mitiga VigIA:** una franja compacta con tres etiquetas de una línea, en lugar de tres tarjetas.

| Estrés | Línea |
|---|---|
| Hídrico | Falta agua útil en el suelo para la etapa del cultivo. |
| Térmico (DPV) | El aire seca a la planta más rápido de lo que repone. |
| Combinado | Las dos cosas el mismo día: el escenario más dañino. |

---

## 3. La mejora real (`#mejora`)

| Elemento | Contenido |
|---|---|
| Etiqueta | LA MEJORA REAL |
| Título | **Alertas tempranas, antes que el estrés** |
| Bajada | Recibís alertas predictivas para actuar de forma preventiva, proteger el rendimiento y aplicar los bioinsumos en el momento justo. |

### Alertas predictivas + canales (dos columnas)

**Izquierda: tres alertas de ejemplo**, con severidad y acción. Se deja afuera "Exceso de DPV sostenido" para acortar; el estrés térmico ya está en la alerta combinada.

| Severidad | Alerta | Acción |
|---|---|---|
| Alerta | Estrés hídrico moderado en 4 días | Planificar riego o bioinsumo entre hoy y 3 días |
| Preventiva | Período crítico en 14 días | Bioinsumo preventivo antes del estadio |
| Crítica | Estrés hídrico + térmico combinado | Bioinsumo hídrico más antiestrés térmico, ya |

**Derecha: dónde llegan.** Un celular con el mensaje de WhatsApp y dos líneas:

- **En la plataforma:** el panel del lote, con el balance hídrico y el DPV que explican la alerta.
- **En tu WhatsApp:** el aviso te llega al celular sin tener que entrar a la plataforma.

Mensaje de ejemplo en el celular:

> **VigIA · Lote 12 – Ambiente 2**
> ⚠️ Estrés hídrico moderado en 4 días.
> Acción sugerida: planificar riego o bioinsumo entre hoy y el jueves.

### Cómo lo logra

Una sola fila de cuatro ítems compactos (ícono, título y una línea), en lugar de las cuatro tarjetas grandes actuales:

| Dato | Línea |
|---|---|
| Clima y DPV | Historial y pronóstico a 14 días en las coordenadas del lote. |
| Cultivo y fenología | Etapa y consumo de agua día a día, desde la siembra. |
| Lluvias y riego | Lo que realmente cayó en tu campo, cargado por vos. |
| Suelo | Agua útil del perfil según la textura de cada ambiente. |

### Cultivos de servicio

Una línea al pie del módulo, en lugar de la sección actual:

> **¿Hacés cultivos de servicio?** VigIA también sigue su consumo de agua frente a un barbecho y te marca el momento óptimo de secado.

---

## Para quién es (`#para-quien`)

Sección corta, después de La mejora real.

| Elemento | Contenido |
|---|---|
| Etiqueta | PARA QUIÉN ES |
| Título | **Para quien decide sobre el lote** |

| Perfil | Texto |
|---|---|
| Productores | Sabés qué lote se viene complicado y decidís con días de margen cuándo aplicar o regar. |
| Asesores agronómicos | Seguís los lotes de todos tus clientes y recibís sus alertas en un solo lugar. |
| Empresas y grupos | Una misma lectura del estrés para todos los lotes y ambientes de la organización. |

Nota al pie: "En secano o bajo riego."

---

## CTA final y footer

Sin cambios.

- **CTA:** "Que el bioinsumo llegue antes que el estrés" · "Contanos tus lotes y te mostramos VigIA funcionando con tus datos." · botón **Hablemos por WhatsApp**.
- **Footer:** contacto directo (email, Instagram, WhatsApp, oficina).

---

## Plan de optimización

### Qué cambia

| Hoy | Después |
|---|---|
| 8 secciones de contenido | 3 módulos + para quién es + clientes + CTA |
| Hero "Anticipá el estrés de tu cultivo…" | Introducción "Mitigación de Estrés" |
| "El estrés se ve…" y "Qué estrés mitiga" por separado | Un solo módulo de problema, con los tipos de estrés en una franja |
| "Cómo funciona" con 4 tarjetas grandes | 4 ítems de una línea dentro de La mejora real |
| "Alertas" sin canal | Alertas + celular con WhatsApp |
| 4 alertas de ejemplo | 3 |
| Sección "VigIA Cultivo de Servicio" | Una línea al pie de La mejora real |
| "De la siembra a la decisión" (4 pasos) | **Se elimina** |
| Menú: Cómo funciona · Alertas · Cultivo de servicio · Clientes · Precios · Contacto | Menú: El problema · La mejora · Para quién · Clientes · Contacto |

**Resultado:** la página bajó de unos 5.600 px a unos 3.900 px de alto en escritorio (1440 px de ancho), incluida la sección nueva Para quién es.

### Tareas

1. **Datos** (`src/data/vigia.js`): reemplazar las constantes actuales por tres objetos, uno por módulo (`INTRO`, `PROBLEMA`, `MEJORA`), con los textos de este documento. Borrar `PASOS`, `CULTIVO_SERVICIO` y las alertas o datos que se recortan.
2. **Página** (`src/pages/index.astro`): reordenar en Introducción → Clientes → Problema → Mejora → CTA. Borrar las secciones que se unen o eliminan.
3. **Componente nuevo** `WhatsAppMock.astro`: el celular con el mensaje, en HTML y CSS (sin imagen), para que se adapte al tema claro y oscuro.
4. **Estilos** (`src/styles/sections.css`): borrar `.vg-steps`, `.vg-data` grande y `.vg-module`; agregar la franja de tipos de estrés, la fila compacta de datos y el layout de dos columnas de La mejora real.
5. **Header** (`src/components/Header.jsx`): menú El problema · La mejora · Para quién · Clientes · Contacto. Precios sale del menú; la página `/pricing` se mantiene.
6. **Lugar para video:** cada módulo con un contenedor de medios que hoy muestra el visual estático y mañana recibe el video, sin cambiar el layout.
7. **Verificación:**
   - `pnpm build` y `pnpm lint` sin errores.
   - Capturas en escritorio y celular, en tema claro y oscuro.
   - Búsqueda en `src/` sin "Inteligencia Artificial", "IA" fuera de "VigIA" ni "Herbicidas".
   - Alto de la página cerca del objetivo.

---

## Animaciones y video

Segunda etapa. Sólo para los tres módulos principales: **Mitigación de Estrés**, **El problema que resuelve** y **La mejora real**. Cada uno tiene **un** elemento en movimiento, corto, que suma a la información sin explicarla toda.

### Criterio 1: animación en código + video

| Qué se muestra | Con qué | Por qué |
|---|---|---|
| La interfaz del sistema (gráfico, alertas, celular) | **Animación en código** (SVG/CSS en la página) | Se ve nítida en cualquier pantalla, sigue al tema claro u oscuro, casi no pesa y un texto se corrige en minutos. |
| El campo real (cultivo, suelo, aplicación, riego) | **Video generado** (Higgsfield u otra herramienta) | Aporta el contexto emocional que una interfaz no transmite. |

Así, Higgsfield se usa sólo en dos clips (problema y resolución). El gráfico y el celular no dependen de los videos y se pueden hacer ya.

### Criterio 2: el mismo lote cuenta una historia

Los tres módulos muestran **el mismo lote** (por ejemplo, soja en la llanura pampeana, luz de atardecer):

| Módulo | Capítulo de la historia |
|---|---|
| 1. Mitigación de Estrés | **VigIA vigila el lote:** entran los datos y aparece la alerta antes del estrés. |
| 2. El problema que resuelve | **El lote sin VigIA:** nadie avisa y el estrés se ve cuando ya es tarde. |
| 3. La mejora real | **El lote con VigIA:** llega el aviso, se actúa a tiempo y el lote se salva. |

Para que el lote se vea igual en los clips generados, primero se genera **una imagen fija del lote** y se usa como base de todos los videos.

### 1. Mitigación de Estrés — gráfico animado (código)

Loop de 6-7 s sobre el gráfico de balance hídrico que ya existe (`BalanceChart.astro`). Muestra la función del sistema en una pasada: datos → balance → alerta.

| Tiempo | Qué pasa |
|---|---|
| 0–1,5 s | Aparecen los datos que usa VigIA alrededor del gráfico, uno tras otro: temperatura 34 °C · HR 25 % · DPV 3,2 kPa · lluvia 12 mm. |
| 1,5–3 s | La línea de agua útil se dibuja día a día; con la lluvia suben las barras y la línea sube un poco. |
| 3–4,5 s | Llega a "Hoy", se aclara la zona de pronóstico y la línea punteada sigue hasta cruzar el umbral. |
| 4,5–5,5 s | El punto del cruce late y la tarjeta "Estrés hídrico moderado en 4 días" sube desde abajo. |
| 5,5–7 s | Pausa para leer y vuelve a empezar. |

**Variante (opcional):** de fondo, un clip lento del lote visto desde arriba, con la tarjeta del gráfico flotando encima. Más vistoso, pero pesa más y compite con el texto.

### 2. El problema que resuelve — gráfico sin VigIA + video (código + video)

Combina las dos cosas en el mismo espacio y en secuencia: **el gráfico lo muestra, el campo lo confirma.**

1. **Gráfico sin VigIA (código, ~6,5 s, `ProblemChart.astro`):** el mismo lote del módulo 1 pero sin pronóstico ni alerta. La línea cruza el umbral en silencio, el área bajo el umbral se pinta de rojo ("Rinde perdido") y aparece "Lo ves a campo · +6 días" con la tarjeta "Sin aviso".
2. **Video del lote (Higgsfield, 5-6 s):** la animación se funde al clip.
3. Al terminar el video vuelve a empezar el gráfico. Mientras no haya video, el gráfico se repite solo.

Clip de 5-6 s generado:

| Tiempo | Qué pasa |
|---|---|
| 0–2 s | El lote verde; todo parece normal. Sol fuerte, calor visible en el aire. |
| 2–4 s | Timelapse: las hojas se enrollan y el suelo se agrieta. |
| 4–6 s | Primer plano de una mano que toca una planta marchita: se llegó tarde. |

Al repetir el gráfico del inicio pero sin VigIA, el contraste entre los módulos 1 y 2 refuerza la historia del mismo lote.

### 3. La mejora real — alerta y resolución (código + video)

Unos 8 s en total:

| Tiempo | Con qué | Qué pasa |
|---|---|---|
| 0–3 s | Código | El celular de la sección (`WhatsAppMock.astro`): aparece "escribiendo…", llega el mensaje de VigIA y se marca "Ver detalle en la plataforma". |
| 3–6 s | Video | La resolución: una pulverizadora aplicando al amanecer o un pivote de riego que arranca. Genérico, sin marcas ni etiquetas de productos. |
| 6–8 s | Video | El mismo lote del módulo 2, ahora verde y sano. |

**Detalle en código (opcional):** al terminar, la alerta pasa de "Alerta" a "Resuelta ✓" y la línea del balance sube por encima del umbral después del riego, como espejo del gráfico del inicio.

### Reglas para los tres

- **Duración:** 5-8 s cada uno, en loop y sin sonido.
- **Un mensaje por módulo:** qué hace (1), qué pasa si no lo usás (2), cómo te salva (3). El video no explica todo el flujo de la plataforma; los detalles están en los textos.
- **Sin texto dentro del video.** Los textos van en HTML, por accesibilidad, traducción y SEO.
- **Misma estética:** luz de atardecer, verdes de la paleta de VigIA, movimientos de cámara lentos, sin cortes rápidos.
- **Qué evitar:**
  - drones o satélites "escaneando" el campo, o pantallas tipo HUD: VigIA no usa imágenes satelitales y transmite la idea de "IA" que se excluye;
  - robots, cerebros digitales o cualquier estética de inteligencia artificial;
  - marcas o etiquetas de productos.
- **Herramientas:** usar IA para producir el video no contradice la regla de contenido; lo que no se dice es que el producto usa IA.

### Requisitos técnicos

- `<video autoplay muted loop playsinline>` con `poster` (imagen de la primera escena), formatos **WebM + MP4**, y carga diferida para los videos que no están arriba de todo.
- Tamaño objetivo: menos de 2-4 MB por clip; 720p alcanza.
- Con `prefers-reduced-motion`, las animaciones en código quedan en su estado final y los videos muestran el `poster`.
- Ojo con GitHub Pages: el build se commitea en `docs/`, así que cada versión de un video queda en el historial del repo para siempre. Si los videos van a cambiar seguido, conviene alojarlos fuera del repo (por ejemplo, en un CDN o en un bucket) y referenciarlos por URL.

### Implementación

**Hecho:** las tres animaciones en código y el mecanismo que pasa de la animación al video.

- `MediaStory.astro`: corre la animación del módulo y, si hay video, se funde a él; al terminar vuelve a empezar. Sólo corre mientras el módulo está a la vista. Con movimiento reducido o sin JS se ve el estado final, sin video.
- `BalanceChart.astro` (módulo 1), `ProblemChart.astro` (módulo 2) y `WhatsAppMock.astro` (módulo 3): las animaciones, en CSS.
- `src/data/balanceEjemplo.js`: la serie de agua útil compartida, para que los módulos 1 y 2 muestren el mismo lote.

**Pendiente:** generar los clips y cargarlos.

1. Generar la imagen base del lote y los dos clips (problema y resolución).
2. Copiarlos a `public/videos/` (o subirlos a un CDN).
3. Completar `problema` y `resolucion` en `src/data/videos.js`. No hace falta tocar nada más: en `pnpm dev` cada módulo muestra una nota mientras su video falte.

## Decisiones

| # | Tema | Decisión |
|---|---|---|
| 1 | Nombre visible | **VigIA**, por ahora sin "BioEstrés". |
| 2 | WhatsApp en el lanzamiento | **Va a estar listo cuando se publique la landing.** Se presenta como funcionalidad disponible, sin "Próximamente". |
| 3 | Sección "De la siembra a la decisión" | **Se elimina**, para que la página no quede larga. |
| 4 | Logos del carrusel | **Se mantienen igual** que en la landing de Rinde Plus. |
| 5 | Precios en el menú | **Se saca del menú** mientras no haya precios definidos. La página `/pricing` sigue existiendo. |
| 6 | Para quién es | **Se agrega** una sección corta con tres perfiles: productores, asesores agronómicos y empresas o grupos. |
