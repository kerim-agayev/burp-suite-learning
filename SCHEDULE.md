# Weekly schedule

Assumption: ~6-8 h/week (4-5 sessions). Week 1 starts **2026-11-16**. Slipping is fine — keep the order, not the dates.
Each lesson = its own file in `lessons/<phase folder>/lesson_N_<topic>.html`.
Columns: **PS** = PortSwigger Academy labs (Apprentice unless noted), **THM** = TryHackMe (path/module names; check live room list).

Already done: L1 HTTP, L2 cookies/tokens/sessions, L3 encoding, API testing path (5 labs).

## Phase 0: Foundations (weeks 1-2)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 1 | L4 HTML, JavaScript, DOM · L5 HTTPS/TLS + Burp CA certificate | — | Pre Security → web / "how websites work" rooms |
| 2 | L6 SQL basics (`SELECT`, `WHERE`, `UNION`) · L7 Same-Origin Policy | — | Pre Security → networking basics (DNS, HTTP in detail) |

## Phase 1: Burp tools (week 3)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 3 | L8 Proxy, Intercept, Target scope, Site map · L9 Repeater, Intruder, Comparer · L10 Logger, Sequencer, Match and replace, Bambdas, Organizer, Extensions | Essential skills | Web Fundamentals → Burp Suite section |

## Phase 2: Server-side, Apprentice (weeks 4-12)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 4 | L11 SQL injection | SQLi Apprentice | — |
| 5 | L12 Authentication | Authentication Apprentice | — |
| 6 | L13 Path traversal · L14 Command injection | both Apprentice | — |
| 7 | L15 Business logic · L16 Information disclosure | both Apprentice | — |
| 8 | L17 Access control (IDOR, admin panels) | Access control Apprentice | — |
| 9 | L18 File upload · L19 SSRF | both Apprentice | — |
| 10 | L20 XXE · L21 NoSQL injection | both Apprentice | — |
| 11 | L22 Race conditions | Race conditions Apprentice | — |
| 12 | Review week | redo 3 hardest labs without hints | OWASP Top 10 room · Jr Penetration Tester → web section |

## Phase 3: Client-side, Apprentice (weeks 13-17)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 13 | L23 XSS reflected + stored | XSS Apprentice | XSS room |
| 14 | L24 DOM XSS · L25 DOM-based vulnerabilities | DOM Apprentice | — |
| 15 | L26 CSRF | CSRF Apprentice | CSRF room |
| 16 | L27 CORS · L28 Clickjacking (`kmplast.az` as example) | both Apprentice | — |
| 17 | L29 WebSockets + review | WebSockets Apprentice | Jr Penetration Tester → client-side rooms |

## Phase 4: Practitioner (weeks 18-29)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 18-19 | SQLi deep dive (blind, out-of-band theory) | SQLi Practitioner | — |
| 20 | Auth + access control deep dive | Practitioner | — |
| 21 | L30 OAuth | OAuth | — |
| 22 | L31 JWT attacks (JWT Editor extension) | JWT | — |
| 23 | L32 Server-side template injection | SSTI | — |
| 24 | L33 Insecure deserialization | Deserialization | — |
| 25 | L34 Prototype pollution | Prototype pollution | — |
| 26 | L35 GraphQL API vulnerabilities | GraphQL | — |
| 27 | L36 HTTP Host header attacks | Host header | — |
| 28 | L37 Web LLM attacks | Web LLM | — |
| 29 | Review week | XSS/CSRF Practitioner | finish Jr Penetration Tester (PT1 cert optional) |

## Phase 5: Advanced (weeks 30-38)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 30-31 | L38 HTTP request smuggling | Request smuggling | — |
| 32-33 | L39 Web cache poisoning | Cache poisoning | — |
| 34 | L40 Web cache deception | Cache deception | — |
| 35-37 | Mystery labs + selected Expert labs | Mystery labs | Web Application Pentesting path |
| 38 | Review | — | — |

## Phase 6: Real world (week 39+)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 39-40 | L41 Bug bounty: scope, recon, rules · L42 Writing a report | — | — |
| 41+ | BSCP practice exam (needs Burp **Pro**) | Practice exam | — |

## Phase 6b: Pentest process (after BSCP prep, weeks ~42-44)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 42 | Pentest lifecycle, scoping, RoE, legal/ethics | — | Pentesting Fundamentals |
| 43 | OWASP WSTG, CVSS, report writing | — | — |
| 44 | Mini-pentest on own burp-lab (scope doc → findings report → fix → retest) | — | — |

## Phase 7: Beyond web, light overview (weeks ~45-50, awareness level)

| Week | Lessons | PS | THM |
|---|---|---|---|
| 45 | Network basics, `nmap` on own VM | — | Network Fundamentals, Nmap |
| 46 | Mobile app traffic via Burp (own test app) | — | — |
| 47 | Cloud basics, shared responsibility | — | cloud intro rooms |
| 48 | Social engineering / phishing / malware: concepts + defense only | — | Phishing awareness rooms |
| 49 | DoS/DDoS: concept + defense only (no attack traffic) | — | — |
| 50 | Wrap-up, what to specialise in next | — | — |

**Total: ~42 web lessons (~9-10 months) + ~6 pentest/beyond-web lessons.**

## Extras log (user-added THM rooms / PortSwigger labs)

When the user adds something, Claude: (1) puts it in the matching week's row above, (2) logs it here, (3) after finishing, adds it to that week's lesson file (or `lessons/extras/`).

| Date | Source | Name | Week placed | Status |
|---|---|---|---|---|
