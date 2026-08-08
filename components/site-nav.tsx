"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Big Board" },
  { href: "/mock-drafts", label: "Mock Drafts" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 flex gap-1.5 overflow-x-auto">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-sm border px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors",
              active
                ? "border-gold bg-gold/15 text-gold"
                : "border-line text-chalk-dim hover:border-chalk-dim/50 hover:text-chalk"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
