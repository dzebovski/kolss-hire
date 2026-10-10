import { z } from "zod";
import { vacancyIds } from "../vacancies";

export const MAX_CV_BYTES = 4_000_000;

const optionalUrl = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(500)
    .url()
    .refine((value) => /^https?:\/\//i.test(value)),
]);

export const applicationSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(20)
      .regex(/^[\d\s+()\-]+$/)
      .refine((value) => (value.match(/\d/g) ?? []).length >= 9),
    email: z.string().trim().email().max(254),
    cvUrl: optionalUrl,
    portfolioUrl: optionalUrl.default(""),
    cvFile: z
      .custom<File>(
        (value) => typeof File !== "undefined" && value instanceof File,
      )
      .optional(),
    comment: z.string().max(1000),
    rodoConsent: z.literal("yes"),
    vacancy: z.enum(vacancyIds),
    lang: z.enum(["pl", "uk", "en"]),
    utm_source: z.string().max(200),
    utm_medium: z.string().max(200),
    utm_campaign: z.string().max(200),
    utm_content: z.string().max(200),
    utm_term: z.string().max(200),
    fbclid: z.string().max(1000),
    website: z.string().max(500),
    renderedAt: z.string().regex(/^\d{10,13}$/),
    consent: z.enum(["granted", "denied"]),
    fbp: z.string().max(500),
    fbc: z.string().max(1000),
  })
  .superRefine((fields, context) => {
    const file = fields.cvFile;
    if (fields.cvUrl.length === 0 && (!file || file.size === 0)) {
      context.addIssue({
        code: "custom",
        path: ["cvUrl"],
        message: "cvMissing",
      });
    }
    if (file && file.size > MAX_CV_BYTES) {
      context.addIssue({
        code: "custom",
        path: ["cvFile"],
        message: "fileSize",
      });
    }
    if (file && file.size > 0 && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      context.addIssue({
        code: "custom",
        path: ["cvFile"],
        message: "fileType",
      });
    }
  });

export type ApplicationFields = z.infer<typeof applicationSchema>;

export function validateApplicationFields(input: Record<string, unknown>) {
  return applicationSchema.safeParse(input);
}
