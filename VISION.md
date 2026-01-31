# Ethereum Historical Society — Vision Doc

*Captured from conversation with Everdred, 2026-01-30*

## Core Purpose

An **educational, historical, and artistic** project that:
1. Teaches what Ethereum is and why it matters
2. Documents the design evolution and tradeoffs
3. Makes it visually compelling — almost meditative to experience

The goal is to capture the "you had to be there" knowledge for people coming in now. It's hard enough to understand current Ethereum + L2s — it's nearly impossible to also appreciate the historical evolution without having lived it.

## The Experience

### Timeline as Blockchain
- The timeline IS the blockchain — indexed by block numbers, not just dates
- Events (tweets, talks, hard forks) pinned to their approximate block
- Reinforces: the blockchain is a clock, time and blocks are intertwined

### "On Rails" Mode
- Click play and watch Ethereum's evolution unfold
- Blocks with connectors between them, marching forward
- Hard forks as visual events (Ethereum Classic split = chain diverging)
- L2s appearing and growing in the background/distance as they come online
- Visual complexity grows as the ecosystem grows

### Present Day = Live Block Explorer
- Scroll to the bottom and you're at "now"
- Live blocks being added via websocket
- Links to Etherscan for full details
- The historical becomes the present

### AI Chat Interface
- Given how dense the info is, let users ask questions in context
- Summarization, clarification, "explain this"
- Makes it accessible without dumbing it down

## Data Sources

### Protocol & Technical
- **EIPs** (ethereum/EIPs repo)
- **AllCoreDevs call notes** (ethereum/pm repo)
- **Hard fork specs** (exact block numbers)
- **Ethereum Research blog** (ethresear.ch)

### Historical Scaling Attempts
- Raiden Network (state channels, eclipsed by rollups)
- Plasma (data availability issues)
- The evolution to rollups

### Social & Human Layer
- **Vitalik's blog** (vitalik.eth.limo)
- **Key tweets** from Vitalik, Danny Ryan, Tim Beiko, Hudson Jameson
- **DevCon talks** (archived on YouTube)
- **Ethereum Cat Herders** content
- **Bankless/podcast interviews** at key moments

### Existing Resources
- Everdred's researcher-service (Rust RAG backend) as reference
- ethereum-magicians forum threads
- Reddit r/ethereum milestone posts

## Architecture Ideas

- **Rust backend** — API that aggregates/caches sources
- **Frontend** — Timeline UI with search/browse
- **Links > copies** — Point to canonical sources, summarize/excerpt for context
- **Block number utils** — Convert timestamps → approximate block numbers (accounting for pre/post-Merge block times)

## Key Milestones to Cover

### Protocol Layer
- Genesis block
- Homestead
- The DAO hack & fork (Ethereum Classic split)
- Byzantium, Constantinople, Istanbul
- Rollup-centric roadmap announcement
- EIP-1559 (London)
- The Merge (block 15,537,394)
- Shanghai/Capella (withdrawals)
- Dencun (4844, blobs)
- L2s: Arbitrum, Optimism, Base, zkSync, etc.

### Failed/Abandoned Scaling Attempts
- Raiden Network (state channels, eclipsed by rollups)
- Plasma (data availability issues)
- These are educational — show the iteration process

### Application Layer
- **MakerDAO** — early DeFi primitive, DAI stablecoin
- **CryptoKitties** — NFT moment, network congestion wake-up call
- **Uniswap** — AMM breakthrough, DeFi summer catalyst
- **Compound, Aave** — lending protocols
- **OpenSea, NFT boom** — cultural moment
- **ENS** — identity layer

## Tagging & Filtering System

All data points tagged by category. Users can show/hide:
- `protocol` — hard forks, EIPs, upgrades
- `scaling` — L2s, rollups, Plasma, Raiden
- `defi` — Uniswap, MakerDAO, lending
- `nft` — CryptoKitties, OpenSea, art
- `social` — tweets, talks, blog posts
- `research` — ethresear.ch, whitepapers
- `security` — hacks, incidents, lessons

**Presets:** "Protocol Deep Dive" / "DeFi Journey" / "Full Experience"

## Audio/Visual Art Layer

### Background Music
- Play/pause button (bottom left, unobtrusive)
- Cyberpunk aesthetic fits Ethereum vibe
- Reference artist: **Yuri Petrobsky** — "Cyberpunk Runner" and variations
- Music could evolve as you scroll through eras

### Embedded Media (Phase 3)
- Audio clips at key moments (Vitalik introducing rollup roadmap)
- Video embeds from DevCon talks
- Sound effects for animations (blocks, forks)

## Phased Approach

### Phase 1: Foundation
- Static timeline with text + links
- Block-indexed events
- Basic tagging system
- Data source integration

### Phase 2: Animation
- "On rails" playback mode
- Visual animations for forks, L2s growing
- Scroll-driven experience

### Phase 3: Immersive
- Background music layer
- Embedded audio/video clips
- Full art piece experience

## Working Style

- Work async, especially during heartbeats/nights
- When hitting design forks, present clear A/B options
- Visual screenshots when comparing UI approaches
- Don't go too far without checking in on big decisions
- If blocked, pivot to other tasks — don't wait

---

*This is a living doc. Update as the project evolves.*
*Last updated: 2026-01-30 ~23:50 PST*
