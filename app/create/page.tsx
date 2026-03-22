import { WizardShell } from '@/components/wizard/WizardShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Créer votre landing page — Forja',
}

export default function CreatePage() {
  return <WizardShell />
}
