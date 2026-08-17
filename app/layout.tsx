import type { Metadata } from "next"
import { Be_Vietnam_Pro, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ScrollToTop from "@/components/ScrollToTop"
import Background from "@/components/Background"
import { LanguageProvider } from "@/context/LanguageContext"
import { SettingsProvider } from "@/context/SettingsContext"
import StatsUpdater from "@/components/StatsUpdater"
import Link from "next/link"

const primaryFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-primary",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const secondaryFont = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-secondary",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ExtHub - Browser Extensions Hub",
  description:
    "Không gian lưu trữ, chia sẻ và theo dõi cập nhật các extension do chính mình phát triển.",
  icons: {
    icon: "/images/logo2.png",
  },
  verification: {
    google: "6hjg9nrYEW8TanxFpGTFrQmco_-AR3AXBNCMWPxXMcY",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${primaryFont.variable} ${secondaryFont.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <SettingsProvider>
          <LanguageProvider>
            <StatsUpdater />
            <Background />
            <Navbar />
            <main>{children}</main>
            <ScrollToTop />
            <footer className="border-t border-[var(--border)] mt-24 bg-[var(--bg2)]/60 backdrop-blur-xl">
              <div className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/logo2.png"
                      alt="ExtHub Logo"
                      className="h-7 md:h-8 logo-img"
                    />
                    <span className="font-syne font-bold text-base text-[var(--text)]">
                      Ext<span style={{ color: "var(--accent-visible)" }}>Hub</span>
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1 text-center md:text-left">
                    Bộ sưu tập extension cá nhân • Made with ♥ in Vietnam
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[var(--muted)]">
                  <Link href="/extensions" className="hover:text-[var(--text)] transition-colors">
                    Extensions
                  </Link>
                  <Link href="/about" className="hover:text-[var(--text)] transition-colors">
                    About
                  </Link>
                  <Link href="/changelog" className="hover:text-[var(--text)] transition-colors">
                    Changelog
                  </Link>
                  <Link href="/docs" className="hover:text-[var(--text)] transition-colors">
                    Docs
                  </Link>
                  <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">
                    Privacy
                  </Link>
                </div>

                <p className="text-[11px] font-medium text-[var(--muted2)]">
                  © 2026 ExtHub. All rights reserved.
                </p>
              </div>
            </footer>
          </LanguageProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}

