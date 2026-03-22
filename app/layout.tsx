import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://forja.ai'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Forja Créez votre landing page par IA en 60 secondes',
    template: '%s — Forja',
  },
  description: 'Générez une landing page professionnelle pour votre business en 60 secondes grâce à l\'IA. Boulangeries, restaurants, consultants, SaaS design adapté à votre secteur. Paiement unique 29€, aucun abonnement.',
  keywords: [
    'générateur landing page', 'créer site web IA', 'landing page automatique',
    'site vitrine rapide', 'page web boulangerie', 'site restaurant', 'landing page PME',
    'générateur site web France', 'Claude AI', 'site web artisan',
  ],
  authors: [{ name: 'Spays', url: 'https://spays.fr' }],
  creator: 'Spays',
  publisher: 'Spays',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Forja Créez votre landing page par IA en 60 secondes',
    description: 'Landing page professionnelle générée par IA pour votre business. Design adapté, textes optimisés, prêt à publier. 29€ paiement unique.',
    type: 'website',
    url: baseUrl,
    siteName: 'Forja',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forja Landing page par IA en 60 secondes',
    description: 'Générez une landing page professionnelle pour votre business. Paiement unique 29€.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
