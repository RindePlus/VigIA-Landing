# ADR 0009 — Sólo el hero ocupa una pantalla

- **Estado:** Propuesto
- **Fecha:** 2026-10-21
- **Reemplaza en parte a:** [ADR 0007](0007-scroll-normal-en-toda-la-home.md) (el alto de las secciones; el scroll normal sigue)

## Contexto

El [ADR 0007](0007-scroll-normal-en-toda-la-home.md) quitó el paso de pantalla en pantalla pero conservó el tamaño: en pantallas horizontales cada sección de la home ocupaba más o menos una pantalla (clase `.vg-pantalla`), con el contenido centrado.

En una notebook de 14" se veía bien, porque el contenido de cada sección llena casi toda la pantalla. En monitores más grandes (1920 × 1080, 2560 × 1440) el contenido no crece al mismo ritmo que el alto de la ventana, y entre una sección y la siguiente quedaba mucho aire vacío.

Para que cada sección entrara en una pantalla, además, hacía falta CSS y JS que sólo existía por eso: tipografía según el alto de la ventana, márgenes automáticos en Lo que hace VigIA, el pliegue del título de Impacto al abrir una tabla (con el scroll que alineaba la sección arriba) y la medición del footer para que Preguntas compartiera la última pantalla con él.

## Decisión

- **Sólo el hero ocupa una pantalla** en horizontal, y arranca debajo del header (`--hero-pad-top`), que arriba de todo siempre está a la vista. El alto tiene un tope de 880 px (`--alto-pantalla`): en monitores más altos el contenido del hero dejaba mucho espacio vacío arriba y abajo.
- **Impacto no ocupa una pantalla, pero tiene un alto fijo** (el que ocupa con la tabla más alta abierta) **y conserva el pliegue del título** al abrir una tabla: el título y la bajada se pliegan, la sección no crece y el scroll no se mueve, así indicadores y tabla se leen enteros sin bajar.
- Las demás secciones, incluida la frase destacada, miden lo que su contenido. La frase lleva abajo el mismo aire que la separa de la sección de arriba (el padding de esa sección más el propio), así queda a igual distancia de las dos.
- **El carrusel de clientes pasa al pie del hero** y comparte esa pantalla: el texto y el gráfico se centran en el alto que deja el carrusel (token `--alto-carrusel`), y el gráfico descuenta ese alto para no empujarlo fuera de la pantalla. Sigue sin título a la vista ("Confían en nosotros" es el nombre accesible).
- **El hilo pasa por debajo del carrusel.** `JourneyThread` lo dibuja como un túnel: la línea llega al fondo de un semicírculo abierto hacia arriba (∪), arriba de la franja de cada elemento con `data-vg-under`, y sale de la punta de otro abierto hacia abajo (∩), abajo de la franja; una máscara esconde el trazo y el punteado entre los dos. Los arcos son chicos y ovalados, se centran en la línea a su altura (la línea ondula) y van del gris del punteado, tenues, sin cambiar cuando la línea pasa. Los puntos del hilo no se enmascaran.
- **Pantallas anchas** (por ancho de la ventana, no por resolución: el escalado de Windows cambia el ancho que recibe la página). Desde 1800 px el contenido pasa de 1160 a 1320 px (`--ancho-contenido`, que comparten secciones, header y footer; `--ancho-tarjetas` y `--ancho-impacto` acompañan) y el tamaño base del texto a 17 px; desde 2300 px, a 18 px. El texto está en `rem` y los espaciados en `px`: crece el texto sin inflar los márgenes. El logo y los íconos del header, que están en `px`, crecen en los mismos escalones. El título del hero tiene un tope de 3.75rem (`--fit-hero`) para no pasar de unas 3,3 veces la bajada. Las notebooks (hasta ~1536 px de ancho y ~880 px de alto) no cambian.
- Se quita lo que existía sólo para que cada sección entrara en una pantalla: la tipografía `--fit-*` fuera del hero (y el token `--fit-headline`), el alto de Preguntas atado al footer (y el script de `Footer.astro` que lo medía) y el alto casi de pantalla de la frase.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Mantener `.vg-pantalla` en todas las secciones, con un tope de alto (`min-height: min(100svh, 900px)`) | Achica el problema pero no lo quita: el aire sigue dependiendo de la pantalla, y el CSS de "que entre en una pantalla" sigue haciendo falta. El tope sí se usa en el hero, que es la única sección de una pantalla. |
| Tope del hero de 1080 px sólo en pantallas de 1200 px de alto o más | En 1920 × 1080 seguía quedando mucho aire arriba del contenido. Un tope único de 880 px cubre todos los tamaños. |
| Ensanchar el contenido a 1440 px desde 2300 px de ancho | Con la columna más ancha el título del hero entra en menos renglones, el hero queda más bajo y deja más aire, no menos. |
| Escalar el texto con el ancho de la ventana (`vw`) en vez de escalones | Cambia el tamaño en cada píxel de ancho, también en notebooks; los escalones dejan la notebook igual y son fáciles de razonar. |
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
- Cada cambio de alto o de espaciado del hero se revisa en varios tamaños, porque el hero depende del alto de la ventana: como mínimo 1366 × 768 (notebook), 1920 × 1080, 2560 × 1440 y 390 × 844 (celular), midiendo el aire entre el header y el contenido y entre el contenido y el carrusel. En el modo de dispositivo de Chrome alcanza para ver proporciones; el tamaño físico del texto sólo se juzga en un monitor real.
- `DESIGN.md`, `CLAUDE.md`, la skill `vigia-landing-structure` y la decisión 59 de [`ESTRUCTURA_LANDING.md`](../landing/ESTRUCTURA_LANDING.md) se actualizan con esto.
