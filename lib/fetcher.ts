export interface WebstoreStats {
  id: string
  name?: string
  users: string
  rating: string
  ratingCount: string
  lastUpdated: string
}

export async function fetchWebstoreStats(
  extensionId: string,
): Promise<WebstoreStats | null> {
  const url = `https://chromewebstore.google.com/detail/${extensionId}?hl=en`

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js
    })

    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)

    const html = await response.text()

    let stats: WebstoreStats = {
      id: extensionId,
      users: "0",
      rating: "0",
      ratingCount: "0",
      lastUpdated: new Date().toISOString(),
    }

    // 1. Primary Method: Parse Google Chrome Web Store AF_initDataCallback 'ds:0'
    try {
      const ds0Match = html.match(
        /AF_initDataCallback\s*\(\s*\{key:\s*'ds:0'[\s\S]*?data:([\s\S]*?),\s*sideChannel:/,
      )
      if (ds0Match && ds0Match[1]) {
        const data = JSON.parse(ds0Match[1])
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
          const item = data[0]
          
          // Verify ID or extract fields
          if (!item[0] || item[0] === extensionId) {
            const rawRating = item[3]
            const rawRatingCount = item[4]
            const rawUsers = item[14]
            const rawName = item[2]

            if (rawRating !== undefined && rawRating !== null) {
              const num = Number(rawRating)
              stats.rating = !isNaN(num) && num > 0 ? num.toFixed(1) : "0"
            }

            if (rawRatingCount !== undefined && rawRatingCount !== null) {
              stats.ratingCount = String(rawRatingCount)
            }

            if (rawUsers !== undefined && rawUsers !== null) {
              stats.users = String(rawUsers)
            }

            if (rawName) {
              stats.name = String(rawName)
            }

            return stats
          }
        }
      }
    } catch (parseError) {
      console.warn(`Could not parse AF_initDataCallback for ${extensionId}:`, parseError)
    }

    // 2. Fallback Method: Scrape strictly from the top hero portion of the HTML
    // (Limits to 100KB to prevent matching recommended / related extensions at the bottom)
    const heroHtml = html.slice(0, 100000)

    const heroRatingMatch =
      heroHtml.match(/aria-label=["']([0-9.]+)\s+out of 5 stars["']/i) ||
      heroHtml.match(/class=["'][^"']*["']>([0-9.]+)\s*★<\/div>/i)
    
    if (heroRatingMatch) {
      const num = Number(heroRatingMatch[1])
      stats.rating = !isNaN(num) ? num.toFixed(1) : "0"
    }

    const heroUsersMatch =
      heroHtml.match(/([0-9,]+(?:\+)?)\s+users/i) ||
      heroHtml.match(/([0-9,]+(?:\+)?)\s+người dùng/i)

    if (heroUsersMatch) {
      stats.users = heroUsersMatch[1].replace(/,/g, "").replace(/\+/g, "")
    }

    const heroCountMatch =
      heroHtml.match(/\(([0-9,.]+)\s+ratings\)/i) ||
      heroHtml.match(/([0-9,.]+)\s+ratings/i) ||
      heroHtml.match(/([0-9,.]+)\s+lượt đánh giá/i)

    if (heroCountMatch) {
      stats.ratingCount = heroCountMatch[1].replace(/,/g, "")
    }

    return stats
  } catch (error) {
    console.error(`Error fetching stats for ${extensionId}:`, error)
    return null
  }
}

