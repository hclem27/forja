import type { GeneratedSite } from './types'

declare global {
  // eslint-disable-next-line no-var
  var __pageStore: Map<string, GeneratedSite> | undefined
}

// Use globalThis to survive Next.js hot-reload in dev
const store: Map<string, GeneratedSite> = globalThis.__pageStore ?? new Map()
if (!globalThis.__pageStore) globalThis.__pageStore = store

const TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export function setSession(id: string, data: GeneratedSite) {
  store.set(id, data)
  setTimeout(() => store.delete(id), TTL_MS)
}

export function getSession(id: string): GeneratedSite | undefined {
  return store.get(id)
}

export function markPaid(id: string, stripeSessionId: string) {
  const existing = store.get(id)
  if (existing) store.set(id, { ...existing, paid: true, stripeSessionId })
}

export function updateHtml(id: string, html: string) {
  const existing = store.get(id)
  if (existing) store.set(id, { ...existing, html })
}
