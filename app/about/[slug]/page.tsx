"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"
import { EXTENSIONS, LAST_UPDATED } from "@/lib/data"
import ImageSlider from "@/components/ImageSlider"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DynamicAboutPage() {
  const { slug } = useParams()
  const { t, locale } = useLanguage()
  const [activeMedia, setActiveMedia] = useState<"screenshots" | "video">("screenshots")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const ext = EXTENSIONS.find((e) => e.slug === slug) || EXTENSIONS[0]
  const otherExtensions = EXTENSIONS.filter((e) => e.slug !== slug)

  const formattedDate = new Date(LAST_UPDATED).toLocaleDateString(
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

  const mockComments = [
    {
      id: 1,
      user: "Sơn Tùng M-TP",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6t5FdJANrWj65CYTMOhwrNnb1dGz5-obsHlbbE_nJqwNwzcCGt8oF6_C4qkFItNF-1gQmbDM-JBTXw47z75CWJpyyYBf5tu77RlARKg&s=10",
      date: "16 Apr, 2026",
      text: locale === "vi" ? "Giao diện đỉnh cao, rất hợp với phong cách của mình. Keep it up!" : "Top-tier UI, matches my style perfectly. Keep it up!",
    },
    {
      id: 2,
      user: "MrBeast",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvn_oA8ZEA9wRAeGfpiJOaoJl4uqX22u8RmTezQGWmDlXjyKW2gPh4QaOOgvlroFCRJz8f_ebKEvOGYUacUu_0wEaGLjJCCyj-D50x1TJZjQ&s=10",
      date: "14 Apr, 2026",
      text: "I just subscribed! This extension is actually insane, and it's FREE??",
    },
    {
      id: 3,
      user: "Đen Vâu",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpfXlO7GkIy2tAX2K3K-wmm7jhhuyzStFMXtPDdC7Vn7S2asw5uc9IX0Bsff0p2PuAjOy0nAIm6vXG6jchJkgWHC-3Z1nqTcUiobQaw&s=10",
      date: "12 Apr, 2026",
      text: locale === "vi" ? "Lướt web mà như đang đi trốn, nhẹ nhàng và bình yên." : "Browsing the web feels like hiding away, gentle and peaceful.",
    },
  ]

  return (
    <div className="min-h-screen pt-12 md:pt-16 pb-24">
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8">
        {/* BREADCRUMB */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider mb-6 text-[var(--muted2)] font-bold">
          <Link href="/about" className="hover:text-[var(--text)] transition-colors">
            About
          </Link>
          <span>/</span>
          <Link href="/extensions" className="hover:text-[var(--text)] transition-colors">
            {locale === "vi" ? "Extensions" : "Extensions"}
          </Link>
          <span>/</span>
          <span className="text-[var(--text)]">{ext.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-syne text-[var(--text)] tracking-tight">
              {ext.name}
            </h1>
            <p className="text-sm text-[var(--muted)] font-medium mt-1">
              v{ext.version} • {ext.category} • by {ext.author}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {ext.homepage && (
              <a
                href={ext.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-lg flex items-center gap-2"
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
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ext.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO MEDIA & INFO SECTION */}
            <div className="relative mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0 bg-[var(--bg2)]/80 border border-[var(--border2)] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
                
                {/* LEFT: MEDIA SECTION */}
                <div className="flex flex-col gap-0 w-full lg:border-r border-[var(--border)]">
                  <div className="relative aspect-[16/10] bg-black overflow-hidden w-full">
                    {activeMedia === "screenshots" ? (
                      <ImageSlider images={screenshots} />
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    )}
                  </div>

                  {/* MEDIA TABS */}
                  <div className="flex gap-2 p-3 bg-[var(--bg)] border-t border-[var(--border)]">
                    <button
                      onClick={() => setActiveMedia("screenshots")}
                      className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded-xl border flex items-center gap-2 ${
                        activeMedia === "screenshots"
                          ? "bg-[var(--bg4)] text-[var(--text)] border-[var(--accent-border)]"
                          : "bg-[var(--bg2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
                      }`}
                    >
                      <i className="fa-solid fa-images text-xs" style={{ color: activeMedia === "screenshots" ? "var(--accent-visible)" : undefined }}></i>
                      {locale === "vi" ? "Ảnh chụp màn hình" : "Screenshots"}
                    </button>
                    <button
                      onClick={() => setActiveMedia("video")}
                      className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded-xl border flex items-center gap-2 ${
                        activeMedia === "video"
                          ? "bg-[var(--bg4)] text-[var(--text)] border-[var(--accent-border)]"
                          : "bg-[var(--bg2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]"
                      }`}
                    >
                      <i className="fa-solid fa-play text-xs" style={{ color: activeMedia === "video" ? "var(--accent-visible)" : undefined }}></i>
                      {locale === "vi" ? "Video Trailer" : "Video Trailer"}
                    </button>
                  </div>
                </div>

                {/* RIGHT: INFO PANEL */}
                <div className="flex flex-col p-6 sm:p-8 bg-[var(--bg2)] gap-6 w-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-2 shadow-inner">
                        <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-[var(--text)]">{ext.name}</div>
                        <div className="text-[11px] font-bold text-[var(--muted2)] uppercase tracking-wider">{ext.category}</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] mb-6">
                      {ext.description[locale]}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.recent_reviews")}:
                        </span>
                        <span className="text-[var(--text)] font-bold">
                          {parseFloat(ext.stars || "0") >= 4.5 ? (locale === "vi" ? "Rất tích cực" : "Very Positive") : (locale === "vi" ? "Tích cực" : "Positive")}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.stats.rating")}:
                        </span>
                        <span className="text-[var(--muted)] text-right">
                          <span className="text-[var(--text)] font-bold text-amber-400">★ {ext.stars}</span> ({ext.ratingCount} reviews)
                        </span>
                      </div>

                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.release_date")}:
                        </span>
                        <span className="text-[var(--text)] font-medium">
                          {formattedDate}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.developer")}:
                        </span>
                        <span className="text-[var(--text)] font-bold">
                          {ext.author}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {ext.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[var(--bg)] border border-[var(--border)] text-[var(--muted2)] text-[10px] uppercase font-bold px-3 py-1 rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-12 mb-16">
              <div>
                <section className="mb-12">
                  <h2 className="text-xl sm:text-2xl font-syne font-bold text-[var(--text)] mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs bg-[var(--bg2)] border border-[var(--border)]">
                      <i className="fa-solid fa-circle-info" style={{ color: "var(--accent-visible)" }}></i>
                    </span>
                    {locale === "vi" ? "Tổng Quan & Tính Năng" : "Overview & Features"}
                  </h2>
                  <div className="space-y-6 text-[var(--muted)] leading-relaxed text-sm">
                    <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm">
                      <p className="font-syne font-bold text-[var(--text)] text-base sm:text-lg mb-3">
                        {t(`about.${ext.slug}.subtitle`)}
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)]">{t(`about.${ext.slug}.description`)}</p>
                    </div>

                    <div className="bg-[var(--bg2)] p-6 md:p-8 rounded-3xl border border-[var(--border)] shadow-sm">
                      <h4 className="text-[var(--text)] font-bold mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                        <i className="fa-solid fa-wand-magic-sparkles text-xs" style={{ color: "var(--accent-visible)" }}></i> 
                        {t("about.features.title")}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(t(`about.${ext.slug}.detailed_features`)) ? (
                          t(`about.${ext.slug}.detailed_features`).map((feature: any, i: number) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl">
                              <div className="w-6 h-6 rounded-xl bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fa-solid fa-check text-[10px]" style={{ color: "var(--accent-visible)" }} />
                              </div>
                              <span className="text-xs sm:text-sm">
                                <span className="text-[var(--text)] font-bold block mb-1">
                                  {feature.title}
                                </span>
                                <span className="text-[var(--muted)] leading-relaxed block">
                                  {feature.desc}
                                </span>
                              </span>
                            </li>
                          ))
                        ) : (
                          ext.tags.map((tag, i) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl">
                              <div className="w-6 h-6 rounded-xl bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fa-solid fa-check text-[10px]" style={{ color: "var(--accent-visible)" }} />
                              </div>
                              <span className="text-xs sm:text-sm">
                                <span className="text-[var(--text)] font-bold block mb-1">
                                  {tag}
                                </span>
                                <span className="text-[var(--muted)] leading-relaxed block">
                                  {t("about.features.support_desc")}
                                </span>
                              </span>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* COMMENTS SECTION */}
                <section>
                  <div className="flex items-center justify-between gap-4 mb-6 border-b border-[var(--border)] pb-4">
                    <h2 className="text-xl font-syne font-bold text-[var(--text)] flex items-center gap-2">
                      <i className="fa-solid fa-comments text-sm" style={{ color: "var(--accent-visible)" }}></i>
                      {locale === "vi" ? "Đánh giá từ cộng đồng" : "Community Reviews"}
                    </h2>
                    <span className="text-xs text-[var(--muted2)] uppercase tracking-wider font-bold bg-[var(--bg2)] px-3 py-1 rounded-lg border border-[var(--border)]">
                      {mockComments.length} {locale === "vi" ? "đánh giá" : "reviews"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[var(--bg2)] p-5 rounded-2xl border border-[var(--border)] flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--border2)] flex-shrink-0 bg-[var(--bg)]">
                          <img
                            src={comment.avatar}
                            alt={comment.user}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[var(--text)] text-xs sm:text-sm font-bold">
                              {comment.user}
                            </span>
                            <span className="text-[10px] text-[var(--muted2)] uppercase tracking-wider font-semibold">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
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
                <div className="bg-[var(--bg2)] p-6 border border-[var(--border)] rounded-3xl shadow-sm">
                  <h4 className="text-[11px] uppercase text-[var(--muted2)] mb-4 font-bold tracking-widest">
                    Specifications
                  </h4>
                  <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                      <span className="text-[var(--muted)] font-medium">Category</span>
                      <span className="text-[var(--text)] font-bold">{ext.category}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                      <span className="text-[var(--muted)] font-medium">Build Version</span>
                      <span className="text-[var(--text)] font-mono font-bold">v{ext.version}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                      <span className="text-[var(--muted)] font-medium">License</span>
                      <span className="text-[var(--text)] font-bold">MIT / Free</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted)] font-medium">Security</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-shield-check text-xs"></i> Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--bg2)] p-6 border border-[var(--border)] rounded-3xl shadow-sm">
                  <h4 className="text-[11px] uppercase text-[var(--muted2)] mb-4 font-bold tracking-widest">
                    {locale === "vi" ? "Dự án khác" : "Other Projects"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {otherExtensions.map((oe) => (
                      <Link
                        key={oe.slug}
                        href={`/about/${oe.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[var(--bg3)] border border-transparent hover:border-[var(--border)] transition-all group"
                      >
                        <div className="w-9 h-9 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1.5 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={oe.icon}
                            alt={oe.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[var(--text)] truncate">{oe.name}</div>
                          <div className="text-[10px] text-[var(--muted2)] uppercase">{oe.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/changelog?ext=${encodeURIComponent(
                      ext.name === "Zero Startpage" ? "Zero Startpage - Newtab Replacement" : ext.name,
                    )}`}
                    className="bg-[var(--bg2)] hover:bg-[var(--bg3)] border border-[var(--border)] text-[var(--text)] text-xs font-bold p-3.5 rounded-2xl transition-all text-center tracking-wider flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-clock-rotate-left text-xs" style={{ color: "var(--accent-visible)" }} />
                    UPDATE HISTORY
                  </Link>
                  <Link
                    href="/docs"
                    className="bg-[var(--bg2)] hover:bg-[var(--bg3)] border border-[var(--border)] text-[var(--text)] text-xs font-bold p-3.5 rounded-2xl transition-all text-center tracking-wider flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-book-bookmark text-xs" style={{ color: "var(--accent-visible)" }} />
                    DOCUMENTATION
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

