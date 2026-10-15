import { useState, useRef, useEffect } from 'react';
import { PiSun, PiMoon, PiSignIn, PiWhatsappLogo } from 'react-icons/pi';
import vigiaLogo from '../assets/vigia-biostres-logo-light.png';
import vigiaLogoDark from '../assets/vigia-biostres-logo-dark.png';
import { useTheme } from '../hooks/useTheme';
import { APP_URL, WHATSAPP_URL } from '../data/social';
import { MARCA } from '../data/vigia';
import './Header.css';

// Isla React (client:load). A diferencia de Landing, la navegación entre
// páginas son <a href> reales: el ruteo lo resuelve Astro por archivo.
const DEFAULT_ITEMS = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Beneficios', href: '/#beneficios' },
  { label: 'Para quién', href: '/#para-quien' },
  { label: 'Preguntas', href: '/#preguntas' },
  { label: 'Contacto', href: '/#contacto' },
];

const Header = ({ menuItems = DEFAULT_ITEMS, showMenu = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);
  // Arriba de todo el header se funde con la página; al bajar toma fondo y
  // una línea fina para separarse del contenido que pasa por debajo.
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  // Oculta el header al bajar y lo muestra al subir. Para ocultarse exige un
  // recorrido hacia abajo sostenido (no un toque de rueda); para volver basta
  // un gesto corto hacia arriba.
  useEffect(() => {
    const HIDE_DISTANCE = 120;
    const SHOW_DISTANCE = 8;
    const TOP_ZONE = 160;
    let lastY = window.scrollY;
    let anchorY = lastY; // donde empezó el tramo actual en una misma dirección
    let direction = 0;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);
      const nextDirection = Math.sign(y - lastY);
      if (nextDirection !== 0 && nextDirection !== direction) {
        direction = nextDirection;
        anchorY = lastY;
      }
      const travelled = Math.abs(y - anchorY);

      if (y < TOP_ZONE) {
        setIsHidden(false);
      } else if (direction > 0 && travelled >= HIDE_DISTANCE) {
        setIsHidden(true);
      } else if (direction < 0 && travelled >= SHOW_DISTANCE) {
        setIsHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update(); // estado correcto si la página carga ya scrolleada
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra el drawer mobile al tocar fuera del header.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`header ${isMenuOpen ? 'header--menu-open' : ''} ${!showMenu ? 'header--no-menu' : ''} ${isHidden && !isMenuOpen ? 'header--hidden' : ''} ${isScrolled ? 'header--scrolled' : ''}`}
    >
      <div className="header-content">
        <a href="/" className="header-logo" aria-label={`${MARCA} — inicio`}>
          <img
            src={(theme === 'dark' ? vigiaLogoDark : vigiaLogo).src}
            alt={MARCA}
            className="logo-image"
          />
        </a>

        {showMenu && (
          <nav className={`header-nav ${isMenuOpen ? 'header-nav--open' : ''}`} id="header-menu">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="header-nav__theme">
              <span className="header-nav__theme-label">
                {theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}
              </span>
              <button
                type="button"
                className="rp-theme-switch"
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label="Cambiar entre modo claro y oscuro"
                onClick={toggleTheme}
              >
                <span className="rp-theme-switch__icon rp-theme-switch__icon--sun">
                  <PiSun />
                </span>
                <span className="rp-theme-switch__icon rp-theme-switch__icon--moon">
                  <PiMoon />
                </span>
                <span className="rp-theme-switch__knob" />
              </button>
            </div>

            {/* En celular WhatsApp vive acá y no como botón flotante
                (WhatsAppWidget se oculta por debajo de 768 px). */}
            <a
              className="header-nav__whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <PiWhatsappLogo aria-hidden="true" />
              <span>Escribinos por WhatsApp</span>
            </a>
          </nav>
        )}

        <div className="header-actions">
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <PiSun /> : <PiMoon />}
          </button>

          <a className="header-platform-btn" href={APP_URL}>
            <span>Ingresar</span>
            <PiSignIn />
          </a>
        </div>

        {/* Fuera de .header-actions: en celular va a la izquierda del logo
            centrado (ver Header.css). */}
        {showMenu && (
          <button
            type="button"
            className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
