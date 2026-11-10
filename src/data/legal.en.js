// Política de privacidad en inglés (/en/privacidad/): versión de
// src/data/legal.js (la fuente), con las mismas claves. Traducción fiel:
// mismas afirmaciones y compromisos, con la redacción de la versión en
// inglés de rindeplus.com. Si hay diferencias, rige el español.
// HTML propio (set:html): sólo texto fijo de este archivo.
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia.en';
import { AAIP_URL } from './legal';

const MAIL = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
const aaip = (texto) => `<a href="${AAIP_URL}" target="_blank" rel="noopener noreferrer">${texto}</a>`;

export const PRIVACIDAD = {
  titulo: 'Privacy policy',
  descripcion: `What data ${MARCA} processes when you visit its website or contact the team, what it uses it for, who it shares it with and how to exercise your rights.`,
  actualizado: 'November 9, 2026',
  fechaLabel: 'Last updated',
  secciones: [
    {
      titulo: '1. Who is responsible for your data',
      parrafos: [
        `The data controller is <strong>${RAZON_SOCIAL}</strong> (CUIT ${CUIT}), owner of the ${MARCA} and Rinde Plus brands, located at ${OFFICE_ADDRESS}. For any question about your personal data, write to ${MAIL}.`,
      ],
    },
    {
      titulo: '2. What this policy covers',
      parrafos: [
        'This policy applies to the vigiabioestres.com website, in all its languages, and to the communications you have with us through WhatsApp, email or social media.',
        `The ${MARCA} platform has its own Terms and conditions and Privacy policy, available on the platform, which govern the data entered into it and which every user accepts when signing in.`,
      ],
    },
    {
      titulo: '3. What data we process and why',
      parrafos: [
        '<strong>When you browse the website.</strong> The website has no forms or user accounts, and it does not use analytics, advertising or cross-site tracking tools.',
      ],
      lista: [
        'Our hosting provider processes the technical data of each visit (IP address, browser, requested page, date and time) to deliver the website and protect it from attacks and abuse. We do not access those logs.',
      ],
      cierre: [
        '<strong>When you write to us.</strong> If you contact us through WhatsApp, email or social media, we process the data you share: name, phone number, email, company and whatever you tell us about your farms and fields. We use it to reply, arrange a demo, set up your platform account if you ask for it and follow up on your inquiry.',
        'We manage conversations with a customer service system that may use automated tools, including artificial intelligence tools, to transcribe audio messages, read images and documents, and draft or review replies. These tools do not make decisions that produce legal effects on you or significantly affect you.',
        'Providing your data is voluntary. Without a way to contact you, we cannot reply.',
      ],
    },
    {
      titulo: '4. What is stored in your browser',
      parrafos: [
        'The website does not use cookies. It stores in your browser whether you chose light or dark mode and, briefly, the section you were reading when you switch languages, so you return to the same spot. This data stays on your device and is not sent to us; you can delete it from your browser settings.',
      ],
    },
    {
      titulo: '5. Who we share your data with',
      parrafos: [
        'We do not sell or transfer your personal data. It is only processed, on our behalf and under our instructions, by the providers that render services to us:',
      ],
      lista: [
        'GitHub, Inc. (website hosting).',
        'WhatsApp, by Meta Platforms, Inc. (messaging) and our email provider.',
        'The providers of the customer service tool and of the automated services we use to manage conversations.',
      ],
      cierre: [
        'We may also disclose data when ordered by a competent authority or required by law.',
        'The website does not load resources from other services: fonts, images and videos are served from the website itself. Links to WhatsApp, Instagram and Google Maps take you to third-party services, which process your data under their own policies.',
      ],
    },
    {
      titulo: '6. International transfers',
      parrafos: [
        'Several of these providers process data outside Argentina, particularly in the United States, a country that Argentina does not consider to offer adequate protection. We work with providers that offer contractual data protection safeguards, as provided by section 12 of Argentine Law 25,326, Decree 1558/2001 and the rules of the Agency for Access to Public Information.',
        'By contacting us, you give your express consent for your data to be transferred to these providers for the purposes of this policy.',
      ],
    },
    {
      titulo: '7. How long we keep it',
      parrafos: [
        'We keep your data for as long as needed to handle your inquiry and, if you are a customer, for as long as the relationship lasts. Afterwards we keep it only for as long as legal obligations or the defense of possible claims require, and then we delete or anonymize it.',
      ],
    },
    {
      titulo: '8. Security',
      parrafos: [
        'We apply reasonable technical and organizational measures to protect your data: the website only works over encrypted connections (HTTPS), and access to conversations is restricted to the team members who need it.',
      ],
    },
    {
      titulo: '9. Your rights',
      parrafos: ['As the data subject, you have the right to:'],
      lista: [
        '<strong>Access:</strong> find out what data about you we process, free of charge and at intervals of no less than six months, unless you show a legitimate interest. We reply within ten calendar days of receiving the request.',
        '<strong>Rectification, update and deletion:</strong> have your data corrected, updated or deleted. We do so within five business days of receiving the request.',
        '<strong>Withdrawal of consent and objection:</strong> withdraw your consent at any time and ask us to stop sending you commercial communications.',
      ],
      cierre: [
        `To exercise these rights, write to ${MAIL} from the contact channel you used with us, or explain how you can prove you are the data subject.`,
        `The Agency for Access to Public Information (AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA), as the Supervisory Authority of Law No. 25,326, has the power to handle the complaints and claims filed by anyone whose rights are affected by non-compliance with the rules in force on personal data protection. See ${aaip('how to file a claim with the Agency')} (in Spanish).`,
        `If another data protection law applies to you, such as that of your country of residence, you can also exercise with us the rights that law grants you, through the same channel. In Brazil, the Lei Geral de Proteção de Dados (Law 13,709/2018) also allows you to request the portability of your data and to file a complaint with the Autoridade Nacional de Proteção de Dados (ANPD); our data protection officer can be reached at ${MAIL}.`,
      ],
    },
    {
      titulo: '10. Minors',
      parrafos: [
        'The website is aimed at growers, agronomic advisors and companies in the agricultural sector. We do not seek to collect data from people under 18; if we learn that we did, we delete it.',
      ],
    },
    {
      titulo: '11. Changes to this policy',
      parrafos: [
        'If we change this policy, we publish the new version on this page with its update date. If the change is significant and we have your contact details, we will let you know.',
      ],
    },
    {
      titulo: '12. Governing law',
      parrafos: [
        'This policy is governed by the laws of the Argentine Republic, in particular Law 25,326 on Personal Data Protection and its regulations. It is published in Spanish, English and Portuguese; in case of any discrepancy between versions, the Spanish version prevails.',
      ],
    },
  ],
};
