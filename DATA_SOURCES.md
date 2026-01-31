# Ethereum Historical Society — Data Sources Inventory

*Research in progress*

## GitHub Repositories (Direct API Access)

### ethereum/EIPs
- **URL:** https://github.com/ethereum/EIPs
- **Access:** GitHub API ✅
- **Structure:** `EIPS/eip-{number}.md` — markdown files with frontmatter
- **Data available:**
  - EIP number, title, author, status
  - Category (Core, ERC, Interface, etc.)
  - Created date
  - Full specification text
- **Notes:** Can parse frontmatter for metadata, body for content

### ethereum/pm (Project Management)
- **URL:** https://github.com/ethereum/pm
- **Access:** GitHub API ✅
- **Structure:**
  - `AllCoreDevs-EL-Meetings/` — Execution Layer call notes
  - `AllCoreDevs-CL-Meetings/` — Consensus Layer call notes
  - `Network-Upgrade-Archive/` — Berlin, London, Merge, Dencun, Pectra, etc.
  - `Breakout-Room-Meetings/` — specialized discussions
- **Data available:**
  - Meeting agendas and notes
  - Decision records
  - Upgrade specifications and timelines

## Blogs & Research

### Vitalik's Blog
- **URL:** https://vitalik.eth.limo
- **Access:** Web scrape or RSS?
- **Data:** Blog posts, often announcing major direction changes
- **Key posts:** Rollup-centric roadmap, endgame, etc.

### Ethereum Research (ethresear.ch)
- **URL:** https://ethresear.ch
- **Access:** Discourse API? Web scrape?
- **Data:** Research posts, discussions
- **Notes:** Need to investigate API availability

### Ethereum Cat Herders
- **URL:** https://www.ethereumcatherders.com
- **Access:** TBD
- **Data:** Community coordination, upgrade summaries

## Social

### Twitter/X Archives
- **Accounts:** @VitalikButerin, @dannyryan, @TimBeiko, @hudsonjameson
- **Access:** Twitter API (limited), manual curation, or archives
- **Data:** Key milestone tweets
- **Challenge:** Twitter API access is restricted now

### DevCon Talks
- **URL:** YouTube, archive.org
- **Access:** YouTube API or manual links
- **Data:** Conference presentations, key announcements
- **Notes:** DevCon has official archive

## Blockchain Data

### Hard Fork Block Numbers
Known exact blocks:
- Homestead: 1,150,000
- DAO Fork: 1,920,000
- Byzantium: 4,370,000
- Constantinople/Petersburg: 7,280,000
- Istanbul: 9,069,000
- Muir Glacier: 9,200,000
- Berlin: 12,244,000
- London (EIP-1559): 12,965,000
- The Merge: 15,537,394 (last PoW block)
- Shanghai: slot 6,209,536
- Dencun: slot 8,626,176

### Live Block Data
- **Providers:** Alchemy, Infura, public nodes
- **Access:** JSON-RPC, WebSocket subscriptions
- **Data:** Current block number, timestamps, tx counts

### Block Explorers
- **Etherscan:** Links for detailed block/tx info
- **Access:** Etherscan API (rate limited) or just link out

## Timestamp ↔ Block Conversion

Need utility to convert timestamps to approximate block numbers:
- Pre-Merge: ~13 second block time (variable)
- Post-Merge: 12 second slots (fixed)
- Historical block times varied significantly

Could use:
- Etherscan API to look up blocks by timestamp
- Pre-computed lookup table for key ranges
- Interpolation between known anchors

## Priority for Phase 1

1. **ethereum/EIPs** — structured, easy to parse
2. **ethereum/pm** — Network-Upgrade-Archive for hard fork data
3. **Hard fork block numbers** — static, well-documented
4. **Vitalik blog** — manual curation of key posts initially

## Open Questions

- [ ] Does ethresear.ch have an API?
- [ ] Best approach for Twitter content (manual curation vs API)?
- [ ] Hosting for backend — Vercel serverless? Dedicated Rust backend?
- [ ] Data refresh strategy — how often to pull updates?

---

*Last updated: 2026-01-30 ~23:55 PST*
