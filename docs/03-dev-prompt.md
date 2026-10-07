# Промт на розробку лендингу

Статус: v1, 07.10.2026. Етап 4 з [TASKS.md](../TASKS.md). Промт самодостатній: його можна дати новій сесії Claude Code в корені `kolss-hire`.

---

```text
Розроби посадкову сторінку вакансії KOLSS у цьому репозиторії (/Users/dzebski/Documents/kolss/web/kolss-hire). Мова спілкування зі мною — українська; код, ідентифікатори й коміти — англійською.

## 0. Спершу прочитай

1. AGENTS.md, PROJECT.md, TASKS.md — правила, рішення, статуси.
2. docs/01-page-spec.md — структура, стани форми, валідація, події, формат Slack, тексти PL / UK / EN. Це джерело істини для текстів.
3. Дизайн — Claude Design canvas https://claude.ai/artifact/2cHXbKbucNA4wBn3cx5KUg. Прочитай Artifact-тулом (action read, paths) файли project/Main.dc.html (desktop), Mobile.dc.html, Form.dc.html, FormStates.dc.html, Thanks.dc.html, MobileThanks.dc.html, MobileCookies.dc.html, MobileSticky.dc.html, Styles.dc.html. Переноси точні значення: кольори, шрифти, розміри, відступи, сітку, стани. Українські тексти в макеті новіші за spec — якщо є розбіжність, бери макет і перенеси правку в spec.
4. Документацію встановленої версії Next.js у node_modules/next/dist/docs/ (це Next 16.4 з breaking changes): 01-app/02-guides/internationalization.md, 01-app/03-api-reference/03-file-conventions/proxy.md, 01-app/03-api-reference/04-functions/next-root-params.md, 01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md, 01-app/01-getting-started/15-route-handlers.md, 13-fonts.md, 14-metadata-and-og-images.md, 01-app/02-guides/scripts.md. Не покладайся на пам’ять про API.

## 1. Що будуємо

Короткий лендинг вакансії «Консультант / консультантка з продажу меблів» (PL: Doradca / Doradczyni klienta w salonie meblowym), салон KOLSS у Legionowo. Трафік — реклама Meta, переважно телефони. Одна дія — надіслати CV. Заявка йде ТІЛЬКИ в Slack (новий HR-бот), бази даних немає. Домен: https://prace.kolss.eu. Хостинг: Vercel, Node.js runtime (не edge).

## 2. Стек і обмеження

- Next.js 16.4 App Router, React 19.3, TypeScript strict, Tailwind CSS 4 (вже в проєкті). next.config.ts уже має cacheComponents: true і partialPrefetching: true — залиш.
- Нові залежності (лише ці, решту — спитай): zod (валідація), botid (Vercel BotID), vitest (тести чистої логіки). Без i18n-бібліотек, без UI-кітів, без analytics-SDK.
- Сторінки статичні (generateStaticParams для pl/uk/en). Нічого, що читає cookies/headers на сервері в рендері сторінок: стан згоди на cookies — лише на клієнті. Так увесь лендинг — статичний shell.
- Секрети тільки в server env. NEXT_PUBLIC_ — тільки Pixel ID і URL сайту.
- Не логувати персональні дані (ім’я, телефон, email, CV, коментар). Логи — лише id події, статус, тип помилки.

## 3. Маршрути й i18n

- app/[lang]/layout.tsx — кореневий layout (html lang, шрифти, metadata, банер згоди, Pixel-лоадер). generateStaticParams → pl, uk, en.
- app/[lang]/page.tsx — лендинг. app/[lang]/thank-you/page.tsx — подяка (noindex). app/[lang]/privacy/page.tsx — політика приватності кандидатів (текст HR — поки плейсхолдер).
- proxy.ts у корені: якщо шлях без локалі → 307 на /{locale}{path} зі збереженим query (UTM, fbclid). Локаль — з Accept-Language (власний мінімальний парсер q-значень, без бібліотек; uk/ru-UA → uk, pl → pl, en → en; fallback pl). Matcher виключає _next, api, файли зі статикою (favicon, brand/*, robots.txt, sitemap.xml, opengraph-image).
- Словники: lib/i18n/dictionaries/{pl,uk,en}.ts — типізовані об’єкти з однаковою формою (тип виводиться з uk.ts, інші мають satisfies Dictionary). getDictionary через next/root-params (див. internationalization.md). hasLocale + notFound для невідомої локалі.
- Тексти — дослівно з docs/01-page-spec.md (UK — з макета). Умови оплати й факти, що повторюються (база 5 000 zł brutto, адреса, години, форми співпраці), — у lib/vacancy.ts, словники їх підставляють; так зміна суми — в одному місці.
- Перемикач мов PL · UA · EN (route /uk, підпис UA) веде на ту саму сторінку іншою мовою і зберігає query-рядок.
- metadata: title/description з spec розділ 7; alternates.languages для pl/uk/en + x-default → /pl; canonical; openGraph; robots noindex для thank-you. Meta domain verification: <meta name="facebook-domain-verification" content={process.env.META_DOMAIN_VERIFICATION}> якщо змінна задана.
- app/[lang]/opengraph-image.tsx — типографічна OG-картинка 1200×630 (назва посади, «5 000 zł brutto + премії», Legionowo, KOLSS) у кольорах бренду, для кожної мови.
- app/robots.ts, app/sitemap.ts (три локалі + privacy).

## 4. Дизайн-система в коді

- Шрифти через next/font/google: Lora (400, 500; italic 400) і Geist (400, 500, 600) з субсетами latin, latin-ext, cyrillic (перевір, що субсет cyrillic у Geist доступний у next/font; якщо ні — скажи мені й запропонуй заміну). CSS-змінні --font-serif / --font-sans.
- Токени в app/globals.css через @theme Tailwind 4: bg #F7F5EF, bg-soft #EFECE4, ink #1E2421, ink-muted #5C625E, line #D8D3C8, line-strong #8A8576, accent #CADC38, accent-hover #B9CB2A, dark-muted #A9AEA8, dark-line #3A423E, error #9A3B2A. Радіус 2px для кнопок/полів, 0 для блоків. Без тіней.
- Шкала типографіки, сітка (12 колонок, контейнер 1200, gutter 24, поля 20 mobile / 40 desktop), брейкпоінт 900px, відступи секцій 64 / 120 — як у макеті (класи .k-* у Main.dc.html).
- Логотипи: public/brand/kolss-logo-dark.svg (на світлому), kolss-logo-light.svg (на темному). Прибери з public/ scaffold-SVG (file, globe, next, vercel, window) і scaffold-контент app/page.tsx / app/layout.tsx.
- Без фото. Декор (радіальний градієнт каменю, контурна «K») — як у макеті, aria-hidden.

## 5. Компоненти сторінки

Header → Hero (мітка, H1, польська назва під H1 на uk/en, лід, 3 факти, кнопка «Надіслати CV» + посилання «Переглянути умови ↓») → 01 Обов’язки → 02 Вимоги (список, «Мова», «Буде перевагою») → 03 Умови (темний блок: 5 000 zł brutto, таблиця умов, примітка, «Що пропонуємо») → 04 Форма (ліворуч заголовок і 2 кроки відбору, праворуч форма) → Footer (реквізити KOLSS Polska Sp. z o.o. польською, посилання «Політика приватності», «Налаштування cookie», kolss.eu).

- Server Components за замовчуванням. Client Components лише: форма, перемикач-кнопки згоди/банер, sticky-кнопка, Pixel-лоадер, трекер thank-you.
- Кнопка hero: плавний скрол до #form і фокус на першому полі (з урахуванням prefers-reduced-motion).
- Mobile sticky CTA (< 900px): IntersectionObserver — показується, коли кнопка hero поза екраном і форма не видима; прихована, поки відкритий банер cookies; safe-area-inset-bottom.
- Доступність: семантичні landmark-и, один h1, label над кожним полем, aria-invalid/aria-describedby, видимий focus, цілі ≥ 44px, контраст як у макеті.

## 6. Форма і відправка

Поля: name, phone, email, cvFile (PDF/DOC/DOCX ≤ 4 MB), cvUrl (http/https), comment (≤ 1000, необов’язково). CV: файл АБО посилання (можна обидва). Приховані: vacancy="sales-consultant-legionowo", lang, utm_source/medium/campaign/content/term, fbclid, honeypot (поле «website», візуально приховане, tabIndex -1, autocomplete off), renderedAt (timestamp), consent (granted|denied — з клієнтського стану), fbp/fbc (лише за згоди, з cookies _fbp/_fbc).

- Клієнт: HTML-валідація + та сама zod-схема (спільний модуль lib/apply/schema.ts) на blur і submit; підсумок помилок над кнопкою з фокусом; тексти помилок зі словника. Під час надсилання поля заблоковані, кнопка «Надсилаємо…». При помилці дані й вибраний файл лишаються.
- Відправка: fetch POST multipart/form-data на Route Handler app/api/apply/route.ts (не Server Action — потрібен файл до 4 MB, BotID-захист шляху і чіткі HTTP-статуси). Node.js за замовчуванням (явний runtime export несумісний з cacheComponents у Next 16.4). Таймаут клієнта 30 с.
- Сервер, по порядку:
  1. BotID: checkBotId() з botid/server; бот → 403 (клієнт показує повідомлення rateLimit). Налаштування BotID — за актуальною документацією пакета (withBotId у next.config, initBotId у instrumentation-client.ts з protect для POST /api/apply).
  2. Honeypot не порожній або (now − renderedAt) < 3 с → відповісти 200 з фейковим успіхом, у Slack нічого не слати.
  3. zod-валідація полів; ліміт загального розміру запиту 4,4 MB; повторна перевірка файлу: розширення + сигнатура (PDF %PDF-, DOCX zip PK\x03\x04, DOC D0CF11E0A1B11AE1) + розмір. Помилки → 422 з ключами помилок по полях.
  4. Slack (lib/apply/slack.ts), Web API з токеном бота:
     - є файл: files.getUploadURLExternal (filename, length) → POST байтів на upload_url → files.completeUploadExternal (channel_id, files [{id, title}], initial_comment — текст заявки в mrkdwn). Так заявка й CV — одне повідомлення в каналі.
     - немає файлу: chat.postMessage з тим самим текстом (blocks + text fallback).
     - Текст (українською): заголовок «Нова заявка · Doradca / Doradczyni klienta — Legionowo», Ім’я, Телефон (<tel:…>), Email (<mailto:…>), CV (файл у повідомленні / посилання), Коментар, Мова сторінки, Джерело (utm_source / utm_campaign / utm_content; позначка «клік з Meta», якщо був fbclid), Отримано (дата-час Europe/Warsaw). Екрануй &, <, > у даних користувача; ім’я файлу — безпечне (лише [A-Za-z0-9._-], решту замінити).
     - Перевіряй ok у кожній відповіді Slack; будь-яка помилка → 502, кандидат бачить повідомлення server і пробує ще раз.
  5. Тільки після успіху Slack: eventId = crypto.randomUUID(). Якщо consent === granted і є META_CAPI_ACCESS_TOKEN — відправ Meta Conversions API (lib/apply/meta-capi.ts): POST https://graph.facebook.com/{META_GRAPH_API_VERSION}/{NEXT_PUBLIC_META_PIXEL_ID}/events, data [{ event_name: "SubmitApplication", event_time, event_id: eventId, action_source: "website", event_source_url (сторінка форми), user_data: { em: [sha256(lowercase trim email)], ph: [sha256(тільки цифри з кодом країни; якщо 9 цифр без коду — додати 48)], fbp, fbc (з cookie _fbc або, якщо є fbclid, "fb.1.{ms}.{fbclid}"), client_ip_address (x-forwarded-for, перший), client_user_agent } }], test_event_code з META_TEST_EVENT_CODE якщо задано. Помилка CAPI не ламає заявку — лише лог без PII. Не чекай CAPI довше 3 с (AbortController); можна після відповіді через after() з next/server, якщо доступно в цій версії (перевір у документації).
  6. Відповідь 200 { ok: true, eventId }.
- Клієнт після 200: sessionStorage["kh_eid"] = eventId, router.push(`/${lang}/thank-you?eid=${eventId}`).
- Rate limit: окремого сховища немає, тому основний ліміт — правило Vercel WAF на /api/apply (налаштує власник). У коді — лише BotID, honeypot і час.

## 7. Згода на cookies і Meta Pixel

- Банер (MobileCookies.dc.html): дві рівнозначні кнопки «Прийняти» / «Відхилити» + посилання на політику. Вибір — cookie kh_consent=granted|denied, Max-Age 180 днів, SameSite=Lax, Secure. «Налаштування cookie» у футері знову відкриває банер.
- До згоди Pixel не завантажується взагалі. Після згоди — next/script (afterInteractive) зі стандартним fbq-сніпетом, fbq('init', PIXEL_ID), fbq('track', 'PageView'). Відкликання згоди → не вантажити Pixel на наступних сторінках, видалити _fbp/_fbc.
- fbclid з URL: якщо згода є — Pixel сам ставить _fbc; якщо згоду дали пізніше в межах сесії — збережи fbclid у sessionStorage, щоб передати у формі.
- Подія StartApplication (trackCustom) — один раз за сесію при першому фокусі в формі, лише за згоди.
- Thank-you: якщо згода є, eid з URL збігається з sessionStorage["kh_eid"] і ще не відправлявся (sessionStorage["kh_eid_sent"]) — fbq('track', 'SubmitApplication', {}, { eventID: eid }). Оновлення сторінки не дублює подію. Прямий захід без eid — та сама сторінка без події.
- Якщо Pixel ID не задано (локально / preview) — увесь трекінг вимкнено, банер усе одно показуємо.

## 8. Безпека й заголовки

next.config.ts headers(): X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera=(), microphone=(), geolocation=()), X-Frame-Options DENY. CSP поки не вмикай (Pixel + BotID потребують окремого налаштування) — залиш TODO в PROJECT.md.

## 9. Змінні середовища

Створи .env.example (без значень) і опиши кожну:
- SLACK_HR_BOT_TOKEN — xoxb- токен нового HR-бота (scopes chat:write, files:write)
- SLACK_HR_CHANNEL_ID — ID приватного HR-каналу (бот доданий у канал)
- NEXT_PUBLIC_SITE_URL — https://prace.kolss.eu
- NEXT_PUBLIC_META_PIXEL_ID — окремий Pixel/dataset для найму
- META_CAPI_ACCESS_TOKEN — токен Conversions API цього dataset
- META_GRAPH_API_VERSION — актуальна версія Graph API (перевір на developers.facebook.com, не вгадуй)
- META_TEST_EVENT_CODE — лише для перевірки в Events Manager
- META_DOMAIN_VERIFICATION — значення meta-тегу верифікації домену
Відсутність Slack-змінних → /api/apply повертає 503 і логує це; сторінки працюють.

## 10. Плейсхолдери

Залишаються: текст інформаційної клаузули RODO під формою і повний текст /privacy (від HR). Збери їх у словниках з маркером «[HR: …]». Скрипт npm run check:content падає, якщо у словниках є «[HR:» або «[», і запускається в prebuild лише коли VERCEL_ENV=production — preview-деплої не блокуємо.

## 11. Тести (мінімально, лише чиста логіка)

vitest: схема валідації (обов’язкові поля, файл-або-посилання, межі довжини), сигнатури файлів, нормалізація й хешування телефону/email, парсер Accept-Language, екранування Slack-тексту, побудова fbc. Без тестів верстки.

## 12. Перевірка перед здачею

- npm run lint, npx tsc --noEmit, npx vitest run, npm run build — без помилок.
- Локально (npm run dev): / редиректить за мовою і зберігає UTM; три мови рендеряться; перемикач мов; hero-кнопка скролить і фокусує; sticky CTA на 390px; усі стани форми (порожня, помилки, надсилання, помилка сервера — змоделюй без Slack-змінних → 503); thank-you; банер згоди і що до згоди немає запитів на facebook.net (перевір Network).
- Скріншоти 390 і 1440 для uk — порівняй з макетом.
- Реальну відправку в Slack і Meta Test Events робимо разом після того, як власник дасть токени (TASKS етап 5).

## 13. Git і межі

- Працюй у main, якщо в репозиторії ніхто інший не працює (перевір git status / git worktree list); інакше — власний worktree і гілка.
- Невеликі логічні коміти англійською, лише свої файли. НЕ пушити, НЕ деплоїти, НЕ створювати Vercel/Slack/Meta ресурси — це робить власник.
- Рішення й нові факти — у PROJECT.md, статуси — у TASKS.md (етап 6), розбіжності текстів — у docs/01-page-spec.md.
- Фінальний звіт українською: що зроблено, що перевірено, що лишилось (env, WAF, HR-тексти), ризики.
```

---

## Примітки до промту

- Пакет `botid`: API (`withBotId`, `initBotId`, `checkBotId`) звірити з актуальною документацією Vercel під час розробки.
- `after()` для фонової CAPI-відправки — перевірити наявність у Next 16.4 (docs `04-functions/after.md`).
- Ліміт 4,4 MB на запит: Vercel Functions мають ліміт 4,5 MB на тіло запиту. Погоджено файл до 4 MB, запит до 4,4 MB; для більших CV — посилання.
