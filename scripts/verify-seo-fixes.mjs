import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";

const checks = [];

function check(name, passed, detail = "") {
  checks.push({ name, passed, detail });
}

function read(path) {
  return readFileSync(path, "utf8");
}

function titleOf(html) {
  return html.match(/<title>(.*?)<\/title>/s)?.[1] || "";
}

function linksTo(html, href) {
  return html.includes(`href="${href}"`);
}

function readPublicTextFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const path = `${dir}/${entry}`;
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...readPublicTextFiles(path));
    } else if (/\.(html|txt|xml|js|jsx|json|md)$/i.test(path)) {
      files.push(path);
    }
  }
  return files;
}

const worker = read("src/index.js");
check(
  "legacy Wix /post catch-all redirects to /blog",
  worker.includes('normalized.startsWith("/post/")') && worker.includes('const redirectTarget = target || "/blog"')
);
check(
  "indexed Wix example has explicit redirect mapping",
  worker.includes('"/post/how-to-keep-your-home-safe-from-common-pests": "/blog"')
);

const notFound = read("dist_assets/404.html");
check("404 page remains noindex", notFound.includes('<meta name="robots" content="noindex, nofollow">'));
check("404 page does not emit a canonical tag", !notFound.includes('rel="canonical"'));

const home = read("dist_assets/index.html");
const bedBug = read("dist_assets/services/bed-bug-extermination/index.html");
check("bed bug service title is distinct from home title", titleOf(home) !== titleOf(bedBug));
check(
  "bed bug service title targets treatment and extermination",
  titleOf(bedBug) === "Bed Bug Treatment &amp; Extermination Cleveland OH | LongPro Pest Control"
);
check(
  "bed bug service social titles match updated title",
  bedBug.includes('property="og:title" content="Bed Bug Treatment &amp; Extermination Cleveland OH | LongPro Pest Control"') &&
    bedBug.includes('name="twitter:title" content="Bed Bug Treatment &amp; Extermination Cleveland OH | LongPro Pest Control"')
);

const newPostPath = "dist_assets/blog/german-cockroaches-cleveland-apartments/index.html";
check("new cockroach support article exists", existsSync(newPostPath));
const newPost = read(newPostPath);
check("new cockroach article is canonicalized", newPost.includes('rel="canonical" href="https://longpropc.com/blog/german-cockroaches-cleveland-apartments/"'));
check("new cockroach article has May 2026 publish date", newPost.includes('"datePublished":"2026-05-13"') && newPost.includes(">May 13, 2026<"));

const jsonLdBlocks = [...newPost.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
let jsonLdValid = jsonLdBlocks.length >= 3;
for (const [, block] of jsonLdBlocks) {
  try {
    JSON.parse(block);
  } catch {
    jsonLdValid = false;
  }
}
check("new cockroach article JSON-LD is parseable", jsonLdValid);

const seasonalPostPath = "dist_assets/blog/cleveland-seasonal-pest-calendar/index.html";
check("seasonal pest calendar article exists", existsSync(seasonalPostPath));
const seasonalPost = read(seasonalPostPath);
check(
  "seasonal pest calendar article is canonicalized and scheduled",
  seasonalPost.includes('rel="canonical" href="https://longpropc.com/blog/cleveland-seasonal-pest-calendar/"') &&
    seasonalPost.includes('"datePublished":"2026-05-20"') &&
    seasonalPost.includes(">May 20, 2026<")
);

const diyPostPath = "dist_assets/blog/professional-pest-control-vs-diy/index.html";
check("professional pest control vs DIY article exists", existsSync(diyPostPath));
const diyPost = read(diyPostPath);
check(
  "professional pest control vs DIY article is canonicalized and scheduled",
  diyPost.includes('rel="canonical" href="https://longpropc.com/blog/professional-pest-control-vs-diy/"') &&
    diyPost.includes('"datePublished":"2026-05-27"') &&
    diyPost.includes(">May 27, 2026<")
);

for (const [name, html] of [
  ["seasonal pest calendar", seasonalPost],
  ["professional pest control vs DIY", diyPost],
]) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  let valid = blocks.length >= 3;
  for (const [, block] of blocks) {
    try {
      JSON.parse(block);
    } catch {
      valid = false;
    }
  }
  check(`${name} JSON-LD is parseable`, valid);
}

const blogIndex = read("dist_assets/blog/index.html");
check(
  "blog index links to new cockroach article",
  linksTo(blogIndex, "/blog/german-cockroaches-cleveland-apartments")
);
check(
  "blog index links to staggered non-bed-bug articles",
  linksTo(blogIndex, "/blog/cleveland-seasonal-pest-calendar") &&
    linksTo(blogIndex, "/blog/professional-pest-control-vs-diy")
);

const reviewsPage = read("dist_assets/reviews/index.html");
const reviewJsonLdBlocks = [...reviewsPage.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
let reviewsJsonLdValid = reviewJsonLdBlocks.length > 0;
for (const [, block] of reviewJsonLdBlocks) {
  try {
    JSON.parse(block);
  } catch {
    reviewsJsonLdValid = false;
  }
}
check("reviews page JSON-LD remains parseable", reviewsJsonLdValid);

const sitemap = read("dist_assets/sitemap.xml");
check(
  "sitemap includes new cockroach article",
  sitemap.includes("https://longpropc.com/blog/german-cockroaches-cleveland-apartments/")
);
check(
  "sitemap includes staggered non-bed-bug articles",
  sitemap.includes("https://longpropc.com/blog/cleveland-seasonal-pest-calendar/") &&
    sitemap.includes("https://longpropc.com/blog/professional-pest-control-vs-diy/")
);

const llms = read("dist_assets/llms.txt");
check(
  "llms.txt includes new cockroach article",
  llms.includes("https://longpropc.com/blog/german-cockroaches-cleveland-apartments/")
);
check(
  "llms.txt includes staggered non-bed-bug articles",
  llms.includes("https://longpropc.com/blog/cleveland-seasonal-pest-calendar/") &&
    llms.includes("https://longpropc.com/blog/professional-pest-control-vs-diy/")
);

const personalNameTokens = ["Marquis Wise", "Sean", "Shawn"];
const publicTextFiles = [
  ...readPublicTextFiles("dist_assets"),
  ...readPublicTextFiles("src/components/seo"),
];
const personalNameHits = [];
for (const file of publicTextFiles) {
  const text = read(file);
  for (const token of personalNameTokens) {
    if (text.includes(token)) {
      personalNameHits.push(`${file}: ${token}`);
    }
  }
}
check(
  "public website assets do not expose owner or technician names",
  personalNameHits.length === 0,
  personalNameHits.join("; ")
);

const failures = checks.filter((item) => !item.passed);
for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

if (failures.length) {
  process.exitCode = 1;
}
