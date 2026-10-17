// The wax seal for the order in the app: whole, cracked, and broken into separate chunks that can fall off the letter.
// From painted green-screen images (print/oorkonde/lakzegel-0, zegel-gebarsten-0, zegel-gebroken-0):
// keys out the green, then splits the broken seal into its pieces (connected areas); the big ones become separate
// images (same canvas, so they stack exactly), the small ones together form the crumbs.
//   node scripts/zegel-brokken.mjs   → docs/a/app/zegel-{heel,gebarsten,kruimels,brok-N}.webp + zegel-brokken.json
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const FF = "C:/Users/rolan/AppData/Local/Temp/claude/C--Users-rolan-Vriendenweekend/1549c95c-5790-4407-b7c8-1ee5e18148e9/scratchpad/build/node_modules/ffmpeg-static/ffmpeg.exe";
const N = 400, UIT = "docs/a/app", tmp = mkdtempSync(path.join(tmpdir(), "zegel-"));
const KEY = "clip(1-((g(X,Y)-max(r(X,Y),b(X,Y)))-25)/50,0,1)";
const ff = (...a) => execFileSync(FF, ["-y", "-loglevel", "error", ...a]);
const sleutel = (bron, doel) => ff("-i", bron, "-filter_complex", `[0]scale=${N}:${N}:flags=lanczos,format=gbrap,geq=r='r(X,Y)':g='min(g(X,Y),max(r(X,Y),b(X,Y)))':b='b(X,Y)':a='255*${KEY}'`, doel);

sleutel("print/oorkonde/lakzegel-0.png", `${UIT}/zegel-heel.webp`);
sleutel("print/oorkonde/zegel-gebarsten-0.png", `${UIT}/zegel-gebarsten.webp`);
const gebroken = path.join(tmp, "gebroken.png"); sleutel("print/oorkonde/zegel-gebroken-0.png", gebroken);
ff("-i", gebroken, "-vf", "format=rgba", "-f", "rawvideo", path.join(tmp, "rgba.raw"));
const px = readFileSync(path.join(tmp, "rgba.raw"));

// connected areas of the wax (alpha > 100), 8-neighbourhood
const lab = new Int32Array(N * N).fill(-1), stukken = [];
for (let s = 0; s < N * N; s++) {
  if (lab[s] !== -1 || px[s * 4 + 3] <= 100) continue;
  const id = stukken.length, rij = [s]; lab[s] = id; let n = 0, sx = 0, sy = 0;
  while (rij.length) { const p = rij.pop(), x = p % N, y = (p - x) / N; n++; sx += x; sy += y;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const qx = x + dx, qy = y + dy; if (qx < 0 || qy < 0 || qx >= N || qy >= N) continue;
      const q = qy * N + qx; if (lab[q] === -1 && px[q * 4 + 3] > 100) { lab[q] = id; rij.push(q); } } }
  stukken.push({ id, n, cx: sx / n / N, cy: sy / n / N });
}
const groot = stukken.filter((s) => s.n > N * N * .02).sort((a, b) => b.n - a.n);
console.log("stukken:", stukken.length, "brokken:", groot.map((s) => s.n).join(", "));

// each chunk as its own image on the full canvas (soft edges kept: a pixel belongs to the chunk of its nearest labelled neighbour)
const naast = (p) => { if (lab[p] !== -1) return lab[p]; const x = p % N, y = (p - x) / N;
  for (let r = 1; r <= 3; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const qx = x + dx, qy = y + dy; if (qx >= 0 && qy >= 0 && qx < N && qy < N && lab[qy * N + qx] !== -1) return lab[qy * N + qx]; } return -1; };
const eigen = new Int32Array(N * N); for (let p = 0; p < N * N; p++) eigen[p] = px[p * 4 + 3] ? naast(p) : -1;
const schrijf = (keuze, doel) => { const out = Buffer.from(px); for (let p = 0; p < N * N; p++) if (!keuze(eigen[p])) out[p * 4 + 3] = 0;
  const raw = path.join(tmp, "uit.raw"); writeFileSync(raw, out);
  ff("-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${N}x${N}`, "-i", raw, "-c:v", "libwebp", "-quality", "88", doel); };
const grootIds = new Set(groot.map((s) => s.id));
groot.forEach((s, i) => schrijf((id) => id === s.id, `${UIT}/zegel-brok-${i + 1}.webp`));
schrijf((id) => id !== -1 && !grootIds.has(id), `${UIT}/zegel-kruimels.webp`);
writeFileSync(`${UIT}/zegel-brokken.json`, JSON.stringify(groot.map((s, i) => ({ src: `a/app/zegel-brok-${i + 1}.webp`, cx: +s.cx.toFixed(3), cy: +s.cy.toFixed(3) }))));
console.log("✓", groot.length, "brokken + kruimels");
