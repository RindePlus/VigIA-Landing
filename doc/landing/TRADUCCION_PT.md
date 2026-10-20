# Versión en portugués: reglas y glosario

Guía para escribir y mantener la versión en portugués de Brasil de la landing (`/pt/`). Explica **por qué** se usa cada término o frase, para que cualquiera que toque el copy mantenga el mismo criterio. La decisión técnica (rutas, archivos) está en [ADR 0008](../adr/0008-version-en-portugues.md); la versión en inglés sigue sus propias reglas en [`TRADUCCION_EN.md`](TRADUCCION_EN.md).

- **Contenido en portugués:** `src/data/vigia.pt.js`. Mismas claves que `src/data/vigia.js` (español, la fuente).
- **Alcance:** home, precios y educación. Las legales quedan en español, como en inglés.

## 1. Principio: adaptar, no traducir

La versión en portugués no es una traducción palabra por palabra: tiene que sonar como si la hubiera escrito un equipo de agtech brasileño. Para cada frase:

1. Entender **qué quiere decir** en español y para quién (produtor o consultor que decide con datos).
2. Escribirla como la diría un agrónomo en Brasil, con los términos técnicos que se usan en la lavoura.
3. Mantener **las mismas afirmaciones** que el español: ni más ni menos (reglas de la skill `vigia-landing-structure`).

El español y el portugués se parecen mucho, y eso es la trampa: muchos calcos se entienden pero suenan a traducción ("lote", "ambiente", "rinde", "campaña", "secado"). La tabla del glosario marca cada uno.

## 2. Público, variante y tono

| Tema | Regla | Por qué |
|---|---|---|
| Público | Clientes de Brasil: produtores, consultores y empresas de insumos. | Pedido del equipo (2026-10-20). |
| Variante | **Portugués de Brasil** (pt-BR). Nada de portugués europeo (*facto*, *equipa*, *registo*). | Es el mercado. |
| Unidades | Métricas: ha, t, kg/ha, mm. | Es lo que usa el agro en Brasil. No se pasa a sacas/ha: los números de Impacto están en kg y t. |
| Persona | **Você**, con imperativo directo (*Detecte…*, *Fale com a gente*). | Es el trato habitual de los sitios de producto en Brasil, cercano sin ser informal. *Tu* sería regional. |
| Tono | Frases cortas, beneficio primero. *A gente* sólo en el CTA y el cierre (*Fale com a gente*), que es la fórmula estándar. | Suena conversacional sin perder seriedad. |
| Mayúsculas | Sólo la primera palabra y nombres propios en títulos. | Misma regla que el español. |
| Puntuación | Sin exclamaciones. Sin guiones largos dentro de las frases. | Igual que el español. |
| Artículo de la marca | **O VigIA** en el medio de la frase (*O VigIA acompanha…*, *talhões que não seguiram o VigIA*). | En portugués las marcas llevan artículo; sin él la frase suena a traducción. Masculino, como *o sistema*. |

## 3. Lo que no se traduce

| Elemento | Regla | Por qué |
|---|---|---|
| **VigIA BioEstrés** | Va tal cual, con tilde. | Es la marca (logo). |
| **VigIA** | Tal cual. No se explica el juego "IA". | La regla del producto es no hablar de inteligencia artificial, tampoco en portugués. |
| Rinde Plus, clientes y personas | Tal cual (*a Rinde Plus*, femenino, como *a empresa*). | Nombres propios. |
| WhatsApp | Tal cual. | Marca. |
| Afirmaciones del producto | Las mismas prohibiciones que en español: nada de *IA*, *inteligência artificial*, *satélite*, *NDVI*, *drones*, *pragas*, *doenças*, *mapas de prescrição*, marcas de insumos. | El contenido en portugués no puede prometer lo que el producto no hace. |

## 4. Glosario agronómico

| Español | Portugués | Por qué / qué evitar |
|---|---|---|
| lote | **talhão** (pl. *talhões*) | Es la unidad de manejo en Brasil. ❌ *lote* (en Brasil es un terreno urbano o un lote de producción). ❌ *parcela* (de ensayo). |
| ambiente (del lote) | **zona de manejo** | Término de agricultura de precisión. *Ambiente* también se usa en Brasil, pero *zona de manejo* es el más claro y el que usan las plataformas. En el chat se acorta: *Talhão 12 · Zona 2*. |
| agua útil | **água disponível** | Término de ciencia del suelo (CAD, capacidade de água disponível). ❌ *água útil* (se entiende, pero no es el término técnico). |
| agua del suelo | **água no solo** | |
| balance hídrico | **balanço hídrico** | Término FAO-56 en portugués. ❌ *balanço de água*. |
| umbral del cultivo | **limite da cultura** | Corto y claro en el gráfico. ❌ *limiar* (correcto pero poco usado en el campo). |
| estrés hídrico / térmico | **estresse hídrico / térmico** | Grafía de Brasil (*estresse*, no *stress*). |
| estrés combinado | Se explica: *falta de água, ar seco… ou os dois juntos*. | Como en español. |
| DPV (déficit de presión de vapor) | **DPV** (déficit de pressão de vapor) | Misma sigla en portugués. |
| bioinsumo | **bioestimulante** | Los bioinsumos que sugiere VigIA son para **estrés abiótico** (agua, calor): eso es un bioestimulante. ❌ *bioinsumo*: en Brasil (Programa Nacional de Bioinsumos) incluye el control biológico de plagas y enfermedades, que el producto no cubre (regla: sin estrés biótico). Mismo criterio que *biostimulant* en inglés. |
| bioinsumo hídrico / antiestrés térmico | **bioestimulante para estresse hídrico / térmico** | Dice para qué sirve. |
| riego / regar | **irrigação / irrigar** | |
| pivote | **pivô central** | |
| secano | **sequeiro** | Término estándar en Brasil. |
| bajo riego | **áreas irrigadas** | |
| rinde | **produtividade** | ❌ *rendimento* (se usa, pero en la lavoura se dice *produtividade*). |
| rinde perdido | **produtividade perdida** / *perda de produtividade* | |
| grano recuperado | **grãos preservados**, *produtividade preservada* | Como en inglés: es lo que no se perdió. ❌ *recuperado* (sugiere que se recuperó algo ya perdido). |
| lotes que no siguieron a VigIA | **talhões que não seguiram o VigIA** | Se dice lo que significa, sin *testemunha*. |
| campaña | **safra** | ❌ *campanha* (no se usa en el agro). |
| siembra / sembrar | **plantio / plantar** | *Semeadura* es correcto pero más académico. |
| antes de la siembra | **pré-plantio** | |
| siembra directa | **plantio direto** | |
| barbecho | **pousio** | |
| cultivos de servicio | **plantas de cobertura** | ❌ *culturas de serviço* (calco). |
| secado (de cultivos de servicio) | **dessecação** | Es el término técnico en Brasil. ❌ *secagem* (es el secado de granos). |
| carry-over de herbicidas | **carryover de herbicidas** | Se usa así en Brasil (también *efeito residual*). |
| herbicidas residuales | **herbicidas residuais** | |
| etapa crítica | **estádio crítico** | En agronomía se dice *estádio* (fenológico). ❌ *etapa*, ❌ *estágio* (más coloquial). |
| fenología | **fenologia** | |
| grupo de madurez | **grupo de maturidade relativa** (GMR) | Término estándar en soja en Brasil. |
| centeno, cebada, vicia | **centeio, cevada, ervilhaca** | |
| maíz, soja, trigo | **milho, soja, trigo** | |
| rastrojo | **palhada** | Es lo que queda en el plantio direto. ❌ *restolho*. |
| manchones (en el lote) | **reboleiras** | Así se nombran las manchas de menor desarrollo en la lavoura. |
| cultivo (en el campo) | **lavoura**; *cultura* para la especie | *A lavoura mostra o estresse* (el cultivo en pie); *limite da cultura* (la especie). |
| productor | **produtor** | |
| asesor | **consultor** (agronômico) | |
| a campo | **no campo**, *na lavoura* | |
| la hoja se enrolla | **as folhas enrolam** | *Enrolamento foliar* es el síntoma. |
| pronóstico | **previsão** (do tempo) | ❌ *prognóstico* (es médico). |
| cargar (datos) | **cadastrar** (talhões), **registrar** (chuvas, irrigações) | *Cadastrar* es dar de alta; *registrar* es anotar un evento. ❌ *carregar*. |
| alerta | **alerta** (masculino: *o alerta*, *alerta enviado*) | En portugués es masculino. |
| plataforma / panel del lote | **plataforma** / **painel do talhão** | |

## 5. Frases adaptadas (y por qué no van literal)

| Español | Portugués | Por qué |
|---|---|---|
| VigIA BioEstrés · Alertas de estrés hídrico y térmico (título de la página) | **VigIA BioEstrés · Alertas de estresse hídrico e térmico** | Es lo que se busca en Brasil. |
| Detectá el estrés antes de que se convierta en pérdida | **Detecte o estresse antes que ele vire perda de produtividade** | *Perda* sola queda vaga, como en inglés. *Virar* es el verbo natural para "convertirse". |
| El cultivo muestra el estrés cuando ya perdiste rinde | **Quando a lavoura mostra o estresse, a produtividade já foi perdida** | La estructura *quando… já* dice "cuando ya es tarde". |
| El pronóstico regional no conoce tu lote | **A previsão regional não conhece o seu talhão** | La personificación funciona igual. |
| vigila el estrés toda la campaña | **monitora o estresse a safra inteira** | *A safra inteira* es la expresión natural. |
| te dice cuándo cuidar el agua | **diz quando poupar água** | "Cuidar el agua" = ahorrarla. |
| Cuida el uso del agua | **Uso mais eficiente da água** | El literal (*cuida do uso da água*) no suena a beneficio. |
| Orientado a bioinsumos | **Pensado para bioestimulantes** | *Orientado a* es un calco. |
| aire que seca a la planta | **ar seco puxando água da planta** | La demanda atmosférica (DPV): el aire le saca agua. |
| Se cargan tus lotes | **Seus talhões são cadastrados** | Voz pasiva neutral, igual que en español: todavía no está definido quién hace el alta (pregunta abierta 1 de `ESTRUCTURA_LANDING.md`). |
| Cargás lluvias y riegos | **Você registra chuvas e irrigações** | |
| Que el bioinsumo llegue antes que el estrés, no después del daño | **Que o bioestimulante chegue antes do estresse, não depois do dano** | Casi literal: en portugués funciona igual, con las mismas palabras resaltadas en verde y rojo. |
| Lo que suelen preguntarnos | **Dúvidas frequentes** | El literal (*O que costumam nos perguntar*) suena forzado como título. |
| Confían en nosotros | **Quem confia em nós** | |
| Contactanos para empezar a usar VigIA | **Fale com a gente para começar a usar o VigIA** | *Fale com a gente* es la fórmula estándar de un CTA en Brasil. |
| ¿Te quedó alguna duda? Escribinos. | **Ficou com alguma dúvida? Fale com a gente.** | |
| Educación | **Conteúdos** | En sitios de producto la sección de contenidos se llama así; *Educação* suena a institución educativa. |
| Lo ves a campo / Se ve a campo 6 días tarde | **Você vê no campo / Aparece no campo 6 dias tarde** | |
| Nosotros (menú) | **Quem somos** | Etiqueta estándar de menú. |

## 6. Formato

- **Números:** punto de miles y coma decimal, como en español (*20.000*, *8.680*, *~3.300*). Los genera `Intl.NumberFormat('pt-BR')` en `vigia.pt.js`; no se escriben a mano.
- **Unidades:** con espacio (*20.000 ha*, *8.680 t*), *kg/ha*. *CO₂* con subíndice.
- **Hora:** 24 h en el chat de ejemplo (*07:30*).

## 7. Decisiones de contenido

| Tema | Decisión | Por qué |
|---|---|---|
| Idioma de la atención | El equipo responde en español. Debajo del botón del cierre: *Estamos na Argentina e nossa equipe responde em espanhol.* En el botón flotante: *Nossa equipe responde em espanhol.* | Mismo criterio que en inglés: mejor aclararlo que generar una expectativa que no se cumple. Si el equipo atiende en portugués, se vacían `CTA.nota` y `UI.widget.nota`. |
| Mensajes prearmados de WhatsApp | En portugués (*Olá, quero…*). | El mensaje lo envía el visitante: tiene que estar en su idioma. |
| Páginas legales | Sólo en español. Desde `/pt/` se enlazan como *Política de privacidade (em espanhol)*. | Son un borrador que tiene que revisar asesoría legal. |
| Dirección | Completa, con *Argentina*. | El público no es argentino. |

## 8. Cómo cambiar o agregar un texto

1. Cambiá el texto en `src/data/vigia.js` (español).
2. Hacé el cambio equivalente en `src/data/vigia.en.js` y `src/data/vigia.pt.js`, con **la misma clave**, siguiendo cada glosario.
3. Si aparece un término nuevo o una frase que no puede ir literal, sumala a las tablas 4 o 5 con el porqué.
4. Revisá las tres versiones en `pnpm dev` (`/`, `/en/` y `/pt/`): los textos en portugués suelen ser más largos y pueden cambiar cómo se parten los títulos y las tarjetas.
5. `pnpm validate` antes del PR.

## 9. Pendiente de revisión

Conviene que alguien de Brasil con conocimiento agronómico revise antes del release:

- *Bioestimulante* para "bioinsumo": confirmar con el equipo que los productos que se sugieren en Brasil se presentan como bioestimulantes.
- *Zona de manejo* para "ambiente": confirmar que la plataforma usa el mismo concepto (en algunas regiones se dice *ambiente de produção*).
- *96% de efetividade na resposta ao bioestimulante*: confirmar cómo se expresa ese indicador.
- Si el equipo va a atender en portugués: en ese caso se quitan las notas de atención en español.
