import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-orange-600 rounded-3xl px-8 py-16 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">
              Votre landing page est à 60 secondes
            </h2>
            <p className="text-orange-200 text-lg mb-8 max-w-xl mx-auto">
              Arrêtez de repousser ce site web. Commencez maintenant, prévisualisez gratuitement, payez seulement si vous adorez.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-xl hover:bg-violet-50 transition-colors text-base shadow-xl"
            >
              Créer ma landing page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
