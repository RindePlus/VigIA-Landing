// Contenido en portugués de Brasil: mismas claves que src/data/vigia.js
// (español, la fuente). Es una adaptación, no una traducción palabra por
// palabra: cada término y frase está explicado en
// doc/landing/TRADUCCION_PT.md (glosario y reglas). En resumen:
// - Portugués de Brasil del agro, tratamiento "você", unidades métricas.
// - "lote" → talhão, "ambiente" → zona de manejo, "agua útil" → água
//   disponível, "etapa" → estádio, "bioinsumo" → bioestimulante (estrés
//   abiótico; "bioinsumo" en Brasil incluye el control biológico de
//   plagas), "secano" → sequeiro, "cultivos de servicio" → plantas de
//   cobertura, "rinde" → produtividade, "campaña" → safra.
// - Las mismas afirmaciones que en español (skill vigia-landing-structure):
//   sin IA, satélite ni estrés biótico; acciones genéricas (bioestimulante o
//   irrigación).

import { buildWhatsAppUrl } from './social';
import { HA_TOTAL, GRANO_T, CO2_DESTACADO, formateador, filasImpacto } from './impactoDatos';
import imgEstres from '../assets/quehace/estres.webp';
import imgSiembra from '../assets/quehace/siembra.webp';
import imgAgua from '../assets/quehace/agua.webp';
import imgBioinsumos from '../assets/quehace/bioinsumos.webp';

// La marca no se traduce (ver TRADUCCION_PT.md, "Marca"). En portugués
// lleva artículo masculino en la frase: "o VigIA".
export const MARCA = 'VigIA BioEstrés';

// El equipo atiende en español: la nota lo aclara debajo del botón del
// cierre y en el botón flotante, como en inglés (TRADUCCION_PT.md).
export const CTA = {
  texto: 'Fale com a gente para começar a usar o VigIA',
  mensajeWhatsApp: `Olá, quero começar a usar o ${MARCA}`,
  nota: 'Estamos na Argentina e nossa equipe responde em espanhol.',
};

export const WHATSAPP_URL = buildWhatsAppUrl('Olá, quero mais informações sobre o VigIA');

export const SEO = {
  titulo: `${MARCA} · Alertas de estresse hídrico e térmico`,
  descripcion:
    'Alertas de estresse hídrico e térmico por zona de manejo, com dias de antecedência para aplicar o bioestimulante ou irrigar. Na plataforma e pelo WhatsApp.',
};

// 1. Hero
export const HERO = {
  // "Pérdida" se concreta como perda de produtividade, como en inglés.
  titulo: 'Detecte o estresse antes que ele vire perda de produtividade',
  bajada: `O ${MARCA} acompanha cada zona de manejo desde antes do plantio e avisa você pelo WhatsApp dias antes de o estresse hídrico e térmico aparecer na lavoura. Para produtores e consultores que decidem com dados.`,
};

// 2. El problema
export const PROBLEMA = {
  titulo: 'Quando a lavoura mostra o estresse, a produtividade já foi perdida',
  bajada: 'Quando você vê no campo, já está reagindo tarde e o dano está feito.',
  razones: [
    {
      id: 'sintoma',
      titulo: 'O sintoma chega tarde para o bioestimulante',
      // "La hoja se enrolla": enrolamento das folhas, el síntoma en Brasil.
      texto: 'Quando as folhas enrolam, a produtividade já está comprometida e o bioestimulante protege pouco.',
    },
    {
      id: 'pronostico',
      titulo: 'A previsão regional não conhece o seu talhão',
      // "Etapa" → estádio (fenológico), el término agronómico en Brasil.
      texto: 'Não sabe quanta água ainda resta no seu solo nem em que estádio está a sua lavoura.',
    },
  ],
};

// 3. Lo que hace VigIA
export const QUE_HACE = {
  // "Campaña" → safra.
  titulo: `O ${MARCA} monitora o estresse a safra inteira`,
  bajada:
    'Acompanha cada zona de manejo do pré-plantio ao fim do ciclo e diz quando poupar água e quando aplicar o bioestimulante.',
  puntos: [
    {
      id: 'picos',
      titulo: 'Detecta picos de estresse',
      // "Aire que seca a la planta": la demanda del aire (DPV), como en el
      // glosario.
      texto: 'Falta de água, ar seco puxando água da planta, ou os dois juntos. Alertas por zona de manejo, com antecedência.',
      imagen: imgEstres,
      // "Manchones" → reboleiras, como se dice en la lavoura.
      alt: 'Lavoura de soja em fevereiro, com reboleiras onde a cultura cresceu menos',
    },
    {
      id: 'siembra',
      titulo: 'Desde o pré-plantio',
      texto: 'Acompanha a água do solo desde antes do plantio e avisa 14 dias antes do estádio crítico.',
      imagen: imgSiembra,
      alt: 'Soja recém-emergida em plantio direto sobre palhada de sorgo',
    },
    {
      id: 'agua',
      titulo: 'Uso mais eficiente da água',
      texto: 'Você sabe quanta água disponível tem cada zona de manejo. Se a falta de água está chegando, irriga na hora certa.',
      imagen: imgAgua,
      alt: 'Pivô central irrigando uma lavoura de soja',
    },
    {
      id: 'bioinsumo',
      titulo: 'Pensado para bioestimulantes',
      // "Bioinsumo hídrico / antiestrés térmico" → bioestimulante para
      // estresse hídrico / térmico (glosario).
      texto: 'Cada alerta vem com o seu bioestimulante: para estresse hídrico, para estresse térmico ou preventivo antes do estádio crítico.',
      imagen: imgBioinsumos,
      alt: 'Trator com pulverizador aplicando sobre uma lavoura',
    },
  ],
  // Otros módulos, debajo de las tarjetas (decisión 46).
  modulos: [
    {
      id: 'servicio',
      // "Cultivos de servicio" → plantas de cobertura; "secado" → dessecação.
      pregunta: 'Trabalha com plantas de cobertura?',
      texto: 'O VigIA também acompanha o consumo de água delas frente ao pousio e indica o momento da dessecação.',
      enlace: { texto: 'Saiba mais sobre plantas de cobertura', href: null },
    },
    {
      id: 'herbicidas',
      pregunta: 'Aplicou herbicidas residuais?',
      texto: 'Com o acompanhamento do carryover de herbicidas, você sabe quando é seguro plantar a cultura seguinte.',
      enlace: { texto: 'Saiba mais sobre carryover de herbicidas', href: null },
    },
  ],
};

// 4. La solución
export const COMO_FUNCIONA = {
  titulo: 'Alertas a tempo de agir',
  bajada:
    'O VigIA acompanha cada zona de manejo, todos os dias. Quando o estresse está chegando, avisa com antecedência para aplicar o bioestimulante ou irrigar.',
  canales: [
    {
      id: 'whatsapp',
      titulo: 'No seu WhatsApp',
      texto: 'O alerta chega no celular com a ação sugerida, sem precisar entrar em lugar nenhum.',
    },
    {
      id: 'plataforma',
      titulo: 'Na plataforma',
      // DPV: misma sigla en portugués (déficit de pressão de vapor).
      texto: 'O painel do talhão, com o balanço hídrico e o DPV que explicam cada alerta.',
    },
  ],
  tituloPasos: 'Como funciona',
  pasos: [
    // "Se cargan tus lotes": voz pasiva neutral, igual que en español
    // (pregunta abierta 1: quién hace el alta).
    { id: 'lotes', titulo: 'Seus talhões são cadastrados', texto: 'Zonas de manejo, solo e cultura. O clima se conecta sozinho.' },
    { id: 'calculo', titulo: 'Calcula todos os dias', texto: 'Balanço hídrico e DPV comparados aos limites da sua cultura.' },
    { id: 'alerta', titulo: 'Avisa a tempo', texto: 'Você registra chuvas e irrigações, e o cálculo se ajusta.' },
  ],
  mensaje: {
    alerta: 'Estresse hídrico em 14 dias',
    lote: 'Talhão 12 · Zona 2',
    accion: 'Planeje irrigação ou bioestimulante.',
    hora: '07:30',
    resuelta: 'Resolvido a tempo',
  },
};

// 5. Frase destacada. Misma lógica de colores: *verde* (a tiempo), _rojo_
// (tarde).
export const FRASE = ['Que o bioestimulante chegue', '*antes* do estresse,', 'não _depois do dano._'];

// 6. Impacto. Mismos números que en español (impactoDatos.js), con formato
// de Brasil (20.000).
const fmt = formateador('pt-BR');
const FILAS = filasImpacto(fmt, { maiz: 'Milho', soja: 'Soja', trigo: 'Trigo' }, 'Total');

export const IMPACTO = {
  titulo: 'Impacto',
  bajada: 'Mais grãos e mais carbono no solo',
  indicadores: [
    { id: 'hectareas', valor: `+${fmt(HA_TOTAL)}`, unidad: 'ha', texto: 'monitorados' },
    { id: 'efectividad', valor: '96', unidad: '%', texto: 'de efetividade na resposta ao bioestimulante' },
    {
      id: 'grano',
      valor: `+${fmt(GRANO_T)}`,
      unidad: 't',
      // "Grano recuperado": produção que se preservó (no se perdió), como en
      // inglés. "Lotes que no siguieron a VigIA": se dice lo que significa.
      texto: 'de grãos preservados frente a talhões que não seguiram o VigIA',
      tabla: {
        titulo: 'Produtividade preservada por cultura',
        columnas: ['Cultura', 'Hectares', 'kg/ha a mais', 'Total'],
        filas: FILAS.grano,
        nota: 'Diferença de produtividade entre talhões que aplicaram o bioestimulante seguindo os alertas do VigIA e talhões que não seguiram seus alertas ou recomendações.',
      },
    },
    {
      id: 'carbono',
      valor: `~${fmt(CO2_DESTACADO)}`,
      unidad: 't',
      texto: 'de CO₂ a mais capturadas no solo',
      tabla: {
        titulo: 'Carbono extra capturado por cultura (t CO₂)',
        columnas: ['Cultura', 'Fixado', 'Volta ao solo', 'Fica estável'],
        filas: FILAS.carbono,
        // "Rastrojo" → palhada.
        nota: 'É o carbono extra da produtividade preservada. Equivale a neutralizar as emissões de cerca de 750 carros por ano. O carbono que fica é o da palhada e das raízes; as raízes contribuem com a parte mais estável.',
      },
    },
  ],
  pista: 'Toque em um indicador para ver o detalhe',
  cerrar: 'Fechar detalhe',
};

// 7. Sobre nosotros
export const NOSOTROS = {
  titulo: `As pessoas por trás do ${MARCA}`,
  bajada: 'Uma equipe que reúne tecnologia agrícola, consultoria agronômica e bioestimulantes.',
  representa: 'Representando',
};

// 8. Clientes
export const CLIENTES = { titulo: 'Quem confia em nós' };

// 9. Preguntas frecuentes
export const PREGUNTAS = {
  // "Lo que suelen preguntarnos": el literal suena forzado como título.
  titulo: 'Dúvidas frequentes',
  // Línea chica sobre el CTA, debajo del título (ahí va el cierre): sigue
  // al título de la sección.
  cierre: 'Ficou com alguma dúvida? Fale com a gente.',
  items: [
    {
      pregunta: 'Preciso de sensores ou estações no campo?',
      respuesta:
        'Não. O VigIA usa os dados de clima nas coordenadas de cada talhão. Se você mede chuva ou água no solo, pode registrar e o cálculo se ajusta.',
    },
    {
      pregunta: 'O que eu preciso cadastrar?',
      respuesta:
        'No início, seus talhões, zonas de manejo e solo são cadastrados. Depois, você só registra chuvas e irrigações quando acontecem.',
    },
    {
      pregunta: 'Quais culturas ele acompanha?',
      // Grupo de madurez → grupo de maturidade relativa (GMR); centeno,
      // cebada y vicia → centeio, cevada e ervilhaca.
      respuesta:
        'As culturas da safra (na soja, com a fenologia ajustada por latitude e grupo de maturidade relativa) e plantas de cobertura: centeio, cevada e ervilhaca.',
    },
    {
      pregunta: 'Como recebo os alertas?',
      respuesta: 'Na plataforma, no painel de cada talhão, e pelo WhatsApp, sem precisar entrar.',
    },
    {
      // Secano → sequeiro.
      pregunta: 'Funciona em sequeiro?',
      respuesta:
        'Sim. No sequeiro, avisa a tempo de aplicar o bioestimulante. Em áreas irrigadas, também monta um plano mensal de irrigação com o custo.',
    },
  ],
};

// "Educación" → Conteúdos: así se llama la sección en los sitios de producto
// de Brasil ("Educação" suena a institución educativa).
export const EDUCACION = {
  titulo: 'Conteúdos',
  bajada: `Estamos preparando conteúdos sobre estresse hídrico e térmico, bioestimulantes e uso da água, para você aproveitar melhor o ${MARCA}.`,
  volver: 'Voltar ao início',
};

export const PRECIOS = {
  titulo: 'Preços',
  bajada: `Estamos definindo os planos do ${MARCA}. Fale com a gente e contamos mais.`,
  boton: 'Consultar preços',
  mensajeWhatsApp: `Olá, quero conhecer os preços do ${MARCA}`,
};

export const FOOTER = {
  contacto: { titulo: 'Contato' },
  rindeplus: {
    titulo: 'Rinde Plus',
    texto: 'Procura mais serviços especializados para a sua produção? A Rinde Plus tem outras soluções agtech para o campo.',
    enlace: 'Visite a Rinde Plus',
    href: 'https://rindeplus.com',
  },
  ayuda: {
    titulo: 'Ajuda',
    enlaces: [
      { texto: 'Dúvidas frequentes', href: '/pt/#preguntas', externo: false },
      { texto: 'Fale com a gente pelo WhatsApp', href: WHATSAPP_URL, externo: true },
    ],
  },
  // Las legales sólo existen en español: el enlace lo aclara.
  legales: [
    { texto: 'Política de privacidade (em espanhol)', href: '/privacidad/' },
    { texto: 'Termos e condições (em espanhol)', href: '/terminos/' },
  ],
  pie: 'Todos os direitos reservados.',
  // Créditos de las fotos reales de "Lo que hace VigIA" (Wikimedia
  // Commons): los piden sus licencias Creative Commons.
  creditosFotos: {
    prefijo: 'Fotos via Wikimedia Commons:',
    fotos: [
      { autor: 'Alejo Cristian Santo', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Febrero_-_panoramio.jpg' },
      { autor: 'Maggilautaro', licencia: 'CC BY 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soja_en_Siembra_Directa_sobre_rastrojo_de_Sorgo_Gran%C3%ADfero.jpg' },
      { autor: 'Pollinator', licencia: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:Soybean_1292.JPG' },
      { autor: 'Ermell', licencia: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Traktor_spritzanlage-20200319-RM-173117.jpg' },
    ],
  },
};

export const UI = {
  saltar: 'Pular para o conteúdo',
  inicio: 'início',
  menu: [
    {
      label: 'Produto',
      href: '/pt/#problema',
      hijos: [
        { label: 'Início', href: '/pt/#inicio' },
        { label: 'O problema', href: '/pt/#problema' },
        { label: 'O que monitora', href: '/pt/#que-hace' },
        // Os alertas: "Como te avisa" mezcla el te con el você del sitio.
        { label: 'Os alertas', href: '/pt/#como-funciona' },
      ],
    },
    { label: 'Impacto', href: '/pt/#impacto' },
    { label: 'Quem somos', href: '/pt/#nosotros' },
    // Contacto lleva a Preguntas, que abre con el CTA y sigue con el footer
    // de contacto: las dos son "Contacto" en el menú.
    { label: 'Contato', href: '/pt/#preguntas' },
    { label: 'Conteúdos', href: '/pt/educacion/' },
  ],
  header: {
    idioma: 'Idioma',
    modoClaro: 'Modo claro',
    modoOscuro: 'Modo escuro',
    activarClaro: 'Ativar modo claro',
    activarOscuro: 'Ativar modo escuro',
    cambiarTema: 'Alternar entre modo claro e escuro',
    whatsapp: 'Fale com a gente pelo WhatsApp',
    ingresar: 'Entrar',
    ingresarLabel: 'Entrar na plataforma',
    abrirMenu: 'Abrir menu',
    cerrarMenu: 'Fechar menu',
  },
  widget: {
    saludo: 'Olá',
    saludoLabel: 'aceno',
    pregunta: 'Como podemos ajudar?',
    boton: 'Fale com a gente pelo WhatsApp',
    nota: 'Nossa equipe responde em espanhol.',
  },
  graficos: {
    conVigia: {
      titulo: 'Água no solo · Talhão 12',
      descripcion:
        'A água disponível no solo cai dia a dia. A previsão mostra que ela vai cruzar o limite da cultura em 14 dias, e o VigIA envia o alerta antes.',
      pronostico: 'Previsão',
      umbral: 'Limite da cultura',
      aguaUtil: 'Água disponível',
      hoy: 'Hoje',
      porWhatsApp: 'Pelo WhatsApp',
      // "Alerta" es masculino en portugués.
      alertaEnviada: 'Alerta enviado',
      alerta: 'Estresse hídrico em 14 dias',
    },
    sinVigia: {
      titulo: 'Água no solo · sem VigIA',
      descripcion:
        'Sem previsão nem alertas, a água disponível cruza o limite da cultura sem ninguém avisar. O estresse é percebido no campo seis dias depois.',
      umbral: 'Limite da cultura',
      aguaUtil: 'Água disponível',
      rindePerdido: 'Produtividade perdida',
      loVesACampo: 'Você vê no campo',
      tarde: 'Aparece no campo 6 dias tarde',
      tardeTexto: 'O bioestimulante já não chega a tempo.',
    },
  },
  chat: {
    label: 'Exemplo de alerta do VigIA no WhatsApp',
    estado: 'Alertas dos seus talhões',
    escribiendo: 'digitando…',
    hoy: 'Hoje',
    mensaje: 'Mensagem',
  },
  videos: {
    problema: 'Sem alerta · o dano aparece no campo',
    resolucion: 'Com o alerta · aplicado a tempo',
  },
  soloEspanol: 'Somente em espanhol',
};

export const NO_ENCONTRADA = {
  titulo: 'Página não encontrada',
  texto: 'A página que você procura não existe.',
  volver: 'Voltar ao início',
};
