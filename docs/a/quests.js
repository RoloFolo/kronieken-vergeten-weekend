// De questkaarten: 10 per Zegel. soort: solo | duo | groep; fiches: wat de regie aftikt.
// Een volbrachte kaart gaat in de vaas van zijn Zegel; een organisator tikt de fiches af in de regie.
window.QUESTS = [
  // ---------- Vlam van Waakzaamheid: vuur, warmte, het huis ----------
  { zegel: "vlam", soort: "solo", fiches: 1, naam: "De Vuurwacht", tekst: "Houd het vuur een halfuur brandend zonder dat iemand anders eraan hoeft te zitten." },
  { zegel: "vlam", soort: "solo", fiches: 1, naam: "Fluisteraar van de Vlam", tekst: "Vertel het vuur hardop een geheim van minstens drie zinnen. Iedereen mag meeluisteren." },
  { zegel: "vlam", soort: "solo", fiches: 2, naam: "De Stille Opruimer", tekst: "Ruim tien dingen op zonder dat iemand het merkt. Pas als het gelukt is, mag je het verkondigen." },
  { zegel: "vlam", soort: "solo", fiches: 1, naam: "Koffie voor de Wacht", tekst: "Zet koffie of thee voor minstens zes Wachters en serveer elk kopje met een buiging." },
  { zegel: "vlam", soort: "solo", fiches: 2, naam: "De Laatste Wacht", tekst: "Wees vannacht degene die het vuur dooft en spreek plechtig: “De Vlam waakt.” Er moet een getuige zijn." },
  { zegel: "vlam", soort: "duo", fiches: 2, naam: "Het Keukenduel", tekst: "Doe samen de afwas. Een van jullie geeft er live sportcommentaar bij, van aftrap tot laatste bord." },
  { zegel: "vlam", soort: "duo", fiches: 2, naam: "De Sfeermeesters", tekst: "Maak de Guild Hall sfeervoller: kaarsen, licht, muziek. Het werk telt pas na applaus van de groep." },
  { zegel: "vlam", soort: "duo", fiches: 2, naam: "De Brandmeesters", tekst: "Bouw samen het mooiste vuur van het weekend. Maak er een foto van voor de Kronieken." },
  { zegel: "vlam", soort: "groep", fiches: 3, naam: "Het Kampvuurverhaal", tekst: "Rond het vuur vertelt iedereen om de beurt één zin van hetzelfde enge verhaal. Wie lacht bij het slot, begint opnieuw." },
  { zegel: "vlam", soort: "groep", fiches: 3, naam: "De Grote Reset", tekst: "Binnen tien minuten is de Guild Hall weer spik en span. Zet een timer en ga." },

  // ---------- Hoorn van Overvloed: eten, drinken, niemand komt tekort ----------
  { zegel: "hoorn", soort: "solo", fiches: 1, naam: "De Schenker", tekst: "Vul bij iedereen het glas bij voordat het leeg is. Eén volle ronde, niemand overgeslagen." },
  { zegel: "hoorn", soort: "solo", fiches: 1, naam: "Het Waterritueel", tekst: "Bezorg iedere Wachter een glas water. Ja, echt iedereen. Ook die ene." },
  { zegel: "hoorn", soort: "solo", fiches: 2, naam: "Voorproever van de Koning", tekst: "Stel een proeverij samen van drie hapjes. De groep proeft geblinddoekt en raadt wat het is." },
  { zegel: "hoorn", soort: "solo", fiches: 2, naam: "De Voorraadmeester", tekst: "Zoek uit wat er bijna op is en regel het, of zet het op de boodschappenlijst voordat iemand het mist." },
  { zegel: "hoorn", soort: "solo", fiches: 2, naam: "De Grote Toost", tekst: "Breng een toost uit op een andere Wachter, met een anekdote die niet iedereen kent." },
  { zegel: "hoorn", soort: "duo", fiches: 2, naam: "De Hapjesbrigade", tekst: "Maak samen een plank met hapjes voor de hele Guild. Presentatie telt mee." },
  { zegel: "hoorn", soort: "duo", fiches: 2, naam: "Het Elixer", tekst: "Bedenk samen een huisdrankje (mag zonder alcohol), geef het een naam en laat drie Wachters proeven." },
  { zegel: "hoorn", soort: "duo", fiches: 1, naam: "De Snackroof", tekst: "Breng ongezien snacks naar drie Wachters die met iets anders bezig zijn. Gezien? Dan telt het niet." },
  { zegel: "hoorn", soort: "groep", fiches: 3, naam: "Het Feestmaal", tekst: "Eet samen aan één tafel, en niemand pakt zijn telefoon tot het dessert." },
  { zegel: "hoorn", soort: "groep", fiches: 3, naam: "Ontbijt voor de Wachters", tekst: "Het ontbijt staat klaar voordat de laatste Wachter beneden komt." },

  // ---------- Schild van Broederschap: samen, spel, verbinding ----------
  { zegel: "schild", soort: "solo", fiches: 1, naam: "De Verbinder", tekst: "Breng twee Wachters die elkaar vandaag nog weinig spraken samen in één gesprek." },
  { zegel: "schild", soort: "solo", fiches: 1, naam: "De Herinnering", tekst: "Vertel de groep je mooiste herinnering aan een eerder vriendenweekend." },
  { zegel: "schild", soort: "solo", fiches: 2, naam: "De Spelleider", tekst: "Leg een spel uit dat de groep nog niet kent en speel een ronde met minstens vier Wachters." },
  { zegel: "schild", soort: "duo", fiches: 2, naam: "Het Duel", tekst: "Daag iemand uit: armpje drukken, steen-papier-schaar best of five, of een spel naar keuze. De verliezer prijst de winnaar luid." },
  { zegel: "schild", soort: "duo", fiches: 2, naam: "Het Gedeelde Geheim", tekst: "Vertel elkaar iets wat de ander nog niet van je wist. Vertel de groep daarna wat je hebt geleerd, met toestemming." },
  { zegel: "schild", soort: "duo", fiches: 1, naam: "Het Wapenschild", tekst: "Ontwerp samen een wapenschild voor de Guild. Hang het op in de Hall." },
  { zegel: "schild", soort: "groep", fiches: 3, naam: "Het Toernooi", tekst: "Speel een bord- of kaartspel met minstens zes Wachters. De winnaar krijgt de beste stoel tot de volgende maaltijd." },
  { zegel: "schild", soort: "groep", fiches: 3, naam: "De Kring", tekst: "Iedereen noemt één ding dat hij waardeert aan de Wachter links van hem. Niet lachen, wel menen." },
  { zegel: "schild", soort: "groep", fiches: 3, naam: "Het Groepsportret", tekst: "Een epische groepsfoto met iedereen erop, in een zo dramatisch mogelijke pose." },
  { zegel: "schild", soort: "groep", fiches: 2, naam: "De Wet van de Tafel", tekst: "Kies samen een regel voor de volgende maaltijd, zoals ‘niemand zegt ik’, en houd hem de hele maaltijd vol." },

  // ---------- Hart van de Ardennen: buiten, rust, herstel ----------
  { zegel: "hart", soort: "solo", fiches: 1, naam: "Frisse Lucht", tekst: "Haal iemand van de bank voor tien minuten buiten. Hij mag er niet over zeuren." },
  { zegel: "hart", soort: "solo", fiches: 2, naam: "De Sterrenkijker", tekst: "Wijs de groep ’s avonds buiten een sterrenbeeld aan, of verzin er heel overtuigend een." },
  { zegel: "hart", soort: "solo", fiches: 1, naam: "De Hersteller", tekst: "Zorg dat een brakke Wachter ’s ochtends water, koffie en een bemoedigend woord krijgt." },
  { zegel: "hart", soort: "solo", fiches: 2, naam: "De Gids", tekst: "Zoek een mooie wandelroute uit en leid de groep. Verdwalen kost een rondje." },
  { zegel: "hart", soort: "duo", fiches: 2, naam: "De Verkenners", tekst: "Vind buiten iets bijzonders voor op de schoorsteen: een tak, steen of veer, mét een verzonnen legende." },
  { zegel: "hart", soort: "duo", fiches: 2, naam: "Het Buitenkamp", tekst: "Maak buiten een plek klaar voor een buitenmoment: stoelen, licht, iets warms." },
  { zegel: "hart", soort: "duo", fiches: 1, naam: "De Rustbrengers", tekst: "Zit samen tien minuten buiten zonder telefoon en zonder iets te hoeven." },
  { zegel: "hart", soort: "groep", fiches: 3, naam: "De Expeditie", tekst: "Maak met minstens zes Wachters een wandeling van minimaal een halfuur." },
  { zegel: "hart", soort: "groep", fiches: 3, naam: "De Ochtendmars", tekst: "Voor tien uur buiten, koffie in de hand, met minstens vijf Wachters." },
  { zegel: "hart", soort: "groep", fiches: 2, naam: "De Roep van het Woud", tekst: "Ga met z’n allen naar buiten, adem diep in en roep samen ‘Ardennen!’ naar het bos." },
];
// Lege kaarten: de groep verzint zelf een quest; de Warlord of Games bepaalt Zegel en beloning.
window.QUESTS_EIGEN = 5;
