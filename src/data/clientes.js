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
import biozelen from '../assets/clientes/biozelen.png';
import speedagro from '../assets/clientes/speedagro.png';

// Mismos clientes y ajustes que el carrusel de Landing (TrustedCompanies.jsx).
// `mono: true` → logo de un solo color, sin versión de marca: en hover va a
// negro (claro) / blanco (oscuro) en vez de mostrar colores.
// `h` → alto en px. Los assets están recortados al arte, así que estos valores
// igualan el área visual de cada logo.
// `logo` son los metadatos de Astro (src, ancho y alto del original): HomePage
// los pasa por getImage (WebP al doble del alto en que se muestran) y le da al
// carrusel la URL y el tamaño, para que reserve el lugar de cada logo.
// Sin BioRed ni Agroconsultor: son socios del producto y ya salen en Sobre
// nosotros (equipo.js), no clientes (decisión 45).
export const CLIENTES = [
  { id: 'altina', logo: altina, nombre: 'Altina', h: 41 },
  { id: 'chiaraviglio', logo: chiaraviglio, nombre: 'Chiaraviglio Hnos', h: 46 },
  { id: 'prome', logo: prome, nombre: 'Prome AgroNegocios', h: 54 },
  { id: 'munira', logo: munira, nombre: 'Munira Foods', mono: true, h: 64 },
  { id: 'chiaratech', logo: chiaratech, nombre: 'Chiara Tech', h: 57 },
  { id: 'aaas', logo: aaas, nombre: 'Agro Assistance Service', h: 47 },
  { id: 'kimzza', logo: kimzza, nombre: 'Kimzza', h: 42 },
  { id: 'conci', logo: conci, nombre: 'Conci Riego', mono: true, h: 45 },
  { id: 'aapresid', logo: aapresid, nombre: 'Aapresid', h: 40 },
  { id: 'adj', logo: adj, nombre: 'ADJ', h: 50 },
  { id: 'halcon', logo: halcon, nombre: 'Halcón', h: 50 },
  { id: 'biozelen', logo: biozelen, nombre: 'Bio Zelen', h: 74 },
  { id: 'speedagro', logo: speedagro, nombre: 'SpeedAgro', h: 40 },
];
