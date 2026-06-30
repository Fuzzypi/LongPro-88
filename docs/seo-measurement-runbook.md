# SEO Measurement Runbook

Use this runbook to refresh the LongPro measurement baseline without relying on memory.

## Goal

Capture three things on the same day:

- Search Console search demand
- GA4 on-site engagement and lead actions
- Google Business Profile interaction volume

Save the outputs under `reports/seo/YYYY-MM-DD/`.

## 1. Repo-side proof first

Run these from the repo root:

```bash
./scripts/run-with-node.sh scripts/verify-seo-fixes.mjs
./scripts/run-with-node.sh scripts/verify-conversion-flow.mjs
./scripts/run-with-node.sh scripts/seo-live-audit.mjs
./scripts/run-with-node.sh scripts/monitor-live-signals.mjs
```

Record pass/fail for each. If any fail, fix that before interpreting Google metrics.

## 2. Search Console pull

Property:

- `https://longpropc.com`

Export these views:

1. Performance, last 28 days vs previous 28 days
2. Performance, last 3 months vs previous 3 months
3. Top queries
4. Top pages

Capture:

- clicks
- impressions
- CTR
- average position
- top branded queries
- top non-brand commercial queries
- top pages by clicks

Questions to answer:

- Did impressions rise or fall?
- Did non-brand commercial queries gain clicks?
- Are clicks concentrated on blog posts instead of service pages?

## 3. GA4 pull

Property:

- LongPro Pest Control Company

Window:

- last 90 days

Capture event counts and users for:

- `page_view`
- `session_start`
- `first_visit`
- `user_engagement`
- `scroll`
- `quote_click`
- `phone_click`
- `form_start`
- `contact_submit_success`
- `contact_submit_error`
- `CTM_Activity`

Questions to answer:

- How many users reached the site?
- How many clicked to call?
- How many clicked to request a quote?
- How many started the form?
- How many completed the form?

If `contact_submit_success` is missing, run a live test in GA4 Realtime or DebugView before assuming the event is broken.

## 4. GBP pull

Business:

- LongPro Pest Control LLC

Capture current dashboard performance for:

- calls
- website clicks
- chats
- bookings or other surfaced actions

Also verify:

- company-controlled Google account still has owner access
- primary ownership is not stranded with a third party

## 5. Write the baseline

Create:

- `reports/seo/YYYY-MM-DD/search-console-ga4-gbp-baseline.md`
- `reports/seo/YYYY-MM-DD/search-console-ga4-gbp-baseline.json`

Required sections:

- repo state
- access status
- measurement wiring proof
- Search Console baseline
- GA4 baseline
- GBP baseline
- lead-path diagnosis
- remaining blockers
- next lane

## 6. Diagnose in the right order

Use this order:

1. If repo-side or live-site verification fails, fix the site.
2. If site verification passes but traffic is tiny, treat it as a visibility problem.
3. If traffic exists but `phone_click` and `quote_click` stay tiny, treat it as a CTA/message problem.
4. If form starts exist but form completions do not, run a real submission test and inspect GA4 Realtime or DebugView.

Do not treat “the phone is quiet” as proof of a site outage when the traffic baseline itself is near zero.
