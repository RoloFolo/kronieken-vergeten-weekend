// Voor het weekend: wat de persoonlijke pagina laat zien zodra de link verstuurd is, in drie stappen.
//   Stap 1 (meteen): welkom van Godfried, het eigen bevel (thuiswerk) en de vraag om herinneringen voor de finale.
//   Stap 2 (vanaf stap2): wat neem je mee, je kamerwens en de playlist.
//   Stap 3 (vanaf stap3, de avond ervoor): de Schaduwkoning roert zich.
// De bevelen noemen de rol nog niet: die breekt pas open na de Eerste Dronk.
window.VOORAF = {
  stap2: new Date("2026-11-06T09:00:00+01:00"),
  stap3: new Date("2026-11-12T19:00:00+01:00"),
  playlist: null, // link naar de gedeelde playlist, zodra die er is

  // per Wachter: titel, opdracht, en welk Zegel hij voedt als de regie "Bevel volbracht" drukt (+3 fiches)
  bevelen: { // de organisatoren (Rob, Jean, Roland) krijgen geen bevel; elk Zegel krijgt er twee (samen 6 fiches)
    Robin: { titel: "De Legendarische Borrelplank", zegel: "hoorn",
      tekst: "Samen met Geert leg jij op de eerste avond een borrelplank die de Kronieken ingaat. Editie 2026: legendarisch, of de Schaduw lacht jullie uit." },
    Geert: { titel: "De Legendarische Borrelplank", zegel: "hoorn",
      tekst: "Samen met Robin leg jij op de eerste avond een borrelplank die de Kronieken ingaat. Editie 2026: legendarisch, of de Schaduw lacht jullie uit." },
    Stefan: { titel: "Het Spel der Rollen", zegel: "hart",
      tekst: "Jij leidt een korte LARP-sessie: geef iedere Wachter een rol, een doel en een geheim. Het verhaal is van jou, de Ardennen zijn het toneel." },
    Roy: { titel: "Meester van de Frituur", zegel: "vlam",
      tekst: "Jij brengt de frituurpan, de frituurhapjes en de sauzen, en je draagt met trots de bakmuts. Zonder jou geen gouden vuur in de Hall." },
    Ivo: { titel: "De Proeverij van de Bard", zegel: "hart",
      tekst: "Jij schenkt een wijnproeverij, met muziek op de achtergrond en bij elke wijn een verhaal. Laat de Wachters proeven wat de eeuwen te vertellen hebben." },
    Martin: { titel: "Drie Elixers", zegel: "vlam",
      tekst: "Jij brouwt cocktails of mocktails in minstens drie thema's: Vuur, Schaduw en Opkikker. Geef elk elixer een naam die de Schaduw doet beven." },
    Jeroen: { titel: "Het Eerste Avondmaal", zegel: "schild",
      tekst: "Op de eerste avond voed jij de Guild. Het avondmaal is aan jou, binnen het budget dat de hoeders van de Hall je meegeven." },
    Johan: { titel: "De Taveerne van het Lot", zegel: "schild",
      tekst: "Jij opent een uur lang een taveerne: een gokspel voor de hele groep, met inzet, bluf en een waard die zelden verliest." },
  },

  // stap 2
  geregeld: ["Bedlinnen: de bedden zijn opgemaakt", "Badhanddoeken en theedoeken", "Eten en drinken", "Hout voor de haarden", "Wifi"],
  meenemen: [
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
