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
    <section className="max-w-[1200px] mx-auto px-10 py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-2">
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
          className="w-full text-sm px-4 py-3 pl-11 rounded-xl outline-none transition-all duration-200"
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
          placeholder={t("extensions.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30"
          width="16"
          height="16"
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
      <div className="flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as ExtCategory | "all")}
            className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
            style={{
              background: category === cat.id ? "var(--accent)" : "transparent",
              border: `1px solid ${category === cat.id ? "var(--accent)" : "var(--border)"}`,
              color: category === cat.id ? "#fff" : "var(--muted)",
            }}
          >
            <i
              className={`${cat.icon} text-xs ${category === cat.id ? "text-white" : "text-[var(--accent)]"}`}
            ></i>
            <span className="ml-2">{cat.label[locale]}</span>
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex items-center gap-2 mb-8">
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
            className="px-3.5 py-1 rounded-full text-xs transition-all duration-200"
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
        <span className="ml-auto text-xs" style={{ color: "var(--muted2)" }}>
          {filtered.length} {t("extensions.results")}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {filtered.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20" style={{ color: "var(--muted)" }}>
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg font-syne">{t("extensions.not_found")}</p>
          <p className="text-sm mt-2">{t("extensions.not_found_sub")}</p>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-[500px] w-full rounded-2xl p-8"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "var(--bg4)", overflow: "hidden" }}
              >
                {selected.icon.startsWith("/") ? (
                  <img
                    src={selected.icon}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i
                    className={selected.icon}
                    style={{ color: "var(--accent)" }}
                  ></i>
                )}
              </div>
              <div>
                <h2 className="font-syne font-bold text-2xl tracking-tight">
                  {selected.name}
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  v{selected.version} • by {selected.author}
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--muted)" }}
            >
              {selected.description[locale]}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selected.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full"
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
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}
                onClick={() => {
                  alert(`Cài đặt ${selected.name}!`)
                  setSelected(null)
                }}
              >
                Cài đặt ngay
              </button>
              <button
                className="px-5 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  border: "1px solid var(--border2)",
                  color: "var(--text)",
                }}
                onClick={() => setSelected(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
