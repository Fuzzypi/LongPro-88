# LongPro Site Improvements Handoff

**Created:** 2026-05-01
**Session scope:** completed Phase 5 content-depth work after the intake-live milestone, the trust/conversion pass, the social-preview pass, and the local-authority reconciliation pass.

## Headline

The current content-depth phase is complete. The first expansion slice strengthened the highest-value existing commercial pages instead of creating a large batch of new URLs in the built-HTML repo.

The current plan tracker is now intended to be complete through Phase 5 once task `6.3` is checked. The strongest remaining opportunities after this handoff are a new commercial service-page cluster and the next service-area expansion layer.

## What Changed In This Phase

### Content prioritization

Added:

- `docs/content-depth-priority-2026-05-01.md`

This doc re-ranked the content backlog against the actual built inventory on 2026-05-01.

Main conclusion:

- blog volume is no longer the main weakness
- the larger gap is thin commercial hub coverage plus missing standalone service-intent pages

### First content-expansion slice

Expanded these pages:

- `dist_assets/services/index.html`
- `dist_assets/service-area/index.html`
- `dist_assets/services/general-pest-control/index.html`

What changed:

- stronger commercial-intent copy on the services hub
- clearer internal routing from the services hub into general pest, bed bug inspection guidance, emergency guidance, and the service-area hub
- stronger local-intent copy and deeper existing-page coverage on the service-area hub
- many more links from the service-area hub to existing city and neighborhood pages already present in the repo
- stronger “when this page is the right fit” framing on the general pest page
- extra links from the general pest page into location pages and high-intent supporting blog guides
- minor schema alignment on the two hub pages so the visible content and JSON-LD are closer to each other

## Verification Evidence

Verification run on 2026-05-01:

- all JSON-LD blocks on the three edited pages parsed successfully
- all expected new internal links and section markers were present
- visible copy depth increased on all three target pages

Approximate visible word-count changes:

| Page | Before | After |
| --- | ---: | ---: |
| `/services/` | 333 | 574 |
| `/service-area/` | 807 | 1015 |
| `/services/general-pest-control/` | 1077 | 1294 |

Verification commands used:

```bash
node - <<'NODE'
const fs = require('fs');
const files = [
  'dist_assets/services/index.html',
  'dist_assets/service-area/index.html',
  'dist_assets/services/general-pest-control/index.html',
];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  for (const block of scripts) JSON.parse(block);
  console.log(file, 'jsonld ok', scripts.length);
}
NODE

node - <<'NODE'
const fs = require('fs');
for (const file of [
  'dist_assets/services/index.html',
  'dist_assets/service-area/index.html',
  'dist_assets/services/general-pest-control/index.html',
]) {
  const html = fs.readFileSync(file,'utf8');
  const words = html
    .replace(/<script[\s\S]*?<\/script>/gi,' ')
    .replace(/<style[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&[^;]+;/g,' ')
    .replace(/\s+/g,' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
  console.log(file, words);
}
NODE
```

## Current Best Next Moves

If continuing site work after this handoff, the highest-value backlog is:

1. Create dedicated commercial service pages for:
   - bed bug inspection
   - emergency pest control
   - bed bug heat treatment
2. Add the next service-area layer:
   - Shaker Heights
   - Mentor
3. Deepen the thinner existing local pages:
   - Tremont first
   - then South Hills and the remaining neighborhood set
4. Continue the owner-only local-authority follow-through already documented in:
   - `docs/local-authority-follow-through-2026-05-20.md`

## Current Reality Snapshot

As of 2026-05-01:

- LongPro → PestPro intake is live end-to-end
- trust/conversion upgrades on home/about/contact/reviews are complete
- page-specific social previews for the priority pages are complete
- repo/live preview-image parity was re-established on 2026-05-20 by syncing the deployed `/images/og/*` asset set back into `main`
- local-authority repo-side follow-through is complete and the owner-only tasks are clearly split out
- the content backlog is no longer “write more posts first”; it is “build stronger commercial service and service-area depth from the current inventory outward”
