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
      className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 h-[68px] transition-colors duration-300"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-target md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg3)] text-[var(--text)] border border-[var(--border)]"
          aria-label="Toggle menu"
        >
          <i className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
        </button>
        <Link href="/" className="cursor-target flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <img
              src="/images/logo2.png"
              alt="ExtHub Logo"
              className="h-8 md:h-9 logo-img group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="font-syne font-bold text-lg tracking-tight text-[var(--text)] hidden sm:inline-block">
            Ext<span style={{ color: "var(--accent-visible)" }}>Hub</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg2)]/60 border border-[var(--border)] backdrop-blur-md">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href) ?? false
          return (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-target relative px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200"
              style={{
                color: active ? "var(--text)" : "var(--muted)",
                background: active ? "var(--bg4)" : "transparent",
                boxShadow: active ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
              }}
            >
              {link.label}
              {active && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full"
                  style={{ background: "var(--accent-visible)" }}
                />
              )}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={() => setShowSettings(true)}
          className="cursor-target group flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:bg-[var(--bg3)] border border-[var(--border)] bg-[var(--bg2)]"
          style={{
            color: "var(--text)",
          }}
          title={locale === "vi" ? "Cài đặt giao diện" : "Interface Settings"}
        >
          <i className="fa-solid fa-sliders text-xs group-hover:rotate-90 transition-transform duration-300"></i>
        </button>
        
        <button
          title={locale === "vi" ? "Chuyển sang English" : "Switch to Tiếng Việt"}
          onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
          className="cursor-target text-[11px] font-bold px-3 h-9 rounded-xl transition-all duration-300 flex items-center tracking-wide hover:bg-[var(--bg3)] border border-[var(--border)] bg-[var(--bg2)]"
          style={{
            color: "var(--text)",
          }}
        >
          {locale === "vi" ? "VI" : "EN"}
        </button>

        <span
          className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl tracking-wide glow-pill"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-visible)" }}></span>
          v{latestVersion}
        </span>

        <Link
          href="/extensions"
          className="cursor-target hidden sm:flex text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] items-center gap-2 shadow-sm"
          style={{ 
            background: "var(--accent)", 
            color: "var(--accent-text)",
            boxShadow: "0 4px 16px var(--accent-glow)"
          }}
        >
          <i className="fa-solid fa-compass text-xs"></i>
          {t("nav.explore")}
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 top-[68px] z-40 bg-black/80 backdrop-blur-md md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-[68px] left-0 bottom-0 w-[290px] z-50 transition-transform duration-300 md:hidden flex flex-col`}
        style={{
          background: "var(--bg2)",
          borderRight: "1px solid var(--border2)",
          boxShadow: "24px 0 60px rgba(0,0,0,0.5)",
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex flex-col p-5 gap-2 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted2)] px-3 mb-1">Navigation</p>
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href) ?? false
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between"
                style={{
                  color: active ? "var(--text)" : "var(--muted)",
                  background: active ? "var(--bg4)" : "var(--bg)",
                  border: `1px solid ${active ? "var(--accent-border)" : "var(--border)"}`,
                }}
              >
                <span>{link.label}</span>
                {active && <i className="fa fa-chevron-right text-xs" style={{ color: "var(--accent-visible)" }}></i>}
              </Link>
            )
          })}
          
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <Link
              href="/extensions"
              className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-xs rounded-xl shadow-lg"
              style={{ 
                background: "var(--accent)", 
                color: "var(--accent-text)",
                boxShadow: "0 6px 20px var(--accent-glow)"
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-solid fa-compass"></i>
              {t("nav.explore").toUpperCase()}
            </Link>
          </div>

          <div className="mt-auto pt-6 text-center">
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

