// Candidates for the soundboard (like Gloryfield's): per moment a few CC0 sounds from Freesound plus the sound the game
// uses now, so the organisers can pick by ear. Writes print/geluid/<moment>-<n>.mp3 and print/geluid/kandidaten.json.
//   node scripts/geluid-kandidaten.mjs [moment,moment]
import fs from "node:fs";
import path from "node:path";

const DIR = "print/geluid";
fs.mkdirSync(DIR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { headers: { "User-Agent": "Mozilla/5.0" } };

// id, title, what it must sound like, file in the game now, searches, duration range (s), how many
export const MOMENTEN = [
  ["kist-open", "Kist gaat open", "De deksel gaat open en er stroomt licht uit: een hemelse openbaring, koor, glans.", "kist/hemel", ["angelic choir", "heavenly choir reveal", "holy light magic", "magic treasure reveal", "choir", "angelic"], 2, 14, 6],
  ["kist-reliek", "Reliek gevonden", "Eén reliek rijst op uit de kist en straalt: kort, helder, hemels.", "kist/reliek", ["magic reveal chime", "holy chime", "fantasy item get", "magic sparkle"], 0.5, 4, 6],
  ["kist-leeg", "Reliek niet gevonden", "Het vak blijft leeg: kort, laag en somber, geen spot.", "kist/leeg", ["dark drone sting", "sad sting", "low cello note", "ominous fail", "sad", "fail", "drone", "negative"], 0.8, 5, 5],
  ["kist-spanning", "Spanning per vak", "Vlak voordat een vak opengaat: hartslag of oplopende spanning.", "hartslag", ["heartbeat", "tension riser short", "heart beat", "tension"], 0.8, 6, 4],
  ["fin-goed", "Finale: goed antwoord", "Godfried keurt het goed: helder, warm, kort.", "fin/sfx-goed", ["correct answer chime", "harp success", "magic success"], 0.4, 3, 5],
  ["fin-fout", "Finale: fout antwoord", "De Schaduwkoning lacht erbij: duister, dreigend, kort.", "fin/sfx-fout", ["wrong answer", "horror sting", "evil fail"], 0.3, 3, 5],
  ["fin-tik", "Finale: cijferrol tikt", "De rol in het slot draait: één tik, wordt snel achter elkaar gespeeld.", "fin/sfx-tik", ["combination lock click", "safe dial click", "ratchet click", "click", "tick", "ratchet"], 0.02, 0.8, 5],
  ["fin-klank", "Finale: cijfer valt vast", "De rol klikt op zijn cijfer: zware metalen klank.", "fin/sfx-klank", ["metal clunk lock", "vault lock heavy", "heavy latch metal", "metal clunk", "lock", "latch", "clank"], 0.2, 2, 5],
  ["fin-cijfer", "Finale: cijfer gevonden", "Tegelijk met de klank: een gouden glans erbovenop.", "fin/sfx-slot", ["magic bell ding", "chime success bright", "magic bell"], 0.5, 3, 5],
  ["fin-akte", "Finale: nieuwe akte", "De titel van een akte verschijnt groot in beeld: plechtig, filmisch.", "fin/sfx-akte", ["cinematic boom", "epic drum hit", "medieval horn"], 1, 5, 5],
  ["fin-hint", "Finale: hint (reliek)", "Een reliek fluistert een hint: mysterieus, magisch.", "fin/sfx-hint", ["magic whisper", "mystical shimmer", "fairy chime", "magic", "shimmer", "whoosh magic"], 0.5, 3, 5],
  ["fin-open", "Finale: zegel gaat open", "Kettingen vallen weg, een medaillon licht goud op.", "fin/sfx-open", ["chains falling", "chain unlock", "magic seal break"], 0.5, 4, 5],
  ["fin-gerommel", "Finale: deur beeft", "Alle cijfers staan: de kluisdeur rommelt en beeft.", "fin/sfx-gerommel", ["stone door rumble", "earthquake rumble", "vault door open heavy", "rumble", "earthquake", "stone grinding"], 2, 10, 5],
  ["fin-licht", "Overwinning: wit licht", "Het licht verzwelgt alles, de duisternis is weg: hemels, groots.", "donder-hard", ["heavenly choir", "angelic ascension", "holy light", "choir", "angelic", "heavenly"], 3, 20, 5],
];

if (process.argv[1].endsWith("geluid-kandidaten.mjs")) {
  const alleen = process.argv[2]?.split(",");
  const kf = path.join(DIR, "kandidaten.json");
  const lijst = fs.existsSync(kf) ? JSON.parse(fs.readFileSync(kf, "utf8")).filter((c) => alleen && !alleen.includes(c.moment)) : [];
  for (const [moment, , , nu, zoek, minD, maxD, houd] of MOMENTEN.filter(([m]) => !alleen || alleen.includes(m))) {
    // the sound in the game now, as the first candidate
    const huidig = `${moment}-0.mp3`; fs.copyFileSync(`docs/a/${nu}.mp3`, path.join(DIR, huidig));
    lijst.push({ moment, file: huidig, source: "Nu in het spel", title: `Huidig (${nu}.mp3)` });
    const gezien = new Set(), gevonden = [];
    for (const q of zoek) {
      const url = `https://freesound.org/search/?q=${encodeURIComponent(q).replace(/%20/g, "+")}&f=license:%22Creative+Commons+0%22+duration:[${minD}+TO+${maxD}]&s=Downloads+desc`;
      const h = await (await fetch(url, UA)).text();
      for (const b of h.split('class="bw-player"').slice(1, 6)) {
        const g = (re) => (b.match(re) || [])[1];
        const id = g(/data-sound-id="(\d+)"/); if (!id || gezien.has(id)) continue; gezien.add(id);
        gevonden.push({ id, user: g(/data-username="([^"]+)"/), title: g(/data-title="([^"]*)"/), dur: +g(/data-duration="([^"]+)"/),
          mp3: (g(/data-mp3="([^"]+)"/) || "").replace("-lq.mp3", "-hq.mp3"), dl: +(g(/data-num-downloads="(\d+)"/) || 0), q });
      }
      await sleep(1100);
    }
    // the most used ones, at most two from one search, so the candidates differ
    gevonden.sort((a, b) => b.dl - a.dl);
    const per = {}, kies = [];
    for (const c of gevonden) { if (kies.length >= houd) break; if ((per[c.q] = (per[c.q] || 0) + 1) > 2) continue; kies.push(c); }
    let n = 0;
    for (const c of kies) {
      const r = await fetch(c.mp3, UA); if (!r.ok) continue;
      const file = `${moment}-${++n}.mp3`; fs.writeFileSync(path.join(DIR, file), Buffer.from(await r.arrayBuffer()));
      lijst.push({ moment, file, source: "Freesound", title: c.title, author: c.user, license: "CC0 1.0", url: `https://freesound.org/people/${c.user}/sounds/${c.id}/`, seconds: c.dur });
      await sleep(300);
    }
    console.log(moment, n);
  }
  fs.writeFileSync(kf, JSON.stringify(lijst, null, 1));
  console.log(lijst.length, "kandidaten");
}
