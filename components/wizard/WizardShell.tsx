'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import { Step1Business } from './steps/Step1Business'
import { Step2Audience } from './steps/Step2Audience'
import { Step3Offer } from './steps/Step3Offer'
import { Step4Style } from './steps/Step4Style'
import { Step5Contact } from './steps/Step5Contact'
import { GeneratingScreen } from './GeneratingScreen'
import { cn } from '@/lib/utils'
import { getBusinessProfile } from '@/lib/types'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const STEPS = [
  { title: 'Votre business', subtitle: 'Dites-nous qui vous êtes' },
  { title: 'Votre audience', subtitle: 'À qui vous adressez-vous ?' },
  { title: 'Votre offre', subtitle: 'Que vendez-vous ?' },
  { title: 'Style visuel', subtitle: 'Comment doit-il paraître ?' },
  { title: "Appel à l'action", subtitle: 'Comment vous contacter ?' },
]

function validateStep(step: number, data: ReturnType<typeof useWizard>['data']): string | null {
  if (step === 0) {
    if (!data.businessName.trim()) return 'Le nom du business est requis'
    if (!data.industry) return 'Veuillez sélectionner votre secteur'
  }
  if (step === 1) {
    const profile = getBusinessProfile(data.industry)
    if (!data.targetAudience.trim()) return 'Veuillez décrire votre clientèle'
    if (profile === 'service') {
      if (!data.mainProblem.trim()) return 'Veuillez décrire le problème que vous résolvez'
      if (!data.desiredOutcome.trim()) return 'Veuillez décrire le résultat souhaité'
    }
  }
  if (step === 2) {
    const profile = getBusinessProfile(data.industry)
    if (profile === 'physical') {
      if ((data.productCategories ?? []).length < 1) return 'Ajoutez au moins une catégorie de produits'
      if (!(data.openingHours ?? '').trim()) return 'Les horaires d\'ouverture sont requis'
    } else {
      if (!data.offerName.trim()) return 'Le nom du produit/service est requis'
      if (!data.offerDescription.trim()) return 'La description est requise'
      if (data.keyBenefits.length < 3) return 'Ajoutez au moins 3 bénéfices clés'
      if (!data.differentiator.trim()) return 'Veuillez décrire ce qui vous différencie'
    }
  }
  if (step === 4) {
    if (!data.ctaText.trim()) return "Le texte du bouton d'appel à l'action est requis"
    if (!data.contactEmail.trim()) return "L'email de contact est requis"
  }
  return null
}

export function WizardShell() {
  const router = useRouter()
  const { currentStep, data, updateData, next, back, isGenerating, setIsGenerating } = useWizard()

  const handleNext = () => {
    const error = validateStep(currentStep, data)
    if (error) {
      toast.error(error)
      return
    }
    if (currentStep < 4) {
      next()
    } else {
      handleGenerate()
    }
  }

  const handleGenerate = async () => {
    const error = validateStep(4, data)
    if (error) { toast.error(error); return }

    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wizardData: data }),
      })
      if (!res.ok) throw new Error('Échec de la génération')
      const { sessionId } = await res.json()
      router.push(`/preview/${sessionId}`)
    } catch {
      setIsGenerating(false)
      toast.error('La génération a échoué. Veuillez réessayer.')
    }
  }

  const steps = [
    <Step1Business key={0} data={data} onChange={updateData} />,
    <Step2Audience key={1} data={data} onChange={updateData} />,
    <Step3Offer key={2} data={data} onChange={updateData} />,
    <Step4Style key={3} data={data} onChange={updateData} />,
    <Step5Contact key={4} data={data} onChange={updateData} />,
  ]

  return (
    <>
      {isGenerating && <GeneratingScreen />}

      <div className="min-h-screen flex flex-col" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 70%), #f8fafc'
      }}>
        {/* Dot grid overlay — matches homepage */}
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed18 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Header — matches SiteNav */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-gray-900">
              Forja<span className="text-violet-600">.ai</span>
            </a>
            <span className="text-sm font-medium text-gray-400">
              Étape <span className="text-violet-600 font-semibold">{currentStep + 1}</span> / {STEPS.length}
            </span>
          </div>
        </header>

        {/* Progress bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className={cn(
                    'flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all',
                    i < currentStep
                      ? 'bg-violet-600 text-white'
                      : i === currentStep
                        ? 'bg-violet-100 text-violet-600 ring-2 ring-violet-500'
                        : 'bg-gray-100 text-gray-400'
                  )}>
                    {i < currentStep ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      'h-0.5 flex-1 mx-2 rounded transition-all',
                      i < currentStep ? 'bg-violet-600' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="max-w-2xl mx-auto w-full px-6 pt-10 pb-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{STEPS[currentStep].title}</h1>
              <p className="text-gray-500">{STEPS[currentStep].subtitle}</p>
            </div>

            <div key={currentStep} className="animate-in slide-in-from-right-4 duration-300">
              {steps[currentStep]}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-1px_0_0_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl mx-auto px-6 h-20 flex items-center justify-between">
            <button
              onClick={back}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-0 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            <button
              onClick={handleNext}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm',
                currentStep === 4
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:from-violet-700 hover:to-orange-600 shadow-violet-200 shadow-lg'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              )}
            >
              {currentStep === 4 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Générer ma landing page
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
