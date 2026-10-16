// Idiomas del sitio (ADR 0004). Español en la raíz, inglés bajo /en/.
// - El contenido de cada idioma vive en src/data/vigia.js (es) y
//   src/data/vigia.en.js (en), con las mismas claves.
// - Las reglas y el glosario de la versión en inglés están en
//   doc/landing/TRADUCCION_EN.md.
import * as es from '../data/vigia.js';
import * as en from '../data/vigia.en.js';

export const IDIOMA_BASE = 'es';

/** Datos de cada idioma: código, nombre en su propio idioma, `lang` del
 *  <html> y `og:locale`. */
export const IDIOMAS = [
  { code: 'es', label: 'Español', html: 'es-AR', og: 'es_AR' },
  { code: 'en', label: 'English', html: 'en', og: 'en_US' },
];

/** Páginas que existen en inglés (ruta en español, sin barra final). Las
 *  legales quedan sólo en español hasta que las revise asesoría legal. */
const PAGINAS_EN = ['/', '/pricing', '/educacion'];

/** Normaliza el locale de Astro (Astro.currentLocale) a 'es' | 'en'. */
export const idiomaDe = (locale) => (locale === 'en' ? 'en' : 'es');

/** Contenido del idioma: mismas claves en los dos archivos. */
export const contenido = (lang) => (lang === 'en' ? en : es);

/** Ruta de una página en un idioma, a partir de su ruta en español
 *  ('/', '/pricing', '/#preguntas'…). */
export const ruta = (lang, rutaEs) => (lang === 'en' ? `/en${rutaEs}` : rutaEs);

/** Ruta en español de la página actual (quita /en y la barra final). */
export const rutaBase = (pathname) => {
  const sinEn = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return sinEn.length > 1 ? sinEn.replace(/\/+$/, '') : '/';
};

/** Rutas de la página actual en cada idioma. Si la página no existe en
 *  inglés (legales), la opción en inglés lleva a la home en inglés. */
export const alternativas = (pathname) => {
  const base = rutaBase(pathname);
  return {
    es: base,
    en: PAGINAS_EN.includes(base) ? ruta('en', base) : '/en/',
    tieneEn: PAGINAS_EN.includes(base),
  };
};
