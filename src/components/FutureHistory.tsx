/**
 * Future History section
 * 
 * Shows upcoming Ethereum upgrades and planned features.
 * "The history that hasn't happened yet."
 */

interface UpcomingUpgrade {
  id: string
  name: string
  expectedDate: string
  description: string
  status: 'planning' | 'testing' | 'scheduled'
  links: { label: string; url: string }[]
}

const UPCOMING_UPGRADES: UpcomingUpgrade[] = [
  {
    id: 'pectra',
    name: 'Pectra (Prague-Electra)',
    expectedDate: 'Q1 2025',
    description: 'Account abstraction (EIP-7702), validator consolidation, and execution layer improvements.',
    status: 'testing',
    links: [
      { label: 'Forkcast: Pectra', url: 'https://forkcast.org/' },
      { label: 'EIP-7702 Spec', url: 'https://eips.ethereum.org/EIPS/eip-7702' },
    ],
  },
  {
    id: 'verkle',
    name: 'Verkle Trees',
    expectedDate: '2025-2026',
    description: 'Replace Merkle Patricia Tries with Verkle trees for stateless clients and reduced witness sizes.',
    status: 'planning',
    links: [
      { label: 'Verkle.info', url: 'https://verkle.info/' },
      { label: 'Vitalik on Verkle', url: 'https://vitalik.eth.limo/general/2021/06/18/verkle.html' },
    ],
  },
  {
    id: 'danksharding',
    name: 'Full Danksharding',
    expectedDate: '2025+',
    description: 'Complete data availability scaling with data availability sampling (DAS). The endgame for L2 scaling.',
    status: 'planning',
    links: [
      { label: 'Danksharding FAQ', url: 'https://notes.ethereum.org/@vbuterin/proto_danksharding_faq' },
      { label: 'ethereum.org Roadmap', url: 'https://ethereum.org/en/roadmap/danksharding/' },
    ],
  },
  {
    id: 'single-slot',
    name: 'Single Slot Finality',
    expectedDate: 'Research',
    description: 'Reduce finality time from ~15 minutes to a single 12-second slot.',
    status: 'planning',
    links: [
      { label: 'SSF Research', url: 'https://ethereum.org/en/roadmap/single-slot-finality/' },
    ],
  },
]

const STATUS_COLORS = {
  planning: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', label: 'Planning' },
  testing: { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'Testing' },
  scheduled: { bg: 'bg-green-500/20', text: 'text-green-500', label: 'Scheduled' },
}

export function FutureHistory() {
  return (
    <section className="px-8 py-16 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Future History
          </h2>
          <p className="text-[var(--text-muted)]">
            The history that hasn't happened yet. Upcoming upgrades and the road ahead.
          </p>
        </div>

        {/* Upcoming upgrades */}
        <div className="space-y-4">
          {UPCOMING_UPGRADES.map((upgrade) => {
            const status = STATUS_COLORS[upgrade.status]
            
            return (
              <div 
                key={upgrade.id}
                className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--bg-tertiary)] p-5 
                           hover:border-[var(--eth-purple)]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {upgrade.name}
                    </h3>
                    <span className="text-sm text-[var(--text-muted)]">
                      {upgrade.expectedDate}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {upgrade.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {upgrade.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--eth-purple)] hover:underline flex items-center gap-1"
                    >
                      {link.label}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Forkcast link */}
        <div className="mt-8 text-center">
          <a
            href="https://forkcast.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] 
                       border border-[var(--bg-tertiary)] rounded-lg
                       text-[var(--eth-purple)] hover:bg-[var(--eth-purple)]/10 transition-colors"
          >
            <span>Track all upgrades on Forkcast</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
