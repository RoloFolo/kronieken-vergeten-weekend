// Prints print/<naam>.html to print/<naam>.pdf with headless Chrome (A4, no header/footer).
//   node scripts/pdf.mjs regelboek questkaarten events vazen
import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

for (const naam of process.argv.slice(2)) {
  execFileSync("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--disable-gpu", `--user-data-dir=${mkdtempSync(path.join(tmpdir(), "pdf-"))}`,
    "--no-pdf-header-footer", "--virtual-time-budget=12000", `--print-to-pdf=${path.resolve(`print/${naam}.pdf`)}`,
    `file:///${path.resolve(`print/${naam}.html`).split(path.sep).join("/")}`], { stdio: "ignore" });
  console.log("✓", `print/${naam}.pdf`);
}
