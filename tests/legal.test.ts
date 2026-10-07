import { describe, expect, it } from "vitest";
import pl from "../lib/i18n/legal/pl";
import uk from "../lib/i18n/legal/uk";
import en from "../lib/i18n/legal/en";
import plDictionary from "../lib/i18n/dictionaries/pl";
import ukDictionary from "../lib/i18n/dictionaries/uk";
import enDictionary from "../lib/i18n/dictionaries/en";
import { captureConsentedFbclid } from "../lib/consent";

const policies = [pl, uk, en];
const cookieRows = (policy: typeof pl) =>
  policy.sections.flatMap((section) =>
    section.blocks.flatMap((block) =>
      typeof block === "object" && "cookies" in block ? block.cookies : [],
    ),
  );

describe("approved legal content", () => {
  it("keeps the same ten section anchors and storage rows in all languages", () => {
    const ids = pl.sections.map((section) => section.id);
    expect(ids).toHaveLength(10);
    for (const policy of policies) {
      expect(policy.sections.map((section) => section.id)).toEqual(ids);
      expect(cookieRows(policy)).toHaveLength(cookieRows(pl).length);
      const names = cookieRows(policy)
        .map((row) => row.name)
        .join(", ");
      for (const key of [
        "kh_consent",
        "_fbp",
        "_fbc",
        "kh_fbclid",
        "kh_eid",
        "kh_eid_sent",
        "kh_start_application",
      ])
        expect(names).toContain(key);
    }
  });
  it("has no HR placeholders in dictionaries or legal content", () => {
    for (const content of [
      ...policies,
      plDictionary,
      ukDictionary,
      enDictionary,
    ])
      expect(JSON.stringify(content)).not.toContain("[HR:");
  });
});

describe("consented click capture", () => {
  it("does not write without explicit granted consent", () => {
    const writes: string[] = [];
    for (const cookie of [
      "",
      "kh_consent=denied",
      "other=granted",
      "not_kh_consent=granted",
      "kh_consent=grantedExtra",
    ])
      captureConsentedFbclid(cookie, "?fbclid=test-click", (key, value) =>
        writes.push(`${key}=${value}`),
      );
    expect(writes).toEqual([]);
  });
  it("captures the click only after consent and ignores missing clicks", () => {
    const writes: string[] = [];
    captureConsentedFbclid(
      "other=1; kh_consent=granted",
      "?fbclid=test-click",
      (key, value) => writes.push(`${key}=${value}`),
    );
    captureConsentedFbclid(
      "kh_consent=granted",
      "?utm_source=test",
      (key, value) => writes.push(`${key}=${value}`),
    );
    expect(writes).toEqual(["kh_fbclid=test-click"]);
  });
});
