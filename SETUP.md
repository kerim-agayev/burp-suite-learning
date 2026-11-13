# Burp Suite + Claude Code via MCP (step by step)

How we connected them on the first machine (2026-11-13). About 10 minutes on any Windows PC.

## How it works

```
Claude Code  ──HTTP──▶  127.0.0.1:9876/mcp  ──▶  Burp "MCP Server" extension  ──▶  Burp (Proxy, Repeater, Intruder…)
```

PortSwigger's official **MCP Server** extension runs a small server inside Burp. Claude Code connects to it and drives Burp with `mcp__burp__*` tools (read proxy history, send requests, open Repeater tabs…). It listens on `127.0.0.1` only, so it's reachable only from your own machine.

## Requirements

- Burp Suite (Community is enough): https://portswigger.net/burp/releases
- Claude Code (VS Code extension or CLI)
- This repo: `git clone https://github.com/kerim-agayev/burp-suite-learning.git`

## Steps

### 1. Install the MCP Server extension in Burp
1. Open Burp (`Temporary project` → `Start Burp`).
2. **Extensions** → **BApp Store** → search `MCP Server`.
3. **MCP Server** (by PortSwigger) → **Install**.
4. A new **MCP** tab appears in the top menu.

### 2. Enable the server
1. **MCP** tab → check **Enabled**.
2. Host `127.0.0.1`, port `9876`. Don't change.
3. Keep **Auto-approve** options and **"Enable tools that can edit your config"** **off**, so Burp asks you before Claude sends requests.

### 3. Verify it listens (PowerShell)
```powershell
Get-NetTCPConnection -State Listen -LocalPort 9876
```
A line `127.0.0.1  9876` means it works. Nothing → back to step 2.

### 4. Add it to Claude Code
```powershell
claude mcp add --scope user --transport http burp http://127.0.0.1:9876/mcp
```
`--scope user` matters: with `local` scope it did not show up in VS Code's `/mcp` list.

Check:
```powershell
claude mcp list
```
Expect `burp: http://127.0.0.1:9876/mcp (HTTP) - √ Connected`.

### 5. Reload Claude Code
MCP servers load **only when a session starts**; an open chat won't see a new server.
- VS Code: `Ctrl + Shift + P` → `Developer: Reload Window` → **new chat**.
- CLI: exit `claude` and start again.

### 6. Test
1. In the new chat type `/mcp`; `burp` should be **Connected**.
2. Ask Claude: **"Burp proxy tarixçəsindəki son 5 sorğunu göstər"**.
3. Empty history returns `Reached end of items`, which still proves the connection works.
4. To create traffic: Burp **Proxy → Intercept → Open browser**, visit any site with **Intercept off**.

## Troubleshooting (hit on the first machine)

| Problem | Cause | Fix |
|---|---|---|
| `claude mcp list` says Connected, but Claude has no tools | Chat started before the server was added | Step 5: Reload Window + new chat |
| `burp` missing from VS Code `/mcp` list | Added with `local` scope | Re-add with `--scope user` (step 4) |
| Port 9876 not listening | Burp closed or `Enabled` unchecked | Open Burp, check `Enabled`. **Always start Burp before Claude Code.** |
| `403 Forbidden` opening `127.0.0.1:9876/mcp` in a browser/curl | Server rejects plain requests | Normal. Verify with `claude mcp list` |
| Claude's requests not in **Proxy → HTTP history** | MCP requests bypass the proxy | See the **Logger** tab |
| Nothing happens when Claude sends a request | Burp is waiting for approval | Switch to Burp, click **Allow** |

## Remove
```powershell
claude mcp remove burp -s user
```
