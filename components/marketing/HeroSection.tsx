import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ede9fe 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"
          style={{ animation: 'float 10s ease-in-out infinite reverse' }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(8px); }
          66% { transform: translateY(10px) translateX(-8px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        .fade-in-1 { animation: fadeInUp 0.6s ease-out 0.1s both; }
        .fade-in-2 { animation: fadeInUp 0.6s ease-out 0.25s both; }
        .fade-in-3 { animation: fadeInUp 0.6s ease-out 0.4s both; }
        .fade-in-4 { animation: fadeInUp 0.6s ease-out 0.55s both; }
        .fade-in-5 { animation: fadeInUp 0.6s ease-out 0.7s both; }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Animated badge */}
        <div className="fade-in-1 inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 text-sm font-medium text-violet-700 mb-8">
          <span
            className="w-2 h-2 rounded-full bg-violet-500 shrink-0"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          Propulsé par Claude AI
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.05] tracking-tight">
          <span className="fade-in-2 block">Votre landing page,</span>
          <span className="fade-in-3 block bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent">
            créée en 60 secondes
          </span>
        </h1>

        <p className="fade-in-3 text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Répondez à quelques questions sur votre business. Notre IA rédige le contenu, sélectionne les images
          et conçoit une page qui convertit — sur mesure pour vous.
        </p>

        {/* CTAs */}
        <div className="fade-in-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-violet-700 hover:to-orange-600 transition-all shadow-xl shadow-violet-200 text-base"
          >
            Créer ma landing page
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-gray-600 font-medium px-6 py-4 rounded-xl hover:bg-gray-100 transition-colors text-base"
          >
            Voir les fonctionnalités
          </a>
        </div>

        {/* Stats band — glass effect */}
        <div className="fade-in-5 inline-flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-gray-500 backdrop-blur-sm bg-white/50 border border-gray-100 rounded-2xl px-8 py-5 shadow-sm">
          {[
            { value: '500+', label: 'Pages générées' },
            { value: '60s', label: 'Temps de génération moyen' },
            { value: '29€', label: 'Paiement unique' },
            { value: '100%', label: 'Vous possédez le code' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#features"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-violet-600 transition-colors"
            aria-label="Défiler vers le bas"
          >
            <ChevronDown
              className="w-6 h-6"
              style={{ animation: 'bounce-arrow 2s ease-in-out infinite' }}
            />
          </a>
        </div>
      </div>
    </section>
  )
}
