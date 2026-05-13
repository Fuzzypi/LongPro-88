# Google Business Profile + Search Console Setup

Created: 2026-04-24
Target Google account: `longpropc@gmail.com`
Business type for GBP: service-area business (no storefront; address hidden)
GSC verification method: HTML meta tag in the site head

## Why this matters

The March 2026 SEO audit flagged both as "High" severity. GBP is the single biggest lever — it drives the map pack, "near me" searches, star ratings in search results, and gives AI search engines a verified entity to cite. GSC gives visibility into which queries actually rank, which pages get impressions, indexation problems, and lets us submit the sitemap. Both are also prerequisites for populating the `sameAs` schema array (currently only BBB) with trusted profiles.

## Preflight — check whether GBP already exists

Google often auto-generates a "stub" listing for businesses with BBB history. Always claim an existing listing rather than creating a new one, or you end up with two competing Knowledge Panels and nobody wins.

Do this in a normal logged-in browser as `longpropc@gmail.com`:

1. Go to https://www.google.com/maps and search: `LongPro Pest Control Cleveland OH`.
2. If a result appears, open it. Look at the bottom of the panel — if you see "Own this business?" or "Claim this business", that's an auto-generated stub. **Claim it.**
3. If Maps shows nothing, try searching `LongPro Pest Control LLC` and `Long Pro Pest Control` (the Yellow Pages listing uses the two-word spelling). Also check `(216) 294-2843` in Maps search — the old number might be tied to an existing stub.
4. Also look for an existing Google-level Knowledge Panel by searching `LongPro Pest Control Cleveland` on https://www.google.com (not Maps). A Knowledge Panel on the right side of search results indicates Google already has an entity.

Record what you find below:

```
GBP preflight, YYYY-MM-DD:
- Maps search result: [found | not found]
- Listing URL (if found):
- Listed phone on stub: [(216) 294-2843 | (216) 456-5452 | (216) 300-4121 | none]
- Claim CTA visible: [yes | no]
- Decision: [claim existing | create new]
```

## GBP setup runbook

### 1. Start

- Go to https://business.google.com (redirects to Google Business Profile dashboard).
- Sign in as `longpropc@gmail.com`.
- Click **Add business** > **Add a single business**, or **Claim this business** on the stub you found during preflight.

### 2. Business name

- Enter exactly: `LongPro Pest Control`
- Do not append keywords like "Bed Bug Exterminator Cleveland" — that violates Google's name guidelines and can get the profile suspended.

### 3. Business category

- **Primary category:** `Pest control service`
- **Secondary categories** (add after initial creation, in Profile settings):
  - `Fumigation service` (aligns with bed bug heat treatment)
  - `Exterminator` (if available as a separate category in your region)
  - `Termite control service` (only if you want to promote WDI / VA home-loan termite inspection work)

Primary category has the largest ranking impact; change it carefully later.

### 4. Location type

- When asked "Do you want to add a location customers can visit, like a store or office?" → choose **No**.
- This marks LongPro as a service-area business. Your address stays private; only the service area shows publicly.

### 5. Service area

Enter these in order (GBP caps around 20 areas; pick the highest-priority first):

1. Cleveland, OH
2. Lakewood, OH
3. Parma, OH
4. Brooklyn, OH
5. Old Brooklyn (neighborhood of Cleveland)
6. Shaker Heights, OH
7. Beachwood, OH
8. Strongsville, OH
9. Euclid, OH
10. Mentor, OH
11. Brook Park, OH
12. Tremont (neighborhood of Cleveland)
13. Slavic Village (neighborhood of Cleveland)
14. South Hills (neighborhood of Cleveland)
15. Shaker Square (neighborhood of Cleveland)
16. Cuyahoga County

You can also add `Lakewood, OH`, `Parma, OH`, etc. as their own entries rather than just the county — GBP surfaces the name exactly as entered, so city-level entries rank better for `[city] bed bug exterminator` searches.

### 6. Address (hidden)

- Enter your real business/home address for Google's records. This is for verification only; it will not display publicly because you selected service-area business in step 4.
- Double-check the "I don't want to display my address" / "Hide my address from customers" toggle is ON before saving.

### 7. Contact info

- Phone: `(216) 300-4121`
- Website: `https://longpropc.com`

### 8. Verification

Since LongPro is a service-area business, Google will most likely offer **video verification** (not postcard). You'll record a short walkthrough showing:

- Your business equipment or tools (sprayers, heat treatment gear, inspection kit)
- Signage, branded documents, or invoices with the LongPro name
- A glance at the exterior of where the business operates (address doesn't have to be visible)
- The vehicle you use (you can obscure plates) — even though it's unmarked, Google just needs to see you have operational assets

The video is typically 1–3 minutes, unedited, one take. Follow Google's in-dashboard prompts.

If Google offers postcard instead, allow 5–14 business days for mail.

### 9. Content pack — paste-ready values

#### Business description (up to 750 characters)

```
LongPro Pest Control is Cleveland's discreet bed bug and pest extermination
specialist, BBB A+ rated for 13+ years. We serve Cleveland and Cuyahoga County
with unmarked vehicles and confidential treatment, so neighbors never know you
called. Services include bed bug extermination, cockroach control, ant and
spider control, flea extermination, and general pest control. We also provide
WDI termite inspections and VA home-loan termite inspections. Most initial
inspections scheduled within 24 hours. Locally owned and operated, family
business, privacy-first approach. Call (216) 300-4121 or request a free
estimate at longpropc.com.
```

Character count: ~670, well under the 750 limit. Edit to taste but keep the privacy/discretion framing — that's the differentiator the audit identified.

Avoid: overtly repeating "Cleveland pest control" 4+ times, all-caps, emojis, exclamation marks — Google flags those.

#### Hours

- Monday: 8:00 AM – 6:00 PM
- Tuesday: 8:00 AM – 6:00 PM
- Wednesday: 8:00 AM – 6:00 PM
- Thursday: 8:00 AM – 6:00 PM
- Friday: 8:00 AM – 6:00 PM
- Saturday: 8:00 AM – 6:00 PM
- Sunday: Closed

(Matches the `openingHoursSpecification` already on the live site.)

#### Services (add each in Services tab post-verification)

For each, GBP lets you add a short description. Pull from the live service pages:

| Service name | Short description (≤300 chars) |
| --- | --- |
| Bed Bug Extermination | Discreet bed bug treatment with thorough inspection and guaranteed results. Unmarked vehicles, confidential service. |
| Cockroach Control | Professional cockroach extermination for German, American, and Oriental cockroaches in Cleveland homes. |
| Ant & Spider Control | Interior and perimeter treatment to stop ants and spiders from invading your home. |
| Flea Extermination | Break the flea lifecycle with professional treatment coordinated with pet protection. |
| General Pest Control | Year-round pest protection for common Cleveland-area pests. |
| WDI Termite Inspection | Wood-destroying insect inspections for home buyers and property transactions. |
| VA Home Loan Termite Inspection | Termite inspections meeting VA home loan requirements. |

#### Attributes to enable

- Locally owned
- Family-owned
- Online estimates (if you want — points to /contact)
- Onsite services
- Appointment required: yes
- LGBTQ+ friendly (only if accurate and you want it shown)

#### Photos to upload (day 1 minimum)

Photos are a ranking signal. Even low-stakes ones help. **Important for LongPro's brand:** don't upload anything that compromises the "discreet / unmarked" value prop. In particular, don't post a photo of a branded truck (you don't have one) or customer homes.

Safer photo options:
- Logo (upload as both logo + cover photo)
- Exterior of the unmarked vehicle (plates obscured, no customer home in background)
- Equipment staged on a neutral surface: sprayer, inspection tools, heat treatment gear, K-9 detection gear if applicable
- Before/after close-ups of bed bug signs on mattress seams or baseboards (these do very well in image search)
- Team photos — uniformed technicians in branded polos, neutral background
- BBB A+ Rated badge (you already have `bbb-badge.webp` on the site)
- Action shots of an inspection or treatment, shot tight so no personally identifying customer detail is visible

Target: 5–10 photos at creation, another 10 added over the first month. GBP weights recency.

#### Appointment link

- Set the Appointment URL to: `https://longpropc.com/contact`

This makes "Book online" show up in the profile.

#### Messaging

- Enable Google Business Messages. Expect to get inquiries. Configure an auto-response that says you'll reply within business hours.

### 10. After verification

Come back here and continue with the "Post-setup site integration" section below.

## GSC (Google Search Console) setup runbook

### 1. Start verification

- Go to https://search.google.com/search-console (sign in as `longpropc@gmail.com`).
- Click **Add property** > **URL prefix** property (not Domain — you said meta tag).
- Enter: `https://longpropc.com`
- On the verification screen, pick the **HTML tag** method.
- Copy the entire `<meta name="google-site-verification" content="..." />` tag Google shows you.
- **Paste the tag into chat.** Do NOT click "Verify" yet — the tag has to be live on the site first.

### 2. I deploy the tag

Once you paste the tag, I'll:

- Insert `<meta name="google-site-verification" content="..." />` into the `<head>` of every `dist_assets/**/*.html` right after `<meta charset="UTF-8">`. (Keeping it site-wide protects us if GSC ever reverifies from a subpath.)
- Report the exact diff back so you can eyeball it.

You'll then:

- Run `npx wrangler deploy` from `/Users/fuzzypi/Desktop/LongPro-88` to push the change.
- Confirm the meta tag is visible by running: `curl -s https://longpropc.com/ | grep google-site-verification`
- Back in Search Console, click **Verify**.

### 3. Add the `www` property too

Google treats `longpropc.com` and `www.longpropc.com` as separate URL-prefix properties. Add `https://www.longpropc.com` as a second property and verify it with the same meta tag (the tag works for both hostnames because the site serves both from the same Worker).

### 4. Submit the sitemap

After verification:

- In GSC, go to **Sitemaps** (left sidebar).
- Add: `https://longpropc.com/sitemap.xml`
- Wait a few minutes, confirm "Success" status.
- Repeat for the `www` property.

### 5. Link GSC to GA4

- In GSC, go to **Settings** > **Associations** > **Google Analytics**.
- Link the existing GA4 property (`G-Z1EH98YLZ1`).
- This surfaces Search query data in GA4 reports.

### 6. Initial data

Don't expect much for 48–72 hours — GSC only reports on crawls after verification. Useful reports to check at the 1-week mark:

- **Coverage / Pages** — verify all 18+ pages are indexed, flag any excluded.
- **Performance** — baseline impressions and average position for the site.
- **Enhancements** — schema validation results (should be green because the existing schema is well-formed).
- **Core Web Vitals** — production CWV field data (Cloudflare edge usually scores well; confirms it).

## Post-setup site integration

Once GBP is verified and GSC is connected, circle back to the site and wire it up.

### Update the LocalBusiness schema `sameAs` array

In `dist_assets/**/*.html` the LocalBusiness schema currently has:

```json
"sameAs": [
  "https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-llc-0312-92023737"
]
```

Add the public URLs of every verified profile. Target state:

```json
"sameAs": [
  "https://www.bbb.org/us/oh/cleveland/profile/pest-control/longpro-pest-control-llc-0312-92023737",
  "https://www.google.com/maps/place/?q=place_id:<GBP place ID>",
  "https://g.co/kgs/<knowledge panel slug>",
  "https://www.yelp.com/biz/<slug>",
  "https://www.facebook.com/<page slug>"
]
```

Only add URLs that are (a) fully owned/verified and (b) show the correct phone number. Don't add stale listings — you'd be schema-vouching for wrong data.

### Resolve the `alternateName` question

The live site schema currently uses `"alternateName": "The Pest Detective"`. If you set up Google Business Messages with an auto-response or appointment link, make sure the brand-voice copy is consistent with "The Pest Detective" framing on the homepage. Otherwise consider dropping the alternateName so Google isn't juggling two brand names.

### Update tracker

Mirror the submission log template from `docs/citation-cleanup-tracker.md` for these profiles too, so future follow-ups have a single source of truth.

## Submission log

Add entries as you go:

```
GBP claim
Submitted date:
Listing status at claim: [claimed existing stub | created new]
Verification method: [video | postcard | phone | other]
Verification status: [pending | verified | rejected | needs resubmission]
Place ID (after verification):
GBP profile URL:
Notes:

GSC URL-prefix verification (longpropc.com)
Submitted date:
Verification method: HTML meta tag
Meta tag content (first 12 chars only, for reference):
Verification status: [pending | verified | failed]
Sitemap submitted: [yes | no]
Notes:

GSC URL-prefix verification (www.longpropc.com)
Submitted date:
Verification status: [pending | verified | failed]
Sitemap submitted: [yes | no]
Notes:
```

## Outstanding / blocked

- GBP video verification cannot be automated — you'll do that on your phone.
- Wrangler deploy for the GSC meta tag requires auth on your real Mac (the sandbox can't deploy).
- Post-verification `sameAs` schema update is a site edit + redeploy.

## Next step

Start with the GBP preflight check in the section above, then come back with:

1. Whether an existing stub was found (and its URL)
2. The GSC meta tag code once you generate it

I'll take it from there on the site-side edits.
