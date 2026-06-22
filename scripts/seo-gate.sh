#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT_DIR}"

./scripts/run-with-node.sh node_modules/wrangler/bin/wrangler.js deploy --dry-run
./scripts/run-with-node.sh scripts/verify-seo-fixes.mjs
./scripts/run-with-node.sh scripts/verify-conversion-flow.mjs
./scripts/run-with-node.sh scripts/seo-live-audit.mjs

for url in \
  "https://longpropc.com/" \
  "https://www.longpropc.com/" \
  "http://longpropc.com/" \
  "http://www.longpropc.com/"
do
  printf '%s\n' "${url}"
  curl -sSI "${url}" | sed -n '1,5p'
  printf '\n'
done
