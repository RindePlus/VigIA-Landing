// Contenido de la home, un objeto por módulo (ver ESTRUCTURA_LANDING.md).
// Lo que se afirma está respaldado por el motor de VigIA en Plataforma
// (ver MODULO_VIGIA.md): balance hídrico FAO-56, DPV diario contra umbrales
// por cultivo, pronóstico a 14 días y las alertas de alertEngine.ts.
// Reglas: sin menciones a Inteligencia Artificial ni a Herbicidas; acciones
// genéricas (bioinsumo o riego), sin productos ni marcas.

// Módulo 1 — Introducción
export const INTRO = {
  etiqueta: 'Estrés hídrico y térmico',
  titulo: 'Mitigación de Estrés',
  descripcion:
    'Anticipá el estrés hídrico y térmico antes de que se manifieste. VigIA cruza el clima, el balance hídrico y el suelo de cada lote, y te avisa a tiempo para aplicar el bioinsumo.',
  puntos: [
    'Monitoreo de temperatura, humedad y DPV',
    'Pronóstico climático y balance hídrico por ambiente',
    'Alertas tempranas en la plataforma y por WhatsApp',
  ],
};

// Módulo 2 — Qué problema resuelve
export const PROBLEMA = {
  etiqueta: 'El problema que resuelve',
  titulo: 'El cultivo muestra el estrés cuando ya perdiste rinde',
  bajada: 'Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho.',
  razones: [
    {
      titulo: 'El estrés se ve tarde',
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

// Módulo 3 — La mejora real
export const MEJORA = {
  etiqueta: 'La mejora real',
  titulo: 'Alertas tempranas, antes que el estrés',
  bajada:
    'Recibís alertas predictivas para actuar de forma preventiva, proteger el rendimiento y aplicar los bioinsumos en el momento justo.',
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
      titulo: 'Estrés hídrico + térmico combinado',
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
      texto: 'El aviso te llega al celular sin tener que entrar a la plataforma.',
    },
  ],
  // Mensaje de ejemplo del celular.
  mensaje: {
    lote: 'Lote 12 – Ambiente 2',
    alerta: 'Estrés hídrico moderado en 4 días.',
    accion: 'Acción sugerida: planificar riego o bioinsumo entre hoy y el jueves.',
    hora: '07:30',
  },
  datos: [
    { id: 'clima', titulo: 'Clima y DPV', texto: 'Historial y pronóstico a 14 días en las coordenadas del lote.' },
    { id: 'cultivo', titulo: 'Cultivo y fenología', texto: 'Etapa y consumo de agua día a día, desde la siembra.' },
    { id: 'agua', titulo: 'Lluvias y riego', texto: 'Lo que realmente cayó en tu campo, cargado por vos.' },
    { id: 'suelo', titulo: 'Suelo', texto: 'Agua útil del perfil según la textura de cada ambiente.' },
  ],
  cultivoServicio: {
    pregunta: '¿Hacés cultivos de servicio?',
    texto:
      'VigIA también sigue su consumo de agua frente a un barbecho y te marca el momento óptimo de secado.',
  },
};

// Para quién es VigIA (sección corta, después de La mejora real).
export const PARA_QUIEN = {
  etiqueta: 'Para quién es',
  titulo: 'Para quien decide sobre el lote',
  perfiles: [
    {
      id: 'productores',
      titulo: 'Productores',
      texto: 'Sabés qué lote se viene complicado y decidís con días de margen cuándo aplicar o regar.',
    },
    {
      id: 'asesores',
      titulo: 'Asesores agronómicos',
      texto: 'Seguís los lotes de todos tus clientes y recibís sus alertas en un solo lugar.',
    },
    {
      id: 'empresas',
      titulo: 'Empresas y grupos',
      texto: 'Una misma lectura del estrés para todos los lotes y ambientes de la organización.',
    },
  ],
  nota: 'En secano o bajo riego.',
};
