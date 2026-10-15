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
  // Vier puzzels, één per Zegel. Elk antwoord is één cijfer van het slot op de kist (volgorde: vlam, hoorn, schild, hart).
  drempel: 12, // fiches waarbij een Zegel zijn puzzel vanzelf vrijgeeft; anders eerst een beproeving
  puzzels: [
    { zegel: "vlam", naam: "Het Vuurraadsel", antwoord: 7,
      tekst: "Ik werd geboren in het jaar dat Godfried vertrok. Tel mijn cijfers bij elkaar op, en blijft er meer dan één cijfer over, tel dan opnieuw. Welk cijfer blijft er over?",
      hint: "Godfried vertrok in 1096. Dus 1 + 0 + 9 + 6 = 16, en dan nog één keer." },
    { zegel: "hoorn", naam: "De Vier Bekers", antwoord: 6,
      tekst: "In vier bekers zitten samen dertien slokken. De gouden beker bevat precies één slok. De rode bevat er twee meer dan de groene. De blauwe bevat er evenveel als de rode en de groene samen. Hoeveel slokken zitten er in de blauwe beker?",
      hint: "Haal de gouden slok eraf: dan blijven er twaalf over. Probeer de groene beker met twee slokken." },
    { zegel: "schild", naam: "Het Woord der Broeders", antwoord: 9,
      tekst: "De broeders schreven hun geheimen met elke letter verschoven, net zo veel plaatsen als er Zegels zijn. Ontcijfer het getal:", code: "R I K I R",
      hint: "Er zijn vier Zegels. Schuif elke letter vier plaatsen terug in het alfabet: R wordt N." },
    { zegel: "hart", naam: "Het Spoor van het Hert", antwoord: 8,
      tekst: "In het woud van de Ardennen verbergen zich herten. Tel ze allemaal. Hoeveel herten zie je?", herten: 8,
      hint: "Ze schuilen in drie rijen: hoog tussen de toppen, midden tussen de stammen en laag in het struikgewas." },
  ],
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
