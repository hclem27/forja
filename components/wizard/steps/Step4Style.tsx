'use client'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { WizardData, DesignMood, FontStyle } from '@/lib/types'

const MOODS: { value: DesignMood; label: string; desc: string; preview: string }[] = [
  { value: 'professional', label: 'Professionnel', desc: 'Fiable & autoritaire', preview: 'bg-gradient-to-br from-slate-800 to-blue-900' },
  { value: 'bold', label: 'Audacieux', desc: 'Énergique & percutant', preview: 'bg-gradient-to-br from-red-500 to-orange-500' },
  { value: 'warm', label: 'Chaleureux', desc: 'Convivial & accessible', preview: 'bg-gradient-to-br from-amber-400 to-orange-400' },
  { value: 'minimal', label: 'Minimaliste', desc: 'Épuré & sophistiqué', preview: 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300' },
  { value: 'luxury', label: 'Luxe', desc: 'Premium & exclusif', preview: 'bg-gradient-to-br from-gray-900 to-yellow-900' },
  { value: 'creative', label: 'Créatif', desc: 'Expressif & moderne', preview: 'bg-gradient-to-br from-purple-500 to-pink-500' },
]

const FONTS: { value: FontStyle; label: string; sample: string; font: string }[] = [
  { value: 'modern-sans', label: 'Sans-serif moderne', sample: 'Aa', font: 'font-sans' },
  { value: 'elegant-serif', label: 'Serif élégant', sample: 'Aa', font: 'font-serif' },
  { value: 'technical', label: 'Technique', sample: 'Aa', font: 'font-mono' },
  { value: 'humanist', label: 'Humaniste', sample: 'Aa', font: 'font-sans' },
]

const PRESET_COLORS = [
  '#6366f1', '#3b82f6', '#10b981', '#f59e0b',
  '#ef4444', '#8b5cf6', '#06b6d4', '#f97316',
]

interface Props {
  data: WizardData
  onChange: (updates: Partial<WizardData>) => void
}

export function Step4Style({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Design Mood */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Ambiance du design <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {MOODS.map(mood => (
            <button
              key={mood.value}
              type="button"
              onClick={() => onChange({ designMood: mood.value })}
              className={cn(
                'group flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all',
                data.designMood === mood.value
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <div className={cn('w-full h-10 rounded-lg', mood.preview)} />
              <div>
                <p className="text-xs font-semibold text-gray-800">{mood.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{mood.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Couleur principale de la marque <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => onChange({ colorPreference: color })}
                style={{ backgroundColor: color }}
                className={cn(
                  'w-8 h-8 rounded-full transition-transform hover:scale-110 ring-2 ring-offset-2',
                  data.colorPreference === color ? 'ring-gray-800' : 'ring-transparent'
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
            <input
              type="color"
              value={data.colorPreference}
              onChange={e => onChange({ colorPreference: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
            />
            <Input
              value={data.colorPreference}
              onChange={e => onChange({ colorPreference: e.target.value })}
              className="h-7 w-24 text-xs border-0 p-0 focus-visible:ring-0 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Font Style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Style typographique <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {FONTS.map(font => (
            <button
              key={font.value}
              type="button"
              onClick={() => onChange({ fontStyle: font.value })}
              className={cn(
                'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
                data.fontStyle === font.value
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <span className={cn('text-3xl font-bold text-gray-700', font.font)}>
                {font.sample}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{font.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Brand references */}
      <div className="space-y-2">
        <Label htmlFor="brandRef" className="text-sm font-medium text-gray-700">
          Marques de référence <span className="text-xs text-gray-400">optionnel</span>
        </Label>
        <Input
          id="brandRef"
          placeholder="Apple, Notion, Stripe..."
          value={data.brandReferences}
          onChange={e => onChange({ brandReferences: e.target.value })}
          className="h-10 text-sm border-gray-200"
        />
      </div>
    </div>
  )
}
