/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdninstagram.com' },
      { protocol: 'https', hostname: 'instagram.com' },
      { protocol: 'https', hostname: '*.cdninstagram.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com https://app.cal.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://app.cal.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://*.cdninstagram.com https://www.facebook.com https://app.cal.com https://flagcdn.com",
              "connect-src 'self' https://*.supabase.co https://www.instagram.com https://app.cal.com https://cal.com",
              "frame-src https://www.googletagmanager.com https://app.cal.com https://cal.com *",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
