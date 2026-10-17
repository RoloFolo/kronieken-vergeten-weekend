// De oorkondes voor in de envelop op de schoorsteen: één A4 per Wachter, met zijn portret in rolkostuum.
//   node scripts/oorkondes.mjs            → print/oorkondes.html + print/oorkondes.pdf
// Portret: print/portretten/<naam>.jpg (zie scripts/portretten.mjs). Zolang dat er niet is, staat het rol-embleem in het venster.
// De rollen komen uit docs/a/rollen.js (ROL_VAN), de namen uit docs/a/wachters.js.
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const window = {};
for (const f of ["docs/a/wachters.js", "docs/a/rollen.js"]) new Function("window", readFileSync(f, "utf8"))(window);
const rolVan = (naam) => window.ROLLEN.find((r) => r.id === window.ROL_VAN[naam]);
const portret = (naam) => [`print/portretten/${naam.toLowerCase()}.jpg`, `print/portretten/${naam.toLowerCase()}.png`].find(existsSync);

function blad({ naam, rol, foto, voorbeeld }) {
  const venster = foto ? `<img class="foto" src="${path.relative("print", foto).replaceAll("\\", "/")}" alt="">`
    : `<div class="leeg"><img src="oorkonde/embleem-${rol.id}.jpg" alt=""><span>Portret volgt</span></div>`;
  return `<section class="blad">
  ${voorbeeld ? `<div class="stempel">Voorbeeld · fictief portret</div>` : ""}
  <div class="inhoud">
    <h1>Oorkonde</h1>
    <div class="der">der Wachters van Bouillon</div>
    <p class="aanhef">Godfried van Bouillon, heer van het kasteel, verklaart hierbij dat</p>
    <div class="venster">${venster}</div>
    <div class="naam">${naam}</div>
    <div class="rol"><b>${rol.naam}</b><span>${rol.titel}</span></div>
    <p class="tekst">in november van het jaar 2026 te Bouillon de Schaduwkoning hielp binden. Met zijn broeders voedde hij de vier Zegels, vond hij de cijfers van het laatste slot en schreef hij zijn naam voor altijd in de Kronieken.</p>
    <p class="spreuk">“${rol.tekst}”</p>
    <div class="voet">
      <div class="datum">Gegeven te Bouillon<br>15 november 2026</div>
      <div class="hand"><span class="sig">Godfried van Bouillon</span><i>Godfried van Bouillon</i></div>
    </div>
  </div>
  <img class="zegel" src="oorkonde/lakzegel-klein.png" alt="">
</section>`;
}

const bladen = [
  blad({ naam: "Voorbeeld", rol: window.ROLLEN.find((r) => r.id === "firekeeper"), foto: "print/oorkonde/voorbeeld.jpg", voorbeeld: true }),
  ...window.WACHTERS.map((w) => ({ naam: w.naam, rol: rolVan(w.naam) })).filter((x) => x.rol).map((x) => blad({ ...x, foto: portret(x.naam) })),
];

const html = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><title>Oorkondes – De Kronieken van het Vergeten Weekend</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Libre+Baskerville:ital@0;1&family=Pinyon+Script&display=swap">
<style>
/* One certificate per page: painted parchment (print/oorkonde/perkament.jpg), dark ink, crimson and bronze. */
:root { --inkt: #2a1508; --rood: #7a1016; --brons: #7a5a2a; --carved: "Cinzel", Georgia, serif; --display: "Libre Baskerville", Georgia, serif; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
html, body { margin: 0; background: #1a0d08; }
.blad { position: relative; width: 210mm; height: 297mm; overflow: hidden; break-after: page; background: url("oorkonde/perkament.jpg") 0 0 / 100% 100% no-repeat; color: var(--inkt); }
/* inside the parchment oval: below the top medallions, above the bottom ones */
.inhoud { position: absolute; left: 37mm; right: 37mm; top: 63mm; bottom: 64mm; display: flex; flex-direction: column; align-items: center; text-align: center; }
h1 { margin: 0; font: 900 25pt/1 var(--carved); letter-spacing: .12em; text-transform: uppercase; color: var(--rood); text-shadow: 0 .3mm 0 rgba(255,240,210,.6); }
.der { margin-top: 1.2mm; font: 700 8pt/1 var(--carved); letter-spacing: .28em; text-transform: uppercase; color: var(--brons); }
.aanhef { margin: 3mm 0 3mm; font: italic 9pt/1.4 var(--display); }
.venster { flex: none; width: 53mm; height: 66mm; border-radius: 26.5mm 26.5mm 2mm 2mm; padding: 1.4mm; background: linear-gradient(160deg, #e9c98a, #8a6430 40%, #d6b273 60%, #6b4a1e);
  box-shadow: 0 1.5mm 4mm rgba(40,15,5,.55), inset 0 0 0 .3mm rgba(60,30,10,.8); }
.venster > * { width: 100%; height: 100%; border-radius: 25.1mm 25.1mm 1.2mm 1.2mm; box-shadow: inset 0 0 0 .5mm rgba(30,10,5,.9); }
.foto { display: block; object-fit: cover; object-position: 50% 22%; }
.leeg { display: grid; place-items: center; align-content: center; gap: 3mm; background: radial-gradient(ellipse at 50% 40%, #4a1014, #12060a 75%); }
.leeg img { width: 30mm; mix-blend-mode: lighten; }
.leeg span { font: 600 7pt/1 var(--carved); letter-spacing: .3em; text-transform: uppercase; color: #c9a777; }
.naam { margin-top: 3.5mm; font: 900 23pt/1 var(--carved); letter-spacing: .08em; text-transform: uppercase; color: var(--rood); }
.rol { margin-top: 2mm; display: grid; gap: .8mm; }
.rol b { font: 700 10pt/1 var(--carved); letter-spacing: .14em; text-transform: uppercase; color: var(--brons); }
.rol span { font: italic 10pt/1 var(--display); }
.tekst { margin: 3mm 0 0; max-width: 122mm; font: 9.2pt/1.5 var(--display); }
.spreuk { margin: 2mm 0 0; max-width: 118mm; font: italic 8.3pt/1.4 var(--display); color: #5a3a1c; }
.voet { margin-top: auto; width: 100%; padding: 0 17mm; display: flex; justify-content: space-between; align-items: end; }
.datum { text-align: left; font: italic 8.5pt/1.45 var(--display); }
/* the wax seal sits on the border, between the two lower medallions */
.zegel { position: absolute; left: 50%; bottom: 25mm; width: 30mm; translate: -50% 0; filter: drop-shadow(0 1mm 1.5mm rgba(40,0,0,.6)); }
.hand { display: grid; justify-items: end; text-align: right; }
.sig { font: 19pt/1 "Pinyon Script", cursive; color: #2b1a5a; padding: 0 1mm 1mm; border-bottom: .25mm solid rgba(42,21,8,.6); }
.hand i { margin-top: 1mm; font: 600 6.5pt/1 var(--carved); font-style: normal; letter-spacing: .2em; text-transform: uppercase; color: var(--brons); }
.stempel { position: absolute; z-index: 2; top: 56mm; right: 34mm; rotate: 12deg; padding: 1.5mm 4mm; border: .6mm solid #b3121c; color: #b3121c; font: 700 8pt/1 var(--carved); letter-spacing: .2em; text-transform: uppercase; background: rgba(255,240,220,.6); }
</style></head><body>
${bladen.join("\n")}
</body></html>`;

writeFileSync("print/oorkondes.html", html);
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
execFileSync(chrome, ["--headless=new", "--disable-gpu", `--user-data-dir=${mkdtempSync(path.join(tmpdir(), "oork-"))}`, "--no-pdf-header-footer", "--virtual-time-budget=10000",
  `--print-to-pdf=${path.resolve("print/oorkondes.pdf")}`, `file:///${path.resolve("print/oorkondes.html").replaceAll("\\", "/")}`], { stdio: "ignore" });
console.log(`✓ print/oorkondes.pdf (${bladen.length} bladen)`);
