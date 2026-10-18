// Inhoud van de latere schermen: Wachterstocht, relieken, finale en eretitels.
window.SPEL = {
  // Zaterdagavond, de fakkeltocht door Château de Bouillon. Op eer: de groep meldt zelf wat gelukt is.
  tocht: [
    { id: "vlam", zegel: "vlam", naam: "Het Licht van Godfried", tekst: "Maak bovenop de Tour d’Autriche een groepsfoto met alle fakkels hoog in de lucht." },
    { id: "hoorn", zegel: "hoorn", naam: "De Dronk van de Kruisvaarder", tekst: "Breng ergens in het kasteel samen een toost uit op Godfried van Bouillon. Een slok, een gebaar of een denkbeeldige beker: als het maar plechtig is." },
    { id: "schild", zegel: "schild", naam: "De Brug der Broeders", tekst: "Steek de ophaalbrug over als één keten. Hand in hand of hand op de schouder, en niemand laat los." },
    { id: "hart", zegel: "hart", naam: "Het Geheim van de Gids", tekst: "Vraag de gids naar de engste legende van het kasteel. Onthoud haar: straks vertellen jullie haar na in de Guild Hall." },
    { id: "stilte", zegel: null, naam: "De Stille Wachter", tekst: "Ergens in de gewelven blijft de hele groep tien tellen doodstil, fakkels omlaag. Wie lacht, breekt de stilte." },
  ],
  // Elke gelukte opdracht opent een vak van de Reliekenkist. Elk reliek is in de finale één hint waard.
  relieken: [
    { id: "vlam", naam: "De Lantaarn van het Kasteel", tekst: "Het eeuwige vuur van de eerste wachters.", img: "a/reliek-vlam.webp" },
    { id: "hoorn", naam: "De Hoorn van de Herberg", tekst: "Hij is nooit helemaal leeg.", img: "a/reliek-hoorn.webp" },
    { id: "schild", naam: "Het Zwaard van Broederschap", tekst: "Ooit gebruikt om vrede te bezegelen.", img: "a/reliek-schild.webp" },
    { id: "hart", naam: "De Wortel van de Wildernis", tekst: "Hij ademt nog steeds het woud.", img: "a/reliek-hart.webp" },
    { id: "stilte", naam: "De Kaars van Stilte", tekst: "Hij geeft geen licht, maar dwingt rust af.", img: "a/reliek-stilte.webp" },
  ],
  // ===== De finale: vier aktes, samen ongeveer een uur. Elke akte geeft bij voltooiing één cijfer van het slot. =====
  slotcode: [7, 6, 9, 8], // volgorde: vlam, hoorn, schild, hart. Zo moet het cijferslot op de kist staan.
  drempel: 12,            // fiches waarbij een Zegel zijn akte vanzelf opent; anders eerst een beproeving
  aktes: [
    { zegel: "vlam", naam: "Het Vuur der Herinnering", soort: "herinnering",
      intro: "Het vuur onthoudt wie jullie zijn. Het toont jullie herinneringen… herken de Wachter over wie het spreekt." },
    { zegel: "hoorn", naam: "Het Feestmaal", soort: "weekend",
      intro: "De Hoorn heeft alles gezien wat jullie dit weekend deden. Bewijs dat jullie het zelf ook nog weten." },
    { zegel: "schild", naam: "De Eed der Broeders", soort: "eed",
      intro: "Ieder van jullie draagt een stuk van de eed. Het staat nu in jouw persoonlijke boodschap van Godfried. Alleen samen, in de juiste volgorde, spreken jullie hem uit." },
    { zegel: "hart", naam: "De Verrader", soort: "verrader",
      intro: "Het hele weekend liep er een verrader tussen jullie. Niet één, maar telkens een ander. Wijs ze aan." },
  ],

  // Akte I. Per Wachter een herinnering (anekdote) en eventueel een foto in docs/a/fotos/. In te vullen door de organisatoren.
  // De voorbeelden hieronder zijn alleen om te testen en worden vervangen.
  herinneringen: [
    { wie: "Roland", tekst: "VOORBEELD · Hij die dit hele spel bedacht, en daarbij vergat dat ook hij moet raden.", foto: null },
    { wie: "Geert", tekst: "VOORBEELD · Vervang mij door een echte herinnering aan deze Wachter.", foto: null },
  ],

  // Akte III. Eén fragment per Wachter, in de juiste volgorde. Welke rol welk fragment draagt, staat in rollen.js;
  // het fragment verschijnt op de persoonlijke pagina zodra de regie Akte III opent.
  eed: {
    fragmenten: ["Bij het vuur", "dat nooit dooft", "bij de hoorn", "die nooit leeg raakt", "bij het schild", "van onze broederschap", "en het hart", "van de Ardennen", "zweren wij", "voor elkaar", "te waken."],
    aanwijzingen: [
      "Het vuur van de haard spreekt als eerste, en de IJzeren Hoeder maakt zijn zin af.",
      "De Quartermaster heft de hoorn; de Alchemist zorgt dat hij nooit leeg raakt.",
      "Waar de Dobbelschurk het schild heft, spreekt de Zilveren Tong van broederschap.",
      "De Padvinder brengt het hart; de Strijdgenezer het woud.",
      "De Bard zweert, de Jager is er voor elkaar, en wie in de schaduw werkt, heeft het laatste woord.",
    ],
  },

  // Zondagochtend bij het ontbijt.
  titels: [
    { naam: "De Onuitputtelijke Kelk", voor: "Degene die het langst gezellig bleef zonder zijn humeur te verliezen.", spreuk: "Men zegt dat zijn beker nooit leeg was… of in ieder geval nooit lang." },
    { naam: "Grootmeester van de Strategische Rust", voor: "Degene die opvallend vaak even zat uit te rusten.", spreuk: "Niet lui… maar energie aan het sparen voor het juiste moment." },
    { naam: "Bewaarder van het Heilige Toilet", voor: "Degene die het vaakst spoorloos verdween.", spreuk: "Sommigen zochten de Demon. Jij zocht een stillere ruimte." },
    { naam: "De Verdwaalde Ranger", voor: "Degene die altijd de verkeerde kant op liep.", spreuk: "Geen pad was onbekend… omdat jij ze allemaal hebt bewandeld." },
    { naam: "De Onverzadigbare Feastlord", voor: "Degene die altijd als eerste bij de snacks stond.", spreuk: "De voorraden leden zware verliezen, maar de moraal bleef hoog." },
    { naam: "De Dobbelsteenfluisteraar", voor: "De speler met absurd veel geluk.", spreuk: "Statistisch onmogelijk, maar toch gebeurd." },
    { naam: "De Demon’s Beste Klant", voor: "Degene die de meeste quests of uitdagingen verloor.", spreuk: "De Demon zal je missen." },
    { naam: "De Onzichtbare Wachter", voor: "Degene van wie je soms vergat dat hij er was.", spreuk: "Verborgen in de schaduw… of gewoon op de bank." },
    { naam: "De Koninklijke Fotobom", voor: "Degene die op werkelijk iedere foto opduikt.", spreuk: "Geen herinnering zonder jouw hoofd ergens op de achtergrond." },
    { naam: "Meester van de Improvisatie", voor: "Degene die overal een creatieve oplossing voor verzon.", spreuk: "Regels zijn slechts suggesties." },
    { naam: "Ridder van de Laatste Ronde", voor: "Degene die altijd nog één drankje wist te regelen.", spreuk: "Niemand weet hoe. Iedereen profiteerde ervan." },
    { naam: "Quartermaster van de Vergeten Spullen", voor: "Degene die het meest kwijt was.", spreuk: "Sleutels. Telefoon. Jas. Waardigheid." },
    { naam: "De Grote Toneelmeester", voor: "Degene die volledig in zijn rol opging.", spreuk: "Er werd niet gespeeld. Er werd geleefd." },
    { naam: "De Koninklijke Omroeper", voor: "Degene die altijd nét iets te luid aanwezig was.", spreuk: "Zelfs de Demon hoefde niet te vragen waar je was." },
    { naam: "De Heilige Geluksduivel", voor: "Degene bij wie werkelijk alles toevallig goed uitpakte.", spreuk: "Verdacht veel geluk… de Raad onderzoekt de zaak nog." },
  ],
};
