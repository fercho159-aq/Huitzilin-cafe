"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useT } from "@/providers/language-provider";
import { MENU_ITEMS, makeSeedOrders, SAMPLE_CUSTOMERS, type Order } from "@/lib/data";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  new: "#FF8A75",
  prep: "#E8C9A6",
  ready: "#9CC07C",
  done: "rgba(245,239,230,0.4)",
};

function fmtAgo(ts: number, t: any) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}${t.admin.sec}`;
  return `${Math.floor(diff / 60)}${t.admin.min}`;
}

function OrderCard({
  order,
  lang,
  onAdvance,
  t,
  fresh,
}: {
  order: Order;
  lang: string;
  onAdvance: (id: string) => void;
  t: any;
  fresh: boolean;
}) {
  const channelLabel = order.channel === "pickup" ? t.nav.pickup : "DoorDash";
  const urgent = order.status === "new" && Date.now() - order.placedAt > 90000;
  return (
    <div
      className={cn(
        "rounded-lg p-3.5 cursor-pointer transition-all",
        urgent ? "border border-terracotta" : "border border-cream/10",
        fresh && "animate-[slideIn_0.4s_ease]",
        "bg-cream/5 hover:bg-cream/[0.06] hover:border-cream/30"
      )}
    >
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-mono text-[13px] tracking-wide text-cream font-semibold">{order.id}</span>
        <span className="font-mono text-[11px] text-cream/55">
          <Icon name="clock" size={10} /> {fmtAgo(order.placedAt, t)} {t.admin.ago}
        </span>
      </div>
      <div className="font-serif text-base font-medium text-cream mb-1">{order.customer}</div>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-full mb-2",
          order.channel === "pickup" ? "bg-terracotta/20 text-[#E8C9A6]" : "bg-doordash/20 text-[#FF8A75]"
        )}
      >
        {order.channel === "doordash" && <span className="w-[5px] h-[5px] rounded-full bg-doordash" />}
        {channelLabel}
      </span>
      <div className="text-xs text-cream/70 leading-relaxed font-mono">
        {order.lines.map((l, i) => (
          <div key={i}>
            {l.qty}× {l.name[lang]}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2.5 mt-2.5 border-t border-cream/10">
        <span className="font-mono text-[13px] text-cream">${order.total.toFixed(2)}</span>
        {order.status !== "done" && (
          <button
            className="bg-cream text-ink border-0 rounded-full px-2.5 py-1 text-[11px] font-semibold font-mono tracking-wide cursor-pointer hover:bg-terracotta hover:text-cream transition-colors"
            onClick={() => onAdvance(order.id)}
          >
            {t.admin.advance}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { t, lang } = useT();
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const [tick, setTick] = useState(0);

  // Seed initial orders only on the client to avoid SSR/CSR hydration mismatch
  // (makeSeedOrders uses Date.now() for placedAt timestamps).
  useEffect(() => {
    setOrders(makeSeedOrders(Date.now()));
    setMounted(true);
  }, []);

  // Re-render every 5s for live "ago" timers
  useEffect(() => {
    const id = setInterval(() => setTick((x) => x + 1), 5000);
    return () => clearInterval(id);
  }, []);

  // Inject a new order every 12-22s
  useEffect(() => {
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
      const newOrder: Order = {
        id,
        customer: SAMPLE_CUSTOMERS[Math.floor(Math.random() * SAMPLE_CUSTOMERS.length)],
        channel: Math.random() > 0.5 ? "pickup" : "doordash",
        status: "new",
        placedAt: Date.now(),
        lines,
        total: Math.round(total * 100) / 100,
      };
      setOrders((o) => [newOrder, ...o].slice(0, 60));
      setFreshIds((s) => new Set([...s, id]));
      setTimeout(() => setFreshIds((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      }), 1500);
    }
    let timeout: NodeJS.Timeout;
    function loop() {
      spawn();
      timeout = setTimeout(loop, 12000 + Math.random() * 10000);
    }
    timeout = setTimeout(loop, 8000);
    return () => clearTimeout(timeout);
  }, []);

  const advance = useCallback((id: string) => {
    setOrders((orders) =>
      orders.map((o) => {
        if (o.id !== id) return o;
        const next = o.status === "new" ? "prep" : o.status === "prep" ? "ready" : o.status === "ready" ? "done" : "done";
        return { ...o, status: next };
      })
    );
  }, []);

  const cols = ["new", "prep", "ready", "done"];
  const grouped = cols.reduce((acc, c) => {
    acc[c] = orders.filter((o) => o.status === c);
    return acc;
  }, {} as Record<string, Order[]>);

  const todayOrders = orders.length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const ddCount = orders.filter((o) => o.channel === "doordash").length;
  const puCount = orders.filter((o) => o.channel === "pickup").length;
  const ddPct = todayOrders ? Math.round((ddCount / todayOrders) * 100) : 0;
  const puPct = 100 - ddPct;

  const STATUS_LABELS: Record<string, string> = {
    new: t.admin.cols.new,
    prep: t.admin.cols.prep,
    ready: t.admin.cols.ready,
    done: t.admin.cols.done,
  };

  return (
    <div className="min-h-screen bg-[#1A130D] text-cream page-animate">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-4 sm:py-5 border-b border-cream/10 flex-wrap">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="w-10 h-10 sm:w-[44px] sm:h-[44px] rounded-full bg-cream grid place-items-center overflow-hidden">
            <img src="/images/logo.png" alt="Huitzitzilin Cafe logo" className="w-full h-full object-cover" />
          </span>
          <div>
            <div className="font-serif text-lg sm:text-[22px] font-medium text-cream">{t.admin.title}</div>
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-cream/55 mt-0.5">
              Huitzitzilin Cafe · Yaletown
              {mounted && <> · {new Date().toLocaleDateString(t.locale)}</>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3.5 flex-wrap">
          <Link
            href="/admin/loyalty"
            className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full border border-cream/20 text-cream text-[13px] font-semibold hover:bg-cream/10 transition-colors"
          >
            Lealtad
          </Link>
          <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-cream">
            <span className="w-[7px] h-[7px] rounded-full bg-[#9CC07C]" />
            {t.admin.live}
          </span>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full bg-cream text-ink text-[13px] font-semibold hover:bg-paper transition-colors"
          >
            {t.admin.backToSite}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-cream/10">
        <div className="px-4 sm:px-8 py-5 sm:py-7 border-r border-cream/10">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-cream/55 mb-2">{t.admin.todayOrders}</div>
          <div className="font-serif text-2xl sm:text-4xl font-medium">
            {todayOrders}
            <span className="font-mono text-xs text-moss ml-2">+{Math.floor(todayOrders * 0.08)}</span>
          </div>
        </div>
        <div className="px-4 sm:px-8 py-5 sm:py-7 lg:border-r border-cream/10">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-cream/55 mb-2">{t.admin.revenue}</div>
          <div className="font-serif text-2xl sm:text-4xl font-medium">
            ${revenue.toFixed(2)}
            <span className="font-mono text-xs text-moss ml-2">+12.4%</span>
          </div>
        </div>
        <div className="px-4 sm:px-8 py-5 sm:py-7 border-r border-cream/10 border-t lg:border-t-0">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-cream/55 mb-2">{t.admin.avgPrep}</div>
          <div className="font-serif text-2xl sm:text-4xl font-medium">
            9.2{" "}
            <span className="font-mono text-sm text-cream/55">{t.admin.avgPrepUnit}</span>
          </div>
        </div>
        <div className="px-4 sm:px-8 py-5 sm:py-7 border-t lg:border-t-0">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-cream/55 mb-2">{t.admin.pickupShare}</div>
          <div className="flex items-center gap-3.5 mt-1">
            <div className="font-serif text-xl sm:text-[28px]">
              {puPct}
              <span className="text-base sm:text-lg text-cream/50">/</span>
              {ddPct}
            </div>
            <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden flex">
              <div style={{ width: `${puPct}%` }} className="bg-[#E8C9A6]" />
              <div style={{ width: `${ddPct}%` }} className="bg-doordash" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:h-[calc(100vh-230px)] lg:overflow-hidden">
        {cols.map((c) => (
          <div
            key={c}
            className="p-4 border-t sm:border-t-0 sm:border-r border-cream/10 lg:overflow-y-auto flex flex-col gap-3 last:border-r-0"
          >
            <div className="flex items-center justify-between px-1 pb-3 border-b border-cream/10 mb-1">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-cream/70">
                <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLORS[c] }} />
                {STATUS_LABELS[c]}
              </div>
              <span className="font-mono text-xs bg-cream/10 px-2 py-0.5 rounded-full">{grouped[c].length}</span>
            </div>
            {grouped[c]
              .sort((a, b) => a.placedAt - b.placedAt)
              .map((o) => (
                <OrderCard key={o.id} order={o} lang={lang} onAdvance={advance} t={t} fresh={freshIds.has(o.id)} />
              ))}
            {grouped[c].length === 0 && (
              <div className="font-mono text-[11px] text-cream/35 text-center py-5 tracking-widest uppercase">—</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
