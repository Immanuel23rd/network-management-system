import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/netmanage/modules";
import { cn } from "@/lib/utils";

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="7" className="fill-surface-2" />
        <circle cx="16" cy="16" r="3.1" className="fill-primary" />
        <circle cx="8" cy="10" r="2" className="fill-fg" />
        <circle cx="24" cy="10" r="2" className="fill-fg" />
        <circle cx="8" cy="22" r="2" className="fill-muted" />
        <circle cx="24" cy="22" r="2" className="fill-muted" />
        <path
          d="M9.8 11.2 13.4 14.4M22.2 11.2 18.6 14.4M9.8 20.8 13.4 17.6M22.2 20.8 18.6 17.6"
          className="stroke-primary"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {compact ? null : (
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight">NetManage</div>
          <div className="text-[11px] tracking-wide text-subtle uppercase">Infrastructure registry</div>
        </div>
      )}
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_ITEMS.map((item) => {
        const active =
          item.path === "/" ? pathname === "/" : pathname === item.path;
        const Icon = item.icon;
        if (item.key === "dashboard") {
          return (
            <Link
              key={item.path}
              to="/"
              onClick={onNavigate}
              className={cn(
                "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150",
                active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/70 hover:text-fg",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.title}
            </Link>
          );
        }
        return (
          <Link
            key={item.path}
            to="/$module"
            params={{ module: item.key }}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150",
              active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/70 hover:text-fg",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface/80 px-3 py-5 md:flex">
        <div className="px-2 pb-6">
          <BrandMark />
        </div>
        <NavList />
        <p className="mt-auto px-3 pt-6 text-[11px] leading-relaxed text-subtle">
          Northline University campus inventory. CRUD records only.
        </p>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
            <SheetContent title="NetManage">
              <NavList onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">{title}</h1>
            {description ? <p className="truncate text-sm text-muted">{description}</p> : null}
          </div>
          {action}
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
