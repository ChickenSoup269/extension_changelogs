"use client"

import { useEffect } from "react"
import statsData from "@/lib/webstore-stats.json"

export default function StatsUpdater() {
  useEffect(() => {
    const checkAndUpdateStats = async () => {
      try {
        const lastUpdateDate = new Date(statsData.lastUpdated)
        const now = new Date()
        
        // Calculate difference in hours
        const diffHours = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60)
        
        // If data is older than 24 hours (or if it's the first time), trigger update
        if (diffHours >= 24) {
          console.log("Stats are stale (24h+), triggering background update...")
          const response = await fetch("/api/update-stats")
          const data = await response.json()
          
          if (data.success) {
            console.log("Global stats updated successfully:", data.data.lastUpdated)
          }
        }
      } catch (error) {
        console.error("Failed to check or update stats:", error)
      }
    }

    // Run check once on mount
    checkAndUpdateStats()
  }, [])

  return null // This component doesn't render anything
}
