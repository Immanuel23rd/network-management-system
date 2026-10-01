import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cable, Hash, Server, Wrench } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StatusBadge } from "@/components/crud/status-badge";
import { getDashboard } from "@/lib/netmanage/api";
import { NAV_ITEMS } from "@/lib/netmanage/modules";
import type { ModuleKey } from "@/lib/netmanage/types";

export const Route = createFileRoute("/")({ component: Home });

function StatCard({
  label,
  value,
  hint,
  module,
}: {
  label: string;
  value: number;
  hint?: string;
  module: ModuleKey;
}) {
  return (
    <Link
      to="/$module"
      params={{ module }}
      className="group rounded-xl border border-border bg-surface p-4 transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
        <ArrowUpRight className="size-4 text-subtle transition-colors group-hover:text-primary" />
      </div>
      <p className="mt-3 font-mono text-3xl font-medium tabular-nums tracking-tight">{value}</p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </Link>
  );
}

function Home() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
  });

  const stats = query.data?.stats;
  const recent = query.data?.recentMaintenance ?? [];

  return (
    <AppShell title="Overview" description="Northline University network inventory">
      {query.isLoading ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-sm text-muted">Loading inventory…</div>
      ) : query.isError ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-sm text-danger">
          {query.error instanceof Error ? query.error.message : "Could not load dashboard."}
        </div>
      ) : stats ? (
        <>
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              label="Devices"
              value={stats.devices}
              hint={`${stats.devicesActive} active · ${stats.devicesMaintenance} in maintenance`}
              module="devices"
            />
            <StatCard
              label="Interfaces"
              value={stats.interfaces}
              hint={stats.interfacesDown ? `${stats.interfacesDown} down` : "All reported up or disabled"}
              module="interfaces"
            />
            <StatCard
              label="IP addresses"
              value={stats.ipAddresses}
              hint={`${stats.ipAvailable} available`}
              module="ip-addresses"
            />
            <StatCard
              label="Open maintenance"
              value={stats.maintenanceOpen}
              hint="Scheduled or in progress"
              module="maintenance"
            />
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs tracking-wide text-muted uppercase">VLANs</p>
              <p className="mt-2 font-mono text-2xl tabular-nums">{stats.vlans}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs tracking-wide text-muted uppercase">Subnets</p>
              <p className="mt-2 font-mono text-2xl tabular-nums">{stats.subnets}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs tracking-wide text-muted uppercase">Locations</p>
              <p className="mt-2 font-mono text-2xl tabular-nums">{stats.locations}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xs tracking-wide text-muted uppercase">Operators</p>
              <p className="mt-2 font-mono text-2xl tabular-nums">{stats.users}</p>
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            <section className="rounded-xl border border-border bg-surface lg:col-span-3">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">Recent maintenance</h2>
                  <p className="text-xs text-muted">Latest work against registered devices</p>
                </div>
                <Wrench className="size-4 text-subtle" />
              </div>
              {recent.length === 0 ? (
                <p className="px-5 py-8 text-sm text-muted">No maintenance records yet.</p>
              ) : (
                <ul>
                  {recent.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-1 border-b border-border/70 px-5 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.title}</p>
                        <p className="font-mono text-xs text-muted">
                          {item.hostname} · {item.technician}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs tabular-nums text-subtle">{item.scheduledDate}</span>
                        <StatusBadge value={item.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-xl border border-border bg-surface lg:col-span-2">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold">Modules</h2>
                <p className="text-xs text-muted">Jump to a CRUD register</p>
              </div>
              <ul className="p-2">
                {NAV_ITEMS.filter((item) => item.key !== "dashboard").map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to="/$module"
                        params={{ module: item.key as ModuleKey }}
                        className="flex h-11 items-center gap-2.5 rounded-md px-3 text-sm text-fg transition-colors hover:bg-surface-2"
                      >
                        <Icon className="size-4 text-muted" />
                        <span className="flex-1">{item.title}</span>
                        <ArrowUpRight className="size-3.5 text-subtle" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <section className="mt-6 rounded-xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">How records connect</h2>
            <p className="mt-1 max-w-3xl text-sm text-muted">
              Device types and locations describe equipment. Devices own interfaces. VLANs group
              interfaces and subnets. IP addresses belong to a subnet and may bind to one interface.
              Maintenance is logged against a device and an operator.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1">
                <Server className="size-3.5" /> Device
              </span>
              <span className="text-subtle">→</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1">
                <Cable className="size-3.5" /> Interface
              </span>
              <span className="text-subtle">→</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1">
                <Hash className="size-3.5" /> IP address
              </span>
            </div>
          </section>
        </>
      ) : null}
    </AppShell>
  );
}
