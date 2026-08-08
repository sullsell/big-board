import path from "node:path";
import { readCsv } from "@/lib/csv";
import type { MockDraft, MockPick } from "@/data/mock-drafts";
import type { Position } from "@/data/rankings";

const CSV_PATH = path.join(process.cwd(), "data", "mock-drafts.csv");

/**
 * Reads data/mock-drafts.csv (one row per pick, grouped by mock_id) and
 * assembles it into MockDraft records. Runs at build time only.
 */
export function getMockDrafts(): MockDraft[] {
  const rows = readCsv(CSV_PATH);
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
