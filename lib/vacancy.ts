/** Shared vacancy facts used by every locale. Keep offer details in one place. */
export const VACANCY = {
  salary: {
    base: 5000,
    currency: "zł",
    get amount() {
      return new Intl.NumberFormat("en-GB")
        .format(this.base)
        .replace(/,/g, " ");
    },
    get en() {
      return `${new Intl.NumberFormat("en-GB").format(this.base)} PLN`;
    },
  },
  address: "ul. Zegrzyńska 6, 05-119 Legionowo",
  get shortAddress() {
    return this.address.replace("05-119 ", "");
  },
  shortLocation: "Legionowo",
  hours: "10:00–18:00",
  weeklyHours: 40,
  workingDays: 5,
  contractNames: {
    employment: "umowa o pracę",
    mandate: "umowa zlecenie",
    b2b: "B2B",
  },
  employer: "KOLSS Polska Sp. z o.o.",
  registry: "KRS 0001207180 · NIP 536-199-62-94 · REGON 543320017",
  cvMaxSizeMb: 4,
  commentMaxLength: 1000,
} as const;
