import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { WHATSAPP_URL } from '../data/social';
import './WhatsAppWidget.css';

export const OPEN_WHATSAPP_EVENT = 'vg:open-whatsapp';

/* FAB de WhatsApp que se transforma en panel. En Landing vivía dentro de
   App.jsx; acá es una isla propia montada en BaseLayout. Otras islas lo abren
   con openWhatsApp() (CustomEvent sobre window) en vez de pasar callbacks. */
export function openWhatsApp() {
  window.dispatchEvent(new CustomEvent(OPEN_WHATSAPP_EVENT));
}

const WhatsAppWidget = () => {
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
    window.addEventListener('scroll', handleScroll);
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
          <FaWhatsapp className="wa-widget__fab-icon wa-widget__fab-icon--wa" />
          <FaTimes className="wa-widget__fab-icon wa-widget__fab-icon--close" />
        </button>

        <div className="wa-widget__panel">
          <p className="wa-widget__greeting">
            Hola <span role="img" aria-label="saludo">👋</span>
            <br />
            ¿En qué podemos ayudarte?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-widget__send"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsAppWidget;
