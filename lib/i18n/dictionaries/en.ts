import { COMPANY } from "../../company";
import privacy from "../legal/en";
import type { Dictionary } from "../types";

const en = {
  header: { home: "KOLSS — jobs" },
  jobs: {
    metadata: {
      title: "Jobs — KOLSS Legionowo",
      description: "Open positions at KOLSS Polska in Legionowo: kitchen furniture sales and made-to-measure design.",
    },
    eyebrow: "Careers at KOLSS · Legionowo",
    title: "Open positions",
    lead: "We make kitchens and made-to-measure furniture. We’re looking for people who guide clients from the first conversation to a finished design.",
    listLabel: "Open positions",
    open: "View the job",
    nav: "Jobs",
  },
  about: {
    eyebrow: "KOLSS Polska",
    title: "About us",
    paragraphs: [
      "KOLSS POLSKA is a Legionowo-based company specialising in kitchen furniture production.",
      "For over 25 years we have combined experience and craftsmanship with modern European technology. Among other things, we make solid wood, veneered and MDF fronts, delivering projects for a wide range of needs and interior styles.",
      "We focus on precise workmanship, durability, aesthetics and a responsible approach to production.",
      "If you want to grow your skills, create individual projects and shape how they are delivered — join our team.",
    ],
  },
  form: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    file: "Add CV file",
    fileHint: `PDF, DOC or DOCX, up to ${COMPANY.cvMaxSizeMb} MB`,
    removeFile: "Remove file",
    or: "or",
    cvUrl: "Link to your CV",
    cvHint:
      "One option is enough. If you share a link, make sure the document can be viewed.",
    portfolio: "Portfolio link (optional)",
    comment: "Comment (optional)",
    submit: "Send application",
    sending: "Sending…",
    rodo: "KOLSS Polska Sp. z o.o. is the controller of your data. We process it only for this recruitment and delete it once the recruitment ends. You can withdraw consent at any time.",
    rodoConsent: "I consent to KOLSS Polska Sp. z o.o. processing the personal data in my application for the purpose of this recruitment.",
    rodoConsentShort: "Consent to data processing",
    privacyLink: "Full information on data processing",
    errors: {
      summary: "Please check these fields:",
      name: "Enter your name.",
      phone: "Check the phone number, e.g. +48 600 000 000.",
      email: "Check your email address.",
      cvMissing: "Add a CV file or paste a link.",
      rodoConsent: "Tick the consent box to submit your application.",
      fileType: "Upload a PDF, DOC or DOCX file.",
      fileSize: `The file is too large — ${COMPANY.cvMaxSizeMb} MB maximum.`,
      cvUrl: "Paste a full link starting with https://.",
      portfolioUrl: "Paste a full link starting with https://.",
      comment: `The comment can be up to ${COMPANY.commentMaxLength.toLocaleString("en-US")} characters.`,
      server:
        "We couldn’t send your application. Your details are still in the form — please try again.",
      rateLimit: "Too many attempts. Please try again in a few minutes.",
    },
  },
  thanks: {
    title: "Thank you! We’ve received your application.",
    text: "HR will contact you if your experience matches this role.",
    back: "Back to open positions",
  },
  cookies: {
    text: "We use essential cookies to make this site work. With your consent, we also use Meta Pixel to measure how our ads perform.",
    accept: "Accept",
    reject: "Reject",
    customize: "Settings",
    privacy: "Privacy policy",
    settings: "Cookie settings",
    settingsLead:
      "Choose which cookies you agree to. You can change your choice at any time in the page footer.",
    necessaryTitle: "Essential",
    necessaryText:
      "Remember your choice and protect the form from bots. They cannot be switched off.",
    alwaysOn: "Always on",
    marketingTitle: "Marketing",
    marketingText:
      "Meta Pixel and Conversions API — measuring how our job ads perform. Without consent, we send nothing to Meta.",
    save: "Save choice",
    acceptAll: "Accept all",
    close: "Close",
  },
  footer: {
    company: `${COMPANY.employer}, ${COMPANY.address} · ${COMPANY.registry}`,
    privacy: "Privacy policy",
    cookies: "Cookie settings",
    contact: "Contact",
  },
  privacy,
} satisfies Dictionary;

export default en;
