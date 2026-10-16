// Canales sociales y de contacto compartidos por footer, CTAs y widget de
// WhatsApp. Por ahora apuntan a los de Rinde Plus.
// TODO: reemplazar por los canales propios de VigIA cuando existan.
export const INSTAGRAM_URL = 'https://www.instagram.com/rindeplus/';
export const INSTAGRAM_HANDLE = '@rindeplus';
export const CONTACT_EMAIL = 'inforindeplus@gmail.com';
export const WHATSAPP_NUMBER = '5493564593446';
export const WHATSAPP_DISPLAY = '+54 9 3564 59-3446';
export const OFFICE_ADDRESS = 'Concejal Lorusso 762, Alta Gracia, Córdoba, Argentina';

export function buildWhatsAppUrl(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

// El enlace general de WhatsApp (con su mensaje prearmado) depende del
// idioma: es WHATSAPP_URL en src/data/vigia.js y vigia.en.js.

// URL de la app de VigIA (sistema separado de Rinde Plus).
// TODO: definir cuando el nuevo sistema tenga dominio.
export const APP_URL = '#';
