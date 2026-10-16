// Een geschilderd medaillon per rol, in de stijl van de Zegel-medaillons (Nano Banana Pro, logo als stijlvoorbeeld),
// daarna herkleurd naar oud brons met kopergroen en een ijsblauwe gloed (zodat rollen en Zegels niet verward worden),
// en met een zuiver rond masker uitgesneden als webp naar docs/a/rollen/.
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/rol-emblemen.mjs [alleen-deze-rol]
import { execFile } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const FFMPEG = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const UIT = "print/rollen";
mkdirSync(UIT, { recursive: true }); mkdirSync("docs/a/rollen", { recursive: true });

const STIJL = "Match the exact art style, materials and colours of the reference logo: weathered dark bronze and blackened iron with beige carved stone highlights, thin glowing blood-red trim, gothic dark-fantasy tabletop RPG look, painterly, highly detailed, dramatic lighting.";
const LOS = "Single object, centred, front orthographic view, fully visible with margin around it, isolated on a plain flat pure black background, no text, no letters, no logo, no scenery, no shadow on the ground.";
const MED = (embleem) => `A round heraldic medallion for a game interface: thick ornate bronze and blackened iron rim with gothic filigree and a thin glowing red inner ring; in the dark centre a raised carved beige stone emblem of ${embleem}. ${STIJL} ${LOS}`;

const ROLLEN = {
  firekeeper: "a hooded watchman's lantern with a tall living flame inside",
  quartermaster: "a heavy iron-banded supply chest with a large old key crossed over it",
  feastlord: "a roasted boar's head on a platter with a carving knife and fork crossed behind it",
  shieldbearer: "a sturdy round shield with a castle tower and a builder's compass engraved on it",
  warlord: "two crossed swords over a large twenty-sided die",
  bard: "a lute crossed with a raised drinking tankard",
  diplomat: "two hands clasped over a rolled scroll with a wax seal",
  shadow: "a hooded faceless figure holding a dagger close, half hidden in shadow",
  ranger: "a longbow and arrow over a compass rose with pine trees",
  alchemist: "a bubbling round-bottomed potion flask with rising swirling vapours",
  priester: "a rising sun over a steaming cup, with a small priestly halo of rays",
};

const run = (args, uit) => new Promise((ok) => execFile("node", [RUN, ...args, uit], { env: process.env, maxBuffer: 1 << 24 },
  (e, o) => { console.log(uit, e ? "FOUT " + e.message.split("\n")[0].slice(0, 120) : "ok"); ok(!e); }));
const sh = (cmd, args) => new Promise((ok) => execFile(cmd, args, (e) => ok(!e)));
const bestand = (prefix) => readdirSync(UIT).map((f) => `${UIT}/${f}`).find((f) => f.startsWith(prefix + "-") || f.startsWith(prefix + "."));

const BLAUW = "Recolour this medallion, keep the design, the emblem and the composition exactly the same: the rim becomes old bronze with green verdigris patina and dark blued steel, the thin glowing inner ring becomes a cold glowing ice-blue instead of red, the dark centre becomes deep midnight blue-black, the carved emblem stays beige stone with a faint blue rim light. Keep the plain flat pure black background around it, no shadow, no text.";
// the medallion is round: find it on the black background (cropdetect), crop it square and cut a clean circle
function rondUit(bron, doel) {
  return new Promise((ok) => execFile(FFMPEG, ["-hide_banner", "-loop", "1", "-i", bron, "-vf", "cropdetect=limit=0.02:round=2:reset=0:skip=0", "-frames:v", "4", "-f", "null", "-"], (e, o, err) => {
    const m = [...String(err).matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)].pop(); if (!m) return ok(false);
    const [w, hgt, x0, y0] = m.slice(1).map(Number), z = Math.round((w + hgt) / 2), x = Math.max(0, Math.round(x0 + w / 2 - z / 2)), y = Math.max(0, Math.round(y0 + hgt / 2 - z / 2));
    execFile(FFMPEG, ["-y", "-loglevel", "error", "-i", bron, "-vf",
      `crop=${z}:${z}:${x}:${y},scale=480:480,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip((237-hypot(X-239.5,Y-239.5))/1.5,0,1)'`,
      "-c:v", "libwebp", "-quality", "86", doel], (e2) => ok(!e2));
  }));
}
async function maak(id) {
  for (let poging = 0; poging < 3 && !bestand(`${UIT}/${id}`); poging++)
    await run(["google/nano-banana-pro", JSON.stringify({ prompt: MED(ROLLEN[id]), image_input: ["@print/ui/medaillon-vlam-0.png", "@print/beeld/logo-slide.png"], aspect_ratio: "1:1", resolution: "1K", output_format: "png" })], `${UIT}/${id}`);
  const bron = bestand(`${UIT}/${id}`); if (!bron) return;
  for (let poging = 0; poging < 3 && !bestand(`${UIT}/blauw-${id}`); poging++)
    await run(["google/nano-banana-pro", JSON.stringify({ prompt: BLAUW, image_input: ["@" + bron], aspect_ratio: "1:1", resolution: "1K", output_format: "png" })], `${UIT}/blauw-${id}`);
  const blauw = bestand(`${UIT}/blauw-${id}`); if (!blauw) return;
  console.log(id, await rondUit(blauw, `docs/a/rollen/${id}.webp`) ? "uitgesneden" : "FOUT bij uitsnijden");
}

const kies = process.argv[2];
const lijst = Object.keys(ROLLEN).filter((n) => !kies || n === kies);
for (let i = 0; i < lijst.length; i += 3) { // account: 6 requests a minute
  await Promise.all(lijst.slice(i, i + 3).map(maak));
  if (i + 3 < lijst.length) await new Promise((r) => setTimeout(r, 30000));
}
