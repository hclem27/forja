import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSession, updateHtml } from '@/lib/store'
import { checkEditLimit, getEditCount } from '@/lib/rateLimit'

export const maxDuration = 60

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const session = getSession(sessionId)

  if (!session) {
    return NextResponse.json({ error: 'Session introuvable' }, { status: 404 })
  }

  const { instruction } = await req.json()
  if (!instruction?.trim()) {
    return NextResponse.json({ error: 'Instruction manquante' }, { status: 400 })
  }

  // Edit rate limit — skip in dev mode
  if (process.env.NODE_ENV !== 'development') {
    const { allowed, remaining } = checkEditLimit(sessionId)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Limite de modifications atteinte (5 max par site généré).', limitReached: true },
        { status: 429 }
      )
    }
    console.log(`[edit] session ${sessionId.slice(0, 8)} — remaining edits: ${remaining}`)
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    system: `You are editing an existing HTML landing page. The user will give you one specific change to make.
Apply ONLY the requested change. Return the complete HTML file with that change applied.
Preserve all other content, styles, and structure exactly.
Output ONLY raw HTML starting with <!DOCTYPE html>. No markdown, no explanation.`,
    messages: [{
      role: 'user',
      content: `Apply this change to the page: "${instruction}"\n\nCurrent HTML:\n${session.html}`,
    }],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return NextResponse.json({ error: 'Erreur de génération' }, { status: 500 })
  }

  let html = content.text.trim()
  if (html.startsWith('```')) {
    html = html.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '').trim()
  }

  updateHtml(sessionId, html)
  return NextResponse.json({ ok: true })
}
