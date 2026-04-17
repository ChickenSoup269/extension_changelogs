"use client"

import Link from "next/link"
import ExtensionCard from "@/components/ExtensionCard"
import FeaturedBanner from "@/components/FeaturedBanner"
import { EXTENSIONS } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"
import statsData from "@/lib/webstore-stats.json"
import { useMemo } from "react"
import { motion } from "framer-motion"

export default function HomePage() {
  const { t, locale } = useLanguage()
  const featured = EXTENSIONS.find((e) => e.featured)!
  const latest = EXTENSIONS.slice(0, 4) // Show top 4 latest

  const totalExtensions = EXTENSIONS.length

  const { totalDownloads, averageRating, uniqueCategories } =
    useMemo(() => {
      let downloads = 0
      let stars = 0
      const categories = new Set()
      EXTENSIONS.forEach((ext) => {
        const liveStats =
          statsData.extensions[
            ext.webstoreId as keyof typeof statsData.extensions
          ]
        downloads += liveStats
          ? parseInt(
              liveStats.users.replace(/,/g, "").replace(/\+/g, "") || "0",
            )
          : parseInt(ext.downloads.replace(/,/g, "") || "0")
        stars += liveStats
          ? parseFloat(liveStats.rating || "0")
          : parseFloat(ext.stars || "0")
        if (ext.category) categories.add(ext.category)
      })
      const avg =
        totalExtensions > 0 ? (stars / totalExtensions).toFixed(1) : "0.0"
      return {
        totalDownloads: downloads,
        averageRating: avg,
        uniqueCategories: categories.size,
      }
    }, [EXTENSIONS, statsData, totalExtensions])

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-32 pb-24 text-center">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-glow)] rounded-full blur-[120px] -z-10 opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black tracking-widest mb-8 text-[var(--accent)] uppercase border border-[var(--accent)]/20 bg-[var(--accent-glow)]"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            {t("hero.new_badge")}
          </div>

          <h1
            className="font-syne font-extrabold leading-[1.05] tracking-tighter mb-6 text-[var(--text)]"
            style={{ fontSize: "clamp(40px, 8vw, 84px)" }}
          >
            {t("hero.title")}<br />
            <span className="gradient-text">{t("hero.subtitle")}</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-[650px] mx-auto mb-10 text-[var(--muted)] leading-relaxed"
          >
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/extensions"
              className="px-10 py-4 bg-[var(--accent)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--accent-glow)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {t("hero.cta_explore").toUpperCase()}
              <i className="fas fa-rocket text-sm" />
            </Link>
            <Link
              href="/changelog"
              className="px-10 py-4 border border-[var(--border2)] text-[var(--text)] font-bold rounded-2xl hover:bg-[var(--bg3)] transition-all duration-300"
            >
              {t("hero.cta_changelog").toUpperCase()}
            </Link>
          </div>
        </motion.div>

        {/* Stats Dashboard Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mt-20 p-8 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-xl"
        >
          {[
            { label: t("hero.stats.extensions"), value: totalExtensions, icon: "fa-cubes" },
            { label: t("hero.stats.downloads"), value: totalDownloads.toLocaleString(), icon: "fa-download" },
            { label: t("hero.stats.reviews"), value: `${averageRating} ★`, icon: "fa-star", color: "var(--amber)" },
            { label: "CATEGORIES", value: uniqueCategories, icon: "fa-layer-group" },
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col items-center px-4 ${i !== 3 ? 'lg:border-r border-[var(--border)]' : ''} ${i % 2 === 0 && i !== 2 ? 'sm:border-r lg:border-r-0' : ''}`}>
               <i className={`fas ${stat.icon} mb-3 opacity-20 text-2xl`} style={{ color: stat.color }} />
               <div className="text-3xl font-syne font-black text-[var(--text)] mb-1">{stat.value}</div>
               <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--muted)] uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <hr className="border-[var(--border)]" />

      {/* FEATURED & LATEST */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <FeaturedBanner ext={featured} />

        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[var(--accent)] font-bold text-xs tracking-widest uppercase mb-2">Discovery</div>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight text-[var(--text)]">
              {t("home.latest_title")}
            </h2>
          </div>
          <Link
            href="/extensions"
            className="group flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-all"
          >
            {t("home.view_all")}
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {latest.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} compact={true} />
          ))}
        </div>
        
        {/* Call to action footer */}
        <div className="mt-16 p-10 rounded-[2rem] bg-gradient-to-br from-[var(--bg2)] to-[var(--bg3)] border border-[var(--border)] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
           <h3 className="text-2xl font-syne font-bold mb-3">{locale === "vi" ? "Bạn muốn theo dõi cập nhật?" : "Stay updated with new features"}</h3>
           <p className="text-sm text-[var(--muted)] mb-6 max-w-xl mx-auto">
             {locale === "vi" ? "Chúng tôi liên tục cập nhật và cải thiện các extension. Xem lịch sử thay đổi để không bỏ lỡ bất kỳ tính năng mới nào." : "We constantly update and improve our extensions. Check the changelog so you don't miss any new features."}
           </p>
           <Link href="/changelog" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--bg4)] border border-[var(--border2)] rounded-xl text-sm font-bold hover:border-[var(--accent)] transition-all">
             {t("hero.cta_changelog").toUpperCase()}
             <i className="fas fa-chevron-right text-[10px]" />
           </Link>
        </div>
      </section>
    </div>
  )
}
