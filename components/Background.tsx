"use client"

import { useSettings } from "@/context/SettingsContext"

export default function Background() {
  const { bgAnim } = useSettings()

  if (bgAnim === "blob") {
    return (
      <div className="bg-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    )
  }

  if (bgAnim === "shapes") {
    return (
      <div className="bg-container">
        <div className="bg-shape shape-circle shape-1"></div>
        <div className="bg-shape shape-square shape-2"></div>
        <div className="bg-shape shape-square shape-3"></div>
        <div className="bg-shape shape-circle shape-4"></div>
        
        <div className="bg-particle particle-1"></div>
        <div className="bg-particle particle-2"></div>
        <div className="bg-particle particle-3"></div>
        <div className="bg-particle particle-4"></div>
        <div className="bg-particle particle-5"></div>
      </div>
    )
  }

  if (bgAnim === "rain") {
    return (
      <div className="bg-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`rain-${i}`}
            className="absolute pointer-events-none"
            style={{
              background: "var(--accent)",
              width: "1px",
              height: Math.random() * 20 + 20 + "px",
              left: Math.random() * 100 + "%",
              top: "-50px",
              opacity: Math.random() * 0.25 + 0.05,
              animation: `fall-rain ${Math.random() * 1.5 + 1.2}s linear infinite ${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    )
  }

  if (bgAnim === "particles") {
    return (
      <div className="bg-container">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              background: "var(--accent)",
              width: Math.random() * 3 + 2 + "px",
              height: Math.random() * 3 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.35 + 0.1,
              boxShadow: "0 0 8px var(--accent-glow)",
              animation: `float-particle ${Math.random() * 12 + 18}s infinite ease-in-out ${Math.random() * -20}s`,
            }}
          ></div>
        ))}
      </div>
    )
  }

  return <div className="bg-container"></div>
}

