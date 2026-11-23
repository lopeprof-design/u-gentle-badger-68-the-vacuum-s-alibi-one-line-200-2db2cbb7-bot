// The Vacuum's Alibi — a program that writes one line to /output/entry.txt.
//
// The line is the whole entry: the excuse a robot vacuum gives for missing
// a spot, judged on deadpan machine voice, a real laugh, surprise, and a
// punch at the end. This program keeps the text fixed and deliberate —
// the joke is written once, by hand, and the program's job is only to
// deliver it exactly, inside the 200-character gate, every run.
//
// Why this line: a vacuum's pride lives in its sensors, so the excuse
// leans on them. Lidar is the machine bragging about what it sees; the
// "load-bearing wall" is the surprise turn (dust reclassified as
// architecture); "not licensed for demolition" is the deadpan punch —
// the machine hiding behind paperwork instead of admitting it skipped
// the corner. Short, one sentence, no setup wasted.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The alibi, one line, 89 characters — well inside the 200-character gate.
const ALIBI =
  "My lidar mapped that dust as a load-bearing wall, and I am not licensed for demolition.";

function main(): void {
  const text = ALIBI.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text + "\n", { encoding: "utf8", mode: 0o644 });
  chmodSync(OUTPUT_FILE, 0o644);
  // Read it back: the judge reads exactly these bytes, so the program
  // refuses to exit happy unless the file holds the alibi verbatim.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== text + "\n") {
    throw new Error("entry.txt does not hold the alibi verbatim");
  }
  console.log(`wrote ${text.length} characters to ${OUTPUT_FILE}`);
}

main();
