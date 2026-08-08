export function TierDivider({
  tier,
  label,
}: {
  tier: number;
  label?: string;
}) {
  return (
    <div className="flex items-baseline gap-2 pb-2 pt-7 font-display text-xs uppercase tracking-widest2 text-chalk-dim">
      <span className="text-gold">Tier {tier}</span>
      {label ? <span className="text-chalk-dim/70">— {label}</span> : null}
    </div>
  );
}
