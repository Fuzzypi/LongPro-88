# Citation Browser Submission Handoff

Created: 2026-04-24

## Goal

Use a normal browser to update or remove stale LongPro Pest Control phone numbers from confirmed external listings. The target public/CalenCall number is:

- CURRENT: `(216) 300-4121`
- E.164: `+12163004121`
- Website: `https://longpropc.com`
- Business name: `LongPro Pest Control LLC`
- Service area: `Cleveland, OH and surrounding areas`

Do not deploy the website from this handoff. Deployment is still separate because Cloudflare auth was not available in the repo shell.

## New Conversation Starter

Use this to start the next conversation:

```text
We are in /Users/fuzzypi/Desktop/LongPro-88. Continue LongPro citation cleanup. Open docs/citation-cleanup-tracker.md and docs/citation-request-packets.md. AllBiz, Yellow Pages, Chamber, and BBB requests have already been submitted. Current priority is Yahoo Local owner verification, Contractors Up correction/removal request, and normal-browser direct verification for Manta and A Greater Town because headless browsing is blocked by Cloudflare on those direct pages. After each submission, note the date, method, confirmation number/email if any, and rerun npm run citations:scan when appropriate.
```

## Priority Order

1. Yahoo Local: direct listing still shows `(216) 294-2843`; `Verify your listing` routes to Yellow Pages claim-yahoo-business-listing and needs owner/normal-browser verification.
2. Contractors Up: direct listing confirms `(216) 456-5452` and `5202 Archmere Ave`; removal request POST was submitted 2026-04-24, but response only echoed submitted fields as a raw PHP array with no success banner.
3. Manta: Yahoo/Manta result blocks confirm `(216) 456-5452`, but direct Manta pages are Cloudflare-blocked in headless browse.
4. A Greater Town: source-specific Yahoo snippets do not expose an old number, and direct page is Cloudflare-blocked in headless browse.
5. Rescan AllBiz, Yellow Pages, Chamber, and BBB later after provider review windows.

Current browser handoff: a visible browser was opened on 2026-04-24 at `https://www.yellowpages.com/claim-yahoo-business-listing?n=LongPro%20Pest%20Control&c=Cleveland&s=OH`. Resume after the user completes any Cloudflare check, login, CAPTCHA, or owner verification.

## Submission Packets

### 1. AllBiz

- Listing: https://www.allbiz.com/business/longpro-pest-control-llc-216-456-5452
- Support/edit paths:
  - https://support.allbiz.com/hc/en-us/articles/13840157310477-How-do-I-Edit-a-Business
  - https://support.allbiz.com/hc/en-us/requests/new
  - https://www.allbiz.com/contact
- Old number to remove/update: `(216) 456-5452`
- New number: `(216) 300-4121`

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control listing on AllBiz.

The listing currently shows an outdated phone number:

- OLD: (216) 456-5452

Please update the listing to the current business phone number:

- CURRENT: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

If you cannot update the number, please remove the outdated phone number from the public listing.

Thank you.
```

### 2. Yellow Pages

- Listing: https://www.yellowpages.com/cleveland-oh/mip/long-pro-pest-control-480720634
- Claim/contact paths:
  - https://www.yellowpages.com/claim-your-listing
  - https://www.yellowpages.com/about/contact-us
- Old number to remove/update: `(216) 456-5452`
- New number: `(216) 300-4121`

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control listing on Yellow Pages.

The listing currently shows an outdated phone number:

- OLD: (216) 456-5452

Please update the listing to the current business phone number:

- CURRENT: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

If you cannot update the number, please remove the outdated phone number from the public listing.

Thank you.
```

### 3. Chamber of Commerce

- Listing: https://www.chamberofcommerce.com/business-directory/ohio/brooklyn/pest-control-service/1335288254-longpro-pest-control-co
- Old number to remove/update: `(216) 294-2843`
- New number: `(216) 300-4121`

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control listing on Chamber of Commerce.

The listing currently shows an outdated phone number:

- OLD: (216) 294-2843

Please update the listing to the current business phone number:

- CURRENT: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

If you cannot update the number, please remove the outdated phone number from the public listing.

Thank you.
```

### 4. Better Business Bureau

- Listing: https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-company-0312-92014736
- Old number to remove/update: `(216) 294-2843`
- New number: `(216) 300-4121`

Message:

```text
Subject: Correct LongPro Pest Control phone number

Hello,

I am requesting a correction to the LongPro Pest Control business profile on BBB.

The profile currently shows an outdated phone number:

- OLD: (216) 294-2843

Please update the profile to the current business phone number:

- CURRENT: (216) 300-4121
- Website: https://longpropc.com
- Business name: LongPro Pest Control LLC
- Service area: Cleveland, OH and surrounding areas

If you cannot update the number, please remove the outdated phone number from the public profile.

Thank you.
```

## Submission Log Template

Add each submission here or to `docs/citation-cleanup-tracker.md`:

```text
Source:
Submitted date:
Submitted by:
Path used:
Old number:
Requested new number:
Confirmation number/email:
Status: requested | pending | resolved | blocked
Notes:
```

## Verify Later

Run:

```sh
npm run citations:scan
```

Then summarize current hits:

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

Current confirmed hits before browser submissions:

```text
allbiz: (216) 456-5452
bbb: (216) 294-2843
chamber: (216) 294-2843
longpro-live-site: (216) 294-2843
yellow-pages: (216) 456-5452
```
