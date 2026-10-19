// Verbinding tussen tv, regie, verrader en de persoonlijke pagina's.
//   Firebase (als a/firebase-config.js een config heeft): iedere Wachter logt in met zijn eigen account.
//     /stand       tv schrijft, alleen admins lezen
//     /publiek     tv schrijft, iedereen leest (hal open, eed)
//     /verraad/<e> tv schrijft alleen voor de huidige verrader; ieder leest alleen zijn eigen plek
//     /opdrachten  admins sturen alles, de huidige verrader alleen chaos-opdrachten
//     /ere         de eretitels: welke Wachter welke titel krijgt (alleen admins)
//     /vooraf/<e>  ieder schrijft en leest alleen zijn eigen plek (bevel aanvaard, herinneringen, kamerwens); admins lezen alles
//     /larp        Stefans Spel der Rollen: gestart en algemeen leest iedereen, voor/<e> alleen die Wachter; Stefan en de admins schrijven
//     /portretten  de schilderijen van de Wachters (data-URL per naam): iedereen die is ingelogd leest, admins schrijven (a/portretten.js)
//   Anders de lokale server (app/server.mjs): /api/stand en /api/stroom.
//   Anders niets: de pagina werkt dan alleen op zichzelf.
//
// Gebruik:  await Koppeling.start({ rol: "tv" | "regie" | "chaos" | "wachter", naam, opStand, opOpdracht, opPubliek, opVerraad, opVooraf })
//           Koppeling.vooraf(pad, waarde)   (wachter: schrijft in zijn eigen /vooraf-plek; null wist)
//           Koppeling.meldStand(stand)   (tv)      Koppeling.stuur(opdracht)   (regie, verrader)
//           Koppeling.ik = { email, naam, admin }  (na inloggen via Firebase)
const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
// Two sessions in one database: live (the players) and test (?test in the link: everything under /test, the portraits shared).
// Testing, resets and restore points in the test session never touch the players' live data.
const SESSIE = new URLSearchParams(location.search).has("test") ? "test/" : "";
const sessiePad = (pad) => SESSIE + pad;
window.KRONIEKEN_SESSIE = SESSIE ? "test" : "live";
if (SESSIE) addEventListener("DOMContentLoaded", () => { const b = document.createElement("div"); b.textContent = "TEST";
  b.style.cssText = "position:fixed;top:6px;right:6px;z-index:9999;padding:3px 9px;font:700 12px/1 Cinzel,Georgia,serif;letter-spacing:.2em;color:#170a03;background:#ffd23f;border:2px solid #000;border-radius:4px;box-shadow:0 2px 8px #000;pointer-events:none";
  document.body.appendChild(b); });
const LOGIN = () => window.KRONIEKEN_LOGIN || { domein: "", admins: [] };
const sleutel = (email) => String(email).toLowerCase().replaceAll(".", ","); // Firebase keys cannot contain dots
const naamVan = (email) => { const kort = String(email).split("@")[0].toLowerCase(); return (window.WACHTERS || []).find((w) => w.naam.toLowerCase() === kort)?.naam || kort; };
const isAdmin = (email) => { const [kort, dom] = String(email).toLowerCase().split("@"); return dom === LOGIN().domein && LOGIN().admins.includes(kort); };
const emailVan = (naam) => `${String(naam).toLowerCase()}@${LOGIN().domein}`;

function stijlEenmaal() {
  if (document.getElementById("inlog-stijl")) return;
  const stijl = document.createElement("style"); stijl.id = "inlog-stijl";
  stijl.textContent = `.inlog{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:16px;background:radial-gradient(ellipse at 50% 30%,#2a0c10,#070405 70%)}
    .inlog-kaart{width:min(420px,100%);display:grid;gap:14px;text-align:center;padding:28px 22px;background:linear-gradient(180deg,rgba(30,14,14,.92),rgba(12,6,7,.96));border:2px solid #6e5230;box-shadow:inset 0 0 0 1px rgba(226,50,60,.4),0 20px 60px #000;color:#efe3d4;font:16px/1.4 "Source Sans 3",system-ui,sans-serif}
    .inlog-kaart img{width:min(240px,70%);justify-self:center}
    .inlog-kaart h1{margin:0;font:700 24px/1.1 "Cinzel",Georgia,serif;letter-spacing:.1em;text-transform:uppercase;color:#f1dfb6}
    .inlog-kaart p{margin:0;color:#a89488}
    .inlog-kaart input{font:inherit;color:#efe3d4;background:rgba(0,0,0,.4);border:1px solid rgba(239,227,212,.3);border-radius:8px;padding:12px;text-align:center}
    .inlog-knop{font:inherit;cursor:pointer;padding:12px;border:1px solid #b8955f;border-radius:8px;background:rgba(184,149,95,.15);color:#f1dfb6;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    .inlog-fout{color:#ff8a8a!important}`;
  document.head.appendChild(stijl);
}

function inlogScherm(rol, voorEmail) {
  stijlEenmaal();
  return new Promise((klaar) => {
    const el = document.createElement("div");
    el.className = "inlog";
    const uitleg = rol === "tv" ? "Log één keer in op deze laptop met het account van een van de hoeders." : rol === "regie" ? "Alleen voor de hoeders van de Hall." : "Log in met jouw eigen account.";
    el.innerHTML = `<form class="inlog-kaart"><img src="a/logo.webp" alt=""><h1>${rol === "regie" || rol === "tv" ? "De Hoeders" : "Wachter, meld je"}</h1>
      <p>${uitleg}</p>
      <input type="email" id="inlog-email" autocomplete="username" aria-label="E-mailadres" placeholder="naam@${LOGIN().domein}" required value="${voorEmail || ""}">
      <input type="password" id="inlog-ww" autocomplete="current-password" aria-label="Wachtwoord" placeholder="Wachtwoord" required>
      <button type="submit" class="inlog-knop">Open</button><p class="inlog-fout" id="inlog-fout" hidden></p></form>`;
    document.body.appendChild(el);
    el.querySelector("form").onsubmit = (e) => { e.preventDefault(); klaar({ email: el.querySelector("#inlog-email").value.trim().toLowerCase(), ww: el.querySelector("#inlog-ww").value,
      toonFout: (t) => { const f = el.querySelector("#inlog-fout"); f.hidden = false; f.textContent = t; }, weg: () => el.remove() }); };
    setTimeout(() => el.querySelector(voorEmail ? "#inlog-ww" : "#inlog-email").focus(), 50);
  });
}

function geenToegang(email) {
  stijlEenmaal();
  return new Promise((klaar) => {
    const el = document.createElement("div"); el.className = "inlog";
    el.innerHTML = `<div class="inlog-kaart"><img src="a/logo.webp" alt=""><h1>Geen toegang</h1><p>Je bent ingelogd als ${email}. Deze pagina is alleen voor de hoeders van de Hall.</p>
      <button type="button" class="inlog-knop">Ander account</button><a href="wachter.html" style="color:#d8bf8f">Naar mijn eigen pagina</a></div>`;
    document.body.appendChild(el);
    el.querySelector("button").onclick = () => { el.remove(); klaar(); };
  });
}

async function viaFirebase({ rol, naam, opStand, opOpdracht, opPubliek, opVerraad, opVooraf, opEre, opLarp }) {
  const [{ initializeApp }, auth, db] = await Promise.all([import(FB + "firebase-app.js"), import(FB + "firebase-auth.js"), import(FB + "firebase-database.js")]);
  const app = initializeApp(window.FIREBASE_CONFIG);
  const a = auth.getAuth(app); await auth.setPersistence(a, auth.browserLocalPersistence);
  await new Promise((ok) => { const stop = auth.onAuthStateChanged(a, () => { stop(); ok(); }); });
  const alleenAdmin = rol === "tv" || rol === "regie";
  let voor = naam ? emailVan(naam) : "";
  try { voor ||= localStorage.getItem("kronieken-email") || ""; } catch {}
  for (;;) {
    if (a.currentUser && (!alleenAdmin || isAdmin(a.currentUser.email))) break;
    if (a.currentUser) { await geenToegang(a.currentUser.email); await auth.signOut(a); continue; }
    const scherm = await inlogScherm(rol, voor);
    try { await auth.signInWithEmailAndPassword(a, scherm.email, scherm.ww); scherm.weg(); try { localStorage.setItem("kronieken-email", scherm.email); } catch {} }
    catch { scherm.toonFout("Dat klopt niet. Controleer e-mailadres en wachtwoord."); voor = scherm.email; await new Promise((ok) => setTimeout(ok, 1400)); scherm.weg(); }
  }
  const email = a.currentUser.email.toLowerCase();
  window.Koppeling.ik = { email, naam: naamVan(email), admin: isAdmin(email) };
  const d = db.getDatabase(app);
  // The login token lives one hour. When a phone or laptop sleeps past that, the database cancels every
  // listener that needs the login and refuses writes, while the page still looks connected. So: keep the
  // token fresh, listen again after a cancel, retry a refused write once with a new token, and report it.
  const status = { online: false, kapot: 0, fout: 0 };
  const meld = () => window.dispatchEvent(new CustomEvent("koppeling-status", { detail: { ...status } }));
  const vers = (forceer) => a.currentUser ? a.currentUser.getIdToken(forceer).catch(() => null) : Promise.resolve(null);
  setInterval(() => vers(false), 4 * 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) vers(false); });
  auth.onAuthStateChanged(a, (u) => { if (!u) location.reload(); });
  db.onValue(db.ref(d, ".info/connected"), (s) => { status.online = !!s.val(); if (status.online) vers(false); meld(); });
  const luister = (soort, pad, op) => {
    let poging = 0, weg = false;
    const start = () => soort(db.ref(d, sessiePad(pad)), (s) => { if (weg) { weg = false; status.kapot--; meld(); } poging = 0; op(s); }, async () => {
      if (!weg) { weg = true; status.kapot++; meld(); }
      await vers(true);
      setTimeout(start, Math.min(30000, 1500 * 2 ** poging++));
    });
    start();
  };
  const metToken = async (doe) => {
    try { await doe(); status.fout = 0; meld(); return true; }
    catch { await vers(true); try { await doe(); status.fout = 0; meld(); return true; } catch { status.fout++; meld(); return false; } }
  };
  if (alleenAdmin) luister(db.onValue, "stand", (s) => opStand?.(s.val() || {}));
  if (rol === "tv") luister(db.onChildAdded, "opdrachten", (s) => { const o = s.val(); db.remove(s.ref).catch(() => {}); if (o && Date.now() - (o.t || 0) < 60000) opOpdracht?.(o); });
  if (rol === "wachter") luister(db.onValue, "publiek", (s) => opPubliek?.(s.val() || {}));
  // a cancelled listener says nothing about the role: never treat it as "no longer the traitor"
  if (rol === "wachter" || rol === "chaos") luister(db.onValue, `verraad/${sleutel(email)}`, (s) => { opVerraad?.(s.val()); if (rol === "chaos") opStand?.(s.val() || {}); });
  if (rol === "wachter") luister(db.onValue, `vooraf/${sleutel(email)}`, (s) => opVooraf?.(s.val() || {}));
  if (rol === "regie" || rol === "tv") luister(db.onValue, "vooraf", (s) => opVooraf?.(s.val() || {})); // the tv only reads it for the credits
  if (alleenAdmin) luister(db.onValue, "ere/toewijzing", (s) => opEre?.(s.val() || {}));
  if (rol === "wachter") { // the LARP: has Stefan kicked off, his story for everyone, and the secret task for this Wachter (no access yet: silent)
    const larp = {}; const zend = () => opLarp?.({ ...larp });
    for (const [k, pad] of [["gestart", "larp/gestart"], ["algemeen", "larp/algemeen"], ["mijn", `larp/voor/${sleutel(email)}`]]) db.onValue(db.ref(d, sessiePad(pad)), (s) => { larp[k] = s.val(); zend(); }, () => {});
  }
  if (rol !== "chaos" && window.Portret) window.Portret.laadGroot = (naam) => db.get(db.ref(d, `portretten-groot/${naam}`)).then((s) => s.val());
  if (rol !== "chaos") db.onValue(db.ref(d, "portretten"), (s) => window.Portret?.zet(s.val() || {}), () => {}); // no access (rules not yet published): just no portraits, no connection alarm
  return {
    soort: "firebase",
    meldStand: (stand) => {
      const schrijf = (pad, w) => metToken(() => db.set(db.ref(d, sessiePad(pad)), w));
      schrijf("stand", JSON.parse(JSON.stringify(stand)));
      if (stand.publiek) schrijf("publiek", stand.publiek);
      // only the current traitor gets a node, with just what the traitor panel needs
      const v = stand.verrader;
      schrijf("verraad", v ? { [sleutel(emailVan(v.naam))]: { naam: v.naam, sinds: v.sinds, tot: v.tot || null, fiches: stand.fiches, scherm: stand.scherm, chaos: stand.chaos || null } } : null);
    },
    stuur: (o) => metToken(() => db.push(db.ref(d, sessiePad("opdrachten")), { ...o, van: email, t: Date.now() })),
    uitloggen: () => auth.signOut(a),
    vooraf: (pad, waarde) => metToken(() => db.set(db.ref(d, sessiePad(`vooraf/${sleutel(email)}/${pad}`)), waarde)),
    ere: alleenAdmin ? (i, naam) => metToken(() => db.set(db.ref(d, sessiePad(`ere/toewijzing/t${i}`)), naam || null)) : null,
    // restore points: the tv stores a copy of the whole state; the regie lists them and asks the tv to go back to one
    // the list is small (time and reason), the copies are big and only fetched one at a time; at most 40 are kept
    herstelBewaar: alleenAdmin ? (stand, waarom) => metToken(async () => { const id = `h${Date.now()}`;
      await db.update(db.ref(d, sessiePad("herstel")), { [`lijst/${id}`]: { t: Date.now(), waarom: waarom || "" }, [`stand/${id}`]: JSON.parse(JSON.stringify(stand)) });
      const oud = Object.keys((await db.get(db.ref(d, sessiePad("herstel/lijst")))).val() || {}).sort().slice(0, -40);
      if (oud.length) await db.update(db.ref(d, sessiePad("herstel")), Object.fromEntries(oud.flatMap((k) => [[`lijst/${k}`, null], [`stand/${k}`, null]]))); }) : null,
    herstelLijst: alleenAdmin ? () => db.get(db.ref(d, sessiePad("herstel/lijst"))).then((s) => Object.entries(s.val() || {}).map(([id, h]) => ({ id, t: h.t, waarom: h.waarom })).sort((a, b) => b.t - a.t)) : null,
    herstelHaal: alleenAdmin ? (id) => db.get(db.ref(d, sessiePad(`herstel/stand/${id}`))).then((s) => s.val()) : null,
    larp: (algemeen, perNaam, aan) => metToken(() => db.update(db.ref(d, sessiePad("larp")), { gestart: aan ? Date.now() : null, algemeen: algemeen || null,
      ...Object.fromEntries(Object.entries(perNaam || {}).map(([n, t]) => [`voor/${sleutel(emailVan(n))}`, t || null])) })),
    portret: alleenAdmin ? (naam, url, groot) => metToken(() => Promise.all([db.set(db.ref(d, `portretten/${naam}`), url || null), db.set(db.ref(d, `portretten-groot/${naam}`), groot || null)])) : null,
  };
}

async function viaServer({ rol, opStand, opOpdracht, opPubliek }) {
  const r = await fetch("/api/stand"); if (!r.ok) throw new Error("geen server");
  const eerste = await r.json();
  const bron = new EventSource("/api/stroom");
  bron.addEventListener("stand", (e) => { const s = JSON.parse(e.data); opStand?.(s); opPubliek?.(s.publiek || {}); });
  if (rol === "wachter") opPubliek?.(eerste.publiek || {});
  if (rol === "tv") bron.addEventListener("opdracht", (e) => opOpdracht?.(JSON.parse(e.data)));
  const post = (pad, o) => fetch(pad, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }).catch(() => {});
  return { soort: "server", bron, meldStand: (s) => post("/api/stand", s), stuur: (o) => post("/api/opdracht", o),
    herstelBewaar: (s, waarom) => post("/api/herstel", { waarom, stand: s }).then(() => true),
    herstelLijst: () => fetch("/api/herstel").then((r) => r.json()),
    herstelHaal: (id) => fetch(`/api/herstel?id=${encodeURIComponent(id)}`).then((r) => r.json()) };
}

window.Koppeling = {
  verbinding: null, ik: null, emailVan, isAdmin,
  async start(opties) {
    try { this.verbinding = window.FIREBASE_CONFIG ? await viaFirebase(opties) : await viaServer(opties); }
    catch (e) { console.warn("Koppeling:", e); this.verbinding = null; }
    return this.verbinding;
  },
  meldStand(s) { this.verbinding?.meldStand(s); },
  stuur(o) { return this.verbinding?.stuur(o); },
  uitloggen() { return this.verbinding?.uitloggen?.(); },
  ere(i, naam) { return this.verbinding?.ere ? this.verbinding.ere(i, naam) : null; },
  vooraf(pad, waarde) { return this.verbinding?.vooraf ? this.verbinding.vooraf(pad, waarde) : Promise.resolve(false); },
  herstelBewaar(stand, waarom) { return this.verbinding?.herstelBewaar ? this.verbinding.herstelBewaar(stand, waarom) : Promise.resolve(false); },
  herstelLijst() { return this.verbinding?.herstelLijst ? this.verbinding.herstelLijst() : Promise.resolve([]); },
  herstelHaal(id) { return this.verbinding?.herstelHaal ? this.verbinding.herstelHaal(id) : Promise.resolve(null); },
  larp(algemeen, perNaam, aan) { return this.verbinding?.larp ? this.verbinding.larp(algemeen, perNaam, aan) : Promise.resolve(false); },
  portret(naam, url, groot) { return this.verbinding?.portret ? this.verbinding.portret(naam, url, groot) : Promise.resolve(false); },
};
window.dispatchEvent(new Event("koppeling-klaar"));
