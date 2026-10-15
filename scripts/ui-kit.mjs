// Geschilderde UI-onderdelen in de stijl van het logo (Nano Banana Pro, logo als stijlvoorbeeld).
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/ui-kit.mjs [alleen-deze-naam]
import { execFile } from "node:child_process";
import { mkdirSync } from "node:fs";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const UIT = "print/ui";
mkdirSync(UIT, { recursive: true });

const STIJL = "Match the exact art style, materials and colours of the reference logo: weathered dark bronze and blackened iron with beige carved stone highlights, thin glowing blood-red trim, gothic dark-fantasy tabletop RPG look, painterly, highly detailed, dramatic lighting.";
const LOS = "Single object, centred, front orthographic view, fully visible with margin around it, isolated on a plain flat pure black background, no text, no letters, no logo, no scenery, no shadow on the ground.";

const STUKKEN = {
  ampul: ["9:16", `A tall slender alchemist's glass vial for a game interface: a long straight cylindrical tube of clear glass, completely EMPTY inside, the glass interior perfectly dark and see-through. Ornate cap on top and a heavy ornate base below, both forged from bronze and blackened iron with gothic filigree and small red gemstones; two thin ornate iron bands around the tube. ${STIJL} ${LOS}`],
  "medaillon-vlam": ["1:1", `A round heraldic medallion for a game interface: thick ornate bronze and blackened iron rim with gothic filigree and a thin glowing red inner ring; in the dark centre a raised carved beige stone emblem of an open watchful eye wreathed in flames. ${STIJL} ${LOS}`],
  "medaillon-hoorn": ["1:1", `A round heraldic medallion for a game interface: thick ornate bronze and blackened iron rim with gothic filigree and a thin glowing red inner ring; in the dark centre a raised carved beige stone emblem of a cornucopia horn of plenty overflowing with fruit and grain. ${STIJL} ${LOS}`],
  "medaillon-schild": ["1:1", `A round heraldic medallion for a game interface: thick ornate bronze and blackened iron rim with gothic filigree and a thin glowing red inner ring; in the dark centre a raised carved beige stone emblem of a kite shield with two clasped hands in brotherhood. ${STIJL} ${LOS}`],
  "medaillon-hart": ["1:1", `A round heraldic medallion for a game interface: thick ornate bronze and blackened iron rim with gothic filigree and a thin glowing red inner ring; in the dark centre a raised carved beige stone emblem of a proud stag head with large antlers. ${STIJL} ${LOS}`],
  naambord: ["21:9", `A wide blank nameplate banner for a game interface, like the plaque of the reference logo: a dark iron plate with an ornate bronze frame, pointed gothic end caps, small red gemstones at both ends, a thin glowing red inner border, the centre left EMPTY and dark for text. ${STIJL} ${LOS}`],
};

const kies = process.argv[2];
const run = ([naam, [ratio, prompt]]) => new Promise((ok) =>
  execFile("node", [RUN, "google/nano-banana-pro", JSON.stringify({ prompt, image_input: ["@print/beeld/logo-slide.png"], aspect_ratio: ratio, resolution: "2K", output_format: "png" }), `${UIT}/${naam}`],
    { env: process.env, maxBuffer: 1 << 24 }, (e, o) => { console.log(naam, e ? "FOUT " + e.message.split("\n")[0] : o.trim().split("\n").pop()); ok(); }));
const lijst = Object.entries(STUKKEN).filter(([n]) => !kies || n === kies);
for (let i = 0; i < lijst.length; i += 3) {
  await Promise.all(lijst.slice(i, i + 3).map(run));
  if (i + 3 < lijst.length) await new Promise((r) => setTimeout(r, 25000));
}
