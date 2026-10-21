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
      tekst: "Samen met Geert verzorg jij op de eerste avond een uitbundig feestmaal voor de Wachters: een legendarische borrelplank voor 11 man, rijkelijk gevuld met de beste spijzen uit het koninkrijk. Zorg dat de plank de hele avond gevuld blijft en de Kronieken ingaat." },
    Geert: { titel: "De Legendarische Borrelplank", zegel: "hoorn",
      tekst: "Samen met Robin verzorg jij op de eerste avond een uitbundig feestmaal voor de Wachters: een legendarische borrelplank voor 11 man, rijkelijk gevuld met de beste spijzen uit het koninkrijk. Zorg dat de plank de hele avond gevuld blijft en de Kronieken ingaat." },
    Stefan: { titel: "Het Spel der Rollen", zegel: "hart", larp: true, // ziet in zijn app de gedaanten van iedereen
      tekst: "Zondagochtend leid jij een LARP-sessie van hooguit een uur, en sportief mag het ook. Het verhaal en de spelvorm zijn van jou. Vrijdag en zaterdag kun je de groep al instructies geven." },
    Roy: { titel: "Meester van de Frituur", zegel: "vlam",
      tekst: "Jij beheert de Vetput van de Guild: zorg voor het gouden vet, de snacks en de sauzen. Houd de Wachters het hele weekend gevoed met warme lekkernijen. Draag de bakmuts met trots: zonder jou dooft het vuur." },
    Ivo: { titel: "De Proeverij van de Bard", zegel: "hart",
      tekst: "Op de eerste avond neem jij de Wachters mee op een wijnreis van hooguit een uur. Schenk bijzondere wijnen, begeleid ze met passende muziek en vertel bij elke wijn het verhaal achter jouw keuze. En houd het hele weekend de sfeer in de Hall op peil." },
    Martin: { titel: "Drie Elixers", zegel: "vlam",
      tekst: "Jij brouwt minstens drie elixers: één voor Vuur, één voor Schaduw en één voor Ochtenddauw. Geef elk een naam die de Schaduw doet beven." },
    Jeroen: { titel: "Het Eerste Avondmaal", zegel: "schild",
      tekst: "Op de eerste avond voed jij de Guild. Het avondmaal is aan jou, met zo’n € 250 uit de schatkist (meer kan, als je het vraagt)." },
    Johan: { titel: "De Taveerne van het Lot", zegel: "schild",
      tekst: "Zaterdag open jij een uur lang een middeleeuwse taveerne. Creëer een gokspel voor de hele groep, met drinken, dansen, knokken en gokken. Hoe je dat invult, is aan jou." },
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
