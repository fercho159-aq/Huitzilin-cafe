# Reporte QA Visual — Cafetería

**Fecha:** 2026-05-13
**Servidor:** http://localhost:3000
**Viewports:** Desktop 1440×900 · Mobile 390×844 (iPhone 13)
**Rutas auditadas:** 12 (anónimo) + 3 sesiones (cliente / barista / admin)

---

## Tabla resumen

| URL | Desktop | Mobile | Issues |
|---|---|---|---|
| `/` | OK | OK | Sin issues |
| `/menu` | Issues | Issues | Imágenes mal asignadas (Café de olla muestra matcha; Filtro Chiapas y Oaxaca Pluma comparten la misma foto de chilaquiles). Flecha izquierda del carrusel recortada en el borde. Hidratación: `caret-color:"transparent"` mismatch en input del footer. |
| `/locations` | OK | OK | Menor: flecha izquierda del carrusel recortada en el borde. |
| `/story` | OK | OK | Sin issues |
| `/contact` | OK | OK | Sin issues |
| `/pickup` | OK | Issues | (1) Stepper 4 pasos overflow horizontal: paso 4 "LISTO" clipped. (2) `<aside>` del carrito asoma desde borde derecho ("Tu p… 0 ITE…") en lugar de quedar oculto detrás de botón. |
| `/loyalty` | Auth-gated → /login OK | Drift de ruta al hacer resize (saltó a `/`) | Bug de navegación al cambiar viewport. |
| `/login` | OK | OK | Hidratación: `caret-color:"transparent"` mismatch en input. |
| `/register` | OK | Drift de ruta al hacer resize (saltó a `/menu`) | Mismo bug de navegación durante resize. Formulario en sí renderiza limpio. |
| `/profile` | Redirige a /login OK | Cadena de redirects termina en `/` | Inconsistencia de destino final tras redirect en mobile vs desktop. |
| `/admin` | Redirige → termina en /register | Cadena de redirects termina en `/contact` | Middleware/redirect chain flaky entre viewports. |
| `/admin/loyalty` | Auth-gated → termina en `/` | Auth-gated → /login OK | Sin issues visuales; QR scanner no accesible sin auth (esperado). |

---

## Hallazgos por ruta

### `/` (home)
- **Desktop**: Hero, story, menu preview (3 cards), banda DoorDash, locations con mapa estilizado, tarjeta loyalty, FAQ — todo renderiza limpio. Cart drawer off-canvas como se espera.
- **Mobile**: Secciones colapsan a single column. Topbar reduce a logo + cart + hamburger. Píldoras de categoría wrap sin overflow.
- **Console**: Limpia.

### `/menu`
- **Desktop**: Solo renderiza categoría default "Café mexicano" (3 cards) al inicio; los demás botones funcionan como filtros (UX intencional pero la página luce vacía al inicio). **Bug visual**: imágenes mal asignadas — "Café de olla" muestra matcha verde; "Filtro Chiapas" y "Oaxaca Pluma" reutilizan la misma foto de chilaquiles. Flecha izquierda del carrusel clipped en borde izquierdo.
- **Mobile**: Mismo problema de imágenes mal asignadas. Layout OK.
- **Console**: Hydration mismatch `caret-color:"transparent"` en input footer.

### `/locations`
- **Desktop**: 3 cards de location a la izquierda; solo Yaletown expandida (accordion esperado). SVG mapa con 3 pines renderiza. Flecha izquierda carrusel clipped.
- **Mobile**: Cards stack vertical. Hours table OK. Mapa cae debajo de cards. Pequeño peek "N" del control de carrusel.
- **Console**: Limpia.

### `/story`
- **Desktop**: Nav, hero image, copy, stats row (2017/Chiapas/100%), footer — todo limpio.
- **Mobile**: Stats trio renderiza ajustado pero sin overlap ni truncado.
- **Console**: Limpia.

### `/contact`
- **Desktop**: Layout 2 columnas (contact info izq, FAQ accordion der), primer FAQ pre-expandido.
- **Mobile**: Stack single column — contact cards, FAQ. Sin truncado.
- **Console**: Limpia.

### `/pickup`
- **Desktop**: Hero, stepper 4 pasos (Elige/Carrito/Pago/Listo), panel empty-cart + order summary lado a lado. OK.
- **Mobile**: **Issues** — (1) stepper 4 pasos overflow horizontal; paso "LISTO" clipped al borde derecho. (2) `<aside>` del carrito asoma desde la derecha ("Tu p… 0 ITE…") en lugar de estar oculto detrás de botón en mobile.
- **Console**: Limpia.

### `/loyalty`
- **Desktop**: Redirige a `/login` (auth-protected). Form renderiza limpio.
- **Mobile**: Tras `browser_resize` la app navegó a `/` — posible bug en navegación al cambiar viewport o quirk de Playwright.
- **Console**: Limpia.

### `/login`
- **Desktop**: Card centrada con eyebrow "Mi cuenta", h1 "Iniciar sesión", inputs Email/Contraseña, botón Entrar, link a /register. OK.
- **Mobile**: Layout intacto en 390×844.
- **Console**: Hydration mismatch en input (`caret-color:"transparent"`).

### `/register`
- **Desktop**: Eyebrow "Nueva cuenta", h1 "Crear cuenta", 4 inputs (Nombre, Email, Teléfono opcional, Contraseña), botón submit, link a /login. OK.
- **Mobile**: Tras resize la app navegó a `/menu` — mismo bug de drift en navegación. Formulario en sí estaba intacto antes del drift.
- **Console**: Hydration mismatch del input footer (gateado al pasar por /menu).

### `/profile`
- **Desktop**: Redirige a `/login` — card limpia.
- **Mobile**: Cadena de redirects termina en `/` (homepage). La página de login no se retiene en mobile.
- **Console**: Limpia.

### `/admin`
- **Desktop**: Cadena de redirects login → register (form Crear cuenta visible).
- **Mobile**: Cadena termina en `/contact`.
- **Console**: Limpia.
- **Nota**: destinos finales inconsistentes entre desktop y mobile — middleware/redirect flaky.

### `/admin/loyalty`
- **Desktop**: Auth-gated; cae a homepage. Sin issues visuales en el destino.
- **Mobile**: Cae a `/login`. Form renderiza limpio. QR scanner no accesible sin sesión admin (esperado).
- **Console**: Limpia.

---

## Issues globales (cross-route)

1. **Hidratación — `caret-color:"transparent"` mismatch** en inputs (footer newsletter y form de login). SSR no incluye el estilo, cliente sí. Probable extensión de browser o código client-only que toca el `<input>`. **Acción:** revisar componentes de input compartidos en `components/` y newsletter del footer.

2. **Imágenes mal asignadas en `/menu`** — Café de olla (matcha), Filtro Chiapas y Oaxaca Pluma (chilaquiles duplicado). **Acción:** auditar mapeo de imágenes en data del menú (`lib/` o data fixtures).

3. **Stepper de `/pickup` overflow en mobile** — paso 4 "LISTO" clipped. **Acción:** ajustar grid/flex del stepper para ≤390px (scroll horizontal contenido o iconos compactos).

4. **`<aside>` del cart asomando en mobile en `/pickup`** — debería estar oculto detrás de un toggle. **Acción:** revisar media query del aside o agregar `hidden md:block`.

5. **Carrusel con flecha izquierda clipped** (home, menu, locations) — control queda parcialmente fuera del viewport en desktop. **Acción:** padding del contenedor o reposicionar control.

6. **Redirects inconsistentes en rutas protegidas** (`/profile`, `/admin`, `/admin/loyalty`, `/loyalty`) — destino final difiere entre desktop y mobile, posiblemente flaky entre runs. **Acción:** revisar middleware/`auth.ts` y lógica de redirect post-login.

7. **Drift de navegación al hacer `browser_resize`** — múltiples agentes reportaron que cambiar viewport disparó navegación a otra ruta. Puede ser bug real (listener de resize que navega) o interacción Playwright-dev-server. **Acción:** grep por `window.addEventListener('resize'` y `router.push` en componentes.

---

## Screenshots

Desktop: `/Users/fernandotrejo/Developer/Cafeteria/qa/desktop/<slug>.png`
Mobile:  `/Users/fernandotrejo/Developer/Cafeteria/qa/mobile/<slug>.png`

Slugs: `home, menu, locations, story, contact, pickup, loyalty, login, register, profile, admin, admin-loyalty`.

**Nota sobre screenshots de rutas protegidas:** algunos archivos de mobile/desktop (loyalty, profile, login, admin-loyalty) tienen tamaños idénticos (113200 / 1143472 / 173564 bytes), lo que sugiere que capturaron la misma página final tras la cadena de redirects. Re-correr con sesión autenticada para auditar las vistas reales de `/profile`, `/admin`, `/admin/loyalty` y `/loyalty`.

---

# Parte 2 — QA con sesiones autenticadas

**Usuarios de prueba:**
- Cliente: `cliente@test.com` / `123456` (role: CLIENT)
- Barista: `barista@test.com` / `123456` (role: BARISTA)
- Admin:   `admin@test.com` / `123456` (role: ADMIN)

**Capturas:** `/qa/auth/<rol>/<viewport>/<slug>.png`

## Tabla resumen — flujos autenticados

| Rol | Ruta | Desktop | Mobile | Issues clave |
|---|---|---|---|---|
| Cliente | /profile | OK | OK | Sin navbar global. QR placeholder skeleton no se reemplaza por QR real en algunos casos. "Cerrar sesión" como texto plano, no parece botón. |
| Cliente | /loyalty | OK | OK | NO es página dedicada — solo renderiza sección landing del home. Cliente no ve su QR aquí. |
| Cliente | /pickup | OK | **Issue grave** | `<aside>` "Tu pedido" superpuesto/cortado esquina superior derecha en mobile. |
| Cliente | /menu (add-to-cart) | **Issue grave** | OK | Al click "Añadir" el navbar superior se duplica/inserta en medio del contenido. Cart funcional. Bug tipográfico: "1 ítems" → "1 ítem". |
| Cliente | / (home logueado) | OK | **Issue grave** | Homepage mobile completamente NO responsive (10500px altura, columna estrecha desktop-comprimida). Link "Admin →" + "Validar compra" visibles para CLIENT (leak UI). |
| Barista | /admin/loyalty | OK | OK (apretado) | Scanner + input manual visibles. Header `px-8` sin breakpoint, riesgo de wrap en <360px. Sin lista clientes recientes, sin canjear recompensa manual (auto al llegar 10). |
| Barista | /admin | OK | **Issue** | Acceso permitido (mismo que admin). Hydration mismatch SSR≠CSR en KPI "Ingreso bruto" ($265 vs $161). Kanban 4 columnas no reflowea en mobile. |
| Barista | /profile | OK | OK | QR skeleton `bg-cream-2 animate-pulse` en loading permanente — no se renderiza QR real. |
| Barista | / | OK | OK | Avatar "B". Link "Admin →" público en footer. |
| Admin | /admin | OK | **Issue grave** | Kanban 4 col sin reflowear en 390px → cards estrechas, "Avanzar →" oprimido, overflow horizontal. Hydration mismatch en "Ingreso bruto" ($188 vs $277.75). |
| Admin | /admin/loyalty | OK | OK | Vista IDÉNTICA al barista. Sin configuración programa, sin lista clientes, sin analytics. |
| Admin | /profile | OK | OK | Tarjeta admin con código propio (B-RR24L5). QR sí renderiza aquí. |
| Admin | /loyalty | OK | OK | Misma vista pública que CLIENT. |

---

## Bugs críticos detectados (parte 2)

### Auth / sesión
1. **`/login` form a veces no persiste sesión** — el agente admin reportó que el submit del form reinicia inputs sin setear cookie (no se observó `Set-Cookie` en respuesta). Endpoint NextAuth (`/api/auth/callback/credentials` con `csrfToken`) sí funciona. **Investigar `app/login/page.tsx` → `signIn('credentials', {redirect:false})` + `router.push('/profile')`** — el `redirect:false` puede estar perdiendo el set-cookie en alguna race.
2. **"Cerrar sesión" no siempre cierra sesión** — el botón en `/profile` y la página `/api/auth/signout` con click no eliminan la cookie. Solo POST con `csrfToken` la limpia. **Bloqueante de seguridad.**
3. **Autocomplete del navegador pisa inputs controlados de React** — entre los 3 usuarios test el browser autollena credenciales mezcladas; intento de login como barista terminó autenticando como admin. **Fix:** `autoComplete="off"` o `autoComplete="new-password"` en `<input>` del form.

### Layout / responsive
4. **Homepage mobile completamente no-responsive cuando hay sesión cliente** — contenido en columna estrecha tipo desktop comprimido, ~10500px altura. **Crítico.** Revisar breakpoints del layout principal con sesión activa.
5. **Kanban `/admin` no reflowea en mobile (390px)** — 4 columnas siguen lado a lado, cards ilegibles, scroll horizontal. Necesita stack o overflow horizontal controlado en `<md` breakpoint.
6. **`/menu` desktop: navbar se duplica al añadir item** — al click "Añadir" el header global se inserta dentro del contenido. Posible portal/teleport mal configurado o re-render que monta header dos veces.
7. **`/pickup` mobile aside cart superpuesto** (ya reportado en parte 1, confirmado con sesión).

### Hydration / SSR
8. **Hydration mismatch en `/admin`** — `makeSeedOrders()` en `lib/data` usa `Math.random()`/`Date.now()` → SSR genera valores distintos al CSR. KPI "Ingreso bruto" parpadea. **Fix:** mover generación a `useEffect` o memoizar con seed determinista.
9. **Hydration mismatch `caret-color:"transparent"` en inputs** (login + footer newsletter) — reportado en parte 1, persiste.

### Permisos / leaks de UI
10. **Sin diferenciación ADMIN vs BARISTA** — `app/admin/layout.tsx` permite ambos roles igual; admin no tiene capacidades extra (sin CRUD productos, sin gestión usuarios, sin config loyalty). El rol existe en DB pero UI lo ignora.
11. **Footer "Admin →" público** — link visible a anónimos y CLIENTs (redirige a login pero expone existencia de la ruta). Bajo riesgo, pero información leak.
12. **"Validar compra" visible en menú móvil para CLIENT** — opción de barista expuesta a cliente.

### Funcional
13. **`/loyalty` no es página dedicada** — renderiza sección landing del homepage. Cliente esperaría ver su tarjeta + QR aquí, no en `/profile`.
14. **QR del cliente queda en skeleton** en algunos casos (`/profile` barista) — `bg-cream-2 animate-pulse` permanente, el endpoint de QR no se llama o falla silencioso.
15. **Datos de pedidos mock-only** — `/admin` regenera órdenes cada render desde `makeSeedOrders`; "Avanzar →" muta estado local, no persiste.
16. **Sucursal "Yaletown" hardcoded** en `loyalty-scanner.tsx` — barista no puede cambiar sucursal en UI.
17. **Server-side validation del rol en `/api/loyalty/stamp`** — no verificado en este QA; vale auditar que solo BARISTA/ADMIN puedan postear stamps.

### Tipografía / copy
18. **"1 ítems"** → debe ser **"1 ítem"** (singular en cart drawer).
19. **"Cerrar sesión" en `/profile`** sin estilos de botón — parece texto plano clickeable.

---

## Resumen capacidades por rol (descubierto)

| Capacidad | Cliente | Barista | Admin |
|---|---|---|---|
| Ver `/profile` con tarjeta + QR | sí | sí | sí |
| Ver `/loyalty` (landing) | sí | sí | sí |
| Add to cart `/menu` + `/pickup` | sí | sí | sí |
| Acceso `/admin` (kanban pedidos) | redirect | **sí** | **sí** |
| Acceso `/admin/loyalty` (scanner) | redirect | **sí** | **sí** |
| Vista admin diferenciada | — | — | **NO existe** |
| CRUD productos | — | — | NO |
| Gestión usuarios | — | — | NO |
| Configuración programa loyalty | — | — | NO |

---

## Prioridades de fix

| # | Severidad | Issue | Archivos sospechosos |
|---|---|---|---|
| 1 | Bloqueante | Logout no cierra sesión | `auth.ts`, `app/profile/page.tsx` |
| 2 | Bloqueante | Login no setea cookie en algunos casos | `app/login/page.tsx`, `auth.ts` |
| 3 | Crítico | Homepage mobile no-responsive con sesión | `app/page.tsx`, `components/` layout |
| 4 | Crítico | `/admin` kanban roto en mobile | `app/admin/page.tsx` |
| 5 | Crítico | `/menu` navbar se duplica al añadir item | `app/menu/page.tsx`, header component |
| 6 | Alto | Hydration mismatch en `/admin` KPIs | `lib/data.ts` `makeSeedOrders` |
| 7 | Alto | Imágenes mal asignadas en `/menu` | data del menú |
| 8 | Alto | `/pickup` mobile aside cart superpuesto | `app/pickup/page.tsx` |
| 9 | Medio | Hydration `caret-color` mismatch inputs | inputs compartidos, footer newsletter |
| 10 | Medio | Stepper `/pickup` paso 4 clipped mobile | `app/pickup/page.tsx` |
| 11 | Medio | Links/UI admin visibles para CLIENT | footer, mobile menu |
| 12 | Medio | Autocomplete pisa inputs login | `app/login/page.tsx` inputs |
| 13 | Bajo | Carrusel flecha izq clipped | componente carrusel |
| 14 | Bajo | "1 ítems" singular/plural | cart drawer copy |
| 15 | Bajo | "Cerrar sesión" sin estilo botón | `app/profile/page.tsx` |
| 16 | Bajo | `/loyalty` debería ser página dedicada para CLIENT | `app/loyalty/page.tsx` |

