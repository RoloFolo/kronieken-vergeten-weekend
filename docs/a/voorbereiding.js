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
  bevelen: {
    Robin: { titel: "Het Vuur van de Hall", zegel: "vlam",
      tekst: "Jij bent de vuurmeester. Zorg dat alle haardvuren van de Guild Hall het hele weekend kunnen branden: hout, aanmaakhout en wat er verder nodig is. De vlam mag niet doven." },
    Martin: { titel: "Drie Elixers", zegel: "hoorn",
      tekst: "Drie keer dit weekend brouw jij een cocktail voor iedere Wachter. Geef elk elixer een naam die de Schaduw doet beven." },
    Jeroen: { titel: "Het Vuurmaal", zegel: "hoorn",
      tekst: "Op de eerste avond voed jij, samen met Jean, de Guild met vlees en vuur: jullie beroemde BBQ-specials." },
    Jean: { titel: "Het Vuurmaal", zegel: "hoorn",
      tekst: "Op de eerste avond voed jij, samen met Jeroen, de Guild met vlees en vuur: jullie beroemde BBQ-specials." },
    Roy: { titel: "De Plank der Overvloed", zegel: "hoorn",
      tekst: "Jij brengt een borrelplank waar zelfs een koning stil van wordt." },
    Ivo: { titel: "De Broden van de Dageraad", zegel: "hart",
      tekst: "Bij het ontbijt brengen jouw beroemde worstenbroodjes de Wachters weer tot leven. En de Hall rekent op jouw sauzen en frituurhapjes." },
    Stefan: { titel: "Het Ritueel van Herstel", zegel: "hart",
      tekst: "Zondagochtend roep jij de Wachters op voor een uur of twee beweging. Wie stijf is van de nacht, maak jij weer soepel." },
    Johan: { titel: "De Proef der Wijsheid", zegel: "schild",
      tekst: "Samen met Geert bereid jij een pubquiz of spel voor: een uur waarin geen Wachter zich kan verstoppen." },
    Geert: { titel: "De Proef der Wijsheid", zegel: "schild",
      tekst: "Samen met Johan bereid jij een pubquiz of spel voor: een uur waarin geen Wachter zich kan verstoppen." },
    Rob: { titel: "Hoeder van de Hall", zegel: "schild",
      tekst: "Jij kent het geheim van de Hall al. Bewaar het tot het zegel breekt, en zorg dat de anderen niets vermoeden." },
    Roland: { titel: "Hoeder van de Hall", zegel: "schild",
      tekst: "Jij kent het geheim van de Hall al. Bewaar het tot het zegel breekt, en zorg dat de anderen niets vermoeden." },
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
