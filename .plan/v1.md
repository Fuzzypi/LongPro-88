# LongPro Website World-Class Plan

> Progress: 5/12 tasks complete (42%)
> Purpose: continue LongPro after the completed intake-live milestone and move the site toward a genuinely world-class business website from current reality, not stale backlog notes.
> Next focus: `social preview metadata`
> Why next: the trust/conversion pass is complete. The clearest remaining visible gap is that priority pages still use the site logo as `og:image` instead of page-specific share previews.

## Phase 0: Current Reality

- The April 29, 2026 intake-live milestone is complete.
- This repo is a deployment artifact. `dist_assets/` is the served site, and `src/index.js` is a compiled Astro Worker bundle with hand-edited runtime logic.
- Older backlog items already resolved in the current built site include duplicate-title cleanup and `sameAs` coverage.
- The remaining website-quality gaps are trust/proof density, CTA/conversion polish, page-specific social previews, local-authority follow-through, and content depth.

## Phase 1: Reconcile Current Reality

- [x] Reconcile the April 29 backlog and older audits against the current built site so the new plan starts from truth, not stale notes
  > Note: Reconciled the repo-facing state on 2026-04-30. README now reflects that intake is live and the current phase is the world-class website pass. The April 29 handoff was updated to mark the duplicate-title, sameAs, and Contractors Up backlog items as stale/resolved, and to narrow the remaining concrete metadata gap to 10 pages still using the logo as `og:image`.
- [x] Run a real-browser smoke test of `/contact/` and the primary phone-first CTA flow now that intake is live
  > Note: Verified live `GET /api/contact?status=1` returned `200 {"ok":true,"configured":true}`. Browser-driven test of `https://www.longpropc.com/contact/` submitted a real form successfully, showed the on-page success message `Thank you! We'll contact you within 24 hours.`, logged no console errors, and recorded `POST /api/contact → 200`. Homepage phone CTAs both point to `tel:+12163004121`.

## Phase 2: Trust And Conversion

- [x] Run a focused trust/conversion review on home, about, contact, and reviews using the current built site
  > Note: Reviewed the built `dist_assets` versions of home, about, contact, and reviews on 2026-04-30 and compared the live trust/proof presentation, local identity, CTA placement, and review framing. The main gaps were buried proof, weak local specificity, and inconsistent review-count framing.
- [x] Implement the highest-impact proof and credibility upgrades across home, about, contact, and reviews
  > Note: Implemented a Phase 2 proof pass in `dist_assets/index.html`, `dist_assets/about/index.html`, `dist_assets/contact/index.html`, and `dist_assets/reviews/index.html`. The changes moved review/BBB proof higher, made the Old Brooklyn base explicit, clarified total-versus-written review counts, and added direct proof links before lower-page content.
- [x] Tighten CTA hierarchy and phone-first conversion paths on the key landing pages without adding filler
  > Note: Completed the CTA hierarchy pass on 2026-04-30. Home/about/reviews now keep the phone path visually dominant while reducing online-estimate actions to lighter fallback links, and contact now leads with a dedicated `Fastest path` call block before the proof grid.

## Phase 3: Social Preview And Metadata

- [ ] Replace remaining logo-based `og:image` usage on priority pages with page-specific images and verify matching social metadata/schema
- [ ] Re-check edited pages for metadata consistency after the social-preview pass

## Phase 4: Local Authority Follow-Through

- [ ] Reconcile citation, Google Business Profile, Yelp, and directory backlog into agent-executable work versus owner-only work
- [ ] Execute the repo-side or documentation-side authority follow-up that does not require third-party owner login, and document the exact owner-only next actions

## Phase 5: Content Depth

- [x] Prioritize the highest-value service, service-area, and blog content gaps based on commercial value and current site inventory
  > Note: Re-ranked the content backlog on 2026-05-01 in `docs/content-depth-priority-2026-05-01.md` against the current built inventory. The main gap is no longer blog volume; it is thin high-intent hub coverage plus missing standalone service-intent pages for inspection, emergency response, and heat treatment.
- [x] Implement the first content-expansion slice on the most valuable pages/posts
  > Note: Expanded `dist_assets/services/index.html`, `dist_assets/service-area/index.html`, and `dist_assets/services/general-pest-control/index.html` with stronger commercial copy, stronger local routing, clearer internal links into existing service/blog/area assets, and minor schema alignment on the two hub pages.
- [x] Re-verify changed pages and write a new handoff that reflects the post-intake, post-reconciliation reality
  > Note: Verification passed on the three edited Phase 5 pages: all JSON-LD blocks parsed, expected new internal links were present, and visible copy depth increased. Added `docs/site-improvements-handoff-2026-05-01.md` as the current post-reconciliation handoff.
