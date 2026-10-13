// Videos de los módulos (etapa 2, ver ESTRUCTURA_LANDING.md → Animaciones y
// video). Mientras un valor sea `null`, el módulo muestra sólo su animación
// en código; en `pnpm dev` aparece además una nota con la `descripcion`.
//
// Para agregar un clip, copiá los archivos a `public/videos/` y completá:
//   { webm: '/videos/x.webm', mp4: '/videos/x.mp4', poster: '/videos/x.jpg', descripcion: '...' }
// Clips de 5-8 s, sin sonido, sin texto adentro, menos de 2-4 MB.
// Si van a cambiar seguido, conviene alojarlos fuera del repo y usar URLs.

export const VIDEOS = {
  // Módulo 2: el lote sin aviso (hojas enrollándose, suelo agrietado, mano
  // sobre una planta marchita). Se muestra después del gráfico sin VigIA.
  problema: null,

  // Módulo 3: la resolución (pulverizadora aplicando al amanecer o pivote de
  // riego que arranca, y el mismo lote verde y sano). Se muestra después del
  // aviso de WhatsApp.
  resolucion: null,
};

export const DESCRIPCION_PENDIENTE = {
  problema: 'Video del lote sin aviso: hojas enrollándose, suelo agrietado, mano sobre una planta marchita (5-6 s).',
  resolucion: 'Video de la resolución: aplicación o riego al amanecer y el mismo lote sano (5 s).',
};
