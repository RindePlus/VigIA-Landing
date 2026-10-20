# ADR 0006 — Recorrido de pantalla en pantalla

- **Estado:** Propuesto
- **Fecha:** 2026-10-19

## Contexto

La primera parte de la landing es un relato: el hero, El problema, Lo que hace VigIA, La solución, la frase destacada e Impacto. Un hilo a la izquierda los une, y el diseño de cada uno (gráfico, video, celular de WhatsApp) está pensado para verse entero.

Con el scroll libre, ese relato se leía a pedazos. Un panel quedaba cortado entre dos pantallas, la inercia del trackpad pasaba de largo dos secciones y el cambio de La solución (los canales y después "Cómo lo hace") no tenía un momento propio.

La decisión 50 de [`ESTRUCTURA_LANDING.md`](../landing/ESTRUCTURA_LANDING.md) introdujo el paso de pantalla en pantalla. Después se ajustó con el uso, sobre todo con trackpad, hasta llegar a un movimiento que funciona bien. Tomar el control del scroll es una decisión discutible, así que este ADR deja escrito por qué se hizo y cuál es el movimiento que hay que conservar.

## Decisión

En pantallas horizontales de al menos 900 × 560 px (escritorio y tablet acostada), cada panel del relato ocupa una pantalla y el scroll avanza de a un panel. La lógica está en [`SectionPager.astro`](../../src/components/SectionPager.astro); los paneles se marcan con `data-pantalla`.

El movimiento general:

1. **Un gesto, un paso, en las dos direcciones.** Cada gesto de rueda, trackpad, teclado o deslizamiento lleva al panel siguiente o al anterior. El resto del gesto (la inercia del trackpad) se descarta: nunca se pasan dos paneles con un solo envión, por rápido que sea. Lo que cuenta es la distancia, no la velocidad: un movimiento largo sin soltar (trackpad o táctil) sí puede pasar más de uno. Subir funciona igual que bajar.
2. **Un paso es una animación completa.** El panel llega entero y alineado, con una curva que arranca y llega suave. La página nunca queda a medio camino entre dos paneles: si algo la deja ahí, se acomoda en el más cercano.
3. **Un gesto nuevo se reconoce aunque siga la inercia del anterior.** La inercia sólo pierde fuerza; un repunte claro es otro gesto. Si llega mientras se anima un paso, queda en cola y el paso siguiente arranca apenas termina.
4. **Los tiempos acompañan el relato.** Los pasos son ágiles (alrededor de medio segundo). La primera transición es algo más lenta, para presentar el estilo, y la llegada a la frase, más lenta todavía, para ver llegar el hilo.
5. **Un panel puede tener estados.** La solución muestra primero los canales y, con el siguiente gesto, "Cómo lo hace" en el mismo lugar (`data-pasos`, `data-paso`). Dos rayas al pie indican en cuál de los dos estados se está.
6. **La página tiene un borde claro.** El paso de pantalla en pantalla sigue después del relato (Impacto, Sobre nosotros) hasta Preguntas, el último panel, que comparte la pantalla con el footer; si no entran juntos, desde ahí el scroll es normal. Con una tabla abierta, Impacto pliega su título para entrar en la pantalla; si igual no entra, se ve entero antes de pasar al siguiente. Al volver desde abajo, la página se frena en Preguntas y hace falta otro gesto para volver a Sobre nosotros.
7. **No actúa cuando no corresponde.** Sin JS, en celular, en pantallas verticales o con `prefers-reduced-motion`, la página se scrollea como siempre y todo el contenido se ve. Tampoco interfiere con los saltos del menú ni con la barra de scroll.

Los tiempos exactos y los umbrales viven como constantes comentadas al principio del script. Se pueden ajustar sin cambiar esta decisión.

## Alternativas descartadas

| Opción | Por qué no |
|---|---|
| Scroll libre | Es lo que había: paneles cortados, inercia que salteaba secciones y el cambio de La solución sin momento propio. |
| `scroll-snap` de CSS | Alinea los paneles, pero no garantiza un gesto = un paso: con la inercia del trackpad el navegador puede saltear paneles. Tampoco permite un panel con dos estados ni elegir la duración de cada paso. |
| Una librería de pantalla completa (fullPage.js y similares) | Suma dependencia y peso para algo que se resuelve en un script chico, y obliga a reestructurar el markup alrededor de la librería. |
| Animaciones atadas al avance del scroll | Se probaron y se descartaron: pasaban en el borde de la pantalla, no donde se lee (ver `DESIGN.md`). |

## Consecuencias

- **El relato se lee como se diseñó:** cada panel entero, de a uno, y La solución con sus dos momentos.
- **Se pierde el scroll libre en esa parte de la página.** Por eso está limitado a pantallas horizontales y respeta el movimiento reducido. Celular queda con scroll normal hasta que se decida otra cosa.
- **Hay más JS que mantener,** y es sensible a cómo cada dispositivo manda los eventos de rueda. Cualquier cambio se prueba con trackpad (gestos cortos, largos y seguidos) y con rueda de mouse, subiendo y bajando.
- **Los paneles tienen que entrar en una pantalla.** Los tamaños siguen al alto de la ventana (tokens `--fit-*`). Un panel nuevo del relato lleva `data-pantalla` y se diseña para ese alto.
- **El detalle de diseño** (tiempos, rayas, freno en Preguntas) está en `DESIGN.md` y en las decisiones 50 y 51 de `ESTRUCTURA_LANDING.md`.
