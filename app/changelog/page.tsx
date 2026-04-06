'use client'

import { useState } from 'react'
import { CHANGELOG, type ChangeType } from '@/lib/data'

const TYPE_CONFIG: Record<ChangeType, { label: string; bg: string; color: string }> = {
  feat: { label: 'FEAT', bg: 'rgba(124,106,247,0.15)', color: '#a594ff' },
  fix: { label: 'FIX', bg: 'rgba(62,207,142,0.12)', color: '#3ecf8e' },
  perf: { label: 'PERF', bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  break: { label: 'BREAK', bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  docs: { label: 'DOCS', bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
}

const RELEASE_TYPE_LABELS = {
  major: { label: 'Major', color: 'var(--accent2)' },
  minor: { label: 'Minor', color: '#3ecf8e' },
  patch: { label: 'Patch', color: 'var(--muted)' },
}

export default function ChangelogPage() {
  const [filter, setFilter] = useState<ChangeType | 'all'>('all')
  const [extFilter, setExtFilter] = useState<string>('all')

  const extensions = ['all', ...Array.from(new Set(CHANGELOG.map((c) => c.extension)))]

  const filtered = CHANGELOG.filter((item) => {
    const matchExt = extFilter === 'all' || item.extension === extFilter
    const matchType = filter === 'all' || item.changes.some((c) => c.type === filter)
    return matchExt && matchType
  })

  return (
    <section className="max-w-[1200px] mx-auto px-10 py-14">
      <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 340px' }}>

        {/* Main */}
        <div>
          <div className="mb-8">
            <h1 className="font-syne font-extrabold text-4xl tracking-tight mb-2">
              Change<span className="gradient-text">log</span>
            </h1>
            <p style={{ color: 'var(--muted)' }}>Lịch sử cập nhật đầy đủ của tất cả extensions</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(['all', 'feat', 'fix', 'perf', 'break', 'docs'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: filter === t ? 'var(--bg4)' : 'transparent',
                  border: `1px solid ${filter === t ? 'var(--border2)' : 'var(--border)'}`,
                  color: filter === t ? 'var(--text)' : 'var(--muted)',
                }}
              >
                {t === 'all' ? 'Tất cả' : t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {extensions.map((e) => (
              <button
                key={e}
                onClick={() => setExtFilter(e)}
                className="px-3.5 py-1.5 rounded-full text-xs transition-all duration-200"
                style={{
                  background: extFilter === e ? 'var(--accent-glow)' : 'transparent',
                  border: `1px solid ${extFilter === e ? 'var(--accent)' : 'var(--border)'}`,
                  color: extFilter === e ? 'var(--accent2)' : 'var(--muted)',
                }}
              >
                {e === 'all' ? 'Semua Extension' : e}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, var(--accent), var(--border) 60%, transparent)',
              }}
            />

            <div className="flex flex-col gap-8">
              {filtered.map((item, i) => {
                const rel = RELEASE_TYPE_LABELS[item.releaseType]
                return (
                  <div key={i} className="grid gap-4" style={{ gridTemplateColumns: '42px 1fr' }}>
                    {/* Dot */}
                    <div className="flex justify-center pt-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 relative z-10"
                        style={{
                          background: item.releaseType === 'major' ? 'var(--accent)' : 'var(--bg)',
                          border: `2px solid ${item.releaseType === 'major' ? 'var(--accent)' : item.releaseType === 'minor' ? '#3ecf8e' : 'var(--muted2)'}`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="rounded-xl p-5"
                      style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                    >
                      <div className="flex items-center flex-wrap gap-2.5 mb-4">
                        <span
                          className="font-mono text-sm font-medium"
                          style={{ color: 'var(--accent2)', fontFamily: 'var(--font-dm-mono)' }}
                        >
                          {item.version}
                        </span>
                        <span
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                          style={{ background: 'var(--bg4)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                        >
                          <i className={`${item.extensionIcon} text-[10px] text-[var(--accent)]`}></i>
                          <span>{item.extension}</span>
                        </span>
                        <span className="text-xs font-semibold" style={{ color: rel.color }}>
                          {rel.label}
                        </span>
                        <span className="ml-auto text-xs" style={{ color: 'var(--muted2)' }}>
                          {item.date}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {item.changes
                          .filter((c) => filter === 'all' || c.type === filter)
                          .map((change, j) => {
                            const cfg = TYPE_CONFIG[change.type]
                            return (
                              <li key={j} className="flex items-baseline gap-2.5 text-sm">
                                <span
                                  className="text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0"
                                  style={{ background: cfg.bg, color: cfg.color }}
                                >
                                  {cfg.label}
                                </span>
                                <span style={{ color: 'var(--muted)' }}>{change.text}</span>
                              </li>
                            )
                          })}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4" style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-syne font-semibold text-sm mb-4">Thống kê tháng này</h3>
            {[
              { label: 'Tổng bản vá', value: '34', color: 'var(--accent2)' },
              { label: 'Features mới', value: '12', color: '#3ecf8e' },
              { label: 'Bug fixes', value: '18', color: 'var(--text)' },
              { label: 'Breaking changes', value: '4', color: '#ef4444' },
              { label: 'Extensions updated', value: '7', color: 'var(--text)' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between py-2.5 text-sm"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--muted)' }}>{s.label}</span>
                <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-syne font-semibold text-sm mb-4">Phiên bản mới nhất</h3>
            {CHANGELOG.map((c) => (
              <div
                key={c.extension}
                className="flex items-center justify-between py-2.5 text-sm"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span className="flex items-center gap-2">
                  <i className={`${c.extensionIcon} text-xs text-[var(--accent)] w-4 text-center`}></i>
                  <span style={{ color: 'var(--muted)' }}>{c.extension}</span>
                </span>
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: 'var(--accent2)', fontFamily: 'var(--font-dm-mono)' }}
                >
                  {c.version}
                </span>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.05))',
              border: '1px solid var(--accent)',
            }}
          >
            <p className="text-sm font-semibold mb-2">🔔 Nhận thông báo</p>
            <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
              Đăng ký để nhận email khi có cập nhật mới.
            </p>
            <input
              className="w-full text-xs px-3 py-2 rounded-lg mb-2 outline-none"
              style={{
                background: 'var(--bg3)',
                border: '1px solid var(--border2)',
                color: 'var(--text)',
              }}
              placeholder="email@example.com"
            />
            <button
              className="w-full text-xs py-2 rounded-lg text-white font-medium"
              style={{ background: 'var(--accent)' }}
              onClick={() => alert('Đăng ký thành công!')}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
