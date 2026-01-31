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
  // Cards alternate: even = card left; odd = card right
  const cardOnLeft = index % 2 === 0
  
  // Events that spawn new lines get circle at BOTTOM, others at TOP
  const spawnsLine = node.type === 'scaling' || node.type === 'hard_fork'
  const circleAtBottom = spawnsLine

  return (
    <div 
      className={`
        relative flex gap-4 mb-12
        ${cardOnLeft ? 'flex-row' : 'flex-row-reverse'}
        ${circleAtBottom ? 'items-end' : 'items-start'}
      `}
    >
      {/* Card - takes 80% width */}
      <div className="w-[80%]">
        <TimelineCard 
          node={node} 
          isSelected={isSelected}
          onClick={onSelect}
        />
      </div>

      {/* Node marker circle - in remaining 20%, on center line */}
      <div className={`w-[20%] flex justify-center relative z-10 ${circleAtBottom ? 'pb-2' : 'pt-2'}`}>
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
              absolute text-xs font-mono text-[var(--text-muted)] whitespace-nowrap
              ${circleAtBottom ? 'bottom-2' : 'top-2'}
              ${cardOnLeft ? 'left-[60%]' : 'right-[60%]'}
            `}
          >
            #{node.blockNumber.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}
