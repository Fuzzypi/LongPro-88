# LongPro Search Console / GA4 / GBP Baseline

Date: 2026-06-22
Verdict: `LONGPRO_MEASUREMENT_BASELINE_PARTIAL_ACCESS`

## Repo State

- Branch: `main`
- Source-of-truth commit reviewed: `55615a815b974ef3e8b0d94a5ff4a4093884994a`
- Preserved unrelated dirty state exists in `.plan/`, citation docs, and untracked content/buildout files. This baseline lane did not modify or normalize that state.

## Access Status

- Direct live connector access to Google Search Console, GA4, and Google Business Profile was not available in this session.
- Baseline evidence came from:
  - the in-repo June 22 marketing pull
  - live production verification scripts run against `https://longpropc.com`
  - setup docs showing GSC verification and GBP ownership state
- This is enough to establish a measurement baseline and prove current site wiring, but not enough to pull fresh query tables or real-time product screenshots from Google properties.

## Measurement Wiring Proof

### Required gate results

- `./scripts/run-with-node.sh scripts/verify-seo-fixes.mjs`
  - passed
- `./scripts/run-with-node.sh scripts/verify-conversion-flow.mjs`
  - passed
- `./scripts/run-with-node.sh scripts/seo-live-audit.mjs`
  - passed

### Live measurement proof

- `./scripts/run-with-node.sh scripts/monitor-live-signals.mjs`
  - passed
- Live homepage ships GA tag `G-Z1EH98YLZ1`.
- Live pages expose `phone_click` and `quote_click` tracking.
- Live contact page exposes `contact_submit_success` tracking code.
- Live `GET /api/contact?status=1` returned `200` with `{"ok":true,"configured":true}`.
- Live SEO audit crawled 91 canonical URLs with 0 blocking failures.

Conclusion: the production site is technically live, indexable, canonicalized, and instrumented for phone, quote, and contact-success events. The remaining business problem is not a broken site shell or dead CTA wiring.

## Search Console Baseline

Source: `longpro-marketing-data-pull-2026-06-22.md`

Comparison window:

- Last 3 months: 2026-03-21 through 2026-06-20
- Previous 3 months: 2025-12-21 through 2026-03-20

Totals:

| Metric | Last 3 months | Previous 3 months |
| --- | ---: | ---: |
| Clicks | 48 | 0 |
| Impressions | 5,020 | 102 |
| CTR | 1.0% | 0.0% |
| Avg position | 18.8 | 13.9 |

Key findings:

- Search visibility exists, but absolute click volume is still very small: 48 organic clicks in 92 days is about 0.5 clicks per day.
- Organic discovery is newly established rather than collapsed. The previous comparison period was nearly zero.
- Branded search drives the only meaningful clicks so far.
- Non-brand commercial queries are visible but not winning traffic yet:
  - `bed bug exterminator cleveland`: 173 impressions, 0 clicks, avg position 18.3
  - `pest control cleveland`: 117 impressions, 0 clicks, avg position 66.0

Top pages by clicks:

- `/`: 11 clicks, 900 impressions
- `/blog/do-bed-bugs-come-back-after-treatment/`: 7 to 9 clicks depending on host/path breakout in the pull
- `https://www.longpropc.com/` still appeared separately in the pull, which indicates Google reporting still carries historical host variation even though live canonical redirects are now clean.

Interpretation:

- The phone is not silent because Search Console traffic vanished. It is silent because search demand reaching the site is still too low to create steady lead volume.

## GA4 Baseline

Source: `longpro-marketing-data-pull-2026-06-22.md`

Window:

- 2026-03-24 through 2026-06-21

Totals:

- 581 users
- 2,155 total events
- About 6.5 users per day

Key events:

| Event | Count | Users |
| --- | ---: | ---: |
| `page_view` | 686 | 568 |
| `session_start` | 596 | 568 |
| `first_visit` | 567 | 567 |
| `scroll` | 123 | 112 |
| `quote_click` | 10 | 7 |
| `form_start` | 9 | 8 |
| `phone_click` | 5 | 4 |
| `CTM_Activity` | 4 | 4 |

Derived lead-rate view:

- `phone_click`: about 1 every 18 days
- `quote_click`: about 1 every 9 days
- `form_start`: about 1 every 10 days

Critical gap:

- `contact_submit_success` does not appear in the pulled GA4 event list.
- This does not look like a dead production endpoint:
  - the live contact endpoint reports configured
  - success tracking code exists in production
  - adjacent engagement events are arriving in GA4
- Most likely explanations, in order:
  - there were zero successful form completions in the measured window
  - very few successes occurred and were lost to client-side GA blocking
  - the June 22 export omitted a low-volume success event outside the top returned list

Interpretation:

- The strongest GA4 signal is not “tracking is broken.”
- The strongest GA4 signal is “there is not enough engaged traffic, and almost nobody is progressing to a completed lead.”

## GBP Baseline

Source: `longpro-marketing-data-pull-2026-06-22.md`

Window:

- 2026-01-01 through 2026-06-30 dashboard period noted in the pull

Interactions:

| Metric | Count |
| --- | ---: |
| Calls | 8 |
| Website clicks | 7 |
| Chat clicks | 1 |
| Bookings | 0 |
| Total interactions | 16 |

Key findings:

- GBP is producing some demand, but at a very low baseline: roughly 1.3 calls per month across the six-month view.
- Bookings are zero.
- Docs and the pull both indicate GBP exists and is claimed, but primary control still sits with a third-party agency account rather than the company-owned Google account.

Interpretation:

- The map/listing channel is not dead, but it is not producing enough visibility or conversion volume to sustain the business.
- Primary-owner control should still be cleaned up because it is an operational risk even if it is not the root cause of low calls.

## Lead-Path Diagnosis

This repo and production baseline point to a volume problem first, not a website breakage problem.

What is proven working:

- canonical host routing
- sitemap and robots exposure
- live page availability
- GA tag delivery
- phone CTA rendering
- quote CTA rendering
- contact endpoint configuration
- contact success event code presence

What the numbers say:

- Organic clicks: 48 in ~3 months
- GA4 users: 581 in ~3 months
- Phone clicks: 5 in ~3 months
- GBP calls: 8 in ~6 months

That volume is fully consistent with “the phone is barely ringing” even when the phone number and CTAs are technically fine.

Most likely current bottleneck order:

1. Too little qualified search visibility for commercial local terms.
2. Too little CTA engagement from the traffic that does arrive.
3. Possible secondary gap between form starts and successful submissions, still unproven without live GA4/Event DebugView access.

## Reports Created

- `reports/seo/2026-06-22/seo-live-audit.md`
- `reports/seo/2026-06-22/seo-live-audit.json`
- `reports/seo/2026-06-22/search-console-ga4-gbp-baseline.md`
- `reports/seo/2026-06-22/search-console-ga4-gbp-baseline.json`
- `docs/seo-measurement-runbook.md`

## Remaining Blockers

- No direct live session access to Search Console, GA4, or GBP in this Codex session.
- Because of that, this baseline cannot yet prove:
  - current query-level winners/losers after 2026-06-22
  - whether `contact_submit_success` fires in GA4 Realtime/DebugView during a live test
  - current GBP discovery/search-category breakdown beyond the June 22 pull

## Next Lane

Highest-leverage next work is measurement access plus one live end-to-end submission test:

1. Open GA4 Realtime or DebugView and trigger:
   - one phone click
   - one quote click
   - one successful contact submission marked clearly as test
2. Pull current Search Console query and page tables for the last 28 days vs previous 28 days.
3. Pull current GBP performance for calls, website clicks, and direction/bookings if present.
4. If `contact_submit_success` still does not appear after a successful test submission, treat that as a measurement bug. Otherwise treat the core problem as traffic and ranking scarcity, not broken conversion plumbing.
