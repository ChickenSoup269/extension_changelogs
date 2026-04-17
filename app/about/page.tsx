"use client"

import { useLanguage } from "@/context/LanguageContext"
import { EXTENSIONS } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutRootPage() {
  const { t, locale } = useLanguage()

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-[840px] w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-syne font-extrabold text-3xl md:text-5xl mb-4 tracking-tight text-[var(--text)]">
            {locale === "vi" ? "Khám phá dự án" : "Explore Projects"}
          </h1>
          <p className="text-[var(--muted)] mb-12 max-w-xl mx-auto text-base">
            {locale === "vi" 
              ? "Chọn một extension để xem chi tiết về tính năng, mã nguồn và cách cài đặt." 
              : "Select an extension to view detailed features, source code, and installation guides."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXTENSIONS.map((ext, idx) => (
              <motion.div
                key={ext.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-[var(--bg2)] border border-[var(--border)] rounded-[1.5rem] overflow-hidden transition-all duration-500 group-hover:border-[var(--accent)] group-hover:shadow-[0_15px_40px_var(--accent-glow)] flex flex-col h-full">
                  {/* Image Preview */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={ext.slug === "zero-startpage" ? "/images/starpage/1.png" : "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true"} 
                      alt={ext.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg2)] via-transparent to-transparent opacity-40" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg3)] p-2 mb-4 border border-[var(--border2)] shadow-xl transform transition-transform duration-500 group-hover:scale-110">
                      <img src={ext.icon} alt={ext.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-[var(--text)] mb-3 font-syne group-hover:text-[var(--accent)] transition-colors">
                      {ext.name}
                    </h2>
                    
                    <p className="text-sm text-[var(--muted)] mb-6 line-clamp-2 leading-relaxed italic">
                      "{ext.description[locale]}"
                    </p>

                    <Link 
                      href={`/about/${ext.slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent2)] text-white text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md shadow-[var(--accent-glow)]"
                    >
                      {locale === "vi" ? "Xem Dự Án" : "View Project"}
                      <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
