"use client"

import { useLanguage } from "@/context/LanguageContext"
import { EXTENSIONS } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutRootPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen pt-12 md:pt-20 pb-24">
      <div className="max-w-[1100px] w-full mx-auto px-6 sm:px-8 relative">
        {/* PLATFORM INTRODUCTION SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 p-8 sm:p-12 md:p-14 overflow-hidden rounded-[2.5rem] border border-[var(--border2)] bg-[var(--bg2)]/80 backdrop-blur-2xl shadow-2xl"
          style={{
            boxShadow: "0 25px 60px -20px rgba(0,0,0,0.6), 0 0 35px -10px var(--accent-glow)",
          }}
        >
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
            style={{ background: "var(--accent)" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest glow-pill mb-6">
                <i className="fa-solid fa-cube text-[9px]"></i>
                About ExtHub
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-[var(--text)] mb-6 tracking-tight leading-[1.1]">
                {locale === "vi" ? "Định Nghĩa Lại" : "Redefining"} <br />
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, var(--text) 30%, var(--muted) 100%)"
                  }}
                >
                  {locale === "vi" ? "Trải Nghiệm Trình Duyệt" : "Browsing Experience"}
                </span>
              </h1>
              <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed mb-8 font-normal">
                {locale === "vi" 
                  ? "ExtHub là không gian tập trung các tiện ích mở rộng tối giản, hiệu năng cao và an toàn tuyệt đối. Mỗi công cụ được thiết kế tỉ mỉ để tối ưu quy trình làm việc và cá nhân hóa trải nghiệm web của bạn."
                  : "ExtHub is a dedicated showcase of minimal, high-performance, and privacy-first browser extensions crafted to streamline your workflow and elevate your everyday browsing."}
              </p>
              
              <div className="flex flex-wrap gap-8 pt-4 border-t border-[var(--border)]">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-syne font-bold text-[var(--text)]">{EXTENSIONS.length}+</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-wider mt-0.5">Active Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-syne font-bold text-[var(--text)]">100%</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-wider mt-0.5">Local & Safe</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-syne font-bold text-[var(--text)]">Free</span>
                  <span className="text-[var(--muted2)] text-[10px] font-bold uppercase tracking-wider mt-0.5">Forever</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl border border-[var(--border2)] p-8 bg-[var(--bg)]/80 flex items-center justify-center shadow-2xl backdrop-blur-xl">
                <img 
                  src="/images/logo2.png" 
                  alt="ExtHub Logo" 
                  className="w-full h-full object-contain logo-img hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT LIBRARY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex items-end justify-between border-b border-[var(--border)] pb-4"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted2)] mb-1 block">Directory</span>
            <h2 className="text-2xl sm:text-3xl font-syne font-bold text-[var(--text)] tracking-tight">
              {locale === "vi" ? "Bộ Sưu Tập Extension" : "Extension Showcase"}
            </h2>
          </div>
          <span className="text-[var(--muted2)] text-xs font-bold uppercase tracking-wider">
            {EXTENSIONS.length} {locale === "vi" ? "Dự án" : "Projects"}
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
                <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-3xl overflow-hidden transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full group-hover:bg-[var(--bg2)]/90 shadow-md">
                  {/* Image Preview */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
                    <img 
                      src={ext.slug === "zero-startpage" ? "/images/starpage/1.png" : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"} 
                      alt={ext.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg2)]/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Minimal Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--bg)] p-2 border border-[var(--border2)] shadow-md flex items-center justify-center">
                          <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white drop-shadow-md">{ext.name}</div>
                          <div className="text-[10px] text-white/80 font-bold uppercase tracking-wider">v{ext.version} • {ext.category}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider glow-pill backdrop-blur-md">
                        {ext.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                        {ext.description[locale]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                      <div className="flex gap-2">
                        {ext.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase font-bold text-[var(--muted2)] bg-[var(--bg)] border border-[var(--border)] px-2.5 py-1 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span 
                        className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                        style={{ color: "var(--accent-visible)" }}
                      >
                        {locale === "vi" ? "Chi tiết" : "Details"}
                        <i className="fa-solid fa-arrow-right text-[10px]" />
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

