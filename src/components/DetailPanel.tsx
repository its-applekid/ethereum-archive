import { ERA_INFO } from '../data/timeline'
import type { TimelineNode } from '../data/timeline'

interface DetailPanelProps {
  node: TimelineNode | null
  onClose: () => void
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) return null

  const era = ERA_INFO[node.era]
  const formattedDate = new Date(node.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[var(--bg-secondary)] border-l border-[var(--bg-tertiary)] z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--bg-tertiary)] px-6 py-4 flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)]">{formattedDate}</p>
            <h2 className="text-2xl font-bold mt-1">{node.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Era badge */}
          <div>
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${era.color}20`,
                color: era.color 
              }}
            >
              {era.name} Era ({era.years})
            </span>
          </div>

          {/* Block number */}
          {node.blockNumber !== undefined && (
            <div>
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-1">Block Number</h3>
              <p className="font-mono text-lg">#{node.blockNumber.toLocaleString()}</p>
            </div>
          )}

          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-1">Summary</h3>
            <p className="text-[var(--text-secondary)]">{node.summary}</p>
          </div>

          {/* Full content */}
          {node.content && (
            <div>
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Details</h3>
              <div className="prose prose-invert prose-sm max-w-none">
                {node.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() && <p key={i} className="text-[var(--text-secondary)]">{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Related EIPs */}
          {node.relatedEips && node.relatedEips.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Related EIPs</h3>
              <div className="flex flex-wrap gap-2">
                {node.relatedEips.map((eip) => (
                  <a
                    key={eip}
                    href={`https://eips.ethereum.org/EIPS/eip-${eip}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[var(--bg-tertiary)] hover:bg-[var(--eth-purple)]/20 rounded-lg text-sm font-mono transition-colors"
                  >
                    EIP-{eip} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Learn More</h3>
            <div className="space-y-2">
              <a
                href={`https://ethereum.org/en/history/#${node.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--eth-purple)] hover:underline"
              >
                <span>ethereum.org</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
