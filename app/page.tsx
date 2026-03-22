import { SiteNav } from '@/components/marketing/SiteNav'
import { HeroSection } from '@/components/marketing/HeroSection'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { PricingSection } from '@/components/marketing/PricingSection'
import { FaqSection } from '@/components/marketing/FaqSection'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export const metadata = {
  title: 'Forja Créez votre landing page par IA en 60 secondes',
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Forja',
  applicationCategory: 'WebApplication',
  description: 'Générateur de landing page par intelligence artificielle. Créez un site vitrine professionnel en 60 secondes pour votre business, restaurant, artisan ou startup.',
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'EUR',
    priceSpecification: { '@type': 'UnitPriceSpecification', description: 'Paiement unique, sans abonnement' },
  },
  creator: { '@type': 'Organization', name: 'Spays', url: 'https://spays.fr' },
  operatingSystem: 'Web',
  inLanguage: 'fr',
}

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}
