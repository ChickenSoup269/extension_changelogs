"use client"

import { useState, Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CHANGELOG, type ChangeType } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

type TypeConfigValue = { label: string; bg: string; color: string }

const TYPE_CONFIG: { [K in ChangeType]: TypeConfigValue } = {
  feat: { label: "FEAT", bg: "rgba(124,106,247,0.15)", color: "#a594ff" },
  fix: { label: "FIX", bg: "rgba(62,207,142,0.12)", color: "#3ecf8e" },
  perf: { label: "PERF", bg: "rgba(96,165,250,0.12)", color: "#60a5fa" },
  break: { label: "BREAK", bg: "rgba(239,68,68,0.12)", color: "#ef4444" },
  docs: { label: "DOCS", bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
}

const RELEASE_TYPE_LABELS = {
  major: { label: "Major", color: "var(--accent2)" },
  minor: { label: "Minor", color: "#3ecf8e" },
  patch: { label: "Patch", color: "var(--muted)" },
}

function ChangelogContent() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState<ChangeType | "all">(
    (searchParams.get("type") as ChangeType) || "all",
  )
  const [extFilter, setExtFilter] = useState<string>(
    searchParams.get("ext") || "all",
  )
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  )

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

  const currentMonthStr = locale === "vi" ? "Tháng 4 2026" : "Apr"
  const thisMonthChanges = CHANGELOG.filter(
    (c) =>
      c.date[locale]?.includes(currentMonthStr) ||
      c.date["en"]?.includes("Apr"),
  )

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

  const sourceProjects = [
    {
      name: "Zero Start Page",
      repo: "ChickenSoup269/Zero-Start-Page",
      href: "https://github.com/ChickenSoup269/Zero-Start-Page",
      releasesHref:
        "https://github.com/ChickenSoup269/Zero-Start-Page/releases",
      icon: "fa-solid fa-rocket",
    },
    {
      name: "Zero Bookmark Manager",
      repo: "ChickenSoup269/Zero-Bookmark-Manager",
      href: "https://github.com/ChickenSoup269/Zero-Bookmark-Manager",
      releasesHref:
        "https://github.com/ChickenSoup269/Zero-Bookmark-Manager/releases",
      icon: "fa-solid fa-lock",
    },
  ]

  // Detect theme (light/dark)
  const isLightTheme =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  const changelogTextColor = isLightTheme ? "#111" : "var(--text)"
  return (
    <section className="max-w-[1200px] mx-auto px-10 py-14">
      <div className="grid gap-10" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Main */}
        <div>
          <div className="mb-8">
            <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-2">
              Change<span className="gradient-text">log</span>
            </h1>
            <p style={{ color: "var(--muted)" }}>{t("changelog.subtitle")}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(["all", "feat", "fix", "perf", "break", "docs"] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type)
                    setCurrentPage(1)
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                  style={{
                    background: filter === type ? "var(--bg4)" : "transparent",
                    border: `1px solid ${filter === type ? "var(--border2)" : "var(--border)"}`,
                    color:
                      filter === type ? changelogTextColor : "var(--muted)",
                  }}
                >
                  {type === "all" ? "All" : type.toUpperCase()}
                </button>
              ),
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {extensions.map((e) => (
              <button
                key={e}
                onClick={() => {
                  setExtFilter(e)
                  setCurrentPage(1)
                }}
                className="px-3.5 py-1.5 rounded-full text-xs transition-all duration-200"
                style={{
                  background:
                    extFilter === e ? "var(--accent-glow)" : "transparent",
                  border: `1px solid ${extFilter === e ? "var(--accent)" : "var(--border)"}`,
                  color: extFilter === e ? "var(--accent2)" : "var(--muted)",
                }}
              >
                {e === "all" ? t("extensions.all") : e}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="flex flex-col gap-12">
              {grouped.map((group) => (
                <div key={group.extension} className="relative">
                  <h2
                    className="text-xl font-bold mb-6 flex items-center gap-2"
                    style={{ color: changelogTextColor }}
                  >
                    <i
                      className={`${group.items[0]?.extensionIcon} text-lg text-[var(--accent)]`}
                    ></i>
                    {group.extension}
                  </h2>
                  <div className="relative pl-5">
                    <div
                      className="absolute left-0 top-0 bottom-0 w-px"
                      style={{
                        background:
                          "linear-gradient(180deg, var(--accent), var(--border) 60%, transparent)",
                      }}
                    />

                    <div className="flex flex-col gap-8">
                      {group.items.map((item, i) => {
                        const rel = RELEASE_TYPE_LABELS[item.releaseType]
                        return (
                          <div
                            key={i}
                            className="grid gap-4"
                            style={{ gridTemplateColumns: "1fr" }}
                          >
                            <div
                              className="rounded-xl p-5 relative"
                              style={{
                                background: "var(--bg2)",
                                border: "1px solid var(--border)",
                              }}
                            >
                              <div
                                className="absolute -left-[27px] top-[24px] w-3 h-3 rounded-full z-10"
                                style={{
                                  background:
                                    item.releaseType === "major"
                                      ? "var(--accent)"
                                      : "var(--bg)",
                                  border: `2px solid ${
                                    item.releaseType === "major"
                                      ? "var(--accent)"
                                      : item.releaseType === "minor"
                                        ? "#3ecf8e"
                                        : "var(--muted2)"
                                  }`,
                                }}
                              />
                              <div className="flex items-center flex-wrap gap-2.5 mb-4">
                                <span
                                  className="font-mono text-sm font-medium"
                                  style={{
                                    color: "var(--accent2)",
                                    fontFamily: "var(--font-dm-mono)",
                                  }}
                                >
                                  {item.version}
                                </span>
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: rel.color }}
                                >
                                  {rel.label}
                                </span>
                                <span
                                  className="ml-auto text-xs"
                                  style={{ color: "var(--muted2)" }}
                                >
                                  {item.date[locale]}
                                </span>
                              </div>

                              <ul className="space-y-2">
                                {item.changes
                                  .filter(
                                    (c) =>
                                      filter === "all" || c.type === filter,
                                  )
                                  .map((change, j) => {
                                    const cfg = TYPE_CONFIG[change.type]
                                    return (
                                      <li
                                        key={j}
                                        className="flex items-baseline gap-2.5 text-sm"
                                      >
                                        <span
                                          className="text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0"
                                          style={{
                                            background: cfg.bg,
                                            color: cfg.color,
                                          }}
                                        >
                                          {cfg.label}
                                        </span>
                                        <span
                                          style={{ color: changelogTextColor }}
                                        >
                                          {change.text[locale]}
                                        </span>
                                      </li>
                                    )
                                  })}
                              </ul>
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
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
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
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 rounded-lg text-sm font-bold transition-all"
                        style={{
                          background:
                            currentPage === page
                              ? "var(--accent-glow)"
                              : "transparent",
                          border: `1px solid ${
                            currentPage === page
                              ? "var(--accent)"
                              : "transparent"
                          }`,
                          color:
                            currentPage === page
                              ? "var(--accent2)"
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
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                  style={{
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
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
        <div className="space-y-4" style={{ alignSelf: "start" }}>
          {/* Stats Card */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="font-syne font-semibold text-sm mb-4">
              {t("changelog.sidebar.stats")}
            </h3>
            {[
              {
                label: t("changelog.sidebar.total_patch"),
                value: totalPatches,
                color: "var(--accent2)",
              },
              {
                label: t("changelog.sidebar.new_features"),
                value: newFeatures,
                color: "#3ecf8e",
              },
              {
                label: t("changelog.sidebar.bug_fixes"),
                value: bugFixes,
                color: changelogTextColor,
              },
              {
                label: t("changelog.sidebar.breaking"),
                value: breakingChanges,
                color: "#ef4444",
              },
              {
                label: t("changelog.sidebar.updated"),
                value: extensionsUpdatedCount,
                color: changelogTextColor,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between py-2.5 text-sm"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span style={{ color: "var(--muted)" }}>{s.label}</span>
                <span className="font-semibold" style={{ color: s.color }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Latest Versions Card */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
            }}
          >
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
                    className={`${c.extensionIcon} text-xs text-[var(--accent)] w-4 text-center shrink-0`}
                  ></i>
                  <span
                    className="truncate"
                    style={{ color: "var(--muted)" }}
                    title={c.extension}
                  >
                    {c.extension}
                  </span>
                </span>
                <span
                  className="font-mono text-xs font-medium shrink-0"
                  style={{
                    color: "var(--accent2)",
                    fontFamily: "var(--font-dm-mono)",
                  }}
                >
                  {c.version}
                </span>
              </div>
            ))}
          </div>

          {/* Source Code Card */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="font-syne font-semibold text-sm mb-4 flex items-center gap-2">
              <i className="fa-brands fa-github text-[var(--accent)] text-base" />
              {(() => {
                const label =
                  t && typeof t === "function"
                    ? t("changelog.sidebar.source_code")
                    : null
                if (label && label !== "changelog.sidebar.source_code")
                  return label
                if (locale === "vi") return "Mã nguồn"
                return "Source Code"
              })()}
            </h3>

            {sourceProjects
              .filter((p) => p.name !== "Pricy Extension")
              .map((project) => (
                <a
                  key={project.repo}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 py-3 group transition-all duration-200"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--accent-glow)",
                      border: "1px solid var(--accent)",
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
                    <p
                      className="text-sm font-medium truncate transition-colors duration-200 group-hover:text-[var(--accent2)]"
                      style={{ color: changelogTextColor }}
                    >
                      {project.name}
                    </p>
                    <p
                      className="text-xs truncate mt-0.5"
                      style={{ color: "var(--muted2)" }}
                    >
                      {project.repo}
                    </p>
                  </div>
                  <i
                    className="fa-solid fa-arrow-up-right-from-square text-xs flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--accent2)" }}
                  />
                </a>
              ))}

            <div className="mt-3 flex flex-col gap-2">
              {sourceProjects
                .filter((p) => p.name !== "Pricy Extension")
                .map((project) => (
                  <a
                    key={project.releasesHref}
                    href={project.releasesHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:brightness-110"
                    style={{
                      background: "var(--accent-glow)",
                      border: "1px solid var(--border2)",
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>
                      {project.name}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--accent2)" }}
                    >
                      <i className="fa-solid fa-tag text-[10px]" />
                      {locale === "vi" ? "Xem releases" : "View releases"}
                    </span>
                  </a>
                ))}
            </div>
          </div>

          {/* Pricy Extension Card */}
          <div
            className="rounded-xl p-5 flex flex-col items-start gap-3"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--accent-glow)",
                  border: "1px solid var(--accent)",
                }}
              >
                <img
                  src="/images/privacy_icon.png"
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
            <div className="text-xs mb-2" style={{ color: "var(--muted)" }}>
              {locale === "vi"
                ? "Trung tâm bảo mật, quản lý quyền riêng tư của 2 extension"
                : "Privacy Center for managing privacy settings of 2 extensions"}
            </div>
            <a
              href="https://privacy-extension-bookmark-2-0.vercel.app/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: "var(--accent-glow)",
                border: "1px solid var(--accent2)",
                color: "var(--accent2)",
              }}
            >
              {locale === "vi" ? "Xem Privacy Center" : "View Privacy Center"}
            </a>
          </div>
          <div style={{ color: "var(--muted)" }}></div>
        </div>{" "}
        {/* End Sidebar */}
      </div>{" "}
      {/* End grid */}
    </section>
  )
}

export default ChangelogContent
