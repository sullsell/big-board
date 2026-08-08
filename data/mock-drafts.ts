import type { Position } from "./rankings";

export interface MockPick {
  id: string;
  round: number;
  overallPick: number;
  player: string;
  position: Position | "";
  team: string;
}

export interface MockDraft {
  id: string;
  date: string; // yyyy-mm-dd
  source: string; // e.g. "Sleeper", "ESPN", "NFC", "in-person"
  teams: number;
  draftSlot: number;
  notes: string;
  picks: MockPick[];
}
