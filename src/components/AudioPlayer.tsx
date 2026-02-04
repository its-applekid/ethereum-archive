import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

// YouTube video ID for "The Cyberpunk Runner" by Yuri Petrovski
const YOUTUBE_VIDEO_ID = 'ja36Fe-m60k'

interface AudioPlayerProps {
  /** Whether audio is enabled by default */
  autoPlay?: boolean
}

export interface AudioPlayerRef {
  play: () => void
  pause: () => void
  toggle: () => void
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ autoPlay = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) {
      setIsLoaded(true)
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      setIsLoaded(true)
    }
  }, [])

  // Initialize player when API is loaded
  useEffect(() => {
    if (!isLoaded || !containerRef.current || playerRef.current) return

    playerRef.current = new window.YT.Player('yt-player', {
      height: '0',
      width: '0',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID, // Required for loop to work
      },
      events: {
        onReady: () => {
          if (playerRef.current) {
            playerRef.current.setVolume(30) // 30% volume
          }
        },
        onStateChange: (event: { data: number }) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            // Restart for seamless loop
            playerRef.current?.playVideo()
          }
        },
      },
    })
  }, [isLoaded])

  // Handle play/pause
  useEffect(() => {
    if (!playerRef.current) return
    
    if (isPlaying) {
      playerRef.current.playVideo()
    } else {
      playerRef.current.pauseVideo()
    }
  }, [isPlaying])

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying(prev => !prev),
  }))

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setVolume = (volume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume * 100)
    }
  }

  return (
    <div 
      className="relative py-2"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Hidden YouTube player */}
      <div ref={containerRef} className="hidden">
        <div id="yt-player" />
      </div>

      {/* Container for button + controls */}
      <div className="flex items-center">
        {/* Main play button */}
        <button
          onClick={togglePlay}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            transition-all duration-300
            ${isPlaying 
              ? 'bg-[var(--eth-purple)] text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
            }
            hover:scale-110 hover:shadow-lg
            border border-[var(--bg-tertiary)]
          `}
          title={isPlaying ? 'Pause music' : 'Play "The Cyberpunk Runner" by Yuri Petrovski'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
        </button>

        {/* Expanded controls - appears to the right on hover */}
        <div 
          className={`
            ml-2 bg-[var(--bg-secondary)] rounded-lg px-3 py-2
            border border-[var(--bg-tertiary)]
            shadow-xl
            flex items-center gap-3
            transition-all duration-200 origin-left
            ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}
        >
          {/* Track info */}
          <div className="whitespace-nowrap">
            <div className="text-xs font-medium text-[var(--text-primary)]">
              The Cyberpunk Runner
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              Yuri Petrovski
            </div>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2">
            <span className="text-sm">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue={0.3}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 rounded-lg appearance-none bg-[var(--bg-tertiary)] cursor-pointer accent-[var(--eth-purple)]"
            />
            <span className="text-sm">🔊</span>
          </div>

          {/* YouTube link */}
          <a 
            href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--eth-purple)]"
            title="Listen on YouTube"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
})

// TypeScript declarations for YouTube IFrame API
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: {
        height: string
        width: string
        videoId: string
        playerVars?: Record<string, number | string>
        events?: {
          onReady?: () => void
          onStateChange?: (event: { data: number }) => void
        }
      }) => {
        playVideo: () => void
        pauseVideo: () => void
        setVolume: (volume: number) => void
      }
      PlayerState: {
        ENDED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}
