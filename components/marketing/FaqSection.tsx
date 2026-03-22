import { AnimateIn } from '@/components/ui/AnimateIn'

const FAQS = [
  {
    q: 'Dois-je payer avant de voir ma landing page ?',
    a: "Non — vous renseignez vos informations, l'IA génère votre page, et vous pouvez prévisualiser le résultat complet avant de décider de payer. Le paiement n'est requis que pour télécharger les fichiers.",
  },
  {
    q: 'Puis-je modifier le HTML après le téléchargement ?',
    a: "Absolument. Vous recevez un HTML et CSS propres et bien structurés que vous pouvez modifier dans n'importe quel éditeur de texte. C'est votre code — faites-en ce que vous voulez.",
  },
  {
    q: 'Suis-je propriétaire des images et des polices ?',
    a: "Les images proviennent d'Unsplash (libres de droits pour usage commercial sous la licence Unsplash). Les polices viennent de Google Fonts (gratuites pour usage commercial). Vous êtes entièrement couvert.",
  },
  {
    q: "Et si je n'aime pas le résultat ?",
    a: "Vous prévisualisez avant de payer. Si vous n'êtes pas satisfait, ne payez simplement pas — aucun frais ne vous est débité. Vous pouvez aussi revenir en arrière et ajuster vos informations pour générer un design différent.",
  },
  {
    q: 'Où puis-je héberger ma landing page ?',
    a: "N'importe où pouvant servir des fichiers HTML statiques. Options populaires : Netlify (gratuit), Vercel (gratuit), GitHub Pages (gratuit), ou votre hébergeur web existant.",
  },
  {
    q: 'Combien de temps prend la génération ?',
    a: "Généralement 30 à 60 secondes selon les temps de réponse de l'IA. Vous verrez un écran de progression animé pendant la génération. Gardez l'onglet ouvert.",
  },
  {
    q: 'Puis-je générer plusieurs pages ?',
    a: "Oui — chaque génération est un achat séparé à 29€. Vous pouvez créer autant de landing pages différentes que vous le souhaitez.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-gray-900">Questions fréquentes</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <AnimateIn key={i} delay={Math.min(i * 50, 300)}>
              <details className="group bg-white border border-gray-100 rounded-xl px-6 open:shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer py-5 text-base font-medium text-gray-900 list-none">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-500 text-sm leading-relaxed pb-5">{faq.a}</p>
              </details>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
