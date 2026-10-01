import { Badge } from "@/components/ui/badge";

const TONES: Record<string, "neutral" | "primary" | "success" | "warn" | "danger"> = {
  ACTIVE: "success",
  UP: "success",
  COMPLETED: "success",
  ALLOCATED: "primary",
  SCHEDULED: "primary",
  ADMIN: "primary",
  TECHNICIAN: "neutral",
  VIEWER: "neutral",
  ETHERNET: "neutral",
  FIBER: "neutral",
  WIFI: "neutral",
  LOOPBACK: "neutral",
  VLAN: "neutral",
  PREVENTIVE: "neutral",
  CORRECTIVE: "warn",
  UPGRADE: "primary",
  INSPECTION: "neutral",
  AVAILABLE: "neutral",
  INACTIVE: "neutral",
  DISABLED: "neutral",
  CANCELLED: "neutral",
  DECOMMISSIONED: "neutral",
  RESERVED: "warn",
  MAINTENANCE: "warn",
  IN_PROGRESS: "warn",
  DOWN: "danger",
};

const LABELS: Record<string, string> = {
  IN_PROGRESS: "In progress",
};

export function StatusBadge({ value }: { value: unknown }) {
  if (value == null || value === "") return <span className="text-subtle">—</span>;
  const raw = String(value);
  const tone = TONES[raw] ?? "neutral";
  const label = LABELS[raw] ?? raw.replaceAll("_", " ").toLowerCase();
  return (
    <Badge tone={tone}>
      <span
        className={
          tone === "success"
            ? "size-1.5 rounded-full bg-success"
            : tone === "danger"
              ? "size-1.5 rounded-full bg-danger"
              : tone === "warn"
                ? "size-1.5 rounded-full bg-warn"
                : "size-1.5 rounded-full bg-muted"
        }
      />
      <span className="capitalize">{label}</span>
    </Badge>
  );
}
