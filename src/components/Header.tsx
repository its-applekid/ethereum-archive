import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  const cycleTheme = () => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }
  
  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
      title={`Theme: ${theme} (${resolvedTheme})`}
    >
      {theme === 'system' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) : resolvedTheme === 'dark' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

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
        
        <nav className="flex items-center gap-4 md:gap-6">
          <a 
            href="#timeline" 
            className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Timeline
          </a>
          <a 
            href="https://eips.ethereum.org" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            EIPs
          </a>
          <a 
            href="https://github.com/its-applekid/ethereum-historical-society" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
