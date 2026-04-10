import { NextResponse } from "next/server"
import { fetchWebstoreStats } from "@/lib/fetcher"
import fs from "fs"
import path from "path"

import { EXTENSIONS } from "@/lib/data"

export async function GET(request: Request) {
  try {
    const results: Record<string, any> = {}
    const webstoreIds = EXTENSIONS.map(ext => ext.webstoreId).filter(Boolean)
    
    for (const id of webstoreIds) {
      const stats = await fetchWebstoreStats(id)
      if (stats) {
        results[id] = {
          users: stats.users,
          rating: stats.rating,
          ratingCount: stats.ratingCount
        }
      }
    }

    const data = {
      lastUpdated: new Date().toISOString(),
      extensions: results
    }

    // Update the local JSON file
    // Note: This only works in local development or environments with persistent FS
    const filePath = path.join(process.cwd(), "lib", "webstore-stats.json")
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in update-stats API:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
