# ADR 0009 — Sólo el hero ocupa una pantalla

- **Estado:** Propuesto
- **Fecha:** 2026-10-21
- **Reemplaza en parte a:** [ADR 0007](0007-scroll-normal-en-toda-la-home.md) (el alto de las secciones; el scroll normal sigue)

## Contexto

El [ADR 0007](0007-scroll-normal-en-toda-la-home.md) quitó el paso de pantalla en pantalla pero conservó el tamaño: en pantallas horizontales cada sección de la home ocupaba más o menos una pantalla (clase `.vg-pantalla`), con el contenido centrado.

En una notebook de 14" se veía bien, porque el contenido de cada sección llena casi toda la pantalla. En monitores más grandes (1920 × 1080, 2560 × 1440) el contenido no crece al mismo ritmo que el alto de la ventana, y entre una sección y la siguiente quedaba mucho aire vacío.

Para que cada sección entrara en una pantalla, además, hacía falta CSS y JS que sólo existía por eso: tipografía según el alto de la ventana, márgenes automáticos en Lo que hace VigIA, el pliegue del título de Impacto al abrir una tabla (con el scroll que alineaba la sección arriba) y la medición del footer para que Preguntas compartiera la última pantalla con él.

## Decisión

- **Sólo el hero ocupa una pantalla** en horizontal, y arranca debajo del header (`--hero-pad-top`), que arriba de todo siempre está a la vista.
- **Impacto no ocupa una pantalla, pero tiene un alto fijo** (el que ocupa con la tabla más alta abierta) **y conserva el pliegue del título** al abrir una tabla: el título y la bajada se pliegan, la sección no crece y el scroll no se mueve, así indicadores y tabla se leen enteros sin bajar.
- Las demás secciones, incluida la frase destacada, miden lo que su contenido. La frase lleva abajo el doble de aire que arriba, para quedar a la misma distancia de la sección de arriba y de Impacto.
- **El carrusel de clientes pasa al pie del hero** y comparte esa pantalla: el texto y el gráfico se centran en el alto que deja el carrusel (token `--alto-carrusel`), y el gráfico descuenta ese alto para no empujarlo fuera de la pantalla. Sigue sin título a la vista ("Confían en nosotros" es el nombre accesible).
- **El hilo pasa por debajo del carrusel.** `JourneyThread` lo dibuja como un túnel: la línea llega al fondo de un semicírculo abierto hacia arriba (∪), arriba de la franja de cada elemento con `data-vg-under`, y sale de la punta de otro abierto hacia abajo (∩), abajo de la franja; una máscara esconde el trazo y el punteado entre los dos. Los arcos son chicos y ovalados, se centran en la línea a su altura (la línea ondula) y van del gris del punteado, tenues, sin cambiar cuando la línea pasa. Los puntos del hilo no se enmascaran.
- Se quita lo que existía sólo para que cada sección entrara en una pantalla: la tipografía `--fit-*` fuera del hero (y el token `--fit-headline`), el alto de Preguntas atado al footer (y el script de `Footer.astro` que lo medía) y el alto casi de pantalla de la frase.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Mantener `.vg-pantalla` con un tope de alto (`min-height: min(100svh, 900px)`) | Achica el problema pero no lo quita: el aire sigue dependiendo de la pantalla, y el CSS de "que entre en una pantalla" sigue haciendo falta. |
| Que el carrusel tape el hilo con un fondo propio | Sobre el fondo de líneas del hero, una franja opaca se ve como un parche. La máscara deja ver el fondo y sólo esconde la línea. |
| Desviar el hilo alrededor del carrusel | El carrusel ocupa todo el ancho: no hay por dónde rodearlo. |
| Desvanecer la línea con un degradé antes y después del carrusel | Fue la primera versión: se leía como que la línea se cortaba, no como que pasaba por debajo. Los arcos lo dicen con un dibujo. |
| Que Impacto mida lo que su contenido sin el pliegue del título | Con una tabla abierta había que bajar para leerla entera. |
| Que Impacto ocupe una pantalla entera | Con la tabla abierta quedaba mucho margen arriba y abajo. |

## Consecuencias

- La home se ve pareja en cualquier tamaño de pantalla, sin huecos que crecen con el monitor.
- El hero gana prueba social a la vista desde la primera pantalla (reemplaza la decisión 10 de `ESTRUCTURA_LANDING.md`).
- Menos CSS y JS: se van las reglas y los scripts que sólo servían para el ajuste a una pantalla.
- Se pierde la sensación de "una pantalla por capítulo" en escritorio; el hilo de la izquierda sigue uniendo el relato.
- `DESIGN.md`, `CLAUDE.md`, la skill `vigia-landing-structure` y la decisión 59 de [`ESTRUCTURA_LANDING.md`](../landing/ESTRUCTURA_LANDING.md) se actualizan con esto.
