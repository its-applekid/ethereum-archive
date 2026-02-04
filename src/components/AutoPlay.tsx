import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

interface AutoPlayProps {
  /** Initial scroll speed in pixels per second */
  speed?: number
}

export interface AutoPlayRef {
  play: () => void
  pause: () => void
  toggle: () => void
}

// Speed range: 500 (slow) to 10000 (very fast)
const MIN_SPEED = 500
const MAX_SPEED = 10000
const DEFAULT_SPEED = 2400

export const AutoPlay = forwardRef<AutoPlayRef, AutoPlayProps>(({ speed: initialSpeed = DEFAULT_SPEED }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)
  const [isHovered, setIsHovered] = useState(false)
  
  useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying(prev => !prev),
  }))
  
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const speedRef = useRef(speed)
  
  // Keep speedRef in sync
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  // Animation loop - simple constant scroll
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      lastTimeRef.current = null
      return
    }

    const animate = (timestamp: number) => {
      // First frame - just record time, don't scroll
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const delta = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Calculate pixels to scroll based on time elapsed (use ref for latest speed)
      const pixelsToScroll = (speedRef.current * delta) / 1000

      // Check if we've reached the bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY

      if (currentScroll >= maxScroll - 10) {
        // Reached the end
        setIsPlaying(false)
        return
      }

      // Scroll down
      window.scrollBy(0, pixelsToScroll)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev)
  }

  const getSpeedLabel = () => {
    if (speed < 1500) return 'Slow'
    if (speed < 4000) return 'Medium'
    if (speed < 7000) return 'Fast'
    return 'Very Fast'
  }

  return (
    <div 
      className="relative py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container for button + slider with padding for safe hover */}
      <div className="flex items-center">
        {/* Play/Pause button */}
        <button
          onClick={handlePlayPause}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            transition-all duration-300 shadow-lg
            ${isPlaying 
              ? 'bg-[var(--eth-purple)] text-white' 
              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
            }
          `}
          title={isPlaying ? 'Pause auto-scroll' : 'Auto-scroll through history'}
        >
          {isPlaying ? (
            // Pause icon
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            // Play icon
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Speed slider - appears to the right on hover */}
        <div 
          className={`
            ml-2 bg-[var(--bg-secondary)] rounded-lg px-3 py-2 
            border border-[var(--bg-tertiary)] shadow-xl
            flex items-center gap-3
            transition-all duration-200 origin-left
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
        >
          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{getSpeedLabel()}</span>
          <input
            type="range"
            min={MIN_SPEED}
            max={MAX_SPEED}
            step={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 h-1 rounded-lg appearance-none bg-[var(--bg-tertiary)] cursor-pointer accent-[var(--eth-purple)]"
          />
        </div>
      </div>
    </div>
  )
})
