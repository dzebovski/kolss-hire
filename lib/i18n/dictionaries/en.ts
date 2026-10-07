import { VACANCY } from "../../vacancy";
import privacy from "../legal/en";
import type { Dictionary } from "../types";

const workAddress = `KOLSS showroom, ${VACANCY.shortAddress}`;

const en = {
  metadata: {
    title: "Furniture Sales Consultant — KOLSS Legionowo",
    description: `Work at the KOLSS showroom in Legionowo: client calls, showroom meetings and leading sales to a signed contract. ${VACANCY.salary.en} gross + bonuses.`,
  },
  hero: {
    eyebrow: `Job opening · ${VACANCY.shortLocation}`,
    title: "Furniture Sales Consultant",
    role: "Doradca / Doradczyni klienta w salonie meblowym",
    lead: "Help clients choose a kitchen or home furniture. Our designers handle the design; you lead the client and the sale.",
    payLabel: "Pay",
    pay: `${VACANCY.salary.en} gross / month + bonuses`,
    hoursLabel: "Hours",
    hours: `Full-time, ${VACANCY.workingDays} days, ${VACANCY.weeklyHours} hours a week`,
    locationLabel: "Location",
    location: workAddress,
    cta: "Send your CV",
    mobileCta: "Send your CV",
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
    pay: `${VACANCY.salary.en} gross / month`,
    subtitle: "fixed base salary + performance bonuses",
    rows: [
      {
        label: "Contract",
        value: `employment contract, contract of mandate or ${VACANCY.contractNames.b2b} — by agreement`,
      },
      { label: "Pay structure", value: "fixed base + performance bonuses" },
      { label: "Pay schedule", value: "monthly" },
      {
        label: "Hours",
        value: `full-time, ${VACANCY.weeklyHours} hours a week`,
      },
      {
        label: "Working days",
        value:
          "Monday to Friday; Saturdays by rota, with a weekday off in return",
      },
      { label: "Working hours", value: `flexible schedule, ${VACANCY.hours}` },
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
    name: "Name",
    phone: "Phone",
    email: "Email",
    file: "Add CV file",
    fileHint: `PDF, DOC or DOCX, up to ${VACANCY.cvMaxSizeMb} MB`,
    removeFile: "Remove file",
    or: "or",
    cvUrl: "Link to your CV",
    cvHint:
      "One option is enough. If you share a link, make sure the document can be viewed.",
    comment: "Comment (optional)",
    commentPlaceholder: "A few sentences about your client-facing experience",
    submit: "Send application",
    sending: "Sending…",
    rodo: "KOLSS Polska Sp. z o.o. is the controller of your data. We process it only for this recruitment and delete it once the recruitment ends. By submitting, you consent to the processing of data you provide voluntarily, e.g. in your CV — you can withdraw consent at any time.",
    privacyLink: "Full information on data processing",
    errors: {
      summary:
        "Fill in your name, phone and email, and add your CV as a file or a link.",
      name: "Enter your name.",
      phone: "Check the phone number, e.g. +48 600 000 000.",
      email: "Check your email address.",
      cvMissing: "Add a CV file or paste a link.",
      fileType: "Upload a PDF, DOC or DOCX file.",
      fileSize: `The file is too large — ${VACANCY.cvMaxSizeMb} MB maximum.`,
      cvUrl: "Paste a full link starting with https://.",
      comment: `The comment can be up to ${VACANCY.commentMaxLength.toLocaleString("en-US")} characters.`,
      server:
        "We couldn’t send your application. Your details are still in the form — please try again.",
      rateLimit: "Too many attempts. Please try again in a few minutes.",
    },
  },
  thanks: {
    title: "Thank you! We’ve received your application.",
    text: "HR will contact you if your experience matches this role.",
    back: "Back to the job offer",
  },
  cookies: {
    text: "We use essential cookies to make this site work. With your consent, we also use Meta Pixel to measure how our ads perform.",
    accept: "Accept",
    reject: "Reject",
    customize: "Settings",
    privacy: "Privacy policy",
    settings: "Cookie settings",
    settingsLead: "Choose which cookies you agree to. You can change your choice at any time in the page footer.",
    necessaryTitle: "Essential",
    necessaryText: "Remember your choice and protect the form from bots. They cannot be switched off.",
    alwaysOn: "Always on",
    marketingTitle: "Marketing",
    marketingText: "Meta Pixel and Conversions API — measuring how our job ads perform. Without consent, we send nothing to Meta.",
    save: "Save choice",
    acceptAll: "Accept all",
    close: "Close",
  },
  footer: {
    company: `${VACANCY.employer}, ${VACANCY.address} · ${VACANCY.registry}`,
    privacy: "Privacy policy",
    cookies: "Cookie settings",
    contact: "Contact",
  },
  privacy,
} satisfies Dictionary;

export default en;
