// Política de privacidad en portugués de Brasil (/pt/privacidad/): versión
// de src/data/legal.js (la fuente), con las mismas claves. Traducción fiel,
// con la redacción de la versión en portugués de rindeplus.com y el
// vocabulario de la LGPD (controlador, titular, encarregado). Si hay
// diferencias, rige el español.
// HTML propio (set:html): sólo texto fijo de este archivo.
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia.pt';
import { AAIP_URL } from './legal';

const MAIL = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
const aaip = (texto) => `<a href="${AAIP_URL}" target="_blank" rel="noopener noreferrer">${texto}</a>`;

export const PRIVACIDAD = {
  titulo: 'Política de privacidade',
  descripcion: `Quais dados o ${MARCA} trata quando você visita o site ou entra em contato com a equipe, para que os usa, com quem os compartilha e como exercer seus direitos.`,
  actualizado: '9 de novembro de 2026',
  fechaLabel: 'Última atualização',
  secciones: [
    {
      titulo: '1. Quem é o responsável pelos seus dados',
      parrafos: [
        `O controlador dos dados é a <strong>${RAZON_SOCIAL}</strong> (CUIT ${CUIT}), titular das marcas ${MARCA} e Rinde Plus, com sede em ${OFFICE_ADDRESS}. Para qualquer dúvida sobre seus dados pessoais, escreva para ${MAIL}.`,
      ],
    },
    {
      titulo: '2. A que se aplica esta política',
      parrafos: [
        'Esta política se aplica ao site vigiabioestres.com, em todos os seus idiomas, e às comunicações que você mantiver conosco por WhatsApp, e-mail ou redes sociais.',
        `A plataforma ${MARCA} tem seus próprios Termos e condições e sua própria Política de privacidade, disponíveis na plataforma, que regulam os dados inseridos nela e que cada usuário aceita ao entrar.`,
      ],
    },
    {
      titulo: '3. Quais dados tratamos e para quê',
      parrafos: [
        '<strong>Quando você navega no site.</strong> O site não tem formulários nem contas de usuário e não usa ferramentas de análise, de publicidade nem de rastreamento entre sites.',
      ],
      lista: [
        'Nosso provedor de hospedagem trata os dados técnicos de cada visita (endereço IP, navegador, página solicitada, data e hora) para entregar o site e protegê-lo contra ataques e abusos. Nós não acessamos esses registros.',
      ],
      cierre: [
        '<strong>Quando você nos escreve.</strong> Se você entrar em contato por WhatsApp, e-mail ou redes sociais, tratamos os dados que você compartilhar: nome, telefone, e-mail, empresa e o que você nos contar sobre suas fazendas e talhões. Usamos esses dados para responder, agendar uma demonstração, criar seu acesso à plataforma se você pedir e acompanhar sua consulta.',
        'Gerenciamos as conversas com um sistema de atendimento que pode usar ferramentas automáticas, incluindo ferramentas de inteligência artificial, para transcrever áudios, ler imagens e documentos e preparar ou revisar respostas. Essas ferramentas não tomam decisões que produzam efeitos jurídicos sobre você nem que o afetem de forma significativa.',
        'Fornecer seus dados é voluntário. Sem um meio de contato, não podemos responder.',
      ],
    },
    {
      titulo: '4. O que fica salvo no seu navegador',
      parrafos: [
        'O site não usa cookies. Ele salva no seu navegador se você escolheu o modo claro ou escuro e, por um instante, a seção em que você estava ao trocar de idioma, para voltar ao mesmo ponto. Esses dados ficam no seu dispositivo e não são enviados para nós; você pode apagá-los nas configurações do navegador.',
      ],
    },
    {
      titulo: '5. Com quem compartilhamos seus dados',
      parrafos: [
        'Não vendemos nem cedemos seus dados pessoais. Eles só são tratados, em nosso nome e segundo nossas instruções, pelos provedores que nos prestam serviços:',
      ],
      lista: [
        'GitHub, Inc. (hospedagem do site).',
        'WhatsApp, da Meta Platforms, Inc. (mensagens) e nosso provedor de e-mail.',
        'Os provedores da ferramenta de atendimento e dos serviços automáticos que usamos para gerenciar as conversas.',
      ],
      cierre: [
        'Também podemos revelar dados quando uma autoridade competente determinar ou a lei exigir.',
        'O site não carrega recursos de outros serviços: as fontes, imagens e vídeos são servidos pelo próprio site. Os links para WhatsApp, Instagram e Google Maps levam a serviços de terceiros, que tratam seus dados segundo suas próprias políticas.',
      ],
    },
    {
      titulo: '6. Transferências internacionais',
      parrafos: [
        'Vários desses provedores tratam dados fora da Argentina, especialmente nos Estados Unidos, um país que a Argentina não considera de proteção adequada. Trabalhamos com provedores que oferecem garantias contratuais de proteção de dados, nos termos do artigo 12 da Lei argentina 25.326, do Decreto 1558/2001 e das normas da Agência de Acesso à Informação Pública.',
        'Ao entrar em contato conosco, você dá seu consentimento expresso para que seus dados sejam transferidos a esses provedores para as finalidades desta política.',
      ],
    },
    {
      titulo: '7. Por quanto tempo os guardamos',
      parrafos: [
        'Guardamos seus dados enquanto forem necessários para atender sua consulta e, se você for cliente, enquanto durar a relação. Depois, guardamos apenas pelo tempo exigido por obrigações legais ou pela defesa contra possíveis reclamações, e então os excluímos ou anonimizamos.',
      ],
    },
    {
      titulo: '8. Segurança',
      parrafos: [
        'Aplicamos medidas técnicas e organizacionais razoáveis para proteger seus dados: o site funciona apenas com conexões criptografadas (HTTPS) e o acesso às conversas é restrito às pessoas da equipe que precisam dele.',
      ],
    },
    {
      titulo: '9. Seus direitos',
      parrafos: ['Como titular dos dados, você tem direito a:'],
      lista: [
        '<strong>Acesso:</strong> saber quais dados seus tratamos, gratuitamente e em intervalos não inferiores a seis meses, salvo se você demonstrar um interesse legítimo. Respondemos em até dez dias corridos a partir do recebimento do pedido.',
        '<strong>Retificação, atualização e exclusão:</strong> que corrijamos, atualizemos ou excluamos seus dados. Fazemos isso em até cinco dias úteis a partir do recebimento do pedido.',
        '<strong>Revogação do consentimento e oposição:</strong> revogar seu consentimento a qualquer momento e pedir que deixemos de enviar comunicações comerciais.',
      ],
      cierre: [
        `Para exercê-los, escreva para ${MAIL} pelo mesmo meio de contato que você usou conosco, ou indicando como comprovar que você é o titular.`,
        `A Agência de Acesso à Informação Pública (AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA), na qualidade de Órgão de Controle da Lei nº 25.326, tem a atribuição de atender às denúncias e reclamações apresentadas por quem for afetado em seus direitos pelo descumprimento das normas vigentes em matéria de proteção de dados pessoais. Veja ${aaip('como apresentar uma reclamação à Agência')} (em espanhol).`,
        `Se outra legislação de proteção de dados se aplicar a você, como a do seu país de residência, você também pode exercer conosco os direitos que essa lei lhe garante, pelo mesmo canal. No Brasil, a Lei Geral de Proteção de Dados (Lei 13.709/2018) também permite pedir a portabilidade dos seus dados e peticionar à Autoridade Nacional de Proteção de Dados (ANPD); o contato do nosso encarregado pelo tratamento de dados é ${MAIL}.`,
      ],
    },
    {
      titulo: '10. Menores de idade',
      parrafos: [
        'O site é voltado a produtores, consultores e empresas do setor agropecuário. Não buscamos coletar dados de menores de 18 anos; se soubermos que isso aconteceu, os excluímos.',
      ],
    },
    {
      titulo: '11. Alterações nesta política',
      parrafos: [
        'Se alterarmos esta política, publicaremos a nova versão nesta página com a data de atualização. Se a alteração for relevante e tivermos seu contato, avisaremos você.',
      ],
    },
    {
      titulo: '12. Lei aplicável',
      parrafos: [
        'Esta política é regida pelas leis da República Argentina, em especial a Lei 25.326 de Proteção dos Dados Pessoais e sua regulamentação. É publicada em espanhol, inglês e português; em caso de divergência entre as versões, prevalece a versão em espanhol.',
      ],
    },
  ],
};
