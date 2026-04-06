'use client'

import Link from 'next/link'

const DOC_SECTIONS = [
  {
    title: 'Bắt đầu nhanh',
    icon: '🚀',
    desc: 'Cài đặt ExtHub CLI và chạy extension đầu tiên trong 5 phút.',
    badge: 'Khuyến nghị',
    badgeColor: '#3ecf8e',
    code: 'npm install -g exthub\nexthub init',
  },
  {
    title: 'API Reference',
    icon: '📋',
    desc: 'Toàn bộ tài liệu API cho developer muốn build và publish extension.',
    badge: null,
    code: 'exthub.register({ name, version, activate })',
  },
  {
    title: 'Publish Extension',
    icon: '📦',
    desc: 'Hướng dẫn đóng gói, kiểm thử và đăng extension lên marketplace.',
    badge: null,
    code: 'exthub publish --release stable',
  },
  {
    title: 'Cấu hình nâng cao',
    icon: '⚙️',
    desc: 'Tuỳ chỉnh ExtHub với file config, hooks và plugin system.',
    badge: null,
    code: 'exthub.config({ hooks: { onInstall } })',
  },
]

export default function DocsPage() {
  return (
    <section className="max-w-[1200px] mx-auto px-10 py-14">
      <div className="grid gap-12" style={{ gridTemplateColumns: '220px 1fr' }}>

        {/* Sidebar nav */}
        <aside>
          <div className="font-syne font-semibold text-xs tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
            TÀI LIỆU
          </div>
          <nav className="space-y-1">
            {DOC_SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${s.title}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 block"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'var(--bg4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span>{s.icon}</span>
                {s.title}
              </a>
            ))}
          </nav>

          <div className="mt-8" style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <div className="font-syne font-semibold text-xs tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
              CỘNG ĐỒNG
            </div>
            <nav className="space-y-1">
              {['GitHub', 'Discord', 'Forum'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm block transition-all duration-200"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)'
                  }}
                >
                  ↗ {l}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div>
          <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-3">
            Tài <span className="gradient-text">liệu</span>
          </h1>
          <p className="mb-10 text-base" style={{ color: 'var(--muted)' }}>
            Hướng dẫn đầy đủ để cài đặt, cấu hình và phát triển extension trên nền tảng ExtHub.
          </p>

          <div className="space-y-6">
            {DOC_SECTIONS.map((s) => (
              <div
                key={s.title}
                id={s.title}
                className="rounded-xl p-7 transition-all duration-200 group"
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border2)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: 'var(--bg4)' }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="font-syne font-bold text-lg">{s.title}</h2>
                        {s.badge && (
                          <span
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(62,207,142,0.12)',
                              border: '1px solid rgba(62,207,142,0.25)',
                              color: s.badgeColor,
                            }}
                          >
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                    </div>
                  </div>
                  <span className="text-xl opacity-30 group-hover:opacity-70 transition-opacity">→</span>
                </div>

                {/* Code snippet */}
                <div
                  className="rounded-lg p-4 font-mono text-xs mt-4"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: '#a594ff',
                    fontFamily: 'var(--font-dm-mono)',
                    whiteSpace: 'pre',
                  }}
                >
                  <span style={{ color: 'var(--muted2)' }}>$ </span>
                  {s.code}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-10 rounded-xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,106,247,0.1), rgba(165,148,255,0.05))',
              border: '1px solid var(--accent)',
            }}
          >
            <p className="font-syne font-bold text-xl mb-2">Sẵn sàng build extension?</p>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Tham gia 18,000+ developer đang dùng ExtHub để phân phối công cụ của mình.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/extensions"
                className="text-sm font-medium px-6 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)' }}
              >
                Bắt đầu ngay
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                className="text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-200"
                style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
