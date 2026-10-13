// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Sitio estático publicado en GitHub Pages desde /docs (igual que Landing).
// Astro genera un .html por página, así que no hace falta el truco del
// 404.html con redirect que usa el router client-side de Landing.
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // TODO: definir el dominio final de VigIA y agregar public/CNAME.
  // site: 'https://vigia.rindeplus.com',
  base: '/',
  outDir: './docs',
  trailingSlash: 'ignore',
  integrations: [react()],
  build: {
    assets: 'assets',
  },
});
