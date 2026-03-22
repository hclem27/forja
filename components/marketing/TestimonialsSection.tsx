import { AnimateIn } from '@/components/ui/AnimateIn'

const TESTIMONIALS = [
  {
    quote: "J'avais besoin d'une landing page pour mon activité de coaching, mais je n'avais aucune compétence en design. Forja a généré quelque chose qui honnêtement surpasse ce que j'aurais pu payer 500€.",
    name: 'Sarah M.',
    role: 'Coach de vie',
    initials: 'SM',
    color: 'bg-violet-500',
  },
  {
    quote: "On a utilisé ça pour un lancement produit et la page était en ligne en moins de 2 heures, retouches du HTML incluses. Les textes générés par l'IA étaient bluffants.",
    name: 'Thomas R.',
    role: 'Fondateur SaaS',
    initials: 'TR',
    color: 'bg-orange-500',
  },
  {
    quote: "Mon restaurant a enfin un vrai site. J'ai décrit l'ambiance que je voulais et c'était exactement ça les images, les couleurs, tout. Vraiment rentable.",
    name: 'Marie L.',
    role: 'Restauratrice',
    initials: 'ML',
    color: 'bg-violet-500',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-3">Témoignages</p>
          <h2 className="text-4xl font-bold text-gray-900">Plébiscité par les entrepreneurs et freelances</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 text-sm">&ldquo;{t.quote}&rdquo;</p>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
