# LongPro GBP Live Control Audit

Date: 2026-06-22
Verdict: `LONGPRO_GBP_CONTROL_BLOCKER_FOUND`

## Repo State

- Repo: `/Users/fuzzypi/Desktop/LongPro-88`
- Branch: `main`
- HEAD: `55615a815b974ef3e8b0d94a5ff4a4093884994a`

## Access Attempts

### Google Business Profile dashboard

Attempt:

- imported Chrome cookies for `google.com`
- opened `https://business.google.com/locations`

Observed:

- imported cookies: `0`
- redirect target: Google sign-in
- result: current browser session does not expose an authenticated GBP owner/manager dashboard

### Public GBP share surface

Attempt:

- opened historical share URL from repo docs

Observed:

- Google redirected to a `sorry` / unusual traffic CAPTCHA page
- result: current environment cannot use the public share link as reliable live proof

## Current Known Control State

Fresh dashboard proof was blocked, so current ownership is based on the freshest in-repo evidence:

Source:

- `longpro-marketing-data-pull-2026-06-22.md`

Known state from that pull:

- a third-party agency account was listed as **Primary owner**
- the company-owned Google account was listed only as **Owner**

This remains the highest-confidence current control risk in the repo.

## Public Field State

Current live public GBP fields could not be freshly inspected because:

1. dashboard access required sign-in that was not available from imported browser cookies
2. public share-link access was CAPTCHA-blocked

Most recent known correct values from repo evidence:

- business name: `LongPro Pest Control LLC` / `LongPro Pest Control`
- website should be: `https://longpropc.com/`
- phone should be: `(216) 300-4121`
- category target should remain: `Pest control service`

These values should be verified in the actual dashboard once owner access is open.

## Performance Access

Current live GBP performance metrics were not available in this session.

Freshest in-repo baseline remains:

- calls: `8`
- website clicks: `7`
- chat clicks: `1`
- bookings: `0`

Window from the pull:

- January 2026 through June 2026

## Fastest-call GBP Backlog

If owner access is restored or confirmed, the fastest safe GBP improvements are:

1. move primary ownership to the company-controlled Google account
2. confirm website is `https://longpropc.com/`
3. confirm phone is `(216) 300-4121`
4. fill/verify primary and secondary categories
5. complete service list for bed bugs, roaches, ants, spiders, fleas, and general pest control
6. complete service areas around Cleveland and key suburbs
7. verify hours align with real call-answering coverage
8. enable appointment/callback link only if it points to the live contact flow
9. upload fresh photos if the profile is stale

## Diagnosis

The GBP blocker in this lane is control/access, not a proven live data regression.

What is blocked:

- current owner dashboard access
- current performance pull
- current owner/manager verification from inside GBP
- current public-profile verification through the share link

What is still known:

- a primary-owner transfer risk was documented in the freshest repo pull
- that risk is urgent enough to warrant a prepared transfer request packet now
