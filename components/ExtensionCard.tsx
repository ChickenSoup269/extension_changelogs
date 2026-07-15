"use client"

import { useRef } from "react"
import Link from "next/link"
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
  compact?: boolean
}

export default function ExtensionCard({ ext, onClick, compact = false }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useLanguage()
  const status = STATUS_CONFIG[ext.status]
  
  const previewImg = ext.slug === "zero-startpage" 
    ? "/images/starpage/1.png" 
    : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"

  return (
    <div
      ref={cardRef}
      onClick={() => onClick?.(ext)}
      className="cursor-target flex flex-col bg-[var(--bg2)] border border-[var(--border)] rounded-[2rem] relative overflow-hidden group transition-all duration-300 hover:border-[var(--text)] hover:shadow-[0_15px_40px_-10px_var(--accent-glow)] h-full"
    >
      {/* Background Glow on hover */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      {/* TOP MEDIA SECTION */}
      <div className="w-full aspect-video border-b border-[var(--border)] overflow-hidden bg-[var(--bg)] relative">
        <img 
          src={previewImg} 
          alt={`${ext.name} Preview`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Status Badge overlaid */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className="text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider backdrop-blur-md shadow-sm"
            style={{
              background: status.bg,
              border: `1px solid ${status.border}`,
              color: status.color,
            }}
          >
            {t(status.key)}
          </span>
        </div>
      </div>

      {/* BOTTOM INFO PANEL */}
      <div className="p-5 md:p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
          </div>
          <div className="pt-0.5">
            <h3 className="text-lg font-syne font-bold text-[var(--text)] mb-1 line-clamp-1">
              {ext.name}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--muted2)] uppercase tracking-widest">
              <span>v{ext.version}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border2)]"></span>
              <span>{ext.category}</span>
            </div>
          </div>
        </div>

        <p className="text-[15px] leading-[1.8] text-[var(--text)] opacity-80 mb-6 line-clamp-3">
          {ext.description[locale]}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-[var(--border)]">
          <div className="flex items-center gap-4 text-xs font-bold text-[var(--muted2)]">
            <span className="flex items-center gap-1.5">
              <i className="fas fa-star text-[var(--text)]"></i> {ext.stars}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fas fa-download text-[var(--text)]"></i> {ext.downloads}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/about/${ext.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2.5 bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-xs font-bold rounded-xl hover:bg-[var(--bg3)] transition-colors"
            >
              {t("common.details").toUpperCase()}
            </Link>
            <a
              href={ext.homepage || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-[var(--text)] text-[var(--bg)] rounded-xl flex items-center justify-center hover:-translate-y-0.5 transition-transform shadow-[0_5px_15px_var(--accent-glow)]"
            >
              <i className="fa-brands fa-chrome"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
