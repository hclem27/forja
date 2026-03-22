'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Download, Loader2, Lock, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const FEATURES = [
  'Fichier HTML + CSS complet',
  'Images Unsplash libres de droits',
  'Google Fonts incluses',
  'Design responsive mobile',
  'Balises SEO meta',
  'Animations fluides',
  'ZIP prêt à télécharger',
  'À vous pour toujours — sans abonnement',
]

interface Props {
  sessionId: string
  businessName: string
  paymentSuccess: boolean
  devMode?: boolean
}

export function PaymentSidebar({ sessionId, businessName, paymentSuccess, devMode }: Props) {
  const [paid, setPaid] = useState(devMode ?? false)
  const [checking, setChecking] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  // Poll for payment confirmation after redirect
  useEffect(() => {
    if (!paymentSuccess) return
    setChecking(true)
    const poll = async () => {
      try {
        const res = await fetch(`/api/payment-status/${sessionId}`)
        const { paid } = await res.json()
        if (paid) {
          setPaid(true)
          setChecking(false)
          toast.success('Paiement confirmé ! Votre site est prêt à télécharger.')
        } else {
          setTimeout(poll, 2000)
        }
      } catch {
        setTimeout(poll, 3000)
      }
    }
    poll()
  }, [paymentSuccess, sessionId])

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      const { checkoutUrl, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = checkoutUrl
    } catch {
      toast.error('Échec du paiement. Veuillez réessayer.')
      setCheckoutLoading(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const res = await fetch(`/api/download/${sessionId}`)
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-landing-page.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Échec du téléchargement. Veuillez réessayer.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Dev mode banner */}
      {devMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">⚡ Mode dev</span>
          <span className="text-xs text-amber-600">Paiement désactivé</span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-medium text-violet-600 uppercase tracking-wider">Prêt</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 leading-tight">
          {businessName}&apos;s landing page
        </h2>
        <p className="text-sm text-gray-500 mt-1">Générée par IA · Prête à déployer</p>
      </div>

      {/* Features */}
      <div className="flex-1 p-6 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Ce qui est inclus
        </p>
        <ul className="space-y-3">
          {FEATURES.map(f => (
            <li key={f} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
              <span className="text-sm text-gray-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 border-t border-gray-100 space-y-3">
        {paid ? (
          <>
            <div className="flex items-center gap-2 bg-violet-50 text-violet-700 rounded-lg px-4 py-2 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Paiement confirmé !
            </div>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? 'Préparation du ZIP...' : 'Télécharger votre site'}
            </button>
          </>
        ) : checking ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="w-6 h-6 animate-spin text-violet-600" />
            <p className="text-sm text-gray-600 text-center">Confirmation de votre paiement...</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">$29</p>
              <p className="text-xs text-gray-500">paiement unique · sans abonnement</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-200 disabled:opacity-70"
            >
              {checkoutLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Télécharger — 29€
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-400">
              Paiement sécurisé via Stripe
            </p>
          </>
        )}
      </div>
    </div>
  )
}
