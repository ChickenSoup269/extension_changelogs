"use client"

import { Suspense, type ReactNode, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { CHANGELOG, type ChangeType } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

type PixelTransitionProps = {
  firstContent: ReactNode
  secondContent: ReactNode
  gridSize?: number
  pixelColor?: string
  animationStepDuration?: number
  once?: boolean
  aspectRatio?: string
  className?: string
}

function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 8,
  pixelColor = "currentColor",
  animationStepDuration = 0.35,
  once = false,
  aspectRatio = "100%",
  className = "",
}: PixelTransitionProps) {
  const pixelGridRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLDivElement>(null)
  const delayedCallRef = useRef<gsap.core.Tween | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches,
    )
  }, [])

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current
    if (!pixelGridEl) return

    pixelGridEl.innerHTML = ""

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div")
        pixel.classList.add("pixelated-image-card__pixel")
        pixel.style.backgroundColor = pixelColor

        const size = 100 / gridSize
        pixel.style.width = `${size}%`
        pixel.style.height = `${size}%`
        pixel.style.left = `${col * size}%`
        pixel.style.top = `${row * size}%`
        pixelGridEl.appendChild(pixel)
      }
    }
  }, [gridSize, pixelColor])

  useEffect(() => {
    return () => {
      delayedCallRef.current?.kill()
    }
  }, [])

  const animatePixels = (activate: boolean) => {
    setIsActive(activate)

    const pixelGridEl = pixelGridRef.current
    const activeEl = activeRef.current
    if (!pixelGridEl || !activeEl) return

    const pixels = pixelGridEl.querySelectorAll(".pixelated-image-card__pixel")
    if (!pixels.length) return

    gsap.killTweensOf(pixels)
    delayedCallRef.current?.kill()
    gsap.set(pixels, { display: "none" })

    const staggerDuration = animationStepDuration / pixels.length

    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    })

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? "block" : "none"
      activeEl.style.pointerEvents = activate ? "none" : ""
    })

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    })
  }

  const handleEnter = () => {
    if (!isActive) animatePixels(true)
  }

  const handleLeave = () => {
    if (isActive && !once) animatePixels(false)
  }

  const handleClick = () => {
    if (!isActive) animatePixels(true)
    else if (!once) animatePixels(false)
  }

  return (
    <div
      className={`pixelated-image-card ${className}`}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {firstContent}
      </div>
      <div
        className="pixelated-image-card__active"
        ref={activeRef}
        aria-hidden={!isActive}
      >
        {secondContent}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  )
}

type TypeConfigValue = { label: string; icon: string; bg: string; color: string; border: string }

const TYPE_CONFIG: { [K in ChangeType]: TypeConfigValue } = {
  feat: { label: "FEAT", icon: "fa-wand-magic-sparkles", bg: "rgba(124,106,247,0.12)", color: "#a594ff", border: "rgba(124,106,247,0.25)" },
  fix: { label: "FIX", icon: "fa-bug-slash", bg: "rgba(62,207,142,0.12)", color: "#3ecf8e", border: "rgba(62,207,142,0.25)" },
  perf: { label: "PERF", icon: "fa-bolt", bg: "rgba(96,165,250,0.12)", color: "#60a5fa", border: "rgba(96,165,250,0.25)" },
  break: { label: "BREAK", icon: "fa-triangle-exclamation", bg: "rgba(239,68,68,0.12)", color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  docs: { label: "DOCS", icon: "fa-book-open", bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
}

const RELEASE_TYPE_LABELS = {
  major: { label: "Major Release", color: "#a594ff", bg: "rgba(165,148,255,0.12)", border: "rgba(165,148,255,0.3)" },
  minor: { label: "Minor Update", color: "#3ecf8e", bg: "rgba(62,207,142,0.12)", border: "rgba(62,207,142,0.3)" },
  patch: { label: "Patch Fix", color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
}

function ChangelogContent() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const [filter, setFilter] = useState<ChangeType | "all">(
    (searchParams?.get("type") as ChangeType) || "all",
  )
  const [extFilter, setExtFilter] = useState<string>(
    searchParams?.get("ext") || "all",
  )
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams?.get("page")) || 1,
  )
  const [contributorPage, setContributorPage] = useState(1)

  useEffect(() => {
    const params = new URLSearchParams()
    if (filter !== "all") params.set("type", filter)
    if (extFilter !== "all") params.set("ext", extFilter)
    if (currentPage > 1) params.set("page", currentPage.toString())

    const newUrl = params.toString() ? `?${params.toString()}` : "/changelog"
    router.replace(newUrl, { scroll: false })
  }, [filter, extFilter, currentPage, router])

  const extensions = [
    "all",
    ...Array.from(new Set(CHANGELOG.map((c) => c.extension))),
  ]

  const filtered = CHANGELOG.filter((item) => {
    const matchExt = extFilter === "all" || item.extension === extFilter
    const matchType =
      filter === "all" || item.changes.some((c) => c.type === filter)
    return matchExt && matchType
  })

  const allGrouped = extensions
    .filter((e) => e !== "all" && (extFilter === "all" || e === extFilter))
    .map((ext) => ({
      extension: ext,
      items: filtered.filter((item) => item.extension === ext),
    }))
    .filter((g) => g.items.length > 0)

  const flattenedGrouped = allGrouped.flatMap((g) => g.items)

  const ITEMS_PER_PAGE = 5
  const totalPages = Math.ceil(flattenedGrouped.length / ITEMS_PER_PAGE)
  const paginatedItems = flattenedGrouped.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const grouped = allGrouped
    .map((g) => ({
      ...g,
      items: paginatedItems.filter((item) => item.extension === g.extension),
    }))
    .filter((g) => g.items.length > 0)

  const today = new Date()
  const currentMonthIndex = today.getMonth()
  const currentYear = today.getFullYear()
  const monthNamesEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonthStr =
    locale === "vi"
      ? `Tháng ${currentMonthIndex + 1} ${currentYear}`
      : `${monthNamesEn[currentMonthIndex]} ${currentYear}`
  const thisMonthChanges = CHANGELOG.filter((c) => {
    const releaseDate = new Date(c.date.en)
    return (
      releaseDate.getMonth() === currentMonthIndex &&
      releaseDate.getFullYear() === currentYear
    )
  })

  let totalPatches = 0
  let newFeatures = 0
  let bugFixes = 0
  let breakingChanges = 0

  thisMonthChanges.forEach((log) => {
    totalPatches++
    log.changes.forEach((change) => {
      if (change.type === "feat") newFeatures++
      if (change.type === "fix") bugFixes++
      if (change.type === "break") breakingChanges++
    })
  })

  const extensionsUpdatedCount = new Set(
    thisMonthChanges.map((c) => c.extension),
  ).size

  const latestVersionsMap = new Map<string, (typeof CHANGELOG)[0]>()
  CHANGELOG.forEach((item) => {
    if (!latestVersionsMap.has(item.extension)) {
      latestVersionsMap.set(item.extension, item)
    }
  })
  const latestVersions = Array.from(latestVersionsMap.values())

  const REPO_MAP: Record<string, string> = {
    "Zero Startpage - Newtab Replacement":
      "https://github.com/ChickenSoup269/Zero-Start-Page",
    "Zero Bookmark Manager":
      "https://github.com/ChickenSoup269/Zero-Bookmark-Manager",
  }
  const CONTRIBUTORS = [
    {
      name: "Dũng Đinh",
      avatar: "/images/DungDinh.jpg",
      role: {
        vi: "Bug Hunter & Người đóng góp",
        en: "Bug Hunter & Contributor",
      },
      bugs: "4+",
      suggestions: 4,
      extension: "Zero Startpage",
      details: {
        vi: "Báo lỗi UI (4+) & gợi ý: code màu M3, widget Pomodoro, Google App icon. More M3 🐧",
        en: "UI bugs (4+) & suggestions: M3 color codes, Pomodoro widget, Google App icon. More M3 🐧",
      },
    },
    {
      name: "Kiến Huy",
      avatar: null,
      role: {
        vi: "Bug Hunter & Người đóng góp",
        en: "Bug Hunter & Contributor",
      },
      bugs: "3+",
      suggestions: 2,
      extension: "Zero Startpage",
      details: {
        vi: "Báo lỗi page title icon (1+) & gợi ý nhạc SoundCloud, Bookmark group không setting đúng, Bookmark icon",
        en: "Page title icon bug (1+) & suggested SoundCloud music. Bookmark group not setting correctly, Bookmark icon.",
      },
    },
    {
      name: "Mhale",
      avatar: null,
      role: {
        vi: "Bug Hunter",
        en: "Bug Hunter",
      },
      bugs: "3+",
      suggestions: 0,
      extension: "Zero Startpage",
      details: {
        vi: "Báo lỗi page không hoạt động khi tắt đội ngột khi restore và màn đen, reload background, mở tab mới",
        en: "Page not working when abruptly closed during restore and black screen, reload background, open new tab.",
      },
    },
    {
      name: "Lê Minh Thiện",
      avatar: null,
      role: {
        vi: "Bug Hunter & Người đóng góp",
        en: "Bug Hunter & Contributor",
      },
      bugs: "1+",
      suggestions: 2,
      extension: "Zero Startpage",
      details: {
        vi: "Gợi ý thêm tính năng xem full text folder bookmark, data backup sync",
        en: "Suggested full text folder bookmark viewing and data backup synchronization.",
      },
    },
    {
      name: "Ty Wood",
      avatar: null,
      role: {
        vi: "Người đóng góp",
        en: "Contributor",
      },
      bugs: "0+",
      suggestions: 2,
      extension: "Zero Bookmark Manager",
      details: {
        vi: "Gợi ý tính năng Quick Save và hiển thị tags, notes cho các chế độ xem.",
        en: "Suggested Quick Save feature and displaying tags and notes across views.",
      },
    },
    {
      name: "Cong Truong",
      avatar: null,
      role: {
        vi: "Bug Hunter",
        en: "Bug Hunter",
      },
      bugs: "1+",
      suggestions: 0,
      extension: "Zero Startpage",
      details: {
        vi: "Báo lỗi page màn đen.",
        en: "Page black screen issue.",
      },
    },
    {
      name: {
        vi: "Ẩn danh (1)",
        en: "anonymous  (1)",
      },
      avatar: null,
      role: {
        vi: "Người đóng góp",
        en: "Contributor",
      },
      bugs: "0+",
      suggestions: 1,
      extension: "Zero Startpage",
      details: {
        vi: "Gợi ý sắp xếp các bookmark vào group.",
        en: "Suggested bookmark organization into groups.",
      },
    },
    {
      name: {
        vi: "Ẩn danh (2)",
        en: "anonymous  (2)",
      },
      avatar: null,
      role: {
        vi: "Người đóng góp",
        en: "Contributor",
      },
      bugs: "0+",
      suggestions: 1,
      extension: "Zero Startpage",
      details: {
        vi: "Gợi ý thêm những câu lệnh mở nhanh.",
        en: "Suggested quick launch commands.",
      },
    },
    {
      name: {
        vi: "Ẩn danh (3)",
        en: "anonymous  (3)",
      },
      avatar: null,
      role: {
        vi: "Bug Hunter",
        en: "Bug Hunter",
      },
      bugs: "1+",
      suggestions: 0,
      extension: "Zero Startpage",
      details: {
        vi: "Phát hiện lỗi widget Spotify.",
        en: "Detected Spotify widget bug.",
      },
    },
    {
      name: {
        vi: "Ẩn danh (4)",
        en: "anonymous  (4)",
      },
      avatar: null,
      role: {
        vi: "Người đóng góp",
        en: "Contributor",
      },
      bugs: "1+",
      suggestions: 0,
      extension: "Zero Startpage",
      details: {
        vi: "Các bookmark không thay thế trình duyệt tab",
        en: "Bookmarks not replacing browser tabs.",
      },
    },
  ]

  const CONTRIBUTORS_PER_PAGE = 6
  const totalContributorPages = Math.ceil(
    CONTRIBUTORS.length / CONTRIBUTORS_PER_PAGE,
  )
  const paginatedContributors = CONTRIBUTORS.slice(
    (contributorPage - 1) * CONTRIBUTORS_PER_PAGE,
    contributorPage * CONTRIBUTORS_PER_PAGE,
  )

  const STORE_MAP: Record<string, string> = {
    "Zero Startpage - Newtab Replacement":
      "https://chromewebstore.google.com/detail/ogdbkgoionmjnlinbmmjncnhafhaenck?utm_source=item-share-cb",
    "Zero Bookmark Manager":
      "https://chromewebstore.google.com/detail/jhcoclfodfnchlddakkeegkogajdpgce?utm_source=item-share-cb",
  }

  const sourceProjects = [
    {
      name: "Zero Start Page",
      repo: "ChickenSoup269/Zero-Start-Page",
      href: "https://github.com/ChickenSoup269/Zero-Start-Page",
      releasesHref:
        "https://github.com/ChickenSoup269/Zero-Start-Page/releases",
      storeHref:
        "https://chromewebstore.google.com/detail/ogdbkgoionmjnlinbmmjncnhafhaenck?utm_source=item-share-cb",
      icon: "fa-solid fa-rocket",
    },
    {
      name: "Zero Bookmark Manager",
      repo: "ChickenSoup269/Zero-Bookmark-Manager",
      href: "https://github.com/ChickenSoup269/Zero-Bookmark-Manager",
      releasesHref:
        "https://github.com/ChickenSoup269/Zero-Bookmark-Manager/releases",
      storeHref:
        "https://chromewebstore.google.com/detail/jhcoclfodfnchlddakkeegkogajdpgce?utm_source=item-share-cb",
      icon: "fa-solid fa-lock",
    },
  ]

  // Detect theme (light/dark)
  const [isLightTheme, setIsLightTheme] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")
    setIsLightTheme(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsLightTheme(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])
  const changelogTextColor = isLightTheme ? "#111" : "var(--text)"

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    scrollToTop()
  }

  const handleFilterChange = (type: ChangeType | "all") => {
    setFilter(type)
    setCurrentPage(1)
    scrollToTop()
  }

  const handleExtensionChange = (extension: string) => {
    setExtFilter(extension)
    setCurrentPage(1)
    scrollToTop()
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16 relative z-10">
        {/* Header Hero */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest glow-pill mb-4">
            <i className="fa-solid fa-clock-rotate-left text-[9px]"></i>
            Release Notes & Updates
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 text-[var(--text)]">
            {locale === "vi" ? "Nhật Ký Cập Nhật" : "Changelog"}
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            {t("changelog.subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Filter Controls Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm mb-8 backdrop-blur-xl flex flex-col gap-4">
              {/* Extension Selector Tabs */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted2)] mb-2.5 block">
                  {locale === "vi" ? "Lọc theo Tiện ích" : "Filter by Extension"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {extensions.map((e) => {
                    const isSelected = extFilter === e
                    const icon = e.includes("Bookmark")
                      ? "fa-solid fa-bookmark"
                      : e.includes("Startpage") || e.includes("Start Page")
                        ? "fa-solid fa-rocket"
                        : "fa-solid fa-shapes"

                    return (
                      <button
                        key={e}
                        onClick={() => handleExtensionChange(e)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                        style={{
                          background: isSelected ? "var(--bg4)" : "var(--bg)",
                          border: `1px solid ${isSelected ? "var(--accent-border)" : "var(--border)"}`,
                          color: isSelected ? "var(--text)" : "var(--muted)",
                          boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                        }}
                      >
                        <i className={`${icon} text-[11px]`} style={{ color: isSelected ? "var(--accent-visible)" : undefined }} />
                        {e === "all" ? t("extensions.all") : e}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Change Type Filter Chips */}
              <div className="pt-3 border-t border-[var(--border)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted2)] mb-2.5 block">
                  {locale === "vi" ? "Loại cập nhật" : "Change Type"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["all", "feat", "fix", "perf", "break", "docs"] as const).map((type) => {
                    const isSelected = filter === type
                    const cfg = type !== "all" ? TYPE_CONFIG[type] : null

                    return (
                      <button
                        key={type}
                        onClick={() => handleFilterChange(type)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-1.5"
                        style={{
                          background: isSelected
                            ? cfg ? cfg.bg : "var(--bg4)"
                            : "var(--bg)",
                          border: `1px solid ${
                            isSelected
                              ? cfg ? cfg.border : "var(--accent-border)"
                              : "var(--border)"
                          }`,
                          color: isSelected
                            ? cfg ? cfg.color : "var(--text)"
                            : "var(--muted)",
                          boxShadow: isSelected ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
                        }}
                      >
                        {cfg && <i className={`fa-solid ${cfg.icon} text-[10px]`} />}
                        {type === "all" ? (locale === "vi" ? "Tất cả thay đổi" : "All Types") : cfg?.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Timeline & Release Cards */}
            <div className="relative">
              <div className="flex flex-col gap-12">
                {grouped.map((group) => (
                  <div key={group.extension} className="relative">
                    {/* Extension Group Header */}
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--border)]">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg3)] border border-[var(--border2)] text-base" style={{ color: "var(--accent-visible)" }}>
                        <i className={group.items[0]?.extensionIcon || "fa-solid fa-puzzle-piece"} />
                      </div>
                      <div>
                        <h2 className="text-xl font-syne font-bold text-[var(--text)]">
                          {group.extension}
                        </h2>
                        <span className="text-[11px] font-medium text-[var(--muted2)]">
                          {group.items.length} {locale === "vi" ? "phiên bản được ghi nhận" : "releases listed"}
                        </span>
                      </div>
                    </div>

                    <div className="relative pl-6 sm:pl-8">
                      {/* Timeline Vertical Guide Line */}
                      <div
                        className="absolute left-[7px] top-[28px] bottom-4 w-[2px]"
                        style={{
                          background: "linear-gradient(180deg, var(--accent) 0%, var(--accent2) 40%, var(--border2) 80%, transparent 100%)",
                          boxShadow: "0 0 10px var(--accent-glow)",
                        }}
                      />

                      <div className="flex flex-col gap-8">
                        {group.items.map((item, i) => {
                          const rel = RELEASE_TYPE_LABELS[item.releaseType] || RELEASE_TYPE_LABELS.patch
                          const dotColor = item.releaseType === "major" ? "#a594ff" : item.releaseType === "minor" ? "#3ecf8e" : "#94a3b8"

                          return (
                            <div key={i} className="relative group/item">
                              {/* Glowing Timeline Marker Dot */}
                              <div
                                className="absolute -left-[27px] sm:-left-[31px] top-[26px] w-4 h-4 rounded-full z-10 transition-all duration-300 group-hover/item:scale-125 border-2 border-[var(--bg)]"
                                style={{
                                  background: dotColor,
                                  boxShadow: `0 0 12px ${dotColor}`,
                                }}
                              />

                              {/* Release Card */}
                              <div className="rounded-3xl p-6 sm:p-7 bg-[var(--bg2)]/90 border border-[var(--border2)] hover:border-[var(--accent-border)] transition-all duration-300 shadow-xl backdrop-blur-xl group/card overflow-hidden">
                                {/* Release Meta Header */}
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-[var(--border)]">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="font-mono text-sm sm:text-base font-extrabold px-3 py-1 rounded-xl bg-[var(--bg)] border border-[var(--border2)] text-[var(--text)] tracking-wider shadow-inner">
                                      v{item.version}
                                    </span>
                                    <span
                                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                                      style={{
                                        color: rel.color,
                                        backgroundColor: rel.bg,
                                        border: `1px solid ${rel.border}`,
                                      }}
                                    >
                                      <i className="fa-solid fa-tag text-[9px]" />
                                      {rel.label}
                                    </span>
                                  </div>

                                  <div className="text-xs font-semibold text-[var(--muted2)] flex items-center gap-1.5">
                                    <i className="fa-regular fa-calendar-days text-[11px]" />
                                    {item.date[locale]}
                                  </div>
                                </div>

                                {/* List of Changes */}
                                <ul className="space-y-3 mb-6">
                                  {item.changes
                                    .filter((c) => filter === "all" || c.type === filter)
                                    .map((change, j) => {
                                      const cfg = TYPE_CONFIG[change.type]
                                      return (
                                        <li
                                          key={j}
                                          className="p-3 sm:p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-start gap-3 transition-colors hover:bg-[var(--bg3)] hover:border-[var(--border2)]"
                                        >
                                          <span
                                            className="mt-0.5 text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1.5 flex-shrink-0"
                                            style={{
                                              background: cfg.bg,
                                              color: cfg.color,
                                              border: `1px solid ${cfg.border}`,
                                              boxShadow: `0 0 8px ${cfg.bg}`,
                                            }}
                                          >
                                            <i className={`fa-solid ${cfg.icon} text-[9px]`} />
                                            {cfg.label}
                                          </span>
                                          <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--text)] font-normal pt-0.5">
                                            {change.text[locale]}
                                          </p>
                                        </li>
                                      )
                                    })}
                                </ul>

                                {/* Release Card Action Footer */}
                                {REPO_MAP[group.extension] && (
                                  <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-2.5">
                                      <a
                                        href={`${REPO_MAP[group.extension]}/releases/tag/v${item.version}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg)] border border-[var(--border2)] hover:border-[var(--accent-border)] text-[var(--text)] transition-all"
                                      >
                                        <i className="fa-brands fa-github text-xs" />
                                        GitHub Release
                                        <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-[var(--muted2)]" />
                                      </a>

                                      {STORE_MAP[group.extension] && (
                                        <a
                                          href={STORE_MAP[group.extension]}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--bg)] border border-[var(--border2)] hover:border-[var(--accent-border)] text-[var(--text)] transition-all"
                                        >
                                          <i className="fa-brands fa-chrome text-xs text-[#3498db]" />
                                          Chrome Store
                                          <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-[var(--muted2)]" />
                                        </a>
                                      )}
                                    </div>

                                    <span className="text-[11px] font-medium text-[var(--muted2)]">
                                      {item.changes.length} {locale === "vi" ? "điểm cập nhật" : "changes logged"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                    style={{
                      background: "var(--bg3)",
                      border: "1px solid var(--border2)",
                      color: changelogTextColor,
                    }}
                  >
                    {t("common.prev")}
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className="w-10 h-10 rounded-lg text-sm font-bold transition-all"
                          style={{
                            background:
                              currentPage === page
                                ? "var(--bg3)"
                                : "transparent",
                            border: `1px solid ${
                              currentPage === page
                                ? "var(--text)"
                                : "transparent"
                            }`,
                            color:
                              currentPage === page
                                ? "var(--text)"
                                : "var(--muted)",
                          }}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                    style={{
                      background: "var(--bg3)",
                      border: "1px solid var(--border2)",
                      color: changelogTextColor,
                    }}
                  >
                    {t("common.next")}
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:w-[340px] flex flex-col gap-6">
            {/* Stats Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-syne font-semibold text-sm">
                  <i className="fa-solid fa-chart-pie mr-2 opacity-70" />
                  {t("changelog.sidebar.stats")}
                </h3>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--bg2)] text-[var(--accent)] border border-[var(--border)] shadow-sm">
                  {currentMonthStr}
                </span>
              </div>

              {/* Mini Chart */}
              <div className="mb-5">
                <div
                  className="flex w-full h-2 rounded-full overflow-hidden mb-2 shadow-inner"
                  style={{ background: "var(--bg4)" }}
                >
                  <div
                    style={{
                      width: `${(newFeatures / (newFeatures + bugFixes + breakingChanges || 1)) * 100}%`,
                      background: "linear-gradient(90deg, #818cf8, #a594ff)",
                    }}
                  />
                  <div
                    style={{
                      width: `${(bugFixes / (newFeatures + bugFixes + breakingChanges || 1)) * 100}%`,
                      background: "linear-gradient(90deg, #34d399, #3ecf8e)",
                    }}
                  />
                  <div
                    style={{
                      width: `${(breakingChanges / (newFeatures + bugFixes + breakingChanges || 1)) * 100}%`,
                      background: "linear-gradient(90deg, #f87171, #ef4444)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
                  <span style={{ color: "#a594ff" }}>Feat {newFeatures}</span>
                  <span style={{ color: "#3ecf8e" }}>Fix {bugFixes}</span>
                  <span style={{ color: "#ef4444" }}>
                    Break {breakingChanges}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: t("changelog.sidebar.total_patch"),
                    value: totalPatches,
                    color: "var(--text)",
                    icon: "fa-solid fa-layer-group",
                    bg: "var(--bg4)",
                  },
                  {
                    label: t("changelog.sidebar.new_features"),
                    value: newFeatures,
                    color: "#a594ff",
                    icon: "fa-solid fa-wand-magic-sparkles",
                    bg: "rgba(165,148,255,0.15)",
                  },
                  {
                    label: t("changelog.sidebar.bug_fixes"),
                    value: bugFixes,
                    color: "#3ecf8e",
                    icon: "fa-solid fa-bug",
                    bg: "rgba(62,207,142,0.15)",
                  },
                  {
                    label: t("changelog.sidebar.breaking"),
                    value: breakingChanges,
                    color: "#ef4444",
                    icon: "fa-solid fa-triangle-exclamation",
                    bg: "rgba(239,68,68,0.15)",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 rounded-lg border border-[var(--border)] flex flex-col items-center text-center transition-all duration-300 hover:border-[var(--text)] group relative overflow-hidden"
                    style={{ background: "var(--bg)" }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ background: s.color }}
                    />
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      style={{ background: s.bg, color: s.color }}
                    >
                      <i className={`${s.icon} text-xs drop-shadow-sm`} />
                    </div>
                    <span
                      className="text-xl font-bold font-syne"
                      style={{ color: changelogTextColor }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-[10px] font-medium uppercase tracking-tighter mt-1"
                      style={{ color: "var(--muted2)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}

                <div
                  className="col-span-2 p-3 rounded-lg border border-[var(--border)] flex items-center justify-between transition-all duration-300 hover:border-[var(--text)] group"
                  style={{ background: "var(--bg)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "var(--bg4)",
                        color: "var(--accent2)",
                      }}
                    >
                      <i className="fa-solid fa-arrows-rotate text-xs" />
                    </div>
                    <span
                      className="text-[10px] font-medium uppercase tracking-tighter"
                      style={{ color: "var(--muted2)" }}
                    >
                      {t("changelog.sidebar.updated")}
                    </span>
                  </div>
                  <span
                    className="text-lg font-bold font-syne"
                    style={{ color: changelogTextColor }}
                  >
                    {extensionsUpdatedCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Contributors Card (Hall of Fame) */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3
                className="font-syne font-semibold text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "var(--muted2)" }}
              >
                <i className="fa-solid fa-medal text-[var(--text)]" />
                {t("changelog.contributors.title")}
              </h3>
              <p
                className="text-[10px] mb-4 leading-relaxed"
                style={{ color: "var(--muted2)" }}
              >
                {t("changelog.contributors.subtitle")}
              </p>

              <div className="flex flex-col gap-3">
                {paginatedContributors.map((c, i) =>
                  (() => {
                    const globalRank =
                      (contributorPage - 1) * CONTRIBUTORS_PER_PAGE + i + 1

                    return (
                      <div
                        key={i}
                        className="p-3 rounded-2xl border border-[var(--border)] transition-all duration-300 hover:border-[var(--text)] group"
                        style={{ background: "var(--bg)" }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                            style={{
                              background: "var(--bg4)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {c.avatar ? (
                              <img
                                src={c.avatar}
                                alt={
                                  typeof c.name === "string"
                                    ? c.name
                                    : c.name[locale]
                                }
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <i
                                className="fa-solid fa-user text-[10px]"
                                style={{ color: "var(--accent2)" }}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-bold text-xs truncate"
                              style={{ color: changelogTextColor }}
                            >
                              {typeof c.name === "string"
                                ? c.name
                                : c.name[locale]}
                            </div>
                            <div
                              className="text-[9px] uppercase tracking-tighter truncate"
                              style={{ color: "var(--muted2)" }}
                            >
                              {c.extension}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {globalRank <= 3 && (
                            <span
                              className="relative overflow-hidden rounded-md px-2 py-[3px] text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#f8fafc]"
                              style={{
                                background:
                                  globalRank === 1
                                    ? "linear-gradient(135deg, rgba(245,158,11,0.95), rgba(234,179,8,0.75))"
                                    : globalRank === 2
                                      ? "linear-gradient(135deg, rgba(148,163,184,0.9), rgba(100,116,139,0.7))"
                                      : "linear-gradient(135deg, rgba(180,83,9,0.92), rgba(217,119,6,0.72))",
                                border: "1px solid rgba(255,255,255,0.16)",
                                boxShadow:
                                  globalRank === 1
                                    ? "0 0 12px rgba(245,158,11,0.32)"
                                    : globalRank === 2
                                      ? "0 0 10px rgba(148,163,184,0.22)"
                                      : "0 0 10px rgba(217,119,6,0.26)",
                              }}
                            >
                              <span className="absolute inset-0 bg-white/10" />
                              <span className="relative z-10">
                                TOP {globalRank}
                              </span>
                            </span>
                          )}
                          {c.role &&
                            (() => {
                              const roleText = c.role[locale]
                              const isBugHunter =
                                roleText.includes("Bug Hunter")
                              const isContributor =
                                roleText.includes("Người đóng góp") ||
                                roleText.includes("Contributor")
                              const isDual = isBugHunter && isContributor

                              const parsedBugs = parseInt(
                                String(c.bugs).replace(/\D/g, "") || "0",
                                10,
                              )
                              const parsedSuggestions = parseInt(
                                String(c.suggestions).replace(/\D/g, "") || "0",
                                10,
                              )
                              const totalContributions =
                                parsedBugs + parsedSuggestions
                              const isLegendary =
                                i < 3 && totalContributions >= 4

                              let color = "#60a5fa" // Soft Blue for Contributor
                              let bg = "rgba(96,165,250,0.15)"
                              let border = "rgba(96,165,250,0.3)"
                              let shadow = "rgba(96,165,250,0.2)"

                              if (isDual) {
                                color = "#eab308" // Gold for both
                                bg = "rgba(234,179,8,0.15)"
                                border = "rgba(234,179,8,0.3)"
                                shadow = "rgba(234,179,8,0.2)"
                              } else if (isBugHunter) {
                                color = "#c084fc" // Soft Purple for Bug Hunter
                                bg = "rgba(192,132,252,0.15)"
                                border = "rgba(192,132,252,0.3)"
                                shadow = "rgba(192,132,252,0.2)"
                              }

                              return (
                                <span
                                  className={`achievement-badge ${isLegendary ? "achievement-badge--legendary" : ""} text-[8px] px-2 py-[3px] rounded-md font-bold uppercase tracking-wider`}
                                  style={{
                                    ["--badge-color" as string]: color,
                                    ["--badge-bg" as string]: bg,
                                    ["--badge-border" as string]: border,
                                    ["--badge-shadow" as string]: shadow,
                                    ["--badge-legendary-shadow" as string]:
                                      isLegendary ? `${color}66` : shadow,
                                    background: bg,
                                    color: color,
                                    border: `1px solid ${border}`,
                                    boxShadow: isLegendary
                                      ? `0 0 16px ${color}55, 0 0 28px ${shadow}`
                                      : `0 0 10px ${shadow}`,
                                  }}
                                >
                                  {roleText}
                                </span>
                              )
                            })()}
                          <div
                            className="flex items-center gap-1.5 px-2 py-[3px] rounded-md"
                            style={{
                              background: "rgba(34,197,94,0.1)",
                              border: "1px solid rgba(34,197,94,0.2)",
                              boxShadow: "0 0 8px rgba(34,197,94,0.1)",
                            }}
                          >
                            <i className="fa-solid fa-bug text-[8px] text-[#22c55e]" />
                            <span className="text-[9px] font-extrabold text-[#22c55e]">
                              {c.bugs}
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-1.5 px-2 py-[3px] rounded-md"
                            style={{
                              background: "rgba(168,85,247,0.1)",
                              border: "1px solid rgba(168,85,247,0.2)",
                              boxShadow: "0 0 8px rgba(168,85,247,0.1)",
                            }}
                          >
                            <i className="fa-solid fa-lightbulb text-[8px] text-[#a855f7]" />
                            <span className="text-[9px] font-extrabold text-[#a855f7]">
                              {c.suggestions}
                            </span>
                          </div>
                        </div>

                        {c.details && (
                          <div
                            className="text-[10px] mt-2 pt-2 border-t leading-relaxed font-medium"
                            style={{
                              color: "var(--muted2)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {typeof c.details === "string"
                              ? c.details
                              : c.details[locale]}
                          </div>
                        )}
                      </div>
                    )
                  })(),
                )}
              </div>

              {totalContributorPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                  <button
                    onClick={() =>
                      setContributorPage((p) => Math.max(1, p - 1))
                    }
                    disabled={contributorPage === 1}
                    className="p-2 rounded-lg transition-all disabled:opacity-30"
                    style={{
                      background: "var(--bg4)",
                      color: changelogTextColor,
                    }}
                  >
                    <i className="fa-solid fa-chevron-left text-[10px]" />
                  </button>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "var(--muted2)" }}
                  >
                    {contributorPage} / {totalContributorPages}
                  </span>
                  <button
                    onClick={() =>
                      setContributorPage((p) =>
                        Math.min(totalContributorPages, p + 1),
                      )
                    }
                    disabled={contributorPage === totalContributorPages}
                    className="p-2 rounded-lg transition-all disabled:opacity-30"
                    style={{
                      background: "var(--bg4)",
                      color: changelogTextColor,
                    }}
                  >
                    <i className="fa-solid fa-chevron-right text-[10px]" />
                  </button>
                </div>
              )}
            </div>

            {/* Latest Versions Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3 className="font-syne font-semibold text-sm mb-4">
                {t("changelog.sidebar.latest_versions")}
              </h3>
              {latestVersions.map((c) => (
                <div
                  key={c.extension}
                  className="flex items-center justify-between py-2.5 text-sm"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="flex items-center gap-2 max-w-[70%] truncate">
                    <i
                      className={`${c.extensionIcon} text-xs text-[var(--text)] w-4 text-center shrink-0`}
                    ></i>
                    <span
                      className="truncate font-medium text-xs sm:text-sm"
                      style={{ color: "var(--text)" }}
                      title={c.extension}
                    >
                      {c.extension}
                    </span>
                  </span>
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] shrink-0"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    v{c.version}
                  </span>
                </div>
              ))}
            </div>

            {/* Donation Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3 className="font-syne font-semibold text-sm mb-4 flex items-center gap-2">
                <i className="fa-solid fa-heart text-[#e84393] text-base" />
                {locale === "vi" ? "Ủng hộ dự án" : "Support the project"}
              </h3>

              <div className="grid gap-3">
                <a
                  href="https://ko-fi.com/chickensoup269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donate-card donate-card--kofi group"
                >
                  <span className="donate-card__icon">
                    <i className="fa-solid fa-mug-hot" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className="donate-card__title"
                      style={{ color: changelogTextColor }}
                    >
                      Ko-fi
                    </span>
                    <span className="donate-card__text">
                      {locale === "vi"
                        ? "Mời mình một ly cà phê"
                        : "Buy me a coffee"}
                    </span>
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square donate-card__arrow" />
                </a>

                <PixelTransition
                  firstContent={
                    <div className="momo-card__front">
                      <img
                        src="/images/cat.png"
                        alt=""
                        className="momo-card__cover"
                      />
                      <div className="momo-card__shade" />
                      <span className="momo-card__mark">MoMo</span>
                      <span className="momo-card__copy">
                        <span
                          className="donate-card__title"
                          style={{ color: "#fff" }}
                        >
                          MoMo
                        </span>
                        <span className="donate-card__text">
                          {locale === "vi"
                            ? "Hover để hiện mã QR"
                            : "Hover to reveal QR"}
                        </span>
                      </span>
                    </div>
                  }
                  secondContent={
                    <div className="momo-card__qr">
                      <img src="/images/momo_qr_Thien.png" alt="MoMo QR" />
                    </div>
                  }
                  gridSize={8}
                  pixelColor="#ffffff"
                  animationStepDuration={0.4}
                  className="momo-pixel-card"
                />
              </div>
            </div>

            {/* Source Code Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3 className="font-syne font-semibold text-sm mb-4 flex items-center gap-2">
                <i className="fa-brands fa-github text-[var(--text)] text-base" />
                {t("changelog.sidebar.source_code")}
              </h3>

              {sourceProjects
                .filter((p) => p.name !== "Extension")
                .map((project) => (
                  <div
                    key={project.repo}
                    className="flex items-start gap-3 py-3 group transition-all duration-200"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <span
                      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--bg)",
                        border: "1px solid var(--border2)",
                      }}
                    >
                      <img
                        src={
                          project.repo.includes("Zero-Start-Page")
                            ? "/images/startpage_icon.png"
                            : project.repo.includes("Zero-Bookmark-Manager")
                              ? "/images/bookmark_icon.png"
                              : "/images/source-code.png"
                        }
                        alt={project.name}
                        style={{ width: 20, height: 20, borderRadius: 4 }}
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-bold truncate block transition-colors duration-200 hover:text-[var(--text)]"
                        style={{ color: "var(--text)" }}
                      >
                        {project.name}
                      </a>
                      <p
                        className="text-[11px] truncate mt-0.5 font-mono"
                        style={{ color: "var(--muted2)" }}
                      >
                        {project.repo}
                      </p>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <i
                        className="fa-solid fa-arrow-up-right-from-square text-xs flex-shrink-0 mt-1"
                        style={{ color: "var(--text)" }}
                      />
                    </a>
                  </div>
                ))}

              <div className="mt-4 flex flex-col gap-2">
                {sourceProjects
                  .filter((p) => p.name !== "Extension")
                  .map((project) => (
                    <a
                      key={project.releasesHref}
                      href={project.releasesHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:border-[var(--accent-border)] bg-[var(--bg)] border border-[var(--border)]"
                    >
                      <span style={{ color: "var(--muted)" }}>
                        {project.name}
                      </span>
                      <span
                        className="flex items-center gap-1.5"
                        style={{ color: "var(--text)" }}
                      >
                        <i className="fa-solid fa-tag text-[10px]" style={{ color: "var(--accent-visible)" }} />
                        {locale === "vi" ? "Xem releases" : "View releases"}
                      </span>
                    </a>
                  ))}
              </div>
            </div>

            {/* Chrome Store Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3 className="font-syne font-semibold text-sm mb-4 flex items-center gap-2">
                <i className="fa-brands fa-chrome text-[#3498db] text-base" />
                {t("changelog.sidebar.store")}
              </h3>

              <div className="flex flex-col gap-2.5">
                {sourceProjects.map((project) => (
                  <a
                    key={project.storeHref}
                    href={project.storeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent-border)] hover:bg-[var(--bg3)] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          project.repo.includes("Zero-Start-Page")
                            ? "/images/startpage_icon.png"
                            : "/images/bookmark_icon.png"
                        }
                        alt={project.name}
                        style={{ width: 24, height: 24, borderRadius: 4 }}
                      />
                      <span
                        className="text-xs font-bold group-hover:text-[var(--text)] transition-colors"
                        style={{ color: changelogTextColor }}
                      >
                        {project.name}
                      </span>
                    </div>
                    <i
                      className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-[var(--text)] transition-all"
                      style={{ color: "var(--muted2)" }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Firefox Store Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl">
              <h3 className="font-syne font-semibold text-sm mb-4 flex items-center gap-2">
                <i className="fa-brands fa-firefox-browser text-[#ff7139] text-base" />
                Firefox Add-ons
              </h3>

              <div className="flex flex-col gap-2.5">
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/zero-startpage-newtab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent-border)] hover:bg-[var(--bg3)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/startpage_icon.png"
                      alt="Zero Start Page"
                      style={{ width: 24, height: 24, borderRadius: 4 }}
                    />
                    <span
                      className="text-xs font-bold group-hover:text-[var(--text)] transition-colors"
                      style={{ color: changelogTextColor }}
                    >
                      Zero Start Page
                    </span>
                  </div>
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-[var(--text)] transition-all"
                    style={{ color: "var(--muted2)" }}
                  />
                </a>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] opacity-70 cursor-not-allowed transition-all">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/bookmark_icon.png"
                      alt="Zero Bookmark Manager"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        filter: "grayscale(100%)",
                      }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: changelogTextColor }}
                    >
                      Zero Bookmark Manager
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      color: "var(--muted2)",
                      backgroundColor: "var(--bg3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {locale === "vi" ? "Sắp ra mắt" : "Upcoming"}
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy Extension Card */}
            <div className="rounded-3xl p-6 bg-[var(--bg2)]/90 border border-[var(--border2)] shadow-sm backdrop-blur-xl flex flex-col items-start gap-3">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border2)",
                  }}
                >
                  <img
                    src="/images/icon.png"
                    alt="Privacy Center"
                    style={{ width: 24, height: 24, borderRadius: 4 }}
                  />
                </span>
                <span
                  className="font-syne font-bold text-base"
                  style={{ color: changelogTextColor }}
                >
                  Privacy Center
                </span>
              </div>
              <div className="text-xs mb-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                {locale === "vi"
                  ? "Trung tâm bảo mật, quản lý quyền riêng tư của 2 extension"
                  : "Privacy Center for managing privacy settings of 2 extensions"}
              </div>
              <Link
                href="/privacy"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all bg-[var(--bg)] border border-[var(--border2)] hover:border-[var(--accent-border)] text-[var(--text)] hover:bg-[var(--bg3)]"
              >
                {locale === "vi" ? "Xem Privacy Center →" : "View Privacy Center →"}
              </Link>
            </div>
          </div>
          {/* End Sidebar */}
        </div>
        {/* End grid */}
      </section>
    </div>
  )
}

export default function ChangelogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangelogContent />
    </Suspense>
  )
}
