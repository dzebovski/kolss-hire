import { COMPANY } from "../../company";
import privacy from "../legal/pl";
import type { Dictionary } from "../types";

const pl = {
  header: { home: "KOLSS — oferty pracy" },
  jobs: {
    metadata: {
      title: "Oferty pracy — KOLSS Legionowo",
      description: "Aktualne oferty pracy w KOLSS Polska w Legionowie: sprzedaż i projektowanie mebli kuchennych na wymiar.",
    },
    eyebrow: "Praca w KOLSS · Legionowo",
    title: "Oferty pracy",
    lead: "Produkujemy kuchnie i meble na wymiar. Szukamy osób, które poprowadzą klienta od pierwszej rozmowy do gotowego projektu.",
    listLabel: "Aktualne oferty",
    open: "Zobacz ofertę",
    nav: "Oferty pracy",
  },
  about: {
    eyebrow: "KOLSS Polska",
    title: "O nas",
    paragraphs: [
      "KOLSS POLSKA to firma z siedzibą w Legionowie, specjalizująca się w produkcji mebli kuchennych.",
      "Od ponad 25 lat łączymy doświadczenie i rzemiosło z nowoczesnymi europejskimi technologiami. Produkujemy m.in. fronty z naturalnego drewna, fronty fornirowane oraz fronty z MDF, realizując projekty dopasowane do różnorodnych potrzeb i stylów wnętrz.",
      "Stawiamy na precyzję wykonania, trwałość, estetykę oraz odpowiedzialne podejście do produkcji.",
      "Jeżeli chcesz rozwijać swoje umiejętności, tworzyć indywidualne projekty i mieć wpływ na ich realizację — dołącz do naszego zespołu.",
    ],
  },
  form: {
    name: "Imię",
    phone: "Telefon",
    email: "E-mail",
    file: "Dodaj plik CV",
    fileHint: `PDF, DOC lub DOCX, maks. ${COMPANY.cvMaxSizeMb} MB`,
    removeFile: "Usuń plik",
    or: "lub",
    cvUrl: "Link do CV",
    cvHint:
      "Wystarczy jeden sposób. Jeśli wysyłasz link, sprawdź, czy dokument jest dostępny do podglądu.",
    portfolio: "Link do portfolio (opcjonalnie)",
    comment: "Komentarz (opcjonalnie)",
    submit: "Wyślij zgłoszenie",
    sending: "Wysyłanie…",
    rodo: "Administratorem danych jest KOLSS Polska Sp. z o.o. Przetwarzamy je wyłącznie w celu tej rekrutacji i usuwamy po jej zakończeniu. Zgodę możesz wycofać w każdej chwili.",
    rodoConsent: "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w zgłoszeniu przez KOLSS Polska Sp. z o.o. w celu przeprowadzenia tej rekrutacji.",
    rodoConsentShort: "Zgoda na przetwarzanie danych",
    privacyLink: "Pełna informacja o przetwarzaniu danych",
    errors: {
      summary: "Sprawdź pola poniżej:",
      name: "Podaj imię.",
      phone: "Sprawdź numer telefonu, np. +48 600 000 000.",
      email: "Sprawdź adres e-mail.",
      cvMissing: "Dodaj plik CV lub wklej link.",
      rodoConsent: "Zaznacz zgodę na przetwarzanie danych, aby wysłać zgłoszenie.",
      fileType: "Dodaj plik PDF, DOC lub DOCX.",
      fileSize: `Plik jest za duży — maksymalnie ${COMPANY.cvMaxSizeMb} MB.`,
      cvUrl: "Wklej pełny link zaczynający się od https://.",
      portfolioUrl: "Wklej pełny link zaczynający się od https://.",
      comment: `Komentarz może mieć maksymalnie ${COMPANY.commentMaxLength} znaków.`,
      server:
        "Nie udało się wysłać zgłoszenia. Twoje dane zostały w formularzu — spróbuj ponownie.",
      rateLimit: "Zbyt wiele prób. Spróbuj ponownie za kilka minut.",
    },
  },
  thanks: {
    title: "Dziękujemy! Zgłoszenie dotarło.",
    text: "HR skontaktuje się z Tobą, jeśli Twoje doświadczenie odpowiada tej roli.",
    back: "Wróć do ofert pracy",
  },
  cookies: {
    text: "Używamy niezbędnych plików cookie, aby strona działała. Za Twoją zgodą korzystamy też z Meta Pixel, aby mierzyć skuteczność naszych ogłoszeń.",
    accept: "Akceptuję",
    reject: "Odrzucam",
    customize: "Ustawienia",
    privacy: "Polityka prywatności",
    settings: "Ustawienia cookies",
    settingsLead:
      "Wybierz, na które pliki cookie się zgadzasz. Wybór możesz zmienić w każdej chwili w stopce strony.",
    necessaryTitle: "Niezbędne",
    necessaryText:
      "Zapamiętują Twój wybór i chronią formularz przed botami. Nie można ich wyłączyć.",
    alwaysOn: "Zawsze aktywne",
    marketingTitle: "Marketingowe",
    marketingText:
      "Meta Pixel i Conversions API — pomiar skuteczności naszych ogłoszeń o pracę. Bez zgody nic nie wysyłamy do Meta.",
    save: "Zapisz wybór",
    acceptAll: "Akceptuj wszystkie",
    close: "Zamknij",
  },
  footer: {
    company: `${COMPANY.employer}, ${COMPANY.address} · ${COMPANY.registry}`,
    privacy: "Polityka prywatności",
    cookies: "Ustawienia cookies",
    contact: "Kontakt",
  },
  privacy,
} satisfies Dictionary;

export default pl;
