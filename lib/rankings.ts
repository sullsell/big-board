import path from "node:path";
import { readCsv } from "@/lib/csv";
import type { Player, Position, Risk } from "@/data/rankings";

const CSV_PATH = path.join(process.cwd(), "data", "rankings.csv");

/** Reads data/rankings.csv into Player records, sorted by rank. Build-time only. */
export function getRankings(): Player[] {
  const rows = readCsv(CSV_PATH);

  const players: Player[] = rows
    .filter((row) => row.rank && row.player)
    .map((row) => ({
      rank: Number(row.rank) || 0,
      player: row.player,
      team: row.team ?? "",
      position: row.position as Position,
      tier: Number(row.tier) || 0,
      tierLabel: row.tierLabel || undefined,
      bye: Number(row.bye) || 0,
      adp: Number(row.adp) || 0,
      risk: (row.risk as Risk) || undefined,
      notes: row.notes || undefined,
    }));

  return players.sort((a, b) => a.rank - b.rank);
}
