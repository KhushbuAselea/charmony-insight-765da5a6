import { cn } from "@/lib/utils";

export type BadgeTone = "brand" | "info" | "success" | "warning" | "neutral" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-soft text-brand",
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  neutral: "bg-neutral-soft text-muted-foreground",
  danger: "bg-destructive/10 text-destructive",
};

const labelTones: Record<string, BadgeTone> = {
  New: "brand",
  Contacted: "info",
  Quoted: "warning",
  Closed: "neutral",
  Draft: "neutral",
  Sent: "brand",
  Accepted: "success",
  Rejected: "danger",
  Active: "success",
  Inactive: "neutral",
  Processed: "success",
  Processing: "warning",
  Failed: "danger",
};

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
}

export function StatusBadge({ label, tone, className }: StatusBadgeProps) {
  const resolved = tone ?? labelTones[label] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
        toneClasses[resolved],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
