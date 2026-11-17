# Curriculum / Roadmap

The phase-by-phase plan. Based on the PortSwigger Web Security Academy topic
list, reorganized into phases and extended with real-world and
awareness topics. Work roughly in order, but follow the learner's lead when
they want to jump ahead (they have, e.g., done the API-testing path early and
skipped/paused topics to keep momentum — that's fine, just log it).

Markers to track progress in the project's state file: `[ ]` not started,
`[~]` in progress, `[x]` done.

## Phase 0: Foundations

The groundwork every later topic depends on:
- How HTTP works: request/response, methods (GET/POST/PUT/DELETE), status codes.
- Headers: `Host`, `Cookie`, `Set-Cookie`, `Content-Type`, `Origin`, `Referer`.
- Cookies and sessions: how a site "remembers" you after login.
- Encoding: URL, Base64, HTML (practise in Burp Decoder). Encoding ≠ signature
  ≠ encryption — a distinction worth nailing early.
- HTML, JavaScript, DOM basics (reading page source).
- HTTPS/TLS and why Burp installs its own CA certificate.
- SQL basics (`SELECT`, `WHERE`, `UNION`) + a first SQLi.
- Same-Origin Policy (SOP) — the base for CORS, CSRF, XSS.

## Phase 1: Burp Suite tools

One tool at a time, mostly hands-on on the lab:
Proxy (Intercept) · Target/Scope · Repeater · Intruder · Decoder · Comparer ·
Logger · Sequencer · Extensions / BApp Store · CA certificate · Match and
replace · Bambdas · Organizer.

## Phase 2: Server-side vulnerabilities

Fixed order (PortSwigger site order):
1. **SQL injection** — see the A–Z sub-plan below.
2. **Authentication** — brute-force lockout bypass (spoofable header key); 2FA
   broken logic; password-reset token predictability; "remember me" cookie
   forgery.
3. **Path traversal** — `../../` file read; fix via `basename`/allowlist.
4. **Command injection** — user input into a shell call; fix via allowlist.
5. **Business logic** — trusting a client-supplied price/role/amount.
6. **Information disclosure** — verbose errors, stack traces, fingerprinting
   headers (`X-Powered-By`, `Server`).
7. **Access control (IDOR)** — correctly identified but no per-object ownership
   check. Contrast with authentication (forging *who you are*) vs. authorization
   (being correctly known but reaching data that isn't yours).
8. **File upload** — trusting the client-sent `Content-Type`; fix via extension
   allowlist + magic bytes + `nosniff`.
9. **SSRF** — server makes its own request to an attacker-chosen URL; fix via
   hostname allowlist + protocol restriction (allowlist, not denylist).
10. **XXE** — XML `DOCTYPE`/`ENTITY` `SYSTEM` reading a local file; fix by
    rejecting DTD/entities or disabling external entities.
11. **API testing** — recon, documentation, hidden params, mass assignment,
    server-side parameter pollution (SSPP).
12. **NoSQL injection** — client controls JSON *type*; `{"$ne":""}` /`$gt`/
    `$regex` treated as query operators; fix by strict string type-checking.
13. **Race conditions** — TOCTOU gap between "check" and "use"; fix by making
    the check-and-mark atomic (before any `await`). Exploit with Burp's
    "send group in parallel".

### SQL injection A–Z sub-plan (do not skip steps)

The learner got lost when jumped straight to UNION. Build up in order:
- Step 0: SQL basics recap (table, `SELECT`, `WHERE`, `'`, `--`).
- Step 1: Retrieving hidden data (`Gifts'--`).
- Step 2: Login bypass (`' OR 1=1--`, then targeted `administrator'--`). Teach
  char-by-char: the leading quote closes the server's open quote.
- Step 3: UNION attack — column count (`ORDER BY`), which column holds text
  (`NULL` test), then pull data from another table.
- Step 4: DB recon — `version()`, table/column names via `information_schema`.
- Step 5: Blind SQLi — boolean oracle, then char-by-char extraction with
  `substring(...)='x'`; mention time-based (`pg_sleep`) and automation
  (Intruder cluster-bomb / sqlmap) as the scale-up path.
- Step 6: Prevention — parameterized queries.

## Phase 3: Client-side vulnerabilities

The big shift: the target is now **another user's browser**, not the server.
You plant something; the victim's browser runs it in the victim's session.
Ties directly back to Same-Origin Policy.

1. **XSS** (reflected, stored, DOM) — see sub-plan.
2. **CSRF** — force a logged-in victim to perform a state-changing action;
   fix via CSRF tokens / SameSite cookies.
3. **CORS** — misconfigured `Access-Control-Allow-Origin` (reflecting Origin +
   credentials) letting another site read protected data.
4. **Clickjacking** — missing `X-Frame-Options` / `frame-ancestors`; victim
   tricked into clicking through an invisible iframe.
5. **DOM-based vulnerabilities** — flaw entirely in client JS (`location.hash`
   → `innerHTML`); server-side escaping doesn't help.
6. **WebSockets** — manipulation/injection over a real-time channel.

### XSS A–Z sub-plan
- Step 0: What XSS is, why it's client-side, SOP recap. Why React is safe by
  default (auto-escape) and you must opt out to build a lab.
- Step 1: Reflected XSS (input echoed into the HTML response).
- Step 2: Stored XSS (persisted, fires in *another* user's browser — most
  dangerous).
- Step 3: DOM-based XSS (JS sink, no server involvement).
- Step 4: Contexts — payload landing in HTML vs. attribute vs. JS needs
  different syntax.
- Step 5: Prevention — output encoding, CSP, framework auto-escape,
  `HttpOnly` cookies so JS can't read them.

## Phase 4: Practitioner level

Redo Phase 2–3 topics at Practitioner difficulty, plus: OAuth, JWT attacks
(JWT Editor extension), SSTI, insecure deserialization, prototype pollution,
GraphQL, HTTP Host header attacks, web LLM attacks.

## Phase 5: Advanced / Expert

HTTP request smuggling, web cache poisoning, web cache deception, selected
Expert labs, "mystery" labs (topic hidden — closest to real testing).

## Phase 6: Real world + certification

Pick a bug-bounty program and read its scope (recon only); write a first
report (title, impact, reproduction, fix); work toward BSCP (needs Burp
Professional).

## Phase 6b: What a pentest really is

Labs are not a pentest. A pentest = **written authorization + scope +
methodology + report**. Cover: pentest lifecycle (scoping, Rules of
Engagement, recon, testing, exploitation within scope, reporting, retest);
legal/ethics; methodology (OWASP WSTG, OWASP Top 10, CVSS); report writing;
a full dry-run mini-pentest on the own lab.

## Phase 7: Beyond web (awareness level, after the web path)

Light overview, 1–2 lessons each, hands-on only in legal lab environments:
network/infra (TCP/IP, nmap basics, AD concepts), mobile app traffic, cloud
misconfig basics, social engineering / phishing / malware (**concept and
defense only — never run**), DoS/DDoS (**concept and defense only — never
run**).
