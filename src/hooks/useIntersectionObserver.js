import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optional: Disconnect after triggering once if you only want the animation to happen once
        if (options.triggerOnce !== false) {
           observer.disconnect();
        }
      } else {
        if (options.triggerOnce === false) {
            setIsVisible(false);
        }
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};
