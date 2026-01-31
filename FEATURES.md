# Ethereum Archive — Feature Breakdown

*Detailed feature list from vision sessions. Keep this up to date.*

## Core Concept

**Three-part nature:**
1. **Educational** — teach what Ethereum is and why it matters
2. **Historical/Architectural** — document design evolution and tradeoffs
3. **Art** — visually compelling, almost meditative experience

**Key insight:** The blockchain IS a clock. Everything indexed by block numbers, not just dates.

---

## Phase 1: Foundation

### Timeline Core
- [x] Static timeline with text + links
- [x] Block-indexed events (timestamp → block number conversion) — backend has block_time.rs
- [x] Era markers (Frontier → Homestead → Metropolis → etc.)
- [x] Basic detail panels for each event

### Data Sources
- [x] ethereum/EIPs repo integration — backend has github.rs
- [x] ethereum/pm repo (AllCoreDevs notes, upgrade specs) — backend scaffolded
- [x] Hard fork block numbers (static, well-documented) — in timeline.ts
- [ ] Vitalik's blog posts (manual curation initially)

### Tagging System
Tags: `protocol`, `scaling`, `defi`, `nft`, `social`, `research`, `security`
- [x] Tag each event — Tag type + tags field added
- [x] Filter by tags — TagFilter.tsx component created
- [x] Presets: "Protocol Deep Dive" / "DeFi Journey" / "Full Experience"

### Content Tracks
**Protocol layer:**
- Hard forks, EIPs, upgrades
- Architectural decisions

**Application layer:**
- MakerDAO (early DeFi, DAI stablecoin)
- CryptoKitties (congestion wake-up call)
- Uniswap (AMM breakthrough, DeFi summer)
- Compound, Aave (lending)
- OpenSea, NFT boom
- ENS (identity layer)

**Failed/abandoned attempts (educational):**
- Raiden Network (state channels, eclipsed by rollups)
- Plasma (data availability issues)

---

## Phase 2: Animation

### "On Rails" Mode
- [ ] Click play, watch Ethereum evolve
- [ ] Blocks with connectors marching forward
- [ ] Auto-scroll through timeline
- [ ] Pause/resume controls

### Visual Effects
- [ ] Hard forks as visual events (chain diverging for ETC split)
- [ ] L2s appearing in background/distance as they launch
- [ ] Visual complexity grows as ecosystem grows
- [ ] Merge glow effect at block 15,537,394

### L2 Chain Visualization
- [x] Faded lines in background — L2Chains.tsx
- [x] Lines tied to specific milestones (not arbitrary)
- [x] Full-length lines (from milestone to bottom of page)
- [x] Optimism (red), Arbitrum (blue), Base (blue), zkSync, Linea, Scroll
- [x] Historical: Plasma, Raiden (very faded - abandoned)
- [x] ETC fork as first branch (most faded - ancient history)
- [x] Horizontal connectors from main line to branches
- [x] Unique shimmer effects per chain (slow/medium/fast/pulse/wave)
- [x] Age-based opacity (older = more faded)
- [x] The Merge glow effect
- [x] Dencun/4844 milestone glow
- [x] **Beacon Chain** — parallel line (orange, more solid) that curves and merges into mainline at The Merge
- [x] SVG curve for smooth Beacon Chain → mainline merge animation
- [x] **Hard fork ghost branches** — short dashed curves at each fork that fade out (the "old chain" that died)
- [x] **Rainbow effect at timeline end** — L2 lines get brighter/glowier as you scroll toward present
- [x] **Live section shimmer** — main line pulses/shimmers only in the live block section (bottom 8%); solid elsewhere

---

## Phase 3: Immersive

### Live Block Feed
- [x] Bottom of timeline = "Now" — LiveBlockFeed.tsx
- [x] WebSocket connection for real-time blocks (with polling fallback)
- [x] Links to Etherscan for details
- [x] Historical becomes present
- [x] Older blocks fade, newest at bottom (highlighted)
- [x] Auto-cycles without scrolling

### Future History Section
- [x] "The history that hasn't happened yet" — FutureHistory.tsx
- [x] Upcoming upgrades: Pectra, Verkle, Danksharding, Single Slot Finality
- [x] Status badges (Planning/Testing/Scheduled)
- [x] Links to Forkcast and specs

### Audio Layer
- [x] Play/pause button (bottom left, unobtrusive) — AudioPlayer.tsx
- [x] Yuri Petrovski "The Cyberpunk Runner" via YouTube embed
- [ ] Music evolves as you scroll through eras (future enhancement)
  - Early Ethereum = minimal/ambient
  - DeFi summer = more intense
  - Present = full cyberpunk

### Embedded Media
- [ ] Audio clips at key moments (Vitalik introducing rollup roadmap)
- [ ] Video embeds from DevCon talks
- [ ] Sound effects for animations
- [ ] Primary sources > summaries

### AI Chat Interface
- [ ] Ask questions in context
- [ ] Summarization, clarification
- [ ] "Explain this to me"
- [ ] Makes dense info accessible

---

## Data Sources (Full List)

### GitHub (API access ✅)
- ethereum/EIPs
- ethereum/pm (AllCoreDevs notes, Network-Upgrade-Archive)

### Blogs & Research
- Vitalik's blog (vitalik.eth.limo)
- ethresear.ch (Discourse API)
- Ethereum Cat Herders

### Social/Human Layer
- Twitter/X archives (Vitalik, Danny Ryan, Tim Beiko, Hudson Jameson)
- ethereum-magicians forum
- Reddit r/ethereum milestone posts
- Discord/Gitter archives if accessible

### Video/Audio Primary Sources
- DevCon talks (YouTube, archive.org)
- ETHGlobal presentations
- Bankless/podcast interviews
- Research day presentations

### DevCon & DevConnect Events
Link to archive.org or live sources:
- DevCon 0 (Berlin, 2014)
- DevCon 1 (London, 2015)
- DevCon 2 (Shanghai, 2016)
- DevCon 3 (Cancún, 2017)
- DevCon 4 (Prague, 2018)
- DevCon 5 (Osaka, 2019)
- DevCon 6 (Bogotá, 2022)
- DevCon 7 (Bangkok, 2024)
- DevConnect (Amsterdam 2022, Istanbul 2023, etc.)

Sources:
- https://archive.devcon.org/ (official archive)
- https://devcon.org/
- YouTube playlists for each event
- archive.org for historical sites

### L2Beat (Primary Source for L2 Data)
**https://l2beat.com/** — Layer 2 Analytics & Risk Analysis
- TVL, activity, and risk assessments for all major L2s
- Use for L2 milestone links (e.g., l2beat.com/scaling/projects/optimism)
- Risk framework explanations
- Historical data on L2 growth

### Forkcast.org (Primary Source for Recent Data)
**https://forkcast.org/** — Ethereum Upgrade Tracker
- AllCoreDevs call links and notes
- Fork specifications and timelines
- Discussion threads
- Use as primary link for recent hard forks and ACD calls

### Key Talks to Embed
- Vitalik's rollup-centric roadmap announcement (turning point!)
- The Merge countdown
- Major DevCon keynotes

### Cultural Artifacts (Celebration of Ethereum Culture)
**Documentaries/Films:**
- "Trust Machine" (2018)
- "Ethereum: The Infinite Garden" (2024)
- "Vitalik: An Ethereum Story"

**Books:**
- "The Cryptopians" — Laura Shin (2022)
- "Mastering Ethereum" — Andreas Antonopoulos & Gavin Wood
- "The Infinite Machine" — Camila Russo (2020)
- "Out of the Ether" — Matthew Leising

**Podcasts/Shows:**
- Bankless
- Unchained (Laura Shin)
- Zero Knowledge Podcast

**Art/NFTs:**
- Beeple's Everydays
- CryptoPunks launch
- Art Blocks generative art

*Goal: This isn't just a technical timeline — it's a celebration of Ethereum culture.*

---

## TODO: Primary Source Links for Each Event

**Task:** Replace generic "Learn More → ethereum.org" with actual primary sources.

For each event, find:
1. **Archive.org links** — original websites/pages at the time (e.g., MakerDAO site circa 2017)
2. **Current site** — if still exists, clearly labeled as "current"
3. **Blog posts/announcements** — official announcements, Vitalik posts, etc.
4. **Discussion threads** — Reddit, Twitter, forum archives
5. **Technical specs** — EIPs, GitHub PRs, specs

**Priority events to source:**

**L2 launches (link to L2Beat + official sites):**
- [x] Optimism → l2beat.com/scaling/projects/optimism + optimism.io
- [x] Arbitrum → l2beat.com/scaling/projects/arbitrum + arbitrum.io
- [x] Base → l2beat.com/scaling/projects/base + base.org
- [x] zkSync Era → l2beat.com/scaling/projects/zksync-era + zksync.io
- [x] Linea → l2beat.com/scaling/projects/linea + linea.build
- [x] Scroll → l2beat.com/scaling/projects/scroll + scroll.io

**DeFi/App launches:**
- [ ] MakerDAO launch — archive.org of original site
- [ ] Uniswap V1/V2/V3 — Hayden Adams announcements
- [ ] CryptoKitties — original site, news coverage
- [ ] All hard forks — ethereum/pm specs, EIP links
- [ ] The Merge — countdown site, official comms
- [ ] DeFi Summer (Compound COMP) — announcement posts
- [ ] NFT boom (Beeple) — Christie's auction page

### AllCoreDevs Calls (Big Task)
**Add ALL ACD calls to the timeline as filterable events.**

Data sources:
- `ethereum/pm` repo — meeting notes in markdown
- Forkcast.org — structured call data
- YouTube — recordings

Implementation:
- Automate ingestion from ethereum/pm repo
- Each call becomes a timeline event with type `acd_call`
- Tag: `protocol`
- Links: YouTube recording, meeting notes, agenda
- Filter toggle to show/hide ACD calls (there are 200+)

This is a data aggregation task — perfect for the Rust backend.

---

## Architecture

### Backend (Rust)
- API aggregating/caching sources
- Block ↔ timestamp conversion
- Search/browse endpoints

### Frontend (React + TypeScript)
- Timeline UI
- Animation layer
- Audio player
- Live block feed

### Principles
- Links > copies (point to canonical sources)
- Block numbers as primary index
- Phased delivery (always shippable)

---

## Operating Model

1. **Work async** — nights/heartbeats
2. **Surface decisions cleanly** — A/B options with visuals
3. **Don't go too far** — check in on big decisions
4. **Keep docs updated** — this file, VISION.md

---

*Last updated: 2026-01-31*
