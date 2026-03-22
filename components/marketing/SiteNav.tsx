'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm'
        : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Forja<span className="text-violet-600">.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Tarifs</a>
          <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
        </div>

        <Link
          href="/create"
          className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Commencer
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  )
}
