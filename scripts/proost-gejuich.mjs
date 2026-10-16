// Gejuich voor de Eerste Dronk: een zaal vol mannen die de kroezen heffen (Stable Audio Open, drie takes).
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/proost-gejuich.mjs
import { execFile } from "node:child_process";
import { mkdirSync } from "node:fs";
const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
mkdirSync("audio/gejuich", { recursive: true });
const prompt = "A large medieval stone great hall: a group of about ten men raise heavy wooden tankards together and give one loud, deep, hearty, unified cheer, like a tavern toast, 'huzzah!', followed by tankards clinking and warm laughter, natural hall reverb, close and powerful";
const negative = "music, singing, high pitched voices, women, children, screaming, applause, whistling, crowd stadium, yay";
const run = (seed) => new Promise((ok) => execFile("node", [RUN, "stackadoc/stable-audio-open-1.0",
  JSON.stringify({ prompt, negative_prompt: negative, seconds_total: 5, steps: 100, cfg_scale: 7, seed }), `audio/gejuich/huzzah-${seed}`],
  { env: process.env, maxBuffer: 1 << 24 }, (e, o) => { console.log(seed, e ? "FOUT " + e.message.split("\n")[0].slice(0, 100) : "ok"); ok(); }));
await Promise.all([11, 22, 33].map(run));
