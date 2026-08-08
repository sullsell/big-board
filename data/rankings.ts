export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DST";
export type Risk = "Low" | "Medium" | "High";

export interface Player {
  rank: number; // your overall rank — this drives the sort order
  player: string;
  team: string;
  position: Position;
  tier: number; // group players you consider roughly equal
  tierLabel?: string; // optional short name for the tier, e.g. "Bell cows"
  bye: number;
  adp: number; // consensus ADP, for the value/reach badge
  risk?: Risk;
  notes?: string;
}

// Your rankings live in data/rankings.csv — see lib/rankings.ts for the
// build-time parser that turns it into Player[].
