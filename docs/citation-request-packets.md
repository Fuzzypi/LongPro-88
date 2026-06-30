# LongPro Citation Request Packets

Created: 2026-04-24

Use these packets when submitting corrections or removals. The target public number is `(216) 300-4121`.

## Resolved — no further action needed

Active as of 2026-06-20, rechecked 2026-06-30 via a direct fetch path not subject to the Cloudflare block that stopped repo-side headless browse on these three. All now show the correct live number — keep the historical packets below for reference only, no resubmission needed.

- **Contractors Up** — listing now shows `(216) 300-4121` and just `Cleveland, OH 44144` (no street address).
- **Yellow Pages** — listing now shows `(216) 300-4121`, `Cleveland, OH 44109`, no personal email.
- **Better Business Bureau (phone only)** — profile now shows `(216) 300-4121`. Two unrelated open items remain — see "Better Business Bureau (new, 2026-06-30)" below.

## Confirmed External Listings

### AllBiz

- Listing: https://www.allbiz.com/business/longpro-pest-control-llc-216-456-5452
- Old number shown: `(216) 456-5452`
- Requested action: update to `(216) 300-4121`; if update is unavailable, remove the outdated phone number.
- Correction paths:
  - https://support.allbiz.com/hc/en-us/articles/13840157310477-How-do-I-Edit-a-Business
  - https://support.allbiz.com/hc/en-us/requests/new
  - https://www.allbiz.com/contact
- Note: Rechecked 2026-06-20. The listing, support article, support request form, and contact page all returned Cloudflare 403 responses from the current environment. Use a normal owner browser if urgent.

### Yellow Pages — RESOLVED 2026-06-30, see above

### Contractors Up — RESOLVED 2026-06-30, see above

### Manta — ready to submit, owner login required

- Confirmed live 2026-06-30 via direct fetch (this listing is reachable from this environment; it just can't be edited without the account that claimed it):
  - https://www.manta.com/c/m1rsy7s/longpro-pest-control-llc — marked **CLAIMED**, shows `(216) 456-5452` and a partial address leak `Oak park ave - Cleveland, OH 44109` (no house number, smaller leak than the previously documented full `5202 Archmere Ave`, but still not the business's hidden-address posture).
  - Other candidate URLs not rechecked today: https://www.manta.com/c/mkjjmng/longpro-pest-control, https://www.manta.com/mb_55_AA15605K_G0V/pest_control_services/cleveland_oh?show_all_cities=1
- Requested action: update phone to `(216) 300-4121` and remove the `Oak park ave` street reference entirely (the business intentionally keeps its street address private).
- Correction path: listing is claimed, so editing requires logging into the Manta account that holds the claim (`https://www.manta.com/member/login`) or using `Claim My Listing` at `https://www.manta.com/business-listings/add-your-company` if the original claiming account is unknown/inaccessible.

Message:

```text
Subject: Correct LongPro Pest Control listing details

Hello,

I am the owner of LongPro Pest Control LLC and need to correct our Manta listing.

The listing currently shows outdated information:

- OLD PHONE: (216) 456-5452
- CURRENT PHONE: (216) 300-4121
- The listing also shows a partial street reference ("Oak park ave") that should be removed entirely — we are a service-area business and do not publish a street address.
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

Please update the phone number and remove the street reference. Thank you.
```

### A Greater Town — confirmed stale, correction path still needs owner verification

- Confirmed live 2026-06-30 via direct fetch:
  - https://agreatertown.com/cleveland-oh/longpro-pest-control-0001636885848 — shows stale `Contact Telephone: (216) 294-2843` and `Contact Email: info@longpropc.com`, plus a "Date of Company Formation: 2012" claim that doesn't match the site's "since 2013" framing.
- Requested action: update phone to `(216) 300-4121`; consider whether the formation-date claim needs correcting too.
- Correction path: no self-serve edit/claim link was visible on the fetched listing page itself. The page shows `Contact Longpro Pest Control` and `Publish` links in the header (`https://agreatertown.com/contact?a=745644&p=1636885848` and `https://agreatertown.com/user/register_prompt/free_pass`) — try the contact link first; if that doesn't reach a correction form, a normal logged-in browser session may be needed to find the actual edit/claim flow.

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the Longpro Pest Control listing on A Greater Town.

The listing currently shows an outdated phone number:

- OLD PHONE: (216) 294-2843
- CURRENT PHONE: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

Please update the listing to the current phone number. Thank you.
```

## Confirmed Website/Listings For Old Website Number

### Yelp

- Public listing: https://www.yelp.com/biz/long-pro-pest-control-cleveland
- Historical old number shown: `(216) 294-2843`
- Requested action: confirm the live public page now shows `(216) 300-4121`; if not, correct it through the owner page.
- Owner paths:
  - https://business.yelp.com/
  - https://biz.yelp.com/claim
- Note: Rechecked 2026-06-20. The public listing still blocked repo-side verification with DataDome / `Please enable JS and disable any ad blocker`, but the Yelp for Business portal remained reachable and exposed `Verify my free listing`, `Log in`, and support phone `(877) 767-9357`.

### Chamber of Commerce

- Listing: https://www.chamberofcommerce.com/business-directory/ohio/brooklyn/pest-control-service/1335288254-longpro-pest-control-co
- Old number shown: `(216) 294-2843`
- Requested action: update to `(216) 300-4121`.
- Likely requirement: owner claim, listing correction, or support request.
- Note: Rechecked 2026-06-20. The public listing and prior dispute path `https://www.chamberofcommerce.com/request-contact?help=Dispute&id=1335288254&name=LongPro%20Pest%20Control%20Co.` both returned Cloudflare 403 responses from the current environment. Use a normal owner browser if you need to reopen the correction path.

### Better Business Bureau — phone RESOLVED 2026-06-30, see above

### Better Business Bureau (new, 2026-06-30)

Confirmed live via direct fetch. Phone is already correct; these are two new, unrelated items found on the same profile:

- Listing: https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736
- Issue 1: Business Categories include "Termite Control" and "Termite Inspections." LongPro performs WDI/VA inspections but does not perform termite *treatment* — these categories overclaim a service the business doesn't offer.
- Issue 2: "Business Management" and "Principal Contacts" publicly show "Mr. Sean A. Long, Owner." The site's own published content avoids naming the owner/technicians for privacy reasons; this BBB field runs counter to that.
- Requested action: in the BBB business profile editor, remove the termite categories (keep Pest Control Services, Bed Bug Removal, Exterminator, Flea And Tick — drop Termite Control and Termite Inspections) and check whether the owner-name field can be hidden or left blank.
- Correction path: requires `My BBB` account login for the business profile (not the public "Email this BBB" contact form used for the phone correction).

## Request Message

Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control listing on your site.

The listing currently shows an outdated phone number:

- OLD: `[old number]`

Please update the listing to the current business phone number:

- CURRENT: `(216) 300-4121`
- Website: `https://longpropc.com`
- Business name: `LongPro Pest Control LLC`
- Service area: `Cleveland, OH and surrounding areas`

If you cannot update the number, please remove the outdated phone number from the public listing.

Thank you.

## Verification Commands

Run after submitting each correction:

```sh
npm run citations:scan
```

Then check:

```sh
node - <<'NODE'
const data = require('./docs/citation-evidence/latest.json');
const bySource = new Map();
for (const q of data.queries) {
  for (const source of q.matchedSources) {
    if (!bySource.has(source.sourceId)) bySource.set(source.sourceId, new Set());
    bySource.get(source.sourceId).add(q.oldNumber.display);
  }
}
for (const [source, phones] of [...bySource.entries()].sort()) {
  console.log(`${source}: ${[...phones].join(', ')}`);
}
NODE
```
