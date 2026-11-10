// Textos de /pt/privacidad y /pt/terminos: versión en portugués de Brasil
// de src/data/legal.js (la fuente), con las mismas claves. Adaptación fiel:
// mismas afirmaciones, sin sumar ni quitar compromisos; los términos de la
// LGPD van como los usa la ley brasileña (controlador, titular, encarregado).
// Si hay diferencias, prevalece el español.
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia.pt';

export const LEGAL_UI = {
  actualizado: 'Última atualização',
  fecha: 'Novembro de 2026',
};

export const PRIVACIDAD = {
  titulo: 'Política de privacidade',
  descripcion:
    'Quais dados o site do VigIA BioEstrés trata, para quê, quais serviços de terceiros participam e como exercer seus direitos sobre os seus dados.',
  secciones: [
    {
      titulo: 'Quem é o responsável',
      parrafos: [
        `Este site apresenta o ${MARCA} e é operado pela Rinde Plus (${RAZON_SOCIAL}, CUIT ${CUIT}), com endereço em ${OFFICE_ADDRESS}, controladora dos dados pessoais tratados por meio dele. Para qualquer dúvida sobre os seus dados, escreva para ${CONTACT_EMAIL}.`,
      ],
    },
    {
      titulo: 'Quais dados este site coleta',
      parrafos: [
        'O site não tem formulários nem contas de usuário, e não usa cookies nem ferramentas de análise ou de publicidade.',
        'Ele guarda no seu navegador dois dados técnicos, que ficam no seu dispositivo e não são enviados para nós: se você escolheu o modo claro ou escuro e, só durante a visita, em que parte da página você estava ao trocar de idioma, para que continue na mesma seção.',
        'O site está hospedado no GitHub Pages, um serviço da GitHub, Inc. (Estados Unidos). Como qualquer servidor web, o GitHub registra dados técnicos de cada visita, como o endereço IP, para operar e proteger o serviço. Nós não acessamos esses registros; o GitHub os trata segundo a sua própria política de privacidade.',
      ],
    },
    {
      titulo: 'Quando você entra em contato',
      parrafos: [
        'Se você falar com a gente por WhatsApp ou por e-mail, usamos os dados que você compartilhar (nome, telefone, e-mail e o que contar sobre os seus talhões) para responder, agendar uma demonstração e, se você pedir, preparar uma proposta. Informar esses dados é voluntário, mas sem eles não conseguimos responder.',
        'Tratamos esses dados com o seu consentimento, dado ao entrar em contato, e porque são necessários para os procedimentos preliminares a uma possível contratação.',
        'Guardamos os dados enquanto durar a conversa e, se você contratar o serviço, enquanto durar a relação comercial. Quando deixam de ser necessários para essas finalidades, nós os eliminamos, salvo se uma lei nos obrigar a guardá-los.',
      ],
    },
    {
      titulo: 'Com quem são compartilhados',
      parrafos: [
        'Não vendemos nem cedemos os seus dados. Só participam os fornecedores dos serviços que usamos para hospedar o site e para nos comunicar (GitHub, WhatsApp da Meta e o e-mail do Google), e uma autoridade poderia solicitá-los nos casos previstos em lei.',
        'O site não carrega recursos de outros serviços: as fontes, imagens e vídeos são servidos pelo próprio site. Os links para WhatsApp, Instagram e Google Maps levam a esses serviços, que têm as suas próprias políticas de privacidade.',
        'Esses fornecedores podem guardar os dados em servidores fora da Argentina, inclusive em países que a Argentina não considera de proteção adequada, como os Estados Unidos. Ao visitar o site ou falar com a gente por esses canais, você consente com essa transferência.',
      ],
    },
    {
      titulo: 'Como protegemos os dados',
      parrafos: [
        'Adotamos medidas razoáveis para evitar que os seus dados sejam perdidos, alterados ou vistos por alguém sem autorização. Só acessam os dados as pessoas da equipe que precisam deles para responder a você.',
      ],
    },
    {
      titulo: 'Seus direitos',
      parrafos: [
        `Você pode pedir acesso, retificação, atualização ou eliminação dos seus dados pessoais escrevendo para ${CONTACT_EMAIL}, nos termos da Ley 25.326 de Protección de los Datos Personales (lei argentina de proteção de dados). Respondemos os pedidos de acesso em até 10 dias corridos, e os de retificação, atualização ou eliminação em até 5 dias úteis.`,
        'O titular dos dados pessoais tem a faculdade de exercer o direito de acesso a eles de forma gratuita, em intervalos não inferiores a seis meses, salvo se comprovar um interesse legítimo, conforme o artigo 14, inciso 3 da Ley 25.326.',
        'A Agencia de Acceso a la Información Pública (autoridade argentina de proteção de dados), como órgão de controle da Ley 25.326, tem a atribuição de atender às denúncias e reclamações apresentadas por quem tiver seus direitos afetados pelo descumprimento das normas vigentes de proteção de dados pessoais.',
        `Se você mora fora da Argentina, também tem os direitos que a lei do seu país reconhece. No Brasil, a Lei Geral de Proteção de Dados (Lei 13.709/2018) permite, entre outros, confirmar se tratamos os seus dados, acessá-los, corrigi-los, pedir a sua eliminação ou portabilidade e revogar o seu consentimento. Você pode exercer esses direitos em ${CONTACT_EMAIL}, que é também o contato do encarregado pelo tratamento de dados, e peticionar à Autoridade Nacional de Proteção de Dados (ANPD).`,
      ],
    },
    {
      titulo: 'Menores de idade',
      parrafos: [
        'O site é voltado a produtores, consultores e empresas do agro. Não é destinado a menores de 18 anos, e não coletamos os seus dados intencionalmente.',
      ],
    },
    {
      titulo: 'Alterações e idiomas',
      parrafos: [
        'Se alterarmos esta política, publicamos a nova versão nesta página, com a data de atualização.',
        'Esta política está disponível em espanhol, inglês e português. Se houver diferenças entre as versões, prevalece a versão em espanhol.',
      ],
    },
  ],
};

export const TERMINOS = {
  titulo: 'Termos e condições',
  descripcion:
    'Condições de uso do site do VigIA BioEstrés: alcance das informações e dos resultados, contratação, propriedade intelectual e lei aplicável.',
  secciones: [
    {
      titulo: 'Sobre este site',
      parrafos: [
        `Este site apresenta o ${MARCA} e é operado pela Rinde Plus (${RAZON_SOCIAL}, CUIT ${CUIT}), com endereço em ${OFFICE_ADDRESS}. Estes termos regem o uso do site: ao navegar nele, você os aceita. Se não concordar, pedimos que não o utilize.`,
      ],
    },
    {
      titulo: 'Informações e resultados',
      parrafos: [
        'Os conteúdos do site são informativos e gerais: não são uma recomendação agronômica para um talhão específico.',
        'Os números de produtividade recuperada vêm de medições de campo ao longo de cinco safras; os de carbono são estimativas calculadas a partir dessa produtividade. Eles não garantem o mesmo resultado no seu talhão, que depende das zonas de manejo, do manejo e do clima de cada ano.',
        'Os alertas e as ações que o VigIA sugere (bioestimulante ou irrigação) apoiam a decisão do produtor ou do seu consultor, mas não a substituem: a decisão final e a sua aplicação ficam a cargo deles.',
      ],
    },
    {
      titulo: 'Preços e contratação',
      parrafos: [
        `O que é publicado no site não é uma oferta vinculante. Os planos, preços e condições do ${MARCA} são informados e acordados na contratação do serviço, e o uso da plataforma é regido por essas condições.`,
      ],
    },
    {
      titulo: 'Uso do site',
      parrafos: [
        'Pedimos que você use o site de boa-fé: sem tentar danificá-lo, alterá-lo ou acessar áreas que não são públicas, e sem usar os seus conteúdos para fins ilícitos.',
      ],
    },
    {
      titulo: 'Propriedade intelectual',
      parrafos: [
        `As marcas ${MARCA} e Rinde Plus, os logos, textos, gráficos, vídeos e o design do site pertencem aos seus titulares e são protegidos pelas leis argentinas de propriedade intelectual (Ley 11.723) e de marcas (Ley 22.362). Não podem ser reproduzidos sem autorização.`,
        'Algumas fotos são de terceiros e são usadas sob licenças Creative Commons, com os autores citados no rodapé do site. Os logos de clientes pertencem a cada empresa.',
      ],
    },
    {
      titulo: 'Links para outros sites',
      parrafos: [
        'O site tem links para serviços de terceiros (WhatsApp, Instagram, Google Maps e outros). Não somos responsáveis pelos seus conteúdos nem pelas suas políticas.',
      ],
    },
    {
      titulo: 'Disponibilidade e responsabilidade',
      parrafos: [
        'Podemos alterar ou atualizar o site e os seus conteúdos, ou deixar de publicá-los, a qualquer momento. Procuramos manter as informações corretas e atualizadas, mas não garantimos que não tenham erros nem que o site funcione sem interrupções.',
        'Na medida em que a lei permitir, não respondemos por decisões tomadas apenas com base nas informações deste site. Isso não limita os direitos que as normas de defesa do consumidor aplicáveis reconhecem a você (na Argentina, a Ley 24.240; no Brasil, o Código de Defesa do Consumidor).',
      ],
    },
    {
      titulo: 'Lei aplicável e foro',
      parrafos: [
        'Estes termos são regidos pelas leis da República Argentina. Para qualquer controvérsia, são competentes os tribunais ordinários da Província de Córdoba, salvo se uma norma de ordem pública, como as de defesa do consumidor, determinar outro foro.',
      ],
    },
    {
      titulo: 'Alterações, idiomas e contato',
      parrafos: [
        'Podemos atualizar estes termos; a versão vigente é a publicada nesta página, com a data de atualização.',
        'Estes termos estão disponíveis em espanhol, inglês e português. Se houver diferenças entre as versões, prevalece a versão em espanhol.',
        `Para qualquer dúvida, escreva para ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
