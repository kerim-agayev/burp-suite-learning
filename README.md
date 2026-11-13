# Burp Suite + Etik Hakerlik: öyrənmə jurnalı

Burp Suite-i və veb etik hakerliyi sıfırdan, Claude Code ilə birlikdə öyrənmək üçün şəxsi layihə.
Əsas mənbə: [PortSwigger Web Security Academy](https://portswigger.net/web-security).

## Fayllar

| Fayl | Nə üçündür |
|---|---|
| [ROADMAP.md](ROADMAP.md) | Öyrənmə planı: 7 mərhələ, Academy-nin 31 mövzusu, `[ ]` / `[~]` / `[x]` ilə irəliləyiş |
| [CLAUDE.md](CLAUDE.md) | Claude-un hər sessiyada oxuduğu fayl: hazırkı vəziyyət, qaydalar, jurnal (nə etdik, niyə etdik) |

## Başqa kompüterdə davam etmək

1. Repo-nu klonlayın:
   ```
   git clone https://github.com/kerim-agayev/burp-suite-learning.git
   cd burp-suite-learning
   ```
2. Burp Suite quraşdırın, sonra `Extensions → BApp Store → MCP Server` → Install. MCP tabında **Enabled** qutusunu işarələyin.
3. Burp-u Claude Code-a qoşun:
   ```
   claude mcp add --scope user --transport http burp http://127.0.0.1:9876/mcp
   ```
4. Bu qovluqda Claude Code-u açın və belə yazın: **"CLAUDE.md-yə bax, qaldığımız yerdən davam edək"**.
5. Dərsdən sonra dəyişiklikləri yükləyin: `git add -A && git commit -m "..." && git push`. O biri kompda işə başlamazdan əvvəl `git pull` edin.

## Qayda

Yalnız icazəli hədəflər test olunur: PortSwigger labları və öz saytlarım (yalnız passiv yoxlama).
