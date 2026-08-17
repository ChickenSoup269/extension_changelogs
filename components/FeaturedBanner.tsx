"use client"

import Link from "next/link"
import type { Extension } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

export default function FeaturedBanner({ ext }: { ext: Extension }) {
  const { t, locale } = useLanguage()

  const previewImg = ext.slug === "zero-startpage" 
    ? "/images/starpage/1.png" 
    : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"

  return (
    <div
      className="rounded-3xl p-0 mb-16 overflow-hidden relative group border border-[var(--border2)] bg-[var(--bg2)] shadow-2xl transition-all duration-500 hover:border-[var(--accent-border)]"
      style={{
        boxShadow: "0 20px 50px -15px rgba(0,0,0,0.5), 0 0 30px -10px var(--accent-glow)",
      }}
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />
      <div className="absolute top-0 left-1/4 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border2)] to-transparent pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center p-6 sm:p-10 md:p-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.2em] px-3 py-1.5 rounded-xl uppercase glow-pill"
            >
              <i className="fa-solid fa-crown text-[9px]"></i>
              {t("common.featured")}
            </span>
            <span className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-wider">
              {ext.category} • v{ext.version}
            </span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 text-[var(--text)]">
            {ext.name}
          </h2>

          <p
            className="text-sm sm:text-base max-w-[560px] leading-relaxed text-[var(--muted)] mb-8"
          >
            {ext.description[locale]}
          </p>
          
          <div className="flex flex-wrap items-center gap-3.5">
            {ext.homepage && (
              <a
                href={ext.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2"
                style={{ 
                  background: "var(--accent)", 
                  color: "var(--accent-text)",
                  boxShadow: "0 4px 20px var(--accent-glow)"
                }}
              >
                <i className="fa-brands fa-chrome text-base"></i>
                {t("common.install_now")}
              </a>
            )}
            <Link
              href={`/about/${ext.slug}`}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 border border-[var(--border2)] bg-[var(--bg3)] text-[var(--text)] hover:bg-[var(--bg4)] hover:border-[var(--accent-border)] flex items-center gap-2"
            >
              <i className="fa-solid fa-circle-info text-xs"></i>
              {t("common.details")}
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--bg)]/70 border border-[var(--border)] backdrop-blur-md">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-3xl bg-[var(--bg2)] p-4 border border-[var(--border2)] shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
              <img
                src={ext.icon}
                alt={ext.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div 
              className="absolute -bottom-2 -right-2 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg"
              style={{ background: "var(--accent)", color: "var(--accent-text)" }}
            >
              v{ext.version}
            </div>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4 text-center pt-4 border-t border-[var(--border)]">
             <div>
                <div className="text-lg font-bold text-[var(--text)] flex items-center justify-center gap-1">
                  <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                  {ext.stars}
                </div>
                <div className="text-[9px] font-bold text-[var(--muted2)] uppercase tracking-wider mt-0.5">
                  {ext.ratingCount} Reviews
                </div>
             </div>
             <div>
                <div className="text-lg font-bold text-[var(--text)] flex items-center justify-center gap-1">
                  <i className="fa-solid fa-download text-[var(--muted2)] text-xs"></i>
                  {ext.downloads}
                </div>
                <div className="text-[9px] font-bold text-[var(--muted2)] uppercase tracking-wider mt-0.5">
                  Downloads
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

