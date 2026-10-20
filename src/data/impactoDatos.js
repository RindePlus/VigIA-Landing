// Números de la sección Impacto, compartidos por los tres idiomas
// (src/data/vigia.js, vigia.en.js y vigia.pt.js): los datos son los
// mismos, sólo cambian los textos y el formato de los números (20.000 en
// español y portugués, 20,000 en inglés).
// Datos del informe técnico: escenario base de 20.000 ha, cinco campañas
// continuas (decisiones 19, 25, 32 y 34 de ESTRUCTURA_LANDING.md). Son
// resultados de campo, no del motor. Los totales se calculan a partir de los
// cultivos, así no hay dos números que puedan desparejarse.
// CO₂ en t: fijado por fotosíntesis (toda la biomasa extra), el que vuelve
// al suelo con rastrojo y raíces, y lo que queda estable. `rango` es el del
// informe; `estable` es el valor que se muestra: el promedio del rango,
// ajustado y redondeado para que los tres sumen un número redondo (3.300).
export const CULTIVOS_IMPACTO = [
  { id: 'maiz', kgHa: 740, hectareas: 8000, co2: { fijado: 20378, suelo: 12026, rango: [1750, 2540], estable: 2050 } },
  { id: 'soja', kgHa: 230, hectareas: 7000, co2: { fijado: 6836, suelo: 4538, rango: [620, 900], estable: 700 } },
  { id: 'trigo', kgHa: 230, hectareas: 5000, co2: { fijado: 4818, suelo: 3186, rango: [460, 660], estable: 550 } },
];

const suma = (f) => CULTIVOS_IMPACTO.reduce((t, c) => t + f(c), 0);
export const HA_TOTAL = suma((c) => c.hectareas); // 20.000
export const GRANO_T = suma((c) => (c.kgHa * c.hectareas) / 1000); // 8.680
export const CO2_FIJADO = suma((c) => c.co2.fijado); // 32.032 → "~32.000"
export const CO2_SUELO = suma((c) => c.co2.suelo); // 19.750
// Suma de lo que queda estable (2.050 + 700 + 550). Es el indicador de
// arriba, así el número grande y el total de la tabla coinciden.
export const CO2_DESTACADO = suma((c) => c.co2.estable); // 3.300

/** Formateador de números enteros para un locale ('es-AR', 'en-US'). */
export const formateador = (locale) => {
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  return (n) => nf.format(n);
};

/**
 * Filas de las dos tablas de Impacto, con los nombres de cultivo y la
 * palabra "Total" de cada idioma.
 * @param {(n: number) => string} fmt
 * @param {Record<string, string>} nombres nombre de cada cultivo por id
 * @param {string} total
 */
export const filasImpacto = (fmt, nombres, total) => ({
  grano: [
    ...CULTIVOS_IMPACTO.map((c) => [nombres[c.id], fmt(c.hectareas), fmt(c.kgHa), `${fmt((c.kgHa * c.hectareas) / 1000)} t`]),
    [total, fmt(HA_TOTAL), '', `${fmt(GRANO_T)} t`],
  ],
  carbono: [
    ...CULTIVOS_IMPACTO.map((c) => [
      nombres[c.id],
      fmt(c.co2.fijado),
      fmt(c.co2.suelo),
      fmt(c.co2.estable),
    ]),
    [total, `~${fmt(Math.round(CO2_FIJADO / 1000) * 1000)}`, `~${fmt(CO2_SUELO)}`, `~${fmt(CO2_DESTACADO)}`],
  ],
});
