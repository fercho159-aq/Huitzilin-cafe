/* Café Boréal — Admin order panel (live) */

const STATUS_COLORS = {
  new: "#FF8A75",
  prep: "#E8C9A6",
  ready: "#9CC07C",
  done: "rgba(245,239,230,0.4)",
};

function fmtAgo(ts, t) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}${t.admin.sec}`;
  return `${Math.floor(diff / 60)}${t.admin.min}`;
}

function OrderCard({ order, lang, onAdvance, t, fresh }) {
  const channelLabel = CHANNEL_NAMES[order.channel][lang];
  const urgent = order.status === "new" && (Date.now() - order.placedAt) > 90000;
  return (
    <div className={"order-card" + (urgent ? " urgent" : "") + (fresh ? " fresh" : "")}>
      <div className="order-top">
        <span className="order-num">{order.id}</span>
        <span className="order-time"><Icon name="clock" size={10} /> {fmtAgo(order.placedAt, t)} {t.admin.ago}</span>
      </div>
      <div className="order-customer">{order.customer}</div>
      <span className={"order-channel " + order.channel}>
        {order.channel === "doordash" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--doordash)" }}></span>}
        {channelLabel}
      </span>
      <div className="order-items">
        {order.lines.map((l, i) => (
          <div key={i}>{l.qty}× {l.name[lang]}</div>
        ))}
      </div>
      <div className="order-foot">
        <span className="order-total">${order.total.toFixed(2)}</span>
        {order.status !== "done" && (
          <button className="order-action" onClick={() => onAdvance(order.id)}>{t.admin.advance}</button>
        )}
      </div>
    </div>
  );
}

function Admin({ setRoute }) {
  const { t, lang } = useT();
  const [orders, setOrders] = useStateC(() => makeSeedOrders(Date.now()));
  const [freshIds, setFreshIds] = useStateC(new Set());
  const [tick, setTick] = useStateC(0);

  // Re-render every 5s for live "ago" timers
  useEffectC(() => {
    const id = setInterval(() => setTick(x => x + 1), 5000);
    return () => clearInterval(id);
  }, []);

  // Inject a new order every 12-22s
  useEffectC(() => {
    function spawn() {
      const items = MENU_ITEMS;
      const lineCount = 1 + Math.floor(Math.random() * 3);
      const lines = [];
      let total = 0;
      for (let j = 0; j < lineCount; j++) {
        const it = items[Math.floor(Math.random() * items.length)];
        const qty = 1 + Math.floor(Math.random() * 2);
        lines.push({ id: it.id, qty, name: it.name, price: it.price });
        total += it.price * qty;
      }
      const id = `B-${2400 + Math.floor(Math.random() * 600)}`;
      const newOrder = {
        id,
        customer: SAMPLE_CUSTOMERS[Math.floor(Math.random() * SAMPLE_CUSTOMERS.length)],
        channel: Math.random() > 0.5 ? "pickup" : "doordash",
        status: "new",
        placedAt: Date.now(),
        lines,
        total: Math.round(total * 100) / 100,
      };
      setOrders(o => [newOrder, ...o].slice(0, 60));
      setFreshIds(s => new Set([...s, id]));
      setTimeout(() => setFreshIds(s => { const n = new Set(s); n.delete(id); return n; }), 1500);
    }
    let timeout;
    function loop() { spawn(); timeout = setTimeout(loop, 12000 + Math.random() * 10000); }
    timeout = setTimeout(loop, 8000);
    return () => clearTimeout(timeout);
  }, []);

  const advance = useCallbackC((id) => {
    setOrders(orders => orders.map(o => {
      if (o.id !== id) return o;
      const next = o.status === "new" ? "prep" : o.status === "prep" ? "ready" : o.status === "ready" ? "done" : "done";
      return { ...o, status: next };
    }));
  }, []);

  const cols = ["new", "prep", "ready", "done"];
  const grouped = cols.reduce((acc, c) => { acc[c] = orders.filter(o => o.status === c); return acc; }, {});

  const todayOrders = orders.length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const ddCount = orders.filter(o => o.channel === "doordash").length;
  const puCount = orders.filter(o => o.channel === "pickup").length;
  const ddPct = todayOrders ? Math.round((ddCount / todayOrders) * 100) : 0;
  const puPct = 100 - ddPct;

  const STATUS_LABELS = {
    new: t.admin.cols.new,
    prep: t.admin.cols.prep,
    ready: t.admin.cols.ready,
    done: t.admin.cols.done,
  };

  return (
    <div className="admin-wrap page">
      <div className="admin-head">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="brand-mark"><img src="images/logo.png" alt="Huitzitzilin Cafe logo" /></span>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, color: "var(--cream)" }}>{t.admin.title}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,239,230,0.55)", marginTop: 2 }}>
              Huitzitzilin Cafe · Yaletown · {new Date().toLocaleDateString(t.locale)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cream)" }}>
            <span className="dd-banner-dot" style={{ background: "#9CC07C" }}></span>
            {t.admin.live}
          </span>
          <button className="btn btn-cream btn-sm" onClick={() => setRoute("home")}>{t.admin.backToSite}</button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">{t.admin.todayOrders}</div>
          <div className="admin-stat-value">{todayOrders}<span className="admin-stat-delta">+{Math.floor(todayOrders * 0.08)}</span></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">{t.admin.revenue}</div>
          <div className="admin-stat-value">${revenue.toFixed(2)}<span className="admin-stat-delta">+12.4%</span></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">{t.admin.avgPrep}</div>
          <div className="admin-stat-value">9.2 <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "rgba(245,239,230,0.55)" }}>{t.admin.avgPrepUnit}</span></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">{t.admin.pickupShare}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28 }}>{puPct}<span style={{ fontSize: 18, color: "rgba(245,239,230,0.5)" }}>/</span>{ddPct}</div>
            <div style={{ flex: 1, height: 6, background: "rgba(245,239,230,0.1)", borderRadius: 999, overflow: "hidden", display: "flex" }}>
              <div style={{ width: `${puPct}%`, background: "#E8C9A6" }}></div>
              <div style={{ width: `${ddPct}%`, background: "var(--doordash)" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        {cols.map(c => (
          <div key={c} className="admin-col">
            <div className="admin-col-head">
              <div className="admin-col-name">
                <span className="admin-col-dot" style={{ background: STATUS_COLORS[c] }}></span>
                {STATUS_LABELS[c]}
              </div>
              <span className="admin-col-count">{grouped[c].length}</span>
            </div>
            {grouped[c].sort((a, b) => a.placedAt - b.placedAt).map(o => (
              <OrderCard key={o.id} order={o} lang={lang} onAdvance={advance} t={t} fresh={freshIds.has(o.id)} />
            ))}
            {grouped[c].length === 0 && (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(245,239,230,0.35)", textAlign: "center", padding: "20px 0", letterSpacing: "0.1em", textTransform: "uppercase" }}>—</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Admin });
