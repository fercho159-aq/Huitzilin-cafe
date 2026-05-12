"use client";

import { useState, useRef, useEffect } from "react";
import { useT } from "@/providers/language-provider";
import { useBranch } from "@/providers/branch-provider";
import { BRANCHES } from "@/lib/data";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

export function BranchSelector({ compact = false }: { compact?: boolean }) {
  const { t } = useT();
  const { branch, setBranch } = useBranch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-line bg-paper text-[13px] font-medium text-ink-2 cursor-pointer hover:border-ink"
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="pin" size={14} />
        {compact ? branch.name : `${t.branch.label}: ${branch.name}`}
        <Icon name="chev" size={14} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 bg-paper border border-line rounded-[14px] shadow-[0_4px_12px_rgba(31,22,16,0.08),0_24px_60px_rgba(31,22,16,0.12)] min-w-[280px] p-2 z-50">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className={cn(
                "block px-[14px] py-3 rounded-lg cursor-pointer text-sm text-ink-2",
                b.id === branch.id ? "bg-cream-2" : "hover:bg-cream-2"
              )}
              onClick={() => {
                setBranch(b);
                setOpen(false);
              }}
            >
              <div className="font-serif text-lg font-medium mb-0.5">{b.name}</div>
              <div className="text-xs text-ink-muted leading-relaxed">{b.address}</div>
              <div className="font-mono text-[10px] mt-1.5 text-ink-soft tracking-widest uppercase">
                {b.role[t.lang]} · {b.seats} seats
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
