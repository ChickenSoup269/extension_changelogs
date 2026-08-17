"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import { useState } from "react"

export default function DocsPage() {
  const { t, locale } = useLanguage()
  const [activeTab, setActiveTab] = useState<"install" | "permissions" | "faq">("install")

  const faqs = [
    {
      q: locale === "vi" ? "Các extension của ExtHub có an toàn và miễn phí không?" : "Are ExtHub extensions safe and free?",
      a: locale === "vi" 
        ? "100% miễn phí và an toàn. Mọi dữ liệu như bookmarks hay thiết lập cá nhân đều được lưu trữ trực tiếp trên thiết bị của bạn (Local Storage) hoặc đồng bộ trực tiếp qua Google Drive cá nhân của bạn mà không thông qua bất kỳ server trung gian nào."
        : "100% free and secure. All user data like bookmarks and personal configurations are stored locally on your device or synced directly to your private Google Drive without any intermediary server."
    },
    {
      q: locale === "vi" ? "Làm cách nào để đồng bộ dữ liệu giữa các máy tính?" : "How do I sync data across multiple computers?",
      a: locale === "vi"
        ? "Zero Bookmark Manager tích hợp tính năng đồng bộ thông qua Google Drive API (OAuth2) hoặc xuất/nhập tệp JSON sao lưu chỉ với một cú click chuột."
        : "Zero Bookmark Manager supports direct cloud sync via Google Drive API (OAuth2) or 1-click JSON backup export and import."
    },
    {
      q: locale === "vi" ? "Làm sao để đặt Zero Startpage làm trang New Tab mặc định?" : "How do I set Zero Startpage as my default New Tab?",
      a: locale === "vi"
        ? "Sau khi cài đặt từ Chrome Web Store, mỗi khi bạn mở một thẻ mới (Ctrl + T hoặc Cmd + T), Zero Startpage sẽ tự động hiển thị giao diện tùy biến tuyệt đẹp."
        : "Once installed from the Chrome Web Store, opening a new tab (Ctrl + T or Cmd + T) will automatically render the customizable Zero Startpage dashboard."
    }
  ]

  const permissions = [
    {
      name: "Bookmarks",
      reason: locale === "vi" ? "Truy cập để hiển thị, sắp xếp, tìm kiếm và xóa bookmark trùng lặp." : "Required to display, organize, search, and cleanup duplicate bookmarks.",
      badge: "Essential"
    },
    {
      name: "Storage",
      reason: locale === "vi" ? "Lưu trữ cấu hình giao diện, widget và tùy chọn cá nhân hóa cục bộ." : "Stores UI settings, widgets, and user preferences locally.",
      badge: "Essential"
    },
    {
      name: "Side Panel",
      reason: locale === "vi" ? "Mở bảng quản lý nhanh dấu trang ở cạnh bên mà không gián đoạn trang web đang xem." : "Opens quick bookmark manager in Chrome side panel without page reload.",
      badge: "Feature"
    },
    {
      name: "Google Drive OAuth2",
      reason: locale === "vi" ? "Tùy chọn: Đồng bộ bản sao lưu cài đặt lên tài khoản Google Drive cá nhân." : "Optional: Sync backup configurations directly to your Google Drive.",
      badge: "Optional"
    }
  ]

  return (
    <section className="max-w-[1140px] mx-auto px-6 sm:px-8 md:px-12 py-12 md:py-20 min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest glow-pill mb-4">
          <i className="fa-solid fa-book-open text-[9px]"></i>
          Documentation Hub
        </div>
        <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[var(--text)] mb-4">
          {locale === "vi" ? "Trung Tâm Tài Liệu" : "Documentation & Guides"}
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
          {locale === "vi" 
            ? "Hướng dẫn cài đặt, cấu hình tính năng, giải thích quyền hạn và câu hỏi thường gặp về các tiện ích trong hệ sinh thái ExtHub."
            : "Everything you need to know about installing, configuring, and optimizing your ExtHub extensions."}
        </p>
      </motion.div>

      {/* Segmented Navigation Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg2)] border border-[var(--border)] gap-1.5 shadow-sm">
          {[
            { id: "install" as const, label: locale === "vi" ? "Cài đặt & Bắt đầu" : "Installation", icon: "fa-download" },
            { id: "permissions" as const, label: locale === "vi" ? "Quyền hạn & Bảo mật" : "Permissions", icon: "fa-shield-halved" },
            { id: "faq" as const, label: "FAQs", icon: "fa-circle-question" },
          ].map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
                style={{
                  background: active ? "var(--bg4)" : "transparent",
                  color: active ? "var(--text)" : "var(--muted)",
                  boxShadow: active ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
                  border: `1px solid ${active ? "var(--accent-border)" : "transparent"}`
                }}
              >
                <i className={`fa-solid ${tab.icon} text-xs`} style={{ color: active ? "var(--accent-visible)" : undefined }}></i>
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* TAB CONTENTS */}
      <div className="space-y-8">
        {activeTab === "install" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-5 text-lg" style={{ color: "var(--accent-visible)" }}>
                <i className="fa-brands fa-chrome"></i>
              </div>
              <h3 className="text-xl font-syne font-bold text-[var(--text)] mb-2">
                1. {locale === "vi" ? "Cài đặt từ Chrome Web Store" : "Chrome Web Store (Recommended)"}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6">
                {locale === "vi" 
                  ? "Cách nhanh và an toàn nhất. Tự động nhận bản cập nhật mới nhất từ Google mà không cần can thiệp thủ công."
                  : "The fastest and most secure way to install. Updates are automatically delivered via Google Chrome Store."}
              </p>
              <ol className="space-y-3 text-xs sm:text-sm text-[var(--muted)] mb-6 list-decimal list-inside">
                <li>{locale === "vi" ? "Mở trang Chi tiết extension bạn muốn cài đặt." : "Visit the extension details page."}</li>
                <li>{locale === "vi" ? "Nhấn nút 'Cài đặt ngay' để chuyển tới Chrome Web Store." : "Click 'Install Now' to open Chrome Web Store."}</li>
                <li>{locale === "vi" ? "Bấm 'Thêm vào Chrome' (Add to Chrome) và xác nhận." : "Click 'Add to Chrome' and confirm installation."}</li>
              </ol>
              <Link 
                href="/extensions"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-[var(--border2)] hover:bg-[var(--bg3)] text-[var(--text)] transition-colors"
              >
                {locale === "vi" ? "Khám phá danh sách Extension →" : "Browse Extensions →"}
              </Link>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center mb-5 text-lg text-amber-400">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="text-xl font-syne font-bold text-[var(--text)] mb-2">
                2. {locale === "vi" ? "Cài đặt Thủ công (Developer Mode)" : "Manual Install (Developer Mode)"}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-6">
                {locale === "vi"
                  ? "Dành cho nhà phát triển muốn trải nghiệm trước các bản build thử nghiệm hoặc tự chỉnh sửa mã nguồn."
                  : "For developers and testers wishing to load unpacked source code or pre-release beta builds."}
              </p>
              <ol className="space-y-3 text-xs sm:text-sm text-[var(--muted)] mb-6 list-decimal list-inside">
                <li>{locale === "vi" ? "Truy cập chrome://extensions trên trình duyệt." : "Navigate to chrome://extensions in your browser."}</li>
                <li>{locale === "vi" ? "Bật công tắc 'Chế độ dành cho nhà phát triển' (Developer mode)." : "Toggle on 'Developer mode' in top-right corner."}</li>
                <li>{locale === "vi" ? "Nhấp 'Tải tiện ích đã giải nén' (Load unpacked) và chọn thư mục mã nguồn." : "Click 'Load unpacked' and select the extension folder."}</li>
              </ol>
              <a
                href="https://github.com/ChickenSoup269"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-[var(--border2)] hover:bg-[var(--bg3)] text-[var(--text)] transition-colors"
              >
                <i className="fa-brands fa-github"></i>
                GitHub Repositories →
              </a>
            </div>
          </motion.div>
        )}

        {activeTab === "permissions" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm space-y-4"
          >
            <div className="mb-6 pb-4 border-b border-[var(--border)]">
              <h3 className="text-xl font-syne font-bold text-[var(--text)] mb-1">
                {locale === "vi" ? "Minh Bạch Quyền Hạn Trình Duyệt" : "Permission Transparency"}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)]">
                {locale === "vi"
                  ? "Chúng tôi cam kết chỉ yêu cầu các quyền hạn tối thiểu tuyệt đối cần thiết để vận hành các tính năng."
                  : "We only request the bare minimum permissions strictly needed to make features work."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissions.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-syne font-bold text-sm text-[var(--text)]">{p.name}</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase bg-[var(--bg3)] text-[var(--muted)] border border-[var(--border)]">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{p.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <Link 
                href="/privacy" 
                className="text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:underline"
                style={{ color: "var(--accent-visible)" }}
              >
                <i className="fa-solid fa-shield-halved text-xs"></i>
                {locale === "vi" ? "Xem Chi tiết Chính sách Bảo mật đầy đủ →" : "Read Full Privacy Policy →"}
              </Link>
            </div>
          </motion.div>
        )}

        {activeTab === "faq" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm">
                <h4 className="font-syne font-bold text-base sm:text-lg text-[var(--text)] mb-3 flex items-center gap-2.5">
                  <i className="fa-solid fa-circle-question text-xs" style={{ color: "var(--accent-visible)" }}></i>
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed pl-6 border-l-2 border-[var(--border2)]">
                  {faq.a}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer Navigation Back Button */}
      <div className="mt-16 text-center pt-8 border-t border-[var(--border)]">
        <Link
          href="/"
          className="text-xs sm:text-sm font-bold px-8 py-3.5 rounded-2xl transition-all hover:scale-105 inline-flex items-center gap-2 border border-[var(--border2)] bg-[var(--bg2)] text-[var(--text)] hover:bg-[var(--bg3)]"
        >
          <i className="fa-solid fa-house text-xs"></i>
          {t("docs.back")}
        </Link>
      </div>
    </section>
  )
}

