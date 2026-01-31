import { useMemo } from 'react'

interface L2Chain {
  id: string
  name: string
  launchDate: string
  launchBlock?: number
  color: string
  opacity: number
}

// L2s and their launch dates/blocks
const L2_CHAINS: L2Chain[] = [
  // Active L2s (more visible)
  { id: 'optimism', name: 'Optimism', launchDate: '2021-01-16', launchBlock: 12_686_786, color: '#FF0420', opacity: 0.4 },
  { id: 'arbitrum', name: 'Arbitrum', launchDate: '2021-08-31', launchBlock: 13_133_428, color: '#28A0F0', opacity: 0.5 },
  { id: 'base', name: 'Base', launchDate: '2023-08-09', launchBlock: 17_880_000, color: '#0052FF', opacity: 0.35 },
  { id: 'zksync', name: 'zkSync Era', launchDate: '2023-03-24', launchBlock: 16_890_000, color: '#4E529A', opacity: 0.3 },
  { id: 'linea', name: 'Linea', launchDate: '2023-07-18', launchBlock: 17_720_000, color: '#61DFFF', opacity: 0.25 },
  { id: 'scroll', name: 'Scroll', launchDate: '2023-10-17', launchBlock: 18_400_000, color: '#FFEEDA', opacity: 0.2 },
  // Historical/defunct (faded)
  { id: 'plasma', name: 'Plasma', launchDate: '2017-08-11', color: '#666666', opacity: 0.15 },
  { id: 'raiden', name: 'Raiden', launchDate: '2017-12-01', color: '#555555', opacity: 0.1 },
  // The split
  { id: 'etc', name: 'ETC', launchDate: '2016-07-20', launchBlock: 1_920_000, color: '#34D399', opacity: 0.2 },
]

interface L2ChainsProps {
  /** Current scroll position (0-1) representing timeline progress */
  progress: number
  /** Height of the timeline section (optional, uses parent height if not set) */
  height?: number
}

/**
 * Renders faded L2 chain lines in the background
 * Lines appear as their launch date is reached based on scroll progress
 */
export function L2Chains({ progress }: L2ChainsProps) {
  // Convert date to approximate progress (0-1)
  const dateToProgress = (date: string): number => {
    const start = new Date('2015-07-30').getTime() // Genesis
    const now = Date.now()
    const target = new Date(date).getTime()
    return (target - start) / (now - start)
  }

  const visibleChains = useMemo(() => {
    return L2_CHAINS.filter(chain => {
      const chainProgress = dateToProgress(chain.launchDate)
      return progress >= chainProgress
    }).map(chain => ({
      ...chain,
      // Fade in as we pass the launch date
      currentOpacity: Math.min(
        chain.opacity,
        (progress - dateToProgress(chain.launchDate)) * 2 * chain.opacity
      ),
    }))
  }, [progress])

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Main Ethereum line (center) */}
      <div 
        className="absolute left-1/2 w-0.5 bg-gradient-to-b from-[var(--eth-purple)] to-[var(--eth-purple-light)]"
        style={{ 
          height: `${progress * 100}%`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* L2 chain lines */}
      {visibleChains.map((chain, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * (20 + (index * 15))
        const launchProgress = dateToProgress(chain.launchDate)
        
        return (
          <div
            key={chain.id}
            className="absolute transition-opacity duration-1000"
            style={{
              left: `calc(50% + ${offset}px)`,
              top: `${launchProgress * 100}%`,
              height: `${(progress - launchProgress) * 100}%`,
              width: '2px',
              background: `linear-gradient(to bottom, transparent, ${chain.color})`,
              opacity: chain.currentOpacity,
              filter: 'blur(0.5px)',
            }}
          >
            {/* Small label at chain start */}
            <span 
              className="absolute -top-5 text-xs whitespace-nowrap transform -translate-x-1/2"
              style={{ 
                color: chain.color,
                opacity: chain.currentOpacity * 1.5,
                fontSize: '10px',
              }}
            >
              {chain.name}
            </span>
          </div>
        )
      })}

      {/* ETC fork visual - diagonal split */}
      {progress >= dateToProgress('2016-07-20') && (
        <div
          className="absolute"
          style={{
            left: 'calc(50% - 30px)',
            top: `${dateToProgress('2016-07-20') * 100}%`,
            width: '60px',
            height: '40px',
            background: 'transparent',
            borderLeft: '2px solid rgba(52, 211, 153, 0.3)',
            borderTop: '2px solid rgba(52, 211, 153, 0.3)',
            transform: 'rotate(-15deg)',
            transformOrigin: 'top right',
          }}
        />
      )}

      {/* Merge glow effect */}
      {progress >= 0.8 && (
        <div
          className="absolute left-1/2 w-4 h-4 rounded-full animate-pulse"
          style={{
            top: '80%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(0,211,149,0.8) 0%, transparent 70%)',
            boxShadow: '0 0 30px rgba(0,211,149,0.5)',
          }}
        />
      )}
    </div>
  )
}
