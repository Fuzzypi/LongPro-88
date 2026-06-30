# LongPro Local Authority Follow-Through

Created: 2026-06-20

## Purpose

This is the current local-authority handoff for the LongPro website plan.

It separates:

1. agent-executable repo work that was completed today
2. public no-login reality that can be verified right now
3. owner-only next actions that are still the highest leverage

## What changed today

- `npm run citations:self-test` passed on 2026-06-20.
- `npm run citations:scan` completed on 2026-06-20 and refreshed `docs/citation-evidence/latest.json`.
- `scripts/scan-citations.mjs` was fixed so Yahoo error pages no longer get treated as clean "no stale number found" results.
- The refreshed evidence shows Yahoo search is currently an unreliable witness for this workflow:
  - every query in `docs/citation-evidence/latest.json` returned `queryStatus: "search_error"`
  - `foundOldNumber` is now `null` when the search page is unusable
  - `matchedSources` stays empty instead of falsely matching domains from the echoed query text

## Current public reality

### Confirmed direct-page truths

| Source | Current reality | Evidence date |
| --- | --- | --- |
| Yahoo Local | Direct listing shows `Phone: (216) 300-4121`, `longpropc.com`, and `Cleveland, OH 44109`. | 2026-06-20 |
| Contractors Up | Direct listing still shows `5202 Archmere Ave`, `Cleveland, OH 44144`, and `(216) 456-5452`. This is still a live privacy leak plus a bad routing number. On 2026-06-20 the strongest confirmed escalation was the sitewide contact form, which returned `Thank you for contacting us!` after a message requesting removal or correction. | 2026-06-20 |

### Headless rechecks blocked today

These are not resolved. They are just not headless-verifiable right now from the repo:

| Source | Current blocker | Practical meaning |
| --- | --- | --- |
| YellowPages | Listing page, contact page, and claim page all returned Cloudflare 403s / `Please enable cookies` | Repo-side headless verification cannot confirm the public listing state today or reach the help surfaces. Use owner browser or prior manual proof. |
| Yelp | Public listing is blocked by DataDome, but `https://business.yelp.com/` and `https://biz.yelp.com/claim` are reachable | Repo-side headless verification still cannot confirm the public listing, but the owner claim flow is at least visible from this environment. |
| Chamber of Commerce | Listing page and dispute request form both returned Cloudflare 403s | Current repo scan cannot see the live listing content or reopen the correction path. |
| BBB | Cloudflare verification page | Current repo scan cannot see the live listing content. |
| AllBiz | Listing, support article, request form, and contact page all returned Cloudflare 403s | Current repo scan cannot see the live listing content or the old support surfaces. |
| Manta | Direct listings, category page, and official Manta contact/claim/help pages are all Cloudflare-blocked from the current environment. | Needs owner or normal-browser follow-up. |
| A Greater Town | Direct listing plus homepage, `/contact`, `/about`, `/privacy`, and `sitemap.xml` all return Cloudflare challenge responses from the current environment. `robots.txt` is the only repo-side URL that stayed reachable. | Needs owner or normal-browser follow-up before any correction effort. |

## Agent-executable work completed

| Work item | Outcome |
| --- | --- |
| Citation scanner reliability | Fixed the false-negative / false-positive case where Yahoo error pages were being treated like usable search results. |
| Citation evidence refresh | Re-ran the scanner and replaced the stale May evidence with a truthful June 20 evidence file. |
| Documentation refresh | Updated the tracker and this handoff so the current backlog reflects real June 20 conditions instead of older assumptions. |

## Highest-leverage owner queue

This is the priority order if the goal is to get public phone routing and trust surfaces cleaned up fastest.

1. Contractors Up: either get the listing removed or replace `(216) 456-5452` and remove `5202 Archmere Ave`. This is the worst live citation still confirmed today.
2. Manta: open the canonical listing in a normal browser or owner session, then correct or remove the stale phone and any private address exposure. Repo-side headless access is blocked not just on the listing but on Manta's official contact and claim/help surfaces too.
3. A Greater Town: open the direct page in a normal browser and confirm whether any stale phone or private address is visible before spending more effort there. Repo-side checks cannot currently reach the listing or the site's core support pages.
4. YellowPages and Yelp: Yellow Pages is a full 403 wall from this environment, but Yelp still exposes `https://biz.yelp.com/claim` and the Yelp for Business portal. Use a normal browser to verify the public listings and finish the owner flow as needed. Treat the 2026-05-13 browser verification as historical, not current proof.
5. Google Business Profile completion: this is not a stale-phone cleanup task, but it is still one of the best local-authority upgrades available once the bad citations above are under control.

## Repo-side next move

After any owner-side correction goes live, re-run:

```bash
npm run citations:self-test
npm run citations:scan
```

Then update `docs/citation-cleanup-tracker.md` with:

- the exact public URL checked
- whether the live page was visible or blocked
- whether the target phone `(216) 300-4121` is visible
- whether any private street address is still exposed

## Contractors Up escalation log

- 2026-06-20 direct page recheck confirmed the live leak is still present.
- 2026-06-20 `Request removal` POST accepted an HTTP 200 response but only echoed the posted fields inside a debug-style `<pre>array(...)` block. No normal confirmation was shown.
- 2026-06-20 `Report incorrect details` POST did the same thing: HTTP 200 plus a raw echoed payload, no normal success state.
- 2026-06-20 sitewide `Contact Us` form at `/app/modals/contact.php` returned a real confirmation:
  - `Thank you for contacting us!`
  - `Your message has been received. We will respond within 1 business day.`
- Practical read: the contact form is now the best confirmed escalation path on this directory until the public page changes or a human reply arrives.
