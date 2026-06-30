# LongPro SEO Improvement Plan
**Date:** June 26, 2026  ·  **Domain:** longpropc.com  ·  **Focus:** on-page / technical + local SEO

## Where things actually stand

The technical foundation is solid and has clearly improved since the March audit. Across all 92 pages: no duplicate titles, no duplicate meta descriptions, every page has a canonical, exactly one H1 each, and rich schema (LocalBusiness, Service, FAQPage, BreadcrumbList, etc.). The sitemap covers 91 of 92 pages, GA4 is live, and the blog has grown from 5 posts to ~17.

So the problem is no longer "is the site built right." The current Search Console data tells a sharper story:

- **48 clicks / 5,020 impressions over 3 months, ~1% CTR, average position 18.8.** Impressions are climbing fast (5,020 vs. 102 the prior quarter) but clicks aren't keeping pace.
- **"bed bug exterminator cleveland": 173 impressions, position 18, 0 clicks.** You're on the edge of page 2 for a high-intent money term and earning nothing from it.
- **"pest control cleveland": 117 impressions, position 66.** The broad head term barely ranks.
- **"longpro pest control": position 7.4, 4.2% CTR** — brand search works; non-brand discovery is the gap.

That points at two levers: **(1) earn more clicks from the impressions you already have (CTR/snippets), and (2) push the near-miss terms from page 2 into the top 10 / local pack.** This plan is ordered by impact-per-effort against those two levers.

---

## Tier 1 — In-repo fixes I can implement now (highest impact, low effort)

### 1. Wire structured data into the homepage *(High)*
The homepage — your most important page for brand and "pest control cleveland" — has **zero inline JSON-LD**, while every other page has full schema. A complete `LocalBusiness`/`Organization` graph already exists in the repo (`src/components/seo/LongProJsonLd.jsx` + `longpro-jsonld-graph.json`) but was never installed. Adding it strengthens eligibility for rich results, the knowledge panel, AggregateRating stars, and AI-engine citation on the page that matters most.

### 2. Rewrite title tags for click-through *(High)*
This is the most direct fix for the 1% CTR. Almost every blog title (93–120 chars) and service-area title (71–99 chars) **truncates in the SERP**, and many waste their visible space on boilerplate suffixes like `| Pest Control Blog | LongPro Pest Control`. Rework to **≤60 characters, keyword front-loaded, value/benefit where space allows**. Examples:

| Page | Now (truncates) | Proposed (≤60) |
|---|---|---|
| `/blog/do-bed-bugs-come-back-after-treatment/` | Do Bed Bugs Come Back After Treatment? Cleveland Pest Pro Explains \| Pest Control Blog \| LongPro… | Do Bed Bugs Come Back After Treatment? \| LongPro |
| `/blog/bed-bug-treatment-cost-cleveland/` | Bed Bug Treatment Cost in Cleveland: 2026 Pricing Guide \| Pest Control Blog \| LongPro | Bed Bug Treatment Cost in Cleveland (2026) \| LongPro |
| `/service-area/cleveland/` | Pest Control Cleveland OH \| Bed Bug Exterminator Cleveland \| LongPro Pest Control | Pest Control Cleveland OH \| Free Quote \| LongPro |

(Full rewrite list produced at implementation time. Meta descriptions are already fine — this is titles only.)

### 3. Strengthen the "pest control cleveland" target *(Medium-High)*
Position 66 means the term has no strong home. `/service-area/cleveland/` is the natural target. On-page: front-load the head term in the title/H1, add a short "pest control services in Cleveland" section linking to each service page, and add a homepage link to it with descriptive anchor text. This concentrates internal relevance on one URL instead of splitting it across bed-bug pages.

### 4. Add the new mice/rodent post to sitemap + llms.txt *(Quick)*
`/blog/mice-and-rodent-control-cleveland/` is the one page missing from `sitemap.xml` (and likely `llms.txt`). One-line fix so it gets discovered.

### 5. Confirm `dateModified` / freshness signals on articles *(Quick)*
The March audit flagged missing `dateModified` in Article schema. Verify and add where absent — cheap freshness signal that helps the bed-bug posts already pulling impressions.

---

## Tier 2 — Local SEO (mostly your action; biggest ranking lever for the local pack)

For a service business, the local pack and Google Business Profile drive more revenue than organic blue links. These are largely off-repo:

- **Resolve GBP ownership risk.** The **primary owner** of the Google Business Profile is a third-party agency account (`scorpionhomeservices2020@gmail.com`), not LongPro. Primary owner can remove every other manager. This is already escalated in `reports/gbp/2026-06-22/` — worth treating as the #1 local priority because everything else in local SEO sits on top of that profile.
- **Get more Google reviews.** Only 3 reviews show on-site, and GBP shows very low interaction volume. Reviews are a top-3 local-pack ranking factor. You already have `review-request-kit.html` — put it to work with recent customers.
- **Continue citation/NAP buildout** on legitimate directories (Yelp and YellowPages already verified). Keep NAP identical everywhere: phone `(216) 300-4121`, no conflicting street address.
- **Note:** I am deliberately *not* recommending Angi, Thumbtack, or HomeAdvisor despite the March audit listing them — they're lead-resale platforms and not how you want to build authority. Stick to true business directories and your own GBP.

---

## Tier 3 — Content depth (compounding, slower)

Lower urgency than Tier 1/2 but where lasting non-brand traffic comes from:

- **Expand non-bed-bug service pages** (cockroach, ant/spider, flea) to match the depth of the bed-bug content — they're thin by comparison and the head terms ("exterminator cleveland") aren't bed-bug-specific.
- **Build out the cost / "near me" / emergency angles** that already exist as blog posts into stronger internal hubs, cross-linked from the service-area pages.

---

## Recommended order of execution

1. Homepage JSON-LD (Tier 1.1)
2. Title-tag CTR rewrites (Tier 1.2)
3. "pest control cleveland" target + internal links (Tier 1.3)
4. Sitemap/llms + freshness cleanup (Tier 1.4–1.5)
5. *(You)* GBP ownership + reviews push (Tier 2)
6. Content depth over the quarter (Tier 3)

Tier 1 is what I can implement in this session and is also the highest impact-per-effort against your real bottleneck (impressions that aren't converting to clicks).
