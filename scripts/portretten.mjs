// Portretten voor de oorkondes: elke Wachter in het kostuum en decor van zijn rol, in de stijl van het spel.
//   1. Zet per Wachter één foto in print/fotos/<Naam>.jpg (scherp, gezicht recht van voren, schouders erop, goed licht).
//   2. node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/portretten.mjs [Naam ...]
//   → twee varianten per Wachter in print/portretten/<naam>-a.png en -b.png; de eerste wordt <naam>.jpg.
//     Bevalt b beter: kopieer die over <naam>.jpg. Daarna: node scripts/oorkondes.mjs
// De foto's gaan via Replicate naar Google (nano-banana-pro). Vraag de Wachters even of dat goed is.
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const STIJL = "print/oorkonde/stijl-zaal.png"; // the Round Table hall painting: palette and brushwork

// per role: costume and setting
const ROL = {
  firekeeper: "The Firekeeper, guardian of the hearth: dark leather jerkin with a bronze clasp, a heavy wool cloak with a fur collar, holding a burning torch; in the stone hall of an Ardennes castle at night beside a great hearth fire, embers floating",
  quartermaster: "The Quartermaster, master of supplies: a travelling coat full of pouches, a big ring of iron keys at his belt, a ledger and quill in hand; in a vaulted castle storeroom stacked with barrels, crates and sacks, lit by a hanging lantern",
  feastlord: "The Feastlord, lord of the banquet: a rich crimson doublet with an apron over it, sleeves rolled up, a carving knife and a roasted joint; at a long banquet table loaded with food, steam and candlelight in a great hall",
  shieldbearer: "The Shieldbearer, shield-bearer and master builder: chainmail and a surcoat, a large round shield with a bronze boss on his arm and a builder's hammer at his belt; on the castle ramparts beside wooden scaffolding, torches burning",
  warlord: "The Warlord of Games, commander of the tournament: ornate dark armour with a red cape, holding a large carved twenty-sided die like a scepter; behind a war table with a map, game pieces and dice, banners on the walls",
  bard: "The Bard of the Hearth: a feathered cap, a colourful slashed doublet, a lute in his hands, mid-song with a grin; in a lively tavern hall with raised tankards and firelight behind him",
  diplomat: "The Diplomat, envoy of the brotherhood: long dark robes with a crimson sash, a signet ring and a sealed scroll; at a council table between two hanging banners, calm candlelight",
  shadow: "The Shadow Operative: a dark hooded cloak, half his face in shadow, a dagger at his hip, a knowing half smile; in a narrow castle corridor at night with a red moon through an arrow slit, mist on the floor",
  ranger: "The Ranger of the Ardennes: a green-brown hooded cloak, a longbow and quiver, leather bracers; in the misty Ardennes forest at dawn above the river Semois, the castle on its rock in the distance",
  alchemist: "The Brew Alchemist: a leather apron, brass goggles pushed up on his forehead, holding up a glowing red potion; in a cellar laboratory with copper kettles, bubbling flasks and red smoke",
  priester: "The High Priest of Hangover: flowing priestly robes with a bronze holy symbol, solemnly holding a steaming mug of coffee and a glass of water like sacred relics; in a small castle chapel with morning light through stained glass and candles",
};

const window = {};
for (const f of ["docs/a/wachters.js", "docs/a/rollen.js"]) new Function("window", readFileSync(f, "utf8"))(window);
const wie = process.argv.slice(2);
mkdirSync("print/portretten", { recursive: true });
for (const w of window.WACHTERS) {
  if (wie.length && !wie.includes(w.naam)) continue;
  const foto = ["jpg", "jpeg", "png"].map((e) => `print/fotos/${w.naam}.${e}`).find(existsSync);
  const rol = window.ROL_VAN[w.naam];
  if (!foto) { console.log("–", w.naam, "(geen foto in print/fotos)"); continue; }
  const prompt = `Painted half-body portrait in portrait orientation of the man in the first image. Keep his face exactly recognisable: same face shape, eyes, nose, hair, beard and age. He is dressed as ${ROL[rol]}. Painted in exactly the style, lighting and palette of the second image: dark fantasy, Stranger Things meets medieval Ardennes, red, bronze and iron, warm firelight and a deep red glow. Confident, looking at the viewer. No text.`;
  const uit = `print/portretten/${w.naam.toLowerCase()}`;
  for (const v of ["a", "b"]) {
    for (let p = 1; p <= 3; p++) {
      try { execFileSync("node", [RUN, "google/nano-banana-pro", JSON.stringify({ prompt, image_input: [`@${foto}`, `@${STIJL}`], aspect_ratio: "3:4", resolution: "2K", output_format: "png" }), `${uit}-${v}`], { stdio: "ignore" });
        execFileSync("mv", [`${uit}-${v}-0.png`, `${uit}-${v}.png`]); break; }
      catch (e) { console.log("✗", w.naam, v, p); }
    }
  }
  if (existsSync(`${uit}-a.png`)) { execFileSync(FF, ["-y", "-loglevel", "error", "-i", `${uit}-a.png`, "-vf", "scale=900:-1", "-q:v", "3", `${uit}.jpg`]); console.log("✓", w.naam); }
}
