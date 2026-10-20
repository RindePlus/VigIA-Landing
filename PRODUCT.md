# Product

<!-- impeccable:product-schema 1 -->

> Contexto del producto para la skill `impeccable`. Resume fuentes que ya existen y no las reemplaza: qué se puede afirmar está en [`doc/landing/MODULO_VIGIA.md`](doc/landing/MODULO_VIGIA.md) §10, las secciones y el copy en [`doc/landing/ESTRUCTURA_LANDING.md`](doc/landing/ESTRUCTURA_LANDING.md) y la skill `vigia-landing-structure`, y el sistema visual en [`DESIGN.md`](DESIGN.md). Si algo de acá contradice esas fuentes, mandan ellas.

## Platform

web

## Users

- **Productores agropecuarios** de Argentina, extensivos e intensivos, en secano o bajo riego, que deciden cuándo aplicar un bioinsumo o regar.
- **Asesores agronómicos** que siguen los lotes de varios clientes y deciden con datos.
- En la versión en inglés (`/en/`): socios, inversores y productores fuera de Argentina.
- En la versión en portugués (`/pt/`): productores, consultores y empresas de Brasil.

Muchas veces leen la página en el celular, en el campo y a pleno sol.

## Product Purpose

VigIA BioEstrés avisa el estrés hídrico y térmico de cada ambiente del lote con días de margen, para aplicar el bioinsumo o regar a tiempo. Los avisos llegan por la plataforma y por WhatsApp. El éxito es que el bioinsumo llegue antes que el estrés y no después del daño.

La landing tiene una sola acción: **Contactanos para empezar a usar VigIA**. Abre WhatsApp para agendar una demo con los lotes del cliente.

## Positioning

- **Motor agronómico, no "IA":** balance hídrico por ambiente, DPV contra los umbrales del cultivo y pronóstico a 14 días.
- **Precisión por ambiente**, dentro del lote.
- **Acompaña desde antes de la siembra** hasta el final del ciclo.
- **Orientado a bioinsumos:** cada aviso trae su acción, bioinsumo o riego.

## Operating Context

Campaña agrícola. Lotes divididos en ambientes, con cultivos como maíz, soja y trigo, en secano o bajo riego. Las alertas se leen en WhatsApp y el detalle en el panel del lote. El usuario carga lluvias y riegos, y el cálculo se ajusta.

## Capabilities and Constraints

- **Sitio estático** (Astro, GitHub Pages): sin backend, sin formularios y sin cuentas.
- **En español, inglés y portugués de Brasil**, con las mismas claves de contenido.
- **Sólo se afirma lo que respalda `MODULO_VIGIA.md` §10.** No se menciona:
  - inteligencia artificial, modelos ni algoritmos ("VigIA" es sólo marca);
  - satélite, NDVI ni drones;
  - estrés biótico, mapas, diagnóstico ni marcas de insumos.
- **Herbicidas** sólo como carry-over, parte de VigIA (decisión 46).
- **Números que no salen del motor** sólo en Impacto, con su fuente.

## Brand Commitments

- **Marca:** **VigIA BioEstrés** en títulos, SEO y cierre; "VigIA" solo cuando ya se nombró.
- **Voz:** voseo rioplatense, frases cortas, beneficio primero y prueba después; sin guiones dentro de las frases ni exclamaciones.
- **Rinde Plus:** VigIA BioEstrés no es "parte" ni "una solución" de Rinde Plus. Rinde Plus, Agroconsultor y BioRed son los socios detrás del producto.

## Evidence on Hand

- **Informe técnico:** 20.000 ha y cinco campañas continuas en lotes de productores. Rinde recuperado y carbono extra frente a lotes que no siguieron a VigIA (`src/data/impactoDatos.js`).
- **Logos de clientes:** en el carrusel (`src/data/clientes.js`).
- **Equipo real:** fotos y empresas (`src/data/equipo.js`).
- **No hay testimonios ni fotos de lotes de clientes.** No se inventan. Las fotos de campo son de Wikimedia Commons, con créditos al pie.
- **Los videos de El problema y La solución** son generados con IA.

## Product Principles

1. **Credibilidad agronómica antes que efecto:** cada afirmación tiene respaldo y cada número, su fuente.
2. **El producto se muestra, no se adorna:** el gráfico del balance y el aviso de WhatsApp son la prueba principal.
3. **Una sola acción**, el contacto por WhatsApp, siempre con el mismo texto.
4. **Se lee en el campo:** contraste alto, texto legible en el celular y nada que haga esperar.

## Accessibility & Inclusion

WCAG AA como mínimo; los grises de texto llegan a 8:1 por el uso a pleno sol. Respeta `prefers-reduced-motion`. Navegable con teclado y sin depender de animaciones para entender el contenido.
