// Proloog: Godfried leest zijn brief voor. Per alinea een TTS-fragment
// (kleinere aanvragen, en een E005 kost dan maar één alinea), daarna aan
// elkaar geplakt met een korte stilte ertussen.
//
// Gebruik:
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/proloog.mjs audio/proloog
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const MODEL = "google/gemini-3.1-flash-tts";
const STEM = "Charon";

// Gekozen regie (ronde 2, "vlotter").
const REGIE = `You are Godfrey of Bouillon, a noble medieval lord and crusader, speaking Dutch. You are an old storyteller by the fire, addressing a hall full of friends. Warm, solemn and dignified. Steady, moderately brisk pace with short pauses only where they matter, a sense of gravity with a spark of hope at the end. No news-reader cadence.`;

// Uitspraakvriendelijke versie van de brief: jaartallen voluit.
export const ALINEAS = [
  // "Aan de Wachters van Bouillon." werd 5x op rij als gevoelig geweigerd (E005).
  `Wachters van Bouillon… luister goed.`,
  `Het is het jaar tien zesennegentig. Morgen vertrek ik naar het Heilige Land, en mijn kasteel laat ik achter. Maar niet zonder een geheim.`,
  `Diep onder de rotsen van Bouillon heb ik iets opgesloten dat nooit had mogen ontwaken. Een kracht die ouder is dan de bergen. Wij noemden hem… de Schaduwkoning.`,
  `Vier Zegels houden hem gevangen. De Vlam van Waakzaamheid. De Hoorn van Overvloed. Het Schild van Broederschap. En het Hart van de Ardennen.`,
  `Zolang het vuur brandt, de tafel gevuld is en de broeders bij elkaar blijven, houden de Zegels stand. Maar elke keer dat het vuur dooft… elke keer dat de groep uiteenvalt… voelt hij het. En wordt hij sterker.`,
  `Negenhonderddertig jaar lang heeft hij geslapen. Tot vanavond. Jullie zijn gekomen, dicht bij mijn kasteel. En de oude magie is wakker geworden.`,
  `Daarom draag ik deze taak aan jullie over. Niet aan één ridder, want geen ridder kan dit alleen. Alleen een broederschap die voor elkaar zorgt, kan de Zegels vernieuwen.`,
  `Ieder van jullie krijgt een rol. Ieder van jullie draagt een kracht. Gebruik ze. Zorg voor elkaar. En houd het vuur brandende.`,
  `Wat er verder van jullie gevraagd wordt, zal zich vanzelf openbaren. Let op de tekenen. En wanneer de Schaduw beweegt… wees dan gereed.`,
  `Moge het licht jullie bijstaan, Wachters. Godfried van Bouillon.`,
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
  const uit = stand.output;
  const url = typeof uit === "string" ? uit : (uit?.[0] ?? uit?.audio);
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

// Zoekt het data-blok in een WAV en geeft formaat + PCM terug.
function leesWav(buf) {
  let p = 12, fmt, data;
  while (p < buf.length) {
    const id = buf.toString("ascii", p, p + 4), len = buf.readUInt32LE(p + 4);
    if (id === "fmt ") fmt = { kanalen: buf.readUInt16LE(p + 10), rate: buf.readUInt32LE(p + 12), bits: buf.readUInt16LE(p + 22) };
    if (id === "data") data = buf.subarray(p + 8, p + 8 + len);
    p += 8 + len + (len % 2);
  }
  return { ...fmt, data };
}

function schrijfWav(fmt, pcm) {
  const h = Buffer.alloc(44), blok = fmt.kanalen * fmt.bits / 8;
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(fmt.kanalen, 22);
  h.writeUInt32LE(fmt.rate, 24); h.writeUInt32LE(fmt.rate * blok, 28); h.writeUInt16LE(blok, 32); h.writeUInt16LE(fmt.bits, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

async function main() {
  const map = resolve(process.argv[2] ?? "audio/proloog");
  mkdirSync(map, { recursive: true });

  for (const [i, tekst] of ALINEAS.entries()) {
    const bestand = resolve(map, `deel-${String(i + 1).padStart(2, "0")}.wav`);
    if (existsSync(bestand)) continue; // al gemaakt in een eerdere run
    // Replicate knijpt dit account af tot 6 aanvragen per minuut: rustig aan.
    for (let poging = 1; poging <= 5; poging++) {
      await new Promise((res) => setTimeout(res, 11000));
      try {
        writeFileSync(bestand, await replicate({ text: tekst, prompt: REGIE, voice: STEM, language_code: "nl-NL" }));
        console.log(`✓ deel ${i + 1}`);
        break;
      } catch (e) {
        console.log(`✗ deel ${i + 1} poging ${poging}: ${e.message.slice(0, 120)}`);
        if (e.message.startsWith("429")) await new Promise((res) => setTimeout(res, 20000));
      }
    }
  }

  const delen = ALINEAS.map((_, i) => resolve(map, `deel-${String(i + 1).padStart(2, "0")}.wav`));
  const ontbreekt = delen.filter((d) => !existsSync(d));
  if (ontbreekt.length) throw new Error(`ontbreekt nog: ${ontbreekt.length} delen, draai opnieuw`);

  const wavs = delen.map((d) => leesWav(readFileSync(d)));
  const fmt = wavs[0];
  const stilte = (s) => Buffer.alloc(Math.round(fmt.rate * s) * fmt.kanalen * fmt.bits / 8);
  const pcm = Buffer.concat(wavs.flatMap((w, i) => [w.data, stilte(i === 0 ? 1.0 : 0.7)]));
  writeFileSync(resolve(map, "proloog-stem.wav"), schrijfWav(fmt, pcm));
  console.log(`proloog-stem.wav ${(pcm.length / (fmt.rate * fmt.kanalen * fmt.bits / 8)).toFixed(1)} s, ${fmt.rate} Hz`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
