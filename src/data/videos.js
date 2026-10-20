// Videos de los módulos (etapa 2, ver doc/landing/ESTRUCTURA_LANDING.md → Animaciones y
// video). Mientras un valor sea `null`, el módulo muestra sólo su animación
// en código; en `pnpm dev` aparece además una nota con la `descripcion`.
//
// Para agregar un clip, copiá los archivos a `public/videos/` y completá:
//   { mp4: '/videos/x.mp4', poster: '/videos/x.webp', descripcion: '...',
//     tono: 'critico' | 'ok', encuadre: '50% 50%' }
// El rótulo de capítulo que va sobre cada video es texto: está en UI.videos
// de src/data/vigia.js y vigia.en.js.
// Clips de 5-8 s, sin sonido, sin texto adentro, menos de 4 MB. El poster,
// en WebP (un JPG pesaba el doble).
// Sólo MP4 (H.264): con follaje fino, a igual calidad el WebM (VP9) pesaba
// más, y el navegador lo descargaría primero. `webm` sigue siendo opcional.
// Si van a cambiar seguido, conviene alojarlos fuera del repo y usar URLs.

export const VIDEOS = {
  // Módulo 2: el lote sin aviso (el cultivo verde se marchita y el suelo se
  // agrieta, en una sola toma). Se muestra después del gráfico sin VigIA.
  // El clip ya viene en 10:7, la proporción de la tarjeta.
  problema: {
    mp4: '/videos/problema_v2.mp4',
    poster: '/videos/problema_v2.webp',
    descripcion: 'El lote verde se seca bajo el sol: las hojas se marchitan y el suelo se agrieta (6 s).',
    tono: 'critico',
    // Los eucaliptos y los silos están a la derecha.
    encuadre: '75% 50%',
  },

  // Módulo 3: la resolución (pulverizadora aplicando al amanecer y el mismo
  // lote verde y sano). Se muestra después del aviso de WhatsApp.
  resolucion: {
    mp4: '/videos/resolucion.mp4',
    poster: '/videos/resolucion.webp',
    descripcion: 'La pulverizadora aplica al amanecer y se funde al mismo lote, sano (5,5 s).',
    tono: 'ok',
    // La pulverizadora va un poco a la izquierda del centro y los silos a la derecha.
    encuadre: '58% 50%',
  },
};

export const DESCRIPCION_PENDIENTE = {
  problema: 'Video del lote sin aviso: hojas enrollándose, suelo agrietado, mano sobre una planta marchita (5-6 s).',
  resolucion: 'Video de la resolución: aplicación o riego al amanecer y el mismo lote sano (5 s).',
};
