"use client";

import { useT } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export function LangSwitcher() {
  const { lang, setLang } = useT();
  return (
    <div className="inline-flex border border-line rounded-full bg-paper p-[3px] font-mono" role="group" aria-label="Language">
      {(["es", "en", "fr"] as const).map((l) => (
        <button
          key={l}
          className={cn(
            "font-mono text-[11px] tracking-widest px-[10px] py-[6px] rounded-full border-0 bg-transparent cursor-pointer font-medium",
            l === lang ? "bg-ink text-cream" : "text-ink-muted"
          )}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
