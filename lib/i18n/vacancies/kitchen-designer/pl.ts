import { COMPANY } from "../../../company";
import { salaryLabel, vacancyById } from "../../../vacancies";
import type { VacancyContent } from "../types";

const salary = salaryLabel(
  vacancyById("kitchen-designer-legionowo").salary,
  "pl",
);

const pl: VacancyContent = {
  metadata: {
    title:
      "Sprzedawca / Sprzedawczyni mebli kuchennych – Projektant / Projektantka — KOLSS Legionowo",
    description: `Projektowanie kuchni i mebli na wymiar oraz prowadzenie klienta od koncepcji do realizacji w KOLSS w Legionowie. ${salary} brutto / mies.`,
  },
  hero: {
    eyebrow: `Oferta pracy · ${COMPANY.shortLocation}`,
    title:
      "Sprzedawca / Sprzedawczyni mebli kuchennych – Projektant / Projektantka",
    role: "Sprzedawca / Sprzedawczyni mebli kuchennych – Projektant / Projektantka",
    lead: "Projektujesz kuchnie i meble na wymiar. Prowadzisz klienta od pierwszej rozmowy, przez koncepcję i wizualizację, do projektu gotowego do realizacji.",
    payLabel: "Wynagrodzenie",
    payUnit: " brutto / mies. + premie",
    hoursLabel: "Etat",
    hours: "Pełny etat, praca w 2 zmianach",
    locationLabel: "Miejsce",
    location: `Salon KOLSS, ${COMPANY.shortAddress}`,
    cta: "Wyślij CV",
    terms: "Zobacz warunki",
  },
  duties: {
    title: "Zakres obowiązków",
    items: [
      "Projektowanie nowoczesnych i funkcjonalnych mebli na wymiar, przede wszystkim kuchennych.",
      "Prowadzenie klienta od poznania jego potrzeb, przez koncepcję i wizualizację, aż do przygotowania projektu do realizacji.",
      "Doradztwo w zakresie materiałów, kolorystyki, wyposażenia i rozwiązań funkcjonalnych.",
      "Przygotowywanie wizualizacji, specyfikacji materiałowych oraz dokumentacji technicznej.",
      "Współpraca z klientami, działem produkcji oraz firmami zewnętrznymi.",
      "Dbanie o estetykę, funkcjonalność i jakość przygotowywanych projektów.",
      "Aktywne uczestnictwo w procesie sprzedaży i realizacji indywidualnych projektów klientów.",
    ],
    extraTitle: "Jak wygląda praca na tym stanowisku?",
    extra: [
      "To stanowisko łączy projektowanie, doradztwo i kontakt z klientem.",
      "Nie oczekujemy, że od pierwszego dnia będziesz znać wszystkie nasze rozwiązania i procesy. Wprowadzimy Cię w specyfikę naszej produkcji, stosowane materiały, akcesoria oraz sposób pracy z projektami.",
      "Twoim zadaniem będzie przede wszystkim słuchanie klienta, stworzenie dla niego funkcjonalnego i estetycznego projektu oraz doprowadzenie go do etapu realizacji. Dzięki temu masz realny wpływ na efekt końcowy — od pierwszej koncepcji aż po gotowy mebel.",
    ],
  },
  requirements: {
    title: "Wymagania",
    items: [
      "Minimum 2 lata doświadczenia w projektowaniu mebli lub wnętrz.",
      "Swoboda w kontakcie z klientem i umiejętność rozpoznania jego potrzeb.",
      "Wyczucie estetyki, kreatywność i dbałość o szczegóły.",
      "Znajomość podstaw technologii meblarskiej, materiałów i akcesoriów.",
      "Samodzielność w organizacji pracy.",
      "Znajomość programów Pro100 i KRAY na poziomie pozwalającym na samodzielne przygotowywanie projektów.",
      "Czynne prawo jazdy kat. B.",
    ],
    note: "Nie wymagamy wykształcenia kierunkowego — liczą się przede wszystkim Twoje umiejętności, doświadczenie i portfolio.",
    languageTitle: "Język",
    language: "Biegła znajomość języka polskiego",
    languageNote:
      "Znajomość języka angielskiego, rosyjskiego lub ukraińskiego będzie atutem",
    advantageTitle: "Dodatkowym atutem będzie",
    advantageItems: [
      "Znajomość programów SketchUp, V-Ray, AutoCAD, ArchiCAD, 3ds Max lub podobnych.",
      "Doświadczenie w sprzedaży mebli lub obsłudze klienta indywidualnego.",
    ],
    advantage:
      "Nie znasz wszystkich wymienionych programów? To nie problem. Zapewniamy możliwość nauki i rozwijania kompetencji w zakresie narzędzi, z których korzystamy.",
  },
  terms: {
    title: "Warunki",
    payUnit: "zł brutto / mies.",
    subtitle: "umowa o pracę lub umowa zlecenie",
    rows: [
      {
        label: "Rodzaj umowy",
        value: `${COMPANY.contractNames.employment}, ${COMPANY.contractNames.mandate} lub kontrakt ${COMPANY.contractNames.b2b}`,
      },
      {
        label: "System wynagrodzeń",
        value:
          "stała podstawa wynagrodzenia + premia za wyniki + premia uznaniowa",
      },
      { label: "Tryb wypłaty", value: "miesięczny" },
      { label: "Wymiar pracy", value: "pełny etat" },
      { label: "Praca zmianowa", value: "tak, 2 zmiany" },
      { label: "Dni pracy", value: "poniedziałek–piątek oraz sobota" },
      { label: "Godziny pracy", value: `elastyczny grafik, ${COMPANY.hours}` },
      { label: "Tryb pracy", value: "praca stacjonarna" },
      {
        label: "Klienci",
        value: "firmy (B2B) i klienci indywidualni (B2C)",
      },
      { label: "Rozpoczęcie", value: "od zaraz" },
    ],
    note: "Wynagrodzenie zależy od doświadczenia i umiejętności. Premie nie są gwarantowane. Kwoty brutto podajemy przed potrąceniem składek i podatku.",
    offerTitle: "To oferujemy",
    offers: [
      `Wynagrodzenie ${salary} brutto — uzależnione od doświadczenia i umiejętności.`,
      "Możliwość dodatkowego systemu premiowego lub prowizyjnego — szczegóły przedstawimy podczas rozmowy.",
      "Stabilne zatrudnienie w firmie działającej na rynku od ponad 25 lat.",
      "Wdrożenie i wsparcie doświadczonego zespołu — nie zostawiamy nowej osoby samej z projektami.",
      "Szkolenia i możliwość nauki nowych programów oraz rozwijania kompetencji.",
      "Indywidualne, ciekawe projekty dopasowane do potrzeb klientów.",
      "Realny wpływ na wygląd, funkcjonalność i jakość tworzonych mebli.",
      "Przyjazna atmosfera pracy i współpraca z doświadczonym zespołem.",
      "Możliwość rozwoju zawodowego wraz z rozwojem firmy.",
    ],
  },
  form: {
    title: "Poznajmy się. Wyślij CV i portfolio.",
    lead: "Zostaw kontakt, dodaj CV jako plik lub link, a jeśli masz — link do portfolio.",
    steps: ["Rozmowa z HR", "Spotkanie z właścicielami KOLSS"],
    commentPlaceholder:
      "Kilka zdań o Twoim doświadczeniu w projektowaniu mebli",
    portfolioField: true,
  },
};

export default pl;
