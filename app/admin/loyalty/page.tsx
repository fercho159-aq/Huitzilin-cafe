import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { LoyaltyScanner } from "./loyalty-scanner";

export default async function AdminLoyaltyPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const role = session.user.role;
  if (role !== "BARISTA" && role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#1A130D] text-cream page-animate">
      <div className="flex items-center justify-between px-8 py-5 border-b border-cream/10">
        <div className="flex items-center gap-4">
          <span className="w-[44px] h-[44px] rounded-full bg-cream grid place-items-center overflow-hidden">
            <img src="/images/logo.png" alt="Huitzitzilin Cafe logo" className="w-full h-full object-cover" />
          </span>
          <div>
            <div className="font-serif text-[22px] font-medium text-cream">Programa de Lealtad</div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/55 mt-0.5">
              Escaneo de QR · {session.user.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full border border-cream/20 text-cream text-[13px] font-semibold hover:bg-cream/10 transition-colors"
          >
            Pedidos
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-[14px] py-2 rounded-full bg-cream text-ink text-[13px] font-semibold hover:bg-paper transition-colors"
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-[640px] mx-auto">
        <LoyaltyScanner baristaName={session.user.name ?? "Barista"} />
      </div>
    </div>
  );
}
