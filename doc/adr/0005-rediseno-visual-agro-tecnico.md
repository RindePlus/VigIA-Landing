# ADR 0005 — Rediseño visual: agro técnico y sobrio

- **Estado:** Propuesto
- **Fecha:** 2026-10-18

## Contexto

La landing se leía como "hecha con IA". Una crítica con la skill `impeccable` (dos revisiones independientes: diseño y detector automático) lo confirmó: los gráficos y el celular de WhatsApp son propios del producto, pero lo que los rodea era el kit típico de una landing generada.

- **Paleta prestada:** los grises de GitHub (Primer), la paleta por defecto de Tailwind (con violetas e índigos sin usar), colores viejos tipo flat-UI y unos nueve acentos.
- **Tipografía genérica:** Geist, que el detector marca como sobreusada.
- **Recursos de plantilla:**
  - título del hero con degradé en el texto;
  - etiquetas en mayúsculas y en colores rotativos sobre cada título;
  - fondo pastel por etapas en el recorrido;
  - aparición con desenfoque en 32 elementos;
  - pulsos infinitos y nodos numerados en el hilo;
  - la frase destacada que se iluminaba palabra por palabra.
- **Fotos generadas con IA:** las cuatro fotos de "Lo que hace VigIA" repetían la misma escena (luz dorada, eucaliptos y dos silos).
- **Contraste:** varios textos no llegaban a AA, como las etiquetas lima y celeste, el texto blanco sobre el verde de WhatsApp y el gris tenue.

El detector encontró 22 hallazgos en la home (19 reales). El puntaje heurístico fue 24/36.

## Decisión

Un rediseño **sólo estético**: no cambian los textos, la información ni la estructura de secciones. La dirección es **agro técnico y sobrio**: que se sienta una herramienta agronómica seria, con los gráficos del producto como protagonistas.

1. **Paleta de campo con significado** (tokens en `src/styles/global.css`):
   - **Fondo:** color piedra (`#f3f2ee`), un gris apenas cálido. El crema que se probó primero el detector también lo marca como plantilla.
   - **Tinta y marca:** tinta verde casi negra y verde bosque como único color de marca.
   - **Colores con significado:** verde campo = cultivo a salvo, ámbar = alerta o umbral, rojo = pérdida, tierra = carbono y verde agua = el tramo del hilo de "Lo que hace VigIA".
   - **Lo que sale:** azules, celestes, lima, los tokens de GitHub, la paleta de Tailwind y los restos dorados de RindePlus en el header.
   - **Compatibilidad:** los nombres `--gh-*` se mantienen para no reescribir todo el CSS, pero sus valores ya no son los de GitHub.
2. **Tipografía:** IBM Plex Sans para títulos y texto. Chivo Mono sólo para datos (las cifras de Impacto y las tablas), con el cero liso y el separador de miles en la tipografía normal para que la cifra no se lea partida. Ninguna de las dos figura como sobreusada en el detector.
3. **Menos recursos de plantilla:**
   - el título del hero va en tinta sólida;
   - las etiquetas de sección se conservan, pero sobrias: texto chico en gris, sin mayúsculas, sin espaciado extra y sin colores por sección;
   - el fondo del recorrido es plano, y con eso termina la excepción provisoria del degradé;
   - el hilo tiene puntos sin número y sin pulso, anclados a los títulos;
   - la frase destacada queda fija;
   - sin animaciones infinitas.
4. **Movimiento:** las apariciones son sólo de opacidad y una subida corta, sin desenfoque, y sólo en grupos de contenido (listas, tarjetas, medios). Los títulos, las bajadas y el hero están de entrada.
5. **Fotos reales** de Wikimedia Commons, tres de ellas de lotes argentinos, en lugar de las generadas. Sus licencias Creative Commons piden atribución: los créditos van en una línea chica al pie, junto al copyright (`FOOTER.creditosFotos`).
6. **Accesibilidad:** todos los textos pasan AA en los dos temas. Los botones de WhatsApp llevan texto oscuro sobre el verde. El logo del botón flotante sigue blanco, como excepción de marca.
7. **Herramientas:**
   - `impeccable` para criticar y auditar, y su detector para verificar;
   - `playwright-cli` para ver la página renderizada (celular y escritorio, claro y oscuro) antes de dar un cambio por bueno.

## Consecuencias

- **Resultado verificado:** el detector baja de 22 hallazgos a 2, ambos falsos positivos (relleno de una lista con línea divisoria y de una sección cuyo margen lateral da su contenedor). Las capturas en celular y escritorio, en los dos temas, se ven coherentes.
- **Reglas actualizadas:** las reglas de diseño de `CLAUDE.md` pasan a esta paleta, esta tipografía y este movimiento. La decisión 49 de `doc/landing/ESTRUCTURA_LANDING.md` registra el detalle.
- **Las fotos ahora tienen una obligación:** si se reemplazan por otras con licencia de atribución, hay que actualizar sus créditos. Si en el futuro hay fotos propias de clientes, se quitan los créditos de Commons.
- **Siguen siendo generados con IA:** los videos de El problema y La solución, y sus posters.
- **Quedan propuestos, sin hacer:** variar la composición (por ejemplo, el gráfico de El problema a todo el ancho o el equipo como lista) y los arreglos de texto que señaló la crítica (el cierre y el CTA, el 96 % y el DPV). Los textos se tratan aparte con `vigia-landing-structure`.
