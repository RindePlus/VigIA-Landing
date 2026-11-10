// Textos de /en/privacidad y /en/terminos: versión en inglés de
// src/data/legal.js (la fuente), con las mismas claves. Es una adaptación
// fiel: mismas afirmaciones, sin sumar ni quitar compromisos. Los nombres de
// leyes y organismos van con su nombre oficial y, si hace falta, una
// aclaración en inglés. Si hay diferencias, prevalece el español.
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia.en';

export const LEGAL_UI = {
  actualizado: 'Last updated',
  fecha: 'November 2026',
};

export const PRIVACIDAD = {
  titulo: 'Privacy policy',
  descripcion:
    'What data the VigIA BioEstrés website processes, why, which third-party services are involved and how to exercise your rights over your data.',
  secciones: [
    {
      titulo: 'Who is responsible',
      parrafos: [
        `This website presents ${MARCA} and is operated by Rinde Plus (${RAZON_SOCIAL}, tax ID (CUIT) ${CUIT}), located at ${OFFICE_ADDRESS}, which is responsible for the personal data processed through it. For any question about your data, email us at ${CONTACT_EMAIL}.`,
      ],
    },
    {
      titulo: 'What data this website collects',
      parrafos: [
        'The website has no forms or user accounts, and does not use cookies, analytics or advertising tools.',
        'It stores two technical settings in your browser, which stay on your device and are never sent to us: whether you chose light or dark mode and, only for the length of your visit, where you were on the page when you switched languages, so you stay in the same section.',
        'The website is hosted on GitHub Pages, a service of GitHub, Inc. (United States). Like any web server, GitHub logs technical data about each visit, such as your IP address, to run and protect the service. We do not access those logs; GitHub processes them under its own privacy policy.',
      ],
    },
    {
      titulo: 'When you contact us',
      parrafos: [
        'If you contact us by WhatsApp or email, we use the data you share (name, phone number, email and whatever you tell us about your fields) to reply, schedule a demo and, if you ask, prepare a proposal. Sharing this data is voluntary, but without it we cannot reply.',
        'We process it with your consent, which you give by contacting us, and because it is needed for the steps prior to a possible contract.',
        'We keep it for as long as the conversation lasts and, if you sign up for the service, for as long as the business relationship lasts. Once it is no longer needed for those purposes, we delete it, unless a law requires us to keep it.',
      ],
    },
    {
      titulo: 'Who we share it with',
      parrafos: [
        'We do not sell or transfer your data. The only parties involved are the providers of the services we use to host the website and to communicate (GitHub, WhatsApp by Meta and Google email), and an authority could request it in the cases provided for by law.',
        'The website does not load resources from other services: fonts, images and videos are served from the website itself. Links to WhatsApp, Instagram and Google Maps take you to those services, which have their own privacy policies.',
        'These providers may store data on servers outside Argentina, including in countries that Argentina does not consider to offer adequate protection, such as the United States. By visiting the website or contacting us through those channels, you consent to that transfer.',
      ],
    },
    {
      titulo: 'How we protect it',
      parrafos: [
        'We take reasonable measures to prevent your data from being lost, altered or seen by anyone without authorization. Only the team members who need it to reply to you have access to it.',
      ],
    },
    {
      titulo: 'Your rights',
      parrafos: [
        `You can request access to, correction, update or deletion of your personal data by emailing ${CONTACT_EMAIL}, under Argentina's Personal Data Protection Law No. 25,326. We answer access requests within 10 calendar days, and correction, update or deletion requests within 5 business days.`,
        'The data subject has the right to access their personal data free of charge at intervals of no less than six months, unless a legitimate interest is shown, as set out in article 14, section 3 of Law No. 25,326.',
        'The Agencia de Acceso a la Información Pública (Argentina’s Agency for Access to Public Information), as the supervisory authority of Law No. 25,326, has the power to handle complaints and claims filed by anyone whose rights are affected by a breach of the data protection rules in force.',
        `If you live outside Argentina, you also have the rights granted by the law of your country. In Brazil, the Lei Geral de Proteção de Dados (Law 13,709/2018) allows you, among other things, to confirm whether we process your data, access it, correct it, request its deletion or portability, and withdraw your consent. You can exercise these rights at ${CONTACT_EMAIL}, which is also the contact of our data protection officer, and file a complaint with the Autoridade Nacional de Proteção de Dados (ANPD).`,
      ],
    },
    {
      titulo: 'Minors',
      parrafos: [
        'The website is aimed at farmers, agronomists and agricultural companies. It is not intended for people under 18, and we do not knowingly collect their data.',
      ],
    },
    {
      titulo: 'Changes and languages',
      parrafos: [
        'If we change this policy, we will publish the new version on this page with its update date.',
        'This policy is available in Spanish, English and Portuguese. If the versions differ, the Spanish version prevails.',
      ],
    },
  ],
};

export const TERMINOS = {
  titulo: 'Terms and conditions',
  descripcion:
    'Terms of use of the VigIA BioEstrés website: scope of the information and results, contracting, intellectual property and governing law.',
  secciones: [
    {
      titulo: 'About this website',
      parrafos: [
        `This website presents ${MARCA} and is operated by Rinde Plus (${RAZON_SOCIAL}, tax ID (CUIT) ${CUIT}), located at ${OFFICE_ADDRESS}. These terms govern the use of the website: by browsing it, you accept them. If you do not agree, please do not use it.`,
      ],
    },
    {
      titulo: 'Information and results',
      parrafos: [
        'The content of the website is general and for information only: it is not agronomic advice for any particular field.',
        'The yield protected figures come from field measurements over five seasons; the carbon figures are estimates calculated from that yield. They do not guarantee the same result in your field, which depends on its management zones, how it is managed and each year’s weather.',
        'The alerts and the actions VigIA suggests (biostimulant or irrigation) support the decision of the farmer or their agronomist, but do not replace it: the final decision and how it is carried out remain their responsibility.',
      ],
    },
    {
      titulo: 'Pricing and contracting',
      parrafos: [
        `Nothing published on the website is a binding offer. ${MARCA} plans, prices and conditions are provided and agreed when you sign up for the service, and use of the platform is governed by those conditions.`,
      ],
    },
    {
      titulo: 'Use of the website',
      parrafos: [
        'Please use the website in good faith: do not try to damage or alter it or to access areas that are not public, and do not use its content for unlawful purposes.',
      ],
    },
    {
      titulo: 'Intellectual property',
      parrafos: [
        `The ${MARCA} and Rinde Plus trademarks, logos, text, graphics, videos and website design belong to their owners and are protected by Argentine intellectual property law (Law No. 11,723) and trademark law (Law No. 22,362). They may not be reproduced without permission.`,
        'Some photos belong to third parties and are used under Creative Commons licenses, with their authors credited at the bottom of the website. Client logos belong to each company.',
      ],
    },
    {
      titulo: 'Links to other websites',
      parrafos: [
        'The website links to third-party services (WhatsApp, Instagram, Google Maps and others). We are not responsible for their content or their policies.',
      ],
    },
    {
      titulo: 'Availability and liability',
      parrafos: [
        'We may change or update the website and its content, or stop publishing them, at any time. We try to keep the information accurate and up to date, but we do not guarantee that it is error-free or that the website will work without interruption.',
        'To the extent permitted by law, we are not liable for decisions made solely on the basis of the information on this website. This does not limit any rights you have under applicable consumer protection laws (in Argentina, Law No. 24,240; in Brazil, the Consumer Protection Code).',
      ],
    },
    {
      titulo: 'Governing law and jurisdiction',
      parrafos: [
        'These terms are governed by the laws of the Argentine Republic. Any dispute will be heard by the ordinary courts of the Province of Córdoba, unless a mandatory rule, such as consumer protection law, sets a different jurisdiction.',
      ],
    },
    {
      titulo: 'Changes, languages and contact',
      parrafos: [
        'We may update these terms; the version in force is the one published on this page, with its update date.',
        'These terms are available in Spanish, English and Portuguese. If the versions differ, the Spanish version prevails.',
        `For any question, email us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
