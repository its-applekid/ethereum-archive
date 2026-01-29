import { ERA_INFO, getNodesByEra } from '../data/timeline'
import type { TimelineNode, Era } from '../data/timeline'
import { TimelineCard } from './TimelineCard'
import { EraMarker } from './EraMarker'

interface TimelineProps {
  nodes: TimelineNode[]
  onSelectNode: (node: TimelineNode) => void
  selectedNodeId?: string
}

export function Timeline({ nodes, onSelectNode, selectedNodeId }: TimelineProps) {
  const nodesByEra = getNodesByEra(nodes)
  const eras = Object.keys(ERA_INFO) as Era[]

  return (
    <section id="timeline" className="relative py-24">
      {/* Central spine */}
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--eth-purple) 10%, var(--eth-purple) 90%, transparent)'
        }}
      />

      {/* Era sections */}
      {eras.map((era) => {
        const eraNodes = nodesByEra[era] || []
        if (eraNodes.length === 0) return null

        return (
          <div key={era} className="relative mb-16">
            <EraMarker era={era} />
            
            <div className="relative max-w-6xl mx-auto px-8">
              {eraNodes.map((node, index) => (
                <TimelineEntry
                  key={node.id}
                  node={node}
                  index={index}
                  isSelected={selectedNodeId === node.id}
                  onSelect={() => onSelectNode(node)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

interface TimelineEntryProps {
  node: TimelineNode
  index: number
  isSelected: boolean
  onSelect: () => void
}

function TimelineEntry({ node, index, isSelected, onSelect }: TimelineEntryProps) {
  const isLeft = index % 2 === 0

  return (
    <div 
      className={`
        relative flex items-center gap-8 mb-12
        ${isLeft ? 'flex-row' : 'flex-row-reverse'}
      `}
    >
      {/* Card side */}
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <TimelineCard 
          node={node} 
          isSelected={isSelected}
          onClick={onSelect}
          alignment={isLeft ? 'right' : 'left'}
        />
      </div>

      {/* Center node marker */}
      <div className="relative z-10 flex-shrink-0">
        <button
          onClick={onSelect}
          className={`
            w-4 h-4 rounded-full border-2 transition-all duration-300
            ${isSelected 
              ? 'bg-[var(--eth-purple)] border-[var(--eth-purple)] scale-150' 
              : 'bg-[var(--bg-primary)] border-[var(--eth-purple)] hover:bg-[var(--eth-purple)] hover:scale-125'
            }
            ${node.importance === 'major' ? 'w-5 h-5' : ''}
          `}
        />
        
        {/* Block number label */}
        {node.blockNumber !== undefined && (
          <div 
            className={`
              absolute top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-muted)]
              ${isLeft ? 'left-8' : 'right-8'}
            `}
          >
            #{node.blockNumber.toLocaleString()}
          </div>
        )}
      </div>

      {/* Empty space on other side */}
      <div className="flex-1" />
    </div>
  )
}
