'use client'

import { useState, useCallback } from 'react'
import type { WizardData, DesignMood, FontStyle } from '@/lib/types'

const INITIAL_DATA: WizardData = {
  businessName: '',
  tagline: '',
  industry: '',
  location: '',
  yearsInBusiness: '',
  targetAudience: '',
  mainProblem: '',
  desiredOutcome: '',
  offerName: '',
  offerDescription: '',
  keyBenefits: [],
  differentiator: '',
  pricePoint: '',
  socialProofStats: '',
  designMood: 'professional' as DesignMood,
  colorPreference: '#6366f1',
  fontStyle: 'modern-sans' as FontStyle,
  brandReferences: '',
  ctaText: 'Get Started Today',
  ctaUrl: '',
  contactEmail: '',
  phoneNumber: '',
  awards: '',
  storeAddress: '',
  openingHours: '',
  productCategories: [],
  signatureProducts: '',
  customOrders: false,
  deliveryOptions: '',
  establishmentVibe: '',
  localArea: '',
}

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<WizardData>(INITIAL_DATA)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }, [])

  const next = useCallback(() => setCurrentStep(s => Math.min(s + 1, 4)), [])
  const back = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), [])
  const goTo = useCallback((step: number) => setCurrentStep(step), [])

  return {
    currentStep,
    data,
    updateData,
    next,
    back,
    goTo,
    isGenerating,
    setIsGenerating,
    totalSteps: 5,
  }
}
