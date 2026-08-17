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
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
        ext.name.toLowerCase().includes(q) ||
        ext.description[locale].toLowerCase().includes(q) ||
        ext.tags.some((tg) => tg.toLowerCase().includes(q))
      return matchCat && matchStatus && matchSearch
    })
  }, [category, status, search, locale])

  return (
    <section className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 py-10 md:py-16 min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest glow-pill mb-3">
            <i className="fa-solid fa-shapes text-[9px]"></i>
            Library
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[var(--text)]">
            {t("extensions.title")}{" "}
            <span className="text-[var(--muted2)]">Extensions</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] font-medium mt-1">
            {EXTENSIONS.length} {t("extensions.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[var(--muted)]">
          <span className="px-3.5 py-1.5 rounded-xl bg-[var(--bg2)] border border-[var(--border)]">
            {filtered.length} / {EXTENSIONS.length} {t("extensions.results")}
          </span>
        </div>
      </motion.div>

      {/* Filters Container */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 sm:p-7 rounded-3xl bg-[var(--bg2)]/80 backdrop-blur-2xl border border-[var(--border2)] shadow-xl mb-10"
        style={{
          boxShadow: "0 15px 40px -15px rgba(0,0,0,0.4)"
        }}
      >
        {/* Search */}
        <div className="relative mb-6 group">
          <input
            className="w-full text-sm sm:text-base px-5 py-3.5 pl-12 pr-10 rounded-2xl outline-none transition-all duration-300 bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--accent-border)] focus:shadow-[0_0_25px_var(--accent-glow)] placeholder-[var(--muted2)]"
            placeholder={t("extensions.search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted2)] group-focus-within:text-[var(--accent-visible)] transition-colors text-sm"></i>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--muted2)] hover:text-[var(--text)] w-6 h-6 rounded-full flex items-center justify-center bg-[var(--bg3)]"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          {/* Category tabs */}
          <div className="flex-1 w-full">
             <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted2)] mb-2.5">
               {locale === "vi" ? "DANH MỤC" : "CATEGORIES"}
             </p>
             <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id as ExtCategory | "all")}
                      className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border"
                      style={{
                        background: isActive ? "var(--bg4)" : "var(--bg)",
                        borderColor: isActive ? "var(--accent-border)" : "var(--border)",
                        color: isActive ? "var(--text)" : "var(--muted)",
                        boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
                      }}
                    >
                      <i className={`${cat.icon} text-xs`} style={{ color: isActive ? "var(--accent-visible)" : undefined }}></i>
                      <span>{cat.label[locale]}</span>
                    </button>
                  )
                })}
             </div>
          </div>

          {/* Status filters */}
          <div className="w-full lg:w-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted2)] mb-2.5">
              {t("extensions.status_label")}
            </p>
            <div className="flex flex-wrap gap-2">
              {(["all", "stable", "beta", "new"] as const).map((s) => {
                const isActive = status === s
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border"
                    style={{
                      background: isActive ? "var(--bg4)" : "var(--bg)",
                      borderColor: isActive ? "var(--accent-border)" : "var(--border)",
                      color: isActive ? "var(--text)" : "var(--muted)",
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
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((ext) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
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
              className="flex flex-col items-center justify-center py-24 bg-[var(--bg2)]/40 rounded-3xl border border-[var(--border)] border-dashed text-center px-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-[var(--bg3)] flex items-center justify-center mb-4 text-2xl text-[var(--muted2)]">
                <i className="fa-solid fa-ghost"></i>
              </div>
              <p className="text-lg font-syne font-bold text-[var(--text)] mb-1">{t("extensions.not_found")}</p>
              <p className="text-xs text-[var(--muted)]">{t("extensions.not_found_sub")}</p>
              <button 
                onClick={() => { setSearch(""); setCategory("all"); setStatus("all"); }}
                className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md"
                style={{ background: "var(--accent)", color: "var(--accent-text)" }}
              >
                {locale === "vi" ? "Xoá bộ lọc" : "Clear Filters"}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(14px)",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              className="max-w-[540px] w-full rounded-3xl p-6 sm:p-8 shadow-2xl"
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border2)",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 30px 70px -15px rgba(0,0,0,0.7)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner bg-[var(--bg)] border border-[var(--border)] p-2.5"
                >
                  <img
                    src={selected.icon}
                    alt={selected.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h2 className="font-syne font-bold text-xl sm:text-2xl tracking-tight text-[var(--text)] mb-1 truncate">
                    {selected.name}
                  </h2>
                  <p className="text-xs font-bold tracking-wider uppercase text-[var(--muted2)]">
                    v{selected.version} • {selected.category} • by {selected.author}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[var(--bg3)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="bg-[var(--bg)] rounded-2xl p-5 mb-6 border border-[var(--border)]">
                 <p className="text-sm leading-relaxed text-[var(--muted)]">
                   {selected.description[locale]}
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center gap-3">
                  <i className="fa-solid fa-star text-amber-400 text-sm"></i>
                  <div>
                    <div className="text-xs font-bold text-[var(--text)]">{selected.stars} ({selected.ratingCount})</div>
                    <div className="text-[9px] font-bold uppercase text-[var(--muted2)]">Rating</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center gap-3">
                  <i className="fa-solid fa-download text-sky-400 text-sm"></i>
                  <div>
                    <div className="text-xs font-bold text-[var(--text)]">{selected.downloads}</div>
                    <div className="text-[9px] font-bold uppercase text-[var(--muted2)]">Downloads</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selected.tags.map((tg) => (
                  <span
                    key={tg}
                    className="text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider bg-[var(--bg)] border border-[var(--border)] text-[var(--muted2)]"
                  >
                    #{tg}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {selected.homepage && (
                  <a
                    href={selected.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
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
                <button
                  className="flex-1 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border border-[var(--border2)] text-[var(--text)] hover:bg-[var(--bg3)]"
                  onClick={() => setSelected(null)}
                >
                  {t("common.close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

