"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"
import { useState, useEffect } from "react"
import SettingsModal from "./SettingsModal"
import { CHANGELOG } from "@/lib/data"

export default function Navbar() {
  const pathname = usePathname()
  const { t, locale, setLocale } = useLanguage()
  const [showSettings, setShowSettings] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const latestVersion = CHANGELOG.reduce((max, item) => {
    return item.version > max ? item.version : max
  }, "0.0.0")

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/extensions", label: t("nav.extensions") },
    { href: "/about", label: t("nav.about") },
    { href: "/changelog", label: t("nav.changelog") },
    { href: "/docs", label: t("nav.docs") },
    { href: "/privacy", label: t("nav.privacy") },
  ]

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 h-[60px]"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-target md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg4)]"
          style={{ color: "var(--text)" }}
        >
          <i className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
        <Link href="/" className="cursor-target flex-shrink-0">
          <img
            src="/images/logo2.png"
            alt="ExtHub Logo"
            className="h-8 md:h-10 logo-img"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-target px-4 py-1.5 rounded-lg text-sm transition-all duration-200"
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

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => setShowSettings(true)}
          className="cursor-target group flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:bg-[var(--bg3)]"
          style={{
            background: "var(--bg2)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
          title={locale === "vi" ? "Cài đặt" : "Settings"}
        >
          <i className="fa-solid fa-sliders group-hover:scale-110 transition-transform duration-300"></i>
        </button>
        
        <button
          title={locale === "vi" ? "Đổi ngôn ngữ" : "Change language"}
          onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
          className="cursor-target text-[11px] md:text-xs font-bold px-3 md:px-4 h-9 rounded-xl transition-all duration-300 flex items-center tracking-wide hover:bg-[var(--bg3)]"
          style={{
            background: "var(--bg2)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          {locale === "vi" ? "Tiếng Việt" : "English"}
        </button>

        <span
          className="hidden sm:inline-block text-[10px] font-semibold px-2 py-1 rounded-full tracking-wide"
          style={{
            background: "var(--accent-glow)",
            border: "1px solid var(--accent)",
            color: "var(--accent-visible)",
          }}
        >
          v{latestVersion} {t("nav.new")}
        </span>

        <Link
          href="/extensions"
          className="cursor-target hidden sm:flex text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-px items-center"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          {t("nav.explore")}
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 top-[60px] z-40 bg-black/75 backdrop-blur-md md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-[60px] left-0 bottom-0 w-[280px] z-50 transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "linear-gradient(180deg, #0b0c0e 0%, #070809 100%)",
          borderRight: "1px solid var(--border2)",
          boxShadow: "24px 0 60px rgba(0,0,0,0.45)",
        }}
      >
        <div className="flex flex-col p-4 gap-2">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-between"
                style={{
                  color: active ? "var(--accent)" : "var(--text)",
                  background: active ? "var(--accent-glow)" : "var(--bg3)",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                {link.label}
                {active && <i className="fa fa-chevron-right text-xs opacity-50"></i>}
              </Link>
            )
          })}
          
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <Link
              href="/extensions"
              className="w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl shadow-lg"
              style={{ background: "var(--accent)", color: "var(--accent-text)" }}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa fa-rocket"></i>
              {t("nav.explore").toUpperCase()}
            </Link>
          </div>

          <div className="mt-auto pb-4 text-center">
            <p className="text-[10px] text-[var(--muted2)] font-bold tracking-[0.2em] uppercase">
              ExtHub v{latestVersion} • 2026
            </p>
          </div>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </nav>
  )
}
