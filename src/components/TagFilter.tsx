import { useState } from 'react'
import type { Tag } from '../data/timeline'

const TAG_INFO: Record<Tag, { label: string; color: string; emoji: string }> = {
  protocol: { label: 'Protocol', color: '#8B5CF6', emoji: '⛓️' },
  scaling: { label: 'Scaling', color: '#3B82F6', emoji: '📈' },
  defi: { label: 'DeFi', color: '#10B981', emoji: '💰' },
  nft: { label: 'NFT', color: '#F59E0B', emoji: '🖼️' },
  social: { label: 'Social', color: '#EC4899', emoji: '💬' },
  research: { label: 'Research', color: '#6366F1', emoji: '🔬' },
  security: { label: 'Security', color: '#EF4444', emoji: '🔒' },
}

const PRESETS: Record<string, { name: string; tags: Tag[] }> = {
  all: { name: 'Full Experience', tags: ['protocol', 'scaling', 'defi', 'nft', 'social', 'research', 'security'] },
  protocol: { name: 'Protocol Deep Dive', tags: ['protocol', 'scaling', 'research'] },
  defi: { name: 'DeFi Journey', tags: ['defi', 'nft'] },
  highlights: { name: 'Key Moments', tags: ['protocol', 'defi', 'social'] },
}

interface TagFilterProps {
  activeTags: Tag[]
  onTagsChange: (tags: Tag[]) => void
}

export function TagFilter({ activeTags, onTagsChange }: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleTag = (tag: Tag) => {
    if (activeTags.includes(tag)) {
      onTagsChange(activeTags.filter(t => t !== tag))
    } else {
      onTagsChange([...activeTags, tag])
    }
  }

  const applyPreset = (presetKey: string) => {
    onTagsChange(PRESETS[presetKey].tags)
  }

  const allTags = Object.keys(TAG_INFO) as Tag[]
  const allActive = activeTags.length === allTags.length

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-tertiary)] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-tertiary)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🏷️</span>
          <span className="font-medium text-[var(--text-primary)]">Filter Timeline</span>
          {!allActive && (
            <span className="text-xs bg-[var(--eth-purple)] text-white px-2 py-0.5 rounded-full">
              {activeTags.length} active
            </span>
          )}
        </div>
        <svg 
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[var(--bg-tertiary)]">
          {/* Presets */}
          <div className="py-3 border-b border-[var(--bg-tertiary)]">
            <div className="text-xs text-[var(--text-muted)] mb-2">Quick Presets</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm transition-colors
                    ${JSON.stringify(activeTags.sort()) === JSON.stringify(preset.tags.sort())
                      ? 'bg-[var(--eth-purple)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'
                    }
                  `}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Individual Tags */}
          <div className="pt-3">
            <div className="text-xs text-[var(--text-muted)] mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => {
                const info = TAG_INFO[tag]
                const isActive = activeTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all
                      ${isActive
                        ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-secondary)]'
                        : 'opacity-50 hover:opacity-75'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? info.color + '30' : 'var(--bg-tertiary)',
                      color: isActive ? info.color : 'var(--text-muted)',
                      // @ts-expect-error CSS custom property for ring color
                      '--tw-ring-color': isActive ? info.color : 'transparent',
                    }}
                  >
                    <span>{info.emoji}</span>
                    <span>{info.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Clear/Select All */}
          <div className="pt-3 flex gap-2">
            <button
              onClick={() => onTagsChange(allTags)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Select All
            </button>
            <span className="text-[var(--text-muted)]">·</span>
            <button
              onClick={() => onTagsChange([])}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export { TAG_INFO, PRESETS }
export type { Tag }
