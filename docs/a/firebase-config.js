// Plak hier het firebaseConfig-blok uit Firebase (Projectinstellingen → Jouw apps → Web).
// Zolang dit null is, werkt alles via de lokale server op de laptop (node app/server.mjs), of los in de browser.
window.FIREBASE_CONFIG = null;

// Iedere Wachter logt in met zijn eigen account uit Firebase Authentication: <naam>@<domein>.
// De admins bedienen de tv en de regie en bepalen wie de verrader is. Wachtwoorden staan nergens in de code.
window.KRONIEKEN_LOGIN = { domein: "petjoempa.nl", admins: ["rob", "jean", "roland"] };
