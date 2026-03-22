import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const INCLUDED = [
  'Landing page HTML + CSS complète',
  'Textes rédigés par IA pour votre business',
  'Photographie professionnelle libre de droits',
  'Paire de typographies Google Fonts',
  'Design responsive mobile-first',
  'Animations de défilement fluides',
  'Balises SEO meta',
  'Fichier ZIP prêt à télécharger',
  'Hébergez partout — vous possédez le code',
  'Accès à vie à votre fichier',
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-3">Tarifs</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Un tarif simple, un seul paiement</h2>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Pas d&apos;abonnement. Pas de frais cachés. Payez une fois, possédez votre page pour toujours.
          </p>
        </div>

        <AnimateIn className="max-w-md mx-auto">
          <div className="relative bg-white rounded-3xl border-2 border-violet-200 p-8 shadow-xl shadow-violet-100">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-violet-600 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                Le plus populaire
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-black text-gray-900">$29</span>
              </div>
              <p className="text-gray-500 text-sm">Paiement unique</p>
            </div>

            <ul className="space-y-3 mb-8">
              {INCLUDED.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/create"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white font-semibold py-4 rounded-xl hover:from-violet-700 hover:to-orange-600 transition-all shadow-lg shadow-violet-200"
            >
              Commencer à créer
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-center text-gray-400 mt-4">
              Vous prévisualisez avant de payer. Aucune surprise.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
