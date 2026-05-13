# LongPro Citation Request Packets

Created: 2026-04-24

Use these packets when submitting corrections or removals. The target public number is `(216) 300-4121`.

## Confirmed External Listings

### AllBiz

- Listing: https://www.allbiz.com/business/longpro-pest-control-llc-216-456-5452
- Old number shown: `(216) 456-5452`
- Requested action: update to `(216) 300-4121`; if update is unavailable, remove the outdated phone number.
- Correction paths:
  - https://support.allbiz.com/hc/en-us/articles/13840157310477-How-do-I-Edit-a-Business
  - https://support.allbiz.com/hc/en-us/requests/new
  - https://www.allbiz.com/contact
- Note: AllBiz support was visible in Yahoo results, but the support article showed a Cloudflare verification page in the headless browser. Use a normal owner browser if the automated browser is blocked.

### Yellow Pages

- Listing: https://www.yellowpages.com/cleveland-oh/mip/long-pro-pest-control-480720634
- Old number shown: `(216) 456-5452`
- Requested action: update to `(216) 300-4121`; if update is unavailable, remove the outdated phone number.
- Correction paths:
  - https://www.yellowpages.com/claim-your-listing
  - https://www.yellowpages.com/about/contact-us
- Note: Yellow Pages blocked the headless browser with Cloudflare. Use a normal owner browser and expect listing claim or verification.

### Contractors Up

- Listing: https://www.contractorsup.com/138021/long-pro-pest-control
- Old number shown: `(216) 456-5452`
- Other stale/private details shown: `5202 Archmere Ave`
- Requested action: update the public phone to `(216) 300-4121`; if the listing cannot be corrected safely, remove the outdated listing.
- Correction paths:
  - https://www.contractorsup.com/app/modals/business-report.php?business_id=138021
  - https://www.contractorsup.com/signup?business_id=138021
- Note: Direct report form is reachable without login, but requires requester name, email, owner yes/no, and additional details. Do not submit until the requester email/owner fields are confirmed.

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the Long Pro Pest Control listing on Contractors Up.

The listing currently shows an outdated phone number and old address details:

- OLD PHONE: (216) 456-5452
- CURRENT PHONE: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

Please update the listing to the current phone number. If the address/phone details cannot be corrected, please remove the outdated public listing.

Thank you.
```

### Manta

- Candidate listings:
  - https://www.manta.com/c/m1rsy7s/longpro-pest-control-llc
  - https://www.manta.com/c/mkjjmng/longpro-pest-control
  - https://www.manta.com/mb_55_AA15605K_G0V/pest_control_services/cleveland_oh?show_all_cities=1
- Old number shown in Yahoo/Manta result blocks: `(216) 456-5452`
- Requested action: update to `(216) 300-4121`; if update is unavailable, remove the outdated phone number.
- Note: Direct Manta pages are blocked by Cloudflare in headless browse. Use a normal owner browser to verify the direct page and correction/claim path before submitting.

## Confirmed Website/Listings For Old Website Number

### Chamber of Commerce

- Listing: https://www.chamberofcommerce.com/business-directory/ohio/brooklyn/pest-control-service/1335288254-longpro-pest-control-co
- Old number shown: `(216) 294-2843`
- Requested action: update to `(216) 300-4121`.
- Likely requirement: owner claim, listing correction, or support request.

### Better Business Bureau

- Listing: https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736
- Old number shown: `(216) 294-2843`
- Requested action: update to `(216) 300-4121`.
- Likely requirement: BBB business profile owner access or support request.

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
