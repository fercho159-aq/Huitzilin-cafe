"use client";

import { useState, useMemo } from "react";
import { useT } from "@/providers/language-provider";
import { useCart } from "@/providers/cart-provider";
import { MENU_ITEMS } from "@/lib/data";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const { t, lang } = useT();
  const { cart, addToCart } = useCart();
  const [cat, setCat] = useState("coffee");
  const [filter, setFilter] = useState("all");
  const cats = ["coffee", "espresso", "pastries", "brunch", "cold"];

  const items = useMemo(() => {
    return MENU_ITEMS.filter((it) => it.cat === cat).filter((it) => {
      if (filter === "all") return true;
      return it.tags.includes(filter);
    });
  }, [cat, filter]);

  const filterKeys = ["all", "vegan", "gf", "df", "new", "popular"];

  return (
    <section className="py-24" id="menu">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-9">
          <div>
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-ink-muted" />
              {t.menu.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight">
              {t.menu.title.map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="italic">{line}</em> : line}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-[360px] text-ink-muted text-[15px]">{t.menu.sub}</p>
        </div>

        <div className="flex gap-2 flex-wrap border-b border-line mb-7">
          {cats.map((c) => {
            const count = MENU_ITEMS.filter((it) => it.cat === c).length;
            return (
              <button
                key={c}
                className={cn(
                  "font-serif text-[22px] font-normal bg-transparent border-0 py-3.5 mr-8 border-b-[1.5px] cursor-pointer transition-colors",
                  cat === c ? "text-ink border-terracotta" : "text-ink-muted border-transparent hover:text-ink"
                )}
                onClick={() => setCat(c)}
              >
                {t.menu.cats[c]}{" "}
                <span className="font-mono text-[11px] text-ink-soft align-super ml-1.5">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {filterKeys.map((f) => {
            const count =
              f === "all"
                ? MENU_ITEMS.filter((it) => it.cat === cat).length
                : MENU_ITEMS.filter((it) => it.cat === cat && it.tags.includes(f)).length;
            return (
              <button
                key={f}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium border cursor-pointer transition-all",
                  filter === f
                    ? "bg-ink text-cream border-ink"
                    : "bg-transparent text-ink-2 border-line hover:border-ink"
                )}
                onClick={() => setFilter(f)}
              >
                {t.menu.filters[f]} <span className="text-[11px] opacity-70 font-mono">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const inCart = cart[it.id];
            return (
              <div
                key={it.id}
                className="bg-paper border border-line-soft rounded-[14px] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_1px_2px_rgba(31,22,16,0.04),0_8px_24px_rgba(31,22,16,0.06)]"
              >
                <div className="aspect-[4/3] bg-cream-2 relative overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.name[lang]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {it.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "bg-cream text-ink font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-full",
                          tag === "vegan" && "bg-moss text-cream",
                          tag === "gf" && "bg-gold text-ink",
                          tag === "new" && "bg-terracotta text-cream",
                          tag === "popular" && "bg-ink text-cream"
                        )}
                      >
                        {t.menu.filters[tag] || tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-[22px] py-5 flex flex-col flex-1">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <div className="font-serif text-[22px] font-medium text-ink leading-tight">{it.name[lang]}</div>
                    <div className="font-mono text-sm text-ink-muted whitespace-nowrap">${it.price.toFixed(2)}</div>
                  </div>
                  <div className="text-sm text-ink-muted leading-snug mb-4 flex-1">{it.desc[lang]}</div>
                  <button
                    className={cn(
                      "inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full text-[13px] font-semibold border-0 transition-all",
                      inCart ? "bg-moss text-cream" : "bg-cream-2 text-ink hover:bg-ink hover:text-cream"
                    )}
                    onClick={() => addToCart(it.id)}
                  >
                    {inCart ? (
                      <>
                        <Icon name="check" size={14} /> {t.menu.added} · {inCart}
                      </>
                    ) : (
                      <>
                        <Icon name="plus" size={14} /> {t.menu.add}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="text-center py-[60px] px-5 text-ink-muted col-span-full">
              <div className="text-[56px] mb-4 opacity-40 font-serif italic">∅</div>
              <div>—</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
