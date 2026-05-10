export interface WebstoreStats {
  id: string
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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js if used in page
    })

    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)

    const html = await response.text()

    // Scrape user count: looking for "X users"
    const userMatch =
      html.match(/class=["'][^"']*["']>([^<]*?)\s+users<\/div>/i) ||
      html.match(/(\d{1,3}(,\d{3})*(\+)?)\s+users/i)

    // Scrape rating: looking for the numeric rating value (e.g. 4.8)
    const ratingMatch =
      html.match(/aria-label=["']Average rating ([0-9.]+) out of 5/i) ||
      html.match(/aria-label=["']Rated ([0-9.]+) out of 5/i) ||
      html.match(/class=["'][^"']*["']>([0-9.]{1,3})<\/div>[^<]*?aria-label=["']ratings/i) ||
      html.match(/<div[^>]*?>([0-9.]{1,3})<\/div>[^<]*?average rating/i)

    // Scrape rating count
    const countMatch =
      html.match(/\(([0-9,.]+)\s+ratings\)/i) ||
      html.match(/([0-9,.]+)\s+ratings/i) ||
      html.match(/([0-9,.]+)\s+lượt đánh giá/i)

    return {
      id: extensionId,
      users: userMatch ? userMatch[1] : "0",
      rating: ratingMatch ? ratingMatch[1] : "0",
      ratingCount: countMatch ? countMatch[1] : "0",
      lastUpdated: new Date().toISOString(),
    }
  } catch (error) {
    console.error(`Error fetching stats for ${extensionId}:`, error)
    return null
  }
}
