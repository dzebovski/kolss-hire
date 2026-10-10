import type { Locale } from "../locales";
import type { VacancyId } from "../../vacancies";
import type { VacancyContent } from "./types";

type Loader = () => Promise<{ default: VacancyContent }>;

const content: Record<VacancyId, Record<Locale, Loader>> = {
  "sales-consultant-legionowo": {
    pl: () => import("./sales-consultant/pl"),
    uk: () => import("./sales-consultant/uk"),
    en: () => import("./sales-consultant/en"),
  },
  "kitchen-designer-legionowo": {
    pl: () => import("./kitchen-designer/pl"),
    uk: () => import("./kitchen-designer/uk"),
    en: () => import("./kitchen-designer/en"),
  },
};

export async function vacancyContent(id: VacancyId, locale: Locale) {
  return (await content[id][locale]()).default;
}

export type { VacancyContent };
