# LongPro Content-Depth Priorities

**Date:** 2026-05-01
**Purpose:** Complete Phase 5 task `6.1` by ranking the highest-value content gaps from the current built site, not from the older March audit alone.

## Current Inventory Snapshot

The current built site already covers more of the March audit than the older notes suggest.

- Services live now: `general-pest-control`, `bed-bug-extermination`, `cockroach-extermination`, `ant-and-spider-control`, `flea-extermination`
- Service-area pages live now: Cleveland hub plus city/neighborhood pages for Beachwood, Brooklyn, Cleveland, Euclid, Lakewood, Parma, Strongsville, Old Brooklyn, Shaker Square, Slavic Village, South Hills, and Tremont
- Blog posts live now: 15 posts plus the blog hub, including the May 2026 non-bed-bug support series for German cockroaches, seasonal pest timing, and professional pest control versus DIY

## What Changed Since The March Audit

The following March-audit gaps are no longer missing and should not be treated as equal-priority backlog:

- `bed-bug-treatment-cost-cleveland`
- `do-bed-bugs-come-back-after-treatment`
- `cuyahoga-county-bed-bug-help`
- `pet-safe-pest-control-cleveland`
- `emergency-pest-control-cleveland`
- `bed-bug-inspection-what-to-expect`
- `bed-bug-vs-flea-bites`

This means the content problem has shifted from "publish more blog posts" to "strengthen commercial intent coverage and local landing depth."

## Inventory Signals

Approximate visible word counts from the built HTML:

| Page | Approx. words | Signal |
| --- | ---: | --- |
| `/services/` | 333 | Very thin commercial hub in primary navigation |
| `/service-area/` | 807 | Important local hub, still broad and generic |
| `/services/general-pest-control/` | 1077 | Commercial page, thinner than the core bed bug page |
| `/service-area/cleveland/tremont/` | 477 | Thin neighborhood page |
| `/services/cockroach-extermination/` | 1382 | Reasonable depth, but still behind bed bug positioning |
| `/services/bed-bug-extermination/` | 1804 | Best-developed core service page |
| Blog posts | 1015-1831 | Blog depth is no longer the primary weakness |

## Ranked Content Gaps

### Tier 1 — Highest commercial value

1. **Strengthen the top commercial hub pages already in site navigation**
   - Pages: `/services/`, `/service-area/`, `/services/general-pest-control/`
   - Why first: these pages map to broad buyer-intent searches, shape internal linking, and are currently thinner than the rest of the site.
   - Why now: they can be improved without adding new URL maintenance in a compiled deployment-artifact repo.

2. **Convert commercial blog intent into stronger service intent surfaces**
   - Gaps: no standalone service pages yet for bed bug inspection, emergency pest control, or bed bug heat treatment.
   - Current state: those topics exist only as blog posts or comparison content.
   - Why high value: these are bottom-funnel or near-bottom-funnel topics with clear lead intent.

### Tier 2 — High local-intent value

3. **Fill service-area holes implied by existing hub copy and GBP guidance**
   - Missing examples: `Shaker Heights`, `Mentor`
   - Current issue: `/service-area/` explicitly mentions Mentor and broader suburb coverage, but there are no matching dedicated pages in the built inventory.
   - Why this matters: these pages can capture suburb-specific search intent and align the site with the GBP service-area list.

4. **Deepen the thinnest existing neighborhood/local pages**
   - First targets: `/service-area/cleveland/tremont/`, then `South Hills`
   - Why not first: useful, but narrower commercial upside than the main hubs and primary service pages.

### Tier 3 — Important but not first

5. **Expand non-bed-bug service depth after the hub pass**
   - Next pages: `cockroach-extermination`, `flea-extermination`, `ant-and-spider-control`
   - Reason: these already exist and are usable, but they still trail the bed bug page in authority and supporting detail.

6. **Resume blog expansion only after the service/service-area pass**
   - Completed May 2026 candidates: German cockroach apartment guide, seasonal pest guide, and professional pest control versus DIY comparison.
   - Remaining candidates: landlord/tenant guide and broader heat-treatment explainer.
   - Reason: informational coverage is no longer the clearest blocker to conversion or local intent.

## Recommended First Slice For Task 6.2

**Slice:** strengthen the existing commercial hubs instead of creating a batch of new URLs immediately.

### Pages in scope

- `dist_assets/services/index.html`
- `dist_assets/service-area/index.html`
- `dist_assets/services/general-pest-control/index.html`

### Why this slice wins

- It hits the broadest commercial entry points already exposed in the main nav.
- It improves both user navigation and internal linking before adding more pages.
- It is lower risk in this repo because the site is served from built HTML, not from a maintained source page/component tree.
- It creates better launch pads for a follow-on slice that can add dedicated service pages for inspection, emergency response, or heat treatment.

### Acceptance criteria for the slice

- Add materially stronger local-intent and service-intent copy to the three in-scope pages.
- Add clearer links from hubs into the strongest current service, area, and blog assets.
- Preserve the current CTA hierarchy and proof style established in Phases 2-4.
- Verify the edited pages still have valid canonical/OG/schema blocks and expected internal links.

## Next Slice After That

If the first slice lands cleanly, the next best move is:

1. Create dedicated commercial pages for `bed-bug-inspection`, `emergency-pest-control`, and/or `bed-bug-heat-treatment`
2. Add `Shaker Heights` and `Mentor` service-area pages
3. Revisit the thinner neighborhood pages

## Verification For This Planning Task

Use these checks after implementing the first slice:

```bash
rg -n "<title>|<meta name=\"description\"|<h1|FAQPage|CollectionPage|Service" \
  dist_assets/services/index.html \
  dist_assets/service-area/index.html \
  dist_assets/services/general-pest-control/index.html

node - <<'NODE'
const fs = require('fs');
for (const file of [
  'dist_assets/services/index.html',
  'dist_assets/service-area/index.html',
  'dist_assets/services/general-pest-control/index.html',
]) {
  const html = fs.readFileSync(file, 'utf8');
  const words = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
  console.log(file, words);
}
NODE
```
