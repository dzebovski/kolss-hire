type Row = { label: string; value: string };

/** Per-vacancy page content; shared UI texts stay in the locale dictionaries. */
export type VacancyContent = {
  metadata: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    /** Polish job title shown under non-Polish headings. */
    role: string;
    lead: string;
    payLabel: string;
    /** Text after the highlighted salary, e.g. " brutto / mies. + premie". */
    payUnit: string;
    hoursLabel: string;
    hours: string;
    locationLabel: string;
    location: string;
    cta: string;
    terms: string;
  };
  duties: {
    title: string;
    items: string[];
    note?: string;
    extraTitle?: string;
    extra?: string[];
  };
  requirements: {
    title: string;
    items: string[];
    note?: string;
    languageTitle: string;
    language: string;
    languageNote: string;
    advantageTitle: string;
    advantageItems?: string[];
    advantage: string;
  };
  terms: {
    title: string;
    /** Text after the big salary figure, e.g. "zł brutto / mies.". */
    payUnit: string;
    subtitle: string;
    /** Joins payUnit and subtitle; defaults to " · ". */
    joiner?: string;
    rows: Row[];
    note: string;
    offerTitle: string;
    offers: string[];
  };
  form: {
    title: string;
    lead: string;
    steps: string[];
    commentPlaceholder: string;
    /** Shows the optional portfolio link field. */
    portfolioField?: boolean;
  };
};
