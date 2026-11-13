# Burp Suite + Etik Hakerlik Roadmap (sıfırdan)

Mənbə: [PortSwigger Web Security Academy](https://portswigger.net/web-security). Pulsuzdur, qeydiyyat lazımdır.
Academy-də 31 mövzu var. Hər mövzuda labların çətinliyi **Apprentice → Practitioner → Expert** sırası ilə artır.
PortSwigger özü başlanğıc üçün **SQL injection** mövzusunu tövsiyə edir.

İşarələr: `[ ]` başlanmayıb, `[~]` davam edir, `[x]` bitib.

---

## Qızıl qaydalar (hər mərhələdə keçərlidir)

1. Yalnız **icazəsi olan** hədəfləri test edin: PortSwigger labları, öz saytınız (`kmplast.az`, yalnız passiv yoxlama) və yazılı icazə verilmiş hədəflər.
2. Başqasının saytına "sadəcə yoxlamaq üçün" hücum etmək qanunsuzdur. Bu, Azərbaycan Cinayət Məcəlləsinin kompüter cinayətləri maddələrinə aiddir.
3. Real dünyada qanuni təcrübə yolu: **bug bounty** proqramları (HackerOne, Bugcrowd, Intigriti). Burada yalnız proqramın `scope` siyahısındakı hədəflər test olunur.
4. Hər labdan sonra 3 sual cavablandırılır: **Nə idi? Niyə işlədi? Necə qarşısı alınır?**

---

## Mərhələ 0: Əsaslar (1-2 həftə)

Bu bilgi olmadan Burp-da gördüyünüz heç nə məna kəsb etməyəcək.

- [ ] HTTP necə işləyir: request/response, metodlar (GET, POST, PUT, DELETE), status kodları (2xx/3xx/4xx/5xx)
- [ ] Başlıqlar (headers): `Host`, `Cookie`, `Set-Cookie`, `Content-Type`, `Origin`, `Referer`
- [ ] Cookie və sessiya: login olandan sonra sayt sizi necə "tanıyır"
- [ ] URL encoding, Base64, HTML encoding (Burp Decoder ilə məşq)
- [ ] HTML, JavaScript və DOM-un əsasları (səhifənin mənbəyini oxuya bilmək)
- [ ] HTTPS və TLS nədir, Burp niyə öz sertifikatını quraşdırır
- [ ] SQL-in əsasları: `SELECT`, `WHERE`, `UNION` (SQL injection üçün lazımdır)
- [ ] Same-Origin Policy (SOP) nədir (CORS, CSRF, XSS üçün əsasdır)

**Praktika:** `kmplast.az`-ı Burp-un daxili brauzerində açın və HTTP history-də hər sorğunu izah etməyə çalışın.

---

## Mərhələ 1: Burp Suite alətləri (1 həftə)

Sizdə **Burp Suite Community Edition v2026.10.1** var. Community nəşrinin məhdudiyyətləri:
- Avtomatik **Scanner yoxdur**.
- **Intruder sürəti məhdudlaşdırılıb** (yavaş işləyir).
- **Collaborator yoxdur** (out-of-band laboratoriyaları üçün Pro lazımdır).
- Layihəni fayla saxlamaq olmur, yalnız "Temporary project" işləyir.

| Alət | Nə edir | Öyrənmə tapşırığı |
|---|---|---|
| [ ] **Proxy** | Brauzer trafikini tutur, `Intercept` ilə sorğunu dayandırıb dəyişmək olur | Login formunu intercept edin, parolu dəyişib göndərin |
| [ ] **Target → Site map / Scope** | Saytın xəritəsi; testi icazəli hədəflə məhdudlaşdırmaq | Scope-a yalnız lab domenini əlavə edin |
| [ ] **Repeater** | Bir sorğunu əl ilə dəyişib təkrar göndərir | Parametri dəyişib cavabların fərqinə baxın |
| [ ] **Intruder** | Parametrə avtomatik çoxlu dəyər göndərir (Sniper, Cluster bomb və s.) | Lab-da istifadəçi adı siyahısını yoxlayın |
| [ ] **Decoder** | Encode/decode (URL, Base64, Hex, HTML) | Cookie-ni decode edin |
| [ ] **Comparer** | İki cavabı müqayisə edir | Uğurlu və uğursuz login cavablarını müqayisə edin |
| [ ] **Logger** | Bütün alətlərin trafiki (Claude-un MCP ilə göndərdikləri də burada görünür) | Filtr ilə bir hostu tapın |
| [ ] **Sequencer** | Token-lərin təsadüfiliyini ölçür | Sessiya cookie-sini analiz edin |
| [ ] **Extensions / BApp Store** | Əlavə alətlər (məs. Logger++, JWT Editor, Autorize) | JWT Editor quraşdırın (Mərhələ 4 üçün) |
| [ ] **CA sertifikatı** | Burp-un HTTPS trafikini görməsi üçün öz sertifikatı. Daxili brauzerdə hazırdır, başqa brauzer (Firefox/Chrome) üçün əl ilə quraşdırılır | `http://burpsuite` ünvanından sertifikatı yükləyib Firefox-a quraşdırın, bir HTTPS saytı xətasız açın |
| [ ] **Proxy → Match and replace** | Hər sorğu/cavabda avtomatik dəyişiklik edir (məs. `User-Agent` dəyişmək, gizli düyməni göstərmək) | Bütün sorğulara `X-Test: 1` başlığı əlavə edən qayda yazın |
| [ ] **Bambdas** | HTTP history və Logger üçün kiçik Java filtr skriptləri | Yalnız `POST` sorğularını və ya `500` cavablarını göstərən filtr yazın |
| [ ] **Organizer** | Maraqlı sorğuları qeydlərlə saxlamaq üçün "dəftər" | Şübhəli sorğunu Organizer-ə göndərib qeyd yazın (hesabat üçün vərdiş) |

Academy-dəki **"Essential skills"** mövzusu bu mərhələyə aiddir.

---

## Mərhələ 2: Server-side, Apprentice labları (3-6 həftə)

Bu tövsiyə olunan sıradır, asandan çətinə. Hər mövzuda əvvəl yalnız **Apprentice** labları həll olunur.

1. [ ] SQL injection
2. [ ] Authentication (giriş, parol sıfırlama, brute-force)
3. [ ] Path traversal
4. [ ] Command injection
5. [ ] Business logic vulnerabilities
6. [ ] Information disclosure
7. [ ] Access control (IDOR, admin panelləri)
8. [ ] File upload vulnerabilities
9. [ ] Server-side request forgery (SSRF)
10. [ ] XML external entity (XXE) injection
11. [ ] API testing
12. [ ] NoSQL injection
13. [ ] Race conditions

---

## Mərhələ 3: Client-side, Apprentice labları (3-4 həftə)

1. [ ] Cross-site scripting (XSS): reflected, stored, DOM
2. [ ] Cross-site request forgery (CSRF)
3. [ ] Cross-origin resource sharing (CORS)
4. [ ] Clickjacking
5. [ ] DOM-based vulnerabilities
6. [ ] WebSockets

**Öz saytınıza bağlantı:** `kmplast.az`-da gördüyümüz `Access-Control-Allow-Origin: *` (CORS) və `X-Frame-Options` olmaması (Clickjacking) bu mərhələnin real nümunələridir.

---

## Mərhələ 4: Practitioner səviyyəsi (2-3 ay)

Mərhələ 2 və 3-dəki hər mövzuya qayıdıb **Practitioner** labları həll olunur. Əlavə mövzular:

- [ ] OAuth authentication
- [ ] JWT attacks (JWT Editor extension lazımdır)
- [ ] Server-side template injection (SSTI)
- [ ] Insecure deserialization
- [ ] Prototype pollution
- [ ] GraphQL API vulnerabilities
- [ ] HTTP Host header attacks
- [ ] Web LLM attacks

---

## Mərhələ 5: Advanced / Expert (3+ ay)

- [ ] HTTP request smuggling
- [ ] Web cache poisoning
- [ ] Web cache deception
- [ ] Expert səviyyəli labların seçilmiş hissəsi
- [ ] Academy-dəki **Mystery labs** (mövzu gizlidir, zəifliyi özünüz tapırsınız; real testə ən yaxın məşq)

---

## Mərhələ 6: Real dünya və sertifikat

- [ ] Bir bug bounty proqramı seçib `scope`-unu oxumaq (hələ hücumsuz, yalnız kəşfiyyat)
- [ ] İlk hesabatı (report) yazmaq: başlıq, təsir, addım-addım reproduksiya, düzəliş tövsiyəsi
- [ ] **BSCP** (Burp Suite Certified Practitioner) sertifikatı: Academy-də "Practice exam" var. İmtahan üçün **Burp Suite Professional** lazımdır, Community ilə olmur.

---

## Claude ilə necə öyrənirik (hər dərsin formatı)

1. **İzah:** Mövzunu sadə dildə, real nümunə ilə izah edirəm.
2. **Lab:** Siz Academy-də labı Burp-un daxili brauzerində açırsınız.
3. **Müşahidə:** Mən Burp MCP ilə HTTP history-nizi oxuyuram və nə etdiyinizi görürəm.
4. **İpucu, cavab deyil:** İlişdiyiniz yerdə əvvəl istiqamət göstərirəm, birbaşa həlli verməyirəm.
5. **Yekun:** Niyə işlədi, necə qorunmaq olar. Nəticə `CLAUDE.md`-dəki jurnala yazılır.
