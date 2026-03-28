import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('username')

  if (!raw) {
    return NextResponse.json({ error: 'Username obrigatório.' }, { status: 400 })
  }

  const username = raw.replace(/[^a-zA-Z0-9._]/g, '').slice(0, 30)

  if (!username) {
    return NextResponse.json({ error: 'Username inválido.' }, { status: 400 })
  }

  const token = process.env.APIFY_TOKEN

  if (token) {
    try {
      const res = await fetch(
        `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${token}&timeout=25`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usernames: [username] }),
          next: { revalidate: 0 },
        }
      )

      if (res.ok) {
        const items = await res.json()
        const u = Array.isArray(items) ? items[0] : null

        if (u && u.username) {
          const rawPic = u.profilePicUrl ?? u.profilePicUrlHD ?? ''
          const profile_pic_url = rawPic
            ? `/api/proxy-image?url=${encodeURIComponent(rawPic)}`
            : ''

          return NextResponse.json({
            profile: {
              username: u.username ?? username,
              full_name: u.fullName ?? '',
              followers_count: u.followersCount ?? 0,
              following_count: u.followsCount ?? 0,
              profile_pic_url,
              is_verified: u.isVerified ?? false,
              biography: u.biography ?? '',
              external_url: u.externalUrl ?? null,
              media_count: u.postsCount ?? 0,
              category: u.businessCategoryName ?? null,
              exists: true,
            },
          })
        }
      }
    } catch {
      // continua para fallback
    }
  }

  return NextResponse.json({ profile: buildFallbackProfile(username) })
}

function buildFallbackProfile(username: string) {
  return {
    username,
    full_name: '',
    followers_count: 0,
    following_count: 0,
    profile_pic_url: '',
    is_verified: false,
    biography: '',
    external_url: null,
    media_count: 0,
    category: null,
    exists: true,
  }
}
