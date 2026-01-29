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
    title: 'The DAO Hack',
    summary: '3.6 million ETH (~$50M) drained from The DAO smart contract through a reentrancy vulnerability.',
    era: 'homestead',
    importance: 'major',
    content: `The DAO was a decentralized venture capital fund that raised $150M in ETH. A vulnerability in its code allowed an attacker to recursively call the withdraw function, draining funds before the balance was updated. This led to one of crypto's most controversial decisions.`
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
    content: `The Ethereum community voted to hard fork and return the stolen DAO funds. This was controversial as it violated "code is law" principles. Those who disagreed continued the original chain as Ethereum Classic (ETC).`
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
    id: 'plasma-whitepaper',
    type: 'scaling',
    date: '2017-08-11',
    title: 'Plasma Whitepaper',
    summary: 'Vitalik and Joseph Poon publish Plasma, proposing child chains for scaling.',
    era: 'metropolis',
    importance: 'major',
    content: `Plasma proposed a framework for creating child chains that periodically commit to Ethereum mainnet. While Plasma itself didn't achieve widespread adoption, it laid the intellectual groundwork for rollups.`
  },
  {
    id: 'cryptokitties',
    type: 'milestone',
    date: '2017-11-28',
    title: 'CryptoKitties Congestion',
    summary: 'CryptoKitties game congests the network, highlighting scalability challenges.',
    era: 'metropolis',
    importance: 'significant',
    content: `CryptoKitties, a game for breeding digital cats, became so popular it accounted for 25% of Ethereum traffic. Gas prices spiked and transactions backed up, making clear the urgent need for scaling solutions.`
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
    content: `EIP-1559 was one of Ethereum's most significant economic changes. Instead of a pure auction, transactions now pay a base fee (burned) plus a priority tip. This made gas prices more predictable and introduced ETH burning.`
  },
  {
    id: 'optimism-launch',
    type: 'scaling',
    date: '2021-01-16',
    title: 'Optimism Mainnet Alpha',
    summary: 'First optimistic rollup launches on mainnet, bringing practical L2 scaling.',
    era: 'beacon',
    importance: 'major',
    content: `Optimism launched the first optimistic rollup on mainnet, demonstrating that rollups could provide 10-100x cost reduction while maintaining Ethereum's security guarantees.`
  },
  {
    id: 'arbitrum-launch',
    type: 'scaling',
    date: '2021-08-31',
    title: 'Arbitrum One Launch',
    summary: 'Arbitrum launches, becoming the largest L2 by TVL.',
    era: 'beacon',
    importance: 'major',
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
    content: `The Merge was Ethereum's most significant upgrade, transitioning from energy-intensive Proof of Work to Proof of Stake. The execution layer (mainnet) merged with the Beacon Chain consensus layer. ETH issuance dropped ~90% and energy consumption dropped 99.95%.`
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
    content: `Shapella finally enabled staking withdrawals, completing the PoS transition. EIP-4895 allowed validators to withdraw their staked ETH and rewards. Contrary to fears, this didn't cause a mass exodus.`
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
    content: `EIP-4844 (Proto-Danksharding) introduced "blob" transactions—a new way for L2s to post data to Ethereum at dramatically lower cost. L2 transaction fees dropped from dollars to cents. This was the first step toward full Danksharding.`
  },
]

export const getNodesByEra = (nodes: TimelineNode[]): Record<Era, TimelineNode[]> => {
  return nodes.reduce((acc, node) => {
    if (!acc[node.era]) acc[node.era] = []
    acc[node.era].push(node)
    return acc
  }, {} as Record<Era, TimelineNode[]>)
}
