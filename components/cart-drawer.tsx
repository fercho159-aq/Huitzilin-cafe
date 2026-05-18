"use client";

import Link from "next/link";
import { useT } from "@/providers/language-provider";
import { useCart } from "@/providers/cart-provider";
import { MENU_ITEMS } from "@/lib/data";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { t, lang } = useT();
  const { cart, addToCart, removeFromCart } = useCart();

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const it = MENU_ITEMS.find((i) => i.id === id);
      return it ? { ...it, qty } : null;
    })
    .filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + (l?.price || 0) * (l?.qty || 0), 0);
  const totalQty = lines.reduce((s, l) => s + (l?.qty || 0), 0);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-ink/50 backdrop-blur-sm z-[100] transition-opacity duration-250",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside
        aria-hidden={!open}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[460px] max-w-[100vw] bg-cream z-[101] flex flex-col shadow-[-20px_0_60px_rgba(31,22,16,0.18)] transition-[transform,visibility] duration-300",
          open ? "translate-x-0 visible" : "translate-x-full invisible delay-300"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <div className="flex justify-between items-center px-7 py-5 border-b border-line">
          <div>
            <div className="font-serif text-[26px] font-medium">{t.pickup.cartTitle}</div>
            <div className="font-mono text-[11px] tracking-widest text-ink-muted uppercase mt-0.5">
              {totalQty} {totalQty === 1 ? t.pickup.cartItem : t.pickup.cartItems}
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-full border border-line bg-transparent grid place-items-center cursor-pointer text-lg text-ink-muted hover:bg-ink hover:text-cream hover:border-ink transition-all"
            onClick={onClose}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-5">
          {lines.length === 0 ? (
            <div className="text-center py-[60px] px-5 text-ink-muted">
              <div className="text-[56px] mb-4 opacity-40 font-serif italic">∅</div>
              <p>{t.pickup.cartEmpty}</p>
              <button
                className="inline-flex items-center justify-center gap-2 px-[14px] py-2 mt-3 rounded-full border border-ink text-ink text-[13px] font-semibold hover:bg-ink hover:text-cream transition-colors"
                onClick={onClose}
              >
                {t.pickup.cartEmptyCta}
              </button>
            </div>
          ) : (
            lines.map((l) =>
              l ? (
                <div key={l.id} className="grid grid-cols-[60px_1fr_auto] gap-3.5 py-3.5 border-b border-line-soft last:border-0">
                  <div className="w-[60px] h-[60px] rounded-lg bg-cream-2 overflow-hidden">
                    <img src={l.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-serif text-[17px] font-medium leading-tight mb-1">{l.name[lang]}</div>
                    <div className="font-mono text-[11px] text-ink-muted tracking-wide">
                      ${l.price.toFixed(2)} c/u
                    </div>
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
            )
          )}
        </div>

        {lines.length > 0 && (
          <div className="px-7 py-5 border-t border-line bg-paper">
            <div className="flex justify-between font-serif text-[22px] font-medium text-ink pt-3.5 border-t border-line mt-2">
              <span>{t.pickup.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/pickup"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 w-full mt-3.5 px-[22px] py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors"
            >
              {t.pickup.checkout} <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
