#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: ./scripts/run-with-node.sh <script-or-bin> [args...]" >&2
  exit 1
fi

if [[ -n "${LONGPRO_NODE_BIN:-}" && -x "${LONGPRO_NODE_BIN}" ]]; then
  exec "${LONGPRO_NODE_BIN}" "$@"
fi

if command -v node >/dev/null 2>&1; then
  exec node "$@"
fi

CODEX_NODE="/Users/fuzzypi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
if [[ -x "${CODEX_NODE}" ]]; then
  exec "${CODEX_NODE}" "$@"
fi

echo "No Node.js runtime found. Install node or set LONGPRO_NODE_BIN." >&2
exit 1
