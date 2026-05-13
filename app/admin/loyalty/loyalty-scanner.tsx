"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/icons";

interface LoyaltyScannerProps {
  baristaName: string;
}

export function LoyaltyScanner({ baristaName }: LoyaltyScannerProps) {
  const [userId, setUserId] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string; card?: { stamps: number; freeDrinks: number }; rewardEarned?: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);

  const handleStamp = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/loyalty/stamp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id.trim(), branch: "Yaletown" }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setResult({
        type: "success",
        message: data.message,
        card: data.card,
        rewardEarned: data.rewardEarned,
      });
      setUserId("");
    } else {
      setResult({ type: "error", message: data.error || "Error al agregar stamp" });
    }
  };

  const startScan = async () => {
    setScanning(true);
    setResult(null);

    const { Html5Qrcode } = await import("html5-qrcode");

    if (!scannerRef.current) return;

    const scanner = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          scanner.stop().then(() => {
            setScanning(false);
            handleStamp(decodedText);
          });
        },
        () => {}
      );
    } catch (err) {
      console.error(err);
      setScanning(false);
      setResult({ type: "error", message: "No se pudo iniciar la cámara. Verifica los permisos." });
    }
  };

  const stopScan = async () => {
    if (html5QrCodeRef.current) {
      await html5QrCodeRef.current.stop();
      html5QrCodeRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-cream/5 border border-cream/10 rounded-xl p-6">
        <h2 className="font-serif text-xl font-medium mb-2">Acreditar stamp</h2>
        <p className="text-sm text-cream/60 mb-6">
          Barista: <strong className="text-cream">{baristaName}</strong>
        </p>

        {!scanning && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-cream/60 mb-1.5">
                ID del cliente (manual)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Pega el ID escaneado"
                  className="flex-1 px-4 py-3 rounded-xl border border-cream/20 bg-cream/5 text-cream placeholder:text-cream/30 focus:outline-none focus:border-terracotta transition-colors"
                />
                <button
                  onClick={() => handleStamp(userId)}
                  disabled={loading || !userId.trim()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-terracotta text-cream text-sm font-semibold hover:bg-terracotta-deep transition-colors disabled:opacity-50"
                >
                  {loading ? "..." : "Agregar"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-cream/10" />
              <span className="text-xs text-cream/40">o</span>
              <div className="flex-1 h-px bg-cream/10" />
            </div>

            <button
              onClick={startScan}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-cream/20 text-cream text-sm font-semibold hover:bg-cream/10 transition-colors"
            >
              <Icon name="bag" size={16} /> Escanear QR con cámara
            </button>
          </div>
        )}

        {scanning && (
          <div className="space-y-4">
            <div id="qr-reader" ref={scannerRef} className="rounded-xl overflow-hidden" />
            <button
              onClick={stopScan}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-berry text-cream text-sm font-semibold hover:bg-berry/80 transition-colors"
            >
              Cancelar escaneo
            </button>
          </div>
        )}
      </div>

      {result && (
        <div
          className={`rounded-xl p-6 border ${
            result.type === "success"
              ? result.rewardEarned
                ? "bg-gold/10 border-gold/30 text-cream"
                : "bg-moss/10 border-moss/30 text-cream"
              : "bg-berry/10 border-berry/30 text-cream"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold ${
                result.type === "success" ? "bg-moss text-cream" : "bg-berry text-cream"
              }`}
            >
              {result.type === "success" ? "✓" : "✕"}
            </div>
            <h3 className="font-serif text-lg font-medium">{result.type === "success" ? "Éxito" : "Error"}</h3>
          </div>
          <p className="text-sm opacity-90">{result.message}</p>
          {result.card && (
            <div className="mt-3 text-sm opacity-80">
              Sellos actuales: <strong>{result.card.stamps}</strong> / 10 · Bebidas gratis:{" "}
              <strong>{result.card.freeDrinks}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
