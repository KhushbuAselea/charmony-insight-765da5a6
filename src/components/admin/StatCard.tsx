import { ArrowDownRight, ArrowUpRight, LayoutGrid, MessageSquare, Timer, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/types";

const icons = {
  customers: Users,
  enquiries: MessageSquare,
  pending: Timer,
  designs: LayoutGrid,
} as const;

export function StatCard({ stat }: { stat: DashboardStat }) {
  const Icon = icons[stat.icon];
  const positive = stat.change >= 0;
  const Trend = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-pop">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{stat.label}</p>
        <span className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
      <p className="mt-2 flex items-center gap-1 text-xs">
        <Trend
          className={cn("size-3.5", positive ? "text-success" : "text-destructive")}
          aria-hidden
        />
        <span className={cn("font-medium", positive ? "text-success" : "text-destructive")}>
          {positive ? "+" : ""}
          {stat.change}%
        </span>
        <span className="text-muted-foreground">{stat.changeLabel}</span>
      </p>
    </article>
  );
}
