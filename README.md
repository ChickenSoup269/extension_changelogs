# ExtHub — Next.js Extension Platform

Nền tảng giới thiệu và quản lý Extension hiện đại, xây dựng với Next.js 14, TypeScript và Tailwind CSS.

## 🚀 Tính năng

- **Loading Screen** — Animation mượt mà với progress bar và status text
- **Trang chủ** — Hero section, featured extension, danh sách extension nổi bật
- **Extensions Page** — Tìm kiếm full-text, filter theo category & trạng thái, modal chi tiết
- **Changelog** — Timeline theo lịch sử, filter theo loại thay đổi và extension
- **Docs Page** — Sidebar navigation, code snippets
- **Dark theme** — Toàn bộ dark mode với CSS variables
- **Mouse glow effect** — Hiệu ứng ánh sáng theo chuột trên card
- **Sticky Navbar** — Backdrop blur, active link highlight
- **Responsive** — Mobile-friendly layout

## 🛠️ Cài đặt

```bash
# Clone repo
git clone <your-repo>
cd exthub

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem.

## 📁 Cấu trúc

```
exthub/
├── app/
│   ├── layout.tsx          # Root layout với fonts & navbar
│   ├── globals.css         # CSS variables, animations
│   ├── page.tsx            # Trang chủ
│   ├── extensions/
│   │   └── page.tsx        # Trang Extensions với search & filter
│   ├── changelog/
│   │   └── page.tsx        # Trang Changelog với timeline
│   └── docs/
│       └── page.tsx        # Trang Docs
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── Loader.tsx           # Loading screen animation
│   └── ExtensionCard.tsx    # Card component cho extension
├── lib/
│   └── data.ts             # Data types & mock data
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🎨 Thêm Extension mới

Chỉnh sửa `lib/data.ts`, thêm vào mảng `EXTENSIONS`:

```typescript
{
  id: 13,
  icon: '🎯',
  name: 'MyExtension',
  version: '1.0.0',
  status: 'new',           // 'stable' | 'beta' | 'new'
  category: 'dev',         // 'dev' | 'productivity' | 'ui' | 'security' | 'ai'
  description: 'Mô tả extension của bạn.',
  tags: ['tag1', 'tag2'],
  downloads: '0',
  stars: '5.0',
  ratingCount: '0',
  author: 'Tên của bạn',
}
```

## 📝 Thêm Changelog

Thêm vào mảng `CHANGELOG` trong `lib/data.ts`:

```typescript
{
  version: '1.0.0',
  extension: 'MyExtension',
  extensionIcon: '🎯',
  date: 'Hôm nay',
  releaseType: 'major',    // 'major' | 'minor' | 'patch'
  changes: [
    { type: 'feat', text: 'Tính năng mới XYZ' },
    { type: 'fix', text: 'Sửa lỗi ABC' },
  ],
}
```

## ⚡ Tech Stack

- **Next.js 14** — App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations (optional)
- **Google Fonts** — Syne + DM Sans + DM Mono
