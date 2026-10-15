// Muziek voor de speelschermen via Lyria 2 (Replicate), met Gloryfield's replicate-run.mjs.
// Drie takes per stuk; kiezen op het oor.
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/muziek.mjs
import { execFile } from "node:child_process";
import { mkdirSync } from "node:fs";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const UIT = "audio/muziek";
mkdirSync(UIT, { recursive: true });

const HAL = "Dark atmospheric 1980s analog synthesizer score for a retro supernatural mystery series, slow hypnotic arpeggio on a warm analog synth, deep pulsing bass, wide pads, blended with medieval elements: a soft frame drum like a heartbeat, a low wordless male drone, a distant bowed hurdy-gurdy, mysterious and ominous yet cozy, steady tempo, instrumental, seamless loop";
const SCHADUW = "Intense dark synthwave horror theme: a menacing pulsing low synth bass ostinato, rising tension, pounding medieval war drums, distorted brass stabs, eerie detuned synth lead, ominous wordless choir swells, building to a frightening climax, instrumental";
const NEG = "vocals, singing, lyrics, speech, pop, happy, cheerful";

// Ronde 2 (2026-10-16): het Schaduw-event krijgt een eigen, nog duisterder stuk.
const ONTWAKEN = "Pitch-black supernatural horror score for the moment an ancient demon awakens: deep sub-bass drones, a slow tolling iron bell, dissonant low cello clusters, a distorted analog synth pulse like a slow heartbeat, reversed whispers and a low wordless male choir, metallic scrapes, creeping dread and menace, sparse and heavy, no melody, no brightness, instrumental";
const NEG2 = "vocals, singing, lyrics, speech, melody, major key, happy, epic heroic, drums solo, pop";

const jobs = [];
const ronde = process.argv[2] ?? "1";
if (ronde === "1") for (const seed of [101, 202, 303]) {
  jobs.push(["google/lyria-2", { prompt: HAL, negative_prompt: NEG, seed }, `${UIT}/hal-${seed}`]);
  jobs.push(["google/lyria-2", { prompt: SCHADUW, negative_prompt: NEG, seed }, `${UIT}/schaduw-${seed}`]);
}
if (ronde === "2") for (const seed of [404, 505, 606]) jobs.push(["google/lyria-2", { prompt: ONTWAKEN, negative_prompt: NEG2, seed }, `${UIT}/ontwaken-${seed}`]);
const run = ([model, input, naam]) => new Promise((ok) =>
  execFile("node", [RUN, model, JSON.stringify(input), naam], { env: process.env, maxBuffer: 1 << 24 }, (e, o) => {
    console.log(naam, e ? "FOUT " + e.message.split("\n")[0] : o.trim().split("\n").pop()); ok();
  }));
// Account staat op 6 aanvragen per minuut: drie tegelijk, dan even wachten.
for (let i = 0; i < jobs.length; i += 3) {
  await Promise.all(jobs.slice(i, i + 3).map(run));
  await new Promise((r) => setTimeout(r, 30000));
}
