// Textos de /privacidad y /terminos en español, la fuente (vista en
// src/views/LegalPage.astro, enlazada desde el footer). Las versiones en
// inglés y portugués están en legal.en.js y legal.pt.js, con las mismas
// claves; si hay diferencias, prevalece el español (lo dice cada texto).
// Describen lo que el sitio hace hoy: sin formularios, cuentas, cookies,
// analítica ni publicidad; guarda el tema (claro/oscuro) en localStorage y,
// durante la visita, la posición al cambiar de idioma en sessionStorage;
// está alojado en GitHub Pages (registra las IP de las visitas); sirve sus
// tipografías desde el mismo sitio (sin Google Fonts) y enlaza a WhatsApp,
// Instagram y Maps. Si el sitio cambia en algo de eso, se actualizan los
// tres idiomas y la fecha.
// El responsable es Rinde Plus (Conextion S.A.S.) como operador del sitio, sin decir que
// VigIA BioEstrés sea "una solución" suya (decisión 40).
import { CONTACT_EMAIL, CUIT, OFFICE_ADDRESS, RAZON_SOCIAL } from './social';
import { MARCA } from './vigia';

export const LEGAL_UI = {
  actualizado: 'Última actualización',
  fecha: 'Noviembre de 2026',
};

export const PRIVACIDAD = {
  titulo: 'Política de privacidad',
  descripcion:
    'Qué datos trata el sitio de VigIA BioEstrés, para qué, qué servicios de terceros intervienen y cómo ejercer tus derechos sobre tus datos.',
  secciones: [
    {
      titulo: 'Quién es responsable',
      parrafos: [
        `Este sitio presenta ${MARCA} y lo opera Rinde Plus (${RAZON_SOCIAL}, CUIT ${CUIT}), con domicilio en ${OFFICE_ADDRESS}, responsable de los datos personales que se tratan a través de él. Para cualquier consulta sobre tus datos, escribinos a ${CONTACT_EMAIL}.`,
      ],
    },
    {
      titulo: 'Qué datos recolecta este sitio',
      parrafos: [
        'El sitio no tiene formularios ni cuentas de usuario, y no usa cookies ni herramientas de analítica o de publicidad.',
        'Guarda en tu navegador dos datos técnicos, que quedan en tu dispositivo y no se nos envían: si elegiste el modo claro u oscuro y, sólo mientras dura la visita, en qué parte de la página estabas al cambiar de idioma, para que sigas en la misma sección.',
        'El sitio está alojado en GitHub Pages, un servicio de GitHub, Inc. (Estados Unidos). Como cualquier servidor web, GitHub registra datos técnicos de cada visita, como la dirección IP, para operar y proteger el servicio. Nosotros no accedemos a esos registros; GitHub los trata según su propia política de privacidad.',
      ],
    },
    {
      titulo: 'Cuando nos escribís',
      parrafos: [
        'Si nos contactás por WhatsApp o por email, usamos los datos que nos compartas (nombre, teléfono, email y lo que nos cuentes de tus lotes) para responderte, coordinar una demo y, si lo pedís, prepararte una propuesta. Darnos esos datos es voluntario, pero sin ellos no podemos responderte.',
        'Los tratamos con tu consentimiento, que das al escribirnos, y porque son necesarios para los pasos previos a una posible contratación.',
        'Los conservamos mientras dure la conversación y, si contratás el servicio, mientras dure la relación comercial. Cuando ya no son necesarios para esos fines, los eliminamos, salvo que una ley nos obligue a guardarlos.',
      ],
    },
    {
      titulo: 'Con quién se comparten',
      parrafos: [
        'No vendemos ni cedemos tus datos. Sólo intervienen los proveedores de los servicios que usamos para alojar el sitio y comunicarnos (GitHub, WhatsApp de Meta y el correo de Google), y una autoridad podría pedirlos en los casos que prevé la ley.',
        'El sitio no carga recursos de otros servicios: las tipografías, imágenes y videos se sirven desde el mismo sitio. Los enlaces a WhatsApp, Instagram y Google Maps te llevan a esos servicios, que tienen sus propias políticas de privacidad.',
        'Esos proveedores pueden guardar los datos en servidores fuera de la Argentina, incluso en países que la Argentina no considera de protección adecuada, como los Estados Unidos. Al visitar el sitio o escribirnos por esos canales, consentís esa transferencia.',
      ],
    },
    {
      titulo: 'Cómo los cuidamos',
      parrafos: [
        'Tomamos medidas razonables para evitar que tus datos se pierdan, se alteren o los vea alguien sin autorización. Sólo acceden a ellos las personas del equipo que los necesitan para responderte.',
      ],
    },
    {
      titulo: 'Tus derechos',
      parrafos: [
        `Podés pedir acceso, rectificación, actualización o supresión de tus datos personales escribiendo a ${CONTACT_EMAIL}, en los términos de la Ley 25.326 de Protección de los Datos Personales. Respondemos los pedidos de acceso dentro de los 10 días corridos, y los de rectificación, actualización o supresión dentro de los 5 días hábiles.`,
        'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley 25.326.',
        'La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
        `Si vivís fuera de la Argentina, también tenés los derechos que te reconozca la ley de tu país. En Brasil, la Lei Geral de Proteção de Dados (Ley 13.709/2018) te permite, entre otros, confirmar si tratamos tus datos, acceder a ellos, corregirlos, pedir su eliminación o su portabilidad y revocar tu consentimiento. Podés ejercerlos en ${CONTACT_EMAIL}, que es también el contacto del encargado de datos, y reclamar ante la Autoridade Nacional de Proteção de Dados (ANPD).`,
      ],
    },
    {
      titulo: 'Menores de edad',
      parrafos: [
        'El sitio está dirigido a productores, asesores y empresas del agro. No está pensado para menores de 18 años y no recolectamos sus datos a sabiendas.',
      ],
    },
    {
      titulo: 'Cambios e idiomas',
      parrafos: [
        'Si cambiamos esta política, publicamos la versión nueva en esta página con su fecha de actualización.',
        'Esta política está en español, inglés y portugués. Si hay diferencias entre las versiones, prevalece la versión en español.',
      ],
    },
  ],
};

export const TERMINOS = {
  titulo: 'Términos y condiciones',
  descripcion:
    'Condiciones de uso del sitio de VigIA BioEstrés: alcance de la información y los resultados, contratación, propiedad intelectual y ley aplicable.',
  secciones: [
    {
      titulo: 'Sobre este sitio',
      parrafos: [
        `Este sitio presenta ${MARCA} y lo opera Rinde Plus (${RAZON_SOCIAL}, CUIT ${CUIT}), con domicilio en ${OFFICE_ADDRESS}. Estos términos rigen el uso del sitio: al navegarlo, los aceptás. Si no estás de acuerdo, te pedimos que no lo uses.`,
      ],
    },
    {
      titulo: 'Información y resultados',
      parrafos: [
        'Los contenidos del sitio son informativos y generales: no son un asesoramiento agronómico para un lote en particular.',
        'Las cifras de rinde recuperado provienen de mediciones de campo durante cinco campañas; las de carbono son estimaciones calculadas a partir de ese rinde. No garantizan el mismo resultado en tu lote, que depende de su ambiente, del manejo y del clima de cada año.',
        'Las alertas y las acciones que sugiere VigIA (bioinsumo o riego) acompañan la decisión del productor o de su asesor, pero no la reemplazan: la decisión final y su aplicación quedan a su cargo.',
      ],
    },
    {
      titulo: 'Precios y contratación',
      parrafos: [
        `Lo que se publica en el sitio no es una oferta vinculante. Los planes, precios y condiciones de ${MARCA} se informan y se acuerdan al contratar el servicio, y el uso de la plataforma se rige por esas condiciones.`,
      ],
    },
    {
      titulo: 'Uso del sitio',
      parrafos: [
        'Te pedimos que uses el sitio de buena fe: sin intentar dañarlo, alterarlo o entrar a partes que no son públicas, y sin usar sus contenidos con fines ilícitos.',
      ],
    },
    {
      titulo: 'Propiedad intelectual',
      parrafos: [
        `Las marcas ${MARCA} y Rinde Plus, los logos, textos, gráficos, videos y el diseño del sitio pertenecen a sus titulares y están protegidos por las leyes de propiedad intelectual (Ley 11.723) y de marcas (Ley 22.362). No se pueden reproducir sin autorización.`,
        'Algunas fotos son de terceros y se usan con licencias Creative Commons, con sus autores citados al pie del sitio. Los logos de clientes pertenecen a cada empresa.',
      ],
    },
    {
      titulo: 'Enlaces a otros sitios',
      parrafos: [
        'El sitio enlaza a servicios de terceros (WhatsApp, Instagram, Google Maps y otros). No somos responsables de sus contenidos ni de sus políticas.',
      ],
    },
    {
      titulo: 'Disponibilidad y responsabilidad',
      parrafos: [
        'Podemos cambiar o actualizar el sitio y sus contenidos, o dejar de publicarlos, en cualquier momento. Procuramos que la información sea correcta y esté al día, pero no garantizamos que no tenga errores ni que el sitio funcione sin interrupciones.',
        'En la medida en que lo permita la ley, no respondemos por decisiones tomadas sólo con la información de este sitio. Esto no limita los derechos que te reconozcan las normas de defensa del consumidor que correspondan (en la Argentina, la Ley 24.240; en Brasil, el Código de Defensa del Consumidor).',
      ],
    },
    {
      titulo: 'Ley aplicable y jurisdicción',
      parrafos: [
        'Estos términos se rigen por las leyes de la República Argentina. Ante cualquier controversia, son competentes los tribunales ordinarios de la Provincia de Córdoba, salvo que una norma de orden público, como las de defensa del consumidor, fije otra jurisdicción.',
      ],
    },
    {
      titulo: 'Cambios, idiomas y contacto',
      parrafos: [
        'Podemos actualizar estos términos; la versión vigente es la publicada en esta página, con su fecha de actualización.',
        'Estos términos están en español, inglés y portugués. Si hay diferencias entre las versiones, prevalece la versión en español.',
        `Por cualquier consulta, escribinos a ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
