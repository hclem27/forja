'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getBusinessProfile } from '@/lib/types'
import type { WizardData } from '@/lib/types'

const CTA_SUGGESTIONS_SERVICE = [
  'Commencer maintenant', 'Réserver un appel gratuit', 'Démarrer l\'essai gratuit',
  'Obtenir un devis', 'Acheter maintenant', 'En savoir plus',
]

const CTA_SUGGESTIONS_PHYSICAL = [
  'Venez nous rendre visite', 'Réservez votre table', 'Commandez en ligne',
  'Voir la carte', 'Passez nous voir', 'Contactez-nous',
]

interface Props {
  data: WizardData
  onChange: (updates: Partial<WizardData>) => void
}

export function Step5Contact({ data, onChange }: Props) {
  const profile = getBusinessProfile(data.industry)
  const ctaSuggestions = profile === 'physical' ? CTA_SUGGESTIONS_PHYSICAL : CTA_SUGGESTIONS_SERVICE

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Texte du bouton principal <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Commencer maintenant"
          value={data.ctaText}
          onChange={e => onChange({ ctaText: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={40}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {ctaSuggestions.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ctaText: s })}
              className="px-3 py-1 text-xs rounded-full border border-gray-200 text-gray-600 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ctaUrl" className="text-sm font-medium text-gray-700">
          URL du bouton <span className="text-xs text-gray-400">optionnel</span>
        </Label>
        <Input
          id="ctaUrl"
          type="url"
          placeholder="https://calendly.com/yourname"
          value={data.ctaUrl}
          onChange={e => onChange({ ctaUrl: e.target.value })}
          className="h-10 text-sm border-gray-200 focus:border-violet-500"
        />
        {profile === 'physical' && (
          <p className="text-xs text-gray-400">
            Les horaires saisis à l&apos;étape précédente apparaîtront sur le site.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email de contact <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="hello@yourbusiness.com"
          value={data.contactEmail}
          onChange={e => onChange({ contactEmail: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Téléphone <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={data.phoneNumber}
            onChange={e => onChange({ phoneNumber: e.target.value })}
            className="h-10 text-sm border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="awards" className="text-sm font-medium text-gray-700">
            Prix / certifications <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Input
            id="awards"
            placeholder="Certifié ISO, Forbes 30u30"
            value={data.awards}
            onChange={e => onChange({ awards: e.target.value })}
            className="h-10 text-sm border-gray-200"
          />
        </div>
      </div>
    </div>
  )
}
