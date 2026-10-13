// Serie ilustrativa de agua útil compartida por los gráficos animados del
// módulo 1 (con VigIA) y del módulo 2 (sin VigIA). Mismo lote, misma
// historia. Coordenadas en el viewBox 0 0 560 270 de los SVG.

// Día (0-30) → x en el SVG.
export const x = (d) => 40 + d * 16;

// [día, y]. La y crece hacia abajo = menos agua. Lluvia el día 8.
export const AU = [
  [0, 90], [2, 96], [4, 102], [6, 108], [8, 84], [10, 90], [12, 97], [14, 104],
  [16, 111], [18, 118], [20, 125], [22, 136], [24, 150], [26, 163], [28, 175], [30, 186],
];

export const UMBRAL_Y = 148;

// Día en que la línea cruza el umbral (entre los puntos 22 y 24).
export const DIA_CRUCE = 22 + ((UMBRAL_Y - 136) / (150 - 136)) * 2;

export const path = (pts) => pts.map(([d, y], i) => `${i ? 'L' : 'M'}${x(d)} ${y}`).join(' ');
