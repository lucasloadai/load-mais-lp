import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { username } = await req.json()

  if (!username) {
    return NextResponse.json({ error: 'Username obrigatório.' }, { status: 400 })
  }

  const clean = username.replace(/[^a-zA-Z0-9._]/g, '').slice(0, 30)
  const token = process.env.APIFY_TOKEN

  if (!token) {
    return NextResponse.json({ posts: [] })
  }

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-post-scraper/run-sync-get-dataset-items?token=${token}&timeout=25`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directUrls: [`https://www.instagram.com/${clean}/`],
          resultsLimit: 3,
        }),
        next: { revalidate: 0 },
      }
    )

    if (!res.ok) return NextResponse.json({ posts: [] })

    const items = await res.json()
    const raw = Array.isArray(items) ? items : []

    const posts = raw.slice(0, 3).map((p) => ({
      caption: p.caption ?? p.text ?? '',
      likes: p.likesCount ?? p.likes ?? 0,
      comments: p.commentsCount ?? p.comments ?? 0,
      timestamp: p.timestamp ?? '',
      type: p.type ?? '',
    }))

    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
