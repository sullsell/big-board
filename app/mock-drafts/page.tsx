import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getMockDrafts } from "@/lib/mock-drafts";
import type { MockDraft } from "@/data/mock-drafts";

export default function MockDraftsPage() {
  const drafts = getMockDrafts();

  const totalPicks = drafts.reduce((sum, d) => sum + d.picks.length, 0);
  const counts = new Map<string, number>();
  for (const d of drafts) {
    for (const p of d.picks) {
      counts.set(p.player, (counts.get(p.player) ?? 0) + 1);
    }
  }
  const mostDrafted = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];

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
              Mock Drafts
            </h1>
          </div>
          <p className="hidden font-mono text-xs text-chalk-dim sm:block">
            {drafts.length} logged
          </p>
        </div>

        <SiteNav />
      </header>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatTile label="Mocks logged" value={drafts.length} />
        <StatTile label="Picks tracked" value={totalPicks} />
        <StatTile
          label="Most drafted"
          value={mostDrafted ? mostDrafted[0] : "—"}
          sub={mostDrafted ? `${mostDrafted[1]}x` : undefined}
        />
      </div>

      {/* History */}
      <div className="mt-8 flex flex-col gap-4">
        {drafts.length === 0 ? (
          <p className="py-16 text-center font-mono text-sm text-chalk-dim">
            No mock drafts logged yet — add rows to data/mock-drafts.csv.
          </p>
        ) : (
          drafts.map((draft) => <MockDraftCard key={draft.id} draft={draft} />)
        )}
      </div>
    </main>
  );
}

function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-sm border border-line bg-field-line/40 px-3 py-3 text-center">
      <p
        className="truncate font-display text-xl font-bold text-chalk sm:text-2xl"
        title={String(value)}
      >
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-chalk-dim">
        {label}
        {sub ? ` · ${sub}` : ""}
      </p>
    </div>
  );
}

function MockDraftCard({ draft }: { draft: MockDraft }) {
  return (
    <article className="rounded-sm border border-line bg-field-line/30 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm font-semibold uppercase text-chalk">
            {draft.source || "Mock draft"}
          </p>
          <p className="font-mono text-[11px] text-chalk-dim">
            {draft.date} · {draft.teams}-team · slot {draft.draftSlot}
          </p>
        </div>
        <span className="font-mono text-[11px] text-chalk-dim">
          {draft.picks.length} picks
        </span>
      </div>

      {draft.notes && <p className="mt-2 text-sm text-chalk-dim">{draft.notes}</p>}

      <Separator className="my-3" />

      <div className="flex flex-col divide-y divide-line">
        {draft.picks.map((pick) => (
          <div
            key={pick.id}
            className="grid grid-cols-[3rem_1fr_auto] items-center gap-2 py-1.5"
          >
            <span className="font-mono text-xs text-chalk-dim">
              {pick.round}.{String(pick.overallPick).padStart(2, "0")}
            </span>
            <span className="font-display text-sm font-medium uppercase text-chalk">
              {pick.player}
            </span>
            {(pick.position || pick.team) && (
              <Badge variant="position">
                {[pick.team, pick.position].filter(Boolean).join(" · ")}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
