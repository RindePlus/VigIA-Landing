// Política de privacidad del sitio en español, la fuente (vista en
// src/views/LegalPage.astro, enlazada desde el footer). Las versiones en
// inglés y portugués están en legal.en.js y legal.pt.js, con las mismas
// claves; si hay diferencias, rige el español (lo dice la sección 12).
//
// Cubre el sitio y los canales de contacto, con la misma estructura y
// criterio que la de rindeplus.com (repo Landing, src/data/legal.js). Los
// términos y la política de la plataforma VigIA se ven desde el login y la
// propia plataforma: acá sólo se nombran, sin enlace (ADR 0011).
//
// Describe lo que el sitio hace hoy; si cambia algo de esto, se actualiza el
// texto y la fecha en los tres idiomas:
// - sin formularios, cuentas, cookies, analítica ni publicidad (verificado
//   en vigiabioestres.com: lo sirve GitHub directo, sin Cloudflare, y sólo
//   pide recursos al propio dominio);
// - alojamiento en GitHub Pages, sólo por HTTPS;
// - tipografías, imágenes y videos servidos desde el mismo sitio;
// - en el navegador: el tema (localStorage, vg-theme) y, por un momento, la
//   posición al cambiar de idioma (sessionStorage, vg-idioma-scroll);
// - contacto por WhatsApp (el mismo número y la misma bandeja de atención
//   que Rinde Plus, con herramientas automáticas), email e Instagram.
//
// Normas: Ley 25.326 y Decreto 1558/2001 (deber de información del art. 6,
// plazos de los arts. 14 y 16, transferencias del art. 12), la leyenda de la
// Resolución AAIP 14/2018 y, para Brasil, la LGPD.
//
// Los párrafos y los ítems son HTML propio (se renderizan con set:html): sólo
// texto fijo de este archivo, nunca datos de afuera.
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia';

const MAIL = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
export const AAIP_URL = 'https://www.argentina.gob.ar/aaip/datospersonales';
const aaip = (texto) => `<a href="${AAIP_URL}" target="_blank" rel="noopener noreferrer">${texto}</a>`;

export const PRIVACIDAD = {
  titulo: 'Política de privacidad',
  descripcion: `Qué datos trata ${MARCA} cuando visitás su sitio o te comunicás con el equipo, para qué los usa, con quién los comparte y cómo ejercer tus derechos.`,
  actualizado: '9 de noviembre de 2026',
  fechaLabel: 'Última actualización',
  secciones: [
    {
      titulo: '1. Quién es responsable de tus datos',
      parrafos: [
        `El responsable del tratamiento es <strong>${RAZON_SOCIAL}</strong> (CUIT ${CUIT}), titular de las marcas ${MARCA} y Rinde Plus, con domicilio en ${OFFICE_ADDRESS}. Para cualquier consulta sobre tus datos personales podés escribir a ${MAIL}.`,
      ],
    },
    {
      titulo: '2. A qué se aplica esta política',
      parrafos: [
        'Esta política se aplica al sitio vigiabioestres.com, en todos sus idiomas, y a las comunicaciones que mantengas con nosotros por WhatsApp, email o redes sociales.',
        `La plataforma ${MARCA} tiene sus propios Términos y condiciones y su propia Política de privacidad, disponibles en la plataforma, que regulan los datos que se cargan en ella y que cada usuario acepta al ingresar.`,
      ],
    },
    {
      titulo: '3. Qué datos tratamos y para qué',
      parrafos: [
        '<strong>Cuando navegás el sitio.</strong> El sitio no tiene formularios ni cuentas de usuario, y no usa herramientas de analítica, de publicidad ni de seguimiento entre sitios.',
      ],
      lista: [
        'Nuestro proveedor de alojamiento procesa los datos técnicos de cada visita (dirección IP, navegador, página pedida, fecha y hora) para entregar el sitio y protegerlo de ataques y abusos. Nosotros no accedemos a esos registros.',
      ],
      cierre: [
        '<strong>Cuando nos escribís.</strong> Si nos contactás por WhatsApp, por email o por redes sociales, tratamos los datos que nos compartas: nombre, teléfono, email, empresa y lo que nos cuentes sobre tus campos y lotes. Los usamos para responderte, coordinar una demostración, darte de alta en la plataforma si lo pedís y hacer el seguimiento de tu consulta.',
        'Gestionamos las conversaciones con un sistema de atención que puede usar herramientas automáticas, incluidas herramientas de inteligencia artificial, para transcribir audios, leer imágenes y documentos y preparar o revisar respuestas. Esas herramientas no toman decisiones que te produzcan efectos jurídicos ni te afecten de manera significativa.',
        'Darnos tus datos es voluntario. Sin un medio de contacto no podemos responderte.',
      ],
    },
    {
      titulo: '4. Qué se guarda en tu navegador',
      parrafos: [
        'El sitio no usa cookies. Guarda en tu navegador si elegiste el modo claro u oscuro y, por un instante, la sección en la que estabas al cambiar de idioma, para volver a ese punto. Esos datos quedan en tu dispositivo y no se nos envían; podés borrarlos desde la configuración del navegador.',
      ],
    },
    {
      titulo: '5. Con quién compartimos tus datos',
      parrafos: [
        'No vendemos ni cedemos tus datos personales. Sólo los tratan, por nuestra cuenta y según nuestras instrucciones, los proveedores que nos prestan servicios:',
      ],
      lista: [
        'GitHub, Inc. (alojamiento del sitio).',
        'WhatsApp, de Meta Platforms, Inc. (mensajería) y nuestro proveedor de correo electrónico.',
        'Los proveedores de la herramienta de atención y de los servicios automáticos que usamos para gestionar las conversaciones.',
      ],
      cierre: [
        'También podemos revelar datos cuando lo ordene una autoridad competente o lo exija la ley.',
        'El sitio no carga recursos de otros servicios: las tipografías, imágenes y videos se sirven desde el mismo sitio. Los enlaces a WhatsApp, Instagram y Google Maps te llevan a servicios de terceros, que tratan tus datos según sus propias políticas.',
      ],
    },
    {
      titulo: '6. Transferencias internacionales',
      parrafos: [
        'Varios de esos proveedores procesan datos fuera de la Argentina, en especial en los Estados Unidos, un país que la Argentina no considera de protección adecuada. Trabajamos con proveedores que ofrecen garantías contractuales de protección de datos, en los términos del artículo 12 de la Ley 25.326, del Decreto 1558/2001 y de las normas de la Agencia de Acceso a la Información Pública.',
        'Al comunicarte con nosotros prestás tu consentimiento expreso para que tus datos se transfieran a esos proveedores con las finalidades de esta política.',
      ],
    },
    {
      titulo: '7. Cuánto tiempo los conservamos',
      parrafos: [
        'Conservamos tus datos mientras sean necesarios para atender tu consulta y, si sos cliente, mientras dure la relación. Después los conservamos sólo el tiempo que exijan obligaciones legales o la defensa ante posibles reclamos, y luego los eliminamos o los anonimizamos.',
      ],
    },
    {
      titulo: '8. Seguridad',
      parrafos: [
        'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: el sitio funciona sólo con conexiones cifradas (HTTPS) y el acceso a las conversaciones está restringido a las personas del equipo que lo necesitan.',
      ],
    },
    {
      titulo: '9. Tus derechos',
      parrafos: ['Como titular de los datos tenés derecho a:'],
      lista: [
        '<strong>Acceso:</strong> saber qué datos tuyos tratamos, en forma gratuita y a intervalos no inferiores a seis meses, salvo que acredites un interés legítimo. Respondemos dentro de los diez días corridos de recibido el pedido.',
        '<strong>Rectificación, actualización y supresión:</strong> que corrijamos, actualicemos o eliminemos tus datos. Lo hacemos dentro de los cinco días hábiles de recibido el pedido.',
        '<strong>Retiro del consentimiento y oposición:</strong> retirar en cualquier momento tu consentimiento y pedir que dejemos de enviarte comunicaciones comerciales.',
      ],
      cierre: [
        `Para ejercerlos, escribinos a ${MAIL} desde el medio de contacto que usaste con nosotros, o indicando cómo acreditar que sos el titular.`,
        `LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales. Podés consultar ${aaip('cómo hacer un reclamo ante la Agencia')}.`,
        `Si te alcanza otra legislación de protección de datos, por ejemplo la de tu país de residencia, también podés ejercer ante nosotros los derechos que esa ley te reconozca, por el mismo canal. En Brasil, la Lei Geral de Proteção de Dados (Ley 13.709/2018) te permite además pedir la portabilidad de tus datos y reclamar ante la Autoridade Nacional de Proteção de Dados (ANPD); el contacto de nuestro encargado de datos es ${MAIL}.`,
      ],
    },
    {
      titulo: '10. Menores de edad',
      parrafos: [
        'El sitio está dirigido a productores, asesores y empresas del sector agropecuario. No buscamos recolectar datos de menores de 18 años; si nos enteramos de que lo hicimos, los eliminamos.',
      ],
    },
    {
      titulo: '11. Cambios en esta política',
      parrafos: [
        'Si cambiamos esta política, publicamos la versión nueva en esta página con su fecha de actualización. Si el cambio es importante y tenemos tu contacto, te avisamos.',
      ],
    },
    {
      titulo: '12. Ley aplicable',
      parrafos: [
        'Esta política se rige por las leyes de la República Argentina, en particular la Ley 25.326 de Protección de los Datos Personales y su reglamentación. Se publica en español, inglés y portugués; si hubiera diferencias entre versiones, rige la versión en español.',
      ],
    },
  ],
};
