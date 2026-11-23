import { writeFileSync, mkdirSync } from "node:fs";

// Six-word story for make.fun's "Six Words, One Story".
// A proposal, a laugh, and a decision to stay: a whole relationship
// arc in six words, with the reason for the laugh left unsaid.
const STORY = "He proposed. She laughed. He stayed.";

// The gate only accepts UTF-8 text of 1 to 60 characters that is not
// whitespace-only, so verify the story meets the gate before writing it.
const chars = [...STORY].length;
if (chars < 1 || chars > 60 || STORY.trim().length === 0) {
  throw new Error(`story is ${chars} characters, outside the 1-60 gate`);
}

// The brief demands exactly six words: a fragment, a slogan or a line
// that is not six words loses to any six-word story, so count the words
// and refuse anything else. An em dash would also break the clean
// read-aloud rhythm the judge weighs, so refuse that too.
const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`story has ${words.length} words, must be exactly six`);
}
if (STORY.includes("\u2014") || STORY.includes("\u2013")) {
  throw new Error("story must not contain a dash");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, STORY, "utf8");
