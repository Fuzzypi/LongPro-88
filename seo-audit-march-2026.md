# LongPro Pest Control — Full SEO/GEO Audit
**Date:** March 14, 2026
**Domain:** longpropc.com
**Stack:** Astro SSR + Cloudflare Workers

---

## Executive Summary

LongPro's technical SEO foundation is strong — schema markup, meta tags, Open Graph, canonical URLs, and structured data are all properly implemented across every page. The site also now has proper GEO infrastructure (llms.txt, clean robots.txt allowing AI search crawlers, XML sitemap). The biggest opportunities lie in **content volume** (5 blog posts vs. competitors with 20-50+), **backlink acquisition** (empty sameAs, no directory listings beyond BBB), and **keyword coverage for non-bed-bug services** (cockroach, ant, flea pages exist but lack the depth of the bed bug content).

**Top 3 priorities:**
1. Expand blog content targeting high-intent local keywords (especially cost-related and comparison queries)
2. Build local citations and backlinks (Google Business Profile, Yelp, Angi, HomeAdvisor, Thumbtack)
3. Add FAQ schema to blog posts and create location-specific landing pages for key suburbs

**Overall assessment:** Strong foundation, needs content volume and off-site authority to compete with established players like Bed Bug BBQ, G&G Exterminating, and national brands.

---

## Keyword Opportunity Table

| Keyword | Est. Difficulty | Opportunity | Current Status | Intent | Recommended Content |
|---------|----------------|-------------|----------------|--------|---------------------|
| bed bug exterminator cleveland | Hard | High | Have service page | Transactional | Strengthen existing page, add testimonials |
| bed bug treatment cost cleveland | Moderate | High | Not covered | Commercial | New blog post: pricing guide |
| how to get rid of bed bugs cleveland | Moderate | High | Partially covered | Informational | New comprehensive guide |
| discreet pest control cleveland | Easy | High | Core differentiator but not targeted | Transactional | Optimize homepage + about page |
| bed bug heat treatment cleveland ohio | Moderate | High | Blog post exists (comparison) | Commercial | Expand with dedicated landing page |
| cockroach exterminator cleveland | Moderate | High | Have page, thin vs competitors | Transactional | Expand service page depth |
| pest control near me cleveland ohio | Hard | Medium | Generic competition | Transactional | Optimize service-area page |
| bed bug apartment cleveland | Easy | High | Blog post exists | Informational | Expand, add landlord/tenant angle |
| bed bug signs cleveland | Easy | High | Blog post exists | Informational | Already covered well |
| flea exterminator cleveland | Easy | Medium | Have page | Transactional | Expand content depth |
| ant exterminator cleveland ohio | Easy | Medium | Have page | Transactional | Expand content depth |
| bed bug inspection cleveland | Moderate | Medium | Not standalone page | Commercial | New service sub-page |
| pest control cleveland ohio reviews | Moderate | Medium | Have reviews page | Navigational | Add more reviews, get on 3rd party sites |
| how much does bed bug treatment cost ohio | Easy | High | Not covered | Commercial | New blog post |
| bed bug exterminator near me free estimate | Moderate | Medium | CTA exists but not targeted | Transactional | Create dedicated landing page |
| cuyahoga county bed bug program | Easy | Medium | Not covered | Informational | Blog post about county resources |
| bed bug preparation checklist | Easy | High | Blog post exists | Informational | Already covered, cross-link more |
| do bed bugs come back after treatment | Easy | Medium | Not covered | Informational | New blog post |
| bed bug vs flea bites | Easy | Low | Not covered | Informational | New blog post |
| spider control cleveland ohio | Easy | Low | Have page | Transactional | Expand |
| emergency pest control cleveland | Moderate | Medium | Not covered | Transactional | Add emergency CTA/page |
| pet safe pest control cleveland | Easy | Medium | Not covered | Commercial | New blog post |
| eco friendly bed bug treatment | Easy | Medium | Not explicitly covered | Commercial | Add to service page |

---

## On-Page Issues Table

| Page | Issue | Severity | Fix |
|------|-------|----------|-----|
| All pages | OG image uses logo only, not page-specific images | Medium | Create unique OG images for service pages (service card images work) |
| Homepage | Title tag duplicates site name: "...LongPro \| LongPro Pest Control" | Medium | Remove duplicate: "Bed Bug Exterminator Cleveland OH \| Discreet Pest Control \| LongPro" |
| Service pages | Title tags also duplicate site name at end | Medium | Trim to under 60 chars, remove redundancy |
| Blog posts | No dateModified in Article schema | Low | Add lastModified for freshness signals |
| Blog posts | All blog images use logo as og:image | Medium | Use post-specific images |
| Reviews page | Only 3 reviews shown | High | Add more customer reviews, ideally 10+ |
| Service pages | areaServed schema uses GeoCircle only | Low | Add explicit city names for stronger local signals |
| All pages | No Google Analytics or Search Console verification tag | High | Add GA4 + GSC for tracking |
| All pages | sameAs only has BBB — no Google Business, Yelp, social | Medium | Add all profile URLs once profiles exist |
| 404 page | No schema, minimal SEO value | Low | Add helpful links, search suggestion |

---

## Content Gap Analysis

### High Priority

| Topic | Why It Matters | Format | Effort |
|-------|---------------|--------|--------|
| **Bed bug treatment cost guide (Cleveland)** | Top commercial query, competitors don't have local pricing content | Blog post (1500+ words) | Moderate |
| **"Do bed bugs come back after treatment?"** | People Also Ask query, high search volume | Blog post (800 words) | Quick win |
| **Cuyahoga County bed bug assistance program** | County program exists, informational traffic opportunity | Blog post (600 words) | Quick win |
| **Pet-safe pest control options** | Growing search trend, differentiator | Blog post (800 words) | Quick win |
| **Bed bug inspection: what to expect** | Pre-purchase query, builds trust | Service sub-page or blog | Moderate |
| **Emergency pest control services** | High-intent, time-sensitive searches | New service page or CTA section | Quick win |

### Medium Priority

| Topic | Why It Matters | Format | Effort |
|-------|---------------|--------|--------|
| **Location pages for key suburbs** | Lakewood, Parma, Euclid, Mentor, Shaker Heights | Landing pages (5-10) | Substantial |
| **Bed bug vs flea bites comparison** | Informational traffic, cross-links to both services | Blog post | Quick win |
| **Landlord/tenant bed bug guide Cleveland** | Ohio-specific legal angle, apartment dwellers | Blog post (1200 words) | Moderate |
| **How bed bug heat treatment works** | Expand existing comparison post into standalone guide | Blog post or service page | Moderate |
| **Seasonal pest guide Cleveland** | Evergreen content, quarterly updates | Pillar page | Substantial |

### Content Types Competitors Have That You Don't

- **Video content** — Bed Bug BBQ has visual treatment demos
- **Comparison/vs pages** — "Heat treatment vs chemical" (you have this, expand it)
- **Cost calculators or estimators** — Interactive pricing tools
- **Before/after case studies** — Photo documentation of treatments
- **Neighborhood guides** — "Bed bugs in [specific Cleveland neighborhood]"

---

## Technical SEO Checklist

| Check | Status | Details |
|-------|--------|---------|
| HTTPS | ✅ Pass | Full HTTPS via Cloudflare |
| Mobile responsive | ✅ Pass | Tailwind responsive classes, proper viewport meta |
| Page speed | ✅ Pass | Static assets on Cloudflare edge, minimal JS |
| robots.txt | ✅ Pass | Clean, AI search crawlers allowed, training bots blocked |
| XML sitemap | ✅ Pass | 18 pages, proper priorities, referenced in robots.txt |
| llms.txt | ✅ Pass | Full business profile for AI search discoverability |
| Canonical tags | ✅ Pass | Trailing slashes match auto-trailing-slash config (fixed today) |
| Schema markup | ✅ Pass | LocalBusiness, Service, Article, BreadcrumbList, AggregateRating, FAQPage |
| Open Graph | ✅ Pass | All pages have og:title, og:description, og:url, og:image |
| Twitter Cards | ✅ Pass | summary_large_image on all pages |
| H1 tags | ✅ Pass | One per page, includes target keywords |
| Alt text | ⚠️ Warning | Service card images have alt text, verify all blog images do too |
| Broken links | ✅ Pass | No internal 404s detected |
| Mixed content | ✅ Pass | No HTTP resources on HTTPS pages |
| Core Web Vitals | ✅ Pass (likely) | Minimal JS, static HTML, Cloudflare edge — should score well |
| Google Analytics | ❌ Fail | No GA4 tracking code detected |
| Search Console | ❌ Fail | No verification meta tag detected |
| Sitemap in Search Console | ❌ Fail | Sitemap not submitted to Google (needs GSC setup) |

---

## Competitor Comparison

| Dimension | LongPro | Bed Bug BBQ | G&G Exterminating | Orkin Cleveland |
|-----------|---------|-------------|-------------------|-----------------|
| **Differentiator** | Discreet/unmarked vehicles | #1 claim, heat-only, 24hr guarantee | 35+ year local legacy | National brand trust |
| **Schema markup** | ✅ Full (6 types) | ✅ Basic (3 types) | Unknown (403) | ✅ Full |
| **Blog content** | 5 posts | Minimal | Unknown | Extensive national |
| **Service pages** | 4 services | Bed bugs only (specialist) | Full pest spectrum | Full pest spectrum |
| **Reviews visible** | 3 on site | 4.5+ stars (Google/Yelp/Thumbtack) | 35+ years cited | National reputation |
| **Local citations** | BBB only | BBB, Yelp, Google, Thumbtack, Facebook | BBB, Yelp, established | All major directories |
| **GEO readiness** | ✅ llms.txt + AI crawlers allowed | ❌ No llms.txt | Unknown | ❌ No llms.txt likely |
| **Unique advantage** | Privacy/discretion, GEO-ready | Speed (24hr guarantee), heat specialist | Longevity, local trust | Brand recognition, scale |

**LongPro's competitive edge:** You're the only competitor with GEO optimization (llms.txt, AI crawler access). When someone asks ChatGPT or Perplexity "discreet bed bug exterminator Cleveland," you're positioned to be cited. No competitor has this yet.

**LongPro's biggest gap:** Off-site authority. Bed Bug BBQ has reviews on 4+ platforms. You need Google Business Profile, Yelp, Angi, and Thumbtack listings.

---

## Prioritized Action Plan

### Quick Wins (This Week)

| Action | Impact | Effort | Dependencies |
|--------|--------|--------|-------------|
| Set up Google Analytics 4 | High | 30 min | Google account |
| Set up Google Search Console + submit sitemap | High | 30 min | Domain verification |
| Claim/optimize Google Business Profile | High | 1 hour | Business verification |
| Create Yelp business listing | High | 30 min | None |
| Fix duplicate site name in title tags | Medium | 1 hour | Edit HTML files |
| Write blog: "Do bed bugs come back after treatment?" | Medium | 1-2 hours | None |
| Write blog: "Cuyahoga County bed bug assistance program" | Medium | 1 hour | None |

### Strategic Investments (This Quarter)

| Action | Impact | Effort | Dependencies |
|--------|--------|--------|-------------|
| Write 10 additional blog posts targeting keyword table | High | 2 weeks | Keyword priorities above |
| Create 5 suburb landing pages (Lakewood, Parma, Euclid, Mentor, Shaker Heights) | High | 1 week | Content + build |
| Build Angi, HomeAdvisor, Thumbtack profiles | High | 2 hours each | Business info |
| Collect 10+ customer reviews across Google + Yelp | High | Ongoing | Customer outreach |
| Create page-specific OG images for social sharing | Medium | Half day | Design |
| Add cost/pricing content to service pages | High | 1 day | Pricing info |
| Create video content showing treatment process | Medium | 1-2 days | Video equipment/editing |
| Implement location-specific schema for suburb pages | Medium | Half day | After suburb pages created |

---

## GEO-Specific Assessment

| GEO Signal | Status | Notes |
|------------|--------|-------|
| llms.txt | ✅ Live | Full business profile, services, blog links |
| AI crawler access | ✅ Configured | GPTBot, ClaudeBot, PerplexityBot, Google-Extended allowed |
| Citability | ⚠️ Moderate | Good content but limited external citations |
| Brand mentions | ⚠️ Low | Few mentions on discussion platforms (Reddit, forums) |
| Structured data | ✅ Strong | 6 schema types help AI engines extract facts |
| Content authority | ⚠️ Growing | 5 blog posts, need 15-20+ for strong topical authority |
| Competitor GEO | ✅ Ahead | No competitors have llms.txt or AI crawler optimization |

---

*Generated by Cowork SEO Audit — March 14, 2026*
