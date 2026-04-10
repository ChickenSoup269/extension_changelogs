"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"
import { useState } from "react"
import SettingsModal from "./SettingsModal"

export default function Navbar() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useLanguage()
  const [showSettings, setShowSettings] = useState(false)

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/extensions", label: t("nav.extensions") },
    { href: "/about/zero-bookmark-manager", label: "About" },
    { href: "/changelog", label: t("nav.changelog") },
    { href: "/docs", label: t("nav.docs") },
  ]

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-10 h-[60px]"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link href="/" className="flex-shrink-0">
        <img
          src="/images/logo2.png"
          alt="ExtHub Logo"
          className="h-10 logo-img"
        />
      </Link>

      <div className="flex items-center gap-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-lg text-sm transition-all duration-200"
              style={{
                color: active ? "var(--text)" : "var(--muted)",
                background: active ? "var(--bg4)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSettings(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg4)]"
          style={{ color: "var(--muted)" }}
          title="Cài đặt"
        >
          <i className="fa fa-cog"></i>
        </button>
        <button
          title="Change language"
          onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2"
          style={{
            background: "var(--bg2)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          {locale === "vi" ? (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                alt="VN"
                className="w-5 h-[14px] rounded-[2px] object-cover"
              />
              <span>VI</span>
            </>
          ) : (
            <>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                alt="EN"
                className="w-5 h-[14px] rounded-[2px] object-cover"
              />
              <span>EN</span>
            </>
          )}
        </button>
        <span
          className="text-[10px] font-semibold px-2 py-1 rounded-full tracking-wide"
          style={{
            background: "var(--accent-glow)",
            border: "1px solid var(--accent)",
            color: "var(--accent2)",
          }}
        >
          v1.0.0 {t("nav.new")}
        </span>
        <Link
          href="/extensions"
          className="text-sm font-medium px-4 py-1.5 rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
          style={{ background: "var(--accent)" }}
        >
          {t("nav.explore")}
        </Link>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </nav>
  )
}
