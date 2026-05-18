"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { useT } from "@/providers/language-provider";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface LoyaltyCardProps {
  user: { id: string; name: string; email: string | null };
  card: { stamps: number; freeDrinks: number };
}

export function LoyaltyCard({ user, card }: LoyaltyCardProps) {
  const { t } = useT();
  const [qrUrl, setQrUrl] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState("");
  const [currentFreeDrinks, setCurrentFreeDrinks] = useState(card.freeDrinks);
  const [currentStamps] = useState(card.stamps);

  useEffect(() => {
    QRCode.toDataURL(user.id, { width: 320, margin: 2 }).then(setQrUrl);
  }, [user.id]);

  const handleRedeem = async () => {
    if (currentFreeDrinks <= 0) return;
    setRedeeming(true);
    const res = await fetch("/api/loyalty/redeem", { method: "POST" });
    const data = await res.json();
    setRedeeming(false);
    if (res.ok) {
      setCurrentFreeDrinks(data.card.freeDrinks);
      setRedeemMsg("Americano gratis canjeado. ¡Disfrútalo!");
      setTimeout(() => setRedeemMsg(""), 4000);
    } else {
      setRedeemMsg(data.error || "Error al canjear");
    }
  };

  return (
    <section className="py-16 sm:py-24" id="loyalty">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
            <span className="w-6 h-px bg-ink-muted" />
            {t.loyalty.eyebrow}
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,56px)] font-medium leading-[1.08] tracking-tight">
            Hola, {user.name.split(" ")[0]}.
            <br />
            <em className="text-terracotta italic">Tu tarjeta Colibrí.</em>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
          <div
            className="relative rounded-[18px] p-6 sm:p-8 flex flex-col justify-between aspect-[1.6/1] shadow-[0_4px_12px_rgba(31,22,16,0.08),0_24px_60px_rgba(31,22,16,0.12)] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #2A1F17 0%, #4A332A 100%)" }}
          >
            <div
              className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(184, 71, 42, 0.3), transparent 70%)" }}
            />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/70">
                  {t.loyalty.memberCard}
                </div>
                <div className="font-mono text-base tracking-[0.18em] mt-1.5 text-cream">
                  B-{user.id.slice(-6).toUpperCase()}
                </div>
              </div>
              <div className="w-11 h-11 rounded-full bg-cream text-ink grid place-items-center font-serif italic text-[22px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/70 mb-3">
                {t.loyalty.progress} <span className="text-cream font-semibold">{currentStamps}</span>{" "}
                {t.loyalty.progressOf} 10 {t.loyalty.stamps}
              </div>
              <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-full border-[1.5px] grid place-items-center font-serif text-xs sm:text-sm",
                      i < currentStamps
                        ? "bg-terracotta border-terracotta text-cream"
                        : i === currentStamps
                        ? "border-cream text-cream"
                        : "border-dashed border-cream/35 text-cream/40"
                    )}
                  >
                    {i < currentStamps ? "B" : i === currentStamps ? "•" : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-paper border border-line rounded-[14px] p-6 sm:p-7">
            <h2 className="font-serif text-[22px] font-medium mb-2">Tu código QR</h2>
            <p className="text-sm text-ink-muted mb-4">
              Muestra este código al barista para acreditar tu compra.
            </p>
            <div className="flex justify-center bg-cream rounded-xl p-3">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="QR de lealtad"
                  className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-lg"
                />
              ) : (
                <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] bg-cream-2 rounded-lg animate-pulse" />
              )}
            </div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted text-center mt-4">
              ID · {user.id.slice(-12).toUpperCase()}
            </div>
          </div>
        </div>

        {currentFreeDrinks > 0 && (
          <div className="bg-moss/10 border border-moss/20 rounded-xl p-5 sm:p-6 mt-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-serif text-xl font-medium text-moss mb-1">Recompensa disponible</h2>
                <p className="text-sm text-moss/80">
                  Tienes <strong>{currentFreeDrinks}</strong> americano(s) gratis por canjear.
                </p>
              </div>
              <button
                onClick={handleRedeem}
                disabled={redeeming}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-moss text-cream text-sm font-semibold hover:bg-moss/90 transition-colors disabled:opacity-60"
              >
                {redeeming ? "Canjeando..." : "Canjear"}
              </button>
            </div>
            {redeemMsg && (
              <p className="text-sm mt-3 text-moss font-medium">{redeemMsg}</p>
            )}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { num: 1, title: t.loyalty.tiers.t1Title, desc: t.loyalty.tiers.t1Desc, active: currentStamps < 5 },
            { num: 2, title: t.loyalty.tiers.t2Title, desc: t.loyalty.tiers.t2Desc, active: currentStamps >= 5 && currentStamps < 10 },
            { num: 3, title: t.loyalty.tiers.t3Title, desc: t.loyalty.tiers.t3Desc, active: currentStamps >= 10 },
          ].map((tier) => (
            <div
              key={tier.num}
              className={cn(
                "p-4 border rounded-lg",
                tier.active ? "border-terracotta bg-terracotta/5" : "border-line bg-paper"
              )}
            >
              <div
                className={cn(
                  "font-serif text-[22px] w-9 h-9 rounded-full grid place-items-center mb-2",
                  tier.active ? "bg-terracotta text-cream" : "bg-cream-2 text-ink-muted"
                )}
              >
                {tier.num}
              </div>
              <strong className="font-serif text-[17px] font-medium block mb-0.5">{tier.title}</strong>
              <span className="text-xs text-ink-muted">{tier.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-line bg-paper text-ink text-sm font-semibold hover:bg-ink hover:text-cream hover:border-ink transition-colors"
          >
            Ver mi perfil <Icon name="arrow" size={14} />
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-terracotta transition-colors"
          >
            Sumar un sello <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
