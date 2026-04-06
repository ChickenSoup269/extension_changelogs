'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Đang khởi động...',
  'Tải danh sách extension...',
  'Kết nối CDN...',
  'Sẵn sàng!',
]

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [msgIndex, setMsgIndex] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => {
        if (i < MESSAGES.length - 1) return i + 1
        clearInterval(interval)
        return i
      })
    }, 500)

    const timer = setTimeout(() => {
      setHiding(true)
      setTimeout(() => setVisible(false), 600)
    }, 2300)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{
        background: 'var(--bg)',
        opacity: hiding ? 0 : 1,
        transform: hiding ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div className="font-syne font-extrabold text-3xl tracking-tight" style={{ color: 'var(--accent2)' }}>
        ExtHub<span style={{ color: 'var(--muted)' }}>.</span>
      </div>

      {/* Progress bar */}
      <div
        className="w-[200px] h-[2px] rounded-full overflow-hidden"
        style={{ background: 'var(--bg4)' }}
      >
        <div
          className="h-full rounded-full animate-load-fill"
          style={{
            background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          }}
        />
      </div>

      {/* Status text */}
      <p
        key={msgIndex}
        className="text-xs tracking-widest animate-fade-in font-mono"
        style={{ color: 'var(--muted)', fontFamily: 'var(--font-dm-mono)' }}
      >
        {MESSAGES[msgIndex]}
      </p>
    </div>
  )
}
