// Losse stemregels: de overwinning (Schaduwkoning en Godfried) en de fluisteringen van de Chaos Lord.
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/losse-stemmen.mjs
import { writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const SCHADUW = "You are an ancient demon king beneath a castle in the Ardennes, speaking Dutch. Very slow, very low, cold and amused, drawn-out vowels, long silences, a sinister near-whisper.";
const VERSLAGEN = "You are an ancient demon king, speaking Dutch, being defeated and dragged back into his prison: furious disbelief that breaks into a fading, echoing scream, then a last bitter whisper.";
const GODFRIED = "You are Godfrey of Bouillon, a noble medieval lord, speaking Dutch to a hall of friends. Warm, solemn and proud. Steady, moderately brisk pace with short pauses only where they matter, deeply moved at the end.";
const REGELS = [
  ["einde-schaduw", "Enceladus", VERSLAGEN, "Nee… Nee! Dit kan niet… Vier Zegels… één broederschap… Ik… ik zal… [whispering] ooit… kom ik terug."],
  ["einde-godfried", "Charon", GODFRIED, "Het is volbracht. De Zegels zijn vernieuwd, en de Schaduwkoning slaapt weer onder mijn kasteel. Niet door één held… maar door een broederschap die voor elkaar zorgde. Wachters van Bouillon, ik ben trots op jullie. Open nu de envelop op de schoorsteen."],
  // De Eerste Dronk (na de proloog) en de uitleg van de Hall.
  ["dronk-intro", "Charon", GODFRIED, "Eén ding nog, Wachters. Een broederschap begint met een dronk. Schenk de glazen vol… sta op… en spreek mij na."],
  ["dronk-1", "Charon", GODFRIED, "Bij het vuur… dat nooit dooft."],
  ["dronk-2", "Charon", GODFRIED, "Bij de hoorn… die nooit leeg raakt."],
  ["dronk-3", "Charon", GODFRIED, "Bij het schild… van onze broederschap."],
  ["dronk-4", "Charon", GODFRIED, "En bij het hart… van de Ardennen."],
  ["dronk-5", "Charon", GODFRIED, "Wij waken! Proost!"],
  ["uitleg-1", "Charon", GODFRIED, "Zie de vier Zegels. Hoe voller hun ampul, hoe steviger zij de Schaduwkoning gevangen houden. Jullie eerste dronk heeft ze al gevoed."],
  ["uitleg-2", "Charon", GODFRIED, "Elke opdracht die jullie volbrengen, voedt een Zegel. Pak een questkaart, doe wat erop staat, en meld het aan de hoeders van de Hall. Alleen, met twee, of met de hele groep."],
  ["uitleg-3", "Charon", GODFRIED, "Maar wees gewaarschuwd. Wanneer de Schaduw beweegt, legt hij jullie een beproeving op. Doorsta haar… of zie de Zegels leeglopen."],
  ["uitleg-4", "Charon", GODFRIED, "En weet dit: de Schaduw heeft ogen onder jullie. Vertrouw elkaar… maar niet blindelings."],
  ["uitleg-5", "Charon", GODFRIED, "De Guild Hall is geopend. Moge het licht jullie bijstaan, Wachters."],
  ["chaos-1", "Enceladus", SCHADUW, "[whispering] Ik ben dichterbij… dan jullie denken."],
  ["chaos-2", "Enceladus", SCHADUW, "Hehehe… Een van jullie… werkt voor mij."],
  ["chaos-3", "Enceladus", SCHADUW, "[whispering] Jullie Zegels… lekken."],
  ["chaos-4", "Enceladus", SCHADUW, "Ik hoorde dat. Ik hoor… alles."],
  ["chaos-5", "Enceladus", SCHADUW, "[whispering] Kijk achter je."],
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
for (const [naam, stem, regie, tekst] of REGELS) {
  const mp3 = `docs/a/${naam}.mp3`; if (existsSync(mp3)) continue;
  for (let p = 1; p <= 4; p++) {
    await new Promise((ok) => setTimeout(ok, 11000));
    try { writeFileSync("docs/a/_tmp.wav", await tts(tekst, stem, regie)); execFileSync(FF, ["-hide_banner", "-loglevel", "error", "-y", "-i", "docs/a/_tmp.wav", "-b:a", "112k", mp3]); console.log("✓", naam); break; }
    catch (e) { console.log("✗", naam, p, String(e.message).slice(0, 80)); }
  }
}
execFileSync("rm", ["-f", "docs/a/_tmp.wav"]);
