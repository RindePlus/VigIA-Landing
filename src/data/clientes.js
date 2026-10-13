import altina from '../assets/clientes/altina.png';
import chiaraviglio from '../assets/clientes/chiaraviglio.png';
import prome from '../assets/clientes/prome.png';
import munira from '../assets/clientes/munira.png';
import chiaratech from '../assets/clientes/chiaratech.png';
import aaas from '../assets/clientes/aaas.png';
import kimzza from '../assets/clientes/kimzza.png';
import conci from '../assets/clientes/conci.png';
import aapresid from '../assets/clientes/aapresid.png';
import adj from '../assets/clientes/adj.png';
import halcon from '../assets/clientes/halcon.png';
import biored from '../assets/clientes/biored.png';
import agroconsultor from '../assets/clientes/agroconsultor.png';
import biozelen from '../assets/clientes/biozelen.png';

// Mismos clientes y ajustes que el carrusel de Landing (TrustedCompanies.jsx).
// `mono: true` → logo de un solo color, sin versión de marca: en hover va a
// negro (claro) / blanco (oscuro) en vez de mostrar colores.
// `h` → alto en px. Los assets están recortados al arte, así que estos valores
// igualan el área visual de cada logo.
// Las imágenes llegan como metadatos de Astro: se usa `.src`.
export const CLIENTES = [
  { id: 'altina', logo: altina.src, nombre: 'Altina', h: 41 },
  { id: 'chiaraviglio', logo: chiaraviglio.src, nombre: 'Chiaraviglio Hnos', h: 46 },
  { id: 'prome', logo: prome.src, nombre: 'Prome AgroNegocios', h: 54 },
  { id: 'munira', logo: munira.src, nombre: 'Munira Foods', mono: true, h: 64 },
  { id: 'chiaratech', logo: chiaratech.src, nombre: 'Chiara Tech', h: 57 },
  { id: 'aaas', logo: aaas.src, nombre: 'Agro Assistance Service', h: 47 },
  { id: 'kimzza', logo: kimzza.src, nombre: 'Kimzza', h: 42 },
  { id: 'conci', logo: conci.src, nombre: 'Conci Riego', mono: true, h: 45 },
  { id: 'aapresid', logo: aapresid.src, nombre: 'Aapresid', h: 40 },
  { id: 'adj', logo: adj.src, nombre: 'ADJ', h: 50 },
  { id: 'halcon', logo: halcon.src, nombre: 'Halcón', h: 50 },
  { id: 'biored', logo: biored.src, nombre: 'BioRed', h: 66 },
  { id: 'agroconsultor', logo: agroconsultor.src, nombre: 'Agroconsultor', h: 40 },
  { id: 'biozelen', logo: biozelen.src, nombre: 'Bio Zelen', h: 74 },
];
