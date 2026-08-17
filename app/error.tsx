"use client"

import { useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { locale } = useLanguage()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center text-2xl text-rose-500 mb-6 shadow-sm">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>
      <h1 className="text-3xl sm:text-4xl font-syne font-extrabold text-[var(--text)] mb-3 tracking-tight">
        {locale === "vi" ? "Đã có lỗi xảy ra" : "Something went wrong"}
      </h1>
      <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mb-8">
        {error.message || (locale === "vi" ? "Vui lòng thử lại sau giây lát." : "Please try again shortly.")}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-2xl text-xs font-bold transition-transform hover:scale-105"
        style={{
          background: "var(--accent)",
          color: "var(--accent-text)",
          boxShadow: "0 4px 20px var(--accent-glow)"
        }}
      >
        {locale === "vi" ? "Thử lại" : "Try again"}
      </button>
    </div>
  )
}
