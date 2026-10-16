// Contenido de la home, un objeto por sección (ver doc/landing/ESTRUCTURA_LANDING.md,
// versión 2). Cada afirmación tiene respaldo en doc/landing/MODULO_VIGIA.md §10:
// balance hídrico FAO-56 por ambiente, DPV contra umbrales por cultivo,
// pronóstico a 14 días y las alertas de alertEngine.ts.
// Reglas (skill vigia-landing-structure): sin IA, satélite, estrés biótico ni
// Herbicidas; acciones genéricas (bioinsumo o riego), sin productos ni marcas.

import { WHATSAPP_URL } from './social';
import imgEstres from '../assets/quehace/estres.webp';
import imgSiembra from '../assets/quehace/siembra.webp';
import imgAgua from '../assets/quehace/agua.webp';
import imgBioinsumos from '../assets/quehace/bioinsumos.webp';

// Grafía del logo. Si cambia la marca, se cambia acá.
export const MARCA = 'VigIA BioEstrés';

// CTA único de la página: mismo texto en el hero y en el cierre.
export const CTA = {
  texto: 'Contactanos para empezar a usar VigIA',
  mensajeWhatsApp: `Hola, quiero empezar a usar ${MARCA}`,
};

export const SEO = {
  titulo: MARCA,
  descripcion:
    'Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp.',
};

// 1. Hero
export const HERO = {
  etiqueta: 'Estrés hídrico y térmico',
  titulo: 'Detectá el estrés antes de que se convierta en pérdida',
  bajada: `${MARCA} cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos.`,
  // Tres palabras clave con ícono, en una línea (los íconos se asignan por id
  // en index.astro).
  puntos: [
    { id: 'siembra', titulo: 'Desde antes de la siembra' },
    { id: 'ambiente', titulo: 'Por ambiente' },
    { id: 'whatsapp', titulo: 'Alertas por WhatsApp' },
  ],
};

// 2. El problema
export const PROBLEMA = {
  etiqueta: 'El problema',
  titulo: 'El cultivo muestra el estrés cuando ya perdiste rinde',
  bajada: 'Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho.',
  razones: [
    {
      id: 'sintoma',
      titulo: 'El síntoma llega tarde para el bioinsumo',
      texto: 'Cuando la hoja se enrolla, el rinde ya está comprometido y aplicar el bioinsumo protege poco.',
    },
    {
      id: 'pronostico',
      titulo: 'El pronóstico regional no conoce tu lote',
      texto: 'No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.',
    },
  ],
};

// 3. Qué hace VigIA. Los tres tipos de estrés que vigila, contados desde lo
// que hace el motor (balance hídrico, DPV contra umbral, combinado) y con la
// acción genérica que sugiere cada alerta (alertEngine.ts, MODULO_VIGIA §10.2).
export const QUE_HACE = {
  etiqueta: 'Qué hace VigIA',
  titulo: `${MARCA} vigila el estrés toda la campaña`,
  // Abarca las cuatro tarjetas: acompaña todo el ciclo (ventana siembra
  // −60 / +150, MODULO_VIGIA §10.2) y la acción es agua o bioinsumo.
  bajada:
    'Sigue cada ambiente desde antes de la siembra hasta el final del ciclo, y te dice cuándo cuidar el agua y cuándo aplicar el bioinsumo.',
  // Cuatro tarjetas con foto, primero en la sección. La de los picos de
  // estrés va primera: es lo principal y la desarrollan los tres tipos de
  // abajo. Fotos de la serie de media-src/imagenes (qh-*.png), generadas
  // con Nano Banana Pro y la imagen 0 (el lote) como referencia.
  puntos: [
    {
      id: 'picos',
      titulo: 'Detecta picos de estrés',
      texto: 'Encuentra los picos de estrés hídrico y térmico en cada ambiente y te sugiere la acción para cada uno.',
      imagen: imgEstres,
      alt: 'Hojas de soja que empiezan a plegarse bajo el sol fuerte del mediodía',
    },
    {
      // Sin número a propósito: lo que importa es que acompaña todo el proceso.
      id: 'siembra',
      titulo: 'Desde antes de la siembra',
      texto: 'Sigue el agua del suelo antes de que siembres y acompaña todo el ciclo, no sólo el día del aviso.',
      imagen: imgSiembra,
      alt: 'Sembradora entrando a un lote en barbecho con rastrojo al amanecer',
    },
    {
      // Balance por ambiente y plan de riego.
      id: 'agua',
      titulo: 'Cuida el uso del agua',
      texto: 'Sabés cuánta agua útil tiene cada ambiente y regás sólo cuando hace falta.',
      imagen: imgAgua,
      alt: 'Equipo de riego por pivote regando un lote de soja al atardecer',
    },
    {
      // Las acciones son bioinsumo o riego; dicho en positivo.
      id: 'bioinsumo',
      titulo: 'Orientado a bioinsumos',
      texto: 'Cada alerta te sugiere el bioinsumo o el riego en el momento en que más protege al cultivo.',
      imagen: imgBioinsumos,
      alt: 'Gotas finas de una aplicación sobre hojas de soja al amanecer',
    },
  ],
};

// 4. La solución (cómo funciona: canales, avisos y pasos)
export const COMO_FUNCIONA = {
  etiqueta: 'La solución',
  // Sin nombrar los canales: ya los presentan las dos tarjetas de abajo.
  titulo: 'Te avisa a tiempo para actuar',
  bajada:
    'VigIA sigue cada ambiente día a día. Cuando se viene el estrés, te avisa con margen para aplicar el bioinsumo o regar.',
  // Los dos canales son el valor principal: van primero y grandes.
  canales: [
    {
      id: 'whatsapp',
      titulo: 'En tu WhatsApp',
      texto: 'El aviso te llega al celular con la acción sugerida, sin tener que entrar a ningún lado.',
    },
    {
      id: 'plataforma',
      titulo: 'En la plataforma',
      texto: 'El panel del lote, con el balance hídrico y el DPV que explican cada alerta.',
    },
  ],
  // Qué te avisa: las alertas del motor (estrés hídrico, período crítico a
  // 14 días, estrés combinado) más el térmico, en lenguaje de campo. Cada
  // una: el tipo (título), qué pasa (`titulo`) y la acción concreta
  // (`accion`, de alertEngine.ts: bioinsumo hídrico, antiestrés térmico,
  // bioinsumo preventivo o riego).
  // `momento` = cuándo llega el aviso. Hoy no se muestra; queda por si se
  // recupera (p. ej. "14 días antes" en Etapa crítica).
  alertas: [
    {
      id: 'hidrico',
      tipo: 'Estrés hídrico',
      momento: 'Con margen',
      titulo: 'Falta de agua que se viene',
      accion: 'Aplicá bioinsumo hídrico o regá.',
    },
    {
      id: 'termico',
      tipo: 'Estrés térmico',
      momento: 'DPV sobre el umbral',
      titulo: 'El aire seca a la planta',
      accion: 'Aplicá un antiestrés térmico.',
    },
    {
      id: 'combinado',
      tipo: 'Estrés combinado',
      momento: 'Mismo día',
      titulo: 'Calor y sequía juntos',
      accion: 'Actuá ese día: bioinsumo o riego.',
    },
    {
      id: 'critico',
      tipo: 'Etapa crítica',
      momento: '14 días antes',
      titulo: 'Se acerca la etapa que define el rinde',
      accion: 'Aplicá el bioinsumo preventivo antes de la etapa.',
    },
  ],
  // Cómo lo hace: tres pasos cortos. Paso 1 con redacción neutral ("se
  // cargan") hasta confirmar quién hace el alta de lotes (pregunta abierta 1
  // de ESTRUCTURA_LANDING.md).
  pasos: [
    { id: 'lotes', titulo: 'Se cargan tus lotes', texto: 'Ambientes, suelo y cultivo. El clima se conecta solo.' },
    { id: 'calculo', titulo: 'Calcula cada día', texto: 'Balance hídrico y DPV contra los umbrales de tu cultivo.' },
    { id: 'alerta', titulo: 'Te avisa a tiempo', texto: 'Cargás lluvias y riegos, y el cálculo se ajusta.' },
  ],
  // Mensaje de ejemplo del celular (WhatsAppMock.astro).
  // Simple a propósito: la alerta, dónde y qué hacer.
  mensaje: {
    alerta: 'Estrés hídrico en 14 días',
    lote: 'Lote 12 · Ambiente 2',
    accion: 'Planificá riego o bioinsumo.',
    hora: '07:30',
    // Cierre después del video de resolución (MediaStory `cierre`). Narrativo:
    // no afirma que la plataforma registre la aplicación.
    resuelta: 'Resuelta a tiempo',
  },
  // Otros módulos, con enlace a su página. Se muestran al pie de las
  // preguntas frecuentes, no en esta sección.
  // Carry-over de herbicidas es de RindePlus, no de VigIA BioEstrés
  // (decisión 18 de ESTRUCTURA_LANDING.md); respaldo en MODULO_VIGIA, anexo A.
  // PENDIENTE: las URL. Con `href: null` el enlace no se muestra.
  modulos: [
    {
      id: 'servicio',
      pregunta: '¿Hacés cultivos de servicio?',
      texto: 'VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado.',
      enlace: { texto: 'Conocé cultivos de servicio', href: null },
    },
    {
      id: 'herbicidas',
      pregunta: '¿Aplicaste herbicidas residuales?',
      texto: 'Con el carry-over de herbicidas de RindePlus sabés cuándo es seguro sembrar el cultivo siguiente.',
      enlace: { texto: 'Conocé carry-over de herbicidas', href: null },
    },
  ],
};

// 5. Frase destacada: una línea por renglón.
// Palabras resaltadas con los colores de la historia: *verde* (a tiempo) y
// _rojo_ (tarde).
export const FRASE = ['Que el bioinsumo llegue *antes* que el estrés,', 'no _después del daño._'];

// 6. Impacto: resultados medidos en campo (decisiones 19, 25, 32 y 34 de ESTRUCTURA_LANDING.md).
// Datos del informe técnico: escenario base de 20.000 ha, cinco campañas
// continuas. Son resultados de campo, no del motor. Los totales se calculan
// a partir de los cultivos, así no hay dos números que puedan desparejarse.
// CO₂ en t: fijado por fotosíntesis (toda la biomasa extra), el que vuelve
// al suelo con rastrojo y raíces, y el rango que queda estable.
const CULTIVOS_IMPACTO = [
  { id: 'maiz', nombre: 'Maíz', kgHa: 740, hectareas: 8000, co2: { fijado: 20378, suelo: 12026, estable: [1750, 2540] } },
  { id: 'soja', nombre: 'Soja', kgHa: 230, hectareas: 7000, co2: { fijado: 6836, suelo: 4538, estable: [620, 900] } },
  { id: 'trigo', nombre: 'Trigo', kgHa: 230, hectareas: 5000, co2: { fijado: 4818, suelo: 3186, estable: [460, 660] } },
];

const fmt = (n) => new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(n);
const suma = (f) => CULTIVOS_IMPACTO.reduce((t, c) => t + f(c), 0);
const HA_TOTAL = suma((c) => c.hectareas); // 20.000
const GRANO_T = suma((c) => (c.kgHa * c.hectareas) / 1000); // 8.680
const CO2_FIJADO = suma((c) => c.co2.fijado); // 32.032 → "~32.000"
const CO2_SUELO = suma((c) => c.co2.suelo); // 19.750
// Rango estable del informe (2.800 a 4.100); la suma de mínimos da 2.830.
const CO2_ESTABLE = { min: 2800, max: 4100 };

export const IMPACTO = {
  etiqueta: 'Impacto',
  titulo: 'Más grano y más carbono en el suelo',
  bajada: 'Resultados de cinco campañas continuas en lotes de maíz, soja y trigo.',

  // Cuatro indicadores grandes con una línea corta debajo. Los dos últimos
  // abren su tabla por cultivo (un panel centrado debajo, de a uno).
  // PENDIENTE: confirmar "~3.300 t" de carbono; el informe da un rango
  // estable de 2.800 a 4.100 t (punto medio 3.450).
  indicadores: [
    { id: 'hectareas', valor: `+${fmt(HA_TOTAL)}`, unidad: 'ha', texto: 'monitoreadas' },
    { id: 'efectividad', valor: '96', unidad: '%', texto: 'de efectividad en la respuesta del bioinsumo' },
    {
      id: 'grano',
      valor: `+${fmt(GRANO_T)}`,
      unidad: 't',
      texto: 'de grano recuperado',
      tabla: {
        titulo: 'Recupero de rinde por cultivo',
        columnas: ['Cultivo', 'Hectáreas', 'kg/ha', 'Total'],
        filas: [
          ...CULTIVOS_IMPACTO.map((c) => [c.nombre, fmt(c.hectareas), fmt(c.kgHa), `${fmt((c.kgHa * c.hectareas) / 1000)} t`]),
          ['Total', fmt(HA_TOTAL), '', `${fmt(GRANO_T)} t`],
        ],
        nota: 'Con los mismos insumos, labores y costos, protegés el rinde que ya invertiste.',
      },
    },
    {
      id: 'carbono',
      valor: '~3.300',
      unidad: 't',
      texto: 'de CO₂ capturadas en el suelo',
      tabla: {
        titulo: 'Carbono capturado por cultivo (t CO₂)',
        columnas: ['Cultivo', 'Fijado', 'Vuelve al suelo', 'Queda estable'],
        filas: [
          ...CULTIVOS_IMPACTO.map((c) => [
            c.nombre,
            fmt(c.co2.fijado),
            fmt(c.co2.suelo),
            `${fmt(c.co2.estable[0])}–${fmt(c.co2.estable[1])}`,
          ]),
          ['Total', `~${fmt(Math.round(CO2_FIJADO / 1000) * 1000)}`, `~${fmt(CO2_SUELO)}`, `${fmt(CO2_ESTABLE.min)}–${fmt(CO2_ESTABLE.max)}`],
        ],
        // El grano se cosecha y su carbono vuelve a la atmósfera; lo que
        // puede quedar es el del rastrojo y las raíces.
        nota: 'Equivale a neutralizar las emisiones de 650 a 900 autos por año. El carbono que queda es el del rastrojo y las raíces; las raíces aportan el más estable.',
      },
    },
  ],
  // Aviso que aparece una sola vez, cuando la sección entra en pantalla.
  pista: 'Tocá un indicador para ver el detalle',
  cerrar: 'Cerrar detalle',
};

// 7. Sobre nosotros (reemplaza a "Para quién es", decisión 21). Las personas,
// con foto y logo, están en src/data/equipo.js.
// PENDIENTE: revisar la bajada con el equipo.
export const NOSOTROS = {
  etiqueta: 'Sobre nosotros',
  titulo: `Las personas detrás de ${MARCA}`,
  bajada: 'Un equipo que reúne tecnología agrícola, asesoramiento agronómico y bioinsumos.',
};

// 9. Preguntas frecuentes (también van como JSON-LD FAQPage).
export const PREGUNTAS = {
  etiqueta: 'Preguntas frecuentes',
  titulo: 'Lo que suelen preguntarnos',
  items: [
    {
      pregunta: '¿Necesito sensores o estaciones en el campo?',
      respuesta:
        'No. VigIA toma el clima en las coordenadas de cada lote. Si medís lluvias o agua útil, las cargás y el cálculo se ajusta.',
    },
    {
      pregunta: '¿Qué tengo que cargar yo?',
      // Redacción neutral hasta confirmar quién hace el alta de lotes.
      respuesta:
        'Al empezar se cargan tus lotes, ambientes y suelo. Después sólo sumás lluvias y riegos cuando pasan.',
    },
    {
      pregunta: '¿Qué cultivos sigue?',
      respuesta:
        'Los cultivos de la campaña (en soja, con la fenología ajustada por latitud y grupo de madurez) y cultivos de servicio: centeno, cebada y vicia.',
    },
    {
      pregunta: '¿Cómo me llegan las alertas?',
      respuesta: 'En la plataforma, en el panel de cada lote, y por WhatsApp, sin tener que entrar.',
    },
    {
      pregunta: '¿Sirve en secano?',
      respuesta:
        'Sí. En secano te avisa a tiempo para el bioinsumo. Bajo riego, además, te arma un plan mensual con su costo.',
    },
  ],
};

// 10. Cierre
export const CIERRE = {
  titulo: 'La próxima pérdida ya se está gestando en algún lote. Encontrala primero.',
  texto: `Agendá una demo de 20 minutos y te mostramos ${MARCA} funcionando sobre tus lotes, con datos de tu campaña actual.`,
};

// Página /educacion (src/pages/educacion.astro), enlazada al final del menú.
// PENDIENTE: contenido definitivo. Por ahora, una página provisoria.
export const EDUCACION = {
  etiqueta: 'Educación',
  titulo: 'Educación',
  bajada: `Estamos preparando contenidos sobre estrés hídrico y térmico, bioinsumos y uso del agua, para sacarle más provecho a ${MARCA}.`,
  volver: 'Volver al inicio',
};

// Footer (src/components/Footer.astro). No repite el menú del header: suma
// Rinde Plus (con sus otras soluciones), ayuda y los enlaces legales.
export const FOOTER = {
  contacto: { titulo: 'Contacto' },
  rindeplus: {
    titulo: 'Rinde Plus',
    // Sin decir que VigIA es de Rinde Plus: la plataforma tiene otros socios.
    texto: '¿Buscás más servicios especializados para tu producción? Rinde Plus tiene otras soluciones agtech para el campo.',
    enlace: 'Visitá Rinde Plus',
    href: 'https://rindeplus.com',
  },
  ayuda: {
    titulo: 'Ayuda',
    enlaces: [
      { texto: 'Preguntas frecuentes', href: '/#preguntas', externo: false },
      { texto: 'Escribinos por WhatsApp', href: WHATSAPP_URL, externo: true },
    ],
  },
  // Páginas en src/pages (textos en src/data/legal.js, borrador a revisar).
  legales: [
    { texto: 'Política de privacidad', href: '/privacidad' },
    { texto: 'Términos y condiciones', href: '/terminos' },
  ],
  pie: 'Todos los derechos reservados.',
};
