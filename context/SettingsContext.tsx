"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Theme = "dark" | "light" | "yellow-black" | "green"
export type AccentColor =
  | "#2ecc71"
  | "#3498db"
  | "#f97316"
export type FontType = "var(--font-primary)" | "var(--font-secondary)" | "sans-serif"
export type BgAnimType = "blob" | "shapes" | "rain" | "particles"

interface SettingsContextType {
  theme: Theme
  setTheme: (t: Theme) => void
  accent: AccentColor
  setAccent: (a: AccentColor) => void
  font: FontType
  setFont: (f: FontType) => void
  bgAnim: BgAnimType
  setBgAnim: (b: BgAnimType) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

const ACCENT_COLORS = {
  "#2ecc71": {
    accent2: "#27ae60",
    glow: "rgba(46, 204, 113, 0.12)",
    selection: "rgba(46, 204, 113, 0.25)",
  },
  "#3498db": {
    accent2: "#2980b9",
    glow: "rgba(52, 152, 219, 0.12)",
    selection: "rgba(52, 152, 219, 0.25)",
  },
  "#f97316": {
    accent2: "#ea580c",
    glow: "rgba(249, 115, 22, 0.12)",
    selection: "rgba(249, 115, 22, 0.25)",
  },
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [accent, setAccent] = useState<AccentColor>("#2ecc71")
  const [font, setFont] = useState<FontType>("var(--font-primary)")
  const [bgAnim, setBgAnim] = useState<BgAnimType>("blob")

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const s_theme = localStorage.getItem("exthub_theme") as Theme
    const s_accent = localStorage.getItem("exthub_accent") as AccentColor
    const s_font = localStorage.getItem("exthub_font") as FontType
    const s_bgAnim = localStorage.getItem("exthub_bgAnim") as BgAnimType

    if (s_theme) setTheme(s_theme)
    if (s_accent) setAccent(s_accent)
    if (s_font && (s_font === "var(--font-primary)" || s_font === "var(--font-secondary)" || s_font === "sans-serif")) setFont(s_font)
    if (s_bgAnim) setBgAnim(s_bgAnim)

    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("exthub_theme", theme)
    localStorage.setItem("exthub_accent", accent)
    localStorage.setItem("exthub_font", font)
    localStorage.setItem("exthub_bgAnim", bgAnim)

    document.documentElement.dataset.theme = theme

    const root = document.documentElement

    if (theme === "light") {
      root.style.setProperty("--bg", "#ffffff")
      root.style.setProperty("--bg2", "#f4f4f5")
      root.style.setProperty("--bg3", "#e4e4e7")
      root.style.setProperty("--bg4", "#d4d4d8")
      root.style.setProperty("--bg-glass", "rgba(255, 255, 255, 0.85)")
      root.style.setProperty("--border", "rgba(0, 0, 0, 0.12)")
      root.style.setProperty("--border2", "rgba(0, 0, 0, 0.22)")
      root.style.setProperty("--text", "#09090b")
      root.style.setProperty("--muted", "#52525b")
      root.style.setProperty("--muted2", "#71717a")
    } else if (theme === "yellow-black") {
      root.style.setProperty("--bg", "#050505")
      root.style.setProperty("--bg2", "#0f0f0f")
      root.style.setProperty("--bg3", "#141414")
      root.style.setProperty("--bg4", "#1a1a1a")
      root.style.setProperty("--bg-glass", "rgba(5, 5, 5, 0.85)")
      root.style.setProperty("--border", "rgba(234, 179, 8, 0.2)")
      root.style.setProperty("--border2", "rgba(234, 179, 8, 0.35)")
      root.style.setProperty("--text", "#fef08a")
      root.style.setProperty("--muted", "#ca8a04")
      root.style.setProperty("--muted2", "#854d0e")
    } else if (theme === "green") {
      root.style.setProperty("--bg", "#022c22")
      root.style.setProperty("--bg2", "#064e3b")
      root.style.setProperty("--bg3", "#065f46")
      root.style.setProperty("--bg4", "#047857")
      root.style.setProperty("--bg-glass", "rgba(2, 44, 34, 0.85)")
      root.style.setProperty("--border", "rgba(167, 243, 208, 0.15)")
      root.style.setProperty("--border2", "rgba(167, 243, 208, 0.3)")
      root.style.setProperty("--text", "#ecfdf5")
      root.style.setProperty("--muted", "#6ee7b7")
      root.style.setProperty("--muted2", "#34d399")
    } else {
      root.style.setProperty("--bg", "#050607")
      root.style.setProperty("--bg2", "#0b0c0e")
      root.style.setProperty("--bg3", "#111215")
      root.style.setProperty("--bg4", "#17181c")
      root.style.setProperty("--bg-glass", "rgba(8,9,10,0.85)")
      root.style.setProperty("--border", "rgba(255,255,255,0.06)")
      root.style.setProperty("--border2", "rgba(255,255,255,0.11)")
      root.style.setProperty("--text", "#f8fafc")
      root.style.setProperty("--muted", "#94a3b8")
      root.style.setProperty("--muted2", "#475569")
    }

    const colorConfig = ACCENT_COLORS[accent] || ACCENT_COLORS["#2ecc71"]
    root.style.setProperty("--accent", accent)
    root.style.setProperty("--accent2", colorConfig.accent2)
    root.style.setProperty("--accent-glow", colorConfig.glow)

    document.body.style.fontFamily = `${font}, "Segoe UI", sans-serif`
  }, [theme, accent, font, bgAnim, mounted])

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
        font,
        setFont,
        bgAnim,
        setBgAnim,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider")
  return context
}
