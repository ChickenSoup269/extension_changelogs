"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Theme = "dark" | "light"
export type AccentColor =
  | "#2ecc71"
  | "#3498db"
  | "#f59e0b"
  | "#ef4444"
  | "#9b59b6"
  | "#e84393"
  | "#00cec9"
export type FontType =
  | "var(--font-inter)"
  | "system-ui, sans-serif"
  | "Segoe UI"

interface SettingsContextType {
  theme: Theme
  setTheme: (t: Theme) => void
  accent: AccentColor
  setAccent: (a: AccentColor) => void
  font: FontType
  setFont: (f: FontType) => void
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
  "#f59e0b": {
    accent2: "#d97706",
    glow: "rgba(245, 158, 11, 0.12)",
    selection: "rgba(245, 158, 11, 0.25)",
  },
  "#ef4444": {
    accent2: "#dc2626",
    glow: "rgba(239, 68, 68, 0.12)",
    selection: "rgba(239, 68, 68, 0.25)",
  },
  "#9b59b6": {
    accent2: "#8e44ad",
    glow: "rgba(155, 89, 182, 0.12)",
    selection: "rgba(155, 89, 182, 0.25)",
  },
  "#e84393": {
    accent2: "#d63031",
    glow: "rgba(232, 67, 147, 0.12)",
    selection: "rgba(232, 67, 147, 0.25)",
  },
  "#00cec9": {
    accent2: "#00b894",
    glow: "rgba(0, 206, 201, 0.12)",
    selection: "rgba(0, 206, 201, 0.25)",
  },
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [accent, setAccent] = useState<AccentColor>("#2ecc71")
  const [font, setFont] = useState<FontType>("var(--font-inter)")

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const s_theme = localStorage.getItem("exthub_theme") as Theme
    const s_accent = localStorage.getItem("exthub_accent") as AccentColor
    const s_font = localStorage.getItem("exthub_font") as FontType

    if (s_theme) setTheme(s_theme)
    if (s_accent) setAccent(s_accent)
    if (s_font) setFont(s_font)

    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("exthub_theme", theme)
    localStorage.setItem("exthub_accent", accent)
    localStorage.setItem("exthub_font", font)

    document.documentElement.dataset.theme = theme

    const root = document.documentElement

    if (theme === "light") {
      root.style.setProperty("--bg", "#ffffff")
      root.style.setProperty("--bg2", "#f8fafc")
      root.style.setProperty("--bg3", "#f1f5f9")
      root.style.setProperty("--bg4", "#e2e8f0")
      root.style.setProperty("--bg-glass", "rgba(255,255,255,0.85)")
      root.style.setProperty("--border", "rgba(0,0,0,0.1)")
      root.style.setProperty("--border2", "rgba(0,0,0,0.15)")
      root.style.setProperty("--text", "#0f172a")
      root.style.setProperty("--muted", "#64748b")
      root.style.setProperty("--muted2", "#94a3b8")
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

    document.body.style.fontFamily =
      font === "var(--font-inter)"
        ? "var(--font-inter), 'Inter', sans-serif"
        : font
  }, [theme, accent, font, mounted])

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, accent, setAccent, font, setFont }}
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
