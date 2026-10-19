// De Kronieken van het Vergeten Weekend: lokale server op de laptop.
//   node app/server.mjs            → tv:    http://localhost:8080/
//                                     regie: http://<ip-van-de-laptop>:8080/regie-8d785a0dfd.html  (telefoons op dezelfde wifi)
//                                     chaos: http://<ip-van-de-laptop>:8080/chaos-06d0ece377.html
// Het tv-scherm luistert naar opdrachten (Server-Sent Events); de regie stuurt ze.
// De stand (fiches, gebruikte events, relieken, finale) staat in app/stand.json, zodat een herstart niets kost.
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync, createReadStream } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { networkInterfaces } from "node:os";

const MAP = dirname(fileURLToPath(import.meta.url));
const WEB = join(MAP, "..", "docs");
const STAND = join(MAP, "stand.json");
const POORT = Number(process.env.PORT || 8080);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json",
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".mp4": "video/mp4" };

let stand = { fiches: { vlam: 0, hoorn: 0, schild: 0, hart: 0 }, gebruikt: [], event: null, scherm: "start", relieken: [], finale: {} };
if (existsSync(STAND)) try { stand = { ...stand, ...JSON.parse(readFileSync(STAND, "utf8")) }; } catch {}
const bewaar = () => writeFileSync(STAND, JSON.stringify(stand, null, 2));

const luisteraars = new Set(), herstel = new Map();
function zend(type, data) { const regel = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`; for (const r of luisteraars) r.write(regel); }

function lees(req) { return new Promise((ok) => { let b = ""; req.on("data", (d) => (b += d)); req.on("end", () => { try { ok(JSON.parse(b || "{}")); } catch { ok({}); } }); }); }

createServer(async (req, res) => {
  const pad = decodeURIComponent(new URL(req.url, "http://x").pathname);

  // tv en regie houden elkaar op de hoogte
  if (pad === "/api/stroom") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    res.write(`event: stand\ndata: ${JSON.stringify(stand)}\n\n`);
    luisteraars.add(res); req.on("close", () => luisteraars.delete(res)); return;
  }
  if (pad === "/api/stand" && req.method === "GET") { res.writeHead(200, { "Content-Type": "application/json" }); return res.end(JSON.stringify(stand)); }
  if (pad === "/api/stand" && req.method === "POST") { // het tv-scherm meldt zijn stand
    Object.assign(stand, await lees(req)); bewaar(); zend("stand", stand); res.writeHead(204); return res.end();
  }
  if (pad === "/api/herstel" && req.method === "POST") { // herstelpunt: een kopie van de hele stand (alleen in het geheugen)
    const o = await lees(req), id = `h${Date.now()}`; herstel.set(id, { t: Date.now(), waarom: o.waarom || "", stand: o.stand }); res.writeHead(204); return res.end();
  }
  if (pad === "/api/herstel") { const id = new URL(req.url, "http://x").searchParams.get("id"); res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(id ? herstel.get(id)?.stand ?? null : [...herstel].map(([id, h]) => ({ id, t: h.t, waarom: h.waarom })).reverse()));
  }
  if (pad === "/api/opdracht" && req.method === "POST") { // de regie geeft een opdracht aan de tv
    const o = await lees(req); zend("opdracht", o); res.writeHead(204); return res.end();
  }

  // bestanden, met Range-ondersteuning zodat audio en video kunnen spoelen
  const bestand = join(WEB, pad === "/" ? "index.html" : pad);
  if (!bestand.startsWith(WEB) || !existsSync(bestand) || statSync(bestand).isDirectory()) { res.writeHead(404); return res.end("Niet gevonden"); }
  const grootte = statSync(bestand).size, type = TYPES[extname(bestand)] || "application/octet-stream";
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
  if (range) {
    const van = range[1] ? +range[1] : 0, tot = range[2] ? +range[2] : grootte - 1;
    res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${van}-${tot}/${grootte}`, "Accept-Ranges": "bytes", "Content-Length": tot - van + 1 });
    return createReadStream(bestand, { start: van, end: tot }).pipe(res);
  }
  res.writeHead(200, { "Content-Type": type, "Content-Length": grootte, "Accept-Ranges": "bytes", "Cache-Control": "no-cache" });
  createReadStream(bestand).pipe(res);
}).listen(POORT, "0.0.0.0", () => {
  const ips = Object.values(networkInterfaces()).flat().filter((i) => i && i.family === "IPv4" && !i.internal).map((i) => i.address);
  console.log(`\n  De Kronieken draait.\n  Tv (deze laptop):  http://localhost:${POORT}/`);
  for (const ip of ips) console.log(`  Regie (telefoon):  http://${ip}:${POORT}/regie-8d785a0dfd.html
  Chaos Lord:        http://${ip}:${POORT}/chaos-06d0ece377.html`);
  console.log("");
});
