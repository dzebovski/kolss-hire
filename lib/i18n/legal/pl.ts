import { VACANCY } from "../../vacancy";
import type { PrivacyContent } from "./types";

const { email } = VACANCY.contact;

const privacy: PrivacyContent = {
  title: "Polityka prywatności",
  updated: "Obowiązuje od 7 października 2026 r.",
  lead: "Wyjaśniamy, jak KOLSS Polska Sp. z o.o. przetwarza dane osób, które aplikują przez tę stronę, i jak korzystamy z plików cookie.",
  contentsTitle: "Spis treści",
  cookieHeaders: {
    name: "Nazwa",
    provider: "Dostawca",
    purpose: "Cel",
    lifetime: "Okres",
  },
  contactLabels: { email: "E-mail", phone: "Telefon", address: "Adres" },
  settingsButton: "Zmień ustawienia cookies",
  sections: [
    {
      id: "administrator",
      title: "Administrator danych",
      blocks: [
        `Administratorem Twoich danych osobowych jest ${VACANCY.employer} z siedzibą w Legionowie, ${VACANCY.address}, wpisana do rejestru przedsiębiorców KRS pod numerem 0001207180, NIP 536-199-62-94, REGON 543320017.`,
        "W sprawach dotyczących danych osobowych skontaktuj się z nami. Nie wyznaczyliśmy inspektora ochrony danych.",
        { contact: true },
      ],
    },
    {
      id: "dane",
      title: "Jakie dane zbieramy",
      blocks: [
        "Z formularza zgłoszeniowego:",
        {
          list: [
            "imię;",
            "numer telefonu i adres e-mail;",
            "CV — plik lub link — oraz dane, które sam w nim umieścisz;",
            "komentarz, jeśli go dodasz.",
          ],
        },
        "Automatycznie przy wysłaniu formularza: wersję językową strony, źródło wejścia (parametry kampanii UTM i informację o kliknięciu reklamy Meta), adres IP i dane przeglądarki — w zakresie potrzebnym do obsługi i zabezpieczenia formularza.",
        "Podanie imienia, telefonu, e-maila i CV jest dobrowolne, ale bez nich nie rozpatrzymy zgłoszenia. Nie umieszczaj w CV zdjęcia ani danych szczególnych kategorii, np. o zdrowiu czy wyznaniu — nie są nam potrzebne. Nie pytamy o Twoje obecne ani wcześniejsze wynagrodzenie.",
      ],
    },
    {
      id: "cele",
      title: "Cele i podstawy prawne",
      blocks: [
        {
          list: [
            "Rekrutacja na stanowisko doradcy / doradczyni klienta w salonie — art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy na Twoje żądanie) w związku z art. 22¹ Kodeksu pracy.",
            "Dane, które podajesz z własnej inicjatywy, np. w CV lub komentarzu — Twoja zgoda, art. 6 ust. 1 lit. a RODO w związku z art. 22¹a Kodeksu pracy. Wysyłając zgłoszenie z takimi danymi, zgadzasz się na ich przetwarzanie w tej rekrutacji.",
            "Ochrona formularza przed spamem i nadużyciami oraz ustalenie, skąd trafiło zgłoszenie — nasz prawnie uzasadniony interes, art. 6 ust. 1 lit. f RODO.",
            "Pomiar skuteczności ogłoszeń w Meta — wyłącznie za Twoją zgodą, art. 6 ust. 1 lit. a RODO i art. 399 Prawa komunikacji elektronicznej.",
          ],
        },
        "Zgodę możesz wycofać w każdej chwili. Nie wpływa to na zgodność z prawem przetwarzania przed jej wycofaniem.",
      ],
    },
    {
      id: "odbiorcy",
      title: "Komu przekazujemy dane",
      blocks: [
        "Zgłoszenia widzą wyłącznie upoważnione osoby z KOLSS, które prowadzą rekrutację. Korzystamy też z dostawców, którzy przetwarzają dane na nasze zlecenie:",
        {
          list: [
            "Vercel Inc. (USA) — hosting strony, obsługa formularza i ochrona przed botami;",
            "Slack Technologies, LLC (USA, grupa Salesforce) — komunikator, w którym zespół rekrutacyjny otrzymuje zgłoszenia i pliki CV;",
            "Meta Platforms Ireland Ltd (Irlandia) — tylko jeśli zgodzisz się na cookies marketingowe, zob. punkt „Meta Pixel i Conversions API”.",
          ],
        },
        "Nie sprzedajemy danych i nie przekazujemy CV innym firmom.",
      ],
    },
    {
      id: "transfer",
      title: "Przekazywanie danych poza EOG",
      blocks: [
        `Vercel, Slack i Meta mogą przetwarzać dane w USA. Podstawą jest decyzja Komisji Europejskiej z 10 lipca 2023 r. o odpowiednim stopniu ochrony (EU-US Data Privacy Framework), a gdy nie ma ona zastosowania — standardowe klauzule umowne zatwierdzone przez Komisję. Informację o zabezpieczeniach otrzymasz, pisząc na ${email}.`,
      ],
    },
    {
      id: "meta",
      title: "Meta Pixel i Conversions API",
      blocks: [
        "Jeśli zaakceptujesz cookies marketingowe, strona ładuje Meta Pixel. Rejestruje on wyświetlenie strony, rozpoczęcie wypełniania formularza i wysłanie zgłoszenia. Po wysłaniu nasz serwer przekazuje Meta informację o zgłoszeniu (Conversions API). Dzięki temu wiemy, które ogłoszenia działają, i nie liczymy jednego zgłoszenia dwa razy.",
        "Meta otrzymuje wtedy identyfikator zdarzenia, pliki cookie _fbp i _fbc, adres IP, dane przeglądarki oraz adres e-mail i numer telefonu w postaci skrótu SHA-256. Meta nie otrzymuje Twojego imienia, CV ani komentarza.",
        "W zakresie zbierania i przekazywania tych danych jesteśmy współadministratorem z Meta Platforms Ireland Ltd (facebook.com/legal/controller_addendum). Dalej Meta przetwarza dane jako odrębny administrator, zgodnie ze swoją polityką prywatności (facebook.com/privacy/policy).",
        "Bez Twojej zgody Pixel się nie ładuje, a nasz serwer nie wysyła danych do Meta.",
      ],
    },
    {
      id: "okres",
      title: "Jak długo przechowujemy dane",
      blocks: [
        {
          list: [
            "Dane ze zgłoszenia — do zakończenia rekrutacji na to stanowisko. Potem usuwamy zgłoszenie i CV.",
            "Jeśli zawrzemy z Tobą umowę, dane potrzebne do współpracy przechowujemy na zasadach z odrębnej informacji, którą otrzymasz przy zawarciu umowy.",
            "Jeśli poprosisz o usunięcie danych lub wycofasz zgodę, usuniemy odpowiednie dane niezwłocznie.",
            "Twój wybór dotyczący cookies — 6 miesięcy. Pozostałe pliki cookie — zgodnie z tabelą w punkcie „Pliki cookie”.",
            "Logi techniczne prowadzi Vercel przez krótki czas potrzebny do zapewnienia bezpieczeństwa. Nie zapisujemy w nich treści formularza.",
          ],
        },
      ],
    },
    {
      id: "prawa",
      title: "Twoje prawa",
      blocks: [
        "Masz prawo do:",
        {
          list: [
            "dostępu do danych i otrzymania ich kopii;",
            "sprostowania danych;",
            "usunięcia danych;",
            "ograniczenia przetwarzania;",
            "przenoszenia danych przetwarzanych na podstawie zgody lub umowy;",
            "sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie;",
            "wycofania zgody w każdej chwili.",
          ],
        },
        `Aby skorzystać z praw, napisz na ${email}. Odpowiemy w ciągu miesiąca.`,
        "Możesz też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl).",
        "Nie podejmujemy decyzji rekrutacyjnych automatycznie i nie profilujemy kandydatów. Decyzję zawsze podejmują ludzie.",
      ],
    },
    {
      id: "cookies",
      title: "Pliki cookie",
      blocks: [
        "Strona zapisuje w Twojej przeglądarce tylko to, co niezbędne do jej działania. Cookies marketingowe zapisujemy wyłącznie za Twoją zgodą.",
        {
          cookies: [
            {
              name: "kh_consent",
              provider: "KOLSS",
              purpose: "Niezbędne — zapamiętuje Twój wybór dotyczący cookies",
              lifetime: "6 miesięcy",
            },
            {
              name: "Techniczne cookies Vercel",
              provider: "Vercel",
              purpose:
                "Niezbędne — ochrona przed botami i atakami; zapisywane tylko przy weryfikacji bezpieczeństwa",
              lifetime: "Sesja lub kilka godzin",
            },
            {
              name: "_fbp",
              provider: "Meta",
              purpose:
                "Marketingowe — rozpoznaje przeglądarkę na potrzeby pomiaru ogłoszeń",
              lifetime: "90 dni",
            },
            {
              name: "_fbc",
              provider: "Meta",
              purpose: "Marketingowe — zapamiętuje kliknięcie reklamy Meta",
              lifetime: "90 dni",
            },
            {
              name: "kh_fbclid, kh_eid, kh_eid_sent, kh_start_application",
              provider: "KOLSS",
              purpose:
                "Marketingowe — pamięć sesji przeglądarki; pozwala policzyć zdarzenia bez duplikatów",
              lifetime: "Do zamknięcia karty",
            },
          ],
        },
        "Zgodę możesz zmienić w każdej chwili. Pliki cookie usuniesz też w ustawieniach przeglądarki.",
        { settings: true },
      ],
    },
    {
      id: "zmiany",
      title: "Zmiany polityki",
      blocks: [
        "Gdy zmienimy sposób przetwarzania danych, zaktualizujemy tę stronę i datę na górze.",
      ],
    },
  ],
};

export default privacy;
