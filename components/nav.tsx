"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/providers/language-provider";
import { useBranch } from "@/providers/branch-provider";
import { useCart } from "@/providers/cart-provider";
import { LangSwitcher } from "./lang-switcher";
import { BranchSelector } from "./branch-selector";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

interface NavProps {
  onOpenCart: () => void;
}

export function Nav({ onOpenCart }: NavProps) {
  const { t } = useT();
  const { branch } = useBranch();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    ["/", t.nav.home],
    ["/menu", t.nav.menu],
    ["/pickup", t.nav.pickup],
    ["/story", t.nav.story],
    ["/locations", t.nav.locations],
    ["/loyalty", t.nav.loyalty],
    ["/contact", t.nav.contact],
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-line-soft">
      {/* DoorDash banner */}
      <div className="bg-ink text-cream px-4 py-2.5 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium flex-wrap">
        <span
          className="w-[7px] h-[7px] rounded-full bg-doordash flex-shrink-0"
          style={{ animation: "pulse 2s infinite" }}
        />
        <span className="text-center">{t.dd.banner}</span>
        <span className="opacity-60 hidden sm:inline">·</span>
        <a href="#" className="underline underline-offset-[3px] font-semibold hidden sm:inline" onClick={(e) => e.preventDefault()}>
          {t.dd.cta} →
        </a>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-3 max-w-[1480px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 font-serif text-xl sm:text-[22px] font-medium tracking-tight text-ink flex-shrink-0">
          <span className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-cream grid place-items-center overflow-hidden">
            <img src="/images/logo-new.png" alt="Huitzitzilin Cafe logo" className="w-full h-full object-cover" />
          </span>
          <span className="hidden sm:inline">Huitzitzilin</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 justify-self-center">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium text-ink-2 py-1.5 relative tracking-wide hover:text-terracotta transition-colors",
                pathname === href && "text-terracotta after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-terracotta"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LangSwitcher />
          </div>
          <div className="hidden sm:block">
            <BranchSelector compact />
          </div>
          <button
            className="relative w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full border border-line bg-paper grid place-items-center cursor-pointer text-ink-2 hover:bg-ink hover:text-cream hover:border-ink transition-all"
            onClick={onOpenCart}
            aria-label="Cart"
          >
            <Icon name="bag" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-terracotta text-cream font-mono text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full grid place-items-center border-[2px] border-cream px-[5px]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-10 h-10 rounded-full border border-line bg-paper grid place-items-center cursor-pointer text-ink-2 hover:bg-ink hover:text-cream hover:border-ink transition-all"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Icon name="menu" size={18} />
          </button>

          <Link
            href="/pickup"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 sm:px-[22px] py-2.5 sm:py-[14px] rounded-full bg-ink text-cream text-sm font-semibold tracking-wide hover:bg-terracotta transition-colors whitespace-nowrap"
          >
            {t.nav.orderNow}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[110] transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

        {/* Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-cream z-[111] flex flex-col shadow-[-20px_0_60px_rgba(31,22,16,0.18)] transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <span className="font-serif text-xl font-medium">Menu</span>
            <button
              className="w-9 h-9 rounded-full border border-line bg-transparent grid place-items-center cursor-pointer text-lg text-ink-muted hover:bg-ink hover:text-cream hover:border-ink transition-all"
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
            >
              <Icon name="x" size={16} />
            </button>
          </div>

          {/* Drawer body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-1 mb-6">
              {links.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-lg font-medium py-3 border-b border-line-soft transition-colors",
                    pathname === href ? "text-terracotta" : "text-ink-2 hover:text-terracotta"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-2">{t.branch.label}</span>
                <BranchSelector />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-ink-muted block mb-2">Language</span>
                <LangSwitcher />
              </div>
            </div>

            <Link
              href="/pickup"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-ink text-cream text-sm font-semibold tracking-wide hover:bg-terracotta transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.orderNow}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
