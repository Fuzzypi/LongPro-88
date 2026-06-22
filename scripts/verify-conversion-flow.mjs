import { mkdirSync, writeFileSync } from "node:fs";

const SITE = "https://longpropc.com";
const DATE_STAMP = new Date().toISOString().slice(0, 10);
const REPORT_DIR = `reports/seo/${DATE_STAMP}`;
const PHONE_HREF = "tel:+12163004121";

const pages = [
  { path: "/", label: "homepage" },
  { path: "/contact/", label: "contact page" },
  { path: "/services/bed-bug-extermination/", label: "bed bug service page" },
  { path: "/services/general-pest-control/", label: "general pest service page" },
  { path: "/reviews/", label: "reviews page" },
];

const checks = [];

function check(name, passed, detail = "") {
  checks.push({ name, passed, detail });
}

async function fetchHtml(path) {
  const response = await fetch(`${SITE}${path}`, {
    redirect: "manual",
    headers: {
      "cache-control": "no-cache",
    },
  });
  return {
    status: response.status,
    location: response.headers.get("location"),
    html: await response.text(),
  };
}

function includesPhoneCta(html) {
  return html.includes(PHONE_HREF);
}

function includesQuoteCta(html) {
  return html.includes("Request a Callback") || html.includes("Request Callback");
}

function includesStickyCallBar(html) {
  return html.includes('data-track-location="mobile_sticky"') && html.includes("Call Now");
}

function writeReports(report) {
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(`${REPORT_DIR}/conversion-flow.json`, `${JSON.stringify(report, null, 2)}\n`);

  const lines = [
    "# Conversion Flow Report",
    "",
    `- Date: ${DATE_STAMP}`,
    `- Site: ${SITE}`,
    `- Checks: ${checks.length}`,
    `- Failures: ${checks.filter((item) => !item.passed).length}`,
    "",
    "## Page Snapshots",
    "",
    "| Page | Status | Header Call | Quote CTA | Sticky Call Bar |",
    "| --- | --- | --- | --- | --- |",
    ...report.pages.map(
      (page) =>
        `| ${page.label} | ${page.status} | ${page.headerCall ? "yes" : "no"} | ${page.quoteCta ? "yes" : "no"} | ${page.stickyCallBar ? "yes" : "no"} |`
    ),
    "",
    "## Checks",
    "",
    ...checks.map((item) => `- ${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? ` — ${item.detail}` : ""}`),
    "",
  ];

  writeFileSync(`${REPORT_DIR}/conversion-flow.md`, `${lines.join("\n")}\n`);
}

const pageReports = [];

for (const page of pages) {
  const result = await fetchHtml(page.path);
  const headerCall = result.html.includes('data-track-location="header"') && includesPhoneCta(result.html);
  const quoteCta = includesQuoteCta(result.html);
  const stickyCallBar = includesStickyCallBar(result.html);

  pageReports.push({
    ...page,
    status: result.status,
    location: result.location,
    headerCall,
    quoteCta,
    stickyCallBar,
  });

  check(`${page.label} returns 200`, result.status === 200, `status=${result.status}`);
  check(`${page.label} exposes phone CTA`, includesPhoneCta(result.html));
  check(`${page.label} exposes callback CTA`, quoteCta);
}

const homeHtml = pageReports.find((page) => page.path === "/") ? (await fetchHtml("/")).html : "";
const contact = await fetchHtml("/contact/");
const service = await fetchHtml("/services/bed-bug-extermination/");

check("homepage exposes sticky mobile call bar", includesStickyCallBar(homeHtml));
check(
  "homepage call tracking is wired safely",
  homeHtml.includes("window.longproTrackEvent") &&
    homeHtml.includes("typeof gtag !== 'function'") &&
    homeHtml.includes("phone_click_' + location") &&
    homeHtml.includes("quote_click_' + location")
);
check(
  "contact page explains the lighter lead requirement",
  contact.html.includes("Only your name and one way to reach you are required.")
);
check(
  "contact page does not hard-require phone, email, service, or message",
  !/id="contact-phone"[^>]*\srequired\b/.test(contact.html) &&
    !/id="contact-email"[^>]*\srequired\b/.test(contact.html) &&
    !/id="contact-service"[^>]*\srequired\b/.test(contact.html) &&
    !/id="contact-message"[^>]*\srequired\b/.test(contact.html)
);
check(
  "contact page tracks callback milestones",
  contact.html.includes("contact_page_view") &&
    contact.html.includes("callback_form_start") &&
    contact.html.includes("callback_form_submit") &&
    contact.html.includes("contact_submit_success")
);
check(
  "contact page analytics calls fail safely when GA is unavailable",
  contact.html.includes('typeof window.gtag=="function"')
);
check(
  "service page exposes call and callback CTAs",
  includesPhoneCta(service.html) && includesQuoteCta(service.html)
);

const report = {
  generatedAt: new Date().toISOString(),
  site: SITE,
  pages: pageReports,
  checks,
  failures: checks.filter((item) => !item.passed),
};

writeReports(report);

for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"}: ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

if (report.failures.length > 0) {
  process.exitCode = 1;
} else {
  console.log("All conversion flow checks passed.");
}
