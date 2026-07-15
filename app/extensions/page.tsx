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
import { motion, AnimatePresence } from "framer-motion"

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
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="font-syne font-bold text-4xl md:text-5xl tracking-tight mb-2 text-[var(--text)]">
            {t("extensions.title")}{" "}
            <span className="text-[var(--muted2)]">Extensions</span>
          </h1>
          <p className="text-[var(--muted)] font-medium">
            {EXTENSIONS.length} {t("extensions.subtitle")}
          </p>
        </div>
      </motion.div>

      {/* Filters Container */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 md:p-8 rounded-[2rem] bg-[var(--bg2)]/60 backdrop-blur-xl border border-[var(--border)] shadow-sm mb-10"
      >
        {/* Search */}
        <div className="relative mb-8 group">
          <input
            className="w-full text-base px-5 py-4 pl-12 rounded-2xl outline-none transition-all duration-300 bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--text)] focus:shadow-[0_0_20px_var(--accent-glow)]"
            placeholder={t("extensions.search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-[var(--text)] transition-colors"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          {/* Category tabs */}
          <div className="flex-1">
             <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted2)] mb-3">Categories</p>
             <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id as ExtCategory | "all")}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${
                        isActive 
                          ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-md" 
                          : "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)] hover:bg-[var(--bg3)] hover:text-[var(--text)]"
                      }`}
                    >
                      <i className={`${cat.icon} ${isActive ? "" : "opacity-70"}`}></i>
                      <span>{cat.label[locale]}</span>
                    </button>
                  )
                })}
             </div>
          </div>

          {/* Status filters */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted2)] mb-3">{t("extensions.status_label")}</p>
            <div className="flex flex-wrap gap-2">
              {(["all", "stable", "beta", "new"] as const).map((s) => {
                const isActive = status === s
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                      isActive 
                        ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)] shadow-md" 
                        : "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)] hover:bg-[var(--bg3)] hover:text-[var(--text)]"
                    }`}
                  >
                    {s === "all"
                      ? t("extensions.all")
                      : s === "stable"
                        ? t("common.stable")
                        : s === "beta"
                          ? t("common.beta")
                          : t("common.new")}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="font-syne font-bold text-xl text-[var(--text)]">Results</h2>
        <span className="text-xs font-bold text-[var(--muted)] bg-[var(--bg2)] px-3 py-1.5 rounded-full border border-[var(--border)]">
          {filtered.length} {t("extensions.results")}
        </span>
      </div>

      {/* Grid */}
      <motion.div layout className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((ext) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={ext.id}
                >
                  <ExtensionCard ext={ext} onClick={setSelected} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 bg-[var(--bg2)]/30 rounded-[2rem] border border-[var(--border)] border-dashed"
            >
              <i className="fa-solid fa-ghost text-5xl mb-6 text-[var(--border2)]"></i>
              <p className="text-xl font-syne font-bold text-[var(--text)] mb-2">{t("extensions.not_found")}</p>
              <p className="text-sm text-[var(--muted)]">{t("extensions.not_found_sub")}</p>
              <button 
                onClick={() => { setSearch(""); setCategory("all"); setStatus("all"); }}
                className="mt-6 px-6 py-2.5 bg-[var(--text)] text-[var(--bg)] font-bold rounded-full text-xs hover:scale-105 transition-transform"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="max-w-[500px] w-full rounded-[2rem] p-8 shadow-2xl"
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border2)",
                maxHeight: "90vh",
                overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-inner"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  {selected.icon.startsWith("/") ? (
                    <img
                      src={selected.icon}
                      alt={selected.name}
                      className="w-full h-full object-contain p-2.5"
                    />
                  ) : (
                    <i className={`${selected.icon} text-2xl text-[var(--text)]`}></i>
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h2 className="font-syne font-bold text-2xl tracking-tight text-[var(--text)] mb-1 truncate">
                    {selected.name}
                  </h2>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--muted2)]">
                    v{selected.version} • by {selected.author}
                  </p>
                </div>
              </div>

              <div className="bg-[var(--bg)] rounded-2xl p-5 mb-8 border border-[var(--border)]">
                 <p className="text-sm leading-relaxed text-[var(--muted)]">
                   {selected.description[locale]}
                 </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]"
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
                  className="flex-[2] py-4 rounded-xl text-sm font-bold text-[var(--bg)] transition-all hover:-translate-y-1 hover:shadow-lg flex justify-center items-center gap-2 bg-[var(--text)]"
                >
                  <i className="fa-brands fa-chrome text-lg"></i>{" "}
                  {t("common.install_now").toUpperCase()}
                </a>
                <button
                  className="flex-1 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-200 border border-[var(--border2)] text-[var(--text)] hover:bg-[var(--bg3)]"
                  onClick={() => setSelected(null)}
                >
                  {locale === "vi" ? "ĐÓNG" : "CLOSE"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
