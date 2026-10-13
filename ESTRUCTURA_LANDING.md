# Estructura de la landing de VigIA

Plan de contenido de la home, organizado en **3 módulos principales** más los bloques de soporte (clientes, contacto) que ya están implementados. Este documento define qué va en cada módulo; las animaciones y los videos se suman en una segunda etapa (ver [Animaciones y video](#animaciones-y-video)).

## Reglas de contenido

- **No mencionar Inteligencia Artificial.** Ni "IA", ni "modelos inteligentes", ni "proyección con IA". "VigIA" queda sólo como nombre de marca. El respaldo del producto es agronómico: clima, DPV, balance hídrico, fenología y suelo.
- **Herbicidas no aparece.** Está fuera del alcance del nuevo producto.
- **Las acciones recomendadas son genéricas:** "bioinsumo" o "riego", sin productos ni marcas. Más adelante se suma la recomendación de insumos con el socio comercial.
- **Las alertas llegan por dos canales:** dentro de la plataforma y como notificación al celular por WhatsApp.
- **Tono:** voseo rioplatense, frases cortas, igual que la landing de Rinde Plus.

## Mapa de la página

```
Header ─ Cómo funciona · Alertas · Clientes · Contacto · [Ingresar]
│
├─ 1. INTRODUCCIÓN            #inicio
├─    Clientes (carrusel)      #clientes        ← ya implementado
├─ 2. QUÉ PROBLEMA RESUELVE   #problema
├─ 3. LA MEJORA REAL          #mejora
│     3.1 Alertas predictivas
│     3.2 En la plataforma y en tu WhatsApp
│     3.3 Cómo lo logra (los datos)
│     3.4 También para cultivos de servicio
├─    CTA final
└─ Footer / contacto           #contacto        ← ya implementado
```

---

## 1. Introducción (`#inicio`)

Basado en la tarjeta "VigIA BioEstrés · Mitigación de Estrés" de la landing de Rinde Plus, sin la mención a IA. Por ahora la marca se presenta sólo como **VigIA** (sin "BioEstrés").

| Elemento | Contenido |
|---|---|
| Marca | **VigIA** (logo de VigIA) |
| Etiqueta | ESTRÉS HÍDRICO Y TÉRMICO |
| Título | **Mitigación de Estrés** |
| Descripción | Monitoreá y anticipá el estrés hídrico y térmico antes de que se manifieste. VigIA cruza el clima, el balance hídrico y el suelo de cada lote para darte alertas tempranas y un manejo preventivo con bioinsumos. |
| Puntos clave | • Monitoreo de temperatura, humedad y DPV<br>• Pronóstico climático y balance hídrico de cada ambiente<br>• Alertas tempranas de estrés hídrico y térmico, en la plataforma y por WhatsApp |
| Botones | **Quiero una demo** (abre WhatsApp) · **Cómo funciona** (baja al módulo 3) |
| Visual | Gráfico del balance hídrico con la alerta "Estrés hídrico moderado en 4 días" (ya existe, `BalanceChart.astro`). Candidato a video en la etapa 2. |

Debajo del módulo va el carrusel **Confían en nosotros** (ya implementado).

---

## 2. Qué problema resuelve (`#problema`)

| Elemento | Contenido |
|---|---|
| Etiqueta | EL PROBLEMA QUE RESUELVE |
| Título | **El cultivo muestra el estrés cuando ya perdiste rinde** |
| Bajada | Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho. |

**Tres razones** (tarjetas numeradas 01-03):

1. **El estrés se ve tarde.** Cuando la hoja se enrolla o el cultivo cambia de color, el daño fisiológico ya ocurrió y el rinde ya está comprometido.
2. **El bioinsumo necesita llegar antes.** Un bioinsumo antiestrés acompaña a la planta para atravesar el momento difícil. Aplicado cuando el estrés ya pasó, protege poco.
3. **El pronóstico regional no conoce tu lote.** Saber que va a hacer calor no alcanza: hay que saber cuánta agua le queda a tu suelo y en qué etapa está tu cultivo.

**Qué estrés se mitiga** (tres tarjetas):

| Estrés | Texto |
|---|---|
| Hídrico | El agua útil del suelo cae por debajo del umbral que el cultivo necesita en su etapa actual. |
| Térmico (DPV) | El déficit de presión de vapor supera el límite del cultivo: el aire seca a la planta más rápido de lo que ella puede reponer agua. |
| Combinado | Falta de agua y DPV alto el mismo día. Es el escenario más dañino y el que exige actuar primero. |

---

## 3. La mejora real (`#mejora`)

| Elemento | Contenido |
|---|---|
| Etiqueta | LA MEJORA REAL |
| Título | **Alertas tempranas para actuar antes que el estrés** |
| Bajada | Recibís alertas predictivas para actuar de forma preventiva, proteger el rendimiento y aplicar los bioinsumos en el momento justo. |

### 3.1 Alertas predictivas

El pronóstico entra en el balance hídrico, así que las alertas miran hacia adelante:

- **Estrés hídrico a 4 días:** el agua útil va a cruzar el umbral del cultivo.
- **Episodios de DPV en las próximas dos semanas:** rachas sostenidas, no un pico de un día.
- **Período crítico próximo:** el cultivo entra en su etapa más sensible en 14 días o menos.

Cada alerta trae **severidad** y **acción concreta**. Ejemplos (los mismos que genera el motor):

| Severidad | Alerta | Acción |
|---|---|---|
| Alerta | Estrés hídrico moderado en 4 días | Planificar riego o bioinsumo en la ventana de hoy a 3 días |
| Preventiva | Período crítico próximo | Bioinsumo preventivo antes de que el cultivo entre al estadio |
| Crítica | Exceso de DPV sostenido | Mitigar el estrés térmico: antiestrés foliar o riego |
| Crítica | Estrés hídrico + térmico combinado | Intervención inmediata: bioinsumo hídrico más antiestrés térmico |

### 3.2 En la plataforma y en tu WhatsApp

Es el diferencial más fuerte del módulo: la alerta no espera a que abras la plataforma.

- **En la plataforma:** panel de alertas por lote y ambiente, con el balance hídrico y el DPV que la explican.
- **En tu celular por WhatsApp:** cuando se activa una alerta, te llega un mensaje con el lote, el estrés que viene, cuándo y qué hacer.

Visual propuesto: un celular con el mensaje de WhatsApp al lado del panel de la plataforma. Mensaje de ejemplo:

> **VigIA · Lote 12 – Ambiente 2**
> ⚠️ Estrés hídrico moderado en 4 días.
> Acción sugerida: planificar riego o bioinsumo entre hoy y el jueves.
> Ver detalle en la plataforma →

### 3.3 Cómo lo logra

Sin la mención a IA, los datos son el respaldo de que las alertas funcionan. Cuatro tarjetas:

| Dato | Texto |
|---|---|
| Clima y DPV | Temperatura y humedad diarias en las coordenadas del lote, el historial de la campaña y el pronóstico de los próximos 14 días. Con eso VigIA calcula el DPV de cada día y lo compara con los umbrales del cultivo. |
| Cultivo y fenología | A partir de la fecha de siembra y el ciclo o grupo de madurez, sigue la etapa del cultivo día a día y su consumo de agua en cada etapa, incluido el período crítico. |
| Lluvias y riego | Cargás las lluvias que registrás en el lote y los riegos de cada ambiente. El balance usa lo que realmente cayó en tu campo. |
| Textura del suelo | Desde los muestreos de suelo de cada ambiente estima la capacidad de campo, el punto de marchitez y el agua útil del perfil. |

### 3.4 También para cultivos de servicio

Bloque secundario, más chico que el resto del módulo.

- **Título:** VigIA Cultivo de Servicio
- **Texto:** Seguí cuánta agua consume tu cultivo de servicio frente a un barbecho y elegí el momento de secado que protege la recarga del perfil para el cultivo que viene.
- **Puntos:** consumo contra barbecho · lluvia que realmente infiltra · momento óptimo de secado · materia seca estimada.

---

## CTA final y footer

- **CTA:** "Que el bioinsumo llegue antes que el estrés" · "Contanos tus lotes y te mostramos VigIA funcionando con tus datos." · botón **Hablemos por WhatsApp**.
- **Footer:** contacto directo (email, Instagram, WhatsApp, oficina). Ya implementado.

## Qué cambia respecto de la página actual

| Hoy | Con esta estructura |
|---|---|
| Hero con título "Anticipá el estrés de tu cultivo…" | Introducción con la identidad **VigIA · Mitigación de Estrés** |
| Secciones sueltas: problema, tipos de estrés, cómo funciona, alertas, cultivo de servicio, pasos | Tres módulos: problema (con tipos de estrés) y mejora real (alertas, canales, datos, cultivo de servicio) |
| Las alertas no dicen por dónde llegan | Bloque propio: plataforma + WhatsApp |
| "De la siembra a la decisión" (4 pasos) | Pendiente de definir: se conserva por ahora (ver decisiones) |

---

## Animaciones y video

Segunda etapa. La idea es que cada módulo tenga **un** elemento en movimiento, no varios.

| Módulo | Propuesta |
|---|---|
| 1. Introducción | Video corto en loop (5-8 s): lote visto desde arriba, transición de verde sano a cultivo estresado por calor y sequía. Alternativa liviana: animar el gráfico existente (la línea de agua útil bajando hasta cruzar el umbral y la alerta apareciendo). |
| 2. Problema | Clip de hoja enrollándose bajo el sol o del suelo agrietándose. Las tarjetas entran al hacer scroll. |
| 3. Mejora real | Animación del celular recibiendo el WhatsApp de VigIA. Las alertas aparecen una por una con su color de severidad. |

**Herramientas:** los clips se pueden generar con Higgsfield u otra herramienta similar. Usar IA para producir el video no contradice la regla de contenido: lo que no se dice es que el producto usa IA.

**Requisitos técnicos para que la página no se vuelva pesada:**

- `<video autoplay muted loop playsinline>` con `poster` (imagen de la primera escena), formatos **WebM + MP4**, y carga diferida para los videos que no están arriba de todo.
- Tamaño objetivo: menos de 2-4 MB por clip, 720p alcanza para fondos.
- Con `prefers-reduced-motion` se muestra el `poster` en lugar del video.
- Ojo con GitHub Pages: el build se commitea en `docs/`, así que cada versión de un video queda en el historial del repo para siempre. Si los videos van a cambiar seguido, conviene alojarlos fuera del repo (por ejemplo, en un CDN o en un bucket) y referenciarlos por URL.
- Los textos importantes nunca van dentro del video: siempre como texto HTML, por accesibilidad y SEO.

## Decisiones

| # | Tema | Decisión |
|---|---|---|
| 1 | Nombre visible | **VigIA**, por ahora sin "BioEstrés". |
| 2 | WhatsApp en el lanzamiento | **Va a estar listo cuando se publique la landing.** Se presenta como funcionalidad disponible, sin "Próximamente". |
| 3 | Sección "De la siembra a la decisión" | **Pendiente.** Hasta que se defina, se mantiene como está. |
| 4 | Logos del carrusel | **Se mantienen igual** que en la landing de Rinde Plus. |
