// Losse stemregels: overwinning, toost, uitleg en alles van de verrader (fluisteringen, vloek, valse Godfried).
//   node --env-file=C:/Users/rolan/Verno/verno-app/.env.local scripts/losse-stemmen.mjs
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SLEUTEL = process.env.REPLICATE_API_TOKEN;
const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const SCHADUW = "You are an ancient demon king beneath a castle in the Ardennes, speaking Dutch. Very slow, very low, cold and amused, drawn-out vowels, long silences, a sinister near-whisper.";
const VERSLAGEN = "You are an ancient demon king, speaking Dutch, being defeated and dragged back into his prison: furious disbelief that breaks into a fading, echoing scream, then a last bitter whisper.";
const GODFRIED = "You are Godfrey of Bouillon, a noble medieval lord, speaking Dutch to a hall of friends. Warm, solemn and proud. Steady, moderately brisk pace with short pauses only where they matter, deeply moved at the end.";
const PROOST = "You are Godfrey of Bouillon, a noble medieval lord, speaking Dutch to a hall of friends with a raised goblet. Rousing and full of joy: build up on the first words, then roar the final word like a king rallying his hall, loud, warm and triumphant.";
// The traitor's fake Godfried: same voice, but something is off (wavering pitch, a hollow echo).
const VALS = "You are Godfrey of Bouillon, a noble medieval lord, speaking Dutch to a hall of friends. Commanding and urgent, a little too eager, with a faint sly undertone.";
const VERVORMD = "vibrato=f=5.5:d=0.18,aecho=0.8:0.55:70|140:0.35|0.2,highpass=f=120";
const NAMEN = ["Geert", "Roy", "Martin", "Stefan", "Jeroen", "Ivo", "Johan", "Robin", "Rob", "Jean", "Roland"];
const KAR = (() => { const w = {}; new Function("window", readFileSync("docs/a/rollen.js", "utf8"))(w); return w.KARAKTER || {}; })(); // race and class per Wachter, named in the welcome
const REGELS = [
  // the traitor's new teases and sabotage
  ...NAMEN.map((n) => [`chaos-naam-${n.toLowerCase()}`, "Enceladus", SCHADUW, `[whispering] ${n}… ${n}… ik zie jou.`]),
  ["chaos-vloek", "Enceladus", SCHADUW, "Mijn vloek… rust nu op jou."],
  ["chaos-dertien", "Enceladus", SCHADUW, "Het dertiende uur… is mijn uur."],
  ["chaos-ijs", "Enceladus", SCHADUW, "[whispering] Laat het… bevriezen."],
  ["chaos-macht", "Enceladus", SCHADUW, "Wachters… Hebben jullie mij gemist? Jullie lachen. Jullie drinken. Jullie denken dat Godfried over jullie waakt. Maar ik zit al die tijd tussen jullie in. Aan jullie tafel. In jullie glazen. In jullie twijfels. En nu… neem ik wat mij toekomt."],
  ["godfried-vals-1", "Charon", VALS, "Wachters! Ik beveel jullie: ga allemaal naar buiten, nu meteen, en zoek aan de hemel naar mijn teken.", VERVORMD],
  ["godfried-vals-2", "Charon", VALS, "Wachters, de Zegels vragen om een offer. Wie als laatste zijn glas leeg heeft, schenkt de volgende ronde voor iedereen.", VERVORMD],
  ["godfried-vals-3", "Charon", VALS, "Wachters, de Hall moet stil zijn. Wie de komende vijf minuten een woord zegt, zingt daarna een lied.", VERVORMD],
  ["godfried-vals-4", "Charon", VALS, "Wachters, ruil allemaal van plaats. Zo kan de Schaduw jullie niet vinden.", VERVORMD],
  ["godfried-vals-5", "Charon", VALS, "Wachters… de Hoorn heeft honger. Breng mij een boterham. Met kaas. Snel.", VERVORMD],

  ["einde-schaduw", "Enceladus", VERSLAGEN, "Nee… Nee! Dit kan niet… Vier Zegels… één broederschap… Ik… ik zal… [whispering] ooit… kom ik terug."],
  ["einde-godfried", "Charon", GODFRIED, "Het is volbracht. De Zegels zijn vernieuwd, en de Schaduwkoning slaapt weer onder mijn kasteel. Niet door één held… maar door een broederschap die voor elkaar zorgde. Wachters van Bouillon, ik ben trots op jullie. Open nu de envelop op de schoorsteen."],
  // De Eerste Dronk (na de proloog) en de uitleg van de Hall.
  ["dronk-intro", "Charon", GODFRIED, "Eén ding nog, Wachters. Een broederschap begint met een dronk. Haal jullie drankjes, schenk de glazen vol… en kom terug bij het vuur. Ik wacht op jullie."],
  ["dronk-toost", "Charon", GODFRIED, "Hef het glas, Wachters."],
  ["dronk-1", "Charon", GODFRIED, "Bij het vuur… dat nooit dooft."],
  ["dronk-2", "Charon", GODFRIED, "Bij de hoorn… die nooit leeg raakt."],
  ["dronk-3", "Charon", GODFRIED, "Bij het schild… van onze broederschap."],
  ["dronk-4", "Charon", GODFRIED, "En bij het hart… van de Ardennen."],
  ["dronk-5", "Charon", PROOST, "Wij waken! PROOST!"],
  ["uitleg-1", "Charon", GODFRIED, "Zie de vier Zegels. Hoe voller hun ampul, hoe steviger zij de Schaduwkoning gevangen houden. Jullie eerste dronk heeft ze al gevoed."],
  ["uitleg-2", "Charon", GODFRIED, "Elke opdracht die jullie volbrengen, voedt een Zegel. Pak een questkaart, doe wat erop staat, en meld het aan de hoeders van de Hall. Alleen, met twee, of met de hele groep."],
  ["uitleg-3", "Charon", GODFRIED, "Maar wees gewaarschuwd. Wanneer de Schaduw beweegt, legt hij jullie een beproeving op. Doorsta haar… of zie de Zegels leeglopen."],
  ["uitleg-4", "Charon", GODFRIED, "En nog iets, Wachters. Ieder van jullie kreeg een persoonlijke boodschap van mij. Open hem nu… daar wacht jouw rol, jouw kracht, en de Zegels die jou het best liggen."],
  ["tocht-intro", "Charon", GODFRIED, "Wachters. Vanavond betreden jullie mijn kasteel. Draag het vuur door de poorten, de gangen en de gewelven. Vijf beproevingen wachten tussen de oude muren. Elke beproeving die jullie volbrengen, opent een vak van de Reliekenkist. Jullie opdrachten staan nu ook op jullie telefoon. Ga, Wachters… en laat het licht niet doven."],
  ["kist-intro", "Charon", GODFRIED, "Wachters… jullie zijn teruggekeerd uit mijn kasteel. Wat jullie daar volbrachten, heeft de oude kist gewekt. Laat ons zien… wat jullie hebben meegebracht."],
  ["kist-alle", "Charon", GODFRIED, "Alle vijf. Alle vijf relieken! Zelfs ik heb dat nooit gezien. De Schaduw zal beven, Wachters."],
  ["kist-deel", "Charon", GODFRIED, "Bewaar ze goed. Elk reliek is in de laatste strijd één hint waard. Gebruik ze wijs."],
  ["kist-geen", "Charon", GODFRIED, "Niets… De kist blijft leeg. De Schaduw lacht, Wachters. Nu staan jullie er alleen voor."],
  ["uitleg-5", "Charon", GODFRIED, "De Guild Hall is geopend. Moge het licht jullie bijstaan, Wachters."],
  ["chaos-1", "Enceladus", SCHADUW, "[whispering] Ik ben dichterbij… dan jullie denken."],
  ["chaos-2", "Enceladus", SCHADUW, "Hehehe… Jullie denken dat jullie veilig zijn."],
  ["chaos-3", "Enceladus", SCHADUW, "[whispering] Jullie Zegels… lekken."],
  ["chaos-4", "Enceladus", SCHADUW, "Ik hoorde dat. Ik hoor… alles."],
  ["chaos-5", "Enceladus", SCHADUW, "[whispering] Kijk achter je."],
  // De finale: het laatste gewelf. De cijfers volgen spel.js slotcode (7, 6, 9, 8): pas die regels aan als de code verandert.
  ["fin/schaduw", "Enceladus", SCHADUW, "Dus… jullie zijn tot hier gekomen. Tot aan mijn laatste slot. Vier cijfers houden mij nog gevangen. Vier. [whispering] Laten we eens zien… wat jullie werkelijk weten."],
  ["fin/godfried", "Charon", GODFRIED, "Laat je niet bang maken, Wachters. Elk Zegel bewaart één cijfer van dit slot. Volbreng zijn akte, en het cijfer valt op zijn plaats. Vier cijfers… en de Schaduwkoning is opnieuw gebonden."],
  ["fin/akte-1", "Charon", GODFRIED, "Akte één. Het Vuur der Herinnering. Het vuur onthoudt wie jullie zijn. Het toont jullie herinneringen… herken de Wachter over wie het spreekt."],
  ["fin/akte-2", "Charon", GODFRIED, "Akte twee. Het Feestmaal. De Hoorn heeft alles gezien wat jullie dit weekend deden. Bewijs dat jullie het zelf ook nog weten."],
  ["fin/akte-3", "Charon", GODFRIED, "Akte drie. De Eed der Broeders. Ieder van jullie draagt een stuk van de eed. Het staat nu in jouw persoonlijke boodschap van mij. Alleen samen, in de juiste volgorde, spreken jullie hem uit."],
  ["fin/akte-4", "Charon", GODFRIED, "Akte vier. De Verrader. Het hele weekend liep er een verrader tussen jullie. Niet één, maar telkens een ander. Wijs ze aan."],
  ["fin/goed-1", "Charon", GODFRIED, "Juist. Het vuur herkent de waarheid."],
  ["fin/goed-2", "Charon", GODFRIED, "Zo is het, Wachters!"],
  ["fin/goed-3", "Charon", GODFRIED, "Goed gesproken. De Schaduw deinst terug."],
  ["fin/goed-4", "Charon", GODFRIED, "Ja! Dat is het."],
  ["fin/fout-1", "Enceladus", SCHADUW, "Fout… Ik proef jullie twijfel."],
  ["fin/fout-2", "Enceladus", SCHADUW, "[laughing] Nee… nee, nee, nee."],
  ["fin/fout-3", "Enceladus", SCHADUW, "Jullie geheugen laat jullie in de steek, Wachters."],
  ["fin/fout-4", "Enceladus", SCHADUW, "Nog zo'n fout… en ik word sterker."],
  ["fin/cijfer-1", "Charon", GODFRIED, "Het eerste cijfer valt in het slot. Zeven!"],
  ["fin/cijfer-2", "Charon", GODFRIED, "Het tweede cijfer. Zes!"],
  ["fin/cijfer-3", "Charon", GODFRIED, "Het derde cijfer. Negen!"],
  ["fin/cijfer-4", "Charon", GODFRIED, "Het vierde… en laatste cijfer. Acht!"],
  ["fin/dicht", "Enceladus", SCHADUW, "Dit Zegel is te zwak… Het geeft zijn geheim niet prijs. Niet zonder een laatste beproeving."],
  ["fin/open", "Charon", GODFRIED, "Het Zegel is sterk genoeg. Het geeft zijn geheim prijs."],
  ["fin/hint", "Charon", GODFRIED, "Een reliek ontwaakt. Luister naar wat het fluistert."],
  // Voor het weekend, op de persoonlijke pagina: een welkom per Wachter, en de avond ervoor de Schaduwkoning.
  ...NAMEN.map((n) => [`vooraf/welkom-${n.toLowerCase()}`, "Charon", GODFRIED, `Wachter ${n}. Ik ben Godfried van Bouillon. Binnenkort ontwaakt de Schaduw onder mijn kasteel, en ik roep elf Wachters bijeen. Jij bent er één van. ${KAR[n] ? `Jij komt als ${KAR[n].ras} ${KAR[n].klasse}. Kom in die gedaante, verkleed van top tot teen, en blijf het hele weekend in je rol… wie dat doet, wordt rijkelijk beloond. ` : ""}Je rol rust nog onder mijn zegel… ${["Rob", "Jean", "Roland"].includes(n) ? "maar ik vraag je nu al om hulp." : "maar één bevel geef ik je nu al. En ik vraag je om hulp."}`]), // the organisers get no order
  ["vooraf/schaduw", "Enceladus", SCHADUW, "Wachter… Godfried heeft je geroepen. Maar ik hoorde het ook. [whispering] Morgen breekt zijn zegel. En dan… zien wij elkaar."],
  // Het einde: eerst de echte kist (de cadeaus), op teken van de regie de envelop op de schoorsteen (de oorkondes).
  ["fin/einde-kist", "Charon", GODFRIED, "Het is volbracht. De Zegels zijn vernieuwd, en de Schaduwkoning slaapt weer onder mijn kasteel. Niet door één held… maar door een broederschap die voor elkaar zorgde. Wachters van Bouillon, ik ben trots op jullie. De vier cijfers zijn van jullie. Open nu de kist… wat daarin ligt, is voor jullie allen."],
  ["fin/einde-envelop", "Charon", GODFRIED, "Nog één ding, Wachters. Op de schoorsteen wacht al het hele weekend een envelop. Open hem nu. Daarin staan jullie namen… voor altijd geschreven in de Kronieken."],
];

async function tts(text, voice, prompt) {
  const kop = { Authorization: `Bearer ${SLEUTEL}`, "Content-Type": "application/json", Prefer: "wait" };
  const r = await fetch("https://api.replicate.com/v1/models/google/gemini-3.1-flash-tts/predictions", { method: "POST", headers: kop,
    body: JSON.stringify({ input: { text, prompt, voice, language_code: "nl-NL" } }) });
  let s = await r.json(); if (!r.ok) throw new Error(`${r.status}`);
  for (let i = 0; i < 120 && s.status !== "succeeded" && s.status !== "failed"; i++) {
    await new Promise((ok) => setTimeout(ok, 2000)); const p = await fetch(s.urls.get, { headers: { Authorization: `Bearer ${SLEUTEL}` } }); if (p.ok) s = await p.json();
  }
  if (s.status !== "succeeded") throw new Error(s.error ?? s.status);
  return Buffer.from(await (await fetch(typeof s.output === "string" ? s.output : s.output[0])).arrayBuffer());
}
for (const [naam, stem, regie, tekst, filter] of REGELS) {
  const mp3 = `docs/a/${naam}.mp3`; if (existsSync(mp3)) continue;
  for (let p = 1; p <= 4; p++) {
    await new Promise((ok) => setTimeout(ok, 11000));
    try { writeFileSync("docs/a/_tmp.wav", await tts(tekst, stem, regie)); execFileSync(FF, ["-hide_banner", "-loglevel", "error", "-y", "-i", "docs/a/_tmp.wav", ...(filter ? ["-af", filter] : []), "-b:a", "112k", mp3]); console.log("✓", naam); break; }
    catch (e) { console.log("✗", naam, p, String(e.message).slice(0, 80)); }
  }
}
execFileSync("rm", ["-f", "docs/a/_tmp.wav"]);
