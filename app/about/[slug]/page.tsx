"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"
import { EXTENSIONS, type Extension } from "@/lib/data"
import ImageSlider from "@/components/ImageSlider"
import statsData from "@/lib/webstore-stats.json"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DynamicAboutPage() {
  const { slug } = useParams()
  const { t, locale } = useLanguage()
  const [activeMedia, setActiveMedia] = useState<"screenshots" | "video">(
    "screenshots",
  )
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const ext = EXTENSIONS.find((e) => e.slug === slug) || EXTENSIONS[0]
  const otherExtensions = EXTENSIONS.filter((e) => e.slug !== slug)

  const stats = statsData.extensions[
    ext.webstoreId as keyof typeof statsData.extensions
  ] || { users: "0", rating: "0", ratingCount: "0" }

  const formattedDate = new Date(statsData.lastUpdated).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  )

  const screenshots =
    ext.slug === "zero-startpage"
      ? [
          "/images/starpage/1.png",
          "/images/starpage/2.png",
          "/images/starpage/3.png",
          "/images/starpage/4.png",
          "/images/starpage/5.png",
          "/images/starpage/6.png",
          "/images/starpage/7.png",
          "/images/starpage/8.png",
          "/images/starpage/9.png",
        ]
      : [
          "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true",
          "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/2.png?raw=true",
          "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/3.png?raw=true",
        ]

  const videoId = ext.slug === "zero-startpage" ? "dQw4w9WgXcQ" : "dQw4w9WgXcQ"

  // Mock comments data with famous people - High reliability URLs
  const mockComments = [
    {
      id: 1,
      user: "Sơn Tùng M-TP",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6t5FdJANrWj65CYTMOhwrNnb1dGz5-obsHlbbE_nJqwNwzcCGt8oF6_C4qkFItNF-1gQmbDM-JBTXw47z75CWJpyyYBf5tu77RlARKg&s=10",
      date: "16 Apr, 2026",
      text:
        locale === "vi"
          ? "Giao diện đỉnh cao, rất hợp với phong cách của mình. Keep it up!"
          : "Top-tier UI, matches my style perfectly. Keep it up!",
    },
    {
      id: 2,
      user: "MrBeast",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvn_oA8ZEA9wRAeGfpiJOaoJl4uqX22u8RmTezQGWmDlXjyKW2gPh4QaOOgvlroFCRJz8f_ebKEvOGYUacUu_0wEaGLjJCCyj-D50x1TJZjQ&s=10",
      date: "14 Apr, 2026",
      text: "I just subscribed! This extension is actually insane, and it's FREE??",
    },
    {
      id: 3,
      user: "Đen Vâu",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpfXlO7GkIy2tAX2K3K-wmm7jhhuyzStFMXtPDdC7Vn7S2asw5uc9IX0Bsff0p2PuAjOy0nAIm6vXG6jchJkgWHC-3Z1nqTcUiobQaw&s=10",
      date: "12 Apr, 2026",
      text:
        locale === "vi"
          ? "Lướt web mà như đang đi trốn, nhẹ nhàng và bình yên."
          : "Browsing the web feels like hiding away, gentle and peaceful.",
    },
    {
      id: 4,
      user: "Marques Brownlee",
      avatar:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQADAMZRRFiuaLbNxC7iWZTtEY6tz1Zu0WZ3fvZAkV0hmVmrrvo",
      date: "10 Apr, 2026",
      text: "I've been using this for a week now. The performance is rock solid. Highly recommended.",
    },
    {
      id: 5,
      user: "HIEUTHUHAI",
      avatar:
        "https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2025/4/5/338f32e7fc3f4c0cab167159a31f48fb",
      date: "08 Apr, 2026",
      text:
        locale === "vi"
          ? "Extension này quá là 'Ngủ một mình' cũng thấy vui."
          : "This extension is so cool, makes me happy even when I'm 'Sleeping alone'.",
    },
    {
      id: 6,
      user: "PewDiePie",
      avatar:
        "https://variety.com/wp-content/uploads/2019/12/pewdiepie.png?w=1000&h=667&crop=1",
      date: "05 Apr, 2026",
      text: "Floor Gang approved. 10/10 big PP extension.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6">
        {/* BREADCRUMB */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs uppercase tracking-wider mb-6 opacity-60">
          <Link
            href="/about"
            className="hover:text-[var(--accent)] transition-colors"
          >
            About
          </Link>
          <span>&gt;</span>
          <Link
            href="/extensions"
            className="hover:text-[var(--accent)] transition-colors"
          >
            {locale === "vi" ? "Tất cả Extension" : "All Extensions"}
          </Link>
          <span>&gt;</span>
          <span className="text-[var(--text)] font-semibold truncate max-w-[150px] md:max-w-none">{ext.name}</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-6 tracking-wide font-syne text-[var(--text)]">
          {ext.name}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={ext.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* HERO SECTION WITH BLURRED BACKGROUND */}
            <div className="relative mb-8 group/hero">
              {/* Blurred Background Layer */}
              <div className="absolute -inset-10 overflow-hidden -z-10 opacity-20 blur-3xl saturate-150 transition-all duration-1000 group-hover/hero:opacity-30">
                <img 
                  src={screenshots[0]} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 bg-[#1b2838]/80 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden rounded-sm"
              >
                {/* LEFT: MEDIA SECTION */}
                <div className="flex flex-col gap-0 overflow-hidden w-full border-r border-white/5">
                  <div className="relative aspect-video bg-black shadow-inner overflow-hidden w-full">
                    {activeMedia === "screenshots" ? (
                      <ImageSlider images={screenshots} />
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    )}
                  </div>

                  {/* MEDIA TABS */}
                  <div className="flex gap-1 p-1 bg-black/40 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveMedia("screenshots")}
                      className={`px-4 py-1.5 text-[10px] md:text-[11px] font-bold uppercase transition-all whitespace-nowrap rounded-sm ${
                        activeMedia === "screenshots"
                          ? "bg-[#66c0f4] text-white"
                          : "text-[#66c0f4] hover:bg-white/5"
                      }`}
                    >
                      {locale === "vi" ? "Ảnh chụp" : "Screenshots"}
                    </button>
                    <button
                      onClick={() => setActiveMedia("video")}
                      className={`px-4 py-1.5 text-[10px] md:text-[11px] font-bold uppercase transition-all whitespace-nowrap rounded-sm ${
                        activeMedia === "video"
                          ? "bg-[#66c0f4] text-white"
                          : "text-[#66c0f4] hover:bg-white/5"
                      }`}
                    >
                      {locale === "vi" ? "Video/Trailer" : "Video/Trailer"}
                    </button>
                  </div>
                </div>

                {/* RIGHT: INFO PANEL */}
                <div className="flex flex-col p-4 bg-[#1b2838] gap-4 w-full">
                  <div className="aspect-video lg:w-full lg:h-[160px] overflow-hidden bg-black/40 border border-white/10 rounded-sm hidden lg:block">
                    <img
                      src={screenshots[0]}
                      alt="Header"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <p className="text-[13px] leading-relaxed text-[#c6d4df] line-clamp-4 md:line-clamp-5 italic">
                      "{ext.description[locale]}"
                    </p>

                    <div className="space-y-1.5">
                      <div className="grid grid-cols-[110px_1fr] text-[11px] py-1">
                        <span className="text-[#556772] uppercase font-semibold">
                          {t("about.recent_reviews")}:
                        </span>
                        <span className="text-[#66c0f4] font-bold text-right lg:text-left uppercase">
                          {stats.rating >= "4.5"
                            ? locale === "vi"
                              ? "Rất tích cực"
                              : "Very Positive"
                            : locale === "vi"
                              ? "Tích cực"
                              : "Positive"}
                        </span>
                      </div>

                      <div className="grid grid-cols-[110px_1fr] text-[11px] py-1">
                        <span className="text-[#556772] uppercase font-semibold">
                          {t("about.stats.rating")}:
                        </span>
                        <span className="text-[#8f98a0] text-right lg:text-left">
                          <span className="text-white font-bold">{stats.rating} ★</span> ({stats.ratingCount} {t("about.all_reviews").toLowerCase()})
                        </span>
                      </div>

                      <div className="grid grid-cols-[110px_1fr] text-[11px] py-1">
                        <span className="text-[#556772] uppercase font-semibold">
                          {t("about.release_date")}:
                        </span>
                        <span className="text-[#8f98a0] text-right lg:text-left">
                          {formattedDate}
                        </span>
                      </div>

                      <div className="grid grid-cols-[110px_1fr] text-[11px] py-1">
                        <span className="text-[#556772] uppercase font-semibold">
                          {t("about.developer")}:
                        </span>
                        <span className="text-[#66c0f4] hover:text-[#fff] transition-colors cursor-pointer text-right lg:text-left font-bold">
                          {ext.author}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#556772] uppercase mb-2 font-bold tracking-wider">
                        {t("about.popular_tags")}:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {ext.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#67c1f5]/10 text-[#67c1f5] text-[10px] px-2 py-0.5 rounded-sm hover:bg-[#67c1f5]/20 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BAR WITH SHINE EFFECT */}
            <div className="mb-12">
              <div
                className="p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative group/action"
                style={{
                  background:
                    "linear-gradient(to right, #1b2838 0%, #2a475e 100%)",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                }}
              >
                {/* STATIC LENS FLARE GLOW */}
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#66c0f4]/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute right-1/4 -bottom-10 w-32 h-32 bg-[#beee11]/10 blur-[50px] rounded-full pointer-events-none" />

                {/* MOVING LIGHT SWEEP EFFECT */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 4,
                    ease: "linear" 
                  }}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), rgba(255,255,255,0.15), rgba(255,255,255,0.05), transparent)",
                    width: "50%",
                    skewX: "-25deg"
                  }}
                />

                <div className="relative z-10 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl text-white mb-1 font-bold tracking-tight">
                    {locale === "vi" ? "Cài đặt" : "Install"} {ext.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <i className="fab fa-chrome text-[#66c0f4] text-xs" />
                    <span className="text-[#acb2b8] text-[11px] font-bold uppercase tracking-widest">
                      {locale === "vi" ? "Tiện ích mở rộng" : "Browser Extension"}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col xs:flex-row items-center bg-black/60 p-1 rounded-sm border border-black/40 w-full sm:w-auto shadow-inner">
                  <div className="px-6 py-2 text-[#beee11] font-black text-[14px] uppercase italic hidden md:block">
                    Free
                  </div>
                  <a
                    href={ext.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto px-10 py-3 rounded-sm font-bold text-white transition-all transform hover:brightness-110 active:scale-95 shadow-xl text-center group/btn relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(to bottom, #a4d007 5%, #536904 95%)",
                    }}
                  >
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      {t("common.install_now").toUpperCase()}
                      <i className="fas fa-download text-xs group-hover/btn:translate-y-0.5 transition-transform" />
                    </span>

                    {/* Button inner shine */}
                    <motion.div 
                      initial={{ x: "-150%" }}
                      whileHover={{ x: "150%" }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
                    />
                  </a>
                </div>

                {/* Steam decorative diagonal element */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 md:gap-12 mb-16">
              <div>
                <section className="mb-14">
                  <h2 className="text-[13px] uppercase tracking-[0.2em] text-[#66c0f4] border-b border-white/5 pb-3 mb-8 font-black italic">
                    {locale === "vi"
                      ? "Về extension này"
                      : "About this extension"}
                  </h2>
                  <div className="space-y-6 text-[#acb2b8] leading-relaxed text-[15px]">
                    <p className="font-bold text-white text-lg">
                      {t(`about.${ext.slug}.subtitle`)}
                    </p>
                    <p>{t(`about.${ext.slug}.description`)}</p>

                    <div className="bg-black/20 p-6 md:p-8 rounded-sm border-l-4 border-[#66c0f4] mt-8 border border-white/5">
                      <h4 className="text-[#66c0f4] font-bold mb-4 uppercase tracking-widest text-[11px]">
                        {t("about.features.title")}
                      </h4>
                      <ul className="space-y-4">
                        {Array.isArray(t(`about.${ext.slug}.detailed_features`)) ? (
                          t(`about.${ext.slug}.detailed_features`).map((feature: any, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <i className="fas fa-check text-[#beee11] mt-1 text-[10px]" />
                              <span className="text-sm opacity-90 leading-snug">
                                <span className="text-white font-bold uppercase text-[11px] mr-2">
                                  {feature.title}:
                                </span>{" "}
                                {feature.desc}
                              </span>
                            </li>
                          ))
                        ) : (
                          ext.tags.map((tag, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <i className="fas fa-check text-[#beee11] mt-1 text-[10px]" />
                              <span className="text-sm opacity-90 leading-snug">
                                <span className="text-white font-bold uppercase text-[11px] mr-2">
                                  {tag}:
                                </span>{" "}
                                {t("about.features.support_desc")}
                              </span>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-14">
                  <h2 className="text-[13px] uppercase tracking-[0.2em] text-[#66c0f4] border-b border-white/5 pb-3 mb-8 font-black italic">
                    {t("about.requirements")}
                  </h2>
                  <div className="bg-black/20 p-6 md:p-8 border border-white/5 rounded-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-[13px]">
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-[#556772] mb-4 tracking-widest">
                          {t("about.min_version")}
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-[#556772]">
                              {t("about.browser_req")}
                            </span>
                            <span className="text-white">
                              Chrome v100+
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-[#556772]">
                              OS
                            </span>
                            <span className="text-white">
                              Windows/macOS
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-[#556772] mb-4 tracking-widest">
                          {t("about.recommend_version")}
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-[#556772]">
                              {t("about.browser_req")}
                            </span>
                            <span className="text-[#66c0f4] font-bold">
                              Latest Chrome
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-[#556772]">
                              OS
                            </span>
                            <span className="text-white">
                              Windows 11+
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* COMMENTS SECTION */}
                <section className="bg-[#1b2838] p-6 md:p-8 rounded-sm border border-white/10 shadow-2xl">
                  <div className="flex flex-col gap-2 mb-8 border-b border-white/5 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h2 className="text-[13px] uppercase tracking-[0.2em] text-[#66c0f4] font-black italic flex items-center gap-2">
                        <i className="fas fa-comments" />
                        {locale === "vi"
                          ? "Đánh giá từ người nổi tiếng"
                          : "Public Reviews"}
                      </h2>
                      <span className="w-fit text-[10px] text-[#66c0f4] bg-[#66c0f4]/10 px-3 py-1 rounded-sm font-bold border border-[#66c0f4]/20 uppercase tracking-widest">
                        {mockComments.length}{" "}
                        {locale === "vi" ? "đánh giá" : "reviews"}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#556772] italic">
                      {locale === "vi"
                        ? "* Các đánh giá trên chỉ mang tính chất minh họa vui vẻ, không có thật."
                        : "* These reviews are for illustrative and entertainment purposes only (not real)."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-black/20 p-5 rounded-sm border border-white/5 flex flex-col sm:flex-row gap-5 group hover:border-[#66c0f4]/30 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-sm overflow-hidden shadow-xl border border-white/10 flex-shrink-0 mx-auto sm:mx-0">
                          <img
                            src={comment.avatar}
                            alt={comment.user}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-bold group-hover:text-[#66c0f4] transition-colors">
                              {comment.user}
                            </span>
                            <span className="text-[9px] text-[#556772] uppercase tracking-widest font-bold">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-sm text-[#acb2b8] leading-relaxed italic group-hover:text-white transition-colors text-center sm:text-left">
                            "{comment.text}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="space-y-6">
                <div className="bg-[#1b2838] p-5 border border-white/10 rounded-sm shadow-lg">
                  <div className="flex flex-col gap-4 text-[11px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[#556772] uppercase font-bold">
                        Category
                      </span>
                      <span className="text-[#66c0f4] uppercase font-bold">
                        {ext.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#556772] uppercase font-bold">
                        Build
                      </span>
                      <span className="text-white font-mono">
                        {ext.version}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MORE FROM DEVELOPER SECTION */}
                <div className="bg-[#1b2838] p-5 border border-white/10 rounded-sm shadow-lg">
                  <h4 className="text-[10px] uppercase text-[#556772] mb-4 font-black tracking-widest italic">
                    {locale === "vi" ? "Dự án khác" : "Other Projects"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {otherExtensions.map((oe) => (
                      <Link
                        key={oe.slug}
                        href={`/about/${oe.slug}`}
                        className="flex items-center gap-3 p-2 bg-black/20 hover:bg-black/40 transition-all rounded-sm border border-white/5 group"
                      >
                        <div className="w-12 h-7 bg-black overflow-hidden flex-shrink-0 rounded-sm">
                          <img
                            src={
                              oe.slug === "zero-startpage"
                                ? "/images/starpage/1.png"
                                : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"
                            }
                            alt={oe.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all opacity-60 group-hover:opacity-100"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#acb2b8] group-hover:text-white truncate">
                          {oe.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/changelog?ext=${encodeURIComponent(
                      ext.name === "Zero Startpage"
                        ? "Zero Startpage - Newtab Replacement"
                        : ext.name,
                    )}`}
                    className="bg-[#2a475e] hover:bg-[#3d6c8d] text-white text-[10px] font-bold p-3 rounded-sm transition-all text-center tracking-widest flex items-center justify-center gap-2 group"
                  >
                    <i className="fas fa-history text-[#66c0f4]" />
                    UPDATE HISTORY
                  </Link>
                  <Link
                    href="/docs"
                    className="bg-[#2a475e] hover:bg-[#3d6c8d] text-white text-[10px] font-bold p-3 rounded-sm transition-all text-center tracking-widest flex items-center justify-center gap-2 group"
                  >
                    <i className="fas fa-book text-[#66c0f4]" />
                    MANUAL
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
