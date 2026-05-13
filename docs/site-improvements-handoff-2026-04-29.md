# LongPro Site Improvements Handoff

**Created:** 2026-04-29
**Session scope:** Deployed PestPro Flask intake on the existing Hetzner box, wired LongPro Worker secrets, verified end-to-end lead submission, completed plan-tracker task 4.2.

## Headline

**The contact form is now functional end-to-end.** Submissions to `/contact/` flow `Worker /api/contact → https://pestpro.longpropc.com/api/leads → PestPro SQLite`. Live test at 2026-04-29 13:33:52 UTC produced lead row id=3 in PestPro.

LongPro plan-tracker is now 12/12 complete (100%) — `.plan/current.md` and `.plan/state.json` updated.

## Reconciliation update (2026-04-30)

This handoff was reconciled against the current built site and live browser behavior on 2026-04-30.

- `/contact/` real-browser smoke test is now complete: live `GET /api/contact?status=1` returned `200 {"ok":true,"configured":true}` and a browser-submitted `POST /api/contact` returned `200` with the on-page success message `Thank you! We'll contact you within 24 hours.`
- The old duplicate-title backlog item is stale. The homepage currently renders `Discreet Bed Bug Exterminator Cleveland OH | LongPro Pest Control`, not the older duplicated form.
- The old `sameAs` backlog item is stale. Current built HTML includes `sameAs` across the checked page set and no HTML page in `dist_assets/` is currently missing it.
- The old "Contractors Up removal request not submitted" item is stale. [docs/citation-cleanup-tracker.md](docs/citation-cleanup-tracker.md) records it as `requested` on 2026-04-24.
- The old "content gaps" item is partially stale. The following posts now exist in the built site: cost guide, bed-bug recurrence, pet-safe pest control, emergency pest control, and bed bug inspection.
- The most concrete metadata gap still present is page-specific social previews: 10 current HTML pages still use `https://longpropc.com/images/longpro-logo.webp` as `og:image`.

## What changed

### Hetzner box (`longpro-new`, 188.245.187.95)

| Item | Path / Value |
| --- | --- |
| App code | `/opt/pestpro` (clone of github.com/Fuzzypi/pestpro, Development branch, deploy key "Hetzner longpro-new (read-only)") |
| Owner user | `pestpro:pestpro` (system user, home `/home/pestpro`) |
| Venv | `/opt/pestpro/backend/venv` |
| DB | `/opt/pestpro/instance/pestpro.db` (SQLite, created via `db.create_all()` because Alembic chain is broken — see PestPro section) |
| Env file | `/opt/pestpro/backend/.env` (mode 600) — `SECRET_KEY`, `LONGPRO_INTAKE_TOKEN`, `DIGITARY_WRITE_TOKEN`, `DATABASE_URL`, `CORS_ORIGINS`, etc. |
| systemd unit | `/etc/systemd/system/pestpro.service` (gunicorn, 2 workers, 4 threads, bound to `127.0.0.1:5001`) |
| nginx vhost | `/etc/nginx/sites-available/pestpro.conf` → `/etc/nginx/sites-enabled/pestpro.conf` |
| TLS cert | `/etc/letsencrypt/live/pestpro.longpropc.com/`, expires 2026-07-28, auto-renewal scheduled |

Existing services on the box (untouched): `longpro-api.service` + `longpro-worker.service` (pest-ID app at `pi.longpropc.com`), `veremun-proxy.service`, `redis-server`.

### Cloudflare DNS

A record added: `pestpro.longpropc.com → 188.245.187.95`, **DNS-only (gray cloud)** so Let's Encrypt can validate directly. Mirrors the existing `pi.longpropc.com` pattern.

### LongPro Cloudflare Worker (`longpro-scaffold`)

Two secrets uploaded via `npx wrangler secret put`:
- `PESTPRO_LEADS_URL` = `https://pestpro.longpropc.com/api/leads`
- `PESTPRO_INTAKE_TOKEN` = matches PestPro's `LONGPRO_INTAKE_TOKEN` (64 hex chars)

`/api/contact?status=1` now returns `{"ok":true,"configured":true}` on both `www.longpropc.com` and `longpropc.com`. The contact-page preflight will enable the form on next pageload (was disabled with "Online Form Unavailable" message).

### Cloudflare API token universalized

Saved at `~/.cloudflare/api-token` (mode 600), auto-loaded as `$CLOUDFLARE_API_TOKEN` in every zsh and bash shell via managed blocks in `~/.zshenv`, `~/.bashrc`, `~/.bash_profile`. Token has `Zone:Read + Zone.DNS:Edit` on all four of Fuzzy's zones (calencall, calls2calendar, longpropc, veremun). Discovery doc at `~/.cloudflare/README.md`. The old read-only token referenced in `~/aos-platform/.claude/memory/project-brain.md` was superseded; that file now points to the new canonical location.

### PestPro repo (github.com/Fuzzypi/pestpro)

Three new commits on `Development`:
- `7878adc` — Lead intake hardening: bearer auth (`LONGPRO_INTAKE_TOKEN`), rate limiting (5/5min per IP), CF-Connecting-IP forwarding. 8 files: `leads.py`, `config.py`, `.env.example`, `LEAD_API_EXAMPLES.md`, `rate_limit.py` (new), `test_lead_intake_hardening.py` (new), `test_leads_intake_auth.py` (new), `test_leads_api.py`.
- `264fcae` — Comments out 4 broken route imports in `routes/__init__.py` (`control_plane`, `digitary_deliveries`, `policies`, `hub_registry`) with TEMP markers so origin/Development can boot on a fresh clone.
- `3d2e088` — Comments out the `drafts` import too (its dependency chain is also working-tree-only).

### LongPro plan-tracker

`.plan/current.md` and `.plan/state.json` updated. Task `4eebf093` (Phase 4.2) marked complete with full deployment notes.

## Verification commands (re-runnable)

```bash
# Worker preflight
curl https://www.longpropc.com/api/contact?status=1
# expect {"ok":true,"configured":true}

# PestPro health
curl https://pestpro.longpropc.com/api/healthz
# expect {"ok":true}

# Auth check (must be 401)
curl -X POST https://pestpro.longpropc.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"email":"x@x"}'

# Recent leads in DB
ssh root@188.245.187.95 \
  'sqlite3 /opt/pestpro/instance/pestpro.db "SELECT id, datetime(created_at), name, email, source FROM lead ORDER BY id DESC LIMIT 10;"'

# Submit a real test lead through the public Worker (will appear in PestPro DB)
curl -X POST https://www.longpropc.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Manual Test","email":"manual@example.com","phone":"216-555-0123","message":"Manual verification."}'
```

## Outstanding backlog (reconciled 2026-04-30)

The intake-live milestone is complete. The remaining open work is now:

1. **Trust and conversion polish on core pages** — home, about, contact, and reviews still need stronger proof density and tighter conversion hierarchy to feel world-class rather than merely functional.
2. **Reviews page is still thin** — it currently presents only 3 on-site reviews even though the business cites 17 Google reviews.
3. **Per-page OG images are still incomplete** — 10 current HTML pages still use the logo as `og:image`: home, contact, about, service-area hub, services hub, reviews, South Hills, and the blog posts for Cuyahoga County assistance, emergency pest control, and pet-safe pest control.
4. **Yelp claim + phone fix** — still needs business-owner login.
5. **Citation follow-through / re-scan** — BBB, Chamber, Yellow Pages, AllBiz, and Contractors Up should be rechecked after provider processing windows.
6. **Google Business Profile completion** — categories, full service-area list, and fresh photos still need follow-through.
7. **Content depth follow-up** — some March audit gaps were filled, but the next content pass should prioritize the highest-value service, service-area, and commercial-intent pages rather than treating all older blog-gap notes as still equally open.

## PestPro repo cleanup (separate session)

Out of scope for the LongPro project — tracked under `pestpro` in the brain. Headline numbers:

- ~113 working-tree-only files across Phases 27B–40, hub registry, AOS scaffolding.
- 1 stash (`stash@{0}`) containing FROZEN-Customers WIP (Customers is in `FREEZE_REGISTRY.md`; needs explicit bug-fix authorization).
- 4 routes (`control_plane`, `digitary_deliveries`, `policies`, `hub_registry`) + `drafts` are commented out with `TEMP` markers in `backend/pestpro/routes/__init__.py` — they auto-restore when their `.py` files get committed.
- Alembic chain has a break (`3f18d998724e` → missing parent `f23cdf27f63c`); used `db.create_all()` for now. Stamp Alembic when the missing migration files land.
- `requirements.txt` is missing: `requests`, `pyjwt`, `bcrypt`, `cryptography`, `email-validator`, `stripe`, `phonenumbers` (installed on the server but should be in the file).

## Gotchas (carry forward)

- **`src/index.js` is the compiled Astro Worker bundle** (~14,700 lines, minified) but is being hand-edited by builders. Non-Astro handlers (contact API, redirects, status preflight, fallback) live there. The Astro source tree is NOT in this repo.
- **`dist_assets/*.html` is what gets served** as static assets via the Worker's `ASSETS` binding.
- **Sandbox `mcp__workspace__bash`** can read/write the LongPro repo but cannot run `wrangler` (workerd is darwin-only and there's no Cloudflare auth in the sandbox). Wrangler runs from the Mac via `mcp__terminal-bridge__terminal_exec`.
- **macOS TCC blocks `mcp__terminal-bridge__` from accessing some `~/Desktop/` paths** — but the LongPro-88 path under Desktop currently works (verified). If it stops working, fall back to `mcp__Macos__Shell`.
- **Computer-use can't click in browsers** (Safari is tier "read"). DNS work via Cloudflare API now uses `~/.cloudflare/api-token`. Other dashboard tasks need either Claude-in-Chrome extension installed or a manual click.
- **PestPro Worker — sourcing the venv from systemd**: the unit uses `EnvironmentFile=/opt/pestpro/backend/.env` plus the absolute path to gunicorn in the venv. Non-interactive shells don't load `~/.zshenv` for the `pestpro` user, but they don't need to — `.env` covers everything.
- **Flask CLI confusion**: `flask db` doesn't work with `FLASK_APP=wsgi.py` because there's a stray `backend/__init__.py` in the repo making `backend` look like a package. Use `FLASK_APP=pestpro:create_app` instead. (Also: `/opt/pestpro/pestpro` was an empty leftover directory shadowing the real package; removed during deploy.)

## New conversation starter

Paste this into the next session:

```text
We are in /Users/fuzzypi/Desktop/LongPro-88. Continue LongPro work.
Start by reading docs/site-improvements-handoff-2026-04-29.md for the canonical state
as of intake-live, then docs/site-improvements-handoff-2026-04-24.md for the prior
context, then docs/longpro-pestpro-integration.md for the integration contract.

The intake is LIVE — the contact form forwards to PestPro at pestpro.longpropc.com.
Plan-tracker is 12/12 complete. Highest-impact remaining items are real-browser smoke
test of /contact/, then SEO/AEO backlog (duplicate-title fix, per-page OG images,
sameAs on 4 newer pages) and content gaps from the March audit.

PestPro repo cleanup (~113 uncommitted files, broken Alembic chain, incomplete
requirements.txt, stash@{0} with FROZEN-Customers WIP) is tracked separately under
the pestpro project — do NOT pile that work into LongPro sessions.

Cloudflare API token is at ~/.cloudflare/api-token, auto-exported as
$CLOUDFLARE_API_TOKEN in every shell. Don't ask Fuzzy for it. mcp__terminal-bridge__
runs commands on the Mac with full access to ~ and SSH to root@188.245.187.95
(Hetzner) is set up.
```

## Brain references

- Session: `L8-26` (session_id 1140)
- Artifact id 171: "PestPro intake live deployment — 2026-04-29"
- Decisions logged: 632 (Hetzner host choice), 633 (token universal location), 634 (Group 1 only commit), 635 (db.create_all over Alembic)
- Knowledge: `bb1d8e4c-...` (LongPro deploy topology, file_map), `49159d1f-...` (PestPro broken-branch experience), `2d5eb468-...` (search-before-asking principle, global)
