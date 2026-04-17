"use client"

import { useState, useMemo } from "react"
import ExtensionCard from "@/components/ExtensionCard"
import {
  EXTENSIONS,
  CATEGORIES,
  type Extension,
  type ExtCategory,
  type ExtStatus,
} from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

export default function ExtensionsPage() {
  const { t, locale } = useLanguage()
  const [category, setCategory] = useState<ExtCategory | "all">("all")
  const [status, setStatus] = useState<ExtStatus | "all">("all")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Extension | null>(null)

  const filtered = useMemo(() => {
    return EXTENSIONS.filter((ext) => {
      const matchCat = category === "all" || ext.category === category
      const matchStatus = status === "all" || ext.status === status
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        ext.name.toLowerCase().includes(q) ||
        ext.description[locale].toLowerCase().includes(q) ||
        ext.tags.some((t) => t.includes(q))
      return matchCat && matchStatus && matchSearch
    })
  }, [category, status, search, locale])

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight mb-2">
          {t("extensions.title")}{" "}
          <span className="gradient-text">Extensions</span>
        </h1>
        <p style={{ color: "var(--muted)" }}>
          {EXTENSIONS.length} {t("extensions.subtitle")}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          className="w-full text-sm px-4 py-3.5 pl-11 rounded-xl outline-none transition-all duration-200"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
          placeholder={t("extensions.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as ExtCategory | "all")}
            className="px-4 py-2 rounded-xl text-xs md:text-sm transition-all duration-200 flex items-center gap-2"
            style={{
              background: category === cat.id ? "var(--accent)" : "var(--bg2)",
              border: `1px solid ${category === cat.id ? "var(--accent)" : "var(--border)"}`,
              color: category === cat.id ? "#fff" : "var(--muted)",
            }}
          >
            <i className={`${cat.icon} ${category === cat.id ? "text-white" : "text-[var(--accent)]"}`}></i>
            <span>{cat.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            {t("extensions.status_label")}
          </span>
          {(["all", "stable", "beta", "new"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="px-3.5 py-1.5 rounded-full text-xs transition-all duration-200"
              style={{
                background: status === s ? "var(--bg4)" : "transparent",
                border: `1px solid ${status === s ? "var(--border2)" : "var(--border)"}`,
                color: status === s ? "var(--text)" : "var(--muted)",
              }}
            >
              {s === "all"
                ? t("extensions.all")
                : s === "stable"
                  ? t("common.stable")
                  : s === "beta"
                    ? t("common.beta")
                    : t("common.new")}
            </button>
          ))}
        </div>
        <span className="sm:ml-auto text-xs" style={{ color: "var(--muted2)" }}>
          {filtered.length} {t("extensions.results")}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filtered.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20" style={{ color: "var(--muted)" }}>
          <div className="text-4xl mb-4 opacity-20">
            <i className="fas fa-search"></i>
          </div>
          <p className="text-lg font-syne">{t("extensions.not_found")}</p>
          <p className="text-sm mt-2">{t("extensions.not_found_sub")}</p>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-[500px] w-full rounded-3xl p-6 md:p-8 animate-fade-up"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border2)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "var(--bg4)", border: "1px solid var(--border)" }}
              >
                {selected.icon.startsWith("/") ? (
                  <img
                    src={selected.icon}
                    alt={selected.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <i
                    className={selected.icon}
                    style={{ color: "var(--accent)" }}
                  ></i>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="font-syne font-bold text-2xl tracking-tight truncate">
                  {selected.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  v{selected.version} • by {selected.author}
                </p>
              </div>
            </div>
            <p
              className="text-[15px] leading-relaxed mb-6"
              style={{ color: "var(--muted)" }}
            >
              {selected.description[locale]}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-lg"
                  style={{
                    background: "var(--bg4)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={selected.homepage || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.02] flex justify-center items-center gap-2"
                style={{ background: "var(--accent)" }}
              >
                <i className="fa-brands fa-chrome text-lg"></i>{" "}
                {t("common.install_now").toUpperCase()}
              </a>
              <button
                className="flex-1 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 border border-[var(--border2)] hover:bg-[var(--bg3)]"
                onClick={() => setSelected(null)}
              >
                {locale === "vi" ? "ĐÓNG" : "CLOSE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
