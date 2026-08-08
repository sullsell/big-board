import fs from "node:fs";
import path from "node:path";
import type { MockDraft, MockPick } from "@/data/mock-drafts";
import type { Position } from "@/data/rankings";

const CSV_PATH = path.join(process.cwd(), "data", "mock-drafts.csv");

/** Minimal CSV line parser — handles quoted fields with embedded commas/quotes. */
function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
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

/**
 * Reads data/mock-drafts.csv (one row per pick, grouped by mock_id) and
 * assembles it into MockDraft records. Runs at build time only.
 */
export function getMockDrafts(): MockDraft[] {
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const record: Record<string, string> = {};
    header.forEach((key, i) => (record[key] = (cells[i] ?? "").trim()));
    return record;
  });

  const draftsById = new Map<string, MockDraft>();

  for (const row of rows) {
    const id = row.mock_id;
    if (!id) continue;

    if (!draftsById.has(id)) {
      draftsById.set(id, {
        id,
        date: row.date ?? "",
        source: row.source ?? "",
        teams: Number(row.teams) || 0,
        draftSlot: Number(row.slot) || 0,
        notes: "",
        picks: [],
      });
    }

    const draft = draftsById.get(id)!;
    if (row.notes && !draft.notes) draft.notes = row.notes;

    if (!row.player) continue;

    const pick: MockPick = {
      id: `${id}-${row.pick || draft.picks.length + 1}`,
      round: Number(row.round) || 0,
      overallPick: Number(row.pick) || 0,
      player: row.player,
      position: (row.position as Position) || "",
      team: row.team ?? "",
    };
    draft.picks.push(pick);
  }

  const drafts = [...draftsById.values()];
  for (const d of drafts) {
    d.picks.sort((a, b) => a.overallPick - b.overallPick);
  }
  // Most recent mock first.
  drafts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return drafts;
}
