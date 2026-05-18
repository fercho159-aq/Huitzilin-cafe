"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/icons";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error || !res.ok) {
      setLoading(false);
      setError("Email o contraseña incorrectos");
      return;
    }

    // Hard navigation to avoid client/server cookie race when SSR-rendering the
    // destination right after credential sign-in.
    const dest = callbackUrl.startsWith("/") ? callbackUrl : "/profile";
    window.location.href = dest;
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-8 py-20">
      <div className="w-full max-w-[420px]">
        <div className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-2.5 mb-4">
          <span className="w-[30px] h-px bg-ink-muted" />
          Mi cuenta
        </div>
        <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.08] tracking-tight mb-8">
          Iniciar sesión
        </h1>

        {error && (
          <div className="bg-berry/10 text-berry text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-line bg-paper text-ink placeholder:text-ink-soft focus:outline-none focus:border-terracotta transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-ink-muted mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              name="current-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-line bg-paper text-ink placeholder:text-ink-soft focus:outline-none focus:border-terracotta transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-[18px] rounded-full bg-ink text-cream text-[15px] font-semibold tracking-wide hover:bg-terracotta transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"} <Icon name="arrow" size={16} />
          </button>
        </form>

        <p className="text-sm text-ink-muted mt-6 text-center">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-terracotta font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
