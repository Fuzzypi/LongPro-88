# LongPro Local Authority Follow-Through — 2026-06-30

Created: 2026-06-30

## Purpose

This supersedes `docs/local-authority-follow-through-2026-06-20.md` as the current local-authority handoff. Two things changed since June 20 that make a fresh reconciliation worthwhile:

1. **GBP ownership was recovered today.** Primary Owner access on the Google Business Profile is back from the vendor (Scorpion), per `gbp-setup-checklist-2026-06-30.md`. The June 20 doc treated GBP as blocked; it no longer is.
2. **Several "Cloudflare-blocked" citations turned out to be reachable from this environment via a direct fetch path that isn't subject to the same block as the repo's headless browse tooling.** That closed real evidence gaps that the June 20 doc had to leave open.

This doc reconciles all three named backlogs — **citations**, **Google Business Profile**, **Yelp and the wider directory list** — into one agent-executable-vs-owner-only split.

## What changed today

- Re-ran `npm run citations:self-test` and `npm run citations:scan` (both pass; Yahoo search is still returning `search_error` for every query, so the Yahoo-snippet method remains an unreliable verification channel — same finding as June 20, just reconfirmed).
- Used a direct fetch path (outside the repo's headless-browse sandbox, and not blocked by the Cloudflare/DataDome walls that blocked it on June 20) to recheck every directory in the tracker. This is genuinely new evidence, not a re-read of old notes.
- Updated `docs/citation-cleanup-tracker.md` with the results (see that file's "Known Citation Inventory" table and Submission Log for full detail).

## Citation backlog: fresh status

| Source | June 20 status | June 30 status | What changed |
| --- | --- | --- | --- |
| Contractors Up | Still stale: `(216) 456-5452`, `5202 Archmere Ave` exposed | **Resolved** | Live listing now shows `(216) 300-4121` and just `Cleveland, OH 44144` — no street address. The 2026-06-20 support-form escalation (or provider processing) landed. |
| Yellow Pages | Headless recheck blocked (Cloudflare 403) | **Resolved** | Live listing now shows `(216) 300-4121`, `Cleveland, OH 44109`, no personal email. |
| BBB | Headless recheck blocked (Cloudflare verification wall) | **Resolved**, with 2 new flags | Live profile shows `(216) 300-4121`. New issues found, unrelated to phone cleanup: profile lists "Termite Control"/"Termite Inspections" as categories (LongPro does WDI/VA inspections, not termite treatment), and publicly shows "Mr. Sean A. Long, Owner." Both need an owner BBB-account edit. |
| Manta | Headless recheck blocked (Cloudflare) | Still stale, more detail | Listing is **CLAIMED**, still shows `(216) 456-5452`, and now shows a partial street-name leak (`Oak park ave`, no house number — smaller leak than the previously documented full address, but still not the intended hidden-address posture). Claimed listings can only be edited by the account holder. |
| A Greater Town | Headless recheck blocked (Cloudflare) | Still stale, more detail | Listing now visible: confirms stale `(216) 294-2843` and a "Date of Company Formation: 2012" claim that doesn't match the site's "since 2013" framing. No self-serve edit/claim link was visible on the page itself. |
| Yelp | Owner-only (DataDome block) | Still owner-only | Direct fetch returned nothing usable — same DataDome wall. `https://biz.yelp.com/claim` remains the path. |
| Chamber of Commerce | Headless recheck blocked | Still blocked | Direct fetch also returned nothing — this one is blocked regardless of fetch method, not just repo-side headless browse. |
| AllBiz | Headless recheck blocked | Still blocked | Same as Chamber of Commerce — blocked regardless of method. |
| Yahoo Local | Resolved | Unchanged (still resolved) | Not rechecked again today; June 20 confirmation stands. |

## Google Business Profile: now fully unblocked, fully owner-only

The #1 blocker called out in `longpro-seo-improvement-plan-2026-06-26.md` ("Resolve GBP ownership risk... primary owner is a third-party agency account") is resolved as of today. `gbp-setup-checklist-2026-06-30.md` is the complete backlog: ownership cleanup, core info/hours/categories, services, 20 service areas, business description, photos, posts, Q&A, and the reviews funnel.

Every item on that checklist requires logging into the Google Business Profile console as `longpropc@gmail.com`. There is no GBP API integration in this repo (confirmed: no `mybusiness`/GBP API code anywhere in `scripts/` or `src/`), so none of it can be done from here. This entire backlog is owner-only — it just moved from "blocked on a vendor" to "ready for the owner to execute," which is real progress even though nothing here is agent-executable.

## Reconciled split

### Agent-executable (done today)

| Item | Outcome |
| --- | --- |
| Citation evidence refresh | Re-ran the scanner; Yahoo search-error finding reconfirmed, evidence file is current. |
| Direct-fetch verification sweep | Closed evidence gaps on Contractors Up, Yellow Pages, BBB, Manta, and A Greater Town that repo-side headless browse couldn't see past Cloudflare. 3 of those came back resolved. |
| Tracker and handoff documentation | `docs/citation-cleanup-tracker.md` inventory, status values, and submission log brought current; this doc written. |
| GBP repo-code check | Confirmed there is no agent-executable angle for GBP (no API integration exists) — this determines the split below rather than leaving it ambiguous. |

### Owner-only (the real remaining queue)

In priority order:

1. **Google Business Profile full setup** — `gbp-setup-checklist-2026-06-30.md`, start to finish. Highest leverage of anything on this list; was blocked until today.
2. **Manta correction** — claimed listing, needs the account holder (or Manta support acting on their behalf) to fix `(216) 456-5452` and the residual street-name leak.
3. **A Greater Town correction** — confirm the correction path in a real logged-in browser (none was visible in the fetched page) and fix the stale `(216) 294-2843`.
4. **Yelp claim/verification** — `https://biz.yelp.com/claim`, blocked from any non-browser fetch method tried so far.
5. **BBB profile cleanup (new items)** — remove "Termite Control"/"Termite Inspections" categories and the public owner name, via BBB account login.
6. **Chamber of Commerce and AllBiz** — both fully inaccessible from this environment by any method tried; need a normal logged-in browser to even see current state, let alone correct it.

### Waiting on provider (no action needed right now)

Nothing — the three items that were "waiting" on June 20 (Contractors Up, Yellow Pages, BBB) all came back resolved on recheck, so this bucket is currently empty.

## Repo-side next move

After any owner-side correction goes live (GBP setup, Manta, A Greater Town, Yelp, BBB categories), re-run:

```bash
npm run citations:self-test
npm run citations:scan
```

and update `docs/citation-cleanup-tracker.md` the same way this pass did: exact URL checked, whether it was visible or blocked, whether `(216) 300-4121` is showing, and whether any private address or personal name is still exposed.
