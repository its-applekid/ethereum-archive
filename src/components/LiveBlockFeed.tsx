import { useState, useEffect } from 'react'

interface BlockInfo {
  number: number
  timestamp: number
  hash: string
  transactionCount?: number
  gasUsed?: number
  baseFeeGwei?: number
}

interface LiveBlockFeedProps {
  /** Show as a minimal ticker or full display */
  variant?: 'ticker' | 'full'
  /** Max blocks to show in history */
  maxBlocks?: number
}

/**
 * Live Ethereum block feed
 * 
 * Connects to backend WebSocket for real-time block updates,
 * or falls back to polling.
 */
export function LiveBlockFeed({ variant = 'full', maxBlocks = 5 }: LiveBlockFeedProps) {
  const [blocks, setBlocks] = useState<BlockInfo[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Skip WebSocket on static hosting (GitHub Pages) - go straight to polling
    const startPolling = () => {
      // Fallback: poll every 12 seconds
      const poll = async () => {
        try {
          // Use public RPC endpoint
          const response = await fetch('https://eth.llamarpc.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_getBlockByNumber',
              params: ['latest', false],
              id: 1,
            }),
          })
          
          const data = await response.json()
          if (data.result) {
            const block: BlockInfo = {
              number: parseInt(data.result.number, 16),
              timestamp: parseInt(data.result.timestamp, 16),
              hash: data.result.hash,
              gasUsed: parseInt(data.result.gasUsed, 16),
              baseFeeGwei: data.result.baseFeePerGas 
                ? parseInt(data.result.baseFeePerGas, 16) / 1e9 
                : undefined,
            }
            
            setBlocks(prev => {
              // Only add if it's a new block
              if (prev.length === 0 || prev[0].number !== block.number) {
                return [block, ...prev].slice(0, maxBlocks)
              }
              return prev
            })
            setIsConnected(true)
            setError(null)
          }
        } catch (e) {
          setError('Failed to fetch blocks')
        }
      }

      // Initial poll
      poll()
      
      // Poll every 12 seconds (Ethereum block time)
      const interval = setInterval(poll, 12000)
      
      return interval
    }

    // Start polling immediately (no WebSocket on static hosting)
    const interval = startPolling()

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [maxBlocks])

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts * 1000)
    return date.toLocaleTimeString()
  }

  const formatGas = (gas: number) => {
    return (gas / 1e6).toFixed(1) + 'M'
  }

  const formatBaseFee = (gwei?: number) => {
    if (!gwei) return '-'
    return gwei.toFixed(1) + ' gwei'
  }

  if (variant === 'ticker') {
    const latestBlock = blocks[0]
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
        {latestBlock ? (
          <>
            <span>Block</span>
            <a 
              href={`https://etherscan.io/block/${latestBlock.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[var(--eth-purple)] hover:underline"
            >
              #{latestBlock.number.toLocaleString()}
            </a>
            <span className="text-xs opacity-60">
              {formatTimestamp(latestBlock.timestamp)}
            </span>
          </>
        ) : (
          <span>Connecting...</span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-tertiary)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--bg-tertiary)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <span className="font-medium text-[var(--text-primary)]">Live Blocks</span>
        </div>
        <a 
          href="https://etherscan.io/blocks"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--eth-purple)]"
        >
          View on Etherscan →
        </a>
      </div>

      {/* Block list */}
      <div className="divide-y divide-[var(--bg-tertiary)]">
        {error && (
          <div className="px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {blocks.length === 0 && !error && (
          <div className="px-4 py-8 text-center text-[var(--text-muted)]">
            <div className="animate-spin w-6 h-6 border-2 border-[var(--eth-purple)] border-t-transparent rounded-full mx-auto mb-2" />
            Waiting for blocks...
          </div>
        )}

        {blocks.slice().reverse().map((block, index, arr) => {
          // Fade older blocks (index 0 is oldest after reverse)
          const opacity = 0.4 + (index / arr.length) * 0.6
          const isNewest = index === arr.length - 1
          
          return (
            <div 
              key={block.hash}
              className={`px-4 py-3 transition-all duration-500 ${isNewest ? 'bg-[var(--eth-purple)]/10' : ''}`}
              style={{ opacity }}
            >
              <div className="flex items-center justify-between mb-1">
                <a
                  href={`https://etherscan.io/block/${block.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-[var(--eth-purple)] hover:underline"
                >
                  #{block.number.toLocaleString()}
                </a>
                <span className="text-xs text-[var(--text-muted)]">
                  {formatTimestamp(block.timestamp)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <span>Gas: {block.gasUsed ? formatGas(block.gasUsed) : '-'}</span>
                <span>Base: {formatBaseFee(block.baseFeeGwei)}</span>
                <span 
                  className="font-mono truncate max-w-[120px]" 
                  title={block.hash}
                >
                  {block.hash.slice(0, 10)}...
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
