import { COMPANY } from "../../../company";
import { salaryLabel, vacancyById } from "../../../vacancies";
import type { VacancyContent } from "../types";

const salary = salaryLabel(
  vacancyById("kitchen-designer-legionowo").salary,
  "en",
);

const en: VacancyContent = {
  metadata: {
    title: "Kitchen Furniture Designer & Sales Specialist — KOLSS Legionowo",
    description: `Design kitchens and made-to-measure furniture and guide clients from concept to production at KOLSS in Legionowo. ${salary} gross / month.`,
  },
  hero: {
    eyebrow: `Job opening · ${COMPANY.shortLocation}`,
    title: "Kitchen Furniture Designer & Sales Specialist",
    role: "Sprzedawca / Sprzedawczyni mebli kuchennych – Projektant / Projektantka",
    lead: "Design kitchens and made-to-measure furniture. Guide clients from the first conversation through concept and visualisation to a design ready for production.",
    payLabel: "Pay",
    payUnit: " gross / month + bonuses",
    hoursLabel: "Hours",
    hours: "Full-time, two shifts",
    locationLabel: "Location",
    location: `KOLSS showroom, ${COMPANY.shortAddress}`,
    cta: "Send your CV",
    terms: "See the terms",
  },
  duties: {
    title: "Responsibilities",
    items: [
      "Designing modern, functional made-to-measure furniture, mainly kitchens.",
      "Guiding clients from understanding their needs through concept and visualisation to a design ready for production.",
      "Advising on materials, colours, fittings and functional solutions.",
      "Preparing visualisations, material specifications and technical documentation.",
      "Working with clients, our production team and external suppliers.",
      "Taking care of the look, functionality and quality of every design.",
      "Taking an active part in selling and delivering clients’ individual projects.",
    ],
    extraTitle: "What is the job like?",
    extra: [
      "The role combines design, advice and client contact.",
      "We don’t expect you to know all our solutions and processes from day one. We’ll introduce you to how our production works, the materials and fittings we use, and how we run projects.",
      "Your main job is to listen to the client, create a functional and attractive design for them and take it through to production. That gives you a real influence on the result — from the first concept to the finished piece.",
    ],
  },
  requirements: {
    title: "Requirements",
    items: [
      "At least 2 years of experience designing furniture or interiors.",
      "Confidence with clients and the ability to identify their needs.",
      "A sense of aesthetics, creativity and attention to detail.",
      "Basic knowledge of furniture technology, materials and fittings.",
      "The ability to organise your own work.",
      "Working knowledge of Pro100 and KRAY, enough to prepare designs on your own.",
      "A valid category B driving licence.",
    ],
    note: "A degree in design is not required — your skills, experience and portfolio matter most.",
    languageTitle: "Language",
    language: "Fluent Polish",
    languageNote: "English, Russian or Ukrainian is a plus",
    advantageTitle: "Nice to have",
    advantageItems: [
      "Knowledge of SketchUp, V-Ray, AutoCAD, ArchiCAD, 3ds Max or similar.",
      "Experience in furniture sales or working with private clients.",
    ],
    advantage:
      "Don’t know all of these programs? That’s fine. We’ll help you learn and build your skills in the tools we use.",
  },
  terms: {
    title: "Terms",
    payUnit: "PLN gross / month",
    subtitle: "employment contract or contract of mandate",
    rows: [
      {
        label: "Contract",
        value: `employment contract, contract of mandate or ${COMPANY.contractNames.b2b}`,
      },
      {
        label: "Pay structure",
        value: "fixed base + performance bonus + discretionary bonus",
      },
      { label: "Pay schedule", value: "monthly" },
      { label: "Hours", value: "full-time" },
      { label: "Shifts", value: "yes, two shifts" },
      { label: "Working days", value: "Monday to Friday and Saturday" },
      { label: "Working hours", value: `flexible schedule, ${COMPANY.hours}` },
      { label: "Work mode", value: "on site" },
      { label: "Clients", value: "businesses (B2B) and private clients (B2C)" },
      { label: "Start", value: "immediately" },
    ],
    note: "Pay depends on experience and skills. Bonuses are not guaranteed. Gross amounts are before employee contributions and tax.",
    offerTitle: "What we offer",
    offers: [
      `Pay of ${salary} gross, depending on experience and skills.`,
      "An additional bonus or commission scheme is possible — we’ll share the details at the interview.",
      "Stable employment with a company that has been on the market for over 25 years.",
      "Onboarding and support from an experienced team — we don’t leave new people alone with projects.",
      "Training, new software skills and room to build your expertise.",
      "Individual, interesting projects tailored to clients’ needs.",
      "A real influence on the look, functionality and quality of the furniture we make.",
      "A friendly atmosphere and an experienced team to work with.",
      "Room to grow professionally as the company grows.",
    ],
  },
  form: {
    title: "Let’s meet. Send your CV and portfolio.",
    lead: "Leave your contact details, add your CV as a file or a link and, if you have one, a link to your portfolio.",
    steps: ["Interview with HR", "Meeting with the KOLSS owners"],
    commentPlaceholder:
      "A few sentences about your furniture design experience",
    portfolioField: true,
  },
};

export default en;
