# Versión en inglés: reglas y glosario

Guía para escribir y mantener la versión en inglés de la landing (`/en/`). Explica **por qué** se usa cada término o frase, para que cualquiera que toque el copy mantenga el mismo criterio. La decisión técnica (rutas, archivos, transición) está en [ADR 0004](../adr/0004-sitio-bilingue-es-en.md).

- **Contenido en inglés:** `src/data/vigia.en.js`. Mismas claves que `src/data/vigia.js` (español, la fuente).
- **Alcance:** home, precios y educación. Las legales quedan en español (ver "Decisiones de contenido").

## 1. Principio: adaptar, no traducir

La versión en inglés no es una traducción palabra por palabra: tiene que sonar como si la hubiera escrito un equipo de agtech angloparlante. Para cada frase:

1. Entender **qué quiere decir** en español y para quién (productor o asesor que decide con datos).
2. Escribirla como la diría un agrónomo en inglés, con los términos técnicos que se usan allá.
3. Mantener **las mismas afirmaciones** que el español: ni más ni menos (reglas de la skill `vigia-landing-structure`).

Si una frase literal se entiende pero suena rara ("the crop shows the stress when you already lost yield"), se reescribe ("By the time the crop shows stress, the yield is already lost").

## 2. Público, variante y tono

| Tema | Regla | Por qué |
|---|---|---|
| Público | Internacional: socios, inversores y productores fuera de Argentina. | Decisión del equipo (2026-10-16). |
| Variante | Inglés de agronegocios neutro, con **ortografía de EE. UU.** (*fertilizer*, *center pivot*, *program*). | Es la variante más extendida en agtech. Se evitan regionalismos de EE. UU. (*bushels*, *acres*) y de Australia/Reino Unido (*paddock*, *sowing*). |
| Unidades | **Métricas**: ha, t, kg/ha, mm. | Es lo que usa el agro fuera de EE. UU. y lo que da el informe técnico. No se convierten a acres ni bushels. |
| Persona | Segunda persona (*you*), imperativo directo (*Apply…*, *Book…*). | Equivale al voseo del español: cercano y directo. |
| Tono | Frases cortas, beneficio primero. Contracciones con moderación (*we'll*, *you're*, *doesn't*). | Suena conversacional sin perder seriedad. |
| Mayúsculas | *Sentence case* en títulos (sólo la primera palabra y nombres propios): *Alerts in time to act*, no *Alerts In Time To Act*. | Misma regla que el español y la que usan los sitios de producto actuales. |
| Puntuación | Sin exclamaciones. Sin guiones largos dentro de las frases (se usa coma, dos puntos o punto). | Igual que la regla del español. |

## 3. Lo que no se traduce

| Elemento | Regla | Por qué |
|---|---|---|
| **VigIA BioEstrés** | Va tal cual, con tilde. | Es la marca (logo). Traducirla ("BioStress") crearía otra marca. |
| **VigIA** | Tal cual. No se explica el juego "IA". | La regla del producto es no hablar de inteligencia artificial, tampoco en inglés. |
| Rinde Plus, nombres de clientes y personas | Tal cual. | Nombres propios. |
| WhatsApp | Tal cual. | Marca. |
| Afirmaciones del producto | Las mismas prohibiciones que en español: nada de *AI*, *machine learning*, *satellite*, *NDVI*, *drones*, plagas, enfermedades (*pest*, *disease*), *prescription maps*, marcas de insumos. | El contenido en inglés no puede prometer lo que el producto no hace. |

## 4. Glosario agronómico

| Español | Inglés | Por qué / qué evitar |
|---|---|---|
| lote | **field** | Es el término estándar. ❌ *lot* (en inglés es un terreno urbano o un lote de producción). ❌ *plot* (parcela chica de ensayo). ❌ *paddock* (Australia). |
| ambiente (del lote) | **management zone** (corto: **zone**) | Es el término de agricultura de precisión para una zona homogénea dentro del lote. ❌ *environment* (en inglés no significa eso). En el chat de ejemplo se acorta: *Field 12 · Zone 2*. |
| agua útil | **plant-available water**; en etiquetas cortas, **available water** | Es el término de ciencia del suelo (PAW). ❌ *useful water* (literal, no se usa). |
| agua del suelo | **soil water** | Término estándar (*soil water balance*, *soil moisture*). |
| balance hídrico | **(soil) water balance** | Término FAO-56 en inglés. ❌ *hydric balance* (calco del español). |
| umbral del cultivo | **crop threshold** | Corto y claro en el gráfico. |
| estrés hídrico | **water stress** | Término técnico estándar. *Drought stress* se usa para la acción del bioestimulante. ❌ *hydric stress* (calco). |
| estrés térmico | **heat stress** | ❌ *thermal stress* (suena a ingeniería de materiales). |
| estrés combinado | **combined stress** (en la frase: *heat and drought at once*) | Se explica con palabras de campo. |
| DPV (déficit de presión de vapor) | **VPD** (vapor pressure deficit) | Es la sigla que se usa en inglés. ❌ *DPV*. |
| bioinsumo | **biostimulant** | Los bioinsumos que sugiere VigIA son para **estrés abiótico** (agua, calor): eso es un bioestimulante. ❌ *biologicals*: en EE. UU. incluye biocontrol de plagas y enfermedades, que el producto no cubre (regla: sin estrés biótico). ❌ *bio-input* (se entiende, pero suena a calco). |
| bioinsumo hídrico | **drought-stress biostimulant** | Dice para qué sirve. |
| antiestrés térmico | **heat-stress biostimulant** | ❌ *thermal anti-stress* (calco, no se usa). |
| bioinsumo preventivo | **preventive biostimulant** | |
| riego / regar | **irrigation / irrigate** | |
| pivote | **center pivot** | Ortografía de EE. UU. (*center*, no *centre*). |
| secano | **rainfed** | Término internacional (FAO). *Dryland* es más de EE. UU. |
| rinde | **yield** | ❌ *performance*, *output*. |
| rinde perdido | **yield lost** / **yield loss** | |
| lotes que no siguieron a VigIA | **fields that didn't follow VigIA** | Igual que en español, sin *check plots*: se dice lo que significa. |
| grano recuperado | **grain yield protected** | En español "recuperado" es lo que no se perdió; en inglés *recovered* sugiere que se recuperó algo ya perdido. *Protected* dice lo correcto. |
| campaña | **season** (growing season) | ❌ *campaign* (en inglés agrícola no se usa con ese sentido). |
| siembra / sembrar | **planting / plant** | ❌ *sowing* (más británico; en EE. UU. se usa *planting*). |
| antes de la siembra | **pre-planting**, *before planting* | |
| barbecho | **fallow** | |
| cultivos de servicio | **cover crops** | ❌ *service crops* (calco; se entiende poco). |
| secado (de cultivos de servicio) | **termination** / *terminate* | Es el término técnico para cortar el cultivo de cobertura. ❌ *drying*. |
| carry-over de herbicidas | **herbicide carryover** | Término estándar (sin guion). |
| herbicidas residuales | **residual herbicides** | |
| período crítico / etapa crítica | **critical stage**; *the yield-defining stage* | "La etapa que define el rinde" = *critical period* para el rinde. Se prefiere *stage* (etapa fenológica) por ser más claro. |
| fenología | **crop development**, *crop stage* | *Phenology* es correcto pero académico; en el copy se usa *development*. |
| grupo de madurez | **maturity group** | Término estándar en soja. |
| centeno, cebada, vicia | **cereal rye, barley, vetch** | *Cereal rye* evita la confusión con *ryegrass*. |
| maíz, soja, trigo | **corn, soybean, wheat** | *Corn* (EE. UU.), no *maize*: más común en agronegocios. *Soybean* como sustantivo de cultivo. |
| rastrojo | **crop residue** | ❌ *stubble* sólo se refiere a los tallos que quedan en pie. |
| productor | **grower** | En agtech es el término habitual. *Farmer* también vale, pero *grower* suena más profesional. |
| asesor (técnico) | **agronomist** | Es quien asesora en el campo. *Crop advisor* también se usa. |
| a campo / se ve a campo | **in the field** / *shows up in the field* | |
| la hoja se enrolla | **leaves start rolling** | *Leaf rolling* es el síntoma descrito así en inglés. |
| pronóstico regional | **regional forecast** | |
| labores | **field operations** | ❌ *labors*. |
| insumos | **inputs** | |
| alerta / aviso | **alert** | |
| plataforma / panel del lote | **platform** / **field dashboard** | |

## 5. Frases adaptadas (y por qué no van literal)

| Español | Inglés | Por qué |
|---|---|---|
| Detectá el estrés antes de que se convierta en pérdida | **Catch crop stress before it turns into yield loss** | *Loss* solo queda vago; *yield loss* es lo que le importa al productor. *Catch* es más natural que *detect* en titulares. |
| El cultivo muestra el estrés cuando ya perdiste rinde | **By the time the crop shows stress, the yield is already lost** | La estructura *by the time… already* es la forma natural de decir "cuando ya es tarde". |
| Para cuando lo ves a campo, reaccionás tarde y el daño ya está hecho | **When you see it in the field, you're reacting too late and the damage is done** | |
| El síntoma llega tarde para el bioinsumo | **Symptoms show up too late for biostimulants** | *Show up* es el verbo natural para síntomas. |
| El pronóstico regional no conoce tu lote | **A regional forecast doesn't know your field** | Se mantiene la personificación: funciona igual en inglés. |
| vigila el estrés toda la campaña | **watches for stress all season long** | *All season long* es la expresión idiomática. |
| te dice cuándo cuidar el agua | **tells you when to save water** | "Cuidar el agua" = ahorrarla, no "take care of water". |
| Detecta picos de estrés | **Spots stress peaks** | *Spot* es más natural y corto que *detect*. |
| Cuida el uso del agua | **Smarter water use** | El literal (*takes care of water use*) no suena a beneficio. |
| Orientado a bioinsumos | **Built for biostimulants** | *Oriented to* es un calco. *Built for* es la forma habitual de decir "pensado para". |
| Lo que hace VigIA | **What VigIA does** | Ya era la etiqueta en inglés; no cambia. |
| Cada aviso trae su bioinsumo | **Every alert comes with its biostimulant** | *Comes with* = viene acompañado de, sin sonar a venta. |
| Te avisa a tiempo para actuar | **Alerts in time to act** | Corto, como titular. |
| aire que seca a la planta | **dry air pulling water from the plant** | El literal (*the air dries the plant*) suena a la planta secándose al sol. Lo que pasa es la demanda atmosférica (VPD): el aire le saca agua. |
| Se cargan tus lotes | **Your fields are set up** | Voz pasiva neutral, igual que en español: todavía no está definido quién hace el alta (pregunta abierta 1 de `ESTRUCTURA_LANDING.md`). |
| Calcula cada día | **Daily calculations** | |
| Te avisa a tiempo | **Timely alerts** | |
| Cargás lluvias y riegos | **Log rainfall and irrigation** | *Log* es el verbo de las apps para registrar datos. |
| Que el bioinsumo llegue antes que el estrés, no después del daño | **Get the biostimulant on before stress hits, not after the damage is done** | Mantiene el contraste antes/después y las palabras resaltadas en verde y rojo. *Get it on* = aplicarlo (jerga de aplicación). |
| Más grano y más carbono en el suelo | **More grain, more carbon in the soil** | |
| Lo que suelen preguntarnos | **Common questions** | El literal (*What they usually ask us*) suena raro como título. |
| Preguntas frecuentes | **FAQ** | Etiqueta corta y estándar. |
| Confían en nosotros | **Trusted by** | Forma habitual sobre logos de clientes. |
| La próxima pérdida ya se está gestando en algún lote. Encontrala primero. | **The next yield loss is already building in one of your fields. Find it first.** | *Building* transmite "gestándose"; *one of your fields* lo hace personal. |
| Contactanos para empezar a usar VigIA | **Contact us to get started with VigIA** | *Get started* es la fórmula estándar de un CTA. |
| Educación | **Learn** | En sitios de producto, la sección de contenidos se llama *Learn* o *Resources*; *Education* suena a institución educativa. |
| Lo ves a campo / Se ve a campo 6 días tarde | **Seen in the field / Seen in the field 6 days late** | |

## 6. Formato

- **Números:** coma de miles y punto decimal (*20,000*, *8,680*, *~3,300*). Los genera `Intl.NumberFormat('en-US')` en `vigia.en.js`; no se escriben a mano.
- **Unidades:** con espacio (*20,000 ha*, *8,680 t*), *kg/ha*. *CO₂* con subíndice.
- **Rangos:** con raya corta (*1,750–2,540*).
- **Hora:** 24 h en el chat de ejemplo (*07:30*): es un mensaje de WhatsApp de Argentina.

## 7. Decisiones de contenido

| Tema | Decisión | Por qué |
|---|---|---|
| Idioma de la atención | El equipo responde en español. En inglés, debajo del botón del cierre: *We are based in Argentina and our team replies in Spanish.* En el botón flotante de WhatsApp: *Our team replies in Spanish.* | Decisión del equipo (2026-10-16): mejor aclararlo que generar una expectativa que no se cumple. Si el equipo pasa a atender en inglés, se vacían `CTA.nota` y `UI.widget.nota`. |
| Mensajes prearmados de WhatsApp | En inglés (*Hi, I'd like…*). | El mensaje lo envía el visitante: tiene que estar en su idioma. |
| Páginas legales | Sólo en español. Desde `/en/` se enlazan como *Privacy policy (Spanish)*. | Son un borrador que tiene que revisar asesoría legal; traducir un texto legal sin revisar es riesgoso. |
| Dirección | En inglés se muestra completa, con *Argentina*. | El público no es sólo argentino. |
| Demo de 20 minutos | Se mantiene. | Es la misma oferta; la nota del cierre aclara el idioma. |

## 8. Cómo cambiar o agregar un texto

1. Cambiá el texto en `src/data/vigia.js` (español).
2. Hacé el cambio equivalente en `src/data/vigia.en.js`, con **la misma clave**, siguiendo este glosario.
3. Si aparece un término nuevo o una frase que no puede ir literal, sumala a las tablas 4 o 5 con el porqué.
4. Revisá las dos versiones en `pnpm dev` (`/` y `/en/`): los textos en inglés suelen ser más cortos o más largos y pueden cambiar cómo se parten los títulos.
5. `pnpm validate` antes del PR.

## 9. Pendiente de revisión

Conviene que alguien con inglés nativo y conocimiento agronómico revise antes del release:

- *Biostimulant* para "bioinsumo" (sección 4): confirmar con el equipo que los productos que se sugieren son bioestimulantes para estrés abiótico.
- *Management zone* para "ambiente": confirmar que la plataforma usa el mismo concepto.
- *96% biostimulant response effectiveness*: confirmar cómo se expresa ese indicador en el informe técnico en inglés, si existe.
- El tono de los titulares del hero y del cierre.
