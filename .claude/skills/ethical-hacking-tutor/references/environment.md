# Environment: Burp Suite + Burp MCP

The tooling the learner uses, its limits, and reusable gotchas.

## Burp Suite Community Edition

- Proxy at `127.0.0.1:8080`. The built-in Chromium browser already trusts
  Burp's CA, so HTTPS is readable there without extra setup.
- **Community limits — teach within them:** no Scanner, Intruder is throttled
  (slow — fine for small payload lists, not real fuzzing), no Collaborator,
  temporary projects only. For anything that would need unthrottled Intruder,
  explain the technique and mention sqlmap / cluster-bomb as the real scale-up
  path rather than running a huge job live.

## Burp MCP Server extension

A PortSwigger BApp-Store extension exposes Burp to Claude Code over MCP
(tools typically named `mcp__burp__*`): read proxy history, send HTTP/1 and
HTTP/2 requests, create Repeater tabs, send to Intruder, encode/decode.

**What it is for (and not for):** use it to **pre-verify a lab works before
the lesson**, and to re-send a request yourself only when you genuinely need
to confirm a result the learner can't easily show you. It is NOT for doing the
exploit in the learner's place during a lesson — see `teaching-method.md`.

**There is no tool to read the learner's Logger or Repeater results.** To
check their work, ask for a screenshot or re-send the request yourself with
`send_http1_request` and compare.

**Config-changing tools** (`set_proxy_intercept_state`, `set_project_options`,
`set_user_options`) — use only when the learner asks.

**If the `mcp__burp__*` tools are missing:** check Burp is running and the MCP
extension's tab shows "Enabled", then reload the Claude Code window and open a
new chat.

## Reusable gotchas

- **Repeater request-line form.** If a Repeater request's first line has the
  FULL URL (absolute-form target: `POST http://host:port/path HTTP/1.1`), some
  dev servers (e.g. Next.js) answer `308` redirecting to themselves. Fix: use
  the Raw tab and make the first line path-only — `POST /path HTTP/1.1` — plus
  an explicit `Host:` header.
- **"Use HTTPS" on a plain-HTTP lab.** When building a Repeater tab for a local
  HTTP lab, Burp may default the target to `https://`. Edit the target (pencil
  icon) and uncheck "Use HTTPS", or requests will fail.
- **Dev-server port drift.** A local lab's port changes between restarts
  (3000 → 3001 → 3002…). Re-check with curl at the start of each session and
  use the live port in every URL you hand the learner.
- **Browser splits `&` in the address bar.** A payload like `?name=a & whoami`
  typed in the address bar fails because the browser treats the literal `&` as
  a query-string separator before the server sees it. Re-teach URL encoding
  (`%26`) — a good callback to the encoding lesson.
- **Non-ASCII in Intruder Grep-Match.** Matching a non-ASCII word (e.g. a word
  with `ı`) can silently fail to match the page bytes. Prefer an ASCII
  substring of the target text as the match string.
- **Length as a signal is noisy.** When a reflected value (like a username) is
  echoed into the page, response Length mixes message length with the echoed
  value's length, so two different cases can collide. Use Grep-Match on a
  distinctive word instead, or Comparer for two specific responses.

## Git / continuity

The learner syncs across machines via git. After each lesson, commit + push the
state file, the roadmap, and the lesson write-up so another machine can `git
pull` and resume. On a new machine, `git pull` first. Keep lab secrets and real
credentials out of git entirely (the learning repo may be public).
