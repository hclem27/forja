// In-memory rate limiter — resets on server restart (fine for MVP)

interface RateLimitEntry {
  count: number
  resetAt: number
}

declare global {
  // eslint-disable-next-line no-var
  var __rateLimitStore: Map<string, RateLimitEntry> | undefined
  // eslint-disable-next-line no-var
  var __editCountStore: Map<string, number> | undefined
}

const ipStore: Map<string, RateLimitEntry> = globalThis.__rateLimitStore ?? new Map()
if (!globalThis.__rateLimitStore) globalThis.__rateLimitStore = ipStore

const editStore: Map<string, number> = globalThis.__editCountStore ?? new Map()
if (!globalThis.__editCountStore) globalThis.__editCountStore = editStore

// Max 2 generations per IP per 24h
const MAX_GENERATIONS = 2
const GENERATION_WINDOW_MS = 24 * 60 * 60 * 1000

// Max 5 edits per session
const MAX_EDITS_PER_SESSION = 5

export function checkGenerationLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = ipStore.get(ip)

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + GENERATION_WINDOW_MS })
    return { allowed: true, remaining: MAX_GENERATIONS - 1, resetIn: GENERATION_WINDOW_MS }
  }

  if (entry.count >= MAX_GENERATIONS) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true, remaining: MAX_GENERATIONS - entry.count, resetIn: entry.resetAt - now }
}

export function checkEditLimit(sessionId: string): { allowed: boolean; remaining: number } {
  const count = editStore.get(sessionId) ?? 0
  if (count >= MAX_EDITS_PER_SESSION) {
    return { allowed: false, remaining: 0 }
  }
  editStore.set(sessionId, count + 1)
  return { allowed: true, remaining: MAX_EDITS_PER_SESSION - count - 1 }
}

export function getEditCount(sessionId: string): number {
  return editStore.get(sessionId) ?? 0
}
