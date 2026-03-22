'use client'

import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Device = 'desktop' | 'tablet' | 'mobile'

const DEVICES: { value: Device; icon: React.ElementType; label: string }[] = [
  { value: 'desktop', icon: Monitor, label: 'Bureau' },
  { value: 'tablet', icon: Tablet, label: 'Tablette' },
  { value: 'mobile', icon: Smartphone, label: 'Mobile' },
]

export function DeviceToggle({ device, onChange }: { device: Device; onChange: (d: Device) => void }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {DEVICES.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          title={label}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
            device === value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
