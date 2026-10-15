// Plak hier het firebaseConfig-blok uit Firebase (Projectinstellingen → Jouw apps → Web).
// Zolang dit null is, werkt alles via de lokale server op de laptop (node app/server.mjs), of los in de browser.
window.FIREBASE_CONFIG = null;

// De twee accounts uit Firebase Authentication. Het wachtwoord staat nergens in de code.
window.KRONIEKEN_ACCOUNTS = { regie: "regie@kronieken.app", chaos: "chaos@kronieken.app" };
