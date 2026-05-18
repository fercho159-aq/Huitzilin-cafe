"use client";

import Link from "next/link";
import { useT } from "@/providers/language-provider";
import { Icon } from "@/components/icons";

export function Hero() {
  const { t } = useT();
  const titleEm = t.hero.titleEm;
  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-ink-2 text-cream">
      <img
        src="/images/leon-cathedral.jpg"
        alt="Catedral y plaza de León, Guanajuato — inspiración de Huitzitzilin Cafe"
        className="absolute inset-0 w-full h-full object-cover opacity-55"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31, 22, 16, 0.2) 0%, rgba(31, 22, 16, 0.55) 60%, rgba(31, 22, 16, 0.85) 100%), linear-gradient(90deg, rgba(31, 22, 16, 0.45) 0%, transparent 60%)",
        }}
      />
      <div className="relative grid grid-rows-[1fr_auto] min-h-[86vh] px-8 pb-14 pt-[100px] max-w-[1480px] mx-auto">
        <div className="max-w-[820px] self-center">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-cream/75 inline-flex items-center gap-2.5 mb-7">
            <span className="w-[30px] h-px bg-cream/55" />
            {t.hero.eyebrow}
          </div>
          <h1 className="font-serif text-cream font-normal leading-[0.96] mb-6 text-[clamp(44px,6.4vw,96px)]">
            {t.hero.title.map((line: string, i: number) => (
              <span key={i} className="block">
                {i === titleEm ? <em className="italic text-[#E8C9A6] font-normal">{line}</em> : line}
              </span>
            ))}
          </h1>
          <p className="text-[clamp(16px,1.3vw,19px)] max-w-[520px] text-cream/80 mb-9 leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pickup"
              className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-cream text-ink text-[15px] font-semibold tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
            >
              {t.hero.ctaPrimary} <Icon name="arrow" size={16} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-transparent text-cream text-[15px] font-semibold tracking-wide border border-cream/50 hover:border-cream hover:bg-cream/5 transition-colors"
            >
              {t.hero.ctaGhost}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-cream/20 pt-8 mt-10">
          {[
            { label: t.hero.m1Label, value: t.hero.m1Value, sub: t.hero.m1Sub },
            { label: t.hero.m2Label, value: t.hero.m2Value, sub: t.hero.m2Sub },
            { label: t.hero.m3Label, value: t.hero.m3Value, sub: t.hero.m3Sub },
            { label: t.hero.m4Label, value: t.hero.m4Value, sub: t.hero.m4Sub },
          ].map((m, i) => (
            <div key={i} className={cn("pr-6", i > 0 && "border-l border-cream/20 pl-6")}>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/60 mb-2">{m.label}</div>
              <div className="font-serif text-[22px] text-cream font-normal">{m.value}</div>
              <div className="text-sm leading-relaxed font-sans text-cream/60">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
