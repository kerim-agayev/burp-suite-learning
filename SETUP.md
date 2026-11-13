# Burp Suite + Claude Code: MCP ilə qoşulma (addım-addım)

İlk kompda belə qoşduq (2026-11-13). Bu faylı izləsəniz, istənilən Windows kompda təxminən 10 dəqiqəyə qoşulur.

## Necə işləyir

```
Claude Code  ──HTTP──▶  127.0.0.1:9876/mcp  ──▶  Burp "MCP Server" extension  ──▶  Burp (Proxy, Repeater, Intruder…)
```

PortSwigger-in rəsmi **MCP Server** extension-ı Burp-un içində kiçik bir server açır.
Claude Code həmin serverə qoşulur və `mcp__burp__*` alətləri ilə Burp-u idarə edir:
proxy tarixçəsini oxuyur, sorğu göndərir, Repeater tabı açır və s.
Server yalnız `127.0.0.1`-də dinləyir, yəni yalnız sizin kompdan əlçatandır.

## Lazım olanlar

- Burp Suite (Community bəs edir): https://portswigger.net/burp/releases
- Claude Code (VS Code extension və ya CLI)
- Bu repo: `git clone https://github.com/kerim-agayev/burp-suite-learning.git`

## Addımlar

### 1. Burp-da MCP Server extension-ı quraşdırın
1. Burp-u açın (`Temporary project` → `Start Burp`).
2. **Extensions** tabı → **BApp Store** → axtarışa `MCP Server` yazın.
3. **MCP Server** (müəllif: PortSwigger) → **Install**.
4. Yuxarı menyuda yeni **MCP** tabı görünəcək.

### 2. MCP serverini aktivləşdirin
1. **MCP** tabı → **Enabled** qutusunu işarələyin.
2. Ünvan `127.0.0.1`, port `9876` olmalıdır. Dəyişməyin.
3. **Auto-approve** seçimlərini və **"Enable tools that can edit your config"** seçimini **söndürülü** saxlayın.
   Belə olduqda Claude hər sorğu göndərmək istəyəndə Burp sizdən icazə soruşur.

### 3. Serverin işlədiyini yoxlayın (PowerShell)
```powershell
Get-NetTCPConnection -State Listen -LocalPort 9876
```
Bir sətir çıxırsa (`127.0.0.1  9876`), server işləyir. Heç nə çıxmırsa, 2-ci addıma qayıdın.

### 4. Claude Code-a əlavə edin (PowerShell / terminal)
```powershell
claude mcp add --scope user --transport http burp http://127.0.0.1:9876/mcp
```
`--scope user` vacibdir. İlk kompda əvvəl `local` scope ilə əlavə etmişdik və VS Code-dakı `/mcp` siyahısında görünmədi.

Yoxlama:
```powershell
claude mcp list
```
`burp: http://127.0.0.1:9876/mcp (HTTP) - √ Connected` görünməlidir.

### 5. Claude Code-u yeniləyin
MCP serverləri yalnız **sessiya başlayanda** yüklənir. Açıq söhbətdə yeni server görünməyəcək.
- VS Code: `Ctrl + Shift + P` → `Developer: Reload Window` → Claude panelində **yeni söhbət**.
- CLI: `claude`-dan çıxıb yenidən başladın.

### 6. Test
1. Yeni söhbətdə `/mcp` yazın, siyahıda `burp` **Connected** olmalıdır.
2. Claude-a yazın: **"Burp proxy tarixçəsindəki son 5 sorğunu göstər"**.
3. Tarixçə boşdursa, cavab `Reached end of items` olacaq. Bu, qoşulmanın işlədiyini göstərir.
4. Trafik yaratmaq üçün Burp-da **Proxy → Intercept → Open browser** düyməsinə basın və istənilən sayta girin. **Intercept** söndürülü olsun.

## Problemlər və həlləri (ilk kompda qarşılaşdıqlarımız)

| Problem | Səbəb | Həll |
|---|---|---|
| `claude mcp list`-də `burp` **Connected**-dir, amma Claude alətləri görmür | Söhbət server əlavə olunmazdan əvvəl başlayıb | 5-ci addım: Reload Window və yeni söhbət |
| VS Code-da `/mcp` siyahısında `burp` yoxdur | `local` scope ilə əlavə olunub | `--scope user` ilə yenidən əlavə edin (4-cü addım) |
| Port 9876 dinlənmir | Burp bağlıdır və ya MCP tabında `Enabled` söndürülüdür | Burp-u açın, `Enabled`-i işarələyin. **Burp həmişə Claude-dan əvvəl açılmalıdır.** |
| Brauzerdə və ya `curl` ilə `127.0.0.1:9876/mcp` açanda `403 Forbidden` | Server adi brauzer sorğularını qəbul etmir | Normaldır. Yoxlamanı `claude mcp list` ilə edin |
| Claude-un sorğuları **Proxy → HTTP history**-də görünmür | MCP ilə göndərilən sorğular proxy-dən keçmir | Onlara **Logger** tabında baxın |
| Claude sorğu göndərəndə heç nə olmur | Burp icazə pəncərəsi gözləyir | Burp pəncərəsinə keçib **Allow** basın |

## Silmək lazım olsa
```powershell
claude mcp remove burp -s user
```
