import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/store'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const site = getSession(sessionId)

  if (!site) {
    return new NextResponse('<h1>Session expired or not found</h1>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new NextResponse(site.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
    },
  })
}
