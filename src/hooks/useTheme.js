import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vg-theme';

function readDocumentTheme() {
  return document.documentElement.getAttribute('data-rp-theme') === 'dark'
    ? 'dark'
    : 'light';
}

/**
 * Tema claro/oscuro, system-first (mismo criterio que useRpTheme en Landing):
 * sin elección explícita sigue al sistema operativo en vivo; el toggle
 * persiste la elección en localStorage y desde ahí manda sobre el SO.
 *
 * El HTML se prerenderiza en claro; BaseLayout.astro fija data-rp-theme antes
 * del primer paint y acá se lee al montar, así el render de hidratación
 * coincide con el del servidor.
 */
export function useTheme() {
  const [theme, setTheme] = useState('light');
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    setTheme(readDocumentTheme());
    setSynced(true);
  }, []);

  useEffect(() => {
    if (synced) document.documentElement.setAttribute('data-rp-theme', theme);
  }, [theme, synced]);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* localStorage no disponible */
      }
      if (stored === 'light' || stored === 'dark') return;
      setTheme(event.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* localStorage no disponible */
      }
      return next;
    });
  };

  return { theme, toggleTheme };
}
