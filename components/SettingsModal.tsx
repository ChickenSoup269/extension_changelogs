"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  useSettings,
  type Theme,
  type AccentColor,
  type FontType,
  type BgAnimType,
} from "@/context/SettingsContext"
import { useLanguage } from "@/context/LanguageContext"

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    font,
    setFont,
    bgAnim,
    setBgAnim,
  } = useSettings()
  const { t, locale } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const colors: AccentColor[] = [
    "#2ecc71",
    "#3498db",
    "#f97316",
  ]
  const fonts: { label: string; value: FontType }[] = [
    { label: t("settings.font_primary"), value: "var(--font-primary)" },
    { label: t("settings.font_secondary"), value: "var(--font-secondary)" },
    { label: "System Sans", value: "sans-serif" },
  ]

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="max-w-[420px] w-full rounded-2xl p-8"
        style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
          <h2 className="font-syne font-bold text-xl text-[var(--text)]">{t("settings.title")}</h2>
          <button
            onClick={onClose}
            className="text-xl transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--muted)" }}
          >
            &times;
          </button>
        </div>

        {/* Theme */}
        <div className="mb-8">
          <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: "var(--muted2)" }}>{t("settings.theme")}</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("dark")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: theme === "dark" ? "var(--text)" : "var(--border)",
                background: theme === "dark" ? "var(--bg3)" : "transparent",
                color: theme === "dark" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-moon"></i> {t("settings.dark")}
            </button>
            <button
              onClick={() => setTheme("light")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: theme === "light" ? "var(--text)" : "var(--border)",
                background: theme === "light" ? "var(--bg3)" : "transparent",
                color: theme === "light" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-sun"></i> {t("settings.light")}
            </button>
            <button
              onClick={() => setTheme("yellow-black")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: theme === "yellow-black" ? "var(--text)" : "var(--border)",
                background: theme === "yellow-black" ? "var(--bg3)" : "transparent",
                color: theme === "yellow-black" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-bolt"></i> {t("settings.yellow_black")}
            </button>
            <button
              onClick={() => setTheme("green")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: theme === "green" ? "var(--text)" : "var(--border)",
                background: theme === "green" ? "var(--bg3)" : "transparent",
                color: theme === "green" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-leaf"></i> {t("settings.green")}
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-8">
          <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: "var(--muted2)" }}>{t("settings.accent")}</p>
          <div className="flex flex-wrap gap-4">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setAccent(c)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{
                  background: c,
                  boxShadow: accent === c ? `0 0 0 2px var(--bg2), 0 0 0 4px ${c}` : "none",
                }}
              >
                {accent === c && <i className="fa-solid fa-check text-white text-xs"></i>}
              </button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="mb-8">
          <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: "var(--muted2)" }}>{t("settings.font")}</p>
          <div className="flex flex-col gap-3">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => setFont(f.value)}
                className="flex items-center justify-between px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all"
                style={{
                  borderColor: font === f.value ? "var(--text)" : "var(--border)",
                  background: font === f.value ? "var(--bg3)" : "transparent",
                  color: font === f.value ? "var(--text)" : "var(--muted)",
                }}
              >
                <span style={{ fontFamily: f.value }}>{f.label}</span>
                {font === f.value && <i className="fa-solid fa-check"></i>}
              </button>
            ))}
          </div>
        </div>

        {/* Background Animation Selection */}
        <div>
          <p className="text-xs uppercase font-bold tracking-widest mb-4" style={{ color: "var(--muted2)" }}>
            {t("settings.bg_animation")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setBgAnim("blob")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: bgAnim === "blob" ? "var(--text)" : "var(--border)",
                background: bgAnim === "blob" ? "var(--bg3)" : "transparent",
                color: bgAnim === "blob" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-water"></i> {t("settings.bg_blob")}
            </button>
            <button
              onClick={() => setBgAnim("shapes")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: bgAnim === "shapes" ? "var(--text)" : "var(--border)",
                background: bgAnim === "shapes" ? "var(--bg3)" : "transparent",
                color: bgAnim === "shapes" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-shapes"></i> {t("settings.bg_shapes")}
            </button>
            <button
              onClick={() => setBgAnim("rain")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: bgAnim === "rain" ? "var(--text)" : "var(--border)",
                background: bgAnim === "rain" ? "var(--bg3)" : "transparent",
                color: bgAnim === "rain" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-cloud-rain"></i> {t("settings.bg_rain")}
            </button>
            <button
              onClick={() => setBgAnim("particles")}
              className="py-3 rounded-xl border flex justify-center gap-2 items-center text-sm font-semibold transition-all"
              style={{
                borderColor: bgAnim === "particles" ? "var(--text)" : "var(--border)",
                background: bgAnim === "particles" ? "var(--bg3)" : "transparent",
                color: bgAnim === "particles" ? "var(--text)" : "var(--muted)",
              }}
            >
              <i className="fa-solid fa-sparkles"></i> {t("settings.bg_particles")}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
