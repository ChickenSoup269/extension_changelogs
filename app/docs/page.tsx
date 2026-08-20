"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import { useState } from "react"

export default function DocsPage() {
  const { t, locale } = useLanguage()
  const [activeTab, setActiveTab] = useState<"install" | "permissions" | "faq">("install")
  const [faqCategory, setFaqCategory] = useState<"all" | "bookmark" | "startpage" | "general">("all")

  const faqCategories = [
    { id: "all" as const, label: { vi: "Tất cả câu hỏi", en: "All Questions" }, icon: "fa-layer-group" },
    { id: "bookmark" as const, label: { vi: "Zero Bookmark Manager", en: "Zero Bookmark Manager" }, icon: "fa-bookmark" },
    { id: "startpage" as const, label: { vi: "Zero Startpage", en: "Zero Startpage" }, icon: "fa-rocket" },
    { id: "general" as const, label: { vi: "Chung & Bảo mật", en: "General & Privacy" }, icon: "fa-shield-halved" },
  ]

  const faqs = [
    // Zero Bookmark Manager
    {
      id: "bm-1",
      category: "bookmark" as const,
      categoryLabel: { vi: "Zero Bookmark", en: "Zero Bookmark" },
      categoryIcon: "fa-bookmark",
      q: locale === "vi" ? "Tính năng Snooze / Nhắc nhở đọc sau (Read Later) hoạt động như thế nào?" : "How does the Snooze / Read Later bookmark reminder work?",
      a: locale === "vi"
        ? "Bạn có thể tạm ẩn bookmark và lên lịch nhắc nhở (ví dụ: 1 giờ, ngày mai, tuần tới). Tiện ích sẽ tạo một bộ hẹn giờ nhẹ nhàng bằng Chrome Alarms và gửi thông báo màn hình (Notifications) kèm liên kết để bạn bấm vào mở lại đúng thời điểm mà không làm chậm trình duyệt."
        : "You can snooze bookmarks for a designated period (e.g., 1 hour, tomorrow, next week). The extension schedules a lightweight Chrome Alarm and displays a desktop notification with a direct link when it's time to revisit, without keeping heavy background processes running."
    },
    {
      id: "bm-2",
      category: "bookmark" as const,
      categoryLabel: { vi: "Zero Bookmark", en: "Zero Bookmark" },
      categoryIcon: "fa-bookmark",
      q: locale === "vi" ? "Làm cách nào để quét và dọn dẹp bookmark trùng lặp?" : "How do I find and clean up duplicate bookmarks?",
      a: locale === "vi"
        ? "Trong giao diện Zero Bookmark Manager, chọn công cụ quét trùng lặp. Hệ thống sẽ tự động đối chiếu các URL hoặc tiêu đề giống nhau, hiển thị danh sách để bạn đối chiếu và cho phép dọn dẹp hàng loạt nhanh chóng."
        : "Inside Zero Bookmark Manager, open the duplicate cleanup tool. The extension automatically scans for matching URLs or identical titles, presenting an organized list for quick bulk cleanup."
    },
    {
      id: "bm-3",
      category: "bookmark" as const,
      categoryLabel: { vi: "Zero Bookmark", en: "Zero Bookmark" },
      categoryIcon: "fa-bookmark",
      q: locale === "vi" ? "Làm thế nào để chuyển đổi giữa giao diện Popup, Side Panel và Toàn màn hình?" : "How do I toggle between Popup, Side Panel, and Full-screen View?",
      a: locale === "vi"
        ? "Trong phần Cài đặt của tiện ích, bạn có thể thiết lập chế độ mở mặc định: Cửa sổ Popup nhanh, Bảng điều khiển cạnh bên (Chrome Side Panel) để tra cứu không gián đoạn, hoặc xem Toàn màn hình (Full Web View)."
        : "In the extension settings, you can choose your preferred default launch mode: quick Popup window, Chrome Side Panel for uninterrupted browsing, or full-screen Web View."
    },
    {
      id: "bm-4",
      category: "bookmark" as const,
      categoryLabel: { vi: "Zero Bookmark", en: "Zero Bookmark" },
      categoryIcon: "fa-bookmark",
      q: locale === "vi" ? "Làm cách nào để đồng bộ dữ liệu bookmark và cài đặt giữa các máy tính?" : "How do I sync bookmark data and settings across multiple computers?",
      a: locale === "vi"
        ? "Zero Bookmark Manager tích hợp tính năng đồng bộ thông qua Google Drive API (OAuth2) an toàn hoặc xuất/nhập tệp sao lưu JSON chỉ với một cú click chuột."
        : "Zero Bookmark Manager supports secure direct cloud sync via Google Drive API (OAuth2) or 1-click JSON backup export and import."
    },
    {
      id: "bm-5",
      category: "bookmark" as const,
      categoryLabel: { vi: "Zero Bookmark", en: "Zero Bookmark" },
      categoryIcon: "fa-bookmark",
      q: locale === "vi" ? "Tính năng Thẻ (Tags) và Ghi chú (Notes) cho bookmark hoạt động ra sao?" : "How do tags and notes for bookmarks work?",
      a: locale === "vi"
        ? "Bạn có thể thêm ghi chú chi tiết và gán các thẻ phân loại cho từng dấu trang. Tính năng tìm kiếm thông minh sẽ hỗ trợ lọc nhanh theo tag hoặc từ khóa trong ghi chú trên tất cả các chế độ xem danh sách và lưới."
        : "You can add detailed notes and assign category tags to any bookmark. The smart search engine lets you filter bookmarks instantly by tag or note content across both list and grid views."
    },

    // Zero Startpage
    {
      id: "sp-1",
      category: "startpage" as const,
      categoryLabel: { vi: "Zero Startpage", en: "Zero Startpage" },
      categoryIcon: "fa-rocket",
      q: locale === "vi" ? "Làm sao để đặt Zero Startpage làm trang New Tab mặc định?" : "How do I set Zero Startpage as my default New Tab?",
      a: locale === "vi"
        ? "Sau khi cài đặt từ Chrome Web Store, mỗi khi bạn mở một thẻ mới (Ctrl + T hoặc Cmd + T), Zero Startpage sẽ tự động hiển thị giao diện tùy biến cá nhân hóa."
        : "Once installed from the Chrome Web Store, opening a new tab (Ctrl + T or Cmd + T) will automatically render the customizable Zero Startpage dashboard."
    },
    {
      id: "sp-2",
      category: "startpage" as const,
      categoryLabel: { vi: "Zero Startpage", en: "Zero Startpage" },
      categoryIcon: "fa-rocket",
      q: locale === "vi" ? "Làm cách nào để tùy biến hình nền và các widget trong Zero Startpage?" : "How do I customize wallpapers and widgets in Zero Startpage?",
      a: locale === "vi"
        ? "Bạn có thể nhấn vào biểu tượng Cài đặt trên Startpage để thay đổi hình nền (ảnh nền chất lượng cao, màu gradient hoặc ảnh tải lên từ máy tính) và bật/tắt các widget như Pomodoro, Đồng hồ, Thời tiết và Tìm kiếm."
        : "Click the Settings icon on your Startpage to customize wallpapers (curated HD images, gradients, or local uploads) and toggle widgets like Pomodoro, Clock, Weather, and Search."
    },
    {
      id: "sp-3",
      category: "startpage" as const,
      categoryLabel: { vi: "Zero Startpage", en: "Zero Startpage" },
      categoryIcon: "fa-rocket",
      q: locale === "vi" ? "Zero Startpage có hoạt động khi mất kết nối mạng (Offline) không?" : "Does Zero Startpage work offline without internet?",
      a: locale === "vi"
        ? "Có. Zero Startpage được xây dựng theo kiến trúc Offline-First. Toàn bộ mã nguồn, cấu hình cá nhân và hình nền lưu cục bộ đều tải tức thì mà không cần kết nối mạng."
        : "Yes. Zero Startpage is built with an offline-first architecture. All UI assets, personal preferences, and local wallpapers load instantly without an active internet connection."
    },
    {
      id: "sp-4",
      category: "startpage" as const,
      categoryLabel: { vi: "Zero Startpage", en: "Zero Startpage" },
      categoryIcon: "fa-rocket",
      q: locale === "vi" ? "Tôi có thể sắp xếp các trang web yêu thích (Bookmark Groups) theo nhóm không?" : "Can I organize favorite shortcuts into groups on Zero Startpage?",
      a: locale === "vi"
        ? "Có, bạn có thể tạo nhiều nhóm shortcut theo chủ đề (Công việc, Học tập, Giải trí), sắp xếp vị trí linh hoạt và mở nhanh trang web chỉ với một cú nhấp chuột."
        : "Yes, you can create themed shortcut groups (Work, Study, Entertainment), organize them easily, and access your favorite sites with a single click."
    },

    // General & Privacy
    {
      id: "gen-1",
      category: "general" as const,
      categoryLabel: { vi: "Chung & Bảo mật", en: "General & Privacy" },
      categoryIcon: "fa-shield-halved",
      q: locale === "vi" ? "Các extension của ExtHub có an toàn và miễn phí không?" : "Are ExtHub extensions safe and free?",
      a: locale === "vi" 
        ? "100% miễn phí và an toàn. Mọi dữ liệu như bookmarks hay thiết lập cá nhân đều được lưu trữ trực tiếp trên thiết bị của bạn (Local Storage) hoặc đồng bộ trực tiếp qua Google Drive cá nhân của bạn mà không thông qua bất kỳ server trung gian nào."
        : "100% free and secure. All user data like bookmarks and personal configurations are stored locally on your device or synced directly to your private Google Drive without any intermediary server."
    },
    {
      id: "gen-2",
      category: "general" as const,
      categoryLabel: { vi: "Chung & Bảo mật", en: "General & Privacy" },
      categoryIcon: "fa-shield-halved",
      q: locale === "vi" ? "Tiện ích có thu thập lịch sử duyệt web hay dữ liệu cá nhân không?" : "Does the extension track browsing history or personal data?",
      a: locale === "vi"
        ? "Hoàn toàn không. Chúng tôi không sử dụng tracker, không cài analytics theo dõi người dùng và không gửi bất kỳ dữ liệu nào về máy chủ bên ngoài. Mọi tác vụ xử lý 100% cục bộ trên trình duyệt của bạn."
        : "Absolutely not. We do not use third-party trackers, analytics, or remote telemetry servers. All data processing is strictly 100% local inside your browser."
    },
    {
      id: "gen-3",
      category: "general" as const,
      categoryLabel: { vi: "Chung & Bảo mật", en: "General & Privacy" },
      categoryIcon: "fa-shield-halved",
      q: locale === "vi" ? "Tôi cần làm gì khi gặp sự cố hiển thị hoặc phát hiện lỗi (Bug)?" : "What should I do if I encounter a bug or display issue?",
      a: locale === "vi"
        ? "Bạn có thể thử làm mới trang (F5) hoặc tải lại tiện ích trong chrome://extensions. Nếu vấn đề vẫn tiếp diễn, hãy gửi phản hồi qua email hỗ trợ (thientran01345@icloud.com) hoặc tạo Issue trên GitHub của dự án để được ghi danh vào Hall of Fame."
        : "Try refreshing the page (F5) or reloading the extension in chrome://extensions. If the issue persists, feel free to report it via email (thientran01345@icloud.com) or submit an Issue on GitHub to get featured on our Hall of Fame."
    }
  ]

  const filteredFaqs = faqCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === faqCategory)

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
              <div className="pt-2 border-t border-[var(--border)]">
                <p className="text-[11px] text-[var(--muted)] mb-3">
                  {locale === "vi"
                    ? "📖 Hướng dẫn chi tiết từng bước có trong tệp README của từng repo:"
                    : "📖 Step-by-step instructions are available in each repo's README:"}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://github.com/ChickenSoup269/Zero-Bookmark-Manager"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[var(--border2)] hover:border-[var(--accent-border)] bg-[var(--bg)] hover:bg-[var(--bg3)] text-[var(--text)] transition-all"
                  >
                    <i className="fa-brands fa-github"></i>
                    Zero Bookmark Manager
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-[var(--muted)]"></i>
                  </a>
                  <a
                    href="https://github.com/ChickenSoup269/Zero-Start-Page"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[var(--border2)] hover:border-[var(--accent-border)] bg-[var(--bg)] hover:bg-[var(--bg3)] text-[var(--text)] transition-all"
                  >
                    <i className="fa-brands fa-github"></i>
                    Zero Startpage
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-[var(--muted)]"></i>
                  </a>
                </div>
              </div>
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
            className="space-y-6"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[var(--bg2)] border border-[var(--border)] max-w-2xl mx-auto shadow-sm">
              {faqCategories.map((cat) => {
                const isSelected = faqCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFaqCategory(cat.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                    style={{
                      background: isSelected ? "var(--bg4)" : "transparent",
                      color: isSelected ? "var(--text)" : "var(--muted)",
                      border: `1px solid ${isSelected ? "var(--accent-border)" : "transparent"}`,
                      boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.15)" : "none"
                    }}
                  >
                    <i className={`fa-solid ${cat.icon} text-xs`} style={{ color: isSelected ? "var(--accent-visible)" : undefined }}></i>
                    {cat.label[locale]}
                  </button>
                )
              })}
            </div>

            {/* Filtered FAQs List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div key={faq.id || i} className="p-6 rounded-3xl bg-[var(--bg2)] border border-[var(--border)] shadow-sm transition-all hover:border-[var(--border2)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <h4 className="font-syne font-bold text-base sm:text-lg text-[var(--text)] flex items-start gap-2.5">
                      <i className="fa-solid fa-circle-question text-xs mt-1.5 flex-shrink-0" style={{ color: "var(--accent-visible)" }}></i>
                      <span>{faq.q}</span>
                    </h4>
                    <span className="self-start sm:self-center text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-[var(--bg)] border border-[var(--border)] text-[var(--muted2)] flex items-center gap-1.5 flex-shrink-0">
                      <i className={`fa-solid ${faq.categoryIcon} text-[9px]`} style={{ color: "var(--accent-visible)" }}></i>
                      {faq.categoryLabel[locale]}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed pl-6 border-l-2 border-[var(--border2)]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
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

