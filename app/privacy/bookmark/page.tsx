"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import Link from "next/link"

export default function BookmarkPrivacyPage() {
  const { locale } = useLanguage()

  const sections = [
    {
      id: "bm-access",
      title: { en: "01. Access & Permissions", vi: "01. Quyền truy cập & Quyền hạn" },
      items: [
        {
          name: "Bookmarks",
          desc: {
            en: "Required to access the user's bookmarks in order to display them, organize folders, search by title or URL, edit bookmark details, and detect and remove duplicate bookmarks automatically.",
            vi: "Cần thiết để truy cập dấu trang của người dùng nhằm hiển thị, tổ chức thư mục, tìm kiếm theo tiêu đề hoặc URL, chỉnh sửa chi tiết và tự động phát hiện, xóa dấu trang trùng lặp."
          }
        },
        {
          name: "Local Storage",
          desc: {
            en: "Used to save user preferences, such as the preferred quick-open behavior (popup, side panel, or web view), so the extension can remember and apply these settings across sessions.",
            vi: "Được sử dụng để lưu các tùy chọn của người dùng, chẳng hạn như hành vi mở nhanh (popup, bảng bên hoặc web view), để tiện ích có thể ghi nhớ và áp dụng trong các phiên làm việc."
          }
        },
        {
          name: "Side Panel",
          desc: {
            en: "Required to open the bookmark manager interface inside Chrome's side panel, allowing users to view and manage their bookmarks without leaving or interrupting the current browsing page.",
            vi: "Cần thiết để mở giao diện quản lý dấu trang bên trong bảng điều khiển bên của Chrome, cho phép xem và quản lý dấu trang mà không cần rời khỏi trang web hiện tại."
          }
        },
        {
          name: "Tabs Management",
          desc: {
            en: "Used to detect whether the bookmark manager page is already open, activate and focus an existing tab if found, or create a new tab when necessary to prevent duplicate pages.",
            vi: "Được sử dụng để phát hiện xem trang quản lý dấu trang đã mở chưa, chuyển đến tab hiện có hoặc tạo tab mới khi cần thiết để tránh trùng lặp trang."
          }
        },
        {
          name: "Identity",
          desc: {
            en: "Required to authenticate users securely with their Google Account using OAuth2. It is exclusively used to obtain an access token to interact with the Google Drive API for backing up and syncing user settings. We do not use this permission to collect personal information.",
            vi: "Yêu cầu xác thực người dùng an toàn với Tài khoản Google thông qua OAuth2. Chỉ được sử dụng để lấy token truy cập API Google Drive nhằm sao lưu và đồng bộ cài đặt. Chúng tôi không thu thập thông tin cá nhân."
          }
        },
        {
          name: "System Display",
          desc: {
            en: "Used to obtain screen and work area dimensions in order to correctly position the extension's popup window on the user's screen.",
            vi: "Được sử dụng để lấy kích thước màn hình nhằm hiển thị đúng vị trí cửa sổ popup của tiện ích mở rộng."
          }
        },
        {
          name: "Web Navigation",
          desc: {
            en: "Required to track user interactions with bookmarks. It allows the extension to monitor when users navigate to bookmarked URLs, ensuring accurate tracking of bookmark usage.",
            vi: "Cần thiết để theo dõi tương tác với dấu trang. Cho phép tiện ích ghi nhận khi người dùng truy cập các URL được đánh dấu trang, đảm bảo theo dõi chính xác."
          }
        }
      ]
    },
    {
      id: "bm-data",
      title: { en: "02. Data Usage", vi: "02. Sử dụng dữ liệu" },
      items: [
        {
          name: { en: "No Data Sharing", vi: "Không chia sẻ dữ liệu" },
          desc: {
            en: "Zero Bookmark Manager does not collect, sell, or transfer user data to third parties.",
            vi: "Zero Bookmark Manager không thu thập, bán hoặc chuyển giao dữ liệu người dùng cho bên thứ ba."
          }
        },
        {
          name: { en: "Local Processing", vi: "Xử lý cục bộ" },
          desc: {
            en: "Bookmark data is accessed only for the purpose of displaying, organizing, searching, editing, and removing duplicate bookmarks. All processing is performed locally.",
            vi: "Dữ liệu dấu trang chỉ được truy cập nhằm mục đích hiển thị, sắp xếp, tìm kiếm và chỉnh sửa. Mọi quá trình xử lý diễn ra cục bộ trong trình duyệt."
          }
        },
        {
          name: "Storage",
          desc: {
            en: "User preferences and extension settings are stored locally using Chrome's storage API and remain on the user's device.",
            vi: "Các tùy chọn người dùng và cài đặt tiện ích được lưu trữ cục bộ bằng Storage API của Chrome và luôn nằm trên thiết bị của người dùng."
          }
        },
        {
          name: "Chatbot",
          desc: {
            en: "The chatbot is now a command-based system and does not utilize AI or third-party APIs. This ensures complete privacy and local processing.",
            vi: "Chatbot hiện là một hệ thống dựa trên câu lệnh và không sử dụng AI hoặc các API bên thứ ba. Đảm bảo quyền riêng tư và xử lý cục bộ hoàn toàn."
          }
        }
      ]
    },
    {
      id: "bm-info",
      title: { en: "03. Additional Info", vi: "03. Thông tin thêm" },
      items: [
        {
          name: { en: "Source Code", vi: "Mã nguồn" },
          desc: {
            en: "The extension is open-source. You can review the code and releases on GitHub (ChickenSoup269/Zero-Bookmark-Manager).",
            vi: "Tiện ích mở rộng là mã nguồn mở. Bạn có thể xem mã nguồn trên GitHub (ChickenSoup269/Zero-Bookmark-Manager)."
          }
        },
        {
          name: { en: "Known Issues", vi: "Vấn đề đã biết" },
          desc: {
            en: "Minor UI refresh issues after moving items. Fix: Refresh page (F5).",
            vi: "Lỗi hiển thị nhỏ sau khi di chuyển các mục. Cách sửa: Làm mới trang (F5)."
          }
        },
        {
          name: { en: "Contact", vi: "Liên hệ" },
          desc: {
            en: "If you have any questions or concerns, please contact at: thientran01345@icloud.com",
            vi: "Nếu bạn có câu hỏi hoặc thắc mắc, vui lòng liên hệ: thientran01345@icloud.com"
          }
        }
      ]
    }
  ]

  const title = "Zero Bookmark Manager"
  const subtitle = locale === "vi" 
    ? "Chi tiết chính sách bảo mật & Quyền hạn" 
    : "Privacy Policy Details & Permissions"
    
  const desc = locale === "vi"
    ? "Mục đích duy nhất của tiện ích mở rộng này là cung cấp cho người dùng một giao diện dễ dàng để quản lý dấu trang (xem, tổ chức, tìm kiếm và chỉnh sửa)."
    : "The sole purpose of this extension is to provide users with an easy interface to manage bookmarks (view, organize, search, and edit)."

  return (
    <div className="min-h-screen py-10 md:py-20 px-4 md:px-10">
      <div className="max-w-[800px] mx-auto">
        <Link 
          href="/privacy" 
          className="inline-flex items-center gap-2 mb-10 text-sm font-bold transition-all hover:-translate-x-1"
          style={{ color: "var(--text)" }}
        >
          <i className="fa-solid fa-arrow-left"></i>
          {locale === "vi" ? "Trở về Trang chính sách" : "Back to Privacy Policy"}
        </Link>
        
        <div className="bg-[var(--bg)] md:bg-[var(--bg2)] rounded-3xl md:p-12 md:border border-[var(--border)] md:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 md:border-b border-[var(--border)] pb-8">
            <div 
              className="w-16 h-16 rounded-[1rem] flex items-center justify-center flex-shrink-0 bg-[var(--bg)] border border-[var(--border)] shadow-sm p-3"
            >
              <img src="/images/bookmark_icon.png" alt="Zero Bookmark Manager" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-syne font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
                {title}
              </h1>
              <div className="text-xs font-bold text-[var(--muted2)] uppercase tracking-widest">
                <i className="fa-solid fa-shield-halved text-[var(--text)] mr-2"></i> {subtitle}
              </div>
            </div>
          </div>
          
          <p className="text-lg leading-[1.8] text-[var(--text)] opacity-90 font-medium mb-12">
            {desc}
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <h2 className="text-2xl font-syne font-bold mb-6 flex items-center gap-3 text-[var(--text)]">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-[var(--text)] text-[var(--bg)] shadow-sm">
                    {index + 1}
                  </span>
                  {section.title[locale]}
                </h2>
                
                <div className="flex flex-col gap-6 pl-0 md:pl-11">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <h4 className="font-bold text-[17px] text-[var(--text)] flex items-start gap-3 leading-snug">
                        <i className="fa-solid fa-caret-right text-[var(--text)] opacity-50 mt-1"></i>
                        {typeof item.name === 'string' ? item.name : item.name[locale]}
                      </h4>
                      <p className="text-base leading-[1.8] text-[var(--text)] opacity-80 pl-6">
                        {item.desc[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
