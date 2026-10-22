import { useState, useRef, useEffect } from 'react';
import { PiSun, PiMoon, PiUser, PiWhatsappLogo, PiCaretDown, PiCheck } from 'react-icons/pi';
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

// Desplegable del menú (ítem con `hijos`). En escritorio se abre al dejar
// el cursor encima un momento (no al pasar de largo) y se cierra con un
// pequeño margen al salir, para poder bajar hasta la lista. Con teclado se
// abre al enfocar el título. Un clic en el título lo deja abierto (fijado):
// sin eso, el clic lo cerraba justo cuando el foco lo abría y la lista subía
// y bajaba. Fijado, se cierra al salir con el mouse por más tiempo, al
// scrollear, al tocar fuera, con Escape o al elegir una opción. En el menú
// de celular los hijos van siempre a la vista, debajo del título
// (Header.css), y el título sigue siendo un enlace.
const ABRIR_MS = 220;
const CERRAR_MS = 200;
const CERRAR_FIJADO_MS = 1200;
const ESCRITORIO = '(min-width: 768px)';

const MenuGrupo = ({ item, activeHref, onNavigate }) => {
  const [abierto, setAbierto] = useState(false);
  const [fijado, setFijado] = useState(false);
  const timer = useRef(null);
  const grupoRef = useRef(null);
  const activo = item.href === activeHref || item.hijos.some((h) => h.href === activeHref);

  const programar = (valor, ms) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAbierto(valor), ms);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const cerrar = () => {
    window.clearTimeout(timer.current);
    setAbierto(false);
    setFijado(false);
    onNavigate();
  };

  // Fijado: se cierra al scrollear o al tocar fuera del desplegable.
  useEffect(() => {
    if (!fijado) return undefined;
    const soltar = () => {
      window.clearTimeout(timer.current);
      setAbierto(false);
      setFijado(false);
    };
    const fuera = (e) => {
      if (!grupoRef.current?.contains(e.target)) soltar();
    };
    window.addEventListener('scroll', soltar, { passive: true, once: true });
    document.addEventListener('pointerdown', fuera);
    return () => {
      window.removeEventListener('scroll', soltar);
      document.removeEventListener('pointerdown', fuera);
    };
  }, [fijado]);

  // Título en escritorio: abre y fija la lista, sin navegar (El problema ya
  // está en la lista). En celular navega, como siempre.
  const tocarTitulo = (e) => {
    if (!window.matchMedia(ESCRITORIO).matches) {
      cerrar();
      return;
    }
    e.preventDefault();
    window.clearTimeout(timer.current);
    setAbierto(true);
    setFijado(true);
  };

  return (
    <div
      ref={grupoRef}
      className={`menu-grupo ${abierto ? 'menu-grupo--abierto' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && programar(true, abierto ? 0 : ABRIR_MS)}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(
          () => {
            setAbierto(false);
            setFijado(false);
          },
          fijado ? CERRAR_FIJADO_MS : CERRAR_MS,
        );
      }}
      onFocus={() => programar(true, 0)}
      onBlur={(e) => {
        if (!grupoRef.current?.contains(e.relatedTarget)) programar(false, 0);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setFijado(false);
          programar(false, 0);
        }
      }}
    >
      <a
        href={item.href}
        className={`menu-item menu-grupo__titulo ${activo ? 'menu-item--active' : ''}`}
        aria-current={item.href === activeHref ? 'location' : undefined}
        aria-expanded={abierto}
        onClick={tocarTitulo}
      >
        {item.label}
        <PiCaretDown className="menu-grupo__caret" aria-hidden="true" />
      </a>
      <ul className="menu-grupo__lista">
        {item.hijos.map((hijo) => (
          <li key={hijo.href}>
            <a
              href={hijo.href}
              className={`menu-subitem ${hijo.href === activeHref ? 'menu-subitem--active' : ''}`}
              aria-current={hijo.href === activeHref ? 'location' : undefined}
              onClick={cerrar}
            >
              {hijo.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Header = ({
  menuItems,
  showMenu = true,
  lang = 'es',
  textos,
  inicioHref = '/',
  inicioLabel = MARCA,
  whatsappUrl,
  rutas = { es: '/', en: '/en/', pt: '/pt/' },
  // URLs del logo ya optimizadas por BaseLayout (getImage), con su tamaño.
  logos,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // Arriba de todo el header se funde con la página; al bajar toma fondo y
  // una línea fina para separarse del contenido que pasa por debajo.
  const [isScrolled, setIsScrolled] = useState(false);
  // Sobre las bandas oscuras (Impacto, footer: [data-fondo-oscuro]) el
  // fondo translúcido del header se aclara, para que se lean logo y menú.
  const [sobreOscuro, setSobreOscuro] = useState(false);
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

  // Oculta el header al bajar y lo muestra al subir (ADR 0007: con el
  // scroll normal vuelve el comportamiento de antes de la decisión 50). Para
  // ocultarse exige un recorrido hacia abajo sostenido (no un toque de
  // rueda) y para volver, lo mismo hacia arriba: subir un poco sin querer
  // no lo muestra. Arriba de todo está siempre a la vista; ahí es
  // transparente y al bajar toma el fondo con desenfoque. Al ir a una
  // sección con un enlace de la página (el menú, el footer), queda a la
  // vista durante todo el recorrido, hacia arriba o hacia abajo: es la
  // misma acción en las dos direcciones y el header es lo que se usó.
  useEffect(() => {
    const HIDE_DISTANCE = 120;
    const SHOW_DISTANCE = 120;
    const TOP_ZONE = 160;
    // Tope por si el navegador no avisa el fin del scroll (scrollend) o el
    // salto no mueve nada.
    const NAV_MAX = 1600;
    let lastY = window.scrollY;
    let anchorY = lastY; // donde empezó el tramo actual en una misma dirección
    let direction = 0;
    let ticking = false;
    let navegando = false;
    let finNav = 0;

    // Secciones del menú que existen en esta página (en las otras páginas no
    // hay ninguna y no se marca nada). Los hijos de un desplegable cuentan
    // como secciones propias; el título se marca si lo está uno de ellos.
    const secciones = menuItems
      .flatMap((item) => [item, ...(item.hijos ?? [])])
      .map((item) => ({ href: item.href, el: document.getElementById(item.href.split('#')[1] ?? '') }))
      .filter((s) => s.el);

    // Activa: la última sección cuyo borde superior ya pasó el 35 % de la
    // ventana. Al llegar al final de la página, la última (Preguntas, que
    // con el footer es Contacto, puede no llegar a ese 35 %). El margen de
    // 24 px cubre el redondeo del scroll con zoom o escalado de pantalla.
    const seccionActiva = () => {
      const linea = window.innerHeight * 0.35;
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
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
      const alto = headerRef.current?.offsetHeight ?? 80;
      // Alto real del header: los saltos del menú dejan cada sección justo
      // debajo de él (scroll-margin-top en sections.css).
      document.documentElement.style.setProperty('--alto-header', `${alto}px`);
      setSobreOscuro(
        [...document.querySelectorAll('[data-fondo-oscuro]')].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < alto && r.bottom > 0;
        }),
      );
      setActiveHref(paginaActual ? paginaActual.href : seccionActiva());
      const nextDirection = Math.sign(y - lastY);
      if (nextDirection !== 0 && nextDirection !== direction) {
        direction = nextDirection;
        anchorY = lastY;
      }
      const travelled = Math.abs(y - anchorY);

      if (navegando || y < TOP_ZONE) {
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

    // Fin del salto: el tramo de scroll vuelve a contarse desde ahí, así el
    // header no se oculta ni aparece de golpe por el recorrido del salto.
    const terminarNav = () => {
      if (!navegando) return;
      navegando = false;
      window.clearTimeout(finNav);
      lastY = window.scrollY;
      anchorY = lastY;
      direction = 0;
    };

    // Clic en un enlace a una sección de esta misma página.
    const handleClick = (event) => {
      // Un clic que no navega (el título del desplegable) no cuenta.
      if (event.defaultPrevented) return;
      const enlace = event.target.closest?.('a[href*="#"]');
      if (!enlace) return;
      const url = new URL(enlace.href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname) return;
      navegando = true;
      setIsHidden(false);
      window.clearTimeout(finNav);
      finNav = window.setTimeout(terminarNav, NAV_MAX);
    };

    // Llegada desde otra página a una sección (/#impacto): el salto lo hace
    // BaseLayout; mientras se acomoda, el header queda a la vista.
    if (window.location.hash) {
      navegando = true;
      finNav = window.setTimeout(terminarNav, NAV_MAX);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('scrollend', terminarNav);
    document.addEventListener('click', handleClick);
    update(); // estado correcto si la página carga ya scrolleada
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('scrollend', terminarNav);
      document.removeEventListener('click', handleClick);
      window.clearTimeout(finNav);
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
      className={`header ${isMenuOpen ? 'header--menu-open' : ''} ${!showMenu ? 'header--no-menu' : ''} ${isHidden && !isMenuOpen ? 'header--hidden' : ''} ${isScrolled ? 'header--scrolled' : ''} ${sobreOscuro ? 'header--sobre-oscuro' : ''}`}
    >
      <div className="header-content">
        <a href={inicioHref} className="header-logo" aria-label={inicioLabel}>
          <img
            src={theme === 'dark' ? logos.oscuro : logos.claro}
            alt={MARCA}
            width={logos.ancho}
            height={logos.alto}
            className="logo-image"
          />
        </a>

        {showMenu && (
          <nav className={`header-nav ${isMenuOpen ? 'header-nav--open' : ''}`} id="header-menu">
            {menuItems.map((item) =>
              item.hijos ? (
                <MenuGrupo
                  key={item.href}
                  item={item}
                  activeHref={activeHref}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={`menu-item ${item.href === activeHref ? 'menu-item--active' : ''}`}
                  aria-current={item.href === activeHref ? 'location' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}

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
