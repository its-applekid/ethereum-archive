# Ethereum Historical Society — Feature Breakdown

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
- [x] Appear at launch date
- [x] Optimism, Arbitrum, Base, zkSync, Linea, Scroll
- [x] Historical: Plasma, Raiden (more faded)
- [x] ETC fork as diverging line

---

## Phase 3: Immersive

### Live Block Feed
- [x] Bottom of timeline = "Now" — LiveBlockFeed.tsx
- [x] WebSocket connection for real-time blocks (with polling fallback)
- [x] Links to Etherscan for details
- [x] Historical becomes present

### Audio Layer
- [x] Play/pause button (bottom left, unobtrusive) — AudioPlayer.tsx
- [ ] Actual audio files (need to source/license)
- [ ] Reference: Yuri Petrobsky "Cyberpunk Runner"
- [ ] Music evolves as you scroll through eras (structure ready, needs tracks)
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
