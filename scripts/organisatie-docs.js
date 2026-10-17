// Twee Word-documenten voor de organisatoren (Drive opent ze in Google Docs):
//   07 Te beslissen (Roland en Jean).docx en 08 Draaiboek.docx
//   NODE_PATH=<map met node_modules/docx> node scripts/organisatie-docs.js <uitmap>
const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = require("docx");
const uit = process.argv[2] || ".";

const RED = "9B111E", DARK = "1A1A1A", GREY = "555555", SERIF = "Georgia", SANS = "Arial";
const t = (text, o = {}) => new TextRun({ text, font: SANS, size: 20, color: DARK, ...o });
const b = (text, o = {}) => t(text, { bold: true, ...o });
const g = (text) => t(text, { color: GREY });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs)], spacing: { after: 80, line: 264 }, ...o });
const h = (text) => new Paragraph({ children: [new TextRun({ text: text.toUpperCase(), font: SERIF, bold: true, size: 24, color: RED, characterSpacing: 30 })],
  spacing: { before: 240, after: 80 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 2 } } });
const h3 = (text) => new Paragraph({ children: [new TextRun({ text, font: SERIF, bold: true, size: 21, color: DARK })], spacing: { before: 140, after: 40 } });
const bullet = (runs) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs)], bullet: { level: 0 }, spacing: { after: 40, line: 252 } });
const vink = (runs) => new Paragraph({ children: [t("☐  "), ...(Array.isArray(runs) ? runs : [t(runs)])], spacing: { after: 50, line: 252 }, indent: { left: 200 } });
const titel = (kop, sub) => [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new TextRun({ text: "DE KRONIEKEN VAN HET VERGETEN WEEKEND", font: SERIF, bold: true, size: 20, color: RED, characterSpacing: 50 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: kop, font: SERIF, bold: true, size: 40, color: DARK })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: sub, font: SERIF, italics: true, size: 21, color: GREY })] }),
];
const rand = { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" };
const tabel = (kop, rijen, breedtes) => new Table({ width: { size: 9800, type: WidthType.DXA }, columnWidths: breedtes,
  borders: { top: rand, bottom: rand, left: rand, right: rand, insideHorizontal: rand, insideVertical: rand },
  rows: [new TableRow({ tableHeader: true, children: kop.map((k, i) => new TableCell({ width: { size: breedtes[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: "3A0A0E", color: "auto" },
      children: [p([b(k, { color: "FFFFFF", size: 18 })], { spacing: { after: 0 } })] })) }),
    ...rijen.map((r) => new TableRow({ children: r.map((c, i) => new TableCell({ width: { size: breedtes[i], type: WidthType.DXA }, children: [p([i === 0 ? b(c, { size: 18 }) : t(c, { size: 18 })], { spacing: { after: 0 } })] })) }))] });
const doc = (children) => new Document({ creator: "De Wachters van Bouillon", styles: { default: { document: { run: { font: SANS, size: 20 } } } },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children }] });

// ======================= 07 Te beslissen =======================
const beslissen = [
  ...titel("Te beslissen", "Roland en Jean · wat we minimaal moeten vastleggen voordat de link de deur uit gaat"),
  p([g("Vink af wat besloten is en zet de keuze erachter. Geef het daarna door aan Claude: dan staat het binnen een paar minuten in de app.")]),

  h("1. Wie krijgt welke rol"),
  p("Voorstel, afgeleid uit het thuiswerk. De rol blijft geheim tot de Eerste Dronk; het bevel (thuiswerk) noemt de rol niet."),
  tabel(["Wachter", "Rol", "Thuiswerk (bevel)", "Akkoord?"], [
    ["Robin", "The Firekeeper", "Vuurmeester: aanmaakhout voor alle haardvuren", ""],
    ["Martin", "The Brew Alchemist", "Drie keer cocktails voor iedereen", ""],
    ["Jeroen", "The Feastlord", "BBQ op de eerste avond (met Jean)", ""],
    ["Roy", "The Quartermaster", "Serieuze borrelplank", ""],
    ["Ivo", "High Priest of Hangover", "Worstenbroodjes bij het ontbijt, sauzen en frituurhapjes", ""],
    ["Stefan", "The Ranger", "Gymnastiek op zondagochtend, 1 à 2 uur", ""],
    ["Johan", "Warlord of Games", "Pubquiz / spel van een uur (met Geert)", ""],
    ["Geert", "Bard of the Hearth", "Pubquiz / spel van een uur (met Johan)", ""],
    ["Rob", "The Diplomat", "Hoeder van de Hall (organisatie)", ""],
    ["Jean", "The Shieldbearer", "BBQ op de eerste avond (met Jeroen) + organisatie", ""],
    ["Roland", "The Shadow Operative", "Hoeder van de Hall (organisatie)", ""],
  ], [1500, 2300, 4900, 1100]),
  vink("Rolverdeling akkoord (of aangepast in de tabel)."),
  vink("Thuiswerk definitief. Wijzigingen per persoon:"),

  h("2. Het huis"),
  vink([b("Akkoord eigenaar voor een vriendengroep. "), t("Het huis is ‘uitsluitend voor families’; met vrienden mag het alleen met goedkeuring van de eigenaar, anders kan hij bij aankomst de toegang weigeren.")]),
  vink([b("Frituurpan. "), t("Volgens de huurvoorwaarden niet toegestaan zonder akkoord. Vragen, of de frituur schrappen (Ivo’s frituurhapjes).")]),
  vink([b("Aankomsttijd doorgeven "), t("aan de contactpersoon, de avond ervoor (inchecken 16:00 tot 18:00).")]),
  vink([b("Wie is er als eerste? "), t("Iemand moet vóór de rest binnen zijn om de tv, de potten en de envelop klaar te zetten.")]),
  vink([b("Kamerindeling: "), t("wie verdeelt de kamers, op basis van de kamerwensen uit de app? 7 kamers met 2 bedden, 1 met 1 bed: minstens 3 kamers worden gedeeld.")]),

  h("3. De app en de link"),
  vink([b("Wanneer sturen we de link? "), t("Datum: ______. Iedereen krijgt zijn link (via de regie, ‘Persoonlijke links’) en zijn wachtwoord apart.")]),
  vink([b("Stap 2 "), t("(wat neem je mee, kamerwens, playlist) gaat nu open op vrijdag 6 november 09:00. Goed zo?")]),
  vink([b("Stap 3 "), t("(de Schaduw roert zich) gaat open op donderdag 12 november 19:00. Goed zo?")]),
  vink([b("Playlist: "), t("welke dienst (Spotify?), wie maakt hem, en de link.")]),
  vink([b("Herinneringen voor Akte I: "), t("tot wanneer mogen ze insturen? Schrijven wij er zelf ook een paar, voor wie er weinig krijgt?")]),

  h("4. De finale en het einde"),
  vink([b("Cadeaus in de kist: "), t("wat, budget, wie koopt.")]),
  vink([b("De kist en het cijferslot "), t("(code 7698): wie koopt ze, en waar staat de kist tijdens het weekend?")]),
  vink([b("Portretten voor de oorkondes: "), t("wie verzamelt van iedereen een goede foto, en is iedereen akkoord dat die via een AI-dienst geschilderd wordt?")]),
  vink([b("Oorkondes printen: "), t("wie, en waar (printshop of thuis, A4 kleur).")]),
  vink([b("Finale: "), t("zaterdagavond na de kasteeltocht, of zondagochtend?")]),

  h("5. Tijdens het weekend"),
  vink([b("Wie bedient de regie wanneer? "), t("Altijd één van ons drieën met de regie open.")]),
  vink([b("De verrader: "), t("wie kiest wie wanneer verrader is, en hoe lang (2, 4 of 6 uur)? ’s Nachts ‘Geen verrader’.")]),
  vink([b("Schaduw-events: "), t("hoe vaak per dag? Voorstel: 3 à 4 keer, verspreid.")]),
  vink([b("Kasteeltocht: "), t("tijd, tickets, fakkels (levert het kasteel ze?), en wie draagt de rugzak met relieken, shotglaasjes en drank.")]),
  vink([b("Eretitels zondag: "), t("wie beslist welke titel naar wie gaat? (Samen, of stemmen in de groep.)")]),
  vink([b("Laptop voor de tv: "), t("wiens laptop, en wie neemt de lange HDMI-kabel mee.")]),
  vink([b("Inkooplijst verdelen: "), t("‘Wie regelt’ invullen in 05 Inkooplijst.")]),
];

// ======================= 08 Draaiboek =======================
const R = (txt) => b(`“${txt}”`, { color: RED });
const draaiboek = [
  ...titel("Draaiboek", "Alleen voor de organisatoren · van het versturen van de link tot het vertrek op zondag"),
  p([g("Knoppen in de regie staan "), R("zo"), g(". De regie open je in de app (tab Regie) of los. De tv draait index.html?tv op de laptop: één keer erop klikken voor geluid, en inloggen met een van onze accounts.")]),

  h("Vooraf"),
  h3("Nu tot het versturen van de link"),
  bullet("07 Te beslissen afwerken met Jean; wijzigingen doorgeven aan Claude."),
  bullet("Inkopen volgens 05 Inkooplijst; ‘Wie regelt’ invullen."),
  bullet("Foto’s van iedereen verzamelen voor de portretten op de oorkondes."),
  bullet("Playlist aanmaken; link doorgeven aan Claude."),
  h3("De dag van versturen"),
  bullet([t("Regie → "), R("Persoonlijke links"), t(": per Wachter zijn link (WhatsApp of kopiëren). Het wachtwoord stuur je apart.")]),
  bullet("Wat ze zien: ‘Treed binnen’ (muziek en Godfried spreekt), de aftelling, hun bevel om open te breken en te aanvaarden, en de vraag om herinneringen."),
  bullet([t("Volgen in de regie → "), R("Voor het weekend"), t(": wie heeft aanvaard, hoeveel herinneringen, kamerwensen.")]),
  bullet("Wie na een paar dagen nog niets deed: even een duwtje via WhatsApp."),
  h3("Vrijdag 6 november, 09:00: stap 2 gaat vanzelf open"),
  bullet("Wat neem je mee, de kamerwens en de playlist verschijnen in de app."),
  bullet("Rond 9 november: kamerindeling maken op basis van de wensen en in de groepsapp zetten."),
  h3("Rond 10 november"),
  bullet("Herinneringen uit de regie doorgeven aan Claude: die komen in Akte I van de finale."),
  bullet("Portretten laten maken, oorkondes printen, in de envelop en verzegelen met lak."),
  bullet("Cijferslot op 7698 zetten en testen. Cadeaus in de kist."),
  h3("Donderdag 12 november"),
  bullet("19:00: stap 3 gaat vanzelf open: de Schaduwkoning neemt de app even over."),
  bullet("Aankomsttijd doorgeven aan de contactpersoon van het huis."),
  bullet("Inpakken: laptop + lader, HDMI-kabel, stekkerdozen, 4 potten met etiketten, fiches, questkaarten, regelboek, kaarsen, aanmaakhout, envelop, kist (op slot), rugzak met de 5 relieken, shotglaasjes + zakfles, powerbanks."),

  h("Vrijdag 13 november"),
  h3("Vóór 16:00 · de eerste organisator is binnen"),
  bullet("Laptop aan de tv, index.html?tv openen, inloggen, één keer klikken voor geluid. Regie op je telefoon: het lampje moet groen zijn."),
  bullet("Vier Zegel-potten op de schoorsteen, de verzegelde envelop ernaast."),
  bullet("Questkaarten op een stapel in de Guild Hall, regelboek op tafel."),
  bullet("Kist en relieken uit het zicht."),
  h3("16:00 tot 18:00 · aankomst"),
  bullet("De tv staat op het welkomstscherm met de aftelling. Iedereen installeert zich (kamerindeling)."),
  h3("Iedereen binnen · de start (± 45 min)"),
  bullet([t("Regie → "), R("Start verhaal"), t(": Godfried vertelt de proloog, de zegels verschijnen.")]),
  bullet("Godfried vraagt iedereen een drankje te halen; de tv wacht."),
  bullet([t("Alle glazen vol → "), R("Glazen vol: toost!"), t(": de Eerste Dronk, proost, elk Zegel +1.")]),
  bullet("De Guild Hall opent en de rollen breken open in de app. Godfried legt in vijf korte stukken uit hoe het werkt."),
  bullet([R("Volgende stap"), t(" slaat het lopende deel over als het moet.")]),
  h3("De avond"),
  bullet([t("Jeroen en Jean: het Vuurmaal (BBQ). Klaar → regie "), R("Voor het weekend"), t(" → "), R("Volbracht"), t(" bij beiden: +3 fiches.")]),
  bullet([t("Eerste verrader kiezen: regie → De Verrader → duur (2/4/6 uur) → naam. Alleen hij ziet het in zijn app.")]),
  bullet([t("Eén of twee keer "), R("De Schaduw beweegt"), t(": event voorlezen, dan "), R("Doorstaan"), t(", "), R("Gefaald"), t(" of de D20.")]),
  bullet("Quests doen, fiches in de potten, melden bij een hoeder: die zet ze met + op de tv."),
  bullet([t("Bij het slapengaan: "), R("Geen verrader (bijvoorbeeld 's nachts)"), t(".")]),

  h("Zaterdag 14 november"),
  h3("Ochtend"),
  bullet([t("Ontbijt met Ivo’s worstenbroodjes → "), R("Volbracht"), t(" bij Ivo.")]),
  bullet("Nieuwe verrader kiezen. Quests, een Schaduw-event."),
  h3("Middag"),
  bullet([t("De pubquiz van Johan en Geert (± 1 uur) → "), R("Volbracht"), t(" bij beiden.")]),
  bullet([t("Roy’s borrelplank → "), R("Volbracht"), t(". Martins cocktails (een van de drie); na de derde → "), R("Volbracht"), t(".")]),
  bullet("Wissel van verrader; nog een Schaduw-event."),
  h3("Avond · de Wachterstocht"),
  bullet([t("Vóór vertrek: regie → scherm "), R("Wachterstocht"), t(": de camera vliegt naar het kasteel, Godfried leest voor. De vijf opdrachten staan nu op ieders telefoon.")]),
  bullet("Mee: fakkels, shotglaasjes + zakfles, rugzak met relieken, powerbank, regie op een telefoon."),
  bullet([t("In het kasteel: elke gelukte opdracht afvinken in de regie (Wachterstocht) en het bijbehorende reliek uitdelen.")]),
  h3("Terug · de Reliekenkist"),
  bullet([t("Regie → "), R("Open de Reliekenkist"), t(": Godfried opent de kist, elk gevonden reliek rijst op. Elk reliek is in de finale één hint waard.")]),
  h3("De finale (± 1 uur)"),
  bullet([t("Regie → scherm "), R("Finale"), t(": de Schaduwkoning en Godfried openen, Akte I begint.")]),
  bullet([t("Antwoorden geven de spelers hardop; de regie tikt het antwoord aan (naam, getal of zegel). "), R("Hint (kost een reliek)"), t(" als ze vastzitten.")]),
  bullet([t("Een Zegel nog niet vol (12 fiches)? Dan eerst een beproeving; daarna "), R("Beproeving voltooid"), t(".")]),
  bullet([t("Akte III: de eed. Iedereen ziet zijn stuk in de app; staan ze goed en is hij uitgesproken → "), R("De eed is juist uitgesproken"), t(".")]),
  bullet("Elke akte laat een cijfer vallen: 7 · 6 · 9 · 8. Na het vierde opent de deur, het scherm wordt wit: de Schaduwkoning is verslagen."),
  bullet([t("Godfried: open de kist → cadeaus. Daarna regie → "), R("Kist is open: de envelop"), t(" → de envelop met de oorkondes.")]),
  bullet([R("Volgende stap"), t(" slaat in de finale het lopende deel over.")]),

  h("Zondag 15 november"),
  h3("Ochtend"),
  bullet([t("Stefans gymnastiek (1 à 2 uur) → "), R("Volbracht"), t(". Daarna de sauna of het stoombad?")]),
  bullet([t("Ontbijt · regie → scherm "), R("Ere"), t(": de eretitels één voor één ("), R("Volgende titel"), t("), naam intypen → "), R("Toon de winnaar"), t(".")]),
  h3("Opruimen en vertrek (uiterlijk 20:00)"),
  bullet("Volgens het huis: vegen, afwas, koelkast en vaatwasser leeg, afval sorteren, bedden afhalen, de BBQ schoonmaken. Anders gaat het van de borg (€600) af."),
  bullet("Spullen terug: laptop, kabels, potten, kist, relieken."),
];

(async () => {
  for (const [naam, inhoud] of [["07 Te beslissen (Roland en Jean).docx", beslissen], ["08 Draaiboek.docx", draaiboek]]) {
    fs.writeFileSync(path.join(uit, naam), await Packer.toBuffer(doc(inhoud))); console.log("✓", naam);
  }
})();
