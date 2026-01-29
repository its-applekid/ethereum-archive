import type { TimelineNode, NodeType } from '../data/timeline'

interface TimelineCardProps {
  node: TimelineNode
  isSelected: boolean
  onClick: () => void
  alignment: 'left' | 'right'
}

const TYPE_CONFIG: Record<NodeType, { label: string; color: string; bg: string }> = {
  hard_fork: { label: 'Hard Fork', color: 'text-red-400', bg: 'bg-red-500/20' },
  eip: { label: 'EIP', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  research: { label: 'Research', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  milestone: { label: 'Milestone', color: 'text-green-400', bg: 'bg-green-500/20' },
  scaling: { label: 'Scaling', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  controversy: { label: 'Debate', color: 'text-amber-400', bg: 'bg-amber-500/20' },
}

export function TimelineCard({ node, isSelected, onClick, alignment }: TimelineCardProps) {
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
        block w-full max-w-md p-5 rounded-xl border transition-all duration-300
        ${alignment === 'right' ? 'ml-auto' : 'mr-auto'}
        ${isSelected 
          ? 'border-[var(--eth-purple)] bg-[var(--bg-tertiary)] shadow-lg shadow-[var(--eth-purple)]/20' 
          : 'border-[var(--bg-tertiary)] bg-[var(--bg-secondary)] hover:border-[var(--eth-purple)]/50 hover:shadow-lg'
        }
      `}
    >
      {/* Date */}
      <div className={`text-sm text-[var(--text-muted)] mb-2 ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
        {formattedDate}
      </div>

      {/* Header with badge */}
      <div className={`flex items-start gap-2 mb-2 ${alignment === 'right' ? 'flex-row-reverse' : ''}`}>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeConfig.color} ${typeConfig.bg}`}>
          {typeConfig.label}
        </span>
        <h3 className={`text-lg font-semibold leading-tight flex-1 ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
          {node.title}
        </h3>
      </div>

      {/* Summary */}
      <p className={`text-sm text-[var(--text-secondary)] mb-3 ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
        {node.summary}
      </p>

      {/* Related EIPs */}
      {node.relatedEips && node.relatedEips.length > 0 && (
        <div className={`flex flex-wrap gap-1 ${alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
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
        <div className={`flex items-center gap-1 mt-2 text-amber-400 text-sm ${alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Community debate</span>
        </div>
      )}
    </button>
  )
}
