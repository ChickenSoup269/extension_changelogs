"use client"

import { useRef } from "react"
import Link from "next/link"
import type { Extension } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

const STATUS_CONFIG = {
  stable: {
    key: "common.stable",
    bg: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.35)",
    color: "#10b981",
    icon: "fa-circle-check",
  },
  beta: {
    key: "common.beta",
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.35)",
    color: "#f59e0b",
    icon: "fa-flask",
  },
  new: {
    key: "common.new",
    bg: "rgba(99,102,241,0.18)",
    border: "rgba(99,102,241,0.4)",
    color: "#818cf8",
    icon: "fa-sparkles",
  },
}

interface Props {
  ext: Extension
  onClick?: (ext: Extension) => void
  compact?: boolean
}

export default function ExtensionCard({ ext, onClick, compact = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()
  const status = STATUS_CONFIG[ext.status] || STATUS_CONFIG.stable
  
  const previewImg = ext.slug === "zero-startpage" 
    ? "/images/starpage/1.png" 
    : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"

  return (
    <div
      ref={cardRef}
      onClick={() => onClick?.(ext)}
      className="cursor-target flex flex-col bg-[var(--bg2)] border border-[var(--border)] rounded-3xl relative overflow-hidden group transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 shadow-sm hover:shadow-xl h-full"
      style={{
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Background Ambient Glow on hover */}
      <div 
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      {/* TOP MEDIA SECTION */}
      <div className="w-full aspect-[16/9] border-b border-[var(--border)] overflow-hidden bg-[var(--bg)] relative">
        <img 
          src={previewImg} 
          alt={`${ext.name} Preview`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg2)]/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Status Badge overlaid */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider backdrop-blur-md shadow-sm"
            style={{
              background: status.bg,
              border: `1px solid ${status.border}`,
              color: status.color,
            }}
          >
            <i className={`fa-solid ${status.icon} text-[9px]`}></i>
            {t(status.key)}
          </span>
        </div>
      </div>

      {/* BOTTOM INFO PANEL */}
      <div className="p-5 md:p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
          </div>
          <div className="pt-0.5 min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-syne font-bold text-[var(--text)] mb-1 truncate">
              {ext.name}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--muted2)] uppercase tracking-wider">
              <span>v{ext.version}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border2)]"></span>
              <span className="truncate">{ext.category}</span>
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm leading-relaxed text-[var(--muted)] mb-5 line-clamp-2">
          {ext.description[locale]}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs font-bold text-[var(--muted)]">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-star text-amber-400 text-[11px]"></i> {ext.stars}
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-download text-[var(--muted2)] text-[11px]"></i> {ext.downloads}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/about/${ext.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-2 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-xs font-bold rounded-xl hover:bg-[var(--bg3)] hover:border-[var(--border2)] transition-all"
            >
              {t("common.details")}
            </Link>
            {ext.homepage && (
              <a
                href={ext.homepage}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Chrome Web Store"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 shadow-sm"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-text)",
                  boxShadow: "0 2px 10px var(--accent-glow)"
                }}
              >
                <i className="fa-brands fa-chrome text-sm"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

