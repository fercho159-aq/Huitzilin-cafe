"use client";

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
      <div className="bg-ink text-cream px-6 py-3.5 flex items-center justify-center gap-4 text-sm font-medium flex-wrap">
        <span
          className="w-[7px] h-[7px] rounded-full bg-doordash"
          style={{ animation: "pulse 2s infinite" }}
        />
        <span>{t.dd.banner}</span>
        <span className="opacity-60">·</span>
        <a href="#" className="underline underline-offset-[3px] font-semibold" onClick={(e) => e.preventDefault()}>
          {t.dd.cta} →
        </a>
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-4 max-w-[1480px] mx-auto">
        <Link href="/" className="flex items-center gap-3 font-serif text-[22px] font-medium tracking-tight text-ink">
          <span className="w-[52px] h-[52px] rounded-full bg-cream grid place-items-center overflow-hidden">
            <img src="/images/logo-new.png" alt="Huitzitzilin Cafe logo" className="w-full h-full object-cover" />
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 justify-self-center">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium text-ink-2 py-1.5 relative tracking-wide hover:text-terracotta transition-colors",
                pathname === href && "text-terracotta after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-terracotta"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <BranchSelector compact />
          <button
            className="relative w-[42px] h-[42px] rounded-full border border-line bg-paper grid place-items-center cursor-pointer text-ink-2 hover:bg-ink hover:text-cream hover:border-ink transition-all"
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
          <Link
            href="/pickup"
            className="inline-flex items-center justify-center gap-2 px-[22px] py-[14px] rounded-full bg-ink text-cream text-sm font-semibold tracking-wide hover:bg-terracotta transition-colors whitespace-nowrap"
          >
            {t.nav.orderNow}
          </Link>
        </div>
      </div>
    </nav>
  );
}
