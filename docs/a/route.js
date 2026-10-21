// De Route: de questkaart van het weekend, op de tv (liggend) en in de app (staand).
// Elke halte hoort bij een stap uit de planning (plan); is die stap klaar, dan is de halte gehaald.
// Zichtbaar: ± 12 uur vooraf. open: niet eerder dan dit moment. na: pas als die halte gehaald is (of vlak voor de eigen tijd).
// bevel: wiens moment het is (zijn portret op de kaart, en in zijn app altijd zichtbaar). link: tab in de app. nav: navigeren.
window.ROUTE = {
  haltes: [
    { id: "opening", plan: "vr-opening", tijd: "2026-11-13T17:00", naam: "Aankomst en de Eerste Dronk", icoon: "a/logo.webp", sub: "16:00 aankomst",
      info: "Vanaf 16:00 verzamelen bij het huisje. Om 17:00 opent Godfried de Kronieken, met de Eerste Dronk.", mee: "Je kostuum." },
    { id: "borrel", plan: "vr-borrel", tijd: "2026-11-13T17:45", naam: "De Legendarische Borrelplank", bevel: ["Geert", "Robin"], info: "Geert en Robin dekken de plank. De quests beginnen." },
    { id: "quiz1", plan: "vr-quiz1", tijd: "2026-11-13T19:00", naam: "Godfrieds Quiz I", icoon: "a/godfried/gezicht.webp", info: "Vier vragen, één per Zegel. Goed sterkt het Zegel, fout verzwakt het." },
    { id: "avondmaal", plan: "vr-avondmaal", tijd: "2026-11-13T19:15", naam: "Het Eerste Avondmaal", bevel: ["Jeroen"], info: "Jeroen voedt de Guild." },
    { id: "proeverij", plan: "vr-proeverij", tijd: "2026-11-13T21:00", naam: "De Proeverij van de Bard", bevel: ["Ivo"], info: "Ivo neemt de Wachters mee op een wijnreis van hooguit een uur." },
    { id: "ontbijt", plan: "za-ontbijt", tijd: "2026-11-14T09:30", naam: "Ontbijt met Ochtenddauw", bevel: ["Martin"], info: "Martins elixer tegen de nacht." },
    { id: "hfd2", plan: "za-hfd2", tijd: "2026-11-14T10:30", naam: "Godfrieds verhaal · II", icoon: "a/godfried/gezicht.webp", info: "Godfried vertelt verder. Luister goed: de quiz komt eruit." },
    { id: "taveerne", plan: "za-taveerne", tijd: "2026-11-14T11:00", naam: "De Taveerne van het Lot", bevel: ["Johan"], info: "Johan opent een uur lang zijn middeleeuwse taveerne." },
    { id: "quiz2", plan: "za-quiz2", tijd: "2026-11-14T17:30", naam: "Godfrieds Quiz II", icoon: "a/godfried/gezicht.webp", info: "Vier vragen, één per Zegel." },
    { id: "frituur", plan: "za-frituur", tijd: "2026-11-14T18:00", naam: "Meester van de Frituur", bevel: ["Roy"], info: "Roy beheert de Vetput." },
    { id: "tocht", plan: "za-tocht", tijd: "2026-11-14T20:30", naam: "De Wachterstocht", icoon: "a/route/kasteel.webp", anker: "kasteel", open: "2026-11-14T11:00", link: "tocht",
      nav: "https://www.google.com/maps/search/?api=1&query=Ch%C3%A2teau+fort+de+Bouillon",
      info: "± 20:00 vertrek bij het huisje. 20:20 op de parkeerplaats bij het kasteel, dan ± 10 minuten lopen naar de ingang. Om 20:30 begint de tocht door het kasteel.",
      mee: "Warme jas, goede schoenen en je kostuum." },
    { id: "kist", plan: "za-kist", tijd: "2026-11-14T22:00", naam: "De Reliekenkist", icoon: "a/kist/dicht.webp", na: "tocht", info: "Terug in de Hall: wat vond de broederschap in het kasteel?" },
    { id: "hfd3", plan: "za-hfd3", tijd: "2026-11-14T22:20", naam: "Godfrieds verhaal · III", icoon: "a/godfried/gezicht.webp", info: "Het laatste hoofdstuk van zijn leven." },
    { id: "larp", plan: "zo-larp", tijd: "2026-11-15T10:30", naam: "Het Spel der Rollen", bevel: ["Stefan"], link: "larp", info: "Stefans LARP, hooguit een uur.", mee: "Je kostuum, en schoenen waarin je kunt bewegen." },
    { id: "quiz3", plan: "zo-quiz3", tijd: "2026-11-15T13:30", naam: "Godfrieds Quiz III", icoon: "a/godfried/gezicht.webp", info: "De laatste vier vragen, vlak voor de finale." },
    { id: "finale", plan: "zo-finale", tijd: "2026-11-15T14:00", naam: "De Finale", icoon: "a/route/poort.webp", anker: "poort", na: "quiz3", info: "De broederschap tegen de Schaduwkoning." },
    { id: "ere", plan: "zo-titels", tijd: "2026-11-15T15:00", naam: "Ere en aftiteling", icoon: "a/logo.webp", na: "finale", info: "De eretitels, wie volgt in 2027, en de aftiteling." },
  ],
  // the road on each painting (fractions of width and height), and which point is the castle and which the gate
  tv: { beeld: "a/route/tv.webp", w: 2752, h: 1536, kasteel: 19, poort: 26,
    pad: [[.128, .577], [.16, .59], [.144, .615], [.103, .645], [.081, .683], [.094, .728], [.138, .762], [.206, .773], [.27, .75], [.325, .733], [.45, .717], [.53, .683], [.62, .655],
      [.562, .556], [.494, .478], [.52, .44], [.587, .422], [.661, .356], [.717, .278], [.748, .222], [.779, .289], [.847, .4], [.79, .46], [.735, .522], [.8, .585], [.86, .644], [.915, .622], [.93, .55]] },
  app: { beeld: "a/route/app.webp", w: 1536, h: 2752, kasteel: 17, poort: 31,
    pad: [[.333, .225], [.422, .239], [.533, .254], [.594, .273], [.522, .292], [.367, .304], [.322, .316], [.444, .332], [.622, .341], [.733, .357], [.689, .378], [.533, .397],
      [.367, .409], [.267, .434], [.3, .459], [.444, .496], [.522, .515], [.585, .545], [.589, .571], [.533, .62], [.456, .658], [.367, .695], [.333, .726], [.422, .763], [.489, .794],
      [.444, .825], [.322, .856], [.289, .893], [.356, .93], [.533, .962], [.689, .955], [.778, .935], [.8, .9]] },
};
(() => {
  const R = window.ROUTE, H = R.haltes, tijd = (h) => +new Date(h.tijd + "+01:00");
  // a halte: "gehaald" (its step is done), "open" (shown with name and time) or "dicht" (a sealed spot)
  function staat(h, nu, klaar, wie) {
    if (klaar.has(h.id)) return "gehaald";
    if (wie && h.bevel?.includes(wie)) return "open"; // his own moment: always in sight
    if (H.indexOf(h) === 0) return "open";
    if (h.na && !klaar.has(h.na) && nu < tijd(h) - 30 * 60000) return "dicht";
    if (h.open && nu < +new Date(h.open + "+01:00")) return "dicht";
    return nu >= tijd(h) - 12 * 3600000 ? "open" : "dicht";
  }
  // a smooth road through the points (Catmull-Rom), as many small steps with their length along the road
  function weg(v) {
    const P = v.pad.map(([x, y]) => [x * v.w, y * v.h]), S = [], anker = {};
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], d = P[i + 2] || c;
      if (i === v.kasteel) anker.kasteel = S.length; if (i === v.poort) anker.poort = S.length;
      for (let k = 0; k < 16; k++) { const t = k / 16, t2 = t * t, t3 = t2 * t;
        S.push([0, 1].map((j) => .5 * (2 * b[j] + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3))); }
    }
    S.push(P[P.length - 1]); if (v.poort === P.length - 1) anker.poort = S.length - 1;
    const L = [0]; for (let i = 1; i < S.length; i++) L.push(L[i - 1] + Math.hypot(S[i][0] - S[i - 1][0], S[i][1] - S[i - 1][1]));
    return { S, L, tot: L[L.length - 1], kasteel: L[anker.kasteel], poort: L[anker.poort] };
  }
  const opWeg = (w, s) => { let i = w.L.findIndex((x) => x >= s); if (i < 0) return w.S[w.S.length - 1]; if (i === 0) return w.S[0]; const f = (s - w.L[i - 1]) / (w.L[i] - w.L[i - 1] || 1);
    return [w.S[i - 1][0] + (w.S[i][0] - w.S[i - 1][0]) * f, w.S[i - 1][1] + (w.S[i][1] - w.S[i - 1][1]) * f]; };
  // where each halte lies: by time (a night counts as three hours), the castle at the castle and the finale at the gate, never too close together
  function plekken(v) {
    const w = weg(v), eff = [0]; for (let i = 1; i < H.length; i++) eff.push(eff[i - 1] + Math.min(tijd(H[i]) - tijd(H[i - 1]), 3 * 3600000));
    const iK = H.findIndex((h) => h.anker === "kasteel"), iP = H.findIndex((h) => h.anker === "poort"), min = w.tot * .03, s = [];
    const deel = (a, b, sa, sb) => { for (let i = a; i <= b; i++) s[i] = sa + (sb - sa) * (eff[i] - eff[a]) / (eff[b] - eff[a] || 1); };
    deel(0, iK, w.tot * .01, w.kasteel); deel(iK, iP, w.kasteel, w.poort); for (let i = iP + 1; i < H.length; i++) s[i] = Math.min(w.tot, w.poort + (i - iP) * (w.tot - w.poort) / (H.length - iP));
    for (let i = 1; i < H.length; i++) if (s[i] < s[i - 1] + min && i !== iK && i !== iP) s[i] = s[i - 1] + min;
    for (let i = H.length - 2; i > 0; i--) if (s[i] > s[i + 1] - min && i !== iK && i !== iP) s[i] = Math.max(s[i - 1] + min * .6, s[i + 1] - min);
    for (let i = 0; i < H.length; i++) s[i] = Math.min(s[i], w.tot);
    return { w, s, xy: s.map((x) => opWeg(w, x)) };
  }
  const padD = (w, tot) => { const pts = []; for (let i = 0; i < w.S.length && w.L[i] <= tot; i++) pts.push(w.S[i]); if (tot < w.tot) pts.push(opWeg(w, tot)); return pts.length ? "M" + pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join("L") : ""; };
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const klok = (h) => h.tijd.slice(11, 16);
  // the map as SVG: the painting, the road (bright up to where we are), and the haltes. opt: { klaar:Set, nu, wie, portret(naam) → url, labels, kies }
  function svg(variant, opt = {}) {
    const v = R[variant], { w, s, xy } = plekken(v), nu = opt.nu ?? Date.now(), klaar = opt.klaar || new Set();
    const staten = H.map((h) => staat(h, nu, klaar, opt.wie)), volgende = H.findIndex((h, i) => staten[i] !== "gehaald");
    const tot = volgende < 0 ? w.tot : volgende === 0 ? 0 : s[volgende - 1] + (s[volgende] - s[volgende - 1]) * .5;
    const r = v.w > v.h ? 44 : 58, fs = v.w > v.h ? 38 : 52;
    const metLabel = new Set(H.map((h, i) => i).filter((i) => staten[i] === "open").slice(0, 4)); // labels only for the next four (and his own moment): the rest is in the list
    let defs = "", mark = "", lab = "";
    H.forEach((h, i) => {
      const [x, y] = xy[i], st = staten[i], eigen = opt.wie && h.bevel?.includes(opt.wie), rr = i === volgende && st !== "dicht" ? r * 2 : st === "gehaald" ? r * .72 : (h.anker || eigen) ? r * 1.25 : r;
      const beeld = h.bevel && opt.portret ? (opt.portret(eigen ? opt.wie : h.bevel[0]) || "") : h.icoon || "";
      defs += `<clipPath id="rk-${variant}-${h.id}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(rr - 4).toFixed(1)}"/></clipPath>`;
      const cls = `rh ${st}${i === volgende ? " nu" : ""}${eigen ? " eigen" : ""}`;
      if (st === "dicht") mark += `<g class="${cls}" data-id="${h.id}"><circle cx="${x}" cy="${y}" r="${r * .7}" fill="url(#rgl-${variant})" class="rh-gloei"/><circle cx="${x}" cy="${y}" r="${r * .16}" class="rh-kern"/></g>`;
      else mark += `<g class="${cls}" data-id="${h.id}">${i === volgende ? `<circle cx="${x}" cy="${y}" r="${rr + 10}" class="rh-puls"/><circle cx="${x}" cy="${y}" r="${rr + 22}" class="rh-puls laat"/>` : ""}<circle cx="${x}" cy="${y}" r="${rr}" class="rh-rand"/>`
        + (beeld ? `<image href="${esc(beeld)}" x="${x - rr}" y="${y - rr}" width="${rr * 2}" height="${rr * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#rk-${variant}-${h.id})"/>` : "")
        + "</g>";
      if (opt.labels !== false && st === "open" && (metLabel.has(i) || eigen)) { // a label for what is still to come
        const t1 = klok(h), t2 = h.naam, bw = Math.max(t2.length, 6) * fs * .52 + 28, onder = variant === "tv" ? i % 2 === 1 : x > v.w * .55;
        const lx = Math.max(12, Math.min(v.w - bw - 12, variant === "tv" ? x - bw / 2 : onder ? x - rr - 14 - bw : x + rr + 14)), ly = variant === "tv" ? (onder ? y + rr + 12 : y - rr - 12 - fs * 2.3) : y - fs * 1.15;
        lab += `<g class="rl${i === volgende ? " nu" : ""}${eigen ? " eigen" : ""}" data-id="${h.id}"><rect x="${lx}" y="${ly}" width="${bw}" height="${fs * 2.3}" rx="${fs * .3}"/><text x="${lx + 14}" y="${ly + fs * .95}" class="rl-tijd" font-size="${fs * .8}">${esc(eigen ? `${t1} · jouw moment` : t1)}</text><text x="${lx + 14}" y="${ly + fs * 1.95}" class="rl-naam" font-size="${fs}">${esc(t2)}</text></g>`;
      }
    });
    return `<svg class="route-svg" viewBox="0 0 ${v.w} ${v.h}" preserveAspectRatio="xMidYMid ${opt.passend ? "meet" : "slice"}" xmlns="http://www.w3.org/2000/svg">
      <defs>${defs}<radialGradient id="rgl-${variant}"><stop offset="0" stop-color="#ffc070"/><stop offset=".3" stop-color="#e2323c" stop-opacity=".9"/><stop offset="1" stop-color="#5a0a0c" stop-opacity="0"/></radialGradient><filter id="rg-${variant}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${r * .35}"/></filter></defs>
      <image href="${v.beeld}" width="${v.w}" height="${v.h}"/>
      <path d="${padD(w, w.tot)}" class="rp-weg"/><path d="${padD(w, tot)}" class="rp-gloed" filter="url(#rg-${variant})"/><path d="${padD(w, tot)}" class="rp-af"/>
      ${mark}${lab}</svg>`;
  }
  window.Route = { staat, plekken, svg, klok, tijd, volgende: (nu, klaar, wie) => H.find((h) => staat(h, nu, klaar, wie) !== "gehaald") };
})();
// the look of the map, the same on the tv and in the app
(() => {
  const css = `.route-svg .rp-weg { fill: none; stroke: rgba(255, 200, 140, .45); stroke-width: 7; stroke-dasharray: 2 16; stroke-linecap: round; }
.route-svg .rp-gloed { fill: none; stroke: #ff5a2a; stroke-width: 24; opacity: .55; }
.route-svg .rp-af { fill: none; stroke: #ffd98a; stroke-width: 8; stroke-linecap: round; }
.route-svg .rh-rand { fill: #120708; stroke: #d9b77a; stroke-width: 5; }
.route-svg .rh.gehaald .rh-rand { stroke: #8a6a3a; stroke-width: 4; } .route-svg .rh.gehaald image { opacity: .5; filter: grayscale(.5); }
.route-svg .rh.nu .rh-rand { stroke: #ffd98a; stroke-width: 10; filter: drop-shadow(0 0 18px rgba(255, 170, 80, .9)); }
.route-svg .rh-puls.laat { animation-delay: .9s; }
.route-svg .rh.eigen .rh-rand { stroke: #ff5a3c; stroke-width: 9; }
.route-svg .rh-puls { fill: none; stroke: #ffd98a; stroke-width: 6; transform-box: fill-box; transform-origin: center; animation: rpuls 1.8s ease-out infinite; }
@keyframes rpuls { from { opacity: .9; transform: scale(.8); } to { opacity: 0; transform: scale(1.6); } }
.route-svg .rh-gloei { animation: rgloei 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.route-svg .rh-kern { fill: #ffd2a0; opacity: .85; }
@keyframes rgloei { 0%, 100% { opacity: .65; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.08); } }
.route-svg .rl rect { fill: rgba(14, 6, 7, .9); stroke: #6e5230; stroke-width: 2; }
.route-svg .rl.nu rect { stroke: #ffd98a; stroke-width: 4; } .route-svg .rl.eigen rect { stroke: #ff5a3c; stroke-width: 4; }
.route-svg .rl-tijd { fill: #d9b77a; font-family: var(--carved, serif); font-weight: 700; letter-spacing: .06em; }
.route-svg .rl-naam { fill: #f3e3c4; font-family: var(--display, serif); font-style: italic; }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();
