import { mkdirSync, writeFileSync } from "node:fs";

const SITE = "https://longpropc.com";
const HOST_VARIANTS = [
  "https://longpropc.com/",
  "https://www.longpropc.com/",
  "http://longpropc.com/",
  "http://www.longpropc.com/",
];
const CORE_URLS = [
  `${SITE}/`,
  `${SITE}/contact/`,
  `${SITE}/service-area/`,
  `${SITE}/services/bed-bug-extermination/`,
  `${SITE}/services/cockroach-extermination/`,
  `${SITE}/services/ant-and-spider-control/`,
  `${SITE}/services/flea-extermination/`,
  `${SITE}/services/general-pest-control/`,
];
const TITLE_GATE_URLS = new Set([
  ...CORE_URLS.map(canonicalizeUrl),
  `${SITE}/blog/`,
  `${SITE}/faq/`,
]);
const LEGACY_PHONE_PATTERNS = ["216-294-2843", "(216) 294-2843", "2162942843", "+12162942843"];
const DATE_STAMP = new Date().toISOString().slice(0, 10);
const REPORT_DIR = `reports/seo/${DATE_STAMP}`;
const TITLE_MAX = 65;
const PHONE_HREF = "tel:+12163004121";
const TITLE_BRAND_SUFFIX = " | LongPro Pest Control";
const ASSET_PATH_PREFIXES = ["/_astro/", "/images/", "/fonts/"];
const ASSET_FILE_EXTENSIONS = new Set([
  ".avif",
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".map",
  ".pdf",
  ".png",
  ".svg",
  ".txt",
  ".webp",
  ".woff",
  ".woff2",
  ".xml",
]);

function canonicalizeUrl(value) {
  const url = new URL(value, SITE);
  if (url.origin !== SITE) return url.toString();
  if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.toString();
}

async function fetchText(url, redirect = "manual") {
  const response = await fetch(url, {
    redirect,
    headers: {
      "cache-control": "no-cache",
    },
  });
  return {
    url,
    status: response.status,
    location: response.headers.get("location"),
    contentType: response.headers.get("content-type") || "",
    text: await response.text(),
  };
}

async function traceRedirects(url) {
  const seen = [];
  let current = url;
  for (let step = 0; step < 5; step += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: {
        "cache-control": "no-cache",
      },
    });
    const location = response.headers.get("location");
    seen.push({ url: current, status: response.status, location });
    if (!location || response.status < 300 || response.status >= 400) {
      break;
    }
    current = new URL(location, current).toString();
  }
  return seen;
}

function extractTitle(html) {
  return html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || "";
}

function normalizeTitleText(value) {
  return value.replace(/&amp;|&#38;/g, "&").replace(/\s+/g, " ").trim();
}

function suggestShortTitle(title) {
  let base = normalizeTitleText(title)
    .replace(/\s+\|\s+Pest Control Blog\s+\|\s+LongPro Pest Control$/i, "")
    .replace(/\s+\|\s+LongPro Pest Control$/i, "")
    .replace(/\s+\|\s+LongPro$/i, "")
    .trim();

  const maxBaseLength = TITLE_MAX - TITLE_BRAND_SUFFIX.length;
  if (base.length > maxBaseLength) {
    for (const delimiter of [": ", "? ", " - ", " | "]) {
      const [head] = base.split(delimiter);
      if (head && head.length <= maxBaseLength) {
        base = head.trim();
        break;
      }
    }
  }

  if (base.length > maxBaseLength) {
    const clipped = base.slice(0, maxBaseLength + 1);
    const breakAt = clipped.lastIndexOf(" ");
    base = (breakAt >= Math.floor(maxBaseLength * 0.7) ? clipped.slice(0, breakAt) : clipped.slice(0, maxBaseLength)).trim();
  }

  return `${base}${TITLE_BRAND_SUFFIX}`;
}

function extractMetaDescription(html) {
  return html.match(/<meta\s+name="description"\s+content="(.*?)"/is)?.[1]?.trim() || "";
}

function extractCanonical(html) {
  return html.match(/<link\s+rel="canonical"\s+href="(.*?)"/is)?.[1]?.trim() || "";
}

function extractJsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
}

function extractInternalLinks(html, pageUrl) {
  const found = new Set();
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    const url = new URL(href, pageUrl);
    if (url.origin === SITE) {
      found.add(url.toString());
    }
  }
  return [...found].sort();
}

function isAssetLikeInternalUrl(value) {
  const url = new URL(value, SITE);
  if (url.origin !== SITE) return false;
  if (ASSET_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return true;
  const lastDot = url.pathname.lastIndexOf(".");
  if (lastDot === -1) return false;
  const extension = url.pathname.slice(lastDot).toLowerCase();
  return ASSET_FILE_EXTENSIONS.has(extension);
}

function flattenJsonLdKinds(value) {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLdKinds);
  if (!value || typeof value !== "object") return [];
  const current = [];
  if (value["@type"]) {
    current.push(...(Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]]));
  }
  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      current.push(...flattenJsonLdKinds(nested));
    }
  }
  return current;
}

function hasLegacyPhone(text) {
  return LEGACY_PHONE_PATTERNS.some((pattern) => text.includes(pattern));
}

function writeReports(report) {
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(`${REPORT_DIR}/seo-live-audit.json`, `${JSON.stringify(report, null, 2)}\n`);

  const lines = [
    "# SEO Live Audit",
    "",
    `- Date: ${DATE_STAMP}`,
    `- Site: ${SITE}`,
    `- Crawled URLs: ${report.pages.length}`,
    `- Failures: ${report.summary.failures.length}`,
    "",
    "## Host Redirects",
    "",
    "| URL | Status | Location | Final URL | Hops |",
    "| --- | --- | --- | --- | --- |",
    ...report.hostChecks.map(
      (item) =>
        `| ${item.url} | ${item.firstStatus} | ${item.firstLocation || ""} | ${item.finalUrl} | ${item.hops} |`
    ),
    "",
    "## Summary",
    "",
    ...report.summary.lines.map((line) => `- ${line}`),
    "",
    "## Failures",
    "",
    ...(report.summary.failures.length
      ? report.summary.failures.map((line) => `- ${line}`)
      : ["- None"]),
    "",
  ];

  writeFileSync(`${REPORT_DIR}/seo-live-audit.md`, `${lines.join("\n")}\n`);
}

const hostChecks = [];
for (const url of HOST_VARIANTS) {
  const chain = await traceRedirects(url);
  const first = chain[0];
  const final = chain[chain.length - 1];
  hostChecks.push({
    url,
    firstStatus: first.status,
    firstLocation: first.location,
    finalUrl: final.location ? new URL(final.location, final.url).toString() : final.url,
    hops: Math.max(chain.length - 1, 0),
    chain,
  });
}

const robots = await fetchText(`${SITE}/robots.txt`, "follow");
const sitemap = await fetchText(`${SITE}/sitemap.xml`, "follow");
const sitemapUrls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => canonicalizeUrl(match[1]));
const crawlTargets = [...new Set([...CORE_URLS.map(canonicalizeUrl), ...sitemapUrls])].sort();

const pages = [];
const nonCanonicalInternalLinks = [];
const redirectingInternalLinks = [];
const invalidJsonLdPages = [];
const aggregateRatingPages = [];
const reviewSchemaPages = [];
const legacyPhonePages = [];
const badCanonicalPages = [];
const missingMetaDescriptionPages = [];
const longTitlePages = [];
const duplicateTitleMap = new Map();

for (const url of crawlTargets) {
  const page = await fetchText(url, "manual");
  const title = extractTitle(page.text);
  const metaDescription = extractMetaDescription(page.text);
  const canonical = extractCanonical(page.text);
  const jsonLdBlocks = extractJsonLdBlocks(page.text);
  const internalLinks = extractInternalLinks(page.text, url);
  const nonCanonicalLinksOnPage = [];
  const redirectingLinksOnPage = [];
  const jsonLdKinds = [];
  let invalidJson = false;

  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block);
      jsonLdKinds.push(...flattenJsonLdKinds(parsed));
    } catch {
      invalidJson = true;
    }
  }

  for (const link of internalLinks) {
    if (isAssetLikeInternalUrl(link)) {
      continue;
    }
    const normalized = canonicalizeUrl(link);
    if (
      normalized.startsWith("http://") ||
      normalized.startsWith("https://www.longpropc.com") ||
      normalized !== link
    ) {
      nonCanonicalLinksOnPage.push(link);
      nonCanonicalInternalLinks.push({ page: url, link });
    }
    const response = await fetch(normalized, {
      redirect: "manual",
      headers: {
        "cache-control": "no-cache",
      },
    });
    if (response.status >= 300 && response.status < 400) {
      redirectingLinksOnPage.push({ link: normalized, status: response.status, location: response.headers.get("location") });
      redirectingInternalLinks.push({ page: url, link: normalized, status: response.status, location: response.headers.get("location") });
    }
  }

  if (invalidJson) invalidJsonLdPages.push(url);
  if (jsonLdKinds.includes("AggregateRating")) aggregateRatingPages.push(url);
  if (jsonLdKinds.includes("Review")) reviewSchemaPages.push(url);
  if (hasLegacyPhone(page.text)) legacyPhonePages.push(url);
  if (!canonical || canonical !== canonicalizeUrl(url) || canonical.startsWith("http://") || canonical.includes("www.longpropc.com")) {
    badCanonicalPages.push({ url, canonical });
  }
  if (!metaDescription) missingMetaDescriptionPages.push(url);
  if (title.length > TITLE_MAX) {
    longTitlePages.push({
      url,
      title,
      length: title.length,
      suggestedTitle: suggestShortTitle(title),
    });
  }
  if (title) {
    const existing = duplicateTitleMap.get(title) || [];
    existing.push(url);
    duplicateTitleMap.set(title, existing);
  }

  pages.push({
    url,
    status: page.status,
    canonical,
    title,
    titleLength: title.length,
    metaDescriptionLength: metaDescription.length,
    hasMetaDescription: Boolean(metaDescription),
    invalidJsonLd: invalidJson,
    jsonLdKinds: [...new Set(jsonLdKinds)].sort(),
    legacyPhoneFound: hasLegacyPhone(page.text),
    phoneHrefCount: (page.text.match(new RegExp(PHONE_HREF.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length,
    nonCanonicalInternalLinks: nonCanonicalLinksOnPage,
    redirectingInternalLinks: redirectingLinksOnPage,
  });
}

const duplicateTitles = [...duplicateTitleMap.entries()]
  .filter(([, urls]) => urls.length > 1)
  .map(([title, urls]) => ({ title, urls }));
const blockingLongTitlePages = longTitlePages.filter(({ url }) => TITLE_GATE_URLS.has(url));
const warningLongTitlePages = longTitlePages.filter(({ url }) => !TITLE_GATE_URLS.has(url));

const summaryFailures = [];

const apex = hostChecks.find((item) => item.url === "https://longpropc.com/");
if (!apex || apex.firstStatus !== 200 || apex.finalUrl !== "https://longpropc.com/") {
  summaryFailures.push("Apex https host did not return a clean 200.");
}
if (robots.status !== 200) {
  summaryFailures.push(`robots.txt returned ${robots.status}.`);
}
if (sitemap.status !== 200) {
  summaryFailures.push(`sitemap.xml returned ${sitemap.status}.`);
}
for (const url of ["https://www.longpropc.com/", "http://longpropc.com/", "http://www.longpropc.com/"]) {
  const item = hostChecks.find((entry) => entry.url === url);
  if (!item || item.firstStatus < 301 || item.firstStatus > 308 || item.finalUrl !== "https://longpropc.com/") {
    summaryFailures.push(`${url} did not permanently resolve to https://longpropc.com/.`);
  }
  if (item && item.hops > 1) {
    summaryFailures.push(`${url} required ${item.hops} redirect hops.`);
  }
}
if (!robots.text.includes("Sitemap: https://longpropc.com/sitemap.xml")) {
  summaryFailures.push("robots.txt is missing the canonical sitemap declaration.");
}
if (nonCanonicalInternalLinks.length > 0) {
  summaryFailures.push(`Found ${nonCanonicalInternalLinks.length} non-canonical internal links.`);
}
if (redirectingInternalLinks.length > 0) {
  summaryFailures.push(`Found ${redirectingInternalLinks.length} redirecting internal links.`);
}
if (invalidJsonLdPages.length > 0) {
  summaryFailures.push(`Invalid JSON-LD found on ${invalidJsonLdPages.length} pages.`);
}
if (aggregateRatingPages.length > 0) {
  summaryFailures.push(`AggregateRating schema found on ${aggregateRatingPages.length} pages.`);
}
if (reviewSchemaPages.length > 0) {
  summaryFailures.push(`Review schema found on ${reviewSchemaPages.length} pages.`);
}
if (legacyPhonePages.length > 0) {
  summaryFailures.push(`Legacy phone numbers found on ${legacyPhonePages.length} pages.`);
}
if (badCanonicalPages.length > 0) {
  summaryFailures.push(`Canonical tag issues found on ${badCanonicalPages.length} pages.`);
}
if (missingMetaDescriptionPages.length > 0) {
  summaryFailures.push(`Missing meta descriptions on ${missingMetaDescriptionPages.length} pages.`);
}
if (blockingLongTitlePages.length > 0) {
  summaryFailures.push(`Long titles remain on ${blockingLongTitlePages.length} core pages.`);
}

const report = {
  generatedAt: new Date().toISOString(),
  site: SITE,
  hostChecks,
  robots: {
    status: robots.status,
    blocksComponentTest: robots.text.includes("Disallow: /component-test/"),
    sitemapDeclared: robots.text.includes("Sitemap: https://longpropc.com/sitemap.xml"),
  },
  sitemap: {
    status: sitemap.status,
    urlCount: sitemapUrls.length,
    canonicalOnly: sitemapUrls.every((url) => url.startsWith(`${SITE}/`) && !url.includes("www.longpropc.com") && !url.startsWith("http://")),
  },
  pages,
  issues: {
    nonCanonicalInternalLinks,
    redirectingInternalLinks,
    invalidJsonLdPages,
    aggregateRatingPages,
    reviewSchemaPages,
    legacyPhonePages,
    badCanonicalPages,
    missingMetaDescriptionPages,
    longTitlePages,
    blockingLongTitlePages,
    warningLongTitlePages,
    duplicateTitles,
  },
  summary: {
    lines: [
      `robots.txt status ${robots.status}, sitemap status ${sitemap.status}.`,
      `${pages.length} canonical URLs crawled from sitemap/core set.`,
      `${nonCanonicalInternalLinks.length} non-canonical internal links found.`,
      `${redirectingInternalLinks.length} redirecting internal links found.`,
      `${invalidJsonLdPages.length} pages with invalid JSON-LD.`,
      `${aggregateRatingPages.length} pages with AggregateRating schema.`,
      `${reviewSchemaPages.length} pages with Review schema.`,
      `${legacyPhonePages.length} pages with legacy phone matches.`,
      `${badCanonicalPages.length} pages with canonical tag issues.`,
      `${blockingLongTitlePages.length} core pages with blocking long titles.`,
      `${warningLongTitlePages.length} long-tail pages with title cleanup backlog.`,
    ],
    failures: summaryFailures,
  },
};

writeReports(report);

console.log(JSON.stringify(report.summary, null, 2));

if (summaryFailures.length > 0) {
  process.exitCode = 1;
}
