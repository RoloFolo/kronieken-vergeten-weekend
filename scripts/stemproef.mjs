// Stemproef voor De Kronieken van het Vergeten Weekend: vier kandidaten voor
// Godfried en vier voor de Schaduwkoning, zelfde tekst, zelfde regie.
// Model en aanroep zoals in Verno (google/gemini-3.1-flash-tts via Replicate).
//
// Gebruik:
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/stemproef.mjs audio/stemproef
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const MODEL = "google/gemini-3.1-flash-tts";

const GODFRIED_TEKST = `Het is het jaar tien zesennegentig. Morgen vertrek ik naar het Heilige Land.

Maar voordat ik ga… moet ik jullie een geheim toevertrouwen. Diep onder dit kasteel slaapt een kracht die ouder is dan de bergen zelf.

Geen ridder kan haar alleen bedwingen. Alleen een broederschap die voor elkaar zorgt… kan de Zegels vernieuwen.`;

const GODFRIED_REGIE = `You are Godfrey of Bouillon, a noble medieval lord and crusader, speaking Dutch. You are an old storyteller by the fire, addressing a hall full of friends. Warm, solemn and dignified. Steady, moderately brisk pace with short pauses only where they matter, a sense of gravity with a spark of hope at the end. No news-reader cadence.`;

const SCHADUW_TEKST = `Wachters van Bouillon…

Jullie vuur dooft. Jullie voorraad slinkt. En ik… ik word sterker.

[whispering] De Schaduw beweegt.

Tot het dessert zegt niemand nog ja… of nee. Wie faalt… voedt mij.`;

const SCHADUW_REGIE = `You are an ancient demon king, imprisoned for centuries beneath a castle in the Ardennes, speaking Dutch. Low, cold and amused. Speak at a brisk, fluent pace, noticeably faster than a typical villain: no drawn-out vowels and only very short pauses between sentences, a sinister near-whisper that rises in menace on the last line.`;

const PROEVEN = [
  // Ronde 2: gekozen stemmen, iets vlotter tempo.
  { naam: "schaduwkoning-Enceladus-v3", stem: "Enceladus", text: SCHADUW_TEKST, prompt: SCHADUW_REGIE },
];

async function replicate(invoer) {
  const kop = { Authorization: `Bearer ${SLEUTEL}`, "Content-Type": "application/json", Prefer: "wait" };
  const r = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
    method: "POST", headers: kop, body: JSON.stringify({ input: invoer }),
  });
  let stand = await r.json();
  if (!r.ok) throw new Error(`${r.status}: ${JSON.stringify(stand).slice(0, 250)}`);
  for (let i = 0; i < 120 && stand.status !== "succeeded" && stand.status !== "failed"; i++) {
    await new Promise((res) => setTimeout(res, 2000));
    const p = await fetch(stand.urls.get, { headers: { Authorization: `Bearer ${SLEUTEL}` } });
    if (p.ok) stand = await p.json();
  }
  if (stand.status !== "succeeded") throw new Error(stand.error ?? `eindigde als ${stand.status}`);
  return stand.output;
}

async function main() {
  if (!SLEUTEL) throw new Error("REPLICATE_API_TOKEN ontbreekt");
  const map = resolve(process.argv[2] ?? "audio/stemproef");
  mkdirSync(map, { recursive: true });

  for (const proef of PROEVEN) {
    try {
      const uit = await replicate({ text: proef.text, prompt: proef.prompt, voice: proef.stem, language_code: "nl-NL" });
      const url = typeof uit === "string" ? uit : (uit?.[0] ?? uit?.audio);
      const audio = Buffer.from(await (await fetch(url)).arrayBuffer());
      const isWav = audio.subarray(0, 4).toString("ascii") === "RIFF";
      const bestand = resolve(map, `${proef.naam}.${isWav ? "wav" : "mp3"}`);
      writeFileSync(bestand, audio);
      console.log(`✓ ${proef.naam.padEnd(28)} ${String(Math.round(audio.length / 1024)).padStart(5)} kB`);
    } catch (e) {
      console.log(`✗ ${proef.naam.padEnd(28)} ${e.message}`);
    }
  }
}

main();
