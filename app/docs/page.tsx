"use client"

import Link from "next/link"

import { useLanguage } from "@/context/LanguageContext"

export default function DocsPage() {
  const { t } = useLanguage()

  return (
    <section className="max-w-[1200px] mx-auto px-10 py-14 flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="font-syne font-bold text-3xl tracking-tight text-[var(--text)]">
          {t("docs.title")} <span className="text-[var(--muted2)]">{t("docs.title_sub")}</span>
        </h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          {t("docs.desc")}
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="text-sm font-medium px-6 py-2.5 rounded-xl text-[var(--bg)] transition-transform hover:scale-105 inline-block font-bold"
            style={{ background: "var(--text)" }}
          >
            {t("docs.back")}
          </Link>
        </div>
      </div>
    </section>
  )
}
