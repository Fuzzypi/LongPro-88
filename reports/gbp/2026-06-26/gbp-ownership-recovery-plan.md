# LongPro GBP Ownership Recovery — Corrected Action Plan
**Date:** June 26, 2026
**Supersedes:** the June 22 vendor-escalation plan (the email-the-vendor lane is now exhausted)

## Situation in one paragraph

Scorpion Home Services (`scorpionhomeservices2020@gmail.com`) still holds **Primary Owner** of the LongPro Google Business Profile. Your company account (`longpropc@gmail.com`) is an **Owner** but not Primary. You've sent three written transfer demands (May 8, May 22, June 22) over seven weeks with **no reply**, filed Google's dispute form June 22, and your final 3-day deadline expired June 25. The vendor is not going to volunteer the transfer, and emailing again won't change that.

## Why the strategy changes

Two paths exist, and you've been pushing the weak one:

- **Weak (current):** Ask the unresponsive vendor to promote you, or file a generic Google "contact us" dispute. Both depend on someone choosing to act. Seven weeks of silence shows where that leads.
- **Strong (switch to this):** Use Google's **"Request access → unresponsive-owner appeal"** mechanism, which lets Google **unverify the inactive owner and let you re-verify the profile yourself** when it can confirm you through **Search Console or Google Analytics**. You already control both for longpropc.com. This routes *around* Scorpion entirely.

> When you request access and the current owner doesn't respond within the waiting window (3–7 days), Google surfaces an appeal option. If it can verify you via Search Console/Analytics, it can remove the inactive owner's verification and let you verify the business. ([Google: Request ownership](https://support.google.com/business/answer/4566671?hl=en) · [Google: Transfer primary ownership](https://support.google.com/business/answer/3415281?hl=en) · [Reinstate Labs: ownership-conflict fix](https://www.reinstatelabs.com/blogs/gbp-ownership-conflict-recover-access))

This path also sidesteps the **video-verification wall** you hit in May — Search Console domain control is itself the proof, so Google is far less likely to demand a verification video.

## Step 0 — Use the ONE business account: `longpropc@gmail.com`

**Do everything below signed in as `longpropc@gmail.com`. Never use `slip360@gmail.com` for the Google Business Profile, claiming, or verification.** Using a personal/second account to claim the listing is what created the ownership tangle before — there is one business Google account and it is `longpropc@gmail.com` (already an Owner on the profile).

Make sure Search Console proof sits under that account:

1. Open **search.google.com/search-console** signed in as `longpropc@gmail.com`. Is `longpropc.com` listed as a verified property with role **Owner**?
2. **If yes** → you're set; go to Step 1.
3. **If no** → verify `longpropc.com` in Search Console under `longpropc@gmail.com` first (you control the domain via Cloudflare, so use the DNS TXT or HTML-tag method). This is the proof the appeal relies on, and it must live under the business account. Do **not** fall back to slip360 even if that account happens to have older verification — re-verify under `longpropc@gmail.com`.

## Step 1 — Start the access request from that account

1. Signed in as **`longpropc@gmail.com`**, go to **business.google.com** (or find "LongPro Pest Control" on Google Maps and click **"Claim this business" / "Own this business?"**).
2. Google will detect it's already managed and offer **"Request access."** Submit it. The current Primary Owner (Scorpion) is notified and has the response window to react.
3. You'll get a request ID / confirmation. Save it.

## Step 2 — Wait out the window, then appeal

1. Scorpion will almost certainly ignore it (consistent with seven weeks of silence).
2. After the window (plan on **7 days**), return to the request status. Look for **"Appeal"** / **"Verify"**.
3. Choose **Search Console verification** when offered. Because you control the verified domain property, Google can confirm you and **unverify the inactive owner**, then let you verify and take the profile.

## Step 3 — Lock it down (first 7 days after you win)

Once you're verified owner, Google imposes a 7-day cooldown before you can change owners. During that week:

- Add `longpropc@gmail.com` (and/or your primary account) as **Owner** so you have a backup.
- After 7 days, set your controlled account as **Primary Owner** and **remove Scorpion and FieldRoutes** if they should no longer have access.
- Then — and only then — run the optimization packet in `reports/gbp/2026-06-22/gbp-ready-to-execute-optimization.md`.

## Parallel pressure (optional but recommended)

- **BBB complaint against Scorpion** for unauthorized retention of a former client's profile — draft ready in `reports/gbp/2026-06-26/bbb-complaint-scorpion.md`. File it; a documented BBB case strengthens any later Google escalation and creates reputational pressure on the vendor.
- Keep the full email trail (May 8 / May 22 / June 22) — it's your evidence that the relationship ended and access was demanded in writing and ignored.

## What NOT to do

- Don't send Scorpion a fourth demand — diminishing returns, and it signals you're still stuck in the weak lane.
- Don't delete/recreate the profile or start a duplicate listing — that fragments your reviews and history and can trigger suspension.
- Don't make GBP edits until you actually hold verified access.

## Decision tree

- **Search Console verified under `longpropc@gmail.com`?** → run Steps 1–3. Highest success odds.
- **Not yet verified under `longpropc@gmail.com`?** → verify longpropc.com in Search Console under that account first (you control the DNS/site via Cloudflare), wait for it to confirm, then run Steps 1–3. Do not use slip360.
- **Google demands a verification video anyway?** → you can comply (film van, signage, equipment) *or* push the Search Console appeal through support citing domain control; keep the BBB case as leverage.
