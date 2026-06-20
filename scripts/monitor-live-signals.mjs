import { readdirSync, readFileSync, statSync } from "node:fs";

const SITE = "https://longpropc.com";
const GA_MEASUREMENT_ID = "G-Z1EH98YLZ1";
const PHONE_HREF = "tel:+12163004121";

const checks = [];

function check(name, passed, detail = "") {
  checks.push({ name, passed, detail });
}

function localSitemapUrls() {
  const xml = readFileSync("dist_assets/sitemap.xml", "utf8");
  return new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
}

function localHtmlUrls() {
  const htmlFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const path = `${dir}/${entry}`;
      const stat = statSync(path);
      if (stat.isDirectory()) {
        walk(path);
      } else if (path.endsWith("/index.html")) {
        htmlFiles.push(path);
      }
    }
  };
  walk("dist_assets");

  return new Set(
    htmlFiles.map((path) => {
      const relative = path.replace(/^dist_assets\//, "").replace(/index\.html$/, "");
      return `${SITE}/${relative}`;
    })
  );
}

async function fetchText(path) {
  const response = await fetch(`${SITE}${path}`);
  const text = await response.text();
  return { response, text };
}

async function fetchJson(path) {
  const response = await fetch(`${SITE}${path}`);
  let json = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }
  return { response, json };
}

const livePages = [
  { path: "/", label: "homepage" },
  { path: "/contact/", label: "contact page" },
  { path: "/services/bed-bug-extermination/", label: "bed bug service page" },
  { path: "/blog/", label: "blog index" },
  { path: "/service-area/", label: "service-area index" },
];

for (const page of livePages) {
  const { response, text } = await fetchText(page.path);
  check(`${page.label} returns 200`, response.status === 200, `status=${response.status}`);
  if (page.path === "/") {
    check("homepage ships GA tag", text.includes(`gtag/js?id=${GA_MEASUREMENT_ID}`));
    check("homepage exposes phone CTA", text.includes(PHONE_HREF));
    check("homepage exposes callback CTA", text.includes("Request a Callback"));
  }
  if (page.path === "/contact/") {
    check("contact page exposes light-intake copy", text.includes("Only your name and one way to reach you are required."));
    check("contact page exposes contact success tracking", text.includes("contact_submit_success"));
  }
}

const { response: statusResponse, json: statusJson } = await fetchJson("/api/contact?status=1");
check("contact status endpoint returns 200", statusResponse.status === 200, `status=${statusResponse.status}`);
check("contact status endpoint is configured", statusJson?.configured === true, JSON.stringify(statusJson));

const { text: sitemapText, response: sitemapResponse } = await fetchText("/sitemap.xml");
check("live sitemap returns 200", sitemapResponse.status === 200, `status=${sitemapResponse.status}`);
check("live sitemap includes privacy policy", sitemapText.includes(`${SITE}/privacy-policy/`));
check("live sitemap includes wasp article", sitemapText.includes(`${SITE}/blog/wasp-nest-removal-cleveland/`));

const sitemap = localSitemapUrls();
const htmlPages = localHtmlUrls();
const missingFromSitemap = [...htmlPages].filter((url) => !sitemap.has(url)).sort();
check(
  "local sitemap covers every generated index page",
  missingFromSitemap.length === 0,
  missingFromSitemap.join(", ")
);

const failures = checks.filter((item) => !item.passed);
for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

if (failures.length) {
  process.exitCode = 1;
}
