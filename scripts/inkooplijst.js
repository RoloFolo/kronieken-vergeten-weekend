// Inkooplijst voor De Kronieken van het Vergeten Weekend → Excel (Drive opent hem in Google Sheets)
const ExcelJS = require("exceljs");
const uit = process.argv[2];
const L = [
  // [categorie, wat, aantal, waarvoor, opmerking]
  ["De kist", "Houten schatkist met beugel voor een hangslot", "1", "Finale: gaat open met de code van de tv, cadeaus erin", "Groot genoeg voor de cadeaus"],
  ["De kist", "Cijferhangslot, 4 cijfers, zelf in te stellen", "1", "Op de kist", "Code instellen op 7698"],
  ["De kist", "Cadeaus voor de groep", "?", "In de kist, na de overwinning", "Nog te bepalen"],
  ["Relieken", "Lantaarn (LED of kaars)", "1", "Reliek: De Lantaarn van het Kasteel", "Mee op de fakkeltocht"],
  ["Relieken", "Drinkhoorn", "1", "Reliek: De Hoorn van de Herberg", ""],
  ["Relieken", "Zwaard (decor of speelgoed)", "1", "Reliek: Het Zwaard van Broederschap", ""],
  ["Relieken", "Stuk wortelhout of grillige wortel", "1", "Reliek: De Wortel van de Wildernis", "Kan ook uit het bos"],
  ["Relieken", "Zwarte kaars", "1", "Reliek: De Kaars van Stilte", ""],
  ["Zegels", "Glazen potten of vazen", "4", "De vier Zegels op de schoorsteen", "Etiketten: 03 Vaas-etiketten.pdf"],
  ["Zegels", "Fiches (houten munten of pokerchips)", "150", "In de Zegel-potten bij elke quest", "12 per Zegel opent zijn akte"],
  ["Zegels", "Stickervel A4 (wit of kraft)", "1", "Vaas-etiketten printen", ""],
  ["Envelop", "Grote envelop (kraft of perkament)", "1", "Staat het hele weekend op de schoorsteen", ""],
  ["Envelop", "Zegellak + lakstempel", "1", "Envelop verzegelen", ""],
  ["Envelop", "Perkamentpapier A4", "30 vel", "Oorkondes en eretitels", "Oorkondes nog te maken"],
  ["Printwerk", "Stevig papier A4 (250 g)", "20 vel", "02 Questkaarten (dubbelzijdig)", "40 kaarten, daarna snijden"],
  ["Printwerk", "Regelboek printen", "2", "01 Regelboek.pdf", "Eén voor de tafel, één reserve"],
  ["Printwerk", "Schaduw-events printen", "1", "04 Schaduw-events (alleen organisatoren)", "Niet laten slingeren"],
  ["Events & quests", "Kaarsen (waxinelichtjes + dinerkaarsen)", "30 + 6", "Kring van Kaarsen, Sfeermeesters, Schaduwspel", ""],
  ["Events & quests", "Aanstekers / lucifers", "3", "Kaarsen en vuur", ""],
  ["Events & quests", "Haardhout + aanmaakblokjes", "", "Vuurwacht, Brandmeesters, Laatste Wacht", "Eerst checken wat het huisje heeft"],
  ["Events & quests", "Pennen + blokje papier", "11 + 1", "Offer aan de Vlam, De Biecht", ""],
  ["Events & quests", "Twee schalen", "2", "Hongerige Schaduw, Schaal der Stilte", "Mag uit het huisje"],
  ["Events & quests", "Blinddoek", "1", "Voorproever van de Koning", ""],
  ["Events & quests", "A3-papier + stiften", "2 vel", "Het Wapenschild", ""],
  ["Events & quests", "Kaart- of bordspel", "1", "Het Toernooi", "Neemt iemand er een mee?"],
  ["Events & quests", "Ingrediënten duister elixer", "", "Het Elixer der Duisternis", "Bijv. cassis, cola, grenadine, iets vreemds"],
  ["Techniek", "Laptop voor de tv", "1", "De tv draait index.html?tv", "Geluid via tv, eerst één keer klikken"],
  ["Techniek", "HDMI-kabel, lang (5 m)", "1", "Laptop naar tv", ""],
  ["Techniek", "Stekkerdoos + verlengsnoer", "2", "Laptop, telefoons laden", ""],
  ["Fakkeltocht", "Fakkels", "11", "Zaterdagavond kasteel", "Eerst checken of het kasteel ze levert"],
];
(async () => {
  const wb = new ExcelJS.Workbook(); wb.creator = "De Kronieken";
  const ws = wb.addWorksheet("Inkooplijst", { views: [{ state: "frozen", ySplit: 3 }] });
  ws.columns = [{ width: 18 }, { width: 46 }, { width: 10 }, { width: 46 }, { width: 16 }, { width: 16 }, { width: 11 }, { width: 40 }];
  ws.mergeCells("A1:H1"); ws.getCell("A1").value = "Inkooplijst · De Kronieken van het Vergeten Weekend (13 tot 15 november)";
  ws.getCell("A1").font = { bold: true, size: 15, color: { argb: "FF7A1016" } };
  ws.mergeCells("A2:H2"); ws.getCell("A2").value = "Zet bij Status wat er gekocht is en vul in wie het regelt. Alleen voor de organisatoren: hier staan de relieken en de kist in.";
  ws.getCell("A2").font = { italic: true, color: { argb: "FF6E5230" } };
  const kop = ws.getRow(3); kop.values = ["Categorie", "Wat", "Aantal", "Waarvoor", "Wie regelt", "Status", "Prijs (€)", "Opmerking"];
  kop.eachCell((c) => { c.font = { bold: true, color: { argb: "FFFBE3B4" } }; c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF3A0A0E" } }; c.alignment = { vertical: "middle" }; });
  kop.height = 20;
  let vorige = "";
  L.forEach(([cat, wat, n, voor, opm], i) => {
    const r = ws.addRow([cat === vorige ? "" : cat, wat, n, voor, "", "Nog kopen", null, opm]); vorige = cat;
    r.getCell(1).font = { bold: true, color: { argb: "FF7A1016" } };
    r.alignment = { vertical: "top", wrapText: true };
    if (i % 2) r.eachCell({ includeEmpty: true }, (c) => { c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF7F0E6" } }; });
    r.getCell(6).dataValidation = { type: "list", allowBlank: true, formulae: ['"Nog kopen,Gekocht,Hebben we al,Niet nodig"'] };
    r.getCell(7).numFmt = '€ #,##0.00';
  });
  const eind = ws.rowCount;
  const tot = ws.addRow(["", "Totaal", "", "", "", "", { formula: `SUM(G4:G${eind})` }, ""]);
  tot.font = { bold: true }; tot.getCell(7).numFmt = '€ #,##0.00';
  ws.autoFilter = { from: "A3", to: `H${eind}` };
  ws.addConditionalFormatting({ ref: `F4:F${eind}`, rules: [
    { type: "containsText", operator: "containsText", text: "Gekocht", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFCDEBC5" } } } },
    { type: "containsText", operator: "containsText", text: "Hebben we al", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFDCE7F3" } } } },
    { type: "containsText", operator: "containsText", text: "Nog kopen", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFF8DDD8" } } } },
  ] });
  await wb.xlsx.writeFile(uit); console.log("ok", L.length, "regels");
})();
