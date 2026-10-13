import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* Scroll-triggered entrance used across the GitHub-skinned pages.
   Styles live in HomePage.css (.rp-reveal / .rp-is-visible). */
const Reveal = ({ children, className = '', id, delay }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.15,
    triggerOnce: true,
  });
  const delayClass = delay ? `rp-reveal--delay-${delay}` : '';
  return (
    <div
      id={id}
      ref={ref}
      className={`rp-reveal ${delayClass} ${isVisible ? 'rp-is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
