/**
 * Fetch and parse EIPs from the ethereum/EIPs GitHub repo
 * 
 * Usage: npx ts-node fetch-eips.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const GITHUB_API = 'https://api.github.com';
const REPO = 'ethereum/EIPs';
const EIPS_PATH = 'EIPS';

interface EIPFrontmatter {
  eip: number;
  title: string;
  description?: string;
  author: string;
  status: string;
  type: string;
  category?: string;
  created: string;
  requires?: string;
}

interface ParsedEIP {
  number: number;
  title: string;
  description: string;
  authors: string[];
  status: string;
  type: string;
  category?: string;
  created: string;
  requires?: number[];
  rawContent?: string;
}

/**
 * Parse YAML-ish frontmatter from EIP markdown
 */
function parseFrontmatter(content: string): EIPFrontmatter | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const result: Record<string, string> = {};
  
  for (const line of yaml.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      result[key] = value;
    }
  }
  
  return {
    eip: parseInt(result.eip, 10),
    title: result.title?.replace(/^["']|["']$/g, '') || '',
    description: result.description?.replace(/^["']|["']$/g, ''),
    author: result.author || '',
    status: result.status || '',
    type: result.type || '',
    category: result.category,
    created: result.created || '',
    requires: result.requires,
  };
}

/**
 * Parse author string into array
 */
function parseAuthors(authorStr: string): string[] {
  // Authors are comma-separated, may have emails in angle brackets
  return authorStr
    .split(/,\s*(?=[^<]*(?:<|$))/)
    .map(a => a.trim())
    .filter(a => a.length > 0);
}

/**
 * Parse requires string into array of EIP numbers
 */
function parseRequires(requiresStr: string | undefined): number[] | undefined {
  if (!requiresStr) return undefined;
  
  const nums = requiresStr.match(/\d+/g);
  return nums ? nums.map(n => parseInt(n, 10)) : undefined;
}

/**
 * Fetch list of EIP files from GitHub
 */
async function fetchEIPList(): Promise<string[]> {
  const url = `${GITHUB_API}/repos/${REPO}/contents/${EIPS_PATH}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ethereum-historical-society',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch EIP list: ${response.status}`);
  }
  
  const files = await response.json() as { name: string; download_url: string }[];
  return files
    .filter(f => f.name.startsWith('eip-') && f.name.endsWith('.md'))
    .map(f => f.download_url);
}

/**
 * Fetch and parse a single EIP
 */
async function fetchEIP(url: string): Promise<ParsedEIP | null> {
  const response = await fetch(url);
  if (!response.ok) return null;
  
  const content = await response.text();
  const frontmatter = parseFrontmatter(content);
  if (!frontmatter) return null;
  
  return {
    number: frontmatter.eip,
    title: frontmatter.title,
    description: frontmatter.description || '',
    authors: parseAuthors(frontmatter.author),
    status: frontmatter.status,
    type: frontmatter.type,
    category: frontmatter.category,
    created: frontmatter.created,
    requires: parseRequires(frontmatter.requires),
  };
}

/**
 * Fetch all EIPs (with rate limiting)
 */
async function fetchAllEIPs(limit?: number): Promise<ParsedEIP[]> {
  console.log('Fetching EIP list...');
  const urls = await fetchEIPList();
  console.log(`Found ${urls.length} EIPs`);
  
  const eipsToFetch = limit ? urls.slice(0, limit) : urls;
  const eips: ParsedEIP[] = [];
  
  for (let i = 0; i < eipsToFetch.length; i++) {
    const url = eipsToFetch[i];
    console.log(`Fetching ${i + 1}/${eipsToFetch.length}: ${url.split('/').pop()}`);
    
    try {
      const eip = await fetchEIP(url);
      if (eip) eips.push(eip);
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e);
    }
    
    // Rate limiting: 100ms between requests
    await new Promise(r => setTimeout(r, 100));
  }
  
  return eips;
}

/**
 * Filter to only "important" EIPs (Final status, Core category)
 */
function filterImportantEIPs(eips: ParsedEIP[]): ParsedEIP[] {
  return eips.filter(eip => 
    eip.status === 'Final' && 
    (eip.category === 'Core' || eip.type === 'Standards Track')
  );
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const limit = args[0] ? parseInt(args[0], 10) : undefined;
  
  const eips = await fetchAllEIPs(limit);
  console.log(`\nFetched ${eips.length} EIPs`);
  
  const important = filterImportantEIPs(eips);
  console.log(`${important.length} are Final/Core`);
  
  // Write to data file
  const outputPath = path.join(__dirname, '../data/eips.json');
  fs.writeFileSync(outputPath, JSON.stringify(eips, null, 2));
  console.log(`\nWritten to ${outputPath}`);
}

// Export for use as module
export { fetchAllEIPs, fetchEIP, filterImportantEIPs, ParsedEIP };

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}
