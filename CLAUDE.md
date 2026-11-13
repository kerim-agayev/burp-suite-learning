# CLAUDE.md: Burp Suite + Etik Hakerlik öyrənmə layihəsi

Bu fayl hər yeni Claude sessiyasında avtomatik oxunur. Məqsəd: **harada qaldığımızı, nə etdiyimizi və niyə etdiyimizi** bilmək.
Hər dərsin sonunda Claude bu faylı yeniləyir: "Hazırkı vəziyyət" bölməsini dəyişir və "Jurnal"a yeni sətir əlavə edir.

## İstifadəçi

- Burp Suite və etik hakerliyi **sıfırdan** öyrənir.
- Dil: **Azərbaycan dili**. Sadə izah, texniki terminlər ingiliscə qalsın (məs. "request", "payload").
- Öyrənmə planı: [ROADMAP.md](ROADMAP.md)

## Hazırkı vəziyyət

- **Mərhələ:** 0 (Əsaslar). Dərs 1 bitdi.
- **Növbəti addım: Dərs 2, cookie və sessiya.** Dərs 1 ilə eyni formatda keç: izah → Burp-da praktika → 3 sual → jurnal + push.
  1. Əvvəl soruş: PortSwigger Academy hesabı varmı? Yoxdursa: https://portswigger.net/users/register (pulsuz). Login lazım olduğu üçün `kmplast.az` bu dərsə yaramır.
  2. Mövzular: HTTP stateless-dir → `Set-Cookie` (server verir) → `Cookie` (brauzer hər sorğuda geri göndərir) → session ID nədir → cookie atributları (`HttpOnly`, `Secure`, `SameSite`, `Expires`).
  3. Praktika: Academy-yə Burp-un daxili brauzerində login ol, Proxy history-də login `POST`-unu və cavabdakı `Set-Cookie`-ni tap. Sonra Repeater-də `Cookie` başlığını silib göndər → login-siz görünməlisən. Bu, "sessiya = cookie" fikrini göstərir.
  4. Suallar: (a) Cookie oğurlansa nə olur? (b) `HttpOnly` nədən qoruyur? (c) Logout-dan sonra köhnə cookie hələ işləyirsə, bu nə problemdir?
- **Zəif yerlər:** body/başlıq ayrılması və "client-ə inanmamaq" prinsipi izahla öyrənildi. Dərs 2-də təkrar yoxla.
- **Açıq suallar:** yoxdur.

## Mühit (texniki quraşdırma)

- **Burp Suite Community Edition v2026.10.1**: `C:\Users\user\AppData\Local\Programs\BurpSuite`
  - Proxy: `127.0.0.1:8080`
  - Community məhdudiyyətləri: Scanner yoxdur, Intruder yavaşdır, Collaborator yoxdur.
- **Burp MCP Server extension v1.4.0** (BApp Store, PortSwigger): `http://127.0.0.1:9876/mcp`
  - Claude Code-a `burp` adı ilə əlavə olunub (`user` + `local` scope).
  - Alətlər: `mcp__burp__*`. Proxy history oxumaq, HTTP/1-2 sorğu göndərmək, Repeater tabı açmaq, Intruder-ə göndərmək, encode/decode.
  - Yeni kompda qoşulma və problem həlləri: [SETUP.md](SETUP.md).
  - **Əgər `burp` alətləri görünmürsə:** Burp açıqdır? MCP tabında `Enabled` işarəlidir? Sonra `Ctrl+Shift+P` → `Developer: Reload Window` və yeni söhbət açın.
- GitHub MCP plugin qoşulmur (`Authorization header is badly formatted`). Hələ düzəldilməyib, öyrənmə üçün lazım deyil.

## Claude üçün qaydalar

1. **Yalnız icazəli hədəflər:** PortSwigger labları (`*.web-security-academy.net`) və istifadəçinin öz saytı `kmplast.az` (yalnız passiv yoxlama: GET, başlıqlar, brauzer trafiki). Başqa hədəflərə sorğu göndərmə. Brute-force, fuzzing, DoS etmə.
2. **Müəllim kimi davran:** labın həllini birbaşa vermə. Əvvəl ipucu, sonra istiqamət, ən sonda (istifadəçi istəsə) həll.
3. Hər labdan sonra soruş: Nə idi? Niyə işlədi? Necə qorunmaq olar?
4. Burp MCP-də **Logger-i və ya Repeater nəticələrini oxuyan alət yoxdur**. İstifadəçinin Repeater işini yoxlamaq üçün ondan ekran şəkli istə, ya da eyni sorğunu `send_http1_request` ilə özün göndər.
5. Burp-un konfiqurasiyasını dəyişən alətləri (`set_project_options`, `set_user_options`, `set_proxy_intercept_state`) yalnız istifadəçi istəsə işlət.
6. **Git:** hər dərsin sonunda `CLAUDE.md` + `ROADMAP.md` commit və push et. Repo: `kerim-agayev/burp-suite-learning`. **Yalnız `kerim-agayev` GitHub hesabı; `kerim-agayev-2026` hesabı QADAĞANDIR.** Remote URL-də istifadəçi adı açıq yazılmalıdır: `https://kerim-agayev@github.com/kerim-agayev/burp-suite-learning.git`. Yeni kompda işə başlamazdan əvvəl `git pull` et.
7. Böyük cavabları (`send_http1_request`) istifadəçinin qarşısına çıxarma, yalnız lazımi hissəni çıxar.

## Jurnal (ən yeni yuxarıda)

| Tarix | Nə etdik | Niyə |
|---|---|---|
| 2026-11-13 | **Dərs 1: HTTP request/response** bitdi. Repeater-də `kmplast.az` ilə: `/about` → 200, `/bu-sehife-yoxdur` → 404, `HEAD` → body-siz 200, Host-suz → 400. Səhv: path `Host` başlığına yazılmışdı → Cloudflare 400 (Host header attacks mövzusuna körpü). Suallar: 3-cü düz cavablandı (5xx server səhvi, maraqlıdır); 1 (boş sətir) və 2 (client-ə inanmamaq) izah olundu. | HTTP bütün veb hakerliyin əsasıdır; Repeater ilə ilk praktika. |
| 2026-11-13 | Mərhələ 1-ə CA sertifikatı, Match and replace, Bambdas, Organizer əlavə olundu. Repo GitHub-a push edildi: `kerim-agayev/burp-suite-learning` (yalnız `kerim-agayev` hesabı; `kerim-agayev-2026` qadağandır). | Real testdə hər gün lazım olan Burp xüsusiyyətləri. Repo ev kompunda davam etmək üçündür. |
| 2026-11-13 | `ROADMAP.md` və bu `CLAUDE.md` yaradıldı. PortSwigger Academy-nin 31 mövzusu 6 mərhələyə bölündü. | Sıfırdan sistemli öyrənmək və sessiyalar arası davamlılıq üçün. |
| 2026-11-13 | `kmplast.az` passiv analiz olundu (Burp proxy + MCP). Tapıntılar: Next.js + Vercel + Cloudflare; HSTS var; `Access-Control-Allow-Origin: *`; CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` yoxdur; bütün səhifələrdə meta description `"Generated by create next app"`; `<title>` iki dəfədir; Bootstrap 5.2.3 və slick-carousel 1.6.0 köhnədir. Kontakt forması hələ test olunmayıb. | Burp-un real saytda necə işlədiyini görmək. Tapıntılar Mərhələ 3-də (CORS, Clickjacking) nümunə kimi istifadə olunacaq. |
| 2026-11-13 | Burp MCP Server extension quraşdırıldı və Claude Code-a qoşuldu. Repeater-də `kmplast-home` tabı yaradıldı. | Claude-un istifadəçinin Burp trafikini görüb öyrətməsi üçün. |
