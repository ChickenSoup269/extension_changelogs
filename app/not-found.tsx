"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export default function NotFound() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg2)] border border-[var(--border)] flex items-center justify-center text-2xl text-amber-400 mb-6 shadow-sm">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h1 className="text-4xl sm:text-5xl font-syne font-extrabold text-[var(--text)] mb-3 tracking-tight">
        404
      </h1>
      <h2 className="text-lg sm:text-xl font-bold text-[var(--muted)] mb-6">
        {locale === "vi" ? "Không tìm thấy trang" : "Page Not Found"}
      </h2>
      <p className="text-xs sm:text-sm text-[var(--muted2)] max-w-md mb-8">
        {locale === "vi"
          ? "Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng."
          : "The page you are looking for might have been removed, renamed, or is temporarily unavailable."}
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl text-xs font-bold transition-transform hover:scale-105"
        style={{
          background: "var(--accent)",
          color: "var(--accent-text)",
          boxShadow: "0 4px 20px var(--accent-glow)"
        }}
      >
        {locale === "vi" ? "Trở về Trang chủ" : "Return Home"}
      </Link>
    </div>
  )
}
