"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { TRANSLATIONS, DEFAULT_LANG, type Lang } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof TRANSLATIONS)[Lang];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("colibri_lang") || localStorage.getItem("boreal_lang");
      if (saved && (saved === "es" || saved === "en" || saved === "fr")) {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("colibri_lang", l);
      document.documentElement.lang = l;
    } catch {}
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
