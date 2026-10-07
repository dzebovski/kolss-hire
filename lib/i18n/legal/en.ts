import { VACANCY } from "../../vacancy";
import type { PrivacyContent } from "./types";

const { email } = VACANCY.contact;

const privacy: PrivacyContent = {
  title: "Privacy policy",
  updated: "Effective from 7 October 2026",
  lead: "This page explains how KOLSS Polska Sp. z o.o. processes the data of people who apply through this site, and how we use cookies.",
  translationNote:
    "This is a translation of the Polish version. If the versions differ, the Polish version prevails.",
  contentsTitle: "Contents",
  cookieHeaders: {
    name: "Name",
    provider: "Provider",
    purpose: "Purpose",
    lifetime: "Duration",
  },
  contactLabels: { email: "Email", phone: "Phone", address: "Address" },
  settingsButton: "Change cookie settings",
  sections: [
    {
      id: "administrator",
      title: "Data controller",
      blocks: [
        `The controller of your personal data is ${VACANCY.employer}, ${VACANCY.address}, Poland, entered in the Polish National Court Register (KRS) under no. 0001207180, NIP 536-199-62-94, REGON 543320017.`,
        "Contact us with any questions about your personal data. We have not appointed a data protection officer.",
        { contact: true },
      ],
    },
    {
      id: "dane",
      title: "What data we collect",
      blocks: [
        "From the application form:",
        {
          list: [
            "your name;",
            "phone number and email address;",
            "your CV — a file or a link — and any data you include in it;",
            "your comment, if you add one.",
          ],
        },
        "Automatically when you submit the form: the language version of the page, how you reached us (UTM campaign parameters and whether you clicked a Meta ad), your IP address and browser data — to the extent needed to run and protect the form.",
        "Providing your name, phone, email and CV is voluntary, but we cannot consider your application without them. Please do not include a photo or special category data, such as health or religion, in your CV — we do not need them. We do not ask about your current or previous pay.",
      ],
    },
    {
      id: "cele",
      title: "Purposes and legal bases",
      blocks: [
        {
          list: [
            "Recruitment for the showroom sales consultant role — Art. 6(1)(b) GDPR (steps taken at your request before entering into a contract) in conjunction with Art. 22¹ of the Polish Labour Code.",
            "Data you provide on your own initiative, e.g. in your CV or comment — your consent, Art. 6(1)(a) GDPR in conjunction with Art. 22¹a of the Labour Code. By submitting an application containing such data, you consent to its processing in this recruitment.",
            "Protecting the form against spam and abuse, and identifying where an application came from — our legitimate interest, Art. 6(1)(f) GDPR.",
            "Measuring the performance of our Meta ads — only with your consent, Art. 6(1)(a) GDPR and Art. 399 of the Polish Electronic Communications Law.",
          ],
        },
        "You can withdraw your consent at any time. This does not affect the lawfulness of processing before withdrawal.",
      ],
    },
    {
      id: "odbiorcy",
      title: "Who receives your data",
      blocks: [
        "Applications are seen only by authorised KOLSS staff running the recruitment. We also use providers that process data on our behalf:",
        {
          list: [
            "Vercel Inc. (USA) — website hosting, form handling and bot protection;",
            "Slack Technologies, LLC (USA, Salesforce group) — the messaging tool where the recruitment team receives applications and CV files;",
            "Meta Platforms Ireland Ltd (Ireland) — only if you accept marketing cookies, see “Meta Pixel and Conversions API”.",
          ],
        },
        "We do not sell data or share CVs with other companies.",
      ],
    },
    {
      id: "transfer",
      title: "Transfers outside the EEA",
      blocks: [
        `Vercel, Slack and Meta may process data in the USA. This relies on the European Commission adequacy decision of 10 July 2023 (EU-US Data Privacy Framework) or, where it does not apply, on standard contractual clauses approved by the Commission. Write to ${email} for information about these safeguards.`,
      ],
    },
    {
      id: "meta",
      title: "Meta Pixel and Conversions API",
      blocks: [
        "If you accept marketing cookies, the site loads Meta Pixel. It records page views, starting the application form and submitting an application. After you submit, our server also sends Meta a notice of the application (Conversions API). This tells us which ads work and keeps one application from being counted twice.",
        "Meta then receives an event ID, the _fbp and _fbc cookies, your IP address, browser data, and your email address and phone number as SHA-256 hashes. Meta does not receive your name, CV or comment.",
        "We are joint controllers with Meta Platforms Ireland Ltd for collecting and transmitting this data (facebook.com/legal/controller_addendum). Meta then processes it as a separate controller under its own privacy policy (facebook.com/privacy/policy).",
        "Without your consent, the Pixel does not load and our server sends nothing to Meta.",
      ],
    },
    {
      id: "okres",
      title: "How long we keep data",
      blocks: [
        {
          list: [
            "Application data — until the recruitment for this role ends. We then delete the application and CV.",
            "If we sign a contract with you, the data needed for working together is kept under a separate notice you will receive when signing.",
            "If you ask us to delete your data or withdraw consent, we delete the relevant data without delay.",
            "Your cookie choice — 6 months. Other cookies — see the table under “Cookies”.",
            "Vercel keeps technical logs for a short period needed for security. Form contents are not written to them.",
          ],
        },
      ],
    },
    {
      id: "prawa",
      title: "Your rights",
      blocks: [
        "You have the right to:",
        {
          list: [
            "access your data and receive a copy;",
            "have your data corrected;",
            "have your data deleted;",
            "restrict processing;",
            "data portability for data processed on the basis of consent or a contract;",
            "object to processing based on our legitimate interest;",
            "withdraw consent at any time.",
          ],
        },
        `To exercise your rights, write to ${email}. We will reply within one month.`,
        "You can also lodge a complaint with the President of the Polish Personal Data Protection Office (Prezes UODO), ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl).",
        "We do not make recruitment decisions automatically or profile candidates. Decisions are always made by people.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        "The site stores in your browser only what it needs to work. Marketing cookies are stored only with your consent.",
        {
          cookies: [
            {
              name: "kh_consent",
              provider: "KOLSS",
              purpose: "Essential — remembers your cookie choice",
              lifetime: "6 months",
            },
            {
              name: "Vercel technical cookies",
              provider: "Vercel",
              purpose:
                "Essential — protection against bots and attacks; set only during a security check",
              lifetime: "Session or a few hours",
            },
            {
              name: "_fbp",
              provider: "Meta",
              purpose: "Marketing — recognises the browser to measure ads",
              lifetime: "90 days",
            },
            {
              name: "_fbc",
              provider: "Meta",
              purpose: "Marketing — remembers a Meta ad click",
              lifetime: "90 days",
            },
            {
              name: "kh_fbclid, kh_eid, kh_eid_sent, kh_start_application",
              provider: "KOLSS",
              purpose:
                "Marketing — browser session storage; lets us count events without duplicates",
              lifetime: "Until the tab is closed",
            },
          ],
        },
        "You can change your consent at any time. You can also delete cookies in your browser settings.",
        { settings: true },
      ],
    },
    {
      id: "zmiany",
      title: "Changes to this policy",
      blocks: [
        "If we change how we process data, we will update this page and the date at the top.",
      ],
    },
  ],
};

export default privacy;
