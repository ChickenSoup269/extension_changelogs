"use client"

import Link from "next/link"
import ExtensionCard from "@/components/ExtensionCard"
import FeaturedBanner from "@/components/FeaturedBanner"
import { EXTENSIONS } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"
import { useMemo } from "react"
import { motion } from "framer-motion"
import CardSwap, { Card } from "@/components/CardSwap"

export default function HomePage() {
  const { t, locale } = useLanguage()
  const featured = EXTENSIONS.find((e) => e.featured) || EXTENSIONS[0]
  const latest = EXTENSIONS.slice(0, 4)

  const totalExtensions = EXTENSIONS.length

  const { totalDownloads, averageRating, totalRatingCount, uniqueCategories } =
    useMemo(() => {
      let downloads = 0
      let stars = 0
      let ratingCount = 0
      const categories = new Set()
      EXTENSIONS.forEach((ext) => {
        downloads += parseInt(ext.downloads || "0")
        stars += parseFloat(ext.stars || "0")
        ratingCount += parseInt(ext.ratingCount || "0")

        if (ext.category) categories.add(ext.category)
      })
      const avg =
        totalExtensions > 0 ? (stars / totalExtensions).toFixed(1) : "0.0"
      return {
        totalDownloads: downloads,
        averageRating: avg,
        totalRatingCount: ratingCount,
        uniqueCategories: categories.size,
      }
    }, [totalExtensions])

  return (
    <div className="overflow-hidden relative min-h-screen">
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[140px] -z-10 opacity-30 pointer-events-none transition-colors duration-500"
        style={{ background: "var(--accent)" }}
      />
      <div 
        className="absolute top-[30%] -right-40 w-[500px] h-[500px] rounded-full blur-[160px] -z-10 opacity-15 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      {/* HERO SECTION */}
      <section className="relative max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 pt-20 md:pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[11px] font-bold tracking-wider mb-6 glow-pill backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent-visible)" }} />
              {t("hero.new_badge")}
            </div>

            <h1
              className="font-syne font-extrabold leading-[1.08] tracking-tight mb-6 text-[var(--text)]"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
            >
              {t("hero.title")}<br />
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--text) 30%, var(--muted) 100%)"
                }}
              >
                {t("hero.subtitle")}
              </span>
            </h1>

            <p
              className="text-base sm:text-lg max-w-[580px] mx-auto lg:mx-0 mb-8 text-[var(--muted)] font-normal leading-relaxed"
            >
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/extensions"
                className="cursor-target px-7 py-3.5 font-bold text-sm rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-lg"
                style={{ 
                  backgroundColor: "var(--accent)", 
                  color: "var(--accent-text)",
                  boxShadow: "0 8px 25px var(--accent-glow)"
                }}
              >
                <i className="fa-solid fa-compass"></i>
                {t("hero.cta_explore")}
              </Link>
              <Link
                href="/changelog"
                className="cursor-target px-7 py-3.5 border border-[var(--border2)] text-[var(--text)] font-semibold text-sm rounded-2xl bg-[var(--bg2)]/60 hover:bg-[var(--bg3)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--border2)] flex items-center gap-2"
              >
                <i className="fa-solid fa-clock-rotate-left text-xs text-[var(--muted)]"></i>
                {t("hero.cta_changelog")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full flex justify-center h-[380px] lg:h-[480px] relative hidden md:flex items-center"
          >
            <CardSwap
              cardDistance={28}
              verticalDistance={36}
              delay={4500}
              pauseOnHover={true}
              width={350}
              height={230}
            >
              {latest.map((ext) => (
                <Card 
                  key={ext.id} 
                  className="cursor-target p-6 bg-[var(--bg2)]/95 backdrop-blur-2xl border border-[var(--border2)] group shadow-2xl rounded-3xl"
                  style={{
                    boxShadow: "0 20px 45px -10px rgba(0,0,0,0.5), 0 0 20px -5px var(--accent-glow)"
                  }}
                >
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-2 shadow-inner group-hover:scale-105 transition-transform flex-shrink-0">
                      <img src={ext.icon} alt={ext.name} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-syne font-bold text-[var(--text)] text-base truncate">{ext.name}</h3>
                      <p className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-wider">{ext.category} • v{ext.version}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 mb-5 leading-relaxed">{ext.description[locale]}</p>
                  <div className="mt-auto flex items-center justify-between text-xs font-bold text-[var(--muted)] pt-3.5 border-t border-[var(--border)]">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-star text-amber-400 text-xs"></i> 
                      {ext.stars}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-download text-[var(--muted2)] text-xs"></i> 
                      {ext.downloads}
                    </span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </motion.div>
        </div>

        {/* Bento Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-16 sm:mt-24"
        >
          {[
            { label: t("hero.stats.extensions"), value: totalExtensions, icon: "fa-cubes" },
            { label: t("hero.stats.downloads"), value: totalDownloads.toLocaleString(), icon: "fa-download" },
            { label: t("hero.stats.reviews"), value: `${averageRating} ★`, icon: "fa-star" },
            { label: t("hero.stats.categories"), value: uniqueCategories, icon: "fa-layer-group" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="cursor-target flex flex-col items-center justify-center p-6 rounded-3xl bg-[var(--bg2)]/70 border border-[var(--border)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 group shadow-sm"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)"
              }}
            >
               <div className="w-10 h-10 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-3 text-xs text-[var(--muted2)] group-hover:text-[var(--accent-visible)] transition-colors">
                 <i className={`fa-solid ${stat.icon}`}></i>
               </div>
               <div className="text-2xl sm:text-3xl font-syne font-extrabold text-[var(--text)] mb-1 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
               <div className="text-[10px] font-bold tracking-[0.15em] text-[var(--muted2)] uppercase group-hover:text-[var(--muted)] transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED & LATEST */}
      <section className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 py-12 relative">
        <FeaturedBanner ext={featured} />

        <div className="flex items-end justify-between mb-8 mt-16 border-b border-[var(--border)] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted2)] mb-1 block">Discover</span>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text)]">
              {t("home.latest_title")}
            </h2>
          </div>
          <Link
            href="/extensions"
            className="cursor-target group flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            {t("home.view_all")}
            <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {latest.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} compact={true} />
          ))}
        </div>
        
        {/* Call to action footer banner */}
        <div 
          className="mt-24 p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-[var(--bg2)]/60 backdrop-blur-2xl border border-[var(--border2)] text-center relative overflow-hidden shadow-2xl"
          style={{
            boxShadow: "0 25px 60px -20px rgba(0,0,0,0.5), 0 0 30px -10px var(--accent-glow)"
          }}
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-border)] to-transparent pointer-events-none"></div>
           
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 glow-pill">
             <i className="fa-solid fa-bell text-[9px]"></i>
             Changelog Hub
           </div>

           <h3 className="text-2xl sm:text-3xl font-syne font-bold mb-4 text-[var(--text)] tracking-tight">
             {locale === "vi" ? "Bạn muốn theo dõi cập nhật mới nhất?" : "Stay updated with latest releases"}
           </h3>
           <p className="text-sm sm:text-base text-[var(--muted)] mb-8 max-w-lg mx-auto leading-relaxed">
             {locale === "vi" ? "Chúng tôi liên tục cập nhật và cải thiện các extension. Xem lịch sử thay đổi để không bỏ lỡ bất kỳ tính năng mới nào." : "We constantly update and improve our extensions. Check the changelog so you don't miss any new features."}
           </p>
           <Link 
             href="/changelog" 
             className="cursor-target inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold hover:scale-105 transition-all shadow-lg"
             style={{
               background: "var(--accent)",
               color: "var(--accent-text)",
               boxShadow: "0 6px 20px var(--accent-glow)"
             }}
           >
             <i className="fa-solid fa-list-check"></i>
             {t("hero.cta_changelog")}
           </Link>
        </div>
      </section>
    </div>
  )
}

