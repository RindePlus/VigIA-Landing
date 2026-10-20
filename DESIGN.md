---
name: VigIA BioEstrés
description: Landing agro técnica y sobria de alertas de estrés hídrico y térmico por ambiente.
colors:
  canvas: "#f3f2ee"
  surface: "#fbfaf8"
  surface-2: "#e9e7e1"
  border: "#d8d5cd"
  border-muted: "#e4e1da"
  border-strong: "#b1ada3"
  ink: "#17211d"
  ink-muted: "#424c46"
  ink-subtle: "#525b55"
  forest: "#0e3b36"
  accent: "#1d5a49"
  accent-soft: "#e2ebe4"
  campo: "#3b6e25"
  agua: "#2a6f73"
  alerta: "#8a5300"
  perdida: "#b3261e"
  carbono: "#7a4b26"
  pronostico: "#ebe5d7"
  whatsapp: "#25d366"
  whatsapp-ink: "#0b2e13"
  on-forest-fg: "#ece8df"
  on-forest-muted: "#b4d4c1"
  on-forest-subtle: "#9fc2ad"
  on-forest-accent: "#8cc2a9"
  wa-bubble: "#ffffff"
  wa-meta: "#667781"
  mask: "#000000"
  dark-canvas: "#181818"
  dark-surface: "#1f1f1f"
  dark-ink: "#ece8df"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: "2.5rem"
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  label:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: "1.5rem"
  data:
    fontFamily: "Chivo Mono, ui-monospace, monospace"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  sm: "6px"
  btn: "8px"
  card: "12px"
  chart: "16px"
  wa-bubble: "10px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
  button-cta-closing:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.forest}"
    rounded: "{rounded.btn}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.whatsapp-ink}"
    rounded: "{rounded.btn}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
---

# Design System: VigIA BioEstrés

> Fuente normativa: los tokens de [`src/styles/global.css`](src/styles/global.css). Este archivo los resume para la skill `impeccable` y para quien diseñe. Las reglas del repo están en `CLAUDE.md` ("Diseño — sistema visual") y el porqué en el [ADR 0005](doc/adr/0005-rediseno-visual-agro-tecnico.md). Si un valor de acá no coincide con `global.css`, manda `global.css`; actualizá este archivo.

## Overview

**Creative North Star: "El informe técnico del lote"**

La página se lee como un buen informe agronómico: papel neutro, tinta oscura, datos precisos y color sólo donde significa algo. La personalidad viene del dominio (agua útil, umbral, ambiente, campaña), no de efectos. Los protagonistas son los gráficos en código (el balance hídrico con su umbral y su pronóstico) y el aviso de WhatsApp: el diseño los deja hablar.

Es sobrio y de densidad media. El movimiento acompaña y explica, sin decorar. Se rechazan, por decisión explícita, los recursos de landing generada:
- títulos con degradé;
- etiquetas en mayúsculas de colores;
- fondos por etapas;
- desenfoques al aparecer;
- pulsos infinitos;
- paletas de librería y fotos generadas repetidas.

**Key Characteristics:**
- Fondo piedra, tinta verde casi negra, un solo verde de marca.
- El color es semántico: verde = a salvo, ámbar = alerta, rojo = pérdida.
- Cifras en tipografía de datos; todo lo demás en IBM Plex Sans.
- Contraste alto pensado para el celular a pleno sol.

## Colors

Una paleta de campo: neutros de piedra y tinta, y acentos que nombran lo que representan.

### Primary
- **Verde bosque** (#0e3b36): la marca. Títulos de sección, fondo de Impacto y la frase destacada. En oscuro, como texto pasa a blanco cálido y como fondo a #11211d.

### Secondary
- **Verde campo** (#3b6e25): el cultivo a salvo. Línea de agua útil, hilo del recorrido, íconos, grano recuperado y palabra "antes" de la frase.
- **Verde agua** (#2a6f73): sólo el tramo del hilo de "Lo que hace VigIA".
- **Acento de interacción** (#1d5a49): enlaces, foco y hover.

### Tertiary
- **Ámbar alerta** (#8a5300): umbral del cultivo y alertas.
- **Rojo pérdida** (#b3261e): rinde perdido y "después del daño".
- **Tierra** (#7a4b26): carbono en el suelo.

### Neutral
- **Piedra** (#f3f2ee): fondo de la página.
- **Superficie** (#fbfaf8): tarjetas, gráficos y paneles.
- **Tinta** (#17211d): texto principal y botón del hero.
- **Tinta suave** (#424c46): bajadas, textos de tarjetas y etiquetas de sección (8:1 sobre el fondo).
- **Tinta tenue** (#525b55): encabezados de tabla, copyright y créditos (6,3:1).
- **Bordes** (#d8d5cd, #e4e1da, #b1ada3): tarjetas, divisores y el trazo punteado del hilo.

- **Sobre la banda verde** (Impacto): texto #ece8df y secundarios teñidos de verde (#b4d4c1, #9fc2ad), no grises neutros.
- **Celular de WhatsApp** (`WhatsAppMock.astro`): copia los colores de la app real (globo #ffffff, metadatos #667781, barras, fondo). Es una réplica del producto, no parte de la paleta: no se reutilizan en otros componentes.
- **Máscaras** (#000000): sólo como canal de opacidad en `mask-image` (lote del hero, carrusel de logos), nunca como color visible.

### Named Rules
**The Meaning Rule.** Cada color dice algo: verde a salvo, ámbar alerta, rojo pérdida, tierra carbono. Un color sin significado no entra. Nada de azules, celestes, lima ni violetas.

**The No Cream Rule.** El fondo es piedra, un gris apenas cálido. El crema o beige se lee como plantilla generada.

## Typography

- **Display y cuerpo:** IBM Plex Sans (`--font-heading`, `--font-body`).
- **Carga:** las dos fuentes están alojadas en el sitio (`public/fonts/`, `@font-face` en `global.css`), variables y sólo con latin y latin-ext; IBM Plex Sans latin se precarga. Sin Google Fonts: bloqueaba el primer render en celular.
- **Datos:** Chivo Mono (`--font-data`, clase `.vg-data`).

**Character:** una sans técnica y legible, de informe, con una monoespaciada de cero liso sólo para medidas. No se usa Geist, Inter ni Space Grotesk: el detector de Impeccable las marca como sobreusadas.

### Hierarchy
- **Display** (600, 3rem en escritorio / 2.25rem en celular, tracking -0.025em): el título del hero, en tinta sólida.
- **Headline** (600, 2.25rem / 1.875rem, tracking -0.02em): títulos de sección, en verde bosque.
- **Lead** (400, 1.125rem): bajadas, en tinta suave, hasta 640 px de ancho.
- **Body** (400, 1rem / 1.5rem): texto corrido.
- **Label** (500, 1rem): etiquetas de sección. En gris, sin mayúsculas y sin tracking.
- **Data** (Chivo Mono 500, 3rem, tracking -0.04em): cifras de Impacto. Las tablas usan Chivo Mono en tamaño de texto.

### Named Rules
**The Narrow Separator Rule.** En las cifras en mono, el punto o la coma de miles van en IBM Plex Sans (`.vg-sep`), así "20.000" no se lee "20 . 000".

**The Solid Ink Rule.** Ningún texto con degradé. El énfasis se da con el tamaño o el peso.

## Layout

- **Contenedor:** hasta 1160 px (`.vg-wrap`), con un margen lateral único (`--page-gutter`): 24 px en pantallas anchas, 64 px por debajo de 1260 px (deja lugar al hilo) y 16 px en celular.
- **Secciones:** 96 px de aire vertical; las compactas, 64 px.
- **Espaciado:** sólo los pasos de `--space-*` (2 a 96 px).
- **Recorrido:** el hero, El problema, Lo que hace VigIA y La solución forman un recorrido unido por el hilo a la izquierda. Las primeras van en dos columnas, texto a la izquierda y medio a la derecha, y en celular pasan a una columna.
- **Scroll normal en todas las pantallas** ([ADR 0007](doc/adr/0007-scroll-normal-en-toda-la-home.md)): el paso de pantalla en pantalla se quitó. Celular y escritorio son la misma página. En pantallas horizontales de al menos 900 × 560 px, cada sección ocupa más o menos una pantalla, con el contenido centrado y el mismo aire arriba y abajo, y los tamaños según el alto de la ventana (`.vg-pantalla`, tokens `--fit-*` y `--panel-pad-*`); si no entra, crece. En las secciones de dos columnas, el título arranca a la altura del gráfico o del video. Preguntas comparte la última pantalla con el footer (Footer.astro mide su alto, `--alto-footer`). En Impacto, al abrir una tabla el título y la bajada se pliegan, los indicadores suben y la sección se alinea arriba, para que indicadores y tabla entren en la pantalla; al cerrarla, vuelve el título.
- **La solución:** título, bajada y canales a la izquierda y el WhatsApp a la derecha; debajo, a todo el ancho, "Cómo lo hace": tres pasos en fila unidos por una línea que se dibuja de izquierda a derecha (en celular, uno debajo del otro, con la línea bajando).
- **Llegada a la frase:** el tramo final del hilo va más rápido, así llega al punto cuando éste está a dos tercios de la pantalla, antes de que asome Impacto. Al llegar, justo antes de "antes", un trazo verde campo recorre la palabra de izquierda a derecha, con el impulso del hilo, y se va por la derecha (1,8 s).
- **Fondos (decisiones 50 y 57):**
  - El problema y La solución, sobre el fondo de la página, como el resto del recorrido (se probaron una banda de tierra para El problema y un verde claro para La solución, y se descartaron);
  - dibujos a línea de fondo que unen las secciones: lotes grandes, algunos divididos en ambientes (`LotesConexion.astro`), desde la mitad de El problema hasta el comienzo de Lo que hace VigIA; pivotes de riego vistos desde arriba (`Pivotes.astro`), grandes y del lado derecho, desde el borde entre Lo que hace VigIA y La solución hasta cerca del final de La solución, desvanecidos antes de la frase; en dos copias alineadas al borde para quedar detrás del texto de las dos. A escala 1:1 (los lotes, más anchos que cualquier pantalla y recortados al centro; los pivotes, en una franja de 900 px pegada al borde derecho). Cada uno con el color de su tramo del hilo (verde agua, verde campo) muy mezclado con el fondo, y tenues detrás del texto; en oscuro, monocromos, en un gris claro apenas visible (`.vg-fondo-linea`). La frase e Impacto van sin dibujo: la frase es el momento de foco y el verde liso de Impacto se ve más serio;
  - la frase ocupa casi una pantalla, centrada;
  - el resto del recorrido, sobre el fondo de la página, con un lote sembrado dibujado a línea detrás del hero (`FieldRows.astro`): surcos en perspectiva hacia un punto de fuga al centro, cortina de árboles, lomas, y a la derecha un molino y un alambrado. Tenue, desvanecido arriba y al pie, y al 40 % detrás del texto;
  - Impacto, en una banda verde bosque;
  - equipo y clientes juntos (el carrusel, sin título, debajo de las tarjetas), sobre el fondo piedra de la página, con las tarjetas blancas (decisión 53: el salvia que tenían chocaba con ellas);
  - preguntas frecuentes, con el CTA de cierre, sobre la superficie (un tono más claro que la página);
  - el footer, verde bosque como Impacto, compacto.

  Todos planos, sin degradés.

## Elevation & Depth

Casi plano. La profundidad la dan las superficies (piedra contra superficie) y bordes finos. Las sombras son mínimas, para lo que flota de verdad: la notificación del gráfico, el panel de Impacto y el widget de WhatsApp.

### Shadow Vocabulary
- **Tarjeta** (`0 1px 3px rgba(23,33,29,.1), 0 1px 2px rgba(23,33,29,.05)`)
- **Flotante** (`0 8px 24px rgba(23,33,29,.12)`): notificaciones y paneles.

## Shapes

Radios moderados: 8 px en botones, 12 px en tarjetas y paneles, 16 px en el recuadro de los gráficos. Píldora (999 px) sólo en controles chicos del header; 10 px en el globo del celular de WhatsApp, como en la app. Las fotos de "Lo que hace VigIA" van dentro de su tarjeta de 12 px. No se usan píldoras salvo en controles chicos, ni bordes de color gruesos sobre tarjetas redondeadas.

## Components

### Buttons
- **Hero:** tinta sobre papel (negro en claro, blanco cálido en oscuro), 8 px de radio. La flecha se corre 4 px al pasar el mouse.
- **Cierre:** el mismo botón del hero, en la columna del título de Preguntas (los dos centrados en esa columna), poco debajo del título, con una línea chica arriba que sigue al título ("¿Te quedó alguna duda? Escribinos."). En una columna, debajo de las preguntas.
- **WhatsApp:** verde de WhatsApp con texto oscuro (#0b2e13): el blanco no llega a 3:1. El logo del botón flotante sigue blanco, como excepción de marca.

### Cards / Containers
Superficie #fbfaf8, borde de 1 px y 12 px de radio, sin sombra fuerte. En las tarjetas de "Lo que hace VigIA" (sin borde) la foto ocupa toda la tarjeta y el título y el texto van abajo, sobre una franja de la superficie translúcida con desenfoque; la línea entre foto y texto queda a la misma altura en todas (subgrid), con los títulos centrados en el renglón del más largo.

### Navigation
- **Header:** del ancho del contenido y transparente arriba de todo.
- **Al bajar:** fondo translúcido con desenfoque y una línea fina abajo. Se oculta al bajar un tramo sostenido (120 px) y vuelve con un gesto corto hacia arriba, deslizándose (0,5 s, curva de desaceleración larga). Arriba de todo (160 px) siempre se ve. Las secciones de una pantalla llevan el mismo aire arriba y abajo (40 px), sin reservar lugar para el header: el contenido queda centrado en la pantalla, con o sin él. Sobre las bandas verde bosque (Impacto y footer: `data-fondo-oscuro`) el fondo pasa a casi opaco, para que se lean logo y menú.
- **Menú:** "Cómo funciona" es un desplegable con Inicio, El problema, Lo que hace VigIA y La solución; Impacto, Nosotros, Contacto y Educación van sueltos. El desplegable se abre al dejar el cursor encima un momento (220 ms, no al pasar de largo), entra con fundido y una bajada corta, y sale más rápido. En celular, los tres van siempre a la vista, debajo del título.
- **Anclas del menú:** las secciones tienen `scroll-margin-top` del alto real del header (`--alto-header`, lo mide `Header.jsx`), así quedan justo debajo de él.

### Gráfico del balance (Signature Component)
- **Qué muestra:** agua útil (verde campo), umbral (ámbar punteado), zona de pronóstico (#ebe5d7) y "Hoy".
- **El aviso:** la notificación de WhatsApp cuelga de la línea punteada. Las alertas de los gráficos llevan el borde gris de la tarjeta: el color lo dan el ícono y el texto.
- **Animación:** la línea se dibuja una vez al aparecer. El de "sin VigIA" cruza el umbral y pinta el rinde perdido en rojo.

### Hilo del recorrido (Signature Component)
- **Recorrido:** una línea que se dibuja con el scroll a la izquierda de las secciones.
- **Color:** verde campo, ámbar y rojo, verde agua y otra vez verde campo.
- **Puntos:** sin número y sin pulso, anclados a los títulos. El hilo termina entrando en la frase destacada.

## Do's and Don'ts

### Do:
- **Do** usar los tokens de `global.css`, sin hex sueltos en los componentes.
- **Do** dar a cada color su significado (ver The Meaning Rule).
- **Do** animar sólo con opacidad y transform, con `var(--ease-fluid)`, una vez y en grupos de contenido. Siempre con alternativa para `prefers-reduced-motion`.
- **Do** verificar en celular y escritorio, claro y oscuro, con `playwright-cli` y el detector de `impeccable`.

### Don't:
- **Don't** usar degradés en el texto ni fondos por etapas.
- **Don't** poner etiquetas en mayúsculas con tracking ni colores distintos por sección.
- **Don't** usar desenfoque al aparecer, pulsos o animaciones infinitas.
- **Don't** atar animaciones al avance del scroll (que se dibujen mientras el elemento entra por el borde): se probó y se descartó, porque pasaban en el borde de la pantalla, no donde se lee. Tampoco se toma el control del scroll: el paso de pantalla en pantalla se probó y se quitó ([ADR 0007](doc/adr/0007-scroll-normal-en-toda-la-home.md)).
- **Don't** usar imágenes generadas que repitan la misma escena, ni inventar fotos de clientes.
