import { useState, useRef, useEffect } from 'react';
import { PiSun, PiMoon, PiUser, PiWhatsappLogo, PiCaretDown, PiCheck } from 'react-icons/pi';
import vigiaLogo from '../assets/vigia-biostres-logo-light.png';
import vigiaLogoDark from '../assets/vigia-biostres-logo-dark.png';
import { useTheme } from '../hooks/useTheme';
import { APP_URL } from '../data/social';
import { MARCA } from '../data/vigia';
import { IDIOMAS } from '../i18n/idiomas';
import './Header.css';

// Isla React (client:load). A diferencia de Landing, la navegación entre
// páginas son <a href> reales: el ruteo lo resuelve Astro por archivo.
// Los textos y el menú llegan por props desde BaseLayout, en el idioma de la
// página (UI en src/data/vigia.js y vigia.en.js).

// Selector de idioma (ADR 0004): cada opción es un enlace a la misma página
// en el otro idioma. Antes de salir guarda la sección visible y cuánto se
// había leído de ella; BaseLayout la recupera en la página nueva, así el
// cambio no lleva arriba de todo. El fundido lo hace la transición entre
// páginas del navegador (@view-transition en global.css).
const guardarPosicion = (destino) => {
  const secciones = [...document.querySelectorAll('section[id], footer[id]')];
  let actual = null;
  for (const el of secciones) {
    if (el.getBoundingClientRect().top <= 0) actual = el;
  }
  try {
    if (!actual) {
      sessionStorage.removeItem('vg-idioma-scroll');
      return;
    }
    const r = actual.getBoundingClientRect();
    const proporcion = r.height ? Math.min(1, -r.top / r.height) : 0;
    sessionStorage.setItem('vg-idioma-scroll', JSON.stringify({ destino, id: actual.id, proporcion }));
  } catch {
    // Sin sessionStorage (modo privado estricto): se cambia igual, arriba.
  }
};

const Header = ({
  menuItems,
  showMenu = true,
  lang = 'es',
  textos,
  inicioHref = '/',
  inicioLabel = MARCA,
  whatsappUrl,
  rutas = { es: '/', en: '/en/' },
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isHidden, setIsHidden] = useState(false);
  // Arriba de todo el header se funde con la página; al bajar toma fondo y
  // una línea fina para separarse del contenido que pasa por debajo.
  const [isScrolled, setIsScrolled] = useState(false);
  // Sección en la que está parado el usuario (href del ítem del menú): se
  // marca con una línea verde debajo del enlace.
  const [activeHref, setActiveHref] = useState(null);
  const headerRef = useRef(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Cierra el selector de idioma al tocar fuera o con Escape.
  useEffect(() => {
    if (!isLangOpen) return undefined;
    const handlePointerDown = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') setIsLangOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isLangOpen]);

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

    // Secciones del menú que existen en esta página (en las otras páginas no
    // hay ninguna y no se marca nada).
    const secciones = menuItems
      .map((item) => ({ href: item.href, el: document.getElementById(item.href.split('#')[1] ?? '') }))
      .filter((s) => s.el);

    // Activa: la última sección cuyo borde superior ya pasó el 35 % de la
    // ventana. Al llegar al final de la página, la última (el footer de
    // contacto puede ser más bajo que ese 35 %).
    const seccionActiva = () => {
      const linea = window.innerHeight * 0.35;
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (alFinal && secciones.length) return secciones[secciones.length - 1].href;
      let activa = null;
      for (const s of secciones) {
        if (s.el.getBoundingClientRect().top <= linea) activa = s.href;
      }
      return activa;
    };

    // Ítems que son páginas (sin #): activos cuando se está en esa página.
    const sinBarra = (ruta) => ruta.replace(/\/+$/, '') || '/';
    const paginaActual = menuItems.find(
      (item) => !item.href.includes('#') && sinBarra(item.href) === sinBarra(window.location.pathname),
    );

    const update = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);
      setActiveHref(paginaActual ? paginaActual.href : seccionActiva());
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
    window.addEventListener('resize', handleScroll, { passive: true });
    update(); // estado correcto si la página carga ya scrolleada
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [menuItems]);

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
        <a href={inicioHref} className="header-logo" aria-label={inicioLabel}>
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
                className={`menu-item ${item.href === activeHref ? 'menu-item--active' : ''}`}
                aria-current={item.href === activeHref ? 'location' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="header-nav__theme">
              <span className="header-nav__theme-label">
                {theme === 'dark' ? textos.modoOscuro : textos.modoClaro}
              </span>
              <button
                type="button"
                className="rp-theme-switch"
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={textos.cambiarTema}
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
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <PiWhatsappLogo aria-hidden="true" />
              <span>{textos.whatsapp}</span>
            </a>
          </nav>
        )}

        <div className="header-actions">
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? textos.activarClaro : textos.activarOscuro}
            title={theme === 'dark' ? textos.modoClaro : textos.modoOscuro}
          >
            {theme === 'dark' ? <PiSun /> : <PiMoon />}
          </button>

          <div className="header-lang" ref={langRef}>
            <button
              type="button"
              className="header-lang__btn"
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              aria-label={textos.idioma}
              onClick={() => setIsLangOpen((open) => !open)}
            >
              <span>{lang.toUpperCase()}</span>
              <PiCaretDown className="header-lang__caret" aria-hidden="true" />
            </button>
            <ul className={`header-lang__menu ${isLangOpen ? 'header-lang__menu--open' : ''}`} role="menu">
              {IDIOMAS.map((op) => (
                <li key={op.code} role="none">
                  <a
                    href={rutas[op.code]}
                    hrefLang={op.code}
                    lang={op.code}
                    role="menuitemradio"
                    aria-checked={lang === op.code}
                    className="header-lang__option"
                    tabIndex={isLangOpen ? 0 : -1}
                    onClick={(event) => {
                      setIsLangOpen(false);
                      if (op.code === lang) {
                        event.preventDefault();
                        return;
                      }
                      guardarPosicion(rutas[op.code]);
                    }}
                  >
                    <span className="header-lang__code">{op.code.toUpperCase()}</span>
                    <span>{op.label}</span>
                    {lang === op.code && <PiCheck className="header-lang__check" aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a className="header-icon-btn" href={APP_URL} aria-label={textos.ingresarLabel} title={textos.ingresar}>
            <PiUser />
          </a>
        </div>

        {/* Fuera de .header-actions: en celular va a la izquierda del logo
            centrado (ver Header.css). */}
        {showMenu && (
          <button
            type="button"
            className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? textos.cerrarMenu : textos.abrirMenu}
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
