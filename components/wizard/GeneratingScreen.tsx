'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { label: 'Analyse de votre business', detail: 'Secteur, audience, positionnement...' },
  { label: 'Rédaction de l\'accroche', detail: 'Titre percutant, sous-titre, proposition de valeur...' },
  { label: 'Architecture des sections', detail: 'Hero, fonctionnalités, témoignages, CTA...' },
  { label: 'Identité visuelle', detail: 'Couleurs, typographie, hiérarchie...' },
  { label: 'Textes persuasifs', detail: 'Copywriting orienté conversion...' },
  { label: 'Mise en page & animations', detail: 'Responsive, micro-interactions, scroll effects...' },
  { label: 'Optimisation SEO', detail: 'Balises meta, structure sémantique...' },
  { label: 'Finalisation', detail: 'Vérification, nettoyage du code...' },
]

const MILESTONES = [6, 18, 30, 44, 57, 72, 86, 99]

export function GeneratingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(4)
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.')
    }, 500)
    return () => clearInterval(dotsTimer)
  }, [])

  useEffect(() => {
    setProgress(MILESTONES[0])
    let idx = 0
    const timer = setInterval(() => {
      idx++
      if (idx < STEPS.length) {
        setCurrentStep(idx)
        setProgress(MILESTONES[idx])
      }
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex bg-[#0a0a0f]">
      {/* Left — visual */}
      <div className="hidden lg:flex flex-col flex-1 items-center justify-center relative overflow-hidden border-r border-white/5">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Forja logo */}
        <div className="relative z-10 text-center">
          <p className="text-2xl font-bold text-white mb-12 tracking-tight">
            Forja<span className="text-violet-400">.ai</span>
          </p>

          {/* Animated rings */}
          <div className="relative w-48 h-48 mx-auto mb-12">
            <div className="absolute inset-0 rounded-full border border-violet-500/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-4 rounded-full border border-violet-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            <div className="absolute inset-8 rounded-full border border-violet-500/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            <div className="absolute inset-12 rounded-full bg-violet-600/10 border border-violet-500/40 flex items-center justify-center">
              {/* Spinning arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin" style={{ animationDuration: '2s' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="72 216" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-3xl font-bold text-white">{progress}%</span>
            </div>
          </div>

          <p className="text-white/40 text-sm max-w-[200px] mx-auto leading-relaxed">
            L'IA travaille sur votre landing page
          </p>
        </div>
      </div>

      {/* Right — steps list */}
      <div className="flex flex-col justify-center w-full lg:w-[480px] px-8 lg:px-14">
        {/* Mobile logo */}
        <p className="lg:hidden text-xl font-bold text-white mb-10 tracking-tight">
          Forja<span className="text-violet-400">.ai</span>
        </p>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-1">Génération en cours{dots}</h2>
          <p className="text-white/40 text-sm">Environ 30–60 secondes, ne fermez pas l'onglet.</p>
        </div>

        {/* Steps */}
        <div className="space-y-1">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep
            const isCurrent = i === currentStep
            const isFuture = i > currentStep

            return (
              <div
                key={i}
                className={`flex items-start gap-4 px-4 py-3 rounded-xl transition-all duration-500 ${
                  isCurrent ? 'bg-white/5' : ''
                }`}
              >
                {/* Indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-violet-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/10" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-tight transition-colors duration-300 ${
                    isCompleted ? 'text-white/50 line-through decoration-white/20' :
                    isCurrent ? 'text-white' :
                    'text-white/20'
                  }`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-violet-400/80 mt-0.5 animate-in fade-in duration-500">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-10">
          <div className="flex justify-between text-xs text-white/30 mb-2">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #7c3aed, #f97316)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
