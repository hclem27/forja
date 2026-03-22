import { ClipboardList, Sparkles, Download } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const STEPS = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Parlez-nous de votre business',
    description: 'Répondez à 5 étapes rapides : votre audience, votre offre, votre style. Moins de 3 minutes.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Sparkles,
    number: '02',
    title: "L'IA crée votre page",
    description: 'Claude AI rédige votre contenu, sélectionne les images correspondantes et conçoit une landing page sur mesure en moins de 60 secondes.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Download,
    number: '03',
    title: 'Aperçu, paiement et téléchargement',
    description: 'Visualisez votre page, validez-la, payez une seule fois et téléchargez le fichier HTML/CSS complet — prêt à déployer.',
    color: 'bg-violet-100 text-violet-600',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-3">Comment ça marche</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trois étapes vers votre nouveau site</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Aucune compétence en design requise. Pas de code. Juste vos infos business et notre IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-violet-200 via-orange-200 to-violet-200" />

          {STEPS.map((step, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.color} shrink-0`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-5xl font-black text-gray-100">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
