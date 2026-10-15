// De vijf relieken uit de Reliekenkist, geschilderd in de stijl van het logo, op groen (wordt daarna uitgeknipt).
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/relieken.mjs
import { execFile } from "node:child_process";
import { mkdirSync } from "node:fs";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const UIT = "print/relieken";
mkdirSync(UIT, { recursive: true });
const STIJL = "Match the art style, materials and colours of the reference logo: weathered dark bronze and blackened iron, beige carved details, subtle glowing blood-red accents, gothic dark-fantasy tabletop RPG look, painterly, highly detailed, dramatic warm rim light. A single sacred relic object, centred, fully visible, isolated on a plain flat pure bright green (#00FF00) background, nothing else, no text.";
const RELIEKEN = {
  vlam: "An ancient iron and bronze lantern with gothic filigree, an eternal red-orange flame burning inside behind thick old glass.",
  hoorn: "An ornate medieval drinking horn with bronze rim and carved bands, a few drops of golden mead glinting at the mouth.",
  schild: "A ceremonial medieval longsword with a bronze crossguard shaped like clasped hands and a red gemstone in the pommel, shown upright.",
  hart: "A gnarled ancient tree root shaped like a stag's heart, bound with bronze wire and small carved runes, faint green-red glow in its cracks.",
  stilte: "A tall black wax candle on an iron candle holder, its wick unlit, wrapped in a thin red ribbon with a wax seal, an aura of silence.",
};
const run = ([naam, wat]) => new Promise((ok) => execFile("node", [RUN, "google/nano-banana-pro",
  JSON.stringify({ prompt: `${wat} ${STIJL}`, image_input: ["@print/beeld/logo-slide.png"], aspect_ratio: "1:1", resolution: "1K", output_format: "png" }), `${UIT}/${naam}`],
  { env: process.env, maxBuffer: 1 << 24 }, (e, o) => { console.log(naam, e ? "FOUT " + e.message.split("\n")[0].slice(0, 120) : "ok"); ok(); }));
const lijst = Object.entries(RELIEKEN);
for (let i = 0; i < lijst.length; i += 3) { await Promise.all(lijst.slice(i, i + 3).map(run)); if (i + 3 < lijst.length) await new Promise((r) => setTimeout(r, 25000)); }
