// Inkooplijst voor De Kronieken van het Vergeten Weekend → Excel (Drive opent hem in Google Sheets).
// Nagelopen tegen alle onderdelen: de Wachterstocht, de 26 Schaduw-events, de 42 quests, de rollen, de finale, het
// einde en de eretitels. Wat de organisatoren al invulden (status, wie, prijs, opmerking) blijft per regel staan.
//   node scripts/inkooplijst.js <uit.xlsx> [bestaande.xlsx]   (exceljs nodig)
const ExcelJS = require("exceljs");
const [uit, oud] = process.argv.slice(2);
const L = [
  // [categorie, wat, aantal, waarvoor, opmerking]
  ["Kist & einde", "Houten schatkist met beugel voor een hangslot", "1", "Finale: gaat open met de code van de tv, cadeaus erin", "Groot genoeg voor de cadeaus"],
  ["Kist & einde", "Cijferhangslot, 4 cijfers, zelf in te stellen", "1", "Op de kist", "Code instellen op 7698"],
  ["Kist & einde", "Bouillonblokjes (flink wat)", "1", "De schat van Bouillon: de kist zit er vol mee", "Voor de grap, in plaats van goud"],
  ["Kist & einde", "Cadeautje per Wachter", "11", "In de kist, na de overwinning", "Nog te bepalen"],
  ["Relieken", "Lantaarn (LED of kaars)", "1", "Reliek: De Lantaarn van het Kasteel", "Relieken blijven thuis: uitdelen bij de Reliekenkist"],
  ["Relieken", "Drinkhoorn", "1", "Reliek: De Hoorn van de Herberg", ""],
  ["Relieken", "Zwaard (decor of speelgoed)", "1", "Reliek: Het Zwaard van Broederschap", ""],
  ["Relieken", "Stuk wortelhout of grillige wortel", "1", "Reliek: De Wortel van de Wildernis", "Kan ook uit het bos"],
  ["Relieken", "Zwarte kaars", "1", "Reliek: De Kaars van Stilte", ""],
  ["Kasteeltocht", "Shotglaasjes", "12", "De Dronk van de Kruisvaarder (toost in het kasteel), ook voor het Elixer", "Onbreekbaar is handig onderweg"],
  ["Kasteeltocht", "Zakfles of klein flesje drank + iets zonder alcohol", "1 + 1", "De Dronk van de Kruisvaarder", "In de rugzak van één van ons drieën"],
  ["Kasteeltocht", "Powerbank", "2", "Regie-telefoon (opdrachten afvinken) en foto's tijdens de tocht", ""],
  ["Zegels & kaarten", "Glazen potten of vazen", "4", "De vier Zegels op de schoorsteen", "Etiketten: 03 Vaas-etiketten.pdf"],
  ["Zegels & kaarten", "Fiches (houten munten of pokerchips)", "150", "In de Zegel-potten bij elke quest", "12 per Zegel opent zijn akte"],
  ["Zegels & kaarten", "Stickervel A4 (wit of kraft)", "1", "Vaas-etiketten printen", ""],
  ["Zegels & kaarten", "Twee bakjes of mandjes", "2", "Questkaarten-stapel en aflegstapel", ""],
  ["Printwerk", "Stevig papier A4 (250 g)", "12 vel", "02 Questkaarten (dubbelzijdig)", "42 quests + 12 lege = 54 kaarten (6 vel voor, 6 achter), daarna snijden"],
  ["Printwerk", "Regelboek printen", "2", "01 Regelboek.pdf", "Eén voor de tafel, één reserve"],
  ["Printwerk", "Schaduw-events printen", "1", "04 Schaduw-events (alleen organisatoren)", "Niet laten slingeren"],
  ["Vuur & sfeer", "Kaarsen (waxinelichtjes + dinerkaarsen)", "30 + 6", "Kring van Kaarsen, Sfeermeesters, De Laatste Wacht", ""],
  ["Vuur & sfeer", "Aanstekers / lucifers", "3", "Kaarsen en vuur", ""],
  ["Vuur & sfeer", "Aanmaakhout + aanmaakblokjes", "", "Alle haardvuren", "Houtblokken zitten bij het huis (in de €200 bijkomende kosten), aanmaak niet"],
  ["Vuur & sfeer", "Vuurkorf of vuurschaal", "1", "Kampvuurverhaal buiten", "Niet nodig: twee open haarden. Volgens de huurvoorwaarden niet toegestaan zonder akkoord eigenaar"],
  ["Vuur & sfeer", "Zaklamp of losse lamp", "1", "Schaduwspel (één lamp aan)", ""],
  ["Vuur & sfeer", "Lichtslinger of LED-lantaarns", "1–2", "Sfeermeesters, Het Buitenkamp", "Optioneel"],
  ["Vuur & sfeer", "Bluetooth-speaker", "1", "Lied van de Schaduw, Sfeermeesters, de Bard", "Neemt iemand er een mee?"],
  ["Events & quests", "Pennen + blokje papier", "11 + 1", "Offer aan de Vlam, De Biecht", ""],
  ["Events & quests", "Kom of hoed voor de briefjes", "1", "De Biecht (anoniem)", "Mag uit het huisje"],
  ["Events & quests", "Twee schalen", "2", "De Hongerige Schaduw, De Schaal der Stilte", "Mag uit het huisje"],
  ["Events & quests", "Ingrediënten voor elixers", "", "Het Elixer der Duisternis, Het Elixer, Instabiel Mengsel (Alchemist)", "Bijv. cassis, cola, grenadine, gember, iets vreemds"],
  ["Events & quests", "Serveerplank", "1", "De Legendarische Borrelplank (Robin en Geert)", "Mag uit het huisje"],
  ["Events & quests", "Telefoonstatief met afstandsbediening", "1", "De Groepsfoto, De Influencer, foto’s voor de aftiteling", ""],
  ["Buiten", "Fleecedekens", "4–6", "Het Buitenkamp, De Rustbrengers", "Optioneel"],
  ["LARP", "Extra props om aan te vullen", "", "Voor wie iets mist in zijn gedaante", "Iedereen neemt zelf props mee; wij vullen aan (zie 10 LARP). Stefan weet dit niet."],
  ["Finale", "Zak veren", "1", "Akte I: pek en veren voor wie geen gênant moment instuurde", "Kussenveren of carnavalsveren"],
  ["Finale", "Schandbord met touw", "1", "Akte I: om de nek aan de schandpaal (‘Ik liet het vuur leeg’)", ""],
  ["Eten & drinken", "Hete Sep (fles)", "1", "Shotjes bij het vuur, op de tocht en bij de toost", "Samen met de shotglaasjes"],
  ["Eten & drinken", "Frituurpan (+ sauzen en frituurhapjes: Roy)", "1", "Frituur in het weekend", "Akkoord van de eigenaar (18 oktober)"],
  ["Buiten", "Thermoskan + to-go bekers", "1 + 11", "De Ochtendmars, Het Buitenkamp (iets warms)", ""],
  ["Eten & drinken", "Koffie, thee, melk, suiker", "", "Koffie voor de Wacht, De Hersteller, De Ochtendmars", "Naast de gewone boodschappen"],
  ["Eten & drinken", "Snacks en hapjes", "", "De Hongerige Schaduw, en gewoon trek", "Naast de gewone boodschappen"],
  ["Eten & drinken", "Drank voor De Eerste Dronk", "", "De toost bij de start (vrijdag)", "Optioneel: iets feestelijks, bijv. bubbels"],
  ["Eten & drinken", "Kater-kit: paracetamol, ORS-zakjes", "1", "De Hersteller, de Battle Healer", "Optioneel, wel handig"],
  ["Ere van de Wachters", "Medailles of lintjes", "15", "De eretitels, direct na de finale", "Optioneel"],
  ["Techniek", "Laptop voor de tv", "1", "De tv draait index.html?tv", "Jean regelt; geluid via tv of speaker, eerst één keer klikken"],
  ["Techniek", "Beamer of tv", "1", "Het grote scherm", "Jean regelt (Stefan heeft een beamer)"],
  ["Techniek", "HDMI-kabel, lang (5 m)", "1", "Laptop naar tv", ""],
  ["Techniek", "Stekkerdoos + verlengsnoer", "2", "Laptop, telefoons laden", ""],
];
(async () => {
  // what the organisers already filled in, per item
  const eerder = {};
  if (oud) {
    const o = new ExcelJS.Workbook(); await o.xlsx.readFile(oud);
    o.worksheets[0].eachRow((r, i) => { if (i < 4) return; const v = (n) => { const x = r.getCell(n).value; return x && x.result !== undefined ? x.result : x; };
      if (v(2)) eerder[String(v(2)).trim()] = { wie: v(5), status: v(6), prijs: v(7), opm: v(8) }; });
  }
  const wb = new ExcelJS.Workbook(); wb.creator = "De Kronieken";
  const ws = wb.addWorksheet("Inkooplijst", { views: [{ state: "frozen", ySplit: 3 }] });
  ws.columns = [{ width: 20 }, { width: 46 }, { width: 10 }, { width: 50 }, { width: 16 }, { width: 16 }, { width: 11 }, { width: 42 }];
  ws.mergeCells("A1:H1"); ws.getCell("A1").value = "Inkooplijst · De Kronieken van het Vergeten Weekend (13 tot 15 november)";
  ws.getCell("A1").font = { bold: true, size: 15, color: { argb: "FF7A1016" } };
  ws.mergeCells("A2:H2"); ws.getCell("A2").value = "Zet bij Status wat er gekocht is en vul in wie het regelt. Alleen voor de organisatoren: hier staan de relieken en de kist in.";
  ws.getCell("A2").font = { italic: true, color: { argb: "FF6E5230" } };
  const kop = ws.getRow(3); kop.values = ["Categorie", "Wat", "Aantal", "Waarvoor", "Wie regelt", "Status", "Prijs (€)", "Opmerking"];
  kop.eachCell((c) => { c.font = { bold: true, color: { argb: "FFFBE3B4" } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3A0A0E" } }; });
  let vorige = "";
  L.forEach(([cat, wat, n, voor, opm], i) => {
    const e = eerder[wat] || {};
    const r = ws.addRow([cat === vorige ? "" : cat, wat, n, voor, e.wie ?? "", e.status || "Nog kopen", e.prijs ?? null, e.opm || opm]); vorige = cat;
    r.getCell(1).font = { bold: true, color: { argb: "FF7A1016" } };
    r.alignment = { vertical: "top", wrapText: true };
    if (i % 2) r.eachCell({ includeEmpty: true }, (c) => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF7F0E6" } }; });
    r.getCell(6).dataValidation = { type: "list", allowBlank: true, formulae: ['"Nog kopen,Gekocht,Hebben we al,Niet nodig"'] };
    r.getCell(7).numFmt = "€ #,##0.00";
  });
  const eind = ws.rowCount;
  const tot = ws.addRow(["", "Totaal", "", "", "", "", { formula: `SUM(G4:G${eind})` }, ""]);
  tot.font = { bold: true }; tot.getCell(7).numFmt = "€ #,##0.00";
  ws.autoFilter = { from: "A3", to: `H${eind}` };
  ws.addConditionalFormatting({ ref: `F4:F${eind}`, rules: [
    { type: "containsText", operator: "containsText", text: "Gekocht", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFCDEBC5" } } } },
    { type: "containsText", operator: "containsText", text: "Hebben we al", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFDCE7F3" } } } },
    { type: "containsText", operator: "containsText", text: "Nog kopen", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFF8DDD8" } } } },
  ] });
  await wb.xlsx.writeFile(uit);
  const behouden = L.filter(([, wat]) => eerder[wat] && (eerder[wat].status !== "Nog kopen" || eerder[wat].wie || eerder[wat].prijs)).map(([, wat]) => `${wat}: ${eerder[wat].status}`);
  console.log("ok", L.length, "regels; behouden:", behouden.join("; ") || "niets");
})();
