import { useState, useRef, useEffect } from 'react';
import { PiX } from 'react-icons/pi';
// Logo oficial de WhatsApp (Simple Icons): el de Phosphor es una versión a
// línea fina que no se reconoce bien sobre el botón verde.
import { SiWhatsapp } from 'react-icons/si';
import './WhatsAppWidget.css';

export const OPEN_WHATSAPP_EVENT = 'vg:open-whatsapp';

/* FAB de WhatsApp que se transforma en panel. En Landing vivía dentro de
   App.jsx; acá es una isla propia montada en BaseLayout. Otras islas lo abren
   con openWhatsApp() (CustomEvent sobre window) en vez de pasar callbacks. */
export function openWhatsApp() {
  window.dispatchEvent(new CustomEvent(OPEN_WHATSAPP_EVENT));
}

// Textos y URL llegan por props desde BaseLayout, en el idioma de la página
// (UI.widget y WHATSAPP_URL de src/data/vigia.js o vigia.en.js). `nota`
// aclara en inglés que el equipo responde en español.
const WhatsAppWidget = ({ textos, whatsappUrl }) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(OPEN_WHATSAPP_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_WHATSAPP_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) setOpen(false);
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener('mousedown', handleClick);
    // Basta el primer scroll para cerrarlo: once evita escuchar cada evento.
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [open]);

  return (
    <>
      {open && <div className="wa-overlay" onClick={() => setOpen(false)} />}
      <div ref={popupRef} className={`wa-widget ${open ? 'wa-widget--open' : ''}`}>
        <button
          className="wa-widget__fab"
          onClick={() => setOpen((v) => !v)}
          aria-label="WhatsApp"
        >
          <SiWhatsapp className="wa-widget__fab-icon wa-widget__fab-icon--wa" aria-hidden="true" />
          <PiX className="wa-widget__fab-icon wa-widget__fab-icon--close" />
        </button>

        <div className="wa-widget__panel">
          <p className="wa-widget__greeting">
            {textos.saludo} <span role="img" aria-label={textos.saludoLabel}>👋</span>
            <br />
            {textos.pregunta}
          </p>
          {textos.nota && <p className="wa-widget__nota">{textos.nota}</p>}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-widget__send"
          >
            {textos.boton}
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsAppWidget;
