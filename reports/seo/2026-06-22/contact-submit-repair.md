# Contact Submit Repair

- Date: 2026-06-22
- Site: `https://longpropc.com`
- Source repo: `/Users/fuzzypi/Desktop/LongPro-88`
- Starting SHA: `55615a815b974ef3e8b0d94a5ff4a4093884994a`
- Starting live Cloudflare version: `525b9f0b-b909-4b45-a906-7bac54f21380`
- Deployed live Cloudflare version: `a34e7b62-1182-4579-ba20-6834c35551f2`
- Verdict: `LONGPRO_CONTACT_SUBMIT_REPAIR_DEPLOYED`

## Root Cause

The live contact form depended on `POST /api/contact` returning before the browser would show the success state or fire `contact_submit_success`.

In `src/index.js`, the Worker awaited the downstream PestPro lead intake `fetch()` with no timeout. If the downstream intake was slow or hung, the Worker kept the browser request pending indefinitely. That explains the prior marked live proof:

- `contact_submit_attempt` fired
- `callback_form_submit` fired
- the page never reached success UI
- `contact_submit_success` was never proven
- the network request stayed pending

## Fix

Files changed:

- `src/index.js`
- `scripts/verify-contact-submit.mjs`
- `reports/seo/2026-06-22/contact-submit-repair.md`
- `reports/seo/2026-06-22/contact-submit-repair.json`
- `reports/seo/2026-06-22/contact-submit-success-ui-proof.png`

Behavior changed:

- contact lead intake now uses a bounded timeout before the Worker gives up on downstream delivery
- a hung downstream intake now returns deterministic JSON instead of leaving the visitor spinner hanging forever
- timeout responses now come back as `504 {"ok":false,"error":"Lead intake unavailable"}`
- explicit downstream rejections still return deterministic `502` JSON
- success behavior is unchanged when downstream intake responds cleanly

## Verification Proof

Local API proof:

- local success path returned `200 {"ok":true}` in `4ms`
- local hung downstream path returned `504 {"ok":false,"error":"Lead intake unavailable"}` in `911ms`
- local downstream rejection returned `502 {"ok":false,"error":"Lead intake rejected"}`
- local invalid payload returned `400 {"ok":false,"error":"Name and a phone or email are required"}`

Live API proof after deploy:

- `GET /api/contact?status=1` returned `200 {"ok":true,"configured":true}`
- invalid live payload returned `400 {"ok":false,"error":"Name and a phone or email are required"}`
- one marked live production submit returned `200 {"ok":true}` in `480ms`

Frontend success proof:

- a browser proof run on the live contact page stubbed only the final submit response to avoid creating a second real lead
- the page showed `Thank you. We'll call or email you within 24 hours.`
- the contact form display switched to `none`
- the browser captured these analytics events in order:
  - `contact_submit_attempt`
  - `callback_form_submit`
  - `contact_submit_success`
- screenshot saved at `reports/seo/2026-06-22/contact-submit-success-ui-proof.png`

SEO / conversion gates after deploy:

- `./scripts/run-with-node.sh scripts/verify-seo-fixes.mjs` → pass
- `./scripts/run-with-node.sh scripts/verify-conversion-flow.mjs` → pass
- `./scripts/run-with-node.sh scripts/seo-live-audit.mjs` → pass, report refreshed
- `./scripts/run-with-node.sh scripts/verify-contact-submit.mjs --live --submit-live` → pass

## Test Submission

- Exactly one final marked live submission was sent after the fix.
- Marker: `LONGPRO TEST LEAD - IGNORE - contact form proof`
- Response: `200 {"ok":true}`
- Response time: `480ms`
- Event result: browser proof captured `contact_submit_success` on the success path
- Downstream result: live downstream acceptance beyond the Worker response was not directly observable from this session

## Limits

- This session proved the Worker accepted and returned success quickly in production.
- This session proved the live frontend success UI and analytics success event path are wired correctly.
- This session did not directly inspect PestPro, CalenCall, email, or SMS inbox state after the final live submit, so downstream receipt remains unconfirmed from this console.
