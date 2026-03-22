'use client'

import { useInView } from '@/hooks/useInView'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in milliseconds — 0, 100, 200, 300 etc. */
  delay?: number
}

/**
 * Wraps children with a fade-up entrance animation triggered by scroll.
 * Uses the Intersection Observer API via useInView — no extra dependencies needed.
 */
export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 500ms ease-out ${delay}ms, transform 500ms ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
