<!-- plan-tracker:start -->
# Plan Tracker — Agent Rules

This project uses the `plan-tracker` MCP server. Follow these rules automatically in both Claude and Codex.
Do NOT wait for the user to tell you to mark things done.

## Opening the Dashboard — MANDATORY
If the user says ANYTHING like "initiate plan tracker", "pull up the plan tracker", "open plan tracker",
"show the dashboard", "plan open", "show me the tracker", or similar:
- Call `plan_open` IMMEDIATELY. This is non-negotiable.
- The tool returns the dashboard path AND tells you exactly what to do next (present it in the sidebar or ask).
- DO NOT respond to the user before calling `plan_open`.
- DO NOT describe or summarize the plan instead of showing it.
- DO NOT tell the user where the file is without presenting it.

## Session Start
1. Call `plan_status` at the start of every session to see the current plan state.
2. Call `plan_next` to identify the first incomplete task and any optional slice recommendation.
3. If `plan_next` shows a useful slice package, call `plan_slice` to inspect that grouped work package.
4. Call `plan_open` to show the dashboard to the user.

## Preflight / Connectivity Check
When the work crosses files, modules, APIs, contracts, or other boundaries, call `plan_preflight` before coding.
The tracker will surface a preflight summary automatically when a plan is loaded or opened, so use that output to catch missing links, missing files, and missing proof steps before implementation.

## Prompt Badge
If you receive a worker prompt without a `plan-tracker-badge` fenced block at the top:
- Call `plan_enhance_prompt` yourself before starting work.
- If `plan_enhance_prompt` returns `reject`, abort and return the report to the orchestrator.
- Do not start implementation until the prompt has a valid badge or the orchestrator supplies a corrected prompt.

## While Working
5. The moment you finish any work that matches a tracked task, call `plan_done` immediately with its phase and task number.
   Do not batch completions or wait until the end of the session. One task done = one `plan_done` call.
6. `plan_done` refreshes `.plan/dashboard.html` automatically.
7. If you need to reverse a mistaken completion, call `plan_undone` immediately.
8. If a whole phase is finished at once, call `plan_phase_done` so the tracker stays accurate.
9. If you make a key decision about a task, call `plan_note` to record it right away.

## Context Reset / Picking Up Mid-Session
If the dashboard shows tasks at 0% but work has already been done, call `plan_sync` with a
plain-language description of what was completed. The tool fuzzy-matches your description to
tasks and marks them done automatically. Use this whenever you are resuming after a context
compression or starting a new conversation where prior work wasn't tracked.

## Owner-aware Queues (Your Queue / Agent Queue / Waiting)
When a plan has owner annotations, `plan_next` will skip tasks owned by `user` or `waiting` —
it picks the next *agent-owned* incomplete task. If `plan_status` shows a non-empty Your Queue,
surface that to the user explicitly: those are the tasks only they can do, and the agent queue
will stall behind them.

- Call `plan_queues` whenever the user asks "what is on my plate?" or "what's the agent doing?".
- When you discover a task only the human can complete (vendor consoles, physical device, real
  Twilio/Postmark/Apple/Stripe credentials, real-world action), call `plan_own` with
  `owner: "user"` and, if you know it, the `unblocks` array of agent-task taskKeys it frees.
- For tasks blocked at a third party (App Store review, 10DLC vetting, Postmark DKIM), call
  `plan_own` with `owner: "waiting"` and `vendor` / `since` so the dashboard can show
  "waiting Nd" — these don't count against the agent or user queue size.
- `plan_suggest_owners` is a heuristic-only command for first-pass triage; it never mutates.

## Session End
10. Call `plan_status` to confirm progress is correctly recorded.
11. Optionally call `plan_efficiency` to score how well you followed the protocol; the dashboard will show the result.

## Non-Negotiable Rules
- Never tell the user a task is done without calling `plan_done` first.
- Never leave a completed task unchecked. If the work is done, update the plan immediately.
- Never assume a task is complete — always verify with `plan_status`.
- The plan tracker is the source of truth, not your memory or the conversation history.
- When the user asks to open/initiate/pull up the plan tracker, always call `plan_open` — never skip it.
- If you finished tasks without calling `plan_done`, call `plan_sync` immediately to catch up.
<!-- plan-tracker:end -->
