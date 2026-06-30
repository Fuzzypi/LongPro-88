#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE = "https://longpropc.com";
const ROOT = "dist_assets";
const PREVIEWS = {
  bedBug: `${SITE}/images/og/bed-bug-extermination-preview.png`,
  home: `${SITE}/images/og/home-preview.png`,
  serviceArea: `${SITE}/images/og/service-area-preview.png`,
  southHills: `${SITE}/images/og/south-hills-preview.png`,
};

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const file = path.join(dir, entry);
    const stat = statSync(file);
    if (stat.isDirectory()) {
      files.push(...walk(file));
    } else if (entry === "index.html") {
      files.push(file);
    }
  }
  return files;
}

function getMetaContent(html, selector) {
  const match = html.match(selector);
  return match?.[1] ?? null;
}

function replaceMetaContent(html, selector, replacement) {
  return html.replace(selector, (_, prefix) => `${prefix}${replacement}">`);
}

function preferredPreview(file, currentOgImage) {
  const normalized = file.replace(/\\/g, "/");
  if (normalized.includes("/service-area/")) {
    if (normalized.includes("/bed-bugs/")) {
      return PREVIEWS.bedBug;
    }
    if (normalized.includes("/cleveland/south-hills/")) {
      return PREVIEWS.southHills;
    }
    if (currentOgImage && currentOgImage !== PREVIEWS.home) {
      return currentOgImage;
    }
    return PREVIEWS.serviceArea;
  }
  return currentOgImage;
}

function alignLocalBusinessImage(html, replacement) {
  return html.replace(
    /(<script type="application\/ld\+json">)([^<]*"@type"\s*:\s*"LocalBusiness"[^<]*?)(<\/script>)/g,
    (_, open, body, close) =>
      `${open}${body.replace(/("image"\s*:\s*")[^"]*(")/, `$1${replacement}$2`)}${close}`
  );
}

function normalizeTrustCopy(html) {
  const replacements = [
    [/BBB A\+ rating for 13\+ consecutive years/g, "BBB A+ accreditation since 2015"],
    [/BBB A\+ rated for 13\+ consecutive years/g, "BBB A+ accredited since 2015"],
    [/BBB A\+ rated 13\+ years/g, "BBB A+ accredited since 2015"],
    [/13\+ years of A\+ BBB rating\./g, "BBB A+ accreditation since 2015."],
    [/13\+ years rated/g, "Accredited since 2015"],
    [/BBB A\+ rated\./g, "BBB A+ accredited since 2015."],
    [/BBB A\+ rated,/g, "BBB A+ accredited since 2015,"],
    [/BBB A\+\./g, "BBB A+ accredited since 2015."],
    [/BBB A\+ rated\b/g, "BBB A+ accredited since 2015"],
  ];

  return replacements.reduce((result, [pattern, value]) => result.replace(pattern, value), html);
}

const files = walk(ROOT);
let changedFiles = 0;
let ogUpdates = 0;
let schemaUpdates = 0;
let trustUpdates = 0;

for (const file of files) {
  const original = readFileSync(file, "utf8");
  const ogImage = getMetaContent(original, /<meta property="og:image" content="([^"]+)">/);
  const desiredPreview = preferredPreview(file, ogImage);

  let updated = original;

  if (desiredPreview && ogImage && ogImage !== desiredPreview) {
    updated = replaceMetaContent(updated, /(<meta property="og:image" content=")[^"]*">/, desiredPreview);
    updated = replaceMetaContent(updated, /(<meta name="twitter:image" content=")[^"]*">/, desiredPreview);
    ogUpdates += 1;
  }

  if (desiredPreview) {
    const next = alignLocalBusinessImage(updated, desiredPreview);
    if (next !== updated) {
      schemaUpdates += 1;
      updated = next;
    }
  }

  const normalized = normalizeTrustCopy(updated);
  if (normalized !== updated) {
    trustUpdates += 1;
    updated = normalized;
  }

  if (updated !== original) {
    writeFileSync(file, updated, "utf8");
    changedFiles += 1;
  }
}

console.log(
  JSON.stringify(
    {
      changedFiles,
      ogUpdates,
      schemaUpdates,
      trustUpdates,
    },
    null,
    2
  )
);
