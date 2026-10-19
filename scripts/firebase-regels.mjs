// Builds app/firebase-regels.json: the live rules, plus the same rules under "test" for the test session (?test in the links).
// The portraits are shared by both sessions. Run: node scripts/firebase-regels.mjs, then paste the file into the Firebase console.
import { readFileSync, writeFileSync } from "node:fs";
const f = new URL("../app/firebase-regels.json", import.meta.url);
const regels = JSON.parse(readFileSync(f, "utf8"));
const admin = "auth != null && auth.token.email.matches(/^(rob|jean|roland)@petjoempa[.]nl$/)";
const live = Object.fromEntries(Object.entries(regels.rules).filter(([k]) => k !== "test"));
live.herstel = { ".read": admin, ".write": admin }; // restore points the tv makes before resets and on request
const gedeeld = ["portretten", "portretten-groot"];
const test = JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(live).filter(([k]) => !gedeeld.includes(k))))
  .replaceAll("root.child('verraad')", "root.child('test').child('verraad')"));
regels.rules = { ...live, test };
writeFileSync(f, JSON.stringify(regels, null, 2) + "\n");
console.log("ok:", Object.keys(regels.rules).join(", "), "| test:", Object.keys(test).join(", "));
