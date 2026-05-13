# LongPro Website World-Class Plan

> Progress: 12/12 tasks complete (100%)
> Version: 1 | Updated: 2026-05-01T00:28:26.728Z

## Startup Recommendation

- Mode: task (fallback)
- Message: All tasks complete. Plan finished.
- Next task: none

## Phase 0: Current Reality


## Phase 1: Reconcile Current Reality

- [x] Reconcile the April 29 backlog and older audits against the current built site so the new plan starts from truth, not stale notes
- [x] Run a real-browser smoke test of /contact/ and the primary phone-first CTA flow now that intake is live

## Phase 2: Trust And Conversion

- [x] Run a focused trust/conversion review on home, about, contact, and reviews using the current built site
- [x] Implement the highest-impact proof and credibility upgrades across home, about, contact, and reviews
- [x] Tighten CTA hierarchy and phone-first conversion paths on the key landing pages without adding filler

## Phase 3: Social Preview And Metadata

- [x] Replace remaining logo-based og:image usage on priority pages with page-specific images and verify matching social metadata/schema
  > Note: Replaced the remaining 10 logo-based social previews on home, about, contact, reviews, services, service-area, South Hills, and three priority blog posts. Generated dedicated 1200x630 share-card assets under public/images/og and dist_assets/images/og, then aligned each page's og:image, twitter:image, and page-level schema image fields to the new asset.
- [x] Re-check edited pages for metadata consistency after the social-preview pass
  > Note: Verification passed after the replacement pass: repo scan found zero remaining logo-based og:image or twitter:image tags in dist_assets, all 10 edited pages point OG and Twitter to the expected new preview asset, and every JSON-LD block on those pages parses successfully.

## Phase 4: Local Authority Follow-Through

- [x] Reconcile citation, Google Business Profile, Yelp, and directory backlog into agent-executable work versus owner-only work
  > Note: Reconciled the local-authority backlog on 2026-05-01 by rerunning the citation scanner, rechecking direct Yahoo Local and Contractors Up pages, and splitting the outstanding work into agent-executable, waiting-on-provider, and owner-only buckets. Yahoo Local is now resolved on the direct page; Contractors Up remains stale and still leaks the Archmere address.
- [x] Execute the repo-side or documentation-side authority follow-up that does not require third-party owner login, and document the exact owner-only next actions
  > Note: Executed the repo-side authority follow-up that does not require owner login: `npm run citations:self-test`, `npm run citations:scan`, refreshed `docs/citation-cleanup-tracker.md`, updated `docs/citation-cleanup-inventory.json`, and added `docs/local-authority-follow-through-2026-05-01.md` as the current Phase 4 handoff. The exact owner-only next actions are now documented for Yelp, Manta, A Greater Town, and Google Business Profile completion.

## Phase 5: Content Depth

- [x] Prioritize the highest-value service, service-area, and blog content gaps based on commercial value and current site inventory
  > Note: Ranked the current content gaps from the built inventory in docs/content-depth-priority-2026-05-01.md. The main commercial gap is no longer blog volume; it is thin high-intent hub coverage plus missing service-intent pages for inspection, emergency response, and heat treatment. The recommended first slice is to expand /services/, /service-area/, and /services/general-pest-control/ before adding a batch of new URLs.
- [x] Implement the first content-expansion slice on the most valuable pages/posts
  > Note: Implemented the first content-expansion slice on the highest-value existing pages instead of adding a large new URL batch. Expanded dist_assets/services/index.html, dist_assets/service-area/index.html, and dist_assets/services/general-pest-control/index.html with stronger commercial copy, clearer internal linking into service/blog/area pages, and minor schema alignment on the two hub pages.
- [x] Re-verify changed pages and write a new handoff that reflects the post-intake, post-reconciliation reality
  > Note: Re-verified the three Phase 5 pages after the content slice with deterministic checks: all JSON-LD blocks parsed, the expected new section markers and internal links were present, and visible copy depth increased on /services/, /service-area/, and /services/general-pest-control/. Added docs/site-improvements-handoff-2026-05-01.md as the current post-intake, post-reconciliation handoff.
