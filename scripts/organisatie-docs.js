// Word-documenten voor de organisatoren (Drive opent ze in Google Docs):
//   07 Te beslissen (Roland en Jean).docx, 08 Draaiboek.docx en 09 Voorstel rollen en bevelen.docx
//   NODE_PATH=<map met node_modules/docx> node scripts/organisatie-docs.js <uitmap> [drive-id van 09]
// Links naar Drive: de bestands-id's staan in DRIVE hieronder (uit Drive voor desktop).
const fs = require("fs"), path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType, ExternalHyperlink } = require("docx");
const uit = process.argv[2] || ".", id09 = process.argv[3];
// the game's own data, so the proposal always matches the app
const window = {};
for (const f of ["docs/a/wachters.js", "docs/a/spel.js", "docs/a/rollen.js", "docs/a/voorbereiding.js"]) new Function("window", fs.readFileSync(f, "utf8"))(window);
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
  bullet([link("06 Oorkondes (concept)", drive("oorkondes")), g(" · de oorkondes voor in de envelop, nog zonder portretten")]),
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
  vink([b("Akkoord eigenaar voor een vriendengroep. "), t("Het huis is ‘uitsluitend voor families’; met vrienden mag het alleen met goedkeuring van de eigenaar, anders kan hij bij aankomst de toegang weigeren.")]),
  vink([b("Aankomsttijd doorgeven "), t("aan de contactpersoon, de avond ervoor (inchecken 16:00 tot 18:00).")]),
  vink([b("Vertrek maandag: "), t("hoe laat moeten we eruit? (Meestal 10:00; check de boeking.)")]),
  vink([b("Wie is er als eerste? "), t("Iemand moet vóór de rest binnen zijn om de tv, de potten en de envelop klaar te zetten.")]),
  vink([b("Kamerindeling: "), t("wie verdeelt de kamers, op basis van de kamerwensen uit de app? 7 kamers met 2 bedden, 1 met 1 bed: minstens 3 kamers worden gedeeld.")]),

  h("3. Gedaanten en de LARP"),
  p([t("Iedereen krijgt vooraf zijn ras en class (en de bevelhouders hun bevel), met de uitdaging om verkleed te komen en het hele weekend in zijn rol te blijven. Alles per Wachter in "), link("10 LARP: gedaanten en props", MAP), t(".")]),
  vink([b("Punten en prijzen voor wie in zijn rol blijft: "), t("hoeveel fiches, wanneer, en welke ‘grote prijzen’? De app belooft het al.")]),
  vink([b("Bevelbonus: "), t("blijft het +3 fiches per volbracht bevel? Nu voedt elk Zegel twee bevelen.")]),
  vink([b("Props voor Stefans LARP: "), t("welke props geven wij, en wie regelt ze (zie 10).")]),
  vink([b("Budget eerste avondmaal (Jeroen): "), t("€ ______.")]),

  h("4. De app en de link"),
  vink([b("Wanneer sturen we de link? "), t("Datum: ______. Iedereen krijgt zijn link (regie → ‘Persoonlijke links’) en zijn wachtwoord apart.")]),
  vink([b("Stap 2 "), t("(wat neem je mee, kamerwens, playlist) gaat nu open op vrijdag 6 november 09:00. Goed zo?")]),
  vink([b("Stap 3 "), t("(de Schaduw roert zich) gaat open op donderdag 12 november 19:00. Goed zo?")]),
  vink([b("Playlist: "), t("welke dienst (Spotify?), wie maakt hem, en de link.")]),
  vink([b("Herinneringen voor Akte I: "), t("tot wanneer mogen ze insturen? Schrijven wij er zelf ook een paar, voor wie er weinig krijgt?")]),

  h("5. Samen testen"),
  p("Vóór het versturen testen we de app en de tv samen. Zo speelt Jean als gewone Wachter:"),
  bullet([t("Jean opent "), link("zijn persoonlijke pagina", SITE + "wachter.html#jean"), t(" op zijn telefoon en logt in.")]),
  bullet([t("Onderaan: "), b("‘Test: speel als gewone Wachter (regie verbergen)’"), t(". Het Regie-tabblad verdwijnt; terugzetten kan met dezelfde knop.")]),
  bullet([t("Stap 2 en 3 nu al bekijken: zet "), b("?stap=2"), t(" of "), b("?stap=3"), t(" voor het hekje, bijvoorbeeld wachter.html?stap=3#jean. Met "), b("?opnieuw"), t(" verschijnen het zegel en de overname van de Schaduw opnieuw.")]),
  bullet([t("De tv: "), link("index.html?tv", SITE + "index.html?tv"), t(" op de laptop, inloggen, één keer klikken voor geluid. Roland bedient de regie.")]),
  bullet("Na het testen: herinneringen die Jean als test instuurde, verwijdert hij zelf in de app (het kruisje). Op de regie → Beheer → ‘Hele spel opnieuw beginnen’ zet de tv weer op nul."),
  vink([b("Testdatum: "), t("______. Feedback daarna aan Claude.")]),

  h("6. De finale en het einde"),
  p([t("De finale is "), b("zondagochtend"), t(". Zie het "), link("draaiboek", drive("draaiboek")), t(".")]),
  vink([b("Cadeaus in de kist: "), t("wat, budget, wie koopt.")]),
  vink([b("De kist en het cijferslot "), t("(code 7698): wie koopt ze, en waar staat de kist tijdens het weekend?")]),
  vink([b("Portretten voor de "), link("oorkondes", drive("oorkondes")), t(": wie verzamelt van iedereen een goede foto, en is iedereen akkoord dat die via een AI-dienst geschilderd wordt?")]),
  vink([b("Oorkondes printen: "), t("wie, en waar (printshop of thuis, A4 kleur).")]),
  vink([b("Eretitels: "), t("zondagavond bij het eten of maandag bij het ontbijt? En wie beslist welke titel naar wie gaat?")]),

  h("7. Tijdens het weekend"),
  vink([b("Wie bedient de regie wanneer? "), t("Altijd één van ons drieën met de regie open.")]),
  vink([b("De verrader: "), t("wie kiest wie wanneer verrader is, en hoe lang (2, 4 of 6 uur)? ’s Nachts ‘Geen verrader’. Na zaterdagnacht geen verrader meer: de finale zoekt ze.")]),
  vink([b("Schaduw-events: "), t("hoe vaak per dag? Voorstel: 3 à 4 keer, verspreid. Alle events in "), link("04 Schaduw-events", drive("events")), t(".")]),
  vink([b("Kasteeltocht: "), t("tijd, tickets, fakkels (levert het kasteel ze?), en wie draagt de rugzak met relieken, shotglaasjes en drank.")]),
  vink([b("Laptop voor de tv: "), t("wiens laptop, en wie neemt de lange HDMI-kabel mee.")]),
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
  bullet([t("Portretten laten maken, "), link("oorkondes", drive("oorkondes")), t(" printen, in de envelop en verzegelen met lak.")]),
  bullet("Cijferslot op 7698 zetten en testen. Cadeaus in de kist."),
  h3("Donderdag 12 november"),
  bullet("19:00: stap 3 gaat vanzelf open: de Schaduwkoning neemt de app even over."),
  bullet("Aankomsttijd doorgeven aan de contactpersoon van het huis."),
  bullet("Inpakken: laptop + lader, HDMI-kabel, stekkerdozen, 4 potten met etiketten, fiches, questkaarten, regelboek, kaarsen, aanmaakhout, envelop, kist (op slot), rugzak met de 5 relieken, shotglaasjes + zakfles, powerbanks."),

  h("Vrijdag 13 november"),
  h3("Vóór 16:00 · de eerste organisator is binnen"),
  bullet("Laptop aan de tv, index.html?tv openen, inloggen, één keer klikken voor geluid. Regie op je telefoon: het lampje moet groen zijn."),
  bullet("Vier Zegel-potten op de schoorsteen, de verzegelde envelop ernaast."),
  bullet("Questkaarten op een stapel in de Guild Hall, regelboek op tafel. Kist en relieken uit het zicht."),
  h3("16:00 tot 18:00 · aankomst"),
  bullet("De tv staat op het welkomstscherm met de aftelling. Iedereen installeert zich (kamerindeling)."),
  h3("Iedereen binnen · de start (± 45 min)"),
  bullet([t("Regie → "), R("Start verhaal"), t(": Godfried vertelt de proloog, de zegels verschijnen.")]),
  bullet("Godfried vraagt iedereen een drankje te halen; de tv wacht."),
  bullet([t("Alle glazen vol → "), R("Glazen vol: toost!"), t(": de Eerste Dronk, proost, elk Zegel +1.")]),
  bullet("De Guild Hall opent en de rollen breken open in de app. Godfried legt in vijf korte stukken uit hoe het werkt."),
  bullet([R("Volgende stap"), t(" slaat het lopende deel over als het moet.")]),
  h3("De avond"),
  bullet([t("Jeroen: het Eerste Avondmaal (budget afspreken)"), ...volbracht("Jeroen")]),
  bullet([t("Robin en Geert: de Legendarische Borrelplank"), ...volbracht("beiden")]),
  bullet("Eerste verrader kiezen: regie → De Verrader → duur (2/4/6 uur) → naam. Alleen hij ziet het in zijn app."),
  bullet([t("Eén of twee keer "), R("De Schaduw beweegt"), t(": event voorlezen, dan "), R("Doorstaan"), t(", "), R("Gefaald"), t(" of de D20.")]),
  bullet("Quests doen, fiches in de potten, melden bij een hoeder: die zet ze met + op de tv."),
  bullet([t("Bij het slapengaan: "), R("Geen verrader (bijvoorbeeld 's nachts)"), t(".")]),

  h("Zaterdag 14 november"),
  h3("Ochtend"),
  bullet("Ontbijt."),
  bullet([t("Stefans korte LARP-sessie"), ...volbracht("Stefan")]),
  bullet("Nieuwe verrader kiezen. Quests, een Schaduw-event."),
  h3("Middag"),
  bullet([t("Johans taveerne: het gokspel (± 1 uur)"), ...volbracht("Johan")]),
  bullet([t("Roy’s frituur: hapjes, sauzen en de bakmuts (of na de tocht)"), ...volbracht("Roy")]),
  bullet("Martins elixers (een van de drie thema’s: Vuur, Schaduw, Opkikker). Wissel van verrader; nog een Schaduw-event."),
  h3("Avond · de Wachterstocht"),
  bullet([t("Vóór vertrek: regie → scherm "), R("Wachterstocht"), t(": de camera vliegt naar het kasteel, Godfried leest voor. De vijf opdrachten staan nu op ieders telefoon.")]),
  bullet("Mee: fakkels, shotglaasjes + zakfles, rugzak met relieken, powerbank, regie op een telefoon."),
  bullet("In het kasteel: elke gelukte opdracht afvinken in de regie (Wachterstocht) en het bijbehorende reliek uitdelen."),
  h3("Terug · de Reliekenkist"),
  bullet([t("Regie → "), R("Open de Reliekenkist"), t(": Godfried opent de kist, elk gevonden reliek rijst op. Elk reliek is in de finale één hint waard.")]),
  h3("Rest van de avond"),
  bullet([t("Ivo’s wijnproeverij met muziek en verhalen"), ...volbracht("Ivo")]),
  bullet("Vrij: borrelen, spellen, Martins elixers. Nog een laatste verrader, dan voor het slapengaan Geen verrader: de verraders zijn voorbij, de finale gaat ze zoeken."),

  h("Zondag 15 november"),
  h3("Ochtend"),
  bullet("Ontbijt."),
  h3("Late ochtend · de finale (± 1 uur)"),
  bullet([t("Regie → scherm "), R("Finale"), t(": de Schaduwkoning en Godfried openen, Akte I begint.")]),
  bullet([t("De spelers antwoorden hardop; de regie tikt het antwoord aan (naam, getal of zegel). "), R("Hint (kost een reliek)"), t(" als ze vastzitten.")]),
  bullet([t("Een Zegel nog niet vol (12 fiches)? Dan eerst een beproeving; daarna "), R("Beproeving voltooid"), t(".")]),
  bullet([t("Akte III: de eed. Iedereen ziet zijn stuk in de app; staan ze goed en is hij uitgesproken → "), R("De eed is juist uitgesproken"), t(".")]),
  bullet("Akte IV: de verraders van het weekend aanwijzen, periode voor periode."),
  bullet("Elke akte laat een cijfer vallen: 7 · 6 · 9 · 8. Na het vierde opent de deur, het scherm wordt wit: de Schaduwkoning is verslagen."),
  bullet([t("Godfried: open de kist → cadeaus. Daarna regie → "), R("Kist is open: de envelop"), t(" → de envelop met de oorkondes.")]),
  bullet([R("Volgende stap"), t(" slaat in de finale het lopende deel over.")]),
  h3("Middag en avond · geen haast"),
  bullet("Sauna en stoombad, wandelen langs de Semois, uitrusten."),
  bullet([t("Bij het eten of later op de avond: regie → Ere → "), R("Speel de eretitels af"), t(". De titels zijn vooraf samen toegewezen; de tv speelt ze één voor één, daarna rolt vanzelf de aftiteling. (Of maandag bij het ontbijt.)")]),

  h("Maandag 16 november"),
  bullet("Ontbijt, en eventueel de eretitels als die zondag niet aan bod kwamen."),
  bullet("Opruimen volgens het huis: vegen, afwas, koelkast en vaatwasser leeg, afval sorteren, bedden afhalen, de BBQ schoonmaken. Anders gaat het van de borg (€600) af."),
  bullet("Spullen terug: laptop, kabels, potten, kist, relieken. Vertrek op de tijd uit de boeking (meestal 10:00)."),
];

(async () => {
  // ======================= 10 LARP: gedaanten en props =======================
const larp = [
  ...titel("LARP: gedaanten en props", "Voor de organisatoren en voor Stefan · ras en class per Wachter, met ideeën voor kostuum en props"),
  p([g("Dit deel mag naar Stefan: het noemt alleen ras en class. De rollen, krachten en Zegels blijven geheim tot de Eerste Dronk. Rob, Jean en Roland doen gewoon mee aan de LARP.")]),
  h("De uitdaging"),
  p("Iedereen krijgt zijn gedaante vooraf in de app, en Godfried noemt hem in zijn welkom. De oproep: kom verkleed in je gedaante, met kostuum en attributen, en blijf het hele weekend in je rol. Wie dat doet, verdient punten en maakt kans op grote prijzen (nog in te vullen)."),
  h("Per Wachter"),
  tabel(["Wachter", "Ras", "Class", "Kostuum en props (ideeën)", "Wie regelt"], window.WACHTERS.map((w) => { const k = window.KARAKTER?.[w.naam] || {};
    return [w.naam, k.ras || "?", k.klasse || "?", k.props || "", ""]; }), [1200, 1200, 1400, 4800, 1200]),
  h("Stefans sessie"),
  bullet("Een interactieve LARP van hooguit een uur. Stefan krijgt vooraf alleen deze lijst: geen verborgen rollen, krachten of plotwendingen."),
  bullet("Props die wij geven: kies per Wachter één ding uit de lijst hierboven dat zijn gedaante meteen herkenbaar maakt, en zet bij ‘Wie regelt’ wie het koopt."),
];

for (const [naam, inhoud] of [["10 LARP - gedaanten en props.docx", larp], ["09 Voorstel rollen en bevelen.docx", voorstel], ["07 Te beslissen (Roland en Jean).docx", beslissen], ["08 Draaiboek.docx", draaiboek]]) {
    fs.writeFileSync(path.join(uit, naam), await Packer.toBuffer(doc(inhoud))); console.log("✓", naam);
  }
})();
