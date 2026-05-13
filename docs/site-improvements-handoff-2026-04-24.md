# LongPro Site Improvements Handoff

**Created:** 2026-04-24
**Session scope:** Verified phone-cleanup work, fixed schema hours and `sameAs`, added redirects for broken Google-crawled URLs, deployed, submitted Search Console validation.

## Canonical facts

| Thing | Value |
| --- | --- |
| Project | LongPro Pest Control marketing site |
| Repo path on Mac | `/Users/fuzzypi/Desktop/LongPro-88` |
| Stack | Astro SSR on Cloudflare Workers |
| Worker name | `longpro-scaffold` |
| Live domain | `https://longpropc.com` (also serves `www.longpropc.com`) |
| Wrangler auth | `longpropc@gmail.com` (confirmed via `npx wrangler whoami`) |
| Current Worker version | `2d4275f0-77f3-4a2b-a7d8-fb1f580074c3` (deployed 2026-04-24) |
| Target phone | `(216) 300-4121` / `+12163004121` |
| Old phones being retired | `(216) 294-2843` and `(216) 456-5452` |
| Google Business Profile | Claimed + managed under `longpropc@gmail.com`, 17 Google reviews, 5.0 stars. Share link: `https://share.google/GETw9NeHew2eJ5lB2` |
| Google Search Console | Domain property `sc-domain:longpropc.com`, already verified, sitemap submitted and crawled daily |
| GA4 ID | `G-Z1EH98YLZ1` (live on site since prior session) |
| Public hours | Mon–Sat 9:00 AM – 9:00 PM, Sun closed. Actual job window 10 AM – 7 PM stays internal. |

## What was done this session

1. **Re-verified phone cleanup state.** `src/`, `public/`, and `dist_assets/` have zero occurrences of either old phone number. Live site returns only `(216) 300-4121` on home, contact, and `www.` variants.
2. **Schema hours fixed.** All 28 HTML files in `dist_assets/` updated from `"opens":"08:00","closes":"18:00"` to `"opens":"09:00","closes":"21:00"`. Days unchanged (Mon–Sat).
3. **`sameAs` updated.** 28 HTML files now carry both the BBB profile and the GBP share link. 4 newer pages (Cleveland hub, South Hills, Slavic Village, general-pest-control) have LocalBusiness schema WITHOUT a `sameAs` field — inconsistency from earlier builder pass, still pending.
4. **301 redirects added for 5 Google-crawled 404s.** New `longproHandleRedirect` function in `src/index.js`:
   - `/accessibility-statement` → `/`
   - `/bed-bug-faq` → `/faq`
   - `/cockroach-extermination-in-cleveland` → `/services/cockroach-extermination`
   - `/post/understanding-regional-pest-challenges-in-north-olmsted` → `/blog`
   - `/blog/2024/november/the-impact-of-seasonal-changes-on-bed-bug-activi/` → `/blog`
5. **Deployed.** Version `2d4275f0-77f3-4a2b-a7d8-fb1f580074c3`. All 5 redirects verified returning `301` via curl, hours and `sameAs` verified live.
6. **Submitted Validate Fix** in Search Console for the Not Found (404) bucket. Validation started 2026-04-24; Google will recrawl.
7. **Wrote GBP/GSC runbook** at `docs/gbp-gsc-setup.md` — partly obsolete since both were already set up, but the GBP content pack (description, service areas list, categories, photo guidance) is still useful for completing the profile.

## Search Console indexing picture (as of this session)

- **Indexed:** 6 of 52 known pages.
- **Not indexed (46) by reason:**
  - 26 `Discovered – currently not indexed` (Google hasn't crawled yet; resolves with authority growth)
  - 7 `Alternate page with proper canonical tag` (mostly fine)
  - 5 `Not found (404)` — **fixed this session, validation submitted**
  - 4 `Page with redirect` (mostly fine)
  - 2 `Excluded by noindex tag` — both are the privacy policy (with/without trailing slash); intentional, leave alone
  - 2 `Crawled – currently not indexed` — haven't investigated yet
- **Sitemap:** `https://www.longpropc.com/sitemap.xml` — Success, 31 pages discovered, last read Apr 23, 2026. Three legacy 2024 sitemap entries (http/non-www variants) also submitted; low-priority cleanup.
- **Unused verification tokens recommendation** — minor housekeeping, not addressed.

## Citation tracker status (from prior builder's work, verified this session)

All 4 submitted directory corrections remain in "requested" state — directories still show old numbers publicly:

| Directory | Old # | Status | Notes |
| --- | --- | --- | --- |
| BBB | 294-2843 | requested 4/24 | Still shows old. Follow up ~2 weeks. |
| Chamber of Commerce | 294-2843 | requested 4/24 | Still shows old. Follow up ~2 weeks. |
| AllBiz | 456-5452 | requested 4/24 | Removal requested (privacy — leaking home address too). Follow up ~2 weeks. |
| Yellow Pages | 456-5452 | requested 4/24 | Feedback form; claim path blocked (already claimed by someone). Follow up ~2 weeks. |
| Yelp | 294-2843 | needs_access | Requires owner-claim. Not yet done. |
| Yahoo Local | 294-2843 | needs_access | Routes through Yellow Pages claim (blocked). |
| Manta | 456-5452 | needs_access | Possibly 2 listings, leaking home address. |
| Contractors Up | 456-5452 | ready_to_request | No-login form available. Leaks home address too. Not yet submitted. |
| A Greater Town | ? | needs_verification | Cloudflare-blocked in headless; needs normal-browser verification. |

**Privacy pattern:** AllBiz/Manta/Contractors Up are all leaking `5202 Archmere Ave` alongside the old phone. For consistency with the discreet-brand value prop, these should be removal requests, not phone updates.

## Outstanding backlog (descending impact)

1. **PestPro intake wiring.** `/api/contact` returns `503` because `PESTPRO_LEADS_URL` and `PESTPRO_INTAKE_TOKEN` are not set as Worker secrets. If the contact form is live, leads are being dropped. Set with `npx wrangler secret put PESTPRO_LEADS_URL` and `npx wrangler secret put PESTPRO_INTAKE_TOKEN`. See `docs/longpro-pestpro-integration.md`.
2. **Yelp claim + phone fix.** Needs business-owner login.
3. **Reviews page thin** — only 3 reviews, audit flagged High severity. Collect and publish more.
4. **Contractors Up removal request.** Tracker marks it ready_to_request, form is no-login, not yet submitted.
5. **Duplicate site name in title tags** — homepage still `"...LongPro | LongPro Pest Control"`. Trim to remove the duplicate.
6. **Per-page OG images** — all pages currently use `longpro-logo.webp` as `og:image`. Service cards and blog post images exist; wire them into each page's head.
7. **`sameAs` missing on 4 newer pages** — Cleveland hub, South Hills, Slavic Village, general-pest-control. Align with the site-wide two-URL pattern.
8. **Citation re-scan in ~2 weeks** (target 2026-05-08) to confirm BBB/Chamber/Yellow Pages/AllBiz processed the submissions.
9. **Search Console 404 validation result** — check in ~1 week; Google will mark them resolved once recrawl confirms 301.
10. **GBP profile completion** — profile still shows "Complete Info" prompt; per `docs/gbp-gsc-setup.md`, fill in secondary categories, full service areas list (currently "Cleveland and nearby areas"), service descriptions, and add fresh photos (last added ~273 days ago).
11. **GSC housekeeping** — clean up 3 legacy 2024 sitemap entries and 1 unused verification token.
12. **Content gaps from the March audit** — cost guide, "Do bed bugs come back after treatment?", Cuyahoga County assistance, pet-safe pest control, emergency service page. See `seo-audit-march-2026.md`.

## Gotchas for the next session

- **`src/index.js` is the compiled Astro Worker bundle** (~14,700 lines, minified) but is being hand-edited by builders. Non-Astro handlers (contact API, redirects, component-test block) live there. The Astro source tree is NOT in this repo — the bundle was built elsewhere (`aos-platform/projects/longpro-88/` per the manifest, but that path doesn't exist on the Mac). Any edits to `src/index.js` survive as long as nobody rebuilds from the missing Astro source.
- **`dist_assets/*.html` is what gets served** as static assets via the Worker's `ASSETS` binding. Site-wide HTML changes (schema, meta tags) go here.
- **`mcp__terminal-bridge__*` cannot access `~/Desktop/`** due to macOS TCC restrictions. Use `mcp__Macos__Shell` for anything touching the project folder — that's what worked for `npx wrangler deploy` this session.
- **Sandbox `mcp__workspace__bash`** can read/write the repo (mounted at `/sessions/<id>/mnt/LongPro-88/`) but cannot run `wrangler` — workerd binary is darwin-only in the installed node_modules, and sandbox has no Cloudflare auth.
- **`google.com/search` ≠ `search.google.com/search-console`.** The first is the Google Search keyword engine (surfaces a Business Profile control panel for owners); the second is the separate Search Console dashboard. Don't conflate them.
- **Screenshots truncate URLs inside narrow `<input>` boxes.** If a URL matters, ask for a text paste, not an image.
- **Wrangler output `No deploy targets for longpro-scaffold`** is expected — `workers_dev=false` and no routes in `wrangler.toml`; routes are configured in the Cloudflare dashboard and track the latest uploaded version automatically.

## User preferences (from this session)

- Don't pile on apologies; own mistakes briefly and move.
- Don't use unexplained initials — spell out first use.
- Verify existing state (via screenshots, fetches, or terminal) before asking the user to do anything.
- Prefer action via available tools over handing tasks back. `mcp__Macos__Shell` and Chrome MCP are available and should be used.
- User has compared response quality to Codex; Codex "just does things".

## New conversation starter

Paste this into the next session:

```text
We are in /Users/fuzzypi/Desktop/LongPro-88. Continue LongPro website improvement work.
Start by reading docs/site-improvements-handoff-2026-04-24.md in full; it has the canonical
facts, what was just done, outstanding backlog ranked by impact, and gotchas about the
build setup. Then read docs/citation-cleanup-tracker.md for directory-cleanup status and
docs/longpro-pestpro-integration.md for the PestPro intake wiring details.

The highest-impact open item is PestPro intake wiring — the /api/contact endpoint is
currently returning 503 because PESTPRO_LEADS_URL and PESTPRO_INTAKE_TOKEN are not set
as Worker secrets. If the contact form is live, leads are being dropped. Second priority
is claiming Yelp so the old (216) 294-2843 can be replaced there.

Use mcp__Macos__Shell to touch files under ~/Desktop and to run wrangler. Wrangler auth
under longpropc@gmail.com is already working. Use the Chrome MCP (mcp__Claude_in_Chrome__*)
for Search Console and other browser work; the Google Business Profile is already claimed.
Do not use mcp__terminal-bridge__ for project-folder tasks — it's blocked by macOS TCC
on ~/Desktop.
```
