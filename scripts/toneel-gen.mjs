// Nieuwe toneelstukken: kasteel en wegwijzer als losse objecten (Nano Banana Pro, origineel als voorbeeld)
// en de stormlucht als naadloze videolus (Seedance 1 Pro: begin- en eindbeeld gelijk; Kling 2.1 is stopgezet).
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/toneel-gen.mjs [kasteel|bord|storm]
import { execFile } from "node:child_process";

const RUN = "C:/Users/rolan/Naberius Games/Gloryfield/tools/replicate-run.mjs";
const L = "print/lagen";
const GROEN = "Isolated on a plain flat pure bright green (#00FF00) background, nothing else in the image: no sky, no clouds, no lightning, no fog, no other scenery.";

const JOBS = {
  kasteel: ["google/nano-banana-pro", {
    prompt: `Recreate the castle from the reference painting as a standalone game asset: the same dark gothic medieval fortress of Bouillon with the same towers, pointed spires, walls and small warm-lit orange windows, standing on its tall dark craggy rock. Same painterly dark fantasy style, same colours and lighting with a red rim light from the stormy sky behind. The whole rock is visible with a clean solid silhouette (no holes), its base widening and ending in a few dark pine tree tops. ${GROEN}`,
    image_input: [`@${L}/ref-kasteel.png`], aspect_ratio: "4:3", resolution: "2K", output_format: "png" }, `${L}/kasteel-nieuw`],
  bord: ["google/nano-banana-pro", {
    prompt: `Recreate the wooden road sign from the reference painting as a standalone game asset: the same weathered dark wooden board with pointed ends on one thick wooden post, the same carved heraldic lion crest on a small shield above the text. The carved text must read exactly "BOUILLON" (two L's, then O, then N) on the first line and "ARDENNE" on the second line, in carved serif capitals with a faint warm ember glow. The full post is visible down to the ground, ending in a little dark grass and stones. Same painterly dark fantasy style and lighting. ${GROEN}`,
    image_input: [`@${L}/ref-bord.png`], aspect_ratio: "9:16", resolution: "2K", output_format: "png" }, `${L}/bord-nieuw`],
  storm: ["bytedance/seedance-1-pro", {
    duration: 10, resolution: "1080p", aspect_ratio: "16:9", fps: 24, camera_fixed: true,
    image: `@${L}/plaat-16x9.jpg`, last_frame_image: `@${L}/plaat-16x9.jpg`,
    prompt: "Static camera, completely still, no camera movement, no zoom, no pan. The landscape, hills, forest, village and bridge stay exactly in place. Only the atmosphere moves: the blood-red storm clouds slowly churn and roll across the sky, red lightning flickers and crawls inside the clouds, thin mist drifts slowly through the valley and between the dark pine forests, the warm lights of the village and the torches on the bridge flicker softly, the river glimmers. Seamless loop." }, `${L}/storm`],
  // Ronde 2 (2026-10-16): kasteel zit in het beeld zelf, zodat de rots niet meer los over de video zweeft.
  scene: ["bytedance/seedance-1-pro", {
    duration: 10, resolution: "1080p", aspect_ratio: "16:9", fps: 24, camera_fixed: true,
    image: `@${L}/scene-16x9.jpg`, last_frame_image: `@${L}/scene-16x9.jpg`,
    prompt: "Static camera, completely still, no camera movement, no zoom, no pan. The castle on its rock, the hills, forest, village and bridge stay exactly in place and keep their exact shape. Only the atmosphere moves: the blood-red storm clouds slowly churn and roll across the sky behind the castle, red lightning flickers and crawls inside the clouds, thin mist drifts slowly through the valley and between the dark pine forests, the warm lights in the castle windows, the village and on the bridge flicker softly, the river glimmers. Seamless loop." }, `${L}/scene`],
};

const kies = process.argv.slice(2);
const lijst = Object.entries(JOBS).filter(([n]) => !kies.length || kies.includes(n));
await Promise.all(lijst.map(([naam, [model, input, uit]]) => new Promise((ok) =>
  execFile("node", [RUN, model, JSON.stringify(input), uit], { env: process.env, maxBuffer: 1 << 24 },
    (e, o) => { console.log(naam, e ? "FOUT " + (e.message.split("\n")[0] + o).slice(0, 400) : o.trim().split("\n").pop()); ok(); }))));
