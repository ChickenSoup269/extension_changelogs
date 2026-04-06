"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  useSettings,
  type Theme,
  type AccentColor,
  type FontType,
} from "@/context/SettingsContext"
import { useLanguage } from "@/context/LanguageContext"

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { theme, setTheme, accent, setAccent, font, setFont } = useSettings()
  const { t, locale } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const colors: AccentColor[] = [
    "#2ecc71",
    "#3498db",
    "#f59e0b",
    "#ef4444",
    "#9b59b6",
  ]
  const fonts: { label: string; value: FontType }[] = [
    { label: "Inter (Mặc định)", value: "var(--font-inter)" },
    { label: "System UI", value: "system-ui, sans-serif" },
    { label: "Segoe UI", value: "Segoe UI" },
  ]

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      <div
        className="max-w-[400px] w-full rounded-2xl p-6"
        style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-syne font-bold text-xl">Cài đặt giao diện</h2>
          <button
            onClick={onClose}
            className="text-xl"
            style={{ color: "var(--muted)" }}
          >
            &times;
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3">Chủ đề</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("dark")}
              className="py-2.5 rounded-xl border flex justify-center gap-2 items-center text-sm transition"
              style={{
                borderColor:
                  theme === "dark" ? "var(--accent)" : "var(--border2)",
                background:
                  theme === "dark" ? "var(--accent-glow)" : "transparent",
                color: theme === "dark" ? "var(--accent2)" : "var(--text)",
              }}
            >
              <i className="fa-solid fa-moon"></i> Tối
            </button>
            <button
              onClick={() => setTheme("light")}
              className="py-2.5 rounded-xl border flex justify-center gap-2 items-center text-sm transition"
              style={{
                borderColor:
                  theme === "light" ? "var(--accent)" : "var(--border2)",
                background:
                  theme === "light" ? "var(--accent-glow)" : "transparent",
                color: theme === "light" ? "var(--accent2)" : "var(--text)",
              }}
            >
              <i className="fa-solid fa-sun"></i> Sáng
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3">Màu chủ đạo</p>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setAccent(c)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{
                  background: c,
                  boxShadow:
                    accent === c
                      ? `0 0 0 3px var(--bg), 0 0 0 5px ${c}`
                      : "none",
                }}
              >
                {accent === c && (
                  <i className="fa-solid fa-check text-white text-xs"></i>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-3">Phông chữ Chrome</p>
          <div className="flex flex-col gap-2">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => setFont(f.value)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition"
                style={{
                  borderColor:
                    font === f.value ? "var(--accent)" : "var(--border2)",
                  background:
                    font === f.value ? "var(--accent-glow)" : "transparent",
                }}
              >
                <span style={{ fontFamily: f.value }}>{f.label}</span>
                {font === f.value && (
                  <i
                    className="fa-solid fa-check"
                    style={{ color: "var(--accent)" }}
                  ></i>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
