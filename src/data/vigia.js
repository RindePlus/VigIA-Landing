// Contenido de la home. Todo lo que se afirma acá está respaldado por cómo
// funciona hoy el motor de VigIA en Plataforma (ver MODULO_VIGIA.md):
// balance hídrico FAO-56, DPV diario contra umbrales por cultivo, pronóstico
// a 14 días y las alertas de components/biostres/alertEngine.ts.

export const PROBLEMAS = [
  {
    titulo: 'El estrés se ve tarde',
    texto:
      'Cuando la hoja se enrolla o el cultivo cambia de color, el daño fisiológico ya ocurrió y el rinde ya está comprometido.',
  },
  {
    titulo: 'El bioinsumo necesita llegar antes',
    texto:
      'Un bioinsumo antiestrés acompaña a la planta para atravesar el momento difícil. Aplicado cuando el estrés ya pasó, protege poco.',
  },
  {
    titulo: 'El pronóstico regional no conoce tu lote',
    texto:
      'Saber que va a hacer calor no alcanza: hay que saber cuánta agua le queda a tu suelo y en qué etapa está tu cultivo.',
  },
];

export const ESTRESES = [
  {
    id: 'hidrico',
    nombre: 'Estrés hídrico',
    texto:
      'El agua útil del suelo cae por debajo del umbral que el cultivo necesita en su etapa actual.',
  },
  {
    id: 'termico',
    nombre: 'Estrés térmico (DPV)',
    texto:
      'El déficit de presión de vapor supera el límite del cultivo: el aire seca a la planta más rápido de lo que ella puede reponer agua.',
  },
  {
    id: 'combinado',
    nombre: 'Estrés combinado',
    texto:
      'Falta de agua y DPV alto el mismo día. Es el escenario más dañino y el que exige actuar primero.',
  },
];

export const DATOS = [
  {
    id: 'clima',
    titulo: 'Clima y DPV',
    texto:
      'Temperatura y humedad diarias en las coordenadas del lote, el historial de la campaña y el pronóstico de los próximos 14 días. Con eso VigIA calcula el DPV de cada día y lo compara con los umbrales del cultivo.',
  },
  {
    id: 'cultivo',
    titulo: 'Cultivo y fenología',
    texto:
      'A partir de la fecha de siembra y el ciclo o grupo de madurez, sigue la etapa del cultivo día a día y su consumo de agua en cada etapa, incluido el período crítico.',
  },
  {
    id: 'agua',
    titulo: 'Lluvias y riego',
    texto:
      'Cargás las lluvias que registrás en el lote y los riegos de cada ambiente. El balance usa lo que realmente cayó en tu campo, no una estimación regional.',
  },
  {
    id: 'suelo',
    titulo: 'Textura del suelo',
    texto:
      'Desde los muestreos de suelo de cada ambiente estima la capacidad de campo, el punto de marchitez y el agua útil que el perfil puede almacenar.',
  },
];

// Alertas de ejemplo: títulos y acciones tal como los genera el motor.
export const ALERTAS = [
  {
    severidad: 'alerta',
    etiqueta: 'Alerta',
    titulo: 'Estrés hídrico moderado en 4 días',
    accion: 'Planificar riego o bioinsumo en la ventana de hoy a 3 días.',
  },
  {
    severidad: 'info',
    etiqueta: 'Preventiva',
    titulo: 'Período crítico próximo',
    accion: 'Bioinsumo preventivo antes de que el cultivo entre al estadio.',
  },
  {
    severidad: 'critico',
    etiqueta: 'Crítica',
    titulo: 'Exceso de DPV sostenido',
    accion: 'Mitigar el estrés térmico: antiestrés foliar o riego.',
  },
  {
    severidad: 'critico',
    etiqueta: 'Crítica',
    titulo: 'Estrés hídrico + térmico combinado',
    accion: 'Intervención inmediata: bioinsumo hídrico más antiestrés térmico.',
  },
];

export const PASOS = [
  {
    titulo: 'Configurás el lote',
    texto: 'Cultivo, fecha de siembra, ciclo y el muestreo de suelo de cada ambiente.',
  },
  {
    titulo: 'VigIA calcula todos los días',
    texto: 'Balance hídrico por ambiente y DPV, con el clima real y el pronóstico.',
  },
  {
    titulo: 'Recibís la alerta con su acción',
    texto: 'Qué estrés viene, cuándo, qué tan severo y qué bioinsumo o manejo conviene.',
  },
  {
    titulo: 'Registrás lluvias y riegos',
    texto: 'Cada dato que cargás ajusta el balance y afina la próxima predicción.',
  },
];

// Los otros dos submódulos del VigIA anterior (ver MODULO_VIGIA.md, sección 1).
export const MODULOS = [
  {
    id: 'cultivo-servicio',
    tag: 'Mismo balance hídrico',
    nombre: 'Cultivo de Servicio',
    texto:
      'Seguí cuánta agua consume tu cultivo de servicio frente a un barbecho y elegí el momento de secado que protege la recarga del perfil para el cultivo que viene.',
    bullets: [
      'Consumo de agua del cultivo de servicio contra un barbecho',
      'Lluvia que realmente infiltra según la cobertura',
      'Momento óptimo de secado',
      'Estimación de materia seca producida',
    ],
  },
  {
    id: 'herbicidas',
    tag: 'Residualidad',
    nombre: 'Herbicidas',
    texto:
      'Modelá el residuo de los herbicidas aplicados antes de la siembra y su riesgo de fitotoxicidad sobre el cultivo siguiente, lote por lote.',
    bullets: [
      'Riesgo de carry-over por aplicación según suelo, lluvias y riego',
      'Días que faltan hasta la siembra segura',
      'Aplicaciones de la planilla del lote, carga manual o Unimap (Acronex)',
      'Catálogo de principios activos y restricciones de marbete',
    ],
    semaforo: ['Siembra segura', 'Precaución', 'No sembrar'],
  },
];
