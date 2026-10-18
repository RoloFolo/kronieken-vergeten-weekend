// De questkaarten: Jeans 30 quests (okt 2026), verdeeld over de vier Zegels. soort: solo | duo | groep;
// xp: Jeans moeilijkheid (5 makkelijk, 10 gemiddeld, 20 moeilijk, 30 legendarisch); fiches: wat de regie aftikt (5/10 = 1, 20 = 2, 30 = 3).
// Een volbrachte kaart gaat in de vaas van zijn Zegel; een organisator tikt de fiches af in de regie.
// Bewijs: een getuige, foto of filmpje, of de regie. Bij duo's telt het voor beiden, bij groepen voor wie actief meedeed.
window.QUESTS = [
  // ---------- Vlam van Waakzaamheid: scherp blijven, sluw spelen, niemand mag het doorhebben ----------
  { zegel: "vlam", soort: "solo", xp: 20, fiches: 2, naam: "De Complottheorie", tekst: "Overtuig iemand dat een totaal onbelangrijk voorwerp in het huis een verborgen functie heeft." },
  { zegel: "vlam", soort: "solo", xp: 20, fiches: 2, naam: "De Echo", tekst: "Verwerk vijf keer dezelfde vreemde uitdrukking in gesprekken, zonder dat iemand je erop aanspreekt." },
  { zegel: "vlam", soort: "solo", xp: 10, fiches: 1, naam: "De Politicus", tekst: "Beantwoord drie directe vragen zonder daadwerkelijk antwoord te geven." },
  { zegel: "vlam", soort: "duo", xp: 20, fiches: 2, naam: "De Nep-Ruzie", tekst: "Voer samen een bloedserieuze discussie over een volstrekt onzinnig onderwerp, totdat iemand zich ermee bemoeit." },
  { zegel: "vlam", soort: "duo", xp: 20, fiches: 2, naam: "De Running Gag", tekst: "Laat los van elkaar steeds dezelfde bizarre zin vallen, tot iemand vraagt waarom jullie dat zeggen." },
  { zegel: "vlam", soort: "duo", xp: 10, fiches: 1, naam: "De Slechte Cop", tekst: "Ondervraag een Wachter alsof hij verdacht wordt van een belachelijk misdrijf, zoals het stelen van de laatste bitterbal." },
  { zegel: "vlam", soort: "duo", xp: 30, fiches: 3, naam: "De Telepathen", tekst: "Spreek minstens drie keer tegelijk dezelfde zin uit, zonder dat de rest doorheeft dat het afgesproken is." },

  // ---------- Hoorn van Overvloed: drank, lof en eer, alles te veel ----------
  { zegel: "hoorn", soort: "solo", xp: 5, fiches: 1, naam: "De Influencer", tekst: "Maak een bloedserieuze selfie met iemand en zeg: “Dit is echt content.”" },
  { zegel: "hoorn", soort: "solo", xp: 10, fiches: 1, naam: "De Sommelier", tekst: "Beschrijf een goedkoop biertje alsof het een wijn van € 400 is. Minstens dertig seconden volhouden." },
  { zegel: "hoorn", soort: "solo", xp: 10, fiches: 1, naam: "De Onzichtbare Dienaar", tekst: "Schenk drie keer ongemerkt iemands drankje bij, zonder dat hij erom vraagt." },
  { zegel: "hoorn", soort: "duo", xp: 20, fiches: 2, naam: "De Bodyguards", tekst: "Begeleid een derde Wachter vijf minuten lang alsof hij een wereldberoemde VIP is." },
  { zegel: "hoorn", soort: "duo", xp: 20, fiches: 2, naam: "De Fanclub", tekst: "Behandel één Wachter tien minuten lang als een levende legende. Vraag om een handtekening." },
  { zegel: "hoorn", soort: "duo", xp: 10, fiches: 1, naam: "De Ceremonie", tekst: "Organiseer een plechtige huldiging van iemand, vanwege een volkomen nutteloze prestatie." },
  { zegel: "hoorn", soort: "groep", xp: 20, fiches: 2, naam: "De Staande Ovatie", tekst: "Laat minstens vijf Wachters spontaan applaudisseren voor iets wat absoluut geen applaus verdient." },
  { zegel: "hoorn", soort: "groep", xp: 20, fiches: 2, naam: "De Cultuurprijs", tekst: "Organiseer een prijsuitreiking voor de slechtste grap van het weekend. Minstens vijf Wachters stemmen." },

  // ---------- Schild van Broederschap: samen, regels, de groep als één ----------
  { zegel: "schild", soort: "solo", xp: 10, fiches: 1, naam: "De Manager", tekst: "Organiseer spontaan een evaluatie van een totaal onbelangrijke gebeurtenis. Gebruik minstens drie managementtermen." },
  { zegel: "schild", soort: "duo", xp: 10, fiches: 1, naam: "De Geheime Groet", tekst: "Bedenk een belachelijke begroeting en voer hem minstens drie keer uit waar anderen bij zijn." },
  { zegel: "schild", soort: "groep", xp: 30, fiches: 3, naam: "De Staatsgreep", tekst: "Overtuig minstens vier anderen om samen een nieuwe, belachelijke huisregel in te voeren." },
  { zegel: "schild", soort: "groep", xp: 30, fiches: 3, naam: "De Sekte", tekst: "Zorg dat minstens vijf Wachters dezelfde onzinnige uitspraak als groepsmotto gaan gebruiken." },
  { zegel: "schild", soort: "groep", xp: 20, fiches: 2, naam: "De Volksjury", tekst: "Organiseer een rechtszaak tegen een Wachter wegens een onbenullige overtreding. Minstens vier Wachters spelen een rol." },
  { zegel: "schild", soort: "groep", xp: 20, fiches: 2, naam: "De Boyband", tekst: "Zorg dat minstens vier Wachters samen een boyband vormen en minstens één refrein opvoeren." },
  { zegel: "schild", soort: "groep", xp: 10, fiches: 1, naam: "De Democratie", tekst: "Organiseer een officiële stemming over iets waar niemand ooit over zou moeten stemmen." },
  { zegel: "schild", soort: "groep", xp: 20, fiches: 2, naam: "De Groepsfoto", tekst: "Maak een bloedserieuze groepsfoto waarop minstens zes Wachters exact dezelfde belachelijke pose aannemen." },

  // ---------- Hart van de Ardennen: verhalen, legendes, wie we zijn ----------
  { zegel: "hart", soort: "solo", xp: 20, fiches: 2, naam: "De Bijnaam", tekst: "Geef iemand een compleet idiote bijnaam en zorg dat minstens twee anderen hem overnemen." },
  { zegel: "hart", soort: "solo", xp: 10, fiches: 1, naam: "De Filosoof", tekst: "Begin drie keer een gesprek met: “Weet je wat het probleem is met onze generatie?”" },
  { zegel: "hart", soort: "solo", xp: 10, fiches: 1, naam: "De Expert", tekst: "Geef twee minuten lang ongevraagd deskundig advies over iets waar je aantoonbaar geen verstand van hebt." },
  { zegel: "hart", soort: "solo", xp: 10, fiches: 1, naam: "De Excuses", tekst: "Bied oprecht je excuses aan voor iets van minstens tien jaar geleden, waar niemand nog aan denkt." },
  { zegel: "hart", soort: "solo", xp: 20, fiches: 2, naam: "De Legende", tekst: "Zorg dat iemand anders spontaan een gênant verhaal over jou vertelt." },
  { zegel: "hart", soort: "duo", xp: 20, fiches: 2, naam: "De Persconferentie", tekst: "Houd een geïmproviseerde persconferentie waarin één van jullie excuses aanbiedt voor een verzonnen schandaal." },
  { zegel: "hart", soort: "duo", xp: 20, fiches: 2, naam: "De Historici", tekst: "Vertel samen een compleet verzonnen verhaal over een andere Wachter. Iemand moet vragen of het echt gebeurd is." },
];
// Lege kaarten: de groep verzint zelf een quest; The Dice Rogue bepaalt Zegel en beloning.
window.QUESTS_EIGEN = 6;
