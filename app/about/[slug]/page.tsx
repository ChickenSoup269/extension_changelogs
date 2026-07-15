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
    <div className="min-h-screen pt-24 pb-20 bg-[var(--bg)]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6">
        {/* BREADCRUMB */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider mb-8 text-[var(--muted2)] font-semibold">
          <Link href="/about" className="hover:text-[var(--text)] transition-colors">
            About
          </Link>
          <span>/</span>
          <Link href="/extensions" className="hover:text-[var(--text)] transition-colors">
            {locale === "vi" ? "Tất cả Extension" : "All Extensions"}
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-bold">{ext.name}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-8 font-syne text-[var(--text)] tracking-tight">
          {ext.name}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={ext.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO SECTION */}
            <div className="relative mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0 bg-[var(--bg2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                
                {/* LEFT: MEDIA SECTION */}
                <div className="flex flex-col gap-0 w-full lg:border-r border-[var(--border)]">
                  <div className="relative aspect-video bg-black overflow-hidden w-full">
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
                  <div className="flex gap-2 p-3 bg-[var(--bg)] border-t border-[var(--border)] overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveMedia("screenshots")}
                      className={`px-5 py-2 text-xs font-bold uppercase transition-all rounded-lg ${
                        activeMedia === "screenshots"
                          ? "bg-[var(--text)] text-[var(--bg)]"
                          : "bg-[var(--bg2)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg3)]"
                      }`}
                    >
                      {locale === "vi" ? "Ảnh chụp" : "Screenshots"}
                    </button>
                    <button
                      onClick={() => setActiveMedia("video")}
                      className={`px-5 py-2 text-xs font-bold uppercase transition-all rounded-lg ${
                        activeMedia === "video"
                          ? "bg-[var(--text)] text-[var(--bg)]"
                          : "bg-[var(--bg2)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg3)]"
                      }`}
                    >
                      {locale === "vi" ? "Video/Trailer" : "Video/Trailer"}
                    </button>
                  </div>
                </div>

                {/* RIGHT: INFO PANEL */}
                <div className="flex flex-col p-6 bg-[var(--bg2)] gap-6 w-full">
                  <div className="aspect-video w-full overflow-hidden border border-[var(--border)] rounded-xl hidden lg:block bg-[var(--bg)]">
                    <img
                      src={screenshots[0]}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between gap-6">
                    <p className="text-sm leading-relaxed text-[var(--muted)] line-clamp-4">
                      {ext.description[locale]}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.recent_reviews")}:
                        </span>
                        <span className="text-[var(--text)] font-bold uppercase">
                          {parseFloat(ext.stars || "0") >= 4.5 ? (locale === "vi" ? "Rất tích cực" : "Very Positive") : (locale === "vi" ? "Tích cực" : "Positive")}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs py-1.5 border-b border-[var(--border)]">
                        <span className="text-[var(--muted2)] font-semibold uppercase tracking-wide">
                          {t("about.stats.rating")}:
                        </span>
                        <span className="text-[var(--muted)] text-right">
                          <span className="text-[var(--text)] font-bold">{ext.stars} ★</span> ({ext.ratingCount})
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
                        <span className="text-[var(--text)] font-bold cursor-pointer">
                          {ext.author}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {ext.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg"
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

            {/* ACTION BAR */}
            <div className="mb-16">
              <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] shadow-sm">
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl text-[var(--text)] mb-2 font-syne font-bold tracking-tight">
                    {locale === "vi" ? "Cài đặt" : "Install"} {ext.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <i className="fab fa-chrome text-[var(--muted)]" />
                    <span className="text-[var(--muted2)] text-[11px] font-bold uppercase tracking-widest">
                      {locale === "vi" ? "Tiện ích mở rộng miễn phí" : "Free Browser Extension"}
                    </span>
                  </div>
                </div>

                <a
                  href={ext.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-[var(--bg)] bg-[var(--text)] transition-transform transform hover:scale-105 shadow-sm text-center flex items-center justify-center gap-3"
                >
                  {t("common.install_now").toUpperCase()}
                  <i className="fas fa-download text-sm" />
                </a>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 md:gap-16 mb-20">
              <div>
                <section className="mb-16">
                  <h2 className="text-2xl font-syne font-bold text-[var(--text)] mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[var(--bg2)] border border-[var(--border)]">
                      <i className="fa-solid fa-circle-info text-[var(--text)]"></i>
                    </span>
                    {locale === "vi" ? "Về tiện ích này" : "About this extension"}
                  </h2>
                  <div className="space-y-8 text-[var(--muted)] leading-relaxed text-[15px]">
                    <div className="p-6 md:p-8 rounded-[2rem] bg-[var(--bg2)] border border-[var(--border)] shadow-sm hover:border-[var(--text)] transition-colors">
                      <p className="font-syne font-bold text-[var(--text)] text-lg mb-4 leading-tight">
                        {t(`about.${ext.slug}.subtitle`)}
                      </p>
                      <p className="text-[16px] opacity-90">{t(`about.${ext.slug}.description`)}</p>
                    </div>

                    <div className="bg-[var(--bg2)] p-6 md:p-8 rounded-[2rem] border border-[var(--border)] shadow-sm hover:border-[var(--text)] transition-colors">
                      <h4 className="text-[var(--text)] font-bold mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                        <i className="fa-solid fa-wand-magic-sparkles"></i> {t("about.features.title")}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(t(`about.${ext.slug}.detailed_features`)) ? (
                          t(`about.${ext.slug}.detailed_features`).map((feature: any, i: number) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-[var(--bg)] border border-[var(--border2)] rounded-2xl">
                              <div className="w-6 h-6 rounded-full bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fas fa-check text-[var(--text)] text-[10px]" />
                              </div>
                              <span className="text-sm">
                                <span className="text-[var(--text)] font-bold block mb-1">
                                  {feature.title}
                                </span>
                                <span className="opacity-90 leading-relaxed block">
                                  {feature.desc}
                                </span>
                              </span>
                            </li>
                          ))
                        ) : (
                          ext.tags.map((tag, i) => (
                            <li key={i} className="flex items-start gap-3 p-4 bg-[var(--bg)] border border-[var(--border2)] rounded-2xl">
                              <div className="w-6 h-6 rounded-full bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="fas fa-check text-[var(--text)] text-[10px]" />
                              </div>
                              <span className="text-sm">
                                <span className="text-[var(--text)] font-bold block mb-1">
                                  {tag}
                                </span>
                                <span className="opacity-90 leading-relaxed block">
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

                {ext.slug === "zero-bookmark-manager" && (
                  <section className="mb-16">
                    <h2 className="text-xl font-syne font-bold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-4">
                      {t("about.zero-bookmark-manager.bookmark_styles.title")}
                    </h2>
                    
                    <div className="space-y-12">
                      <div>
                        <h4 className="text-xs uppercase font-bold text-[var(--muted2)] mb-6 tracking-widest flex items-center gap-2">
                          <i className="fas fa-list-ul" /> {t("about.zero-bookmark-manager.bookmark_styles.list_view")}
                        </h4>
                        <div className="space-y-3">
                          {[
                            { title: "Next.js Documentation", url: "https://nextjs.org/docs", icon: "fa-brands fa-react", tags: ["Dev", "Docs"] },
                            { title: "GitHub - ExtHub Repo", url: "https://github.com/ChickenSoup269/exthub", icon: "fa-brands fa-github", tags: ["Project", "Git"] },
                            { title: "Tailwind CSS Design", url: "https://tailwindcss.com", icon: "fa-solid fa-wind", tags: ["UI", "CSS"] }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg2)] border border-[var(--border)] group cursor-target hover:border-[var(--text)] transition-colors">
                              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center text-[var(--text)] border border-[var(--border)]">
                                <i className={item.icon} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[var(--text)] text-sm">{item.title}</div>
                                <div className="text-[10px] text-[var(--muted)] truncate">{item.url}</div>
                              </div>
                              <div className="hidden sm:flex gap-2">
                                {item.tags.map(tag => (
                                  <span key={tag} className="text-[10px] bg-[var(--bg)] px-2 py-1 rounded border border-[var(--border)] text-[var(--muted)]">{tag}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase font-bold text-[var(--muted2)] mb-6 tracking-widest flex items-center gap-2">
                          <i className="fas fa-th-large" /> {t("about.zero-bookmark-manager.bookmark_styles.grid_view")}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { title: "YouTube", icon: "fa-brands fa-youtube" },
                            { title: "Facebook", icon: "fa-brands fa-facebook" },
                            { title: "Discord", icon: "fa-brands fa-discord" },
                            { title: "Spotify", icon: "fa-brands fa-spotify" }
                          ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[var(--bg2)] border border-[var(--border)] group cursor-target hover:border-[var(--text)] transition-colors">
                              <div className="text-3xl text-[var(--text)]">
                                <i className={item.icon} />
                              </div>
                              <div className="font-bold text-xs text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">{item.title}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                <section className="mb-16">
                  <h2 className="text-xl font-syne font-bold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-4">
                    {t("about.requirements")}
                  </h2>
                  <div className="bg-[var(--bg2)] p-6 md:p-8 border border-[var(--border)] rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-sm">
                      <div>
                        <h4 className="text-[11px] uppercase font-bold text-[var(--muted2)] mb-4 tracking-widest">
                          {t("about.min_version")}
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="text-[var(--muted)]">Browser</span>
                            <span className="text-[var(--text)] font-medium">Chrome v100+</span>
                          </li>
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="text-[var(--muted)]">OS</span>
                            <span className="text-[var(--text)] font-medium">Windows/macOS</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[11px] uppercase font-bold text-[var(--muted2)] mb-4 tracking-widest">
                          {t("about.recommend_version")}
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="text-[var(--muted)]">Browser</span>
                            <span className="text-[var(--text)] font-bold">Latest Chrome</span>
                          </li>
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="text-[var(--muted)]">OS</span>
                            <span className="text-[var(--text)] font-medium">Windows 11+</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* COMMENTS SECTION */}
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl font-syne font-bold text-[var(--text)]">
                      {locale === "vi" ? "Đánh giá cộng đồng" : "Public Reviews"}
                    </h2>
                    <span className="text-xs text-[var(--muted2)] uppercase tracking-wider font-bold bg-[var(--bg2)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
                      {mockComments.length} {locale === "vi" ? "đánh giá" : "reviews"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[var(--bg2)] p-6 rounded-2xl border border-[var(--border)] flex flex-col sm:flex-row gap-5"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border2)] flex-shrink-0">
                          <img
                            src={comment.avatar}
                            alt={comment.user}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[var(--text)] text-sm font-bold">
                              {comment.user}
                            </span>
                            <span className="text-[10px] text-[var(--muted2)] uppercase tracking-widest font-bold">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">
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
                <div className="bg-[var(--bg2)] p-6 border border-[var(--border)] rounded-2xl">
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                      <span className="text-[var(--muted2)] uppercase font-bold tracking-wide">
                        Category
                      </span>
                      <span className="text-[var(--text)] font-bold">
                        {ext.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted2)] uppercase font-bold tracking-wide">
                        Build Version
                      </span>
                      <span className="text-[var(--text)] font-mono font-medium">
                        v{ext.version}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--bg2)] p-6 border border-[var(--border)] rounded-2xl">
                  <h4 className="text-[11px] uppercase text-[var(--text)] mb-5 font-bold tracking-widest">
                    {locale === "vi" ? "Dự án khác" : "Other Projects"}
                  </h4>
                  <div className="flex flex-col gap-4">
                    {otherExtensions.map((oe) => (
                      <Link
                        key={oe.slug}
                        href={`/about/${oe.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-1.5 flex-shrink-0">
                          <img
                            src={oe.icon}
                            alt={oe.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--text)] transition-colors truncate">
                          {oe.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/changelog?ext=${encodeURIComponent(
                      ext.name === "Zero Startpage" ? "Zero Startpage - Newtab Replacement" : ext.name,
                    )}`}
                    className="bg-[var(--bg2)] hover:bg-[var(--bg3)] border border-[var(--border)] text-[var(--text)] text-[11px] font-bold p-4 rounded-xl transition-all text-center tracking-widest flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-history" />
                    UPDATE HISTORY
                  </Link>
                  <Link
                    href="/docs"
                    className="bg-[var(--bg2)] hover:bg-[var(--bg3)] border border-[var(--border)] text-[var(--text)] text-[11px] font-bold p-4 rounded-xl transition-all text-center tracking-widest flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-book" />
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
