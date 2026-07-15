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
        en: "The sole purpose of this extension is to provide users with an easy interface to manage bookmarks (view, organize, search, and edit).",
        vi: "Mục đích duy nhất của tiện ích mở rộng này là cung cấp cho người dùng một giao diện dễ dàng để quản lý dấu trang (xem, tổ chức, tìm kiếm và chỉnh sửa)."
      }
    },
    {
      id: "startpage",
      title: "Zero Startpage - Newtab Replacement",
      icon: "/images/startpage_icon.png",
      href: "/privacy/startpage",
      description: {
        en: "Replaces Chrome's new tab page with a customizable personal dashboard while ensuring total privacy and local processing compliance.",
        vi: "Thay thế thẻ mới của Chrome bằng bảng điều khiển cá nhân hóa trong khi vẫn đảm bảo sự riêng tư tuyệt đối và tuân thủ xử lý dữ liệu cục bộ."
      }
    }
  ]

  const pageTitle = locale === "vi" ? "Chính sách bảo mật" : "Privacy Policy"
  const pageSubtitle = locale === "vi" 
    ? "Minh bạch, an toàn và bảo vệ dữ liệu cục bộ" 
    : "Transparency, security, and local data protection"

  return (
    <div className="min-h-screen py-10 md:py-20 px-4 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-4 tracking-tight text-[var(--text)]">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl font-medium text-[var(--muted)]">
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
              className="group relative flex flex-col p-8 rounded-[2rem] bg-[var(--bg2)] border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--text)] hover:shadow-[0_15px_40px_-10px_var(--accent-glow)]"
            >
              {/* Background Glow on hover */}
              <div 
                className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-center gap-5 mb-8 border-b border-[var(--border)] pb-6 relative z-10">
                <div 
                  className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 bg-[var(--bg)] border border-[var(--border)] shadow-inner p-2.5 group-hover:scale-110 transition-transform duration-300"
                >
                  <img src={policy.icon} alt={policy.title} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-syne font-bold text-[var(--text)] leading-tight mb-2 line-clamp-2">
                    {policy.title}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--muted2)] uppercase tracking-widest">
                    <i className="fa-solid fa-shield-halved text-[var(--text)]"></i> Privacy Center
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative z-10 mb-8">
                <p className="text-[15px] leading-[1.8] text-[var(--text)] opacity-80">
                  {policy.description[locale]}
                </p>
              </div>

              <div className="mt-auto relative z-10">
                <Link
                  href={policy.href}
                  className="group/btn w-full py-4 bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--text)] text-[var(--text)] text-xs font-bold rounded-xl text-center hover:-translate-y-0.5 transition-all shadow-sm flex justify-center items-center gap-2"
                >
                  {locale === "vi" ? "ĐỌC CHI TIẾT" : "READ DETAILS"}
                  <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
