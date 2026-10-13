import { useEffect, useRef } from 'react';
import { CLIENTES } from '../data/clientes';
import './TrustedCompanies.css';

// Carrusel de clientes portado de Landing. Diferencias:
// - Sin animación de entrada: el HTML prerenderizado ya muestra los logos y
//   la isla sólo agrega el desplazamiento y el arrastre al hidratar.
// - Con `prefers-reduced-motion` no se desplaza solo (se puede arrastrar).

// Duplicados para que el loop no tenga corte.
const TRACK = [...CLIENTES, ...CLIENTES];

const TrustedCompanies = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let animationId;
    let position = 0;
    const speed = reduceMotion ? 0 : 60;
    let isDragging = false;
    let startX = 0;
    let dragOffset = 0;
    let lastTime = performance.now();

    const clampPosition = () => {
      const half = carousel.scrollWidth / 2;
      if (position <= -half) position += half;
      if (position > 0) position -= half;
    };

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (!isDragging && speed) {
        position -= speed * dt;
        clampPosition();
        carousel.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const onStart = (e) => {
      isDragging = true;
      startX = getX(e);
      dragOffset = position;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      position = dragOffset + getX(e) - startX;
      clampPosition();
      carousel.style.transform = `translateX(${position}px)`;
    };

    const onEnd = () => {
      isDragging = false;
    };

    carousel.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    carousel.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      carousel.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={carouselRef}>
        {TRACK.map((cliente, index) => (
          <div
            key={`${cliente.id}-${index}`}
            className={`company-logo ${cliente.mono ? 'company-logo--mono' : ''}`}
            aria-hidden={index >= CLIENTES.length ? 'true' : undefined}
          >
            <img
              src={cliente.logo}
              alt={index >= CLIENTES.length ? '' : cliente.nombre}
              style={{ height: `${cliente.h}px` }}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedCompanies;
