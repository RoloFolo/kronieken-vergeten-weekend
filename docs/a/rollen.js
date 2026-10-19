// De rollen van de Wachters (uit het document "Rollen"). De Chaos Lord is nu de wisselende verrader en is
// daarom geen vaste rol meer; de Architect is opgegaan in de Shieldbearer. Elf rollen voor elf Wachters.
//   passief: altijd actief · kracht: één keer per dag · zegels: affiniteit (+1 fiche bij een quest voor dat Zegel)
//   eed: het fragment van de Eed der Broeders (finale, Akte III) dat deze rol draagt, index in SPEL.eed.fragmenten
window.ROLLEN = [
  { id: "firekeeper", naam: "The Hearthkeeper", titel: "Hoeder van de Haard", zegels: ["vlam", "hart"], eed: 0,
    tekst: "Stevig en gastvrij. Bij jou brandt het vuur, staat de kroes klaar en voelt iedereen zich thuis.",
    passief: ["Eeuwige Vlam", "Brandt er vuur of een kaars wanneer de Schaduw beweegt? Dan kost een gefaald event 1 fiche minder."],
    kracht: ["Nachtwake", "Maak van een solo-quest een moment rond het vuur met minstens vier Wachters erbij. Hij telt dan als groepsquest (+3)."] },
  { id: "quartermaster", naam: "The Quartermaster", titel: "Meester van de Voorraad", zegels: ["hoorn", "vlam"], eed: 2,
    tekst: "Altijd onderweg. Jij ziet tekorten voordat ze bestaan.",
    passief: ["Nooit Leeg", "Los je een tekort op (drank, ijs, wc-papier) voordat iemand erover klaagt? Dan +1 fiche voor de Hoorn."],
    kracht: ["Bevoorradingsrun", "Vraagt een Schaduw-event om eten of drinken? Koop het hele event af met een rondje voor de groep."] },
  { id: "feastlord", naam: "The Wild Huntsman", titel: "Jager van het Woud", zegels: ["hoorn", "hart"], eed: 9,
    tekst: "Jij jaagt, je kookt en je voedt de troep. ‘Ik fix het wel.’ En dat doe je ook.",
    passief: ["Slagveldkeuken", "Een maaltijd die jij (mee) bereidt, levert +2 fiches voor de Hoorn op zodra de groep applaudisseert."],
    kracht: ["Ochtendbanket", "Serveer een ontbijt of brunch: +1 fiche voor twee Zegels naar keuze."] },
  { id: "shieldbearer", naam: "The Iron Guardian", titel: "IJzeren Hoeder", zegels: ["vlam", "schild"], eed: 1,
    tekst: "Jij ziet chaos waar anderen gezelligheid zien. Jij brengt orde, structuur en een schone tafel.",
    passief: ["Hoeder van de Orde", "Breng een ruimte volledig op orde: +1 fiche voor de Vlam (per ruimte één keer per dag)."],
    kracht: ["Chaosschild", "Wanneer de Schaduw beweegt, neem jij het event alleen op je. Slaag je, dan heeft de groep het doorstaan."] },
  { id: "warlord", naam: "The Dice Rogue", titel: "Schurk van de Dobbelstenen", zegels: ["schild", "hoorn"], eed: 4,
    tekst: "Jij maakt van alles een spel en van elk spel een gok. Bij twijfel over de regels beslis jij.",
    passief: ["Wet van de Oorlog", "Jij bent de scheidsrechter van de Guild. Eén keer per dag mag je een regel herdefiniëren."],
    kracht: ["Questsmid", "Verzin ter plekke een quest. Voltooit de groep hem, dan +3 voor een Zegel naar keuze."] },
  { id: "bard", naam: "The Bard of Amarone", titel: "Bard van de Amarone", zegels: ["schild", "hart"], eed: 8,
    tekst: "Luid, sociaal en het smeermiddel van de groep. Jij maakt van gewone momenten legendes, liefst met een glas Amarone.",
    passief: ["Stem van de Hal", "Na een gefaald event mag jij de sfeer redden met een lied, toost of verhaal. Lacht de groep, dan kost het 1 fiche minder."],
    kracht: ["Verhalenwever", "Vertel een legende over een Wachter van dit weekend. Overtuig je de groep, dan +2 voor het Schild."] },
  { id: "diplomat", naam: "The Silver Tongue", titel: "Zilveren Tong", zegels: ["schild", "vlam"], eed: 5,
    tekst: "Rustig en geduldig. Jij lost alles op zonder drama.",
    passief: ["Evenwicht der Stemmen", "Komt de groep er bij een dilemma niet uit? Dan heb jij de beslissende stem."],
    kracht: ["Bondgenootschap", "Wijs twee Wachters aan. Hun volgende duo-quest levert dubbel op."] },
  { id: "shadow", naam: "The Shadow Operative", titel: "Agent in de Schaduw", zegels: ["vlam", "schild"], eed: 10,
    tekst: "Stil, efficiënt en mysterieus. Jij doet wat niemand ziet, maar waar iedereen van profiteert.",
    passief: ["Onzichtbare Hand", "Je mag quests in het geheim voltooien en pas later onthullen. Had niemand het door? Dan +1 extra fiche."],
    kracht: ["Uit de Schaduw", "Na een gefaald event: regel binnen tien minuten ongezien iets voor de groep. Lukt het, dan komt 1 verloren fiche terug."] },
  { id: "ranger", naam: "The Arcane Pathfinder", titel: "Padvinder van het Arcane", zegels: ["hart", "schild"], eed: 6,
    tekst: "Tovenaar van de wildernis. ‘We moeten naar buiten.’ En de paden volgen jou.",
    passief: ["Windgevoel", "Elke wandeling of buitenactiviteit die jij aanvoert, levert +1 extra fiche op voor het Hart."],
    kracht: ["Expeditie", "Roep de groep naar buiten. Gaan er minstens zes Wachters een kwartier mee, dan +3 voor het Hart."] },
  { id: "alchemist", naam: "The Brew Alchemist", titel: "Alchemist van de Kelder", zegels: ["hoorn", "schild"], eed: 3,
    tekst: "Creatief, chaotisch en sociaal. Bij jou is een drankje een ervaring.",
    passief: ["Instabiel Mengsel", "Een drankje dat jij met een naam en een ritueel serveert, telt als solo-quest voor de Hoorn (één keer per uur)."],
    kracht: ["Chaosshot", "Laat de D20 opnieuw werpen. De tweede worp telt."] },
  { id: "priester", naam: "The Battle Healer", titel: "Strijdgenezer", zegels: ["hart", "vlam"], eed: 7,
    tekst: "Zorgzaam en kalm, met de knuisten van een orc. Jij brengt gevallen Wachters weer tot leven.",
    passief: ["Tweede Dageraad", "’s Ochtends (tot 12:00) levert elke quest van jou 1 extra fiche op."],
    kracht: ["Ritueel van Herstel", "Herstel 2 fiches die de Schaduw eerder vandaag heeft weggenomen, in een Zegel naar keuze."] },
];

// Ras en LARP-class per Wachter (Jean, 18 okt). Die krijgt iedereen al vooraf, met tips voor kostuum en attributen;
// de rol zelf (naam, krachten, Zegels) blijft verborgen tot de Eerste Dronk. Definitief sinds 18 okt.
window.KARAKTER = {
  Geert: { ras: "Half-Orc", klasse: "Cleric", props: "een pij of kap, een heilig symbool aan een koord, een flesje ‘heilwater’ en verband voor de gewonden" },
  Roy: { ras: "Human", klasse: "Fighter", props: "een tuniek met riem, een houten zwaard of strijdbijl, en een buidel voor de voorraad" },
  Martin: { ras: "Gnome", klasse: "Alchemist", props: "een schort, een puntmuts, een gordel vol flesjes en een vergrootglas of stofbril" },
  Stefan: { ras: "Human", klasse: "Wizard", props: "een mantel met kap, een staf en een oud boek met spreuken" },
  Jeroen: { ras: "Half-Elf", klasse: "Ranger", props: "een groene of bruine mantel, een jachthoorn of boog, en een mes aan de riem" },
  Ivo: { ras: "Gnome", klasse: "Bard", props: "een hoed met veer, een luit of fluit, en een kelk voor de Amarone" },
  Johan: { ras: "Human", klasse: "Thief", props: "een donker vest, een buidel munten aan de riem, een dobbelbeker en een kaartspel in de mouw" },
  Robin: { ras: "Dwarf", klasse: "Monk", props: "een eenvoudige pij met een touw als riem, een baard, een gebedssnoer en een staf" },
  Rob: { ras: "Halfling", klasse: "Paladin", props: "een tabbaard met een embleem, een (nep)zwaard en een heilig symbool aan een ketting" },
  Jean: { ras: "Human", klasse: "Thief", props: "een donkere kap, zwarte handschoenen, een (nep)dolk en een bos lopers" },
  Roland: { ras: "Dwarf", klasse: "Fighter", props: "een schild, een helm of maliënkap, een strijdbijl en een stevige baard" },
};

// Wie krijgt welke rol. VOORSTEL (zie Drive: 09 Voorstel rollen en bevelen), nog te bevestigen door Roland en Jean.
window.ROL_VAN = {
  Robin: "firekeeper", Martin: "alchemist", Jeroen: "feastlord", Roy: "quartermaster", Ivo: "bard", Stefan: "ranger",
  Johan: "warlord", Geert: "priester", Rob: "diplomat", Jean: "shadow", Roland: "shieldbearer",
};

// Wanneer de persoonlijke pagina de rol laat zien: zodra de tv de Guild Hall opent (na de Eerste Dronk).
// Zonder verbinding met de tv gaat hij uiterlijk op dit moment vanzelf open.
window.ROL_UITERLIJK = new Date("2026-11-13T21:00:00+01:00");
// Het eed-fragment verschijnt pas als de regie Akte III opent.

// Voor Stefans LARP: per rol in gewone woorden wat iemand altijd doet en wat hij één keer per dag kan (zonder spelwoorden als fiches of Zegels).
window.ROL_SIMPEL = {
  firekeeper: ["Waakt over het vuur. Zolang er een vuur brandt, beschermt hij de groep tegen onheil.", "Verzamelt iedereen rond het vuur. Wat daar samen gebeurt, telt dubbel."],
  quartermaster: ["Zorgt dat de groep nooit iets tekortkomt: drank, ijs, eten.", "Koopt een probleem af met een rondje voor iedereen."],
  feastlord: ["Kookt voor de groep. Een maaltijd van hem maakt iedereen sterker.", "Richt een feestmaal of ontbijt aan dat de groep extra kracht geeft."],
  shieldbearer: ["Houdt orde. Waar hij is, is het opgeruimd en veilig.", "Neemt een gevaar helemaal alleen op zich, om de groep te beschermen."],
  warlord: ["Is de scheidsrechter. Bij twijfel beslist hij, en hij mag een regel aanpassen.", "Verzint ter plekke een nieuwe uitdaging voor de groep."],
  bard: ["Redt de sfeer. Na een tegenslag beurt hij de groep op met een lied, toost of verhaal.", "Vertelt een legende over een andere Wachter, en maakt hem zo groter."],
  diplomat: ["Heeft de beslissende stem als de groep er samen niet uitkomt.", "Maakt van twee Wachters bondgenoten."],
  shadow: ["Werkt in het geheim. Wat hij doet, onthult hij pas later.", "Regelt na een tegenslag ongezien iets om de groep te helpen."],
  ranger: ["Leidt de groep naar buiten. Buiten is hij op zijn sterkst.", "Roept iedereen mee naar buiten, op expeditie."],
  alchemist: ["Brouwt drankjes, elk met een naam en een ritueel.", "Laat het lot opnieuw beslissen: een worp mag over."],
  priester: ["Is 's ochtends op zijn sterkst.", "Herstelt wat de groep eerder die dag verloor."],
};
