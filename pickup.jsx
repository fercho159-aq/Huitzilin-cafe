/* Café Boréal — Pickup flow: cart drawer, checkout, confirmation */

function CartDrawer({ open, onClose, cart, addToCart, removeFromCart, items, goCheckout }) {
  const { t, lang } = useT();
  const lines = Object.entries(cart).map(([id, qty]) => {
    const it = items.find(i => i.id === id);
    return it ? { ...it, qty } : null;
  }).filter(Boolean);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <>
      <div className={"drawer-mask" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"drawer" + (open ? " open" : "")}>
        <div className="drawer-head">
          <div>
            <div className="drawer-title">{t.pickup.cartTitle}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-muted)", textTransform: "uppercase", marginTop: 2 }}>
              {lines.reduce((s, l) => s + l.qty, 0)} {t.pickup.cartItems}
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">∅</div>
              <p>{t.pickup.cartEmpty}</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={onClose}>{t.pickup.cartEmptyCta}</button>
            </div>
          ) : (
            lines.map(l => (
              <div key={l.id} className="cart-line">
                <div className="cart-line-img"><img src={l.img} alt="" /></div>
                <div>
                  <div className="cart-line-name">{l.name[lang]}</div>
                  <div className="cart-line-meta">${l.price.toFixed(2)} c/u</div>
                  <div className="qty">
                    <button className="qty-btn" onClick={() => removeFromCart(l.id)}><Icon name="minus" size={12} /></button>
                    <span className="qty-num">{l.qty}</span>
                    <button className="qty-btn" onClick={() => addToCart(l.id)}><Icon name="plus" size={12} /></button>
                  </div>
                </div>
                <div className="cart-line-price">${(l.price * l.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="totals-row total">
              <span>{t.pickup.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 14 }} onClick={() => { onClose(); goCheckout(); }}>
              {t.pickup.checkout} <Icon name="arrow" size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function Pickup({ cart, addToCart, removeFromCart, branch, setBranch, clearCart, setRoute }) {
  const { t, lang } = useT();
  const [step, setStep] = useStateC("cart"); // cart → details → confirm
  const [time, setTime] = useStateC("asap");
  const [pay, setPay] = useStateC("card");
  const [tipPct, setTipPct] = useStateC(15);
  const [orderNum, setOrderNum] = useStateC("");
  const [form, setForm] = useStateC({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useStateC({});

  const lines = Object.entries(cart).map(([id, qty]) => {
    const it = MENU_ITEMS.find(i => i.id === id);
    return it ? { ...it, qty } : null;
  }).filter(Boolean);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const tax = subtotal * 0.12;
  const tip = subtotal * (tipPct / 100);
  const total = subtotal + tax + tip;

  const timeSlots = useMemoC(() => {
    const slots = [];
    const now = new Date();
    let m = now.getMinutes();
    let next = Math.ceil(m / 15) * 15;
    let h = now.getHours();
    if (next === 60) { h += 1; next = 0; }
    let baseH = h, baseM = next;
    for (let i = 0; i < 12; i++) {
      const tot = baseH * 60 + baseM + i * 15;
      const hh = Math.floor(tot / 60) % 24;
      const mm = tot % 60;
      slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
    }
    return slots;
  }, [step]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t.pickup.requiredField;
    if (!form.phone.trim()) e.phone = t.pickup.requiredField;
    else if (form.phone.replace(/\D/g, "").length < 10) e.phone = t.pickup.invalidPhone;
    if (!form.email.trim()) e.email = t.pickup.requiredField;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.pickup.invalidEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    const num = `B-${2400 + Math.floor(Math.random() * 600)}`;
    setOrderNum(num);
    setStep("confirm");
  }

  const stepIdx = step === "cart" ? 1 : step === "details" ? 2 : 3;

  return (
    <section className="section" id="pickup">
      <div className="container">
        <div style={{ marginBottom: 36, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t.pickup.eyebrow}</div>
          <h2 style={{ marginBottom: 22 }}>
            {t.pickup.title.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === 1 ? <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>{line}</em> : line}
              </span>
            ))}
          </h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12 }}>
            {t.pickup.heroBenefits.map(b => (
              <span key={b} className="pill"><span className="pill-dot"></span>{b}</span>
            ))}
          </div>
        </div>

        <div className="checkout-step-bar" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          {[t.pickup.step1, t.pickup.step2, t.pickup.step3, t.pickup.step4].map((label, i) => {
            const idx = i + 1;
            const active = idx === stepIdx;
            const done = idx < stepIdx || step === "confirm";
            return (
              <React.Fragment key={i}>
                <div className={"checkout-step" + (active ? " active" : "") + (done ? " done" : "")}>
                  <span className="checkout-step-dot">{done ? "✓" : idx}</span>
                  <span>{label}</span>
                </div>
                {i < 3 && <div className="checkout-step-line"></div>}
              </React.Fragment>
            );
          })}
        </div>

        {step === "cart" && (
          <div className="checkout-wrap">
            <div>
              {lines.length === 0 ? (
                <div className="empty-state" style={{ background: "var(--paper)", borderRadius: "var(--r-lg)", border: "1px solid var(--line-soft)" }}>
                  <div className="empty-state-icon">∅</div>
                  <p style={{ marginBottom: 18 }}>{t.pickup.cartEmpty}</p>
                  <button className="btn btn-primary" onClick={() => setRoute("menu")}>{t.pickup.cartEmptyCta} <Icon name="arrow" size={14} /></button>
                </div>
              ) : (
                <div className="card" style={{ padding: 28 }}>
                  {lines.map(l => (
                    <div key={l.id} className="cart-line">
                      <div className="cart-line-img"><img src={l.img} alt="" /></div>
                      <div>
                        <div className="cart-line-name">{l.name[lang]}</div>
                        <div className="cart-line-meta">${l.price.toFixed(2)}</div>
                        <div className="qty">
                          <button className="qty-btn" onClick={() => removeFromCart(l.id)}><Icon name="minus" size={12} /></button>
                          <span className="qty-num">{l.qty}</span>
                          <button className="qty-btn" onClick={() => addToCart(l.id)}><Icon name="plus" size={12} /></button>
                        </div>
                      </div>
                      <div className="cart-line-price">${(l.price * l.qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="summary-card">
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, marginBottom: 12 }}>{t.pickup.cartTitle}</div>
              <div style={{ marginBottom: 18, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                {t.pickup.pickupAt}: <strong style={{ color: "var(--ink)" }}>{branch.name}</strong>
              </div>
              <div className="totals-row"><span>{t.pickup.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="totals-row"><span>{t.pickup.tax}</span><span>${tax.toFixed(2)}</span></div>
              <div className="totals-row total"><span>{t.pickup.total}</span><span>${(subtotal + tax).toFixed(2)}</span></div>
              <button className="btn btn-primary btn-lg" disabled={lines.length === 0} style={{ width: "100%", marginTop: 18, opacity: lines.length === 0 ? 0.4 : 1 }} onClick={() => setStep("details")}>{t.pickup.checkout} <Icon name="arrow" size={14} /></button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="checkout-wrap">
            <div>
              <div className="card" style={{ padding: 28, marginBottom: 18 }}>
                <h3 style={{ marginBottom: 18 }}>{t.pickup.pickupAt}</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  {BRANCHES.map(b => (
                    <button key={b.id} className={"chip" + (b.id === branch.id ? " active" : "")} onClick={() => setBranch(b)}>{b.name}</button>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-muted)", marginBottom: 22 }}>
                  {branch.address}
                </div>

                <h3 style={{ marginBottom: 18, marginTop: 8 }}>{t.pickup.time}</h3>
                <div className="time-grid">
                  <button className={"time-slot" + (time === "asap" ? " active" : "")} onClick={() => setTime("asap")} style={{ gridColumn: "span 2" }}>{t.pickup.asap}</button>
                  {timeSlots.slice(0, 10).map(s => (
                    <button key={s} className={"time-slot" + (time === s ? " active" : "")} onClick={() => setTime(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 28, marginBottom: 18 }}>
                <h3 style={{ marginBottom: 18 }}>{t.pickup.contact}</h3>
                <div className={"field" + (errors.name ? " error" : "")}>
                  <label className="field-label">{t.pickup.name}</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Émile Tremblay" />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field-row">
                  <div className={"field" + (errors.phone ? " error" : "")}>
                    <label className="field-label">{t.pickup.phone}</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (604) 555-0142" />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  <div className={"field" + (errors.email ? " error" : "")}>
                    <label className="field-label">{t.pickup.email}</label>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="emile@example.ca" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">{t.pickup.notes}</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={t.pickup.notesPh} />
                </div>
              </div>

              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ marginBottom: 18 }}>{t.pickup.payment}</h3>
                <div className={"pay-method" + (pay === "card" ? " active" : "")} onClick={() => setPay("card")}>
                  <div className="pay-method-radio"></div>
                  <div className="pay-method-text">
                    <div className="pay-method-name">{t.pickup.payCard}</div>
                    <div className="pay-method-desc">{t.pickup.payCardDesc}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-muted)" }}>
                    <span style={{ padding: "2px 6px", border: "1px solid var(--line)", borderRadius: 4 }}>VISA</span>
                    <span style={{ padding: "2px 6px", border: "1px solid var(--line)", borderRadius: 4 }}>MC</span>
                    <span style={{ padding: "2px 6px", border: "1px solid var(--line)", borderRadius: 4 }}>AMEX</span>
                  </div>
                </div>
                <div className={"pay-method" + (pay === "apple" ? " active" : "")} onClick={() => setPay("apple")}>
                  <div className="pay-method-radio"></div>
                  <div className="pay-method-text">
                    <div className="pay-method-name">{t.pickup.payApple}</div>
                    <div className="pay-method-desc">{t.pickup.payAppleDesc}</div>
                  </div>
                </div>
                <div className={"pay-method" + (pay === "store" ? " active" : "")} onClick={() => setPay("store")}>
                  <div className="pay-method-radio"></div>
                  <div className="pay-method-text">
                    <div className="pay-method-name">{t.pickup.payStore}</div>
                    <div className="pay-method-desc">{t.pickup.payStoreDesc}</div>
                  </div>
                </div>

                <div style={{ marginTop: 22 }}>
                  <label className="field-label" style={{ marginBottom: 10, display: "block" }}>{t.pickup.tip}</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[0, 10, 15, 18, 20].map(p => (
                      <button key={p} className={"chip" + (tipPct === p ? " active" : "")} onClick={() => setTipPct(p)}>{p}%</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, marginBottom: 18 }}>{t.pickup.cartTitle}</div>
              {lines.map(l => (
                <div key={l.id} className="summary-line">
                  <span className="summary-line-name">{l.name[lang]}</span>
                  <span className="summary-line-qty">×{l.qty}</span>
                  <span className="summary-line-price">${(l.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
              <hr className="divider" style={{ margin: "14px 0" }} />
              <div className="totals-row"><span>{t.pickup.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="totals-row"><span>{t.pickup.tax}</span><span>${tax.toFixed(2)}</span></div>
              <div className="totals-row"><span>{t.pickup.tip} ({tipPct}%)</span><span>${tip.toFixed(2)}</span></div>
              <div className="totals-row total"><span>{t.pickup.total}</span><span>${total.toFixed(2)}</span></div>
              <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 18 }} onClick={submit}>{t.pickup.placeOrder}</button>
              <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 8, background: "transparent", border: "0", color: "var(--ink-muted)" }} onClick={() => setStep("cart")}>← {t.pickup.back}</button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="confirm">
            <div className="confirm-mark">✓</div>
            <h2 style={{ marginBottom: 14 }}>{t.pickup.confirmTitle}</h2>
            <p style={{ color: "var(--ink-muted)", maxWidth: 460, margin: "0 auto", fontSize: 16 }}>{t.pickup.confirmSub}</p>
            <div className="confirm-num">{t.pickup.orderNum} · <strong>{orderNum}</strong></div>
            <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>{t.pickup.pickupAt}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 500 }}>{branch.name}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>{t.pickup.readyAt}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 500 }}>{time === "asap" ? "8–12 min" : time}</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>{t.pickup.total}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 500 }}>${total.toFixed(2)}</div>
              </div>
            </div>

            <div className="confirm-receipt">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 14 }}>Receipt · {orderNum}</div>
              {lines.map(l => (
                <div key={l.id} className="summary-line">
                  <span className="summary-line-name">{l.name[lang]}</span>
                  <span className="summary-line-qty">×{l.qty}</span>
                  <span className="summary-line-price">${(l.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
              <hr className="divider" style={{ margin: "14px 0" }} />
              <div className="totals-row"><span>{t.pickup.subtotal}</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="totals-row"><span>{t.pickup.tax}</span><span>${tax.toFixed(2)}</span></div>
              <div className="totals-row"><span>{t.pickup.tip}</span><span>${tip.toFixed(2)}</span></div>
              <div className="totals-row total"><span>{t.pickup.total}</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button className="btn btn-primary btn-lg" style={{ marginTop: 32 }} onClick={() => { clearCart(); setStep("cart"); setRoute("menu"); }}>{t.pickup.newOrder}</button>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { CartDrawer, Pickup });
