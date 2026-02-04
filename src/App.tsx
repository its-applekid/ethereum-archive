import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Timeline } from './components/Timeline'
import { Header } from './components/Header'
import { DetailPanel } from './components/DetailPanel'
import { L2Chains } from './components/L2Chains'
import type { AudioPlayerRef } from './components/AudioPlayer'
import type { AutoPlayRef } from './components/AutoPlay'
import { ControlStack } from './components/ControlStack'
import { LiveBlockFeed } from './components/LiveBlockFeed'
import { FutureHistory } from './components/FutureHistory'
import { TIMELINE_DATA } from './data/timeline'
import type { TimelineNode, Tag } from './data/timeline'

// All available tags
const ALL_TAGS: Tag[] = ['protocol', 'scaling', 'defi', 'nft', 'social', 'research', 'security', 'adoption', 'tvl', 'blobs']

function App() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTags, setActiveTags] = useState<Tag[]>(ALL_TAGS)
  const timelineRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<AudioPlayerRef>(null)
  const autoPlayRef = useRef<AutoPlayRef>(null)

  // Handle URL hash for deep linking to events
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the #
      if (hash) {
        const node = TIMELINE_DATA.find(n => n.id === hash)
        if (node) {
          setSelectedNode(node)
          // Scroll to the event after a brief delay to let the DOM settle
          setTimeout(() => {
            const element = document.getElementById(`event-${hash}`)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 100)
        }
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update URL hash when selecting a node
  const handleSelectNode = useCallback((node: TimelineNode | null) => {
    setSelectedNode(node)
    if (node) {
      // Update URL without triggering scroll
      window.history.replaceState(null, '', `#${node.id}`)
    } else {
      // Clear hash when closing panel
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  // Filter timeline nodes based on active tags
  const filteredNodes = useMemo(() => {
    // No tags active = show nothing
    if (activeTags.length === 0) {
      return []
    }
    // All tags active = show everything (including untagged)
    if (activeTags.length === ALL_TAGS.length) {
      return TIMELINE_DATA
    }
    // Some tags active = show nodes with at least one matching tag
    // Untagged nodes only show when ALL tags are active
    return TIMELINE_DATA.filter(node => {
      if (!node.tags || node.tags.length === 0) return false
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
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      {/* Bottom-left control stack (audio, auto-scroll, filter) */}
      <ControlStack
        audioRef={audioRef}
        autoPlayRef={autoPlayRef}
        activeTags={activeTags}
        onTagsChange={setActiveTags}
        totalEvents={TIMELINE_DATA.length}
        filteredCount={filteredNodes.length}
      />
      
      <main className="relative" ref={timelineRef}>
        {/* L2 chains background visualization - constrained to main content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <L2Chains progress={scrollProgress} />
        </div>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--eth-purple)] to-[var(--eth-purple-light)] bg-clip-text text-transparent">
              The Ethereum Archive
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)]">
              A complete history of Ethereum's evolution — from genesis to the present
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline 
          nodes={filteredNodes} 
          onSelectNode={handleSelectNode}
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
            <LiveBlockFeed variant="full" maxBlocks={3} />
          </div>
        </section>

        {/* Future History - upcoming upgrades */}
        <FutureHistory />
      </main>

      {/* Detail Panel */}
      <DetailPanel 
        node={selectedNode} 
        onClose={() => handleSelectNode(null)} 
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
