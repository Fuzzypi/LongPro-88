# LongPro Citation Cleanup Tracker

Created: 2026-04-24

## Goal

Replace or remove stale LongPro Pest Control phone citations across public search and directory surfaces so public calls route to the CalenCall number.

## Canonical Phone State

| Type | Display | E.164 | Notes |
| --- | --- | --- | --- |
| Target CalenCall number | (216) 300-4121 | +12163004121 | Use this for LongPro public tracking and call testing. |
| Old website/listing number | (216) 294-2843 | +12162942843 | Removed from live site on 2026-04-24; still appears on external citations. |
| Old first business/cell line | (216) 456-5452 | +12164565452 | Not present in local LongPro repo; appears on external citations. |

## Status Values

| Status | Meaning |
| --- | --- |
| found | Old number has been found on the listing or search result. |
| needs_verification | Listing exists, but the latest source-specific scan has not confirmed an old phone number. |
| needs_access | The listing likely requires owner login, CAPTCHA, phone verification, or account ownership. |
| ready_to_request | Enough public contact/correction information exists to send an update/removal request. |
| requested | Correction/removal was submitted. Include date and method. |
| pending | Site acknowledged or is waiting on review. |
| resolved | Listing no longer shows old number, or shows the target number. |
| blocked | Cannot proceed without owner action or unavailable access. |

## Known Citation Inventory

| Source | Evidence Found | Old Number(s) | Desired Action | Update Path | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| longpropc.com live site | Pre-deploy browser check showed live homepage had `tel:+12162942843` and visible old number. Post-deploy curl checks show the target number. | (216) 294-2843 | Done: deployed prepared local site changes. | Cloudflare Worker deploy via Wrangler. | resolved | Deployed 2026-04-24 as Worker version `30266bc7-9982-4ecb-879d-0c97a186466b`. Verified `https://longpropc.com/`, `https://www.longpropc.com/`, and `https://longpropc.com/contact/` return 200 with zero old-number matches. |
| Yahoo Local | Direct Yahoo Local listing now shows `Phone: (216) 300-4121`. | Historical: (216) 294-2843 | No listing edit needed right now; keep monitoring cached search snippets. | Public Yahoo Local listing at `https://local.yahoo.com/info-150974675-longpro-pest-control-cleveland`. | resolved | Rechecked 2026-05-01 in the required browse CLI. The listing now shows the target number and current public hours. The old number can still survive in stale search snippets elsewhere, but the direct Yahoo Local page is no longer a blocker. |
| Chamber of Commerce | Yahoo search snippet showed Chamber listing with `216-294-2843`. Direct listing confirmed stale phone `216-294-2843`. | (216) 294-2843 | Update phone to target or request correction. | Chamber contact form at `chamberofcommerce.com/request-contact?help=Dispute&id=1335288254&name=LongPro%20Pest%20Control%20Co.` | requested | Submitted 2026-04-24 via browser form. Confirmation banner said: "Your Message Has Been Sent." |
| BBB | Yahoo search snippet and direct BBB profile showed `Phone: (216) 294-2843`. | (216) 294-2843 | Update BBB business profile phone. | BBB Serving Greater Cleveland `Email this BBB` contact form. | resolved | Submitted 2026-04-24 via local BBB contact form. Confirmation modal said: "Your message was successfully sent to the BBB Serving Greater Cleveland." Rechecked 2026-06-30 via direct fetch (this environment is not Cloudflare-blocked the way repo-side headless browse is): the live profile now shows `(216) 300-4121`, A+ accredited since 5/29/2015. New owner-only flags found on this recheck, unrelated to phone cleanup: the profile lists "Termite Control" and "Termite Inspections" among Business Categories even though LongPro does WDI/VA inspections but not termite *treatment*, and it publicly shows "Mr. Sean A. Long, Owner" under Business Management/Principal Contacts, which runs against the site's own no-personal-names privacy stance. Both need an owner BBB-account edit, not a repo fix. |
| A Greater Town | Listing appears in search results, but source-specific searches still did not show an old phone snippet. | (216) 294-2843 | Check direct listing before requesting correction. | Listing contact/correction path. | needs_access | Rechecked 2026-06-20: direct listing, homepage, `/contact`, `/about`, `/privacy`, and `sitemap.xml` all challenged repo-side headless browse with Cloudflare 403s. Rechecked 2026-06-30 via a non-headless fetch path that is not subject to the same Cloudflare block: the direct listing is now visible and confirms a stale `Contact Telephone: (216) 294-2843`, plus a "Date of Company Formation: 2012" claim that doesn't match the site's own "since 2013" framing. No public edit/claim link was visible on the fetched page, so the correction path itself still needs owner verification in a real logged-in browser. |
| AllBiz | Yahoo/Bing-powered snippet showed `Longpro Pest Control LLC | (216) 456-5452`. | (216) 456-5452 | Remove listing because it shows personal/home address and stale phone. | AllBiz edit/removal form at `user.allbiz.com/edit/?i=US&u=longpro-pest-control-llc_10&l=en`. | requested | Submitted 2026-04-24 via browser form. Confirmation page said: "The business has successfully been edited. Please allow some time for the changes to appear." Submitted as privacy/do-not-list removal; duplicate reason was removed because AllBiz requires another AllBiz business-page URL for duplicate requests. Rechecked 2026-06-30: the listing is still unreachable from this environment (blocked the same way repo-side headless browse reported), so the 2026-04-24 request remains the latest evidence either way. |
| Yellow Pages | Yahoo/Bing-powered snippet showed `Phone: (216) 456-5452`. Direct listing confirmed stale phone and `longpropc@gmail.com`. | (216) 456-5452 | Update to target number or request removal. | Yellow Pages feedback form at `yellowpages.com/about/contact-us#contact-form`; claim flow is blocked because the listing is already claimed. | resolved | Submitted 2026-04-24 via feedback form. Confirmation modal said: "Your message was sent! Thanks for contacting Yellowpages.com!" Rechecked 2026-06-30 via direct fetch (reachable today, unlike the Cloudflare-blocked repo-side headless browse): the live listing now shows `(216) 300-4121` and `Cleveland, OH 44109` with no stale number or personal email visible. |
| Yelp | Yahoo search snippet showed Yelp listing with `Phone: (216) 294-2843`. | (216) 294-2843 | Update phone to target. | Yelp business owner login. | needs_access | Likely requires claimed business access. Rechecked 2026-06-30: `yelp.com/biz/longpro-pest-control-cleveland` returned no usable content even via direct fetch (consistent with the documented DataDome block), so this remains genuinely owner-only — confirm via a real logged-in browser at `https://biz.yelp.com/claim`. |
| Manta | Yahoo source-specific search showed Manta result blocks with `(216) 456-5452`; direct Manta profiles are Cloudflare-blocked in headless browse. | (216) 456-5452 | Update or remove stale phone number. | Manta listing correction/claim path. | needs_access | Verified 2026-04-24 from `site:manta.com` result blocks. Rechecked 2026-06-30 via direct fetch (reachable today): `https://www.manta.com/c/m1rsy7s/longpro-pest-control-llc` is marked **CLAIMED** and still shows the stale `(216) 456-5452` plus a partial street-name leak (`Oak park ave - Cleveland, OH 44109`, no house number this time, an improvement over the previously documented full `5202 Archmere Ave` but still not the business's intended hidden-address posture). Because the listing is already claimed, only the account holder (or Manta support on their behalf) can edit it — owner-only. |
| Contractors Up | Direct listing still shows `Cleveland, OH 44144`, `5202 Archmere Ave`, and `(216) 456-5452`. | (216) 456-5452 | Remove the outdated public listing, or at minimum replace the stale phone and remove the home address. | Removal form at `https://www.contractorsup.com/app/modals/business-removal.php?business_id=138021`; claim path at `https://www.contractorsup.com/signup?business_id=138021`. | resolved | Direct page rechecked 2026-05-01 and 2026-06-20: still showed the stale number and `5202 Archmere Ave`. Rechecked 2026-06-30 via direct fetch (reachable today): the live listing now shows `(216) 300-4121` and just `Cleveland, OH 44144` — no street address, no stale number. The 2026-06-20 general support-form escalation (or a provider-side fix) appears to have landed. |

## Software Pass

Implemented:

1. Machine-readable inventory: `docs/citation-cleanup-inventory.json`.
2. Citation scanner: `scripts/scan-citations.mjs`.
3. Package commands:
   - `npm run citations:self-test`
   - `npm run citations:dry-run`
   - `npm run citations:scan`
4. Latest evidence output: `docs/citation-evidence/latest.json`.
5. Correction/removal packets: `docs/citation-request-packets.md`.

Latest automated Yahoo scan, 2026-05-01:

| Old Number | Confirmed Sources |
| --- | --- |
| (216) 294-2843 | Yahoo cached snippets for longpropc.com, Chamber of Commerce, Better Business Bureau |
| (216) 456-5452 | AllBiz, Yellow Pages, Manta |

Note: `longpropc.com` direct live checks are resolved, and the direct Yahoo Local page now shows the target number. The automated scan can still surface stale Yahoo cached snippets for the live site until Yahoo recrawls.

Latest automated Yahoo scan, 2026-06-20:

| Query state | Result |
| --- | --- |
| Yahoo engine health | All six queries returned Yahoo's temporary-error page instead of usable search results. |
| Evidence file behavior | `docs/citation-evidence/latest.json` now records `queryStatus: "search_error"` and `foundOldNumber: null` for unusable pages instead of silently treating them as clean results. |
| Practical meaning | The June 20 evidence file is still useful, but as a truthful scan-health report plus text capture, not as proof that Yahoo-cleanup work is finished. |

Manual direct-page checks updated 2026-05-01:

| Source | Result |
| --- | --- |
| Yahoo Local | Direct listing now shows `(216) 300-4121` and the current public hours. Treat the listing itself as resolved. |
| Manta | Source-specific Yahoo result blocks show `(216) 456-5452`; direct Manta profile pages are Cloudflare-blocked in headless browse. |
| A Greater Town | Source-specific Yahoo snippets do not expose an old number; direct page is Cloudflare-blocked in headless browse. |
| Contractors Up | Direct listing still confirms `(216) 456-5452`, still exposes `5202 Archmere Ave`, and still offers no-login `Report incorrect details` / `Request removal` paths. |

Manual direct-page checks updated 2026-06-20:

| Source | Result |
| --- | --- |
| Yahoo Local | Direct listing still shows `Phone: (216) 300-4121`, `longpropc.com`, and `Cleveland, OH 44109`. Treat Yahoo Local itself as resolved. |
| Contractors Up | Direct public HTML still shows `5202 Archmere Ave`, `Cleveland, OH 44144`, `(216) 456-5452`, and `longpropc.com`. This remains the worst confirmed live citation issue. On 2026-06-20 the site also accepted three escalation attempts: a fresh removal request POST, a fresh incorrect-details POST, and a general support contact submission that returned `Thank you for contacting us!` / `Your message has been received. We will respond within 1 business day.` |
| Yellow Pages | Listing page, contact page, and claim page all returned Cloudflare 403s in current repo-side rechecks. Today's run cannot confirm current public content or reach the owner help surfaces. |
| Yelp | Public listing still blocks current repo-side checks with DataDome, but `https://business.yelp.com/` and `https://biz.yelp.com/claim` are reachable and expose the owner claim flow plus support phone `(877) 767-9357`. |
| Chamber of Commerce | Listing page and dispute request form both returned Cloudflare 403s in current repo-side rechecks. Today's run cannot confirm current public content or reach the prior correction path. |
| BBB | Current headless recheck stops at Cloudflare verification. Today's repo-side run cannot confirm current public content. |
| AllBiz | Listing, support article, support request form, and contact page all returned Cloudflare 403s in current repo-side rechecks. Today's run cannot confirm current public content or reach the prior support surfaces. |
| Manta | Direct listings, category page, official contact page, FAQ, and claim/listing pages are all Cloudflare-challenged in current repo-side checks. |
| A Greater Town | Direct listing and core site pages are all Cloudflare-challenged in current repo-side checks; only `robots.txt` remained reachable. |

## Phase 4 Authority Split (2026-06-20)

### Agent-executable now

| Item | Why it belongs here | Current repo-side state |
| --- | --- | --- |
| Citation evidence refresh | No owner login required; uses the repo scanner and required browse CLI. | Re-ran `npm run citations:self-test` and `npm run citations:scan` on 2026-06-20. Fresh evidence is in `docs/citation-evidence/latest.json`. |
| Citation scanner hardening | Repo-only code work. | `scripts/scan-citations.mjs` now marks unusable Yahoo error pages as `queryStatus: "search_error"` instead of treating them like clean results. |
| Citation tracker / request packet upkeep | Pure documentation work inside the repo. | Tracker and request materials can be kept current from public scans and historical submission records. |
| Public no-login rechecks | Some surfaces can be verified without account access. | Yahoo Local is still resolved on the direct page. Contractors Up is still stale and still leaking the home address publicly. Several other directories now block headless verification, which is itself important to document. |
| Site-side profile wiring after verification | Repo-only follow-through once public profile URLs or final states are confirmed. | `sameAs` already includes BBB and the Google Business Profile share link; add more only if verified public profiles become durable trust assets worth surfacing. |

### Waiting on provider processing

| Source | Current state | Why it stays in waiting |
| --- | --- | --- |
| BBB | Prior correction request is still the latest confirmed action. Current headless recheck is blocked. | Correction request was already submitted 2026-04-24, but Yahoo can no longer be trusted as proof one way or the other today. |
| Chamber of Commerce | Prior correction request is still the latest confirmed action. Current listing and dispute-form rechecks are blocked. | Correction request was already submitted 2026-04-24, but current repo-side verification cannot see the live content or reopen the dispute form. |
| AllBiz | Prior removal request is still the latest confirmed action. Current listing and support-surface rechecks are blocked. | Wait for provider change or use a normal browser if urgent. |
| Yellow Pages | Prior feedback request is still the latest confirmed action. Current headless recheck is blocked. | Owner edit path is still the best route if the listing needs urgent confirmation or correction. |
| Contractors Up | Direct page still shows `(216) 456-5452` and `5202 Archmere Ave`. | Prior request still appears unprocessed. This remains an active watch item, not a theoretical one. |

### Owner-only or login-required

| Item | Blocking reason | Recommended owner action |
| --- | --- | --- |
| Yelp verification | The public listing is blocked by DataDome from the current environment, but the owner portal is reachable. | Start at `https://biz.yelp.com/claim` or `https://business.yelp.com/`, claim or open the business page in a normal browser, then confirm the live public phone is `(216) 300-4121`. Yelp for Business also advertises support at `(877) 767-9357`. |
| Manta cleanup | Direct listings plus official support/claim surfaces are all Cloudflare-blocked from the current environment. | Open the canonical Manta listing and Manta contact/claim surfaces in a normal browser or owner session, then request removal or correction of the `(216) 456-5452` listing and any private-address exposure. |
| A Greater Town verification | Direct listing plus core site pages are Cloudflare-challenged from the current environment. | Open the direct listing in a normal browser, confirm whether an old number or home address is still exposed, then correct or remove if needed. |
| Google Business Profile completion | Already claimed, but profile completion requires business-owner access and real business assets. | Finish the secondary categories, full service-area list, service descriptions, and fresh photo uploads from `docs/gbp-gsc-setup.md`. |

## Request Template

Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control listing on your site.

The listing currently shows an outdated phone number:

- OLD: [old number]

Please update the listing to the current business phone number:

- CURRENT: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

If you cannot update the number, please remove the outdated phone number from the public listing.

Thank you.

## Submission Log

### Yahoo Local

Source: Yahoo Local
Submitted date: Not submitted
Submitted by: Not needed
Path used: Direct public listing recheck at `https://local.yahoo.com/info-150974675-longpro-pest-control-cleveland`
Old number: Historical `(216) 294-2843`
Requested new number: Not needed; listing currently shows `(216) 300-4121`
Confirmation number/email: None
Status: resolved
Notes: Rechecked 2026-05-01 using the required browse CLI. The direct Yahoo Local page now shows `(216) 300-4121` plus the current public hours, so no owner action is needed unless the direct listing regresses later.

### Contractors Up

Source: Contractors Up
Submitted date: 2026-04-24
Submitted by: Codex / browser form
Path used: `https://www.contractorsup.com/app/modals/business-removal.php?business_id=138021`
Old number: (216) 456-5452
Requested new number: Removal requested; fallback requested update to (216) 300-4121 and removal of old/private street address
Confirmation number/email: None shown.
Status: requested
Notes: Direct listing at `https://www.contractorsup.com/138021/long-pro-pest-control` shows `(216) 456-5452` plus `5202 Archmere Ave`. Submitted requester name `LongPro Pest Control LLC`, requester email `longpropc@gmail.com`, reasons `owner_request` and `other`, and a details message asking removal or fallback correction. The site response at `/app/modals/business-removal.php` echoed the submitted POST fields as a raw PHP array and then re-rendered a blank form; it did not show a normal success banner. Treat as submitted but unconfirmed, and rescan or use the claim path if the listing remains unchanged.

Update 2026-06-20: Re-submitted the removal form with a stronger privacy-focused request, re-submitted the `Report incorrect details` form requesting deletion of `5202 Archmere Ave`, correction of `(216) 456-5452` to `(216) 300-4121`, and removal of the incorrect map, and then escalated through the general support form at `https://www.contractorsup.com/app/modals/contact.php`. The removal and report forms still only echoed the posted payload back in a raw debug-style `<pre>array(...)` block, so they remain unconfirmed. The general support form returned a real confirmation: `Thank you for contacting us!` and `Your message has been received. We will respond within 1 business day.` Treat that support escalation as the strongest confirmed 2026-06-20 submission.

### LongPro Live Site

Source: longpropc.com
Submitted date: 2026-04-24
Submitted by: Codex / Wrangler
Path used: `npx wrangler deploy`
Old number: (216) 294-2843
Requested new number: (216) 300-4121
Confirmation number/email: Cloudflare Worker version `30266bc7-9982-4ecb-879d-0c97a186466b`.
Status: resolved
Notes: `https://longpropc.com/`, `https://www.longpropc.com/`, and `https://longpropc.com/contact/` each returned HTTP 200 with zero matches for `(216) 294-2843` / `+12162942843` and visible/schema matches for `(216) 300-4121` / `+12163004121`. Wrangler auth is associated with `longpropc@gmail.com`. `wrangler secret list` returned no configured secrets, so PestPro lead-intake vars still need separate setup if the contact endpoint should forward leads.

### AllBiz

Source: AllBiz
Submitted date: 2026-04-24
Submitted by: Fuzzy / browser form
Path used: AllBiz edit/removal form at `user.allbiz.com/edit/?i=US&u=longpro-pest-control-llc_10&l=en`
Old number: (216) 456-5452
Requested new number: Removal / do not list online
Confirmation number/email: No confirmation number shown. Browser page showed: "The business has successfully been edited. Please allow some time for the changes to appear."
Status: requested
Notes: The first attempt failed because `Duplicate` was selected and `https://www.longpropc.com/` was entered as the duplicate URL. AllBiz validates that field as another AllBiz business-page URL, so the final submission used `Privacy` plus `I do not want my business listed online` instead.

### Yellow Pages

Source: Yellow Pages
Submitted date: 2026-04-24
Submitted by: Fuzzy / browser feedback form
Path used: Yellow Pages feedback form at `yellowpages.com/about/contact-us#contact-form`
Old number: (216) 456-5452
Requested new number: (216) 300-4121, or remove the outdated public phone if the claimed account blocks correction
Confirmation number/email: No confirmation number shown. Browser modal showed: "Your message was sent! Thanks for contacting Yellowpages.com!"
Status: requested
Notes: Claim flow was blocked because the listing was already claimed. Direct listing still showed `(216) 456-5452` and `longpropc@gmail.com`. Feedback request referenced listing URL `https://www.yellowpages.com/cleveland-oh/mip/long-pro-pest-control-480720634`.

### Chamber of Commerce

Source: Chamber of Commerce
Submitted date: 2026-04-24
Submitted by: Fuzzy / browser contact form
Path used: Chamber contact form at `chamberofcommerce.com/request-contact?help=Dispute&id=1335288254&name=LongPro%20Pest%20Control%20Co.`
Old number: (216) 294-2843
Requested new number: (216) 300-4121, or remove the outdated public phone if Chamber cannot update it
Confirmation number/email: No confirmation number shown. Browser banner showed: "Your Message Has Been Sent."
Status: requested
Notes: Direct listing at `https://www.chamberofcommerce.com/business-directory/ohio/brooklyn/pest-control-service/1335288254-longpro-pest-control-co` showed stale phone `216-294-2843`. Form required reCAPTCHA; first submit attempt showed "Please Complete the Captcha First" until CAPTCHA was completed again.

### BBB

Source: Better Business Bureau
Submitted date: 2026-04-24
Submitted by: Fuzzy / local BBB contact form
Path used: BBB Serving Greater Cleveland `Email this BBB` form at `bbb.org/local-bbb/bbb-serving-greater-cleveland`
Old number: (216) 294-2843
Requested new number: (216) 300-4121, or remove the outdated public phone if BBB cannot update it
Confirmation number/email: No confirmation number shown. Browser modal showed: "Your message was successfully sent to the BBB Serving Greater Cleveland."
Status: resolved
Notes: Direct BBB profile at `https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736` showed stale phone `(216) 294-2843`. The `My BBB` path led to account login, so the correction was submitted through the local BBB office contact form instead. Update 2026-06-30: direct fetch (not Cloudflare-blocked from this environment) confirms the live profile now shows `(216) 300-4121`. Two new, unrelated owner-only flags surfaced on this profile: it lists "Termite Control"/"Termite Inspections" as business categories (LongPro does WDI/VA inspections but not termite treatment) and it publicly names "Mr. Sean A. Long, Owner" — see `docs/local-authority-follow-through-2026-06-30.md`.

## Next Step

See `docs/local-authority-follow-through-2026-06-30.md` for the current full Phase 4 split (citations + GBP + Yelp + directories), written after the 2026-06-30 GBP ownership recovery and a fresh round of direct-fetch citation verification. Short version:

1. Owner side: GBP setup (now unblocked — see `gbp-setup-checklist-2026-06-30.md`) is the highest-leverage item. Then Manta (claimed listing, stale number + partial address leak) and A Greater Town (stale number, no visible self-serve correction path), plus Yelp/Chamber of Commerce/AllBiz which remain genuinely inaccessible without a logged-in browser.
2. Repo side: rescan citations after provider processing windows or owner-side fixes and keep `docs/citation-evidence/latest.json` plus this tracker current. Contractors Up, Yellow Pages, and BBB phone corrections are now confirmed live and can drop off the active watch list.
3. Separate from citation work: if the website contact form should forward leads into PestPro, configure the Cloudflare Worker vars/secrets for `PESTPRO_LEADS_URL` and the intake token.
