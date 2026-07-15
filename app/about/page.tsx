"use client"

import { useLanguage } from "@/context/LanguageContext"
import { EXTENSIONS } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutRootPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--bg)]">
      <div className="max-w-[1000px] w-full mx-auto px-6 relative">
        {/* PLATFORM INTRODUCTION SECTION (MINIMAL STYLE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-24 p-8 md:p-12 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg2)] shadow-sm"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-[var(--text)]" />
                <span className="text-[var(--text)] text-[10px] font-bold uppercase tracking-[0.2em]">
                  About ExtHub
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-syne font-bold text-[var(--text)] mb-6 tracking-tight leading-tight">
                {locale === "vi" ? "Định Nghĩa Lại" : "Redefining"} <br />
                <span className="text-[var(--muted)]">{locale === "vi" ? "Trải Nghiệm" : "Browsing"}</span>
              </h2>
              <p className="text-[var(--muted2)] text-lg leading-relaxed mb-10 font-medium">
                {locale === "vi" 
                  ? "ExtHub không chỉ là một kho lưu trữ. Đây là nơi hội tụ của những công cụ tối giản, mạnh mẽ nhằm biến trình duyệt của bạn thành một không gian làm việc cá nhân hóa hoàn hảo."
                  : "ExtHub isn't just a repository. It's a collection of minimal, powerful tools designed to transform your browser into a perfectly personalized workspace."}
              </p>
              
              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-syne font-bold text-[var(--text)]">{EXTENSIONS.length}+</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-widest mt-1">Active Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-syne font-bold text-[var(--text)]">100%</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-widest mt-1">Open Source</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-syne font-bold text-[var(--text)]">Free</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-widest mt-1">Forever</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-48 h-48 rounded-full border border-[var(--border2)] p-6 bg-[var(--bg)] flex items-center justify-center shadow-lg">
                <img 
                  src="/images/logo2.png" 
                  alt="ExtHub Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT LIBRARY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between border-b border-[var(--border)] pb-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-syne font-bold text-[var(--text)] tracking-tight">
              {locale === "vi" ? "Thư Viện Extension" : "Extension Library"}
            </h1>
          </div>
          <span className="text-[var(--muted2)] text-[11px] font-bold uppercase tracking-widest mb-1">
            {EXTENSIONS.length} {locale === "vi" ? "Dự án" : "Items"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXTENSIONS.map((ext, idx) => (
            <motion.div
              key={ext.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/about/${ext.slug}`} className="block h-full">
                <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--muted2)] hover:shadow-lg flex flex-col h-full group-hover:bg-[var(--bg3)]">
                  {/* Image Preview */}
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-[var(--border)]">
                    <img 
                      src={ext.slug === "zero-startpage" ? "/images/starpage/1.png" : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"} 
                      alt={ext.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[var(--bg)]/10" />
                    
                    {/* Minimal Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg)] p-2 border border-[var(--border2)] shadow-sm">
                        <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="bg-[var(--text)] text-[var(--bg)] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Free
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--text)] mb-2 tracking-tight transition-colors">
                        {ext.name}
                      </h2>
                      <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                        {ext.description[locale]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                      <div className="flex gap-2">
                        {ext.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] uppercase font-semibold text-[var(--muted2)] bg-[var(--bg)] border border-[var(--border2)] px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[var(--text)] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        {locale === "vi" ? "Chi tiết" : "Details"}
                        <i className="fas fa-arrow-right text-[10px]" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
