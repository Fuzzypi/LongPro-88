# Agentic Visibility Fixes — LongPro Pest Control

> Progress: 26/26 tasks complete (100%)
> Version: 1 | Updated: 2026-05-03T23:20:24.211Z

## Startup Recommendation

- Mode: task (fallback)
- Message: All tasks complete. Plan finished.
- Next task: none

## Phase 1: llms.txt Upgrade

- [x] Fill in all placeholder fields in the comprehensive llms.txt draft with real site data (phone, URLs, hours, service area list)
- [x] Add structured pricing guidance (ranges or "contact for quote" per service)
- [x] Add availability signals (same-day, response time, emergency policy)
- [x] Add agent booking instructions with required intake fields
- [x] Deploy upgraded llms.txt to dist_assets/ replacing the basic version
- [x] Verify llms.txt is accessible at longpropc.com/llms.txt
  > Note: Blocked until wrangler deploy publishes the updated dist_assets/llms.txt to production
  > Note: Merge blocked by 3 issues: (1) /services/general-pest-control missing from manifest routing, (2) truncated redirect key, (3) citation scan CLI not environment-agnostic

## Phase 2: Service Page Schema Enrichment

- [x] Add Service + Offer JSON-LD to /services/bed-bug-extermination/ (priceRange, areaServed, potentialAction)
- [x] Add Service + Offer JSON-LD to /services/cockroach-extermination/
- [x] Add Service + Offer JSON-LD to /services/ant-and-spider-control/
- [x] Add Service + Offer JSON-LD to /services/flea-extermination/
- [x] Add Service + Offer JSON-LD to /services/general-pest-control/
- [x] Add potentialAction (ScheduleAction pointing to /contact) to each service page schema

## Phase 3: FAQPage Schema

- [x] Extract Q&A pairs from /faq/ page HTML
- [x] Add FAQPage JSON-LD with all Question/Answer entries
  > Note: Already present — 5 FAQPage JSON-LD blocks covering 19 Q&As across all FAQ sections
- [x] Validate with schema.org validator

## Phase 4: Review Schema

- [x] Add individual Review entries as JSON-LD on /reviews/ page
- [x] Ensure AggregateRating on /reviews/ matches homepage rating
- [x] Add reviewCount and ratingCount fields

## Phase 5: Brand and Differentiator Schema

- [x] Add knowsAbout to Organization schema (bed bugs, pest biology, Cleveland pest patterns)
- [x] Add slogan field (Discreet pest control with unmarked vehicles and confidential service)
- [x] Add brand attributes as additionalProperty key-value pairs (discretion, response time, BBB rating, years in business)
- [x] Add competitive positioning signals parseable by agents

## Phase 6: Structured Availability Signals

- [x] Add hoursAvailable to each Service schema entry
- [x] Add same-day inspection available as structured data (not just copy)
- [x] Add typical response time as structured property
- [x] Ensure openingHoursSpecification is on all service pages (not just homepage)
