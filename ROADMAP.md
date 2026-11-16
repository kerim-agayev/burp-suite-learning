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
- [x] Cookies and sessions: how a site "remembers" you after login
- [x] URL encoding, Base64, HTML encoding (practice in Burp Decoder)
- [x] HTML, JavaScript, DOM basics (read page source)
- [x] HTTPS/TLS, why Burp installs its own certificate
- [x] SQL basics: `SELECT`, `WHERE`, `UNION` (+ first SQLi on burp-lab)
- [x] Same-Origin Policy (SOP), base for CORS, CSRF, XSS  ← PHASE 0 COMPLETE

Practice: browse `kmplast.az` in Burp's browser, explain every request in HTTP history.

## Phase 1: Burp Suite tools (1 week)

Community Edition v2026.10.1 limits: no Scanner, throttled Intruder, no Collaborator, temporary projects only.

| Tool | What it does | Exercise |
|---|---|---|
| [x] **Proxy** | Captures browser traffic; `Intercept` pauses and edits requests | Done 2026-11-16: intercepted burp-lab request, changed `category=Gifts`→`Gifts'--` in flight, leaked hidden product |
| [x] **Target → Site map / Scope** | Site map; restrict testing to authorized hosts | Done 2026-11-16: localhost:3002 in scope, "show only in-scope" filter, out-of-scope logging disabled |
| [x] **Repeater** | Edit and resend one request | Done 2026-11-16: burp-lab sqli, Gifts=2 / Salam123=0 / Gifts'--=3 rows |
| [x] **Intruder** | Send many payloads into a parameter (Sniper, Cluster bomb…) | Done 2026-11-16: burp-lab sqli Length-diff + new /vuln/login username enumeration via Grep-Match |
| [x] **Decoder** | URL, Base64, Hex, HTML encode/decode | Done 2026-11-16: category=Gifts'-- URL round-trip, administrator -> Base64 |
| [x] **Comparer** | Diff two responses | Done 2026-11-16: burp-lab /vuln/login administrator vs bilal, Words diff, 11 differences, found the real message difference among timestamp noise |
| [x] **Logger** | All tools' traffic (incl. Claude's MCP requests) | Done 2026-11-16: sorted by Tool column, found Proxy/Target/Repeater/Intruder/Extensions (MCP shows as Extensions) |
| [x] **Sequencer** | Token randomness analysis | Done 2026-11-16: manual load, 100 sequential SESSION1001-1100 = extremely poor/0 bits, 100 random hex tokens = excellent |
| [x] **Extensions / BApp Store** | Add-ons (Logger++, JWT Editor, Autorize) | Done 2026-11-16: installed JWT Editor via BApp Store, for Phase 4 JWT attacks |
| [x] **CA certificate** | Lets Burp see HTTPS; built-in browser has it, others need manual install | Done 2026-11-16: downloaded from `http://burpsuite`; Firefox import steps covered theoretically, not actually installed (not needed yet) |
| [x] **Proxy → Match and replace** | Auto-modify every request/response | Done 2026-11-16: burp-lab, category=Gifts -> Gifts'-- rule, verified on/off (3 vs 2 rows) |
| [x] **Bambdas** | Small Java filter scripts for HTTP history / Logger | Done 2026-11-16: `path().contains("/vuln/login") && statusCode()==200` on burp-lab history |
| [x] **Organizer** | Save interesting requests with notes | Done 2026-11-16: saved the /vuln/profile privesc request with finding/why/fix notes — **PHASE 1 COMPLETE (13/13)** |

Academy topic: **Essential skills**.

## Phase 2: Server-side, Apprentice labs (3-6 weeks)

1. [x] SQL injection — done 2026-11-16 on burp-lab (login bypass, UNION + DB recon, blind via cookie); Lessons 21-23
2. [ ] Authentication
3. [ ] Path traversal
4. [ ] Command injection
5. [ ] Business logic vulnerabilities
6. [ ] Information disclosure
7. [ ] Access control (IDOR, admin panels)
8. [ ] File upload vulnerabilities
9. [ ] Server-side request forgery (SSRF)
10. [ ] XML external entity (XXE) injection
11. [x] API testing (done 2026-11-15, early — 5 labs incl. 1 expert; recap in lessons/api_testing/api_testing.html)
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

## Phase 6b: What a pentest really is (after Phase 5)

Learning labs are not a pentest. A pentest = **written authorization + scope + methodology + report**.

- [ ] Pentest lifecycle: scoping, Rules of Engagement, recon, testing, exploitation (within scope), reporting, retest
- [ ] Legal/ethics: written permission, NDA, scope limits, data handling, responsible disclosure; Azerbaijan law basics
- [ ] Methodology: OWASP WSTG (Web Security Testing Guide), OWASP Top 10, CVSS severity scoring
- [ ] Report writing: title, impact, severity, reproduction steps, fix, evidence; write one for a burp-lab finding
- [ ] Full dry run on **burp-lab** (own app) as a mini-pentest: scope doc, test, findings report, fix, retest
- [ ] Cheaper path to real experience: bug bounty (in-scope only), TryHackMe/HTB, own-VM labs

## Phase 7: Beyond web (light overview, AFTER web path; each = 1-2 lessons, awareness level)

Not the main goal. Goal: understand how the rest of the security world fits around web, and be able to talk about it. **Hands-on only in legal lab environments** (own VMs, TryHackMe/HTB rooms). Never against real third-party systems.

| Area | What we learn | Safe practice |
|---|---|---|
| [ ] Network / infrastructure | TCP/IP, ports, `nmap` basics, services, Active Directory concepts, Wi-Fi security concepts | Own VM / TryHackMe rooms (Nmap, Network Fundamentals) |
| [ ] Mobile apps | Android/iOS app traffic via proxy, certificate pinning idea, OWASP MASVS | Own test app, intercept with Burp |
| [ ] Cloud | Shared responsibility, misconfigured storage/IAM, secrets in code; AWS/Azure basics | Free-tier own account, TryHackMe cloud rooms |
| [ ] Social engineering / phishing / malware | How phishing works, red flags, awareness and defense, malware types at concept level | Concepts + defensive detection only; no real phishing, no malware creation |
| [ ] DoS / DDoS | **Concept and defense only**: how it works, rate limiting, CDN/WAF, why it is illegal. We never run DoS against anything | Reading + discussing mitigations; no attack traffic |

Rule 1 in `CLAUDE.md` still applies: authorized targets only; no brute-force, fuzzing or DoS against real systems.

## Lesson format with Claude

1. **Explain:** concept in simple terms with a real example.
2. **Lab:** user opens it in Burp's built-in browser.
3. **Observe:** Claude reads HTTP history via Burp MCP.
4. **Hints, not answers.**
5. **Wrap-up:** why it worked, how to prevent it; logged in `CLAUDE.md`.
