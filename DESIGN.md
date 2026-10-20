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
- **Verde bosque** (#0e3b36): la marca. Títulos de sección, fondo del cierre y la frase destacada. En oscuro, como texto pasa a blanco cálido y como fondo a #11211d.

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

### Named Rules
**The Meaning Rule.** Cada color dice algo: verde a salvo, ámbar alerta, rojo pérdida, tierra carbono. Un color sin significado no entra. Nada de azules, celestes, lima ni violetas.

**The No Cream Rule.** El fondo es piedra, un gris apenas cálido. El crema o beige se lee como plantilla generada.

## Typography

- **Display y cuerpo:** IBM Plex Sans (`--font-heading`, `--font-body`).
- **Datos:** Chivo Mono (`--font-data`, clase `.vg-data`).

**Character:** una sans técnica y legible, de informe, con una monoespaciada de cero liso sólo para medidas. No se usa Geist, Inter ni Space Grotesk: el detector de Impeccable las marca como sobreusadas.

### Hierarchy
- **Display** (600, 3rem en escritorio / 2.25rem en celular, tracking -0.025em): el título del hero, en tinta sólida.
- **Headline** (600, 2.25rem / 1.875rem, tracking -0.02em): títulos de sección, en verde bosque.
- **Lead** (400, 1.125rem): bajadas, en tinta suave, hasta 640 px de ancho.
- **Body** (400, 1rem / 1.5rem): texto corrido.
- **Label** (500, 1rem): etiquetas de sección y "Confían en nosotros". En gris, sin mayúsculas y sin tracking.
- **Data** (Chivo Mono 500, 3rem, tracking -0.04em): cifras de Impacto. Las tablas usan Chivo Mono en tamaño de texto.

### Named Rules
**The Narrow Separator Rule.** En las cifras en mono, el punto o la coma de miles van en IBM Plex Sans (`.vg-sep`), así "20.000" no se lee "20 . 000".

**The Solid Ink Rule.** Ningún texto con degradé. El énfasis se da con el tamaño o el peso.

## Layout

- **Contenedor:** hasta 1160 px (`.vg-wrap`), con un margen lateral único (`--page-gutter`): 24 px en pantallas anchas, 64 px por debajo de 1260 px (deja lugar al hilo) y 16 px en celular.
- **Secciones:** 96 px de aire vertical; las compactas, 64 px.
- **Espaciado:** sólo los pasos de `--space-*` (2 a 96 px).
- **Recorrido:** el hero, El problema, Lo que hace VigIA y La solución forman un recorrido unido por el hilo a la izquierda. Las primeras van en dos columnas, texto a la izquierda y medio a la derecha, y en celular pasan a una columna.

## Elevation & Depth

Casi plano. La profundidad la dan las superficies (piedra contra superficie) y bordes finos. Las sombras son mínimas, para lo que flota de verdad: la notificación del gráfico, el panel de Impacto y el widget de WhatsApp.

### Shadow Vocabulary
- **Tarjeta** (`0 1px 3px rgba(23,33,29,.1), 0 1px 2px rgba(23,33,29,.05)`)
- **Flotante** (`0 8px 24px rgba(23,33,29,.12)`): notificaciones y paneles.

## Shapes

Radios moderados: 8 px en botones, 12 px en tarjetas y paneles, 16 px en el recuadro de los gráficos. Las fotos van con las esquinas rectas. No se usan píldoras salvo en controles chicos, ni bordes de color gruesos sobre tarjetas redondeadas.

## Components

### Buttons
- **Hero:** tinta sobre papel (negro en claro, blanco cálido en oscuro), 8 px de radio. La flecha se corre 4 px al pasar el mouse.
- **Cierre:** superficie clara sobre el verde bosque.
- **WhatsApp:** verde de WhatsApp con texto oscuro (#0b2e13): el blanco no llega a 3:1. El logo del botón flotante sigue blanco, como excepción de marca.

### Cards / Containers
Superficie #fbfaf8, borde de 1 px y 12 px de radio, sin sombra fuerte. Las tarjetas de "Lo que hace VigIA" no llevan caja: foto 4:3 arriba, título y texto.

### Navigation
- **Header:** del ancho del contenido y transparente arriba de todo.
- **Al bajar:** fondo translúcido con desenfoque y una línea fina abajo. Se oculta al scrollear hacia abajo.

### Gráfico del balance (Signature Component)
- **Qué muestra:** agua útil (verde campo), umbral (ámbar punteado), zona de pronóstico (#ebe5d7) y "Hoy".
- **El aviso:** la notificación de WhatsApp cuelga de la línea punteada.
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
- **Don't** fijar secciones en pantalla ni alargar la página con animaciones de scroll. Ya se probó y se descartó: las animaciones ligadas al scroll pasaban en el borde de la pantalla, no donde se lee.
- **Don't** usar imágenes generadas que repitan la misma escena, ni inventar fotos de clientes.
