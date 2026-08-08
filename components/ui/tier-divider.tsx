export function TierDivider({
  tier,
  label,
}: {
  tier: number;
  label?: string;
}) {
  return (
    <div className="relative flex items-center gap-4 py-6" aria-hidden={false}>
      <div className="h-px flex-1 bg-line" />
      <div className="flex items-center gap-2 font-display text-xs uppercase tracking-widest2 text-chalk-dim">
        <span className="text-hash">▸</span>
        <span>Tier {tier}</span>
        {label ? <span className="text-chalk-dim/70">— {label}</span> : null}
        <span className="text-hash">◂</span>
      </div>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
