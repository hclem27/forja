export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://forja.ai'
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /preview-frame/\n\nSitemap: ${baseUrl}/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  )
}
