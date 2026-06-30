# LongPro Website World-Class Plan

> Progress: 12/12 tasks complete (100%)
> Version: 1 | Updated: 2026-06-30T10:58:02.627Z

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
- [x] Implement the highest-impact proof and credibility upgrades across home, about, contact, and reviews
- [x] Tighten CTA hierarchy and phone-first conversion paths on the key landing pages without adding filler

## Phase 3: Social Preview And Metadata

- [x] Replace remaining logo-based og:image usage on priority pages with page-specific images and verify matching social metadata/schema
  > Note: Resolved Cloudflare deploy auth failure by forcing Wrangler to use local OAuth instead of the DNS-scoped CLOUDFLARE_API_TOKEN, deployed the sitemap fix live, added scripts/monitor-live-signals.mjs plus a scheduled GitHub Actions monitor, and verified the first push-triggered run succeeded.
  > Note: Audited og:image across all 93 built pages: zero remained logo-based (prior pass already replaced them). Normalized 11 service-area pages (beachwood, brooklyn, cleveland hub + 4 cleveland neighborhoods, euclid, lakewood, parma, strongsville) from generic house-keys.webp/detective-hero.webp to page-specific service-area-preview.png, matching all siblings. Verified: 0 og!=twitter mismatches, every referenced share image exists on disk. JSON-LD image sits on shared #business LocalBusiness node (intentionally one brand image, not a per-page bug).
- [x] Re-check edited pages for metadata consistency after the social-preview pass
  > Note: Re-checked metadata on all edited pages. Found prior title-shortening pass left og:title/twitter:title carrying old long titles on 59 pages (title!=og:title). Per owner decision, aligned og:title + twitter:title to the shortened <title> on all 59. Final audit: 0 title/og/twitter-title mismatches, 0 og/twitter:image mismatches, every page has an existing share image, JSON-LD #business image consistent.

## Phase 4: Local Authority Follow-Through

- [x] Reconcile citation, Google Business Profile, Yelp, and directory backlog into agent-executable work versus owner-only work
  > Note: Reconciled the local-authority backlog against 2026-06-20 evidence. Yahoo search-result scans are currently unreliable because every query returned Yahoo's temporary-error page. Direct public proof still shows Yahoo Local resolved with (216) 300-4121, while Contractors Up still exposes 5202 Archmere Ave and (216) 456-5452. YellowPages, Yelp, Chamber, BBB, AllBiz, Manta, and A Greater Town remain separated into blocked headless verification versus owner/browser follow-up.
- [x] Execute the repo-side or documentation-side authority follow-up that does not require third-party owner login, and document the exact owner-only next actions
  > Note: Completed the repo-side authority follow-up. Hardened scripts/scan-citations.mjs so unusable Yahoo pages are recorded as queryStatus=search_error with foundOldNumber=null instead of false clean results, re-ran npm run citations:self-test and npm run citations:scan, refreshed docs/citation-evidence/latest.json, added a new current handoff at docs/local-authority-follow-through-2026-06-20.md, and updated the citation tracker plus directory buildout notes.
  > Note: 2026-06-20 Contractors Up escalation completed. Direct page still shows 5202 Archmere Ave, Cleveland, OH 44144, and (216) 456-5452. Re-submitted both /app/modals/business-removal.php and /app/modals/business-report.php; both returned HTTP 200 but only echoed posted payloads inside a raw <pre>array(...) block, with no normal confirmation. Submitted a privacy/correction escalation through /app/modals/contact.php and received a real confirmation: Thank you for contacting us / Your message has been received. We will respond within 1 business day.
  > Note: 2026-06-20 Manta recheck completed. Candidate listings https://www.manta.com/c/m1rsy7s/longpro-pest-control-llc and https://www.manta.com/c/mkjjmng/longpro-pest-control plus the Manta category page, official contact page, FAQ, how-to page, and free-listing/claim page all returned Cloudflare challenge pages from this environment. Repo docs were updated so Manta is treated as normal-browser or owner-session work, not a headless follow-up candidate.
  > Note: A Greater Town rechecked on 2026-06-20. The direct listing, homepage, /contact, /about, /privacy, and sitemap.xml all returned Cloudflare challenge responses from the current repo-side environment; robots.txt remained reachable but offered no listing data or correction path. Updated tracker, local-authority handoff, and request packet to treat A Greater Town as needs_access / owner-browser follow-up rather than vague needs_verification.
  > Note: Yellow Pages and Yelp rechecked on 2026-06-20. Yellow Pages listing, contact, and claim pages all returned Cloudflare 403s from the repo-side environment. Yelp public listing still blocks with DataDome, but `https://business.yelp.com/` and `https://biz.yelp.com/claim` remained reachable and exposed the owner claim flow plus support phone `(877) 767-9357`. Updated tracker, handoff, and request packet so the owner queue has exact entry points instead of generic login advice.
  > Note: Final authority sweep on 2026-06-20: Chamber of Commerce listing and dispute URL both returned Cloudflare 403s; AllBiz listing, support article, support request form, and contact page all returned Cloudflare 403s. Updated the tracker, owner queue, and request packet so those sources are now explicitly marked as repo-side blocked including their historical support paths.

## Phase 5: Content Depth

- [x] Prioritize the highest-value service, service-area, and blog content gaps based on commercial value and current site inventory
- [x] Implement the first content-expansion slice on the most valuable pages/posts
- [x] Re-verify changed pages and write a new handoff that reflects the post-intake, post-reconciliation reality
