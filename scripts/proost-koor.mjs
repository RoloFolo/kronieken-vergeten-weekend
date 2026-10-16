// Het gejuich na Godfrieds "PROOST!": een hal vol mannenstemmen die terugbrullen (Gemini TTS, acht stemmen),
// door elkaar gemixt met een beetje galm.  node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/proost-koor.mjs
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const MAP = "audio/koor"; mkdirSync(MAP, { recursive: true });
const BRUL = "A group of Dutch friends in a cosy medieval hall, glasses raised high. You are one of them: shout this loudly and joyfully, a big hearty roar of celebration, slightly tipsy and laughing, short and explosive.";
const STEMMEN = [
  ["Fenrir", "PROOST!"], ["Orus", "Proooost!"], ["Algenib", "PROOST! Hahaha!"], ["Alnilam", "Proost, Wachters!"],
  ["Iapetus", "Hoera! PROOST!"], ["Rasalgethi", "Op de Wachters!"], ["Schedar", "PROOST!"], ["Umbriel", "Ja! Proost! Hahaha!"],
];

async function tts(text, voice, prompt) {
  const kop = { Authorization: `Bearer ${SLEUTEL}`, "Content-Type": "application/json", Prefer: "wait" };
  const r = await fetch("https://api.replicate.com/v1/models/google/gemini-3.1-flash-tts/predictions", { method: "POST", headers: kop,
    body: JSON.stringify({ input: { text, prompt, voice, language_code: "nl-NL" } }) });
  let s = await r.json(); if (!r.ok) throw new Error(`${r.status}`);
  for (let i = 0; i < 120 && s.status !== "succeeded" && s.status !== "failed"; i++) {
    await new Promise((ok) => setTimeout(ok, 2000)); const p = await fetch(s.urls.get, { headers: { Authorization: `Bearer ${SLEUTEL}` } }); if (p.ok) s = await p.json();
  }
  if (s.status !== "succeeded") throw new Error(s.error ?? s.status);
  return Buffer.from(await (await fetch(typeof s.output === "string" ? s.output : s.output[0])).arrayBuffer());
}
for (const [stem, tekst] of STEMMEN) {
  const wav = `${MAP}/${stem}.wav`; if (existsSync(wav)) continue;
  for (let p = 1; p <= 4; p++) {
    await new Promise((ok) => setTimeout(ok, 12000));
    try { writeFileSync(wav, await tts(tekst, stem, BRUL)); console.log("✓", stem); break; } catch (e) { console.log("✗", stem, p, String(e.message).slice(0, 80)); }
  }
}
// mix: everyone roars almost together, a few stragglers, panned across the hall, then a warm hall echo
const klaar = STEMMEN.filter(([s]) => existsSync(`${MAP}/${s}.wav`));
const VERTRAGING = [0, 90, 160, 240, 330, 420, 600, 850], PAN = [-.6, .5, -.2, .7, -.75, .25, -.4, .6];
const ins = klaar.flatMap(([s]) => ["-i", `${MAP}/${s}.wav`]);
const ketens = klaar.map((_, i) => `[${i}:a]silenceremove=start_periods=1:start_threshold=-45dB,aresample=44100,aformat=channel_layouts=stereo,` +
  `pan=stereo|c0=${(1 - PAN[i]) / 2 + .25}*c0|c1=${(1 + PAN[i]) / 2 + .25}*c1,adelay=${VERTRAGING[i]}|${VERTRAGING[i]},volume=${i < 4 ? 1 : .8}[s${i}]`);
const mix = `${ketens.join(";")};${klaar.map((_, i) => `[s${i}]`).join("")}amix=inputs=${klaar.length}:normalize=0,aecho=0.8:0.6:45|90:0.25|0.15,highpass=f=90,alimiter=limit=0.9,afade=t=out:st=2.6:d=1.2[uit]`;
execFileSync(FF, ["-hide_banner", "-loglevel", "error", "-y", ...ins, "-filter_complex", mix, "-map", "[uit]", "-t", "3.8", "-b:a", "128k", "docs/a/gejuich.mp3"]);
console.log("docs/a/gejuich.mp3 met", klaar.length, "stemmen");
