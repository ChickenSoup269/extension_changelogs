"use client"

import Link from "next/link"
import type { Extension } from "@/lib/data"
import { useLanguage } from "@/context/LanguageContext"

export default function FeaturedBanner({ ext }: { ext: Extension }) {
  const { t, locale } = useLanguage()

  return (
    <div
      className="rounded-2xl p-10 mb-12 grid gap-6 items-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(39, 174, 96, 0.05) 50%, rgba(34, 197, 94, 0.03) 100%)",
        border: "1px solid var(--accent)",
        gridTemplateColumns: "1fr auto",
      }}
    >
      <div>
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full mb-4 text-white"
          style={{ background: "var(--accent)" }}
        >
          ⚡ {t("common.featured").toUpperCase()}
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
          <button
            className="text-sm font-medium px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--accent)" }}
            onClick={() => alert(`${t("common.installing")} ${ext.name}...`)}
          >
            {t("common.free_install")}
          </button>
          <Link
            href="/changelog"
            className="text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            style={{ border: "1px solid var(--border2)", color: "var(--text)" }}
          >
            {t("common.view_changelog")}
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-6xl mb-2 overflow-hidden shadow-lg">
          {ext.icon.startsWith("/") ? (
            <img
              src={ext.icon}
              alt={ext.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{ext.icon}</span>
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
