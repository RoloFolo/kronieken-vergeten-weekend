// Verbinding tussen tv, regie en Chaos Lord.
//   Firebase (als a/firebase-config.js een config heeft): /stand wordt door de tv geschreven, /opdrachten door regie en Chaos Lord.
//   Anders de lokale server (app/server.mjs): /api/stand en /api/stroom.
//   Anders niets: de pagina werkt dan alleen op zichzelf (zoals de concept-artifact).
//
// Gebruik:  await Koppeling.start({ rol: "tv" | "regie" | "chaos", opStand(stand), opOpdracht(o) })
//           Koppeling.meldStand(stand)   (tv)      Koppeling.stuur(opdracht)   (regie, chaos)
const FB = "https://www.gstatic.com/firebasejs/10.12.2/";

function inlogScherm(rol) {
  return new Promise((klaar) => {
    const el = document.createElement("div");
    el.className = "inlog";
    el.innerHTML = `<form class="inlog-kaart"><h1 class="carved">${rol === "chaos" ? "De Chaos Lord" : "De Wachters"}</h1>
      <p>${rol === "tv" ? "Log één keer in op deze laptop met het regie-wachtwoord." : "Wachtwoord"}</p>
      <input type="password" id="inlog-ww" autocomplete="current-password" aria-label="Wachtwoord" required>
      <button type="submit" class="inlog-knop"><span class="carved">Open</span></button><p class="inlog-fout" id="inlog-fout" hidden></p></form>`;
    const stijl = document.createElement("style");
    stijl.textContent = `.inlog{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:16px;background:radial-gradient(ellipse at 50% 30%,#2a0c10,#070405 70%)}
      .inlog-kaart{width:min(420px,100%);display:grid;gap:14px;text-align:center;padding:28px 22px;background:linear-gradient(180deg,rgba(30,14,14,.92),rgba(12,6,7,.96));border:2px solid #6e5230;box-shadow:inset 0 0 0 1px rgba(226,50,60,.4),0 20px 60px #000;color:#efe3d4;font:16px/1.4 "Source Sans 3",system-ui,sans-serif}
      .inlog-kaart h1{margin:0;font:700 26px/1.1 "Cinzel",Georgia,serif;letter-spacing:.1em;text-transform:uppercase}
      .inlog-kaart p{margin:0;color:#a89488}
      .inlog-kaart input{font:inherit;color:#efe3d4;background:rgba(0,0,0,.4);border:1px solid rgba(239,227,212,.3);border-radius:8px;padding:12px;text-align:center}
      .inlog-knop{font:inherit;cursor:pointer;padding:12px;border:1px solid #b8955f;border-radius:8px;background:rgba(184,149,95,.15);color:#f1dfb6}
      .inlog-fout{color:#ff8a8a!important}`;
    document.head.appendChild(stijl); document.body.appendChild(el);
    const form = el.querySelector("form");
    form.onsubmit = (e) => { e.preventDefault(); klaar({ ww: el.querySelector("#inlog-ww").value, toonFout: (t) => { const f = el.querySelector("#inlog-fout"); f.hidden = false; f.textContent = t; }, weg: () => el.remove() }); };
    setTimeout(() => el.querySelector("#inlog-ww").focus(), 50);
  });
}

async function viaFirebase({ rol, opStand, opOpdracht, wachtwoord }) {
  const [{ initializeApp }, auth, db] = await Promise.all([import(FB + "firebase-app.js"), import(FB + "firebase-auth.js"), import(FB + "firebase-database.js")]);
  const app = initializeApp(window.FIREBASE_CONFIG);
  const a = auth.getAuth(app); await auth.setPersistence(a, auth.browserLocalPersistence);
  const email = window.KRONIEKEN_ACCOUNTS[rol === "chaos" ? "chaos" : "regie"];
  await new Promise((ok) => { const stop = auth.onAuthStateChanged(a, () => { stop(); ok(); }); });
  if (wachtwoord && (!a.currentUser || a.currentUser.email !== email)) { try { await auth.signInWithEmailAndPassword(a, email, wachtwoord); } catch {} }
  while (!a.currentUser || a.currentUser.email !== email) {
    const scherm = await inlogScherm(rol);
    try { await auth.signInWithEmailAndPassword(a, email, scherm.ww); scherm.weg(); }
    catch { scherm.toonFout("Dat wachtwoord klopt niet."); await new Promise((ok) => setTimeout(ok, 1200)); scherm.weg(); }
  }
  const d = db.getDatabase(app);
  db.onValue(db.ref(d, "stand"), (s) => opStand?.(s.val() || {}));
  if (rol === "tv") db.onChildAdded(db.ref(d, "opdrachten"), (s) => { const o = s.val(); db.remove(s.ref); if (o && Date.now() - (o.t || 0) < 60000) opOpdracht?.(o); });
  return {
    soort: "firebase",
    meldStand: (stand) => db.set(db.ref(d, "stand"), JSON.parse(JSON.stringify(stand))).catch(() => {}),
    stuur: (o) => db.push(db.ref(d, "opdrachten"), { ...o, t: Date.now() }).catch(() => {}),
  };
}

async function viaServer({ rol, opStand, opOpdracht }) {
  const r = await fetch("/api/stand"); if (!r.ok) throw new Error("geen server");
  const bron = new EventSource("/api/stroom");
  bron.addEventListener("stand", (e) => opStand?.(JSON.parse(e.data)));
  if (rol === "tv") bron.addEventListener("opdracht", (e) => opOpdracht?.(JSON.parse(e.data)));
  const post = (pad, o) => fetch(pad, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }).catch(() => {});
  return { soort: "server", bron, meldStand: (s) => post("/api/stand", s), stuur: (o) => post("/api/opdracht", o) };
}

window.Koppeling = {
  verbinding: null,
  async start(opties) {
    try { this.verbinding = window.FIREBASE_CONFIG ? await viaFirebase(opties) : await viaServer(opties); }
    catch { this.verbinding = null; }
    return this.verbinding;
  },
  meldStand(s) { this.verbinding?.meldStand(s); },
  stuur(o) { this.verbinding?.stuur(o); },
};
window.dispatchEvent(new Event("koppeling-klaar"));
