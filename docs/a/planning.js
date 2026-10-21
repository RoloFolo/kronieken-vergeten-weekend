// De planning van het weekend, voor de regie (Planning). Tijden zijn geschat.
//   dag: vooraf | vr | za | zo | ma
//   kaart: regie-kaarten (op hun titel) waarvan de inhoud in deze stap komt; in: losse knoppen (op id) die in deze stap komen
//   bevel: wiens bevel hier volbracht wordt (knop in de stap); scherm: knop om dit scherm op de tv te zetten; ga: knop naar een Acties-tab
//   auto: wanneer de regie de stap vanzelf als klaar ziet (anders vinkt een organisator hem af)
window.PLANNING = [
  { id: "v-links", dag: "vooraf", tijd: "", titel: "Links versturen", tekst: "Per Wachter zijn persoonlijke link (WhatsApp of kopiëren). Het wachtwoord stuur je apart.", kaart: ["Persoonlijke links"] },
  { id: "v-volgen", dag: "vooraf", tijd: "tot het weekend", titel: "Volgen: bevel aanvaard en gênant moment", tekst: "Wie na een paar dagen nog niets deed: een duwtje via WhatsApp. Wie geen gênant moment instuurt, gaat in Akte I aan de schandpaal.", kaart: ["Voor het weekend"] },
  { id: "v-stap2", dag: "vooraf", tijd: "vr 6 nov · 09:00", titel: "Stap 2 gaat vanzelf open", tekst: "‘Wat neem je mee’ verschijnt in de app, met het kostuum bovenaan.", auto: "stap2" },
  { id: "v-kist", dag: "vooraf", tijd: "± 10 nov", titel: "Kist klaarmaken", tekst: "Cijferslot op 7698 zetten en testen. Bouillonblokjes en cadeaus in de kist." },
  { id: "v-stap3", dag: "vooraf", tijd: "do 12 nov · 19:00", titel: "Stap 3: de Schaduw roert zich", tekst: "Gaat vanzelf open: de Schaduwkoning neemt de app even over.", auto: "stap3" },

  { id: "vr-opzet", dag: "vr", tijd: "vóór 16:00", titel: "Klaarzetten", tekst: "Laptop aan de tv, index.html?tv openen, inloggen, één keer klikken voor geluid. Vier Zegel-potten op de schoorsteen, questkaarten in vier stapels, regelboek op tafel. Kist en relieken uit het zicht. Elf glazen Hete Sep klaar." },
  { id: "vr-aankomst", dag: "vr", tijd: "16:00", titel: "Aankomst", tekst: "De tv staat op het welkomstscherm met de aftelling. Iedereen installeert zich en kleedt zich om." },
  { id: "vr-opening", dag: "vr", tijd: "17:00", titel: "De opening", tekst: "Godfried stelt zich voor (Hoofdstuk I) en leest zijn brief. Dan de Eerste Dronk: iedereen pakt een glas, de tv geeft een minuut. De Hall opent en de rollen breken open in de app. ± 45 min.", kaart: ["Intro"], auto: "hal" },
  { id: "vr-borrel", dag: "vr", tijd: "17:45", titel: "Borrel: de Legendarische Borrelplank", tekst: "Geert en Robin. De quests beginnen: fiches in de potten, melden bij een hoeder.", bevel: ["Geert", "Robin"] },
  { id: "vr-quiz1", dag: "vr", tijd: "19:00", titel: "Quiz I", tekst: "Eerst Oproep, dan de quiz: vier vragen, één per Zegel. Goed +1, fout −1. ± 10 min.", in: ["b-quiz-1"], auto: "quiz1" },
  { id: "vr-avondmaal", dag: "vr", tijd: "19:15", titel: "Het Eerste Avondmaal", tekst: "Jeroen kookt.", bevel: ["Jeroen"] },
  { id: "vr-proeverij", dag: "vr", tijd: "21:00", titel: "De Proeverij van de Bard", tekst: "Ivo schenkt zijn wijnen, hooguit een uur.", bevel: ["Ivo"] },
  { id: "vr-avond", dag: "vr", tijd: "daarna", titel: "Vrij, met een Schaduw-event of twee", tekst: "Borrelen, sauna, quests.", ga: "schaduw" },

  { id: "za-ontbijt", dag: "za", tijd: "09:30", titel: "Ontbijt", tekst: "Met Martins Ochtenddauw." },
  { id: "za-hfd2", dag: "za", tijd: "10:30", titel: "Hoofdstuk II", tekst: "Eerst Oproep. Keizer Hendrik IV, broer Boudewijn, Bouillon verpand aan de prins-bisschop van Luik.", in: ["b-hfd-2"], auto: "hfd2" },
  { id: "za-taveerne", dag: "za", tijd: "11:00", titel: "De Taveerne van het Lot", tekst: "Johan opent zijn middeleeuwse taveerne, ± 1 uur.", bevel: ["Johan"] },
  { id: "za-middag", dag: "za", tijd: "12:30", titel: "Lunch en vrije middag", tekst: "Quests, sauna, wandelen langs de Semois. Af en toe een Schaduw-event of klassemoment.", ga: "quests" },
  { id: "za-quiz2", dag: "za", tijd: "17:30", titel: "Quiz II", tekst: "Eerst Oproep, dan de quiz.", in: ["b-quiz-2"], auto: "quiz2" },
  { id: "za-frituur", dag: "za", tijd: "18:00", titel: "Meester van de Frituur", tekst: "Roy bakt, met bakmuts.", bevel: ["Roy"] },
  { id: "za-tocht", dag: "za", tijd: "19:40", titel: "De Wachterstocht", tekst: "Zet de Wachterstocht op de tv: Godfried leest voor, de opdrachten komen op ieders telefoon. ± 20:00 vertrek, 20:20 op locatie (parkeren en lopen), 20:30 bij het kasteel. Mee: Martins Vuur-elixer, de rugzak met shotglaasjes, powerbank. Vink in het kasteel af wat lukt.", scherm: "tocht", kaart: ["Wachterstocht · gelukt?"], auto: "kist" },
  { id: "za-kist", dag: "za", tijd: "± 22:00", titel: "Terug: de Reliekenkist", tekst: "Godfried opent de kist, elk gevonden reliek rijst op. Deel tegelijk de echte relieken uit.", kaart: ["Reliekenkist"], auto: "kist" },
  { id: "za-hfd3", dag: "za", tijd: "daarna", titel: "Hoofdstuk III", tekst: "Jeruzalem 1099, de geweigerde kroon, zijn dood. Nodig voor de quiz van zondag. Daarna vrij, met Martins Schaduw-elixer.", in: ["b-hfd-3"], auto: "hfd3" },

  { id: "zo-ontbijt", dag: "zo", tijd: "09:30", titel: "Ontbijt" },
  { id: "zo-larp", dag: "zo", tijd: "10:30", titel: "Het Spel der Rollen", tekst: "Stefans LARP, ± 1 uur. Iedereen in kostuum.", bevel: ["Stefan"] },
  { id: "zo-afronden", dag: "zo", tijd: "12:30", titel: "Lunch en afronden", tekst: "Laatste quests. Vink de bevelen af die nog openstaan en vul de eretitels in.", bevel: ["Martin"], kaart: ["Wie krijgt welke titel", "Het best in hun rol"] },
  { id: "zo-quiz3", dag: "zo", tijd: "13:30", titel: "Quiz III", tekst: "Eerst Oproep. De laatste vier vragen sterken (of verzwakken) de Zegels vlak voor de finale.", in: ["b-quiz-3"], auto: "quiz3" },
  { id: "zo-finale", dag: "zo", tijd: "14:00", titel: "De finale", tekst: "Vier aktes; elke akte laat een cijfer vallen: 7 · 6 · 9 · 8. Zegels niet vol? Daag de Dieven uit. ± 1 uur.", scherm: "finale", kaart: ["Finale", "De Dieven"], auto: "finale" },
  { id: "zo-titels", dag: "zo", tijd: "15:00", titel: "De kist en de eretitels", tekst: "Kist open: bouillonblokjes en een cadeautje voor iedereen. Dan de eretitels, en kroon wie de Schaduwkoning het best diende.", kaart: ["Ere van de Wachters · afspelen", "Wie diende de Schaduwkoning het best?"] },
  { id: "zo-aftiteling", dag: "zo", tijd: "± 15:30", titel: "Wie volgt? en de aftiteling", tekst: "De D11 kiest de organisatoren van 2027, dan rolt de aftiteling.", kaart: ["Wie volgt? · 2027", "Voor de aftiteling"], in: ["b-aftiteling", "b-aftiteling-uit"] },

  { id: "ma-opruimen", dag: "ma", tijd: "ochtend", titel: "Opruimen en vertrek", tekst: "Vegen, afwas, koelkast en vaatwasser leeg, afval sorteren, bedden afhalen, BBQ schoon (anders gaat het van de borg af). Spullen terug: laptop, kabels, potten, kist, relieken." },
];
window.PLANNING_DAGEN = { vooraf: "Vooraf", vr: "Vrijdag 13 nov", za: "Zaterdag 14 nov", zo: "Zondag 15 nov", ma: "Maandag 16 nov" };
