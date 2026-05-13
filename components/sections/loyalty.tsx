"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useT } from "@/providers/language-provider";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Loyalty() {
  const { t } = useT();
  const { data: session } = useSession();
  const [cardData, setCardData] = useState<{ stamps: number; freeDrinks: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      fetch("/api/loyalty/card")
        .then((r) => r.json())
        .then((data) => {
          if (data.stamps !== undefined) {
            setCardData({ stamps: data.stamps, freeDrinks: data.freeDrinks });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const stamps = cardData?.stamps ?? 0;
  const isLoggedIn = !!session?.user;

  return (
    <section className="py-24" id="loyalty">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-ink-muted" />
              {t.loyalty.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight mb-5">
              {t.loyalty.title.map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-terracotta italic">{line}</em> : line}
                </span>
              ))}
            </h2>
            <p className="text-ink-muted text-base max-w-[480px] mb-8">{t.loyalty.sub}</p>
            <div>
              {[
                { num: 1, title: t.loyalty.tiers.t1Title, desc: t.loyalty.tiers.t1Desc, active: stamps < 5 },
                { num: 2, title: t.loyalty.tiers.t2Title, desc: t.loyalty.tiers.t2Desc, active: stamps >= 5 && stamps < 10 },
                { num: 3, title: t.loyalty.tiers.t3Title, desc: t.loyalty.tiers.t3Desc, active: stamps >= 10 },
              ].map((tier) => (
                <div key={tier.num} className="flex items-center gap-3.5 p-4 border border-line rounded-lg bg-paper mb-2">
                  <div
                    className={cn(
                      "font-serif text-[26px] w-11 h-11 rounded-full grid place-items-center flex-shrink-0",
                      tier.active ? "bg-terracotta text-cream" : "bg-cream-2 text-ink"
                    )}
                  >
                    {tier.num}
                  </div>
                  <div className="text-sm">
                    <strong className="font-serif text-[17px] font-medium block mb-0.5">{tier.title}</strong>
                    <span className="text-ink-muted">{tier.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            {isLoggedIn ? (
              <Link
                href="/profile"
                className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors mt-8"
              >
                Ver mi tarjeta <Icon name="arrow" size={16} />
              </Link>
            ) : (
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors mt-8"
              >
                {t.loyalty.join} <Icon name="arrow" size={16} />
              </Link>
            )}
          </div>
          <div>
            <div
              className="relative rounded-[18px] p-8 flex flex-col justify-between aspect-[1.6/1] shadow-[0_4px_12px_rgba(31,22,16,0.08),0_24px_60px_rgba(31,22,16,0.12)] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #2A1F17 0%, #4A332A 100%)" }}
            >
              <div
                className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(184, 71, 42, 0.3), transparent 70%)" }}
              />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/70">{t.loyalty.memberCard}</div>
                  <div className="font-mono text-base tracking-[0.18em] mt-1.5 text-cream">
                    {isLoggedIn ? `B-${session.user.id.slice(-6).toUpperCase()}` : "B-2406-0142"}
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full bg-cream text-ink grid place-items-center font-serif italic text-[22px]">
                  {isLoggedIn ? session.user.name?.charAt(0).toUpperCase() : "B"}
                </div>
              </div>
              <div className="relative z-10">
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/70 mb-3">
                  {t.loyalty.progress}{" "}
                  <span className="text-cream font-semibold">{stamps}</span> {t.loyalty.progressOf} 10{" "}
                  {t.loyalty.stamps}
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square rounded-full border-[1.5px] grid place-items-center font-serif text-lg",
                        i < stamps
                          ? "bg-terracotta border-terracotta text-cream"
                          : i === stamps
                          ? "border-cream text-cream border-solid"
                          : "border-dashed border-cream/35 text-cream/40"
                      )}
                    >
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
