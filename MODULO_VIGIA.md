# Módulo VigIA: documentación completa para la separación de RindePlus

> **Fuente:** relevamiento del repo `RindePlus/Plataforma` (commit `e7554e5c`, 2026-10-13).
> Las rutas del backend son relativas a `Plataforma/backend/` y las del frontend a `Plataforma/frontend/`.
> Los números de línea corresponden a ese commit y pueden moverse.

**Objetivo de este documento:** describir qué es VigIA hoy dentro de RindePlus, cómo está construido y de qué depende, como base para construirlo como sistema independiente.

## Índice

0. [Resumen ejecutivo](#resumen-ejecutivo)
1. [Qué es VigIA](#1-qué-es-vigia)
2. [Backend](#2-backend)
3. [Migraciones de Alembic](#3-migraciones-de-alembic-backendalembicversions)
4. [Frontend](#4-frontend-frontendsrc)
5. [Acoplamientos con RindePlus](#5-acoplamientos-con-el-resto-de-rindeplus-lo-crítico-para-el-split)
6. [Flujo de punta a punta](#6-flujo-de-punta-a-punta)
7. [Documentación, TODOs y problemas conocidos](#7-documentación-todos-problemas-conocidos-y-flags)
8. [Tests](#8-tests)
9. [Implicancias para el nuevo sistema](#9-implicancias-para-el-nuevo-sistema)

## Resumen ejecutivo

1. **El backend de VigIA no tiene router propio.** Son unos 75 endpoints inline en `backend/main.py` (26.053 líneas), mezclados con el resto. Casi todos están entre las líneas 18690 y 24670, más unos cuantos helpers de suelo entre 25520 y 26053.
2. **El cálculo de Biostrés corre en el navegador.** El balance hídrico FAO-56, el DPV, las alertas y el plan de riego viven en `frontend/src/components/biostres/*Engine.ts`. El backend sólo provee datos (`/biostres/init-data`) y guarda lo que calcula el frontend (`PATCH computed-data`).
3. **El cálculo de Herbicidas (carry-over) corre en el backend.** Lo hacen `carry_over_engine.py` y `carry_over_report.py`.
4. **No hay alertas push, jobs, scheduler, LLM ni notificaciones** (ni WhatsApp, ni email, ni push). Las "alertas" son objetos que el frontend calcula y guarda en `alertas_estres_combinado`. El clima se refresca bajo demanda.
5. **Integraciones externas:** sólo dos.
   - **WeatherAPI** (`WEATHER_API_KEY`).
   - **Unimap/Acronex** (`https://unimap.acronex.com/api/`). Sus credenciales están cifradas por empresa con Fernet (`CREDENTIALS_KEY`).
   - No hay imágenes satelitales en VigIA.
6. **El acoplamiento con el núcleo es profundo.** VigIA vive sobre `lotes`, `campania`, `ambientes`, `empresas`, `usuarios`, `organizaciones`, `licencias` y `muestreos_suelo`. Además, la carga masiva de lotes (`carga_lotes_service.py`) re-apunta reportes VigIA y regenera aplicaciones de herbicidas. Ése es el punto más delicado del split.

---

## 1. Qué es VigIA

**Propósito:** VigIA es el módulo de monitoreo agronómico por lote y campaña. `HomeScreen.tsx` lo publica como "VigIA Manejo de Estrés" y el dashboard lo muestra como "Powered by VigIA". Tiene tres submódulos, accesibles desde el hub `/vig-ia-biostres`:

| Submódulo | `modulo` / `tipo_vigia` | Qué hace |
|---|---|---|
| **Mitigación de Estrés** (antes "Huella Hídrica") | `modulo='huella-hidrica'`, cultivos `tipo_vigia='principal'` | Balance hídrico diario (FAO-56) por ambiente, sobre una ventana de 210 días (siembra −60 / +150). Alertas de estrés hídrico, de DPV (déficit de presión de vapor) y de riesgo fúngico. Plan de riego mensual con costo en USD/mm, oferta hídrica y rendimiento esperado. Fenología por días fijos, por GDD o por regresión latitudinal (Soja en Córdoba). |
| **Cultivo de Servicio** | `modulo='cultivo-de-servicio'`, `tipo_vigia='servicio'` (Centeno, Cebada, Vicia) | El mismo motor, más % de infiltración de lluvia, fecha de secado (pasa a consumir con el Kc del barbecho) y tasa de conversión a materia seca. |
| **Herbicidas (carry-over)** | `reportes_vigia_herbicidas.modulo='herbicidas'` | Riesgo de residuo de herbicidas para el cultivo siguiente (modelo "Marbete"). Por cada aplicación calcula C0, DT50 ajustada por suelo, clima y agua, concentración remanente, RCO/RF, días seguros hasta la siembra y estado ("Siembra segura / Precaución / No sembrar"). Las aplicaciones salen de la planilla del lote, de carga manual o de Unimap/Acronex. |

**Usuarios:**
- Productores y asesores, que son usuarios `rol='empresa'` de organizaciones como Aapresid, Agroconsultor, Crea, SpeedAgro o RindePlus.
- Administradores, que mantienen el catálogo de cultivos y fenología y el catálogo de herbicidas.

**Funcionalidades para el usuario final:**
- Elegir empresa → campo → lote → campaña. Ver o corregir la fecha de siembra, el cultivo y el ciclo o grupo de madurez.
- Elegir el muestreo de suelo por ambiente (CC/PMP/AUI con Saxton-Rawls).
- Generar el reporte (trae clima nuevo), guardarlo con nombre y abrir reportes guardados.
- Cargar lluvias y riegos (por lote o por ambiente) y chequeos de AU% medidos.
- Overrides por ambiente: umbral p, etapas y costo del riego.
- Exportar PDF con la marca de la organización.
- En Herbicidas: cargar y editar aplicaciones (tanque con productos, calidad, corte, rastrojo, condición hídrica), conectar Unimap y recalcular.

**Licencia:** el acceso se habilita por lote con `licencias.vigia = true` y `fecha_expiracion` vigente.

**Qué dice CLAUDE.md:** sólo menciona VigIA en la tabla de runbooks (`CLAUDE.md:122-124`). La descripción general del producto (`CLAUDE.md:5-7`) no lo nombra.

---

## 2. Backend

### 2.1 Archivos propios de VigIA (raíz plana de `backend/`)

| Archivo | Líneas | Qué es |
|---|---|---|
| `biostres_climate_service.py` | 191 | Clima de Biostrés: `fetch_climate_210` (no escribe en la DB) y `refresh_climate_for_report` (escribe en la fila del reporte). Expone `_resolve_campania_coords`. |
| `carry_over_climate_service.py` | 252 | Clima de Herbicidas: `fetch_climate_window(start, end)`, `reuse_cached_window`, relleno climatológico con hasta 3 años previos. |
| `carry_over_engine.py` | 914 | Motor Marbete puro (sólo `math`): factores, DT50_adj, Ct, C_critica, RCO, RF, días seguros. `evaluar_carry_over` (l.777). |
| `carry_over_report.py` | 3360 | Arma el reporte: parsea aplicaciones (planilla, manual, Unimap, heredadas), matchea contra el catálogo y el marbete, balance de agua, ventanas. Incluye `build_carry_over_report` (l.2376), `clave_ambiente` (l.576) y `VENTANA_HISTORICA_DIAS=730`. |
| `unimap_service.py` | 1002 | Cliente httpx de Acronex Unimap: auth/token, polígonos (caché en memoria de 300 s por worker), punto-en-polígono, estadística de polígono, preaplicaciones y refresco. |
| `vigia_ambiente_selection.py` | 147 | `seleccionar_ambientes_vigia` (dedupe por profundidad) y `agrupar_ambientes_por_numero`. |
| `vigia_climate_freshness.py` | 80 | Ventana de gracia del clima, 6 h por defecto (`VIGIA_CLIMATE_FRESHNESS_HOURS`). **Brechas Inteligentes también la usa.** |
| `vigia_fenologia_regresion.py` | 263 | Regresión de soja por banda latitudinal × GM × delay. `resolve_banda` y `resolve_lote_latitud` (usa `Localidad`). |
| `vigia_gdd.py` | 189 | Conversión de GDD a días. **También la usa `fenologia_promedio.py` (Análisis de Campaña).** |
| `saxton_rawls_service.py` | 365 | Pedotransferencia de Saxton & Rawls 2006. **La comparten Brechas y Pronóstico.** |
| `crypto.py` | 221 | Fernet/MultiFernet para `Empresa.credenciales_externas` (token de Unimap). Es genérico. |
| `scripts/coverage.sh` | — | Cobertura de los módulos VigIA. |

**Archivos compartidos de los que VigIA depende** (habría que copiarlos o extraerlos):
- `generar_clima_anual.py` (888 líneas, cliente WeatherAPI): `obtener_arrays_clima_anual`, `_fetch_day`, `_parse_fecha_siembra`, `_slice_210_from_yearly`.
- `cargar_clima_lotes.py` (371 líneas): `resolve_coordinates`, `years_needed`.
- `parsers/shared.py`: `strip_accents`.
- `carga_muestreos_suelo_service.py`: es la fuente de `muestreos_suelo`.
- `fenologia_promedio.py`: no es VigIA, pero consume la tabla `cultivo` de VigIA.

### 2.2 Endpoints (todos en `main.py`)

**Autenticación:**
- Bearer JWT (HS256, python-jose).
- `get_current_active_user` (`auth.py:100`) setea `db.info["org_id"/"regional_id"]` (`auth.py:61`).
- **Licencia:** la verifican `_verify_campania_vigia_access` (main.py:20630) y `_verify_lote_vigia_access` (20673). Responden 404 si la campaña o el lote no existen y 403 si la licencia no está activa o está vencida. El aislamiento por organización lo pone el filtro automático de `OrgScopedSession` sobre Lote y Campania (`database.py:38-103`).
- **Admin:** `_require_admin` (main.py:21025) chequea `rol=='admin'`. `check_allowed_user_ids` (auth.py:145) es una lista blanca de emails.

En las tablas, "usuario" significa `get_current_active_user`. Los endpoints `/vigia/*` y `/biostres/*` de lluvias y riegos son alias del mismo handler.

**Biostrés**

| Método | Ruta | Línea | Para qué | Autenticación extra |
|---|---|---|---|---|
| GET | `/biostres/cultivo-ciclos?tipo=principal\|servicio` | 20698 | Pares (cultivo, ciclo) del catálogo; oculta la fila genérica de cultivos con regresión | — |
| GET | `/biostres/cultivo-dpv-umbrales` | 20733 | Umbrales DPV promediados por cultivo. **Los consumen Pronóstico y Brechas.** | — |
| GET | `/biostres/cultivo-config?cultivo&ciclo&campania_id&reporte_id&fecha_de_siembra_override` | 20886 | Etapas fenológicas. Convierte GDD a días con el clima del reporte o aplica la regresión de soja. | licencia si viene `campania_id` |
| GET | `/biostres/admin/cultivos` | 21031 | Lista del catálogo | admin |
| GET | `/biostres/admin/cultivos/{id}` | 21046 | Detalle | admin |
| POST | `/biostres/admin/cultivos` | 21059 | Alta | admin |
| PATCH | `/biostres/admin/cultivos/{id}` | 21109 | Edición | admin |
| DELETE | `/biostres/admin/cultivos/{id}` | 21162 | Baja | admin |
| GET | `/biostres/admin/fenologia-soja` | 21213 | Bandas y regresión | admin |
| PATCH | `/biostres/admin/fenologia-soja/bandas/{id}` | 21236 | Edita una banda | admin |
| PUT | `/biostres/admin/fenologia-soja/bandas` | 21271 | Edición masiva; valida la partición | admin |
| PUT | `/biostres/admin/fenologia-soja/regresion` | 21319 | Coeficientes a/b | admin |
| POST | `/biostres/admin/fenologia-soja/preview` | 21350 | Preview de etapas | admin |
| GET | `/biostres/campanias-disponibles` | 21380 | Campañas cuyos lotes tienen licencia vigente; si no es admin, filtra por las empresas en `accesos` | licencia (join) |
| GET | `/biostres/ambiente-soil?campania_id&fecha_de_siembra` | 21432 | CC/PMP/AUI por ambiente | licencia |
| GET | `/biostres/muestreos-disponibles?campania_id` | 21482 | Muestreos del lote para elegir | licencia |
| GET | `/biostres/init-data?campania_id&reporte_id&fecha_de_siembra_override&cultivo_override` | 21632 | Todo lo que necesita la simulación (ver detalle abajo) | licencia |
| GET | `/vigia/lluvias/{campania_id}` y `/biostres/...` | 21905 | Lluvias del lote, filtradas por etiqueta de campaña | licencia |
| POST | `/vigia/lluvias` y `/biostres/...` | 21922 | Alta de lluvia | licencia |
| DELETE | `/vigia/lluvias/{id}` y `/biostres/...` | 21950 | Baja | creador o admin, más licencia |
| GET | `/vigia/riegos/{campania_id}` y `/biostres/...` | 21971 | Riegos del lote | licencia |
| POST | `/vigia/riegos` y `/biostres/...` | 21984 | Alta por `ambiente_nombre` (o lote entero) | licencia |
| DELETE | `/vigia/riegos/{id}` y `/biostres/...` | 22051 | Baja | creador o admin, más licencia |
| GET | `/biostres/reportes?empresa_id&cultivo&modulo` | 22077 | Grilla de reportes (`crud.list_reportes_vigia_biostres`) | organización y empresas del usuario |
| POST | `/biostres/reportes` | 22107 | Crea un reporte. Siempre inserta uno nuevo (ADR-0016). | licencia |
| DELETE | `/biostres/reportes/{id}` | 22141 | Borra | creador o admin |
| POST | `/biostres/refresh-climate-campania?campania_id&force&fecha_de_siembra_override` | 22165 | Clima nuevo de WeatherAPI, sin guardar (flujo "Generar") | licencia |
| POST | `/biostres/reportes/{id}/refresh-climate?force` | 22208 | Refresca el clima y lo guarda en el reporte (gracia de 6 h) | licencia |
| PATCH | `/biostres/reportes/{id}/computed-data` | 22268 | Guarda alertas, suelo, overrides, plan de riego congelado, costo, clima y nombre. **También escribe `campania.total_agua_acumulada_mm`.** | licencia |

`init-data` devuelve: clima del reporte, ambientes con su suelo resuelto, overrides, lluvias y riegos, lat/lon del lote, nombre de la empresa, etc.

**Herbicidas**

| Método | Ruta | Línea | Para qué | Autenticación extra |
|---|---|---|---|---|
| GET | `/vigia-herbicidas/campanias-disponibles` | 22394 | Delega en la de Biostrés | licencia |
| GET | `/vigia-herbicidas/campanias/{id}/suelo` | 22403 | Preview de pH, MO y arena por ambiente | licencia |
| GET | `/vigia-herbicidas/reportes?empresa_id` | 22474 | Grilla | organización y empresas |
| POST | `/vigia-herbicidas/unimap/verificar` | 22778 | Verifica credenciales Unimap y cuenta polígonos | sólo usuario |
| POST | `/vigia-herbicidas/reportes` | 22797 | Crea o upsert (un reporte por campaña y módulo). Resuelve Unimap. | licencia |
| GET | `/vigia-herbicidas/reportes/{id}` | 22906 | Detalle | organización |
| DELETE | `/vigia-herbicidas/reportes/{id}` | 22924 | Borra | creador o admin |
| GET | `/vigia-herbicidas/aplicaciones-del-lote/{campania_id}?fecha_siembra` | 23021 | Aplicaciones visibles: las de la campaña propia más las históricas hasta 730 días | licencia |
| GET | `/vigia-herbicidas/campanias-del-lote/{campania_id}` | 23203 | Campañas elegibles para una aplicación | licencia |
| POST | `/vigia-herbicidas/aplicaciones-del-lote` | 23278 | Alta de aplicación manual | licencia |
| PUT | `/vigia-herbicidas/aplicaciones-del-lote/{id}` | 23368 | Edita una aplicación manual | sólo manual; creador o admin |
| PATCH | `/vigia-herbicidas/aplicaciones-del-lote/{id}/condiciones` | 23415 | Calidad y condiciones (también en filas de planilla) | creador o admin |
| DELETE | `/vigia-herbicidas/aplicaciones-del-lote/{id}` | 23457 | Baja; afecta a todos los reportes del lote | sólo manual; creador o admin |
| PATCH | `/vigia-herbicidas/reportes/{id}/computed-data` | 23476 | Overrides de suelo, identidad, etc. | licencia |
| POST | `/vigia-herbicidas/aplicaciones` | 24290 | Lista las aplicaciones candidatas sin correr el motor | licencia |
| POST | `/vigia-herbicidas/reportes/preview` | 24408 | Corre el carry-over sin guardar (borrador, `aplicaciones_pendientes`, ADR-0032) | licencia |
| POST | `/vigia-herbicidas/reportes/{id}/compute?force` | 24564 | Calcula y guarda `computed_data` y clima. El clima y Unimap se piden en paralelo. | licencia |

**Catálogo de herbicidas (administración)**

| Método | Ruta | Línea | Para qué | Autenticación |
|---|---|---|---|---|
| GET | `/principios-activos[/]` | 18777 | Lista | usuario |
| GET | `/principios-activos/{id}` | 18794 | Detalle | usuario |
| POST | `/principios-activos` | 18808 | Alta | `check_allowed_user_ids` |
| PUT | `/principios-activos/{id}` | 18848 | Edición | `check_allowed_user_ids` |
| DELETE | `/principios-activos/{id}` | 18945 | Baja | `check_allowed_user_ids` |
| GET | `/cultivos-herbicidas` | 18991 | Cultivos del catálogo | usuario |
| GET | `/herbicidas` | 19008 | Vista por presentación | usuario |
| GET | `/vocabulario-tecnologia` | 19083 | Tokens de tecnología | usuario |
| POST | `/vocabulario-tecnologia` | 19097 | Alta | `check_allowed_user_ids` |
| PUT | `/vocabulario-tecnologia/{id}` | 19120 | Edición | `check_allowed_user_ids` |
| DELETE | `/vocabulario-tecnologia/{id}` | 19142 | Baja | `check_allowed_user_ids` |
| PATCH | `/vocabulario-tecnologia/{id}/activar` | 19161 | Reactivar | `check_allowed_user_ids` |

**Credenciales de Unimap por empresa** (main.py:4470-4720, autorización en `_verify_empresa_credenciales_access`)

| Método | Ruta | Línea |
|---|---|---|
| GET | `/empresas/{id}/credenciales` | 4540 |
| GET | `/empresas/{id}/credenciales/unimap/estado` | 4554 |
| PUT | `/empresas/{id}/credenciales/unimap` | 4598 |
| DELETE | `/empresas/{id}/credenciales/{servicio}` | 4689 |

**Endpoints de suelo que VigIA usa y comparte con otros módulos**

| Método | Ruta | Línea | Autenticación |
|---|---|---|---|
| GET | `/muestreos-suelo/perfiles` | 26020 | usuario |
| POST | `/muestreos-suelo/pedotransferencia` | 25522 | usuario |
| POST | `/admin/carga-muestreos-suelo/upload` | 4225 | admin |
| POST | `/admin/carga-muestreos-suelo/confirm` | 4290 | admin |
| POST | `/admin/carga-muestreos-suelo/cancel` | 4335 | admin |

**Helpers de `main.py` que hay que llevarse:**
- Licencias: `_exists_licencia_vigia_vigente_lote` (20465) y `_exists_licencia_vigia_vigente_empresa` (20477).
- Cultivo: `_norm_cultivo`, `_resolve_cultivo_row` (20539), `_maybe_convert_etapas_to_days` (20606), `_map_ciclo_to_gm_*` (20790-20864), `_resolve_reporte_vigia` (20864).
- Agua y aplicaciones: `_agua_del_lote` (21514), `_aplicaciones_del_lote` (21550).
- Unimap y blobs: `_get_unimap_token_for_empresa` (22545), `_merge_blob_reporte` (22614), `_resolve_unimap_for_reporte` (22703).
- Aplicaciones: `_aplicacion_*` (22947-23162), `_scope_ambiente*` (23544-23632), `_siembra_obligatoria` (23726).
- Cálculo: `_run_carry_over` (23763), `_prefetch_clima_compute` (24486), `_refrescar_unimap` (24535).
- Suelo: `_query_muestreos_lote` (25591), `_elegir_muestreo` (25674), `_muestreos_disponibles` (25746), `_arena_de_muestreo` (25789), `_suelo_herbicidas` (25805), `_resolver_suelo_ambiente` (25854), `_suelo_vigia` (25914).
- Utilidades: `_parse_any_date` (714), `_sanitize_fecha` (730), `_detect_tecnologias` (75).

### 2.3 CRUD y schemas

**`crud.py`:** sólo cubre los reportes de Biostrés.
- `create_reporte_vigia_biostres` (989)
- `get_reporte_vigia_biostres` (1067)
- `list_reportes_vigia_biostres` (1083)
- `delete_reporte_vigia_biostres` (1157)
- Funciones compartidas que usa: `get_user_empresas` (161) y `get_empresa` (119).

**`schemas.py`, clases de VigIA:**
- Credenciales y suelo: `CredencialesUnimapWrite` (141), `EmpresaCredenciales*` (159-186), `SaxtonRawls*` (387-441), `MuestreoPerfil*` (462-478).
- Reportes Biostrés: `ReporteVigiaBiostresCreate/Read/Card` (568/632/656), `BiostresClimateData` (584), `BiostresUpdateComputedData` (594), `BiostresClimateRefreshResult` (679), `BiostresAmbienteSoil*` (694-726), `BiostresMuestreo*` (733-770).
- Catálogo de herbicidas: `FilaMarbete*` (1220-1257), `PrincipioActivo*` (1264-1310), `HerbicideRead` (1314), `VocabularioTecnologia*` (1349-1365).
- Agua y simulación: `LluviaCreate/Read` (1642/1653), `RiegoCreate/Read` (1665/1686), `BiostresAmbienteItem` (1707), `BiostresInitData` (1761).
- Cultivo y fenología: `CultivoConfig*` (1858-1899), `CultivoCicloItem` (1914), `CultivoDpvUmbralItem` (2002), `FenologiaSoja*` (2015-2091), `BiostresCampaniaItem` (2096).
- Herbicidas: `HerbicidasSuelo*` (2514-2534), `HerbicidasReporteCreate` (2559), `HerbicidasAguaEvento` (2591), `HerbicidasPreviewRequest` (2608), `HerbicidasAplicacionManual` (2645), `HerbicidasProductoAplicado` (2692), `AplicacionHerbicida*` (2709-2824), `AplicacionesPendientes` (2807), `HerbicidasAplicacionesRequest` (2847), `HerbicidasReportePreview` (2877), `UnimapVerificar*` (2887/2893), `HerbicidasReporteUpdate/Read/Card` (2900/2914/2949), `CampaniaElegible` (2935).
- eCloud: `EcloudAplicacionHerbicidaL3` (2261), que se arma desde las columnas de `ambientes`, no desde tablas VigIA.

### 2.4 Modelos y tablas (`models.py`)

**Tablas propias de VigIA**

| Modelo | Tabla | Línea |
|---|---|---|
| `ReporteVigiaBiostres` | `reportes_vigia_biostres` | 276 |
| `ReporteVigiaHerbicidas` | `reportes_vigia_herbicidas` | 349 |
| `CultivoInfo` | `cultivo` | 1189 |
| `FenologiaSojaBanda` | `fenologia_soja_banda` | 1230 |
| `FenologiaSojaRegresion` | `fenologia_soja_regresion` | 1248 |
| `Lluvia` | `lluvias` | 1275 |
| `Riego` | `riegos` | 1305 |
| `AplicacionHerbicida` | `aplicaciones_herbicidas` | 1337 |
| `PrincipioActivo` | `principios_activos` | 1495 |
| `VocabularioTecnologia` | `vocabulario_tecnologia` | 1543 |
| `RotacionMarbete` | `rotacion_marbete` | 1575 |

**`reportes_vigia_biostres`**
- **Clave y scope:** `idReporte` PK; `idOrganizacion` (FK a `organizaciones.id`); `idEmpresa`; `idRegional`.
- **Lote y campaña:**
  - `id_lote` String. FK compuesta `fk_vigia_lote (id_lote, idOrganizacion, idRegional)` hacia `lotes`, ON DELETE RESTRICT.
  - `id_campania`, con FK a `campania.id` RESTRICT.
  - `campania_str`, `cultivo` y `ciclo`: clave natural denormalizada (ADR-0014).
- **Reporte:** `modulo` (default 'huella-hidrica'), `nombre_reporte`.
- **Usuarios:** `idUsuarioCreador` e `idUsuario`, con FK a `usuarios.id`.
- **Blobs JSONB:**
  - `extra_params`: fecha_de_siembra_manual, cultivo_override, ciclo_override, balance_window_anchor, fecha_secado_manual, plan_riego_congelado, costo_riego_usd_mm, muestreos_congelados.
  - `alertas_estres_combinado`.
  - `p_umbral_overrides`, `ambiente_overrides` y `stage_overrides` (`none_as_null`).
- **Suelo y riego:** `pmp_mm`, `cc_mm`, `aui_mm`, `tiene_riego`, `max_mm_riego_mensual`.
- **Clima:** `precipitaciones_210`, `humedad_210`, `temperatura_210`, `temperatura_min_210`, `temperatura_max_210`, `eto_210` (ARRAY Float).
- **Fechas:** `last_climate_refresh_at`, `created_at`, `updated_at`.
- **Sin UNIQUE** desde la 0115.

**`reportes_vigia_herbicidas`**
- Las mismas columnas de scope y lote. `fk_vigia_herbicidas_lote` RESTRICT y FK a campaña RESTRICT.
- `idUsuarioCreador` e `idUsuario` **sin FK**.
- Clima: `temperatura_diaria`, `humedad_diaria`, `precipitacion_diaria` (ARRAY) y `clima_window_inicio`.
- `computed_data`, `ambiente_overrides` y `extra_params` (JSONB); `last_climate_refresh_at`.
- UNIQUE `(id_lote, id_campania, modulo)`.

**`cultivo`**
- Columnas: `id`, `cultivo`, `ciclo`, `etapas` (JSONB `[{nombre, dias_inicio, dias_fin, kc, p_umbral, fase}]`), `max_dpv`, `min_dpv`, `gdd`, `base_temp`, `tipo_vigia` (principal/servicio), `modelo_fenologico` (NULL o 'regresion_soja'), `infiltracion_lluvia_pct`.
- UNIQUE `ux_cultivo_ciclo` sobre `(cultivo, COALESCE(ciclo,''))`.
- **Es compartida:** la usan Pronóstico y Brechas (umbrales DPV) y Análisis de Campaña (`/analisis/fenologia-promedio`, main.py:17415/17441).

**Fenología de soja**
- `fenologia_soja_banda`: `id`, `nombre` (UNIQUE), `departamento`, `lat_min`, `lat_max`.
- `fenologia_soja_regresion`: `id`, `banda_id` (FK), `grupo_madurez`, `etapa`, `orden`, `a`, `b`. UNIQUE `(banda_id, grupo_madurez, etapa)`.

**`lluvias`**
- `id`; `id_lote`, `idOrganizacion`, `idRegional` (identidad, **sin FK a lotes**); `campania_str`.
- `id_campania`: FK a campaña con SET NULL, sólo para trazabilidad.
- `id_usuario`: FK a `usuarios.id`.
- `fecha_lluvia` (String), `milimetros_agua`, `created_at`.

**`riegos`**
- Igual que `lluvias`, más `ambiente_nombre` (NULL = todo el lote) e `id_ambiente` (FK a ambientes con SET NULL; está pendiente de drop).
- El índice `ix_riegos_lote` existe sólo en la migración 0114.

**`aplicaciones_herbicidas`**
- `id`; triple del lote **sin FK**; `ambiente_nombre` (NULL = lote; `''` = ambiente sin nombre).
- `fecha_aplicacion`: String ISO.
- `productos`: JSONB `[{producto, dosis, unidad}]`.
- Condiciones del tanque: `calidad`, `condicion_corte`, `tipo_rastrojo`, `condicion_hidrica`.
- `ventana`; `origen` ('manual' o 'planilla').
- `campania_str`; `id_campania` (FK SET NULL).
- `id_usuario` **sin FK**; `created_at`, `updated_at`.
- Índices `ix_aplicaciones_herbicidas_lote` e `ix_aplicaciones_herbicidas_lote_fecha`.

**Catálogo de herbicidas**
- `principios_activos`: `nombre` (UNIQUE), `familia_quimica` (afecta F_pH, con match exacto), `koc`, `dt50`, `solubilidad`, `activo`.
- `rotacion_marbete`:
  - `id_principio_activo` (FK CASCADE), `cultivo` (NULL = sin restricción), `tecnologia`, `formulacion`, `concentracion`, `dosis_referencia`, `dias_referencia`.
  - `sensibilidad` con CHECK de 5 niveles.
  - UNIQUE con COALESCE.
- `vocabulario_tecnologia`: `token` (UNIQUE), `descripcion`, `activo`.

**Tablas compartidas que VigIA lee o escribe**
- `licencias` (1451): la columna `vigia` y `fecha_expiracion`.
- `muestreos_suelo` (1784): PK `(id_lote, idOrganizacion, idRegional, numero_de_ambiente, fecha_de_muestreo)`, con FK a lotes.
- `lotes`, `campania` (escribe `total_agua_acumulada_mm`), `ambientes` (suelo, coordenadas, variedad/ciclo, `tipo_de_evento_biotecnologico`, las columnas wide de aplicaciones residuales y `riego_*`).
- `empresas` (`credenciales_externas`), `usuarios`, `organizaciones`, `localidades`.

**Filtro automático por organización:**
- `database._add_org_filter` (database.py:38) sólo cubre Empresa, Usuario, Acceso, Organizacion, Regional, Lote y Campania.
- **Ninguna tabla VigIA está cubierta.** Todas filtran a mano por `idOrganizacion` o pasando por el lote o la campaña.

### 2.5 Jobs, schedulers y workers

**No hay ninguno.** No existen APScheduler, Celery, cron ni BackgroundTasks de VigIA.
- El `lifespan` (main.py:156) sólo limpia uploads.
- El clima se refresca bajo demanda: al abrir el reporte (con gracia de 6 h), con el botón "Actualizar clima" (`force`) o al guardar.
- Unimap se refresca dentro de `compute` cuando venció el clima.
- La carga de lotes (`carga_lotes_jobs.py`, `asyncio.create_task` + thread) es del núcleo, pero toca VigIA (ver la sección 5).

### 2.6 Integraciones externas

**WeatherAPI** (`http://api.weatherapi.com/v1`, endpoints history, forecast y future)
- Pasa por `generar_clima_anual.py:19-20` y `_fetch_day`.
- Biostrés pide los 210 días alrededor de la siembra, con pronóstico. Herbicidas pide una ventana contigua y rellena con climatología.
- No usa la tabla `climas` (ADR-0030).
- Detalle de despliegue: el DNS 1.1.1.1/8.8.8.8 en `docker/docker-compose.dev.yml` y `docker/docker-compose.prod.yml` existe por la latencia de WeatherAPI.

**Unimap / Acronex** (`https://unimap.acronex.com/api/`, `unimap_service.py:86`)
- Endpoints: `POST /auth`, `/poligonos/?full=1`, `/estadistica_poligono`, `/preaplicacion/`.
- Header `Authorization: Token`.
- El token se guarda cifrado en `Empresa.credenciales_externas.unimap.token_enc`. Las credenciales viejas con `password_enc` se convierten a token en el primer uso (main.py:22545).

**Lo que no usa:** imágenes satelitales, LLM/IA (OpenAI, Anthropic, Gemini), WhatsApp, email ni push.

### 2.7 Variables de entorno y configuración

| Variable | Dónde | Uso |
|---|---|---|
| `WEATHER_API_KEY` | `generar_clima_anual.py:19` | Clima de los dos submódulos |
| `VIGIA_CLIMATE_FRESHNESS_HOURS` | `vigia_climate_freshness.py:41` | Gracia del clima (default 6, 0 la desactiva). No aparece en docker-compose. |
| `CREDENTIALS_KEY` (si falta, se deriva de `SECRET_KEY` con HKDF) | `crypto.py:63-64,120-124`; `docker/docker-compose.base.yml:46-61` | Cifrado del token de Unimap |
| `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES` | `auth.py:16,18` | JWT |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT`, `DOCKER_ENV` | `database.py:7-14` | Base de datos |

En el frontend no hay variables propias de VigIA. Sólo `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_BACKEND_URL` y `BACKEND_URL` (`frontend/src/lib/api.ts:8,16`).

**Dependencias Python:**
- Usadas por VigIA: httpx 0.25.2, sqlalchemy 2.0.23, psycopg2, alembic 1.12.1, fastapi 0.104.1, python-jose, passlib/bcrypt, cryptography 49.0.0, pandas y openpyxl (carga de muestreos).
- Los motores usan sólo `math`; numpy y scikit-learn no son de VigIA.

---

## 3. Migraciones de Alembic (`backend/alembic/versions/`)

La cabeza actual es `0136`. Faltan los números 0052, 0053, 0085, 0111 y 0112. Las migraciones 0054, 0055 y 0056 se renumeraron desde 0051, 0052 y 0053.

**Reportes de Biostrés**

| Migración | Qué hace |
|---|---|
| 0008_create_reportes_vigia_biostres | Crea la tabla, con UNIQUE (lote, campaña) y FKs CASCADE. Agrega `campania.total_agua_acumulada_mm`. |
| 0012_lote_id_to_string | `id_lote` pasa a VARCHAR. |
| 0016_empresas_composite_pk_and_id_sync | Sincroniza `idEmpresa`. |
| 0018_lotes_composite_pk_org_propagation | Crea la FK compuesta `fk_vigia_lote`. |
| 0024_add_p_umbral_overrides | — |
| 0025b_add_ambiente_overrides | El docstring dice 0025. |
| 0028_add_modulo_to_reportes_biostres | `modulo` y UNIQUE (lote, campaña, módulo). |
| 0037_add_climate_to_reportes_vigia | Seis arrays `*_210`. |
| 0040_vigia_fk_restrict | FKs a RESTRICT. |
| 0041_add_stage_overrides_to_reportes_vigia | — |
| 0113_reportes_vigia_clave_natural | `campania_str`, `cultivo` y `ciclo` en las dos tablas de reportes, con backfill. |
| 0115_varios_reportes_vigia_por_campania | Drop del UNIQUE de Biostrés. |
| 0116_nombre_reporte_vigia | — |
| 0124_descongela_los_meses_con_riego_del_dia_1 | Sólo datos. |
| 0136_congela_el_muestreo_de_los_reportes_vigia | Sólo datos (`extra_params.muestreos_congelados`). Usa `saxton_rawls_service` y `carry_over_report`. |

**Catálogo de cultivos**

| Migración | Qué hace |
|---|---|
| 0010_update_cultivo_fenological_stages | Etapas de 6 cultivos. |
| 0013_cultivo_etapas_jsonb | Agrega `etapas` JSONB. |
| 0014_simplify_etapas_add_dpv | Agrega `max_dpv` y `min_dpv`. |
| 0022_fix_cultivo_etapas_dpv_values | — |
| 0023_update_cultivo_data_drop_ciclo | — |
| 0029_update_cultivo_dpv_thresholds | — |
| 0033_update_cultivo_stage_order | — |
| 0034_consolidate_etapas_jsonb | Borra las columnas legacy. |
| 0035_update_cultivo_etapas_from_json | Lee `backend/data/cultivo_etapas.json`. |
| 0036_add_ciclo_to_cultivo_campania | `ux_cultivo_ciclo` y `campania.ciclo`. |
| 0038_update_last_etapa_fase_to_madurez | — |
| 0039_seed_girasol_ciclos | — |
| 0046_add_gdd_to_cultivo | — |
| 0047_seed_cultivo_etapas_with_gdd | — |
| 0048_add_tipo_vigia_to_cultivo | Con CHECK. |
| 0086_cultivo_infiltracion_lluvia | — |
| 0087_soja_fenologia_regresion | `modelo_fenologico` y las dos tablas de soja, con seed de 3 bandas y 63 coeficientes; agrega 3 filas GM. |
| 0089_soja_fenologia_seed_repair | — |

**Agua**

| Migración | Qué hace |
|---|---|
| 0006_sync_schema_with_models | FKs de lluvias y riegos hacia campaña. |
| 0092_riegos_id_ambiente | — |
| 0114_agua_por_lote_y_ambiente_nombre | Triple del lote, `ambiente_nombre`, SET NULL, `ix_riegos_lote` e `ix_lluvias_lote`. |
| 0117_realinear_agua_al_lote_de_su_campania | — |
| 0118_campania_str_en_el_agua | — |
| 0119_riegos_huerfanos_que_no_son_del_lote | Borra o reparte riegos huérfanos. |
| 0120_liberar_el_agua_atrapada_en_los_blobs | — |
| 0121_el_agua_sale_del_blob | — |
| 0129_riego_flag_coherente_con_mm | Toca `ambientes`. |

**Reportes y aplicaciones de Herbicidas**

| Migración | Qué hace |
|---|---|
| 0054_create_reportes_vigia_herbicidas | Crea la tabla. |
| 0056_herbicidas_add_extra_params | — |
| 0122_precipitacion_diaria_en_el_reporte_de_herbicidas | — |
| 0125_las_aplicaciones_de_herbicidas_son_del_lote | Crea `aplicaciones_herbicidas`. |
| 0126_liberar_las_aplicaciones_atrapadas_en_los_blobs | Unas 4.739 filas de planilla en dev. |
| 0107_ambiente_coordenadas | `ambientes.latitud` y `longitud`. |
| 0135_more_residual_applications_on_ambientes | 48 columnas en `ambientes`. |

**Catálogo de herbicidas**

| Migración | Qué hace |
|---|---|
| 0049 | Drop de `herbicides_crop_rules`. |
| 0050 | Simplifica `herbicides`. |
| 0055 | Seed de 59 principios activos. |
| 0060 | `solubilidad` y `residualidad`. |
| 0061 | Crea `herbicide_crop_sensitivity`. |
| 0062 | Familia química. |
| 0066 | Crea `rotacion_marbete`. |
| 0067, 0068, 0069 | Seeds y backfills. |
| 0071, 0072, 0073 | `marcas_comerciales`. |
| 0074, 0075, 0076, 0077 | Seeds y backfills. |
| 0078 | Marbete por formulación (299 filas). |
| 0079, 0080 | Presentaciones. |
| 0081 | Crea `vocabulario_tecnologia` con seed (Enlist, STS, RR, CL, Powercore Ultra). |
| 0083, 0084 | Fotodegradación. |
| 0090 | Correcciones contra la planilla v11. |
| 0091 | Familia química en el marbete. |
| **0127_principios_activos_y_marbete_por_tecnologia** | Crea `principios_activos`. Reestructura `rotacion_marbete` (FK CASCADE, CHECK de sensibilidad, UNIQUE con COALESCE). Borra `herbicides`, `herbicide_crop_sensitivity` y `marcas_comerciales`. El downgrade no restaura los datos. |
| 0128_la_sensibilidad_del_marbete_sale_de_la_planilla | — |

**Suelo y clima**

| Migración | Qué hace |
|---|---|
| 0063_create_muestreos_suelo | Crea `muestreos_suelo`. |
| 0057_climas_unique_coord_year | Toca `climas`. |
| 0133_clima_actualizado_en_reportes_brechas_inteligentes | Es de Brechas Inteligentes, pero usa la gracia de VigIA. |

**Históricas fuera de `backend/alembic`:**
- `alembic/versions/n001_normalize_database_schema.py` crea `cultivo`, `licencias` (con `vigia`), `lluvias` y `riegos`.
- `t4u5v6w7x8y9_crear_tabla_herbicides.py`.
- `backend/migrations/create_brechas_tables.sql` y `add_herbicides_admin_columns.sql`.

**Las mencionan sin cambiar tablas VigIA:** 0005, 0019, 0032, 0044, 0058 y 0070.

---

## 4. Frontend (`frontend/src`)

**Stack:** Next.js 15.5.9, React 19, TypeScript strict, axios. Gráficos con recharts ^3.1.0, PDF con @react-pdf/renderer ^4.3.2 (con el parche `scripts/patch-react-pdf-paginate.js`), html2canvas como respaldo, íconos lucide-react y react-icons. **VigIA no usa mapas** (leaflet está instalado, pero lo usa Pronóstico). **No hay i18n:** todo está en español, hardcodeado.

### 4.1 Rutas

**Biostrés**
- `app/vig-ia-biostres/layout.tsx`: `ProtectedRoute` + `BiostresFiltersProvider`.
- `page.tsx`: el hub. Sus tres tarjetas enlazan a Mitigación de Estrés, Cultivo de Servicio y Herbicidas.
- `mitigacion-de-estres/`: `page.tsx` crea, `reportes/page.tsx` lista, `reporte/page.tsx?reportId=` muestra.
- `cultivo-de-servicio/`: las mismas tres páginas.
- Redirecciones legacy: `huella-hidrica/{,reporte,reportes}`, `reporte` y `reportes`.
- Configuración: `configuracion/page.tsx`, `configuracion/cultivos/page.tsx`, `configuracion/cultivos/[id]/page.tsx` (802 líneas) y `configuracion/fenologia-soja/page.tsx` (475).

**Herbicidas**
- `app/vig-ia-herbicidas/layout.tsx`: sólo `ProtectedRoute`.
- `page.tsx` (656): lista.
- `nuevo/page.tsx` (952): crea con preview en borrador.
- `reporte/page.tsx` (193): visor que llama a `compute`.

**Administración**
- `app/admin/gestion-herbicidas/page.tsx` y `[id]/page.tsx`, más `paEditorReducer.ts`, `types.ts` y `components/` (`CultivoModal`, `CultivoTabs`, `EliminarPrincipioActivoModal`, `EstadoActivoToggle`, `FilaEditor`, `FilasTable`, `PropiedadesPAHeader`).
- `app/admin/gestion-vocabulario-tecnologia/page.tsx`.
- `app/admin/gestion-credenciales/page.tsx` (Unimap).
- `app/admin/carga-lotes/page.tsx`: `VigiaRelinkPanel` (l.94-109, 1513-1516) y tipos en `types.ts:72-80`.
- `app/admin/gestion-licencias/{page,edit/page}.tsx`: el flag `vigia`.

### 4.2 Componentes

**`components/biostres/`**

| Archivo | Líneas | Qué es |
|---|---|---|
| `BiostressDashboard.tsx` | 4652 | Pantalla principal |
| `BiostresHomeScreen.tsx` | 739 | Lista de reportes |
| `BiostresConfigForm.tsx` | 720 | Formulario de generación |
| `BiostresPDFDocument.tsx` | 1805 | PDF |
| `BalanceHidricoChart.tsx` | 874 | Gráfico del balance |
| `LluviaRiegoChart.tsx` | 562 | Lluvia y riego |
| `DpvChart.tsx` | — | DPV diario |
| `RiegoPredictionChart.tsx` | — | Plan de riego |
| `CostoRiegoChart.tsx` | — | Costo del riego |
| `StressDotChart.tsx` | — | Oculto |
| `GaugeArc.tsx` | — | Gauges |
| `AlertPanel.tsx` | — | Alertas |
| `AuMuestreoPanel.tsx` | — | Chequeos de AU% |
| `LluviaPanel.tsx` | — | Alta y baja de lluvias |
| `RiegoPanel.tsx` | — | Alta y baja de riegos |
| `MuestreoSelector.tsx` | — | Elección de muestreo |
| `StageRangeSlider.tsx` | — | Slider de etapas |
| `EtapasDescripcionPanel.tsx` | — | Descripción de etapas |
| `StageLabel.tsx`, `MadurezFisiologicaLabel.tsx`, `markerLabels.tsx` | — | Etiquetas de gráficos |
| `BiostressSidebar.tsx` | — | Sin uso salvo `CROP_COLORS` |

**Motores y utilidades de `components/biostres/`:**
- Motores: `waterBalanceEngine.ts` (FAO-56), `dpvEngine.ts`, `dpvEpisodes.ts`, `alertEngine.ts`, `riegoDeficitEngine.ts`, `riegoPredictionEngine.ts` (deshabilitado), `riegoLineEngine.ts`, `costoRiegoEngine.ts`.
- Utilidades: `ofertaHidrica.ts`, `muestreoSeleccion.ts`, `seedAmbienteOverrides.ts`, `statusTint.ts`, `fechaAgua.ts`.
- Configuración: `cropConfig.ts` (constantes; los datos de etapas están `@deprecated` en l.174) y `moduleConfig.ts` (`MODULE_REGISTRY`).

**`components/herbicidas/`**

| Archivo | Líneas | Qué es |
|---|---|---|
| `CarryOverDashboard.tsx` | 5569 | Dashboard del reporte; incluye `UnimapPanel` interno |
| `CarryOverChart.tsx` | — | Curva de concentración residual |
| `ClimateWindowChart.tsx` | — | T y HR de la ventana de cálculo |
| `LluviaRiegoChart.tsx` | — | Lluvia y riego |
| `ConcentracionesTable.tsx` | 1099 | Tabla por principio activo |
| `CultivoSiembraPanel.tsx` | — | Cultivo, siembra y tecnología |
| `HerbicidasPDFDocument.tsx` | 1137 | PDF |

Utilidades: `acumulado.ts`, `aplicacionManual.ts`, `aplicacionesPendientes.ts`, `computedData.ts`, `derivados.ts`, `detalleFila.ts`, `identidad.ts`, `ventanaSiembra.ts`.

**Otros archivos de VigIA o compartidos con ella:**
- `components/credenciales/CredencialesUnimapForm.tsx`.
- `contexts/BiostresFiltersContext.tsx` (144).
- `lib/pdf/captureBiostresCharts.ts`, `BiostresChartCaptureHarness.tsx`, `captureHerbicidasCharts.ts`, `HerbicidasChartCaptureHarness.tsx`.
- `lib/herbicidas/formulaciones.ts` y `uid.ts`.
- Assets: `public/vigia.png`, `vigia-biostres-logo*.png`, `vigia-logo-header.png`, `acronex-logo.png`.

### 4.3 Cliente de API (`lib/api.ts`, 4341 líneas)

**Base:** axios con el token en `sessionStorage.token` (l.34).

**`biostresAPI`** (l.3111-3330; tipos en l.2626-3108):

| Función | Endpoint |
|---|---|
| `getCultivoConfig` | GET `/biostres/cultivo-config` |
| `getCultivoCiclos` | GET `/biostres/cultivo-ciclos` |
| `getCultivoDpvUmbrales` | GET `/biostres/cultivo-dpv-umbrales` |
| `adminListCultivos`, `adminGetCultivo`, `adminCreateCultivo`, `adminUpdateCultivo`, `adminDeleteCultivo` | `/biostres/admin/cultivos` |
| `adminGetFenologiaSoja`, `adminUpdateFenologiaSojaBanda(s)`, `adminUpdateFenologiaSojaRegresion`, `adminPreviewFenologiaSoja` | `/biostres/admin/fenologia-soja` |
| `getCampaniasDisponibles` | GET `/biostres/campanias-disponibles` |
| `getAmbienteSoil` | GET `/biostres/ambiente-soil` |
| `getMuestreosDisponibles` | GET `/biostres/muestreos-disponibles` |
| `getInitData` | GET `/biostres/init-data` |
| `getLluvias`, `createLluvia`, `deleteLluvia` | `/biostres/lluvias` |
| `getRiegos`, `createRiego`, `deleteRiego` | `/biostres/riegos` |
| `listReportes`, `createReporte`, `deleteReporte` | `/biostres/reportes` |
| `refreshClimateCampania` | POST `/biostres/refresh-climate-campania` |
| `refreshReporteClimate` | POST `/biostres/reportes/{id}/refresh-climate` |
| `updateComputedData` | PATCH `/biostres/reportes/{id}/computed-data` |

**`carryOverAPI`** (l.3928-4120; tipos en l.3331-3926):

| Función | Endpoint |
|---|---|
| `getCampaniasDisponibles` | GET `/vigia-herbicidas/campanias-disponibles` |
| `getCampaniaSuelo` | GET `/vigia-herbicidas/campanias/{id}/suelo` |
| `listReportes`, `createReporte`, `getReporte`, `deleteReporte` | `/vigia-herbicidas/reportes` |
| `listAplicaciones` | POST `/vigia-herbicidas/aplicaciones` |
| `preview` | POST `/vigia-herbicidas/reportes/preview` |
| `verifyUnimap` | POST `/vigia-herbicidas/unimap/verificar` (sin uso) |
| `compute` | POST `/vigia-herbicidas/reportes/{id}/compute` |
| `updateComputedData` | PATCH `/vigia-herbicidas/reportes/{id}/computed-data` |
| `listAplicacionesLote`, `createAplicacionLote`, `updateAplicacionLote`, `setCondicionesAplicacionLote`, `deleteAplicacionLote` | `/vigia-herbicidas/aplicaciones-del-lote` |
| `listCampaniasDelLote` | GET `/vigia-herbicidas/campanias-del-lote/{id}` |

`CarryOverDashboard` reutiliza las funciones de lluvias y riegos de `biostresAPI` (l.1322-1323 y 2744-2761).

**Otros clientes:**

| Objeto | Línea | Endpoints |
|---|---|---|
| `herbicidasAPI` | 1414 | `/herbicidas/` |
| `principiosActivosAPI` | 4306 | `/principios-activos/` |
| `cultivosHerbicidasAPI` | 4335 | `/cultivos-herbicidas/` |
| `vocTecnologiaAPI` | 4213 | `/vocabulario-tecnologia/` |
| `empresaCredencialesAPI` | 4167 | `/empresas/{id}/credenciales*` |
| `muestreosSueloAPI.listPerfiles` | 1873 | `/muestreos-suelo/perfiles` (lo usa `BiostressDashboard.tsx:2351`) |
| `cargaMuestreosSueloAPI` | 1768 | `/admin/carga-muestreos-suelo/*` |
| `licenciasAPI` | 1913 | `/admin/licencias` (campo `vigia` en l.1925) |

### 4.4 Estado del navegador y flags

- **localStorage:**
  - `biostres_{orgId}_empresaId`, `_campo`, `_loteId` (`BiostresFiltersContext.tsx:60-117`).
  - `biostres_lluvia_vista` y `_periodo`.
  - `herbicidas:panel:*` (`CarryOverDashboard.tsx:203-212`).
- **sessionStorage:**
  - `vigia_biostres_reportes_{modulo}_*` y `vigia_herbicidas_reportes_*` (filtros y plegado).
  - `admin_gestion_herbicidas_*`.
  - `?reset=1` limpia esas claves.
- **Feature flags:** no hay. Sólo las banderas de comportamiento de `MODULE_REGISTRY` (`injectBarbechoCurve`, `useFlatPUmbral`).

---

## 5. Acoplamientos con el resto de RindePlus (lo crítico para el split)

### Base de datos y modelos

1. **Lotes.**
   - `reportes_vigia_biostres` y `reportes_vigia_herbicidas` tienen FK compuesta RESTRICT hacia `lotes(id, idOrganizacion, idRegional)` (`models.py:325-331` y `392-398`).
   - Lluvias, riegos y aplicaciones guardan ese triple sin FK (`models.py:1288-1290`, `1320-1322`, `1372-1374`).
   - `lotes.id` no es único entre organizaciones ni regionales.
2. **Campaña.**
   - Hay FK a `campania.id`: RESTRICT en los reportes (`models.py:286` y `365`) y SET NULL en el agua y las aplicaciones (`models.py:1297`, `1329`, `1415`).
   - Lee `campania.fecha_de_siembra`, `cultivo`, `ciclo`, `campania` (la etiqueta) y `localidad_id`.
   - **Escribe `campania.total_agua_acumulada_mm`** (main.py:22285-22288).
   - Las relaciones inversas están en `Campania` (`models.py:556-563`).
3. **Ambientes.**
   - VigIA usa `ambientes` para el suelo (pmp/cc/aui, pH, MO, textura), `numero_de_ambiente` (clave), `superficie_del_ambiente_ha`, `latitud`/`longitud`, `tipo_de_evento_biotecnologico`, las columnas wide de aplicaciones residuales y post-emergencia (fuente de las aplicaciones de planilla) y `riego_*`.
   - Los lugares: main.py:21660-21667, 22430, 23850-23890, 24335; `riegos.id_ambiente` hacia `ambientes.id` (`models.py:1331`).
4. **Muestreos de suelo** (`muestreos_suelo`, `models.py:1784`).
   - Son la fuente de CC/PMP/AUI y arena: `_query_muestreos_lote` (main.py:25591).
   - Los carga el núcleo con `/admin/carga-muestreos-suelo` (main.py:4225-4345, `carga_muestreos_suelo_service.py`).
   - Brechas Inteligentes también los usa.
5. **Licencias.**
   - `licencias.vigia` más `fecha_expiracion`, a través de `lotes.id_licencia` (`models.py:1451-1466`).
   - Se verifican en main.py:20465-20696 y 21388-21397.
   - Se administran en el núcleo: `/admin/licencias*` (main.py:3244-3405) y la pantalla `gestion-licencias`.
   - La carga masiva crea licencias con `vigia=True` por defecto (`carga_lotes_service.py:1349-1352`) y las restaura (`carga_lotes_service.py:1100-1116`).
6. **Empresas y accesos.**
   - Join con Empresa en todas las grillas (`crud.py:1083+`, main.py:22490-22495).
   - `crud.get_user_empresas` filtra a los usuarios que no son admin (main.py:21401, 22085, 22482).
   - `Empresa.credenciales_externas` guarda el token de Unimap (`models.py:58-75`; main.py:4470-4720 y 22545-22610).
7. **Usuarios y organizaciones.**
   - FK `idOrganizacion` a `organizaciones.id`.
   - `idUsuarioCreador` e `idUsuario` tienen FK a `usuarios.id` en Biostrés (`models.py:299-300`) y no la tienen en Herbicidas.
   - Lluvias y riegos tienen `id_usuario` con FK a usuarios (`models.py:1298` y `1330`).
   - La grilla de Herbicidas hace join con `Usuario.nombre` (main.py:22496).
8. **Localidad.** `vigia_fenologia_regresion.resolve_lote_latitud` cae a la localidad de la campaña (l.126). `cargar_clima_lotes.resolve_coordinates` también la usa (main.py:22678).
9. **Tabla `cultivo`, compartida a la inversa.**
   - La consumen Pronóstico y Brechas (`/biostres/cultivo-dpv-umbrales`; frontend `components/pronostico/useDpvUmbrales.ts:18`, `dpvUmbrales.ts`, `DpvDailyChart.tsx`, `CultivoDpvToggle.tsx`).
   - También Análisis de Campaña (main.py:17415 y `/analisis/fenologia-promedio` en 17441, a través de `fenologia_promedio.py`, que importa `vigia_gdd`).
   - Al separar VigIA, estos módulos necesitan una copia o una API.

### Lógica del núcleo que toca datos VigIA

10. **Carga masiva de lotes** (`carga_lotes_service.py`):
    - `_MODELOS_REPORTE` (l.436) y `_campanias_con_reportes` (l.455): preserva las campañas con reportes.
    - `_sincronizar_clave_natural` (l.472) y `_resolver_campania_reporte` (l.478): cascada de ADR-0014.
    - `_repuntar_reportes_vigia` (l.533): UPDATE de `id_campania`.
    - Borra las campañas preservadas que quedaron huérfanas (~l.660).
    - `_firma_aplicacion` y `_regenerar_aplicaciones_planilla` (~l.700-870): regenera `aplicaciones_herbicidas` con `origen='planilla'` usando `carry_over_report`.
    - Resultado `reportes_vigia_relink` (l.1542-1547 y 1672-1673), que muestra `VigiaRelinkPanel` en el frontend.
11. **`DELETE /lotes/{lote_id}`** (main.py:5767-5815):
    - Bloquea con 409 si hay reportes de Biostrés.
    - Borra lluvias y riegos.
    - **No contempla los reportes de Herbicidas** (el FK RESTRICT daría un IntegrityError, o sea un 500) **ni `aplicaciones_herbicidas`**, que quedarían huérfanas porque no tienen FK.
12. **`backend/scripts/import_org_lotes.py`:** exige `--allow-vigia-loss`. Borra el agua por `id_campania` (modelo previo a ADR-0015) e ignora las tablas de Herbicidas.
13. **`scripts/reporte_org_regional.py`:** lee las dos tablas de reportes VigIA.
14. **eCloud/caminoar API** (main.py:24936-25163; `docs/ecloud-api.md`): expone las aplicaciones de herbicidas desde las columnas de `ambientes`, no desde las tablas VigIA.

### Infraestructura compartida

15. **Autenticación:**
    - JWT, `get_current_active_user` (`auth.py:61-103`) y `OrgScopedSession` (`database.py:25-103`).
    - Roles: `rol=='admin'` inline; `check_allowed_user_ids` (`auth.py:129-152`) para el catálogo de herbicidas y el vocabulario de tecnología.
    - Frontend: `AuthContext` (`role`, `orgId`), `ProtectedRoute` e `isAdminAllowed` (`app/admin/constants.ts:17-28`, lista de emails).
16. **Clima:**
    - `generar_clima_anual.py` (cliente WeatherAPI) y `cargar_clima_lotes.py` (coordenadas).
    - `vigia_climate_freshness.py` lo comparte Brechas Inteligentes (`brechas_inteligentes_climate_service.py:47`).
17. **Suelo:** `saxton_rawls_service.py` (importado en main.py:13) y los helpers `_resolver_suelo_ambiente` y compañía (main.py:25591-26053), que comparte la cascada AUI de Brechas Inteligentes.
18. **Utilidades:** `parsers/shared.strip_accents` y `crypto.py`.

### Frontend compartido

19. **Componentes del núcleo:**
    - `AppHeader`, `ProtectedRoute`, `AuthContext`.
    - `ui/DateField`, `ui/PdfFileNameModal`, `ui/NavArrows`, `ui/SalirSinGuardarModal`, `SearchableSelect`, `MultiSelectFilter`.
    - `components/brechas/AUISection` (lo usa `BiostressDashboard.tsx:45`; tiene ramas VigIA en `AUISection.tsx:40,157,217,232`).
20. **Librerías del núcleo:**
    - `@/lib/brechas/auiSummary`, `@/lib/brechas/ambiente`, `@/lib/brechas/durezaCorregida`, `@/lib/brechas-cultivo`.
    - `@/lib/date-display`, `useSessionStorageState`, `useLocalStorageState`, `@/utils/cultivoUtils`, `@/lib/utils`.
    - PDF compartido: `lib/pdf/svgToPng.ts`, `AtomicBlock.tsx`, `setup.ts`, `captureAuiSection.tsx`.
21. **Marca por organización:** fija en el código según `orgId` (3 Aapresid, 4 Agroconsultor, 6 SpeedAgro) en `BiostressDashboard.tsx:626-635` y `CarryOverDashboard.tsx:1308-1310`.
22. **Puntos de entrada desde el núcleo:**
    - `HomeScreen.tsx:45-48,157-168`: botón "VigIA Manejo de Estrés", siempre visible.
    - `Notificaciones.tsx:18`: novedad de mayo 2026.
    - Logos "Powered by VigIA" en `dashboard/page.tsx:1320-1331`, `ClimateForecast.tsx:1639`, `InteraccionesClimaticas.tsx:1706`, `ClimaSection.tsx:683`, `CropDetail.tsx:2042`, `ClimaLocalidadModal.tsx:465` y `PronosticoRendimientoView.tsx:13062`.

### Infraestructura

23. **Misma base y mismo despliegue.** VigIA comparte con RindePlus la base PostgreSQL, las imágenes de GHCR y la configuración de `docker/docker-compose.base.yml:35-61`.
24. **Una sola cadena de Alembic.** Las migraciones de VigIA están intercaladas en la cadena lineal de RindePlus, así que no se pueden separar como branch. El nuevo sistema necesita una migración inicial propia que cree el esquema actual, más un script de copia de datos.

**Billing y planes:** no hay. El único "plan" es la licencia booleana `vigia` por lote, con fecha de expiración.

---

## 6. Flujo de punta a punta

**Preparación (núcleo de RindePlus):**
1. Un admin carga el Excel de lotes en `/admin/carga-lotes`. Se crean `lotes`, `campania` y `ambientes` con el suelo y las aplicaciones de la planilla, más licencias con `vigia=True` por defecto. Se derivan `aplicaciones_herbicidas` con `origen='planilla'` y se re-apuntan los reportes existentes.
2. Opcionalmente se cargan muestreos de suelo (`/admin/carga-muestreos-suelo`) y se habilitan o vencen licencias (`/admin/licencias`).
3. Un admin mantiene el catálogo: cultivos, etapas, DPV y GDD (`/vig-ia-biostres/configuracion`), fenología de soja, principios activos y marbete (`/admin/gestion-herbicidas`) y el vocabulario de tecnología.
4. Para Unimap, se guardan las credenciales de cada empresa (`/admin/gestion-credenciales`, que llama a `PUT /empresas/{id}/credenciales/unimap`).

**Biostrés:**
1. El usuario entra a `/vig-ia-biostres` → Mitigación de Estrés → nuevo.
2. `BiostresConfigForm` llama a `GET /biostres/campanias-disponibles` (sólo lotes con licencia vigente) y arma la cascada empresa/campo/lote/campaña. Con `GET /biostres/cultivo-ciclos?tipo=` elige cultivo y ciclo, con `GET /biostres/ambiente-soil` y `/biostres/muestreos-disponibles` resuelve el suelo, y con `GET /biostres/cultivo-config` obtiene la fenología.
3. Al apretar "Generar", `POST /biostres/refresh-climate-campania` pide a WeatherAPI los 210 días con pronóstico, sin guardar nada. Después `GET /biostres/init-data` trae ambientes, agua y overrides.
4. El navegador corre `waterBalanceEngine`, `dpvEngine`, `alertEngine` y `riegoDeficitEngine`. Muestra gauges, alertas (estrés hídrico actual y a t+4, DPV sostenido, riesgo fúngico, estrés combinado), el plan de riego y los costos.
5. Al guardar:
   - `POST /biostres/reportes` crea la fila.
   - `PATCH .../computed-data` guarda clima, alertas, suelo y overrides.
   - Las lluvias y riegos van a `POST /vigia/lluvias|riegos`, que son tablas del lote.
6. Al reabrir: `POST /biostres/reportes/{id}/refresh-climate` (omite el fetch si el clima tiene menos de 6 h) y `GET init-data?reporte_id`. La simulación vuelve a correr y se puede exportar el PDF.
7. **No hay entrega push de alertas:** el usuario las ve al abrir el reporte.

**Herbicidas:**
1. En `/vig-ia-herbicidas/nuevo`: `GET campanias-disponibles`, `GET campanias/{id}/suelo` y `GET /empresas/{id}/credenciales/unimap/estado`.
2. `POST /vigia-herbicidas/reportes/preview` corre `_run_carry_over` sin guardar: aplicaciones de planilla, manuales, heredadas y de Unimap; catálogo; clima de WeatherAPI; motor.
3. "Guardar" llama a `POST /vigia-herbicidas/reportes` (upsert), a los endpoints de alta y edición de `aplicaciones-del-lote` y a `PATCH computed-data`. Después `POST .../compute?force=true` guarda `computed_data` y el clima.
4. Al reabrir, `compute` reusa el clima si está fresco. Si no, refresca el clima y Unimap en paralelo.
5. Se muestran las curvas de concentración, RCO/RF, los días seguros hasta la siembra y el estado. Se puede exportar el PDF.

---

## 7. Documentación, TODOs, problemas conocidos y flags

**ADRs de VigIA** (`docs/adr/`):

| ADR | Qué decide |
|---|---|
| 0008 | Carry-over dosis-dependiente. Reemplazado por 0009. |
| 0009 | Parámetros y salidas del motor (sin archivo propio en la búsqueda). |
| 0013 | El estado por ambiente se indexa por `clave_ambiente(numero_de_ambiente)`, nunca por el PK. |
| 0014 | El reporte guarda su clave natural; `id_campania` es un puntero que se re-apunta. Hay otro 0014 de Brechas con el mismo número. |
| 0015 | El agua cuelga del lote con el triple; el ambiente se identifica por nombre. |
| 0016 | Varios reportes de Biostrés por campaña, con `nombre_reporte`. |
| 0017 | El agua se acota por la etiqueta `campania_str`. |
| 0018 | El agua sale del blob; las tablas son la única fuente. |
| 0019 | Gracia de 6 h para el clima. |
| 0020 | Recalibración de F_MO, F_Koc y F_Sol: el 23 % de los veredictos cambia. |
| 0021 | Las aplicaciones de herbicidas son del lote; la visibilidad se decide por fecha. |
| 0022 | Aplicaciones heredadas; reconciliación de las de planilla. |
| 0023 | Curva de residuo aunque no haya marbete. |
| 0024 | La fecha de siembra es obligatoria. |
| 0025 | El catálogo es un árbol `principios_activos` → `rotacion_marbete`. |
| 0026 | Identidad del reporte de herbicidas editable por overrides. |
| 0027 | Eje fijo de siembra −60 a +180. |
| 0028 | Suma por principio activo y concentración. |
| 0029 | Días de espera calculados sobre la misma serie del RCO. |
| 0030 | El clima de VigIA sale sólo de la API o del reporte. |
| 0031 | Clima actualizado de Brechas Inteligentes (comparte la gracia). |
| 0032 | Las aplicaciones se guardan recién al guardar, con un diff en el preview. |

**Otros documentos:**
- **Runbooks:** `docs/runbooks/vigia-no-guarda-un-campo-del-reporte.md` (claves huérfanas en `ambiente_overrides`), `vigia-reporte-nuevo-sin-agua.md` (ids `local-*`, lote homónimo de otro regional, etiqueta de campaña) y `vigia-riegos-duplicados-al-recrear-un-reporte.md` (reparto en `fetchInitData`; huérfanos de la 0119).
- **`docs/modulo-herbicidas.md`** (835 líneas): arquitectura y el pipeline de 12 pasos del motor. **Está desactualizado:**
  - Cita los modelos `Herbicide` y `MarcaComercial`, que ya no existen.
  - Describe la "siembra sugerida", que ADR-0024 eliminó.
  - Habla de una ventana de 180 días, que contradice ADR-0021, 0022 y 0027.
  - Dice que las aplicaciones se escriben apenas se cargan, contra ADR-0032.
  - Dice que `/vig-ia-herbicidas` está restringido a `admin@rindeplus.com`, pero el frontend actual no tiene esa restricción.
- `docs/audits/brechas-inteligentes-aui-cascade.md` (la cascada AUI compartida) y `docs/ecloud-api.md`.

**TODOs:** hay uno solo real, `backend/fenologia_promedio.py:505` (`TODO(soja)`, `NotImplementedError` en l.520). Hay deuda señalada en comentarios:
- Factores provisorios: `carry_over_engine.py:149`; factores de rastrojo en `carry_over_report.py:2446`; Cebada 0.95 en `main.py:1327`.
- Dos modelos de DT50 en el backend (ADR-0029).
- `cropConfig.ts:174` `@deprecated`.
- `riegoPredictionEngine` y `StressDotChart` desactivados.
- `BiostressSidebar` sin uso.
- `carryOverAPI.verifyUnimap` sin uso.
- `riegos_sin_ambiente` `@deprecated` (`api.ts:3764`).

**Problemas conocidos o a verificar:**
1. **Posible FK de campaña duplicada en `reportes_vigia_biostres`.** La 0008 la crea como `reportes_vigia_biostres_campania_fkey` (CASCADE) y la 0040 busca otro nombre, `..._id_campania_fkey`. Revisar `pg_constraint` en producción.
2. **`DELETE /lotes/{id}` ignora los reportes y aplicaciones de Herbicidas** (main.py:5778-5815).
3. **`import_org_lotes.py` es incompatible** con ADR-0015, 0017 y 0021.
4. **El frontend no restringe VigIA por licencia.** El botón del home siempre se ve; el control lo hace el backend.
5. **Criterios de admin inconsistentes en el frontend.**
   - `isAdminAllowed` por email en el hub de Biostrés y en las pantallas de herbicidas, vocabulario y credenciales.
   - `role==='admin'` en las pantallas de cultivos.
   - Ninguno en `configuracion/page.tsx` ni en `fenologia-soja`.
   - La lista de emails del frontend no coincide con la del backend (`admin/constants.ts:10-15`).
6. **`riegos.id_ambiente`** está pendiente de drop (ADR-0015).
7. **Fechas como String** (`fecha_lluvia`, `fecha_riego`, `fecha_aplicacion`).
8. **El docstring de la 0025b** dice 0025.
9. **La caché de polígonos de Unimap** vive en memoria por worker de gunicorn (`-w 4`).
10. **`extra_params.muestreos_congelados`** sólo lo escribe la migración 0136. Lo lee `init-data` (main.py:21758), pero ningún endpoint lo escribe.

11. **`POST /vigia-herbicidas/unimap/verificar` no exige licencia**; sólo pide usuario autenticado.
12. **`idEmpresa` de los reportes no tiene FK** hacia `empresas`.
13. **`_verify_campania_vigia_access` (main.py:20630) no filtra por organización por sí mismo**: depende del filtro automático de `OrgScopedSession`. Si el nuevo sistema no tiene ese filtro, hay que agregar el chequeo explícito.

**Feature flags:** no hay. Las únicas palancas son `MODULE_REGISTRY` en el frontend y la variable `VIGIA_CLIMATE_FRESHNESS_HOURS` en el backend.

---

## 8. Tests

**Backend** (`backend/tests/`):
- Corren con pytest contra PostgreSQL real (`create_all`, no Alembic), usando `conftest.py`: `db_session` (savepoint) y `client` (TestClient).
- Las llamadas HTTP externas se mockean con monkeypatch o AsyncMock.
- `backend/scripts/coverage.sh` mide la cobertura de los módulos VigIA.

| Grupo | Archivos (cantidad de tests) |
|---|---|
| Biostrés | `test_biostres_climate_service` (6), `test_biostres_computed_data` (18), `test_biostres_cultivo_config` (22), `test_biostres_dpv_umbrales` (8), `test_biostres_init_data` (17), `test_biostres_lluvia_crud` (8), `test_biostres_reportes_crud` (26), `test_biostres_riego_crud` (9), `test_biostres_soil_resolver` (31), `test_generar_clima_biostres` (32) |
| VigIA general | `test_vigia_agua_por_campania` (4), `test_vigia_ambiente_selection` (21), `test_vigia_climate_freshness` (26), `test_vigia_fenologia_regresion` (52), `test_vigia_gdd` (13), `test_vigia_lote_id_ambiguo` (2), `test_vigia_muestreo_presiembra` (23) |
| Herbicidas | `test_vigia_herbicidas_aplicaciones_crud` (34), `test_vigia_herbicidas_reportes_crud` (73), `test_herbicidas_arena_muestreo` (16), `test_herbicidas_catalog_crud` (21), `test_herbicidas_identidad_reporte` (12), `test_carry_over_climate_service` (13), `test_carry_over_engine` (120), `test_carry_over_report` (279), `test_aplicaciones_pendientes` (13), `test_aplicaciones_sobreviven_al_rebuild` (21), `test_aplicaciones_sobreviven_al_reporte` (3), `test_residuales_extendidos` (11) |
| Agua y suelo | `test_agua_sobrevive_rebuild` (4), `test_saxton_rawls` (33), `test_carga_muestreos_suelo` (21), `test_muestreos_perfiles_matching` (5), `test_restore_muestreos_suelo` (2) |
| Unimap y credenciales | `test_unimap_service` (43), `test_empresa_credenciales` (43) |
| Fenología promedio | `test_fenologia_promedio` (47), `test_fenologia_promedio_endpoint` (16) |
| Tangenciales | `test_brechas_inteligentes_climate_service`, `test_brechas_inteligentes_aui_cascade`, `test_filtros_endpoints` (flag de licencia `vigia`), `test_schemas`, `test_models`, `test_ecloud_api`, `test_carry_over_report` |

**Frontend** (vitest + Testing Library + jsdom): son 88 archivos con unos 1340 tests.
- `src/components/biostres/__tests__/`: 44 archivos. Cubren los motores (waterBalance 58, riegoDeficit 58, cropConfig 54, alertEngine 31, dpv, muestreoSeleccion 34, costoRiego, seedAmbienteOverrides), 15 archivos `BiostressDashboard.*`, los gráficos, el PDF y la pantalla de lista.
- `src/components/herbicidas/__tests__/`: 31 archivos. Cubren `acumulado` (59), `aplicacionManual` (50), `CarryOverDashboard.*` (aplicacionManual 91, calidadPorAmbiente 20, save, pdf, unimap, refreshClima, repro1557), `ConcentracionesTable` (43+), `identidad` (39), `UnimapPanel` (20), `ventanaSiembra` y la integración `reporte331`.
- Páginas y librerías: `app/vig-ia-herbicidas/__tests__/page.colapso-persistente.test.tsx`, `nuevo/__tests__/page.suelo.test.tsx`, `reporte/__tests__/ReporteViewer.test.tsx`, `admin/gestion-herbicidas/__tests__/paEditorReducer.test.ts` (31), `lib/herbicidas/__tests__/formulaciones.test.ts`, `lib/pdf/__tests__/captureHerbicidasCharts.test.ts` y `HerbicidasChartCaptureHarness.test.tsx`.
- Relacionados: `components/pronostico/__tests__/{dpvUmbrales,useDpvUmbrales,DpvDailyChart,CultivoDpvToggle}`, `lib/__tests__/errores-api.test.ts` y `ui/__tests__/DateField.test.tsx`.
- **Sin tests:** `BiostresConfigForm`, `GaugeArc`, `DpvChart`, `AlertPanel`, `AuMuestreoPanel`, `BiostresFiltersContext`, la captura de gráficos de Biostrés para el PDF y las páginas de configuración de Biostrés.

**No se encontró:** imágenes satelitales, LLM/IA, notificaciones (WhatsApp, email, push), schedulers, i18n, feature flags, mapas en VigIA, billing ni planes.
---

## 9. Implicancias para el nuevo sistema

Lo que el sistema VigIA independiente tiene que resolver, derivado de las secciones anteriores.

### 9.1 Qué se lleva tal cual

- **Motores puros**, sin dependencias de la base de datos: `carry_over_engine.py`, `vigia_gdd.py`, `saxton_rawls_service.py` y los `*Engine.ts` de `components/biostres/`.
- **Tablas propias**: `reportes_vigia_biostres`, `reportes_vigia_herbicidas`, `cultivo`, `fenologia_soja_*`, `lluvias`, `riegos`, `aplicaciones_herbicidas`, `principios_activos`, `rotacion_marbete` y `vocabulario_tecnologia`.
- **Integraciones**: WeatherAPI y Unimap/Acronex, con su cifrado de credenciales (`crypto.py`).
- **La suite de tests** de la sección 8, que sirve como red de seguridad durante la migración.

### 9.2 Qué hay que reemplazar o decidir

| Tema | Hoy en RindePlus | Decisión pendiente para VigIA |
|---|---|---|
| Lotes, campañas y ambientes | Tablas del núcleo, cargadas por Excel en `/admin/carga-lotes` | ¿VigIA tiene su propio modelo de lote/campaña/ambiente, o los consume de RindePlus por API? |
| Suelo | `muestreos_suelo` y columnas de `ambientes` | Carga propia de muestreos o sincronización |
| Usuarios, organizaciones y auth | JWT compartido, `OrgScopedSession` | Auth propia o SSO con RindePlus |
| Licencias | `licencias.vigia` + `fecha_expiracion` por lote | Modelo de suscripción/planes propio |
| Catálogo `cultivo` | Lo consumen también Pronóstico, Brechas y Análisis de Campaña | RindePlus necesita una copia o una API de VigIA |
| Gracia de clima y cascada de suelo | Compartidas con Brechas Inteligentes | Duplicar el código o extraer una librería común |
| Marca por organización | Fija en código según `orgId` | Configuración por organización en la base |
| Carga masiva de lotes | Re-apunta reportes y regenera aplicaciones de planilla | Reimplementar la reconciliación en VigIA |
| Endpoints | ~75 inline en `main.py` | Routers por submódulo (`biostres`, `herbicidas`, `catalogo`, `credenciales`) |

### 9.3 Deuda que conviene no migrar

- Fechas guardadas como `String` en `lluvias`, `riegos` y `aplicaciones_herbicidas`.
- `riegos.id_ambiente` (pendiente de drop según ADR-0015).
- La FK de campaña posiblemente duplicada en `reportes_vigia_biostres`.
- Criterios de admin inconsistentes (lista de emails vs. `role`).
- Caché de polígonos de Unimap en memoria por worker.
- `docs/modulo-herbicidas.md` desactualizado: usar los ADRs 0013–0032 como fuente de verdad.

### 9.4 Oportunidades para el nuevo sistema

Hoy VigIA **no tiene** alertas push, jobs programados, notificaciones (WhatsApp, email), imágenes satelitales ni IA/LLM. Las "alertas" sólo existen cuando el usuario abre el reporte. Un sistema propio puede sumar:

- Recalcular reportes y refrescar clima de forma programada.
- Enviar alertas de estrés o de "siembra segura" por WhatsApp o email.
- Mover el balance hídrico del navegador al backend, para poder calcular sin un usuario conectado.
