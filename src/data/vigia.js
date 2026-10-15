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
  titulo: 'Detectá el estrés antes de que se convierta en merma',
  bajada: `${MARCA} cruza el clima, el balance hídrico y el suelo de cada ambiente, y te avisa días antes de que el estrés se vea a campo. Para productores y asesores que deciden con datos.`,
  // Tres tarjetas con ícono (los íconos se asignan por id en index.astro).
  puntos: [
    { id: 'aviso', titulo: 'Aviso anticipado', texto: 'Alerta a 4 días y el período crítico a 14.' },
    { id: 'ambiente', titulo: 'Por ambiente', texto: 'En secano o bajo riego.' },
    { id: 'whatsapp', titulo: 'En tu WhatsApp', texto: 'Y en la plataforma, con el detalle.' },
  ],
  secundario: { texto: 'Cómo funciona', href: '#como-funciona' },
};

// 2. El problema
export const PROBLEMA = {
  etiqueta: 'El problema',
  titulo: 'El cultivo muestra el estrés cuando ya perdiste rinde',
  bajada: 'Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho.',
  razones: [
    {
      id: 'sintoma',
      titulo: 'El síntoma llega tarde',
      texto: 'Cuando la hoja se enrolla, el rinde ya está comprometido.',
    },
    {
      id: 'bioinsumo',
      titulo: 'El bioinsumo necesita llegar antes',
      texto: 'Aplicado cuando el estrés ya pasó, protege poco.',
    },
    {
      id: 'pronostico',
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
  titulo: 'Te avisa antes, por WhatsApp y en la plataforma',
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
  // Qué te avisa: las tres alertas del motor (estrés hídrico a 4 días,
  // período crítico a 14, estrés combinado) contadas en lenguaje de campo.
  // `tono` = color de la severidad (alerta ámbar, info azul, crítico rojo).
  alertas: [
    {
      id: 'hidrico',
      tono: 'alerta',
      titulo: 'Falta de agua que se viene',
      texto: 'Te avisa 4 días antes de que al suelo le falte agua para tu cultivo.',
    },
    {
      id: 'critico',
      tono: 'info',
      titulo: 'Etapa crítica del cultivo',
      texto: '14 días antes de la etapa que define el rinde, para aplicar el bioinsumo preventivo.',
    },
    {
      id: 'combinado',
      tono: 'critico',
      titulo: 'Calor y sequía juntos',
      texto: 'Cuando se suman el estrés hídrico y el térmico, para actuar ese mismo día.',
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
    alerta: 'Estrés hídrico en 4 días',
    lote: 'Lote 12 · Ambiente 2',
    accion: 'Planificá riego o bioinsumo.',
    hora: '07:30',
    // Cierre después del video de resolución (MediaStory `cierre`). Narrativo:
    // no afirma que la plataforma registre la aplicación.
    resuelta: 'Resuelta a tiempo',
  },
  cultivoServicio: {
    pregunta: '¿Hacés cultivos de servicio?',
    texto: 'VigIA también sigue su consumo de agua frente al barbecho y te marca el momento de secado.',
  },
};

// 4. Frase destacada: una línea por renglón.
// Palabras resaltadas con los colores de la historia: *verde* (a tiempo) y
// _rojo_ (tarde).
export const FRASE = ['Que el bioinsumo llegue *antes* que el estrés,', 'no _después del daño._'];

// 5. Beneficios
export const BENEFICIOS = {
  etiqueta: 'Beneficios',
  titulo: 'Lo que ganás en cada campaña',
  items: [
    {
      id: 'ventaja',
      titulo: 'Días de ventaja',
      texto: 'El balance hídrico y el DPV marcan el estrés antes que la hoja.',
      resultado: 'Llegás a tiempo a la falta de agua y al golpe de calor.',
    },
    {
      id: 'insumo',
      titulo: 'Insumo donde hace falta',
      texto: 'VigIA mira cada ambiente: aplicás o regás donde se viene el estrés, no en todo el lote.',
      resultado: 'Menor costo por hectárea.',
    },
    {
      id: 'merma',
      titulo: 'Menos merma',
      texto: 'Cada alerta dice qué ambiente y en qué etapa. Sabés qué lote recorrer primero.',
      resultado: 'Campañas más previsibles.',
    },
  ],
};

// 6. Para quién es
export const PARA_QUIEN = {
  etiqueta: 'Para quién es',
  titulo: 'Pensado para el productor y su asesor',
  perfiles: [
    {
      id: 'productores',
      titulo: 'Productores',
      lema: 'Extensivos e intensivos, en secano o bajo riego.',
      puntos: [
        'Todos tus lotes y ambientes en un solo lugar, campaña tras campaña.',
        'El aviso en tu WhatsApp antes de los períodos que definen el rinde.',
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
        'Las alertas de todos tus clientes, en la plataforma y en WhatsApp.',
        'Reportes en PDF listos para compartir con cada productor.',
      ],
      clave: 'Recomendaciones más rápidas y fáciles de defender.',
    },
  ],
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
