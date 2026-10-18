// De Ronde Tafel: de elf Wachters rond de geschilderde tafel, elk met zijn rol-medaillon.
// Gedeeld door de tv (paneel "tafel") en de spelers-app (tabblad "Tafel").
//   Tafel.teken(doos, { open, gekozen, stand, opKies(wachter, rol) })   open: rollen zichtbaar (na de Eerste Dronk)
//     stand: { naam: XP } → wie de meeste XP heeft zit bovenaan aan het hoofd van de tafel, de rest met de klok mee; bij een nieuwe stand schuiven ze van plek
//   De portretten (a/portretten.js) staan op de stoelen zodra ze er zijn, anders het rol-medaillon.
//   Tafel.details(rol, wachter) → html van de rolkaart (passief, kracht, Zegels)
(() => {
  const ZEGEL = { vlam: "Vlam van Waakzaamheid", hoorn: "Hoorn van Overvloed", schild: "Schild van Broederschap", hart: "Hart van de Ardennen" };
  const schoon = (t) => String(t).replace(/[&<>"]/g, (k) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[k]);
  const stijl = document.createElement("style");
  stijl.textContent = `
  .tafel { position: relative; width: 100%; aspect-ratio: 1; container-type: inline-size; }
  .tafel .blad { position: absolute; inset: 13%; border-radius: 50%; background: url("a/tafel.webp") center / cover no-repeat;
    box-shadow: 0 18px 50px #000, 0 0 60px rgba(226,50,60,.25); }
  .tafel .stoel { position: absolute; width: 17%; translate: -50% -50%; display: grid; justify-items: center; gap: .6cqi; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent;
    transition: left 1.4s cubic-bezier(.5,0,.2,1), top 1.4s cubic-bezier(.5,0,.2,1); }
  .tafel .gezicht { position: relative; width: 14cqi; aspect-ratio: 1; border-radius: 50%; border: .5cqi solid #b8955f; box-shadow: 0 0 0 .3cqi #000, 0 4px 10px rgba(0,0,0,.85), 0 0 2.5cqi rgba(226,50,60,.45); transition: transform .3s, box-shadow .3s; background-color: #1a0d0e; }
  .tafel .stoel:hover .gezicht, .tafel .stoel:focus-visible .gezicht { transform: scale(1.08); }
  .tafel .stoel.gekozen .gezicht { transform: scale(1.14); border-color: #ffd98a; box-shadow: 0 0 0 .3cqi #000, 0 0 3.5cqi rgba(255,170,80,.95); }
  .tafel .stoel.dicht .gezicht { filter: saturate(.6) brightness(.85); }
  .tafel .xp { position: absolute; right: -2.6cqi; bottom: -1cqi; min-width: 6.4cqi; padding: .5cqi 1cqi; border-radius: 3cqi; font: 700 2.5cqi/1 "Cinzel", Georgia, serif; color: #170a03; background: linear-gradient(180deg, #f1dfb6, #c9a466); border: .25cqi solid #000; white-space: nowrap; }
  .tafel .stoel.hoofd .gezicht { border-color: #ffd98a; box-shadow: 0 0 0 .3cqi #000, 0 0 4cqi rgba(255,200,110,.85); }
  .tafel .kroon { position: absolute; left: 50%; top: -3.6cqi; translate: -50% 0; font-size: 4.4cqi; line-height: 1; color: #ffd98a; text-shadow: 0 0 1.5cqi rgba(255,200,110,.9), 0 1px 2px #000; }
  .tafel .plek { position: absolute; left: -2cqi; top: -1cqi; width: 5cqi; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; font: 700 2.4cqi/1 "Cinzel", Georgia, serif; color: #f1dfb6; background: #2a0c10; border: .25cqi solid #b8955f; }
  .tafel .stoel img { width: 15cqi; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,.85)); transition: transform .3s, filter .3s; }
  .tafel .stoel.dicht img { filter: brightness(.18) sepia(1) hue-rotate(-30deg) saturate(3) drop-shadow(0 4px 8px rgba(0,0,0,.85)); }
  .tafel .stoel b { font: 700 3.1cqi/1.05 "Cinzel", Georgia, serif; letter-spacing: .04em; text-transform: uppercase; color: #f1dfb6; text-shadow: 0 1px 3px #000, 0 0 8px #000; white-space: nowrap; }
  .tafel .stoel small { font: 2.3cqi/1.1 "Source Sans 3", Arial, sans-serif; color: #c9b5a6; text-shadow: 0 1px 3px #000; white-space: nowrap; }
  .tafel .stoel:hover img, .tafel .stoel:focus-visible img { transform: scale(1.08); }
  .tafel .stoel:focus-visible { outline: none; }
  .tafel .stoel.gekozen img { transform: scale(1.14); filter: drop-shadow(0 0 3cqi rgba(255,170,80,.95)) drop-shadow(0 4px 8px rgba(0,0,0,.85)); }
  .tafel .stoel.gekozen b { color: #ffd98a; }
  .rolkaart { display: grid; gap: 10px; text-align: left; }
  .rk-held { position: relative; margin: -22px -20px 4px; aspect-ratio: 2 / 2.6; background: #0b0607 center 12% / cover no-repeat; }
  .rk-held::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(24,8,10,.6) 80%, rgba(30,10,12,.97) 100%); }
  .rk-held b { position: absolute; z-index: 1; left: 0; right: 0; bottom: 34px; text-align: center; font: 700 30px/1 "Cinzel", Georgia, serif; letter-spacing: .06em; text-transform: uppercase; color: #f1dfb6; text-shadow: 0 2px 8px #000; }
  .rk-held small { position: absolute; z-index: 1; left: 0; right: 0; bottom: 14px; text-align: center; font: 600 12px/1 "Cinzel", Georgia, serif; letter-spacing: .2em; text-transform: uppercase; color: #efe3d4; text-shadow: 0 1px 4px #000; }
  .rolkaart.met-held .rk-kop { margin-top: -10px; }
  .rolkaart .rk-kop { display: grid; grid-template-columns: 64px 1fr; gap: 12px; align-items: center; }
  .rolkaart .rk-kop img { width: 64px; aspect-ratio: 1; object-fit: contain; }
  .rolkaart h3 { margin: 0; font: 700 20px/1.15 "Cinzel", Georgia, serif; color: #f1dfb6; }
  .rolkaart .rk-wie { font: 600 12px/1.2 "Cinzel", Georgia, serif; letter-spacing: .2em; text-transform: uppercase; color: #a89488; }
  .rolkaart .rk-tekst { margin: 0; font: italic 15px/1.5 "Libre Baskerville", Georgia, serif; }
  .rolkaart .rk-vm { padding: 10px 12px; border: 1px solid rgba(184,149,95,.35); background: rgba(0,0,0,.3); }
  .rolkaart .rk-vm span { display: block; font: 700 10px/1 "Cinzel", Georgia, serif; letter-spacing: .25em; text-transform: uppercase; color: #a89488; margin-bottom: 4px; }
  .rolkaart .rk-vm b { display: block; font: 700 15px/1.2 "Cinzel", Georgia, serif; color: #f1dfb6; margin-bottom: 3px; }
  .rolkaart .rk-vm p { margin: 0; font-size: 14px; line-height: 1.45; }
  .rolkaart .rk-zg { display: flex; gap: 10px; align-items: center; font: 600 12px/1.3 "Cinzel", Georgia, serif; text-transform: uppercase; color: #efe3d4; }
  .rolkaart .rk-zg img { width: 34px; }`;
  document.head.appendChild(stijl);

  const rolVan = (w) => (window.ROLLEN || []).find((r) => r.id === (window.ROL_VAN || {})[w.naam]);
  window.Tafel = {
    teken(doos, { open = true, gekozen = null, stand = null, opKies } = {}) {
      const W = window.WACHTERS || [], n = W.length;
      // seat order: by XP when there is a standing (the leader at the head of the table), otherwise the fixed order
      const volgorde = stand ? [...W].sort((a, b) => (stand[b.naam] || 0) - (stand[a.naam] || 0) || W.indexOf(a) - W.indexOf(b)) : W;
      const plek = (w) => { const i = volgorde.indexOf(w), hoek = (i / n) * Math.PI * 2 - Math.PI / 2; return [50 + Math.cos(hoek) * 41, 50 + Math.sin(hoek) * 41, i]; };
      const inhoud = (w) => { const rol = rolVan(w), zien = open && rol, [, , i] = plek(w), foto = window.Portret?.url(w.naam);
        return `${foto ? `<span class="gezicht" data-n="${schoon(w.naam)}">${stand && i === 0 && (stand[w.naam] || 0) > 0 ? '<span class="kroon">♛</span>' : ""}${stand ? `<span class="plek">${i + 1}</span><span class="xp">${stand[w.naam] || 0} XP</span>` : ""}</span>`
          : `<img src="${zien ? `a/rollen/${rol.id}.webp` : "a/medaillon-vlam.webp"}" alt="">`}<b>${schoon(w.naam)}</b><small>${zien ? schoon(rol.naam.replace(/^The /, "")) : "verzegeld"}</small>`; };
      const bestaand = doos.querySelector(".tafel");
      if (bestaand && bestaand.querySelectorAll(".stoel").length === n) { // already drawn: the seats glide to their new places
        bestaand.querySelectorAll(".stoel").forEach((b) => { const w = W.find((x) => x.naam === b.dataset.naam), [x, y, i] = plek(w), rol = rolVan(w), zien = open && rol;
          b.style.left = `${x}%`; b.style.top = `${y}%`; b.classList.toggle("dicht", !zien); b.classList.toggle("hoofd", !!stand && i === 0); b.classList.toggle("gekozen", gekozen === w.naam);
          b.innerHTML = inhoud(w); });
      } else doos.innerHTML = `<div class="tafel"><div class="blad"></div>${W.map((w) => {
        const [x, y, i] = plek(w), rol = rolVan(w), zien = open && rol;
        return `<button class="stoel ${zien ? "" : "dicht"} ${gekozen === w.naam ? "gekozen" : ""} ${stand && i === 0 ? "hoofd" : ""}" type="button" data-naam="${schoon(w.naam)}" style="left:${x}%;top:${y}%"
          aria-label="${schoon(w.naam)}${zien ? `, ${schoon(rol.naam)}` : ""}${stand ? `, ${stand[w.naam] || 0} XP` : ""}">${inhoud(w)}</button>`;
      }).join("")}</div>`;
      doos.querySelectorAll(".gezicht").forEach((el) => window.Portret.rond(el, el.dataset.n));
      doos.querySelector(".tafel").onclick = (e) => {
        const b = e.target.closest(".stoel"); if (!b) return; const w = W.find((x) => x.naam === b.dataset.naam);
        doos.querySelectorAll(".stoel").forEach((s) => s.classList.toggle("gekozen", s === b)); opKies?.(w, open ? rolVan(w) : null);
      };
    },
    rolVan,
    // the chosen Wachter's painting at the top of his card (small one at once, the large one when it has arrived)
    vulPortret(doos, w) { const P = window.Portret, u = P?.url(w.naam), kaart = doos.querySelector(".rolkaart"); if (!u || !kaart) return;
      const k = window.KARAKTER?.[w.naam], h = document.createElement("div"); h.className = "rk-held"; h.style.backgroundImage = `url(${u})`;
      h.innerHTML = `<b>${schoon(w.naam)}</b>${k ? `<small>${schoon(k.ras)} ${schoon(k.klasse)}</small>` : ""}`; kaart.prepend(h); kaart.classList.add("met-held");
      P.groot(w.naam).then((g) => { if (g && h.isConnected) h.style.backgroundImage = `url(${g})`; }); },
    details(rol, w) {
      if (!rol) return `<div class="rolkaart"><p class="rk-tekst">De rol van ${schoon(w?.naam ?? "deze Wachter")} is nog verzegeld.</p></div>`;
      return `<div class="rolkaart"><div class="rk-kop"><img src="a/rollen/${rol.id}.webp" alt=""><div><div class="rk-wie">${schoon(w?.naam ?? "")}</div><h3>${schoon(rol.naam)}</h3><div class="rk-wie">${schoon(rol.titel)}</div></div></div>
        <p class="rk-tekst">${schoon(rol.tekst)}</p>
        <div class="rk-vm"><span>Passief · altijd</span><b>${schoon(rol.passief[0])}</b><p>${schoon(rol.passief[1])}</p></div>
        <div class="rk-vm"><span>Kracht · één keer per dag</span><b>${schoon(rol.kracht[0])}</b><p>${schoon(rol.kracht[1])}</p></div>
        <div class="rk-zg">${rol.zegels.map((z) => `<img src="a/medaillon-${z}.webp" alt="">${ZEGEL[z]}`).join(" ")}</div></div>`;
    },
  };
})();
