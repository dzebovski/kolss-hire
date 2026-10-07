/** Content blocks of the privacy page. Strings are paragraphs. */
export type LegalBlock =
  | string
  | { list: string[] }
  | { cookies: CookieRow[] }
  | { contact: true }
  | { settings: true };

export type CookieRow = {
  name: string;
  provider: string;
  purpose: string;
  lifetime: string;
};

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type PrivacyContent = {
  title: string;
  updated: string;
  lead: string;
  /** Shown on translations only: the Polish text is binding. */
  translationNote?: string;
  contentsTitle: string;
  cookieHeaders: {
    name: string;
    provider: string;
    purpose: string;
    lifetime: string;
  };
  contactLabels: { email: string; phone: string; address: string };
  settingsButton: string;
  sections: LegalSection[];
};
