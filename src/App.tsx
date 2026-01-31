import { useState, useEffect, useRef, useMemo } from 'react'
import { Timeline } from './components/Timeline'
import { Header } from './components/Header'
import { DetailPanel } from './components/DetailPanel'
import { L2Chains } from './components/L2Chains'
import { AudioPlayer } from './components/AudioPlayer'
import { LiveBlockFeed } from './components/LiveBlockFeed'
import { TagFilter } from './components/TagFilter'
import { TIMELINE_DATA, ERA_INFO } from './data/timeline'
import type { TimelineNode, Era, Tag } from './data/timeline'

// All available tags
const ALL_TAGS: Tag[] = ['protocol', 'scaling', 'defi', 'nft', 'social', 'research', 'security']

function App() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentEra, setCurrentEra] = useState<Era>('frontier')
  const [activeTags, setActiveTags] = useState<Tag[]>(ALL_TAGS)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Filter timeline nodes based on active tags
  const filteredNodes = useMemo(() => {
    if (activeTags.length === ALL_TAGS.length) {
      return TIMELINE_DATA // Show all if all tags active
    }
    return TIMELINE_DATA.filter(node => {
      // Show nodes that have at least one matching tag, or no tags (legacy)
      if (!node.tags || node.tags.length === 0) return true
      return node.tags.some(tag => activeTags.includes(tag))
    })
  }, [activeTags])

  // Track scroll progress for L2 chains visualization
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, scrollTop / docHeight))
        setScrollProgress(progress)

        // Determine current era based on scroll position
        const eras: Era[] = ['frontier', 'homestead', 'metropolis', 'istanbul', 'beacon', 'merge', 'shanghai', 'cancun']
        const eraIndex = Math.floor(progress * eras.length)
        setCurrentEra(eras[Math.min(eraIndex, eras.length - 1)])
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      {/* Audio player */}
      <AudioPlayer currentEra={currentEra} />
      
      <main className="relative" ref={timelineRef}>
        {/* L2 chains background visualization */}
        <L2Chains 
          progress={scrollProgress} 
          height={document.documentElement.scrollHeight} 
        />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--eth-purple)] to-[var(--eth-purple-light)] bg-clip-text text-transparent">
              Ethereum Historical Society
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8">
              A complete history of Ethereum's evolution — from genesis to the present
            </p>
            
            {/* Era indicator */}
            <div className="mb-6 text-sm">
              <span className="text-[var(--text-muted)]">Currently viewing: </span>
              <span 
                className="font-medium px-2 py-1 rounded"
                style={{ 
                  backgroundColor: ERA_INFO[currentEra].color + '30',
                  color: ERA_INFO[currentEra].color === '#1B1B1B' ? 'var(--text-secondary)' : ERA_INFO[currentEra].color,
                }}
              >
                {ERA_INFO[currentEra].name} ({ERA_INFO[currentEra].years})
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
              <span>Scroll to explore</span>
              <svg 
                className="w-5 h-5 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="max-w-md mx-auto mt-8">
            <TagFilter 
              activeTags={activeTags} 
              onTagsChange={setActiveTags} 
            />
            {filteredNodes.length !== TIMELINE_DATA.length && (
              <p className="text-sm text-[var(--text-muted)] text-center mt-2">
                Showing {filteredNodes.length} of {TIMELINE_DATA.length} events
              </p>
            )}
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline 
          nodes={filteredNodes} 
          onSelectNode={setSelectedNode}
          selectedNodeId={selectedNode?.id}
        />

        {/* Live Block Feed - appears at the bottom (present day) */}
        <section className="px-8 py-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-center">
              Now
            </h2>
            <p className="text-[var(--text-muted)] text-center mb-6">
              The timeline continues... Watch live Ethereum blocks being produced.
            </p>
            <LiveBlockFeed variant="full" maxBlocks={5} />
          </div>
        </section>
      </main>

      {/* Detail Panel */}
      <DetailPanel 
        node={selectedNode} 
        onClose={() => setSelectedNode(null)} 
      />

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-[var(--bg-tertiary)]">
        <div className="max-w-4xl mx-auto text-center text-[var(--text-muted)]">
          <p className="mb-2">
            Built by{' '}
            <a 
              href="https://github.com/its-applekid" 
              className="text-[var(--eth-purple)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Applekid
            </a>
          </p>
          <p className="text-sm">
            Data sourced from EIPs, ethereum.org, and community research
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
