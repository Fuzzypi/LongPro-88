# LongPro Pest Control — SEO Review
**Date:** May 13, 2026
**Domain:** longpropc.com
**Previous audit:** March 14, 2026

---

## Executive Summary

Since the March 2026 audit, longpropc.com has made significant progress on content volume — the blog has grown from ~5 posts to 12 published articles, covering many of the keyword gaps identified in the prior audit (cost guides, emergency pest control, pet-safe treatments, bed bug vs. flea bites, county resources). The site's technical SEO remains strong with proper schema, canonical tags, Open Graph, and a well-structured sitemap covering 38 URLs. The core challenge remains **organic ranking visibility** — longpropc.com does not appear on page 1 for any of the 10 tracked high-value keywords, though it does show on page 1 for its branded "bed bug exterminator cleveland" query. Off-site authority building (citations, backlinks, directory listings) remains the biggest gap.

---

## Changes Since March 2026 Audit

| Area | March Status | May Status |
|------|-------------|------------|
| Blog posts | ~5 | 12 (7 new) |
| Sitemap URLs | ~25 est. | 38 |
| Keyword targets covered | Missing cost, emergency, pet-safe, county | All now have dedicated blog posts |
| Service area pages | Cleveland + few suburbs | Cleveland + 6 suburbs + 5 neighborhoods |
| Off-site citations | BBB + Google only | BBB + Google + Facebook + ZoomInfo (limited) |
| Schema markup | Good | Excellent (Service, BreadcrumbList, Blog, AggregateRating all present) |

---

## 1. Indexing & Crawlability

**robots.txt** — Well-structured. Allows all search engines and AI search crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot). Blocks training-only crawlers (GPTBot, ClaudeBot, Google-Extended, Bytespider, CCBot, meta-externalagent, Amazonbot, Applebot-Extended). Sitemap reference present. No issues.

**sitemap.xml** — 38 URLs with proper `<changefreq>` and `<priority>` values. Covers core pages (7), services (6), service area cities (6), Cleveland neighborhoods (5), blog posts (12), plus privacy policy. All use trailing slashes consistently.

**Indexed pages** — A `site:longpropc.com` search returns results showing the homepage and several old Wix-era `/post/` URLs (e.g., `/post/how-to-keep-your-home-safe-from-common-pests`). This is a **problem**: Google still indexes legacy Wix blog URLs that likely don't exist on the current site or aren't redirecting. These may be causing soft 404s or diluting crawl budget.

**Action needed:**
- Verify whether `/post/*` URLs return proper 301 redirects to new `/blog/*` equivalents
- If not redirecting, set up 301s from old Wix paths to corresponding new blog posts
- Submit updated sitemap via Google Search Console and request re-indexing

---

## 2. Keyword Visibility Snapshot

| Keyword | longpropc.com Position | Top Competitors |
|---------|----------------------|-----------------|
| pest control cleveland | **Not on page 1** | Yelp, Orkin, General Pest, Greenix, Heights Pest, Express Pest, Epcon Lane, Cleveland Chemical, Speed Exterminating |
| bed bug exterminator cleveland | **Page 1 (~#8)** | Bed Bug BBQ (#1), Orkin, Yelp, Amazing Pest, The Bed Bug Pros, Terminix, Bed Bug Free Cleveland |
| cockroach extermination cleveland | **Not on page 1** | General Pest Ohio, Lakewood Exterminating, Avenger Pest, Abell, HomeAdvisor, SMART Exterminators |
| pest control old brooklyn cleveland | **Not on page 1** | Greenix, General Pest Ohio, Lakewood Exterminating, Abell, High Rock |
| flea extermination cleveland | **Not on page 1** | Yelp, Lakewood Exterminating, General Pest Ohio, SMART Exterminators, Mosquito Sheriff, Orkin |
| emergency pest control cleveland | **Not on page 1** | SMART Exterminators, Pest Detective, Progressive Pest, G&G Pest, HomeAdvisor, Prevent Pest |
| pet safe pest control cleveland | **Not on page 1** | Prevent Pest, G&G Pest, Cleveland Best Pest, High Rock, Abell, Native Pest, Greenix |
| bed bug treatment cost cleveland | **Not on page 1** | Bed Bug BBQ, homeyou, The Bed Bug Pros, Yelp, Lakewood Exterminating, HomeGuide |
| ant and spider control cleveland | Not searched (low volume) | — |
| general pest control near me cleveland | Not searched (too generic) | — |

**Key observations:**
- longpropc.com appears on page 1 only for "bed bug exterminator cleveland" — its strongest keyword
- The broad "pest control cleveland" query is dominated by aggregators (Yelp, HomeAdvisor) and legacy players (General Pest est. 1937, Speed Exterminating est. 1908, Epcon Lane est. 1945)
- Niche-specific queries (cockroach, flea, emergency, pet-safe) are winnable with deeper content and more backlinks
- "Pest control old brooklyn cleveland" is a strong long-tail opportunity — General Pest Ohio has a dedicated Old Brooklyn page already; LongPro has one too but it isn't ranking

---

## 3. On-Page SEO Check

### Homepage (/)
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "Discreet Bed Bug Exterminator Cleveland OH \| LongPro Pest Control" |
| Meta description | ✅ | Includes phone number, key services, BBB rating. 155 chars — good length |
| H1 | ✅ | "Cleveland's Discreet Pest Control Team" |
| Canonical | ✅ | https://longpropc.com/ |
| Open Graph | ✅ | Full OG + Twitter Card tags |
| Schema | ✅ Excellent | LocalBusiness with AggregateRating, detailed areaServed, potentialAction, hasOfferCatalog |
| Image alt text | ✅ | Logo and service card images all have descriptive alt text |
| Internal links | ✅ | Links to all services, service area, reviews, FAQ, blog, contact |
| Viewport | ✅ | width=device-width, initial-scale=1.0 |
| GA tracking | ✅ | G-Z1EH98YLZ1 with phone click and quote click events |

### /services/bed-bug-extermination/
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "Discreet Bed Bug Exterminator Cleveland OH \| LongPro Pest Control" |
| Meta description | ✅ | Unique, includes phone number |
| H1 | ✅ | "Discreet Bed Bug Extermination in Cleveland, OH" |
| Canonical | ✅ | Correct self-referencing canonical |
| Schema | ✅ Excellent | Service schema + BreadcrumbList + LocalBusiness |
| Breadcrumbs | ✅ | Home / Services / Bed Bug Extermination |
| ⚠️ Title overlap | The title is nearly identical to the homepage title — consider differentiating more |

### /services/cockroach-extermination/
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "Cockroach Exterminator Cleveland OH \| LongPro Pest Control" |
| Meta description | ✅ | Unique, mentions German/American/Oriental roaches |
| H1 | ✅ | "Cockroach Extermination in Cleveland, OH" |
| Schema | ✅ | Service + BreadcrumbList + LocalBusiness |

### /services/general-pest-control/
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "General Pest Control Cleveland OH \| Residential Exterminator \| LongPro Pest Control" |
| Meta description | ✅ | Strong copy — "treats the problem, not your wallet" |
| Canonical | ✅ | Correct |
| ⚠️ Different template | This page uses a different HTML structure than the Astro-generated pages (no `&nbsp;` entities, different meta tag ordering). Not a problem, but worth noting for consistency |

### /blog/
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "Pest Control Blog \| Cleveland Bed Bug & Pest Tips \| LongPro Pest Control" |
| Meta description | ✅ | Appropriate for blog index |
| Schema | ✅ | Blog + CollectionPage + BreadcrumbList |
| Content | ✅ | 12 posts displayed with dates, categories, and excerpts |

### 404 Page
| Element | Status | Notes |
|---------|--------|-------|
| Title | ✅ | "Page Not Found \| LongPro Pest Control" |
| Robots | ✅ | noindex, nofollow |
| Canonical | ⚠️ | Points to /404 — should either be removed or not present on error pages |

---

## 4. Technical SEO

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS | ✅ | Site served over HTTPS via Cloudflare |
| Canonical tags | ✅ | Present on all pages checked |
| Viewport meta | ✅ | Correct on all pages |
| 404 handling | ✅ | Custom 404 page with branded design, noindex tag |
| Skip-to-content link | ✅ | Present on all pages (accessibility win) |
| Mobile menu | ✅ | Hamburger menu with aria-expanded toggle |
| CSS bundle | ✅ | Single `about.CRmxRFHV.css` stylesheet — efficient |
| JS | ✅ | Minimal inline JS for menu toggle + GA events |
| Image format | ✅ | WebP throughout with PNG/JPG fallbacks |
| Image dimensions | ✅ | width/height attributes set (prevents CLS) |
| Lazy loading | ✅ | `loading="lazy"` on below-fold images |
| llms.txt | ✅ | Present in dist_assets (GEO optimization) |

**No critical technical issues found.**

---

## 5. Backlink & Authority Indicators

**Known off-site presence:**
- ✅ BBB listing (A+ rated, linked from site)
- ✅ Google Business Profile (linked via share.google URL)
- ✅ Facebook page (@longpropc)
- ✅ ZoomInfo company profile
- ❌ Not found: Yelp, Angi, HomeAdvisor, Thumbtack, Nextdoor, Houzz
- ❌ Not found: Any local news mentions or press coverage
- ❌ Not found: Industry directory listings (NPMA, ODA)

**Assessment:** Off-site authority is thin. The March audit identified this as the #2 priority and it remains the biggest gap. Competitors like General Pest Ohio, Speed Exterminating, and Bed Bug BBQ have deep directory presence and likely dozens of referring domains.

---

## 6. Competitor Snapshot (for "pest control cleveland")

| Rank | Domain | Key Strength |
|------|--------|-------------|
| 1 | yelp.com | Aggregator — hard to outrank |
| 2 | orkin.com | National brand, massive domain authority |
| 3 | generalpest-ohio.com | 87+ years in business, dedicated neighborhood pages including Old Brooklyn |
| 4 | greenixpc.com | Modern site, aggressive local landing pages |
| 5 | heightspestcontrol.com | Local player with established presence |
| 6 | expresspestcontrol.com | Cleveland-specific domain |
| 7 | epconlane.com | 80+ year family business |
| 8 | clevelandchemical.com | Name-brand recognition |
| 9 | speedexterminating.com | Operating since 1908 |
| 10 | clevelandbestpestcontrol.com | Cleveland-specific domain |

**Pattern:** Competitors ranking well have either massive domain authority (national brands), decades of history, or Cleveland-specific domains. LongPro's best angle remains the niche approach: discreet service, bed bug specialization, and Old Brooklyn/neighborhood targeting.

---

## 7. Content & Blog Health

**Current blog:** 12 posts (up from ~5 in March — strong progress)

| Post | Date | Category |
|------|------|----------|
| Cuyahoga County Bed Bug Help | Apr 29, 2026 | Local Resources |
| Bed Bug vs. Flea Bites | Apr 29, 2026 | Bed Bugs |
| Bed Bug Treatment Cost Cleveland | Apr 29, 2026 | Bed Bugs |
| Do Bed Bugs Come Back After Treatment | Apr 29, 2026 | Bed Bugs |
| Pet-Safe Pest Control Cleveland | Apr 29, 2026 | Pet Safety |
| Bed Bug Inspection: What to Expect | Apr 29, 2026 | Bed Bugs |
| Emergency Pest Control Cleveland | Apr 29, 2026 | Emergency Service |
| How to Prepare for Bed Bug Treatment | Feb 28, 2026 | Service Prep |
| How to Tell If You Have Bed Bugs | Feb 28, 2026 | Bed Bugs |
| Bed Bugs in Apartments Cleveland | Feb 28, 2026 | Bed Bugs |
| Bed Bug Heat Treatment vs Chemical | Feb 28, 2026 | Bed Bugs |
| Do Bed Bugs Spread to Neighbors | Feb 28, 2026 | Bed Bugs |

**Observations:**
- 7 of the 12 most recent posts were all published April 29 — a single batch. Staggered publishing looks more natural to search engines
- Content is heavily bed-bug focused (10 of 12 posts). No posts about cockroaches, ants/spiders, or fleas yet
- No posts published in May 2026 — the publishing cadence has stalled

**Content gaps to fill:**
1. **Cockroach content** — "cockroach extermination cleveland" has no supporting blog content
2. **Seasonal pest guide** — "Cleveland spring/summer pest guide 2026" would target seasonal search intent
3. **Comparison/trust content** — "How to choose a pest control company in Cleveland" (positions LongPro as the authority)

---

## 8. Top 5 Action Items (Priority Ranked)

### 1. Fix legacy Wix URL indexing (HIGH — quick win)
Google still indexes old `/post/*` URLs from the Wix era. Set up 301 redirects from each old `/post/` path to the corresponding new `/blog/` URL. If no equivalent exists, redirect to `/blog/`. Submit the updated sitemap in GSC and request removal of stale URLs.

### 2. Build directory citations (HIGH — biggest authority gap)
Create or claim listings on: Yelp, Angi, HomeAdvisor, Thumbtack, Nextdoor, Houzz, MapQuest, YellowPages, and the Ohio Pest Management Association directory. Consistent NAP (Name, Address, Phone) across all listings is critical.

### 3. Publish non-bed-bug content (MEDIUM — diversify keyword coverage)
Write 2-3 blog posts targeting cockroach and general pest keywords: "How to get rid of German cockroaches in Cleveland apartments", "Cleveland seasonal pest calendar: what to expect month by month", "Signs you need professional pest control vs. DIY". Stagger publishing over 2-3 weeks.

### 4. Differentiate the bed bug service page title (LOW — easy fix)
The homepage and bed bug service page have nearly identical title tags starting with "Discreet Bed Bug Exterminator Cleveland OH". Consider changing the service page to something like "Bed Bug Treatment & Extermination Cleveland OH | LongPro Pest Control" to avoid keyword cannibalization.

### 5. Resume regular publishing cadence (MEDIUM — ongoing)
Aim for 1-2 posts per month minimum. The April batch publish is better than nothing, but a steady cadence signals freshness to Google. Consider adding publish dates that are spread out even if writing in batches.

---

## Scheduled Task Note

This review was run manually. A scheduled task (every 3 days) was attempted but the tool requires an interactive approval dialog that wasn't available in this session. To set up the recurring schedule, open a new Cowork conversation and say: **"Create a scheduled task called longpro-seo-review that runs every 3 days at 8am"** — then paste or reference this report's structure as the task prompt.

---

*Next review target: May 16, 2026*
