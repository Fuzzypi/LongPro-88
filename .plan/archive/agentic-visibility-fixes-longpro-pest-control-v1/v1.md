# Agentic Visibility Fixes — LongPro Pest Control

Based on the Agentic Visibility Audit (May 2026). Goal: close the gaps that make longpropc.com invisible to AI purchasing agents.

## Phase 1: llms.txt Upgrade
> Priority: NOW | Effort: LOW | Impact: HIGH

- [ ] Fill in all placeholder fields in the comprehensive llms.txt draft with real site data (phone, URLs, hours, service area list)
- [ ] Add structured pricing guidance (ranges or "contact for quote" per service)
- [ ] Add availability signals (same-day, response time, emergency policy)
- [ ] Add agent booking instructions with required intake fields
- [ ] Deploy upgraded llms.txt to dist_assets/ replacing the basic version
- [ ] Verify llms.txt is accessible at longpropc.com/llms.txt

## Phase 2: Service Page Schema Enrichment
> Priority: NOW | Effort: MEDIUM | Impact: HIGH

- [ ] Add Service + Offer JSON-LD to /services/bed-bug-extermination/ (priceRange, areaServed, potentialAction)
- [ ] Add Service + Offer JSON-LD to /services/cockroach-extermination/
- [ ] Add Service + Offer JSON-LD to /services/ant-and-spider-control/
- [ ] Add Service + Offer JSON-LD to /services/flea-extermination/
- [ ] Add Service + Offer JSON-LD to /services/general-pest-control/
- [ ] Add potentialAction (ScheduleAction pointing to /contact) to each service page schema

## Phase 3: FAQPage Schema
> Priority: NOW | Effort: LOW | Impact: HIGH

- [ ] Extract Q&A pairs from /faq/ page HTML
- [ ] Add FAQPage JSON-LD with all Question/Answer entries
- [ ] Validate with schema.org validator

## Phase 4: Review Schema
> Priority: NEXT | Effort: LOW | Impact: MEDIUM

- [ ] Add individual Review entries as JSON-LD on /reviews/ page
- [ ] Ensure AggregateRating on /reviews/ matches homepage rating
- [ ] Add reviewCount and ratingCount fields

## Phase 5: Brand and Differentiator Schema
> Priority: NEXT | Effort: LOW | Impact: MEDIUM

- [ ] Add knowsAbout to Organization schema (bed bugs, pest biology, Cleveland pest patterns)
- [ ] Add slogan field (Discreet pest control with unmarked vehicles and confidential service)
- [ ] Add brand attributes as additionalProperty key-value pairs (discretion, response time, BBB rating, years in business)
- [ ] Add competitive positioning signals parseable by agents

## Phase 6: Structured Availability Signals
> Priority: NEXT | Effort: LOW | Impact: MEDIUM

- [ ] Add hoursAvailable to each Service schema entry
- [ ] Add same-day inspection available as structured data (not just copy)
- [ ] Add typical response time as structured property
- [ ] Ensure openingHoursSpecification is on all service pages (not just homepage)
