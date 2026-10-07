export type CvKind = "pdf" | "doc" | "docx";

const SIGNATURES: Record<CvKind, (bytes: Uint8Array) => boolean> = {
  pdf: (bytes) =>
    bytes.length >= 5 &&
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d,
  doc: (bytes) =>
    bytes.length >= 8 &&
    bytes
      .slice(0, 8)
      .every(
        (byte, index) =>
          byte === [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1][index],
      ),
  docx: (bytes) =>
    bytes.length >= 4 &&
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    bytes[2] === 0x03 &&
    bytes[3] === 0x04,
};

export function cvKindFromName(filename: string): CvKind | null {
  const extension = filename.toLowerCase().split(".").pop();
  return extension === "pdf" || extension === "doc" || extension === "docx"
    ? extension
    : null;
}

export function hasValidCvSignature(kind: CvKind, bytes: Uint8Array): boolean {
  return SIGNATURES[kind](bytes);
}

export function isValidCv(
  filename: string,
  bytes: Uint8Array,
  size: number,
): boolean {
  const kind = cvKindFromName(filename);
  return Boolean(
    kind &&
    size > 0 &&
    size <= 4_000_000 &&
    bytes.byteLength === size &&
    hasValidCvSignature(kind, bytes),
  );
}

export function safeFilename(filename: string): string {
  const sanitized = filename
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .replace(/\.{2,}/g, ".")
    .slice(0, 120);
  return sanitized || "cv";
}
