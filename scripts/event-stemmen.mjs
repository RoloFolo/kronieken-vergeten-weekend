// Spreekt elke Schaduw-event in met de stem van de Schaduwkoning (Enceladus, oorspronkelijke trage regie).
// Leest docs/a/events.js; slaat al bestaande opnames over.
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/event-stemmen.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import vm from "node:vm";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const MODEL = "google/gemini-3.1-flash-tts";
const UIT = "docs/a/events";
const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const REGIE = `You are an ancient demon king, imprisoned for centuries beneath a castle in the Ardennes, speaking Dutch. Very slow, very low, cold and amused, as if savouring every word. Drawn-out vowels, long silences between sentences, a sinister near-whisper that rises in menace on the last line.`;

const ctx = { window: {} }; vm.runInNewContext(readFileSync("docs/a/events.js", "utf8"), ctx);
const EVENTS = ctx.window.SCHADUW_EVENTS;
mkdirSync(UIT, { recursive: true });

async function tts(text) {
  const kop = { Authorization: `Bearer ${SLEUTEL}`, "Content-Type": "application/json", Prefer: "wait" };
  const r = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, { method: "POST", headers: kop,
    body: JSON.stringify({ input: { text, prompt: REGIE, voice: "Enceladus", language_code: "nl-NL" } }) });
  let s = await r.json();
  if (!r.ok) throw new Error(`${r.status}: ${JSON.stringify(s).slice(0, 160)}`);
  for (let i = 0; i < 120 && s.status !== "succeeded" && s.status !== "failed"; i++) {
    await new Promise((ok) => setTimeout(ok, 2000));
    const p = await fetch(s.urls.get, { headers: { Authorization: `Bearer ${SLEUTEL}` } }); if (p.ok) s = await p.json();
  }
  if (s.status !== "succeeded") throw new Error(s.error ?? s.status);
  const url = typeof s.output === "string" ? s.output : s.output?.[0];
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

for (const e of EVENTS) {
  const mp3 = `${UIT}/${e.id}.mp3`; if (existsSync(mp3)) continue;
  const tekst = `Wachters… [whispering] De Schaduw beweegt. ${e.stem}`;
  for (let poging = 1; poging <= 4; poging++) {
    await new Promise((ok) => setTimeout(ok, 11000)); // 6 aanvragen per minuut
    try {
      const wav = `${UIT}/${e.id}.wav`; writeFileSync(wav, await tts(tekst));
      execFileSync(FF, ["-hide_banner", "-loglevel", "error", "-y", "-i", wav, "-b:a", "96k", mp3]);
      execFileSync("rm", ["-f", wav]);
      console.log(`✓ ${e.id}`); break;
    } catch (err) { console.log(`✗ ${e.id} ${poging}: ${String(err.message).slice(0, 100)}`); if (String(err.message).startsWith("429")) await new Promise((ok) => setTimeout(ok, 20000)); }
  }
}
