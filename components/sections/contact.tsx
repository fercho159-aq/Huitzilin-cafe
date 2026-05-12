"use client";

import { useState } from "react";
import { useT } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const { t } = useT();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-24 bg-cream-2" id="contact">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="mb-14">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
            <span className="w-6 h-px bg-ink-muted" />
            {t.contact.eyebrow}
          </div>
          <h2 className="font-serif text-[clamp(34px,4vw,60px)] font-medium leading-[1.08] tracking-tight">
            {t.contact.title.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-20">
          <div>
            {[
              { label: t.contact.addrTitle, value: t.contact.addrValue },
              { label: t.contact.phoneTitle, value: t.contact.phoneValue },
              { label: t.contact.emailTitle, value: t.contact.emailValue, small: true },
            ].map((c, i) => (
              <div key={i} className="p-7 border border-line rounded-[14px] bg-paper mb-3">
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-1.5">{c.label}</div>
                <div className={cn("font-serif font-medium", c.small ? "text-lg" : "text-[22px]")}>{c.value}</div>
              </div>
            ))}
          </div>
          <div>
            {t.contact.faqs.map((f: { q: string; a: string }, i: number) => (
              <div
                key={i}
                className={cn(
                  "border-b border-line py-5 cursor-pointer",
                  i === 0 && "border-t"
                )}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <div className="flex justify-between items-center gap-6 font-serif text-[21px] font-medium text-ink">
                  <span>{f.q}</span>
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full border border-line grid place-items-center flex-shrink-0 text-sm text-ink-muted transition-all",
                      openIdx === i && "bg-ink text-cream border-ink"
                    )}
                  >
                    {openIdx === i ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 text-ink-muted text-[15px] leading-relaxed max-w-[700px]",
                    openIdx === i ? "max-h-[400px] pt-3" : "max-h-0"
                  )}
                >
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
