"use client";

import { useT } from "@/providers/language-provider";
import { Icon } from "@/components/icons";

export function DoorDashStrip() {
  const { t } = useT();
  return (
    <section className="bg-ink text-cream py-14">
      <div className="max-w-[1320px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.4fr_auto] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#FF8A75] mb-4">
            <span className="w-2 h-2 rounded-full bg-doordash" />
            DoorDash · {t.dd.tag}
          </div>
          <h2 className="font-serif text-cream mb-4 max-w-[640px] text-[clamp(34px,4vw,60px)] font-medium leading-[1.08]">
            {t.dd.headline}
          </h2>
          <p className="max-w-[540px] text-cream/75 text-base">{t.dd.sub}</p>
          <div className="flex gap-6 mt-7 flex-wrap font-mono text-xs tracking-wide text-cream/55 uppercase">
            <span>● {t.dd.sync} 2 {t.dd.ago}</span>
            <span>● 18/18 ítems</span>
            <span>● 25–35 min</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <button className="inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-cream text-ink text-[15px] font-semibold tracking-wide hover:bg-paper transition-colors">
            {t.dd.cta} <Icon name="arrow" size={16} />
          </button>
          <span className="font-mono text-[11px] tracking-[0.1em] text-cream/50 text-center">
            doordash.com/store/casa-colibri
          </span>
        </div>
      </div>
    </section>
  );
}
