"use client"

import Link from "next/link"
import ExtensionCard from "@/components/ExtensionCard"
import FeaturedBanner from "@/components/FeaturedBanner"
import { EXTENSIONS } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"
import statsData from "@/lib/webstore-stats.json"
import { useMemo } from "react"

export default function HomePage() {
  const { t } = useLanguage()
  const featured = EXTENSIONS.find((e) => e.featured)!
  const latest = EXTENSIONS.slice(0, 6)

  const totalExtensions = EXTENSIONS.length

  // Tối ưu hóa tính toán thống kê bằng useMemo
  const { totalDownloads, totalStars, averageRating, uniqueCategories } =
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
        totalStars: stars,
        averageRating: avg,
        uniqueCategories: categories.size,
      }
    }, [EXTENSIONS, statsData, totalExtensions])

  return (
    <>
      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-10 pt-28 pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider mb-7 animate-fade-up"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            color: "var(--muted)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-dot inline-block"
            style={{ background: "#3ecf8e" }}
          />
          {t("hero.new_badge")}
        </div>

        <h1
          className="font-syne font-extrabold leading-[1.05] tracking-tight mb-5 animate-fade-up delay-100"
          style={{ fontSize: "clamp(38px, 6vw, 72px)" }}
        >
          {t("hero.title")}{" "}
          <em className="not-italic gradient-text">Extension</em>
          <br />
          {t("hero.subtitle")}
        </h1>

        <p
          className="text-[17px] max-w-[520px] mx-auto mb-9 animate-fade-up delay-200"
          style={{ color: "var(--muted)", lineHeight: "1.75" }}
        >
          {t("hero.description")}
        </p>

        <div className="flex items-center justify-center gap-3 animate-fade-up delay-300">
          <Link
            href="/extensions"
            className="text-[15px] font-medium px-7 py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: "var(--accent)" }}
          >
            {t("hero.cta_explore")}
          </Link>
          <Link
            href="/changelog"
            className="text-[15px] font-medium px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "transparent",
              border: "1px solid var(--border2)",
              color: "var(--text)",
            }}
          >
            {t("hero.cta_changelog")}
          </Link>
        </div>

        <div
          className="flex justify-center gap-12 mt-14 pt-10 animate-fade-up delay-400"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Tổng số extension */}
          <div className="text-center">
            <div className="font-syne font-bold text-3xl">
              {totalExtensions}
            </div>
            <div
              className="text-xs tracking-widest mt-1 uppercase"
              style={{ color: "var(--muted)" }}
            >
              {t("hero.stats.extensions")}
            </div>
          </div>
          {/* Tổng số lượt tải */}
          <div className="text-center">
            <div className="font-syne font-bold text-3xl">
              {totalDownloads.toLocaleString()}
            </div>
            <div
              className="text-xs tracking-widest mt-1 uppercase"
              style={{ color: "var(--muted)" }}
            >
              {t("hero.stats.downloads")}
            </div>
          </div>
          {/* Đánh giá trung bình */}
          <div className="text-center">
            <div className="font-syne font-bold text-3xl flex items-center justify-center gap-1">
              <span>{averageRating}</span>
              <span style={{ color: "#FFD700", fontSize: 22, lineHeight: 1 }}>
                ★
              </span>
            </div>
            <div
              className="text-xs tracking-widest mt-1 uppercase"
              style={{ color: "var(--muted)" }}
            >
              {t("hero.stats.reviews")}
            </div>
          </div>
          {/* Số lượng category (hoặc dev nếu có) */}
          <div className="text-center">
            <div className="font-syne font-bold text-3xl">
              {uniqueCategories}
            </div>
            <div
              className="text-xs tracking-widest mt-1 uppercase"
              style={{ color: "var(--muted)" }}
            >
              {t("hero.stats.categories")}
            </div>
          </div>
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      <section className="max-w-[1200px] mx-auto px-10 py-16">
        <FeaturedBanner ext={featured} />

        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-syne font-bold text-xl tracking-tight">
              {t("home.latest_title")}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {t("home.latest_subtitle")}
            </p>
          </div>
          <Link
            href="/extensions"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--accent2)" }}
          >
            {t("home.view_all")}
          </Link>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {latest.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} />
          ))}
        </div>
      </section>
    </>
  )
}
