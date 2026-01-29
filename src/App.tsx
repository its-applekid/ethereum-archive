import { useState } from 'react'
import { Timeline } from './components/Timeline'
import { Header } from './components/Header'
import { DetailPanel } from './components/DetailPanel'
import { TIMELINE_DATA } from './data/timeline'
import type { TimelineNode } from './data/timeline'

function App() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--eth-purple)] to-[var(--eth-purple-light)] bg-clip-text text-transparent">
              Ethereum Historical Society
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8">
              A complete history of Ethereum's evolution — from genesis to the present
            </p>
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
        </section>

        {/* Timeline Section */}
        <Timeline 
          nodes={TIMELINE_DATA} 
          onSelectNode={setSelectedNode}
          selectedNodeId={selectedNode?.id}
        />
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
