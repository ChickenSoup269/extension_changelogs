"use client"

import { useRef } from "react"
import type { Extension } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

const STATUS_CONFIG = {
  stable: {
    key: "common.stable",
    bg: "rgba(46,204,113,0.1)",
    border: "rgba(46,204,113,0.2)",
    color: "#2ecc71",
    prefix: "●",
  },
  beta: {
    key: "common.beta",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    color: "#f59e0b",
    prefix: "◐",
  },
  new: {
    key: "common.new",
    bg: "rgba(46,204,113,0.15)",
    border: "rgba(46,204,113,0.3)",
    color: "#2ecc71",
    prefix: "✦",
  },
}

interface Props {
  ext: Extension
  onClick?: (ext: Extension) => void
}

export default function ExtensionCard({ ext, onClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()
  const status = STATUS_CONFIG[ext.status]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    card.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => onClick?.(ext)}
      className="relative overflow-hidden rounded-xl p-[22px] cursor-pointer group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--accent-glow)]"
      style={{
        background: ext.featured
          ? "linear-gradient(135deg, var(--accent-glow), var(--bg2))"
          : "var(--bg2)",
        border: `1px solid ${ext.featured ? "var(--accent)" : "var(--border)"}`,
      }}
    >
      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), var(--accent-glow), transparent 40%)",
        }}
      />

      {/* Hover border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          border: "1px solid var(--accent)",
          boxShadow: "inset 0 0 20px var(--accent-glow)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "var(--bg4)", overflow: "hidden" }}
          >
            {ext.icon.startsWith("/") ? (
              <img
                src={ext.icon}
                alt={ext.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <i className={ext.icon} style={{ color: "var(--accent)" }}></i>
            )}
          </div>
          <div>
            <div className="font-syne font-semibold text-[15px] mb-0.5">
              {ext.name}
            </div>
            <div
              className="text-[11px] font-mono"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-dm-mono)",
              }}
            >
              v{ext.version}
            </div>
          </div>
        </div>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{
            background: status.bg,
            border: `1px solid ${status.border}`,
            color: status.color,
          }}
        >
          {status.prefix} {t(status.key)}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-[13px] leading-relaxed mb-4 relative"
        style={{ color: "var(--muted)" }}
      >
        {ext.description[locale]}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative">
        {ext.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-1 rounded-full"
            style={{
              background: "var(--bg4)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3.5 relative"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex gap-3.5">
          <span
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--muted)" }}
          >
            <span style={{ opacity: 0.5 }}>⬇</span> {ext.downloads}
          </span>
          <span
            className="text-xs flex items-center gap-1"
            style={{ color: "#f59e0b" }}
          >
            ★ {ext.stars}
          </span>
        </div>
        <a
          href={ext.homepage || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 hover:text-white inline-flex items-center gap-1.5"
          style={{
            background: "var(--bg4)",
            border: "1px solid var(--border2)",
            color: "var(--text)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = "var(--accent)"
            el.style.borderColor = "var(--accent)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = "var(--bg4)"
            el.style.borderColor = "var(--border2)"
          }}
        >
          <i className="fa-brands fa-chrome"></i> {t("common.install")}
        </a>
      </div>
    </div>
  )
}
