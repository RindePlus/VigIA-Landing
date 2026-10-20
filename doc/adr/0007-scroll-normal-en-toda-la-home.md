# ADR 0007 — Scroll normal en toda la home

- **Estado:** Propuesto
- **Fecha:** 2026-10-20
- **Reemplaza a:** [ADR 0006](0006-recorrido-de-pantalla-en-pantalla.md)

## Contexto

El [ADR 0006](0006-recorrido-de-pantalla-en-pantalla.md) llevó la home de pantalla en pantalla en escritorio y tablet acostada: un gesto, un paso, con un script propio (`SectionPager.astro`) que tomaba el control de la rueda, el trackpad, el teclado y el táctil.

Funcionaba, pero a un costo alto:

- **Cada panel tenía que entrar en una pantalla.** Eso obligó a tipografía que sigue al alto de la ventana (tokens `--fit-*`), a plegar el título de Impacto cuando se abre una tabla, a poner "Cómo lo hace" en el lugar de los canales de La solución (con dos rayas para cambiar entre los dos) y a ajustar el footer para que entrara junto a Preguntas.
- **El script era sensible a cada dispositivo.** Cada ajuste del trackpad (inercia, gestos seguidos, movimientos largos) pedía otra ronda de pruebas.
- **Había dos páginas que mantener.** El celular y las pantallas verticales seguían con scroll normal, con sus propios fondos y su propio orden.

## Decisión

La home vuelve al scroll normal del navegador en todas las pantallas. Se quita `SectionPager.astro` y todo lo que existía sólo por él:

- los atributos `data-pantalla`, `data-pasos` y `data-paso`;
- los dos estados de La solución: "Cómo lo hace" pasa debajo de las dos columnas, con los tres pasos en fila (en celular, uno debajo del otro);
- la flecha que respiraba al pie de la frase.

Lo que sí se conserva es el tamaño: en pantallas horizontales cada sección sigue ocupando más o menos una pantalla, con el contenido centrado debajo del header y los tamaños según el alto de la ventana (clase `.vg-pantalla`, tokens `--fit-*` y `--panel-pad-*`). Si una sección no entra, crece; el scroll no se detiene en ninguna. Preguntas comparte la última pantalla con el footer, e Impacto sigue plegando su título al abrir una tabla (y se alinea arriba), para que indicadores y tabla entren juntos.

Escritorio toma lo que ya tenía el celular:

- los fondos a línea que unen secciones (lotes de El problema a Lo que hace VigIA, pivotes sobre el borde con La solución), a escala 1:1 en todas las pantallas;
- la frase en casi una pantalla.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Seguir ajustando el paginador | Cada mejora sumaba casos y reglas de diseño que sólo existían para que un panel entrara en una pantalla. |
| `scroll-snap` de CSS | Es más liviano, pero sigue imponiendo que cada sección entre en una pantalla, y con la inercia del trackpad puede saltear secciones (ver ADR 0006). |

## Consecuencias

- **Una sola página** para celular y escritorio: mismo orden, mismos fondos, menos CSS y sin el script del paginador.
- **Cada sección se sigue leyendo como una pantalla,** pero sin trabar el scroll: si una no entra (pantallas bajas, preguntas abiertas), simplemente crece.
- **Se pierde el momento propio de cada panel** y el cambio de La solución en dos estados. El hilo de la izquierda sigue uniendo el relato.
- `DESIGN.md`, `CLAUDE.md` y la decisión 57 de [`ESTRUCTURA_LANDING.md`](../landing/ESTRUCTURA_LANDING.md) se actualizan con esto.
