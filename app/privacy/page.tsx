"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyPage() {
  const { locale } = useLanguage()

  const policies = [
    {
      id: "bookmark",
      title: "Zero Bookmark Manager",
      icon: "/images/bookmark_icon.png",
      href: "/privacy/bookmark",
      description: {
        en: "The sole purpose of this extension is to provide users with an easy interface to manage bookmarks (view, organize, search, and edit) with 100% local processing.",
        vi: "Mục đích duy nhất của tiện ích là cung cấp cho người dùng giao diện quản lý dấu trang thông minh (xem, tổ chức, tìm kiếm và chỉnh sửa) với quá trình xử lý 100% cục bộ."
      },
      tags: ["Local Storage", "No Tracking", "Direct Drive Sync"]
    },
    {
      id: "startpage",
      title: "Zero Startpage - Newtab Replacement",
      icon: "/images/startpage_icon.png",
      href: "/privacy/startpage",
      description: {
        en: "Replaces Chrome's new tab page with a customizable personal dashboard while ensuring total privacy and local browser compliance.",
        vi: "Biến thẻ mới của Chrome thành không gian làm việc cá nhân hóa, đẹp mắt trong khi vẫn đảm bảo quyền riêng tư tuyệt đối và dữ liệu không rời khỏi máy tính của bạn."
      },
      tags: ["Zero Telemetry", "Offline First", "100% Private"]
    }
  ]

  const pageTitle = locale === "vi" ? "Trung Tâm Bảo Mật" : "Privacy & Transparency Hub"
  const pageSubtitle = locale === "vi" 
    ? "Minh bạch, an toàn, không thu thập dữ liệu cá nhân và xử lý 100% cục bộ" 
    : "Complete transparency, zero data collection, and 100% local processing"

  return (
    <div className="min-h-screen py-12 md:py-20 px-6 sm:px-8 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest glow-pill mb-4">
            <i className="fa-solid fa-shield-halved text-[9px]"></i>
            Privacy First
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold mb-4 tracking-tight text-[var(--text)]">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base font-normal text-[var(--muted)] leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col p-6 sm:p-8 rounded-3xl bg-[var(--bg2)]/80 border border-[var(--border2)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-border)] hover:-translate-y-1 shadow-xl backdrop-blur-xl"
              style={{
                boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5)"
              }}
            >
              {/* Background Glow on hover */}
              <div 
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-center gap-4 mb-6 border-b border-[var(--border)] pb-6 relative z-10">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[var(--bg)] border border-[var(--border)] shadow-inner p-2 group-hover:scale-105 transition-transform duration-300"
                >
                  <img src={policy.icon} alt={policy.title} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-syne font-bold text-[var(--text)] leading-tight mb-1 truncate">
                    {policy.title}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <i className="fa-solid fa-circle-check text-xs"></i> 100% Privacy Compliant
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative z-10 mb-6">
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] mb-4">
                  {policy.description[locale]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {policy.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase bg-[var(--bg)] border border-[var(--border)] text-[var(--muted2)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto relative z-10 pt-4 border-t border-[var(--border)]">
                <Link
                  href={policy.href}
                  className="w-full py-3.5 bg-[var(--bg)] border border-[var(--border2)] hover:border-[var(--accent-border)] text-[var(--text)] text-xs font-bold rounded-2xl text-center transition-all shadow-sm flex justify-center items-center gap-2 hover:bg-[var(--bg3)]"
                >
                  {locale === "vi" ? "ĐỌC CHI TIẾT CHÍNH SÁCH" : "READ FULL POLICY"}
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

