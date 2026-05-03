#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const DEFAULT_INVENTORY = 'docs/citation-cleanup-inventory.json';
const DEFAULT_OUT = 'docs/citation-evidence/latest.json';
const DEFAULT_ENGINE = 'yahoo';

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

if (args.selfTest) {
  runSelfTest();
  process.exit(0);
}

const inventoryPath = resolve(args.inventory || DEFAULT_INVENTORY);
const inventory = readJson(inventoryPath);
validateInventory(inventory);

const plan = buildScanPlan(inventory, args);

if (args.dryRun) {
  console.log(JSON.stringify({
    mode: 'dry-run',
    engine: args.engine || DEFAULT_ENGINE,
    inventory: inventoryPath,
    output: resolve(args.out || DEFAULT_OUT),
    queries: plan.map(({ id, oldNumberId, query, url }) => ({ id, oldNumberId, query, url }))
  }, null, 2));
  process.exit(0);
}

const evidence = {
  generatedAt: new Date().toISOString(),
  engine: args.engine || DEFAULT_ENGINE,
  inventory: inventoryPath,
  targetNumber: inventory.phoneNumbers.target,
  queries: []
};

for (const queryPlan of plan) {
  const page = args.fixture
    ? readFileSync(resolve(args.fixture), 'utf8')
    : runBrowseText(queryPlan.url);
  const matchedSources = findSourceMatches(page, queryPlan.oldNumber, inventory.sources);
  evidence.queries.push({
    id: queryPlan.id,
    oldNumberId: queryPlan.oldNumberId,
    query: queryPlan.query,
    url: queryPlan.url,
    oldNumber: queryPlan.oldNumber,
    foundOldNumber: matchedSources.length > 0,
    matchedSources,
    textPreview: compactText(page).slice(0, 2000)
  });
}

const outPath = resolve(args.out || DEFAULT_OUT);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Wrote citation evidence to ${outPath}`);

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') parsed.help = true;
    else if (arg === '--dry-run') parsed.dryRun = true;
    else if (arg === '--self-test') parsed.selfTest = true;
    else if (arg === '--inventory') parsed.inventory = argv[++i];
    else if (arg === '--out') parsed.out = argv[++i];
    else if (arg === '--engine') parsed.engine = argv[++i];
    else if (arg === '--fixture') parsed.fixture = argv[++i];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/scan-citations.mjs [options]

Options:
  --dry-run              Print planned searches without browsing.
  --self-test            Run built-in parser checks.
  --inventory <path>     Inventory JSON path. Default: ${DEFAULT_INVENTORY}
  --out <path>           Evidence JSON path. Default: ${DEFAULT_OUT}
  --engine <engine>      Search engine adapter. Current: yahoo. Default: ${DEFAULT_ENGINE}
  --fixture <path>       Parse a saved text fixture instead of browsing.
  --help                 Show this help.

Live scans use the gstack browse CLI, matching the project browsing rule.`);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function validateInventory(inventory) {
  const requiredTop = ['business', 'phoneNumbers', 'sources', 'searchQueries'];
  for (const key of requiredTop) {
    if (!inventory[key]) throw new Error(`Inventory missing ${key}`);
  }
  if (!inventory.phoneNumbers.target?.digits) throw new Error('Inventory missing target digits');
  if (!Array.isArray(inventory.phoneNumbers.old) || inventory.phoneNumbers.old.length === 0) {
    throw new Error('Inventory must include old phone numbers');
  }
  if (!Array.isArray(inventory.sources) || inventory.sources.length === 0) {
    throw new Error('Inventory must include citation sources');
  }
  if (!Array.isArray(inventory.searchQueries) || inventory.searchQueries.length === 0) {
    throw new Error('Inventory must include search queries');
  }
  const oldIds = new Set(inventory.phoneNumbers.old.map((phone) => phone.id));
  for (const query of inventory.searchQueries) {
    if (!oldIds.has(query.oldNumberId)) {
      throw new Error(`Search query ${query.id} references unknown old number ${query.oldNumberId}`);
    }
  }
}

function buildScanPlan(inventory, options) {
  const engine = options.engine || DEFAULT_ENGINE;
  if (engine !== 'yahoo') throw new Error(`Unsupported engine: ${engine}`);

  const oldById = new Map(inventory.phoneNumbers.old.map((phone) => [phone.id, phone]));
  return inventory.searchQueries.map((query) => {
    const oldNumber = oldById.get(query.oldNumberId);
    return {
      ...query,
      oldNumber,
      url: `https://search.yahoo.com/search?p=${encodeURIComponent(query.query)}`
    };
  });
}

function runBrowseText(url) {
  const browse = findBrowseCli();
  const chain = JSON.stringify([
    ['goto', url],
    ['wait', '--load'],
    ['text']
  ]);
  return execFileSync(browse, ['chain'], {
    input: chain,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 10
  });
}

function findBrowseCli() {
  if (process.env.BROWSE_CLI) {
    if (existsSync(process.env.BROWSE_CLI)) return process.env.BROWSE_CLI;
    throw new Error(`BROWSE_CLI env var set to "${process.env.BROWSE_CLI}" but file does not exist`);
  }
  const candidates = [
    resolve('.claude/skills/gstack/browse/dist/browse'),
    `${process.env.HOME}/.claude/skills/gstack/browse/dist/browse`,
    resolve('node_modules/.bin/browse')
  ];
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      'gstack browse CLI not found. Set BROWSE_CLI env var or install to one of:\n' +
      candidates.map((c) => `  - ${c}`).join('\n')
    );
  }
  return found;
}

function findSourceMatches(text, oldNumber, sources) {
  const matches = buildSourceBlocks(text, sources)
    .filter((block) => containsPhone(block.text, oldNumber))
    .map((block) => ({
      sourceId: block.source.id,
      sourceName: block.source.name,
      status: block.source.status,
      requiresOwnerAccess: block.source.requiresOwnerAccess,
      updatePath: block.source.updatePath,
      listingUrl: block.source.listingUrl,
      supportUrls: block.source.supportUrls || [],
      oldNumberFoundOnPage: true,
      evidenceSnippet: compactText(block.text).slice(0, 700)
    }));
  return dedupeMatches(matches);
}

function dedupeMatches(matches) {
  const bySource = new Map();
  for (const match of matches) {
    const existing = bySource.get(match.sourceId);
    if (!existing) {
      bySource.set(match.sourceId, match);
      continue;
    }
    if (!existing.evidenceSnippet.includes(match.evidenceSnippet.slice(0, 80))) {
      existing.evidenceSnippet = `${existing.evidenceSnippet} Additional result: ${match.evidenceSnippet}`.slice(0, 1000);
    }
  }
  return [...bySource.values()];
}

function buildSourceBlocks(text, sources) {
  const compact = compactText(text);
  const starts = sources.flatMap((source) => sourceStartIndexes(compact, source)
    .map((index) => ({ index, source })));

  const ordered = dedupeStarts(starts)
    .sort((left, right) => left.index - right.index);

  return ordered.map((start, index) => {
    const nextKnown = ordered[index + 1]?.index;
    const currentUrl = compact.indexOf('https://', start.index);
    const nextUrl = currentUrl >= 0 ? compact.indexOf('https://', currentUrl + 8) : -1;
    const end = Math.min(
      ...[nextKnown, nextUrl, Math.min(compact.length, start.index + 1200)]
        .filter((candidate) => Number.isInteger(candidate) && candidate > start.index)
    );
    return {
      source: start.source,
      text: trimResultBlock(compact.slice(start.index, end))
    };
  });
}

function sourceStartIndexes(text, source) {
  const normalized = text.toLowerCase();
  const labels = [source.name, ...(source.aliases || [])];
  const labelIndexes = labels.flatMap((label) => [
    ...findAllIndexes(normalized, `${label.toLowerCase()}https://`),
    ...findAllIndexes(normalized, `${label.toLowerCase()} https://`)
  ]);
  if (labelIndexes.length > 0) return labelIndexes;

  return (source.domains || [])
    .flatMap((domain) => findAllIndexes(normalized, domain.toLowerCase()));
}

function dedupeStarts(starts) {
  const deduped = [];
  for (const start of starts.sort((left, right) => left.index - right.index)) {
    const prior = deduped[deduped.length - 1];
    if (prior && prior.source.id === start.source.id && Math.abs(start.index - prior.index) < 120) continue;
    deduped.push(start);
  }
  return deduped;
}

function containsPhone(text, phone) {
  const digits = onlyDigits(text);
  return digits.includes(phone.digits) || text.includes(phone.display) || text.includes(phone.e164);
}

function compactText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function trimResultBlock(text) {
  const cutMarkers = [
    ' Ads related to:',
    ' Searches related to',
    ' Did you mean '
  ];
  const indexes = cutMarkers
    .map((marker) => text.indexOf(marker))
    .filter((index) => index >= 0);
  if (indexes.length === 0) return text;
  return text.slice(0, Math.min(...indexes));
}

function onlyDigits(text) {
  return text.replace(/\D/g, '');
}

function findAllIndexes(text, needle) {
  const indexes = [];
  let start = 0;
  while (start < text.length) {
    const index = text.indexOf(needle, start);
    if (index === -1) break;
    indexes.push(index);
    start = index + needle.length;
  }
  return indexes;
}

function runSelfTest() {
  const fixture = `
    Search Results
    AllBiz https://www.allbiz.com/business/longpro-pest-control-llc
    Longpro Pest Control LLC | (216) 456-5452 | Cleveland - AllBiz
    Yellow Pages https://www.yellowpages.com/cleveland-oh/mip/long-pro-pest-control
    Phone: (216) 456-5452
    Better Business Bureau https://www.bbb.org/us/oh/cleveland/profile/pest-control
    Phone: (216) 294-2843
  `;
  const inventory = readJson(resolve(DEFAULT_INVENTORY));
  validateInventory(inventory);
  const old456 = inventory.phoneNumbers.old.find((phone) => phone.id === 'old-first-business-cell');
  const old294 = inventory.phoneNumbers.old.find((phone) => phone.id === 'old-website-listing');
  const matches456 = findSourceMatches(fixture, old456, inventory.sources);
  const matches294 = findSourceMatches(fixture, old294, inventory.sources);

  assert(containsPhone(fixture, old456), 'expected old 456 number to be detected');
  assert(containsPhone(fixture, old294), 'expected old 294 number to be detected');
  assert(matches456.some((match) => match.sourceId === 'allbiz'), 'expected AllBiz source match');
  assert(matches456.some((match) => match.sourceId === 'yellow-pages'), 'expected Yellow Pages source match');
  assert(matches294.some((match) => match.sourceId === 'bbb'), 'expected BBB source match');

  console.log('citation scanner self-test passed');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
