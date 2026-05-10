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

  // Use standard preview images if available, else fallback
  const previewImg = ext.slug === "zero-startpage" 
    ? "/images/starpage/1.png" 
    : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"

  return (
    <div
      ref={cardRef}
      onClick={() => onClick?.(ext)}
      className={`relative flex flex-col md:flex-row items-stretch gap-4 bg-[var(--bg2)] border border-[var(--border)] rounded-xl overflow-hidden group transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--bg3)] hover:shadow-xl ${compact ? 'p-3' : 'p-4'}`}
    >
      {/* PREVIEW IMAGE - STEAM STYLE */}
      <div className={`w-full ${compact ? 'md:w-[180px]' : 'md:w-[240px]'} aspect-video bg-black overflow-hidden flex-shrink-0 shadow-lg relative`}>
        <img 
          src={previewImg} 
          alt={ext.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-1.5 left-1.5">
           <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase italic"
            style={{
              background: status.bg,
              border: `1px solid ${status.border}`,
              color: status.color,
              backdropFilter: "blur(4px)"
            }}
          >
            {t(status.key)}
          </span>
        </div>
      </div>

      {/* CONTENT INFO */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex items-center gap-2.5">
             <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-[var(--bg4)] p-1.5 border border-[var(--border2)] flex-shrink-0`}>
                <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
             </div>
             <div>
                <h3 className={`${compact ? 'text-[15px]' : 'text-lg'} font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight`}>
                  {ext.name}
                </h3>
                <div className="text-[9px] text-[var(--muted)] uppercase tracking-tighter">
                  v{ext.version} • {ext.category}
                </div>
             </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <span className="text-[9px] px-1.5 py-0.5 bg-[#5c7e10] text-[#beee11] font-black rounded-sm uppercase italic">FREE</span>
             {!compact && (
               <div className="flex items-center gap-2 text-[10px] opacity-60">
                  <span>★ {ext.stars} ({ext.ratingCount})</span>
                  <span>⬇ {ext.downloads}</span>
               </div>
             )}
          </div>
        </div>

        <p className={`${compact ? 'text-[12px]' : 'text-[13px]'} text-[var(--muted)] line-clamp-2 mb-3 leading-relaxed italic`}>
          "{ext.description[locale]}"
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2 mt-auto">
          {ext.tags.slice(0, compact ? 2 : undefined).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-sm bg-[var(--bg4)] border border-[var(--border)] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* SIDEBAR ACTIONS */}
      <div className={`flex md:flex-col gap-1.5 justify-center md:border-l border-[var(--border)] ${compact ? 'md:pl-4 md:min-w-[110px]' : 'md:pl-6 md:min-w-[140px]'}`}>
        <Link
          href={`/about/${ext.slug}`}
          onClick={(e) => e.stopPropagation()}
          className={`flex-1 md:flex-none font-bold rounded-lg transition-all text-center tracking-wider bg-[var(--bg3)] border border-[var(--border2)] text-[var(--text)] hover:bg-[var(--bg4)] hover:border-[var(--accent)] ${compact ? 'text-[9px] px-2 py-2' : 'text-[11px] px-4 py-2.5'}`}
        >
          {t("common.details").toUpperCase()}
        </Link>
        <a
          href={ext.homepage || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex-1 md:flex-none font-bold rounded-lg transition-all text-center tracking-wider text-white shadow-lg shadow-[var(--accent-glow)] flex items-center justify-center gap-1.5 ${compact ? 'text-[9px] px-2 py-2' : 'text-[11px] px-4 py-2.5'}`}
          style={{
            background: "linear-gradient(to bottom, var(--accent) 5%, var(--accent2) 95%)",
          }}
        >
          <i className="fa-brands fa-chrome"></i>
          {t("common.install").toUpperCase()}
        </a>
      </div>
    </div>
  )
}
