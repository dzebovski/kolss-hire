import { describe, expect, it } from "vitest";
import {
  cvKindFromName,
  hasValidCvSignature,
  isValidCv,
  safeFilename,
} from "./file";
import { buildFbc, normalizeEmail, normalizePhone, sha256 } from "./meta-capi";
import { applicationSchema, type ApplicationFields } from "./schema";
import { buildSlackApplication } from "./slack";

const validFields: ApplicationFields = {
  name: "Anna Kowalska",
  phone: "+48 600 000 000",
  email: "anna@example.com",
  cvUrl: "",
  comment: "",
  rodoConsent: "yes",
  vacancy: "sales-consultant-legionowo",
  lang: "pl",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  fbclid: "",
  website: "",
  renderedAt: "1791374400000",
  consent: "denied",
  fbp: "",
  fbc: "",
};

describe("application schema", () => {
  it("requires contact details and a file or link, while allowing both CV methods", () => {
    expect(
      applicationSchema.safeParse({ ...validFields, cvUrl: "" }).success,
    ).toBe(false);
    expect(
      applicationSchema.safeParse({
        ...validFields,
        name: "A",
        cvUrl: "https://example.com/cv.pdf",
      }).success,
    ).toBe(false);
    expect(
      applicationSchema.safeParse({
        ...validFields,
        cvUrl: "https://example.com/cv.pdf",
      }).success,
    ).toBe(true);
    expect(
      applicationSchema.safeParse({
        ...validFields,
        cvFile: new File(["%PDF-"], "cv.pdf"),
        cvUrl: "",
      }).success,
    ).toBe(true);
  });

  it("requires the RODO consent checkbox", () => {
    const withLink = { ...validFields, cvUrl: "https://example.com/cv.pdf" };
    expect(applicationSchema.safeParse(withLink).success).toBe(true);
    for (const rodoConsent of ["", "no", undefined])
      expect(
        applicationSchema.safeParse({ ...withLink, rodoConsent }).success,
      ).toBe(false);
    expect(buildSlackApplication(withLink)).toContain("*RODO consent:* yes");
  });

  it("rejects invalid contacts and enforces the agreed 4 MB CV boundary", () => {
    const linked = { ...validFields, cvUrl: "https://example.com/cv" };
    expect(
      applicationSchema.safeParse({ ...linked, phone: "12345678" }).success,
    ).toBe(false);
    expect(
      applicationSchema.safeParse({ ...linked, email: "invalid" }).success,
    ).toBe(false);
    expect(applicationSchema.safeParse({ ...linked, name: "" }).success).toBe(
      false,
    );
    expect(
      applicationSchema.safeParse({
        ...linked,
        cvFile: new File([new Uint8Array(4_000_000)], "cv.pdf"),
      }).success,
    ).toBe(true);
    expect(
      applicationSchema.safeParse({
        ...linked,
        cvFile: new File([new Uint8Array(4_000_001)], "cv.pdf"),
      }).success,
    ).toBe(false);
  });

  it("enforces the comment and URL limits", () => {
    expect(
      applicationSchema.safeParse({
        ...validFields,
        cvUrl: "http://example.com/cv",
        comment: "a".repeat(1000),
      }).success,
    ).toBe(true);
    expect(
      applicationSchema.safeParse({
        ...validFields,
        cvUrl: "ftp://example.com/cv",
      }).success,
    ).toBe(false);
    expect(
      applicationSchema.safeParse({
        ...validFields,
        cvUrl: "https://example.com/cv",
        comment: "a".repeat(1001),
      }).success,
    ).toBe(false);
  });
});

describe("CV file validation", () => {
  it("checks extension and file signature", () => {
    expect(cvKindFromName("CV.PDF")).toBe("pdf");
    expect(
      hasValidCvSignature(
        "pdf",
        new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]),
      ),
    ).toBe(true);
    expect(
      hasValidCvSignature(
        "doc",
        new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
      ),
    ).toBe(true);
    expect(
      hasValidCvSignature("docx", new Uint8Array([0x50, 0x4b, 0x03, 0x04])),
    ).toBe(true);
    expect(
      isValidCv("cv.pdf", new Uint8Array([0x50, 0x4b, 0x03, 0x04]), 4),
    ).toBe(false);
    expect(safeFilename("résumé final.pdf")).toBe("r_sum__final.pdf");
  });
});

describe("tracking and Slack formatting", () => {
  it("normalizes and hashes contact details and builds fbc", () => {
    expect(normalizeEmail(" Anna@Example.COM ")).toBe("anna@example.com");
    expect(normalizePhone("600 000 000")).toBe("48600000000");
    expect(sha256("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(buildFbc("click-id", 123)).toBe("fb.1.123.click-id");
    expect(buildFbc("", 123)).toBeUndefined();
  });

  it("escapes candidate fields in Slack mrkdwn", () => {
    const text = buildSlackApplication({
      ...validFields,
      name: "A <B & C>",
      comment: "<script>",
    });
    expect(text).toContain("A &lt;B &amp; C&gt;");
    expect(text).toContain("&lt;script&gt;");
    expect(text).toContain("<mailto:anna%40example.com|");
  });
});
