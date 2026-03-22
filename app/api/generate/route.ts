import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { generateLandingPage } from '@/lib/claude'
import { setSession } from '@/lib/store'
import { checkGenerationLimit } from '@/lib/rateLimit'
import { sendPreviewEmail } from '@/lib/email'
import type { WizardData } from '@/lib/types'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const wizardData: WizardData = body.wizardData

    if (!wizardData?.businessName) {
      return NextResponse.json({ error: 'Missing wizard data' }, { status: 400 })
    }

    // Rate limiting — skip in dev mode
    if (process.env.NODE_ENV !== 'development') {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
      const { allowed, remaining, resetIn } = checkGenerationLimit(ip)
      if (!allowed) {
        const hours = Math.ceil(resetIn / 3600000)
        return NextResponse.json(
          { error: `Limite atteinte. Vous pouvez générer ${process.env.MAX_GENERATIONS ?? 2} sites par 24h. Réessayez dans ${hours}h.` },
          { status: 429 }
        )
      }
      console.log(`[generate] IP ${ip} — remaining today: ${remaining}`)
    }

    const html = await generateLandingPage(wizardData)
    const sessionId = uuidv4()

    const isDev = process.env.NODE_ENV === 'development'

    setSession(sessionId, {
      html,
      wizardData,
      createdAt: Date.now(),
      paid: isDev,
    })

    // Send preview link by email (fire & forget — don't block the response)
    if (wizardData.contactEmail && process.env.RESEND_API_KEY) {
      sendPreviewEmail({
        to: wizardData.contactEmail,
        businessName: wizardData.businessName,
        sessionId,
      }).catch(err => console.error('[email] Failed to send preview email:', err))
    }

    return NextResponse.json({ sessionId })
  } catch (err) {
    console.error('Generation error:', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
