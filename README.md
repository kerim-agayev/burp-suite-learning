# Burp Suite + Ethical Hacking: learning log

Personal project for learning Burp Suite and web ethical hacking from zero with Claude Code.
Main source: [PortSwigger Web Security Academy](https://portswigger.net/web-security).

## Files

| File | Purpose |
|---|---|
| [ROADMAP.md](ROADMAP.md) | Learning plan: phases, all 31 Academy topics, progress `[ ]` / `[~]` / `[x]` |
| [SETUP.md](SETUP.md) | Connect Burp Suite to Claude Code via MCP, step by step + troubleshooting |
| [CLAUDE.md](CLAUDE.md) | Read by Claude every session: current state, rules, journal (what and why) |

## Continue on another computer

1. Clone:
   ```
   git clone https://github.com/kerim-agayev/burp-suite-learning.git
   cd burp-suite-learning
   ```
2. Connect Burp to Claude Code: follow the 6 steps in [SETUP.md](SETUP.md).
3. Reload Claude Code (`Ctrl+Shift+P` → `Developer: Reload Window`) and open a new chat.
4. Open Claude Code in this folder and write: **"CLAUDE.md-yə bax, qaldığımız yerdən davam edək"**.
5. After a lesson: `git add -A && git commit -m "..." && git push`. Before starting on the other machine: `git pull`.

## Rule

Only authorized targets: PortSwigger labs and my own sites (passive checks only).
