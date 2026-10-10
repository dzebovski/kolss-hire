import { COMPANY } from "../../../company";
import { salaryLabel, vacancyById } from "../../../vacancies";
import type { VacancyContent } from "../types";

const salary = salaryLabel(
  vacancyById("sales-consultant-legionowo").salary,
  "pl",
);

const pl: VacancyContent = {
  metadata: {
    title: "Doradca / Doradczyni klienta w salonie meblowym — KOLSS Legionowo",
    description: `Praca w salonie KOLSS w Legionowie: rozmowy z klientami, spotkania w salonie i prowadzenie sprzedaży do umowy. ${salary} brutto + premie.`,
  },
  hero: {
    eyebrow: `Oferta pracy · ${COMPANY.shortLocation}`,
    title: "Doradca / Doradczyni klienta w salonie meblowym",
    role: "Doradca / Doradczyni klienta w salonie meblowym",
    lead: "Pomagasz klientom wybrać kuchnię lub meble do domu. Projekty przygotowują nasi projektanci, a Ty prowadzisz klienta i sprzedaż.",
    payLabel: "Wynagrodzenie",
    payUnit: " brutto / mies. + premie",
    hoursLabel: "Etat",
    hours: `Pełny etat, ${COMPANY.workingDays} dni, ${COMPANY.weeklyHours} godzin tygodniowo`,
    locationLabel: "Miejsce",
    location: `Salon KOLSS, ${COMPANY.shortAddress}`,
    cta: "Wyślij CV",
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
    payUnit: "zł brutto / mies.",
    subtitle: "stała podstawa wynagrodzenia + premia za wyniki",
    rows: [
      {
        label: "Rodzaj umowy",
        value: `${COMPANY.contractNames.employment}, ${COMPANY.contractNames.mandate} lub kontrakt ${COMPANY.contractNames.b2b} — do uzgodnienia`,
      },
      {
        label: "System wynagrodzeń",
        value: "stała podstawa + premia za wyniki",
      },
      { label: "Tryb wypłaty", value: "miesięczny" },
      {
        label: "Wymiar pracy",
        value: `pełny etat, ${COMPANY.weeklyHours} godzin tygodniowo`,
      },
      {
        label: "Dni pracy",
        value:
          "poniedziałek–piątek; sobota według grafiku, w zamian wolny dzień w tygodniu",
      },
      { label: "Godziny pracy", value: `elastyczny grafik, ${COMPANY.hours}` },
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
    commentPlaceholder: "Kilka zdań o Twoim doświadczeniu w pracy z klientami",
  },
};

export default pl;
