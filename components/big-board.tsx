"use client";

import { useMemo, useState } from "react";
import type { Player, Position } from "@/data/rankings";
import { Badge } from "@/components/ui/badge";
import { TierDivider } from "@/components/ui/tier-divider";
import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";

const POSITIONS: (Position | "ALL")[] = ["ALL", "QB", "RB", "WR", "TE"];

export function BigBoard({ rankings }: { rankings: Player[] }) {
  const [filter, setFilter] = useState<(typeof POSITIONS)[number]>("ALL");

  const sorted = useMemo(
    () => [...rankings].sort((a, b) => a.rank - b.rank),
    [rankings]
  );

  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? sorted
        : sorted.filter((p) => p.position === filter),
    [sorted, filter]
  );

  const tiers = useMemo(() => {
    const map = new Map<number, typeof filtered>();
    for (const p of filtered) {
      const arr = map.get(p.tier) ?? [];
      arr.push(p);
      map.set(p.tier, arr);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 -mx-5 border-b border-line bg-field/95 px-5 pb-4 pt-8 backdrop-blur">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-hash">
              2026 Draft — Personal Board
            </p>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-chalk sm:text-5xl">
              Sully's Big Board
            </h1>
          </div>
          <p className="hidden font-mono text-xs text-chalk-dim sm:block">
            {filtered.length} / {rankings.length} players
          </p>
        </div>

        <SiteNav />

        {/* Position filter tabs */}
        <nav className="mt-3 flex gap-1.5 overflow-x-auto border-t border-line pt-3">
          {POSITIONS.map((pos) => (
            <button
              key={pos}
              onClick={() => setFilter(pos)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors",
                filter === pos
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-line text-chalk-dim hover:border-chalk-dim/50 hover:text-chalk"
              )}
            >
              {pos}
            </button>
          ))}
        </nav>
      </header>

      {/* Tiers */}
      <div className="mt-2">
        {tiers.map(([tierNum, players]) => (
          <section key={tierNum}>
            <TierDivider tier={tierNum} label={players[0]?.tierLabel} />
            <div className="flex flex-col divide-y divide-line">
              {players.map((p) => {
                const delta = p.adp - p.rank;
                return (
                  <article
                    key={p.rank}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 gap-y-1.5 rounded-sm px-2 py-3 transition-colors hover:bg-field-line sm:grid-cols-[3rem_1fr_auto]"
                  >
                    <span className="font-display text-2xl font-bold leading-none text-chalk-dim group-hover:text-gold sm:text-3xl">
                      {p.rank}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h2 className="font-display text-lg font-semibold uppercase leading-tight text-chalk">
                          {p.player}
                        </h2>
                        <Badge variant="position">
                          {p.team} · {p.position}
                        </Badge>
                        {p.risk && p.risk !== "Low" && (
                          <Badge variant="risk">{p.risk} risk</Badge>
                        )}
                      </div>
                      {p.notes && (
                        <p className="mt-1 max-w-md text-sm text-chalk-dim">
                          {p.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <div className="flex items-center gap-3 font-mono text-xs text-chalk-dim">
                        <span title="Bye week">BYE {p.bye}</span>
                        <span title="Consensus ADP">ADP {p.adp}</span>
                      </div>
                      {delta !== 0 && (
                        <Badge variant={delta > 0 ? "value" : "reach"}>
                          {delta > 0 ? `+${delta} value` : `${delta} reach`}
                        </Badge>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-chalk-dim">
            No players at this position yet — add some in data/rankings.csv.
          </p>
        )}
      </div>

      <footer className="mt-16 border-t border-line pt-6 text-center font-mono text-[11px] uppercase tracking-widest2 text-chalk-dim">
        Edit data/rankings.csv to update this board
      </footer>
    </main>
  );
}
