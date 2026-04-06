"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { DICTIONARY, type Locale } from "@/lib/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("exthub_lang") as Locale
    if (saved && (saved === "vi" || saved === "en")) {
      setLocale(saved)
    }
  }, [])

  const handleSetLocale = (l: Locale) => {
    setLocale(l)
    localStorage.setItem("exthub_lang", l)
  }

  // Simple nested translation getter (e.g. t('nav.home'))
  const t = (path: string): string => {
    const keys = path.split(".")
    let current: any = DICTIONARY[locale]
    for (const key of keys) {
      if (current[key] === undefined) return path
      current = current[key]
    }
    return current as string
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
