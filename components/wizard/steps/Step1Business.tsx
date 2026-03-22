'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { WizardData } from '@/lib/types'

const INDUSTRIES: { label: string; emoji: string; value: string }[] = [
  { label: 'SaaS / Tech', emoji: '🖥️', value: 'saas/tech' },
  { label: 'Conseil / Agence', emoji: '💼', value: 'consulting' },
  { label: 'E-commerce', emoji: '🛍️', value: 'e-commerce' },
  { label: 'Restaurant / Food', emoji: '🍽️', value: 'restaurant/food' },
  { label: 'Sport / Bien-être', emoji: '💪', value: 'fitness/wellness' },
  { label: 'Immobilier', emoji: '🏠', value: 'real estate' },
  { label: 'Formation / Coaching', emoji: '🎓', value: 'education/coaching' },
  { label: 'Santé', emoji: '🏥', value: 'health' },
  { label: 'Finance', emoji: '💰', value: 'finance' },
  { label: 'Créatif / Design', emoji: '🎨', value: 'creative/design' },
  { label: 'Autre', emoji: '⚡', value: 'other' },
]

interface Props {
  data: WizardData
  onChange: (updates: Partial<WizardData>) => void
}

export function Step1Business({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
          Nom du business <span className="text-red-500">*</span>
        </Label>
        <Input
          id="businessName"
          placeholder="Acme Conseil"
          value={data.businessName}
          onChange={e => onChange({ businessName: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline" className="text-sm font-medium text-gray-700">
          Accroche / Slogan
          <span className="ml-2 text-xs text-gray-400">optionnel</span>
        </Label>
        <Input
          id="tagline"
          placeholder="Nous aidons X à atteindre Y"
          value={data.tagline}
          onChange={e => onChange({ tagline: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={120}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Secteur d&apos;activité <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {INDUSTRIES.map(ind => (
            <button
              key={ind.value}
              type="button"
              onClick={() => onChange({ industry: ind.value })}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center transition-all',
                data.industry === ind.value
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              <span className="text-2xl leading-none">{ind.emoji}</span>
              <span className={cn(
                'text-xs font-medium leading-tight',
                data.industry === ind.value ? 'text-violet-700' : 'text-gray-600',
              )}>
                {ind.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-gray-700">
            Localisation <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Input
            id="location"
            placeholder="Paris, France"
            value={data.location ?? ''}
            onChange={e => onChange({ location: e.target.value })}
            className="h-12 text-base border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Ancienneté <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Select value={data.yearsInBusiness ?? ''} onValueChange={v => onChange({ yearsInBusiness: v ?? undefined })}>
            <SelectTrigger className="h-12 text-base border-gray-200 focus:border-violet-500 focus:ring-violet-500">
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Tout juste démarré</SelectItem>
              <SelectItem value="1-2">1-2 ans</SelectItem>
              <SelectItem value="3-5">3-5 ans</SelectItem>
              <SelectItem value="5-10">5-10 ans</SelectItem>
              <SelectItem value="10+">10 ans et plus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
