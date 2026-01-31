/**
 * Core data types for Ethereum Historical Society
 */

// Tag categories for filtering
export type EventTag = 
  | 'protocol'   // Hard forks, EIPs, upgrades
  | 'scaling'    // L2s, rollups, Plasma, Raiden
  | 'defi'       // Uniswap, MakerDAO, lending
  | 'nft'        // CryptoKitties, OpenSea, art
  | 'social'     // Tweets, talks, blog posts
  | 'research'   // ethresear.ch, whitepapers
  | 'security'   // Hacks, incidents, lessons
  | 'governance' // DAO, community decisions
  | 'genesis'    // Origin events
  | 'application'; // Major dApp launches

// Source types
export type EventSource = 
  | 'eip'           // Ethereum Improvement Proposal
  | 'hard_fork'     // Protocol upgrade
  | 'blog'          // Vitalik, official blogs
  | 'tweet'         // Social media
  | 'talk'          // Conference presentation
  | 'paper'         // Research paper
  | 'app_launch'    // dApp milestone
  | 'incident'      // Security event
  | 'manual';       // Manually curated

// Timeline event - the core data unit
export interface TimelineEvent {
  id: string;                    // Unique identifier
  title: string;                 // Short title
  description: string;           // Longer description
  
  // Temporal anchoring
  block?: number;                // Ethereum block number (pre-merge)
  slot?: number;                 // Beacon chain slot (post-merge)
  timestamp: string;             // ISO timestamp
  
  // Categorization
  tags: EventTag[];
  source: EventSource;
  
  // Content
  content?: string;              // Full text content (for EIPs, blog posts)
  summary?: string;              // AI-generated or manual summary
  
  // Media
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
  }[];
  
  // Links
  links?: {
    label: string;
    url: string;
  }[];
  
  // Metadata
  authors?: string[];
  importance?: 'low' | 'medium' | 'high' | 'critical';
  
  // Source reference
  sourceUrl?: string;
  sourceId?: string;             // e.g., EIP number, tweet ID
}

// EIP-specific data
export interface EIP {
  number: number;
  title: string;
  description: string;
  authors: string[];
  status: 'Draft' | 'Review' | 'Last Call' | 'Final' | 'Stagnant' | 'Withdrawn' | 'Living';
  type: 'Standards Track' | 'Meta' | 'Informational';
  category?: 'Core' | 'Networking' | 'Interface' | 'ERC';
  created: string;
  requires?: number[];
  
  // Computed
  block?: number;                // Block where it was activated (for Core EIPs)
  hardFork?: string;            // Which hard fork included it
}

// Hard fork data
export interface HardFork {
  name: string;
  block: number | null;
  slot?: number;
  timestamp: string;
  description: string;
  tags: EventTag[];
  isPostMerge?: boolean;
  eips?: number[];               // EIPs included in this fork
}

// Application milestone
export interface AppMilestone {
  name: string;                  // e.g., "Uniswap V1 Launch"
  protocol: string;              // e.g., "Uniswap"
  timestamp: string;
  block?: number;
  description: string;
  tags: EventTag[];
  links?: { label: string; url: string; }[];
}

// Filter state for UI
export interface FilterState {
  tags: EventTag[];              // Which tags to show
  dateRange?: {
    start: string;
    end: string;
  };
  sources?: EventSource[];
  searchQuery?: string;
}

// Preset filter configurations
export interface FilterPreset {
  name: string;
  description: string;
  filter: FilterState;
}

export const DEFAULT_PRESETS: FilterPreset[] = [
  {
    name: 'Protocol Deep Dive',
    description: 'Focus on hard forks and EIPs',
    filter: { tags: ['protocol', 'scaling', 'research'] },
  },
  {
    name: 'DeFi Journey',
    description: 'Follow the evolution of decentralized finance',
    filter: { tags: ['defi', 'application', 'protocol'] },
  },
  {
    name: 'Full Experience',
    description: 'Everything - the complete timeline',
    filter: { tags: ['protocol', 'scaling', 'defi', 'nft', 'social', 'research', 'security', 'governance', 'genesis', 'application'] },
  },
  {
    name: 'Social History',
    description: 'The human side - tweets, talks, community moments',
    filter: { tags: ['social', 'governance'] },
  },
];
