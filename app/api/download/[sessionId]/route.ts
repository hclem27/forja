import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/store'
import { buildSiteZip } from '@/lib/zip'

export const maxDuration = 60

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const site = getSession(sessionId)

  if (!site) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (!site.paid) {
    return NextResponse.json({ error: 'Payment required' }, { status: 402 })
  }

  const zipBuffer = await buildSiteZip(site.html, site.wizardData.businessName)
  const filename = `${site.wizardData.businessName.toLowerCase().replace(/\s+/g, '-')}-landing-page.zip`

  return new NextResponse(zipBuffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': zipBuffer.length.toString(),
    },
  })
}
