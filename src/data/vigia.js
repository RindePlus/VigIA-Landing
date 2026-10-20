// Contenido en español, un objeto por sección (ver doc/landing/ESTRUCTURA_LANDING.md,
// versión 2). Las versiones en inglés y portugués son src/data/vigia.en.js y
// src/data/vigia.pt.js, con las mismas claves: si agregás o cambiás un texto
// acá, hacelo también allá (reglas en doc/landing/TRADUCCION_EN.md y
// TRADUCCION_PT.md). Cada afirmación tiene respaldo en doc/landing/MODULO_VIGIA.md §10:
// balance hídrico FAO-56 por ambiente, DPV contra umbrales por cultivo,
// pronóstico a 14 días y las alertas de alertEngine.ts.
// Reglas (skill vigia-landing-structure): sin IA, satélite, estrés biótico ni
// Herbicidas; acciones genéricas (bioinsumo o riego), sin productos ni marcas.

import { buildWhatsAppUrl } from './social';
import { HA_TOTAL, GRANO_T, CO2_DESTACADO, formateador, filasImpacto } from './impactoDatos';
import imgEstres from '../assets/quehace/estres.webp';
import imgSiembra from '../assets/quehace/siembra.webp';
import imgAgua from '../assets/quehace/agua.webp';
import imgBioinsumos from '../assets/quehace/bioinsumos.webp';

// Grafía del logo. Si cambia la marca, se cambia acá.
export const MARCA = 'VigIA BioEstrés';

// CTA único de la página: mismo texto en el hero y en el cierre.
// `nota`: aclaración debajo del botón del cierre (vacía en español).
export const CTA = {
  texto: 'Contactanos para empezar a usar VigIA',
  mensajeWhatsApp: `Hola, quiero empezar a usar ${MARCA}`,
  nota: '',
};

// WhatsApp general (header, footer y botón flotante).
export const WHATSAPP_URL = buildWhatsAppUrl('Hola, quiero más información sobre VigIA');

export const SEO = {
  titulo: MARCA,
  descripcion:
    'Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp.',
};

// 1. Hero
export const HERO = {
  titulo: 'Detectá el estrés antes de que se convierta en pérdida',
  // Lleva los tres diferenciales que antes iban como palabras clave: desde
  // antes de la siembra, por ambiente y por WhatsApp (decisión 47).
  // "Hídrico y térmico" vino de la etiqueta del hero, que se quitó (decisión 50).
  bajada: `${MARCA} sigue cada ambiente desde antes de la siembra y te avisa por WhatsApp días antes de que el estrés hídrico y térmico se vea a campo. Para productores y asesores que deciden con datos.`,
};

// 2. El problema
export const PROBLEMA = {
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

// 3. Lo que hace VigIA. Las cuatro tarjetas absorben las cuatro alertas del
// motor (hídrico, térmico, combinado, etapa crítica) y sus acciones genéricas
// (alertEngine.ts, MODULO_VIGIA §10.2): qué pasa en la 1, el aviso a 14 días
// en la 2, el riego en la 3 y los bioinsumos en la 4 (decisión 42).
export const QUE_HACE = {
  titulo: `${MARCA} vigila el estrés toda la campaña`,
  // Abarca las cuatro tarjetas: acompaña todo el ciclo (ventana siembra
  // −60 / +150, MODULO_VIGIA §10.2) y la acción es agua o bioinsumo.
  bajada:
    'Sigue cada ambiente desde antes de la siembra hasta el final del ciclo, y te dice cuándo cuidar el agua y cuándo aplicar el bioinsumo.',
  // Cuatro tarjetas con foto, primero en la sección. La de los picos de
  // estrés va primera: es lo principal. Fotos reales de campo (decisión
  // 49), con sus créditos al pie (FOOTER.creditosFotos).
  puntos: [
    {
      id: 'picos',
      titulo: 'Detecta picos de estrés',
      // Hídrico, térmico y combinado: qué pasa en cada uno.
      texto: 'Falta de agua, aire que seca a la planta o los dos juntos. Te avisa por ambiente, con margen.',
      imagen: imgEstres,
      alt: 'Lote de soja en febrero, con manchones donde el cultivo creció menos',
    },
    {
      // Sin el número de días previos a la siembra: lo que importa es que
      // acompaña todo el proceso. Suma la alerta de etapa crítica (14 días).
      id: 'siembra',
      titulo: 'Desde antes de la siembra',
      texto: 'Sigue el agua del suelo desde antes de sembrar y te avisa 14 días antes de la etapa crítica.',
      imagen: imgSiembra,
      alt: 'Soja recién nacida en siembra directa sobre rastrojo de sorgo',
    },
    {
      // Balance por ambiente y la acción "regá" del hídrico y el combinado.
      id: 'agua',
      titulo: 'Cuida el uso del agua',
      texto: 'Sabés cuánta agua útil tiene cada ambiente. Si se viene la falta de agua, regás justo cuando hace falta.',
      imagen: imgAgua,
      alt: 'Equipo de riego por pivote sobre un lote de soja',
    },
    {
      // Las acciones con bioinsumo de las cuatro alertas; dicho en positivo.
      id: 'bioinsumo',
      titulo: 'Orientado a bioinsumos',
      texto: 'Cada aviso trae su bioinsumo: hídrico, antiestrés térmico o preventivo antes de la etapa crítica.',
      imagen: imgBioinsumos,
      alt: 'Tractor con pulverizadora aplicando sobre un cultivo',
    },
  ],
  // Otros módulos, debajo de las tarjetas, con enlace a su página (decisión
  // 46). El carry-over de herbicidas pasa a ser parte de VigIA: sin nombrar
  // a RindePlus. PENDIENTE: las URL. Con `href: null` el enlace no se muestra.
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
      texto: 'Con el carry-over de herbicidas sabés cuándo es seguro sembrar el cultivo siguiente.',
      enlace: { texto: 'Conocé carry-over de herbicidas', href: null },
    },
  ],
};

// 4. La solución (cómo funciona: canales y pasos)
export const COMO_FUNCIONA = {
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
  // Subtítulo del bloque de los pasos. Las alertas pasaron a las tarjetas
  // de la sección 3 (decisión 42).
  tituloPasos: 'Cómo lo hace',
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
};

// 5. Frase destacada: una línea por renglón.
// Palabras resaltadas con los colores de la historia: *verde* (a tiempo) y
// _rojo_ (tarde).
export const FRASE = ['Que el bioinsumo llegue', '*antes* que el estrés,', 'no _después del daño._'];

// 6. Impacto: resultados medidos en campo. Los números están en
// src/data/impactoDatos.js (compartidos con la versión en inglés).
const fmt = formateador('es-AR');
const FILAS = filasImpacto(fmt, { maiz: 'Maíz', soja: 'Soja', trigo: 'Trigo' }, 'Total');

export const IMPACTO = {
  // El nombre de la sección es el título; la frase que era título queda
  // como bajada.
  titulo: 'Impacto',
  bajada: 'Más grano y más carbono en el suelo',

  // Cuatro indicadores grandes con una línea corta debajo. Los dos últimos
  // abren su tabla por cultivo (un panel centrado debajo, de a uno).
  indicadores: [
    { id: 'hectareas', valor: `+${fmt(HA_TOTAL)}`, unidad: 'ha', texto: 'monitoreadas' },
    { id: 'efectividad', valor: '96', unidad: '%', texto: 'de efectividad en la respuesta del bioinsumo' },
    {
      id: 'grano',
      valor: `+${fmt(GRANO_T)}`,
      unidad: 't',
      // Medido contra lotes que no siguieron las alertas o recomendaciones
      // de VigIA (muchos ensayos distintos, decisión 43). Sin "testigo":
      // se dice lo que significa.
      texto: 'de grano recuperado frente a lotes que no siguieron a VigIA',
      tabla: {
        titulo: 'Rinde recuperado por cultivo',
        columnas: ['Cultivo', 'Hectáreas', 'kg/ha extra', 'Total'],
        filas: FILAS.grano,
        nota: 'Diferencia de rinde entre lotes que aplicaron el bioinsumo según las alertas de VigIA y lotes que no siguieron sus alertas o recomendaciones.',
      },
    },
    {
      id: 'carbono',
      valor: `~${fmt(CO2_DESTACADO)}`,
      unidad: 't',
      // Sólo el extra que aporta el rinde recuperado, no el total del lote.
      texto: 'de CO₂ extra capturadas en el suelo',
      tabla: {
        titulo: 'Carbono extra capturado por cultivo (t CO₂)',
        columnas: ['Cultivo', 'Fijado', 'Vuelve al suelo', 'Queda estable'],
        filas: FILAS.carbono,
        // El grano se cosecha y su carbono vuelve a la atmósfera; lo que
        // puede quedar es el del rastrojo y las raíces.
        nota: 'Es el carbono extra del rinde recuperado. Equivale a neutralizar las emisiones de unos 750 autos por año. El carbono que queda es el del rastrojo y las raíces; las raíces aportan el más estable.',
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
  titulo: `Las personas detrás de ${MARCA}`,
  bajada: 'Un equipo que reúne tecnología agrícola, asesoramiento agronómico y bioinsumos.',
};

// 8. Clientes (el carrusel está en src/data/clientes.js), debajo de Sobre
// nosotros y sin título a la vista: el título queda como nombre accesible.
export const CLIENTES = { titulo: 'Confían en nosotros' };

// 9. Preguntas frecuentes (también van como JSON-LD FAQPage).
export const PREGUNTAS = {
  titulo: 'Lo que suelen preguntarnos',
  // Línea chica sobre el CTA, debajo del título (ahí va el cierre): sigue
  // al título de la sección.
  cierre: '¿Te quedó alguna duda? Escribinos.',
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


// Página /educacion (src/views/EducacionPage.astro), enlazada al final del menú.
// PENDIENTE: contenido definitivo. Por ahora, una página provisoria.
export const EDUCACION = {
  etiqueta: 'Educación',
  titulo: 'Educación',
  bajada: `Estamos preparando contenidos sobre estrés hídrico y térmico, bioinsumos y uso del agua, para sacarle más provecho a ${MARCA}.`,
  volver: 'Volver al inicio',
};

// Página /pricing (src/views/PricingPage.astro). PENDIENTE: el modelo de
// precios propio de VigIA.
export const PRECIOS = {
  titulo: 'Precios',
  bajada: `Estamos definiendo los planes de ${MARCA}. Escribinos y te contamos.`,
  boton: 'Consultar',
  mensajeWhatsApp: `Hola, quiero conocer los precios de ${MARCA}`,
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
  // Créditos de las fotos reales de "Lo que hace VigIA" (Wikimedia
  // Commons): los piden sus licencias Creative Commons. Van al pie, junto
  // al copyright, no en el medio de la página.
  creditosFotos: {
    prefijo: 'Fotos vía Wikimedia Commons:',
    fotos: [
      { autor: 'Alejo Cristian Santo', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Febrero_-_panoramio.jpg' },
      { autor: 'Maggilautaro', licencia: 'CC BY 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Siembra_Directa_sobre_rastrojo_de_Sorgo_Gran%C3%ADfero.jpg' },
      { autor: 'Pollinator', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soybean_1292.JPG' },
      { autor: 'Ermell', licencia: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Traktor_spritzanlage-20200319-RM-173117.jpg' },
    ],
  },
};

// Textos de la interfaz que no son de una sección: header, botón de
// WhatsApp, gráficos, chat de ejemplo y rótulos de los videos.
export const UI = {
  saltar: 'Saltar al contenido',
  inicio: 'inicio',
  menu: [
    // Desplegable con las secciones del recorrido (se abre al dejar el
    // cursor encima); el título lleva al problema. "Inicio" vuelve arriba de
    // todo (el hero no tiene título propio): más a mano que el logo.
    {
      label: 'Cómo funciona',
      href: '/#problema',
      hijos: [
        { label: 'Inicio', href: '/#inicio' },
        { label: 'El problema', href: '/#problema' },
        { label: 'Lo que hace VigIA', href: '/#que-hace' },
        { label: 'La solución', href: '/#como-funciona' },
      ],
    },
    { label: 'Impacto', href: '/#impacto' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Contacto', href: '/#contacto' },
    // Página propia (no una sección de la home): va al final.
    { label: 'Educación', href: '/educacion' },
  ],
  header: {
    idioma: 'Idioma',
    modoClaro: 'Modo claro',
    modoOscuro: 'Modo oscuro',
    activarClaro: 'Activar modo claro',
    activarOscuro: 'Activar modo oscuro',
    cambiarTema: 'Cambiar entre modo claro y oscuro',
    whatsapp: 'Escribinos por WhatsApp',
    ingresar: 'Ingresar',
    ingresarLabel: 'Ingresar a la plataforma',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
  },
  widget: {
    saludo: 'Hola',
    saludoLabel: 'saludo',
    pregunta: '¿En qué podemos ayudarte?',
    boton: 'Escribinos por WhatsApp',
    nota: '',
  },
  graficos: {
    conVigia: {
      titulo: 'Agua del suelo · Lote 12',
      descripcion:
        'El agua útil del suelo baja día a día. El pronóstico muestra que va a cruzar el umbral del cultivo en 14 días, y VigIA envía la alerta antes.',
      pronostico: 'Pronóstico',
      umbral: 'Umbral del cultivo',
      aguaUtil: 'Agua útil',
      hoy: 'Hoy',
      porWhatsApp: 'Por WhatsApp',
      alertaEnviada: 'Alerta enviada',
      alerta: 'Estrés hídrico en 14 días',
    },
    sinVigia: {
      titulo: 'Agua del suelo · sin VigIA',
      descripcion:
        'Sin pronóstico ni alertas, el agua útil cruza el umbral del cultivo sin que nadie avise. El estrés se detecta a campo seis días después.',
      umbral: 'Umbral del cultivo',
      aguaUtil: 'Agua útil',
      rindePerdido: 'Rinde perdido',
      loVesACampo: 'Lo ves a campo',
      tarde: 'Se ve a campo 6 días tarde',
      tardeTexto: 'El bioinsumo ya no llega a tiempo.',
    },
  },
  chat: {
    label: 'Ejemplo de alerta de VigIA por WhatsApp',
    estado: 'Alertas de tus lotes',
    escribiendo: 'escribiendo…',
    hoy: 'Hoy',
    mensaje: 'Mensaje',
  },
  // Rótulo de capítulo sobre cada video (MediaStory).
  videos: {
    problema: 'Sin aviso · el daño se ve a campo',
    resolucion: 'Con el aviso · se aplica a tiempo',
  },
  // Aviso junto a enlaces a páginas que no existen en este idioma (vacío
  // en español: todas existen).
  soloEspanol: '',
};

// Página 404 (única: GitHub Pages sirve un solo 404.html).
export const NO_ENCONTRADA = {
  titulo: 'Página no encontrada',
  texto: 'La página que buscás no existe.',
  volver: 'Volver al inicio',
};
