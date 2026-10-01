import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/netmanage/api";
import { MODULES, relationDisplay, type FieldConfig } from "@/lib/netmanage/modules";
import type { ModuleKey, RecordRow } from "@/lib/netmanage/types";
import { StatusBadge } from "./status-badge";

function errorMessage(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "object" && err && "message" in err) return String((err as { message: unknown }).message);
  return "Request failed.";
}

function emptyForm(fields: FieldConfig[]): Record<string, string> {
  const next: Record<string, string> = {};
  for (const field of fields) {
    next[field.name] = field.defaultValue == null ? "" : String(field.defaultValue);
  }
  return next;
}

function rowToForm(row: RecordRow, fields: FieldConfig[]): Record<string, string> {
  const next = emptyForm(fields);
  for (const field of fields) {
    const value = row[field.name];
    next[field.name] = value == null ? "" : String(value);
  }
  return next;
}

function formToValues(
  fields: FieldConfig[],
  form: Record<string, string>,
): Record<string, string | number | boolean | null> {
  const values: Record<string, string | number | boolean | null> = {};
  for (const field of fields) {
    const raw = form[field.name] ?? "";
    if (field.type === "number" || field.type === "relation") {
      values[field.name] = raw === "" ? null : Number(raw);
    } else if (raw === "") {
      values[field.name] = null;
    } else {
      values[field.name] = raw;
    }
  }
  return values;
}

function displayCell(row: RecordRow, key: string, badge?: boolean) {
  const value = row[key];
  if (badge) return <StatusBadge value={value} />;
  if (value == null || value === "") return <span className="text-subtle">—</span>;
  return String(value);
}

function NativeSelect({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="flex h-11 w-full rounded-md border border-border bg-surface-2 px-3 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </select>
  );
}

function RecordForm({
  moduleKey,
  fields,
  form,
  setForm,
  related,
}: {
  moduleKey: ModuleKey;
  fields: FieldConfig[];
  form: Record<string, string>;
  setForm: (next: Record<string, string>) => void;
  related: Record<string, RecordRow[]>;
}) {
  return (
    <div className="grid gap-4 overflow-y-auto px-5 py-4 sm:grid-cols-2">
      {fields.map((field) => {
        const id = `${moduleKey}-${field.name}`;
        const wide = field.type === "textarea" || field.name === "title" || field.name === "address";
        return (
          <div key={field.name} className={wide ? "flex flex-col gap-1.5 sm:col-span-2" : "flex flex-col gap-1.5"}>
            <Label htmlFor={id}>
              {field.label}
              {field.required ? <span className="text-danger"> *</span> : null}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={id}
                value={form[field.name] ?? ""}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            ) : field.type === "select" ? (
              <NativeSelect
                id={id}
                value={form[field.name] ?? ""}
                onChange={(value) => setForm({ ...form, [field.name]: value })}
              >
                {(field.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </NativeSelect>
            ) : field.type === "relation" && field.relation ? (
              <NativeSelect
                id={id}
                value={form[field.name] ?? ""}
                onChange={(value) => setForm({ ...form, [field.name]: value })}
              >
                <option value="">{field.required ? "Select…" : "None"}</option>
                {(related[field.relation] ?? []).map((row) => (
                  <option key={row.id} value={row.id}>
                    {relationDisplay(row, field)}
                  </option>
                ))}
              </NativeSelect>
            ) : (
              <Input
                id={id}
                type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                value={form[field.name] ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            )}
            {field.hint ? <p className="text-xs text-subtle">{field.hint}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export function CrudPage({ moduleKey }: { moduleKey: ModuleKey }) {
  const module = MODULES[moduleKey];
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RecordRow | null>(null);
  const [form, setForm] = useState<Record<string, string>>(emptyForm(module.fields));
  const [pendingDelete, setPendingDelete] = useState<RecordRow | null>(null);

  const listQuery = useQuery({
    queryKey: ["module", moduleKey],
    queryFn: () => listRecords({ data: { module: moduleKey } }),
  });

  const relationKeys = [...new Set(module.fields.filter((f) => f.relation).map((f) => f.relation!))];

  const relatedQueries = useQuery({
    queryKey: ["relations", moduleKey, relationKeys],
    enabled: dialogOpen,
    queryFn: async () => {
      const entries = await Promise.all(
        relationKeys.map(async (key) => [key, await listRecords({ data: { module: key } })] as const),
      );
      return Object.fromEntries(entries) as Record<string, RecordRow[]>;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const values = formToValues(module.fields, form);
      if (editing) {
        await updateRecord({ data: { module: moduleKey, id: editing.id, values } });
      } else {
        await createRecord({ data: { module: moduleKey, values } });
      }
    },
    onSuccess: async () => {
      toast.success(editing ? "Record updated." : "Record created.");
      setDialogOpen(false);
      setEditing(null);
      await queryClient.invalidateQueries({ queryKey: ["module"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => deleteRecord({ data: { module: moduleKey, id } }),
    onSuccess: async () => {
      toast.success("Record deleted.");
      setPendingDelete(null);
      await queryClient.invalidateQueries({ queryKey: ["module"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const rows = listQuery.data ?? [];
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      module.searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q)),
    );
  }, [rows, search, module.searchKeys]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm(module.fields));
    setDialogOpen(true);
  }

  function openEdit(row: RecordRow) {
    setEditing(row);
    setForm(rowToForm(row, module.fields));
    setDialogOpen(true);
  }

  return (
    <AppShell
      title={module.title}
      description={module.description}
      action={
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          New
        </Button>
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${module.title.toLowerCase()}…`}
            className="pl-10"
          />
        </div>
        <p className="hidden text-sm tabular-nums text-muted sm:block">{filtered.length} records</p>
      </div>

      {listQuery.isLoading ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-sm text-muted">Loading records…</div>
      ) : listQuery.isError ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-sm text-danger">
          {errorMessage(listQuery.error)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface px-6 py-16 text-center">
          <module.icon className="mx-auto size-8 text-subtle" />
          <h2 className="mt-4 text-base font-semibold">No {module.title.toLowerCase()}</h2>
          <p className="mt-1 text-sm text-muted">Create a {module.singular} to start this inventory.</p>
          <Button className="mt-5" onClick={openCreate}>
            <Plus className="size-4" />
            New {module.singular}
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border bg-surface-2/60 text-xs tracking-wide text-muted uppercase">
                  <tr>
                    {module.columns.map((col) => (
                      <th key={col.key} className="px-4 py-3 font-medium">
                        {col.label}
                      </th>
                    ))}
                    <th className="w-28 px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b border-border/70 last:border-0">
                      {module.columns.map((col) => (
                        <td
                          key={col.key}
                          className={col.mono ? "px-4 py-3 font-mono text-[13px] text-fg" : "px-4 py-3 text-fg"}
                        >
                          {displayCell(row, col.key, col.badge)}
                        </td>
                      ))}
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="size-10" onClick={() => openEdit(row)} aria-label="Edit">
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-10 text-danger hover:text-danger"
                            onClick={() => setPendingDelete(row)}
                            aria-label="Delete"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {filtered.map((row) => (
              <article key={row.id} className="rounded-xl border border-border bg-surface p-4">
                <div className="space-y-2">
                  {module.columns.slice(0, 4).map((col) => (
                    <div key={col.key} className="flex items-start justify-between gap-3">
                      <span className="text-xs text-muted">{col.label}</span>
                      <span className={col.mono ? "text-right font-mono text-sm" : "text-right text-sm"}>
                        {displayCell(row, col.key, col.badge)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-end gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-danger" onClick={() => setPendingDelete(row)}>
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          title={editing ? `Edit ${module.singular}` : `New ${module.singular}`}
          description="Required relationships must already exist in their modules."
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate();
            }}
          >
            <RecordForm
              moduleKey={moduleKey}
              fields={module.fields}
              form={form}
              setForm={setForm}
              related={relatedQueries.data ?? {}}
            />
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pendingDelete != null} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent
          title={`Delete ${module.singular}?`}
          description="Related records will block this if the database still references it."
        >
          <div className="px-5 py-4 text-sm text-muted">
            This cannot be undone. Foreign keys stay enforced.
          </div>
          <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
            <Button type="button" variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={deleteMutation.isPending}
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
