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

  const colors: { color: AccentColor; label: string }[] = [
    { color: "#10b981", label: "Emerald" },
    { color: "#6366f1", label: "Indigo" },
    { color: "#8b5cf6", label: "Violet" },
    { color: "#0ea5e9", label: "Sky" },
    { color: "#f97316", label: "Orange" },
    { color: "#f43f5e", label: "Rose" },
    { color: "#2ecc71", label: "Classic Green" },
    { color: "#3498db", label: "Classic Blue" },
    { color: "#ffffff", label: "White" },
    { color: "#000000", label: "Black" },
  ]

  const fonts: { label: string; value: FontType }[] = [
    { label: t("settings.font_primary"), value: "var(--font-primary)" },
    { label: t("settings.font_secondary"), value: "var(--font-secondary)" },
    { label: "System Sans", value: "sans-serif" },
  ]

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="max-w-[460px] w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        style={{ 
          background: "var(--bg2)", 
          border: "1px solid var(--border2)",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.6)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--bg3)] border border-[var(--border)]">
              <i className="fa-solid fa-sliders text-xs" style={{ color: "var(--accent-visible)" }}></i>
            </div>
            <h2 className="font-syne font-bold text-lg text-[var(--text)]">{t("settings.title")}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[var(--bg3)] text-[var(--muted)] hover:text-[var(--text)]"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[var(--muted2)]">{t("settings.theme")}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: "dark" as Theme, label: t("settings.dark"), icon: "fa-moon" },
              { id: "light" as Theme, label: t("settings.light"), icon: "fa-sun" },
              { id: "yellow-black" as Theme, label: t("settings.yellow_black"), icon: "fa-bolt" },
              { id: "green" as Theme, label: t("settings.green"), icon: "fa-leaf" },
            ].map((th) => {
              const active = theme === th.id
              return (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id)}
                  className="py-2.5 px-3 rounded-xl border flex justify-center gap-2 items-center text-xs font-bold transition-all duration-200"
                  style={{
                    borderColor: active ? "var(--accent-border)" : "var(--border)",
                    background: active ? "var(--bg4)" : "var(--bg)",
                    color: active ? "var(--text)" : "var(--muted)",
                    boxShadow: active ? "0 2px 10px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  <i className={`fa-solid ${th.icon}`} style={{ color: active ? "var(--accent-visible)" : undefined }}></i>
                  {th.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[var(--muted2)]">{t("settings.accent")}</p>
          <div className="grid grid-cols-5 gap-2.5">
            {colors.map((c) => {
              const active = accent === c.color
              return (
                <button
                  key={c.color}
                  onClick={() => setAccent(c.color)}
                  title={c.label}
                  className="w-full aspect-square rounded-xl flex items-center justify-center transition-all hover:scale-105 relative group"
                  style={{
                    background: c.color,
                    boxShadow: active ? `0 0 0 2px var(--bg2), 0 0 0 4px ${c.color === "#ffffff" ? "#cbd5e1" : c.color}` : "none",
                    border: c.color === "#000000" || c.color === "#ffffff" ? "1px solid var(--border2)" : "none",
                  }}
                >
                  {active && (
                    <i className={`fa-solid fa-check text-xs ${c.color === "#ffffff" ? "text-slate-900" : "text-white"}`}></i>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Font Selection */}
        <div className="mb-6">
          <p className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[var(--muted2)]">{t("settings.font")}</p>
          <div className="flex flex-col gap-2">
            {fonts.map((f) => {
              const active = font === f.value
              return (
                <button
                  key={f.value}
                  onClick={() => setFont(f.value)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200"
                  style={{
                    borderColor: active ? "var(--accent-border)" : "var(--border)",
                    background: active ? "var(--bg4)" : "var(--bg)",
                    color: active ? "var(--text)" : "var(--muted)",
                  }}
                >
                  <span style={{ fontFamily: f.value }}>{f.label}</span>
                  {active && <i className="fa-solid fa-check text-xs" style={{ color: "var(--accent-visible)" }}></i>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Background Animation Selection */}
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[var(--muted2)]">
            {t("settings.bg_animation")}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: "blob" as BgAnimType, label: t("settings.bg_blob"), icon: "fa-water" },
              { id: "shapes" as BgAnimType, label: t("settings.bg_shapes"), icon: "fa-shapes" },
              { id: "rain" as BgAnimType, label: t("settings.bg_rain"), icon: "fa-cloud-rain" },
              { id: "particles" as BgAnimType, label: t("settings.bg_particles"), icon: "fa-wand-magic-sparkles" },
            ].map((anim) => {
              const active = bgAnim === anim.id
              return (
                <button
                  key={anim.id}
                  onClick={() => setBgAnim(anim.id)}
                  className="py-2.5 px-3 rounded-xl border flex justify-center gap-2 items-center text-xs font-semibold transition-all duration-200"
                  style={{
                    borderColor: active ? "var(--accent-border)" : "var(--border)",
                    background: active ? "var(--bg4)" : "var(--bg)",
                    color: active ? "var(--text)" : "var(--muted)",
                  }}
                >
                  <i className={`fa-solid ${anim.icon}`} style={{ color: active ? "var(--accent-visible)" : undefined }}></i>
                  {anim.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

