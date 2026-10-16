# Estructura de la landing de VigIA BioEstrés

Plan de contenido de la home. Define qué secciones tiene la página, en qué orden, qué dice cada una y con qué medios. Lo que se afirma sale de [`MODULO_VIGIA.md`](MODULO_VIGIA.md) (sección 10). Lo visual lo resuelven `landing-page-design` (Parte B) y las traducciones de `CLAUDE.md`. La estructura y el copy los cuida la skill `vigia-landing-structure`.

**Estado:** versión 2, **implementada** en `src/pages/index.astro`, con los textos en `src/data/vigia.js`. Quedan las [preguntas abiertas](#preguntas-abiertas) y los opcionales de video.

**Qué cambia respecto de la versión 1:**

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
- **Herbicidas no aparece.**
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
Header ─ Cómo funciona · Impacto · Nosotros · Contacto · Educación (/educacion) · [Ingresar]
│
│  ┌─ recorrido (.vg-journey: fondo por etapas + hilo) ─┐
├─ 1. Hero                 #inicio          · punto 1 · gráfico de balance (código)
├─ 2. El problema          #problema        · punto 2 · gráfico sin aviso → video problema
├─ 3. Qué hace VigIA       #que-hace        · punto 3 · cuatro tarjetas con foto + tres tipos de estrés
├─ 4. La solución          #como-funciona   · punto 4 · celular WhatsApp → video resolución
│  └────────────────────────────────────────────────────┘
├─ 5. Frase destacada                         (palabras que se encienden al hacer scroll)
├─ 6. Impacto              #impacto         (cuatro indicadores, tablas de grano y carbono)
├─ 7. Sobre nosotros       #nosotros        (personas con foto y logo de su empresa)
├─ 8. Clientes             #clientes        (carrusel)
├─ 9. Preguntas frecuentes #preguntas
├─ 10. Cierre (CTA)
└─ Footer                  #contacto
```

**Un solo CTA principal en toda la página:** **Contactanos para empezar a usar VigIA**. Abre WhatsApp con el mensaje "Hola, quiero empezar a usar VigIA BioEstrés". Va en el hero y en el cierre con el mismo texto.

---

## 1. Hero (`#inicio`)

| Elemento | Contenido |
|---|---|
| Etiqueta | ESTRÉS HÍDRICO Y TÉRMICO |
| Título (h1) | **Detectá el estrés antes de que se convierta en pérdida** |
| Bajada | VigIA BioEstrés cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos. |
| Palabras clave | Tres palabras con ícono, en una línea y sin tarjeta (en celular, una debajo de otra):<br>• **Desde antes de la siembra** (planta)<br>• **Por ambiente** (cuadrícula)<br>• **Alertas por WhatsApp** (logo de WhatsApp), centrado debajo de los otros dos |
| Botón | Sólo **Contactanos para empezar a usar VigIA** (WhatsApp, con flecha), monocromo: negro en tema claro y blanco en oscuro (decisión 33). Va en una fila propia, **centrado debajo de las dos columnas** y con aire arriba. Sin botón secundario (decisión 31). En celular, a todo el ancho, debajo del gráfico. |
| Visual | El gráfico termina a la altura de las palabras clave (la columna de texto ya no lleva los botones). `BalanceChart.astro`, simplificado: sólo la línea de agua útil, el umbral, "Hoy" y la zona de pronóstico (sin chips de datos, lluvia ni "Ejemplo ilustrativo"). La línea se dibuja y, justo antes de tocar el umbral, aparece la notificación, colgada de una línea punteada ámbar que sube desde el punto de **Hoy** (la alerta se envía hoy, cuando el pronóstico ya muestra el cruce; el punto ámbar del cruce es lo que se anticipa), con el logo de WhatsApp grande (el aviso llega por WhatsApp) y el texto **Alerta enviada · Estrés hídrico en 14 días**, y late el punto del cruce. El gráfico muestra 18 días de historia y los 14 del pronóstico (el horizonte del motor): la línea toca el umbral justo al final del pronóstico. En escritorio la notificación va sobre el gráfico (arriba a la derecha); en celular, debajo. Sin video. |

## 2. El problema (`#problema`)

Se mantiene de la versión 1.

| Elemento | Contenido |
|---|---|
| Etiqueta | EL PROBLEMA |
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Disposición:** etiqueta, título, bajada y razones van en la columna izquierda; el gráfico, a la derecha, queda centrado verticalmente entre el título y las razones.

**Dos razones**, sin numerar, cada una con un ícono ámbar (el color de este capítulo) y separadas por una línea fina: planta (el síntoma llega tarde para el bioinsumo) y nube con sol (el pronóstico regional no conoce tu lote). Son dos y no tres por la decisión 15: el síntoma tardío y el bioinsumo que llega tarde son la misma idea.

1. **El síntoma llega tarde para el bioinsumo.** Cuando la hoja se enrolla, el rinde ya está comprometido y aplicar el bioinsumo protege poco.
2. **El pronóstico regional no conoce tu lote.** No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.

**Visual:** `ProblemChart.astro`, simplificado como el del hero (mismas etiquetas grandes, sin lluvia ni "+6 días"): la línea gris cruza el umbral en silencio, el área roja "Rinde perdido" y la línea roja "Lo ves a campo" al final. Como cierre, una alerta roja **"Se ve a campo 6 días tarde · El bioinsumo ya no llega a tiempo"** cuelga del borde inferior de la tarjeta, debajo de "Lo ves a campo" (en celular, debajo del gráfico). Después, el video `problema`.

## 3. Qué hace VigIA (`#que-hace`)

Sección nueva (decisión 15). Cuenta qué hace VigIA: acompaña desde antes de la siembra, cuida el agua, detecta los picos de estrés durante toda la campaña y está orientado a bioinsumos. Además, toma los tipos de estrés que antes cerraban El problema. Punto 3 del hilo y fondo en celeste (decisión 23). La etiqueta "La solución" pasó a la sección 4 (decisión 30).

| Elemento | Contenido |
|---|---|
| Etiqueta | QUÉ HACE VIGIA (en celeste) |
| Título | **VigIA BioEstrés vigila el estrés toda la campaña** |
| Bajada | Sigue cada ambiente desde antes de la siembra hasta el final del ciclo, y te dice cuándo cuidar el agua y cuándo aplicar el bioinsumo. |

**Cuatro tarjetas con foto**, primero en la sección (decisión 38): foto arriba (4:3, apaisada; 16:9 en dos columnas) con **esquinas rectas**, título y texto corto, sin caja. Cuatro columnas en escritorio, dos en tablet, una en celular. Foto, título y texto comparten renglones (subgrid): si un título baja a dos líneas, los textos siguen arrancando a la misma altura.

| Tarjeta | Texto | Foto (provisoria) |
|---|---|---|
| Detecta picos de estrés | Encuentra los picos de estrés hídrico y térmico en cada ambiente y te sugiere la acción para cada uno. | 2.3, mano sobre soja marchita |
| Desde antes de la siembra | Sigue el agua del suelo antes de que siembres y acompaña todo el ciclo, no sólo el día del aviso. | 2.2, suelo agrietado (falta una de barbecho) |
| Cuida el uso del agua | Sabés cuánta agua útil tiene cada ambiente y regás sólo cuando hace falta. | 1.2, lote al sol (falta una de riego) |
| Orientado a bioinsumos | Cada alerta te sugiere el bioinsumo o el riego en el momento en que más protege al cultivo. | 3.2, pulverizadora |

"Desde antes de la siembra" va sin número a propósito: el balance arranca 60 días antes de la siembra, pero lo que importa es que acompaña todo el proceso. "Orientado a bioinsumos" se dice en positivo. Las fotos salen de `media-src/imagenes/`, achicadas a 800 px en `src/assets/quehace/`.

Los tipos de estrés ya no van en esta sección: pasaron a "Qué te avisa", en La solución (decisión 38).

Las fotos de las tarjetas son el único medio: la sección sigue haciendo de puente entre el problema y la solución.

## 4. La solución (`#como-funciona`)

Es el capítulo "con VigIA" del recorrido. **Lo principal son los dos canales de la alerta**, que es lo que recibe el cliente; los pasos van después y cortos.

| Elemento | Contenido |
|---|---|
| Etiqueta | LA SOLUCIÓN (el ancla sigue siendo `#como-funciona`, la del menú y el botón del hero) |
| Título | **Te avisa a tiempo para actuar** (sin nombrar los canales: ya los presentan las tarjetas) |
| Bajada | VigIA sigue cada ambiente día a día. Cuando se viene el estrés, te avisa con margen para aplicar el bioinsumo o regar. |

**Bloque principal (dos columnas):** a la izquierda, la etiqueta, el título, la bajada y los dos canales flotando, sin tarjeta ni línea entre ellos, con íconos **monocromos** (en el color del texto): **En tu WhatsApp** y **En la plataforma**. En escritorio los canales van más angostos (hasta 420 px) y centrados en su columna, con aire a los costados. A la derecha, alineado abajo (termina a la altura de la tarjeta de la plataforma y no se cruza con el título), un recuadro 4:3 (la proporción del video) que llena `WhatsAppMock.astro`, así no cambia de tamaño al pasar al video. El mensaje es simple: **⚠️ Estrés hídrico en 14 días** · Lote 12 · Ambiente 2 · Planificá riego o bioinsumo. Después, el video `resolucion` y el cierre **✅ Resuelta a tiempo**.

**Qué te avisa y cómo lo hace** (decisión 39): debajo del bloque principal, bien separados de él (96 px) y sobre el color normal de la página (el verde agua se funde al llegar a este bloque). Cada uno con su subtítulo **centrado**, un paso más grande que los títulos de adentro. Los dos bloques miden hasta 880 px y van centrados.

- **Qué te avisa VigIA:** cuatro alertas en fila, **sin tarjetas**, al estilo de las cifras de Impacto: título en negrita, frase sin negrita y en gris, y la acción en el verde de los puntos de la línea de tiempo (`--vg-icon-green`). Monocromo salvo la acción. Una línea vertical muy leve entre columnas (sin líneas en celular). Título, frase y acción comparten renglones (subgrid): si una frase ocupa menos renglones que la de al lado, va centrada en el suyo. En tablet, 2×2; en celular, una columna.

  | Título | Frase | Acción |
  |---|---|---|
  | Estrés hídrico | Falta de agua que se viene | Aplicá bioinsumo hídrico o regá. |
  | Estrés térmico | El aire seca a la planta | Aplicá un antiestrés térmico. |
  | Estrés combinado | Calor y sequía juntos | Actuá ese día: bioinsumo o riego. |
  | Etapa crítica | Se acerca la etapa que define el rinde | Aplicá el bioinsumo preventivo antes de la etapa. |

  Cuándo avisa cada una (`momento`: con margen, DPV sobre el umbral, mismo día, 14 días antes) queda en `src/data/vigia.js` pero no se muestra.

- **Cómo lo hace:** línea de tiempo **sin números**: cada paso centrado, con un punto verde encima del título y una línea fina de punto a punto. Al entrar en pantalla la línea se dibuja de izquierda a derecha y cada paso aparece cuando la línea llega a él. En celular la línea es vertical (punto a la izquierda). Con movimiento reducido se ve fija.

  | Paso | Título | Texto |
  |---|---|---|
  | 1 | Se cargan tus lotes | Ambientes, suelo y cultivo. El clima se conecta solo. |
  | 2 | Calcula cada día | Balance hídrico y DPV contra los umbrales de tu cultivo. |
  | 3 | Te avisa a tiempo | Cargás lluvias y riegos, y el cálculo se ajusta. |

  El paso 1 usa una redacción neutral ("se cargan") hasta confirmar quién hace el alta de lotes (pregunta abierta 1).

Los otros módulos (cultivos de servicio y carry-over de herbicidas) ya no van al pie de esta sección: pasaron al pie de las preguntas frecuentes.

## 5. Frase destacada

Sección propia, fuera del recorrido, con tipografía grande (sección B11 de `landing-page-design`).

> **Que el bioinsumo llegue antes que el estrés,**
> **no después del daño.**

- **Palabras resaltadas con los colores de la historia:** "antes" en verde (a tiempo) y "después del daño" en rojo (tarde). En `src/data/vigia.js` se marcan con `*verde*` y `_rojo_`.
- Cada palabra pasa de un tono apagado (≈30 % de opacidad) al color pleno a medida que cruza una línea de activación, en orden de lectura, con `--ease-fluid`.
- Con `prefers-reduced-motion` o sin JS, el texto se ve completo y sin animar.
- Es texto HTML (un `<p>`, no un heading), legible por lectores de pantalla.

## 6. Impacto (`#impacto`)

Impacto medible con datos del informe técnico (decisiones 19, 25 y 32): escenario base de 20.000 ha, cinco campañas continuas. Datos en `IMPACTO` (`src/data/vigia.js`); los totales se calculan a partir de los cultivos. La sección es más angosta que el resto (hasta 1000 px) y va centrada.

| Elemento | Contenido |
|---|---|
| Etiqueta | IMPACTO |
| Título | **Más grano y más carbono en el suelo** |
| Bajada | Resultados de cinco campañas continuas en lotes de maíz, soja y trigo. |

**Cuatro indicadores** grandes y centrados, con una línea corta debajo en letra chica, sin caja (en tablet, dos por fila):

| Indicador | Texto | Tabla |
|---|---|---|
| **+20.000 ha** | monitoreadas | — |
| **96 %** | de efectividad en la respuesta del bioinsumo | — |
| **+8.680 t** | de grano recuperado | Recupero de rinde por cultivo |
| **~3.300 t** | de CO₂ capturadas en el suelo (pendiente de confirmar: el informe da 2.800 a 4.100 t estables) | Carbono capturado por cultivo |

**Tablas:** los dos últimos indicadores son botones, marcados sólo con una flechita discreta debajo. La primera vez que la sección entra en pantalla aparece un aviso corto debajo de los dos indicadores que se despliegan, **Tocá un indicador para ver el detalle**, que se va solo a los pocos segundos. Al tocar un indicador se despliega su tabla en un panel centrado debajo de los cuatro, **de a una** (abrir una cierra la otra; el mismo indicador, la cruz o Escape la cierran). El indicador activo no lleva fondo: sólo el número toma su color (grano verde, carbono turquesa). Una **flecha** en el borde del panel apunta a él. Al cambiar de tabla (con una ya abierta), el recuadro queda fijo (la flecha se apoya en su borde y su línea cambia de color con una transición) y adentro sólo se desplaza el contenido, como un carrusel: la tabla que sale se va hacia un lado y la nueva entra desde el otro, sin desvanecerse, junto con la flecha y con la misma curva y duración. El panel se despliega con una animación de alto y opacidad (todo sin animación con movimiento reducido).

| Recupero de rinde | Hectáreas | kg/ha | Total |
|---|---|---|---|
| Maíz | 8.000 | 740 | 5.920 t |
| Soja | 7.000 | 230 | 1.610 t |
| Trigo | 5.000 | 230 | 1.150 t |
| **Total** | **20.000** | | **8.680 t** |

Nota: *Con los mismos insumos, labores y costos, protegés el rinde que ya invertiste.*

| Carbono (t CO₂) | Fijado | Vuelve al suelo | Queda estable |
|---|---|---|---|
| Maíz | 20.378 | 12.026 | 1.750–2.540 |
| Soja | 6.836 | 4.538 | 620–900 |
| Trigo | 4.818 | 3.186 | 460–660 |
| **Total** | **~32.000** | **~19.750** | **2.800–4.100** |

Nota: *Equivale a neutralizar las emisiones de 650 a 900 autos por año. El carbono que queda es el del rastrojo y las raíces; las raíces aportan el más estable.*

Sin calculadora (se quitó, decisión 32).

## 7. Sobre nosotros (`#nosotros`)

Reemplaza a Para quién es (decisión 21).

| Elemento | Contenido |
|---|---|
| Etiqueta | SOBRE NOSOTROS |
| Título | **Las personas detrás de VigIA BioEstrés** |
| Bajada | Un equipo que reúne tecnología agrícola, asesoramiento agronómico y bioinsumos. (Pendiente de revisar con el equipo.) |

Encabezado centrado y tres tarjetas chicas en un bloque angosto y centrado (hasta 760 px; en celular, una debajo de otra): foto redonda, nombre y, al pie bajo una línea fina, el logo de la empresa con el mismo alto que tiene en el carrusel de clientes (Rinde Plus, que no está en el carrusel, en la misma proporción). Los logos van a color en tema claro y en blanco en oscuro, como en el carrusel. Datos en `src/data/equipo.js`.

| Persona | Empresa | Foto |
|---|---|---|
| Marcos Flesia | Rinde Plus | Cargada (`marcos-flesia.webp`) |
| Juan Dall’Orso | Agroconsultor | Cargada (`juan-dallorso.webp`, recortada para centrar la cara) |
| Lucas Andreoni | BioRed | Cargada (`lucas-andreoni.webp`, 200 × 200: el original no da para más) |

## 8. Clientes (`#clientes`)

Carrusel **Confían en nosotros**, sin cambios.

## 9. Preguntas frecuentes (`#preguntas`)

Acordeón con `<details>`. Un script chico anima la altura al abrir y cerrar (0,7 s con `--ease-fluid`; la respuesta se funde) para que la pregunta de abajo baje sin salto; sin JS o con movimiento reducido queda el comportamiento nativo. Las mismas preguntas van como datos estructurados `FAQPage` (JSON-LD) para buscadores.

| Pregunta | Respuesta |
|---|---|
| ¿Necesito sensores o estaciones en el campo? | No. VigIA toma el clima en las coordenadas de cada lote. Si medís lluvias o agua útil, las cargás y el cálculo se ajusta. |
| ¿Qué tengo que cargar yo? | Al empezar se cargan tus lotes, ambientes y suelo. Después sólo sumás lluvias y riegos cuando pasan. |
| ¿Qué cultivos sigue? | Los cultivos de la campaña (en soja, con la fenología ajustada por latitud y grupo de madurez) y cultivos de servicio: centeno, cebada y vicia. |
| ¿Cómo me llegan las alertas? | En la plataforma, en el panel de cada lote, y por WhatsApp, sin tener que entrar. |
| ¿Sirve en secano? | Sí. En secano te avisa a tiempo para el bioinsumo. Bajo riego, además, te arma un plan mensual con su costo. |

**Al pie, otros módulos**, a todo el ancho, en dos columnas y sin línea divisoria, cada una con su enlace "Conocé …" con flecha (el enlace aparece cuando se carga la URL). Van acá y no en La solución para no cargar esa sección:

| Pregunta | Texto | Enlace |
|---|---|---|
| **¿Hacés cultivos de servicio?** | VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado. | Conocé cultivos de servicio (URL pendiente) |
| **¿Aplicaste herbicidas residuales?** | Con el carry-over de herbicidas de RindePlus sabés cuándo es seguro sembrar el cultivo siguiente. | Conocé carry-over de herbicidas (URL pendiente) |

## 10. Cierre (CTA final)

| Elemento | Contenido |
|---|---|
| Título | **La próxima pérdida ya se está gestando en algún lote. Encontrala primero.** |
| Texto | Agendá una demo de 20 minutos y te mostramos VigIA BioEstrés funcionando sobre tus lotes, con datos de tu campaña actual. |
| Botón | **Contactanos para empezar a usar VigIA** (WhatsApp) |

## Footer (`#contacto`)

Con la estructura de un footer de marca (decisión 37), fondo del tema y textos en `FOOTER` (`src/data/vigia.js`). **No repite el menú del header.**

- **Cuatro columnas a la misma altura**, para no dejar huecos (dos por fila en tablet, una en celular):
  - **Marca:** logo de VigIA BioEstrés **monocromo** (negro en claro, blanco en oscuro) y debajo las redes (Instagram, WhatsApp, email) en círculos de 48 px con borde. Van a la izquierda para que no las tape el WhatsApp flotante.
  - **Contacto:** email, WhatsApp y dirección en texto.
  - **Rinde Plus:** *¿Buscás más servicios especializados para tu producción? Rinde Plus tiene otras soluciones agtech para el campo.* Enlace **Visitá Rinde Plus ↗** a `https://rindeplus.com`. No dice que VigIA sea de Rinde Plus: la plataforma tiene otros socios (decisión 40).
  - **Ayuda:** Preguntas frecuentes · Escribinos por WhatsApp.
- **Pie, centrado:** **Política de privacidad** (`/privacidad`) · **Términos y condiciones** (`/terminos`), y debajo © año VigIA BioEstrés · Todos los derechos reservados.
- Sin newsletter: el sitio es estático y no tiene dónde guardar los emails.

**Páginas legales** (`LegalPage.astro`, textos en `src/data/legal.js`): describen lo que el sitio hace hoy (sin formularios, cuentas, analítica ni publicidad; guarda el tema en el navegador; carga Google Fonts; enlaza a WhatsApp, Instagram y Maps) e incluyen la leyenda de la AAIP de la Ley 25.326. **Son un borrador:** revisarlas con asesoría legal y completar razón social y CUIT antes de publicar.

## SEO

| Campo | Valor |
|---|---|
| `<title>` | VigIA BioEstrés · Anticipá el estrés hídrico y térmico de tus lotes |
| Meta description | Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp. |
| `og:image` | 1200×630 desde `media-src/imagenes/3.3.jpg` (el lote sano), con el logo. |
| Datos estructurados | `FAQPage` con las preguntas de la sección 8. |
| Indexar | Sí: es la página principal del dominio. |

---

## Medios: animaciones y videos

Cada sección del recorrido tiene **un** medio, dentro de `MediaStory.astro`: primero una animación en código y, si hay video, un fundido al video. Al terminar vuelve a empezar.

| Sección | Animación en código | Video (`public/videos/`) |
|---|---|---|
| 1. Hero | `BalanceChart.astro`, 11 s (animación de ~3,5 s y el final quieto para leerlo) | Ninguno: el gráfico es la propuesta del producto. |
| 2. El problema | `ProblemChart.astro`, 11 s (animación de ~4,6 s y el final quieto para leerlo) | `problema.mp4` (5,1 s, 2,9 MB): clip 2B, el lote se marchita y la mano toca una hoja. |
| 3. Cómo funciona | `WhatsAppMock.astro`, 4,5 s, más 3,2 s de cierre "Resuelta" después del video | `resolucion.mp4` (5,5 s, 1,5 MB): clip 3B → 3C, la pulverizadora al amanecer y el lote sano. |

**Estado:** los dos videos están en `public/videos/` con poster y cargados en `src/data/videos.js`. Los clips crudos y los masters están en `media-src/` (fuera del repo).

### Criterios

- **El mismo lote cuenta la historia:** VigIA vigila (1), sin aviso se pierde rinde (2), con el aviso se actúa a tiempo (3). La luz acompaña: mediodía seco en 2, amanecer en 3.
- **Interfaz en código, campo en video.** Lo que es interfaz (gráfico, alertas, celular) se anima en SVG y CSS: se ve nítido, sigue el tema y se corrige en minutos. El campo real va en video.
- **Sin texto dentro del video.** Los textos van en HTML.
- **Sin drones, satélites, HUD, robots ni marcas** en ningún medio.

### Requisitos técnicos

- Los videos se reproducen a **0,75x** (`playbackRate`): el campo se mira con calma. Las animaciones en código mantienen su velocidad. Con eso, `problema` dura unos 6,8 s y `resolucion` unos 7,3 s.
- `<video muted playsinline preload="none">` con `poster`. El video empieza a bajar cuando la sección entra en pantalla, mientras corre la animación.
- **Sólo MP4 (H.264)**, 960×720, 24 fps, sin audio. Con follaje fino, a igual calidad el WebM pesaba más. `webm` queda como campo opcional.
- Peso: hasta 4 MB por clip, priorizando que se vea bien (SSIM ≥ 0,98 contra el master).
- Con `prefers-reduced-motion` o sin JS: la animación queda en su estado final y el video no se muestra.
- Los videos quedan en el historial de git para siempre (por `docs/`). Si van a cambiar seguido, conviene un CDN.

### Rótulo y encuadre

- **Rótulo de capítulo:** durante el video aparece arriba a la izquierda, sin caja, en mayúsculas blancas con un ícono al principio: ⚠ rojo "Sin aviso · el daño se ve a campo" y ✓ verde "Con el aviso · se aplica a tiempo". Un degradé oscuro suave arriba del video lo hace legible sobre el cielo claro. Aparece 1,2 s después de que arranca el video, cuando la escena ya se leyó. Campos `rotulo` y `tono` en `src/data/videos.js`.
- **Encuadre:** en celular el contenedor es casi cuadrado y el video 4:3 se recorta a los costados. El campo `encuadre` (`object-position`) conserva los silos y la pulverizadora.

### Cierre espejo en Cómo funciona

Al terminar el video de resolución vuelve el celular y, durante 3,2 s, el aviso "⚠️ Estrés hídrico en 14 días" se cruza con "✅ Resuelta a tiempo", con un borde verde en el mensaje. Después reinicia el ciclo. Es el espejo del "Sin aviso" del gráfico del problema.

- Lo maneja `MediaStory` con la prop `cierre` (ms) y la etapa `data-stage="cierre"`; el texto está en `COMO_FUNCIONA.mensaje.resuelta`.
- Es narrativo: no afirma que la plataforma registre la aplicación ni que el balance vuelva sobre el umbral (el video muestra una aplicación de bioinsumo, no un riego).
- Con movimiento reducido no hay etapas: se ve el aviso original.

## Recorrido: hilo y fondo

Las secciones 1 a 4 comparten un contenedor (`.vg-journey`) con un fondo que cambia por etapas y un hilo que se dibuja con el scroll (`JourneyThread.astro`).

| Sección | Hilo | Fondo |
|---|---|---|
| 1. Hero | Verde: VigIA vigila el lote. Punto **1**. | El color normal de la página. |
| 2. El problema | Ámbar y rojo: el agua cruza el umbral sin aviso. Punto **2**. | Arena, marcado (`--vg-bg-seco`). |
| 3. Qué hace VigIA | Celeste: aparece la respuesta. Punto **3**. | Celeste (`--vg-bg-solucion`). |
| 4. La solución | Verde: el lote se salvó. Punto **4**. | Verde agua (`--vg-bg-agua`). |

- El color cambia **en el borde de cada sección**, con un fundido largo (hasta 480 px, centrado en el borde) y curva suave, mezclado en oklab: no hay escalón ni bandas. El verde agua vuelve al color de la página al llegar a "Qué te avisa VigIA" (`.vg-detalle`): el fundido arranca un poco antes del bloque y termina dentro de él. Arena, celeste y verde agua van apagados y con saturación pareja, para que se lean como una sola familia. El hilo no termina en seco: pasa por el final de "Cómo lo hace" (`.vg-detalle`, `data-vg-end`), baja por el costado y dobla para entrar de costado en la frase destacada, a la altura de su renglón del medio, en un punto verde que se rellena y late cuando el hilo llega, con la frase más o menos a mitad de pantalla (la punta del hilo va al 55 % de la pantalla y el tramo horizontal final pide poco scroll). Así el recorrido del lote termina en la moraleja.
- Con movimiento reducido, el hilo aparece completo y quieto.
- El fondo por etapas es una **excepción provisoria** a la regla de fondos planos (ver `CLAUDE.md`).

---

## Plan de implementación

De la versión 1 a la versión 2. Cada paso deja la página funcionando.

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
- Búsqueda en `src/`: sin "IA" fuera de "VigIA", sin "inteligencia artificial", "satélite", "NDVI", "plaga", "fungicida" ni "Herbicidas".
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
| 10 | Prueba en el hero | No lleva: la prueba social queda en el carrusel "Confían en nosotros". |
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

## Preguntas abiertas

1. **Alta de lotes (pendiente de consultar con la empresa):** ¿la carga inicial de lotes, ambientes y suelo la hace el equipo de VigIA o el usuario? Mientras tanto, el paso 1 y la pregunta "¿Qué tengo que cargar yo?" usan una redacción neutral ("se cargan"). Cuando se confirme, pasar a "Cargamos tus lotes" o "Cargás tus lotes".
2. **Legales:** hay borradores de política de privacidad y términos (`/privacidad`, `/terminos`). Falta revisarlos con asesoría legal y completar razón social y CUIT. Todavía presentan a VigIA BioEstrés como "una solución de Rinde Plus": definir quién figura como responsable del sitio (decisión 40).
