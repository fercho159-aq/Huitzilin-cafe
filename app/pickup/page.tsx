"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useT } from "@/providers/language-provider";
import { useBranch } from "@/providers/branch-provider";
import { useCart } from "@/providers/cart-provider";
import { MENU_ITEMS, BRANCHES } from "@/lib/data";
import { Icon } from "@/components/icons";
import { PageLayout } from "@/components/page-layout";
import { cn } from "@/lib/utils";

export default function PickupPage() {
  const { t, lang } = useT();
  const { branch, setBranch } = useBranch();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [step, setStep] = useState("cart"); // cart → details → confirm
  const [time, setTime] = useState("asap");
  const [pay, setPay] = useState("card");
  const [tipPct, setTipPct] = useState(15);
  const [orderNum, setOrderNum] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const it = MENU_ITEMS.find((i) => i.id === id);
      return it ? { ...it, qty } : null;
    })
    .filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + (l?.price || 0) * (l?.qty || 0), 0);
  const tax = subtotal * 0.12;
  const tip = subtotal * (tipPct / 100);
  const total = subtotal + tax + tip;

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    const now = new Date();
    let m = now.getMinutes();
    let next = Math.ceil(m / 15) * 15;
    let h = now.getHours();
    if (next === 60) {
      h += 1;
      next = 0;
    }
    let baseH = h,
      baseM = next;
    for (let i = 0; i < 12; i++) {
      const tot = baseH * 60 + baseM + i * 15;
      const hh = Math.floor(tot / 60) % 24;
      const mm = tot % 60;
      slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
    }
    return slots;
  }, []);

  function validate() {
    const e: Record<string, string> = {};
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
    <PageLayout>
      <section className="py-24" id="pickup">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="mb-9 max-w-[720px]">
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-ink-muted" />
              {t.pickup.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight mb-5">
              {t.pickup.title.map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-terracotta italic">{line}</em> : line}
                </span>
              ))}
            </h2>
            <div className="flex gap-3.5 flex-wrap mt-3">
              {t.pickup.heroBenefits.map((b: string) => (
                <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-2 text-ink-muted font-mono text-[11px] tracking-widest uppercase border border-line-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-12">
            {[t.pickup.step1, t.pickup.step2, t.pickup.step3, t.pickup.step4].map((label, i) => {
              const idx = i + 1;
              const active = idx === stepIdx;
              const done = idx < stepIdx || step === "confirm";
              return (
                <div key={i} className="flex items-center gap-3 flex-1">
                  <div
                    className={cn(
                      "flex items-center gap-3.5 font-mono text-xs tracking-[0.14em] uppercase",
                      active && "font-semibold",
                      done && "text-ink-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 rounded-full grid place-items-center text-[13px]",
                        done ? "bg-moss text-cream" : active ? "bg-ink text-cream" : "bg-cream-2 text-ink-muted"
                      )}
                    >
                      {done ? "✓" : idx}
                    </span>
                    <span>{label}</span>
                  </div>
                  {i < 3 && <div className="flex-1 h-px bg-line" />}
                </div>
              );
            })}
          </div>

          {step === "cart" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
              <div>
                {lines.length === 0 ? (
                  <div className="text-center py-[60px] px-5 text-ink-muted bg-paper rounded-[14px] border border-line-soft">
                    <div className="text-[56px] mb-4 opacity-40 font-serif italic">∅</div>
                    <p className="mb-4">{t.pickup.cartEmpty}</p>
                    <Link
                      href="/menu"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-ink text-cream text-sm font-semibold tracking-wide hover:bg-terracotta transition-colors"
                    >
                      {t.pickup.cartEmptyCta} <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="bg-paper border border-line-soft rounded-[14px] p-7">
                    {lines.map((l) =>
                      l ? (
                        <div key={l.id} className="grid grid-cols-[60px_1fr_auto] gap-3.5 py-3.5 border-b border-line-soft last:border-0">
                          <div className="w-[60px] h-[60px] rounded-lg bg-cream-2 overflow-hidden">
                            <img src={l.img} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-serif text-[17px] font-medium leading-tight mb-1">{l.name[lang]}</div>
                            <div className="font-mono text-[11px] text-ink-muted tracking-wide">${l.price.toFixed(2)}</div>
                            <div className="inline-flex items-center gap-2 mt-1.5">
                              <button
                                className="w-6 h-6 rounded-full border border-line bg-transparent grid place-items-center text-sm text-ink-2 hover:bg-ink hover:text-cream hover:border-ink transition-all"
                                onClick={() => removeFromCart(l.id)}
                              >
                                <Icon name="minus" size={12} />
                              </button>
                              <span className="font-mono text-[13px] min-w-[20px] text-center">{l.qty}</span>
                              <button
                                className="w-6 h-6 rounded-full border border-line bg-transparent grid place-items-center text-sm text-ink-2 hover:bg-ink hover:text-cream hover:border-ink transition-all"
                                onClick={() => addToCart(l.id)}
                              >
                                <Icon name="plus" size={12} />
                              </button>
                            </div>
                          </div>
                          <div className="font-mono text-sm">${(l.price * l.qty).toFixed(2)}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>
              <div className="bg-paper border border-line rounded-[14px] p-7 sticky top-[100px]">
                <div className="font-serif text-[22px] font-medium mb-3">{t.pickup.cartTitle}</div>
                <div className="mb-4 font-mono text-[11px] tracking-widest uppercase text-ink-muted">
                  {t.pickup.pickupAt}: <strong className="text-ink">{branch.name}</strong>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.tax}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-[22px] font-medium text-ink pt-3.5 border-t border-line mt-2">
                  <span>{t.pickup.total}</span>
                  <span>${(subtotal + tax).toFixed(2)}</span>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 w-full mt-4 px-5 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors disabled:opacity-40"
                  disabled={lines.length === 0}
                  onClick={() => setStep("details")}
                >
                  {t.pickup.checkout} <Icon name="arrow" size={14} />
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
              <div>
                <div className="bg-paper border border-line-soft rounded-[14px] p-7 mb-4">
                  <h3 className="font-serif text-[clamp(22px,2.2vw,30px)] font-medium mb-4">{t.pickup.pickupAt}</h3>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border cursor-pointer transition-all",
                          b.id === branch.id ? "bg-ink text-cream border-ink" : "bg-transparent text-ink-2 border-line hover:border-ink"
                        )}
                        onClick={() => setBranch(b)}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                  <div className="font-mono text-xs text-ink-muted mb-5">{branch.address}</div>

                  <h3 className="font-serif text-[clamp(22px,2.2vw,30px)] font-medium mb-4 mt-2">{t.pickup.time}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className={cn(
                        "py-3 px-2 border rounded-lg bg-paper cursor-pointer text-center font-mono text-[13px] transition-all col-span-2",
                        time === "asap" ? "bg-ink text-cream border-ink" : "border-line hover:border-ink"
                      )}
                      onClick={() => setTime("asap")}
                    >
                      {t.pickup.asap}
                    </button>
                    {timeSlots.slice(0, 10).map((s) => (
                      <button
                        key={s}
                        className={cn(
                          "py-3 px-2 border rounded-lg bg-paper cursor-pointer text-center font-mono text-[13px] transition-all",
                          time === s ? "bg-ink text-cream border-ink" : "border-line hover:border-ink"
                        )}
                        onClick={() => setTime(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-paper border border-line-soft rounded-[14px] p-7 mb-4">
                  <h3 className="font-serif text-[clamp(22px,2.2vw,30px)] font-medium mb-4">{t.pickup.contact}</h3>
                  <div className={cn("flex flex-col gap-1.5 mb-4", errors.name && "[&_input]:border-terracotta")}>
                    <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">{t.pickup.name}</label>
                    <input
                      className="bg-paper border border-line rounded-lg px-4 py-3.5 text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Émile Tremblay"
                    />
                    {errors.name && <span className="text-xs text-terracotta mt-1">{errors.name}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className={cn("flex flex-col gap-1.5 mb-4", errors.phone && "[&_input]:border-terracotta")}>
                      <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">{t.pickup.phone}</label>
                      <input
                        className="bg-paper border border-line rounded-lg px-4 py-3.5 text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (604) 555-0142"
                      />
                      {errors.phone && <span className="text-xs text-terracotta mt-1">{errors.phone}</span>}
                    </div>
                    <div className={cn("flex flex-col gap-1.5 mb-4", errors.email && "[&_input]:border-terracotta")}>
                      <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">{t.pickup.email}</label>
                      <input
                        className="bg-paper border border-line rounded-lg px-4 py-3.5 text-[15px] text-ink focus:outline-none focus:border-ink transition-colors"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="emile@example.ca"
                      />
                      {errors.email && <span className="text-xs text-terracotta mt-1">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted">{t.pickup.notes}</label>
                    <textarea
                      className="bg-paper border border-line rounded-lg px-4 py-3.5 text-[15px] text-ink focus:outline-none focus:border-ink transition-colors resize-y min-h-[76px]"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder={t.pickup.notesPh}
                    />
                  </div>
                </div>

                <div className="bg-paper border border-line-soft rounded-[14px] p-7">
                  <h3 className="font-serif text-[clamp(22px,2.2vw,30px)] font-medium mb-4">{t.pickup.payment}</h3>
                  {[
                    { key: "card", name: t.pickup.payCard, desc: t.pickup.payCardDesc, badges: ["VISA", "MC", "AMEX"] },
                    { key: "apple", name: t.pickup.payApple, desc: t.pickup.payAppleDesc },
                    { key: "store", name: t.pickup.payStore, desc: t.pickup.payStoreDesc },
                  ].map((m) => (
                    <div
                      key={m.key}
                      className={cn(
                        "flex items-center gap-3.5 px-[18px] py-4 border rounded-lg bg-paper cursor-pointer mb-2 transition-all",
                        pay === m.key ? "border-ink bg-cream-2" : "border-line hover:border-ink"
                      )}
                      onClick={() => setPay(m.key)}
                    >
                      <div
                        className={cn(
                          "w-[18px] h-[18px] rounded-full border-[1.5px] grid place-items-center",
                          pay === m.key ? "border-ink" : "border-line"
                        )}
                      >
                        {pay === m.key && <div className="w-[9px] h-[9px] rounded-full bg-ink" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-serif text-[17px] font-medium">{m.name}</div>
                        <div className="text-xs text-ink-muted">{m.desc}</div>
                      </div>
                      {m.badges && (
                        <div className="flex gap-1.5 font-mono text-[11px] text-ink-muted">
                          {m.badges.map((b) => (
                            <span key={b} className="px-1.5 py-0.5 border border-line rounded">
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-5">
                    <label className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-2.5 block">
                      {t.pickup.tip}
                    </label>
                    <div className="flex gap-2">
                      {[0, 10, 15, 18, 20].map((p) => (
                        <button
                          key={p}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border cursor-pointer transition-all",
                            tipPct === p ? "bg-ink text-cream border-ink" : "bg-transparent text-ink-2 border-line hover:border-ink"
                          )}
                          onClick={() => setTipPct(p)}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-paper border border-line rounded-[14px] p-7 sticky top-[100px]">
                <div className="font-serif text-[22px] font-medium mb-4">{t.pickup.cartTitle}</div>
                {lines.map((l) =>
                  l ? (
                    <div key={l.id} className="grid grid-cols-[1fr_auto_auto] gap-3 py-2 text-sm">
                      <span className="text-ink-2">{l.name[lang]}</span>
                      <span className="font-mono text-ink-muted text-xs">×{l.qty}</span>
                      <span className="font-mono text-ink-2">${(l.price * l.qty).toFixed(2)}</span>
                    </div>
                  ) : null
                )}
                <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-3.5" />
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.tax}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>
                    {t.pickup.tip} ({tipPct}%)
                  </span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-[22px] font-medium text-ink pt-3.5 border-t border-line mt-2">
                  <span>{t.pickup.total}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 w-full mt-4 px-5 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors"
                  onClick={submit}
                >
                  {t.pickup.placeOrder}
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 w-full mt-2 px-5 py-2 rounded-full bg-transparent border-0 text-ink-muted text-[13px] font-semibold hover:text-ink transition-colors"
                  onClick={() => setStep("cart")}
                >
                  ← {t.pickup.back}
                </button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="text-center max-w-[640px] mx-auto py-10">
              <div className="w-[84px] h-[84px] rounded-full bg-moss text-cream grid place-items-center mx-auto mb-7 text-[38px] font-serif italic">
                ✓
              </div>
              <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight mb-3.5">
                {t.pickup.confirmTitle}
              </h2>
              <p className="text-ink-muted max-w-[460px] mx-auto text-base">{t.pickup.confirmSub}</p>
              <div className="font-mono text-sm tracking-[0.14em] bg-cream-2 px-4 py-2 rounded-full inline-block my-4 border border-line">
                {t.pickup.orderNum} · <strong>{orderNum}</strong>
              </div>
              <div className="flex gap-7 justify-center flex-wrap mt-3">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-1">{t.pickup.pickupAt}</div>
                  <div className="font-serif text-xl font-medium">{branch.name}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-1">{t.pickup.readyAt}</div>
                  <div className="font-serif text-xl font-medium">{time === "asap" ? "8–12 min" : time}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-1">{t.pickup.total}</div>
                  <div className="font-serif text-xl font-medium">${total.toFixed(2)}</div>
                </div>
              </div>

              <div className="text-left bg-paper border border-line rounded-[14px] p-7 mt-8">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted mb-3.5">
                  Receipt · {orderNum}
                </div>
                {lines.map((l) =>
                  l ? (
                    <div key={l.id} className="grid grid-cols-[1fr_auto_auto] gap-3 py-2 text-sm">
                      <span className="text-ink-2">{l.name[lang]}</span>
                      <span className="font-mono text-ink-muted text-xs">×{l.qty}</span>
                      <span className="font-mono text-ink-2">${(l.price * l.qty).toFixed(2)}</span>
                    </div>
                  ) : null
                )}
                <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-3.5" />
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.tax}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 text-sm text-ink-muted">
                  <span>{t.pickup.tip}</span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-[22px] font-medium text-ink pt-3.5 border-t border-line mt-2">
                  <span>{t.pickup.total}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/menu"
                onClick={() => {
                  clearCart();
                  setStep("cart");
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors mt-8"
              >
                {t.pickup.newOrder}
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
