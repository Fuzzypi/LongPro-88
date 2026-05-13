# LongPro -> PestPro Integration Plan

**Last updated:** April 7, 2026

## Summary

LongPro is being upgraded from a brochure-style pest-control website into a working business front desk. The public site will still handle marketing, local SEO, and brand trust, but the operational work will move into PestPro as the private CRM backend.

The important idea is:

- `LongPro` = public website, lead capture, service pages, location pages, AI receptionist touchpoints, and service-area routing.
- `PestPro` = private CRM and operations layer for leads, customers, jobs, attribution, campaigns, messaging, and follow-up automation.
- The website should send intake traffic into PestPro through a thin adapter or server-side proxy instead of replacing the CRM with a third-party service.

## Research Takeaway

The research report changed the product framing in a useful way:

- These sites are not just brochure sites.
- They are websites plus workflow logic plus CRM actions plus small custom tools.
- That means the value is in turning the website into a task surface for the business, not just a static marketing asset.

For LongPro, that means the next step is not more generic pages. It is a tighter link between:

- website forms
- lead qualification
- CRM storage
- follow-up automation
- appointment and job creation
- AI chat / receptionist behavior

## Website Changes Planned

The website should be improved in the places that matter most for conversion and trust:

1. Clean up metadata and titles so they are not duplicated or awkward.
2. Tighten the contact flow so every lead reaches PestPro reliably.
3. Add stronger service-area and service-type routing before a lead is accepted.
4. Improve proof and trust signals so the site feels like a real working business, not a template.
5. Keep the SEO structure, but make it support the operational workflow.

## PestPro Changes Planned

PestPro already has the core pieces needed for this direction:

- public lead ingestion
- customer records
- job records
- attribution tracking
- auth-protected admin surfaces
- AI chat / business snapshot support

The remaining PestPro work should focus on making the LongPro integration safe and explicit:

1. Confirm the public intake contract for website submissions.
2. Add or tighten anti-spam and validation controls.
3. Decide whether public chat should use a dedicated public endpoint or a proxy.
4. Make lead -> customer -> job promotion clear and testable.
5. Verify CORS and auth boundaries so the CRM stays private.

## Integration Pattern

The intended pattern is:

- User submits a contact or quote request on LongPro.
- LongPro forwards that request to PestPro intake.
- PestPro stores the lead and attribution data.
- When qualified, PestPro promotes the lead into a customer and then a job or appointment.
- Follow-up actions stay inside PestPro.

That keeps the public site simple and keeps operations inside the CRM where they belong.

## Worker Adapter Configuration

The LongPro Worker handles `POST /api/contact` and forwards valid form submissions to PestPro when these Cloudflare environment variables are set:

- `PESTPRO_LEADS_URL`: PestPro public lead intake URL.
- `PESTPRO_INTAKE_TOKEN`: optional bearer token for the PestPro intake endpoint.

PestPro should be configured with the same shared value as `LONGPRO_INTAKE_TOKEN`. Public `POST /api/leads` requests are rejected when the bearer token is missing or wrong, and lead listing/editing routes require PestPro admin auth.

If `PESTPRO_LEADS_URL` is missing, the endpoint returns a structured `503` instead of silently dropping or pretending to accept the lead.

## Next Step

Configure the production Cloudflare variables, confirm the PestPro public intake contract, then deploy and submit a real test lead end to end.

## Working References

- Public website repo: `LongPro-88`
- CRM backend repo: `PestPro`
- Standing work item: integrate LongPro website with PestPro CRM
