// Contenido de la home, un objeto por sección (ver doc/landing/ESTRUCTURA_LANDING.md,
// versión 2). Cada afirmación tiene respaldo en doc/landing/MODULO_VIGIA.md §10:
// balance hídrico FAO-56 por ambiente, DPV contra umbrales por cultivo,
// pronóstico a 14 días y las alertas de alertEngine.ts.
// Reglas (skill vigia-landing-structure): sin IA, satélite, estrés biótico ni
// Herbicidas; acciones genéricas (bioinsumo o riego), sin productos ni marcas.

// Grafía del logo. Si cambia la marca, se cambia acá.
export const MARCA = 'VigIA BioEstrés';

// CTA único de la página: mismo texto en el hero y en el cierre.
export const CTA = {
  texto: 'Quiero ver mis lotes en VigIA',
  mensajeWhatsApp: `Hola, quiero ver mis lotes en ${MARCA}`,
};

export const SEO = {
  titulo: `${MARCA} · Anticipá el estrés hídrico y térmico de tus lotes`,
  descripcion:
    'Alertas de estrés hídrico y térmico por ambiente, con días de margen para aplicar el bioinsumo o regar. En la plataforma y por WhatsApp.',
};

// 1. Hero
export const HERO = {
  etiqueta: 'Estrés hídrico y térmico',
  titulo: 'Detectá el estrés antes de que se convierta en merma',
  bajada: `${MARCA} cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos.`,
  puntos: [
    'Alertas a 4 días y aviso del período crítico a 14',
    'Por ambiente, en secano o bajo riego',
    'En la plataforma y en tu WhatsApp',
  ],
  secundario: { texto: 'Cómo funciona', href: '#como-funciona' },
  // Antes de publicar, confirmar que estas organizaciones autorizan la mención.
  prueba: 'Lo usan productores y asesores de Aapresid, CREA, Agroconsultor y SpeedAgro.',
};

// 2. El problema
export const PROBLEMA = {
  etiqueta: 'El problema',
  titulo: 'El cultivo muestra el estrés cuando ya perdiste rinde',
  bajada: 'Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho.',
  razones: [
    {
      titulo: 'El síntoma llega tarde',
      texto: 'Cuando la hoja se enrolla, el rinde ya está comprometido.',
    },
    {
      titulo: 'El bioinsumo necesita llegar antes',
      texto: 'Aplicado cuando el estrés ya pasó, protege poco.',
    },
    {
      titulo: 'El pronóstico regional no conoce tu lote',
      texto: 'No sabe cuánta agua le queda a tu suelo ni en qué etapa está tu cultivo.',
    },
  ],
  estreses: [
    { id: 'hidrico', nombre: 'Hídrico', texto: 'Falta agua útil en el suelo para la etapa del cultivo.' },
    { id: 'termico', nombre: 'Térmico (DPV)', texto: 'El aire seca a la planta más rápido de lo que repone.' },
    { id: 'combinado', nombre: 'Combinado', texto: 'Las dos cosas el mismo día: el escenario más dañino.' },
  ],
};

// 3. Cómo funciona
export const COMO_FUNCIONA = {
  etiqueta: 'Cómo funciona',
  titulo: 'De la alerta a la decisión, en un solo flujo',
  bajada:
    'VigIA sigue cada ambiente día a día y te avisa cuando todavía hay margen para aplicar el bioinsumo o regar.',
  // Paso 1 con redacción neutral ("se cargan") hasta confirmar quién hace el
  // alta de lotes (pregunta abierta 1 de ESTRUCTURA_LANDING.md).
  pasos: [
    {
      id: 'lotes',
      titulo: 'Tus lotes, en VigIA',
      texto:
        'Se cargan tus lotes, ambientes, suelo, siembra y cultivo. El clima del lote se conecta solo, con pronóstico a 14 días.',
    },
    {
      id: 'calculo',
      titulo: 'VigIA calcula cada día',
      texto: 'Balance hídrico por ambiente y DPV contra los umbrales de tu cultivo en su etapa.',
    },
    {
      id: 'alerta',
      titulo: 'Te avisa y actuás',
      texto: 'Alerta con severidad, ambiente y acción sugerida. Cargás lluvias y riegos, y el cálculo se ajusta.',
    },
  ],
  // Títulos y acciones tal como los genera el motor, acortados.
  alertas: [
    {
      severidad: 'alerta',
      etiqueta: 'Alerta',
      titulo: 'Estrés hídrico moderado en 4 días',
      accion: 'Planificar riego o bioinsumo entre hoy y 3 días.',
    },
    {
      severidad: 'info',
      etiqueta: 'Preventiva',
      titulo: 'Período crítico en 14 días',
      accion: 'Bioinsumo preventivo antes del estadio.',
    },
    {
      severidad: 'critico',
      etiqueta: 'Crítica',
      titulo: 'Estrés hídrico y térmico combinado',
      accion: 'Bioinsumo hídrico más antiestrés térmico, ya.',
    },
  ],
  canales: [
    {
      id: 'plataforma',
      titulo: 'En la plataforma',
      texto: 'El panel del lote, con el balance hídrico y el DPV que explican la alerta.',
    },
    {
      id: 'whatsapp',
      titulo: 'En tu WhatsApp',
      texto: 'El aviso te llega al celular sin tener que entrar.',
    },
  ],
  // Mensaje de ejemplo del celular (WhatsAppMock.astro).
  mensaje: {
    lote: 'Lote 12 – Ambiente 2',
    alerta: 'Estrés hídrico moderado en 4 días.',
    accion: 'Acción sugerida: planificar riego o bioinsumo entre hoy y el jueves.',
    hora: '07:30',
  },
  cultivoServicio: {
    pregunta: '¿Hacés cultivos de servicio?',
    texto: 'VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado.',
  },
};

// 4. Frase destacada: una línea por renglón.
export const FRASE = ['Que el bioinsumo llegue antes que el estrés,', 'no después del daño.'];

// 5. Beneficios
export const BENEFICIOS = {
  etiqueta: 'Beneficios',
  titulo: 'Lo que ganás en cada campaña',
  items: [
    {
      id: 'ventaja',
      titulo: 'Días de ventaja',
      texto: 'El balance hídrico y el DPV marcan el estrés antes que la hoja. Te enterás con margen para actuar.',
      resultado: 'Llegás a tiempo al déficit hídrico y a los golpes de calor.',
    },
    {
      id: 'insumo',
      titulo: 'Insumo donde hace falta',
      texto: 'VigIA trabaja por ambiente: aplicás o regás donde el estrés se viene, no en todo el lote.',
      resultado: 'Menor costo por hectárea.',
    },
    {
      id: 'merma',
      titulo: 'Menos merma',
      texto: 'Cada alerta dice la etapa del cultivo, la severidad y el ambiente. Sabés qué lote recorrer primero.',
      resultado: 'Campañas más previsibles.',
    },
  ],
};

// 6. Para quién es
export const PARA_QUIEN = {
  etiqueta: 'Para quién es',
  titulo: 'Para quien decide sobre el lote',
  perfiles: [
    {
      id: 'productores',
      titulo: 'Productores, extensivos e intensivos',
      lema: 'Proteger el margen de cada hectárea.',
      puntos: [
        'Todos tus lotes y ambientes en un solo lugar, campaña tras campaña.',
        'Alertas antes de los períodos críticos que definen el rinde.',
        'Bajo riego, un plan mensual con costo y rinde esperado.',
      ],
      clave: 'Menos merma y menos insumo desperdiciado.',
    },
    {
      id: 'asesores',
      titulo: 'Asesores e ingenieros agrónomos',
      lema: 'Más hectáreas bajo control, con el mismo tiempo.',
      puntos: [
        'Sabés qué lote y qué ambiente mirar antes de salir al campo.',
        'Recomendaciones respaldadas por clima, balance hídrico y fenología.',
        'Reportes en PDF listos para compartir con cada productor.',
      ],
      clave: 'Recomendaciones más rápidas y fáciles de defender.',
    },
  ],
  nota: 'En secano o bajo riego.',
};

// 8. Preguntas frecuentes (también van como JSON-LD FAQPage).
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
    {
      pregunta: '¿Me recomienda productos?',
      respuesta:
        'Te sugiere la acción (bioinsumo hídrico, antiestrés térmico o riego), sin marcas. Vos o tu asesor elegís el producto.',
    },
    {
      pregunta: '¿Cuánto cuesta?',
      respuesta: 'Depende de la cantidad de lotes. En la demo vemos tus lotes y te armamos la propuesta.',
    },
  ],
};

// 9. Cierre
export const CIERRE = {
  titulo: 'La próxima merma ya se está gestando en algún lote. Encontrala primero.',
  texto: `Agendá una demo de 20 minutos y te mostramos ${MARCA} funcionando sobre tus lotes, con datos de tu campaña actual.`,
};
