import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SITE = "https://longpropc.com";
const DATE_STAMP = new Date().toISOString().slice(0, 10);
const REPORT_DIR = `reports/seo/${DATE_STAMP}`;
const LEGACY_PHONE_PATTERNS = ["216-294-2843", "(216) 294-2843", "2162942843", "+12162942843"];
const LIVE_TEST_MARKER = "LONGPRO TEST LEAD - IGNORE - contact form proof";

const args = new Set(process.argv.slice(2));
const shouldRunLiveChecks = args.has("--live");
const shouldSubmitLiveLead = args.has("--submit-live");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const checks = [];
const mockRequests = [];
const artifacts = {
  local: {},
  live: null,
  liveSubmission: null,
};

function check(name, passed, detail = "") {
  checks.push({ name, passed, detail });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nowMs() {
  return Number(process.hrtime.bigint() / BigInt(1e6));
}

async function fetchJson(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const startedAt = nowMs();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    const text = await response.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      text,
      json,
      elapsedMs: nowMs() - startedAt,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchText(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const startedAt = nowMs();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      text: await response.text(),
      elapsedMs: nowMs() - startedAt,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function listen(server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object", "Server address unavailable");
  return address.port;
}

async function getFreePort() {
  const server = createServer();
  const port = await listen(server);
  await new Promise((resolve) => server.close(resolve));
  return port;
}

function startMockLeadServer() {
  const server = createServer((request, response) => {
    if (request.method !== "POST" || request.url !== "/lead") {
      response.writeHead(404, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: false, error: "not found" }));
      return;
    }

    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const rawBody = Buffer.concat(chunks).toString("utf8");
      let body = {};
      try {
        body = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        response.writeHead(400, { "content-type": "application/json" });
        response.end(JSON.stringify({ ok: false, error: "invalid json" }));
        return;
      }

      mockRequests.push({
        receivedAt: new Date().toISOString(),
        authorization: request.headers.authorization ? "present" : "absent",
        body,
      });

      if (String(body.message || "").includes("__HANG__")) {
        return;
      }

      if (String(body.message || "").includes("__REJECT__")) {
        response.writeHead(500, { "content-type": "application/json" });
        response.end(JSON.stringify({ ok: false, error: "rejected by mock" }));
        return;
      }

      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: true, accepted: true }));
    });
  });

  return server;
}

function readBuiltContactHtml() {
  return readFileSync("dist_assets/contact/index.html", "utf8");
}

function hasLegacyPhone(text) {
  return LEGACY_PHONE_PATTERNS.some((pattern) => text.includes(pattern));
}

async function startWranglerDev(envFilePath) {
  const port = await getFreePort();
  const child = spawn(
    "./scripts/run-with-node.sh",
    [
      "node_modules/wrangler/bin/wrangler.js",
      "dev",
      "--local",
      "--local-protocol",
      "https",
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--env-file",
      envFilePath,
      "--log-level",
      "error",
      "--show-interactive-dev-session",
      "false",
    ],
    {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  const baseUrl = `https://127.0.0.1:${port}`;
  const deadline = Date.now() + 30000;
  let lastError = null;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`wrangler dev exited early (${child.exitCode})\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
    }
    try {
      const response = await fetchJson(`${baseUrl}/api/contact?status=1`, {}, 2000);
      if (response.status === 200 || response.status === 503) {
        return { child, baseUrl, stdoutRef: () => stdout, stderrRef: () => stderr };
      }
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }

  child.kill("SIGTERM");
  await onceExit(child);
  throw new Error(`wrangler dev did not become ready: ${lastError ? lastError.message : "timeout"}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`);
}

function onceExit(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null) {
      resolve();
      return;
    }
    child.once("exit", resolve);
  });
}

async function stopChild(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  const deadline = Date.now() + 5000;
  while (child.exitCode === null && Date.now() < deadline) {
    await sleep(100);
  }
  if (child.exitCode === null) {
    child.kill("SIGKILL");
    await onceExit(child);
  }
}

async function runLocalVerification() {
  const tempDir = mkdtempSync(join(tmpdir(), "longpro-contact-verify-"));
  const mockServer = startMockLeadServer();
  const mockPort = await listen(mockServer);
  const envFilePath = join(tempDir, ".dev.vars");
  writeFileSync(
    envFilePath,
    [
      `PESTPRO_LEADS_URL=http://127.0.0.1:${mockPort}/lead`,
      "PESTPRO_LEAD_TIMEOUT_MS=900",
      "PESTPRO_INTAKE_TOKEN=test-token",
    ].join("\n")
  );

  let dev = null;
  try {
    dev = await startWranglerDev(envFilePath);
    const builtContactHtml = readBuiltContactHtml();
    check("built contact page contains contact_submit_success wiring", builtContactHtml.includes("contact_submit_success"));
    check("built contact page exposes the live phone number", builtContactHtml.includes("tel:+12163004121"));
    check("built contact page does not expose the legacy phone number", !hasLegacyPhone(builtContactHtml));

    const localContactHtml = await fetchText(`${dev.baseUrl}/contact/`);
    check("local contact page returns 200", localContactHtml.status === 200, `status=${localContactHtml.status}`);
    check("local contact page contains contact_submit_success wiring", localContactHtml.text.includes("contact_submit_success"));

    const status = await fetchJson(`${dev.baseUrl}/api/contact?status=1`);
    check("local status endpoint returns 200", status.status === 200, `status=${status.status}`);
    check("local status endpoint reports configured", status.json?.configured === true, JSON.stringify(status.json));

    const invalid = await fetchJson(`${dev.baseUrl}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "", email: "" }),
    });
    check("local invalid payload returns 400", invalid.status === 400, `status=${invalid.status}`);
    check(
      "local invalid payload returns validation JSON",
      invalid.json?.error === "Name and a phone or email are required",
      JSON.stringify(invalid.json)
    );

    const success = await fetchJson(`${dev.baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: `${SITE}/contact/?utm_source=verify&utm_medium=test`,
        "user-agent": "LongPro contact verify",
      },
      body: JSON.stringify({
        name: "Verify Contact Success",
        email: "verify@example.com",
        service: "other",
        message: "Local success proof",
      }),
    });
    artifacts.local.success = success;
    check("local valid payload returns 200", success.status === 200, `status=${success.status}`);
    check("local valid payload returns ok JSON", success.json?.ok === true, JSON.stringify(success.json));
    check("local valid payload completes in under 2 seconds", success.elapsedMs < 2000, `elapsedMs=${success.elapsedMs}`);

    const forwardedLead = mockRequests.find((request) => request.body?.name === "Verify Contact Success");
    check("local valid payload forwarded the lead downstream", Boolean(forwardedLead));
    check(
      "local valid payload preserved live source metadata",
      forwardedLead?.body?.source === "longpropc.com" &&
        forwardedLead?.body?.utm_source === "verify" &&
        forwardedLead?.body?.utm_medium === "test",
      forwardedLead ? JSON.stringify(forwardedLead.body) : "missing forwarded lead"
    );

    const timeout = await fetchJson(`${dev.baseUrl}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Verify Contact Timeout",
        email: "verify-timeout@example.com",
        service: "other",
        message: "__HANG__",
      }),
    }, 3000);
    artifacts.local.timeout = timeout;
    check("local hung downstream returns deterministic timeout status", timeout.status === 504, `status=${timeout.status}`);
    check(
      "local hung downstream returns Lead intake unavailable JSON",
      timeout.json?.error === "Lead intake unavailable",
      JSON.stringify(timeout.json)
    );
    check("local hung downstream returns in under 2 seconds", timeout.elapsedMs < 2000, `elapsedMs=${timeout.elapsedMs}`);

    const rejected = await fetchJson(`${dev.baseUrl}/api/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Verify Contact Reject",
        email: "verify-reject@example.com",
        service: "other",
        message: "__REJECT__",
      }),
    });
    artifacts.local.rejected = rejected;
    check("local downstream rejection returns 502", rejected.status === 502, `status=${rejected.status}`);
    check("local downstream rejection returns deterministic JSON", rejected.json?.error === "Lead intake rejected", JSON.stringify(rejected.json));
  } finally {
    if (dev?.child) {
      await stopChild(dev.child);
    }
    await new Promise((resolve) => mockServer.close(resolve));
    rmSync(tempDir, { recursive: true, force: true });
  }
}

async function runLiveChecks() {
  const liveContact = await fetchText(`${SITE}/contact/`, {}, 6000);
  const liveStatus = await fetchJson(`${SITE}/api/contact?status=1`, {}, 6000);
  const liveInvalid = await fetchJson(`${SITE}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "", email: "" }),
  }, 6000);

  check("live contact page returns 200", liveContact.status === 200, `status=${liveContact.status}`);
  check("live contact page contains contact_submit_success wiring", liveContact.text.includes("contact_submit_success"));
  check("live contact page exposes the live phone number", liveContact.text.includes("tel:+12163004121"));
  check("live contact page does not expose the legacy phone number", !hasLegacyPhone(liveContact.text));
  check("live contact status endpoint returns configured", liveStatus.status === 200 && liveStatus.json?.configured === true, JSON.stringify(liveStatus.json));
  check(
    "live invalid contact payload returns 400 JSON",
    liveInvalid.status === 400 && liveInvalid.json?.error === "Name and a phone or email are required",
    JSON.stringify(liveInvalid.json)
  );

  artifacts.live = {
    contactPage: {
      status: liveContact.status,
      elapsedMs: liveContact.elapsedMs,
    },
    status: liveStatus,
    invalid: liveInvalid,
  };
}

async function runLiveSubmission() {
  const response = await fetchJson(`${SITE}/api/contact`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      referer: `${SITE}/contact/?utm_source=codex&utm_medium=verification&utm_campaign=contact-repair`,
      "user-agent": "LongPro contact verify live submission",
    },
    body: JSON.stringify({
      name: "LONGPRO TEST LEAD - IGNORE",
      email: "noreply+longpro-contact-proof@example.com",
      service: "other",
      message: LIVE_TEST_MARKER,
      utm_source: "codex",
      utm_medium: "verification",
      utm_campaign: "contact-repair",
    }),
  }, 6000);

  artifacts.liveSubmission = response;
  check("live marked contact submit returns success JSON", response.status === 200 && response.json?.ok === true, JSON.stringify(response.json));
  check("live marked contact submit returns in under 2 seconds", response.elapsedMs < 2000, `elapsedMs=${response.elapsedMs}`);
}

function writeReports() {
  mkdirSync(REPORT_DIR, { recursive: true });
  const failures = checks.filter((item) => !item.passed);
  const report = {
    generatedAt: new Date().toISOString(),
    site: SITE,
    checks,
    failures,
    artifacts: {
      ...artifacts,
      mockRequestCount: mockRequests.length,
    },
    liveTestMarker: shouldSubmitLiveLead ? LIVE_TEST_MARKER : null,
  };

  writeFileSync(`${REPORT_DIR}/contact-submit-repair.json`, `${JSON.stringify(report, null, 2)}\n`);

  const lines = [
    "# Contact Submit Repair",
    "",
    `- Date: ${DATE_STAMP}`,
    `- Site: ${SITE}`,
    `- Checks: ${checks.length}`,
    `- Failures: ${failures.length}`,
    `- Live checks run: ${shouldRunLiveChecks ? "yes" : "no"}`,
    `- Live marked submit run: ${shouldSubmitLiveLead ? "yes" : "no"}`,
    "",
    "## Checks",
    "",
    ...checks.map((item) => `- ${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? ` — ${item.detail}` : ""}`),
    "",
    "## Artifacts",
    "",
    `- JSON report: \`reports/seo/${DATE_STAMP}/contact-submit-repair.json\``,
    `- Live test marker: ${shouldSubmitLiveLead ? `\`${LIVE_TEST_MARKER}\`` : "not sent"}`,
    "",
  ];

  writeFileSync(`${REPORT_DIR}/contact-submit-repair.md`, `${lines.join("\n")}\n`);
}

try {
  await runLocalVerification();
  if (shouldRunLiveChecks) {
    await runLiveChecks();
  }
  if (shouldSubmitLiveLead) {
    await runLiveSubmission();
  }
} finally {
  writeReports();
}

for (const item of checks) {
  console.log(`${item.passed ? "PASS" : "FAIL"}: ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

const failures = checks.filter((item) => !item.passed);
if (failures.length > 0) {
  process.exitCode = 1;
} else {
  console.log("All contact submit checks passed.");
}
