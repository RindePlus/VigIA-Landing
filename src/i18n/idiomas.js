// Idiomas del sitio (ADR 0004 y ADR 0008). Español en la raíz, inglés bajo
// /en/ y portugués de Brasil bajo /pt/.
// - El contenido de cada idioma vive en src/data/vigia.js (es),
//   src/data/vigia.en.js (en) y src/data/vigia.pt.js (pt), con las mismas
//   claves.
// - Las reglas y el glosario de cada traducción están en
//   doc/landing/TRADUCCION_EN.md y doc/landing/TRADUCCION_PT.md.
import * as es from '../data/vigia.js';
import * as en from '../data/vigia.en.js';
import * as pt from '../data/vigia.pt.js';

export const IDIOMA_BASE = 'es';

/** Datos de cada idioma: código, nombre en su propio idioma, `lang` del
 *  <html> y `og:locale`. */
export const IDIOMAS = [
  { code: 'es', label: 'Español', html: 'es-AR', og: 'es_AR' },
  { code: 'en', label: 'English', html: 'en', og: 'en_US' },
  { code: 'pt', label: 'Português', html: 'pt-BR', og: 'pt_BR' },
];

/** Idiomas con prefijo en la ruta (todos menos el español). */
const PREFIJOS = IDIOMAS.map((i) => i.code).filter((c) => c !== IDIOMA_BASE);

/** Páginas que existen traducidas (ruta en español, sin barra final). Las
 *  legales quedan sólo en español hasta que las revise asesoría legal. */
const PAGINAS_TRADUCIDAS = ['/', '/pricing', '/educacion'];

/** Normaliza el locale de Astro (Astro.currentLocale) a 'es' | 'en' | 'pt'. */
export const idiomaDe = (locale) => (locale === 'en' || locale === 'pt' ? locale : 'es');

/** Contenido del idioma: mismas claves en todos los archivos. Con
 *  ternarios y no un objeto indexado, así los tipos se conservan. */
export const contenido = (lang) => (lang === 'en' ? en : lang === 'pt' ? pt : es);

/** Ruta de una página en un idioma, a partir de su ruta en español
 *  ('/', '/pricing', '/#preguntas'…). */
export const ruta = (lang, rutaEs) => (lang === IDIOMA_BASE ? rutaEs : `/${lang}${rutaEs}`);

/** Ruta en español de la página actual (quita el prefijo del idioma y la
 *  barra final). */
export const rutaBase = (pathname) => {
  const prefijo = new RegExp(`^/(${PREFIJOS.join('|')})(?=/|$)`);
  const sinIdioma = pathname.replace(prefijo, '') || '/';
  return sinIdioma.length > 1 ? sinIdioma.replace(/\/+$/, '') : '/';
};

/** Agrega la barra final a una ruta de página ('/pricing' → '/pricing/').
 *  Es la URL que sirve GitHub Pages: sin la barra, responde con una
 *  redirección (301), y hreflang, el sitemap y los enlaces internos tienen
 *  que apuntar a la URL final. */
export const conBarra = (r) => (r.endsWith('/') ? r : `${r}/`);

/** Rutas de la página actual en cada idioma (con barra final) y si existe
 *  traducida. Si no existe (legales), los otros idiomas llevan a su home.
 *  El 404 no es una página a la que se pueda volver: los tres idiomas
 *  llevan a su home. */
export const alternativas = (pathname) => {
  const base = rutaBase(pathname);
  const traducida = PAGINAS_TRADUCIDAS.includes(base);
  const enIdioma = (lang) => conBarra(ruta(lang, traducida ? base : '/'));
  const es = base === '/404' ? '/' : conBarra(base);
  return { es, en: enIdioma('en'), pt: enIdioma('pt'), traducida };
};
