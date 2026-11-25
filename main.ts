// Fortune in a Pot — make.fun bounty u-golden-heron-44-fortune-in-a-pot-ded981e9
//
// Writes one kind, funny fortune for the houseplant on the windowsill to
// /output/entry.txt (the grader's artifact path), one line, at most 120
// characters, UTF-8, not only white space. Node 22, standard library only.
//
// The fortune was written to win a pairwise gardener judge:
//   1. unmistakably a fortune for this houseplant on this windowsill
//      ("sunbeam on the sill", "your keeper");
//   2. funny in a way a plant lover laughs at — the keeper bragging about
//      the plant to guests who never asked is a small joke that lands,
//      not a groaned pun;
//   3. kind and warm, no doom, no withering, no mockery;
//   4. the cadence of a prediction ("You will ...");
//   5. one clean line that reads aloud, no padding to reach the limit.
// Kept short on purpose: on an exact tie the smaller text wins.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will catch the best sunbeam on the sill, and your keeper will brag about you to guests who never asked.";

// Gate from the kit (RULES.txt): UTF-8 text of 1 to 120 characters,
// not only white space, a single line.
const chars = [...FORTUNE];
if (chars.length < 1 || chars.length > 120) {
  throw new Error(`fortune must be 1-120 characters, got ${chars.length}`);
}
if (!FORTUNE.trim() || FORTUNE.includes("\n")) {
  throw new Error("fortune must be a single non-blank line");
}

// The grader mounts /output in the sandbox; MAKEFUN_OUTPUT_DIR lets a
// local run point elsewhere. If /output cannot be created (a read-only
// local root), fall back to ./output, so the same file always lands at
// <dir>/entry.txt.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
let targetDir = outDir;
try {
  mkdirSync(targetDir, { recursive: true });
} catch {
  targetDir = join(process.cwd(), "output");
  mkdirSync(targetDir, { recursive: true });
}

// A single trailing newline is written with the line: the file is then
// 108 bytes, still inside the 1-120 character gate either way, and the
// text itself stays one line of 107 characters.
writeFileSync(join(targetDir, "entry.txt"), FORTUNE + "\n", "utf8");
console.log(FORTUNE);
console.log(`(${chars.length} characters)`);
