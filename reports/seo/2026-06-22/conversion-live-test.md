# LongPro Live Conversion Proof

Date: 2026-06-22
Verdict: `LONGPRO_CONVERSION_TRACKING_BLOCKER_FOUND`

## Repo State

- Repo: `/Users/fuzzypi/Desktop/LongPro-88`
- Branch: `main`
- HEAD: `55615a815b974ef3e8b0d94a5ff4a4093884994a`
- Preserved unrelated dirty state existed before this lane and remains preserved.

## Baseline Gates

- `./scripts/run-with-node.sh scripts/verify-seo-fixes.mjs` → pass
- `./scripts/run-with-node.sh scripts/verify-conversion-flow.mjs` → pass
- `./scripts/run-with-node.sh scripts/seo-live-audit.mjs` → pass
- `./scripts/run-with-node.sh scripts/monitor-live-signals.mjs` → pass

These prove the live site is up, canonicalized, shipping GA, and serving the contact endpoint with `configured: true`.

## Required Live Pages

Browser-checked on 2026-06-22:

| URL | 200 | GA tag present | `tel:+12163004121` links | contact/callback links |
| --- | --- | --- | ---: | ---: |
| `https://longpropc.com/` | yes | yes | 6 | 6 |
| `https://longpropc.com/contact/` | yes | yes | 6 | 4 |
| `https://longpropc.com/services/bed-bug-extermination/` | yes | yes | 6 | 7 |
| `https://longpropc.com/services/cockroach-extermination/` | yes | yes | 5 | 6 |
| `https://longpropc.com/service-area/` | yes | yes | 10 | 9 |

Contact page also contains live `contact_submit_success` code.

## Event Proof

### Phone click

Live homepage event wiring was exercised by stubbing `window.gtag` and firing the real click handler on the header phone link.

Captured events:

```json
[
  ["event","phone_click",{"event_category":"engagement","event_label":"tel:+12163004121","page_path":"/","link_text":"(216) 300-4121","cta_location":"header"}],
  ["event","phone_click_header",{"event_category":"engagement","event_label":"tel:+12163004121","page_path":"/","link_text":"(216) 300-4121","cta_location":"header"}]
]
```

### Quote / callback click

Live homepage callback link was exercised the same way.

Captured events:

```json
[
  ["event","quote_click",{"event_category":"engagement","event_label":"/contact/?message=Please%20call%20me%20back","page_path":"/","link_text":"Request a Callback"}]
]
```

### Form start

During the marked contact submit test, GA emitted a live `form_start` collect request:

- `POST https://analytics.google.com/g/collect ... en=form_start ... ep.form_id=contact-form ...`

This satisfies the brief requirement for `callback_form_start` or equivalent form-start proof.

### Analytics failure safety

With `window.gtag` intentionally removed on the live homepage, firing the phone CTA click produced no exception.

Result:

- `no-throw`

This matches the intended fail-safe behavior when GA is blocked or unavailable.

## Marked Test Contact Submission

Exactly one marked test lead was submitted through the live contact form.

Submitted values:

- name: `LONGPRO TEST LEAD - IGNORE`
- email: `noreply+longpro-ga-test@example.com`
- service: `other`
- message: `LONGPRO TEST LEAD - IGNORE - GA4/CalenCall tracking proof`

Observed results:

- The form emitted:
  - `contact_submit_attempt`
  - `callback_form_submit`
- The live browser did **not** observe `contact_submit_success`.
- The live success UI text was **not** visible during the proof window.
- The live `POST https://longpropc.com/api/contact` request remained pending when the browser flow settled.
- Downstream receipt by PestPro / CalenCall / email notifications could not be confirmed from this session.

Captured event list from the marked submit:

```json
[
  ["event","contact_submit_attempt",{"event_category":"engagement","event_label":"other","has_phone":"no","has_email":"yes"}],
  ["event","callback_form_submit",{"event_category":"engagement","event_label":"other","has_phone":"no","has_email":"yes"}]
]
```

## Diagnosis

This lane found a real live conversion uncertainty:

- page-level GA wiring is present
- phone and callback events fire
- the contact endpoint is configured
- but one real marked submit did not reach a visible success state or `contact_submit_success` within the test window

Most likely interpretations:

1. the downstream lead intake endpoint is slow or hanging
2. the worker is waiting on the downstream endpoint long enough to suppress the success state
3. users may be seeing a stalled submit instead of a clean success/failure outcome

That is a real lead-path risk even if low traffic remains the bigger top-of-funnel problem.

## Evidence Summary

- Live GA tag present: yes
- Live phone CTA present: yes
- Live `phone_click` proof: yes
- Live `quote_click` proof: yes
- Live form-start proof: yes, via GA `form_start`
- Live `contact_submit_success` code present: yes
- Live `contact_submit_success` firing proven: no
- One marked test submission sent: yes
- Downstream receipt proven: no
