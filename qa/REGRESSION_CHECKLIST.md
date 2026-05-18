# Checklist de Regresión — Cafetería

**Fecha:** 2026-05-13
**Servidor:** http://localhost:3000
**Usuarios de prueba:**
- Cliente: `cliente@test.com` / `123456`
- Barista: `barista@test.com` / `123456`
- Admin:   `admin@test.com` / `123456`

Leyenda estado: `Pendiente` | `Roto (baseline)` | `Fixed` | `Parcial` | `Pendiente recheck` | `NUEVO`

---

## Bloqueantes / Críticos

| # | Bug | Cómo reproducir | Resultado esperado tras fix | Estado |
|---|---|---|---|---|
| 1 | Logout no cierra sesión | Login admin/cliente → `/profile` → click "Cerrar sesión" → `GET /api/auth/session` | Cookie removida, `/api/auth/session` retorna `null`. | **Fixed** — verificado: tras click, `fetch('/api/auth/session')` retorna `null` y redirige a `/`. |
| 2 | Login a veces no setea cookie | En `/login` ingresar credenciales válidas → submit → verificar `Set-Cookie` | Cookie de sesión presente y `useSession()` devuelve user. | **Fixed** — login UI con admin y cliente: ambos setean cookie y redirigen a `/profile`. |
| 3 | Homepage mobile no-responsive con sesión cliente | Login cliente → `/` viewport 390×844 → medir `document.documentElement.scrollHeight` | Altura ≤ ~3000px; layout mobile-first. | **Roto (baseline)** — `scrollHeight` = **10652px**, sigue desktop-comprimido. Ver `baseline/06b-home-mobile-cliente-full.jpeg`. |
| 4 | `/admin` kanban no reflowea en mobile | Login admin → `/admin` viewport 390×844 | Stack vertical o scroll horizontal contenido; cards legibles. | **Fixed** — kanban usa `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. En 390px renderiza 1 columna; overflowX = 0. |
| 5 | `/menu` navbar se duplica al añadir item (desktop) | Login cliente → `/menu` desktop → click "Añadir" | Header global único, sin duplicado. | **Fixed** — verificado pre/post click: `nav.length=1`, `header.length=0`, `logo.length=1`. |

## Altos

| # | Bug | Cómo reproducir | Resultado esperado tras fix | Estado |
|---|---|---|---|---|
| 6 | Hydration mismatch en `/admin` (KPI "Ingreso bruto") | Login admin → DevTools console → `/admin` | Sin warning hydration. KPI estable SSR↔CSR. | **Fixed** — SSR ahora rinde `$0.00` estable en 3 corridas; CSR popula vía effect. Sin error en console actual. |
| 7 | Imágenes mal asignadas en `/menu` (Café de olla → matcha; Filtro Chiapas y Oaxaca Pluma comparten chilaquiles) | Abrir `/menu` → inspeccionar cards | Cada producto muestra imagen acorde a su nombre. | **Parcial** — "Café de olla" ahora muestra `cafe-de-olla.jpg` (Fixed). "Filtro Chiapas" y "Oaxaca Pluma" siguen ambos con `cafe-talavera.jpg` (que es chilaquiles). Necesita asignar imágenes únicas. |
| 8 | `/pickup` mobile: `<aside>` cart superpuesto/overflow | viewport 390×844 → `/pickup` → medir `scrollWidth` vs `clientWidth` | overflowX = 0, aside oculto detrás de toggle. | **Roto (baseline)** — `scrollWidth=458`, `clientWidth=390`, **overflowX=68px**. Aside en `x=390` (justo en borde). Ver `baseline/03-pickup-mobile-aside-stepper.png`. |

## Medios

| # | Bug | Cómo reproducir | Resultado esperado tras fix | Estado |
|---|---|---|---|---|
| 9 | Hydration mismatch `caret-color:"transparent"` en inputs | `/login` → console errors | Sin warning hydration por caret-color. | **Fixed** — 0 errores de console en `/login` y `/menu`. Logs antiguos eran de sesión previa. |
| 10 | Stepper `/pickup` paso 4 ("LISTO") clipped en mobile | 390×844 → `/pickup` → posición de "LISTO" | x < 390 y completamente visible. | **Roto (baseline)** — "LISTO" en `x=414` (fuera del viewport 390). |
| 11 | UI admin visible para CLIENT (footer "Admin →" + "Validar compra" mobile menu) | Login cliente → ver footer y hamburger menu mobile | Sin link "Admin →" ni "Validar compra" para CLIENT. | **Parcial** — "Validar compra" ya NO aparece en menu mobile (Fixed). Footer "Admin →" **sigue público** para CLIENT (link a `/admin`). |
| 12 | Autocomplete del navegador pisa inputs login | `/login` con credenciales en autofill → submit | `autoComplete` adecuado en inputs. | **Fixed** — `input[type=email]` tiene `autocomplete="email"`, password tiene `autocomplete="current-password"`. Nota: name del input password es literalmente `"current-password"`, lo que confunde mensajes de DevTools (verbose log) pero el atributo está correcto. |

## Bajos

| # | Bug | Cómo reproducir | Resultado esperado tras fix | Estado |
|---|---|---|---|---|
| 13 | Carrusel flecha izquierda clipped (home, menu, locations) | Desktop 1440 → ver carruseles | Flecha íntegra dentro del viewport. | **Pendiente recheck** — sin selectores aria-label específicos para validar programáticamente. Requiere comparación visual posterior. |
| 14 | "1 ítems" → "1 ítem" (cart drawer) | Cliente → `/menu` → añadir 1 ítem → ver aside | "1 ítem" en singular. | **Roto (baseline)** — verificado: el aside muestra "1 ítems" al tener exactamente 1 ítem. |
| 15 | "Cerrar sesión" sin estilo de botón en `/profile` | Login cliente → `/profile` → ver elemento | Botón con estilos del sistema. | **Fixed** — `<button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-paper text-ink text-sm font-semibold hover:bg-ink hover:text-cream transition-colors">`. |
| 16 | `/loyalty` debería ser página dedicada para CLIENT (no copia del landing) | Login cliente → `/loyalty` | Tarjeta + QR del cliente. | **Roto (baseline)** — h1 sigue siendo "Diez cafés. El undécimo, de la casa." (sección del home); sin QR ni datos del cliente. |

## Cross-route / globales (parte 1)

| # | Bug | Cómo reproducir | Resultado esperado tras fix | Estado |
|---|---|---|---|---|
| 17 | Redirects inconsistentes en rutas protegidas | Anónimo → visitar `/profile`, `/admin`, `/admin/loyalty` y observar URL final | Redirect consistente a `/login?callbackUrl=...`. | **Fixed** — `curl -I` muestra `307 /login?callbackUrl=%2F<route>` consistente para las 3 rutas. |
| 18 | Drift de navegación al hacer `browser_resize` | Anónimo → resize entre viewports | URL estable. | **Pendiente recheck** — al cambiar viewport con Playwright durante esta sesión la URL se mantuvo en `/pickup`, `/admin`, etc. No se reprodujo. Posible flake original de Playwright. |
| 19 | `/admin/loyalty` no diferencia ADMIN vs BARISTA | Login admin vs barista → `/admin/loyalty` | UI distinta para admin. | **Roto (baseline)** — HTML idéntico (25795 vs 25760 bytes, mismo h2 "Acreditar stamp"). Sin capacidades extra para admin. |
| 20 | QR del cliente queda en skeleton (`bg-cream-2 animate-pulse`) | Login barista → `/profile` | Canvas/img QR real. | **Roto (baseline)** — SSR del barista muestra `bg-cream-2 rounded-xl animate-pulse` y 0 `<canvas>` o data-URI. |

## Bugs adicionales / nuevos detectados

| # | Bug | Cómo reproducir | Resultado esperado | Estado |
|---|---|---|---|---|
| 21 | [NUEVO] `/login` accesible aún con sesión activa | Login admin → ir a `/login` | Redirigir a `/profile` o `/` si ya hay sesión. | Pendiente |
| 22 | [NUEVO] Sucursal "Yaletown" sigue hardcoded en barista panel | Login barista → `/admin/loyalty` → ver header de sucursal | Selector/combobox para elegir sucursal. | Pendiente |
| 23 | [NUEVO] Verbose DevTools "[DOM] Input elements should have autocomplete attributes" | DevTools console en `/login` (verbose) | Sin verbose log; revisar si DOM mantiene `name="current-password"` cuando el browser espera `name="password"`. Probablemente confunde al heurístico de Chrome. | Pendiente |

## Notas operativas

- Probar siempre en **Desktop 1440×900** y **Mobile 390×844**.
- Tras cada bloque de fixes, re-correr items marcados `Pendiente recheck` y `Roto (baseline)`.
- Bug nuevo se agrega con prefijo `[NUEVO]`.
- Para login programático: `POST /api/auth/callback/credentials` con `csrfToken` + `email` + `password` + `redirect=false&json=true`. Cookie `authjs.session-token` queda HttpOnly (no escribible vía `document.cookie`).
