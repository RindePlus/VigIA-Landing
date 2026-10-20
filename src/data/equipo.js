import rindeplus from '../assets/equipo/rindeplus.png';
import fotoMarcos from '../assets/equipo/marcos-flesia.webp';
import fotoJuan from '../assets/equipo/juan-dallorso.webp';
import fotoLucas from '../assets/equipo/lucas-andreoni.webp';
import biored from '../assets/clientes/biored.png';
import agroconsultor from '../assets/clientes/agroconsultor.png';

// Personas de la sección "Sobre nosotros" (los textos de la sección están
// en NOSOTROS, src/data/vigia.js). Cada una con su foto y el logo de su
// empresa.
// - `foto`: import de src/assets/equipo/, WebP cuadrado de 320 × 320 con la
//   cara centrada (los originales están en media-src/equipo/). Con `null` se
//   muestran las iniciales. La de Lucas es de 200 × 200: el original no da
//   para más.
// - `logoAlto`: alto en px del logo en la tarjeta. Iguala el peso visual
//   de los tres, no el alto ni el ancho: cada logo ocupa más o menos la
//   misma área, corregida por cuánta "tinta" tiene. Rinde Plus tiene letras
//   macizas (44 % de su área es tinta, contra 22-25 % de los otros), así que
//   va más chico; Agroconsultor es muy ancho (5:1) y va bajo; BioRed,
//   apilado, va alto. Si cambia un logo, se recalcula: alto =
//   √(área / (proporción × √tinta)), con la misma área para los tres. El
//   área se eligió para que no queden más chicos que los logos del carrusel
//   de clientes, que está justo debajo.
// Las imágenes van enteras (metadatos de Astro): el markup usa `.src` y las
// dimensiones para el width/height del <img>, como el carrusel de clientes.
/**
 * @typedef {import('astro').ImageMetadata} Imagen
 * @type {{
 *   id: string,
 *   nombre: string,
 *   foto: Imagen | null,
 *   empresa: { nombre: string, logo: Imagen, logoAlto: number },
 * }[]}
 */
export const EQUIPO = [
  {
    id: 'marcos-flesia',
    nombre: 'Marcos Flesia',
    foto: fotoMarcos,
    empresa: { nombre: 'Rinde Plus', logo: rindeplus, logoAlto: 44 },
  },
  {
    id: 'juan-dallorso',
    nombre: 'Juan Dall’Orso',
    foto: fotoJuan,
    empresa: { nombre: 'Agroconsultor', logo: agroconsultor, logoAlto: 38 },
  },
  {
    id: 'lucas-andreoni',
    nombre: 'Lucas Andreoni',
    foto: fotoLucas,
    empresa: { nombre: 'BioRed', logo: biored, logoAlto: 75 },
  },
];
