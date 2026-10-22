// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio estático publicado en GitHub Pages desde /docs (igual que Landing).
// Astro genera un .html por página, así que no hace falta el truco del
// 404.html con redirect que usa el router client-side de Landing.
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Dominio propio: el sitio vive en la raíz, así que base queda en '/'.
  // public/CNAME tiene que coincidir con site, o Pages pierde el dominio.
  site: 'https://vigiabioestres.com',
  base: '/',
  outDir: './docs',
  trailingSlash: 'ignore',
  integrations: [react()],
  // Sitio en tres idiomas (ADR 0004 y ADR 0008): español en la raíz (/,
  // /pricing…), inglés bajo /en/ y portugués de Brasil bajo /pt/. Cada
  // página existe por idioma en src/pages; Astro.currentLocale dice en cuál
  // se está renderizando.
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      // Los <script> de los componentes se incrustan en el HTML hasta 8 KB
      // (Vite deja 4 KB). El del hilo (JourneyThread) pasó los 4 KB y, como
      // archivo aparte, en celular sumaba un pedido antes de la primera
      // pintura (~300 ms de FCP en Lighthouse). Para el resto (imágenes,
      // tipografías) sigue el límite de siempre: `undefined` = el de Vite.
      assetsInlineLimit: (archivo, contenido) =>
        archivo.endsWith('.js') && contenido.length < 8 * 1024 ? true : undefined,
    },
  },
});
