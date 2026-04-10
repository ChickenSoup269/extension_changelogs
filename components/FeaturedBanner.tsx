"use client"

import Link from "next/link"
import type { Extension } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

export default function FeaturedBanner({ ext }: { ext: Extension }) {
  const { t, locale } = useLanguage()

  return (
    <div
      className="rounded-2xl p-10 mb-12 grid gap-6 items-center overflow-hidden relative group"
      style={{
        background:
          "linear-gradient(135deg, var(--accent-glow) 0%, transparent 100%)",
        border: "1px solid var(--accent)",
        gridTemplateColumns: "1fr auto",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px var(--accent-glow)" }}
      ></div>
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full mb-4 text-white"
          style={{ background: "var(--accent)" }}
        >
          {t("common.featured").toUpperCase()}
        </div>
        <h2 className="font-syne font-bold text-3xl tracking-tight mb-3">
          {ext.name}
        </h2>
        <p
          className="text-[14px] max-w-[500px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {ext.description[locale]}
        </p>
        <div className="flex gap-3 mt-6">
          <a
            href={ext.homepage || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
            style={{ background: "var(--accent)" }}
          >
            <i className="fa-brands fa-chrome text-lg"></i>{" "}
            {t("common.free_install")}
          </a>
          <Link
            href={`/about/${ext.slug}`}
            className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{
              border: "1px solid var(--border2)",
              color: "var(--text)",
              background: "var(--bg3)",
            }}
          >
            {t("common.details")}
          </Link>
          <Link
            href="/changelog"
            className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{ border: "1px solid var(--border2)", color: "var(--text)" }}
          >
            {t("common.view_changelog")}
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-end relative z-10">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-6xl mb-2 overflow-hidden shadow-lg">
          {ext.icon.startsWith("/") ? (
            <img
              src={ext.icon}
              alt={ext.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <i
              className={`${ext.icon} text-4xl`}
              style={{ color: "var(--accent)" }}
            ></i>
          )}
        </div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          v{ext.version} • {t("common.stable")}
        </div>
        <div className="text-sm mt-1" style={{ color: "#3ecf8e" }}>
          ★ {ext.stars} • {ext.downloads}{" "}
          {t("hero.stats.downloads").toLowerCase()}
        </div>
      </div>
    </div>
  )
}
