// Word-documenten voor de organisatoren (Drive opent ze in Google Docs):
//   07 Te beslissen (Roland en Jean).docx, 08 Draaiboek.docx en 09 Voorstel rollen en bevelen.docx
//   NODE_PATH=<map met node_modules/docx> node scripts/organisatie-docs.js <uitmap> [drive-id van 09]
// Links naar Drive: de bestands-id's staan in DRIVE hieronder (uit Drive voor desktop).
const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType, ExternalHyperlink } = require("docx");
const uit = process.argv[2] || ".", id09 = process.argv[3];
// the game's own data, so the proposal always matches the app
const window = {};
for (const f of ["docs/a/wachters.js", "docs/a/spel.js", "docs/a/rollen.js", "docs/a/voorbereiding.js", "docs/a/godfried.js"]) new Function("window", fs.readFileSync(f, "utf8"))(window);
const MAP = "https://drive.google.com/drive/folders/1FJUsB9lG6EUKs259WFvBJNlG6j9cnCbs";
const DRIVE = { regelboek: "1Wpr279heSIT6yY2cL_ALbwKQOWWMmRqB", quest: "1ebjPtYkd6h69bTEwKr4_qnuZOgAj3qPd", vazen: "1oUUujWSRr-GjEB6VVQaembryzX3fqx7y", events: "1Jr9KumPcp5D-gHzGPHV5PdjvpTeecEbZ",
  inkoop: "1JMOMei8Rr08NfGZenpfNYVDJVBqOBriz", oorkondes: "1Zx7AlLBu0Szv6rcqVtLA4_ZpjckNfw25", beslissen: "1Eg2n3zOABEqqCdzFw98U0f_WTr3Lfhoe", draaiboek: "17o0So7Nxj_X1A56jd_kS6BdGP0CSh-K7", rollen: id09 || "1l4vN127UdeucNiHCmPq4hrauTzA2oVhu" };
const drive = (k) => DRIVE[k] ? `https://drive.google.com/file/d/${DRIVE[k]}/view` : MAP;
const SITE = "https://naberiusgames.com/kronieken-vergeten-weekend/";

const RED = "9B111E", DARK = "1A1A1A", GREY = "555555", SERIF = "Georgia", SANS = "Arial";
const t = (text, o = {}) => new TextRun({ text, font: SANS, size: 20, color: DARK, ...o });
const b = (text, o = {}) => t(text, { bold: true, ...o });
const g = (text) => t(text, { color: GREY });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs)], spacing: { after: 80, line: 264 }, ...o });
const h = (text) => new Paragraph({ children: [new TextRun({ text: text.toUpperCase(), font: SERIF, bold: true, size: 24, color: RED, characterSpacing: 30 })],
  spacing: { before: 240, after: 80 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 2 } } });
const h3 = (text) => new Paragraph({ children: [new TextRun({ text, font: SERIF, bold: true, size: 21, color: DARK })], spacing: { before: 140, after: 40 } });
const bullet = (runs) => new Paragraph({ children: Array.isArray(runs) ? runs : [t(runs)], bullet: { level: 0 }, spacing: { after: 40, line: 252 } });
const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: SANS, size: 20, color: "1F5FBF", underline: {} })] });
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

// ======================= 09 Voorstel rollen en bevelen =======================
const ZEGEL = { vlam: "Vlam van Waakzaamheid", hoorn: "Hoorn van Overvloed", schild: "Schild van Broederschap", hart: "Hart van de Ardennen" };
const rolVan = (naam) => window.ROLLEN.find((r) => r.id === window.ROL_VAN[naam]);
const voorstel = [
  ...titel("Voorstel rollen en bevelen", "Voor Roland en Jean · wie welke rol krijgt, wat die rol kan, en zijn bevel (thuiswerk) vooraf"),
  p([g("Zo staat het nu in de app. De rol blijft geheim tot de Eerste Dronk; het bevel krijgt iedereen al bij het versturen van de link en noemt de rol niet. Wie zijn bevel in het weekend volbrengt, krijgt 3 fiches voor het genoemde Zegel (regie → Voor het weekend → Volbracht). Wijzigingen? Geef ze door aan Claude.")]),
  h("In één oogopslag"),
  tabel(["Wachter", "Gedaante", "Rol", "Zegels", "Bevel"], window.WACHTERS.map((w) => { const r = rolVan(w.naam), bv = window.VOORAF.bevelen[w.naam], k = window.KARAKTER?.[w.naam];
    return [w.naam, k ? `${k.ras} ${k.klasse}` : "?", r ? `${r.naam} · ${r.titel}` : "?", r ? r.zegels.map((z) => ZEGEL[z].split(" ")[0]).join(", ") : "", bv ? `${bv.titel} (+3 ${ZEGEL[bv.zegel].split(" ")[0]})` : "–"]; }), [1200, 1700, 2900, 1300, 2700]),
  h("Per Wachter"),
  ...window.WACHTERS.flatMap((w) => { const r = rolVan(w.naam), bv = window.VOORAF.bevelen[w.naam]; if (!r) return [];
    const k = window.KARAKTER?.[w.naam];
    return [h3(`${w.naam} — ${r.naam} (${r.titel})`), ...(k ? [p([b("Gedaante: "), t(`${k.ras} ${k.klasse}. Kostuumideeën: ${k.props}.`)])] : []), p([t(r.tekst, { italics: true })]),
      bullet([b("Zegels: "), t(r.zegels.map((z) => ZEGEL[z]).join(" en ") + " (een quest voor een van deze: 1 extra fiche)")]),
      bullet([b(`Passief, ${r.passief[0]}: `), t(r.passief[1])]),
      bullet([b(`Kracht (1× per dag), ${r.kracht[0]}: `), t(r.kracht[1])]),
      bullet([b("Stuk van de eed: "), t(`“${window.SPEL?.eed?.fragmenten?.[r.eed] ?? "?"}”`)]),
      ...(bv ? [bullet([b(`Bevel, ${bv.titel}: `), t(bv.tekst)])] : [])]; }),
];

// ======================= 07 Te beslissen =======================
const beslissen = [
  ...titel("Te beslissen", "Roland en Jean · wat we minimaal moeten vastleggen voordat de link de deur uit gaat"),
  p([g("Vink af wat besloten is en zet de keuze erachter. Geef het daarna door aan Claude: dan staat het binnen een paar minuten in de app.")]),

  h("Op Drive"),
  p([t("Alles staat in de map "), link("Speelmateriaal (Claude)", MAP), t(":")]),
  bullet([link("09 Voorstel rollen en bevelen", drive("rollen")), g(" · wie welke rol krijgt, wat die kan, en zijn bevel")]),
  bullet([link("08 Draaiboek", drive("draaiboek")), g(" · van de link versturen tot het vertrek op maandag")]),
  bullet([link("05 Inkooplijst", drive("inkoop")), g(" · wat er gekocht moet worden, met ‘Wie regelt’")]),
  bullet([link("04 Schaduw-events", drive("events")), g(" · alle events, alleen voor ons")]),
  bullet([link("01 Regelboek", drive("regelboek")), g(" · "), link("02 Questkaarten", drive("quest")), g(" · "), link("03 Vaas-etiketten", drive("vazen"))]),
  p([t("De app: "), link("persoonlijke pagina", SITE + "wachter.html"), t(" · "), link("regie", SITE + "regie-8d785a0dfd.html"), t(" · "), link("tv", SITE + "index.html?tv")]),

  h("1. Wie krijgt welke rol"),
  p([t("Voorstel, afgeleid uit het thuiswerk; alles over de rollen in "), link("09 Voorstel rollen en bevelen", drive("rollen")), t(".")]),
  tabel(["Wachter", "Rol", "Thuiswerk (bevel)", "Akkoord?"], window.WACHTERS.map((w) => { const r = rolVan(w.naam), bv = window.VOORAF.bevelen[w.naam];
    return [w.naam, r ? r.naam : "?", bv ? bv.titel : "–", ""]; }), [1500, 2600, 4600, 1100]),
  vink("Rolverdeling akkoord (of aangepast in de tabel)."),
  vink("Thuiswerk definitief. Wijzigingen per persoon:"),

  h("2. Het huis"),
  p([g("Frituurpan: akkoord van de eigenaar (18 oktober).")]),
  p([g("Akkoord van de eigenaar voor een vriendengroep: geregeld.")]),
  vink([b("Aankomsttijd: "), t("mogelijk eerder dan 16:00; volgt zo snel mogelijk. Daarna doorgeven aan de contactpersoon.")]),
  vink([b("Vertrek maandag: "), t("de uitchecktijd volgt nog.")]),
  p([g("Als eerste binnen: Roland, Rob en Jean. Stefan neemt een beamer mee.")]),

  h("3. Gedaanten en de LARP"),
  p([t("Iedereen krijgt vooraf zijn ras en class (en de bevelhouders hun bevel), met de uitdaging om verkleed te komen en het hele weekend in zijn rol te blijven. Alles per Wachter in "), link("10 LARP: gedaanten en props", MAP), t(".")]),
  p([g("Wie het best in zijn rol blijft, komt in de aftiteling (regie → Ere → ‘Het best in hun rol’). Geen andere prijzen.")]),
  vink([b("Bevelbonus: "), t("blijft het +3 fiches per volbracht bevel? Nu voedt elk Zegel twee bevelen.")]),
  vink([b("Props aanvullen: "), t("iedereen neemt zelf props mee; wij vullen aan. Wie regelt wat (zie 10)? Stefan weet hier niets van.")]),
  p([g("Budget eerste avondmaal (Jeroen): ± € 250, meer op aanvraag.")]),

  h("4. De app en de link"),
  vink([b("De link versturen: "), t("binnen drie dagen (uiterlijk 21 oktober). Iedereen krijgt zijn link (regie → ‘Persoonlijke links’) en zijn wachtwoord apart.")]),
  p([g("Stap 2 (wat neem je mee, met je kostuum bovenaan) gaat open op vrijdag 6 november 09:00. Stap 3 (de Schaduw roert zich) op donderdag 12 november 19:00. Geen playlist.")]),
  p([g("Akte I: iedereen stuurt minstens één eigen gênant moment in; het vuur toont ze en de groep raadt van wie. Wie niets instuurt, gaat aan de schandpaal: pek en veren, en hij vertelt zijn moment ter plekke.")]),
  vink([b("Schandpaal: "), t("een zak veren en een schandbord (‘Ik liet het vuur leeg’) staan op de inkooplijst. Wie regelt ze?")]),

  h("5. Samen testen"),
  p("Vóór het versturen testen we de app en de tv samen. Zo speelt Jean als gewone Wachter:"),
  bullet([t("Jean opent "), link("zijn persoonlijke pagina", SITE + "wachter.html#jean"), t(" op zijn telefoon en logt in.")]),
  bullet([t("Onderaan: "), b("‘Test: speel als gewone Wachter (regie verbergen)’"), t(". Het Regie-tabblad verdwijnt; terugzetten kan met dezelfde knop.")]),
  bullet([t("Stap 2 en 3 nu al bekijken: zet "), b("?stap=2"), t(" of "), b("?stap=3"), t(" voor het hekje, bijvoorbeeld wachter.html?stap=3#jean. Met "), b("?opnieuw"), t(" verschijnen het zegel en de overname van de Schaduw opnieuw.")]),
  bullet([t("De tv: "), link("index.html?tv", SITE + "index.html?tv"), t(" op de laptop, inloggen, één keer klikken voor geluid. Roland bedient de regie.")]),
  bullet("Na het testen: gênante momenten die Jean als test instuurde, verwijdert hij zelf in de app (het kruisje). Op de regie → Beheer → ‘Hele spel opnieuw beginnen’ zet de tv weer op nul."),
  vink([b("Testdatum: "), t("______. Feedback daarna aan Claude.")]),

  h("6. De finale en het einde"),
  p([t("De finale is "), b("zondag rond 14:00"), t(". Zie het "), link("draaiboek", drive("draaiboek")), t(".")]),
  p([g("De kist en het cijferslot (7698) hebben we: Jean neemt ze mee. De kist gaat vol bouillonblokjes (de schat van Bouillon) met een cadeautje voor iedereen; dat staat op de inkooplijst. Oorkondes en envelop vervallen.")]),
  p([g("Direct na de finale volgen de eretitels en de aftiteling. De regie wijst de titels vooraf toe en kan tijdens het weekend titels, momenten en uitspraken toevoegen. We houden echte scores bij (regie → Punt geven of afnemen); het klassement en de sluwste verraders komen pas in de aftiteling.")]),
  vink([b("Cadeautje per Wachter: "), t("wat wordt het, en wie koopt? (zie inkooplijst)")]),

  h("7. Tijdens het weekend"),
  p([g("De regie: vooral Jean en Roland; Rob krijgt van ons aan wat hij kan doen.")]),
  p([g("De verrader: bepalen wij zelf, wie en wanneer.")]),
  p([g("Schaduw-events: bepalen we zelf, en de verrader kan er ook een oproepen. Alle events in 04 Schaduw-events.")]),
  p([g("Kasteeltocht: geregeld. Fakkels krijgen we daar. Eén van ons drieën draagt de rugzak met shotglaasjes en drank. De relieken blijven thuis: we delen ze uit bij de Reliekenkist.")]),
  p([g("Laptop, beamer of tv, HDMI-kabel en bluetooth-speaker: Jean.")]),
  vink([b("Inkooplijst verdelen: "), t("‘Wie regelt’ invullen in "), link("05 Inkooplijst", drive("inkoop")), t(".")]),
];

// ======================= 08 Draaiboek =======================
const R = (txt) => b(`“${txt}”`, { color: RED });
const volbracht = (wie) => [t(" → regie "), R("Voor het weekend"), t(" → "), R("Volbracht"), t(` bij ${wie}: +3 fiches.`)];
const draaiboek = [
  ...titel("Draaiboek", "Alleen voor de organisatoren · van het versturen van de link tot het vertrek op maandag"),
  p([g("Knoppen in de regie staan "), R("zo"), g(". De regie open je in de app (tab Regie) of "), link("los", SITE + "regie-8d785a0dfd.html"), g(". De tv draait "), link("index.html?tv", SITE + "index.html?tv"), g(" op de laptop: één keer erop klikken voor geluid, en inloggen met een van onze accounts. Wat er moet worden besloten staat in "), link("07 Te beslissen", drive("beslissen")), g(".")]),

  h("Vooraf"),
  h3("Nu tot het versturen van de link"),
  bullet([link("07 Te beslissen", drive("beslissen")), t(" afwerken met Jean; wijzigingen doorgeven aan Claude.")]),
  bullet("App en tv samen testen; Jean speelt als gewone Wachter (zie 07, Samen testen)."),
  bullet([t("Inkopen volgens "), link("05 Inkooplijst", drive("inkoop")), t("; ‘Wie regelt’ invullen.")]),
  bullet("Foto’s van iedereen in hun gedaante: Jean zet ze in de map Fotos."),
  h3("De dag van versturen"),
  bullet([t("Regie → "), R("Persoonlijke links"), t(": per Wachter zijn link (WhatsApp of kopiëren). Het wachtwoord stuur je apart.")]),
  bullet("Wat ze zien: ‘Treed binnen’ (muziek en Godfried spreekt), hun bevel om open te breken en te aanvaarden, hun gedaante, de aftelling, en de vraag om hun gênantste moment."),
  bullet([t("Volgen in de regie → "), R("Voor het weekend"), t(": wie heeft aanvaard, en wie nog geen gênant moment instuurde (rood).")]),
  bullet("Wie na een paar dagen nog niets deed: even een duwtje via WhatsApp."),
  h3("Vrijdag 6 november, 09:00: stap 2 gaat vanzelf open"),
  bullet("‘Wat neem je mee’ verschijnt in de app, met het kostuum bovenaan."),
  h3("Rond 10 november"),
  bullet("In de regie kijken wie nog geen gênant moment instuurde, en een duwtje geven. Akte I bouwt zich vanzelf uit wat er binnenkomt; wie niets instuurt, gaat aan de schandpaal."),
  bullet("Cijferslot op 7698 zetten en testen. Cadeaus in de kist."),
  h3("Donderdag 12 november"),
  bullet("19:00: stap 3 gaat vanzelf open: de Schaduwkoning neemt de app even over."),
  bullet("Aankomsttijd doorgeven aan de contactpersoon van het huis."),
  bullet("Inpakken: laptop + lader, HDMI-kabel, stekkerdozen, 4 potten met etiketten, fiches, questkaarten, regelboek, kaarsen, aanmaakhout, kist (op slot, vol bouillonblokjes en cadeautjes), de 5 relieken, rugzak met shotglaasjes en drank, powerbanks. Laptop, beamer of tv, HDMI-kabel en bluetooth-speaker: Jean."),

  h("Vrijdag 13 november"),
  h3("Vóór de rest · Roland, Rob en Jean zijn binnen"),
  bullet("Laptop aan de tv (of aan Stefans beamer), index.html?tv openen, inloggen, één keer klikken voor geluid. Regie op je telefoon: het lampje moet groen zijn."),
  bullet("Vier Zegel-potten met hun stroken op de schoorsteen."),
  bullet("De questkaarten in vier stapels (één per Zegel) in de Guild Hall, regelboek op tafel. Kist en relieken uit het zicht."),
  h3("16:00 · aankomst"),
  bullet("De tv staat op het welkomstscherm met de aftelling. Iedereen installeert zich en kleedt zich om."),
  h3("17:00 · de opening (± 45 min)"),
  bullet([t("Regie → "), R("Start verhaal"), t(": eerst stelt Godfried zich voor (Hoofdstuk I: hertog van Neder-Lotharingen, Bouillon, de Semois, 1096), dan leest hij zijn brief en verschijnen de zegels.")]),
  bullet("Godfried vraagt iedereen een drankje te halen; de tv wacht."),
  bullet([t("Alle glazen vol → "), R("Glazen vol: toost!"), t(": de Eerste Dronk, proost, elk Zegel +1.")]),
  bullet("De Guild Hall opent en de rollen breken open in de app. Godfried legt in vijf korte stukken uit hoe het werkt."),
  bullet([R("Volgende stap"), t(" slaat het lopende deel over als het moet.")]),
  h3("17:45 · borrel"),
  bullet([t("Robin en Geert: de Legendarische Borrelplank"), ...volbracht("beiden")]),
  bullet("De quests beginnen: fiches in de potten, melden bij een hoeder, die zet ze met + op de tv."),
  h3("19:00 · Quiz I"),
  bullet([R("Oproep"), t(" (de kerkklok roept iedereen naar het scherm), dan regie → Godfried → "), R("Quiz I"), t(": vier vragen, één per Zegel. Goed +1, fout −1. ± 10 min.")]),
  h3("19:15 · het Eerste Avondmaal"),
  bullet([t("Jeroen kookt (budget ± € 250)"), ...volbracht("Jeroen")]),
  h3("De avond"),
  bullet([t("Vrij: borrelen, sauna, quests. Eén of twee keer "), R("De Schaduw beweegt"), t(": event voorlezen, dan "), R("Doorstaan"), t(", "), R("Gefaald"), t(" of de D20.")]),

  h("Zaterdag 14 november"),
  h3("09:30 · ontbijt"),
  bullet([t("Martins Ochtendbooster"), t(" (één van zijn drie elixers).")]),
  h3("10:30 · Hoofdstuk II"),
  bullet([R("Oproep"), t(", dan regie → Godfried → "), R("Hoofdstuk II vertellen"), t(" (keizer Hendrik IV, broer Boudewijn, Bouillon verpand aan de prins-bisschop van Luik).")]),
  h3("11:00 · De Taveerne van het Lot (± 1 uur)"),
  bullet([t("Johan opent zijn middeleeuwse taveerne: gokken, drinken, dansen, knokken"), ...volbracht("Johan")]),
  h3("12:30 · lunch"),
  h3("13:30 · vrij"),
  bullet("Quests, sauna, wandelen langs de Semois. Af en toe een Schaduw-event."),
  h3("16:00 · De Proeverij van de Bard (± 1 uur)"),
  bullet([t("Ivo schenkt zijn wijnen, met muziek en bij elke wijn een verhaal"), ...volbracht("Ivo")]),
  h3("17:30 · Quiz II"),
  bullet([R("Oproep"), t(", dan regie → Godfried → "), R("Quiz II"), t(".")]),
  h3("18:00 · Meester van de Frituur"),
  bullet([t("Roy bakt: frites, snacks en sauzen, met bakmuts"), ...volbracht("Roy")]),
  h3("19:30 · de Wachterstocht"),
  bullet([t("Vóór vertrek: regie → scherm "), R("Wachterstocht"), t(": de camera vliegt naar het kasteel, Godfried leest voor. De vijf opdrachten staan nu op ieders telefoon.")]),
  bullet("Mee: Martins Vuur-elixer, de rugzak met shotglaasjes en drank (één van ons drieën), powerbank, regie op een telefoon. Fakkels krijgen we bij het kasteel."),
  bullet("In het kasteel: elke gelukte opdracht afvinken in de regie (Wachterstocht). De relieken blijven thuis."),
  h3("± 21:30 · terug: de Reliekenkist"),
  bullet([t("Regie → "), R("Open de Reliekenkist"), t(": Godfried opent de kist, elk gevonden reliek rijst op. Deel tegelijk de echte relieken uit. Elk reliek is in de finale één hint waard.")]),
  bullet([t("Daarna regie → Godfried → "), R("Hoofdstuk III vertellen"), t(": Jeruzalem 1099, de geweigerde kroon, zijn dood, Boudewijn koning. Nodig voor de quiz van zondag.")]),
  bullet("Rest van de avond vrij, met Martins Schaduw-elixer."),

  h("Zondag 15 november"),
  h3("09:30 · ontbijt"),
  h3("10:30 · Het Spel der Rollen (± 1 uur)"),
  bullet([t("Stefans LARP-sessie: iedereen in kostuum, ieder met een doel en een geheim"), ...volbracht("Stefan")]),
  h3("12:30 · lunch, laatste quests"),
  h3("13:30 · Quiz III"),
  bullet([R("Oproep"), t(", dan regie → Godfried → "), R("Quiz III"), t(": de laatste vier vragen sterken (of verzwakken) de Zegels vlak voor de finale.")]),
  h3("14:00 · de finale (± 1 uur)"),
  bullet([t("Regie → scherm "), R("Finale"), t(": de Schaduwkoning en Godfried openen, Akte I begint.")]),
  bullet([t("De spelers antwoorden hardop; de regie tikt het antwoord aan (naam, getal of zegel). "), R("Hint (kost een reliek)"), t(" als ze vastzitten.")]),
  bullet([t("Een Zegel nog niet vol (12 fiches)? Dan eerst een beproeving; daarna "), R("Beproeving voltooid"), t(".")]),
  bullet([t("Akte III: de eed. Iedereen ziet zijn stuk in de app; staan ze goed en is hij uitgesproken → "), R("De eed is juist uitgesproken"), t(".")]),
  bullet("Akte IV: de verraders van het weekend aanwijzen, periode voor periode."),
  bullet("Elke akte laat een cijfer vallen: 7 · 6 · 9 · 8. Na het vierde opent de deur, het scherm wordt wit: de Schaduwkoning is verslagen."),
  bullet([R("Volgende stap"), t(" slaat in de finale het lopende deel over.")]),
  h3("15:00 · de kist, de eer en de aftiteling (± 30 min)"),
  bullet([t("Godfried: open de kist → bouillonblokjes en een cadeautje voor iedereen. Dan regie → "), R("Kist is open: naar de eretitels"), t(": Godfried spreekt over eer, de titels spelen af.")]),
  bullet([t("Regie → Ere: "), R("Toon alle verraders op de tv"), t(", kies samen, "), R("Kroon"), t(" de Meester van de Schaduw. Dan "), R("Wie volgt?"), t(": 2 of 3 namen, "), R("Werp de D11"), t(".")]),
  bullet("De aftiteling rolt."),
  h3("Daarna · geen haast"),
  bullet("Sauna en stoombad, wandelen langs de Semois, uitrusten."),

  h("Maandag 16 november"),
  bullet("Ontbijt."),
  bullet("Opruimen volgens het huis: vegen, afwas, koelkast en vaatwasser leeg, afval sorteren, bedden afhalen, de BBQ schoonmaken. Anders gaat het van de borg (€600) af."),
  bullet("Spullen terug: laptop, kabels, potten, kist, relieken. Vertrek op de tijd uit de boeking (meestal 10:00)."),
];

(async () => {
  // ======================= 10 LARP: gedaanten en props =======================
const larp = [
  ...titel("LARP: gedaanten en props", "Alleen voor de organisatoren · ras en class per Wachter, en welke props wij aanvullen"),
  p([g("Stefan ziet de gedaanten van iedereen (ras en class, geen rollen) in zijn eigen app. Dit document is alleen voor ons: dat wij props aanvullen, weet hij niet. Rob, Jean en Roland doen gewoon mee aan de LARP.")]),
  h("De uitdaging"),
  p("Iedereen krijgt zijn gedaante vooraf in de app, en Godfried noemt hem in zijn welkom. De oproep: kom verkleed in je gedaante, met kostuum en attributen, en blijf het hele weekend in je rol. Wie dat het best doet, komt in de aftiteling."),
  h("Per Wachter"),
  tabel(["Wachter", "Ras", "Class", "Kostuum en props (ideeën)", "Wie regelt"], window.WACHTERS.map((w) => { const k = window.KARAKTER?.[w.naam] || {};
    return [w.naam, k.ras || "?", k.klasse || "?", k.props || "", ""]; }), [1200, 1200, 1400, 4800, 1200]),
  h("Stefans sessie"),
  bullet("Een interactieve LARP van hooguit een uur. Stefan ziet in zijn app alleen de gedaanten: geen verborgen rollen, krachten of plotwendingen."),
  bullet("Iedereen neemt zelf props mee. Wij vullen aan waar iets ontbreekt: zet bij ‘Wie regelt’ wie wat koopt."),
];

// ======================= 11 Godfried: verhaal en quiz =======================
const ZN = { schild: "Schild", hoorn: "Hoorn", hart: "Hart", vlam: "Vlam" };
const godfried = [
  ...titel("Godfried: verhaal en quiz", "Voor de organisatoren · wat Godfried wanneer vertelt, en de vragen met antwoorden"),
  p([g("Godfrieds brief komt uit 1096 en spreekt over 930 jaar heen; als geest mag hij ook vertellen hoe zijn leven afliep. Elke quizvraag is eerder verteld: in de app-intro, in een hoofdstuk op de tv, en terug te lezen in de app (De Kroniek van Godfried). Goed antwoord: +1 fiche voor dat Zegel, fout: −1.")]),
  h("Zijn verhaal"),
  bullet([b("Weken vooraf, app-intro: "), t("‘Ik ben Godfried van Bouillon, hertog van Neder-Lotharingen, heer van de burcht boven de Semois.’")]),
  ...window.GODFRIED.hoofdstukken.flatMap((hs) => [h3(`${hs.titel} (${hs.wanneer})`), ...hs.tekst.map((x) => p([t(x, { italics: true })]))]),
  h("De quiz vóór het eten"),
  ...window.GODFRIED.quiz.flatMap((q) => [h3(`${q.titel} (${q.wanneer})`),
    tabel(["Zegel", "Vraag", "Antwoord"], q.vragen.map((v) => [ZN[v.zegel], v.vraag, v.antwoord]), [1200, 5000, 3600])]),
];

for (const [naam, inhoud] of [["11 Godfried - verhaal en quiz.docx", godfried], ["10 LARP - gedaanten en props.docx", larp], ["09 Voorstel rollen en bevelen.docx", voorstel], ["07 Te beslissen (Roland en Jean).docx", beslissen], ["08 Draaiboek.docx", draaiboek]]) {
    fs.writeFileSync(path.join(uit, naam), await Packer.toBuffer(doc(inhoud))); console.log("✓", naam);
  }
})();
