'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { DeviceToggle, type Device } from '@/components/preview/DeviceToggle'
import { PaymentSidebar } from '@/components/preview/PaymentSidebar'
import { EditPanel } from '@/components/preview/EditPanel'
import { cn } from '@/lib/utils'
import { Loader2, Pencil, CreditCard, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

type SidebarTab = 'payment' | 'edit'

export default function PreviewPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const sessionId = params.sessionId as string
  const paymentSuccess = searchParams.get('payment') === 'success'

  const [device, setDevice] = useState<Device>('desktop')
  const [loading, setLoading] = useState(true)
  const [sessionFound, setSessionFound] = useState(true)
  const [tab, setTab] = useState<SidebarTab>('payment')
  const [iframeKey, setIframeKey] = useState(0)
  const [businessName] = useState('Votre business')

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    fetch(`/api/payment-status/${sessionId}`)
      .then(r => { if (!r.ok) setSessionFound(false) })
      .catch(() => setSessionFound(false))
  }, [sessionId])

  const refreshIframe = () => {
    setLoading(true)
    setIframeKey(k => k + 1)
  }

  if (!sessionFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-lg font-semibold text-gray-700">Session expirée ou introuvable</p>
        <p className="text-sm text-gray-500">Les sessions sont valables 2 heures après la génération.</p>
        <Link href="/create" className="text-violet-600 font-medium hover:underline">
          Créer une nouvelle landing page →
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-6 gap-4 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mr-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Accueil
        </Link>

        <div className="h-5 w-px bg-gray-200" />

        <Link href="/" className="text-lg font-bold text-gray-900 mr-4">
          Forja<span className="text-violet-600">.ai</span>
        </Link>

        <div className="h-5 w-px bg-gray-200" />

        <div className="flex-1 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <div className="w-3 h-3 rounded-full bg-gray-200" />
          </div>
          <div className="flex-1 max-w-sm bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-400 font-mono">
            preview.forja.ai/{sessionId.slice(0, 8)}...
          </div>
        </div>

        <DeviceToggle device={device} onChange={setDevice} />
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview area */}
        <div className="flex-1 overflow-auto bg-gray-200 flex items-start justify-center p-6">
          <div
            className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-500"
            style={{ width: DEVICE_WIDTHS[device], minHeight: '100%' }}
          >
            {loading && (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={`/preview-frame/${sessionId}`}
              className={cn('w-full border-0 transition-all', loading ? 'h-0 overflow-hidden' : 'h-[calc(100vh-3.5rem-3rem)]')}
              style={{ minHeight: loading ? 0 : '100vh' }}
              onLoad={() => setLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="Aperçu de la landing page"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 shrink-0">
            <button
              onClick={() => setTab('payment')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 h-12 text-sm font-medium transition-colors',
                tab === 'payment'
                  ? 'text-violet-700 border-b-2 border-violet-600 bg-violet-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              <CreditCard className="w-4 h-4" />
              Télécharger
            </button>
            <button
              onClick={() => setTab('edit')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 h-12 text-sm font-medium transition-colors',
                tab === 'edit'
                  ? 'text-violet-700 border-b-2 border-violet-600 bg-violet-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              <Pencil className="w-4 h-4" />
              Modifier
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto">
            {tab === 'payment' ? (
              <PaymentSidebar
                sessionId={sessionId}
                businessName={businessName}
                paymentSuccess={paymentSuccess}
                devMode={process.env.NEXT_PUBLIC_DEV_MODE === 'true'}
              />
            ) : (
              <EditPanel sessionId={sessionId} onRefresh={refreshIframe} />
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
