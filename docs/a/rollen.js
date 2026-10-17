// De rollen van de Wachters (uit het document "Rollen"). De Chaos Lord is nu de wisselende verrader en is
// daarom geen vaste rol meer; de Architect is opgegaan in de Shieldbearer. Elf rollen voor elf Wachters.
//   passief: altijd actief · kracht: één keer per dag · zegels: affiniteit (+1 fiche bij een quest voor dat Zegel)
//   eed: het fragment van de Eed der Broeders (finale, Akte III) dat deze rol draagt, index in SPEL.eed.fragmenten
window.ROLLEN = [
  { id: "firekeeper", naam: "The Firekeeper", titel: "Hoeder van het Vuur", zegels: ["vlam", "hart"], eed: 0,
    tekst: "Rustig en beschermend. Voor jou moet alles blijven branden: het vuur, de sfeer, de nacht.",
    passief: ["Eeuwige Vlam", "Brandt er vuur of een kaars wanneer de Schaduw beweegt? Dan kost een gefaald event 1 fiche minder."],
    kracht: ["Nachtwake", "Maak van een solo-quest een moment rond het vuur met minstens vier Wachters erbij. Hij telt dan als groepsquest (+3)."] },
  { id: "quartermaster", naam: "The Quartermaster", titel: "Meester van de Voorraad", zegels: ["hoorn", "vlam"], eed: 2,
    tekst: "Altijd onderweg. Jij ziet tekorten voordat ze bestaan.",
    passief: ["Nooit Leeg", "Los je een tekort op (drank, ijs, wc-papier) voordat iemand erover klaagt? Dan +1 fiche voor de Hoorn."],
    kracht: ["Bevoorradingsrun", "Vraagt een Schaduw-event om eten of drinken? Koop het hele event af met een rondje voor de groep."] },
  { id: "feastlord", naam: "The Feastlord", titel: "Heer van het Feestmaal", zegels: ["hoorn", "hart"], eed: 9,
    tekst: "Chaotisch maar effectief. ‘Ik fix het wel.’ En dat doe je ook.",
    passief: ["Slagveldkeuken", "Een maaltijd die jij (mee) bereidt, levert +2 fiches voor de Hoorn op zodra de groep applaudisseert."],
    kracht: ["Ochtendbanket", "Serveer een ontbijt of brunch: +1 fiche voor twee Zegels naar keuze."] },
  { id: "shieldbearer", naam: "The Shieldbearer", titel: "Schilddrager en Bouwmeester", zegels: ["vlam", "schild"], eed: 1,
    tekst: "Jij ziet chaos waar anderen gezelligheid zien. Jij brengt orde, structuur en een schone tafel.",
    passief: ["Hoeder van de Orde", "Breng een ruimte volledig op orde: +1 fiche voor de Vlam (per ruimte één keer per dag)."],
    kracht: ["Chaosschild", "Wanneer de Schaduw beweegt, neem jij het event alleen op je. Slaag je, dan heeft de groep het doorstaan."] },
  { id: "warlord", naam: "The Warlord of Games", titel: "Krijgsheer van het Spel", zegels: ["schild", "hoorn"], eed: 4,
    tekst: "Jij regelt alles alsof het een toernooi is. Bij twijfel over de regels beslis jij.",
    passief: ["Wet van de Oorlog", "Jij bent de scheidsrechter van de Guild. Eén keer per dag mag je een regel herdefiniëren."],
    kracht: ["Questsmid", "Verzin ter plekke een quest. Voltooit de groep hem, dan +3 voor een Zegel naar keuze."] },
  { id: "bard", naam: "The Bard of the Hearth", titel: "Bard van de Haard", zegels: ["schild", "hart"], eed: 8,
    tekst: "Luid, sociaal en het smeermiddel van de groep. Jij maakt van gewone momenten legendes.",
    passief: ["Stem van de Hal", "Na een gefaald event mag jij de sfeer redden met een lied, toost of verhaal. Lacht de groep, dan kost het 1 fiche minder."],
    kracht: ["Verhalenwever", "Vertel een legende over een Wachter van dit weekend. Overtuig je de groep, dan +2 voor het Schild."] },
  { id: "diplomat", naam: "The Diplomat", titel: "Gezant van de Broederschap", zegels: ["schild", "vlam"], eed: 5,
    tekst: "Rustig en geduldig. Jij lost alles op zonder drama.",
    passief: ["Evenwicht der Stemmen", "Komt de groep er bij een dilemma niet uit? Dan heb jij de beslissende stem."],
    kracht: ["Bondgenootschap", "Wijs twee Wachters aan. Hun volgende duo-quest levert dubbel op."] },
  { id: "shadow", naam: "The Shadow Operative", titel: "Agent in de Schaduw", zegels: ["vlam", "schild"], eed: 10,
    tekst: "Stil, efficiënt en mysterieus. Jij doet wat niemand ziet, maar waar iedereen van profiteert.",
    passief: ["Onzichtbare Hand", "Je mag quests in het geheim voltooien en pas later onthullen. Had niemand het door? Dan +1 extra fiche."],
    kracht: ["Uit de Schaduw", "Na een gefaald event: regel binnen tien minuten ongezien iets voor de groep. Lukt het, dan komt 1 verloren fiche terug."] },
  { id: "ranger", naam: "The Ranger", titel: "Woudloper van de Ardennen", zegels: ["hart", "schild"], eed: 6,
    tekst: "Actief en instinctief. ‘We moeten naar buiten.’",
    passief: ["Windgevoel", "Elke wandeling of buitenactiviteit die jij aanvoert, levert +1 extra fiche op voor het Hart."],
    kracht: ["Expeditie", "Roep de groep naar buiten. Gaan er minstens zes Wachters een kwartier mee, dan +3 voor het Hart."] },
  { id: "alchemist", naam: "The Brew Alchemist", titel: "Alchemist van de Kelder", zegels: ["hoorn", "schild"], eed: 3,
    tekst: "Creatief, chaotisch en sociaal. Bij jou is een drankje een ervaring.",
    passief: ["Instabiel Mengsel", "Een drankje dat jij met een naam en een ritueel serveert, telt als solo-quest voor de Hoorn (één keer per uur)."],
    kracht: ["Chaosshot", "Laat de D20 opnieuw werpen. De tweede worp telt."] },
  { id: "priester", naam: "The High Priest of Hangover", titel: "Hogepriester van de Kater", zegels: ["hart", "vlam"], eed: 7,
    tekst: "Zorgzaam en kalm. Jij brengt gevallen Wachters weer tot leven.",
    passief: ["Tweede Dageraad", "’s Ochtends (tot 12:00) levert elke quest van jou 1 extra fiche op."],
    kracht: ["Ritueel van Herstel", "Herstel 2 fiches die de Schaduw eerder vandaag heeft weggenomen, in een Zegel naar keuze."] },
];

// Wie krijgt welke rol. VOORSTEL (zie Drive: 09 Voorstel rollen en bevelen), nog te bevestigen door Roland en Jean.
window.ROL_VAN = {
  Robin: "firekeeper", Martin: "alchemist", Jeroen: "feastlord", Roy: "quartermaster", Ivo: "priester", Stefan: "ranger",
  Johan: "warlord", Geert: "bard", Rob: "diplomat", Jean: "shadow", Roland: "shieldbearer",
};

// Wanneer de persoonlijke pagina de rol laat zien: zodra de tv de Guild Hall opent (na de Eerste Dronk).
// Zonder verbinding met de tv gaat hij uiterlijk op dit moment vanzelf open.
window.ROL_UITERLIJK = new Date("2026-11-13T21:00:00+01:00");
// Het eed-fragment verschijnt pas als de regie Akte III opent.
