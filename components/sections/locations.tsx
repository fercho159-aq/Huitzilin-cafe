"use client";

import { useT } from "@/providers/language-provider";
import { useBranch } from "@/providers/branch-provider";
import { BRANCHES } from "@/lib/data";
import { cn } from "@/lib/utils";

function VancouverMap({ activeId, onPin }: { activeId: string; onPin: (b: (typeof BRANCHES)[0]) => void }) {
  return (
    <div className="relative aspect-[4/3] bg-cream-2 rounded-[14px] overflow-hidden border border-line">
      <svg className="w-full h-full block" viewBox="0 0 100 75" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(139,90,60,0.08)" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="75" fill="#EDE3D2" />
        <rect width="100" height="75" fill="url(#grid)" />
        <path
          d="M 0,40 C 20,38 30,46 50,42 C 70,38 80,52 100,48 L 100,75 L 0,75 Z"
          fill="#C8D5C8"
          opacity="0.7"
        />
        <path
          d="M 0,12 C 25,8 45,18 60,14 C 75,10 90,16 100,14 L 100,0 L 0,0 Z"
          fill="#C8D5C8"
          opacity="0.7"
        />
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
        <line x1="30" y1="40" x2="34" y2="56" stroke="rgba(139,90,60,0.4)" strokeWidth="0.6" />
        <ellipse cx="14" cy="30" rx="10" ry="8" fill="#C8D5B5" opacity="0.6" />
        <text x="14" y="32" fontFamily="var(--font-jetbrains-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">
          Stanley Pk
        </text>
        <text x="50" y="42" fontFamily="var(--font-jetbrains-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">
          False Creek
        </text>
        <text x="14" y="14" fontFamily="var(--font-jetbrains-mono)" fontSize="2.4" textAnchor="middle" fill="rgba(31,22,16,0.5)">
          English Bay
        </text>
      </svg>
      {BRANCHES.map((b, i) => (
        <div
          key={b.id}
          className={cn(
            "absolute w-9 h-9 -ml-[18px] -mt-9 grid place-items-center cursor-pointer transition-transform duration-200 hover:scale-[1.15]",
            b.id === activeId && "scale-110"
          )}
          style={{ left: `${b.coords.x}%`, top: `${b.coords.y}%` }}
          onClick={() => onPin(b)}
        >
          <div
            className={cn(
              "w-[30px] h-[30px] rounded-[50%_50%_50%_0] grid place-items-center text-cream font-mono text-xs font-semibold border-2 border-cream shadow-[0_4px_10px_rgba(0,0,0,0.2)]",
              b.id === activeId ? "bg-ink scale-110" : "bg-terracotta"
            )}
            style={{ transform: "rotate(-45deg)" }}
          >
            <span style={{ transform: "rotate(45deg)" }} className="font-mono text-[11px] font-semibold">
              {i + 1}
            </span>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-4 bg-paper rounded-lg px-4 py-3 text-[13px] border border-line shadow-[0_1px_2px_rgba(31,22,16,0.04),0_8px_24px_rgba(31,22,16,0.06)]">
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-muted mb-1">Vancouver, BC</div>
        <div className="font-serif text-base font-medium">3 sucursales</div>
      </div>
    </div>
  );
}

export function Locations() {
  const { t, lang } = useT();
  const { branch, setBranch } = useBranch();
  const today = (new Date().getDay() + 6) % 7; // Monday=0

  return (
    <section className="py-24 bg-cream-2" id="locations">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="mb-14 max-w-[720px]">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
            <span className="w-6 h-px bg-ink-muted" />
            {t.locations.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight mb-5">
            {t.locations.title.map((line: string, i: number) => (
              <span key={i} className="block">
                {i === 2 ? <em className="text-terracotta italic">{line}</em> : line}
              </span>
            ))}
          </h2>
          <p className="text-ink-muted text-base max-w-[580px]">{t.locations.sub}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div className="flex flex-col gap-3.5">
            {BRANCHES.map((b, i) => {
              const active = b.id === branch.id;
              return (
                <div
                  key={b.id}
                  className={cn(
                    "px-6 py-6 border rounded-[14px] cursor-pointer transition-all",
                    active ? "bg-ink text-cream border-ink" : "bg-paper border-line hover:border-ink"
                  )}
                  onClick={() => setBranch(b)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-serif text-[26px] font-medium mb-1">
                        {i + 1}. {b.name}
                      </div>
                      <div
                        className={cn(
                          "font-mono text-[11px] tracking-[0.14em] uppercase mb-3",
                          active ? "text-cream/70" : "text-ink-muted"
                        )}
                      >
                        {b.role[lang]} · {b.seats} seats
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                      <span className="font-mono text-[11px] tracking-[0.1em] uppercase">{t.branch.open}</span>
                    </span>
                  </div>
                  <div className="text-sm leading-relaxed mb-3.5">{b.address}</div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted flex gap-4 flex-wrap">
                    <span>{b.phone}</span>
                  </div>
                  {active && (
                    <div className="mt-4 pt-4 border-t border-cream/20">
                      <div className="font-mono text-[11px] tracking-[0.12em] uppercase mb-3 text-cream/70">
                        {t.locations.hoursTitle}
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-mono">
                        {t.locations.days.map((d: string, di: number) => (
                          <div key={d} className="contents">
                            <div
                              className={cn(
                                "text-xs tracking-wider uppercase",
                                di === today ? "text-cream font-semibold" : "text-cream/70"
                              )}
                            >
                              {d}
                            </div>
                            <div
                              className={cn(
                                "text-right text-[13px]",
                                di === today ? "text-cream font-semibold" : "text-cream/85"
                              )}
                            >
                              {b.hours[di]}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full bg-cream text-ink text-[13px] font-semibold hover:bg-paper transition-colors">
                          {t.locations.directions}
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full bg-transparent text-cream text-[13px] font-semibold border border-cream/40 hover:border-cream transition-colors">
                          {t.locations.callUs}
                        </button>
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
