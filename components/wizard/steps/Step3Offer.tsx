'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { getBusinessProfile } from '@/lib/types'
import type { WizardData } from '@/lib/types'

interface Props {
  data: WizardData
  onChange: (updates: Partial<WizardData>) => void
}

const CATEGORY_SUGGESTIONS = [
  'Pains', 'Viennoiseries', 'Pâtisseries', 'Traiteur',
  'Sandwichs', 'Boissons', 'Salon de thé', 'Plats chauds', 'Desserts', 'Bio',
]

function Step3Physical({ data, onChange }: Props) {
  const [categoryInput, setCategoryInput] = useState('')
  const categories = data.productCategories ?? []

  const addCategory = (value?: string) => {
    const trimmed = (value ?? categoryInput).trim()
    if (trimmed && !categories.includes(trimmed)) {
      onChange({ productCategories: [...categories, trimmed] })
      setCategoryInput('')
    }
  }

  const removeCategory = (cat: string) => {
    onChange({ productCategories: categories.filter(c => c !== cat) })
  }

  return (
    <div className="space-y-5">
      {/* Catégories */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Vos catégories de produits / services <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="Tapez une catégorie et appuyez Entrée"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCategory())}
            className="h-10 text-sm border-gray-200 focus:border-violet-500"
          />
          <button
            type="button"
            onClick={() => addCategory()}
            disabled={!categoryInput.trim()}
            className="px-4 h-10 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40 transition-colors"
          >
            Ajouter
          </button>
        </div>
        {/* Example pills */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {CATEGORY_SUGGESTIONS.filter(s => !categories.includes(s)).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => addCategory(s)}
              className="px-2.5 py-1 text-xs rounded-full border border-gray-200 text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map(cat => (
              <Badge key={cat} variant="secondary" className="gap-1 pl-3 pr-2 py-1 text-sm bg-violet-50 text-violet-700 border-violet-200">
                {cat}
                <button onClick={() => removeCategory(cat)} className="ml-1 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Produits signature */}
      <div className="space-y-2">
        <Label htmlFor="signatureProducts" className="text-sm font-medium text-gray-700">
          Vos produits / plats signature
          <span className="ml-2 text-xs font-normal text-gray-400">optionnel</span>
        </Label>
        <div className="relative">
          <Textarea
            id="signatureProducts"
            placeholder="Notre brioche feuilletée maison, le pain de campagne au levain, la tarte citron meringuée..."
            value={data.signatureProducts ?? ''}
            onChange={e => onChange({ signatureProducts: e.target.value })}
            maxLength={300}
            rows={3}
            className="resize-none text-base border-gray-200 focus:border-violet-500 pr-16"
          />
          <span className="absolute bottom-2 right-2 text-xs text-gray-400">
            {(data.signatureProducts ?? '').length}/300
          </span>
        </div>
      </div>

      {/* Horaires */}
      <div className="space-y-2">
        <Label htmlFor="openingHours" className="text-sm font-medium text-gray-700">
          Horaires d&apos;ouverture <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="openingHours"
          placeholder="Mardi au Dimanche : 7h - 19h30 / Fermé le lundi"
          value={data.openingHours ?? ''}
          onChange={e => onChange({ openingHours: e.target.value })}
          maxLength={200}
          rows={2}
          className="resize-none text-base border-gray-200 focus:border-violet-500"
        />
      </div>

      {/* Adresse */}
      <div className="space-y-2">
        <Label htmlFor="storeAddress" className="text-sm font-medium text-gray-700">
          Adresse de votre établissement
          <span className="ml-2 text-xs font-normal text-gray-400">optionnel</span>
        </Label>
        <Input
          id="storeAddress"
          placeholder="12 rue de la République, Lyon 69001"
          value={data.storeAddress ?? ''}
          onChange={e => onChange({ storeAddress: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={150}
        />
      </div>

      {/* Commandes sur mesure */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Commandes sur mesure</Label>
        <div className="flex gap-3">
          {[
            { label: 'Oui', value: true },
            { label: 'Non', value: false },
          ].map(opt => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange({ customOrders: opt.value })}
              className={[
                'px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                data.customOrders === opt.value
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'border-gray-200 text-gray-600 hover:border-violet-400 hover:text-violet-600',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Livraison */}
      <div className="space-y-2">
        <Label htmlFor="deliveryOptions" className="text-sm font-medium text-gray-700">
          Livraison / click &amp; collect
          <span className="ml-2 text-xs font-normal text-gray-400">optionnel</span>
        </Label>
        <Input
          id="deliveryOptions"
          placeholder="Click & collect disponible, Uber Eats, livraison sur demande"
          value={data.deliveryOptions ?? ''}
          onChange={e => onChange({ deliveryOptions: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={150}
        />
      </div>
    </div>
  )
}

function Step3Service({ data, onChange }: Props) {
  const [benefitInput, setBenefitInput] = useState('')

  const addBenefit = () => {
    const trimmed = benefitInput.trim()
    if (trimmed && !data.keyBenefits.includes(trimmed) && data.keyBenefits.length < 6) {
      onChange({ keyBenefits: [...data.keyBenefits, trimmed] })
      setBenefitInput('')
    }
  }

  const removeBenefit = (b: string) => {
    onChange({ keyBenefits: data.keyBenefits.filter(x => x !== b) })
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="offerName" className="text-sm font-medium text-gray-700">
          Nom du produit/service <span className="text-red-500">*</span>
        </Label>
        <Input
          id="offerName"
          placeholder="Le Programme Accélérateur de Croissance"
          value={data.offerName}
          onChange={e => onChange({ offerName: e.target.value })}
          className="h-12 text-base border-gray-200 focus:border-violet-500"
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="offerDescription" className="text-sm font-medium text-gray-700">
          Description complète <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Textarea
            id="offerDescription"
            placeholder="Décrivez votre produit ou service en détail. Qu'est-ce que c'est, comment ça fonctionne, qu'est-ce que ça inclut ?"
            value={data.offerDescription}
            onChange={e => onChange({ offerDescription: e.target.value })}
            maxLength={500}
            rows={3}
            className="resize-none text-base border-gray-200 focus:border-violet-500 pr-16"
          />
          <span className="absolute bottom-2 right-2 text-xs text-gray-400">
            {data.offerDescription.length}/500
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Bénéfices clés <span className="text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-gray-400">min. 3, max. 6</span>
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="Ajoutez un bénéfice et appuyez sur Entrée"
            value={benefitInput}
            onChange={e => setBenefitInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
            className="h-10 text-sm border-gray-200 focus:border-violet-500"
          />
          <button
            type="button"
            onClick={addBenefit}
            disabled={!benefitInput.trim() || data.keyBenefits.length >= 6}
            className="px-4 h-10 rounded-md bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40 transition-colors"
          >
            Ajouter
          </button>
        </div>
        {data.keyBenefits.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.keyBenefits.map(b => (
              <Badge key={b} variant="secondary" className="gap-1 pl-3 pr-2 py-1 text-sm bg-violet-50 text-violet-700 border-violet-200">
                {b}
                <button onClick={() => removeBenefit(b)} className="ml-1 hover:text-red-500 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="differentiator" className="text-sm font-medium text-gray-700">
          Qu&apos;est-ce qui vous différencie ? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="differentiator"
          placeholder="Contrairement aux autres solutions, nous..."
          value={data.differentiator}
          onChange={e => onChange({ differentiator: e.target.value })}
          maxLength={300}
          rows={2}
          className="resize-none text-base border-gray-200 focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pricePoint" className="text-sm font-medium text-gray-700">
            Tarif <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Input
            id="pricePoint"
            placeholder="$997/month"
            value={data.pricePoint}
            onChange={e => onChange({ pricePoint: e.target.value })}
            className="h-10 text-sm border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="socialProof" className="text-sm font-medium text-gray-700">
            Stats/preuve sociale <span className="text-xs text-gray-400">optionnel</span>
          </Label>
          <Input
            id="socialProof"
            placeholder="500+ clients, 4.9★"
            value={data.socialProofStats}
            onChange={e => onChange({ socialProofStats: e.target.value })}
            className="h-10 text-sm border-gray-200"
          />
        </div>
      </div>
    </div>
  )
}

export function Step3Offer({ data, onChange }: Props) {
  const profile = getBusinessProfile(data.industry)
  return profile === 'physical'
    ? <Step3Physical data={data} onChange={onChange} />
    : <Step3Service data={data} onChange={onChange} />
}
