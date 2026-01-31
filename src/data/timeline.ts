export type Era = 
  | 'frontier'
  | 'homestead'
  | 'metropolis'
  | 'istanbul'
  | 'beacon'
  | 'merge'
  | 'shanghai'
  | 'cancun'

export type NodeType = 
  | 'hard_fork'
  | 'eip'
  | 'research'
  | 'milestone'
  | 'scaling'
  | 'controversy'
  | 'application'  // DeFi, NFT, major dApp launches

export type Tag = 
  | 'protocol'   // hard forks, EIPs, upgrades
  | 'scaling'    // L2s, rollups, Plasma, Raiden
  | 'defi'       // Uniswap, MakerDAO, lending
  | 'nft'        // CryptoKitties, OpenSea, art
  | 'social'     // tweets, talks, blog posts
  | 'research'   // ethresear.ch, whitepapers
  | 'security'   // hacks, incidents, lessons

export interface TimelineLink {
  label: string
  url: string
}

export interface TimelineNode {
  id: string
  type: NodeType
  date: string
  blockNumber?: number
  title: string
  summary: string
  era: Era
  importance: 'major' | 'significant' | 'minor'
  relatedEips?: number[]
  content?: string
  tags?: Tag[]
  /** URL to primary source (video, blog post, etc.) */
  sourceUrl?: string
  /** Multiple reference links */
  links?: TimelineLink[]
}

export const ERA_INFO: Record<Era, { name: string; years: string; color: string }> = {
  frontier: { name: 'Frontier', years: '2015', color: '#1B1B1B' },
  homestead: { name: 'Homestead', years: '2016', color: '#2D5016' },
  metropolis: { name: 'Metropolis', years: '2017-2019', color: '#4A1A7A' },
  istanbul: { name: 'Istanbul', years: '2019-2020', color: '#6B21A8' },
  beacon: { name: 'Beacon Chain Era', years: '2020-2022', color: '#FF6B35' },
  merge: { name: 'The Merge', years: '2022', color: '#00D395' },
  shanghai: { name: 'Shanghai', years: '2023', color: '#3B82F6' },
  cancun: { name: 'Cancun-Deneb', years: '2024', color: '#06B6D4' },
}

export const TIMELINE_DATA: TimelineNode[] = [
  // FRONTIER ERA
  {
    id: 'frontier-launch',
    type: 'milestone',
    date: '2015-07-30',
    blockNumber: 0,
    title: 'Frontier Launch',
    summary: 'Ethereum mainnet goes live. The genesis block is mined, marking the birth of the world computer.',
    era: 'frontier',
    importance: 'major',
    content: `Ethereum officially launched on July 30, 2015 with the Frontier release. This was a "beta" release intended for developers to start building and mining. The genesis block contained 8,893 transactions from the presale, distributing 72 million ETH.`
  },
  {
    id: 'frontier-thawing',
    type: 'hard_fork',
    date: '2015-09-07',
    blockNumber: 200000,
    title: 'Frontier Thawing',
    summary: 'First unplanned hard fork, increased gas limit from 5,000 to enable actual transactions.',
    era: 'frontier',
    importance: 'significant',
  },
  
  // HOMESTEAD ERA
  {
    id: 'homestead-fork',
    type: 'hard_fork',
    date: '2016-03-14',
    blockNumber: 1150000,
    title: 'Homestead',
    summary: 'First planned hard fork. Removed canary contracts, adjusted gas costs, enabled contract creation via transactions.',
    era: 'homestead',
    importance: 'major',
    relatedEips: [2, 7, 8],
    content: `The Homestead release marked Ethereum's transition from beta to a more stable platform. Key changes included:
- EIP-2: Adjusted contract creation gas
- EIP-7: Added DELEGATECALL opcode
- EIP-8: Forward compatibility for networking protocol`
  },
  {
    id: 'dao-hack',
    type: 'controversy',
    date: '2016-06-17',
    blockNumber: 1718497,
    title: 'The DAO Hack',
    summary: '3.6 million ETH (~$50M) drained from The DAO smart contract through a reentrancy vulnerability.',
    era: 'homestead',
    importance: 'major',
    content: `The DAO was a decentralized venture capital fund that raised $150M in ETH. A vulnerability in its code allowed an attacker to recursively call the withdraw function, draining funds before the balance was updated. This led to one of crypto's most controversial decisions.`,
    tags: ['security', 'social'],
    sourceUrl: 'https://blog.ethereum.org/2016/06/17/critical-update-re-dao-vulnerability',
    links: [
      { label: 'Ethereum Foundation Statement', url: 'https://blog.ethereum.org/2016/06/17/critical-update-re-dao-vulnerability' },
      { label: 'Community Discussion (archive)', url: 'https://web.archive.org/web/20160618140914/https://www.reddit.com/r/ethereum/comments/4oi2ta/i_think_thedao_is_getting_drained_right_now/' },
      { label: 'Technical Postmortem', url: 'https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/' },
    ],
  },
  {
    id: 'dao-fork',
    type: 'hard_fork',
    date: '2016-07-20',
    blockNumber: 1920000,
    title: 'DAO Fork',
    summary: 'Controversial hard fork to recover DAO funds. Led to Ethereum Classic split.',
    era: 'homestead',
    importance: 'major',
    relatedEips: [779],
    content: `The Ethereum community voted to hard fork and return the stolen DAO funds. This was controversial as it violated "code is law" principles. Those who disagreed continued the original chain as Ethereum Classic (ETC).`,
    tags: ['protocol', 'security', 'social'],
    links: [
      { label: 'EIP-779: DAO Fork Spec', url: 'https://eips.ethereum.org/EIPS/eip-779' },
      { label: 'Hard Fork Block', url: 'https://etherscan.io/block/1920000' },
      { label: 'Carbonvote Results', url: 'https://web.archive.org/web/20160715215142/http://carbonvote.com/' },
    ],
  },
  
  // METROPOLIS ERA
  {
    id: 'byzantium',
    type: 'hard_fork',
    date: '2017-10-16',
    blockNumber: 4370000,
    title: 'Byzantium',
    summary: 'First part of Metropolis. Added privacy features, delayed difficulty bomb, reduced block reward.',
    era: 'metropolis',
    importance: 'major',
    relatedEips: [100, 140, 196, 197, 198, 211, 214, 658],
    content: `Byzantium introduced crucial cryptographic primitives for zkSNARKs (EIP-196, EIP-197), laying groundwork for future privacy and scaling solutions. Block rewards were reduced from 5 to 3 ETH.`
  },
  {
    id: 'raiden-network',
    type: 'scaling',
    date: '2017-03-01',
    title: 'Raiden Network Development',
    summary: 'State channels for Ethereum — like Lightning for Bitcoin. Early scaling attempt before rollups.',
    era: 'homestead',
    importance: 'significant',
    content: `Raiden Network was one of the earliest Ethereum scaling attempts, using state channels for off-chain payments. From their 2022 post-mortem: "The demand for a scalable payment solution is way lower than we and the Ethereum community originally anticipated." It got eclipsed by the more general-purpose rollup architecture.`
  },
  {
    id: 'plasma-whitepaper',
    type: 'scaling',
    date: '2017-08-11',
    title: 'Plasma Whitepaper',
    summary: 'Vitalik and Joseph Poon publish Plasma, proposing child chains for scaling.',
    era: 'metropolis',
    importance: 'major',
    content: `Plasma proposed a framework for creating child chains that periodically commit to Ethereum mainnet. While Plasma itself didn't achieve widespread adoption due to data availability challenges, it laid the intellectual groundwork for rollups.`
  },
  {
    id: 'cryptokitties',
    type: 'application',
    date: '2017-11-28',
    title: 'CryptoKitties Congestion',
    summary: 'CryptoKitties game congests the network, highlighting scalability challenges.',
    era: 'metropolis',
    importance: 'significant',
    content: `CryptoKitties, a game for breeding digital cats, became so popular it accounted for 25% of Ethereum traffic. Gas prices spiked and transactions backed up, making clear the urgent need for scaling solutions.`,
    tags: ['nft', 'scaling'],
    links: [
      { label: 'CryptoKitties Site (2017 archive)', url: 'https://web.archive.org/web/20171202052136/https://www.cryptokitties.co/' },
      { label: 'CryptoKitties Current Site', url: 'https://www.cryptokitties.co/' },
      { label: 'BBC News Coverage', url: 'https://www.bbc.com/news/technology-42237162' },
      { label: 'Congestion Analysis (archive)', url: 'https://web.archive.org/web/20171204144857/https://ethgasstation.info/' },
    ],
  },
  {
    id: 'makerdao-launch',
    type: 'application',
    date: '2017-12-18',
    title: 'MakerDAO & DAI Launch',
    summary: 'First decentralized stablecoin launches. DAI maintains $1 peg through over-collateralization.',
    era: 'metropolis',
    importance: 'major',
    content: `MakerDAO launched DAI, a decentralized stablecoin backed by ETH collateral. Users could lock ETH in Collateralized Debt Positions (CDPs) to mint DAI. This was DeFi's first major primitive and proved smart contracts could create stable value.`,
    tags: ['defi'],
    links: [
      { label: 'MakerDAO Site (2017 archive)', url: 'https://web.archive.org/web/20171220161929/https://makerdao.com/' },
      { label: 'MakerDAO Current Site', url: 'https://makerdao.com/' },
      { label: 'DAI Whitepaper', url: 'https://makerdao.com/en/whitepaper/' },
      { label: 'Launch Announcement (Reddit)', url: 'https://www.reddit.com/r/MakerDAO/comments/7lhqwe/dai_is_now_live/' },
    ],
  },
  {
    id: 'constantinople',
    type: 'hard_fork',
    date: '2019-02-28',
    blockNumber: 7280000,
    title: 'Constantinople/St. Petersburg',
    summary: 'Second part of Metropolis. Cheaper gas for certain operations, delayed difficulty bomb again.',
    era: 'metropolis',
    importance: 'major',
    relatedEips: [145, 1014, 1052, 1234, 1283],
    content: `Constantinople was delayed after a reentrancy vulnerability was found in EIP-1283. It launched with St. Petersburg, which removed the problematic EIP. Block rewards reduced to 2 ETH.`
  },
  
  {
    id: 'uniswap-v1',
    type: 'application',
    date: '2018-11-02',
    title: 'Uniswap V1 Launch',
    summary: 'Hayden Adams launches Uniswap, the first automated market maker (AMM) DEX on Ethereum.',
    era: 'metropolis',
    importance: 'major',
    content: `Uniswap introduced the x*y=k constant product formula, enabling trustless token swaps without order books. Anyone could provide liquidity and earn fees. This simple design would spark DeFi Summer and inspire countless forks.`,
    tags: ['defi'],
    links: [
      { label: 'Hayden Adams Announcement', url: 'https://twitter.com/haaborlmyHadams/status/1058376395108376577' },
      { label: 'Uniswap V1 Docs (archive)', url: 'https://web.archive.org/web/20181207013118/https://docs.uniswap.io/' },
      { label: 'Uniswap Current Site', url: 'https://uniswap.org/' },
      { label: 'Original Reddit Post', url: 'https://www.reddit.com/r/ethereum/comments/9udkhy/uniswap_a_unique_exchange/' },
    ],
  },
  
  // ISTANBUL ERA
  {
    id: 'istanbul-fork',
    type: 'hard_fork',
    date: '2019-12-08',
    blockNumber: 9069000,
    title: 'Istanbul',
    summary: 'Gas cost adjustments for certain opcodes, improved SNARK efficiency, enabled layer 2 solutions.',
    era: 'istanbul',
    importance: 'major',
    relatedEips: [152, 1108, 1344, 1884, 2028, 2200],
    content: `Istanbul focused on interoperability with Zcash, cheaper precompiles for SNARKs, and more accurate gas costs for storage-heavy operations.`
  },
  {
    id: 'rollup-research',
    type: 'scaling',
    date: '2019-08-29',
    title: 'Rollups Emerge',
    summary: "Vitalik publishes 'An Incomplete Guide to Rollups', establishing them as the primary L2 strategy.",
    era: 'istanbul',
    importance: 'major',
    content: `Rollups execute transactions off-chain but post data on-chain, inheriting Ethereum's security. Two types emerged: Optimistic (assume valid, fraud proofs) and ZK (validity proofs). This marked the shift to a "rollup-centric roadmap."`
  },
  {
    id: 'muir-glacier',
    type: 'hard_fork',
    date: '2020-01-02',
    blockNumber: 9200000,
    title: 'Muir Glacier',
    summary: 'Emergency fork to delay the difficulty bomb by 4 million blocks.',
    era: 'istanbul',
    importance: 'minor',
    relatedEips: [2384],
  },
  
  // BEACON CHAIN ERA
  {
    id: 'uniswap-v2',
    type: 'application',
    date: '2020-05-18',
    title: 'Uniswap V2 Launch',
    summary: 'V2 adds ERC-20/ERC-20 pairs, flash swaps, and price oracles.',
    era: 'beacon',
    importance: 'significant',
    content: `Uniswap V2 enabled direct token-to-token swaps (no ETH intermediary), flash swaps for arbitrage, and time-weighted average price (TWAP) oracles. These features made Uniswap a foundational DeFi primitive.`
  },
  {
    id: 'compound-governance',
    type: 'application',
    date: '2020-06-15',
    title: 'Compound COMP Token & DeFi Summer',
    summary: 'Compound distributes COMP tokens, igniting "DeFi Summer" and yield farming mania.',
    era: 'beacon',
    importance: 'major',
    content: `Compound's COMP token distribution created a new paradigm: "liquidity mining." Users earned governance tokens for providing liquidity. This sparked DeFi Summer 2020, with total value locked (TVL) exploding from $1B to $10B+ in months.`,
    tags: ['defi'],
    links: [
      { label: 'COMP Distribution Announcement', url: 'https://medium.com/compound-finance/expanding-compound-governance-ce13fcd4fe36' },
      { label: 'Compound Site', url: 'https://compound.finance/' },
      { label: 'DeFi Summer Coverage (Coindesk)', url: 'https://www.coindesk.com/markets/2020/10/14/the-defi-summer-of-2020-and-what-it-means-for-ethereum/' },
    ],
  },
  {
    id: 'yearn-launch',
    type: 'application',
    date: '2020-07-17',
    title: 'Yearn Finance & YFI',
    summary: 'Andre Cronje launches Yearn, with "fair launch" of YFI token — no premine, no VCs.',
    era: 'beacon',
    importance: 'significant',
    content: `Yearn automated yield optimization strategies. Its YFI token launch with zero premine, no founder allocation, and pure community distribution became legendary. YFI went from $0 to $40,000 in weeks.`
  },
  {
    id: 'beacon-launch',
    type: 'milestone',
    date: '2020-12-01',
    title: 'Beacon Chain Launch',
    summary: 'Ethereum 2.0 Phase 0 launches. Proof of Stake begins on a parallel chain.',
    era: 'beacon',
    importance: 'major',
    content: `The Beacon Chain launched with 21,063 validators staking 674,000 ETH. This separate chain would run PoS consensus in parallel with mainnet PoW until The Merge.`
  },
  {
    id: 'berlin',
    type: 'hard_fork',
    date: '2021-04-15',
    blockNumber: 12244000,
    title: 'Berlin',
    summary: 'Gas cost optimizations for certain transactions types.',
    era: 'beacon',
    importance: 'significant',
    relatedEips: [2565, 2718, 2929, 2930],
    content: `Berlin introduced typed transaction envelopes (EIP-2718), which would enable EIP-1559 in London. It also adjusted gas costs for state access operations.`
  },
  {
    id: 'london',
    type: 'hard_fork',
    date: '2021-08-05',
    blockNumber: 12965000,
    title: 'London (EIP-1559)',
    summary: 'Revolutionary fee market change. Base fee burned, making ETH deflationary under high demand.',
    era: 'beacon',
    importance: 'major',
    relatedEips: [1559, 3198, 3529, 3541, 3554],
    content: `EIP-1559 was one of Ethereum's most significant economic changes. Instead of a pure auction, transactions now pay a base fee (burned) plus a priority tip. This made gas prices more predictable and introduced ETH burning.`,
    tags: ['protocol'],
    links: [
      { label: 'EIP-1559 Spec', url: 'https://eips.ethereum.org/EIPS/eip-1559' },
      { label: 'London Block', url: 'https://etherscan.io/block/12965000' },
      { label: 'ultrasound.money (burn tracker)', url: 'https://ultrasound.money/' },
      { label: 'Tim Beiko Announcement', url: 'https://twitter.com/TimBeiko/status/1423307662159888388' },
    ],
  },
  {
    id: 'optimism-launch',
    type: 'scaling',
    date: '2021-01-16',
    blockNumber: 12_686_786,
    title: 'Optimism Mainnet Alpha',
    summary: 'First optimistic rollup launches on mainnet, bringing practical L2 scaling.',
    era: 'beacon',
    importance: 'major',
    content: `Optimism launched the first optimistic rollup on mainnet, demonstrating that rollups could provide 10-100x cost reduction while maintaining Ethereum's security guarantees.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: Optimism', url: 'https://l2beat.com/scaling/projects/optimism' },
      { label: 'Optimism Official', url: 'https://optimism.io/' },
      { label: 'OP Mainnet Explorer', url: 'https://optimistic.etherscan.io/' },
    ],
  },
  {
    id: 'arbitrum-launch',
    type: 'scaling',
    date: '2021-08-31',
    blockNumber: 13_133_428,
    title: 'Arbitrum One Launch',
    summary: 'Arbitrum launches, becoming the largest L2 by TVL.',
    era: 'beacon',
    importance: 'major',
    content: `Arbitrum One launched as an optimistic rollup with a focus on EVM compatibility. It quickly grew to become the largest L2 by total value locked, attracting major DeFi protocols.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: Arbitrum', url: 'https://l2beat.com/scaling/projects/arbitrum' },
      { label: 'Arbitrum Official', url: 'https://arbitrum.io/' },
      { label: 'Arbiscan Explorer', url: 'https://arbiscan.io/' },
    ],
  },
  {
    id: 'arrow-glacier',
    type: 'hard_fork',
    date: '2021-12-09',
    blockNumber: 13773000,
    title: 'Arrow Glacier',
    summary: 'Delayed difficulty bomb to June 2022.',
    era: 'beacon',
    importance: 'minor',
    relatedEips: [4345],
  },
  
  // THE MERGE ERA
  {
    id: 'gray-glacier',
    type: 'hard_fork',
    date: '2022-06-30',
    blockNumber: 15050000,
    title: 'Gray Glacier',
    summary: 'Final difficulty bomb delay before The Merge.',
    era: 'merge',
    importance: 'minor',
    relatedEips: [5133],
  },
  {
    id: 'the-merge',
    type: 'milestone',
    date: '2022-09-15',
    blockNumber: 15537394,
    title: 'The Merge',
    summary: 'Ethereum transitions from Proof of Work to Proof of Stake, reducing energy use by 99.95%.',
    era: 'merge',
    importance: 'major',
    content: `The Merge was Ethereum's most significant upgrade, transitioning from energy-intensive Proof of Work to Proof of Stake. The execution layer (mainnet) merged with the Beacon Chain consensus layer. ETH issuance dropped ~90% and energy consumption dropped 99.95%.`,
    tags: ['protocol'],
    links: [
      { label: 'Last PoW Block', url: 'https://etherscan.io/block/15537393' },
      { label: 'First PoS Block', url: 'https://etherscan.io/block/15537394' },
      { label: 'ethereum.org Merge Page', url: 'https://ethereum.org/en/roadmap/merge/' },
      { label: 'Vitalik\'s Merge Thread', url: 'https://twitter.com/VitalikButerin/status/1570306185391378434' },
    ],
  },
  
  // SHANGHAI ERA
  {
    id: 'shapella',
    type: 'hard_fork',
    date: '2023-04-12',
    blockNumber: 17034870,
    title: 'Shanghai/Capella (Shapella)',
    summary: 'Enables staking withdrawals. Validators can finally exit and withdraw staked ETH.',
    era: 'shanghai',
    importance: 'major',
    relatedEips: [3651, 3855, 3860, 4895],
    content: `Shapella finally enabled staking withdrawals, completing the PoS transition. EIP-4895 allowed validators to withdraw their staked ETH and rewards. Contrary to fears, this didn't cause a mass exodus.`,
    tags: ['protocol'],
    links: [
      { label: 'Forkcast: Shanghai', url: 'https://forkcast.org/' },
      { label: 'Etherscan Block', url: 'https://etherscan.io/block/17034870' },
      { label: 'ethereum.org Withdrawals', url: 'https://ethereum.org/en/staking/withdrawals/' },
    ],
  },
  
  {
    id: 'base-launch',
    type: 'scaling',
    date: '2023-08-09',
    blockNumber: 17_880_000,
    title: 'Base Mainnet Launch',
    summary: 'Coinbase launches Base, an OP Stack L2, bringing crypto mainstream exposure.',
    era: 'shanghai',
    importance: 'major',
    content: `Base, built on Optimism's OP Stack, marked a major exchange entering L2s. As Coinbase's onchain platform, it brought mainstream exposure and signaled institutional acceptance of Ethereum's rollup-centric future.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: Base', url: 'https://l2beat.com/scaling/projects/base' },
      { label: 'Base Official', url: 'https://base.org/' },
      { label: 'BaseScan Explorer', url: 'https://basescan.org/' },
    ],
  },
  {
    id: 'zksync-era',
    type: 'scaling',
    date: '2023-03-24',
    blockNumber: 16_890_000,
    title: 'zkSync Era Launch',
    summary: 'First zkEVM mainnet, bringing validity proofs to EVM compatibility.',
    era: 'shanghai',
    importance: 'major',
    content: `zkSync Era launched the first zkEVM — a ZK rollup with full EVM compatibility. Unlike optimistic rollups, ZK rollups provide instant finality through validity proofs. This was a major milestone for ZK technology.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: zkSync Era', url: 'https://l2beat.com/scaling/projects/zksync-era' },
      { label: 'zkSync Official', url: 'https://zksync.io/' },
      { label: 'zkSync Explorer', url: 'https://explorer.zksync.io/' },
    ],
  },
  {
    id: 'linea-launch',
    type: 'scaling',
    date: '2023-07-18',
    blockNumber: 17_720_000,
    title: 'Linea Mainnet Launch',
    summary: 'ConsenSys launches Linea, a zkEVM rollup with focus on developer experience.',
    era: 'shanghai',
    importance: 'significant',
    content: `Linea, developed by ConsenSys, launched as a Type 2 zkEVM rollup. It emphasized developer experience and seamless migration from Ethereum mainnet, leveraging ConsenSys's existing tooling ecosystem including MetaMask and Infura integrations.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: Linea', url: 'https://l2beat.com/scaling/projects/linea' },
      { label: 'Linea Official', url: 'https://linea.build/' },
      { label: 'Linea Explorer', url: 'https://lineascan.build/' },
    ],
  },
  {
    id: 'scroll-launch',
    type: 'scaling',
    date: '2023-10-17',
    blockNumber: 18_400_000,
    title: 'Scroll Mainnet Launch',
    summary: 'Scroll launches its zkEVM, focused on bytecode-level EVM equivalence.',
    era: 'shanghai',
    importance: 'significant',
    content: `Scroll launched as a zkEVM rollup with a focus on bytecode-level EVM equivalence, meaning existing Ethereum contracts can deploy without any modifications. This approach prioritized maximum compatibility over performance optimizations.`,
    tags: ['scaling'],
    links: [
      { label: 'L2Beat: Scroll', url: 'https://l2beat.com/scaling/projects/scroll' },
      { label: 'Scroll Official', url: 'https://scroll.io/' },
      { label: 'Scroll Explorer', url: 'https://scrollscan.com/' },
    ],
  },
  
  // CANCUN-DENEB ERA
  {
    id: 'dencun',
    type: 'hard_fork',
    date: '2024-03-13',
    blockNumber: 19426587,
    title: 'Cancun-Deneb (Dencun)',
    summary: 'Proto-Danksharding (EIP-4844) introduces blob transactions, reducing L2 costs by 10-100x.',
    era: 'cancun',
    importance: 'major',
    relatedEips: [4844, 1153, 4788, 5656, 6780, 7044, 7045, 7514, 7516],
    content: `EIP-4844 (Proto-Danksharding) introduced "blob" transactions—a new way for L2s to post data to Ethereum at dramatically lower cost. L2 transaction fees dropped from dollars to cents. This was the first step toward full Danksharding.`,
    tags: ['protocol', 'scaling'],
    links: [
      { label: 'Forkcast: Dencun', url: 'https://forkcast.org/' },
      { label: 'EIP-4844 Spec', url: 'https://eips.ethereum.org/EIPS/eip-4844' },
      { label: 'Etherscan Block', url: 'https://etherscan.io/block/19426587' },
      { label: 'Blob Explorer', url: 'https://blobscan.com/' },
    ],
  },
  
  // ============= APPLICATION MILESTONES =============
  
  {
    id: 'ens-launch',
    type: 'application',
    date: '2017-05-04',
    blockNumber: 3648571,
    title: 'ENS Launch',
    summary: 'Ethereum Name Service launches, bringing human-readable names to Ethereum addresses.',
    era: 'metropolis',
    importance: 'major',
    content: `ENS (Ethereum Name Service) allowed users to register .eth domains that resolve to Ethereum addresses. Instead of 0x123...abc, you could use vitalik.eth. This became the identity layer for Ethereum — the first step toward web3 identity.`,
    tags: ['defi', 'social'],
  },
  {
    id: 'aave-launch',
    type: 'application',
    date: '2020-01-08',
    title: 'Aave V1 Launch',
    summary: 'Aave launches with flash loans — uncollateralized loans that must be repaid in one transaction.',
    era: 'istanbul',
    importance: 'major',
    content: `Aave introduced flash loans — a DeFi primitive that seemed impossible. Borrow any amount with zero collateral, as long as you repay within the same transaction. This enabled complex arbitrage, liquidations, and composable DeFi strategies.`,
    tags: ['defi'],
  },
  {
    id: 'nft-summer',
    type: 'application',
    date: '2021-03-11',
    title: 'Beeple NFT Sells for $69M',
    summary: "Beeple's 'Everydays' sells at Christie's for $69M, igniting the NFT boom.",
    era: 'beacon',
    importance: 'major',
    content: `Digital artist Beeple sold an NFT at Christie's auction house for $69.3 million — the third-highest price for a living artist. This mainstream moment brought NFTs into cultural consciousness and sparked a speculative frenzy.`,
    tags: ['nft', 'social'],
    links: [
      { label: "Christie's Auction Page", url: 'https://onlineonly.christies.com/s/beeple-first-5000-days/beeple-b-1981-1/112924' },
      { label: 'NYT Coverage', url: 'https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html' },
      { label: "Beeple's Site", url: 'https://www.beeple-crap.com/' },
      { label: 'The Artwork (IPFS)', url: 'https://ipfsgateway.makersplace.com/ipfs/QmXkxpwAHCtDXbbZHUwqtFucG1RMS6T87vi1CdvadfL7qA' },
    ],
  },
  {
    id: 'opensea-peak',
    type: 'application',
    date: '2022-01-01',
    title: 'OpenSea Hits $5B Monthly Volume',
    summary: 'NFT marketplace OpenSea reaches peak trading volume during the NFT boom.',
    era: 'beacon',
    importance: 'significant',
    content: `OpenSea, the dominant NFT marketplace, hit $5 billion in monthly trading volume. Bored Apes, CryptoPunks, and countless PFP projects traded hands. The NFT market would later cool significantly, but this peak showed the cultural moment Ethereum enabled.`,
    tags: ['nft'],
  },
  {
    id: 'uniswap-v3',
    type: 'application',
    date: '2021-05-05',
    title: 'Uniswap V3 Launch',
    summary: 'Concentrated liquidity revolutionizes AMM capital efficiency.',
    era: 'beacon',
    importance: 'major',
    content: `Uniswap V3 introduced concentrated liquidity — LPs could provide liquidity in specific price ranges, dramatically improving capital efficiency. This made Uniswap competitive with centralized exchange spreads for major pairs.`,
    tags: ['defi'],
  },
  {
    id: 'dao-hack-anniversary',
    type: 'milestone',
    date: '2021-06-17',
    title: 'DAO Hack 5-Year Anniversary',
    summary: 'Ethereum community reflects on the DAO fork decision and its consequences.',
    era: 'beacon',
    importance: 'minor',
    content: `Five years after the DAO hack, the Ethereum community reflected on the controversial fork. The decision to roll back state to return funds shaped Ethereum's social layer and governance philosophy. "Code is law" vs "the community decides."`,
    tags: ['social', 'security'],
  },
  
  // ============= SECURITY INCIDENTS =============
  
  {
    id: 'parity-wallet-hack',
    type: 'controversy',
    date: '2017-11-06',
    title: 'Parity Wallet Freeze',
    summary: 'A user accidentally "kills" the Parity multisig library, freezing $150M in ETH forever.',
    era: 'metropolis',
    importance: 'major',
    content: `A developer accidentally called a function that made the Parity multisig wallet library self-destruct, permanently freezing ~$150M worth of ETH. The community debated whether to hard fork to recover funds (they didn't). The incident highlighted smart contract risks.`,
    tags: ['security'],
  },
  
  // ============= RESEARCH & SOCIAL =============
  
  {
    id: 'rollup-centric-roadmap',
    type: 'research',
    date: '2020-10-02',
    title: 'Rollup-Centric Roadmap Announced',
    summary: 'Vitalik announces Ethereum is pivoting to a rollup-centric future for scaling.',
    era: 'beacon',
    importance: 'major',
    content: `In a pivotal blog post, Vitalik announced that Ethereum's scaling strategy would center on rollups rather than L1 sharding. "The Ethereum ecosystem is likely to be all-in on rollups as a scaling strategy for the near and mid-term future." This reshaped the entire roadmap.`,
    tags: ['research', 'scaling', 'social'],
    sourceUrl: 'https://vitalik.eth.limo/general/2020/10/02/scaling.html',
  },
  
  // ============= DEVCON EVENTS =============
  
  {
    id: 'devcon-0',
    type: 'milestone',
    date: '2014-11-24',
    title: 'DevCon 0 (Berlin)',
    summary: 'The first Ethereum developer conference, held before mainnet launch.',
    era: 'frontier',
    importance: 'significant',
    content: `DevCon 0 gathered early Ethereum developers in Berlin before mainnet even launched. This intimate gathering set the tone for Ethereum's developer-first culture.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=0' },
    ],
  },
  {
    id: 'devcon-1',
    type: 'milestone',
    date: '2015-11-09',
    title: 'DevCon 1 (London)',
    summary: 'First post-launch DevCon. Community celebrates successful mainnet.',
    era: 'frontier',
    importance: 'significant',
    content: `Held just months after Frontier launch, DevCon 1 in London was a celebration and planning session for Ethereum's future.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=1' },
    ],
  },
  {
    id: 'devcon-2',
    type: 'milestone',
    date: '2016-09-19',
    title: 'DevCon 2 (Shanghai)',
    summary: 'Post-DAO fork DevCon. Community rebuilds after the crisis.',
    era: 'homestead',
    importance: 'significant',
    content: `DevCon 2 in Shanghai was held months after the DAO fork controversy. The community came together to chart Ethereum's path forward, focusing on scalability research.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=2' },
    ],
  },
  {
    id: 'devcon-3',
    type: 'milestone',
    date: '2017-11-01',
    title: 'DevCon 3 (Cancún)',
    summary: 'Peak ICO era. Ethereum ecosystem explodes in size and ambition.',
    era: 'metropolis',
    importance: 'significant',
    content: `DevCon 3 coincided with the ICO boom. Thousands attended as Ethereum became the platform for token launches. Vitalik presented early scaling research.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=3' },
    ],
  },
  {
    id: 'devcon-4',
    type: 'milestone',
    date: '2018-10-30',
    title: 'DevCon 4 (Prague)',
    summary: 'Bear market DevCon. Focus shifts to building infrastructure.',
    era: 'metropolis',
    importance: 'significant',
    content: `After the 2018 crypto crash, DevCon 4 in Prague was more subdued but focused. Developers doubled down on infrastructure: ETH 2.0 research, layer 2 solutions, and developer tooling.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=4' },
    ],
  },
  {
    id: 'devcon-5',
    type: 'milestone',
    date: '2019-10-08',
    title: 'DevCon 5 (Osaka)',
    summary: 'DeFi emerges. Uniswap, MakerDAO, and composability take center stage.',
    era: 'istanbul',
    importance: 'significant',
    content: `DevCon 5 in Osaka showcased the emerging DeFi ecosystem. Talks on Uniswap, MakerDAO, and "money legos" composability hinted at the DeFi summer to come.`,
    tags: ['social', 'defi'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=5' },
    ],
  },
  {
    id: 'devcon-6',
    type: 'milestone',
    date: '2022-10-11',
    title: 'DevCon 6 (Bogotá)',
    summary: 'Post-Merge celebration. First DevCon after COVID and the transition to PoS.',
    era: 'merge',
    importance: 'major',
    content: `DevCon 6 in Bogotá was a triumphant return after COVID and The Merge. The community celebrated Ethereum's successful transition to Proof of Stake and looked ahead to scaling with rollups.`,
    tags: ['social'],
    links: [
      { label: 'DevCon Archive', url: 'https://archive.devcon.org/archive/watch?edition=6' },
      { label: 'DevCon 6 Website', url: 'https://devcon.org/en/' },
    ],
  },
  {
    id: 'devcon-7',
    type: 'milestone',
    date: '2024-11-12',
    title: 'DevCon 7 (Bangkok)',
    summary: 'Southeast Asia DevCon. Focus on global adoption and L2 ecosystem.',
    era: 'cancun',
    importance: 'major',
    content: `DevCon 7 brought the Ethereum community to Bangkok, focusing on global adoption, the thriving L2 ecosystem post-Dencun, and Ethereum's role in emerging markets.`,
    tags: ['social'],
    links: [
      { label: 'DevCon 7 Website', url: 'https://devcon.org/' },
    ],
  },
]

export const getNodesByEra = (nodes: TimelineNode[]): Record<Era, TimelineNode[]> => {
  return nodes.reduce((acc, node) => {
    if (!acc[node.era]) acc[node.era] = []
    acc[node.era].push(node)
    return acc
  }, {} as Record<Era, TimelineNode[]>)
}
