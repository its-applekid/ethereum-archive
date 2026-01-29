export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--bg-tertiary)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--eth-purple)] to-[var(--eth-purple-light)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Ξ</span>
          </div>
          <span className="font-semibold text-lg">ETH History</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#timeline" 
            className="text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            Timeline
          </a>
          <a 
            href="https://eips.ethereum.org" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            EIPs
          </a>
          <a 
            href="https://github.com/its-applekid/research" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
