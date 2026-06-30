# LongPro Local Authority Follow-Through

Created: 2026-05-01

## Superseded

For the current state, use `docs/local-authority-follow-through-2026-06-20.md`. This 2026-05-01 note is historical.

## Purpose

This note reconciles the LongPro local-authority backlog into three buckets:

1. agent-executable repo work
2. waiting on third-party processing
3. owner-only / login-required work

It is the current Phase 4 handoff for the LongPro world-class website plan.

## Current reality

- `npm run citations:self-test` passed on 2026-05-01.
- `npm run citations:scan` completed on 2026-05-01 and wrote fresh evidence to `docs/citation-evidence/latest.json`.
- Yahoo search results still surface stale numbers for:
  - BBB
  - Chamber of Commerce
  - AllBiz
  - Yellow Pages
  - Manta
- The direct Yahoo Local page is now corrected and shows `(216) 300-4121`.
- The direct Contractors Up page is still wrong and still leaks `5202 Archmere Ave` plus `(216) 456-5452`.
- Google Business Profile is already claimed and live; Google Search Console is already verified and not the current blocker.
- New directory-citation buildout work for Yelp, Angi, HomeAdvisor, Thumbtack, Nextdoor, Houzz, MapQuest, YellowPages, and OPMA is tracked in `docs/directory-citation-buildout-2026-05-13.md`.
- Browser follow-through on 2026-05-13 verified Yelp and YellowPages with `(216) 300-4121` and no visible street address. The remaining generic directory targets are blocked by SMS verification, required street address, paid lead-network terms, Yext marketing-call consent, or OPMA paid membership requirements.

## Agent-executable now

These are the parts an agent can do from the repo without third-party owner access:

| Work item | Concrete action |
| --- | --- |
| Citation evidence refresh | Run `npm run citations:self-test` and `npm run citations:scan`, then review `docs/citation-evidence/latest.json`. |
| Citation documentation upkeep | Keep `docs/citation-cleanup-tracker.md`, `docs/citation-request-packets.md`, and the machine-readable inventory in sync with current evidence. |
| Public no-login rechecks | Recheck direct pages that are publicly readable, especially Yahoo Local and Contractors Up. |
| Site-side trust wiring after profile verification | If a profile becomes a stable public trust asset worth surfacing, add it to on-site trust copy or `sameAs` after verifying the public URL and state. |

## Waiting on provider processing

These already have correction or removal requests in flight, so the practical next repo action is just re-scanning and documenting:

| Source | Current state | Next repo action |
| --- | --- | --- |
| BBB | Old `(216) 294-2843` still appears in Yahoo result snippets. | Re-scan later and update the tracker if the snippet changes. |
| Chamber of Commerce | Old `(216) 294-2843` still appears in Yahoo result snippets. | Re-scan later and update the tracker if the snippet changes. |
| AllBiz | Old `(216) 456-5452` still appears in Yahoo result snippets. | Re-scan later and update the tracker if the listing disappears or changes. |
| Yellow Pages | Old `(216) 456-5452` still appears in Yahoo result snippets. | Re-scan later and update the tracker if the listing changes. |
| Contractors Up | Still live with old phone and home address despite the prior request. | Recheck again after more provider time, or do one normal-browser retry if the user wants to push it harder. |

## Owner-only / login-required

These are not blocked on repo work. They need the business owner in a real browser or with account access.

| Item | Why owner-only | Exact next action |
| --- | --- | --- |
| Yelp phone fix | Resolved in browser on 2026-05-13; Yelp for Business showed claimed access and public phone `(216) 300-4121`. | Recheck public listing periodically and avoid changing address settings unless a non-home address strategy is approved. |
| Manta cleanup | Direct pages are Cloudflare-blocked in headless browse and likely need claim/support access. | Identify the canonical Manta listing, then correct or remove the stale `(216) 456-5452` and home-address listing. |
| A Greater Town verification | Direct page is blocked in headless browse; public snippets do not currently prove a stale phone. | Open the listing in a normal browser, confirm whether any stale phone or private address is still present, then correct or remove if needed. |
| Google Business Profile completion | The profile is already claimed, but content/photo completion is an owner-dashboard task. | Finish the service-area list, secondary categories, service descriptions, and add fresh photos per `docs/gbp-gsc-setup.md`. |
| New directory citation buildout | Partially executed in Chrome on 2026-05-13. Yelp and YellowPages are verified; other targets require owner decisions or verification paths the agent should not bypass. | Use `docs/directory-citation-buildout-2026-05-13.md` for the current per-directory status. Do not publish or upload a home/street address. |

## Not current blockers

- Google Search Console is already verified and the sitemap is already submitted.
- The site already carries BBB plus Google Business Profile in `sameAs`.
- This phase is about off-site authority follow-through, not another on-site metadata pass.

## Recommended next sequence

1. Owner handles Yelp first because it is a visible public review surface.
2. Owner handles Manta second because it appears to leak both the old number and the home address.
3. Owner verifies A Greater Town in a normal browser and only spends effort there if stale data is still present.
4. Repo side re-runs `npm run citations:scan` after each meaningful owner-side correction or after provider review windows pass.
