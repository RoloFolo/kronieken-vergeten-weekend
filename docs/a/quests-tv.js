// Quests die de regie op de tv start (tab Quests): vijf digitale quests, de klassemomenten en de poses voor de groepsfoto.
// zegel: welk Zegel fiches krijgt als het lukt; fiches: hoeveel; sec: de timer.
window.QUESTS_TV = {
  stil: { naam: "De Stille Wachters", zegel: "hart", fiches: 2, sec: 60,
    tekst: "Het Schaduworkest speelt. Zestig tellen lang lacht niemand en zegt niemand iets. Wie lacht, laat de broederschap falen." },
  foto: { naam: "De Groepsfoto", zegel: "schild", fiches: 2, sec: 180,
    tekst: "Alle elf Wachters op één foto, binnen drie minuten, in deze pose:" },
  wie: { naam: "Wie is dit?", zegel: null,
    tekst: "Een Wachter, van heel dichtbij. Wie hem het eerst herkent, roept zijn naam." },
  zei: { naam: "Wie zei het?", zegel: null,
    tekst: "Deze woorden vielen dit weekend. Wie sprak ze?" },
  geheugen: { naam: "Het Zegelgeheugen", zegel: null,
    tekst: "Kijk naar de Zegels. Roep ze daarna samen in de juiste volgorde. Elke ronde komt er één bij." },
};

window.QUEST_POSES = [
  "Het Laatste Avondmaal: allemaal aan één kant van de tafel, de held van de dag in het midden.",
  "De overwinning: de held van de dag op de schouders van de rest.",
  "De bestorming van het kasteel: wapens geheven, monden open, één Wachter sneuvelt dramatisch.",
  "De Nachtwacht: schouder aan schouder, plechtig, met lampen of kaarsen.",
  "Elf slapers bij het vuur, en één Wachter houdt de wacht.",
  "De hoes van het nieuwe album van de boyband ‘Bouillon’.",
  "Het familieportret van een adellijk huis: wie het belangrijkst is, staat het hoogst.",
  "De Wachters ontdekken de Schaduw: iedereen wijst geschrokken naar dezelfde plek.",
];

// Per klasse twee quests. {naam} = de hoofdpersoon, {mee} = de meespelers; mee = hoeveel meespelers.
window.KLASSE_QUESTS = {
  Cleric: [
    { naam: "De Zegening", zegel: "hart", mee: 3, tekst: "{naam} zegent {mee}. Zij knielen; hij spreekt een plechtige zegen uit en tekent een druppel op hun voorhoofd." },
    { naam: "De Biecht", zegel: "hart", mee: 3, tekst: "{mee} biechten elk één kleine zonde van dit weekend aan {naam}. Hij legt ieder een passende boete op, die meteen wordt uitgevoerd." },
  ],
  Fighter: [
    { naam: "Het Duel", zegel: "schild", mee: 2, tekst: "{naam} vecht tegen {mee}: opblaaszwaarden, minstens twee minuten, ieder tegen ieder. De groep kiest de winnaar." },
    { naam: "De Wapenschouw", zegel: "schild", mee: 3, tekst: "{naam} drilt {mee}: bedenk samen een krijgskreet en breng hem in formatie, drie keer, steeds harder." },
  ],
  Alchemist: [
    { naam: "Het Elixer van Drie", zegel: "hoorn", mee: 3, tekst: "{naam} brouwt een shot met {mee}. Ieder kiest één ingrediënt. Samen drinken, en niemand trekt een gezicht." },
    { naam: "De Blinde Proef", zegel: "hoorn", mee: 2, tekst: "{mee} worden geblinddoekt. {naam} laat ze drie ingrediënten proeven; zij raden wat het is. Twee van de drie goed is geslaagd." },
  ],
  Wizard: [
    { naam: "De Betovering", zegel: "vlam", mee: 2, tekst: "{naam} betovert {mee}: hij spreekt een spreuk uit en bepaalt welk dier of personage zij vijf minuten lang zijn." },
    { naam: "De Toverformule", zegel: "vlam", mee: 3, tekst: "{naam} verzint een rijmende spreuk van vier regels. {mee} zeggen hem foutloos na." },
  ],
  Ranger: [
    { naam: "Het Spoor", zegel: "vlam", mee: 2, tekst: "{naam} verstopt een voorwerp. {mee} vinden het binnen drie minuten; hij helpt alleen met dierengeluiden: hoe dichterbij, hoe wilder." },
    { naam: "De Jachthoorn", zegel: "vlam", mee: 3, tekst: "{naam} doet vijf dierengeluiden na. {mee} raden welk dier. Vier goed is geslaagd." },
  ],
  Bard: [
    { naam: "De Ballade", zegel: "hoorn", mee: 2, tekst: "{naam} schrijft met {mee} een couplet over een andere Wachter, op een bekende melodie. Daarna zingen ze het voor de Hall." },
    { naam: "Het Drieluik", zegel: "hoorn", mee: 3, tekst: "{naam} begint een gedicht over dit weekend met één regel. {mee} maken het af, ieder één regel. Het moet rijmen." },
  ],
  Thief: [
    { naam: "De Zakkenroller", zegel: "schild", mee: 2, tekst: "{naam} steelt binnen tien minuten ongemerkt een voorwerp van {mee}. Wordt hij betrapt, dan mislukt het." },
    { naam: "Leugen en Waarheid", zegel: "schild", mee: 3, tekst: "{naam} vertelt drie verhalen over zichzelf; één is gelogen. {mee} zoeken samen de leugen. Vinden ze hem, dan is het geslaagd." },
  ],
  Monk: [
    { naam: "De Meditatie", zegel: "hart", mee: 2, tekst: "{naam} leidt een yoga-oefening. {mee} doen hem na en houden de houding dertig tellen vol." },
    { naam: "De Stille Eed", zegel: "hart", mee: 3, tekst: "{naam} en {mee} zwijgen tien minuten en praten alleen met gebaren. Wie een woord zegt, laat het mislukken." },
  ],
  Paladin: [
    { naam: "De Eed", zegel: "schild", mee: 2, tekst: "{naam} laat {mee} knielend trouw zweren met een eed die hij ter plekke verzint, en slaat ze tot ridder." },
    { naam: "De Beschermer", zegel: "schild", mee: 2, tekst: "{naam} beschermt twee minuten een vol glas. {mee} proberen het hem af te pakken, zonder geweld. Staat het glas er nog, dan is het geslaagd." },
  ],
};
