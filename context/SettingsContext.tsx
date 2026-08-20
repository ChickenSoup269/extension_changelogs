"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Theme = "dark" | "light" | "yellow-black" | "green"
export type AccentColor =
  | "#10b981" // Emerald
  | "#6366f1" // Indigo
  | "#8b5cf6" // Violet
  | "#0ea5e9" // Sky Blue
  | "#f97316" // Orange
  | "#f43f5e" // Rose
  | "#ffffff" // Pure White
  | "#2ecc71" // Classic Green
  | "#3498db" // Classic Blue
  | "#000000" // Black

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

const ACCENT_COLORS: Record<string, { accent2: string; glow: string; selection: string; text: string; border: string }> = {
  "#10b981": {
    accent2: "#059669",
    glow: "rgba(16, 185, 129, 0.2)",
    selection: "rgba(16, 185, 129, 0.3)",
    text: "#ffffff",
    border: "rgba(16, 185, 129, 0.35)",
  },
  "#6366f1": {
    accent2: "#4f46e5",
    glow: "rgba(99, 102, 241, 0.22)",
    selection: "rgba(99, 102, 241, 0.3)",
    text: "#ffffff",
    border: "rgba(99, 102, 241, 0.35)",
  },
  "#8b5cf6": {
    accent2: "#7c3aed",
    glow: "rgba(139, 92, 246, 0.22)",
    selection: "rgba(139, 92, 246, 0.3)",
    text: "#ffffff",
    border: "rgba(139, 92, 246, 0.35)",
  },
  "#0ea5e9": {
    accent2: "#0284c7",
    glow: "rgba(14, 165, 233, 0.2)",
    selection: "rgba(14, 165, 233, 0.3)",
    text: "#ffffff",
    border: "rgba(14, 165, 233, 0.35)",
  },
  "#f97316": {
    accent2: "#ea580c",
    glow: "rgba(249, 115, 22, 0.2)",
    selection: "rgba(249, 115, 22, 0.3)",
    text: "#ffffff",
    border: "rgba(249, 115, 22, 0.35)",
  },
  "#f43f5e": {
    accent2: "#e11d48",
    glow: "rgba(244, 63, 94, 0.22)",
    selection: "rgba(244, 63, 94, 0.3)",
    text: "#ffffff",
    border: "rgba(244, 63, 94, 0.35)",
  },
  "#2ecc71": {
    accent2: "#27ae60",
    glow: "rgba(46, 204, 113, 0.2)",
    selection: "rgba(46, 204, 113, 0.3)",
    text: "#ffffff",
    border: "rgba(46, 204, 113, 0.35)",
  },
  "#3498db": {
    accent2: "#2980b9",
    glow: "rgba(52, 152, 219, 0.2)",
    selection: "rgba(52, 152, 219, 0.3)",
    text: "#ffffff",
    border: "rgba(52, 152, 219, 0.35)",
  },
  "#ffffff": {
    accent2: "#e2e8f0",
    glow: "rgba(255, 255, 255, 0.15)",
    selection: "rgba(255, 255, 255, 0.3)",
    text: "#090a0f",
    border: "rgba(255, 255, 255, 0.4)",
  },
  "#000000": {
    accent2: "#27272a",
    glow: "rgba(255, 255, 255, 0.1)",
    selection: "rgba(255, 255, 255, 0.2)",
    text: "#ffffff",
    border: "rgba(255, 255, 255, 0.2)",
  },
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [accent, setAccent] = useState<AccentColor>("#10b981")
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
      root.style.setProperty("--bg", "#fafafa")
      root.style.setProperty("--bg2", "#ffffff")
      root.style.setProperty("--bg3", "#f1f5f9")
      root.style.setProperty("--bg4", "#e2e8f0")
      root.style.setProperty("--bg-glass", "rgba(255, 255, 255, 0.88)")
      root.style.setProperty("--border", "rgba(15, 23, 42, 0.08)")
      root.style.setProperty("--border2", "rgba(15, 23, 42, 0.16)")
      root.style.setProperty("--text", "#0f172a")
      root.style.setProperty("--muted", "#64748b")
      root.style.setProperty("--muted2", "#94a3b8")
    } else if (theme === "yellow-black") {
      root.style.setProperty("--bg", "#090804")
      root.style.setProperty("--bg2", "#131109")
      root.style.setProperty("--bg3", "#1d1a10")
      root.style.setProperty("--bg4", "#292415")
      root.style.setProperty("--bg-glass", "rgba(9, 8, 4, 0.88)")
      root.style.setProperty("--border", "rgba(234, 179, 8, 0.18)")
      root.style.setProperty("--border2", "rgba(234, 179, 8, 0.35)")
      root.style.setProperty("--text", "#fef08a")
      root.style.setProperty("--muted", "#eab308")
      root.style.setProperty("--muted2", "#a16207")
    } else if (theme === "green") {
      root.style.setProperty("--bg", "#021c15")
      root.style.setProperty("--bg2", "#063327")
      root.style.setProperty("--bg3", "#0b4636")
      root.style.setProperty("--bg4", "#125a47")
      root.style.setProperty("--bg-glass", "rgba(2, 28, 21, 0.88)")
      root.style.setProperty("--border", "rgba(52, 211, 153, 0.18)")
      root.style.setProperty("--border2", "rgba(52, 211, 153, 0.32)")
      root.style.setProperty("--text", "#ecfdf5")
      root.style.setProperty("--muted", "#6ee7b7")
      root.style.setProperty("--muted2", "#34d399")
    } else {
      // Modern High-Contrast Obsidian Dark Theme
      root.style.setProperty("--bg", "#080a0f")
      root.style.setProperty("--bg2", "#0f121a")
      root.style.setProperty("--bg3", "#161b26")
      root.style.setProperty("--bg4", "#1e2433")
      root.style.setProperty("--bg-glass", "rgba(8, 10, 15, 0.85)")
      root.style.setProperty("--border", "rgba(255, 255, 255, 0.08)")
      root.style.setProperty("--border2", "rgba(255, 255, 255, 0.15)")
      root.style.setProperty("--text", "#f8fafc")
      root.style.setProperty("--muted", "#94a3b8")
      root.style.setProperty("--muted2", "#64748b")
    }

    // Calculate dynamic adaptive accent styles based on theme & selected color
    const colorConfig = ACCENT_COLORS[accent] || ACCENT_COLORS["#10b981"]
    let finalAccent: string = accent
    let finalAccent2: string = colorConfig.accent2
    let finalAccentGlow: string = colorConfig.glow
    let finalAccentText: string = colorConfig.text
    let finalAccentBorder: string = colorConfig.border
    let finalAccentVisible: string = accent

    const isDarkBg = theme !== "light"

    if (accent === "#ffffff") {
      if (theme === "light") {
        // High contrast dark monochrome on light background
        finalAccent = "#0f172a"
        finalAccent2 = "#334155"
        finalAccentGlow = "rgba(15, 23, 42, 0.15)"
        finalAccentText = "#ffffff"
        finalAccentBorder = "rgba(15, 23, 42, 0.25)"
        finalAccentVisible = "#0f172a"
      } else {
        // Pure crisp white on dark background
        finalAccent = "#ffffff"
        finalAccent2 = "#e2e8f0"
        finalAccentGlow = "rgba(255, 255, 255, 0.25)"
        finalAccentText = "#090a0f"
        finalAccentBorder = "rgba(255, 255, 255, 0.45)"
        finalAccentVisible = "#ffffff"
      }
    } else if (accent === "#000000") {
      if (theme === "light") {
        // Deep obsidian black on light background
        finalAccent = "#000000"
        finalAccent2 = "#1e293b"
        finalAccentGlow = "rgba(0, 0, 0, 0.18)"
        finalAccentText = "#ffffff"
        finalAccentBorder = "rgba(0, 0, 0, 0.35)"
        finalAccentVisible = "#000000"
      } else {
        // Adapts to platinum/white on dark background so buttons don't disappear
        finalAccent = "#f8fafc"
        finalAccent2 = "#cbd5e1"
        finalAccentGlow = "rgba(255, 255, 255, 0.25)"
        finalAccentText = "#090a0f"
        finalAccentBorder = "rgba(255, 255, 255, 0.45)"
        finalAccentVisible = "#f8fafc"
      }
    } else {
      // For colored accents, ensure high text visibility on light vs dark themes
      if (theme === "light") {
        finalAccentVisible = colorConfig.accent2 // slightly deeper tone for crisp text/icons on light mode
      } else {
        finalAccentVisible = accent
      }
    }

    root.style.setProperty("--accent", finalAccent)
    root.style.setProperty("--accent2", finalAccent2)
    root.style.setProperty("--accent-glow", finalAccentGlow)
    root.style.setProperty("--accent-text", finalAccentText)
    root.style.setProperty("--accent-border", finalAccentBorder)
    root.style.setProperty("--accent-visible", finalAccentVisible)

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

