"use client";

import { useT } from "@/providers/language-provider";

export function About() {
  const { t, lang } = useT();
  return (
    <section className="py-24" id="story">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-[14px] overflow-hidden max-lg:max-w-[480px]">
            <img
              src="/images/hummingbird.jpg"
              alt="Huitzitzilin Cafe — pintura del colibrí"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-cream text-ink font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-2 rounded-full">
              {t.about.stamp}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-6">
              <span className="w-6 h-px bg-ink-muted" />
              {t.about.eyebrow}
            </div>
            <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight mb-8">
              {t.about.title.map((line: string, i: number) => (
                <span key={i} className="block">
                  {i === 1 ? <em className="text-terracotta italic">{line}</em> : line}
                </span>
              ))}
            </h2>
            <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[560px] mb-4">{t.about.p1}</p>
            <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[560px] mb-4">{t.about.p2}</p>
            <p className="text-[17px] leading-[1.7] text-ink-2 max-w-[560px] mb-4">{t.about.p3}</p>
            <div className="grid grid-cols-3 gap-8 mt-12 pt-9 border-t border-line">
              {[
                { num: t.about.stat1Num, label: t.about.stat1Label },
                { num: t.about.stat2Num, label: t.about.stat2Label },
                { num: t.about.stat3Num, label: t.about.stat3Label },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-[44px] leading-none font-normal text-terracotta mb-2">{s.num}</div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
