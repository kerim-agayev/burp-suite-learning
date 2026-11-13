# Burp Suite + Ethical Hacking Roadmap (from zero)

Source: [PortSwigger Web Security Academy](https://portswigger.net/web-security) (free, needs an account).
31 topics; labs in each go **Apprentice → Practitioner → Expert**. PortSwigger recommends starting with **SQL injection**.

Markers: `[ ]` not started, `[~]` in progress, `[x]` done.

## Golden rules

1. Test **authorized targets only**: PortSwigger labs, own sites (`kmplast.az`, passive only), written-permission targets.
2. Attacking others' sites "just to check" is illegal (computer crime laws, incl. Azerbaijan's Criminal Code).
3. Legal real-world practice: **bug bounty** (HackerOne, Bugcrowd, Intigriti), only in-`scope` targets.
4. After every lab answer: **What was it? Why did it work? How to prevent it?**

## Phase 0: Foundations (1-2 weeks)

- [x] How HTTP works: request/response, methods (GET, POST, PUT, DELETE), status codes (2xx/3xx/4xx/5xx)
- [ ] Headers: `Host`, `Cookie`, `Set-Cookie`, `Content-Type`, `Origin`, `Referer`
- [ ] Cookies and sessions: how a site "remembers" you after login
- [ ] URL encoding, Base64, HTML encoding (practice in Burp Decoder)
- [ ] HTML, JavaScript, DOM basics (read page source)
- [ ] HTTPS/TLS, why Burp installs its own certificate
- [ ] SQL basics: `SELECT`, `WHERE`, `UNION`
- [ ] Same-Origin Policy (SOP), base for CORS, CSRF, XSS

Practice: browse `kmplast.az` in Burp's browser, explain every request in HTTP history.

## Phase 1: Burp Suite tools (1 week)

Community Edition v2026.10.1 limits: no Scanner, throttled Intruder, no Collaborator, temporary projects only.

| Tool | What it does | Exercise |
|---|---|---|
| [ ] **Proxy** | Captures browser traffic; `Intercept` pauses and edits requests | Intercept a login, change the password, forward |
| [ ] **Target → Site map / Scope** | Site map; restrict testing to authorized hosts | Add only the lab domain to scope |
| [ ] **Repeater** | Edit and resend one request | Change a parameter, compare responses |
| [ ] **Intruder** | Send many payloads into a parameter (Sniper, Cluster bomb…) | Enumerate usernames in a lab |
| [ ] **Decoder** | URL, Base64, Hex, HTML encode/decode | Decode a cookie |
| [ ] **Comparer** | Diff two responses | Compare valid vs invalid login |
| [ ] **Logger** | All tools' traffic (incl. Claude's MCP requests) | Filter by host |
| [ ] **Sequencer** | Token randomness analysis | Analyze a session cookie |
| [ ] **Extensions / BApp Store** | Add-ons (Logger++, JWT Editor, Autorize) | Install JWT Editor (for Phase 4) |
| [ ] **CA certificate** | Lets Burp see HTTPS; built-in browser has it, others need manual install | Download from `http://burpsuite`, install in Firefox, open an HTTPS site without errors |
| [ ] **Proxy → Match and replace** | Auto-modify every request/response | Rule that adds `X-Test: 1` to all requests |
| [ ] **Bambdas** | Small Java filter scripts for HTTP history / Logger | Filter showing only `POST` or `500` responses |
| [ ] **Organizer** | Save interesting requests with notes | Send a suspicious request with a note (report habit) |

Academy topic: **Essential skills**.

## Phase 2: Server-side, Apprentice labs (3-6 weeks)

1. [ ] SQL injection
2. [ ] Authentication
3. [ ] Path traversal
4. [ ] Command injection
5. [ ] Business logic vulnerabilities
6. [ ] Information disclosure
7. [ ] Access control (IDOR, admin panels)
8. [ ] File upload vulnerabilities
9. [ ] Server-side request forgery (SSRF)
10. [ ] XML external entity (XXE) injection
11. [ ] API testing
12. [ ] NoSQL injection
13. [ ] Race conditions

## Phase 3: Client-side, Apprentice labs (3-4 weeks)

1. [ ] Cross-site scripting (XSS): reflected, stored, DOM
2. [ ] Cross-site request forgery (CSRF)
3. [ ] Cross-origin resource sharing (CORS)
4. [ ] Clickjacking
5. [ ] DOM-based vulnerabilities
6. [ ] WebSockets

Real example: `kmplast.az` has `Access-Control-Allow-Origin: *` (CORS) and no `X-Frame-Options` (Clickjacking).

## Phase 4: Practitioner (2-3 months)

Redo Phase 2-3 topics at **Practitioner** level, plus:
- [ ] OAuth authentication
- [ ] JWT attacks (JWT Editor)
- [ ] Server-side template injection (SSTI)
- [ ] Insecure deserialization
- [ ] Prototype pollution
- [ ] GraphQL API vulnerabilities
- [ ] HTTP Host header attacks
- [ ] Web LLM attacks

## Phase 5: Advanced / Expert (3+ months)

- [ ] HTTP request smuggling
- [ ] Web cache poisoning
- [ ] Web cache deception
- [ ] Selected Expert labs
- [ ] **Mystery labs** (topic hidden; closest to real testing)

## Phase 6: Real world + certification

- [ ] Pick a bug bounty program, read its `scope` (recon only)
- [ ] Write a first report: title, impact, reproduction steps, fix
- [ ] **BSCP** (Burp Suite Certified Practitioner): Academy has a practice exam. Exam needs **Burp Suite Professional**.

## Lesson format with Claude

1. **Explain:** concept in simple terms with a real example.
2. **Lab:** user opens it in Burp's built-in browser.
3. **Observe:** Claude reads HTTP history via Burp MCP.
4. **Hints, not answers.**
5. **Wrap-up:** why it worked, how to prevent it; logged in `CLAUDE.md`.
