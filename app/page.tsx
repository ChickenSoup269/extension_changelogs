import Link from 'next/link'
import Loader from '@/components/Loader'
import ExtensionCard from '@/components/ExtensionCard'
import FeaturedBanner from '@/components/FeaturedBanner'
import { EXTENSIONS } from '@/lib/data'

export default function HomePage() {
  const featured = EXTENSIONS.find((e) => e.featured)!
  const latest = EXTENSIONS.slice(0, 6)

  return (
    <>
      <Loader />

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-10 pt-28 pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider mb-7 animate-fade-up"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--muted)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot inline-block" style={{ background: '#3ecf8e' }} />
          2 extension mới trong tháng này
        </div>

        <h1
          className="font-syne font-extrabold leading-[1.05] tracking-tight mb-5 animate-fade-up delay-100"
          style={{ fontSize: 'clamp(38px, 6vw, 72px)' }}
        >
          Nền tảng <em className="not-italic gradient-text">Extension</em>
          <br />hiện đại nhất
        </h1>

        <p
          className="text-[17px] max-w-[520px] mx-auto mb-9 animate-fade-up delay-200"
          style={{ color: 'var(--muted)', lineHeight: '1.75' }}
        >
          Khám phá, cài đặt và quản lý tất cả extension trong một nơi. Theo dõi changelog và cập nhật tự động.
        </p>

        <div className="flex items-center justify-center gap-3 animate-fade-up delay-300">
          <Link
            href="/extensions"
            className="text-[15px] font-medium px-7 py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: 'var(--accent)' }}
          >
            Khám phá Extensions
          </Link>
          <Link
            href="/changelog"
            className="text-[15px] font-medium px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-px"
            style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text)' }}
          >
            Xem Changelog →
          </Link>
        </div>

        <div
          className="flex justify-center gap-12 mt-14 pt-10 animate-fade-up delay-400"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { num: '248', label: 'EXTENSIONS' },
            { num: '1.2M', label: 'LƯỢT TẢI' },
            { num: '4.9★', label: 'ĐÁNH GIÁ' },
            { num: '18K', label: 'DEV ĐANG DÙNG' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-syne font-bold text-3xl">{s.num}</div>
              <div className="text-xs tracking-widest mt-1" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: 'var(--border)' }} />

      <section className="max-w-[1200px] mx-auto px-10 py-16">
        {/* FeaturedBanner là Client Component — chứa onClick */}
        <FeaturedBanner ext={featured} />

        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="font-syne font-bold text-xl tracking-tight">Extensions mới nhất</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Được thêm và cập nhật gần đây</p>
          </div>
          <Link href="/extensions" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--accent2)' }}>
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {latest.map((ext) => (
            <ExtensionCard key={ext.id} ext={ext} />
          ))}
        </div>
      </section>
    </>
  )
}
