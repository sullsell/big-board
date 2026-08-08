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

// ---------------------------------------------------------------------------
// EDIT ME — replace with your own board. Keep "rank" unique and sequential;
// everything else (tiers, sort order, value badges) derives from it.
// ---------------------------------------------------------------------------
export const rankings: Player[] = [
  {
    rank: 1,
    player: "Ja'Marr Chase",
    team: "CIN",
    position: "WR",
    tier: 1,
    tierLabel: "Set the table",
    bye: 10,
    adp: 2,
    risk: "Low",
    notes: "Elite target share, WR1 overall in most formats.",
  },
  {
    rank: 2,
    player: "Bijan Robinson",
    team: "ATL",
    position: "RB",
    tier: 1,
    tierLabel: "Set the table",
    bye: 11,
    adp: 3,
    risk: "Low",
    notes: "Bell-cow role, receiving work trending up.",
  },
  {
    rank: 3,
    player: "Jahmyr Gibbs",
    team: "DET",
    position: "RB",
    tier: 1,
    tierLabel: "Set the table",
    bye: 8,
    adp: 4,
    risk: "Low",
  },
  {
    rank: 4,
    player: "Puka Nacua",
    team: "LAR",
    position: "WR",
    tier: 2,
    tierLabel: "Still elite",
    bye: 6,
    adp: 6,
    risk: "Medium",
    notes: "Injury history worth tracking through camp.",
  },
  {
    rank: 5,
    player: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    tier: 2,
    tierLabel: "Still elite",
    bye: 7,
    adp: 5,
    risk: "Low",
  },
  {
    rank: 6,
    player: "Breece Hall",
    team: "NYJ",
    position: "RB",
    tier: 2,
    tierLabel: "Still elite",
    bye: 9,
    adp: 9,
    risk: "Medium",
  },
  {
    rank: 7,
    player: "Amon-Ra St. Brown",
    team: "DET",
    position: "WR",
    tier: 2,
    tierLabel: "Still elite",
    bye: 8,
    adp: 8,
    risk: "Low",
  },
  {
    rank: 8,
    player: "Brock Bowers",
    team: "LV",
    position: "TE",
    tier: 3,
    tierLabel: "Positional advantage",
    bye: 4,
    adp: 11,
    risk: "Low",
    notes: "Massive TE1 gap over the field.",
  },
  {
    rank: 9,
    player: "Malik Nabers",
    team: "NYG",
    position: "WR",
    tier: 3,
    tierLabel: "Positional advantage",
    bye: 12,
    adp: 10,
    risk: "Medium",
  },
  {
    rank: 10,
    player: "De'Von Achane",
    team: "MIA",
    position: "RB",
    tier: 3,
    tierLabel: "Positional advantage",
    bye: 6,
    adp: 12,
    risk: "Medium",
  },
  {
    rank: 15,
    player: "Rome Odunze",
    team: "CHI",
    position: "WR",
    tier: 4,
    tierLabel: "Value tier",
    bye: 5,
    adp: 22,
    risk: "Medium",
    notes: "New OC — watching camp target competition closely.",
  },
  {
    rank: 16,
    player: "Josh Allen",
    team: "BUF",
    position: "QB",
    tier: 4,
    tierLabel: "Value tier",
    bye: 7,
    adp: 24,
    risk: "Low",
    notes: "QB1 upside without paying a QB1 price at this ADP.",
  },
  {
    rank: 20,
    player: "David Montgomery",
    team: "DET",
    position: "RB",
    tier: 5,
    tierLabel: "Solid starters",
    bye: 8,
    adp: 19,
    risk: "Low",
  },
];
