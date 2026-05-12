"use client";

import Link from "next/link";
import { useT } from "@/providers/language-provider";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-ink text-cream pt-20 pb-9">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-14">
          <div>
            <div className="flex items-center gap-3 font-serif text-[22px] font-medium tracking-tight text-cream mb-4">
              <span className="w-[44px] h-[44px] rounded-full bg-cream grid place-items-center overflow-hidden">
                <img src="/images/logo-new.png" alt="Huitzitzilin Cafe logo" className="w-full h-full object-cover" />
              </span>
              <span>Huitzitzilin Cafe</span>
            </div>
            <p className="font-serif text-[28px] font-normal leading-tight my-4 max-w-[360px]">{t.footer.tagline}</p>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-transparent border border-cream/25 rounded-full px-4 py-2.5 text-cream text-[13px] font-sans placeholder:text-cream/50"
                placeholder={t.footer.newsletterPh}
              />
              <button className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full bg-cream text-ink text-[13px] font-semibold hover:bg-paper transition-colors">
                {t.footer.subscribe}
              </button>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/50 mb-4">{t.footer.help}</div>
            {t.footer.help_links.map((l: string, i: number) => (
              <Link
                key={i}
                href={i === 0 ? "/pickup" : i === 1 ? "/loyalty" : "#"}
                className="block text-sm text-cream/85 py-1 hover:text-terracotta transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/50 mb-4">{t.footer.visit}</div>
            {t.footer.visit_links.map((l: string, i: number) => (
              <Link
                key={i}
                href={i < 3 ? "/locations" : "#"}
                className="block text-sm text-cream/85 py-1 hover:text-terracotta transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/50 mb-4">{t.footer.legal}</div>
            {t.footer.legal_links.map((l: string, i: number) => (
              <span key={i} className="block text-sm text-cream/85 py-1 cursor-default">
                {l}
              </span>
            ))}
            <div className="mt-4">
              <Link href="/admin" className="block text-sm text-cream/70 py-1 hover:text-terracotta transition-colors">
                {t.nav.admin} →
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-7 border-t border-cream/10 font-mono text-xs text-cream/55 tracking-wide flex-wrap gap-4">
          <span>{t.footer.copyright}</span>
          <span>ES · EN · FR</span>
        </div>
      </div>
    </footer>
  );
}
