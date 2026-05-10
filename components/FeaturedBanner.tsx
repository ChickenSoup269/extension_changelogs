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
      className="rounded-3xl p-0 mb-16 overflow-hidden relative group border border-[var(--border)] bg-[var(--bg2)] shadow-2xl"
    >
      {/* Background Preview with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={previewImg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 scale-105 group-hover:scale-110 transition-transform duration-1000 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg2)] via-[var(--bg2)]/80 to-transparent" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8 items-center p-8 md:p-12">
        <div>
          <div
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-sm mb-6 text-white uppercase italic"
            style={{ background: "var(--accent)" }}
          >
            {t("common.featured")}
          </div>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-4 text-[var(--text)]">
            {ext.name}
          </h2>
          <p
            className="text-[16px] max-w-[550px] leading-relaxed italic opacity-80 mb-8"
            style={{ color: "var(--text)" }}
          >
            "{ext.description[locale]}"
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href={ext.homepage || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[var(--accent-glow)] flex items-center gap-2"
              style={{ background: "linear-gradient(to bottom, var(--accent) 5%, var(--accent2) 95%)" }}
            >
              <i className="fa-brands fa-chrome text-lg"></i>
              {t("common.install_now").toUpperCase()}
            </a>
            <Link
              href={`/about/${ext.slug}`}
              className="px-8 py-3 rounded-xl font-bold transition-all duration-300 border border-[var(--border2)] bg-[var(--bg3)] text-[var(--text)] hover:bg-[var(--bg4)] hover:border-[var(--accent)]"
            >
              {t("common.details").toUpperCase()}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="relative">
             <div className="w-32 h-32 rounded-[2rem] bg-[var(--bg3)] p-5 border border-[var(--border2)] shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img
                src={ext.icon}
                alt={ext.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-xl">
              v{ext.version}
            </div>
          </div>
          
          <div className="mt-8 flex gap-6 text-center">
             <div>
                <div className="text-xl font-bold text-[var(--text)]">★ {ext.stars} ({ext.ratingCount})</div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{t("about.stats.rating").toUpperCase()}</div>
             </div>
             <div className="w-px h-10 bg-[var(--border)]" />
             <div>
                <div className="text-xl font-bold text-[var(--text)]">{ext.downloads}</div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest">{t("hero.stats.downloads").toUpperCase()}</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
