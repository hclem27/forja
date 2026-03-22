'use client'

import { useState } from 'react'
import { Loader2, Sparkles, RotateCcw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

const MAX_EDITS = 5

const SUGGESTIONS = [
  'Modifie le titre principal',
  'Rends les textes plus percutants',
  'Change les couleurs pour quelque chose de plus sombre',
  'Ajoute une section FAQ',
  'Traduis tout le site en anglais',
  'Rends le ton plus professionnel',
  'Ajoute des emojis pour rendre ça plus fun',
  'Simplifie les textes, ils sont trop longs',
]

interface Props {
  sessionId: string
  onRefresh: () => void
}

export function EditPanel({ sessionId, onRefresh }: Props) {
  const [instruction, setInstruction] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [editsUsed, setEditsUsed] = useState(0)
  const [limitReached, setLimitReached] = useState(false)

  const apply = async (text?: string) => {
    const toApply = (text ?? instruction).trim()
    if (!toApply) return

    setLoading(true)
    try {
      const res = await fetch(`/api/edit/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: toApply }),
      })
      const json = await res.json()
      if (!res.ok) {
        if (json.limitReached) { setLimitReached(true); return }
        throw new Error()
      }
      const newCount = editsUsed + 1
      setEditsUsed(newCount)
      if (newCount >= MAX_EDITS) setLimitReached(true)
      setHistory(h => [toApply, ...h.slice(0, 4)])
      setInstruction('')
      onRefresh()
      toast.success('Modification appliquée !')
    } catch {
      toast.error('Échec de la modification. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-5 gap-5">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Modifier le contenu</h3>
        <p className="text-xs text-gray-500">Décrivez ce que vous voulez changer. Claude applique la modification en ~20s.</p>
        <div className="flex items-center gap-1.5 mt-2">
          {Array.from({ length: MAX_EDITS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i < editsUsed ? 'bg-violet-400' : 'bg-gray-200'}`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1 shrink-0">{MAX_EDITS - editsUsed} restantes</span>
        </div>
      </div>

      {limitReached && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Limite de {MAX_EDITS} modifications atteinte. Téléchargez votre site ou régénérez-en un nouveau.</p>
        </div>
      )}

      {/* Input */}
      <div className="space-y-2">
        <textarea
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) apply()
          }}
          placeholder="Ex : Modifie le titre pour qu'il soit plus accrocheur..."
          rows={3}
          disabled={loading || limitReached}
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50 placeholder:text-gray-400"
        />
        <button
          onClick={() => apply()}
          disabled={!instruction.trim() || loading || limitReached}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Modification en cours...</>
            : <><Sparkles className="w-4 h-4" /> Appliquer</>
          }
        </button>
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Suggestions rapides</p>
        <div className="flex flex-col gap-1.5">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => apply(s)}
              disabled={loading}
              className="text-left text-xs text-gray-600 hover:text-violet-700 hover:bg-violet-50 px-3 py-2 rounded-lg border border-transparent hover:border-violet-100 transition-all disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Modifications récentes</p>
          <div className="flex flex-col gap-1">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => apply(h)}
                disabled={loading}
                className="flex items-center gap-2 text-left text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                <RotateCcw className="w-3 h-3 shrink-0 text-gray-400" />
                <span className="truncate">{h}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
