// Voor het weekend: wat de persoonlijke pagina laat zien zodra de link verstuurd is, in drie stappen.
//   Stap 1 (meteen): welkom van Godfried, het eigen bevel (thuiswerk) en de vraag om herinneringen voor de finale.
//   Stap 2 (vanaf stap2): wat neem je mee.
//   Stap 3 (vanaf stap3, de avond ervoor): de Schaduwkoning roert zich.
// De bevelen noemen de rol nog niet: die breekt pas open na de Eerste Dronk.
window.VOORAF = {
  stap2: new Date("2026-11-06T09:00:00+01:00"),
  stap3: new Date("2026-11-12T19:00:00+01:00"),

  // per Wachter: titel, opdracht, en welk Zegel hij voedt als de regie "Bevel volbracht" drukt (+3 fiches)
  bevelen: { // de organisatoren (Rob, Jean, Roland) krijgen geen bevel; elk Zegel krijgt er twee (samen 6 fiches)
    Robin: { titel: "De Legendarische Borrelplank", zegel: "hoorn",
      tekst: "Samen met Geert leg jij op de eerste avond een borrelplank die de Kronieken ingaat. Editie 2026: legendarisch, en hij mag nooit leeg raken." },
    Geert: { titel: "De Legendarische Borrelplank", zegel: "hoorn",
      tekst: "Samen met Robin leg jij op de eerste avond een borrelplank die de Kronieken ingaat. Editie 2026: legendarisch, en hij mag nooit leeg raken." },
    Stefan: { titel: "Het Spel der Rollen", zegel: "hart", larp: true, // ziet in zijn app de gedaanten van iedereen
      tekst: "Zondagochtend leid jij een LARP-sessie van hooguit een uur: geef iedere Wachter een doel en een geheim, passend bij zijn gedaante. Het verhaal is van jou." },
    Roy: { titel: "Meester van de Frituur", zegel: "vlam",
      tekst: "Jij regelt de frituurpan, de snacks en de sauzen, en het hele weekend warme hapjes. Draag de bakmuts met trots: zonder jou geen gouden vuur." },
    Ivo: { titel: "De Proeverij van de Bard", zegel: "hart",
      tekst: "Op de eerste avond schenk jij een wijnproeverij van hooguit een uur, met muziek en bij elke wijn een verhaal. En het hele weekend houd jij de sfeer in de Hall op peil." },
    Martin: { titel: "Drie Elixers", zegel: "vlam",
      tekst: "Jij brouwt minstens drie elixers: Vuur voor de fakkeltocht, Schaduw, en een Ochtendbooster (liefst zonder alcohol). Geef elk een naam die de Schaduw doet beven." },
    Jeroen: { titel: "Het Eerste Avondmaal", zegel: "schild",
      tekst: "Op de eerste avond voed jij de Guild. Het avondmaal is aan jou, met zo’n € 250 uit de schatkist (meer kan, als je het vraagt)." },
    Johan: { titel: "De Taveerne van het Lot", zegel: "schild",
      tekst: "Zaterdag open jij een uur lang een middeleeuwse taveerne: een gokspel voor de hele groep, met drinken, dansen, knokken en gokken." },
  },

  // de organisatoren: een symbolisch bevel, zodat zij dezelfde flow doorlopen (telt niet mee voor de Zegels, staat niet in de regie)
  hoederBevel: { titel: "Het Bevel der Hoeders",
    tekst: "Jij houdt dit weekend de Kronieken in leven: de klok, de Schaduw, de Schaduwdragers en de tijd. Zorg dat elke Wachter dit weekend nooit vergeet." },

  // stap 2: extra regels bovenaan de meeneemlijst van één Wachter
  extra: { Ivo: ["VERGEET JE SPORTSCHOENEN NIET"] },
  geregeld: ["Bedlinnen: de bedden zijn opgemaakt", "Badhanddoeken en theedoeken", "Eten en drinken", "Hout voor de haarden", "Wifi"],
  meenemen: [
    "Je kostuum en props voor jouw gedaante: je komt verkleed, en je blijft het hele weekend in je rol",
    "Badjas en slippers, voor de sauna en het stoombad",
    "Warme kleren, een regenjas en stevige schoenen: zaterdagavond lopen we door een kasteel, en het bos ligt om de hoek",
    "Toiletspullen en je eigen medicijnen",
    "Oplader en een powerbank: je telefoon is dit weekend je boodschap van Godfried",
    "Je identiteitskaart (we zijn in België)",
    "Je eigen lekkernijen, als je die niet wilt missen",
    "Een (bord)spel dat je graag speelt",
    "Alles wat je nodig hebt voor jouw bevel",
  ],
};
