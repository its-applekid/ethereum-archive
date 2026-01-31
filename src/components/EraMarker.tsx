import { ERA_INFO } from '../data/timeline'
import type { Era } from '../data/timeline'

interface EraMarkerProps {
  era: Era
}

export function EraMarker({ era }: EraMarkerProps) {
  const info = ERA_INFO[era]

  return (
    <div className="relative flex justify-center mb-12">
      {/* Background glow */}
      <div 
        className="absolute inset-0 blur-3xl opacity-20"
        style={{ backgroundColor: info.color }}
      />
      
      {/* Marker - solid background so line doesn't show through */}
      <div 
        className="relative z-10 px-6 py-3 rounded-full border-2 bg-[var(--bg-primary)]"
        style={{ 
          borderColor: info.color,
        }}
      >
        {/* Colored overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
          style={{ backgroundColor: info.color }}
        />
        <div className="relative text-center">
          <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color: info.color }}>
            {info.name}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {info.years}
          </p>
        </div>
      </div>
    </div>
  )
}
