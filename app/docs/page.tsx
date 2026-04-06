"use client"

import Link from "next/link"

export default function DocsPage() {
  return (
    <section className="max-w-[1200px] mx-auto px-10 py-14 flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="font-syne font-extrabold text-3xl tracking-tight">
          Tài liệu đang <span className="gradient-text">được cập nhật</span>
        </h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          Phần tài liệu sẽ sớm được hiển thị. Trở lại sau nhé!
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="text-sm font-medium px-6 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90 inline-block"
            style={{ background: "var(--accent)" }}
          >
            Quay về Trang chủ
          </Link>
        </div>
      </div>
    </section>
  )
}
