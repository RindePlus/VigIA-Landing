import { useState, useRef, useEffect } from 'react';
import { LuSun, LuMoon, LuLogIn } from 'react-icons/lu';
import vigiaLogo from '../assets/vigia-logo-light.png';
import vigiaLogoDark from '../assets/vigia-logo-dark.png';
import { useTheme } from '../hooks/useTheme';
import { APP_URL } from '../data/social';
import './Header.css';

// Isla React (client:load). A diferencia de Landing, la navegación entre
// páginas son <a href> reales: el ruteo lo resuelve Astro por archivo.
const DEFAULT_ITEMS = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Alertas', href: '/#alertas' },
  { label: 'Módulos', href: '/#modulos' },
  { label: 'Precios', href: '/pricing' },
  { label: 'Contacto', href: '/#contacto' },
];

const Header = ({ menuItems = DEFAULT_ITEMS, showMenu = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef(null);

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
      className={`header ${isMenuOpen ? 'header--menu-open' : ''} ${!showMenu ? 'header--no-menu' : ''}`}
    >
      <div className="header-content">
        <div className="header-left">
          {showMenu && (
            <button
              type="button"
              className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
              aria-controls="header-menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          )}

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
                    <LuSun />
                  </span>
                  <span className="rp-theme-switch__icon rp-theme-switch__icon--moon">
                    <LuMoon />
                  </span>
                  <span className="rp-theme-switch__knob" />
                </button>
              </div>
            </nav>
          )}
        </div>

        <a href="/" aria-label="VigIA — inicio">
          <img
            src={(theme === 'dark' ? vigiaLogoDark : vigiaLogo).src}
            alt="VigIA"
            className="logo-image"
          />
        </a>

        <div className="header-actions">
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <LuSun /> : <LuMoon />}
          </button>

          <a className="header-platform-btn" href={APP_URL}>
            <span>Ingresar</span>
            <LuLogIn />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
