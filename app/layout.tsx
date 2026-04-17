import type { Metadata } from "next"
import { Outfit, Inter, DM_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ScrollToTop from "@/components/ScrollToTop"
import Background from "@/components/Background"
import { LanguageProvider } from "@/context/LanguageContext"
import { SettingsProvider } from "@/context/SettingsContext"
import StatsUpdater from "@/components/StatsUpdater"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "My Extensions - Zero",
  description:
    "Không gian lưu trữ, chia sẻ và theo dõi cập nhật các extension do chính mình phát triển.",
  icons: {
    icon: "/images/logo2.png",
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
      className={`${outfit.variable} ${inter.variable} ${dmMono.variable}`}
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
            <footer className="border-t border-[var(--border)] mt-20">
              <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <img
                    src="/images/logo2.png"
                    alt="ExtHub Logo"
                    className="h-7 md:h-8 logo-img"
                  />
                  <p className="text-[10px] md:text-xs text-[var(--muted)] mt-1 text-center md:text-left">
                    Bộ sưu tập extension cá nhân • Made with ♥ in Vietnam
                  </p>
                </div>
                <p className="text-[10px] md:text-xs text-[var(--muted2)]">
                  © 2026 My Extensions. All rights reserved.
                </p>
              </div>
            </footer>
          </LanguageProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
