// Textos de /privacidad y /terminos (src/pages/privacidad.astro y
// terminos.astro, enlazados desde el pie del footer).
// PENDIENTE: son un borrador. Revisarlos con asesoría legal antes de
// publicar, y completar razón social y CUIT del responsable.
// Describen lo que el sitio hace hoy: sin formularios, sin cuentas, sin
// analítica ni publicidad; guarda el tema (claro/oscuro) en el navegador,
// carga IBM Plex desde Google Fonts y enlaza a WhatsApp, Instagram y Maps.
import { CONTACT_EMAIL, OFFICE_ADDRESS } from './social';
import { MARCA } from './vigia';

const ACTUALIZADO = 'Octubre de 2026';

export const PRIVACIDAD = {
  titulo: 'Política de privacidad',
  actualizado: ACTUALIZADO,
  secciones: [
    {
      titulo: 'Quién es responsable',
      parrafos: [
        `Este sitio presenta ${MARCA}, una solución de Rinde Plus, con domicilio en ${OFFICE_ADDRESS}. Para cualquier consulta sobre tus datos, escribinos a ${CONTACT_EMAIL}.`,
      ],
    },
    {
      titulo: 'Qué datos recolecta este sitio',
      parrafos: [
        'El sitio no tiene formularios ni cuentas de usuario, y no usa herramientas de analítica ni de publicidad.',
        'Sólo guarda en tu navegador si elegiste el modo claro u oscuro. Ese dato queda en tu dispositivo y no se nos envía.',
      ],
    },
    {
      titulo: 'Cuando nos escribís',
      parrafos: [
        'Si nos contactás por WhatsApp o por email, usamos los datos que nos compartas (nombre, teléfono, email y lo que nos cuentes de tus lotes) sólo para responderte y coordinar una demo. No los vendemos ni los cedemos a terceros.',
      ],
    },
    {
      titulo: 'Servicios de terceros',
      parrafos: [
        'Las tipografías se cargan desde Google Fonts, que recibe la dirección IP de tu dispositivo al cargarlas. Los enlaces a WhatsApp, Instagram y Google Maps te llevan a esos servicios, que tienen sus propias políticas de privacidad.',
      ],
    },
    {
      titulo: 'Tus derechos',
      parrafos: [
        `Podés pedir acceso, rectificación o supresión de tus datos personales en cualquier momento escribiendo a ${CONTACT_EMAIL}, en los términos de la Ley 25.326 de Protección de los Datos Personales.`,
        'La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
      ],
    },
    {
      titulo: 'Cambios',
      parrafos: ['Si cambiamos esta política, publicamos la versión nueva en esta página con su fecha de actualización.'],
    },
  ],
};

export const TERMINOS = {
  titulo: 'Términos y condiciones',
  actualizado: ACTUALIZADO,
  secciones: [
    {
      titulo: 'Sobre este sitio',
      parrafos: [
        `Este sitio presenta ${MARCA}, una solución de Rinde Plus. Al navegarlo, aceptás estos términos.`,
      ],
    },
    {
      titulo: 'Información y resultados',
      parrafos: [
        'Los contenidos son informativos. Las cifras de resultados corresponden a mediciones en lotes de clientes durante cinco campañas y no garantizan el mismo resultado en tu lote, que depende de su ambiente, del manejo y del clima de cada año.',
        'Las acciones que sugiere VigIA (bioinsumo o riego) acompañan la decisión del productor o de su asesor, pero no la reemplazan.',
      ],
    },
    {
      titulo: 'Uso de la plataforma',
      parrafos: [
        `El uso de la plataforma ${MARCA} se rige por las condiciones que se acuerdan al contratar el servicio.`,
      ],
    },
    {
      titulo: 'Propiedad intelectual',
      parrafos: [
        'Las marcas, logos, textos, gráficos y videos de este sitio pertenecen a Rinde Plus o a sus respectivos titulares. No se pueden reproducir sin autorización.',
      ],
    },
    {
      titulo: 'Enlaces a otros sitios',
      parrafos: [
        'El sitio enlaza a servicios de terceros (WhatsApp, Instagram, Google Maps y otros). No somos responsables de sus contenidos ni de sus políticas.',
      ],
    },
    {
      titulo: 'Cambios y ley aplicable',
      parrafos: [
        'Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Se rigen por las leyes de la República Argentina.',
        `Por cualquier consulta, escribinos a ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
