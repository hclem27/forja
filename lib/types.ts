export type DesignMood = 'professional' | 'bold' | 'warm' | 'minimal' | 'luxury' | 'creative'
export type FontStyle = 'modern-sans' | 'elegant-serif' | 'technical' | 'humanist'
export type BusinessProfile = 'physical' | 'service'

export function getBusinessProfile(industry: string): BusinessProfile {
  const physicalKeywords = ['restaurant', 'food', 'fitness', 'wellness', 'real estate', 'immobilier', 'health', 'santé', 'retail', 'e-commerce']
  const lower = industry.toLowerCase()
  return physicalKeywords.some(k => lower.includes(k)) ? 'physical' : 'service'
}

export interface WizardData {
  // Step 1
  businessName: string
  tagline: string
  industry: string
  location?: string
  yearsInBusiness?: string

  // Step 2
  targetAudience: string
  mainProblem: string
  desiredOutcome: string

  // Step 3
  offerName: string
  offerDescription: string
  keyBenefits: string[]
  differentiator: string
  pricePoint?: string
  socialProofStats?: string

  // Step 4
  designMood: DesignMood
  colorPreference: string
  fontStyle: FontStyle
  brandReferences?: string

  // Step 5
  ctaText: string
  ctaUrl?: string
  contactEmail: string
  phoneNumber?: string
  awards?: string

  // Physical/local business fields
  storeAddress?: string        // "12 rue de la Paix, Paris 75001"
  openingHours?: string        // "Mar-Dim 7h-19h30, fermé lundi"
  productCategories?: string[] // ["Pains", "Viennoiseries", "Pâtisseries"]
  signatureProducts?: string   // "Notre brioche feuilletée, le pain de campagne au levain..."
  customOrders?: boolean       // Commandes sur mesure
  deliveryOptions?: string     // "Click & collect, livraison Uber Eats"
  establishmentVibe?: string   // "Chaleureux et familial, avec un espace salon de thé"
  localArea?: string           // "Au cœur du Marais, Paris"
}

export interface GeneratedSite {
  html: string
  wizardData: WizardData
  createdAt: number
  paid: boolean
  stripeSessionId?: string
}

export interface GenerateResponse {
  sessionId: string
}

export interface CheckoutResponse {
  checkoutUrl: string
}

export interface PaymentStatusResponse {
  paid: boolean
}
