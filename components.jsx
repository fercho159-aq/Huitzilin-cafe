/* Café Boréal — shared UI components */

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC, useMemo: useMemoC, useCallback: useCallbackC } = React;

function Icon({ name, size = 18 }) {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
    case "pin":
      return <svg {...common}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case "bag":
      return <svg {...common}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
    case "chev":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "phone":
      return <svg {...common}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "plus": return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "minus": return <svg {...common}><path d="M5 12h14" /></svg>;
    case "check": return <svg {...common}><path d="m5 12 5 5 9-11" /></svg>;
    case "x": return <svg {...common}><path d="M6 6l12 12M6 18 18 6" /></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "menu": return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    default: return null;
  }
}

function LangSwitcher() {
  const { lang, setLang } = useT();
  return (
    <div className="lang-group" role="group" aria-label="Language">
      {["es", "en", "fr"].map((l) => (
        <button
          key={l}
          className={"lang-btn" + (l === lang ? " active" : "")}
          onClick={() => setLang(l)}
        >{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

function BranchSelector({ branch, setBranch, compact = false }) {
  const { t } = useT();
  const [open, setOpen] = useStateC(false);
  const ref = useRefC(null);
  useEffectC(() => {
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="selector" onClick={() => setOpen(o => !o)}>
        <Icon name="pin" size={14} />
        {compact ? branch.name : `${t.branch.label}: ${branch.name}`}
        <Icon name="chev" size={14} />
      </button>
      {open && (
        <div className="dropdown">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className={"dropdown-item" + (b.id === branch.id ? " active" : "")}
              onClick={() => { setBranch(b); setOpen(false); }}
            >
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500, marginBottom: 2 }}>{b.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.4 }}>{b.address}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 6, color: "var(--ink-soft)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{b.role[useT().lang]} · {b.seats} seats</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Nav({ route, setRoute, branch, setBranch, cartCount, openCart }) {
  const { t } = useT();
  const links = [
    ["home", t.nav.home],
    ["menu", t.nav.menu],
    ["pickup", t.nav.pickup],
    ["story", t.nav.story],
    ["locations", t.nav.locations],
    ["loyalty", t.nav.loyalty],
    ["contact", t.nav.contact],
  ];
  return (
    <nav className="nav">
      <div className="dd-banner">
        <span className="dd-banner-dot"></span>
        <span>{t.dd.banner}</span>
        <span style={{ opacity: 0.6 }}>·</span>
        <a href="#" className="dd-link" onClick={(e) => e.preventDefault()}>{t.dd.cta} →</a>
      </div>
      <div className="nav-row">
        <a className="brand brand--logo-only" href="#" aria-label="Huitzitzilin Cafe" onClick={(e) => { e.preventDefault(); setRoute("home"); }}>
          <span className="brand-mark"><img src="images/logo.png" alt="Huitzitzilin Cafe logo" /></span>
        </a>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <a
              key={id} href="#"
              className={"nav-link" + (route === id ? " active" : "")}
              onClick={(e) => { e.preventDefault(); setRoute(id); }}
            >{label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <LangSwitcher />
          <BranchSelector branch={branch} setBranch={setBranch} compact />
          <button className="icon-btn" onClick={openCart} aria-label="Cart">
            <Icon name="bag" size={18} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setRoute("pickup")}>{t.nav.orderNow}</button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setRoute }) {
  const { t } = useT();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "var(--cream)" }}>
              <span className="brand-mark"><img src="images/logo.png" alt="Huitzitzilin Cafe logo" /></span>
              <span>Huitzitzilin Cafe</span>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="footer-input"
                placeholder={t.footer.newsletterPh}
                style={{
                  flex: 1, background: "transparent",
                  border: "1px solid rgba(245,239,230,0.25)",
                  borderRadius: 999, padding: "10px 16px",
                  color: "var(--cream)", fontSize: 13, fontFamily: "inherit",
                }}
              />
              <button className="btn btn-cream btn-sm">{t.footer.subscribe}</button>
            </div>
          </div>
          <div>
            <div className="footer-col-title">{t.footer.help}</div>
            {t.footer.help_links.map((l, i) => (
              <a key={i} className="footer-link" href="#" onClick={(e) => { e.preventDefault(); if (i === 0) setRoute("pickup"); if (i === 1) setRoute("loyalty"); }}>{l}</a>
            ))}
          </div>
          <div>
            <div className="footer-col-title">{t.footer.visit}</div>
            {t.footer.visit_links.map((l, i) => (
              <a key={i} className="footer-link" href="#" onClick={(e) => { e.preventDefault(); if (i < 3) setRoute("locations"); }}>{l}</a>
            ))}
          </div>
          <div>
            <div className="footer-col-title">{t.footer.legal}</div>
            {t.footer.legal_links.map((l, i) => (
              <a key={i} className="footer-link" href="#" onClick={(e) => e.preventDefault()}>{l}</a>
            ))}
            <div style={{ marginTop: 18 }}>
              <a className="footer-link" href="#" onClick={(e) => { e.preventDefault(); setRoute("admin"); }} style={{ opacity: 0.7 }}>{t.nav.admin} →</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.copyright}</span>
          <span>ES · EN · FR</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, LangSwitcher, BranchSelector, Nav, Footer });
