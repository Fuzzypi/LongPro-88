# SEO Review Scheduled Task Setup

Open a new Cowork conversation and say:

> Create a scheduled task called `longpro-seo-review` that runs every 3 days at 8am.

Then provide this prompt for the task:

---

You are running a scheduled SEO review for longpropc.com — a pest control company website in Cleveland, OH (Old Brooklyn area). The site is built on Astro SSR + Cloudflare Workers. The project folder is at /Users/fuzzypi/Desktop/LongPro-88.

Save the report as a markdown file at: /Users/fuzzypi/Desktop/LongPro-88/seo-reviews/seo-review-YYYY-MM-DD.md (use today's date; create the directory if needed).

Before writing the report, check /Users/fuzzypi/Desktop/LongPro-88/seo-reviews/ for the most recent previous report. Read it so you can note changes and trends.

## Report Sections

### 1. Indexing and Crawlability
- Read the local robots.txt and sitemap.xml from the project folder
- Web search "site:longpropc.com" to estimate indexed page count
- Flag stale or missing pages

### 2. Keyword Visibility Snapshot
Web search for each keyword and note where longpropc.com appears (page 1 position, page 2, or not found). Use a table.
Keywords: "pest control cleveland", "bed bug exterminator cleveland", "cockroach extermination cleveland", "pest control old brooklyn cleveland", "flea extermination cleveland", "ant and spider control cleveland", "emergency pest control cleveland", "pet safe pest control cleveland", "bed bug treatment cost cleveland", "general pest control near me cleveland"

### 3. On-Page SEO Check (top 5 pages)
Read the HTML files from dist_assets/ for: index.html, services/bed-bug-extermination/, services/cockroach-extermination/, services/general-pest-control/, blog/
Check: title, meta description, H1, heading structure, schema, canonical, image alt text.

### 4. Technical SEO
Check canonical tags, 404 page, viewport meta, image optimization from local files.

### 5. Backlink and Authority Indicators
Web search "longpropc.com" (without site:) to find mentions, citations, directory listings.

### 6. Competitor Snapshot
Web search "pest control cleveland" — list top 5-10 organic results.

### 7. Content and Blog Health
Read the blog index HTML, note post count and publishing cadence. Suggest content gaps.

### 8. Action Items
Top 5 most impactful improvements, ranked by priority. Compare to previous report's action items.

Include a "Changes Since Last Review" section comparing to the previous report.
