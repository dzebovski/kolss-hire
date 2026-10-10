import { COMPANY } from "../../../company";
import { salaryLabel, vacancyById } from "../../../vacancies";
import type { VacancyContent } from "../types";

const salary = salaryLabel(
  vacancyById("sales-consultant-legionowo").salary,
  "en",
);

const en: VacancyContent = {
  metadata: {
    title: "Furniture Sales Consultant — KOLSS Legionowo",
    description: `Work at the KOLSS showroom in Legionowo: client calls, showroom meetings and leading sales to a signed contract. ${salary} gross + bonuses.`,
  },
  hero: {
    eyebrow: `Job opening · ${COMPANY.shortLocation}`,
    title: "Furniture Sales Consultant",
    role: "Doradca / Doradczyni klienta w salonie meblowym",
    lead: "Help clients choose a kitchen or home furniture. Our designers handle the design; you lead the client and the sale.",
    payLabel: "Pay",
    payUnit: " gross / month + bonuses",
    hoursLabel: "Hours",
    hours: `Full-time, ${COMPANY.workingDays} days, ${COMPANY.weeklyHours} hours a week`,
    locationLabel: "Location",
    location: `KOLSS showroom, ${COMPANY.shortAddress}`,
    cta: "Send your CV",
    terms: "See the terms",
  },
  duties: {
    title: "Responsibilities",
    items: [
      "Advising clients in the showroom and by phone on kitchens and made-to-measure furniture.",
      "Handling inbound enquiries and identifying client needs.",
      "Presenting KOLSS products, materials and solutions.",
      "Managing the sales process from first contact to signed contract.",
      "Working with our designers and supporting clients through every stage of the order.",
      "Maintaining the client database and contact history in the CRM.",
    ],
    note: "Technical design is not part of the role — our designers take care of it.",
  },
  requirements: {
    title: "Requirements",
    items: [
      "Experience in sales or client service.",
      "Strong communication, negotiation and presentation skills.",
      "Results orientation and ownership of commitments.",
      "Good organisation and the ability to handle several clients at once independently.",
      "Confident use of a computer, email and CRM systems.",
    ],
    languageTitle: "Language",
    language: "Fluent Polish",
    languageNote: "English is a plus",
    advantageTitle: "Nice to have",
    advantage:
      "Experience in furniture, kitchens or interiors. Design software skills are not required.",
  },
  terms: {
    title: "Terms",
    payUnit: "PLN gross / month",
    subtitle: "fixed base salary + performance bonuses",
    rows: [
      {
        label: "Contract",
        value: `employment contract, contract of mandate or ${COMPANY.contractNames.b2b} — by agreement`,
      },
      { label: "Pay structure", value: "fixed base + performance bonuses" },
      { label: "Pay schedule", value: "monthly" },
      {
        label: "Hours",
        value: `full-time, ${COMPANY.weeklyHours} hours a week`,
      },
      {
        label: "Working days",
        value:
          "Monday to Friday; Saturdays by rota, with a weekday off in return",
      },
      { label: "Working hours", value: `flexible schedule, ${COMPANY.hours}` },
      {
        label: "Work mode",
        value:
          "on site in the showroom; after training, one remote day a week is possible by agreement",
      },
    ],
    note: "Bonuses depend on results and are not guaranteed. Gross amounts are before employee contributions and tax.",
    offerTitle: "What we offer",
    offers: [
      "Stable employment with a company that runs its own furniture production.",
      "A transparent bonus system based on results.",
      "Product, sales and CRM training.",
      "Support from an experienced team of designers.",
      "Room to grow — including design training if you are interested.",
    ],
  },
  form: {
    title: "Let’s meet. Send your CV.",
    lead: "Leave your contact details and add your CV as a file or a link.",
    steps: ["Interview with HR", "Meeting with the KOLSS owners"],
    commentPlaceholder: "A few sentences about your client-facing experience",
  },
};

export default en;
