import { readFile, readdir } from "node:fs/promises";
const dirs = ["dictionaries/", "vacancies/"].map(
  (dir) => new URL(`../lib/i18n/${dir}`, import.meta.url),
);
let failed = false;
for (const dir of dirs) {
  for (const name of await readdir(dir, { recursive: true })) {
    if (!name.endsWith(".ts") || name.endsWith("types.ts")) continue;
    const source = await readFile(new URL(name, dir), "utf8");
    // Only string literals: array syntax is not an editorial placeholder.
    const strings = source.match(/(['"`])(?:\\.|(?!\1)[\s\S])*?\1/g) || [];
    if (strings.some((value) => value.includes("["))) {
      console.error(`Unresolved HR content: ${name}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
