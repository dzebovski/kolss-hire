# Посадкова сторінка — детальний опис і тексти

Статус: **чернетка на погодження**, оновлено 07.10.2026 (v2: блоки 01–02 у діловому стилі, правки власника з макета). Етап 2 з [TASKS.md](../TASKS.md). Правила контенту й рішення — у [PROJECT.md](../PROJECT.md).

Тексти побудовані на `hire/02-job-vacancy.md` і `hire/04-landing-content.md`, скорочені й вирівняні між мовами. Сенс і умови не змінено. Поля в `[КВАДРАТНИХ ДУЖКАХ]` заповнює HR. До їх заповнення сторінку **не публікувати**.

---

## 1. Принципи

- **Коротко.** Одна вакансія, один екран на блок на телефоні, одна дія — надіслати CV. Кандидат приходить із реклами й має за 30 секунд зрозуміти: що за робота, скільки платять, де, як відгукнутися.
- **Типографія замість фото.** Ієрархію тримають великі заголовки Lora, ритм відступів, тонкі лінії й цифри. Фото й ілюстрацій немає.
- **Колір — акцент.** Основа — теплий білий і графіт. Лайм — лише для головної кнопки та 1–2 типографічних акцентів. Один темний блок (оплата) дає контраст посередині сторінки. Фони й легкі градієнти можна використовувати декоративно, але вони не несуть змісту.
- **Принципи «Letter»:** serif-заголовки, sans для тексту й кнопок, кути 2px, без тіней, без карток-«плиток», редакційний ритм (мітка секції ліворуч, зміст праворуч на десктопі).
- **Mobile-first.** Трафік Meta — переважно телефони. Ширина 360–430px — основний макет.

## 2. Маршрути

| Маршрут | Призначення | Індексація |
|---|---|---|
| `/` | Редирект: `Accept-Language` → `pl` / `uk` / `en`, fallback `pl`. Query-рядок (UTM, `fbclid`) зберігається | — |
| `/pl`, `/uk`, `/en` | Лендинг вакансії | index, `hreflang` для трьох мов + `x-default` → `/pl` |
| `/[lang]/thank-you` | Сторінка подяки після успішної відправки; подія `SubmitApplication` | noindex |
| `/[lang]/privacy` | Повна погоджена політика приватності кандидатів і cookies | index |

Перемикач мов переносить на ту саму сторінку іншою мовою й зберігає query-рядок.

## 3. Структура лендингу

Порядок блоків: **Header → Hero → 01 Обов’язки → 02 Вимоги → 03 Оплата й умови → 04 Форма → Footer**. Плюс банер cookies і мобільна sticky-кнопка.

### Header

- Ліворуч: логотип KOLSS (темна версія на світлому тлі). Посилання на `kolss.eu` у новій вкладці.
- Праворуч: перемикач мов `PL · UA · EN`. Активна мова — графіт, підкреслена; інші — приглушені. На мобільному так само, без бургер-меню.
- Не sticky: сторінка коротка, навігація не потрібна.

### Hero

Мета: за перший екран дати назву посади, оплату, формат і місце.

- **Мітка** (caption, uppercase, розрідження): «Oferta pracy · Legionowo».
- **H1** (Lora, найбільший розмір на сторінці): назва посади. На `uk`/`en` під H1 дрібним рядком — польська назва `Doradca / Doradczyni klienta w salonie meblowym`, бо оголошення стосується роботи в Польщі.
- **Лід** — 2 речення.
- **Три факти** — типографічна смуга, не картки: на десктопі 3 колонки, розділені вертикальними hairline; на мобільному — стовпчик із горизонтальними лініями. Кожен факт: дрібна мітка + значення (Lora, середній розмір).
  1. Оплата — `[BAZA] zł brutto / mies. + premie`. Сума — найпомітніша цифра на першому екрані; можна виділити лаймовим підкресленням-маркером.
  2. Формат — повна зайнятість, 5 днів, 40 год.
  3. Місце — салон, адреса.
- **Дії:** основна кнопка «Wyślij CV» (лайм, графітовий текст) → плавний скрол до форми з фокусом на першому полі. Поруч — текстове посилання «Zobacz warunki» → скрол до блоку 03.
- Фон: теплий білий; допустимий ледь помітний декоративний акцент — великий напівпрозорий типографічний елемент (наприклад, номер `01` або літера K) чи м’який радіальний градієнт каменю в куті. Без змісту.

### 01 · Обов’язки

- Desktop: ліва колонка (≈1/3) — номер `01` і заголовок H2; права (≈2/3) — список. Mobile: номер і заголовок над списком.
- Список із 6 пунктів у діловому стилі (віддієслівні іменники, як у ринкових оголошеннях); маркери — короткі тире, не іконки.
- Під списком — один приглушений рядок: технічне проєктування робить дизайнер. Внутрішні процеси (замір, передоплата, розподіл задач у команді) не розкриваємо.

### 02 · Вимоги

- Та сама сітка.
- Список із 5 вимог.
- Підблок **«Мова»**: вільна польська; англійська — перевага.
- Підблок **«Буде перевагою»**: досвід у меблях/кухнях/інтер’єрі; програми проєктування не потрібні.

### 03 · Умови

- Єдиний **темний блок** (графіт `#1e2421`, текст теплий білий) на всю ширину — візуальний центр сторінки.
- Велика сума — **діапазон brutto** (як у ринкових оголошеннях і в попередньому оголошенні KOLSS на pracuj.pl), лайм; під нею «стала база + премії за результат».
- Таблиця «мітка — значення» у стилі pracuj.pl: форма співпраці, система оплати, виплата, зайнятість, графік, години, формат. Розділювачі — тонкі лінії `#3A423E`.
- Дрібний текст: премії не гарантовані, що таке brutto.
- Список «Що пропонуємо» (5 пунктів) — сюди переїхало навчання й розвиток із блоку 02.
- Суми окремих премій не показуємо (рішення власника в макеті): умови премій обговорюються на співбесіді.

### 04 · Форма

- Desktop: ліворуч заголовок, лід і два кроки відбору (`1` розмова з HR, `2` зустріч із власниками); праворуч форма. Mobile: усе стовпчиком.
- Поля, по одному в рядок, мітки над полями (не placeholder замість мітки):
  1. Ім’я — обов’язкове, `autocomplete="name"`.
  2. Телефон — обов’язковий, `type="tel"`, `autocomplete="tel"`, підказка `+48 …`.
  3. Email — обов’язковий, `type="email"`, `autocomplete="email"`.
  4. CV — **файл або посилання**, одне з двох обов’язкове. Зона вибору файлу (кнопка + назва вибраного файлу + «прибрати»), під нею роздільник «або» і поле URL. Підказка про формати й розмір.
  5. Коментар — необов’язковий, textarea на 3–4 рядки, ліміт 1000 символів.
- Приховано: `vacancy` (ідентифікатор вакансії), `lang`, UTM-параметри, `fbclid`, honeypot, час рендеру форми.
- Кнопка «Wyślij zgłoszenie» на всю ширину форми (лайм).
- Під кнопкою — погоджена коротка клаузула RODO (`form.rodo`) + посилання на `/[lang]/privacy`. CV зберігаються до завершення цієї рекрутації; чекбокса на майбутні рекрутації немає.

**Стани форми:**

| Стан | Поведінка |
|---|---|
| Початковий | Кнопка активна. Валідація — після спроби відправки або після виходу з поля (blur) |
| Помилка поля | Текст помилки під полем, `aria-invalid`, `aria-describedby`; рамка поля графітова 2px + маркер помилки (колір помилки — приглушений червоний, з AA-контрастом) |
| Підсумкова помилка | Блок над кнопкою зі списком полів-посилань; фокус переходить на нього |
| Надсилання | Кнопка неактивна, текст «Wysyłanie…», індикатор; поля заблоковані |
| Помилка сервера / Slack | Повідомлення над кнопкою; **усі дані й вибраний файл лишаються**; кнопка знову активна |
| Забагато спроб / бот | Окреме повідомлення; без розкриття причини |
| Успіх | Перехід на `/[lang]/thank-you` |

**Правила валідації (і на клієнті, і на сервері — сервер головний):**

| Поле | Правило |
|---|---|
| Ім’я | 2–100 символів після trim |
| Телефон | 7–20 символів; дозволені цифри, пробіли, `+`, `-`, `( )`; мінімум 9 цифр |
| Email | Формат email, до 254 символів |
| Файл CV | PDF, DOC, DOCX; перевірка за розширенням **і** сигнатурою файла; до 4 МБ |
| Посилання на CV | `https://` (допустимо `http://`), до 500 символів, валідний URL |
| CV загалом | Файл **або** посилання; якщо є обидва — приймаємо обидва |
| Коментар | До 1000 символів |
| Антиспам | Порожній honeypot; від рендеру форми до відправки ≥ 3 с; бот-захист Vercel BotID; ліміт спроб з однієї IP |

### Footer

- Рядок 1 (польською на всіх мовах): KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo, KRS 0001207180, NIP 536-199-62-94, REGON 543320017, Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy KRS (дані від власника, 07.10.2026).
- Рядок 2: посилання «Polityka prywatności», «Ustawienia cookies» (відкриває панель категорій), «kolss.eu».
- Дрібно, приглушено, на теплому білому.

### Мобільна sticky-кнопка

- З’являється, коли кнопка hero зникає з екрана; ховається, коли форма у видимій зоні.
- Повна ширина внизу, 16px від країв, лайм, текст «Wyślij CV». Не перекриває банер cookies (поки банер відкритий — кнопка прихована).

### Банер cookies

- Внизу екрана, компактний, не модальний, не блокує читання.
- Текст + три кнопки: «Akceptuję», «Odrzucam», «Ustawienia». Прийняття й відмова рівнозначні; посилання веде на `/[lang]/privacy#cookies`.
- «Ustawienia» відкриває панель: необхідні завжди активні, маркетингові — перемикач `role="switch"`; кнопки «Zapisz wybór» і «Akceptuj wszystkie».
- Footer і кнопка політики відкривають панель категорій. Фокус переходить на заголовок, після збереження/закриття повертається до кнопки. Esc закриває панель, якщо вибір уже є.
- Максимальна висота 88svh, внутрішня прокрутка; поки банер/панель відкриті, мобільна sticky CTA прихована.
- `kh_fbclid`, `kh_eid`, `kh_eid_sent`, `kh_start_application` у sessionStorage записуються тільки після згоди й видаляються при її відкликанні.
- До згоди Meta Pixel не завантажується. Вибір зберігається на 6 міс. «Ustawienia cookies» у футері змінює вибір.

## 4. Сторінка подяки `/[lang]/thank-you`

- Той самий header і footer, контент по центру першого екрана.
- H1 «Dziękujemy! Zgłoszenie dotarło.» + одне речення + текстове посилання «Wróć do oferty».
- Pixel `SubmitApplication` (лише за згоди) з `event_id`, отриманим від сервера після успішної відправки. Захист від повторів: подія спрацьовує один раз на `event_id` (оновлення сторінки її не дублює).
- Прямий захід без `event_id` показує той самий текст, але без події.

## 5. Події аналітики

| Подія | Де | Канал | Примітка |
|---|---|---|---|
| `PageView` | Кожна сторінка | Pixel | Лише за згоди |
| `StartApplication` (custom) | Перша взаємодія з формою | Pixel | Один раз за сесію |
| `SubmitApplication` | Успішна відправка | CAPI (сервер) + Pixel на `/thank-you` | Спільний `event_id` → дедуплікація. CAPI: SHA-256 `em`, `ph`; `fbp`, `fbc`, IP, user agent, `event_source_url`. Лише за згоди |

У Slack у будь-якому разі передаються UTM і ознака кліку з Meta, тож джерело заявки видно HR навіть без згоди на cookies.

## 6. Повідомлення в Slack (для HR)

Мова повідомлення — українська (змінюється в коді одним словником).

```
Нова заявка · Doradca / Doradczyni klienta — Legionowo
Ім’я:      Анна Ковальчук
Телефон:   +48 600 000 000
Email:     anna@example.com
CV:        📎 файл у цьому повідомленні  |  посилання: https://…
Коментар:  …
Мова сторінки: uk · Джерело: facebook / [utm_campaign] / [utm_content]
Отримано: 07.10.2026, 14:32 (Warsaw)
```

Телефон і email — клікабельні (`tel:`, `mailto:`). Файл CV — вкладення в тому самому повідомленні.

## 7. SEO і OG

| | PL | UK | EN |
|---|---|---|---|
| `title` | Doradca / Doradczyni klienta w salonie meblowym — KOLSS Legionowo | Консультант / консультантка з продажу меблів — KOLSS Legionowo | Furniture Sales Consultant — KOLSS Legionowo |
| `description` | Praca w salonie KOLSS w Legionowie: rozmowy z klientami, spotkania w salonie i prowadzenie sprzedaży do umowy. 5 000 zł brutto + premie. | Робота в салоні KOLSS у Legionowo: розмови з клієнтами, зустрічі в салоні й супровід продажу до договору. 5 000 zł brutto + премії. | Work at the KOLSS showroom in Legionowo: client calls, showroom meetings and leading sales to a signed contract. 5,000 PLN gross + bonuses. |

OG-зображення 1200×630 — типографічне (назва посади, сума, Legionowo, логотип), генерується кодом для кожної мови. Структуровані дані `JobPosting` (schema.org) — додати, коли HR затвердить суми й роботодавця.

---

## 8. Тексти — PL (основна мова)

### Header
- Мова: `PL · UA · EN`

### Hero
- Мітка: **Oferta pracy · Legionowo**
- H1: **Doradca / Doradczyni klienta w salonie meblowym**
- Лід: Pomagasz klientom wybrać kuchnię lub meble do domu. Projekty przygotowują nasi projektanci, a Ty prowadzisz klienta i sprzedaż.
- Факти:
  - Wynagrodzenie — **5 000 zł brutto / mies. + premie**
  - Etat — **Pełny etat, 5 dni, 40 godzin tygodniowo**
  - Miejsce — **Salon KOLSS, ul. Zegrzyńska 6, Legionowo**
- Кнопка: **Wyślij CV** · посилання: **Zobacz warunki**

### 01 · Zakres obowiązków
- Doradztwo klientom w salonie i telefonicznie w zakresie kuchni i mebli na wymiar.
- Obsługa zapytań przychodzących i rozpoznawanie potrzeb klienta.
- Prezentacja produktów, materiałów i rozwiązań KOLSS.
- Prowadzenie procesu sprzedaży — od pierwszego kontaktu do podpisania umowy.
- Współpraca z projektantami i opieka nad klientem na wszystkich etapach zamówienia.
- Prowadzenie bazy klientów i historii kontaktów w CRM.

Дрібно: Projektowanie techniczne nie należy do obowiązków — zajmują się nim nasi projektanci.

### 02 · Wymagania
- Doświadczenie w sprzedaży lub obsłudze klienta.
- Wysokie umiejętności komunikacyjne, negocjacyjne i prezentacyjne.
- Nastawienie na wynik i odpowiedzialność za ustalenia.
- Dobra organizacja pracy i samodzielność w obsłudze wielu klientów jednocześnie.
- Sprawna obsługa komputera, poczty e-mail i systemów CRM.

**Język:** Biegła znajomość języka polskiego · дрібно: Znajomość języka angielskiego będzie atutem

**Mile widziane**
Doświadczenie w branży meblowej, kuchennej lub wnętrzarskiej. Znajomość programów do projektowania nie jest wymagana.

### 03 · Warunki
- Велика сума: **5 000 zł brutto / mies.**
- Рядок: **stała podstawa wynagrodzenia + premia za wyniki**
- Рядки «мітка — значення»:
  - Rodzaj umowy — umowa o pracę, umowa zlecenie lub kontrakt B2B — do uzgodnienia
  - System wynagrodzeń — stała podstawa + premia za wyniki
  - Tryb wypłaty — miesięczny
  - Wymiar pracy — pełny etat, 40 godzin tygodniowo
  - Dni pracy — poniedziałek–piątek; sobota według grafiku, w zamian wolny dzień w tygodniu
  - Godziny pracy — elastyczny grafik, 10:00–18:00
  - Tryb pracy — praca stacjonarna w showroomie; po wdrożeniu możliwy jeden dzień pracy zdalnej w tygodniu po uzgodnieniu
- Дрібно: Premie zależą od wyników i nie są gwarantowane. Kwoty brutto podajemy przed potrąceniem składek i podatku.
- **To oferujemy**
  - Stabilne zatrudnienie w firmie z własną produkcją mebli.
  - Przejrzysty system premiowy zależny od wyników.
  - Szkolenia produktowe, sprzedażowe i z obsługi CRM.
  - Wsparcie doświadczonego zespołu projektantów.
  - Możliwości rozwoju — także nauka projektowania dla chętnych.

### 04 · Wyślij CV
- H2: **Poznajmy się. Wyślij CV.**
- Лід: Zostaw kontakt i dodaj CV jako plik lub link.
- Кроки: **1** Rozmowa z HR · **2** Spotkanie z właścicielami KOLSS

Форма:
| Елемент | Текст |
|---|---|
| Ім’я | Imię |
| Телефон | Telefon · підказка: +48 … |
| Email | E-mail |
| Файл | Dodaj plik CV · PDF, DOC lub DOCX, maks. 4 MB · Usuń plik |
| Роздільник | lub |
| Посилання | Link do CV |
| Підказка CV | Wystarczy jeden sposób. Jeśli wysyłasz link, sprawdź, czy dokument jest dostępny do podglądu. |
| Коментар | Komentarz (opcjonalnie) · підказка: Kilka zdań o Twoim doświadczeniu w pracy z klientami |
| Кнопка | Wyślij zgłoszenie · стан: Wysyłanie… |
| Під кнопкою | [KLAUZULA INFORMACYJNA RODO — tekst od HR] · Pełna informacja o przetwarzaniu danych |

Помилки:
| Ключ | Текст |
|---|---|
| summary | Uzupełnij imię, telefon i e-mail oraz dodaj CV jako plik lub link. |
| name | Podaj imię. |
| phone | Sprawdź numer telefonu, np. +48 600 000 000. |
| email | Sprawdź adres e-mail. |
| cvMissing | Dodaj plik CV lub wklej link. |
| fileType | Dodaj plik PDF, DOC lub DOCX. |
| fileSize | Plik jest za duży — maksymalnie 4 MB. |
| cvUrl | Wklej pełny link zaczynający się od https://. |
| comment | Komentarz może mieć maksymalnie 1000 znaków. |
| server | Nie udało się wysłać zgłoszenia. Twoje dane zostały w formularzu — spróbuj ponownie. |
| rateLimit | Zbyt wiele prób. Spróbuj ponownie za kilka minut. |

### Thank-you
- H1: **Dziękujemy! Zgłoszenie dotarło.**
- Текст: HR skontaktuje się z Tobą, jeśli Twoje doświadczenie odpowiada tej roli.
- Посилання: Wróć do oferty

### Cookies
- Текст: Używamy niezbędnych plików cookie, aby strona działała. Za Twoją zgodą korzystamy też z Meta Pixel, aby mierzyć skuteczność naszych ogłoszeń.
- Кнопки: **Akceptuję** · **Odrzucam** · посилання: Polityka prywatności

### Footer
- KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo · KRS 0001207180 · NIP 536-199-62-94 · REGON 543320017
- Polityka prywatności · Ustawienia cookies · kolss.eu

### Мобільна кнопка
- Wyślij CV

---

## 9. Тексти — UK

### Header
- Мова: `PL · UA · EN`

### Hero
- Мітка: **Вакансія · Legionowo**
- H1: **Консультант / консультантка з продажу меблів**
- Рядок під H1: Doradca / Doradczyni klienta w salonie meblowym
- Лід: Допомагайте клієнтам обрати кухню, меблі для дому. Проєкти готують наші дизайнери, а ви ведете клієнта й продаж.
- Факти:
  - Оплата — **5 000 zł brutto / міс. + премії**
  - Зайнятість — **Повна, 5 днів, 40 годин на тиждень**
  - Місце — **Шоурум KOLSS, ul. Zegrzyńska 6, Legionowo**
- Кнопка: **Надіслати CV** · посилання: **Переглянути умови**

### 01 · Обов’язки
- Консультування клієнтів у салоні й телефоном щодо кухонь і меблів на замовлення.
- Опрацювання вхідних звернень і визначення потреб клієнта.
- Презентація продукції, матеріалів і рішень KOLSS.
- Ведення процесу продажу — від першого контакту до укладення договору.
- Співпраця з дизайнерами-проєктантами та супровід клієнта на всіх етапах замовлення.
- Ведення клієнтської бази та історії контактів у CRM.

Дрібно: Технічне проєктування не входить до обов’язків — ним займаються наші дизайнери-проєктанти.

### 02 · Вимоги
- Досвід у продажах або обслуговуванні клієнтів.
- Розвинені навички комунікації, переговорів і презентації.
- Орієнтація на результат і відповідальність за домовленості.
- Організованість і самостійність у роботі з кількома клієнтами одночасно.
- Впевнене користування комп’ютером, поштою та CRM-системами.

**Мова:** Вільна польська · дрібно: Англійська буде перевагою

**Буде перевагою**
Досвід у меблевій, кухонній або інтер’єрній сфері. Знання програм для проєктування не потрібне.

### 03 · Умови
- Велика сума: **5 000 zł brutto на місяць**
- Рядок: **+ премії за результат**
- Рядки «мітка — значення»:
  - Форма співпраці — Umowa o pracę, umowa zlecenie або B2B — за домовленістю
  - Система оплати — Стала база + премії за результати
  - Виплата — Щомісяця
  - Зайнятість — Повна, 40 годин на тиждень
  - Графік — Понеділок–п’ятниця; субота — за графіком, з вихідним у будній день
  - Години — Гнучкий графік, 10:00–18:00
  - Формат — Робота в шоурумі; після навчання можливий один дистанційний день на тиждень за погодженням
- Дрібно: Премії залежать від результатів і не гарантовані. Суми brutto — до утримання внесків і податку.
- **Що пропонуємо**
  - Стабільне працевлаштування в компанії з власним виробництвом меблів.
  - Прозора система премій, що залежить від результатів.
  - Навчання продукту, технік продажу та роботи в CRM.
  - Підтримка досвідченої команди дизайнерів-проєктантів.
  - Можливості розвитку — зокрема навчання проєктуванню за бажанням.

### 04 · Надішліть CV
- H2: **Надішліть CV.**
- Лід: Залиште контакти й додайте CV файлом або посиланням.
- Кроки: **1** Розмова з HR · **2** Зустріч із власниками KOLSS

Форма:
| Елемент | Текст |
|---|---|
| Ім’я | Ім’я |
| Телефон | Телефон · підказка: +48 … |
| Email | Email |
| Файл | Додати файл CV · PDF, DOC або DOCX, до 4 МБ · Прибрати файл |
| Роздільник | або |
| Посилання | Посилання на CV |
| Підказка CV | Достатньо одного способу. Якщо надсилаєте посилання, перевірте, що документ доступний для перегляду. |
| Коментар | Коментар (необов’язково) · підказка: Кілька речень про ваш досвід роботи з клієнтами |
| Кнопка | Надіслати заявку · стан: Надсилаємо… |
| Під кнопкою | [ІНФОРМАЦІЯ ПРО ОБРОБКУ ДАНИХ — текст від HR] · Повна інформація про обробку даних |

Помилки:
| Ключ | Текст |
|---|---|
| summary | Заповніть ім’я, телефон та email і додайте CV файлом або посиланням. |
| name | Вкажіть ім’я. |
| phone | Перевірте номер телефону, наприклад +48 600 000 000. |
| email | Перевірте адресу email. |
| cvMissing | Додайте файл CV або вставте посилання. |
| fileType | Додайте файл PDF, DOC або DOCX. |
| fileSize | Файл завеликий — максимум 4 МБ. |
| cvUrl | Вставте повне посилання, що починається з https://. |
| comment | Коментар — до 1000 символів. |
| server | Не вдалося надіслати заявку. Ваші дані збережено у формі — спробуйте ще раз. |
| rateLimit | Забагато спроб. Спробуйте ще раз за кілька хвилин. |

### Thank-you
- H1: **Дякуємо! Заявку отримано.**
- Текст: HR зв’яжеться з вами в робочі години.
- Посилання: Повернутися до вакансії

### Cookies
- Текст: Ми використовуємо необхідні cookie, щоб сайт працював. За вашою згодою — також Meta Pixel, щоб вимірювати ефективність наших оголошень.
- Кнопки: **Прийняти** · **Відхилити** · посилання: Політика приватності

### Footer
- KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo · KRS 0001207180 · NIP 536-199-62-94 · REGON 543320017
- Політика приватності · Налаштування cookie · kolss.eu

### Мобільна кнопка
- Надіслати CV

---

## 10. Тексти — EN

### Header
- Мова: `PL · UA · EN`

### Hero
- Мітка: **Job opening · Legionowo**
- H1: **Furniture Sales Consultant**
- Рядок під H1: Doradca / Doradczyni klienta w salonie meblowym
- Лід: Help clients choose a kitchen or home furniture. Our designers handle the design; you lead the client and the sale.
- Факти:
  - Pay — **5,000 PLN gross / month + bonuses**
  - Hours — **Full-time, 5 days, 40 hours a week**
  - Location — **KOLSS showroom, ul. Zegrzyńska 6, Legionowo**
- Кнопка: **Send your CV** · посилання: **See the terms**

### 01 · Responsibilities
- Advising clients in the showroom and by phone on kitchens and made-to-measure furniture.
- Handling inbound enquiries and identifying client needs.
- Presenting KOLSS products, materials and solutions.
- Managing the sales process from first contact to signed contract.
- Working with our designers and supporting clients through every stage of the order.
- Maintaining the client database and contact history in the CRM.

Дрібно: Technical design is not part of the role — our designers take care of it.

### 02 · Requirements
- Experience in sales or client service.
- Strong communication, negotiation and presentation skills.
- Results orientation and ownership of commitments.
- Good organisation and the ability to handle several clients at once independently.
- Confident use of a computer, email and CRM systems.

**Language:** Fluent Polish · дрібно: English is a plus

**Nice to have**
Experience in furniture, kitchens or interiors. Design software skills are not required.

### 03 · Terms
- Велика сума: **5,000 PLN gross / month**
- Рядок: **fixed base salary + performance bonuses**
- Рядки «мітка — значення»:
  - Contract — employment contract, contract of mandate or B2B — by agreement
  - Pay structure — fixed base + performance bonuses
  - Pay schedule — monthly
  - Hours — full-time, 40 hours a week
  - Working days — Monday to Friday; Saturdays by rota, with a weekday off in return
  - Working hours — flexible schedule, 10:00–18:00
  - Work mode — on site in the showroom; after training, one remote day a week is possible by agreement
- Дрібно: Bonuses depend on results and are not guaranteed. Gross amounts are before employee contributions and tax.
- **What we offer**
  - Stable employment with a company that runs its own furniture production.
  - A transparent bonus system based on results.
  - Product, sales and CRM training.
  - Support from an experienced team of designers.
  - Room to grow — including design training if you are interested.

### 04 · Send your CV
- H2: **Let’s meet. Send your CV.**
- Лід: Leave your contact details and add your CV as a file or a link.
- Кроки: **1** Interview with HR · **2** Meeting with the KOLSS owners

Форма:
| Елемент | Текст |
|---|---|
| Ім’я | Name |
| Телефон | Phone · підказка: +48 … |
| Email | Email |
| Файл | Add CV file · PDF, DOC or DOCX, up to 4 MB · Remove file |
| Роздільник | or |
| Посилання | Link to your CV |
| Підказка CV | One option is enough. If you share a link, make sure the document can be viewed. |
| Коментар | Comment (optional) · підказка: A few sentences about your client-facing experience |
| Кнопка | Send application · стан: Sending… |
| Під кнопкою | [DATA PROCESSING NOTICE — text from HR] · Full information on data processing |

Помилки:
| Ключ | Текст |
|---|---|
| summary | Fill in your name, phone and email, and add your CV as a file or a link. |
| name | Enter your name. |
| phone | Check the phone number, e.g. +48 600 000 000. |
| email | Check your email address. |
| cvMissing | Add a CV file or paste a link. |
| fileType | Upload a PDF, DOC or DOCX file. |
| fileSize | The file is too large — 4 MB maximum. |
| cvUrl | Paste a full link starting with https://. |
| comment | The comment can be up to 1,000 characters. |
| server | We couldn’t send your application. Your details are still in the form — please try again. |
| rateLimit | Too many attempts. Please try again in a few minutes. |

### Thank-you
- H1: **Thank you! We’ve received your application.**
- Текст: HR will contact you if your experience matches this role.
- Посилання: Back to the job offer

### Cookies
- Текст: We use essential cookies to make this site work. With your consent, we also use Meta Pixel to measure how our ads perform.
- Кнопки: **Accept** · **Reject** · посилання: Privacy policy

### Footer
- KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo · KRS 0001207180 · NIP 536-199-62-94 · REGON 543320017
- Privacy policy · Cookie settings · kolss.eu

### Мобільна кнопка
- Send your CV

---

## 11. Плейсхолдери для HR

| Плейсхолдер | Де | Примітка |
|---|---|---|
| ~~База~~ | Hero, блок 03, SEO, OG | Заповнено: **5 000 zł brutto** — рішення власника 07.10.2026 |
| ~~`[PRACODAWCA]`~~ | Footer | Заповнено власником 07.10.2026: KOLSS Polska Sp. z o.o.; HR підтверджує, що це роботодавець і адміністратор даних |
| Клаузула RODO — закрито 07.10.2026 | Під формою | Погоджений `form.rodo`; повний текст — `/privacy` |
| Повна політика — закрито 07.10.2026 | `/[lang]/privacy` | Погоджені 10 розділів у `lib/i18n/legal`; PL обов’язкова, UK/EN позначені як переклади |

У коді всі плейсхолдери — в одному конфігу (суми) і словниках (тексти), щоб HR-дані замінювалися в одному місці. Збірка production падає, якщо плейсхолдер не заповнено.

---

## 12. Ринкові оголошення — як описують конкуренти (07.10.2026)

Переглянуто: 9design (Warszawa, меблі й освітлення), FUFUSOFA (Józefów, дивани на замовлення), IWC HOME (Janki), THE BRANDS PARTNERS / Bonaldo (Warszawa, premium), AGD Smart (Macierzysz, кухонне студіо); BRW — за результатами пошуку.

- **Структура:** «Twój zakres obowiązków» → «Nasze wymagania» → «Mile widziane» → «To oferujemy». 5–9 пунктів у кожному.
- **Стиль:** віддієслівні іменники («Doradztwo…», «Prowadzenie procesu sprzedaży», «Budowanie relacji…», «Dbanie o ekspozycję…») — формально й без деталей внутрішніх процесів.
- **Обов’язки — типові формули:** doradztwo w doborze rozwiązań, kompleksowa obsługa klienta, prowadzenie procesu sprzedaży, przygotowywanie ofert, budowanie relacji z klientami (і архітекторами), koordynacja realizacji zamówień, dbanie o ekspozycję salonu.
- **Вимоги:** досвід у продажах/обслуговуванні (у частини — мін. 2–3 роки), комунікація й переговори, організованість, орієнтація на результат, мова, Office/CRM; галузевий досвід — у «Mile widziane».
- **Оплата:** у всіх — діапазон brutto (6 000–11 000, 7 000–9 000, 5 000–10 000) і формула «stała podstawa + premia/prowizja».

Застосовано: формальні віддієслівні формулювання, розділ «Буде перевагою», без замірів/передоплат/розподілу задач у команді.

Джерела: [9design](https://pl.linkedin.com/jobs/view/doradca-klienta-meble-i-o%C5%9Bwietlenie-at-9design-4473111756) · [FUFUSOFA](https://www.pracuj.pl/praca/doradca-doradczyni-klienta-w-salonie-meblowym-jozefow-pow-otwocki,oferta,1005064018) · [IWC HOME](https://www.pracuj.pl/praca/doradca-doradczyni-klienta-salon-meblowy-janki-pow-pruszkowski-plac-szwedzki-3,oferta,1005078586) · [Bonaldo](https://www.pracuj.pl/praca/doradca-klienta-sprzedawca-w-salonie-mebli-premium-warszawa-dobra-42,oferta,1005057779) · [AGD Smart](https://www.pracuj.pl/praca/doradca-klienta-sprzedawca-w-studiu-mebli-kuchennych-macierzysz-pow-warszawski-zachodni,oferta,1004964184)

## 13. Попереднє оголошення KOLSS на pracuj.pl — джерело формулювань умов

Роль «Sprzedawca / Sprzedawczyni mebli kuchennych — Projektant / Projektantka», KOLSS POLSKA sp. z o.o., архів (14.07–13.08.2026). Це інша роль (продавець-проєктант), тому беремо лише **формат і формулювання умов**, не суми й не обов’язки.

- Оплата діапазоном за типом договору: «5 000–7 000 zł brutto / mies. | umowa o pracę» і те саме для umowa zlecenie.
- Rodzaj umowy: umowa o pracę, umowa zlecenie, kontrakt B2B; pełny etat; praca stacjonarna; specjalista (mid / regular).
- System wynagrodzeń: «stała podstawa + premia uznaniowa». **Для нас — «premia za wyniki»**: наші премії прив’язані до вимірюваних результатів, а «uznaniowa» означає премію на розсуд роботодавця.
- Tryb wypłaty: miesięczna. Dni pracy: pon–pt + sobota.
- «Elastyczny grafik 10:00–18:00» — **переносимо**: власник підтвердив, що години актуальні (07.10.2026). «2 zmiany» не вказуємо.
- «To oferujemy»: стабільне працевлаштування, оплата за результатами, підтримка досвідченої команди, розвиток. «Firma działająca od ponad 25 lat» і «od ponad 20 lat» в одному оголошенні суперечать одне одному — стаж компанії не використовуємо, поки не підтверджено.
- «O nas»: KOLSS POLSKA — компанія з Legionowo, що виробляє кухонні меблі; фасади з натурального дерева, шпоновані й MDF. Можна використати для короткого рядка про компанію.


## 14. Звірка макетів під час реалізації (07.10.2026)

- Main.dc.html і Mobile.dc.html прочитано через DOM артбордів у браузері (Artifact-тул у сесії недоступний). Точні CSS-значення перенесено в реалізацію.
- Основні тексти — поточні Main/Mobile. Допоміжні MobileCookies/MobileSticky містять старі суми/мовні вимоги; з них беремо лише оформлення банера та sticky-кнопки.
- UK thank-you — останній текст Desktop Thanks («HR зв’яжеться з вами в робочі години.»), з мовною правкою пунктуації. Це не обіцянка строку відповіді.
- Власник погодив 4 MB для файла CV; більший документ — посиланням. Vercel Functions обмежують запит до 4,5 MB. У коді файл ≤ 4 000 000 байтів, загальний multipart ≤ 4 400 000 байтів.

## Privacy — реалізована структура (07.10.2026)

Header/Footer спільні з лендингом і подякою; хедер займає повну ширину контейнера. Логотип веде на лендинг поточною мовою і зберігає query; на лендингу прокручує нагору.

Повна політика містить заголовок, опис, дату, примітку перекладу UK/EN, зміст і 10 нумерованих розділів: administrator, dane, cele, odbiorcy, transfer, meta, okres, prawa, cookies, zmiany. На desktop зміст sticky; анкори мають scroll-margin-top 24px. Контакти — email/телефон/адреса; таблиця cookies на mobile подана картками; кнопка відкриває панель категорій. Privacy має локалізовані metadata, canonical, hreflang і присутня в sitemap.

RODO-плейсхолдери закриті погодженими текстами; 5.6 залишається на власнику для юридичної перевірки та видалення заявок у Slack.
