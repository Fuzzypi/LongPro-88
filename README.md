# LongPro 88

LongPro Pest Control website — Cleveland, OH (Old Brooklyn area)

## Stack
- Astro SSR (server-side rendered)
- Cloudflare Workers + Assets
- Domain: longpropc.com

## Current Direction
LongPro is being treated as a public marketing and intake surface, not just a brochure site.

- Website work focuses on conversion, clarity, local SEO, and better lead capture.
- PestPro is the private CRM and operations backend for leads, customers, jobs, attribution, campaigns, and follow-up.
- The site should forward contact and quote traffic into PestPro through a thin intake layer, not expose the full CRM publicly.
- The LongPro -> PestPro intake contract is live end-to-end.
- The current build phase is the world-class website pass: reconcile stale backlog notes, strengthen trust and conversion, replace remaining logo-based social preview images, finish local-authority follow-through, and deepen the highest-value content.

See [docs/longpro-pestpro-integration.md](docs/longpro-pestpro-integration.md) for the working plan and handoff summary.

## Deploy
```bash
npx wrangler deploy
```

## Development
```bash
npx wrangler dev
```
