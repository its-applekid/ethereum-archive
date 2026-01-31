import type { TimelineNode, NodeType } from '../data/timeline'

interface TimelineCardProps {
  node: TimelineNode
  isSelected: boolean
  onClick: () => void
}

const TYPE_CONFIG: Record<NodeType, { label: string; color: string; bg: string }> = {
  hard_fork: { label: 'Hard Fork', color: 'text-red-400', bg: 'bg-red-500/20' },
  eip: { label: 'EIP', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  research: { label: 'Research', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  milestone: { label: 'Milestone', color: 'text-green-400', bg: 'bg-green-500/20' },
  scaling: { label: 'Scaling', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  controversy: { label: 'Debate', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  application: { label: 'Application', color: 'text-pink-400', bg: 'bg-pink-500/20' },
}

export function TimelineCard({ node, isSelected, onClick }: TimelineCardProps) {
  const typeConfig = TYPE_CONFIG[node.type]
  const formattedDate = new Date(node.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <button
      onClick={onClick}
      className={`
        block w-full p-5 rounded-xl border transition-all duration-300 text-left
        ${isSelected 
          ? 'border-[var(--eth-purple)] bg-[var(--bg-tertiary)] shadow-lg shadow-[var(--eth-purple)]/20' 
          : 'border-[var(--bg-tertiary)] bg-[var(--bg-secondary)] hover:border-[var(--eth-purple)]/50 hover:shadow-lg'
        }
      `}
    >
      {/* Top row: Label (left) + Date (right) */}
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeConfig.color} ${typeConfig.bg}`}>
          {typeConfig.label}
        </span>
        <span className="text-sm text-[var(--text-muted)]">
          {formattedDate}
        </span>
      </div>

      {/* Title - full width */}
      <h3 className="text-lg font-semibold leading-tight mb-3">
        {node.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-[var(--text-secondary)] mb-3">
        {node.summary}
      </p>

      {/* Related EIPs */}
      {node.relatedEips && node.relatedEips.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {node.relatedEips.map((eip) => (
            <span 
              key={eip}
              className="px-2 py-0.5 bg-[var(--bg-primary)] rounded text-xs font-mono text-[var(--text-muted)]"
            >
              EIP-{eip}
            </span>
          ))}
        </div>
      )}

      {/* Controversy indicator */}
      {node.type === 'controversy' && (
        <div className="flex items-center gap-1 mt-2 text-amber-400 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Community debate</span>
        </div>
      )}
    </button>
  )
}
