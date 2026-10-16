// Plak hier het firebaseConfig-blok uit Firebase (Projectinstellingen → Jouw apps → Web).
// De web-config is niet geheim; de beveiliging zit in de databaseregels (app/firebase-regels.json).
// Zolang dit null is, werkt alles via de lokale server op de laptop (node app/server.mjs), of los in de browser.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB4zycvuoBG9aqvILzK58DOEsxKHDN1fuc",
  authDomain: "vriendenweekend2026-687b8.firebaseapp.com",
  databaseURL: "https://vriendenweekend2026-687b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vriendenweekend2026-687b8",
  storageBucket: "vriendenweekend2026-687b8.firebasestorage.app",
  messagingSenderId: "826322289092",
  appId: "1:826322289092:web:dfbcca59e868b68eaee491",
};

// Iedere Wachter logt in met zijn eigen account uit Firebase Authentication: <naam>@<domein>.
// De admins bedienen de tv en de regie en bepalen wie de verrader is. Wachtwoorden staan nergens in de code.
window.KRONIEKEN_LOGIN = { domein: "petjoempa.nl", admins: ["rob", "jean", "roland"] };
