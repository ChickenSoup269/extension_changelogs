"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import Link from "next/link"

export default function StartpagePrivacyPage() {
  const { locale } = useLanguage()

  const sections = [
    {
      id: "zp-purpose",
      title: { en: "Single Purpose Description", vi: "Mục đích duy nhất" },
      items: [
        {
          name: { en: "Overview", vi: "Tổng quan" },
          desc: {
            en: "Startpage replaces Chrome's new tab page with a customizable personal dashboard. It provides local bookmark management, clock/calendar widgets, search shortcuts, optional background and visual effects, and optional media controls/visualization for active audio tabs. Its single purpose is to give users a personalized and productivity-focused new tab experience.",
            vi: "Startpage thay thế thẻ mới của Chrome bằng bảng điều khiển cá nhân hóa. Cung cấp quản lý dấu trang cục bộ, tiện ích đồng hồ/lịch, phím tắt tìm kiếm, hiệu ứng tùy chọn và điều khiển/hiển thị phương tiện. Mục đích duy nhất là mang lại trải nghiệm thẻ mới tập trung vào năng suất và cá nhân hóa."
          }
        }
      ]
    },
    {
      id: "zp-perms",
      title: { en: "Permission Justification", vi: "Giải trình quyền hạn" },
      items: [
        {
          name: "bookmarks",
          desc: {
            en: "Used only when the user chooses to import bookmarks into Startpage. The extension reads the bookmark tree via Chrome Bookmarks API so users can select and import items into their local Startpage view. No data is sold or shared.",
            vi: "Chỉ được sử dụng khi người dùng chọn nhập dấu trang vào Startpage. Tiện ích đọc qua API Bookmarks để người dùng nhập vào chế độ xem cục bộ. Không có dữ liệu nào bị bán hoặc chia sẻ."
          }
        },
        {
          name: "scripting",
          desc: {
            en: "Used to execute short in-page scripts in the currently detected media tab to read playback metadata and to perform user-requested media controls. Scripts are packaged with the extension and are not remotely loaded.",
            vi: "Dùng để thực thi tập lệnh ngắn trong tab phương tiện hiện tại nhằm đọc thông tin phát lại và điều khiển phương tiện theo yêu cầu. Tập lệnh được đóng gói sẵn, không tải từ xa."
          }
        },
        {
          name: "tabs",
          desc: {
            en: "Used to locate audible/media tabs and read tab URL/title context needed to identify supported media pages (e.g. YouTube) and show current playback information. Not used for advertising or profiling.",
            vi: "Dùng để xác định các tab phương tiện và đọc URL/tiêu đề tab nhằm nhận diện các trang được hỗ trợ (như YouTube) và hiển thị trạng thái phát. Không dùng để quảng cáo hoặc lập hồ sơ."
          }
        },
        {
          name: "storage",
          desc: {
            en: "Required to synchronize user settings (theme, layouts) across different devices via chrome.storage.sync. It also tracks extension version updates and persists user-generated content like todo lists and notes.",
            vi: "Cần thiết để đồng bộ cài đặt người dùng (giao diện, bố cục) trên nhiều thiết bị. Nó cũng theo dõi cập nhật phiên bản và lưu danh sách công việc, ghi chú."
          }
        },
        {
          name: "identity",
          desc: {
            en: "Required to authenticate users securely with their Google Account using OAuth2. It is exclusively used to obtain an access token to interact with the Google Drive API for backing up and syncing user settings.",
            vi: "Cần thiết để xác thực an toàn qua Tài khoản Google bằng OAuth2. Chỉ dùng để lấy token kết nối với API Google Drive nhằm sao lưu và đồng bộ cài đặt."
          }
        },
        {
          name: "Host permission",
          desc: {
            en: "Required for: requesting search suggestions from Google, reading media state/controls on supported sites, and supporting optional media detection. All access is feature-scoped and initiated by extension functionality.",
            vi: "Cần thiết để: lấy gợi ý tìm kiếm từ Google, đọc trạng thái/điều khiển phương tiện, và nhận diện phương tiện. Mọi truy cập đều trong phạm vi tính năng và không thực thi mã từ xa."
          }
        }
      ]
    },
    {
      id: "zp-google",
      title: { en: "Google API Services Usage Disclosure", vi: "Tiết lộ sử dụng Dịch vụ Google API" },
      items: [
        {
          name: "Google Drive API",
          desc: {
            en: "Zero Startpage uses Google Drive API to backup and sync your settings. The extension only creates, reads, and modifies files created by the extension itself in your Google Drive. We do not have access to your personal files, and we do not store, share, or transmit your Google Drive data to any third-party servers. Your data stays between your browser and your Google account.",
            vi: "Zero Startpage sử dụng API Google Drive để sao lưu và đồng bộ cài đặt. Tiện ích chỉ tạo, đọc và sửa đổi các file do chính nó tạo ra. Chúng tôi không truy cập file cá nhân, không lưu trữ hay chia sẻ dữ liệu Google Drive của bạn cho bất kỳ máy chủ bên thứ ba nào. Dữ liệu chỉ nằm giữa trình duyệt và tài khoản Google của bạn."
          }
        }
      ]
    },
    {
      id: "zp-info",
      title: { en: "Source Code & Contact", vi: "Mã nguồn & Liên hệ" },
      items: [
        {
          name: { en: "Source Code", vi: "Mã nguồn" },
          desc: {
            en: "The extension source is public for transparency. You can review implementation details and release history on GitHub (ChickenSoup269/Zero-Start-Page).",
            vi: "Mã nguồn công khai minh bạch. Bạn có thể xem mã nguồn và các bản phát hành trên GitHub (ChickenSoup269/Zero-Start-Page)."
          }
        },
        {
          name: { en: "Contact Email", vi: "Email liên hệ" },
          desc: {
            en: "For compliance or privacy questions, contact: thientran01345@icloud.com",
            vi: "Đối với câu hỏi về tuân thủ hoặc quyền riêng tư, liên hệ: thientran01345@icloud.com"
          }
        }
      ]
    }
  ]

  const title = "Zero Startpage - Newtab Replacement"
  const subtitle = locale === "vi" 
    ? "Chi tiết chính sách bảo mật & Quyền hạn" 
    : "Privacy Policy Details & Permissions"
    
  const desc = locale === "vi"
    ? "Nhằm tuân thủ các chính sách của Chương trình Nhà phát triển Chrome Web Store, các tuyên bố sau đây mô tả mục đích duy nhất và quyền hạn của tiện ích."
    : "To facilitate compliance with Chrome Web Store Developer Program Policies, the following declarations describe the extension's single purpose and permission usage."

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
              <img src="/images/startpage_icon.png" alt="Zero Startpage" className="w-full h-full object-contain" />
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
