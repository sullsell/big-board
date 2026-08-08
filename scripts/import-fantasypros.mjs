// One-off script: converts data/FantasyPros_2026_Draft_ALL_Rankings.csv into
// our data/rankings.csv schema. Not part of the app — run with `node
// scripts/import-fantasypros.mjs` if you need to re-import an updated export.
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "data", "FantasyPros_2026_Draft_ALL_Rankings.csv");
const DEST = path.join(process.cwd(), "data", "rankings.csv");

function parseCsvLine(line) {
  const cells = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      cells.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells;
}

function csvField(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const raw = fs.readFileSync(SRC, "utf-8");
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const header = parseCsvLine(lines[0]).map((h) => h.trim());

const rows = lines.slice(1).map((line) => {
  const cells = parseCsvLine(line);
  const record = {};
  header.forEach((key, i) => (record[key] = (cells[i] ?? "").trim()));
  return record;
});

const out = [
  "rank,player,team,position,tier,tierLabel,bye,adp,risk,notes",
];

for (const row of rows) {
  const rank = Number(row.RK);
  const posMatch = /^([A-Z]+)\d+$/.exec(row["POS"]);
  const position = posMatch ? posMatch[1] : row["POS"];
  const tier = Number(row.TIERS) || "";
  const bye = /^\d+$/.test(row["BYE WEEK"]) ? Number(row["BYE WEEK"]) : "";

  const diffRaw = row["ECR VS. ADP"];
  const diff = /^[+-]?\d+$/.test(diffRaw) ? Number(diffRaw) : null;
  const adp = diff === null ? rank : rank + diff;

  const bustMatch = /^(\d+) out of 5/.exec(row["BUST"]);
  let risk = "";
  if (bustMatch) {
    const bust = Number(bustMatch[1]);
    risk = bust >= 4 ? "High" : bust === 3 ? "Medium" : "Low";
  }

  out.push(
    [rank, row["PLAYER NAME"], row.TEAM, position, tier, "", bye, adp, risk, ""]
      .map(csvField)
      .join(",")
  );
}

fs.writeFileSync(DEST, out.join("\n") + "\n", "utf-8");
console.log(`Wrote ${rows.length} players to ${DEST}`);
