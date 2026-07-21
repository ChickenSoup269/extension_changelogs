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
  const featured = EXTENSIONS.find((e) => e.featured)!
  const latest = EXTENSIONS.slice(0, 4) // Show top 4 latest

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
    }, [EXTENSIONS, totalExtensions])

  return (
    <div className="overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03)_0%,_transparent_80%)] -z-10 pointer-events-none" />
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] bg-[var(--accent-glow)] rounded-full blur-[120px] -z-10 opacity-60 pointer-events-none" />
      

      {/* HERO SECTION */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest mb-8 uppercase border border-[var(--border2)] bg-[var(--bg2)]/50 backdrop-blur-md shadow-[0_0_15px_var(--accent-glow)]"
              style={{ color: "var(--accent-visible)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-visible)" }} />
              {t("hero.new_badge")}
            </div>

            <h1
              className="font-syne font-bold leading-[1.1] tracking-tight mb-6 text-[var(--text)] drop-shadow-sm"
              style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
            >
              {t("hero.title")}<br />
              <span className="text-[var(--muted)]">{t("hero.subtitle")}</span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-[600px] mx-auto lg:mx-0 mb-10 text-[var(--muted2)] font-medium leading-relaxed"
            >
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/extensions"
                className="cursor-target px-8 py-3.5 font-bold rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-text)" }}
              >
                {t("hero.cta_explore")}
                <i className="fas fa-arrow-right text-sm" />
              </Link>
              <Link
                href="/changelog"
                className="cursor-target px-8 py-3.5 border border-[var(--border)] text-[var(--text)] font-semibold rounded-full hover:bg-[var(--bg2)]/80 backdrop-blur-sm transition-colors duration-300"
              >
                {t("hero.cta_changelog")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full flex justify-center h-[400px] lg:h-[600px] relative hidden md:flex items-center"
          >
            <CardSwap
              cardDistance={30}
              verticalDistance={40}
              delay={4000}
              pauseOnHover={true}
              width={340}
              height={220}
            >
              {latest.map((ext) => (
                <Card key={ext.id} className="cursor-target p-6 bg-[var(--bg2)]/90 backdrop-blur-xl border border-[var(--border2)] group shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={ext.icon} alt={ext.name} className="w-14 h-14 rounded-xl group-hover:scale-105 transition-transform shadow-md" />
                    <div>
                      <h3 className="font-bold text-[var(--text)] text-lg line-clamp-1">{ext.name}</h3>
                      <p className="text-xs text-[var(--muted2)]">{ext.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] line-clamp-2 mb-6 leading-relaxed">{ext.description[locale as keyof typeof ext.description]}</p>
                  <div className="mt-auto flex items-center justify-between text-sm font-semibold text-[var(--muted)] pt-4 border-t border-[var(--border)]">
                    <span className="flex items-center gap-1.5"><i className="fas fa-star text-[var(--text)]"></i> {ext.stars}</span>
                    <span className="flex items-center gap-1.5"><i className="fas fa-download text-[var(--text)]"></i> {ext.downloads}</span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </motion.div>
        </div>

        {/* Minimal Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 bg-[var(--border)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-[0_0_40px_var(--accent-glow)] backdrop-blur-md"
        >
          {[
            { label: t("hero.stats.extensions"), value: totalExtensions },
            { label: t("hero.stats.downloads"), value: totalDownloads.toLocaleString() },
            { label: t("hero.stats.reviews"), value: `${averageRating} ★` },
            { label: t("hero.stats.categories"), value: uniqueCategories },
          ].map((stat, i) => (
            <div key={i} className="cursor-target flex flex-col items-center justify-center p-8 bg-[var(--bg)]/80 transition-all hover:bg-[var(--bg2)]/90 group">
               <div className="text-3xl lg:text-4xl font-syne font-bold text-[var(--text)] mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
               <div className="text-[10px] font-bold tracking-[0.15em] text-[var(--muted2)] uppercase group-hover:text-[var(--text)] transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED & LATEST */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 relative">
        <FeaturedBanner ext={featured} />

        <div className="flex items-end justify-between mb-12 mt-20">
          <div>
            <h2 className="font-syne font-bold text-3xl tracking-tight text-[var(--text)] flex items-center gap-3">
              <span className="w-8 h-1 bg-[var(--text)] rounded-full hidden sm:block"></span>
              {t("home.latest_title")}
            </h2>
          </div>
          <Link
            href="/extensions"
            className="cursor-target group flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            {t("home.view_all")}
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {latest.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} compact={true} />
          ))}
        </div>
        
        {/* Call to action footer */}
        <div className="mt-32 p-12 md:p-16 rounded-[2.5rem] bg-[var(--bg2)]/50 backdrop-blur-xl border border-[var(--border)] text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[var(--border2)] to-transparent"></div>
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
           
           <h3 className="text-3xl font-syne font-bold mb-6 text-[var(--text)] tracking-tight">{locale === "vi" ? "Bạn muốn theo dõi cập nhật?" : "Stay updated with new features"}</h3>
           <p className="text-base text-[var(--muted)] mb-10 max-w-lg mx-auto leading-relaxed">
             {locale === "vi" ? "Chúng tôi liên tục cập nhật và cải thiện các extension. Xem lịch sử thay đổi để không bỏ lỡ bất kỳ tính năng mới nào." : "We constantly update and improve our extensions. Check the changelog so you don't miss any new features."}
           </p>
           <Link href="/changelog" className="cursor-target inline-flex items-center gap-3 px-10 py-4 bg-[var(--text)] text-[var(--bg)] rounded-full text-sm font-bold hover:scale-105 transition-all shadow-[0_0_20px_var(--accent-glow)]">
             {t("hero.cta_changelog")}
           </Link>
        </div>
      </section>
    </div>
  )
}
