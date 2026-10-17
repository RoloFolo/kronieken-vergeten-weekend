// Builds print/geluid/sounds.json for the soundboard page from the moments and the candidates found.
//   node scripts/geluid-kandidaten.mjs && node scripts/soundboard.mjs, then publish print/geluid/index.html
import fs from "node:fs";
import { MOMENTEN } from "./geluid-kandidaten.mjs";
const kand = JSON.parse(fs.readFileSync("print/geluid/kandidaten.json", "utf8"));
const groep = (id, name, pre) => ({ id, name, moments: MOMENTEN.filter(([m]) => m.startsWith(pre)).map(([id, name, feel, nu]) => ({ id, name, feel, nu, cands: kand.filter((c) => c.moment === id).map(({ moment, ...c }) => c) })).map((m) => ({ ...m, round: Math.max(0, ...m.cands.map((c) => c.round ?? 0)) || undefined })) });
const data = { groups: [groep("kist", "De Reliekenkist", "kist-"), groep("finale", "De finale en het einde", "fin-")] };
fs.writeFileSync("print/geluid/sounds.json", JSON.stringify(data, null, 1));
console.log(data.groups.map((g) => `${g.name}: ${g.moments.length} momenten, ${g.moments.reduce((n, m) => n + m.cands.length, 0)} geluiden`).join("\n"));
