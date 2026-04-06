"use client"

import { useSettings } from "@/context/SettingsContext"

export default function Background() {
  const { bgAnim } = useSettings()

  return (
    <div className="bg-container">
      {bgAnim === "shapes" ? (
        <>
          {/* Shapes & Particles */}
          <div className="bg-shape shape-circle shape-1" />
          <div className="bg-shape shape-square shape-2" />
          <div className="bg-shape shape-circle shape-3" />
          <div className="bg-shape shape-square shape-4" />

          <div className="bg-particle particle-1" />
          <div className="bg-particle particle-2" />
          <div className="bg-particle particle-3" />
          <div className="bg-particle particle-4" />
          <div className="bg-particle particle-5" />
        </>
      ) : (
        <>
          {/* Blobs & Grid */}
          <div className="bg-grid" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </>
      )}
    </div>
  )
}
