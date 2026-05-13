# LongPro Directory Citation Buildout

Created: 2026-05-13

## Purpose

This is the owner-action checklist for building new local-authority citations and claiming existing directory listings. It complements `docs/citation-cleanup-tracker.md`, which is focused on stale phone-number cleanup.

Creating or claiming these listings is not repo-executable. The work changes public third-party business profiles and normally requires owner email access, phone/SMS verification, payment decisions, license details, or dashboard login.

## Canonical NAP

Use this exact public business identity everywhere:

| Field | Value |
| --- | --- |
| Business name | LongPro Pest Control LLC |
| Public phone | (216) 300-4121 |
| E.164 phone | +12163004121 |
| Website | https://longpropc.com |
| Public address | Cleveland, OH 44109 |
| Service area | Cleveland, OH and surrounding communities |
| Primary category | Pest Control Service |
| Secondary services | Bed bug extermination, cockroach extermination, ant and spider control, flea extermination, general residential pest control |
| Public email | info@longpropc.com |

Do not publish the old home/street address from stale citations. Use service-area business settings when a platform supports them. If a platform requires a street address before publishing, pause and confirm the owner-approved address strategy before proceeding.

## Listing Buildout Queue

| Directory | Current public evidence | Priority | Owner action | NAP rule |
| --- | --- | --- | --- | --- |
| Yelp | Existing stale-citation work indicates Yelp still needs owner-dashboard access for the phone fix. | High | Claim or log into Yelp for Business, correct phone to `(216) 300-4121`, set website, service category, service area, hours, and photos. | Use exact canonical NAP; do not reintroduce `(216) 294-2843`. |
| Angi | No confirmed owned LongPro profile in repo evidence. | High | Create or claim the Angi pro listing only if the owner accepts Angi lead-gen terms. Fill the public profile with canonical NAP and service-area language. | Keep phone as `(216) 300-4121`; avoid duplicate variants like `Long Pro`. |
| HomeAdvisor | HomeAdvisor is an Angi-owned lead-gen surface; profile creation may create paid lead obligations. | High | Create or claim only after reviewing billing/lead terms in the owner account. If created, mirror Angi NAP exactly. | Use canonical NAP; document any paid-lead settings. |
| Thumbtack | No confirmed owned LongPro profile in repo evidence. | High | Create or claim a pro profile, verify phone/email, add the exact services, service radius, and photos. | Use service-area setup and canonical phone. |
| Nextdoor | Public search evidence on 2026-05-13 shows a LongPro Pest Control LLC Nextdoor page already exists. | High | Claim the existing page from the business owner account, verify phone/website/hours, and add photos/posts. | Preserve the existing page if possible; do not create a duplicate. |
| Houzz | No confirmed owned LongPro profile in repo evidence. | Medium | Create or claim a Houzz pro profile only if pest control is accepted for the local-service category. Add canonical NAP and project/service photos where appropriate. | Use canonical NAP; avoid home address publication. |
| MapQuest | Public search evidence on 2026-05-13 shows a MapQuest result for Longpro Pest Control in Cleveland, OH 44109. | High | Claim or correct the existing MapQuest listing through the available business-listing path, then verify phone and website. | Preserve the listing if accurate; correct stale phone/address if shown. |
| YellowPages | Existing stale-citation tracker shows the listing was already claimed and a feedback request was submitted on 2026-04-24. | High | Owner must log into the claimed YellowPages account or use support to correct the listing. | Replace `(216) 456-5452` with `(216) 300-4121`; remove old/private address if present. |
| Ohio Pest Management Association | OPMA member directory is live at `https://www.ohiopma.org/member-directory`; membership/profile management appears tied to MemberClicks login. | High | Join OPMA or log into the member account, then complete the public member-directory profile. | Use canonical NAP and service-area language; verify the public directory page after approval. |

## Browser Execution Update - 2026-05-13

The owner approved account creation and claim attempts, but explicitly prohibited publishing or uploading a home/street address. Public location must remain service-area only: `Cleveland, OH 44109`. The public phone is `(216) 300-4121`; SMS verification cannot currently be received on that number while the Twilio approval is pending.

| Directory | Result | Evidence / blocker | Next action |
| --- | --- | --- | --- |
| Yelp | Verified / claimed | Yelp for Business showed LongPro claimed with phone `(216) 300-4121`, website `https://www.longpropc.com`, and public location `Cleveland, OH 44109`. No street address was visible. | Monitor public listing and later standardize name to `LongPro Pest Control LLC` if Yelp permits without triggering re-verification. |
| YellowPages | Verified / claimed | YellowPages listing showed claimed status, phone `(216) 300-4121`, website `longpropc.com`, and location `Cleveland, OH 44109`. No street address was visible. | Recheck public listing after provider cache updates. |
| MapQuest / Yext | Blocked | Direct MapQuest search did not find a confirmed LongPro listing. The Yext claim path required agreeing to Yext/partners contacting the business phone for marketing, including automated dialing. | Skip unless the owner explicitly approves the Yext marketing-call consent. |
| Nextdoor | Blocked by address requirement | Started a business-page claim/create flow with `longpropc@gmail.com`; selected `LongPro Pest Control LLC` and disabled public address display. Nextdoor rejected `Cleveland, OH 44109` and required a valid street address. | Do not continue unless the owner approves a non-home address strategy. |
| Thumbtack | Started, blocked by SMS | Started pro signup with `longpropc@gmail.com` for pest control and public phone `(216) 300-4121`. The flow reached phone verification; the 216-300 number cannot currently receive SMS. No street address was submitted and no paid plan was selected. | Resume only after the Twilio number can receive verification texts, or use an owner-approved alternate verification phone if Thumbtack allows it. |
| Angi | Blocked by owner/lead-network requirements | Current Angi Pro signup is a lead-network flow. It accepted pest control and ZIP `44109`, then asked for the business owner first/last name. No street address or payment was submitted. | Continue only after the owner supplies the legal owner/contact name and approves Angi lead-gen terms. |
| HomeAdvisor | Blocked by Angi lead-network flow | HomeAdvisor Pro redirects into an Angi-style signup flow. ZIP was corrected to `44109`, but the flow is the same lead-network onboarding and may create paid lead obligations. | Treat as Angi-owned lead-gen; continue only with owner approval for terms and spend settings. |
| Houzz | Blocked by address requirement | Houzz Pro account onboarding was started with `longpropc@gmail.com`. Business name, website, and phone were entered, and SMS marketing opt-in was unchecked. Houzz then required `Address Line 1` before continuing. | Stop. Houzz is a weak category fit and cannot be completed without uploading a street address. |
| OPMA | Blocked by paid membership/application | OPMA directory search returned `0 results` for LongPro. OPMA directory presence appears tied to paid Active membership; Active membership requires Ohio pest-control licensing, dues based on sales volume, proof of insurance, and verification that the company has been in business at least one year. | Owner decides whether to join OPMA and supply license/insurance/dues information. |

No home/street address was submitted during these attempts. Do not use the browser-suggested saved address in any directory flow.

## Standard Description

Use this as the starting description, shortening per directory limits:

```text
LongPro Pest Control LLC provides discreet residential pest control in Cleveland, OH and surrounding communities, with service for bed bugs, cockroaches, ants, spiders, fleas, and general household pest issues. Call (216) 300-4121 or visit https://longpropc.com to request help.
```

## Verification Checklist

After each listing is created, claimed, or corrected:

1. Open the public listing while logged out or in a private window.
2. Confirm the business name is exactly `LongPro Pest Control LLC`.
3. Confirm the visible phone is exactly `(216) 300-4121`.
4. Confirm the website points to `https://longpropc.com`.
5. Confirm no stale numbers appear: `(216) 294-2843`, `(216) 456-5452`, `+12162942843`, or `+12164565452`.
6. Confirm no old/private street address is exposed.
7. Save the public listing URL and the submission/claim date in `docs/citation-cleanup-tracker.md` or a future citation evidence file.

## Recommended Order

1. Yelp, YellowPages, MapQuest, and Nextdoor first because evidence already indicates existing listings or stale citations.
2. OPMA next because it is industry-specific and can strengthen real-world authority beyond generic directories.
3. Thumbtack, Angi, and HomeAdvisor after reviewing lead-gen terms so the profiles do not create unwanted paid-lead spend.
4. Houzz last unless a pest-control profile can be created cleanly without category mismatch.

## Agent Boundary

An agent can keep this checklist current, re-scan public listings, and document public URLs after the owner completes claims. An agent should not submit listing claims, accept paid-lead terms, publish owner identity details, or expose a street address without explicit owner approval.
