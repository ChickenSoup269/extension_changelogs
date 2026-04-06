export type ExtStatus = "stable" | "beta" | "new"
export type ExtCategory = "dev" | "productivity" | "ui" | "security" | "ai"

export type Locale = "vi" | "en"

export interface Extension {
  id: number
  icon: string
  name: string
  version: string
  status: ExtStatus
  category: ExtCategory
  description: Record<Locale, string>
  tags: string[]
  downloads: string
  stars: string
  featured?: boolean
  author: string
  homepage?: string
}

export type ChangeType = "feat" | "fix" | "perf" | "break" | "docs"

export interface ChangeEntry {
  type: ChangeType
  text: Record<Locale, string>
}

export interface ChangelogItem {
  version: string
  extension: string
  extensionIcon: string
  date: Record<Locale, string>
  releaseType: "major" | "minor" | "patch"
  changes: ChangeEntry[]
}

export const EXTENSIONS: Extension[] = [
  {
    id: 1,
    icon: "/images/bookmark_icon.png",
    name: "Zero Bookmark Manager",
    version: "1.2.1",
    status: "stable",
    category: "productivity",
    description: {
      vi: "Trình quản lý dấu trang mạnh mẽ, tối giản với tìm kiếm thông minh, sắp xếp thư mục và xuất/nhập dữ liệu dễ dàng.",
      en: "Powerful, minimalist bookmark manager with smart search, folder organization, and easy data export/import.",
    },
    tags: ["bookmark", "manager", "productivity", "organizer"],
    downloads: "181",
    stars: "3.7",
    featured: true,
    author: "ChickenSoup269",
    homepage:
      "https://chromewebstore.google.com/detail/zero-bookmark-manager/jhcoclfodfnchlddakkeegkogajdpgce",
  },
  {
    id: 2,
    icon: "/images/startpage_icon.png",
    name: "Zero Startpage",
    version: "1.1.1",
    status: "stable",
    category: "ui",
    description: {
      vi: "Thay thế trang Tab mới bằng giao diện tối giản, tập trung vào sự tinh tế. Hỗ trợ tùy chỉnh widget và hình nền HD.",
      en: "Replacement for the new tab page with a minimalist interface focusing on elegance. Supports custom widgets and HD wallpapers.",
    },
    tags: ["startpage", "newtab", "minimalist", "ui"],
    downloads: "140",
    stars: "5.0",
    author: "ChickenSoup269",
    homepage:
      "https://chromewebstore.google.com/detail/zero-startpage-newtab-rep/ogdbkgoionmjnlinbmmjncnhafhaenck",
  },
]

export const CHANGELOG: ChangelogItem[] = [
  {
    version: "1.2.2",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "6 Tháng 4 2026", en: "Apr 6, 2026" },
    releaseType: "patch",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Cập nhật URL font DRC để cải thiện hiển thị",
          en: "Updated DRC font URL for better rendering",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm popup thông báo khi có phiên bản mới",
          en: "Added update notification popup",
        },
      },
    ],
  },
  {
    version: "1.1.1",
    extension: "Zero Startpage - Newtab Replacement",
    extensionIcon: "fa-solid fa-star",
    date: { vi: "4 Tháng 4 2026", en: "Apr 4, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm hiệu ứng nền mới: Ocean Fish, Plant Growth, Cursor Trail",
          en: "Added new visual effects: Ocean Fish, Plant Growth, Cursor Trail",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Nâng cấp hiệu ứng mưa với StormRain mới (mây đen, sấm chớp)",
          en: "Replaced rain effect with new StormRain including thunder and lightning",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cải tiến Todo List với toggle checkbox và hiệu ứng hover mượt",
          en: "Enhanced Todo List with checkbox toggle and smoother hover animations",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Nâng cấp giao diện và hệ theme cho Music Player",
          en: "Improved music player UI with new styles and themes",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cho phép tùy chỉnh màu sắc và font cho bookmark groups",
          en: "Added customization for bookmark group colors and fonts",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hỗ trợ drag & drop trong custom bookmark",
          en: "Added drag-and-drop support for custom bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tính năng Lock Widgets trong menu chuột phải",
          en: "Added Lock Widgets toggle in context menu",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tùy chọn ẩn/hiện controls và background",
          en: "Added controls and background visibility toggles",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cải tiến search bar với Google Apps và Google Lens",
          en: "Enhanced search bar with Google Apps dropdown and Lens support",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm update notification và Table of Contents",
          en: "Added update notification popup and table of contents",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tùy chọn đồng hồ analog (12 ticks) và stroke cho text",
          en: "Added analog clock options and text stroke support",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu hệ thống layer (z-index) để tránh lỗi chồng UI",
          en: "Improved z-index layering to fix UI overlap issues",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu xử lý bookmark trong import modal",
          en: "Improved bookmark parsing in import modal",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Dọn dẹp code và loại bỏ asset không dùng",
          en: "Cleaned up unused assets and code",
        },
      },
    ],
  },

  {
    version: "1.1.0",
    extension: "Zero Startpage - Newtab Replacement",
    extensionIcon: "fa-solid fa-star",
    date: { vi: "30 Tháng 3 2026", en: "Mar 30, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm hiệu ứng Northern Lights (cực quang động với particle và wave)",
          en: "Added Northern Lights visual effect with particle-based wave simulation",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm hiệu ứng CRT Scanlines (phong cách màn hình cổ điển)",
          en: "Added CRT Scanlines retro visual effect",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm hiệu ứng StormRain (mưa, sấm chớp động)",
          en: "Added StormRain animated weather effect",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Multi-Color Split Background với gradient và block",
          en: "Added multi-color split background with gradient and block modes",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Gradient Generator nâng cao (linear, radial, conic)",
          en: "Added advanced gradient generator (linear, radial, conic)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Tag/Font/UI customization (font mới, màu chữ HUE)",
          en: "Added font presets and HUE-based text color customization",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm nhiều tùy chọn đồng hồ/ngày tháng và Analog Clock",
          en: "Added new clock/date formats and analog clock options",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Unsplash categories và hệ keyword mapping",
          en: "Added new Unsplash categories and semantic keyword mapping",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm hiệu ứng lá rơi (Cherry, Sakura, Plum)",
          en: "Added new leaf visual effects (Cherry, Sakura, Plum)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị version badge trong Settings",
          en: "Added version badge in settings panel",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu hiệu suất CRT Scanlines (~40% cải thiện)",
          en: "Optimized CRT Scanlines performance (~40% improvement)",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu hiệu suất StormRain và animation",
          en: "Improved StormRain performance and rendering pipeline",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Refactor hệ Unsplash fetch theo 4-tier fallback",
          en: "Refactored Unsplash fetch logic with 4-tier fallback",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện UI/UX gradient, split background và controls",
          en: "Improved UI/UX for gradient and background controls",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Đồng bộ UI, i18n và state cho các tính năng mới",
          en: "Improved UI, i18n and state synchronization",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi Sky Lanterns bay sai hướng",
          en: "Fixed Sky Lanterns flight path issue",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi Unsplash category và fallback API",
          en: "Fixed Unsplash category and API fallback issues",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi Split Background không sync đúng state",
          en: "Fixed multi-color background state sync issues",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi gradient conic bị seam",
          en: "Fixed conic gradient seam artifact",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi UI panel và trạng thái settings",
          en: "Fixed UI panel state persistence issues",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện style đồng hồ và layout responsive",
          en: "Improved clock styling and responsiveness",
        },
      },
    ],
  },

  {
    version: "1.2.1",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "3 Tháng 4 2026", en: "Apr 3, 2026" },
    releaseType: "patch",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm tùy chọn nguồn favicon (Google, Hostname, Auto)",
          en: "Added favicon source options (Google, Hostname, Auto)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm dropdown 'Favicon Mode' trong phần Settings",
          en: "Added 'Favicon Mode' dropdown in settings",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm popup thông báo khi extension được cập nhật",
          en: "Added update notification popup with release notes link",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu logic load favicon với fallback tự động",
          en: "Optimized favicon fetching with automatic fallback",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tự động refresh favicon khi thay đổi mode",
          en: "Auto-refresh favicons when mode changes",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện drag & drop và add to folder theo Duplicate Scope",
          en: "Improved drag-and-drop and folder behavior respecting duplicate settings",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi favicon bị mờ hoặc không load",
          en: "Fixed blurry or missing favicons",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi thiếu logo.png gây 404",
          en: "Fixed missing logo.png causing 404 error",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi popupWindowId undefined trong background",
          en: "Fixed popupWindowId undefined error in background worker",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi syntax JS khi bulk add bookmark",
          en: "Fixed syntax error blocking bulk add to folder",
        },
      },
    ],
  },

  {
    version: "1.0.0",
    extension: "Zero Startpage - Newtab Replacement",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "17 Tháng 3 2026", en: "Mar 17, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Các base feature ban đầu của Zero Startpage: giao diện tối giản, widget đồng hồ, thời tiết, hình nền HD từ Unsplash",
          en: "Added initial set of features for Zero Startpage: minimalist interface, clock widget, weather, and HD backgrounds from Unsplash",
        },
      },
    ],
  },

  {
    version: "1.2.0",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "8 Tháng 3 2026", en: "Mar 8, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm popup 'All Tags' để duyệt toàn bộ tag dạng full-screen",
          en: "Added 'All Tags' popup for full-screen tag browsing",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tìm kiếm tag realtime với debounce",
          en: "Added live tag search with debounce",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị số lượng bookmark trên mỗi tag",
          en: "Added tag usage count badge",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm nút clear filter tag",
          en: "Added clear tag filter button",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị số lượng tag đang active",
          en: "Added active tags count badge",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm nút scroll to top trong sidebar",
          en: "Added scroll to top button in sidebar",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm toggle bật/tắt background cho list bookmark",
          en: "Added list background toggle option",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu layout tag trong sidebar (horizontal scroll)",
          en: "Improved sidebar tag layout with horizontal scrolling",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện layout popup tag với multi-row wrap",
          en: "Enhanced tags browser popup layout with multi-row wrap",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Sắp xếp tag đang chọn lên đầu và xử lý text dài",
          en: "Improved tag sorting and overflow handling",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện UI nút mở tag với hỗ trợ đa ngôn ngữ",
          en: "Enhanced tag expand button with localization",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện scrollbar và hiển thị khi hover",
          en: "Improved scrollbar styling and visibility",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi không sync realtime UI trong Webview bookmark",
          en: "Fixed realtime UI sync in bookmarks webview",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Đảm bảo loadVisitCounts luôn callback đúng",
          en: "Ensured loadVisitCounts always triggers callback",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Thêm listener storage để tự động cập nhật UI",
          en: "Added storage listener for automatic UI updates",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Dọn dẹp listener để tránh memory leak",
          en: "Cleaned up listeners to prevent memory leaks",
        },
      },
    ],
  },

  {
    version: "1.1.9",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "24 Tháng 2 2026", en: "Feb 24, 2026" },
    releaseType: "patch",
    changes: [
      {
        type: "perf",
        text: {
          vi: "Tái cấu trúc toàn bộ CSS thành các module riêng (fonts, variables, themes, style)",
          en: "Refactored CSS architecture into modular files (fonts, variables, themes, style)",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tách fonts.css để quản lý @font-face riêng biệt",
          en: "Isolated font declarations into fonts.css",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tạo variables.css để quản lý biến dùng chung",
          en: "Centralized shared variables into variables.css",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tách theme.css để quản lý toàn bộ hệ theme",
          en: "Separated theme configurations into theme.css",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện cấu trúc code giúp dễ bảo trì và mở rộng",
          en: "Improved code organization and maintainability",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Giảm độ phức tạp khi chỉnh sửa style",
          en: "Reduced cognitive load when editing styles",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Giúp debug dễ hơn nhờ tách module rõ ràng",
          en: "Simplified debugging with modular CSS structure",
        },
      },
    ],
  },

  {
    version: "1.1.8",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "12 Tháng 2 2026", en: "Feb 12, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm 5 theme mới: Tokyo Night, GitHub Blue, GitHub Light, Monokai, Winter is Coming",
          en: "Added 5 new themes: Tokyo Night, GitHub Blue, GitHub Light, Monokai, Winter is Coming",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Chuyển font sang CDN để giảm bundle size và tăng tốc độ tải",
          en: "Moved font assets to CDN to reduce bundle size and improve load performance",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện hiệu suất load ban đầu bằng cách tối ưu tài nguyên",
          en: "Improved initial load performance by offloading heavy assets",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cập nhật chatbot để nhận diện tên theme mới",
          en: "Updated AI chat system to recognize new theme names",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Cập nhật tài liệu theme trong help guide (EN/VI)",
          en: "Updated theme documentation in help guide",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện UI chuyển theme với nhiều lựa chọn hơn (11 themes)",
          en: "Enhanced theme switcher UI with more options (11 themes total)",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Mở rộng hệ theme cho nhiều phong cách (light/dark/colorful)",
          en: "Expanded theme coverage for diverse user preferences",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi màu nút cancel hiển thị sai giữa light/dark mode",
          en: "Fixed cancel button color across light and dark themes",
        },
      },
    ],
  },

  {
    version: "1.1.7",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "7 Tháng 2 2026", en: "Feb 7, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm export HTML thuần (file standalone sạch)",
          en: "Added pure HTML export (clean standalone file)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm icon xóa folder trực tiếp trong tree view",
          en: "Added delete icon for folders in tree view",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Tự động chọn màu chữ cho tag theo background",
          en: "Auto-detect contrast color for tag pills",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tracking số lần mở bookmark",
          en: "Added visit count tracking for bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị icon số lượt truy cập cho bookmark",
          en: "Added visit count icon indicator",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện animation đóng/mở sidebar (mượt hơn)",
          en: "Improved sidebar collapse/expand animations",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu layout sidebar, giảm khoảng trống",
          en: "Improved sidebar layout spacing",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện hiển thị tag với độ tương phản tốt hơn",
          en: "Enhanced tag pill styling with better contrast",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện độ chính xác của visit count",
          en: "Improved visit count accuracy",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi không lưu trạng thái sidebar sau refresh",
          en: "Fixed sidebar state not persisting after refresh",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi overflow sidebar gây scroll không cần thiết",
          en: "Fixed unwanted sidebar overflow scrollbars",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi hiển thị icon bookmark trong sidebar",
          en: "Fixed bookmark icon display in sidebar",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa CSS sidebar collapsed bị trùng và lỗi hiển thị",
          en: "Fixed duplicate collapsed sidebar CSS issues",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Xóa component sidebar-footer-stats, chuyển count lên header",
          en: "Removed sidebar-footer-stats and moved count to header",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm quyền webNavigation để hỗ trợ tracking",
          en: "Added webNavigation permission for visit tracking",
        },
      },
    ],
  },

  {
    version: "1.1.6",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "27 Tháng 1 2026", en: "Jan 27, 2026" },
    releaseType: "patch",
    changes: [
      {
        type: "perf",
        text: {
          vi: "Chuyển toàn bộ font từ .ttf sang .woff2 để tăng tốc độ tải và giảm bộ nhớ",
          en: "Converted all fonts from .ttf to .woff2 to improve performance and reduce memory usage",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Xóa các font nặng không sử dụng (HackNerd, AnonymiceProNerd)",
          en: "Removed unused heavy fonts (HackNerd, AnonymiceProNerd)",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Giảm dung lượng extension từ 6.1MB xuống ~3MB",
          en: "Reduced extension bundle size from 6.1MB to ~3MB",
        },
      },
    ],
  },

  {
    version: "1.1.5",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "26 Tháng 1 2026", en: "Jan 26, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm tùy chọn cấu hình hành động khi click extension (Popup, Full Page, Side Panel)",
          en: "Added configurable click action (Popup, Full Page, Side Panel)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hỗ trợ Side Panel",
          en: "Added Side Panel support",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm favicon mặc định cho bookmark không có icon",
          en: "Added default favicon handling for bookmarks without icons",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Popup được tái sử dụng, tránh mở nhiều cửa sổ trùng",
          en: "Improved popup behavior to reuse existing window",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Mở Side Panel từ popup sẽ focus đúng cửa sổ chính",
          en: "Improved side panel opening to focus main window",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện logic load favicon",
          en: "Improved favicon loading logic",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện Settings: ẩn/hiện bookmark options theo section",
          en: "Improved settings with toggleable bookmark options sections",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi reset Quick Open Action khi lưu settings",
          en: "Fixed Quick Open Action being reset when saving settings",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tự động sử dụng font Gohu local khi cài đặt lần đầu",
          en: "Automatically use local Gohu font on first install",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tinh chỉnh UI nhỏ",
          en: "Minor UI refinements",
        },
      },
    ],
  },

  {
    version: "1.1.4",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "21 Tháng 1 2026", en: "Jan 21, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Tạo QR code cho bookmark",
          en: "Added QR code generation for bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Di chuyển bookmark giữa folder bằng chuột phải (tree view & organize)",
          en: "Added move to folder via right-click in tree view and organize folders",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Tự động xóa bookmark trùng khi thêm mới (giữ bản mới nhất)",
          en: "Automatically remove duplicate bookmarks when adding new ones",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tùy chọn kiểm tra và xóa bookmark trùng thủ công",
          en: "Added manual option to check and remove duplicate bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Chatbot có thể quản lý folder (tạo, đổi tên, xóa)",
          en: "Chatbot can manage folders via commands",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Chatbot điều khiển UI (view mode, theme, sort)",
          en: "Chatbot can control UI settings like view mode and theme",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Chatbot có thể chạy kiểm tra link bookmark",
          en: "Chatbot can trigger bookmark link health checks",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện UI thêm bookmark vào folder",
          en: "Enhanced Add to Folder UI and rendering",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Dropdown Settings hỗ trợ scroll tốt hơn",
          en: "Improved dropdown menus with scroll support",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện style dropdown với tiêu đề dễ đọc hơn",
          en: "Improved dropdown section title styling",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện popup Organize Folders và drag & drop",
          en: "Improved Organize Folders popup and drag-and-drop",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Refactor code để dễ đọc và maintain",
          en: "Refactored code structure for maintainability",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Cập nhật hướng dẫn chatbot với các command mới",
          en: "Updated chatbot help guide with new commands",
        },
      },
    ],
  },

  {
    version: "1.1.3",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "6 Tháng 1 2026", en: "Jan 6, 2026" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm popup xác nhận khi xóa tag",
          en: "Added confirmation popup for deleting tags",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm CSS cho Markdown trong chatbot (table, code block...)",
          en: "Added CSS styling for rendered Markdown in chat responses",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm theme Tết (đỏ vàng) và hỗ trợ export HTML",
          en: "Added Tet theme with red/gold palette and HTML export support",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm localization động cho sidebar",
          en: "Added dynamic localization for sidebar sections",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm welcome message và nút Start Chat cho chatbot",
          en: "Added chat welcome message with Start Chat button",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm bảng màu cho quản lý tag",
          en: "Added color palette for tag management",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm kiểm tra tình trạng link bookmark",
          en: "Added bookmark link health checking",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện khả năng trả lời của chatbot (ngoài bookmark)",
          en: "Improved chatbot responses for non-bookmark queries",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện input chat (auto resize, hỗ trợ Shift+Enter)",
          en: "Improved chat input with auto-resize and Shift+Enter support",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tăng độ ổn định khi gọi AI API",
          en: "Improved robustness of AI API calls",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu theme Tết để tăng độ tương phản",
          en: "Adjusted Tet theme for better contrast",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện hệ thống đổi font",
          en: "Enhanced font switching mechanism",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện hệ thống đa ngôn ngữ",
          en: "Improved localization system and handling",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện import màu tag từ JSON",
          en: "Improved tag color import logic",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện prompt AI với logic classify-then-respond",
          en: "Updated AI prompts with classify-then-respond logic",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cập nhật hệ thống i18n với data-i18n",
          en: "Updated localization system with data-i18n attributes",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Cập nhật README với tính năng mới",
          en: "Updated README with new features and usage",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa đường dẫn font HackNerd",
          en: "Fixed incorrect HackNerd font path",
        },
      },
    ],
  },

  {
    version: "1.1.2",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "5 Tháng 12 2025", en: "Dec 5, 2025" },
    releaseType: "patch",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm component bookmark và các hàm tiện ích",
          en: "Added bookmark component and utility functions",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm modal xem trước web và modal thuộc tính",
          en: "Added web preview and properties modals",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Thêm version badge vào README",
          en: "Added version badge to README",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện layout README để hiển thị tốt hơn",
          en: "Improved README layout for better alignment",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Refactor cấu trúc code để dễ đọc và bảo trì",
          en: "Refactored code structure for better readability and maintainability",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện popup chi tiết bookmark với xử lý lỗi tốt hơn",
          en: "Enhanced bookmark detail popup with better error handling",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Tối ưu Card View và cải thiện drag & drop",
          en: "Improved Card View with smoother drag-and-drop",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cập nhật footer hiển thị version động",
          en: "Updated footer to display dynamic version",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Cập nhật README và hình ảnh minh họa",
          en: "Updated README and images for clarity",
        },
      },
      {
        type: "docs",
        text: {
          vi: "Cập nhật changelog và đồng bộ ngày tháng",
          en: "Updated changelog and standardized dates",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Xóa permission 'tabs' không cần thiết",
          en: "Removed unnecessary 'tabs' permission",
        },
      },
    ],
  },

  {
    version: "1.1.1",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "6 Tháng 11 2025", en: "Nov 6, 2025" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm Card View",
          en: "Added Card View",
        },
      },
    ],
  },

  {
    version: "1.1.0",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "16 Tháng 10 2025", en: "Oct 16, 2025" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm WebView (mở và chỉnh sửa bookmark trong tab mới)",
          en: "Added WebView (edit in new tab)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Chatbot Gemini (Beta)",
          en: "Added Chatbot - Gemini (Beta)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm danh sách bookmark truy cập nhiều nhất",
          en: "Added most visited bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm bookmark yêu thích và phân loại favourite",
          en: "Added favourite bookmarks and favourite type",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Tree View (có thể dùng cùng flat list)",
          en: "Added Tree view (works with flat list)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm chế độ xem chi tiết và hỗ trợ tag",
          en: "Added detail view with tag support",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị chi tiết bookmark: tiêu đề, ngày thêm, tags",
          en: "View details: title, date added, tags",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Quản lý tags với màu sắc và gán vào bookmark",
          en: "Manage tags with colors and assign to bookmarks",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Xem chi tiết bookmark với preview web nhỏ",
          en: "Bookmark detail view with mini web preview",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Local Storage Settings để lưu trạng thái người dùng",
          en: "Added local storage settings to persist user preferences",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Lưu trạng thái: search, folder, sort, view mode",
          en: "Save state: search query, selected folder, sort type, view mode",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Lưu trạng thái UI: collapsed folders, checkbox, tags",
          en: "Persist UI state: collapsed folders, checkboxes, selected tags",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm tag vào bookmark (giới hạn 10 tag)",
          en: "Added tags to bookmarks (limit 10 per bookmark)",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải tiến UI và tối ưu trải nghiệm người dùng",
          en: "UI refinements and UX improvements",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cập nhật themes (thêm One Dark và Dracula)",
          en: "Updated themes (added One Dark & Dracula)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cập nhật export hỗ trợ CSV (Excel/Sheets)",
          en: "Updated export to support CSV (Excel/Sheets)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Cập nhật fonts (AnonymicePro, ProFont, JetBrains)",
          en: "Updated fonts (AnonymicePro, ProFont, JetBrains)",
        },
      },
    ],
  },

  {
    version: "1.0.3",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "6 Tháng 9 2025", en: "Sep 6, 2025" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Thêm chuyển đổi Light/Dark mode tự động theo hệ thống",
          en: "Added light/dark theme switching (auto-detected)",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm hỗ trợ đa ngôn ngữ Anh/Việt với UI cập nhật động",
          en: "Added English/Vietnamese language support with dynamic UI updates",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm import bookmark với phát hiện trùng URL và xác nhận người dùng",
          en: "Added bookmark import with duplicate URL detection and user confirmation",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm export bookmark dạng JSON và HTML",
          en: "Added bookmark export with JSON or HTML",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thêm Advanced Settings cho xuất HTML",
          en: "Added Advanced Settings for HTML",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Ẩn/hiện vùng Select All theo trạng thái checkbox",
          en: "Added visibility toggle for Select All container based on checkbox visibility",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Hiển thị động nút Delete Bookmarks theo số bookmark được chọn",
          en: "Added dynamic display of Delete Bookmarks button based on selection",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện refresh bookmark khi thêm/xóa/đổi tên",
          en: "Improved bookmark refresh for add/delete/rename actions",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cập nhật content script để tối ưu summary và title",
          en: "Updated content script for better summary and title handling",
        },
      },
      {
        type: "feat",
        text: {
          vi: "Thay nút changefont bằng dropdown chọn font",
          en: "Replaced changefont button with font-switcher dropdown",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Xóa các file không cần thiết để tối ưu project",
          en: "Removed unnecessary files to optimize project",
        },
      },
      {
        type: "fix",
        text: {
          vi: "Sửa lỗi thiếu text cho nút Delete Bookmarks và bổ sung đa ngôn ngữ",
          en: "Fixed missing text for Delete Bookmarks button with translation support",
        },
      },
      {
        type: "perf",
        text: {
          vi: "Cải thiện xử lý checkbox cho chọn từng phần và Select All",
          en: "Improved checkbox selection handling",
        },
      },
    ],
  },
  {
    version: "1.0.0 -> 1.0.2",
    extension: "Zero Bookmark Manager",
    extensionIcon: "fa-solid fa-bookmark",
    date: { vi: "Khoảng tháng 8 2025", en: "around August 2025" },
    releaseType: "minor",
    changes: [
      {
        type: "feat",
        text: {
          vi: "Các base bookmark đầu tiên",
          en: "Added initial set of bookmarks",
        },
      },
    ],
  },
]

export const CATEGORIES = [
  {
    id: "all",
    label: { vi: "Tất cả", en: "All" },
    icon: "fa-solid fa-border-all",
  },
  {
    id: "dev",
    label: { vi: "Developer", en: "Developer" },
    icon: "fa-solid fa-code",
  },
  {
    id: "productivity",
    label: { vi: "Productivity", en: "Productivity" },
    icon: "fa-solid fa-bolt",
  },
  {
    id: "ui",
    label: { vi: "UI/UX", en: "UI/UX" },
    icon: "fa-solid fa-palette",
  },
  {
    id: "security",
    label: { vi: "Security", en: "Security" },
    icon: "fa-solid fa-shield-halved",
  },
  {
    id: "ai",
    label: { vi: "AI Tools", en: "AI Tools" },
    icon: "fa-solid fa-robot",
  },
] as const
