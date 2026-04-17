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
            {/* HERO SECTION */}
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 p-4 mb-8 bg-[var(--bg2)] border border-[var(--border)] shadow-xl"
            >
              {/* LEFT: MEDIA SECTION */}
              <div className="flex flex-col gap-2 overflow-hidden w-full">
                <div className="relative aspect-video bg-black shadow-inner overflow-hidden border border-[var(--border)] w-full">
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
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveMedia("screenshots")}
                    className={`px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase transition-all whitespace-nowrap ${
                      activeMedia === "screenshots"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg3)] text-[var(--muted)] hover:bg-[var(--bg4)]"
                    }`}
                  >
                    {locale === "vi" ? "Ảnh chụp" : "Screenshots"}
                  </button>
                  <button
                    onClick={() => setActiveMedia("video")}
                    className={`px-4 py-2 text-[10px] md:text-[11px] font-bold uppercase transition-all whitespace-nowrap ${
                      activeMedia === "video"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg3)] text-[var(--muted)] hover:bg-[var(--bg4)]"
                    }`}
                  >
                    {locale === "vi" ? "Video/Trailer" : "Video/Trailer"}
                  </button>
                </div>
              </div>

              {/* RIGHT: INFO PANEL */}
              <div className="flex flex-col gap-4 w-full">
                <div className="aspect-video lg:w-full lg:h-[180px] overflow-hidden bg-black/20 border border-[var(--border2)] hidden lg:block">
                  <img
                    src={screenshots[0]}
                    alt="Header"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4">
                  <p className="text-[13px] leading-relaxed opacity-90 line-clamp-4 md:line-clamp-6 italic text-[var(--text)]">
                    "{ext.description[locale]}"
                  </p>

                  <div className="space-y-2">
                    <div className="grid grid-cols-[100px_1fr] text-[11px] border-b border-[var(--border)] pb-2">
                      <span className="opacity-50 uppercase text-[var(--muted)]">
                        {t("about.recent_reviews")}:
                      </span>
                      <span className="text-[var(--accent)] font-semibold text-right lg:text-left">
                        {stats.rating >= "4.5"
                          ? locale === "vi"
                            ? "Rất tích cực"
                            : "Very Positive"
                          : locale === "vi"
                            ? "Tích cực"
                            : "Positive"}
                      </span>
                    </div>

                    <div className="grid grid-cols-[100px_1fr] text-[11px] border-b border-[var(--border)] pb-2">
                      <span className="opacity-50 uppercase text-[var(--muted)]">
                        {t("about.release_date")}:
                      </span>
                      <span className="text-[var(--text)] text-right lg:text-left">
                        {formattedDate}
                      </span>
                    </div>

                    <div className="grid grid-cols-[100px_1fr] text-[11px] border-b border-[var(--border)] pb-2">
                      <span className="opacity-50 uppercase text-[var(--muted)]">
                        {t("about.developer")}:
                      </span>
                      <span className="text-[var(--accent)] hover:underline cursor-pointer text-right lg:text-left">
                        {ext.author}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] opacity-40 uppercase mb-2 font-bold text-[var(--muted)]">
                      {t("about.popular_tags")}:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {ext.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[var(--accent-glow)] text-[var(--accent)] text-[10px] px-2.5 py-1 rounded-sm hover:brightness-110 cursor-pointer border border-[var(--accent)]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="mb-12">
              <div
                className="p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                style={{
                  background:
                    "linear-gradient(to right, var(--bg4), var(--bg2))",
                  borderRadius: "8px",
                  border: "1px solid var(--border2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <div className="text-center sm:text-left">
                  <h3 className="text-lg md:text-xl text-[var(--text)] mb-1 font-syne font-bold">
                    {t("about.buy_title")} {ext.name}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="bg-[#5c7e10] text-[#beee11] text-[10px] font-black px-2 py-0.5 rounded-sm uppercase italic tracking-wider">
                      Free
                    </span>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row items-center bg-black/40 p-1.5 rounded-lg border border-white/5 w-full sm:w-auto">
                  <div className="px-6 py-2 text-white font-medium text-[13px] hidden md:block">
                    {locale === "vi" ? "Hoàn toàn miễn phí" : "Free to Play"}
                  </div>
                  <a
                    href={ext.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto px-8 py-3 rounded-md font-bold text-white transition-all transform hover:brightness-110 active:scale-95 shadow-xl text-center"
                    style={{
                      background:
                        "linear-gradient(to bottom, #a4d007 5%, #536904 95%)",
                    }}
                  >
                    {t("common.install_now").toUpperCase()}
                  </a>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 md:gap-12 mb-16">
              <div>
                <section className="mb-14">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--border2)] pb-3 mb-8 font-bold">
                    {locale === "vi"
                      ? "Về extension này"
                      : "About this extension"}
                  </h2>
                  <div className="space-y-6 text-[var(--muted)] leading-relaxed text-[15px]">
                    <p className="font-bold text-[var(--text)] text-lg">
                      {t(`about.${ext.slug}.subtitle`)}
                    </p>
                    <p>{ext.description[locale]}</p>

                    <div className="bg-[var(--bg2)] p-6 md:p-8 rounded-xl border-l-4 border-[var(--accent)] mt-8 border border-[var(--border)]">
                      <h4 className="text-[var(--accent)] font-bold mb-4 uppercase tracking-widest text-xs">
                        {t("about.features.title")}
                      </h4>
                      <ul className="space-y-4">
                        {ext.tags.map((tag, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <i className="fas fa-check text-[#beee11] mt-1 text-xs" />
                            <span className="text-sm opacity-90 leading-snug">
                              <span className="text-[var(--text)] font-bold uppercase text-xs mr-2">
                                {tag}:
                              </span>{" "}
                              {t("about.features.support_desc")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-14">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--border2)] pb-3 mb-8 font-bold">
                    {t("about.requirements")}
                  </h2>
                  <div className="bg-[var(--bg2)] p-6 md:p-8 border border-[var(--border)] rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-[13px]">
                      <div>
                        <h4 className="text-[10px] uppercase font-bold opacity-40 mb-4 tracking-widest text-[var(--muted)]">
                          {t("about.min_version")}
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="opacity-40 text-[var(--muted)]">
                              {t("about.browser_req")}
                            </span>
                            <span className="text-[var(--text)]">
                              Chrome v100+
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="opacity-40 text-[var(--muted)]">
                              OS
                            </span>
                            <span className="text-[var(--text)]">
                              Windows/macOS
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold opacity-40 mb-4 tracking-widest text-[var(--muted)]">
                          {t("about.recommend_version")}
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="opacity-40 text-[var(--muted)]">
                              {t("about.browser_req")}
                            </span>
                            <span className="text-[var(--accent)] font-bold">
                              Latest Chrome
                            </span>
                          </li>
                          <li className="flex justify-between border-b border-[var(--border)] pb-2">
                            <span className="opacity-40 text-[var(--muted)]">
                              OS
                            </span>
                            <span className="text-[var(--text)]">
                              Windows 11+
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* COMMENTS SECTION */}
                <section className="bg-[var(--bg2)] p-6 md:p-8 rounded-2xl border border-[var(--border)] shadow-2xl">
                  <div className="flex flex-col gap-2 mb-8 border-b border-[var(--border2)] pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <h2 className="text-sm uppercase tracking-[0.2em] text-[var(--text)] font-bold flex items-center gap-2">
                        <i className="fas fa-comments text-[var(--accent)]" />
                        {locale === "vi"
                          ? "Đánh giá từ người nổi tiếng"
                          : "Public Reviews"}
                      </h2>
                      <span className="w-fit text-xs text-[var(--accent)] bg-[var(--accent-glow)] px-3 py-1 rounded-full font-bold border border-[var(--accent)]/20">
                        {mockComments.length}{" "}
                        {locale === "vi" ? "đánh giá" : "reviews"}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--muted)] italic opacity-60">
                      {locale === "vi"
                        ? "* Các đánh giá trên chỉ mang tính chất minh họa vui vẻ, không có thật."
                        : "* These reviews are for illustrative and entertainment purposes only (not real)."}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {mockComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-[var(--bg3)] p-5 md:p-6 rounded-xl border border-[var(--border)] flex flex-col sm:flex-row gap-5 group hover:border-[var(--accent)] transition-all duration-300 shadow-lg"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden shadow-xl border-2 border-[var(--border2)] flex-shrink-0 group-hover:border-[var(--accent)] transition-colors mx-auto sm:mx-0">
                          <img
                            src={comment.avatar}
                            alt={comment.user}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[var(--text)] text-base font-bold group-hover:text-[var(--accent)] transition-colors">
                              {comment.user}
                            </span>
                            <span className="text-[10px] text-[var(--muted)] opacity-50 uppercase tracking-widest">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--muted)] leading-relaxed italic group-hover:text-[var(--text)] transition-colors text-center sm:text-left">
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
                <div className="bg-[var(--bg2)] p-5 border border-[var(--border)] rounded-xl shadow-lg">
                  <div className="flex flex-col gap-4 text-[11px]">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                      <span className="opacity-40 uppercase font-bold text-[var(--muted)]">
                        Category
                      </span>
                      <span className="text-[var(--accent)] uppercase font-semibold">
                        {ext.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-40 uppercase font-bold text-[var(--muted)]">
                        Build
                      </span>
                      <span className="text-[var(--text)] font-mono">
                        {ext.version}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MORE FROM DEVELOPER SECTION */}
                <div className="bg-[var(--bg2)] p-5 border border-[var(--border)] rounded-xl shadow-lg">
                  <h4 className="text-[10px] uppercase opacity-40 mb-4 font-bold tracking-widest">
                    {locale === "vi" ? "Dự án khác" : "Other Projects"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {otherExtensions.map((oe) => (
                      <Link
                        key={oe.slug}
                        href={`/about/${oe.slug}`}
                        className="flex items-center gap-3 p-2 bg-[var(--bg3)] hover:bg-[var(--bg4)] transition-all rounded-lg border border-[var(--border)] group"
                      >
                        <div className="w-14 h-8 bg-black overflow-hidden flex-shrink-0 rounded-sm">
                          <img
                            src={
                              oe.slug === "zero-startpage"
                                ? "/images/starpage/1.png"
                                : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"
                            }
                            alt={oe.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[var(--text)] truncate">
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
                    className="bg-[var(--bg3)] hover:bg-[var(--bg4)] text-[var(--text)] border border-[var(--border)] text-[11px] font-bold p-3.5 rounded-xl transition-all text-center tracking-widest flex items-center justify-center gap-2 group"
                  >
                    <i className="fas fa-history opacity-50 group-hover:text-[var(--accent)] transition-colors" />
                    UPDATE HISTORY
                  </Link>
                  <Link
                    href="/docs"
                    className="bg-[var(--bg3)] hover:bg-[var(--bg4)] text-[var(--text)] border border-[var(--border)] text-[11px] font-bold p-3.5 rounded-xl transition-all text-center tracking-widest flex items-center justify-center gap-2 group"
                  >
                    <i className="fas fa-book opacity-50 group-hover:text-[var(--accent)] transition-colors" />
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
