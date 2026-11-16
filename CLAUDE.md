# CLAUDE.md: Burp Suite + ethical hacking learning project

Auto-loaded every session. Purpose: know **where we left off, what we did, and why**.
At the end of every lesson: update "Current state", add a row to "Journal", commit + push.

## User

- Learning Burp Suite and web ethical hacking **from zero**.
- **ALWAYS talk to the user in Azerbaijani.** Keep technical terms in English ("request", "payload"). These files are in English only to save tokens.
- Plan: [ROADMAP.md](ROADMAP.md) (what) + [SCHEDULE.md](SCHEDULE.md) (week by week, ~42 lessons). User will add TryHackMe paths/rooms and PortSwigger labs along the way → follow the "Extras log" rule in SCHEDULE.md.

## Current state

- **DETOUR (user's choice, 2026-11-15, started on home PC; user also studies on a work PC, so read this first after `git pull`):** user deliberately jumped ahead to the **Academy "API testing" learning path** and wants to finish the whole path in one day. Goal: complete all its sections, THEN return to the planned sequence below (Lesson 2).
  - Path URL: https://portswigger.net/web-security/learning-paths/api-testing/api-testing-api-recon/api-testing/api-recon
  - Section checklist (site order): 1 API recon → 2 API documentation → 3 Identifying and interacting with API endpoints → 4 Finding hidden parameters → 5 Mass assignment vulnerabilities → 6 Preventing vulnerabilities in APIs → 7 Server-side parameter pollution → 8 SSPP in the query string → 9 SSPP in REST paths → 10 SSPP in structured data formats → 11 SSPP with automated tools → 12 Preventing SSPP.
  - Format: user pastes each section's text; Claude explains in Azerbaijani, user solves the lab in Burp's browser, Claude hints (see Rule 7).
  - **API testing: COMPLETE (2026-11-15).** All 12 sections done, 5 labs solved: API documentation, unused endpoint, mass assignment, SSPP query string (`field=reset_token`), SSPP REST URL (EXPERT: path traversal `foobar/../../../../../openapi.json#` leaked the OpenAPI doc → `/api/internal/v1/users/{username}/field/{field}` → read admin `passwordResetToken`). **DETOUR FINISHED — return to the main plan: Lesson 2, cookies and sessions.**
  - **Study docs live in `lessons/`** (Azerbaijani, "nə etdik / niyə işlədi / necə qarşısı alınır"). Open `lessons/index.html`. Layout: `assets/style.css` + `assets/theme.js` (shared), `phase0_foundations/lesson_N_<topic>.html`, `api_testing/api_testing.html`, `extras/`, `glossary.html`. **RULE: every new lesson = a NEW file `lesson_N_<topic>.html` in its phase folder (e.g. `phase2_server_side/`), using an existing lesson file as the template (same head/crumbs/footer, `../assets/`), with prev/next links, + a line in `lessons/index.html`. Academy topics get their own folder/file. Never merge lessons into one file.** (Old single `LESSONS.html` was split on 2026-11-16.)
- **Phase (main plan):** 0 (Foundations). Lesson 1 done. Phase 2 item 11 (API testing) is being done early via the detour above.
- **Lesson 2 (cookies, tokens, sessions): DONE 2026-11-16.**
- **Lesson 3 (encoding: URL, Base64, HTML) DONE 2026-11-16.**
- **Lesson 4 (HTML/JS/DOM) DONE 2026-11-16.**
- **Lesson 5 (HTTPS/TLS + Burp CA) DONE 2026-11-16.**
- **Next: Lesson 6, SQL basics** (`SELECT`, `WHERE`, `UNION`; analogy idea: a library card catalogue / Excel table). Then L7 SOP to finish Phase 0. User is NOT a developer: explain every term from zero.
- **Teaching style that works (user's feedback 2026-11-16):** the first abstract Lesson 2 explanation was NOT understood. Re-done from zero on the user's own real app traffic with a gym-card analogy → understood. Always: everyday analogy first, then the user's OWN live traffic, small steps, one Repeater action at a time.
- **Weak spots:** Lesson 1 Q1 (blank line separates headers/body) finally answered correctly 2026-11-16 ✅. Confused encryption vs signature (thought JWT is encrypted) → corrected with seal/safe analogy; re-check later. XSS unknown (expected, Phase 3).
- **User is not a developer** (said 2026-11-16): avoid code jargon; tables + everyday analogies + one Burp action per step.
- **Public repo:** this GitHub repo is PUBLIC. Never commit vulnerabilities found in third-party/production systems (e.g. Clopos); keep lesson files generic for those.
- **Open questions:** none.

## Environment

- **Burp Suite Community Edition v2026.10.1** at `C:\Users\user\AppData\Local\Programs\BurpSuite`. Proxy `127.0.0.1:8080`. Community limits: no Scanner, throttled Intruder, no Collaborator.
- **Burp MCP Server extension v1.4.0** (BApp Store, PortSwigger): `http://127.0.0.1:9876/mcp`, added to Claude Code as `burp` (user + local scope). Tools `mcp__burp__*`: proxy history, send HTTP/1/2, create Repeater tab, send to Intruder, encode/decode.
  - New machine setup + troubleshooting: [SETUP.md](SETUP.md).
  - **If `burp` tools are missing:** Burp running? MCP tab `Enabled` checked? Then `Ctrl+Shift+P` → `Developer: Reload Window` and open a new chat.
- GitHub MCP plugin fails (`Authorization header is badly formatted`). Not fixed; not needed.

## Rules for Claude

1. **Authorized targets only:** PortSwigger labs (`*.web-security-academy.net`) and the user's own site `kmplast.az` (passive only: GET, headers, browser traffic). `client.clopos.menu` (production SaaS, user's own account): **observe only** — user logs in themselves, Claude reads proxy history, removing own cookie/token in Repeater is OK; NO tampering with IDs/params, no other accounts. **Never write credentials into any file or commit.** No other targets. No brute-force, fuzzing, or DoS.
2. **Act as a teacher:** never give lab solutions directly. Hint first, then direction, full solution only if the user asks.
3. After each lab ask: What was it? Why did it work? How to prevent it?
4. Burp MCP has **no tool to read Logger or Repeater results**. To check the user's Repeater work, ask for a screenshot or resend the request yourself with `send_http1_request`.
5. Use config-changing tools (`set_project_options`, `set_user_options`, `set_proxy_intercept_state`) only when the user asks.
6. **Git:** after each lesson commit + push `CLAUDE.md` + `ROADMAP.md`. Repo `kerim-agayev/burp-suite-learning`. **Only the `kerim-agayev` GitHub account; `kerim-agayev-2026` is FORBIDDEN.** Remote URL must include the username: `https://kerim-agayev@github.com/kerim-agayev/burp-suite-learning.git`. On a new machine run `git pull` first.
7. **Topic workflow:** labs run on PortSwigger's site (progress saved there). Each Academy topic is a learning path with sub-sections (e.g. API testing: recon → documentation → endpoints → hidden params → mass assignment → server-side parameter pollution → prevention). Go section by section in the site's order: explain in Azerbaijani → user solves that section's lab in Burp's browser → hints via proxy history → "why/prevent" → log. User may paste the path's contents list; use it as the checklist.
8. Don't dump large `send_http1_request` responses to the user; extract only what matters.

## Journal (newest first)

| Date | What | Why |
|---|---|---|
| 2026-11-16 | **Lesson 5: HTTPS/TLS** done. Postcard vs locked envelope + passport (CA = notary); Burp = MITM postman. Compared cert issuer: Burp browser = PortSwigger, normal Chrome = Google Trust Services. Answers: Q1 ✅, Q2 ✅, Q3 (does 🔒 mean no XSS/SQLi?) didn't know → armored-truck analogy. File `lesson_5_https_tls.html`. | Needed to understand why Burp can read HTTPS. |
| 2026-11-16 | **Lesson 4: HTML/JS/DOM** done. kmplast.az: picked an RSC/JSON row first (no HTML) → learned to pick MIME=HTML; found `<title>K&amp;M Plast`, `/about` link, 14 `<script`. Clopos: Ctrl+U = empty `#root`, F12 Elements = full (React). Console `document.title` changed, F5 reverted. Saw Self-XSS warning. Answers: Q1 ✅, Q2 ✅ (React), Q3 ✅ (XSS). File `lessons/phase0_foundations/lesson_4_html_js_dom.html`. | Needed before XSS / DOM topics. |
| 2026-11-16 | Split `LESSONS.html` into `lessons/` (one HTML file per lesson, folders per phase, shared CSS/JS, `index.html`). | User wants to find each lesson separately in the file tree. |
| 2026-11-16 | **Lesson 3: encoding** done in Burp Decoder. URL decode (`%2C`, `%20%26%20...%3F`), Base64 decode/encode of `{"user_id":1,"is_owner":true}`, noticed trailing `Cg==` (newline). Answers: Q1 `user=admin` ✅, Q3 `%3C` = `<` ✅ (filter bypass explained), Q2 wrong (thought JWT encrypted) → explained encoding vs signature vs encryption. Added Lesson 3 card to LESSONS.html. | User asked to be taught as a non-developer, from zero. |
| 2026-11-16 | **Lesson 2: cookies/tokens/sessions** done on user's own `client.clopos.menu` account (observe only). Found login `POST` (no `Set-Cookie`) → app uses JWT `Authorization: Bearer`, `exp` = 1h. Repeater: with token 200; no header 401; one char changed 401 (signature); bonus logout test done. Answers: Q1 partly (1h; completed: no password needed, full owner access); Q2 XSS explained. Two observations told to the user verbally for internal reporting; deliberately NOT written here (public repo). Added Lesson 2 card to LESSONS.html. | User didn't understand abstract version; real own traffic + analogy worked. |
| 2026-11-15 | API testing: solved 4 labs (documentation, unused endpoint, mass assignment, SSPP query string). Created **LESSONS.html** — Azerbaijani study doc, all lessons as nə/niyə/necə qarşısı alınır. | User wanted a readable recap to reread; keep extending it per section. |
| 2026-11-15 | **Detour to API testing path** (user's request, home PC; work PC continues from the same notes). Skipped ahead of Lesson 2 on purpose to finish the Academy API testing path in one day, then return to Lesson 2. Repo cloned fresh on home PC. | User wants a full topic done today; labs are saved on PortSwigger's site per account, so progress is shared across PCs. |
| 2026-11-13 | Translated all .md files to English (user still spoken to in Azerbaijani). | Fewer tokens per session. |
| 2026-11-13 | **Lesson 1: HTTP request/response** done. Repeater on `kmplast.az`: `/about` → 200, `/bu-sehife-yoxdur` → 404, `HEAD` → 200 without body, no Host → 400. Mistake: user put the path in the `Host` header → Cloudflare 400 (bridge to Host header attacks). Questions: Q3 correct (5xx = server error, interesting); Q1 (blank line) and Q2 (never trust the client) explained. | HTTP is the base of all web hacking; first Repeater practice. |
| 2026-11-13 | Added CA certificate, Match and replace, Bambdas, Organizer to Phase 1. Pushed repo `kerim-agayev/burp-suite-learning`. | Everyday Burp features. Repo lets the user continue on the home PC. |
| 2026-11-13 | Created `ROADMAP.md` and `CLAUDE.md`. All 31 Academy topics split into phases. | Structured learning + continuity across sessions. |
| 2026-11-13 | Passive analysis of `kmplast.az` (Burp proxy + MCP). Findings: Next.js + Vercel + Cloudflare; HSTS present; `Access-Control-Allow-Origin: *`; no CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`; every page has meta description `"Generated by create next app"`; duplicate `<title>`; old Bootstrap 5.2.3 and slick-carousel 1.6.0. Contact form not tested. | See Burp on a real site. Findings reused as examples in Phase 3 (CORS, Clickjacking). |
| 2026-11-13 | Installed Burp MCP Server extension, connected to Claude Code. Created Repeater tab `kmplast-home`. | Lets Claude see the user's Burp traffic while teaching. |
