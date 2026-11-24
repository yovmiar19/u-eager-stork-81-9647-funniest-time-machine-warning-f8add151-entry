// Funniest Time Machine Warning Label — make.fun entry.
//
// The program writes exactly one warning label for a time machine to
// /output/entry.txt. The sealed scorer only accepts UTF-8 text of
// 1 to 120 characters, so the label is validated here before writing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FILE = join("/output", "entry.txt");
const MAX_CHARS = 120;

// The label, in the voice of a genuine safety notice: a traveller
// meeting their own past self, told not to apologise — because the
// past self already knows exactly what it did.
function buildLabel(): string {
  const opening = "WARNING: If you run into your past self,";
  const punchline = "do not apologize. He knows what he did.";
  return `${opening} ${punchline}`;
}

function main(): void {
  const label = buildLabel();

  if (label.length < 1 || label.length > MAX_CHARS) {
    throw new Error(`label must be 1-${MAX_CHARS} characters, got ${label.length}`);
  }
  if (label.trim().length === 0) {
    throw new Error("label must not be only whitespace");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_FILE, label, "utf8");
  console.log(`Wrote ${label.length} characters to ${OUTPUT_FILE}`);
}

main();
