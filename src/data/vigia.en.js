// Contenido en inglés: mismas claves que src/data/vigia.js (español, la
// fuente). Es una adaptación, no una traducción palabra por palabra: cada
// término y frase está explicado en doc/landing/TRADUCCION_EN.md (glosario y
// reglas). En resumen:
// - Inglés de agronegocios internacional (ortografía de EE. UU.), unidades
//   métricas.
// - "lote" → field, "ambiente" → management zone, "agua útil" →
//   plant-available water, "bioinsumo" → biostimulant (estrés abiótico; nunca
//   "biologicals", que incluye control de plagas), "secano" → rainfed,
//   "cultivos de servicio" → cover crops, "DPV" → VPD, "rinde" → yield.
// - Las mismas afirmaciones que en español (skill vigia-landing-structure):
//   sin IA, satélite ni estrés biótico; acciones genéricas (bioestimulante o
//   riego).

import { buildWhatsAppUrl } from './social';
import { HA_TOTAL, GRANO_T, CO2_DESTACADO, formateador, filasImpacto } from './impactoDatos';
import imgEstres from '../assets/quehace/estres.webp';
import imgSiembra from '../assets/quehace/siembra.webp';
import imgAgua from '../assets/quehace/agua.webp';
import imgBioinsumos from '../assets/quehace/bioinsumos.webp';

// La marca no se traduce (ver TRADUCCION_EN.md, "Marca").
export const MARCA = 'VigIA BioEstrés';

// El equipo atiende en español: la nota lo aclara debajo del botón del
// cierre y en el botón flotante (decisión del usuario, TRADUCCION_EN.md).
export const CTA = {
  texto: 'Contact us to get started with VigIA',
  mensajeWhatsApp: `Hi, I'd like to get started with ${MARCA}`,
  nota: 'We are based in Argentina and our team replies in Spanish.',
};

export const WHATSAPP_URL = buildWhatsAppUrl("Hi, I'd like more information about VigIA");

export const SEO = {
  titulo: `${MARCA} · Water and heat stress alerts`,
  descripcion:
    'Water and heat stress alerts for every management zone, with days of lead time to apply a biostimulant or irrigate. On the platform and on WhatsApp.',
};

// 1. Hero
export const HERO = {
  // "Pérdida" se concreta como yield loss: "loss" solo queda vago en inglés.
  titulo: 'Catch crop stress before it turns into yield loss',
  bajada: `${MARCA} tracks every management zone from before planting and alerts you on WhatsApp days before water and heat stress shows up in the field. For growers and agronomists who make data-driven decisions.`,
};

// 2. El problema
export const PROBLEMA = {
  titulo: 'By the time the crop shows stress, the yield is already lost',
  bajada: "When you see it in the field, you're reacting too late and the damage is done.",
  razones: [
    {
      id: 'sintoma',
      titulo: 'Symptoms show up too late for biostimulants',
      // "La hoja se enrolla": leaf rolling es el síntoma que se usa en inglés.
      texto: 'Once leaves start rolling, yield is already compromised and a biostimulant does little to protect it.',
    },
    {
      id: 'pronostico',
      titulo: "A regional forecast doesn't know your field",
      texto: "It can't tell how much water is left in your soil or what stage your crop is at.",
    },
  ],
};

// 3. Lo que hace VigIA
export const QUE_HACE = {
  // "Campaña" → season (growing season); "campaign" no se usa en el agro.
  titulo: `${MARCA} watches for stress all season long`,
  bajada:
    'It tracks every management zone from before planting to the end of the season, and tells you when to save water and when to apply a biostimulant.',
  puntos: [
    {
      id: 'picos',
      titulo: 'Spots stress peaks',
      // "Aire que seca a la planta": la demanda del aire, como en el glosario.
      texto: 'A water shortage, dry air pulling water from the plant, or both at once. Alerts per management zone, with lead time.',
      imagen: imgEstres,
      alt: 'Soybean field in February, with patches where the crop grew less',
    },
    {
      id: 'siembra',
      titulo: 'From pre-planting',
      texto: 'Tracks soil water from before planting and alerts you 14 days ahead of the critical stage.',
      imagen: imgSiembra,
      alt: 'Soybean seedlings no-tilled into sorghum residue',
    },
    {
      id: 'agua',
      titulo: 'Smarter water use',
      texto: 'Know how much plant-available water each management zone has. When a shortage is coming, irrigate right when it is needed.',
      imagen: imgAgua,
      alt: 'Center pivot irrigation system over a soybean field',
    },
    {
      id: 'bioinsumo',
      titulo: 'Built for biostimulants',
      // "Bioinsumo hídrico / antiestrés térmico" → drought-stress / heat-stress
      // biostimulant (glosario).
      texto: 'Every alert comes with its biostimulant: drought-stress, heat-stress, or preventive ahead of the critical stage.',
      imagen: imgBioinsumos,
      alt: 'Tractor with a sprayer applying over a crop',
    },
  ],
  // Otros módulos, debajo de las tarjetas (decisión 46).
  modulos: [
    {
      id: 'servicio',
      // "Cultivos de servicio" → cover crops; "secado" → termination.
      pregunta: 'Growing cover crops?',
      texto: 'VigIA also tracks their water use against fallow and tells you when to terminate them.',
      enlace: { texto: 'Learn about cover crops', href: null },
    },
    {
      id: 'herbicidas',
      pregunta: 'Used residual herbicides?',
      texto: 'With herbicide carryover tracking, you know when it is safe to plant the next crop.',
      enlace: { texto: 'Learn about herbicide carryover', href: null },
    },
  ],
};

// 4. La solución
export const COMO_FUNCIONA = {
  titulo: 'Alerts in time to act',
  bajada:
    'VigIA tracks every management zone, every day. When stress is coming, it alerts you with enough lead time to apply a biostimulant or irrigate.',
  canales: [
    {
      id: 'whatsapp',
      titulo: 'On WhatsApp',
      texto: 'The alert reaches your phone with a suggested action, no need to log in anywhere.',
    },
    {
      id: 'plataforma',
      titulo: 'On the platform',
      // DPV → VPD (vapor pressure deficit), la sigla que usa el inglés.
      texto: 'The field dashboard, with the water balance and VPD behind every alert.',
    },
  ],
  tituloPasos: 'How it works',
  pasos: [
    // "Se cargan tus lotes": voz pasiva neutral, igual que en español
    // (pregunta abierta 1: quién hace el alta).
    { id: 'lotes', titulo: 'Your fields are set up', texto: 'Management zones, soil and crop. Weather data connects automatically.' },
    { id: 'calculo', titulo: 'Daily calculations', texto: 'Water balance and VPD against your crop thresholds.' },
    { id: 'alerta', titulo: 'Timely alerts', texto: 'Log rainfall and irrigation, and the calculation adjusts.' },
  ],
  mensaje: {
    alerta: 'Water stress in 14 days',
    lote: 'Field 12 · Zone 2',
    accion: 'Plan irrigation or a biostimulant.',
    hora: '07:30',
    resuelta: 'Resolved in time',
  },
};

// 5. Frase destacada. Misma lógica de colores: *verde* (a tiempo), _rojo_
// (tarde).
export const FRASE = ['Get the biostimulant on', '*before* stress hits,', 'not _after the damage is done._'];

// 6. Impacto. Mismos números que en español (impactoDatos.js), con formato
// en inglés (20,000).
const fmt = formateador('en-US');
const FILAS = filasImpacto(fmt, { maiz: 'Corn', soja: 'Soybean', trigo: 'Wheat' }, 'Total');

export const IMPACTO = {
  titulo: 'Impact',
  bajada: 'More grain, more carbon in the soil',
  indicadores: [
    { id: 'hectareas', valor: `+${fmt(HA_TOTAL)}`, unidad: 'ha', texto: 'monitored' },
    { id: 'efectividad', valor: '96', unidad: '%', texto: 'biostimulant response effectiveness' },
    {
      id: 'grano',
      valor: `+${fmt(GRANO_T)}`,
      unidad: 't',
      // "Grano recuperado": yield que se protegió, no grano "recuperado"
      // de algún lado.
      // "Lotes que no siguieron a VigIA" en vez de "check plots": se dice
      // lo que significa, igual que en español.
      texto: "of grain yield protected vs. fields that didn't follow VigIA",
      tabla: {
        titulo: 'Yield protected by crop',
        columnas: ['Crop', 'Hectares', 'Extra kg/ha', 'Total'],
        filas: FILAS.grano,
        nota: "Yield difference between fields that applied biostimulants following VigIA alerts and fields that didn't follow its alerts or recommendations.",
      },
    },
    {
      id: 'carbono',
      valor: `~${fmt(CO2_DESTACADO)}`,
      unidad: 't',
      texto: 'of extra CO₂ stored in the soil',
      tabla: {
        titulo: 'Extra carbon captured by crop (t CO₂)',
        columnas: ['Crop', 'Fixed', 'Returned to soil', 'Stays stable'],
        filas: FILAS.carbono,
        nota: 'This is the extra carbon from the protected yield. Equivalent to offsetting the emissions of about 750 cars a year. The carbon that stays comes from crop residue and roots, and roots provide the most stable share.',
      },
    },
  ],
  pista: 'Tap an indicator to see the details',
  cerrar: 'Close details',
};

// 7. Sobre nosotros
export const NOSOTROS = {
  titulo: `The people behind ${MARCA}`,
  bajada: 'A team that brings together ag technology, agronomic advice and biostimulants.',
  representa: 'Representing',
};

// 8. Clientes
export const CLIENTES = { titulo: 'Trusted by' };

// 9. Preguntas frecuentes
export const PREGUNTAS = {
  titulo: 'Common questions',
  // Línea chica sobre el CTA, debajo del título (ahí va el cierre): sigue
  // al título de la sección.
  cierre: 'Still have questions? Message us.',
  items: [
    {
      pregunta: 'Do I need sensors or weather stations in the field?',
      respuesta:
        'No. VigIA pulls weather data for the coordinates of each field. If you measure rainfall or soil water, you can log it and the calculation adjusts.',
    },
    {
      pregunta: 'What do I need to enter?',
      respuesta:
        'At the start, your fields, management zones and soil are set up. After that, you just log rainfall and irrigation as they happen.',
    },
    {
      pregunta: 'Which crops does it cover?',
      // Grupo de madurez → maturity group; centeno/cebada/vicia → cereal
      // rye, barley y vetch.
      respuesta:
        'The main season crops (soybean development is adjusted for latitude and maturity group) and cover crops: cereal rye, barley and vetch.',
    },
    {
      pregunta: 'How do I get the alerts?',
      respuesta: 'On the platform, in each field dashboard, and on WhatsApp, without having to log in.',
    },
    {
      // Secano → rainfed (más internacional que el "dryland" de EE. UU.).
      pregunta: 'Does it work in rainfed fields?',
      respuesta:
        'Yes. In rainfed fields it alerts you in time to apply a biostimulant. Under irrigation, it also builds a monthly irrigation plan with its cost.',
    },
  ],
};


export const EDUCACION = {
  etiqueta: 'Learn',
  titulo: 'Learn',
  bajada: `We are preparing content on water and heat stress, biostimulants and water use, to help you get more out of ${MARCA}.`,
  volver: 'Back to home',
};

export const PRECIOS = {
  titulo: 'Pricing',
  bajada: `We are defining the ${MARCA} plans. Get in touch and we'll tell you more.`,
  boton: 'Ask about pricing',
  mensajeWhatsApp: `Hi, I'd like to know the pricing for ${MARCA}`,
};

export const FOOTER = {
  contacto: { titulo: 'Contact' },
  rindeplus: {
    titulo: 'Rinde Plus',
    texto: 'Looking for more specialized services for your operation? Rinde Plus offers other agtech solutions for farming.',
    enlace: 'Visit Rinde Plus',
    href: 'https://rindeplus.com',
  },
  ayuda: {
    titulo: 'Help',
    enlaces: [
      { texto: 'FAQ', href: '/en/#preguntas', externo: false },
      { texto: 'Message us on WhatsApp', href: WHATSAPP_URL, externo: true },
    ],
  },
  // Las legales sólo existen en español: el enlace lo aclara.
  legales: [
    { texto: 'Privacy policy (Spanish)', href: '/privacidad/' },
    { texto: 'Terms and conditions (Spanish)', href: '/terminos/' },
  ],
  pie: 'All rights reserved.',
  // Créditos de las fotos reales de "Lo que hace VigIA" (Wikimedia
  // Commons): los piden sus licencias Creative Commons. Van al pie, junto
  // al copyright, no en el medio de la página.
  creditosFotos: {
    prefijo: 'Photos via Wikimedia Commons:',
    fotos: [
      { autor: 'Alejo Cristian Santo', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Febrero_-_panoramio.jpg' },
      { autor: 'Maggilautaro', licencia: 'CC BY 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Siembra_Directa_sobre_rastrojo_de_Sorgo_Gran%C3%ADfero.jpg' },
      { autor: 'Pollinator', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soybean_1292.JPG' },
      { autor: 'Ermell', licencia: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Traktor_spritzanlage-20200319-RM-173117.jpg' },
    ],
  },
};

export const UI = {
  saltar: 'Skip to content',
  inicio: 'home',
  menu: [
    {
      label: 'How it works',
      href: '/en/#problema',
      hijos: [
        { label: 'Home', href: '/en/#inicio' },
        { label: 'The problem', href: '/en/#problema' },
        { label: 'What VigIA does', href: '/en/#que-hace' },
        { label: 'The solution', href: '/en/#como-funciona' },
      ],
    },
    { label: 'Impact', href: '/en/#impacto' },
    { label: 'About us', href: '/en/#nosotros' },
    // Contacto lleva a Preguntas, que abre con el CTA y sigue con el footer
    // de contacto: las dos son "Contacto" en el menú.
    { label: 'Contact', href: '/en/#preguntas' },
    { label: 'Learn', href: '/en/educacion/' },
  ],
  header: {
    idioma: 'Language',
    modoClaro: 'Light mode',
    modoOscuro: 'Dark mode',
    activarClaro: 'Switch to light mode',
    activarOscuro: 'Switch to dark mode',
    cambiarTema: 'Toggle light and dark mode',
    whatsapp: 'Message us on WhatsApp',
    ingresar: 'Log in',
    ingresarLabel: 'Log in to the platform',
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
  },
  widget: {
    saludo: 'Hi',
    saludoLabel: 'wave',
    pregunta: 'How can we help?',
    boton: 'Message us on WhatsApp',
    nota: 'Our team replies in Spanish.',
  },
  graficos: {
    conVigia: {
      titulo: 'Soil water · Field 12',
      descripcion:
        'Plant-available water drops day by day. The forecast shows it will cross the crop threshold in 14 days, and VigIA sends the alert ahead of time.',
      pronostico: 'Forecast',
      umbral: 'Crop threshold',
      aguaUtil: 'Available water',
      hoy: 'Today',
      porWhatsApp: 'Via WhatsApp',
      alertaEnviada: 'Alert sent',
      alerta: 'Water stress in 14 days',
    },
    sinVigia: {
      titulo: 'Soil water · without VigIA',
      descripcion:
        'With no forecast or alerts, plant-available water crosses the crop threshold unnoticed. The stress is spotted in the field six days later.',
      umbral: 'Crop threshold',
      aguaUtil: 'Available water',
      rindePerdido: 'Yield lost',
      loVesACampo: 'Seen in the field',
      tarde: 'Seen in the field 6 days late',
      tardeTexto: 'Too late for the biostimulant to help.',
    },
  },
  chat: {
    label: 'Example of a VigIA alert on WhatsApp',
    estado: 'Alerts for your fields',
    escribiendo: 'typing…',
    hoy: 'Today',
    mensaje: 'Message',
  },
  videos: {
    problema: 'No alert · damage shows in the field',
    resolucion: 'With the alert · applied in time',
  },
  soloEspanol: 'Spanish only',
};

export const NO_ENCONTRADA = {
  titulo: 'Page not found',
  texto: "The page you're looking for doesn't exist.",
  volver: 'Back to home',
};
