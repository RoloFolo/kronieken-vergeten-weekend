// De Ronde Tafel: de elf Wachters rond de geschilderde tafel, elk met zijn rol-medaillon.
// Gedeeld door de tv (paneel "tafel") en de spelers-app (tabblad "Tafel").
//   Tafel.teken(doos, { open, gekozen, opKies(wachter, rol) })   open: rollen zichtbaar (na de Eerste Dronk)
//   Tafel.details(rol, wachter) → html van de rolkaart (passief, kracht, Zegels)
(() => {
  const ZEGEL = { vlam: "Vlam van Waakzaamheid", hoorn: "Hoorn van Overvloed", schild: "Schild van Broederschap", hart: "Hart van de Ardennen" };
  const schoon = (t) => String(t).replace(/[&<>"]/g, (k) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[k]);
  const stijl = document.createElement("style");
  stijl.textContent = `
  .tafel { position: relative; width: 100%; aspect-ratio: 1; container-type: inline-size; }
  .tafel .blad { position: absolute; inset: 13%; border-radius: 50%; background: url("a/tafel.webp") center / cover no-repeat;
    box-shadow: 0 18px 50px #000, 0 0 60px rgba(226,50,60,.25); }
  .tafel .stoel { position: absolute; width: 17%; translate: -50% -50%; display: grid; justify-items: center; gap: .6cqi; padding: 0; border: 0; background: none; color: inherit; cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent; }
  .tafel .stoel img { width: 15cqi; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,.85)); transition: transform .3s, filter .3s; }
  .tafel .stoel.dicht img { filter: brightness(.18) sepia(1) hue-rotate(-30deg) saturate(3) drop-shadow(0 4px 8px rgba(0,0,0,.85)); }
  .tafel .stoel b { font: 700 3.1cqi/1.05 "Cinzel", Georgia, serif; letter-spacing: .04em; text-transform: uppercase; color: #f1dfb6; text-shadow: 0 1px 3px #000, 0 0 8px #000; white-space: nowrap; }
  .tafel .stoel small { font: 2.3cqi/1.1 "Source Sans 3", Arial, sans-serif; color: #c9b5a6; text-shadow: 0 1px 3px #000; white-space: nowrap; }
  .tafel .stoel:hover img, .tafel .stoel:focus-visible img { transform: scale(1.08); }
  .tafel .stoel:focus-visible { outline: none; }
  .tafel .stoel.gekozen img { transform: scale(1.14); filter: drop-shadow(0 0 3cqi rgba(255,170,80,.95)) drop-shadow(0 4px 8px rgba(0,0,0,.85)); }
  .tafel .stoel.gekozen b { color: #ffd98a; }
  .rolkaart { display: grid; gap: 10px; text-align: left; }
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
    teken(doos, { open = true, gekozen = null, opKies } = {}) {
      const W = window.WACHTERS || [], n = W.length;
      doos.innerHTML = `<div class="tafel"><div class="blad"></div>${W.map((w, i) => {
        const hoek = (i / n) * Math.PI * 2 - Math.PI / 2, x = 50 + Math.cos(hoek) * 41, y = 50 + Math.sin(hoek) * 41, rol = rolVan(w);
        const zien = open && rol;
        return `<button class="stoel ${zien ? "" : "dicht"} ${gekozen === w.naam ? "gekozen" : ""}" type="button" data-naam="${schoon(w.naam)}" style="left:${x}%;top:${y}%"
          aria-label="${schoon(w.naam)}${zien ? `, ${schoon(rol.naam)}` : ""}"><img src="${zien ? `a/rollen/${rol.id}.webp` : "a/medaillon-vlam.webp"}" alt="">
          <b>${schoon(w.naam)}</b><small>${zien ? schoon(rol.naam.replace(/^The /, "")) : "verzegeld"}</small></button>`;
      }).join("")}</div>`;
      doos.querySelector(".tafel").onclick = (e) => {
        const b = e.target.closest(".stoel"); if (!b) return; const w = W.find((x) => x.naam === b.dataset.naam);
        doos.querySelectorAll(".stoel").forEach((s) => s.classList.toggle("gekozen", s === b)); opKies?.(w, open ? rolVan(w) : null);
      };
    },
    rolVan,
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
