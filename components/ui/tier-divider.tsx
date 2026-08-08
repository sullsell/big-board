import { Separator } from "@/components/ui/separator";

export function TierDivider({
  tier,
  label,
}: {
  tier: number;
  label?: string;
}) {
  return (
    <div className="relative flex items-center gap-4 py-6" aria-hidden={false}>
      <Separator className="flex-1" />
      <div className="flex items-center gap-2 font-display text-xs uppercase tracking-widest2 text-chalk-dim">
        <span className="text-hash">▸</span>
        <span>Tier {tier}</span>
        {label ? <span className="text-chalk-dim/70">— {label}</span> : null}
        <span className="text-hash">◂</span>
      </div>
      <Separator className="flex-1" />
    </div>
  );
}
