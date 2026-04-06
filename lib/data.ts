export type ExtStatus = 'stable' | 'beta' | 'new'
export type ExtCategory = 'dev' | 'productivity' | 'ui' | 'security' | 'ai'

export type Locale = 'vi' | 'en'

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

export type ChangeType = 'feat' | 'fix' | 'perf' | 'break' | 'docs'

export interface ChangeEntry {
  type: ChangeType
  text: Record<Locale, string>
}

export interface ChangelogItem {
  version: string
  extension: string
  extensionIcon: string
  date: Record<Locale, string>
  releaseType: 'major' | 'minor' | 'patch'
  changes: ChangeEntry[]
}

export const EXTENSIONS: Extension[] = [
  {
    id: 1,
    icon: '/images/bookmark_icon.png',
    name: 'Zero Bookmark Manager',
    version: '1.2.1',
    status: 'stable',
    category: 'productivity',
    description: {
      vi: 'Trình quản lý dấu trang mạnh mẽ, tối giản với tìm kiếm thông minh, sắp xếp thư mục và xuất/nhập dữ liệu dễ dàng.',
      en: 'Powerful, minimalist bookmark manager with smart search, folder organization, and easy data export/import.',
    },
    tags: ['bookmark', 'manager', 'productivity', 'organizer'],
    downloads: '5K+',
    stars: '4.8',
    featured: true,
    author: 'ChickenSoup269',
    homepage: 'https://chromewebstore.google.com/detail/zero-bookmark-manager/jhcoclfodfnchlddakkeegkogajdpgce',
  },
  {
    id: 2,
    icon: '/images/startpage_icon.png',
    name: 'Zero Startpage',
    version: '1.1.0',
    status: 'stable',
    category: 'ui',
    description: {
      vi: 'Thay thế trang Tab mới bằng giao diện tối giản, tập trung vào sự tinh tế. Hỗ trợ tùy chỉnh widget và hình nền HD.',
      en: 'Replacement for the new tab page with a minimalist interface focusing on elegance. Supports custom widgets and HD wallpapers.',
    },
    tags: ['startpage', 'newtab', 'minimalist', 'ui'],
    downloads: '2K+',
    stars: '4.9',
    author: 'ChickenSoup269',
    homepage: 'https://chromewebstore.google.com/detail/zero-startpage-newtab-rep/ogdbkgoionmjnlinbmmjncnhafhaenck',
  },
]

export const CHANGELOG: ChangelogItem[] = [
  {
    version: '1.2.1',
    extension: 'Zero Bookmark Manager',
    extensionIcon: 'fa-solid fa-bookmark',
    date: { vi: 'Hôm qua', en: 'Yesterday' },
    releaseType: 'patch',
    changes: [
      {
        type: 'fix',
        text: {
          vi: 'Sửa lỗi không hiển thị đúng icon thư mục trên một số trình duyệt',
          en: 'Fixed folder icons not displaying correctly on some browsers',
        }
      },
      {
        type: 'perf',
        text: {
          vi: 'Tối ưu hóa tốc độ tìm kiếm với hàng ngàn bookmark',
          en: 'Optimized search speed for thousands of bookmarks',
        }
      },
    ],
  },
  {
    version: '1.2.0',
    extension: 'Zero Bookmark Manager',
    extensionIcon: 'fa-solid fa-bookmark',
    date: { vi: '1 tuần trước', en: '1 week ago' },
    releaseType: 'minor',
    changes: [
      { type: 'feat', text: { vi: 'Thêm tính năng kéo thả (drag & drop) để sắp xếp bookmark linh hoạt', en: 'Added drag & drop feature for flexible bookmark organization' } },
      { type: 'feat', text: { vi: 'Hỗ trợ xuất dữ liệu sang định dạng HTML chuẩn Chrome', en: 'Supported data export to standard Chrome HTML format' } },
      { type: 'feat', text: { vi: 'Cập nhật giao diện Dark Mode sâu hơn', en: 'Updated deeper Dark Mode interface' } },
    ],
  },
  {
    version: '1.1.0',
    extension: 'Zero Startpage',
    extensionIcon: 'fa-solid fa-house-chimney',
    date: { vi: '2 tuần trước', en: '2 weeks ago' },
    releaseType: 'minor',
    changes: [
      { type: 'feat', text: { vi: 'Tích hợp widget thời tiết chi tiết theo vị trí', en: 'Integrated detailed weather widget by location' } },
      { type: 'feat', text: { vi: 'Thêm bộ sưu tập hình nền tối giản mới', en: 'Added new minimalist wallpaper collection' } },
      { type: 'fix', text: { vi: 'Sửa lỗi font chữ bị nhòe trên màn hình 4K', en: 'Fixed font blurriness on 4K screens' } },
    ],
  },
]

export const CATEGORIES = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All' }, icon: 'fa-solid fa-border-all' },
  { id: 'dev', label: { vi: 'Developer', en: 'Developer' }, icon: 'fa-solid fa-code' },
  { id: 'productivity', label: { vi: 'Productivity', en: 'Productivity' }, icon: 'fa-solid fa-bolt' },
  { id: 'ui', label: { vi: 'UI/UX', en: 'UI/UX' }, icon: 'fa-solid fa-palette' },
  { id: 'security', label: { vi: 'Security', en: 'Security' }, icon: 'fa-solid fa-shield-halved' },
  { id: 'ai', label: { vi: 'AI Tools', en: 'AI Tools' }, icon: 'fa-solid fa-robot' },
] as const
