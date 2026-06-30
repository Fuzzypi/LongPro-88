# LongPro Website World-Class Plan

> Progress: 12/12 tasks complete (100%)
> Version: 1 | Updated: 2026-06-30T22:41:31.416Z

## Startup Recommendation

- Mode: task (fallback)
- Message: All tasks complete. Plan finished.
- Next task: none

## Closeout Protocol

- Status: REQUIRED
- Recommendation: Run Plan Closeout Commit & Push Protocol before committing, pushing, merging, tagging, or starting new work.
- Skill: $plan-closeout-commit-push-protocol
- Checklist:
  - closeout_inventory
  - closeout_classify
  - closeout_commit_plan
  - closeout_verify
  - closeout_push
  - closeout_checkpoint
- Signals:
  - all tracked tasks complete (12/12)

## Phase 0: Current Reality


## Phase 1: Reconcile Current Reality

- [x] Reconcile the April 29 backlog and older audits against the current built site so the new plan starts from truth, not stale notes
- [x] Run a real-browser smoke test of /contact/ and the primary phone-first CTA flow now that intake is live

## Phase 2: Trust And Conversion

- [x] Run a focused trust/conversion review on home, about, contact, and reviews using the current built site
  > Note: Audited sitewide: zero pages use the literal logo as og:image (the morning commit 6820b6d already normalized service-area pages from house-keys.webp/detective-hero.webp to og/service-area-preview.png, and blog posts already point to their dedicated preview images). The only gap found was a stale assertion in scripts/verify-seo-fixes.mjs expecting parma to keep house-keys.webp -- updated it to match the deployed, intentional state. Verified: verify-seo-fixes.mjs 0 failures, 0 og/twitter:image mismatches across all index.html files, 0 literal logo og:image usages.
- [x] Implement the highest-impact proof and credibility upgrades across home, about, contact, and reviews
- [x] Tighten CTA hierarchy and phone-first conversion paths on the key landing pages without adding filler

## Phase 3: Social Preview And Metadata

- [x] Replace remaining logo-based og:image usage on priority pages with page-specific images and verify matching social metadata/schema
  > Note: Audited sitewide: zero pages use the literal logo as og:image (this morning's commit 6820b6d already normalized service-area pages from house-keys.webp/detective-hero.webp to og/service-area-preview.png, and all blog posts already point to their own dedicated preview images). The only gap found was a stale assertion in scripts/verify-seo-fixes.mjs expecting parma to keep house-keys.webp -- updated it to match the deployed, intentional state. Verified: verify-seo-fixes.mjs 0 failures, 0 og/twitter:image mismatches across all 94 index.html files, 0 literal logo og:image usages remaining.
- [x] Re-check edited pages for metadata consistency after the social-preview pass

## Phase 4: Local Authority Follow-Through

- [x] Reconcile citation, Google Business Profile, Yelp, and directory backlog into agent-executable work versus owner-only work
  > Note: Reconciled citation + GBP + Yelp/directory backlog into agent-executable vs owner-only. Key findings: (1) GBP ownership recovered today -- gbp-setup-checklist-2026-06-30.md is now unblocked but is 100% owner-only console work (no GBP API integration exists in repo). (2) Direct-fetch rechecks (not subject to the Cloudflare/DataDome blocks that stopped repo-side headless browse) found Contractors Up, Yellow Pages, and BBB phone corrections are now confirmed LIVE -- moved from waiting/blocked to resolved. (3) Manta (claimed listing, stale phone + partial address leak) and A Greater Town (stale phone, no visible self-serve correction path) are still stale and owner-only. (4) Yelp, Chamber of Commerce, AllBiz remain genuinely inaccessible by any fetch method -- confirmed owner-only, not just a repo-side tooling gap. (5) New owner-only flag: BBB profile lists termite-treatment categories LongPro doesn't offer and publicly names the owner. Updated docs/citation-cleanup-tracker.md inventory + submission log and wrote docs/local-authority-follow-through-2026-06-30.md as the current reconciled handoff, superseding the 2026-06-20 version.
- [x] Execute the repo-side or documentation-side authority follow-up that does not require third-party owner login, and document the exact owner-only next actions
  > Note: Executed the repo-side/documentation-side authority follow-up: updated docs/citation-cleanup-tracker.md (Contractors Up, Yellow Pages, BBB phone now confirmed resolved via direct-fetch recheck; Manta and A Greater Town status refined with new detail) and docs/citation-request-packets.md (moved resolved items out of the active queue, wrote ready-to-submit correction packets for Manta and A Greater Town with exact text, added a new BBB packet for the termite-category and owner-name overclaims). Documented the exact owner-only next actions in docs/local-authority-follow-through-2026-06-30.md, priority-ordered: GBP full setup (gbp-setup-checklist-2026-06-30.md), Manta claim correction, A Greater Town correction, Yelp claim, BBB category/name cleanup, Chamber of Commerce + AllBiz (fully inaccessible by any method, need a logged-in browser). No repo-side code change was warranted beyond docs -- confirmed there is no GBP API integration to wire up, and citation corrections are all third-party form/account submissions by nature.

## Phase 5: Content Depth

- [x] Prioritize the highest-value service, service-area, and blog content gaps based on commercial value and current site inventory
- [x] Implement the first content-expansion slice on the most valuable pages/posts
- [x] Re-verify changed pages and write a new handoff that reflects the post-intake, post-reconciliation reality
