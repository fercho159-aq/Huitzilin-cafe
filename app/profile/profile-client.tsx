"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import QRCode from "qrcode";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ProfileClientProps {
  user: { name: string; email: string | null; id: string };
  card: { stamps: number; freeDrinks: number };
}

export function ProfileClient({ user, card }: ProfileClientProps) {
  const [qrUrl, setQrUrl] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState("");
  const [currentFreeDrinks, setCurrentFreeDrinks] = useState(card.freeDrinks);
  const [currentStamps, setCurrentStamps] = useState(card.stamps);

  useEffect(() => {
    QRCode.toDataURL(user.id, { width: 280, margin: 2 }).then(setQrUrl);
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
    <div className="min-h-[70vh] px-8 py-16 max-w-[720px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-2">
            <span className="w-[30px] h-px bg-ink-muted" />
            Mi cuenta
          </div>
          <h1 className="font-serif text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.08] tracking-tight">
            Hola, {user.name}
          </h1>
          <p className="text-ink-muted text-sm mt-1">{user.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-sm text-ink-muted hover:text-terracotta transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Loyalty Card */}
      <div className="relative rounded-[18px] p-8 flex flex-col justify-between aspect-[1.6/1] shadow-[0_4px_12px_rgba(31,22,16,0.08),0_24px_60px_rgba(31,22,16,0.12)] overflow-hidden mb-10"
        style={{ background: "linear-gradient(135deg, #2A1F17 0%, #4A332A 100%)" }}
      >
        <div
          className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(184, 71, 42, 0.3), transparent 70%)" }}
        />
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/70">Tarjeta Colibrí</div>
            <div className="font-mono text-base tracking-[0.18em] mt-1.5 text-cream">B-{user.id.slice(-6).toUpperCase()}</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-cream text-ink grid place-items-center font-serif italic text-[22px]">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="relative z-10">
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/70 mb-3">
            Llevas{" "}
            <span className="text-cream font-semibold">{currentStamps}</span> de 10 sellos
          </div>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-full border-[1.5px] grid place-items-center font-serif text-sm",
                  i < currentStamps
                    ? "bg-terracotta border-terracotta text-cream"
                    : i === currentStamps
                    ? "border-cream text-cream border-solid"
                    : "border-dashed border-cream/35 text-cream/40"
                )}
              >
                {i < currentStamps ? "B" : i === currentStamps ? "•" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-paper border border-line rounded-xl p-6 mb-8">
        <h2 className="font-serif text-xl font-medium mb-2">Tu código QR</h2>
        <p className="text-sm text-ink-muted mb-4">
          Muestra este código al barista para acreditar tu compra.
        </p>
        <div className="flex justify-center">
          {qrUrl ? (
            <img src={qrUrl} alt="QR de lealtad" className="w-[200px] h-[200px] rounded-xl" />
          ) : (
            <div className="w-[200px] h-[200px] bg-cream-2 rounded-xl animate-pulse" />
          )}
        </div>
      </div>

      {/* Free drinks */}
      {currentFreeDrinks > 0 && (
        <div className="bg-moss/10 border border-moss/20 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
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

      {/* Wallet buttons (placeholder) */}
      <div className="space-y-3">
        <h2 className="font-serif text-xl font-medium mb-2">Agregar a Wallet</h2>
        <button
          disabled
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black text-white text-sm font-semibold opacity-50 cursor-not-allowed"
        >
          <Icon name="bag" size={16} /> Apple Wallet — Próximamente
        </button>
        <button
          disabled
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-talavera text-white text-sm font-semibold opacity-50 cursor-not-allowed"
        >
          <Icon name="bag" size={16} /> Google Wallet — Próximamente
        </button>
        <p className="text-xs text-ink-muted mt-2">
          Necesitamos configurar las cuentas de Apple Developer y Google Cloud antes de activar esta función.
        </p>
      </div>
    </div>
  );
}
