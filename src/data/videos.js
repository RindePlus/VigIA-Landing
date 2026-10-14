// Videos de los módulos (etapa 2, ver doc/landing/ESTRUCTURA_LANDING.md → Animaciones y
// video). Mientras un valor sea `null`, el módulo muestra sólo su animación
// en código; en `pnpm dev` aparece además una nota con la `descripcion`.
//
// Para agregar un clip, copiá los archivos a `public/videos/` y completá:
//   { mp4: '/videos/x.mp4', poster: '/videos/x.jpg', descripcion: '...' }
// Clips de 5-8 s, sin sonido, sin texto adentro, menos de 4 MB.
// Sólo MP4 (H.264): con follaje fino, a igual calidad el WebM (VP9) pesaba
// más, y el navegador lo descargaría primero. `webm` sigue siendo opcional.
// Si van a cambiar seguido, conviene alojarlos fuera del repo y usar URLs.

export const VIDEOS = {
  // Módulo 2: el lote sin aviso (hojas enrollándose, suelo agrietado, mano
  // sobre una planta marchita). Se muestra después del gráfico sin VigIA.
  problema: {
    mp4: '/videos/problema.mp4',
    poster: '/videos/problema.jpg',
    descripcion: 'El lote se marchita bajo el sol del mediodía y la mano del productor toca una hoja seca (5 s).',
  },

  // Módulo 3: la resolución (pulverizadora aplicando al amanecer y el mismo
  // lote verde y sano). Se muestra después del aviso de WhatsApp.
  resolucion: {
    mp4: '/videos/resolucion.mp4',
    poster: '/videos/resolucion.jpg',
    descripcion: 'La pulverizadora aplica al amanecer y se funde al mismo lote, sano (5,5 s).',
  },
};

export const DESCRIPCION_PENDIENTE = {
  problema: 'Video del lote sin aviso: hojas enrollándose, suelo agrietado, mano sobre una planta marchita (5-6 s).',
  resolucion: 'Video de la resolución: aplicación o riego al amanecer y el mismo lote sano (5 s).',
};
