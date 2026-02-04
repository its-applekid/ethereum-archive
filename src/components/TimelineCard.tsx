import type { TimelineNode, Tag } from '../data/timeline'

interface TimelineCardProps {
  node: TimelineNode
  isSelected: boolean
  onClick: () => void
}

// Tag styling using Gruvbox colors
// Tint values are the accent colors at ~8% opacity for subtle background tint
const TAG_CONFIG: Record<Tag, { 
  label: string
  emoji: string
  accent: string
  tint: string // Hex color with low opacity for card background tint
}> = {
  protocol: { 
    label: 'Protocol', 
    emoji: '⛓️',
    accent: 'var(--gruvbox-purple-bright)',
    tint: 'rgba(211, 134, 155, 0.08)', // gruvbox purple-bright
  },
  scaling: { 
    label: 'Scaling', 
    emoji: '📈',
    accent: 'var(--gruvbox-blue-bright)',
    tint: 'rgba(131, 165, 152, 0.08)', // gruvbox blue-bright
  },
  defi: { 
    label: 'DeFi', 
    emoji: '💰',
    accent: 'var(--gruvbox-green-bright)',
    tint: 'rgba(184, 187, 38, 0.08)', // gruvbox green-bright
  },
  nft: { 
    label: 'NFT', 
    emoji: '🖼️',
    accent: 'var(--gruvbox-yellow-bright)',
    tint: 'rgba(250, 189, 47, 0.08)', // gruvbox yellow-bright
  },
  social: { 
    label: 'Social', 
    emoji: '💬',
    accent: 'var(--gruvbox-purple-bright)',
    tint: 'rgba(211, 134, 155, 0.08)', // gruvbox purple-bright
  },
  research: { 
    label: 'Research', 
    emoji: '🔬',
    accent: 'var(--gruvbox-blue-bright)',
    tint: 'rgba(131, 165, 152, 0.08)', // gruvbox blue-bright
  },
  security: { 
    label: 'Security', 
    emoji: '🔒',
    accent: 'var(--gruvbox-red-bright)',
    tint: 'rgba(251, 73, 52, 0.08)', // gruvbox red-bright
  },
  adoption: { 
    label: 'Adoption', 
    emoji: '🏛️',
    accent: 'var(--gruvbox-aqua-bright)',
    tint: 'rgba(142, 192, 124, 0.08)', // gruvbox aqua-bright
  },
  tvl: { 
    label: 'TVL', 
    emoji: '📊',
    accent: 'var(--gruvbox-aqua-bright)',
    tint: 'rgba(142, 192, 124, 0.08)', // gruvbox aqua-bright
  },
  blobs: { 
    label: 'Blobs', 
    emoji: '🫧',
    accent: 'var(--gruvbox-blue-bright)',
    tint: 'rgba(131, 165, 152, 0.08)', // gruvbox blue-bright
  },
}

// Default tint for untagged cards
const DEFAULT_TINT = 'rgba(168, 153, 132, 0.05)' // gruvbox fg4

export function TimelineCard({ node, isSelected, onClick }: TimelineCardProps) {
  const tags = node.tags || []
  const primaryTag = tags[0]
  const formattedDate = new Date(node.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  
  // Get accent color and tint from primary tag
  const accentColor = primaryTag ? TAG_CONFIG[primaryTag].accent : 'var(--gruvbox-fg4)'
  const tintColor = primaryTag ? TAG_CONFIG[primaryTag].tint : DEFAULT_TINT

  return (
    <button
      onClick={onClick}
      className={`
        block w-full rounded-xl border transition-all duration-300 text-left overflow-hidden
        ${isSelected 
          ? 'border-[var(--eth-purple)] shadow-lg shadow-[var(--eth-purple)]/20' 
          : 'border-[var(--gruvbox-bg3)] hover:border-[var(--eth-purple)]/50 hover:shadow-lg'
        }
      `}
      style={{ 
        background: `linear-gradient(${tintColor}, ${tintColor}), var(--bg-card)`,
        borderLeftWidth: '3px',
        borderLeftColor: accentColor,
      }}
    >
      <div className="p-5">
        {/* Top row: Primary tag (left) + Date (right) */}
        <div className="flex items-center justify-between mb-2">
          {tags.length > 0 && (
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                backgroundColor: 'var(--bg-card-accent)',
                color: accentColor,
              }}
            >
              {TAG_CONFIG[tags[0]].emoji} {TAG_CONFIG[tags[0]].label}
            </span>
          )}
          <span 
            className="text-sm shrink-0 ml-2"
            style={{ color: 'var(--text-muted)' }}
          >
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-lg font-semibold leading-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {node.title}
        </h3>

        {/* Summary */}
        <p 
          className="text-sm mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {node.summary}
        </p>

        {/* Bottom row: Related EIPs (left) + Block number (right) */}
        <div className="flex items-end justify-between">
          {node.relatedEips && node.relatedEips.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {node.relatedEips.map((eip) => (
                <span 
                  key={eip}
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{
                    backgroundColor: 'var(--bg-card-accent)',
                    color: 'var(--text-muted)',
                  }}
                >
                  EIP-{eip}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          {node.blockNumber !== undefined && (
            <span 
              className="text-xs font-mono shrink-0 ml-2"
              style={{ color: 'var(--text-muted)' }}
            >
              {node.approximateBlock && '~'}#{node.blockNumber.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
