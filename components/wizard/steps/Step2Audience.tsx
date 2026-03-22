'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getBusinessProfile } from '@/lib/types'
import type { WizardData } from '@/lib/types'

interface FieldProps {
  id: string
  label: string
  placeholder: string
  example: string
  value: string
  onChange: (v: string) => void
  maxLength?: number
  rows?: number
}

function TextareaField({ id, label, placeholder, example, value, onChange, maxLength = 300, rows = 3 }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          maxLength={maxLength}
          rows={rows}
          className="resize-none text-base border-gray-200 focus:border-violet-500 pr-16"
        />
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
          {value.length}/{maxLength}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onChange(example)}
        className="text-xs text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Utiliser l&apos;exemple
      </button>
    </div>
  )
}

interface Props {
  data: WizardData
  onChange: (updates: Partial<WizardData>) => void
}

function Step2Physical({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <TextareaField
        id="establishmentVibe"
        label="Ambiance de votre établissement"
        placeholder="Chaleureux et familial, terrasse en été, salon de thé cosy..."
        example="Ambiance chaleureuse et familiale, décoration vintage, espace salon de thé cosy à l'étage, terrasse ombragée en été."
        value={data.establishmentVibe ?? ''}
        onChange={v => onChange({ establishmentVibe: v })}
      />
      <TextareaField
        id="targetAudience"
        label="Votre clientèle habituelle"
        placeholder="Familles du quartier, touristes, professionnels en pause déjeuner..."
        example="Familles du quartier le week-end, professionnels en pause déjeuner, touristes de passage, habitués fidèles du matin."
        value={data.targetAudience}
        onChange={v => onChange({ targetAudience: v })}
      />
      <div className="space-y-2">
        <Label htmlFor="localArea" className="text-sm font-medium text-gray-700">
          Votre zone <span className="text-red-500">*</span>
        </Label>
        <Input
          id="localArea"
          placeholder="Quartier des Batignolles, Paris 17e"
          value={data.localArea ?? ''}
          onChange={e => onChange({ localArea: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={100}
        />
      </div>
    </div>
  )
}

function Step2Service({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <TextareaField
        id="targetAudience"
        label="Qui est votre client idéal ?"
        placeholder="Décrivez votre audience cible en détail..."
        example="Propriétaires de petites entreprises de 30 à 50 ans qui veulent développer leur présence en ligne mais n'ont pas les compétences techniques ni le temps pour gérer des outils complexes."
        value={data.targetAudience}
        onChange={v => onChange({ targetAudience: v })}
      />
      <TextareaField
        id="mainProblem"
        label="Quel problème ont-ils ?"
        placeholder="Qu'est-ce qui les frustre le plus ? Qu'est-ce qui les empêche de dormir ?"
        example="Ils perdent des heures à essayer de comprendre des créateurs de sites compliqués, obtiennent des résultats peu esthétiques et ne reçoivent toujours pas de clients via leur site."
        value={data.mainProblem}
        onChange={v => onChange({ mainProblem: v })}
      />
      <TextareaField
        id="desiredOutcome"
        label="Quel résultat veulent-ils ?"
        placeholder="À quoi ressemble le succès pour eux ?"
        example="Un site professionnel qui attire automatiquement de nouveaux clients, pour qu'ils puissent se concentrer sur leur activité plutôt que sur le marketing."
        value={data.desiredOutcome}
        onChange={v => onChange({ desiredOutcome: v })}
      />
    </div>
  )
}

export function Step2Audience({ data, onChange }: Props) {
  const profile = getBusinessProfile(data.industry)
  return profile === 'physical'
    ? <Step2Physical data={data} onChange={onChange} />
    : <Step2Service data={data} onChange={onChange} />
}
