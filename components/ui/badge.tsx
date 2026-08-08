import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-mono font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        position:
          "border-chalk-dim/30 bg-field text-chalk-dim uppercase",
        value:
          "border-gold/40 bg-gold/10 text-gold",
        reach:
          "border-hash/40 bg-hash/10 text-hash",
        neutral:
          "border-line bg-transparent text-chalk-dim",
        risk:
          "border-line bg-transparent text-chalk-dim uppercase",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
