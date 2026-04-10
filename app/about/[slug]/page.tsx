"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"
import { EXTENSIONS, type Extension } from "@/lib/data"
import ImageSlider from "@/components/ImageSlider"
import statsData from "@/lib/webstore-stats.json"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DynamicAboutPage() {
  const { slug } = useParams()
  const { t, locale } = useLanguage()

  const ext = EXTENSIONS.find((e) => e.slug === slug) || EXTENSIONS[0]
  const stats = statsData.extensions[
    ext.webstoreId as keyof typeof statsData.extensions
  ] || { users: "0", rating: "0", ratingCount: "0" }

  const formattedDate = new Date(statsData.lastUpdated).toLocaleDateString(
    locale === "vi" ? "vi-VN" : "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  )

  return (
    <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="blob blob-1 opacity-20" />
        <div className="blob blob-2 opacity-10" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* BREADCRUMB / SELECTOR */}
        <div className="flex items-center gap-4 mb-12 animate-fade-in">
          <Link
            href="/extensions"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i> {t("common.back")}
          </Link>
          <span className="text-[var(--muted2)]">/</span>
          <div className="flex gap-2">
            {EXTENSIONS.map((e) => (
              <Link
                key={e.slug}
                href={`/about/${e.slug}`}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  e.slug === slug
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "bg-[var(--bg3)] border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]"
                }`}
              >
                {e.name}
              </Link>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ext.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO SECTION */}
            <section className="text-center mb-24">
              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-[var(--bg3)] p-4 border border-[var(--border2)] shadow-2xl">
                {ext.icon.startsWith("/") ? (
                  <img
                    src={ext.icon}
                    alt={ext.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <i className={`${ext.icon} text-5xl text-[var(--accent)]`} />
                )}
              </div>
              <h1 className="font-syne font-extrabold text-5xl md:text-7xl mb-6 tracking-tight">
                {ext.name}
              </h1>
              <p className="text-xl md:text-2xl gradient-text font-medium mb-8">
                {t(`about.${ext.slug}.subtitle`)}
              </p>
              <p className="max-w-[700px] mx-auto text-lg text-[var(--muted)] leading-relaxed mb-12">
                {ext.description[locale]}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={ext.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-[var(--accent)] text-white font-bold rounded-2xl shadow-xl shadow-[var(--accent-glow)] hover:scale-105 transition-transform duration-300 flex items-center gap-3"
                >
                  <i className="fa-brands fa-chrome text-xl"></i>
                  {t("about.cta")}
                </a>
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="mb-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="stat-card">
                  <div className="text-[var(--accent)] text-4xl mb-4">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="text-4xl font-syne font-bold mb-1">
                    {stats.users}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-[var(--muted)]">
                    {t("about.stats.users")}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="text-[var(--amber)] text-4xl mb-4">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="text-4xl font-syne font-bold mb-1">
                    {stats.rating} / 5.0
                  </div>
                  <div className="text-sm uppercase tracking-widest text-[var(--muted)]">
                    {t("about.stats.rating")}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="text-[var(--blue)] text-4xl mb-4">
                    <i className="fas fa-comment-alt"></i>
                  </div>
                  <div className="text-4xl font-syne font-bold mb-1">
                    {stats.ratingCount}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-[var(--muted)]">
                    {t("about.stats.reviews")}
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-xs text-[var(--muted2)]">
                {t("about.stats.last_updated")} {formattedDate}
              </p>
            </section>

            {/* FEATURE HIGHLIGHT */}
            <section className="mb-32">
              <h2 className="font-syne font-bold text-3xl mb-12 text-center">
                {t("about.features.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ext.tags.map((tag, idx) => (
                  <div
                    key={tag}
                    className="flex items-start gap-4 p-6 glass-card"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg4)] flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                      <i
                        className={`fas fa-${idx === 0 ? "bolt" : idx === 1 ? "shield-halved" : idx === 2 ? "paint-brush" : "code"}`}
                      ></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {tag.toUpperCase()} {t("about.features.support_title")}
                      </h3>
                      <p className="text-sm text-[var(--muted)]">
                        {t("about.features.support_desc")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PREVIEW IMAGE/VIDEO */}
            <section className="mb-32">
              {ext.slug === "zero-startpage" ||
              ext.slug === "zero-bookmark-manager" ? (
                <div className="space-y-24">
                  {/* Slider Preview */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "100ms" }}
                  >
                    <div className="text-center mb-10">
                      <h2 className="font-syne font-bold text-3xl mb-4">
                        {t(`about.${ext.slug}.preview.slider_title`)}
                      </h2>
                      <p className="text-[var(--muted)] max-w-2xl mx-auto">
                        {t(`about.${ext.slug}.preview.slider_desc`)}
                      </p>
                    </div>
                    <div className="glass-card p-4 md:p-8 rounded-[2rem] border border-[var(--border2)] shadow-2xl overflow-hidden">
                      <ImageSlider
                        images={
                          ext.slug === "zero-startpage"
                            ? [
                                "/images/starpage/1.png",
                                "/images/starpage/2.png",
                                "/images/starpage/3.png",
                                "/images/starpage/4.png",
                                "/images/starpage/5.png",
                                "/images/starpage/6.png",
                                "/images/starpage/7.png",
                                "/images/starpage/8.png",
                                "/images/starpage/9.png",
                              ]
                            : [
                                "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/1.png?raw=true",
                                "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/2.png?raw=true",
                                "https://github.com/ChickenSoup269/imagesForRepo/blob/main/img_repo_extension_bookmarks/extension_bookmark_120/3.png?raw=true",
                              ]
                        }
                      />
                    </div>
                  </div>

                  {/* Video Preview */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "300ms" }}
                  >
                    <div className="text-center mb-10">
                      <h2 className="font-syne font-bold text-3xl mb-4">
                        {t(`about.${ext.slug}.preview.video_title`)}
                      </h2>
                      <p className="text-[var(--muted)] max-w-2xl mx-auto">
                        {t(`about.${ext.slug}.preview.video_desc`)}
                      </p>
                    </div>
                    <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-[var(--border2)] shadow-2xl aspect-video bg-black/20 backdrop-blur-sm">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=QPRb2XMF4s8zmuoH"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-20 text-center rounded-[2rem] border border-[var(--border2)] mb-20">
                  <i className="fas fa-image text-6xl mb-6 text-[var(--muted2)]"></i>
                  <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                  <p className="text-[var(--muted)]">
                    Preview image for {ext.name} arriving soon...
                  </p>
                </div>
              )}
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
