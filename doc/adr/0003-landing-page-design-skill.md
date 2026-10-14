# ADR 0003 — `landing-page-design` como guía de diseño

- **Estado:** Propuesto
- **Fecha:** 2026-10-14
- **Reemplaza:** los puntos 5 y 6 de [ADR 0001](0001-workflow-and-engineering-standards.md) en lo que respecta a la skill `ui-design`. El resto de ADR 0001 sigue vigente.

## Contexto

ADR 0001 estableció la calidad UI/UX a través de la skill `ui-design`, escrita para el repo con principios generales y las convenciones de Astro, islas y tokens.

Con el tiempo quedó desactualizada: es genérica (sirve igual para un dashboard que para una landing), no fija valores concretos de tipografía, espaciado ni movimiento, y se superpone con `landing-page-design`, que ya estaba instalada. Con dos skills reclamando el mismo trabajo, las decisiones de diseño dependían de cuál se aplicara.

Para la landing buscamos un diseño minimalista y moderno, con movimiento que acompañe sin recargar. `landing-page-design` resuelve exactamente eso con reglas cerradas: una tipografía, escalas fijas de tamaño y espaciado, una curva de movimiento única y apariciones al hacer scroll.

## Decisión

1. `landing-page-design` (de terceros, registrada en `skills-lock.json`) pasa a ser la skill prioritaria para el trabajo visual y de copy.
2. Se elimina `ui-design`. Sus convenciones de implementación, que siguen vigentes, pasan a `CLAUDE.md` ("Convenciones de implementación").
3. La skill no se edita, porque una actualización la pisaría. Su adaptación al repo vive en `CLAUDE.md` ("Diseño — sistema visual"):
   - Las escalas de Tailwind se traducen a tokens CSS (`--text-*`, `--space-*`, `--ease-fluid`, `--dur-*`).
   - Excepciones acordadas: el header conserva su estilo actual, y el fondo por etapas de los tres módulos queda como excepción **provisoria** a la regla de fondos planos.
4. Las skills de animación de Emil Kowalski quedan como complemento a demanda, dentro de los mismos tokens.
5. La **Parte A** de la skill (estrategia, estructura y copy) es genérica y no conoce los límites del producto. En este repo la reemplaza una skill propia, `vigia-landing-structure`, basada en `doc/landing/MODULO_VIGIA.md` (§10) y `doc/landing/ESTRUCTURA_LANDING.md`. La Parte B (sistema visual) sigue vigente.

## Consecuencias

- Las decisiones visuales tienen una sola fuente y valores verificables en revisión: si un tamaño, espaciado o curva no viene de un token, está mal.
- Cambio visible en el sitio: Geist reemplaza a Inter, íconos Phosphor, paleta oscura neutra y apariciones al hacer scroll.
- Las secciones que pide la skill (frase destacada, cómo funciona, FAQ) quedan definidas en `ESTRUCTURA_LANDING.md` (versión 2), pendientes de implementar.
- Si la skill de terceros cambia de criterio en una actualización, hay que revisar `CLAUDE.md` antes de aplicarla.
