import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_CENTS } from '@/lib/stripe'
import { getSession } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json()
    const site = getSession(sessionId)

    if (!site) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: PRICE_CENTS,
            product_data: {
              name: `Landing page — ${site.wizardData.businessName}`,
              description: 'Site vitrine complet généré par IA. HTML + CSS + images libres de droits. Prêt à déployer.',
              images: [],
            },
          },
        },
      ],
      metadata: { sessionId },
      success_url: `${appUrl}/preview/${sessionId}?payment=success`,
      cancel_url: `${appUrl}/preview/${sessionId}`,
    })

    return NextResponse.json({ checkoutUrl: checkoutSession.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
