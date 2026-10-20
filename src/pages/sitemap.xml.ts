// Sitemap del sitio (docs/sitemap.xml), generado al compilar. Lista sólo
// las páginas que se indexan: la home en los tres idiomas, con sus
// alternativas (hreflang), y las legales (sólo en español). Precios,
// educación y el 404 van con noindex (BaseLayout) y quedan afuera. Las URLs
// llevan la barra final: es la que sirve GitHub Pages, sin redirección.
// Una página nueva que se indexe se suma acá.
import type { APIRoute } from 'astro';
import { IDIOMAS, conBarra, ruta } from '../i18n/idiomas';

/** Páginas que se indexan, con su ruta en español y si están traducidas. */
const PAGINAS = [
  { rutaEs: '/', traducida: true },
  { rutaEs: '/privacidad', traducida: false },
  { rutaEs: '/terminos', traducida: false },
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://vigiabioestres.com');
  const url = (r: string) => new URL(conBarra(r), base).href;

  const entradas = PAGINAS.flatMap(({ rutaEs, traducida }) => {
    if (!traducida) return [`  <url><loc>${url(rutaEs)}</loc></url>`];
    const alternativas = [
      ...IDIOMAS.map((i) => `    <xhtml:link rel="alternate" hreflang="${i.code}" href="${url(ruta(i.code, rutaEs))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(rutaEs)}"/>`,
    ].join('\n');
    return IDIOMAS.map((i) => `  <url>\n    <loc>${url(ruta(i.code, rutaEs))}</loc>\n${alternativas}\n  </url>`);
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entradas,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
