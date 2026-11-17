# Lab Building

How to build and run the deliberately-vulnerable practice app, and how to keep
it safe and legitimate.

## Why a self-built lab

From Phase 2 on, the learner practises on their **own** deliberately-vulnerable
app rather than only PortSwigger. The payoff: for every topic you build a
matched pair — `/vuln/<topic>` (the flaw) and `/secure/<topic>` (the fix) — so
the learner runs the exact same attack against both and sees it succeed, then
fail. The contrast *is* the lesson.

## Stack (one known-good setup)

The learner's lab ("burp-lab") is a separate git repo using:
- **Next.js (App Router)** — pages (Server Components) for simple GET demos,
  **Route Handlers** (`route.js` exporting `GET`/`POST`) when you need real
  control over status codes, headers, raw body, multipart, or POST forms.
- **Prisma + a hosted Postgres (Neon)** — a small shared seed DB
  (users like `administrator` / `wiener` / `carlos`, a few products).
- Deployed to Vercel with deployment protection ON (so strangers can't reach
  the intentionally-vulnerable app).

None of this stack is sacred — any framework works. What matters is the
vuln/secure pattern and that you can control the raw HTTP. But if you're
continuing *this* learner's project, match their existing stack so labs stay
consistent.

## The vuln/secure pattern

For each topic:
- `/vuln/<topic>` implements the naive, insecure version (string-concatenated
  SQL, client-trusted price, no ownership check, unsigned token, etc.).
- `/secure/<topic>` implements the correct fix (parameterized query, server-side
  price lookup, ownership check, random server-mapped token, allowlist, etc.).
- Keep the two as similar as possible except for the one flaw, so the diff is
  legible.

Show the running query / the decision on the page when it helps understanding
(e.g. print the SQL the vuln endpoint built).

## Cover all input points

Deliberately vary where the vulnerable parameter lives across labs, so the
learner practises Burp beyond the address bar:
- GET query (`?category=`)
- POST form body (`field=value&field2=value2`)
- JSON body (`{"id":1}`)
- Cookie (`Cookie: TrackingId=...`)
- HTTP header (`X-Forwarded-For`, `User-Agent`, `Referer`)

Example: a blind-SQLi lab that injects via a **cookie**, a brute-force-lockout
lab keyed off a spoofable **header**, an IDOR lab reachable via both `?id=` and
a JSON body. This is a standing requirement from the learner.

## Safety rules for labs (do not skip)

- **Never point a lab at a real secret.** For file-read demos (path traversal,
  XXE), create a **fake decoy** file (e.g. `secret.txt` with obviously-fake
  content) and keep it gitignored. Never the real `.env` — it holds the real DB
  URL. State this explicitly to the learner each time the topic recurs.
- **Harmless commands only** in command-injection labs — `echo`, `whoami`.
  Never anything destructive.
- **Don't actually mutate shared state** that other lessons depend on. E.g. a
  password-reset lab can demonstrate a guessable token without really changing
  the account's password, so later lessons' credentials still work.
- **Never commit real credentials or the real `.env`.** The learning repo may
  be public — keep third-party findings out of it entirely, and keep lab
  secrets gitignored.

## Pre-verify before you teach

Before presenting any new endpoint, confirm it behaves as intended with your
own curl or Burp MCP call — both the vuln success and the secure rejection.
This is the one place your own tool calls belong. It keeps the lesson about the
learner's discovery, not about debugging your lab in front of them.

Example pre-check (race condition, parallel requests):
```
# vuln: same one-time code accepted many times
for i in 1 2 3 4 5; do curl -s -X POST host/vuln/redeem \
  -H 'Content-Type: application/json' -d '{"code":"WELCOME10"}' & done; wait
# secure: only one succeeds, the rest are rejected
```

## Running it

- Dev server: `npm run dev`. The port can vary between restarts (3000, else
  3001/3002…). **Check with curl at the start of each session** and use the
  live port in all URLs you give the learner.
- On a new machine: clone the lab repo, recreate `.env` from the deployment's
  env vars (never from git), `npm install`, `npm run dev`, recreate any
  gitignored decoy files. Don't re-seed a shared DB that's already seeded.

## Framework gotcha worth knowing

Modern front-end frameworks (React/Next.js) **auto-escape output by default**,
so they are XSS-safe out of the box. To build an XSS lab you must deliberately
opt out (e.g. `dangerouslySetInnerHTML`). This is itself a great teaching
point: the framework is safe by default and the developer *chose* to open the
hole. Make that explicit rather than hiding it.
