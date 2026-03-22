import { Zap, Image, Type, Smartphone, Search, Code2, Palette, Shield } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'

const FEATURES = [
  { icon: Zap, title: 'Généré en 60 secondes', desc: "Claude AI rédige tout — titre accrocheur, textes, témoignages, FAQ — sur mesure pour votre business.", color: 'text-yellow-500' },
  { icon: Image, title: 'Images libres de droits', desc: 'Photos Unsplash sélectionnées automatiquement pour correspondre à votre secteur et votre style.', color: 'text-blue-500' },
  { icon: Type, title: 'Google Fonts', desc: "Paires de typographies choisies pour correspondre à la personnalité de votre marque — serif, sans-serif, moderne ou chaleureux.", color: 'text-orange-500' },
  { icon: Smartphone, title: 'Responsive mobile-first', desc: 'Parfait sur tous les écrans. Testé du téléphone aux grands moniteurs.', color: 'text-green-500' },
  { icon: Search, title: 'Balises SEO prêtes', desc: 'Titre, description, og:image et plus — prêt à référencer dès le premier jour.', color: 'text-violet-500' },
  { icon: Code2, title: 'HTML propre et portable', desc: 'Un seul fichier autonome. Hébergez partout : Netlify, GitHub Pages, votre propre serveur.', color: 'text-orange-500' },
  { icon: Palette, title: 'Couleurs de marque sur mesure', desc: 'Votre palette de couleurs, appliquée de façon cohérente dans tout le système de design.', color: 'text-pink-500' },
  { icon: Shield, title: 'À vous pour toujours', desc: 'Un seul paiement, vous possédez le code. Pas de abonnement, pas de dépendance, pas de frais récurrents.', color: 'text-violet-500' },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-3">Fonctionnalités</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tout ce dont votre landing page a besoin</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Pas un template générique. Une page conçue spécifiquement pour votre business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <AnimateIn key={i} delay={(i % 4) * 100}>
              <div className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full">
                <f.icon className={`w-8 h-8 ${f.color} mb-4`} />
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
