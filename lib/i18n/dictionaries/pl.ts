import { VACANCY } from "../../vacancy";
import privacy from "../legal/pl";
import type { Dictionary } from "../types";

const salary = `${VACANCY.salary.amount} ${VACANCY.salary.currency}`;
const workAddress = `Salon KOLSS, ${VACANCY.shortAddress}`;

const pl = {
  metadata: {
    title: "Doradca / Doradczyni klienta w salonie meblowym — KOLSS Legionowo",
    description: `Praca w salonie KOLSS w Legionowie: rozmowy z klientami, spotkania w salonie i prowadzenie sprzedaży do umowy. ${salary} brutto + premie.`,
  },
  hero: {
    eyebrow: `Oferta pracy · ${VACANCY.shortLocation}`,
    title: "Doradca / Doradczyni klienta w salonie meblowym",
    role: "Doradca / Doradczyni klienta w salonie meblowym",
    lead: "Pomagasz klientom wybrać kuchnię lub meble do domu. Projekty przygotowują nasi projektanci, a Ty prowadzisz klienta i sprzedaż.",
    payLabel: "Wynagrodzenie",
    pay: `${salary} brutto / mies. + premie`,
    hoursLabel: "Etat",
    hours: `Pełny etat, ${VACANCY.workingDays} dni, ${VACANCY.weeklyHours} godzin tygodniowo`,
    locationLabel: "Miejsce",
    location: workAddress,
    cta: "Wyślij CV",
    mobileCta: "Wyślij CV",
    terms: "Zobacz warunki",
  },
  duties: {
    title: "Zakres obowiązków",
    items: [
      "Doradztwo klientom w salonie i telefonicznie w zakresie kuchni i mebli na wymiar.",
      "Obsługa zapytań przychodzących i rozpoznawanie potrzeb klienta.",
      "Prezentacja produktów, materiałów i rozwiązań KOLSS.",
      "Prowadzenie procesu sprzedaży — od pierwszego kontaktu do podpisania umowy.",
      "Współpraca z projektantami i opieka nad klientem na wszystkich etapach zamówienia.",
      "Prowadzenie bazy klientów i historii kontaktów w CRM.",
    ],
    note: "Projektowanie techniczne nie należy do obowiązków — zajmują się nim nasi projektanci.",
  },
  requirements: {
    title: "Wymagania",
    items: [
      "Doświadczenie w sprzedaży lub obsłudze klienta.",
      "Wysokie umiejętności komunikacyjne, negocjacyjne i prezentacyjne.",
      "Nastawienie na wynik i odpowiedzialność za ustalenia.",
      "Dobra organizacja pracy i samodzielność w obsłudze wielu klientów jednocześnie.",
      "Sprawna obsługa komputera, poczty e-mail i systemów CRM.",
    ],
    languageTitle: "Język",
    language: "Biegła znajomość języka polskiego",
    languageNote: "Znajomość języka angielskiego będzie atutem",
    advantageTitle: "Mile widziane",
    advantage:
      "Doświadczenie w branży meblowej, kuchennej lub wnętrzarskiej. Znajomość programów do projektowania nie jest wymagana.",
  },
  terms: {
    title: "Warunki",
    pay: `${salary} brutto / mies.`,
    subtitle: "stała podstawa wynagrodzenia + premia za wyniki",
    rows: [
      {
        label: "Rodzaj umowy",
        value: `${VACANCY.contractNames.employment}, ${VACANCY.contractNames.mandate} lub kontrakt ${VACANCY.contractNames.b2b} — do uzgodnienia`,
      },
      {
        label: "System wynagrodzeń",
        value: "stała podstawa + premia za wyniki",
      },
      { label: "Tryb wypłaty", value: "miesięczny" },
      {
        label: "Wymiar pracy",
        value: `pełny etat, ${VACANCY.weeklyHours} godzin tygodniowo`,
      },
      {
        label: "Dni pracy",
        value:
          "poniedziałek–piątek; sobota według grafiku, w zamian wolny dzień w tygodniu",
      },
      { label: "Godziny pracy", value: `elastyczny grafik, ${VACANCY.hours}` },
      {
        label: "Tryb pracy",
        value:
          "praca stacjonarna w showroomie; po wdrożeniu możliwy jeden dzień pracy zdalnej w tygodniu po uzgodnieniu",
      },
    ],
    note: "Premie zależą od wyników i nie są gwarantowane. Kwoty brutto podajemy przed potrąceniem składek i podatku.",
    offerTitle: "To oferujemy",
    offers: [
      "Stabilne zatrudnienie w firmie z własną produkcją mebli.",
      "Przejrzysty system premiowy zależny od wyników.",
      "Szkolenia produktowe, sprzedażowe i z obsługi CRM.",
      "Wsparcie doświadczonego zespołu projektantów.",
      "Możliwości rozwoju — także nauka projektowania dla chętnych.",
    ],
  },
  form: {
    title: "Poznajmy się. Wyślij CV.",
    lead: "Zostaw kontakt i dodaj CV jako plik lub link.",
    steps: ["Rozmowa z HR", "Spotkanie z właścicielami KOLSS"],
    name: "Imię",
    phone: "Telefon",
    email: "E-mail",
    file: "Dodaj plik CV",
    fileHint: `PDF, DOC lub DOCX, maks. ${VACANCY.cvMaxSizeMb} MB`,
    removeFile: "Usuń plik",
    or: "lub",
    cvUrl: "Link do CV",
    cvHint:
      "Wystarczy jeden sposób. Jeśli wysyłasz link, sprawdź, czy dokument jest dostępny do podglądu.",
    comment: "Komentarz (opcjonalnie)",
    commentPlaceholder: "Kilka zdań o Twoim doświadczeniu w pracy z klientami",
    submit: "Wyślij zgłoszenie",
    sending: "Wysyłanie…",
    rodo: "Administratorem danych jest KOLSS Polska Sp. z o.o. Przetwarzamy je wyłącznie w celu tej rekrutacji i usuwamy po jej zakończeniu. Wysyłając zgłoszenie, zgadzasz się na przetwarzanie danych podanych dobrowolnie, np. w CV — zgodę możesz wycofać w każdej chwili.",
    privacyLink: "Pełna informacja o przetwarzaniu danych",
    errors: {
      summary:
        "Uzupełnij imię, telefon i e-mail oraz dodaj CV jako plik lub link.",
      name: "Podaj imię.",
      phone: "Sprawdź numer telefonu, np. +48 600 000 000.",
      email: "Sprawdź adres e-mail.",
      cvMissing: "Dodaj plik CV lub wklej link.",
      fileType: "Dodaj plik PDF, DOC lub DOCX.",
      fileSize: `Plik jest za duży — maksymalnie ${VACANCY.cvMaxSizeMb} MB.`,
      cvUrl: "Wklej pełny link zaczynający się od https://.",
      comment: `Komentarz może mieć maksymalnie ${VACANCY.commentMaxLength} znaków.`,
      server:
        "Nie udało się wysłać zgłoszenia. Twoje dane zostały w formularzu — spróbuj ponownie.",
      rateLimit: "Zbyt wiele prób. Spróbuj ponownie za kilka minut.",
    },
  },
  thanks: {
    title: "Dziękujemy! Zgłoszenie dotarło.",
    text: "HR skontaktuje się z Tobą, jeśli Twoje doświadczenie odpowiada tej roli.",
    back: "Wróć do oferty",
  },
  cookies: {
    text: "Używamy niezbędnych plików cookie, aby strona działała. Za Twoją zgodą korzystamy też z Meta Pixel, aby mierzyć skuteczność naszych ogłoszeń.",
    accept: "Akceptuję",
    reject: "Odrzucam",
    customize: "Ustawienia",
    privacy: "Polityka prywatności",
    settings: "Ustawienia cookies",
    settingsLead: "Wybierz, na które pliki cookie się zgadzasz. Wybór możesz zmienić w każdej chwili w stopce strony.",
    necessaryTitle: "Niezbędne",
    necessaryText: "Zapamiętują Twój wybór i chronią formularz przed botami. Nie można ich wyłączyć.",
    alwaysOn: "Zawsze aktywne",
    marketingTitle: "Marketingowe",
    marketingText: "Meta Pixel i Conversions API — pomiar skuteczności naszych ogłoszeń o pracę. Bez zgody nic nie wysyłamy do Meta.",
    save: "Zapisz wybór",
    acceptAll: "Akceptuj wszystkie",
    close: "Zamknij",
  },
  footer: {
    company: `${VACANCY.employer}, ${VACANCY.address} · ${VACANCY.registry}`,
    privacy: "Polityka prywatności",
    cookies: "Ustawienia cookies",
    contact: "Kontakt",
  },
  privacy,
} satisfies Dictionary;

export default pl;
