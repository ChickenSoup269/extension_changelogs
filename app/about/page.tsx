"use client"

import { useLanguage } from "@/context/LanguageContext"
import { EXTENSIONS } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutRootPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#1b2838]">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#2a475e]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#66c0f4]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1000px] w-full mx-auto px-6 relative">
        {/* PLATFORM INTRODUCTION SECTION (STEAM STYLE) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 p-8 md:p-12 overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-[#1b2838] to-[#2a475e]/30 shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-[#66c0f4]" />
                <span className="text-[#66c0f4] text-xs font-black uppercase tracking-[0.3em] italic">
                  About ExtHub
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                {locale === "vi" ? "Định Nghĩa Lại" : "Redefining"} <br />
                <span className="text-[#66c0f4]">{locale === "vi" ? "Trải Nghiệm" : "Browsing"}</span>
              </h2>
              <p className="text-[#acb2b8] text-lg leading-relaxed mb-8 font-medium">
                {locale === "vi" 
                  ? "ExtHub không chỉ là một kho lưu trữ. Đây là nơi hội tụ của những công cụ tối giản, mạnh mẽ nhằm biến trình duyệt của bạn thành một không gian làm việc cá nhân hóa hoàn hảo."
                  : "ExtHub isn't just a repository. It's a collection of minimal, powerful tools designed to transform your browser into a perfectly personalized workspace."}
              </p>
              
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white italic">2+</span>
                  <span className="text-[#556772] text-[10px] font-bold uppercase tracking-widest">Active Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white italic">100%</span>
                  <span className="text-[#556772] text-[10px] font-bold uppercase tracking-widest">Open Source</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-white italic">0$</span>
                  <span className="text-[#556772] text-[10px] font-bold uppercase tracking-widest">Always Free</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 aspect-square rounded-full border border-white/10 p-4 bg-black/20 backdrop-blur-sm shadow-2xl animate-pulse-slow">
                <img 
                  src="/images/logo2.png" 
                  alt="ExtHub Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(102,192,244,0.3)]"
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#66c0f4]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#66c0f4]/5 rounded-full" />
            </div>
          </div>
          
          {/* Steam-style diagonal glow */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#66c0f4]/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* PROJECT LIBRARY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex items-end justify-between border-b border-white/5 pb-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight">
              {locale === "vi" ? "Thư Viện Extension" : "Extension Library"}
            </h1>
          </div>
          <span className="text-[#556772] text-[11px] font-bold uppercase tracking-widest mb-1">
            {EXTENSIONS.length} {locale === "vi" ? "Dự án" : "Items"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {EXTENSIONS.map((ext, idx) => (
            <motion.div
              key={ext.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/about/${ext.slug}`} className="block">
                <div className="relative bg-[#16202d] border border-white/5 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#66c0f4]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col h-full group/card">
                  {/* Image Preview */}
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <img 
                      src={ext.slug === "zero-startpage" ? "/images/starpage/1.png" : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"} 
                      alt={ext.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16202d] via-transparent to-transparent opacity-60" />
                    
                    {/* Steam Style Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-[#1b2838]/80 backdrop-blur-md p-1.5 border border-white/10 shadow-xl">
                        <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="bg-[#5c7e10] text-[#beee11] text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-lg">
                        Free
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-gradient-to-b from-transparent to-black/20">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2 tracking-tight group-hover/card:text-[#66c0f4] transition-colors">
                        {ext.name}
                      </h2>
                      <p className="text-sm text-[#acb2b8] line-clamp-2 leading-relaxed italic opacity-80">
                        "{ext.description[locale]}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                      <div className="flex gap-1.5">
                        {ext.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] uppercase font-bold text-[#67c1f5] bg-[#67c1f5]/10 px-2 py-0.5 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#66c0f4] uppercase tracking-widest flex items-center gap-2 group-hover/card:translate-x-1 transition-transform">
                        {locale === "vi" ? "Chi tiết" : "Details"}
                        <i className="fas fa-arrow-right text-[8px]" />
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
