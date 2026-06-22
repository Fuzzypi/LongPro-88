import { spawnSync } from "node:child_process";

const commands = [
  [process.execPath, ["scripts/seo-live-audit.mjs"]],
  [process.execPath, ["scripts/verify-conversion-flow.mjs"]],
];

let failed = false;

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
  });
  if (result.status !== 0) {
    failed = true;
  }
}

if (failed) {
  process.exitCode = 1;
}
