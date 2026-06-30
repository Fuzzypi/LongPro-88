# LongPro GBP Review Policy Correction

Date: 2026-06-22
Verdict: `GBP_OWNERSHIP_TRANSFER_PACKET_READY`

## What Was Corrected

The source brief at `longpro-gbp-optimization-brief-2026-06-22.md` included non-compliant review-gating guidance in two places:

- it recommended routing only `4-5 star` customers to Google
- it recommended routing `1-3 star` customers to an internal inbox first

That pattern should not be used.

## Disallowed Guidance

Do not recommend or implement:

- suppressing reviews based on customer sentiment
- filtering which customers see the Google review link
- routing only happy customers to Google
- sending unhappy customers only to a private inbox
- incentives for reviews
- scripts that require positive wording

## Compliant Replacement

Use this exact replacement:

> After every completed service, send every customer the same review request link. The message may also include a private reply option for service concerns, but the Google review link must not be hidden based on customer sentiment or star rating.

## Approved Workflow

1. Trigger the same review request for every completed customer.
2. Include the same Google review link for every customer.
3. Optionally invite a direct private reply for service concerns.
4. Do not hide, suppress, or condition the public review path.

## Scope Of This Correction

This correction applies to:

- the `Reviews` subsection of the source brief
- the review step in the source sequencing section
- any future GBP or CRM review workflow built from that brief
