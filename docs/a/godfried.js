// Godfried van Bouillon als personage: zijn levensverhaal in drie hoofdstukken en de quiz vóór het eten (drie avonden,
// één vraag per Zegel). Eén bron voor de tv, de app (De Kroniek van Godfried) en de stemopnames (scripts/losse-stemmen.mjs).
// Tijdlijn: zijn brief komt uit 1096 en spreekt over 930 jaar heen; als geest vertelt hij in hoofdstuk III ook hoe het
// afliep (1099, 1100). Elke quizvraag is eerder verteld: vrijdag in de app-intro en hoofdstuk I, zaterdag in hoofdstuk II,
// zondag in hoofdstuk III (zaterdagavond na de Reliekenkist).
// vakken: de stripvakken op de tv (een bladzijde die zich vult terwijl hij vertelt): [beeld, uitsnede] of { b, pos, zoom: in|uit } of { b, van, naar } (de camera schuift); vakVan: welk vak bij welke zin hoort;
// blad: de indeling van de bladzijde (kolommen, rijen en per rij welk vak waar staat, a = het eerste vak), zodat elk hoofdstuk eigen maten heeft.
window.GODFRIED = {
  hoofdstukken: [
    { nr: 1, titel: "Hoofdstuk I · De oproep", wanneer: "vrijdag, de opening", beeld: "a/godfried/kantelen.webp", stem: "godfried/hoofdstuk-1",
      // a small camera move per panel: pan from → to (object-position), or zoom in / out
      vakken: [{ b: "a/strip/1a.webp", van: "88% 30%", naar: "52% 30%" }, { b: "a/strip/1b.webp", van: "50% 80%", naar: "50% 42%" }, { b: "a/godfried/strip/1c.webp", pos: "45% 45%", zoom: "in" }, { b: "a/godfried/strip/1d.webp", pos: "55% 28%", zoom: "uit" }], vakVan: [0, 1, 2, 3],
      blad: { kol: "0.95fr 1fr 1.1fr", rij: "1fr 1fr", vlak: ["a b b", "a c d"] }, tekst: [
      "Het jaar des Heren 1096. Mijn naam is Godfried. Godfried van Bouillon.",
      "Hertog van Neder-Lotharingen. En heer van deze burcht, hoog op de rots boven de Semois, in het hart van de Ardennen.",
      "Ver in het oosten ligt Jeruzalem. De oproep is gedaan, en ik zal gaan. Mijn land laat ik achter. Zelfs mijn burcht geef ik op, om de grote tocht te kunnen betalen.",
      "Een ware Wachter kent zijn heer, zijn land, en de geschiedenis waarvoor hij waakt. Luister daarom goed naar mijn woorden. Alles wat ik jullie vertel, kan later van betekenis blijken.",
    ] },
    { nr: 2, titel: "Hoofdstuk II · Een hertog zonder burcht", wanneer: "zaterdag, overdag", beeld: "a/godfried/portret.webp", stem: "godfried/hoofdstuk-2",
      vakken: [["a/godfried/strip/2a.webp", "72% 32%"], ["a/godfried/strip/2b.webp", "40% 45%"], ["a/godfried/strip/2c.webp", "55% 38%"], ["a/godfried/strip/2d.webp", "48% 50%"], ["a/godfried/strip/2e.webp", "50% 55%"]], vakVan: [0, 1, 2, 3, 4],
      blad: { kol: "0.8fr 0.6fr 1.15fr 0.9fr", rij: "1fr 1.1fr", vlak: ["a b b b", "c c d e"] }, tekst: [
      "Wachters. Ik vertelde jullie wie ik ben. Nu vertel ik hoe ik het werd.",
      "Jarenlang diende ik keizer Hendrik de Vierde. Ik vocht voor hem, tot voor de muren van Rome. Als dank gaf hij mij Neder-Lotharingen.",
      "Maar een tocht naar Jeruzalem kost meer dan moed. Daarom verpandde ik mijn burcht Bouillon aan de prins-bisschop van Luik. Mijn erfdeel, voor zilver, paarden en mannen.",
      "En ik ga niet alleen. Mijn broer Boudewijn trekt met mij mee naar het oosten.",
      "Vanavond betreden jullie mijn burcht, hier in de Ardennen. Kijk goed om je heen. De Schaduwkoning kent elke zwakke plek van een vesting… en misschien ook die van haar Wachters.",
    ] },
    { nr: 3, titel: "Hoofdstuk III · Wat de Kronieken schrijven", wanneer: "zaterdagavond, na de Reliekenkist", beeld: "a/godfried/kantelen.webp", stem: "godfried/hoofdstuk-3",
      vakken: [["a/godfried/strip/3a.webp", "50% 40%"], ["a/godfried/strip/3b.webp", "62% 40%"], ["a/godfried/strip/3c.webp", "60% 40%"], ["a/godfried/strip/3d.webp", "45% 50%"], ["a/godfried/strip/3e.webp", "50% 35%"]], vakVan: [0, 1, 2, 3, 4],
      blad: { kol: "1fr 0.85fr 0.75fr 1.2fr", rij: "1.15fr 1fr", vlak: ["a a a b", "c d d e"] }, tekst: [
      "Toen ik jullie mijn brief schreef, wist ik niet wat mij wachtte. Nu, negen eeuwen later, weet ik het wel. Luister.",
      "In 1099, na drie jaar van marsen en belegeringen, namen wij Jeruzalem in.",
      "Ze wilden mij tot koning kronen. Maar ik weigerde een gouden kroon te dragen, waar Christus een kroon van doornen droeg. Ik noemde mij slechts Beschermer van het Heilig Graf.",
      "Een jaar later stierf ik, in Jeruzalem zelf. En mijn broer Boudewijn werd na mij de eerste koning van Jeruzalem.",
      "Mijn burcht zag ik nooit terug. Die bleef bij de prins-bisschop van Luik. Maar haar Wachters… die zijn nu hier.",
    ] },
  ],

  // De quiz vóór het eten: vrijdag en zaterdag vóór het avondeten, zondag als opening van de finale.
  // Goed: +1 fiche voor dat Zegel. Fout: −1.
  quiz: [
    { nr: 1, titel: "De eerste beproeving", wanneer: "vrijdag, vóór het avondeten",
      intro: { stem: "godfried/quiz-1-intro", tekst: "Wachters. Een titel alleen maakt nog geen man van eer. Vanavond wil ik weten of jullie hebben geluisterd. Vier Zegels, vier vragen. Elk goed antwoord sterkt een Zegel. Elk fout antwoord… voedt de Schaduw." },
      vragen: [
        { zegel: "schild", vraag: "Welke titel droeg ik, naast heer van Bouillon?", antwoord: "Hertog van Neder-Lotharingen" },
        { zegel: "hoorn", vraag: "Van welke stad en burcht was ik de heer?", antwoord: "Bouillon" },
        { zegel: "hart", vraag: "Welke rivier stroomt onder mijn burcht?", antwoord: "De Semois" },
        { zegel: "vlam", vraag: "In welk jaar vertrok ik naar het Heilige Land?", antwoord: "1096" },
      ],
      slot: { stem: "godfried/quiz-1-slot", tekst: "Zo zij het. De Zegels hebben jullie antwoorden gehoord. Ga nu, en eet. Een Wachter met een lege maag bewaakt niets." } },
    { nr: 2, titel: "De tweede beproeving", wanneer: "zaterdag, vóór het avondeten",
      intro: { stem: "godfried/quiz-2-intro", tekst: "Mijn Wachters. Steen alleen maakt een rijk niet sterk. Het zijn de mensen, en wat zij onthouden. Vier Zegels, vier vragen." },
      vragen: [
        { zegel: "schild", vraag: "Welke broer trekt met mij mee naar Jeruzalem?", antwoord: "Boudewijn" },
        { zegel: "hoorn", vraag: "Waarom gaf ik mijn burcht Bouillon op?", antwoord: "Om de kruistocht te betalen (verpand)" },
        { zegel: "hart", vraag: "In welke streek ligt Bouillon?", antwoord: "De Ardennen" },
        { zegel: "vlam", vraag: "Welke keizer heb ik jarenlang gediend?", antwoord: "Keizer Hendrik IV" },
      ],
      slot: { stem: "godfried/quiz-2-slot", tekst: "De Schaduw luistert mee, Wachters. Eet nu… en wees vanavond waakzaam in mijn burcht." } },
    { nr: 3, titel: "De laatste beproeving", wanneer: "zondag, de opening van de finale",
      intro: { stem: "godfried/quiz-3-intro", tekst: "Mijn heren. De tijd is gekomen. Drie dagen lang hebben jullie gestreden, gelachen en getwijfeld. Vóór het laatste gevecht met de Schaduw: vier laatste vragen. Bewijs dat jullie de Wachters van Bouillon waardig zijn." },
      vragen: [
        { zegel: "schild", vraag: "Wie werd de eerste koning van Jeruzalem?", antwoord: "Boudewijn, mijn broer (Boudewijn I)" },
        { zegel: "hoorn", vraag: "Aan wie verpandde ik mijn burcht?", antwoord: "De prins-bisschop van Luik" },
        { zegel: "hart", vraag: "In welke stad ben ik gestorven?", antwoord: "Jeruzalem" },
        { zegel: "vlam", vraag: "In welk jaar namen wij Jeruzalem in?", antwoord: "1099" },
      ],
      slot: { stem: "godfried/quiz-3-slot", tekst: "Het is gezegd. Nu, Wachters… het Laatste Gewelf." } },
  ],
};
// de stem bij elke quizvraag: "Voor het Schild van Broederschap: …"
for (const r of window.GODFRIED.quiz) r.vragen.forEach((v, i) => { v.stem = `godfried/quiz-${r.nr}-${i + 1}`; });
