# Перевірка реалізації KOLSS Hire

Дата: 07.10.2026. Реалізація локальна; push і deployment не виконувалися.

## Результат

Готові три мовні лендинги, подяка, privacy-shell, SEO/OG, доступна форма, перевірка CV, Slack API, BotID, consent і Meta Pixel/CAPI. Актуальні Main/Mobile і стани прочитані з Claude canvas; українські редакторські правки перенесені у spec.

Прийняте рішення власника: PDF/DOC/DOCX до 4 MB (4 000 000 байтів). Для більших CV — посилання. Загальний запит обмежений 4 400 000 байтів, нижче ліміту Vercel 4,5 MB.

## Перевірено

- ESLint і TypeScript — без помилок.
- Vitest: 7 тестів локалі та 6 тестів прикладної логіки; перевірено обов’язкові контакти, CV файл/URL, 4 MB межу, довжину коментаря, сигнатури, SHA-256, нормалізацію й Slack escaping. Файли запущені окремо, без coverage.
- Production build — успішний: усі дев’ять мовних сторінок prerendered. Node.js використовується за замовчуванням, явний runtime export несумісний з Cache Components у Next 16.4.
- Production HR-guard очікувано відхиляє всі три словники; preview/local build працює.
- Audit production dependencies — 0 відомих вразливостей на момент перевірки.
- HTTP: кореневий 307 за Accept-Language зі збереженням query; security headers; невідома локаль 404; український OG повертає PNG 200.
- Браузер: PL/UK/EN, подяка і privacy; hero CTA скролить і фокусує перше поле; порожня форма показує помилки з фокусом та aria-invalid; відправка без Slack env показує помилку сервера й зберігає контакти та вибраний файл.
- Mobile sticky CTA видима після hero, прихована біля форми і при відкритому банері; відхилення cookies ховає банер, налаштування відкривають його знову. При порожньому Pixel ID DOM не містить Facebook script.
- Скриншоти production UK на viewport 390 і 1440 px у `docs/screenshots/`; viewport captures мають повну задану ширину, full-page captures виключають scrollbar. Горизонтального overflow на 390 px немає.

## До запуску

1. HR: замінити RODO notice та повний privacy-текст у трьох словниках. Перевірка `npm run check:content` має пройти.
2. Власник: новий HR Slack bot, приватний канал, scopes chat:write/files:write; заповнити `.env.example` через секретні env середовища.
3. Vercel: домен/DNS, BotID, WAF rate limit для POST /api/apply. CSP залишається TODO згідно з промтом.
4. Meta: окремий Pixel/dataset, CAPI token, Graph API v26.0 (перевірено в офіційному changelog), domain verification.
5. З доступами: реальна доставка файла та URL у Slack, Network-перевірка до згоди/після відмови з налаштованим Pixel, StartApplication/SubmitApplication, refresh дедуплікація та Meta Test Events. Мережеву поведінку реального Pixel поки не підтверджено.
6. Lighthouse і перевірка доступності на deployment; production/preview deployment і push виконує власник.

## Межі та ризики

Slack є єдиним сховищем: недоступність API означає незбережену заявку і повторну відправку кандидатом. Якщо Slack прийняв заявку, але відповідь загубилася, повтор може створити дублікат. Retention і доступи HR-каналу налаштовує власник. BotID fail closed; його production-поведінку треба перевірити на Vercel. Сигнатура DOCX перевіряє ZIP magic, а не структуру Office-документа.

Початкові зміни AGENTS.md, PROJECT.md, TASKS.md, docs/01–03 та public/brand були незакомічені до роботи. Їх не включено до комітів реалізації; вони залишаються у робочій директорії. Оновлення цих документів описують прийняті рішення. Перед push власнику потрібно також включити необхідні бренд-активи.
