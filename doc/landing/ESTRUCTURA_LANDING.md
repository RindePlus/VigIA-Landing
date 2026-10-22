# Estructura de la landing de VigIA BioEstrés

Plan de contenido de la home. Define qué secciones tiene la página, en qué orden, qué dice cada una y con qué medios. Lo que se afirma sale de [`MODULO_VIGIA.md`](MODULO_VIGIA.md) (sección 10). Lo visual lo resuelven `landing-page-design` (Parte B) y las traducciones de `CLAUDE.md`. La estructura y el copy los cuida la skill `vigia-landing-structure`.

**Estado:** versión 2, **implementada** en `src/views/HomePage.astro`, con los textos en `src/data/vigia.js` (español), `vigia.en.js` (inglés) y `vigia.pt.js` (portugués de Brasil). Quedan las [preguntas abiertas](#preguntas-abiertas) y los opcionales de video. Las secciones de abajo describen la página como está hoy; el registro de cambios está en [Decisiones](#decisiones).

**Qué cambió respecto de la versión 1** (al pasar a la v2; varias cosas cambiaron después, ver Decisiones):

- La marca pasa a ser **VigIA BioEstrés**.
- El hero se apoya en el resultado ("antes de que se convierta en pérdida") y no en el nombre del submódulo.
- "La mejora real" pasa a **Cómo funciona**, con tres pasos.
- Se suman **Frase destacada**, **Beneficios** y **Preguntas frecuentes**, que pide `landing-page-design`.
- **Para quién es** pasa a dos perfiles con más detalle.
- El cierre usa el titular y la oferta del copy nuevo: una demo de 20 minutos con los lotes del cliente.

## Reglas de contenido

- **No mencionar inteligencia artificial.** Ni "IA", ni "modelos", ni "algoritmos inteligentes". "VigIA" es sólo nombre de marca. El respaldo es agronómico: clima, DPV, balance hídrico, fenología y suelo.
- **Sólo lo que el producto hace.** Sin imágenes satelitales ni índices espectrales, sin estrés biótico (plagas, enfermedades), sin mapas, sin diagnóstico. La tabla de [MODULO_VIGIA §10.4](MODULO_VIGIA.md#104-el-copy-propuesto-punto-por-punto) dice qué se puede decir y cómo.
- **Marca:** **VigIA BioEstrés** en títulos, SEO y cierre; "VigIA" solo, dentro del texto corrido, cuando ya se nombró.
- **Herbicidas:** sólo el carry-over de herbicidas, debajo de las tarjetas de Lo que hace VigIA, como parte de VigIA (decisión 46).
- **Acciones genéricas:** "bioinsumo" o "riego", sin productos ni marcas.
- **Alertas en dos canales:** la plataforma y WhatsApp, presentado como disponible.
- **Sin números inventados.** Sólo los que salen del motor: 4 días, 14 días, 210 días. Nada de "reducí 30 % la pérdida".
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
Header ─ Producto ▾ (Inicio · El problema · Qué vigila · Cómo te avisa) · Impacto · Nosotros · Contacto · Educación (/educacion) · ES/EN/PT · [Ingresar]
│        (se oculta al bajar y vuelve al subir)
│        (Contacto lleva a #preguntas y queda marcado en Preguntas y el footer)
│  ┌─ recorrido (.vg-journey: fondo de la página + hilo) ─┐
├─ 1. Hero                 #inicio          · punto 1 · gráfico de balance (código); al pie, el carrusel de clientes #clientes
├─ 2. El problema          #problema        · punto 2 · gráfico sin aviso → video problema
├─ 3. Lo que hace VigIA    #que-hace        · punto 3 · cuatro tarjetas con foto + otros módulos
├─ 4. La solución          #como-funciona   · punto 4 · WhatsApp → video resolución; debajo, "Cómo lo hace"
│  └──────────────────────────────────────────────────────┘
├─ 5. Frase destacada      #frase           (tres renglones; "antes" se subraya al llegar el hilo)
├─ 6. Impacto              #impacto         (cuatro indicadores, tablas de grano y carbono)
├─ 7. Sobre nosotros       #nosotros        (personas con foto y logo)
├─ 8. Preguntas frecuentes #preguntas       (con el CTA de cierre en la columna del título)
└─ Footer                  #contacto
```

En pantallas horizontales (escritorio y tablet acostada) sólo el hero ocupa una pantalla (`.vg-pantalla`), y el carrusel de clientes queda justo debajo; las demás secciones miden lo que su contenido. El scroll es el normal del navegador (decisiones 57 y 59, [ADR 0007](../adr/0007-scroll-normal-en-toda-la-home.md) y [ADR 0009](../adr/0009-solo-el-hero-ocupa-una-pantalla.md)).

**Un solo CTA principal en toda la página:** **Contactanos para empezar a usar VigIA**. Abre WhatsApp con el mensaje "Hola, quiero empezar a usar VigIA BioEstrés". Va en el hero y en Preguntas frecuentes, con el mismo texto.

---

## 1. Hero (`#inicio`)

| Elemento | Contenido |
|---|---|
| Etiqueta | Sin etiqueta (decisión 50): "estrés hídrico y térmico" pasa a la bajada |
| Título (h1) | **Detectá el estrés antes de que se convierta en pérdida** |
| Bajada | VigIA BioEstrés sigue cada ambiente desde antes de la siembra y te avisa por WhatsApp días antes de que el estrés hídrico y térmico se vea a campo. Para productores y asesores que deciden con datos. (36 palabras: una sobre el máximo, aceptado para no perder el tipo de estrés). |
| Botón | Sólo **Contactanos para empezar a usar VigIA** (WhatsApp, con flecha), monocromo: negro en tema claro y blanco en oscuro (decisión 33). Va en la columna de texto, **debajo de la bajada** y alineado a la izquierda con el texto (decisión 47). Sin botón secundario (decisión 31). En celular y tablet (una columna) va debajo del gráfico: primero se ve lo que hace y después se pide la acción. |
| Visual | El gráfico termina a la altura del botón. `BalanceChart.astro`, simplificado: sólo la línea de agua útil, el umbral, "Hoy" y la zona de pronóstico (sin chips de datos, lluvia ni "Ejemplo ilustrativo"). La línea se dibuja y, justo antes de tocar el umbral, aparece la notificación, colgada de una línea punteada ámbar que sube desde el punto de **Hoy** (la alerta se envía hoy, cuando el pronóstico ya muestra el cruce; el punto ámbar del cruce es lo que se anticipa), con el logo de WhatsApp grande (el aviso llega por WhatsApp) y el texto **Alerta enviada · Estrés hídrico en 14 días**, y late el punto del cruce. El gráfico muestra 18 días de historia y los 14 del pronóstico (el horizonte del motor): la línea toca el umbral justo al final del pronóstico. En escritorio la notificación va sobre el gráfico (arriba a la derecha); en celular, debajo. Sin video. |
| Clientes | Al pie del hero, a todo el ancho y sin título a la vista: el carrusel de logos (`#clientes`, decisión 59). "Confían en nosotros" queda como nombre accesible de la región. Queda justo debajo de la primera pantalla: aparece al bajar un poco, no de entrada (decisión 62). El hilo pasa por debajo, como por un túnel: llega al fondo de un semicírculo abierto hacia arriba (∪) antes de la franja y sale de la punta de otro abierto hacia abajo (∩) después. |

## 2. El problema (`#problema`)

Se mantiene de la versión 1.

| Elemento | Contenido |
|---|---|
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Disposición:** título, bajada y razones van en la columna izquierda; el gráfico, a la derecha, arranca a la altura del título. Sin etiqueta de sección.

**Dos razones**, sin numerar, cada una con un ícono ámbar (el color de este capítulo), separadas sólo por aire, sin línea: planta (el síntoma llega tarde para el bioinsumo) y nube con sol (el pronóstico regional no conoce tu lote). Son dos y no tres por la decisión 15: el síntoma tardío y el bioinsumo que llega tarde son la misma idea.

1. **El síntoma llega tarde para el bioinsumo.** Cuando la hoja se enrolla, el rinde ya está comprometido y aplicar el bioinsumo protege poco.
2. **El pronóstico regional no conoce tu lote.** No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.

**Visual:** `ProblemChart.astro`, simplificado como el del hero (mismas etiquetas grandes, sin lluvia ni "+6 días"): la línea gris cruza el umbral en silencio, el área roja "Rinde perdido" y la línea roja "Lo ves a campo" al final. Como cierre, una alerta **"Se ve a campo 6 días tarde · El bioinsumo ya no llega a tiempo"**, con el ícono en rojo y el borde gris de la tarjeta (sin recuadro de color), cuelga del borde inferior de la tarjeta, debajo de "Lo ves a campo" (en celular, debajo del gráfico). Después, el video `problema`.

## 3. Lo que hace VigIA (`#que-hace`)

Sección nueva (decisión 15). Cuenta qué hace VigIA: acompaña desde antes de la siembra, cuida el agua, detecta los picos de estrés durante toda la campaña y está orientado a bioinsumos. Además, toma los tipos de estrés que antes cerraban El problema. Punto 3 del hilo, en verde agua (decisión 49; antes celeste, decisión 23). La etiqueta "La solución" pasó a la sección 4 (decisión 30). Desde la decisión 42 se llama **Lo que hace VigIA** y sus cuatro tarjetas cuentan también las cuatro alertas.

| Elemento | Contenido |
|---|---|
| Título | **VigIA BioEstrés vigila el estrés toda la campaña** |
| Bajada | Sigue cada ambiente desde antes de la siembra hasta el final del ciclo, y te dice cuándo cuidar el agua y cuándo aplicar el bioinsumo. |

**Cuatro tarjetas con foto**, primero en la sección (decisión 38): la foto ocupa toda la tarjeta y el título y el texto corto van abajo, sobre una franja translúcida con desenfoque (decisión 57). La línea entre foto y texto queda a la misma altura en todas; los títulos, centrados en el renglón del más largo, y los textos arrancan a la par. Cuatro columnas en escritorio, dos en tablet, una en celular. Foto, título y texto comparten renglones (subgrid). En escritorio, el alto de la foto sigue al alto de la ventana.

| Tarjeta | Texto | Foto (Wikimedia Commons, decisión 49) |
|---|---|---|
| Detecta picos de estrés | Falta de agua, aire que seca a la planta o los dos juntos. Te avisa por ambiente, con margen. | Lote de soja en febrero, con manchones |
| Desde antes de la siembra | Sigue el agua del suelo desde antes de sembrar y te avisa 14 días antes de la etapa crítica. | Soja en siembra directa sobre rastrojo de sorgo |
| Cuida el uso del agua | Sabés cuánta agua útil tiene cada ambiente. Si se viene la falta de agua, regás justo cuando hace falta. | Pivote de riego sobre soja |
| Orientado a bioinsumos | Cada aviso trae su bioinsumo: hídrico, antiestrés térmico o preventivo antes de la etapa crítica. | Tractor con pulverizadora |

"Desde antes de la siembra" va sin número a propósito: el balance arranca 60 días antes de la siembra, pero lo que importa es que acompaña todo el proceso. "Orientado a bioinsumos" se dice en positivo. Las fotos están en `src/assets/quehace/`, con sus créditos en el pie de página (`FOOTER.creditosFotos`).

Las cuatro alertas se reparten entre las tarjetas (decisión 42), sin sumar ítems:

| Alerta | Qué pasa | Acción |
|---|---|---|
| Estrés hídrico | Tarjeta 1 | Riego en la 3, bioinsumo hídrico en la 4 |
| Estrés térmico | Tarjeta 1 | Antiestrés térmico en la 4 |
| Estrés combinado | Tarjeta 1 ("los dos juntos") | Riego en la 3, bioinsumo en la 4 |
| Etapa crítica | Tarjeta 2 (aviso 14 días antes) | Bioinsumo preventivo en la 4 |

**Debajo de las tarjetas, otros módulos** (decisión 46), al ancho de las tarjetas, en dos columnas y sin línea divisoria, cada una con su enlace "Conocé …" con flecha (el enlace aparece cuando se carga la URL):

| Pregunta | Texto | Enlace |
|---|---|---|
| **¿Hacés cultivos de servicio?** | VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado. | Conocé cultivos de servicio (URL pendiente) |
| **¿Aplicaste herbicidas residuales?** | Con el carry-over de herbicidas sabés cuándo es seguro sembrar el cultivo siguiente. | Conocé carry-over de herbicidas (URL pendiente) |

Las fotos de las tarjetas son el único medio: la sección sigue haciendo de puente entre el problema y la solución.

## 4. La solución (`#como-funciona`)

Es el capítulo "con VigIA" del recorrido. **Lo principal son los dos canales de la alerta**, que es lo que recibe el cliente; los pasos van después y cortos.

| Elemento | Contenido |
|---|---|
| Título | **Te avisa a tiempo para actuar** (sin nombrar los canales: ya los presentan las tarjetas). El ancla es `#como-funciona`, la del menú. |
| Bajada | VigIA sigue cada ambiente día a día. Cuando se viene el estrés, te avisa con margen para aplicar el bioinsumo o regar. |

**Bloque principal (dos columnas):** a la izquierda, el título, la bajada y los dos canales flotando, sin tarjeta ni línea entre ellos, con íconos **monocromos** (en el color del texto): **En tu WhatsApp** y **En la plataforma**. Mismo formato que las razones de El problema (decisión 48): alineados a la izquierda, a todo el ancho de la columna, ícono arriba y los mismos tamaños de texto. A la derecha, arrancando a la altura del título, un recuadro 4:3 (la proporción del video) que llena `WhatsAppMock.astro`, así no cambia de tamaño al pasar al video. El chat lleva el favicon como foto de perfil. El mensaje es simple: **⚠️ Estrés hídrico en 14 días** · Lote 12 · Ambiente 2 · Planificá riego o bioinsumo. Después, el video `resolucion` y el cierre **✅ Resuelta a tiempo**.

- **Cómo lo hace:** debajo de las dos columnas, a todo el ancho, con un subtítulo chico (decisión 57). Línea de tiempo **horizontal y sin números**: un punto verde arriba de cada paso y una línea fina hacia el siguiente, que se dibuja de izquierda a derecha; cada paso aparece cuando la línea llega a él. En celular, vertical. Con movimiento reducido se ve fija.

  | Paso | Título | Texto |
  |---|---|---|
  | 1 | Se cargan tus lotes | Ambientes, suelo y cultivo. El clima se conecta solo. |
  | 2 | Calcula cada día | Balance hídrico y DPV contra los umbrales de tu cultivo. |
  | 3 | Te avisa a tiempo | Cargás lluvias y riegos, y el cálculo se ajusta. |

  El paso 1 usa una redacción neutral ("se cargan") hasta confirmar quién hace el alta de lotes (pregunta abierta 1).

Los otros módulos (cultivos de servicio y carry-over de herbicidas) ya no van al pie de esta sección: están debajo de las tarjetas de Lo que hace VigIA (decisión 46).

## 5. Frase destacada

Sección propia, fuera del recorrido, con tipografía grande (sección B11 de `landing-page-design`).

> **Que el bioinsumo llegue**
> **antes que el estrés,**
> **no después del daño.**

- **Palabras resaltadas con los colores de la historia:** "antes" en verde (a tiempo) y "después del daño" en rojo (tarde). En `src/data/vigia.js` se marcan con `*verde*` y `_rojo_`.
- Tres renglones (decisión 50). El hilo entra por el renglón del medio, justo antes de "antes"; al llegar, "antes" se subraya en verde.
- Con `prefers-reduced-motion` o sin JS, el texto se ve completo y sin animar.
- Es texto HTML (un `<p>`, no un heading), legible por lectores de pantalla.

## 6. Impacto (`#impacto`)

Impacto medible con datos del informe técnico (decisiones 19, 25 y 32): escenario base de 20.000 ha, cinco campañas continuas. Datos en `IMPACTO` (`src/data/vigia.js`); los totales se calculan a partir de los cultivos. La sección es más angosta que el resto (hasta 1000 px) y va centrada.

| Elemento | Contenido |
|---|---|
| Título | **Impacto** |
| Bajada | Más grano y más carbono en el suelo |

**Cuatro indicadores** grandes y centrados, con una línea corta debajo en letra chica, sin caja (en tablet, dos por fila):

| Indicador | Texto | Tabla |
|---|---|---|
| **+20.000 ha** | monitoreadas | — |
| **96 %** | de efectividad en la respuesta del bioinsumo | — |
| **+8.680 t** | de grano recuperado frente a lotes que no siguieron a VigIA | Rinde recuperado por cultivo |
| **~3.300 t** | de CO₂ extra capturadas en el suelo (sólo el extra del rinde recuperado; suma de los valores por cultivo, el informe da 2.800 a 4.100 t estables) | Carbono extra capturado por cultivo |

**Tablas:** los dos últimos indicadores son botones, marcados sólo con una flechita discreta debajo. La primera vez que la sección entra en pantalla aparece un aviso corto debajo de los dos indicadores que se despliegan, **Tocá un indicador para ver el detalle**, que se va solo a los pocos segundos. Al tocar un indicador se despliega su tabla en un panel centrado debajo de los cuatro, **de a una** (abrir una cierra la otra; el mismo indicador, la cruz o Escape la cierran). El indicador activo no lleva fondo: sólo el número toma su color (grano en verde campo, carbono en tierra) y su flechita de abajo se oculta. Una **flecha** en el borde del panel apunta a él; sale del borde de arriba de la tarjeta, que va del color del dato de punta a punta, y la tarjeta va pegada a los indicadores. Al cambiar de tabla (con una ya abierta), el recuadro queda fijo (la flecha se apoya en su borde y su línea cambia de color con una transición) y adentro sólo se desplaza el contenido, como un carrusel: la tabla que sale se va hacia un lado y la nueva entra desde el otro, sin desvanecerse, junto con la flecha y con la misma curva y duración. El panel se despliega con una animación de alto y opacidad (todo sin animación con movimiento reducido). En pantallas horizontales la sección tiene un alto fijo, el que ocupa con la tabla más alta abierta (cerrada, el título y los indicadores quedan centrados en ese alto). Al abrir una tabla el título y la bajada (centrados, del tamaño de los de las otras secciones) se pliegan y los indicadores suben, así indicadores y tabla entran en la pantalla sin que la sección crezca ni se mueva el scroll; al cerrarla vuelve el título. En celular, el panel va de borde a borde, sólo con línea arriba y abajo.

| Rinde recuperado | Hectáreas | kg/ha extra | Total |
|---|---|---|---|
| Maíz | 8.000 | 740 | 5.920 t |
| Soja | 7.000 | 230 | 1.610 t |
| Trigo | 5.000 | 230 | 1.150 t |
| **Total** | **20.000** | | **8.680 t** |

Nota: *Diferencia de rinde entre lotes que aplicaron el bioinsumo según las alertas de VigIA y lotes que no siguieron sus alertas o recomendaciones.*

| Carbono (t CO₂) | Fijado | Vuelve al suelo | Queda estable |
|---|---|---|---|
| Maíz | 20.378 | 12.026 | 2.050 |
| Soja | 6.836 | 4.538 | 700 |
| Trigo | 4.818 | 3.186 | 550 |
| **Total** | **~32.000** | **~19.750** | **~3.300** |

Nota: *Es el carbono extra del rinde recuperado. Equivale a neutralizar las emisiones de unos 750 autos por año. El carbono que queda es el del rastrojo y las raíces; las raíces aportan el más estable.*

Sin calculadora (se quitó, decisión 32).

## 7. Sobre nosotros (`#nosotros`)

Reemplaza a Para quién es (decisión 21).

| Elemento | Contenido |
|---|---|
| Título | **Las personas detrás de VigIA BioEstrés** |
| Bajada | Un equipo que reúne tecnología agrícola, asesoramiento agronómico y bioinsumos. (Pendiente de revisar con el equipo.) |

Encabezado centrado y tres tarjetas chicas, centradas, de igual ancho: el del contenido más ancho (el logo de Agroconsultor) con el aire justo a los costados (en celular, de a dos por fila y la tercera centrada abajo, más compactas). Las tarjetas son translúcidas (la superficie del tema a medias, con desenfoque). Llevan foto redonda, nombre y, al pie, separado sólo por aire, una línea chica **En representación de** y el logo de la empresa. Cada logo va con su propio alto, calculado para que los tres pesen lo mismo a la vista (misma área, corregida por cuánta tinta tiene cada uno; ver `src/data/equipo.js`): Rinde Plus, de letras macizas, va más chico. Ninguno queda más chico que los logos del carrusel de clientes, que va justo debajo. Cuando se confirmen los cargos, pueden ir en lugar de esa línea (sin inventarlos). Los logos van a color en tema claro y en blanco en oscuro, como en el carrusel. Datos en `src/data/equipo.js`.

| Persona | Empresa | Foto |
|---|---|---|
| Marcos Flesia | Rinde Plus | Cargada (`marcos-flesia.webp`) |
| Juan Dall’Orso | Agroconsultor | Cargada (`juan-dallorso.webp`, recortada para centrar la cara) |
| Lucas Andreoni | BioRed | Cargada (`lucas-andreoni.webp`, 200 × 200: el original no da para más) |

El carrusel de clientes, que iba debajo de las tarjetas, pasó al pie del hero (decisión 59).

## 8. Preguntas frecuentes (`#preguntas`)

Acordeón con `<details>`. Un script chico anima la altura al abrir y cerrar (0,7 s con `--ease-fluid`; la respuesta se funde) para que la pregunta de abajo baje sin salto; sin JS o con movimiento reducido queda el comportamiento nativo. Las mismas preguntas van como datos estructurados `FAQPage` (JSON-LD) para buscadores.

En la columna del título, debajo de él, va el **cierre** (decisión 56): una línea chica que sigue al título (*¿Te quedó alguna duda? Escribinos.*) y el CTA **Contactanos para empezar a usar VigIA**. En pantallas horizontales, Preguntas y el footer llenan juntos la última pantalla.

| Pregunta | Respuesta |
|---|---|
| ¿Necesito sensores o estaciones en el campo? | No. VigIA toma el clima en las coordenadas de cada lote. Si medís lluvias o agua útil, las cargás y el cálculo se ajusta. |
| ¿Qué tengo que cargar yo? | Al empezar se cargan tus lotes, ambientes y suelo. Después sólo sumás lluvias y riegos cuando pasan. |
| ¿Qué cultivos sigue? | Los cultivos de la campaña (en soja, con la fenología ajustada por latitud y grupo de madurez) y cultivos de servicio: centeno, cebada y vicia. |
| ¿Cómo me llegan las alertas? | En la plataforma, en el panel de cada lote, y por WhatsApp, sin tener que entrar. |
| ¿Sirve en secano? | Sí. En secano te avisa a tiempo para el bioinsumo. Bajo riego, además, te arma un plan mensual con su costo. |

## Footer (`#contacto`)

Con la estructura de un footer de marca (decisión 37), en verde bosque como Impacto y compacto, con textos en `FOOTER` (`src/data/vigia.js`). **No repite el menú del header.**

- **Cuatro columnas a la misma altura**, para no dejar huecos (dos por fila en tablet, una en celular):
  - **Marca:** logo de VigIA BioEstrés **monocromo en blanco** y debajo las redes (Instagram, WhatsApp, email) en círculos de 40 px con borde. Van a la izquierda para que no las tape el WhatsApp flotante.
  - **Contacto:** email, WhatsApp y dirección en texto (en inglés y portugués, con el país).
  - **Rinde Plus:** *¿Buscás más servicios especializados para tu producción? Rinde Plus tiene otras soluciones agtech para el campo.* Enlace **Visitá Rinde Plus ↗** a `https://rindeplus.com`. No dice que VigIA sea de Rinde Plus: la plataforma tiene otros socios (decisión 40).
  - **Ayuda:** Preguntas frecuentes · Escribinos por WhatsApp · **Política de privacidad** (`/privacidad`) · **Términos y condiciones** (`/terminos`).
- **Pie, en un renglón fino:** © año VigIA BioEstrés · Todos los derechos reservados, y los créditos de las fotos.
- Sin newsletter: el sitio es estático y no tiene dónde guardar los emails.

**Páginas legales** (`LegalPage.astro`, textos en `src/data/legal.js`): describen lo que el sitio hace hoy (sin formularios, cuentas, analítica ni publicidad; guarda el tema en el navegador; sirve sus tipografías desde el mismo sitio, sin Google Fonts; enlaza a WhatsApp, Instagram y Maps) e incluyen la leyenda de la AAIP de la Ley 25.326. **Son un borrador:** revisarlas con asesoría legal y completar razón social y CUIT antes de publicar.

## SEO

| Campo | Valor |
|---|---|
| `<title>` | **VigIA BioEstrés · Alertas de estrés hídrico y térmico** (`SEO.titulo`; en inglés *Water and heat stress alerts*, en portugués *Alertas de estresse hídrico e térmico*). Con sólo la marca no tenía ninguna palabra de búsqueda. |
| Meta description | Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp. |
| `og:image` | 1200×630 desde `media-src/imagenes/3.3.jpg` (el lote sano), con el logo. |
| Datos estructurados | `Organization` (nombre, logo, contacto, dirección), `WebSite` (con los tres idiomas) y `FAQPage` con las preguntas de la sección 8. Sin redes (`sameAs`) hasta que VigIA tenga las suyas. |
| Idiomas | `hreflang` es, en, pt y x-default, y `og:locale` con los otros dos como alternativos, en las páginas traducidas. |
| Indexar | La home (en los tres idiomas) y las legales. Precios, Educación y el 404 van con `noindex` (sin `canonical` ni `hreflang`) hasta que tengan contenido. |
| Sitemap y robots | `src/pages/sitemap.xml.ts` genera `sitemap.xml` con las páginas que se indexan y las alternativas de idioma de la home; `public/robots.txt` permite todo y apunta al sitemap. |
| URLs | Con barra final (`/pricing/`): es la que sirve GitHub Pages sin redirección. `hreflang`, `canonical`, el sitemap y los enlaces internos la usan (`conBarra` en `src/i18n/idiomas.js`). |

---

## Medios: animaciones y videos

Cada sección del recorrido tiene **un** medio, dentro de `MediaStory.astro`: primero una animación en código y, si hay video, un fundido al video. Al terminar vuelve a empezar.

| Sección | Animación en código | Video (`public/videos/`) |
|---|---|---|
| 1. Hero | `BalanceChart.astro`, 11 s (animación de ~3,5 s y el final quieto para leerlo) | Ninguno: el gráfico es la propuesta del producto. |
| 2. El problema | `ProblemChart.astro`, 11 s (animación de ~4,6 s y el final quieto para leerlo) | `problema_v2.mp4` (6 s, 2,9 MB): el lote verde se seca bajo el sol, las hojas se marchitan y el suelo se agrieta. |
| 4. La solución | `WhatsAppMock.astro`, 4,5 s, más 3,2 s de cierre "Resuelta" después del video | `resolucion.mp4` (5,5 s, 1,5 MB): clip 3B → 3C, la pulverizadora al amanecer y el lote sano. |

**Estado:** los dos videos están en `public/videos/` con poster y cargados en `src/data/videos.js`. Los clips crudos y los masters están en `media-src/` (fuera del repo).

### Criterios

- **El mismo lote cuenta la historia:** VigIA vigila (hero), sin aviso se pierde rinde (El problema), con el aviso se actúa a tiempo (La solución). La luz acompaña: mediodía seco en El problema, amanecer en La solución.
- **Interfaz en código, campo en video.** Lo que es interfaz (gráfico, alertas, celular) se anima en SVG y CSS: se ve nítido, sigue el tema y se corrige en minutos. El campo real va en video.
- **Sin texto dentro del video.** Los textos van en HTML.
- **Sin drones, satélites, HUD, robots ni marcas** en ningún medio.

### Requisitos técnicos

- Los videos se reproducen a **0,75x** (`playbackRate`): el campo se mira con calma. Las animaciones en código mantienen su velocidad. Con eso, `problema` dura unos 6,8 s y `resolucion` unos 7,3 s.
- `<video muted playsinline preload="none">` con el poster en WebP. El poster y el video empiezan a bajar cuando la sección entra en pantalla, mientras corre la animación: con el poster puesto de entrada, se descargaba al abrir la página y competía con las fuentes del hero.
- **Sólo MP4 (H.264)**, 960×720, 24 fps, sin audio. Con follaje fino, a igual calidad el WebM pesaba más. `webm` queda como campo opcional.
- Peso: hasta 4 MB por clip, priorizando que se vea bien (SSIM ≥ 0,98 contra el master).
- Con `prefers-reduced-motion` o sin JS: la animación queda en su estado final y el video no se muestra.
- Los videos quedan en el historial de git para siempre (por `docs/`). Si van a cambiar seguido, conviene un CDN.

### Rótulo y encuadre

- **Rótulo de capítulo:** durante el video aparece arriba a la izquierda, sin caja, en mayúsculas blancas con un ícono al principio: ⚠ rojo "Sin aviso · el daño se ve a campo" y ✓ verde "Con el aviso · se aplica a tiempo". Un degradé oscuro suave arriba del video lo hace legible sobre el cielo claro. Aparece 1,2 s después de que arranca el video, cuando la escena ya se leyó. Campos `rotulo` y `tono` en `src/data/videos.js`.
- **Encuadre:** en celular el contenedor es casi cuadrado y el video 4:3 se recorta a los costados. El campo `encuadre` (`object-position`) conserva los silos y la pulverizadora.

### Cierre espejo en La solución

Al terminar el video de resolución vuelve el celular y, durante 3,2 s, el aviso "⚠️ Estrés hídrico en 14 días" se cruza con "✅ Resuelta a tiempo" (el mensaje sin borde de color, como en la app real). Después reinicia el ciclo. Es el espejo del "Sin aviso" del gráfico del problema.

- Lo maneja `MediaStory` con la prop `cierre` (ms) y la etapa `data-stage="cierre"`; el texto está en `COMO_FUNCIONA.mensaje.resuelta`.
- Es narrativo: no afirma que la plataforma registre la aplicación ni que el balance vuelva sobre el umbral (el video muestra una aplicación de bioinsumo, no un riego).
- Con movimiento reducido no hay etapas: se ve el aviso original.

## Recorrido: hilo

Las secciones 1 a 4 comparten un contenedor (`.vg-journey`) sobre el **fondo plano** de la página, con un hilo que se dibuja con el scroll (`JourneyThread.astro`). Desde la decisión 49 no hay fondo por etapas.

| Sección | Hilo |
|---|---|
| 1. Hero | Verde campo (`--vg-campo`): VigIA vigila el lote. Punto 1. |
| 2. El problema | Ámbar y rojo (`--vg-sev-alerta`, `--vg-sev-critico`): el agua cruza el umbral sin aviso. Punto 2. |
| 3. Lo que hace VigIA | Verde agua (`--vg-agua`): el agua del suelo y la respuesta. Punto 3. |
| 4. La solución | Verde campo: el lote se salvó. Punto 4. |

- Los puntos no llevan número ni laten: marcan la etapa y se rellenan cuando el hilo llega. Se anclan a los títulos de cada sección (`data-vg-node`), no a las etiquetas.
- El hilo no termina en seco: pasa por el final de "Cómo lo hace" (`.vg-detalle`, `data-vg-end`), baja por el costado y dobla para entrar de costado en la frase destacada, a la altura de su renglón del medio, en un punto verde que se rellena cuando el hilo llega. La punta del hilo va al 55 % de la pantalla; el tramo final, de "Cómo lo hace" a la frase, va más rápido, para que el hilo llegue con el punto a dos tercios de la pantalla, antes de que asome Impacto. Así el recorrido del lote termina en la moraleja.
- Con movimiento reducido, el hilo aparece completo y quieto.

**Dibujos de fondo** (a línea, tenues, generados al compilar): un lote sembrado detrás del hero (`FieldRows.astro`); lotes con ambientes que unen El problema con Lo que hace VigIA (`LotesConexion.astro`); pivotes de riego a la derecha, desde el borde entre Lo que hace VigIA y La solución hasta cerca del final de La solución (`Pivotes.astro`). La frase e Impacto van sin dibujo.

---

## Plan de implementación (histórico)

Cómo se pasó de la versión 1 a la versión 2. Queda como registro: varias piezas cambiaron después (ver Decisiones), y la home hoy vive en `src/views/HomePage.astro`.

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
- Búsqueda en `src/`: sin "IA" fuera de "VigIA", sin "inteligencia artificial", "satélite", "NDVI", "plaga" ni "fungicida". "Herbicidas" sólo en el carry-over (decisión 46).
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
| 10 | Prueba en el hero | No lleva: la prueba social queda en el carrusel "Confían en nosotros". **Reemplazada por la 59: el carrusel pasa al pie del hero.** |
| 11 | Logo | El header usa el logo de VigIA BioEstrés. |
| 12 | Reversión de riesgo | No lleva: el cierre termina en el CTA. |
| 13 | Texto del CTA | **Contactanos para empezar a usar VigIA** (reemplaza "Quiero ver mis lotes en VigIA" y "Empezá a usar VigIA"): dice qué pasa al tocarlo y para qué; abre WhatsApp. |
| 14 | "Ejemplo ilustrativo" | Se quita de los tres medios (gráficos y celular). |
| 15 | Sección "Qué hace VigIA" | Se suma como sección 3, entre El problema y Cómo funciona (que pasa a ser la 4). Lleva los tipos de estrés, que salen de El problema, contados con la acción de cada uno. El problema queda con dos razones: se unen "el síntoma llega tarde" y "el bioinsumo necesita llegar antes". |
| 16 | "Merma" → "pérdida" | En todo el sitio se dice "pérdida" (o "pérdida de rinde"), no "merma". |
| 17 | Hero sin tarjetas | Los tres puntos del hero son palabras con ícono, sin tarjeta. Botones en tamaño normal y del mismo ancho. |
| 18 | Carry-over de herbicidas | Excepción a la regla de no mencionar herbicidas: se nombra sólo al pie de Cómo funciona, como módulo de RindePlus, con enlace a su página. No se presenta como parte de VigIA BioEstrés. |
| 19 | Resultados de campo | Beneficios pasa a ser Resultados, con datos medidos en campo (acierto, kg recuperados, agua capturada, hectáreas). Es la única sección donde valen números que no salen del motor, siempre con su fuente. |
| 20 | "4 días" | Ya no se usa como mensaje principal (se lee tarde). El hero y la sección 3 destacan que VigIA acompaña desde antes de la siembra. El aviso a 4 días sigue en los ejemplos de alerta. |
| 21 | Sobre nosotros | Para quién es se quita y en su lugar va Sobre nosotros: Marcos Flesia (Rinde Plus), Juan Dall’Orso (Agroconsultor) y Lucas Andreoni (BioRed), con foto y logo. En el menú, "Para quién" pasa a "Nosotros". |
| 22 | Preguntas frecuentes | Se quitan "¿Me recomienda productos?" y "¿Cuánto cuesta?". Quedan cinco. |
| 23 | La solución | "Qué hace VigIA" pasa a llamarse **La solución** (`#solucion`). Suma el punto 3 del hilo, en celeste (`--vg-sky`), y fondo celeste propio (`--vg-bg-solucion`). Cómo funciona pasa a ser el punto 4. |
| 24 | Panel de Cómo funciona | Sin íconos. Dos columnas alineadas por filas; cada ítem con barra de color, rótulo (el momento del aviso o el número de paso), título y texto. |
| 25 | Impacto medible | Resultados pasa a mostrar el informe técnico (20.000 ha, cinco campañas): cifras generales, tablas de rinde y carbono por cultivo y una calculadora. El botón de la calculadora ("Pedir propuesta para mis X ha") es una excepción al CTA único: lleva al mismo WhatsApp, con el pedido armado. |
| 26 | Margen lateral | Un solo margen para toda la página (`--page-gutter`), igual a los dos lados: 24 px con la ventana ancha, 64 px por debajo de 1260 px (deja lugar al hilo) y 16 px en celular. |
| 27 | Resultados en dos bloques | Título "Más grano y más carbono en el suelo". Grano y carbono separados en dos bloques con su color; las hectáreas pasan a la bajada (son el escenario de ambos). Las tablas por cultivo quedan plegadas: se abren sólo si el usuario quiere más detalle. |
| 28 | Educación | Nuevo ítem al final del menú, que lleva a una página propia (`/educacion`), no a una sección de la home. Por ahora es una página provisoria; el contenido está pendiente. La línea verde del menú la marca cuando se está en esa página. |
| 29 | Beneficios | La sección de impacto vuelve a llamarse Beneficios (menú y ancla `#beneficios`). Suma el contexto (5 campañas, 96 % de efectividad, 20.000 ha) en tres datos flotantes, botones alineados para desplegar las tablas, ancho más angosto y centrado. La calculadora pierde la nota al pie. |
| 30 | Nombres de las secciones 3 y 4 | La sección 3 vuelve a llamarse **Qué hace VigIA** (`#que-hace`, sigue en celeste). La sección 4 pasa a llamarse **La solución**; mantiene el ancla `#como-funciona` para no romper el menú ni el botón del hero. |
| 31 | Hero con un solo botón | Se quita el botón secundario "Cómo funciona": queda sólo el CTA, centrado y más abajo. |
| 32 | Beneficios en cuatro indicadores | Cuatro indicadores grandes (+20.000 ha, 96 %, +8.680 t, ~3.300 t de CO₂). Las tablas se abren desde los dos últimos, de a una, en un panel centrado con una flecha al indicador de origen. Se quita la calculadora (y con ella la excepción del segundo CTA de la decisión 25). |
| 33 | CTA del hero monocromo | El botón del hero va en blanco y negro según el tema (negro en claro, blanco en oscuro). |
| 34 | Impacto | La sección Beneficios pasa a llamarse **Impacto** (etiqueta, menú y ancla `#impacto`). |
| 35 | Menú sin Preguntas | Se quita "Preguntas" del menú del header. La sección de preguntas frecuentes sigue en la página. |
| 36 | Footer nuevo | Logo arriba; contacto y tres columnas de enlaces en el medio; copyright y redes en círculos al pie. Sin newsletter (sitio estático). |
| 37 | Footer de marca y legales | El footer no repite el menú: marca (logo monocromo, datos, redes a la izquierda), Rinde Plus con enlace a rindeplus.com, Ayuda, y abajo los enlaces a privacidad y términos (páginas nuevas, en borrador). |
| 38 | Alertas unificadas | Los tipos de estrés salen de Qué hace VigIA y se unen a "Qué te avisa": cuatro alertas (hídrico, térmico, combinado, etapa crítica) con forma de aviso, cada una con cuándo avisa, qué pasa y una acción concreta ("Qué hacer"), en 2×2. "Cómo lo hace" pasa a una tira de tres pasos unidos por una línea. Opciones evaluadas en `media-src/OPCIONES_DISENO.md`. |
| 38 | Qué hace VigIA con tarjetas | La sección abre con cuatro tarjetas con foto: los picos de estrés (lo que antes era la bajada), desde antes de la siembra, el agua y los bioinsumos. La bajada pasa a resumir todo el ciclo. Los tipos de estrés quedan debajo, en formato simple (ícono, título, texto y acción en una línea), sin barra de color. |
| 39 | Qué te avisa y cómo lo hace, simples | Las alertas pasan a cuatro columnas sin tarjetas, al estilo de las cifras de Impacto: título "Estrés …" en negrita, frase en gris y acción en verde; sin colores por severidad ni rótulo "Qué hacer". "Cómo lo hace" pasa a línea de tiempo sin números que se dibuja de izquierda a derecha. Los dos bloques, centrados y de hasta 880 px. Los otros módulos pasan al pie de las preguntas frecuentes. |
| 40 | Rinde Plus sin pertenencia | El footer ya no dice que VigIA BioEstrés sea parte ni "una solución" de Rinde Plus (la plataforma tiene otros socios): invita a visitar Rinde Plus por otros servicios. Las páginas legales todavía lo dicen (pregunta abierta 2). |
| 41 | Versión en inglés | El sitio pasa a tener versión en inglés en `/en/` (home, precios y educación), con el contenido en `src/data/vigia.en.js`. Es una adaptación con glosario agronómico propio (`TRADUCCION_EN.md`), no una traducción literal. El selector del header cambia de página con un fundido y conserva la sección. Las legales quedan en español. Ver ADR 0004. |
| 42 | Lo que hace VigIA absorbe las alertas | Se quita "Qué te avisa VigIA" de La solución. Sus cuatro alertas y acciones se reparten en las cuatro tarjetas con foto de la sección 3, sin sumar ítems: qué pasa en picos de estrés, el aviso a 14 días en desde antes de la siembra, el riego en el uso del agua y los bioinsumos en la última. La sección 3 pasa a llamarse **Lo que hace VigIA**. Reemplaza el bloque de alertas de las decisiones 38 y 39. |
| 43 | Contra qué se mide el impacto | El grano y el carbono son lo **extra**: la diferencia frente a lotes que no siguieron las alertas o recomendaciones de VigIA (muchos ensayos distintos; a veces se avisó pero no se usó el producto sugerido). Se dice así, sin la palabra "testigo" (suena a ensayo). Para que quede claro que son clientes reales, la bajada dice "en lotes de productores". La nota de la tabla de grano define la comparación; la del carbono aclara que es sólo el extra del rinde recuperado. El 96 % queda como estaba. |
| 44 | Carbono sin rangos | La columna "Queda estable" muestra un valor por cultivo, no el rango del informe: el promedio de cada rango, ajustado y redondeado para sumar un número redondo (maíz 2.050, soja 700, trigo 550; los tres dentro de su rango). El total, **3.300 t**, es el indicador de arriba y se calcula de la tabla, así coinciden. Los rangos quedan en `impactoDatos.js`. La equivalencia de la nota pasa de 650 a 900 autos a unos 750, en línea con las 3.300 t. |
| 45 | Socios fuera de clientes | BioRed y Agroconsultor salen del carrusel "Confían en nosotros": son socios con los que se hace VigIA BioEstrés y ya aparecen en Sobre nosotros. |
| 46 | Otros módulos en Lo que hace VigIA | Cultivos de servicio y carry-over de herbicidas pasan del pie de las preguntas frecuentes a debajo de las tarjetas de la sección 3. El carry-over de herbicidas va a ser parte de VigIA (decisión del equipo, 2026-10-16): se deja de nombrar a RindePlus. Reemplaza la decisión 18 y la parte de módulos de la 39. |
| 47 | Hero sin palabras clave | Se quitan las tres palabras clave del hero (desde antes de la siembra, por ambiente, alertas por WhatsApp). Sus ideas pasan a la bajada, que ahora dice desde antes de la siembra, por ambiente y por WhatsApp. El CTA sube a la columna de texto, debajo de la bajada. Reemplaza la parte de palabras clave de la decisión 17 y la ubicación del botón de la 31. |
| 48 | Canales como las razones | Los canales de La solución toman el formato de las razones de El problema, para que los dos capítulos del recorrido se lean iguales: a la izquierda y a todo el ancho de la columna (ya no centrados ni de 420 px), ícono arriba y los mismos tamaños de texto. Los íconos siguen monocromos. |
| 49 | Rediseño visual: agro técnico y sobrio | A partir de la crítica de Impeccable (la página se leía como hecha con IA). Sólo estética, sin cambiar textos ni información. Paleta de campo con significado (fondo piedra, verde bosque de marca, verde campo / ámbar / rojo / tierra según lo que representan) en lugar de los grises de GitHub y la paleta de Tailwind. IBM Plex Sans + Chivo Mono para datos (cero liso), en lugar de Geist. Título del hero en tinta sólida (sin degradé). Etiquetas de sección sobrias (chicas, en gris, sin mayúsculas). Fondo plano en el recorrido (fin del degradé provisorio). Hilo con puntos sin número y sin pulsos, con un tramo verde agua en Lo que hace VigIA. Frase destacada fija (no se ilumina palabra por palabra). Apariciones más cortas, sin desenfoque y sólo en grupos de contenido. Fotos de "Lo que hace VigIA" reales (Wikimedia Commons, con créditos en el pie de página) en lugar de las generadas. Botones de WhatsApp con texto oscuro (contraste). Ver ADR 0005. |
| 50 | Recorrido a pantalla completa y fondos por capítulo | En pantallas horizontales (escritorio y tablet acostada), el hero, El problema, Lo que hace VigIA, La solución, la frase e Impacto ocupan una pantalla cada uno, con tamaños que siguen al alto de la ventana. Cada gesto de scroll pasa al panel siguiente o al anterior: hacia abajo con una traba corta (la primera transición, más lenta; la de la frase, mucho más lenta para ver llegar el hilo), hacia arriba rápido y casi sin espera; desde Impacto, scroll normal, sin que la inercia siga de largo al llegar. En los paneles de dos columnas el título arranca a la altura del gráfico o video. El hero no lleva etiqueta: "estrés hídrico y térmico" pasa a la bajada. En Lo que hace VigIA, las dos preguntas van al pie. La solución tiene dos estados: bajada y canales, y con el siguiente gesto, "Cómo lo hace" en su lugar (pasos en vertical, con traba hasta que terminan de desplegarse). La frase va en tres renglones; al llegar el hilo, un trazo recorre "antes" y se va, y aparece una flecha que respira despacio. El header queda siempre visible y se aclara sobre las bandas verdes. Fondos: líneas de nivel tenues en el hero (más claras detrás del texto), Impacto en banda verde bosque, equipo y clientes en verde salvia, preguntas del color del footer. Celular queda pendiente. Sólo en `develop-impeccable`. **Reemplazada en el scroll y en los fondos por la 57.** |
| 51 | Scroll de pantalla en pantalla, parejo | Reemplaza lo del scroll de la decisión 50 ([ADR 0006](../adr/0006-recorrido-de-pantalla-en-pantalla.md)). Un gesto, un paso, también hacia arriba, con la misma animación que hacia abajo (520 ms): sin trabas, la inercia salteaba paneles, sobre todo en la solución. Un gesto nuevo se reconoce aunque siga la inercia del anterior y, si llega durante una animación, queda en cola. La frase pasa de 1,8 s a 1,5 s. "Cómo lo hace" traba 1 s (antes, hasta que terminaban los pasos); el cambio va en la dirección del scroll y dos rayas al pie marcan el estado. La página nunca queda entre dos paneles: se acomoda en el más cercano. Al volver desde abajo, se frena en Impacto. **Reemplazada por la 57.** |
| 52 | Menú con desplegable | "Cómo funciona" pasa a ser un desplegable con Inicio (vuelve arriba de todo: el hero no tiene título y es más a mano que el logo), El problema, Lo que hace VigIA y La solución; el título lleva al problema. Impacto, Nosotros, Contacto y Educación siguen sueltos. Los saltos del menú dejan cada sección justo debajo del header (y los paneles a pantalla completa, alineados arriba). |
| 53 | Equipo y clientes sobre piedra | Equipo y clientes dejan el verde salvia de la decisión 50 y vuelven al fondo piedra de la página: el salvia, frío, chocaba con el blanco cálido de las tarjetas del equipo. Impacto sigue en verde bosque y preguntas frecuentes, del color del footer. |
| 54 | Fondo propio para El problema y La solución | El recorrido deja de ir todo sobre el mismo fondo: El problema va sobre tierra seca y La solución sobre un verde muy claro, sólidos, y el hero, Lo que hace VigIA y la frase siguen sobre piedra. Los colores acompañan el tramo del hilo de cada sección (ámbar y rojo, verde campo) y son cálidos, para no chocar con las tarjetas blancas como el salvia frío de la decisión 53. Todos los textos pasan AA. El hilo pasa por encima de las secciones, para que los fondos no lo tapen. **Reemplazada: los dos vuelven al fondo de la página (decisión 57).** |
| 55 | Dibujos de fondo por sección | Con la misma técnica que el lote del hero (línea fina, tenue, generado al compilar), cada sección del recorrido lleva un dibujo de su tema: suelo agrietado en El problema, lotes divididos en ambientes en Lo que hace VigIA y pivotes de riego vistos desde arriba en La solución. Toman el color de su tramo del hilo, van en las zonas sin contenido y quedan al 40 % detrás del texto. La frase, Impacto, el equipo y las preguntas van sin dibujo. **Reemplazada por los dibujos que unen secciones (decisión 57).** |
| 56 | Toda la home de a pantalla | El paso de pantalla en pantalla sigue después de Impacto. Sobre nosotros y Clientes van en una sola pantalla: el carrusel, sin el título "Confían en nosotros" (queda como nombre accesible), pegado a las tarjetas del equipo. El Cierre deja de ser una sección: se quitan su título ("La próxima pérdida…") y su texto, y el CTA va a Preguntas, en la columna del título, poco debajo de él, con una línea chica arriba que sigue al título ("¿Te quedó alguna duda? Escribinos."). Preguntas es el último panel y comparte la pantalla con el footer, que se achica y pasa a verde bosque, como Impacto. En Impacto, al abrir una tabla el título y la bajada se pliegan para que entre en la pantalla. Reemplaza la sección 10 de la estructura y, en lo del borde del recorrido, la decisión 51. **El paso de pantalla en pantalla lo reemplaza la 57; lo demás sigue.** |
| 57 | Scroll normal en toda la home | Reemplaza el paso de pantalla en pantalla de las decisiones 50, 51 y 56 ([ADR 0007](../adr/0007-scroll-normal-en-toda-la-home.md)). Sin `SectionPager`: "Cómo lo hace" va debajo de las dos columnas de La solución, con los pasos en fila; la frase pierde la flecha. Cada sección sigue ocupando más o menos una pantalla en horizontal (`.vg-pantalla`), sin trabar el scroll. Escritorio toma los fondos que unen secciones del celular. El header vuelve a ocultarse al bajar. La solución pasa al fondo de la página; las tarjetas de Lo que hace VigIA, a foto completa con el texto sobre una franja con desenfoque; las alertas de los gráficos, con el borde gris de la tarjeta; el avatar del WhatsApp, el favicon; el footer lleva los legales en Ayuda y el pie en un renglón. |
| 58 | Versión en portugués | El sitio suma portugués de Brasil en `/pt/` (home, precios y educación), con el contenido en `src/data/vigia.pt.js` ([ADR 0008](../adr/0008-version-en-portugues.md)). Adaptación con glosario agronómico de Brasil (`TRADUCCION_PT.md`): talhão, zona de manejo, água disponível, estádio, safra, bioestimulante. Legales en español y aviso de que el equipo responde en español, como en inglés. |
| 59 | Sólo el hero ocupa una pantalla; clientes en el hero | Reemplaza en el alto de las secciones la decisión 57 ([ADR 0009](../adr/0009-solo-el-hero-ocupa-una-pantalla.md)). En monitores grandes, una pantalla por sección dejaba mucho aire entre ellas: ahora sólo el hero (que arranca debajo del header) ocupa una pantalla, y el resto mide lo que su contenido. Impacto conserva el pliegue del título al abrir una tabla, para que la tabla se lea entera sin bajar. Sin la tipografía según el alto en las demás secciones y sin la pantalla compartida de Preguntas con el footer. El carrusel de clientes pasa de Sobre nosotros al pie del hero, en la misma pantalla y sin título a la vista (reemplaza la decisión 10): el hilo pasa por debajo, como por un túnel: llega al fondo de un semicírculo abierto hacia arriba (∪) antes de la franja y sale de la punta de otro abierto hacia abajo (∩) después. La frase deja de ocupar casi una pantalla y lleva abajo el doble de aire que arriba. |
| 60 | Contacto es Preguntas más el footer | En el menú, Contacto lleva a Preguntas (`#preguntas`), que abre con el CTA, y queda marcado desde ahí hasta el final de la página. Antes llevaba al footer (`#contacto`) y mientras se leían las preguntas seguía marcado Nosotros; al final de la página tampoco se marcaba siempre. |
| 61 | Menú: Producto | Reemplaza los nombres del desplegable de la decisión 52. "Cómo funciona" pasa a **Producto**, y sus opciones dicen qué hay en cada sección en vez de repetir títulos que fuera de la página no se entienden: Inicio · El problema · **Qué vigila** (antes "Lo que hace VigIA") · **Cómo te avisa** (antes "La solución"). En inglés: Product · Home · The problem · What it watches · How it alerts you. En portugués: Produto · Início · O problema · O que monitora · Os alertas. Las anclas no cambian. |
| 62 | Clientes fuera de la primera pantalla | El hero vuelve a ocupar la primera pantalla entera, con el texto y el gráfico centrados, y el carrusel de clientes queda justo debajo: aparece al bajar un poco. Con los logos moviéndose a la vista de entrada, la primera pantalla se sentía cargada. Reemplaza el tope de 880 px de alto del hero. Los logos pasan a WebP optimizados ([ADR 0009](../adr/0009-solo-el-hero-ocupa-una-pantalla.md)). |

## Preguntas abiertas

1. **Alta de lotes (pendiente de consultar con la empresa):** ¿la carga inicial de lotes, ambientes y suelo la hace el equipo de VigIA o el usuario? Mientras tanto, el paso 1 y la pregunta "¿Qué tengo que cargar yo?" usan una redacción neutral ("se cargan"). Cuando se confirme, pasar a "Cargamos tus lotes" o "Cargás tus lotes".
2. **Legales:** hay borradores de política de privacidad y términos (`/privacidad`, `/terminos`). Falta revisarlos con asesoría legal y completar razón social y CUIT. Todavía presentan a VigIA BioEstrés como "una solución de Rinde Plus": definir quién figura como responsable del sitio (decisión 40).
