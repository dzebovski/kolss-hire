import type { Locale } from "./i18n/locales";

/** Vacancy registry: ids travel through the form, slugs build the URLs. */
export const vacancyIds = [
  "sales-consultant-legionowo",
  "kitchen-designer-legionowo",
] as const;
export type VacancyId = (typeof vacancyIds)[number];

export type Salary = { min: number; max?: number };

export type Vacancy = {
  id: VacancyId;
  slug: string;
  /** Polish title for HR notifications in Slack. */
  titlePl: string;
  /** Monthly gross pay in PLN. */
  salary: Salary;
};

export const VACANCIES: readonly Vacancy[] = [
  {
    id: "sales-consultant-legionowo",
    slug: "doradca-klienta",
    titlePl: "Doradca / Doradczyni klienta w salonie meblowym",
    salary: { min: 5000 },
  },
  {
    id: "kitchen-designer-legionowo",
    slug: "projektant-mebli",
    titlePl:
      "Sprzedawca / Sprzedawczyni mebli kuchennych – Projektant / Projektantka",
    salary: { min: 5500, max: 8000 },
  },
];

export const vacancyBySlug = (slug: string) =>
  VACANCIES.find((vacancy) => vacancy.slug === slug);

export const vacancyById = (id: VacancyId) =>
  VACANCIES.find((vacancy) => vacancy.id === id)!;

const number = (value: number, locale: "pl" | "en") => {
  const formatted = new Intl.NumberFormat("en-GB").format(value);
  return locale === "en" ? formatted : formatted.replace(/,/g, " ");
};

/** Amount without currency: "5 000", "5 500–8 000" or "5,500–8,000" in English. */
export function salaryAmount(salary: Salary, locale: Locale | "pl" = "pl") {
  const style = locale === "en" ? "en" : "pl";
  return [salary.min, salary.max]
    .filter((value): value is number => value !== undefined)
    .map((value) => number(value, style))
    .join("–");
}

/** Amount with currency: "5 000 zł" or "5,000 PLN". */
export function salaryLabel(salary: Salary, locale: Locale) {
  return locale === "en"
    ? `${salaryAmount(salary, "en")} PLN`
    : `${salaryAmount(salary, locale)} zł`;
}
