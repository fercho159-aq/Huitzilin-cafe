/* Café Boréal — page sections (home, about, menu, locations, loyalty, contact) */

const HERO_IMG = "images/interior.jpg";

function Hero({ setRoute }) {
  const { t } = useT();
  const titleEm = t.hero.titleEm;
  return (
    <section className="hero">
      <img className="hero-img" src={HERO_IMG} alt="Huitzitzilin Cafe interior" />
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-eyebrow">{t.hero.eyebrow}</div>
          <h1>
            {t.hero.title.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === titleEm ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-ctas">
            <button className="btn btn-lg hero-btn-primary" onClick={() => setRoute("pickup")}>
              {t.hero.ctaPrimary} <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn-lg hero-btn-ghost" onClick={() => setRoute("menu")}>
              {t.hero.ctaGhost}
            </button>
          </div>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-cell">
            <div className="hero-meta-label">{t.hero.m1Label}</div>
            <div className="hero-meta-value">{t.hero.m1Value}</div>
            <div className="hero-meta-value-sm" style={{ color: "rgba(245,239,230,0.6)" }}>{t.hero.m1Sub}</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">{t.hero.m2Label}</div>
            <div className="hero-meta-value">{t.hero.m2Value}</div>
            <div className="hero-meta-value-sm" style={{ color: "rgba(245,239,230,0.6)" }}>{t.hero.m2Sub}</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">{t.hero.m3Label}</div>
            <div className="hero-meta-value">{t.hero.m3Value}</div>
            <div className="hero-meta-value-sm" style={{ color: "rgba(245,239,230,0.6)" }}>{t.hero.m3Sub}</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">{t.hero.m4Label}</div>
            <div className="hero-meta-value">{t.hero.m4Value}</div>
            <div className="hero-meta-value-sm" style={{ color: "rgba(245,239,230,0.6)" }}>{t.hero.m4Sub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t, lang } = useT();
  return (
    <section className="section" id="story">
      <div className="container">
        <div className="about-grid">
          <div className="about-img">
            <img src="images/hummingbird.jpg" alt="Huitzitzilin Cafe — pintura del colibrí" />
            <div className="about-stamp">{t.about.stamp}</div>
          </div>
          <div className="about-text">
            <div className="eyebrow" style={{ marginBottom: 24 }}>{t.about.eyebrow}</div>
            <h2 style={{ marginBottom: 32 }}>
              {t.about.title.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {i === 1 ? <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>{line}</em> : line}
                </span>
              ))}
            </h2>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <div className="about-stats">
              <div>
                <div className="stat-num">{t.about.stat1Num}</div>
                <div className="stat-label">{t.about.stat1Label}</div>
              </div>
              <div>
                <div className="stat-num">{t.about.stat2Num}</div>
                <div className="stat-label">{t.about.stat2Label}</div>
              </div>
              <div>
                <div className="stat-num">{t.about.stat3Num}</div>
                <div className="stat-label">{t.about.stat3Label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ addToCart, cart }) {
  const { t, lang } = useT();
  const [cat, setCat] = useStateC("coffee");
  const [filter, setFilter] = useStateC("all");
  const cats = ["coffee", "espresso", "pastries", "brunch", "cold"];

  const items = useMemoC(() => {
    return MENU_ITEMS.filter(it => it.cat === cat).filter(it => {
      if (filter === "all") return true;
      return it.tags.includes(filter);
    });
  }, [cat, filter]);

  const filterKeys = ["all", "vegan", "gf", "df", "new", "popular"];

  return (
    <section className="section" id="menu">
      <div className="container">
        <div className="menu-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.menu.eyebrow}</div>
            <h2>
              {t.menu.title.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {i === 1 ? <em style={{ fontStyle: "italic" }}>{line}</em> : line}
                </span>
              ))}
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: "var(--ink-muted)", fontSize: 15 }}>{t.menu.sub}</p>
        </div>

        <div className="menu-cats">
          {cats.map(c => {
            const count = MENU_ITEMS.filter(it => it.cat === c).length;
            return (
              <button key={c} className={"menu-cat" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>
                {t.menu.cats[c]} <span className="menu-cat-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="filters">
          {filterKeys.map(f => {
            const count = f === "all"
              ? MENU_ITEMS.filter(it => it.cat === cat).length
              : MENU_ITEMS.filter(it => it.cat === cat && it.tags.includes(f)).length;
            return (
              <button
                key={f}
                className={"chip" + (filter === f ? " active" : "")}
                onClick={() => setFilter(f)}
              >
                {t.menu.filters[f]} <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="menu-grid">
          {items.map(it => {
            const inCart = cart[it.id];
            return (
              <div key={it.id} className="menu-item">
                <div className="menu-item-img">
                  <img src={it.img} alt={it.name[lang]} loading="lazy" />
                  <div className="menu-item-tags">
                    {it.tags.map(tag => (
                      <span key={tag} className={"tag tag-" + tag}>{t.menu.filters[tag] || tag}</span>
                    ))}
                  </div>
                </div>
                <div className="menu-item-body">
                  <div className="menu-item-row">
                    <div className="menu-item-name">{it.name[lang]}</div>
                    <div className="menu-item-price">${it.price.toFixed(2)}</div>
                  </div>
                  <div className="menu-item-desc">{it.desc[lang]}</div>
                  <button
                    className={"menu-item-add" + (inCart ? " added" : "")}
                    onClick={() => addToCart(it.id)}
                  >
                    {inCart ? <><Icon name="check" size={14} /> {t.menu.added} · {inCart}</> : <><Icon name="plus" size={14} /> {t.menu.add}</>}
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
              <div className="empty-state-icon">∅</div>
              <div>—</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VancouverMap({ activeId, onPin }) {
  // simple stylized map of central Vancouver
  return (
    <div className="map-wrap">
      <svg className="map-svg" viewBox="0 0 100 75" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(139,90,60,0.08)" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="#EDE3D2" />
        <rect width="100" height="75" fill="url(#grid)" />
        {/* Water — False Creek + English Bay */}
        <path d="M 0,40 C 20,38 30,46 50,42 C 70,38 80,52 100,48 L 100,75 L 0,75 Z" fill="#C8D5C8" opacity="0.7" />
        <path d="M 0,12 C 25,8 45,18 60,14 C 75,10 90,16 100,14 L 100,0 L 0,0 Z" fill="#C8D5C8" opacity="0.7" />
        {/* Streets */}
        <g stroke="rgba(139,90,60,0.22)" strokeWidth="0.4" fill="none">
          <line x1="0" y1="56" x2="100" y2="56" />
          <line x1="0" y1="64" x2="100" y2="64" />
          <line x1="0" y1="48" x2="100" y2="48" />
          <line x1="56" y1="0" x2="56" y2="75" />
          <line x1="64" y1="0" x2="64" y2="75" />
          <line x1="38" y1="0" x2="38" y2="75" />
          <line x1="20" y1="0" x2="20" y2="75" />
          <line x1="80" y1="0" x2="80" y2="75" />
        </g>
        {/* Granville bridge */}
        <line x1="30" y1="40" x2="34" y2="56" stroke="rgba(139,90,60,0.4)" strokeWidth="0.6" />
        {/* Park */}
        <ellipse cx="14" cy="30" rx="10" ry="8" fill="#C8D5B5" opacity="0.6" />
        <text x="14" y="32" fontFamily="var(--font-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">Stanley Pk</text>
        <text x="50" y="42" fontFamily="var(--font-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">False Creek</text>
        <text x="14" y="14" fontFamily="var(--font-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">English Bay</text>
      </svg>
      {BRANCHES.map((b, i) => (
        <div
          key={b.id}
          className={"map-pin" + (b.id === activeId ? " active" : "")}
          style={{ left: `${b.coords.x}%`, top: `${b.coords.y}%` }}
          onClick={() => onPin(b)}
        >
          <div className="map-pin-circle">
            <span className="map-pin-label">{i + 1}</span>
          </div>
        </div>
      ))}
      <div className="map-info">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>Vancouver, BC</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 500 }}>3 sucursales</div>
      </div>
    </div>
  );
}

function Locations({ branch, setBranch }) {
  const { t, lang } = useT();
  return (
    <section className="section" style={{ background: "var(--cream-2)" }} id="locations">
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t.locations.eyebrow}</div>
          <h2 style={{ marginBottom: 22 }}>
            {t.locations.title.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === 2 ? <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>{line}</em> : line}
              </span>
            ))}
          </h2>
          <p style={{ color: "var(--ink-muted)", fontSize: 16, maxWidth: 580 }}>{t.locations.sub}</p>
        </div>
        <div className="loc-grid">
          <div className="loc-list">
            {BRANCHES.map((b, i) => {
              const active = b.id === branch.id;
              const today = (new Date().getDay() + 6) % 7; // Monday=0
              return (
                <div key={b.id} className={"loc-card" + (active ? " active" : "")} onClick={() => setBranch(b)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
                    <div>
                      <div className="loc-name">{i + 1}. {b.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: active ? "rgba(245,239,230,0.7)" : "var(--ink-muted)", marginBottom: 12 }}>
                        {b.role[lang]} · {b.seats} seats
                      </div>
                    </div>
                    <span className="loc-status">
                      <span className="loc-status-dot"></span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.branch.open}</span>
                    </span>
                  </div>
                  <div className="loc-addr">{b.address}</div>
                  <div className="loc-meta">
                    <span>{b.phone}</span>
                  </div>
                  {active && (
                    <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(245,239,230,0.18)" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, color: "rgba(245,239,230,0.7)" }}>{t.locations.hoursTitle}</div>
                      <div className="hours-grid">
                        {t.locations.days.map((d, di) => (
                          <React.Fragment key={d}>
                            <div className={"hours-day" + (di === today ? " today" : "")} style={di === today ? { color: "var(--cream)", fontWeight: 600 } : {}}>{d}</div>
                            <div className="hours-time" style={di === today ? { color: "var(--cream)", fontWeight: 600 } : { color: "rgba(245,239,230,0.85)" }}>{b.hours[di]}</div>
                          </React.Fragment>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                        <button className="btn btn-cream btn-sm">{t.locations.directions}</button>
                        <button className="btn btn-sm" style={{ background: "transparent", color: "var(--cream)", border: "1px solid rgba(245,239,230,0.4)" }}>{t.locations.callUs}</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <VancouverMap activeId={branch.id} onPin={setBranch} />
        </div>
      </div>
    </section>
  );
}

function Loyalty({ setRoute }) {
  const { t } = useT();
  const stamps = 7; // demo state
  return (
    <section className="section" id="loyalty">
      <div className="container">
        <div className="loyalty-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t.loyalty.eyebrow}</div>
            <h2 style={{ marginBottom: 22 }}>
              {t.loyalty.title.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {i === 1 ? <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>{line}</em> : line}
                </span>
              ))}
            </h2>
            <p style={{ color: "var(--ink-muted)", fontSize: 16, maxWidth: 480, marginBottom: 32 }}>{t.loyalty.sub}</p>
            <div>
              <div className="loyalty-tier"><div className={"tier-num" + (stamps < 5 ? " active" : "")}>1</div><div className="tier-text"><strong>{t.loyalty.tiers.t1Title}</strong><span>{t.loyalty.tiers.t1Desc}</span></div></div>
              <div className="loyalty-tier"><div className={"tier-num" + (stamps >= 5 && stamps < 10 ? " active" : "")}>2</div><div className="tier-text"><strong>{t.loyalty.tiers.t2Title}</strong><span>{t.loyalty.tiers.t2Desc}</span></div></div>
              <div className="loyalty-tier"><div className={"tier-num" + (stamps >= 10 ? " active" : "")}>3</div><div className="tier-text"><strong>{t.loyalty.tiers.t3Title}</strong><span>{t.loyalty.tiers.t3Desc}</span></div></div>
            </div>
            <button className="btn btn-primary btn-lg" style={{ marginTop: 32 }} onClick={() => setRoute("pickup")}>{t.loyalty.join} <Icon name="arrow" size={16} /></button>
          </div>
          <div>
            <div className="loyalty-card">
              <div className="loyalty-card-top">
                <div>
                  <div className="loyalty-card-name">{t.loyalty.memberCard}</div>
                  <div className="loyalty-card-num">B-2406-0142</div>
                </div>
                <div className="loyalty-card-mark">B</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.7)", marginBottom: 12 }}>
                  {t.loyalty.progress} <span style={{ color: "var(--cream)", fontWeight: 600 }}>{stamps}</span> {t.loyalty.progressOf} 10 {t.loyalty.stamps}
                </div>
                <div className="loyalty-card-stamps">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={"stamp" + (i < stamps ? " filled" : i === stamps ? " next" : "")}>
                      {i < stamps ? "B" : i === stamps ? "•" : ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useT();
  const [openIdx, setOpenIdx] = useStateC(0);
  return (
    <section className="section" style={{ background: "var(--cream-2)" }} id="contact">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t.contact.eyebrow}</div>
          <h2>
            {t.contact.title.map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="faq-grid">
          <div>
            <div className="contact-card">
              <div className="contact-label">{t.contact.addrTitle}</div>
              <div className="contact-value">{t.contact.addrValue}</div>
            </div>
            <div className="contact-card">
              <div className="contact-label">{t.contact.phoneTitle}</div>
              <div className="contact-value">{t.contact.phoneValue}</div>
            </div>
            <div className="contact-card">
              <div className="contact-label">{t.contact.emailTitle}</div>
              <div className="contact-value" style={{ fontSize: 18 }}>{t.contact.emailValue}</div>
            </div>
          </div>
          <div>
            {t.contact.faqs.map((f, i) => (
              <div key={i} className={"faq-item" + (openIdx === i ? " open" : "")} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-icon">{openIdx === i ? "−" : "+"}</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DoorDashStrip() {
  const { t } = useT();
  return (
    <section style={{ background: "var(--ink)", color: "var(--cream)", padding: "56px 0" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1.4fr auto", gap: 40, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF8A75", marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--doordash)" }}></span>
            DoorDash · {t.dd.tag}
          </div>
          <h2 style={{ color: "var(--cream)", marginBottom: 16, maxWidth: 640 }}>{t.dd.headline}</h2>
          <p style={{ maxWidth: 540, color: "rgba(245,239,230,0.75)", fontSize: 16 }}>{t.dd.sub}</p>
          <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", color: "rgba(245,239,230,0.55)", textTransform: "uppercase" }}>
            <span>● {t.dd.sync} 2 {t.dd.ago}</span>
            <span>● 18/18 ítems</span>
            <span>● 25–35 min</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn btn-cream btn-lg">{t.dd.cta} <Icon name="arrow" size={16} /></button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "rgba(245,239,230,0.5)", textAlign: "center" }}>doordash.com/store/casa-colibri</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, About, MenuSection, Locations, Loyalty, ContactSection, DoorDashStrip });
