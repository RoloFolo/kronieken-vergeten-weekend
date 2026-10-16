// Het decor van de Wachterstocht: de poort van Château de Bouillon bij nacht, met fakkels (Nano Banana Pro).
// De tv gebruikt docs/a/tocht-poort.webp vanzelf zodra het bestand bestaat; zonder blijft de camera op het kasteel.
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/tocht-beeld.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const FFMPEG = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
mkdirSync("print/tocht", { recursive: true });
const prompt = "The entrance of the medieval Château de Bouillon in the Belgian Ardennes at night, painted in the dark-fantasy style of the reference: a massive weathered stone gatehouse carved into the rocky ridge, a heavy wooden drawbridge and an arched gate with an iron portcullis half raised, a narrow stone passage leading into vaulted tunnels beyond. Burning torches in iron sconces on both sides of the gate and deep inside the passage cast warm orange flickering light on the rough stone; thin mist on the ground, embers drifting, a blood-red stormy sky with red lightning glimpsed above the battlements. Eye-level view standing on the bridge, looking straight into the gate, the torches roughly at one quarter and three quarters of the width. Cinematic, atmospheric, highly detailed, no people, no text.";
execFileSync("node", [RUN, "google/nano-banana-pro", JSON.stringify({ prompt, image_input: ["@print/beeld/logo-slide.png"], aspect_ratio: "16:9", resolution: "2K", output_format: "png" }), "print/tocht/poort"], { stdio: "inherit", env: process.env });
const bron = readdirSync("print/tocht").filter((f) => f.startsWith("poort-")).sort().pop();
execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-i", `print/tocht/${bron}`, "-vf", "scale=1920:-1", "-c:v", "libwebp", "-quality", "84", "docs/a/tocht-poort.webp"]);
console.log("docs/a/tocht-poort.webp klaar");
