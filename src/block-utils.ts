/**
 * Ethereum block/timestamp conversion utilities
 * 
 * Pre-Merge: ~13.5s average block time (variable)
 * Post-Merge: 12s fixed slot time
 */

// Known anchor points for interpolation
const ANCHORS = [
  { block: 0, timestamp: new Date('2015-07-30T15:26:13Z').getTime() },
  { block: 1150000, timestamp: new Date('2016-03-14T18:49:53Z').getTime() },   // Homestead
  { block: 4370000, timestamp: new Date('2017-10-16T05:22:11Z').getTime() },   // Byzantium
  { block: 7280000, timestamp: new Date('2019-02-28T19:52:04Z').getTime() },   // Constantinople
  { block: 12965000, timestamp: new Date('2021-08-05T12:33:42Z').getTime() },  // London
  { block: 15537394, timestamp: new Date('2022-09-15T06:42:42Z').getTime() },  // Merge
];

const MERGE_BLOCK = 15537394;
const MERGE_TIMESTAMP = new Date('2022-09-15T06:42:42Z').getTime();
const MERGE_SLOT = 4700013;
const SLOT_TIME_MS = 12000; // 12 seconds post-merge

export interface BlockEstimate {
  block: number;
  slot?: number;
  confidence: 'exact' | 'interpolated' | 'estimated';
  isPostMerge: boolean;
}

export interface TimestampEstimate {
  timestamp: Date;
  confidence: 'exact' | 'interpolated' | 'estimated';
}

/**
 * Estimate block number from a timestamp
 */
export function timestampToBlock(timestamp: Date | number): BlockEstimate {
  const ts = typeof timestamp === 'number' ? timestamp : timestamp.getTime();
  
  // Post-merge: use slot-based calculation
  if (ts >= MERGE_TIMESTAMP) {
    const msSinceMerge = ts - MERGE_TIMESTAMP;
    const slotsSinceMerge = Math.floor(msSinceMerge / SLOT_TIME_MS);
    const slot = MERGE_SLOT + slotsSinceMerge;
    
    return {
      block: MERGE_BLOCK, // Block number stopped incrementing in the same way post-merge
      slot,
      confidence: 'estimated',
      isPostMerge: true,
    };
  }
  
  // Pre-merge: interpolate between anchors
  let lowerAnchor = ANCHORS[0];
  let upperAnchor = ANCHORS[ANCHORS.length - 1];
  
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    if (ts >= ANCHORS[i].timestamp && ts < ANCHORS[i + 1].timestamp) {
      lowerAnchor = ANCHORS[i];
      upperAnchor = ANCHORS[i + 1];
      break;
    }
  }
  
  // Linear interpolation
  const timeRange = upperAnchor.timestamp - lowerAnchor.timestamp;
  const blockRange = upperAnchor.block - lowerAnchor.block;
  const timeSinceLower = ts - lowerAnchor.timestamp;
  const blockEstimate = lowerAnchor.block + Math.floor((timeSinceLower / timeRange) * blockRange);
  
  return {
    block: Math.max(0, blockEstimate),
    confidence: 'interpolated',
    isPostMerge: false,
  };
}

/**
 * Estimate timestamp from a block number
 */
export function blockToTimestamp(block: number): TimestampEstimate {
  // Check if it's an exact anchor
  const exactAnchor = ANCHORS.find(a => a.block === block);
  if (exactAnchor) {
    return {
      timestamp: new Date(exactAnchor.timestamp),
      confidence: 'exact',
    };
  }
  
  // Find surrounding anchors
  let lowerAnchor = ANCHORS[0];
  let upperAnchor = ANCHORS[ANCHORS.length - 1];
  
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    if (block >= ANCHORS[i].block && block < ANCHORS[i + 1].block) {
      lowerAnchor = ANCHORS[i];
      upperAnchor = ANCHORS[i + 1];
      break;
    }
  }
  
  // Linear interpolation
  const blockRange = upperAnchor.block - lowerAnchor.block;
  const timeRange = upperAnchor.timestamp - lowerAnchor.timestamp;
  const blocksSinceLower = block - lowerAnchor.block;
  const timestampEstimate = lowerAnchor.timestamp + (blocksSinceLower / blockRange) * timeRange;
  
  return {
    timestamp: new Date(timestampEstimate),
    confidence: 'interpolated',
  };
}

/**
 * Convert slot to timestamp (post-merge only)
 */
export function slotToTimestamp(slot: number): Date {
  const msSinceMerge = (slot - MERGE_SLOT) * SLOT_TIME_MS;
  return new Date(MERGE_TIMESTAMP + msSinceMerge);
}

/**
 * Convert timestamp to slot (post-merge only)
 */
export function timestampToSlot(timestamp: Date | number): number | null {
  const ts = typeof timestamp === 'number' ? timestamp : timestamp.getTime();
  if (ts < MERGE_TIMESTAMP) return null;
  
  const msSinceMerge = ts - MERGE_TIMESTAMP;
  return MERGE_SLOT + Math.floor(msSinceMerge / SLOT_TIME_MS);
}

/**
 * Format block number for display
 */
export function formatBlock(block: number): string {
  return block.toLocaleString();
}

/**
 * Format slot for display
 */
export function formatSlot(slot: number): string {
  return `slot ${slot.toLocaleString()}`;
}

// Example usage:
// const estimate = timestampToBlock(new Date('2021-06-01'));
// console.log(`Estimated block: ${formatBlock(estimate.block)}`);
