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
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`rain-${i}`}
            className="absolute bg-[var(--accent)] pointer-events-none"
            style={{
              width: "1px",
              height: Math.random() * 20 + 20 + "px",
              left: Math.random() * 100 + "%",
              top: "-50px",
              opacity: Math.random() * 0.4 + 0.1,
              animation: `fall-rain ${Math.random() * 1 + 1}s linear infinite ${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    )
  }

  if (bgAnim === "particles") {
    return (
      <div className="bg-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--accent)] pointer-events-none"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              boxShadow: "0 0 10px var(--accent)",
              animation: `float-particle ${Math.random() * 10 + 15}s infinite ease-in-out ${Math.random() * -20}s`,
            }}
          ></div>
        ))}
      </div>
    )
  }

  return <div className="bg-container"></div>
}
