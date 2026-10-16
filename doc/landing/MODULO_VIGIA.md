# Módulo VigIA: documentación completa para la separación de RindePlus

> **Fuente:** relevamiento del repo `RindePlus/Plataforma` (commit `e7554e5c`, 2026-10-13).
> Las rutas del backend son relativas a `Plataforma/backend/` y las del frontend a `Plataforma/frontend/`.
> Los números de línea corresponden a ese commit y pueden moverse.

**Objetivo de este documento:** describir qué es VigIA hoy dentro de RindePlus, cómo está construido y de qué depende, como base para construirlo como sistema independiente.

**Para la landing:** este documento es la fuente de lo que se puede afirmar. La [sección 10](#10-guía-para-la-landing-qué-se-puede-afirmar) lo resume en mensajes y define qué se toma del copy comercial propuesto y qué no. Ante una duda, gana lo que dicen las secciones 1 a 6.

> **Alcance del nuevo producto.** El nuevo VigIA abarca **Mitigación de Estrés** y **Cultivo de Servicio**: mitigar el estrés abiótico (hídrico y térmico) con bioinsumos o manejo (por ejemplo, riego), a partir del clima/DPV, el balance hídrico y el suelo, con alertas predictivas.
>
> **VigIA Herbicidas (carry-over) queda fuera del alcance.** No se migra al nuevo sistema y sigue en RindePlus. Las secciones 1 a 9 describen sólo lo que entra en el alcance. Lo de Herbicidas se documenta aparte en el [Anexo A](#anexo-a-vigia-herbicidas-fuera-del-alcance), porque comparte datos y código con Biostrés y eso condiciona la separación.
>
> **Landing (2026-10-16):** el equipo decidió que el carry-over de herbicidas va a ser parte de VigIA. La landing lo presenta como módulo de VigIA, sin nombrar a RindePlus (decisión 46 de `ESTRUCTURA_LANDING.md`). Este documento sigue describiendo el sistema actual.

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
10. [Guía para la landing: qué se puede afirmar](#10-guía-para-la-landing-qué-se-puede-afirmar)
- [Anexo A: VigIA Herbicidas (fuera del alcance)](#anexo-a-vigia-herbicidas-fuera-del-alcance)

## Resumen ejecutivo

1. **El backend de VigIA no tiene router propio.** Sus endpoints están inline en `backend/main.py` (26.053 líneas), mezclados con el resto. Los de Biostrés están entre las líneas 20440 y 22390, más helpers de suelo entre 25520 y 26053.
2. **El cálculo corre en el navegador.** El balance hídrico FAO-56, el DPV, las alertas y el plan de riego viven en `frontend/src/components/biostres/*Engine.ts`. El backend sólo provee datos (`/biostres/init-data`) y guarda lo que calcula el frontend (`PATCH computed-data`).
3. **No hay alertas push, jobs, scheduler, LLM ni notificaciones** (ni WhatsApp, ni email, ni push). Las "alertas" son objetos que el frontend calcula y guarda en `alertas_estres_combinado`. El clima se refresca bajo demanda.
4. **Integración externa:** sólo **WeatherAPI** (`WEATHER_API_KEY`). No hay imágenes satelitales. (Unimap/Acronex es sólo de Herbicidas.)
5. **El acoplamiento con el núcleo es profundo.** VigIA vive sobre `lotes`, `campania`, `ambientes`, `empresas`, `usuarios`, `organizaciones`, `licencias` y `muestreos_suelo`. Además, la carga masiva de lotes (`carga_lotes_service.py`) re-apunta los reportes VigIA.
6. **Sacar Herbicidas no es gratis.** Biostrés importa `clave_ambiente` desde `carry_over_report.py` (código de Herbicidas), y Herbicidas lee las tablas `lluvias` y `riegos` de VigIA. Ver la sección 9 y el Anexo A.

---

## 1. Qué es VigIA

**Propósito:** VigIA es el módulo de monitoreo agronómico por lote y campaña. `HomeScreen.tsx` lo publica como "VigIA Manejo de Estrés" y el dashboard lo muestra como "Powered by VigIA". Sus submódulos se acceden desde el hub `/vig-ia-biostres`:

| Submódulo | `modulo` / `tipo_vigia` | Qué hace |
|---|---|---|
| **Mitigación de Estrés** (antes "Huella Hídrica") | `modulo='huella-hidrica'`, cultivos `tipo_vigia='principal'` | Balance hídrico diario (FAO-56) por ambiente, sobre una ventana de 210 días (siembra −60 / +150). Alertas de estrés hídrico, de DPV (déficit de presión de vapor) y de riesgo fúngico. Plan de riego mensual con costo en USD/mm, oferta hídrica y rendimiento esperado. Fenología por días fijos, por GDD o por regresión latitudinal (Soja en Córdoba). |
| **Cultivo de Servicio** | `modulo='cultivo-de-servicio'`, `tipo_vigia='servicio'` (Centeno, Cebada, Vicia) | El mismo motor, más % de infiltración de lluvia, fecha de secado (pasa a consumir con el Kc del barbecho) y tasa de conversión a materia seca. |

El hub de RindePlus también muestra una tarjeta de **Herbicidas** (`app/vig-ia-biostres/page.tsx:84-98`), que queda fuera del alcance (Anexo A).

**Usuarios:**
- Productores y asesores, que son usuarios `rol='empresa'` de organizaciones como Aapresid, Agroconsultor, Crea, SpeedAgro o RindePlus.
- Administradores, que mantienen el catálogo de cultivos y la fenología.

**Funcionalidades para el usuario final:**
- Elegir empresa → campo → lote → campaña. Ver o corregir la fecha de siembra, el cultivo y el ciclo o grupo de madurez.
- Elegir el muestreo de suelo por ambiente (CC/PMP/AUI con Saxton-Rawls).
- Generar el reporte (trae clima nuevo), guardarlo con nombre y abrir reportes guardados.
- Cargar lluvias y riegos (por lote o por ambiente) y chequeos de AU% medidos.
- Overrides por ambiente: umbral p, etapas y costo del riego.
- Exportar PDF con la marca de la organización.

**Acciones que recomiendan las alertas** (`components/biostres/alertEngine.ts`): "bioinsumo hídrico", "antiestrés térmico/foliar", "bioinsumo preventivo antes del estadio", "plan completo de bioinsumos" y riego. Son genéricas, sin productos ni marcas.

**Licencia:** el acceso se habilita por lote con `licencias.vigia = true` y `fecha_expiracion` vigente.

**Qué dice CLAUDE.md:** sólo menciona VigIA en la tabla de runbooks (`CLAUDE.md:122-124`). La descripción general del producto (`CLAUDE.md:5-7`) no lo nombra.

---

## 2. Backend

### 2.1 Archivos propios de VigIA (raíz plana de `backend/`)

| Archivo | Líneas | Qué es |
|---|---|---|
| `biostres_climate_service.py` | 191 | Clima de Biostrés: `fetch_climate_210` (no escribe en la DB) y `refresh_climate_for_report` (escribe en la fila del reporte). Expone `_resolve_campania_coords`. |
| `vigia_ambiente_selection.py` | 147 | `seleccionar_ambientes_vigia` (dedupe por profundidad) y `agrupar_ambientes_por_numero`. |
| `vigia_climate_freshness.py` | 80 | Ventana de gracia del clima, 6 h por defecto (`VIGIA_CLIMATE_FRESHNESS_HOURS`). **También la usan Herbicidas y Brechas Inteligentes.** |
| `vigia_fenologia_regresion.py` | 263 | Regresión de soja por banda latitudinal × GM × delay. `resolve_banda` y `resolve_lote_latitud` (usa `Localidad`). |
| `vigia_gdd.py` | 189 | Conversión de GDD a días. **También la usa `fenologia_promedio.py` (Análisis de Campaña).** |
| `saxton_rawls_service.py` | 365 | Pedotransferencia de Saxton & Rawls 2006. **La comparten Brechas y Pronóstico.** |
| `scripts/coverage.sh` | — | Cobertura de los módulos VigIA (incluye los de Herbicidas). |

**Archivos compartidos de los que VigIA depende** (habría que copiarlos o extraerlos):
- `generar_clima_anual.py` (888 líneas, cliente WeatherAPI): `obtener_arrays_clima_anual`, `_fetch_day`, `_parse_fecha_siembra`, `_slice_210_from_yearly`.
- `cargar_clima_lotes.py` (371 líneas): `resolve_coordinates`, `years_needed`.
- `parsers/shared.py`: `strip_accents`.
- `carga_muestreos_suelo_service.py`: es la fuente de `muestreos_suelo`.
- **`carry_over_report.py` (de Herbicidas):** Biostrés importa de ahí `clave_ambiente` (main.py:21458, 21505 y 21668), la normalización de `numero_de_ambiente` que indexa el estado por ambiente (ADR-0013). Hay que extraerla a un módulo común antes de separar.
- `fenologia_promedio.py`: no es VigIA, pero consume la tabla `cultivo` de VigIA.

### 2.2 Endpoints (todos en `main.py`)

**Autenticación:**
- Bearer JWT (HS256, python-jose).
- `get_current_active_user` (`auth.py:100`) setea `db.info["org_id"/"regional_id"]` (`auth.py:61`).
- **Licencia:** la verifican `_verify_campania_vigia_access` (main.py:20630) y `_verify_lote_vigia_access` (20673). Responden 404 si la campaña o el lote no existen y 403 si la licencia no está activa o está vencida. El aislamiento por organización lo pone el filtro automático de `OrgScopedSession` sobre Lote y Campania (`database.py:38-103`).
- **Admin:** `_require_admin` (main.py:21025) chequea `rol=='admin'`.

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
- Agua: `_riego_read` (21503) y `_agua_del_lote` (21514). **Herbicidas también usa `_agua_del_lote`** (main.py:23922 y 23953).
- Suelo: `_query_muestreos_lote` (25591), `_elegir_muestreo` (25674), `_muestreos_disponibles` (25746), `_resolver_suelo_ambiente` (25854), `_suelo_vigia` (25914).
- Utilidades: `_parse_any_date` (714) y `_sanitize_fecha` (730).

### 2.3 CRUD y schemas

**`crud.py`:** sólo cubre los reportes de Biostrés.
- `create_reporte_vigia_biostres` (989)
- `get_reporte_vigia_biostres` (1067)
- `list_reportes_vigia_biostres` (1083)
- `delete_reporte_vigia_biostres` (1157)
- Funciones compartidas que usa: `get_user_empresas` (161) y `get_empresa` (119).

**`schemas.py`, clases de VigIA:**
- Suelo: `SaxtonRawls*` (387-441), `MuestreoPerfil*` (462-478).
- Reportes Biostrés: `ReporteVigiaBiostresCreate/Read/Card` (568/632/656), `BiostresClimateData` (584), `BiostresUpdateComputedData` (594), `BiostresClimateRefreshResult` (679), `BiostresAmbienteSoil*` (694-726), `BiostresMuestreo*` (733-770).
- Agua y simulación: `LluviaCreate/Read` (1642/1653), `RiegoCreate/Read` (1665/1686), `BiostresAmbienteItem` (1707), `BiostresInitData` (1761).
- Cultivo y fenología: `CultivoConfig*` (1858-1899), `CultivoCicloItem` (1914), `CultivoDpvUmbralItem` (2002), `FenologiaSoja*` (2015-2091), `BiostresCampaniaItem` (2096).

### 2.4 Modelos y tablas (`models.py`)

**Tablas propias de VigIA**

| Modelo | Tabla | Línea |
|---|---|---|
| `ReporteVigiaBiostres` | `reportes_vigia_biostres` | 276 |
| `CultivoInfo` | `cultivo` | 1189 |
| `FenologiaSojaBanda` | `fenologia_soja_banda` | 1230 |
| `FenologiaSojaRegresion` | `fenologia_soja_regresion` | 1248 |
| `Lluvia` | `lluvias` | 1275 |
| `Riego` | `riegos` | 1305 |

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
- **También la lee Herbicidas** (ver Anexo A).

**`riegos`**
- Igual que `lluvias`, más `ambiente_nombre` (NULL = todo el lote) e `id_ambiente` (FK a ambientes con SET NULL; está pendiente de drop).
- El índice `ix_riegos_lote` existe sólo en la migración 0114.
- **También la lee Herbicidas.**

**Tablas compartidas que VigIA lee o escribe**
- `licencias` (1451): la columna `vigia` y `fecha_expiracion`.
- `muestreos_suelo` (1784): PK `(id_lote, idOrganizacion, idRegional, numero_de_ambiente, fecha_de_muestreo)`, con FK a lotes.
- `lotes`, `campania` (escribe `total_agua_acumulada_mm`), `ambientes` (suelo, coordenadas, variedad/ciclo y `riego_*`).
- `empresas`, `usuarios`, `organizaciones`, `localidades`.

**Filtro automático por organización:**
- `database._add_org_filter` (database.py:38) sólo cubre Empresa, Usuario, Acceso, Organizacion, Regional, Lote y Campania.
- **Ninguna tabla VigIA está cubierta.** Todas filtran a mano por `idOrganizacion` o pasando por el lote o la campaña.

### 2.5 Jobs, schedulers y workers

**No hay ninguno.** No existen APScheduler, Celery, cron ni BackgroundTasks de VigIA.
- El `lifespan` (main.py:156) sólo limpia uploads.
- El clima se refresca bajo demanda: al abrir el reporte (con gracia de 6 h), con el botón "Actualizar clima" (`force`) o al guardar.
- La carga de lotes (`carga_lotes_jobs.py`, `asyncio.create_task` + thread) es del núcleo, pero toca VigIA (ver la sección 5).

### 2.6 Integraciones externas

**WeatherAPI** (`http://api.weatherapi.com/v1`, endpoints history, forecast y future)
- Pasa por `generar_clima_anual.py:19-20` y `_fetch_day`.
- Biostrés pide los 210 días alrededor de la siembra. Los días entre hoy y hoy+14 salen de `forecast.json` (pronóstico de corto plazo) y los posteriores, hasta hoy+300, de `future.json` (`generar_clima_anual.py:91-92`).
- No usa la tabla `climas` (ADR-0030).
- Detalle de despliegue: el DNS 1.1.1.1/8.8.8.8 en `docker/docker-compose.dev.yml` y `docker/docker-compose.prod.yml` existe por la latencia de WeatherAPI.

**Lo que no usa:** imágenes satelitales, LLM/IA (OpenAI, Anthropic, Gemini), WhatsApp, email ni push.

### 2.7 Variables de entorno y configuración

| Variable | Dónde | Uso |
|---|---|---|
| `WEATHER_API_KEY` | `generar_clima_anual.py:19` | Clima |
| `VIGIA_CLIMATE_FRESHNESS_HOURS` | `vigia_climate_freshness.py:41` | Gracia del clima (default 6, 0 la desactiva). No aparece en docker-compose. |
| `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES` | `auth.py:16,18` | JWT |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT`, `DOCKER_ENV` | `database.py:7-14` | Base de datos |

En el frontend no hay variables propias de VigIA. Sólo `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_BACKEND_URL` y `BACKEND_URL` (`frontend/src/lib/api.ts:8,16`).

**Dependencias Python:**
- Usadas por VigIA: httpx 0.25.2, sqlalchemy 2.0.23, psycopg2, alembic 1.12.1, fastapi 0.104.1, python-jose, passlib/bcrypt, pandas y openpyxl (carga de muestreos).
- numpy y scikit-learn no son de VigIA.

---

## 3. Migraciones de Alembic (`backend/alembic/versions/`)

La cabeza actual es `0136`. Faltan los números 0052, 0053, 0085, 0111 y 0112.

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
| 0113_reportes_vigia_clave_natural | `campania_str`, `cultivo` y `ciclo` en las dos tablas de reportes (Biostrés y Herbicidas), con backfill. |
| 0115_varios_reportes_vigia_por_campania | Drop del UNIQUE de Biostrés. |
| 0116_nombre_reporte_vigia | — |
| 0124_descongela_los_meses_con_riego_del_dia_1 | Sólo datos. |
| 0136_congela_el_muestreo_de_los_reportes_vigia | Sólo datos (`extra_params.muestreos_congelados`). Usa `saxton_rawls_service` y `carry_over_report.clave_ambiente`. |

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

**Suelo y clima**

| Migración | Qué hace |
|---|---|
| 0063_create_muestreos_suelo | Crea `muestreos_suelo`. |
| 0057_climas_unique_coord_year | Toca `climas`. |
| 0133_clima_actualizado_en_reportes_brechas_inteligentes | Es de Brechas Inteligentes, pero usa la gracia de VigIA. |

**Históricas fuera de `backend/alembic`:** `alembic/versions/n001_normalize_database_schema.py` crea `cultivo`, `licencias` (con `vigia`), `lluvias` y `riegos`.

**Las mencionan sin cambiar tablas VigIA:** 0005, 0019, 0032, 0044, 0058 y 0070.

---

## 4. Frontend (`frontend/src`)

**Stack:** Next.js 15.5.9, React 19, TypeScript strict, axios. Gráficos con recharts ^3.1.0, PDF con @react-pdf/renderer ^4.3.2 (con el parche `scripts/patch-react-pdf-paginate.js`), html2canvas como respaldo, íconos lucide-react y react-icons. **VigIA no usa mapas** (leaflet está instalado, pero lo usa Pronóstico). **No hay i18n:** todo está en español, hardcodeado.

### 4.1 Rutas

**Biostrés**
- `app/vig-ia-biostres/layout.tsx`: `ProtectedRoute` + `BiostresFiltersProvider`.
- `page.tsx`: el hub. Enlaza a Mitigación de Estrés y Cultivo de Servicio (y a Herbicidas, fuera del alcance).
- `mitigacion-de-estres/`: `page.tsx` crea, `reportes/page.tsx` lista, `reporte/page.tsx?reportId=` muestra.
- `cultivo-de-servicio/`: las mismas tres páginas.
- Redirecciones legacy: `huella-hidrica/{,reporte,reportes}`, `reporte` y `reportes`.
- Configuración: `configuracion/page.tsx`, `configuracion/cultivos/page.tsx`, `configuracion/cultivos/[id]/page.tsx` (802 líneas) y `configuracion/fenologia-soja/page.tsx` (475).

**Administración del núcleo que toca VigIA**
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

**Otros archivos de VigIA o compartidos con ella:**
- `contexts/BiostresFiltersContext.tsx` (144).
- `lib/pdf/captureBiostresCharts.ts` y `BiostresChartCaptureHarness.tsx`.
- Assets: `public/vigia.png`, `vigia-biostres-logo*.png`, `vigia-logo-header.png`.

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

Las funciones de lluvias y riegos de `biostresAPI` también las usa `CarryOverDashboard` (Herbicidas).

**Otros clientes:**

| Objeto | Línea | Endpoints |
|---|---|---|
| `muestreosSueloAPI.listPerfiles` | 1873 | `/muestreos-suelo/perfiles` (lo usa `BiostressDashboard.tsx:2351`) |
| `cargaMuestreosSueloAPI` | 1768 | `/admin/carga-muestreos-suelo/*` |
| `licenciasAPI` | 1913 | `/admin/licencias` (campo `vigia` en l.1925) |

### 4.4 Estado del navegador y flags

- **localStorage:**
  - `biostres_{orgId}_empresaId`, `_campo`, `_loteId` (`BiostresFiltersContext.tsx:60-117`).
  - `biostres_lluvia_vista` y `_periodo`.
- **sessionStorage:**
  - `vigia_biostres_reportes_{modulo}_*` (filtros y plegado).
  - `?reset=1` limpia esas claves.
- **Feature flags:** no hay. Sólo las banderas de comportamiento de `MODULE_REGISTRY` (`injectBarbechoCurve`, `useFlatPUmbral`).

---

## 5. Acoplamientos con el resto de RindePlus (lo crítico para el split)

### Base de datos y modelos

1. **Lotes.**
   - `reportes_vigia_biostres` tiene FK compuesta RESTRICT hacia `lotes(id, idOrganizacion, idRegional)` (`models.py:325-331`).
   - Lluvias y riegos guardan ese triple sin FK (`models.py:1288-1290` y `1320-1322`).
   - `lotes.id` no es único entre organizaciones ni regionales.
2. **Campaña.**
   - Hay FK a `campania.id`: RESTRICT en los reportes (`models.py:286`) y SET NULL en el agua (`models.py:1297` y `1329`).
   - Lee `campania.fecha_de_siembra`, `cultivo`, `ciclo`, `campania` (la etiqueta) y `localidad_id`.
   - **Escribe `campania.total_agua_acumulada_mm`** (main.py:22285-22288).
   - Las relaciones inversas están en `Campania` (`models.py:556-563`).
3. **Ambientes.**
   - VigIA usa `ambientes` para el suelo (pmp/cc/aui, textura), `numero_de_ambiente` (clave), `superficie_del_ambiente_ha`, `latitud`/`longitud` y `riego_*`.
   - Los lugares: main.py:21451 y 21660-21667; `riegos.id_ambiente` hacia `ambientes.id` (`models.py:1331`).
4. **Muestreos de suelo** (`muestreos_suelo`, `models.py:1784`).
   - Son la fuente de CC/PMP/AUI: `_query_muestreos_lote` (main.py:25591).
   - Los carga el núcleo con `/admin/carga-muestreos-suelo` (main.py:4225-4345, `carga_muestreos_suelo_service.py`).
   - Brechas Inteligentes también los usa.
5. **Licencias.**
   - `licencias.vigia` más `fecha_expiracion`, a través de `lotes.id_licencia` (`models.py:1451-1466`).
   - Se verifican en main.py:20465-20696 y 21388-21397.
   - Se administran en el núcleo: `/admin/licencias*` (main.py:3244-3405) y la pantalla `gestion-licencias`.
   - La carga masiva crea licencias con `vigia=True` por defecto (`carga_lotes_service.py:1349-1352`) y las restaura (`carga_lotes_service.py:1100-1116`).
   - **El mismo flag `vigia` habilita hoy Herbicidas.** Si Herbicidas se queda en RindePlus, necesita su propio flag de licencia.
6. **Empresas y accesos.**
   - Join con Empresa en la grilla de reportes (`crud.py:1083+`).
   - `crud.get_user_empresas` filtra a los usuarios que no son admin (main.py:21401 y 22085).
7. **Usuarios y organizaciones.**
   - FK `idOrganizacion` a `organizaciones.id`.
   - `idUsuarioCreador` e `idUsuario` tienen FK a `usuarios.id` (`models.py:299-300`).
   - Lluvias y riegos tienen `id_usuario` con FK a usuarios (`models.py:1298` y `1330`).
8. **Localidad.** `vigia_fenologia_regresion.resolve_lote_latitud` cae a la localidad de la campaña (l.126). `cargar_clima_lotes.resolve_coordinates` también la usa.
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
    - Resultado `reportes_vigia_relink` (l.1542-1547 y 1672-1673), que muestra `VigiaRelinkPanel` en el frontend.
11. **`DELETE /lotes/{lote_id}`** (main.py:5767-5815): bloquea con 409 si hay reportes de Biostrés y borra lluvias y riegos.
12. **`backend/scripts/import_org_lotes.py`:** exige `--allow-vigia-loss`. Borra el agua por `id_campania` (modelo previo a ADR-0015).
13. **`scripts/reporte_org_regional.py`:** lee las tablas de reportes VigIA.

### Infraestructura compartida

14. **Autenticación:**
    - JWT, `get_current_active_user` (`auth.py:61-103`) y `OrgScopedSession` (`database.py:25-103`).
    - Roles: `rol=='admin'` inline.
    - Frontend: `AuthContext` (`role`, `orgId`), `ProtectedRoute` e `isAdminAllowed` (`app/admin/constants.ts:17-28`, lista de emails).
15. **Clima:**
    - `generar_clima_anual.py` (cliente WeatherAPI) y `cargar_clima_lotes.py` (coordenadas).
    - `vigia_climate_freshness.py` lo comparten Brechas Inteligentes (`brechas_inteligentes_climate_service.py:47`) y Herbicidas.
16. **Suelo:** `saxton_rawls_service.py` (importado en main.py:13) y los helpers `_resolver_suelo_ambiente` y compañía (main.py:25591-26053), que comparten la cascada AUI de Brechas Inteligentes y el suelo de Herbicidas.
17. **Utilidades:** `parsers/shared.strip_accents` y `carry_over_report.clave_ambiente` (ver 2.1).

### Frontend compartido

18. **Componentes del núcleo:**
    - `AppHeader`, `ProtectedRoute`, `AuthContext`.
    - `ui/DateField`, `ui/PdfFileNameModal`, `ui/NavArrows`, `ui/SalirSinGuardarModal`, `SearchableSelect`, `MultiSelectFilter`.
    - `components/brechas/AUISection` (lo usa `BiostressDashboard.tsx:45`; tiene ramas VigIA en `AUISection.tsx:40,157,217,232`).
19. **Librerías del núcleo:**
    - `@/lib/brechas/auiSummary`, `@/lib/brechas/ambiente`, `@/lib/brechas/durezaCorregida`, `@/lib/brechas-cultivo`.
    - `@/lib/date-display`, `useSessionStorageState`, `useLocalStorageState`, `@/utils/cultivoUtils`, `@/lib/utils`.
    - PDF compartido: `lib/pdf/svgToPng.ts`, `AtomicBlock.tsx`, `setup.ts`, `captureAuiSection.tsx`.
20. **Marca por organización:** fija en el código según `orgId` (3 Aapresid, 4 Agroconsultor, 6 SpeedAgro) en `BiostressDashboard.tsx:626-635`.
21. **Puntos de entrada desde el núcleo:**
    - `HomeScreen.tsx:45-48,157-168`: botón "VigIA Manejo de Estrés", siempre visible.
    - `Notificaciones.tsx:18`: novedad de mayo 2026.
    - Logos "Powered by VigIA" en `dashboard/page.tsx:1320-1331`, `ClimateForecast.tsx:1639`, `InteraccionesClimaticas.tsx:1706`, `ClimaSection.tsx:683`, `CropDetail.tsx:2042`, `ClimaLocalidadModal.tsx:465` y `PronosticoRendimientoView.tsx:13062`.

### Infraestructura

22. **Misma base y mismo despliegue.** VigIA comparte con RindePlus la base PostgreSQL, las imágenes de GHCR y la configuración de `docker/docker-compose.base.yml:35-61`.
23. **Una sola cadena de Alembic.** Las migraciones de VigIA están intercaladas en la cadena lineal de RindePlus, así que no se pueden separar como branch. El nuevo sistema necesita una migración inicial propia que cree el esquema actual, más un script de copia de datos.

**Billing y planes:** no hay. El único "plan" es la licencia booleana `vigia` por lote, con fecha de expiración.

---

## 6. Flujo de punta a punta

**Preparación (núcleo de RindePlus):**
1. Un admin carga el Excel de lotes en `/admin/carga-lotes`. Se crean `lotes`, `campania` y `ambientes` con el suelo, más licencias con `vigia=True` por defecto, y se re-apuntan los reportes existentes.
2. Opcionalmente se cargan muestreos de suelo (`/admin/carga-muestreos-suelo`) y se habilitan o vencen licencias (`/admin/licencias`).
3. Un admin mantiene el catálogo de cultivos, etapas, DPV y GDD (`/vig-ia-biostres/configuracion`) y la fenología de soja.

**Mitigación de Estrés / Cultivo de Servicio:**
1. El usuario entra a `/vig-ia-biostres` → Mitigación de Estrés (o Cultivo de Servicio) → nuevo.
2. `BiostresConfigForm` llama a `GET /biostres/campanias-disponibles` (sólo lotes con licencia vigente) y arma la cascada empresa/campo/lote/campaña. Con `GET /biostres/cultivo-ciclos?tipo=` elige cultivo y ciclo, con `GET /biostres/ambiente-soil` y `/biostres/muestreos-disponibles` resuelve el suelo, y con `GET /biostres/cultivo-config` obtiene la fenología.
3. Al apretar "Generar", `POST /biostres/refresh-climate-campania` pide a WeatherAPI los 210 días con pronóstico, sin guardar nada. Después `GET /biostres/init-data` trae ambientes, agua y overrides.
4. El navegador corre `waterBalanceEngine`, `dpvEngine`, `alertEngine` y `riegoDeficitEngine`. Muestra gauges, alertas (estrés hídrico actual y a t+4, DPV sostenido, riesgo fúngico, estrés combinado, período crítico), el plan de riego y los costos.
5. Al guardar:
   - `POST /biostres/reportes` crea la fila.
   - `PATCH .../computed-data` guarda clima, alertas, suelo y overrides.
   - Las lluvias y riegos van a `POST /vigia/lluvias|riegos`, que son tablas del lote.
6. Al reabrir: `POST /biostres/reportes/{id}/refresh-climate` (omite el fetch si el clima tiene menos de 6 h) y `GET init-data?reporte_id`. La simulación vuelve a correr y se puede exportar el PDF.
7. **No hay entrega push de alertas:** el usuario las ve al abrir el reporte.

---

## 7. Documentación, TODOs, problemas conocidos y flags

**ADRs de VigIA** (`docs/adr/`):

| ADR | Qué decide |
|---|---|
| 0013 | El estado por ambiente se indexa por `clave_ambiente(numero_de_ambiente)`, nunca por el PK. |
| 0014 | El reporte guarda su clave natural; `id_campania` es un puntero que se re-apunta. Hay otro 0014 de Brechas con el mismo número. |
| 0015 | El agua cuelga del lote con el triple; el ambiente se identifica por nombre. |
| 0016 | Varios reportes de Biostrés por campaña, con `nombre_reporte`. |
| 0017 | El agua se acota por la etiqueta `campania_str`. |
| 0018 | El agua sale del blob; las tablas son la única fuente. |
| 0019 | Gracia de 6 h para el clima. |
| 0030 | El clima de VigIA sale sólo de la API o del reporte. |
| 0031 | Clima actualizado de Brechas Inteligentes (comparte la gracia). |

Los ADRs 0008, 0009 y 0020-0029 y 0032 son de Herbicidas (Anexo A).

**Otros documentos:**
- **Runbooks:** `docs/runbooks/vigia-no-guarda-un-campo-del-reporte.md` (claves huérfanas en `ambiente_overrides`), `vigia-reporte-nuevo-sin-agua.md` (ids `local-*`, lote homónimo de otro regional, etiqueta de campaña) y `vigia-riegos-duplicados-al-recrear-un-reporte.md` (reparto en `fetchInitData`; huérfanos de la 0119).
- `docs/audits/brechas-inteligentes-aui-cascade.md` (la cascada AUI compartida).

**TODOs:** hay uno solo real, `backend/fenologia_promedio.py:505` (`TODO(soja)`, `NotImplementedError` en l.520). Hay deuda señalada en comentarios:
- Cebada 0.95 en `main.py:1327`.
- `cropConfig.ts:174` `@deprecated`.
- `riegoPredictionEngine` y `StressDotChart` desactivados.
- `BiostressSidebar` sin uso.
- `riegos_sin_ambiente` `@deprecated` (`api.ts:3764`).

**Problemas conocidos o a verificar:**
1. **Posible FK de campaña duplicada en `reportes_vigia_biostres`.** La 0008 la crea como `reportes_vigia_biostres_campania_fkey` (CASCADE) y la 0040 busca otro nombre, `..._id_campania_fkey`. Revisar `pg_constraint` en producción.
2. **`import_org_lotes.py` es incompatible** con ADR-0015 y 0017.
3. **El frontend no restringe VigIA por licencia.** El botón del home siempre se ve; el control lo hace el backend.
4. **Criterios de admin inconsistentes en el frontend.**
   - `isAdminAllowed` por email en el hub de Biostrés.
   - `role==='admin'` en las pantallas de cultivos.
   - Ninguno en `configuracion/page.tsx` ni en `fenologia-soja`.
   - La lista de emails del frontend no coincide con la del backend (`admin/constants.ts:10-15`).
5. **`riegos.id_ambiente`** está pendiente de drop (ADR-0015).
6. **Fechas como String** (`fecha_lluvia`, `fecha_riego`).
7. **El docstring de la 0025b** dice 0025.
8. **`extra_params.muestreos_congelados`** sólo lo escribe la migración 0136. Lo lee `init-data` (main.py:21758), pero ningún endpoint lo escribe.
9. **`idEmpresa` de los reportes no tiene FK** hacia `empresas`.
10. **`_verify_campania_vigia_access` (main.py:20630) no filtra por organización por sí mismo**: depende del filtro automático de `OrgScopedSession`. Si el nuevo sistema no tiene ese filtro, hay que agregar el chequeo explícito.

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
| Agua y suelo | `test_agua_sobrevive_rebuild` (4), `test_saxton_rawls` (33), `test_carga_muestreos_suelo` (21), `test_muestreos_perfiles_matching` (5), `test_restore_muestreos_suelo` (2) |
| Fenología promedio | `test_fenologia_promedio` (47), `test_fenologia_promedio_endpoint` (16) |
| Tangenciales | `test_brechas_inteligentes_climate_service`, `test_brechas_inteligentes_aui_cascade`, `test_filtros_endpoints` (flag de licencia `vigia`), `test_schemas`, `test_models` |

**Frontend** (vitest + Testing Library + jsdom):
- `src/components/biostres/__tests__/`: 44 archivos. Cubren los motores (waterBalance 58, riegoDeficit 58, cropConfig 54, alertEngine 31, dpv, muestreoSeleccion 34, costoRiego, seedAmbienteOverrides), 15 archivos `BiostressDashboard.*`, los gráficos, el PDF y la pantalla de lista.
- Relacionados: `components/pronostico/__tests__/{dpvUmbrales,useDpvUmbrales,DpvDailyChart,CultivoDpvToggle}`, `lib/__tests__/errores-api.test.ts` y `ui/__tests__/DateField.test.tsx`.
- **Sin tests:** `BiostresConfigForm`, `GaugeArc`, `DpvChart`, `AlertPanel`, `AuMuestreoPanel`, `BiostresFiltersContext`, la captura de gráficos de Biostrés para el PDF y las páginas de configuración de Biostrés.

**No se encontró:** imágenes satelitales, LLM/IA, notificaciones (WhatsApp, email, push), schedulers, i18n, feature flags, mapas en VigIA, billing ni planes.

---

## 9. Implicancias para el nuevo sistema

Lo que el sistema VigIA independiente tiene que resolver, derivado de las secciones anteriores.

### 9.1 Qué se lleva tal cual

- **Motores puros**, sin dependencias de la base de datos: `vigia_gdd.py`, `vigia_fenologia_regresion.py`, `saxton_rawls_service.py` y los `*Engine.ts` de `components/biostres/`.
- **Tablas propias**: `reportes_vigia_biostres`, `cultivo`, `fenologia_soja_*`, `lluvias` y `riegos`.
- **Integración**: WeatherAPI.
- **La suite de tests** de la sección 8, que sirve como red de seguridad durante la migración.

### 9.2 Qué hay que reemplazar o decidir

| Tema | Hoy en RindePlus | Decisión pendiente para VigIA |
|---|---|---|
| Lotes, campañas y ambientes | Tablas del núcleo, cargadas por Excel en `/admin/carga-lotes` | ¿VigIA tiene su propio modelo de lote/campaña/ambiente, o los consume de RindePlus por API? |
| Suelo | `muestreos_suelo` y columnas de `ambientes` | Carga propia de muestreos o sincronización |
| Usuarios, organizaciones y auth | JWT compartido, `OrgScopedSession` | Auth propia o SSO con RindePlus |
| Licencias | `licencias.vigia` + `fecha_expiracion` por lote; habilita también Herbicidas | Modelo de suscripción propio, y un flag separado para Herbicidas en RindePlus |
| Catálogo `cultivo` | Lo consumen también Pronóstico, Brechas y Análisis de Campaña | RindePlus necesita una copia o una API de VigIA |
| Gracia de clima y cascada de suelo | Compartidas con Brechas Inteligentes y Herbicidas | Duplicar el código o extraer una librería común |
| `clave_ambiente` | Vive en `carry_over_report.py` (Herbicidas) | Extraerla a un módulo común del nuevo sistema |
| Agua (`lluvias`, `riegos`) | La leen Biostrés y Herbicidas | Si el agua pasa a VigIA, Herbicidas en RindePlus necesita copia, sincronización o una API para seguir leyéndola |
| Marca por organización | Fija en código según `orgId` | Configuración por organización en la base |
| Carga masiva de lotes | Re-apunta reportes | Reimplementar el re-apunte en VigIA |
| Endpoints | Inline en `main.py` | Routers propios (`reportes`, `agua`, `catalogo`, `suelo`) |
| Hub del frontend | Tarjeta de Herbicidas en `/vig-ia-biostres` | El nuevo hub no la incluye |

### 9.3 Deuda que conviene no migrar

- Fechas guardadas como `String` en `lluvias` y `riegos`.
- `riegos.id_ambiente` (pendiente de drop según ADR-0015).
- La FK de campaña posiblemente duplicada en `reportes_vigia_biostres`.
- Criterios de admin inconsistentes (lista de emails vs. `role`).

### 9.4 Oportunidades para el nuevo sistema

Hoy VigIA **no tiene** alertas push, jobs programados, notificaciones (WhatsApp, email), imágenes satelitales ni IA/LLM. Las "alertas" sólo existen cuando el usuario abre el reporte. Un sistema propio puede sumar:

- Recalcular reportes y refrescar clima de forma programada.
- Enviar las alertas de estrés por WhatsApp o email.
- Mover el balance hídrico del navegador al backend, para poder calcular sin un usuario conectado.
- Recomendar insumos concretos (con el socio comercial) además del manejo genérico, como el riego, que las alertas ya sugieren hoy.

---

## 10. Guía para la landing: qué se puede afirmar

Resume las secciones 1 a 6 en lo que la landing puede decir, y filtra el copy comercial propuesto (`media-src/vigia-biostres-landing (Info adicional).md`, 2026-10-14) contra lo que el producto hace. **Criterio acordado:** la landing promete sólo lo que el producto hace hoy, más las alertas por WhatsApp, que se suman al lanzar.

### 10.1 Marca y producto

- **Nombre:** **VigIA BioEstrés**. Dominio: `vigiabioestres.com`. "VigIA" es sólo nombre de marca: la landing no menciona inteligencia artificial.
- **Qué es, en una frase:** VigIA BioEstrés anticipa el estrés hídrico y térmico de cada lote, ambiente por ambiente, y te avisa con días de margen para aplicar un bioinsumo o regar.
- **Submódulos:** Mitigación de Estrés (cultivo de la campaña) y Cultivo de Servicio.
- **Fuera del alcance:** Herbicidas (Anexo A). No aparece en la landing.

### 10.2 Capacidades respaldadas

| Capacidad | Qué se puede decir | Respaldo |
|---|---|---|
| Balance hídrico | Agua útil del suelo día a día, por ambiente, desde antes de la siembra hasta el fin del ciclo. | FAO-56 en `waterBalanceEngine.ts`, ventana de 210 días (siembra −60 / +150). |
| Clima del lote | Historial y pronóstico a 14 días en las coordenadas del lote, sin estaciones ni sensores propios. | WeatherAPI (2.6). Se refresca al abrir el reporte, con gracia de 6 h. |
| Estrés térmico (DPV) | Déficit de presión de vapor diario contra los umbrales de cada cultivo. | `dpvEngine.ts`, `cultivo.max_dpv` / `min_dpv`. |
| Fenología | La etapa del cultivo día a día. En soja, ajustada por latitud y grupo de madurez. | Días fijos, GDD o regresión latitudinal de soja (1). |
| Suelo | Agua útil del perfil (CC, PMP, AUI) de cada ambiente, desde los muestreos de suelo. | Saxton-Rawls, `muestreos_suelo` (2.4). |
| Lluvias, riegos y mediciones | Cargás lo que cayó o regaste (por lote o por ambiente) y chequeos de AU% medidos; el cálculo se ajusta. | Tablas `lluvias` y `riegos`, `AuMuestreoPanel`. |
| Alertas | Estrés hídrico actual y a 4 días, DPV sostenido, estrés combinado y período crítico, con severidad y acción sugerida. | `alertEngine.ts` (1 y 6). |
| Acciones | Genéricas: bioinsumo hídrico, antiestrés térmico o foliar, bioinsumo preventivo antes del estadio, plan de bioinsumos y riego. Sin productos ni marcas. | `alertEngine.ts` (1). |
| Plan de riego | Plan mensual con costo en USD/mm, oferta hídrica y rinde esperado. | `riegoDeficitEngine.ts`, `costoRiegoEngine.ts` (1). |
| Reportes | Varios reportes por campaña, guardados con nombre, y exportación a PDF para compartir. | ADR-0016, `BiostresPDFDocument.tsx`. |
| Ajustes por ambiente | Umbral de agua, etapas y costo del riego ajustables por ambiente. | Overrides (1). |
| Cultivos de servicio | Consumo de agua frente al barbecho, fecha de secado y materia seca, para centeno, cebada y vicia. | `tipo_vigia='servicio'` (1). |
| Varias empresas | Productores y asesores ven las empresas y los lotes a los que tienen acceso. | `accesos`, `get_user_empresas` (5). |

### 10.3 Lo que se suma al lanzar

- **Alertas por WhatsApp.** Hoy no existen en Plataforma (2.6): las alertas se ven al abrir el reporte. La landing las presenta como disponibles porque estarán listas al publicar (decisión 2 de `ESTRUCTURA_LANDING.md`). Requieren el recálculo programado de 9.4.

### 10.4 El copy propuesto, punto por punto

| Afirmación del copy | Veredicto | Cómo se dice en la landing |
|---|---|---|
| "Detectá el estrés antes de que se convierta en pérdida" | ✅ Sí | Título del hero. |
| Índices espectrales (NDVI, NDRE, NDWI) e imágenes satelitales | ❌ No | No hay imágenes satelitales (2.6). El adelanto lo dan el balance hídrico y el DPV: "el balance hídrico marca el estrés antes que la hoja". |
| "Procesamiento con IA", "modelos", "IA" | ❌ No | Regla de contenido. Se dice "VigIA calcula cada día…". |
| Estrés biótico (plagas, enfermedades) y separación biótico/abiótico | ❌ No | El alcance es abiótico: hídrico, térmico (DPV) y combinado. El motor calcula riesgo fúngico, pero la landing no lo promete por ahora. |
| Estrés nutricional | ❌ No | No existe en el motor. |
| Fungicida, insecticida | ❌ No | Las acciones son bioinsumo o riego. |
| Golpes de calor, déficit hídrico | ✅ Sí | Como estrés térmico (DPV) e hídrico. |
| Ambientes y zonas de manejo | ✅ Sí | "Por ambiente". No decir "manejo variable" ni "prescripción". |
| Mapa de la zona afectada | ❌ No | VigIA no usa mapas (4). Se dice "qué lote y qué ambiente". |
| Contexto de cada alerta: fenología, severidad, ambiente | ✅ Sí | Tal cual. |
| Impacto estimado sobre el rinde | ⚠️ Parcial | Las alertas no estiman la pérdida. El plan de riego sí muestra el rinde esperado: decirlo sólo ahí. |
| "Conecta automáticamente imágenes, series climáticas, ambientes, siembra, híbrido, riegos" | ⚠️ Parcial | El clima se conecta solo. Lotes, ambientes y suelo se cargan al alta (hoy lo hace un admin por Excel). Lluvias y riegos los carga el usuario. |
| "Sin planillas, sin configuraciones complejas" | ⚠️ Parcial | Sólo si el alta la hace el equipo de VigIA (pendiente de confirmar). |
| Diagnóstico probable y recomendación de monitoreo | ⚠️ Parcial | "Acción sugerida". No "diagnóstico". |
| "Validás a campo y registrás la decisión en la plataforma" | ⚠️ Parcial | Registrás lluvias, riegos y mediciones de agua útil. No hay registro de aplicaciones. |
| Todo el planteo en un tablero, campaña tras campaña | ✅ Sí | Reportes por empresa, lote y campaña. |
| Reportes para compartir, con trazabilidad | ✅ Sí | PDF y reportes guardados con nombre. La marca propia en el PDF existe sólo para algunas organizaciones: no prometerla. |
| Recorridas priorizadas, escalar la cartera del asesor | ✅ Sí | Alertas por lote y ambiente, acceso a varias empresas. |
| Intensivos y bajo riego | ✅ Sí | Plan de riego con costo. |
| Menor costo por hectárea, brecha de rinde más chica | ✅ Sí, sin números | Como beneficio. No inventar porcentajes. |
| Demo de 20 minutos con los lotes del cliente | ✅ Sí | CTA de cierre (oferta comercial). |

### 10.5 Mensajes por público

| Público | Lo que gana | Pruebas que lo sostienen |
|---|---|---|
| **Productores** (extensivos e intensivos, en secano o bajo riego) | Proteger el margen de cada hectárea: actuar antes del período crítico y no gastar insumo donde no hace falta. | Alertas a 4 y 14 días, por ambiente; plan de riego con costo y rinde esperado. |
| **Asesores e ingenieros agrónomos** | Más hectáreas bajo control con el mismo tiempo, y recomendaciones fáciles de defender. | Varias empresas en un lugar, alertas que dicen qué lote y ambiente mirar, reportes en PDF respaldados por clima, balance hídrico y fenología. |

Organizaciones que hoy usan VigIA dentro de RindePlus (1): Aapresid, Agroconsultor, CREA, SpeedAgro. Mencionarlas como prueba social requiere su autorización.

---

## Anexo A: VigIA Herbicidas (fuera del alcance)

**VigIA Herbicidas no forma parte del nuevo producto.** Se queda en RindePlus. Este anexo documenta qué es y qué comparte con Biostrés, para no romperlo al separar y para no migrarlo por error.

### A.1 Qué hace

Riesgo de residuo de herbicidas para el cultivo siguiente (modelo "Marbete"). Por cada aplicación calcula C0, DT50 ajustada por suelo, clima y agua, concentración remanente, RCO/RF, días seguros hasta la siembra y estado ("Siembra segura / Precaución / No sembrar"). Las aplicaciones salen de la planilla del lote, de carga manual o de Unimap/Acronex. El cálculo corre en el backend.

### A.2 Qué comparte con el alcance de VigIA (lo que condiciona el split)

| Recurso | Cómo lo usa Herbicidas |
|---|---|
| Tablas `lluvias` y `riegos` | Las lee con `_agua_del_lote` en `_run_carry_over` (main.py:23922 y 23953). El frontend reutiliza las funciones de agua de `biostresAPI` (`CarryOverDashboard.tsx:1322-1323` y `2744-2761`). |
| `clave_ambiente` | Está definida en su `carry_over_report.py` y Biostrés la importa (main.py:21458, 21505 y 21668). |
| `vigia_climate_freshness.py` y `generar_clima_anual.py` | Gracia del clima y cliente WeatherAPI. |
| Helpers de suelo (main.py:25591-26053) | `_query_muestreos_lote`, `_elegir_muestreo`, más los propios `_arena_de_muestreo` y `_suelo_herbicidas`. |
| Licencia `licencias.vigia` | El mismo flag habilita Herbicidas. |
| Hub `/vig-ia-biostres` | Tiene una tarjeta que lleva a `/vig-ia-herbicidas`. |
| Migración 0113 | Agregó la clave natural a las dos tablas de reportes. |

### A.3 Inventario de lo que se queda en RindePlus

**Backend**
- Archivos: `carry_over_engine.py` (914 líneas, motor puro), `carry_over_report.py` (3360), `carry_over_climate_service.py` (252), `unimap_service.py` (1002, cliente Unimap con caché en memoria de 300 s por worker) y `crypto.py` (221, cifrado Fernet del token de Unimap, `CREDENTIALS_KEY`).
- Endpoints `/vigia-herbicidas/*` (main.py:22394-24670): campañas, suelo, reportes (crear/upsert, ver, borrar, preview, compute, computed-data), aplicaciones del lote (listar, alta, edición, condiciones, baja), campañas del lote y verificación de Unimap.
- Catálogo: `/principios-activos`, `/cultivos-herbicidas`, `/herbicidas` y `/vocabulario-tecnologia` (main.py:18777-19161), con escrituras protegidas por `check_allowed_user_ids`.
- Credenciales de Unimap por empresa: `/empresas/{id}/credenciales*` (main.py:4540-4689).
- Helpers: `_aplicaciones_del_lote` (21550), Unimap y blobs (22545-22703), `_aplicacion_*` (22947-23162), `_scope_ambiente*` (23544-23632), `_siembra_obligatoria` (23726), `_run_carry_over` (23763), `_prefetch_clima_compute` (24486), `_refrescar_unimap` (24535), `_detect_tecnologias` (75).
- Schemas: `CredencialesUnimapWrite`, `EmpresaCredenciales*`, `FilaMarbete*`, `PrincipioActivo*`, `HerbicideRead`, `VocabularioTecnologia*`, `Herbicidas*`, `AplicacionHerbicida*`, `AplicacionesPendientes`, `UnimapVerificar*` y `CampaniaElegible`.

**Tablas:** `reportes_vigia_herbicidas` (UNIQUE `(id_lote, id_campania, modulo)`, FK RESTRICT a `lotes` y `campania`), `aplicaciones_herbicidas` (sin FK a `lotes`), `principios_activos`, `rotacion_marbete` y `vocabulario_tecnologia`. También usa `empresas.credenciales_externas` y las columnas wide de aplicaciones residuales de `ambientes`.

**Migraciones:** 0054, 0056, 0122, 0125, 0126 y 0135 (reportes y aplicaciones); 0049-0050, 0055, 0060-0062, 0066-0081, 0083-0084, 0090-0091, 0127 y 0128 (catálogo).

**Frontend:** `app/vig-ia-herbicidas/` (lista, nuevo, reporte), `components/herbicidas/` (`CarryOverDashboard.tsx` de 5569 líneas, gráficos, `ConcentracionesTable`, PDF), `app/admin/gestion-herbicidas/`, `app/admin/gestion-vocabulario-tecnologia/`, `app/admin/gestion-credenciales/`, `components/credenciales/CredencialesUnimapForm.tsx`, `lib/herbicidas/`, `lib/pdf/captureHerbicidasCharts.ts`, y en `lib/api.ts` los clientes `carryOverAPI`, `herbicidasAPI`, `principiosActivosAPI`, `cultivosHerbicidasAPI`, `vocTecnologiaAPI` y `empresaCredencialesAPI`.

**Lógica del núcleo:** la carga masiva de lotes regenera `aplicaciones_herbicidas` con `origen='planilla'` (`_firma_aplicacion` y `_regenerar_aplicaciones_planilla`, `carga_lotes_service.py` ~l.677-870). La API eCloud/caminoar (main.py:24936-25163) expone aplicaciones de herbicidas desde las columnas de `ambientes`.

**ADRs:** 0008, 0009, 0020-0029 y 0032. `docs/modulo-herbicidas.md` está desactualizado respecto de esos ADRs.

**Tests:** backend `test_vigia_herbicidas_*`, `test_herbicidas_*`, `test_carry_over_*`, `test_aplicaciones_*`, `test_residuales_extendidos`, `test_unimap_service`, `test_empresa_credenciales` y `test_ecloud_api`; frontend `components/herbicidas/__tests__/` (31 archivos) y las pruebas de `app/vig-ia-herbicidas/` y `app/admin/gestion-herbicidas/`.

**Problemas conocidos propios:**
- `DELETE /lotes/{id}` no contempla los reportes de Herbicidas (la FK RESTRICT da un 500) ni `aplicaciones_herbicidas`, que quedan huérfanas.
- `POST /vigia-herbicidas/unimap/verificar` no exige licencia.
- La caché de polígonos de Unimap vive en memoria por worker de gunicorn.
- `idUsuarioCreador`/`idUsuario` de `reportes_vigia_herbicidas` e `id_usuario` de `aplicaciones_herbicidas` no tienen FK.
