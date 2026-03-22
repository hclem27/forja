import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/store'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const site = getSession(sessionId)

  if (!site) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json({ paid: site.paid })
}
