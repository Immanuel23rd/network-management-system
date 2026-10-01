import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as Trash2, c as Search, l as Plus, t as X, u as Pencil } from "./_libs/lucide-react.mjs";
import { i as relationDisplay, r as isModuleKey, t as MODULES } from "./_ssr/modules-CtP3kGuK.mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle, t as Dialog$1 } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as Route } from "./_ssr/router-BoizBGHR.mjs";
import { a as createRecord, c as listRecords, i as cn, l as updateRecord, n as Button, o as deleteRecord, r as StatusBadge, t as AppShell } from "./_ssr/status-badge-Db1eJErN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_module-CfnBFEXI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
function DialogContent({ className, children, title, description, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 flex max-h-[min(90dvh,720px)] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-border bg-surface shadow-[var(--shadow-border)]", "duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4 border-b border-border px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-base font-semibold tracking-tight",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "mt-1 text-sm text-muted",
				children: description
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "sr-only",
				children: "Form dialog"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "rounded-md p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md border border-border bg-surface-2 px-3 text-sm text-fg", "placeholder:text-subtle transition-[box-shadow,border-color] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-sm font-medium text-fg", className),
	...props
}));
Label.displayName = "Label";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-fg", "placeholder:text-subtle transition-[box-shadow,border-color] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
function errorMessage(err) {
	if (err instanceof Error && err.message) return err.message;
	if (typeof err === "object" && err && "message" in err) return String(err.message);
	return "Request failed.";
}
function emptyForm(fields) {
	const next = {};
	for (const field of fields) next[field.name] = field.defaultValue == null ? "" : String(field.defaultValue);
	return next;
}
function rowToForm(row, fields) {
	const next = emptyForm(fields);
	for (const field of fields) {
		const value = row[field.name];
		next[field.name] = value == null ? "" : String(value);
	}
	return next;
}
function formToValues(fields, form) {
	const values = {};
	for (const field of fields) {
		const raw = form[field.name] ?? "";
		if (field.type === "number" || field.type === "relation") values[field.name] = raw === "" ? null : Number(raw);
		else if (raw === "") values[field.name] = null;
		else values[field.name] = raw;
	}
	return values;
}
function displayCell(row, key, badge) {
	const value = row[key];
	if (badge) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value });
	if (value == null || value === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-subtle",
		children: "—"
	});
	return String(value);
}
function NativeSelect({ id, value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		id,
		value,
		onChange: (event) => onChange(event.target.value),
		className: "flex h-11 w-full rounded-md border border-border bg-surface-2 px-3 text-sm text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children
	});
}
function RecordForm({ moduleKey, fields, form, setForm, related }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 overflow-y-auto px-5 py-4 sm:grid-cols-2",
		children: fields.map((field) => {
			const id = `${moduleKey}-${field.name}`;
			const wide = field.type === "textarea" || field.name === "title" || field.name === "address";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: wide ? "flex flex-col gap-1.5 sm:col-span-2" : "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						htmlFor: id,
						children: [field.label, field.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-danger",
							children: " *"
						}) : null]
					}),
					field.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id,
						value: form[field.name] ?? "",
						onChange: (e) => setForm({
							...form,
							[field.name]: e.target.value
						})
					}) : field.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						id,
						value: form[field.name] ?? "",
						onChange: (value) => setForm({
							...form,
							[field.name]: value
						}),
						children: (field.options ?? []).map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opt.value,
							children: opt.label
						}, opt.value))
					}) : field.type === "relation" && field.relation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						id,
						value: form[field.name] ?? "",
						onChange: (value) => setForm({
							...form,
							[field.name]: value
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: field.required ? "Select…" : "None"
						}), (related[field.relation] ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: row.id,
							children: relationDisplay(row, field)
						}, row.id))]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id,
						type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text",
						value: form[field.name] ?? "",
						placeholder: field.placeholder,
						onChange: (e) => setForm({
							...form,
							[field.name]: e.target.value
						})
					}),
					field.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: field.hint
					}) : null
				]
			}, field.name);
		})
	});
}
function CrudPage({ moduleKey }) {
	const module = MODULES[moduleKey];
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm(module.fields));
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const listQuery = useQuery({
		queryKey: ["module", moduleKey],
		queryFn: () => listRecords({ data: { module: moduleKey } })
	});
	const relationKeys = [...new Set(module.fields.filter((f) => f.relation).map((f) => f.relation))];
	const relatedQueries = useQuery({
		queryKey: [
			"relations",
			moduleKey,
			relationKeys
		],
		enabled: dialogOpen,
		queryFn: async () => {
			const entries = await Promise.all(relationKeys.map(async (key) => [key, await listRecords({ data: { module: key } })]));
			return Object.fromEntries(entries);
		}
	});
	const saveMutation = useMutation({
		mutationFn: async () => {
			const values = formToValues(module.fields, form);
			if (editing) await updateRecord({ data: {
				module: moduleKey,
				id: editing.id,
				values
			} });
			else await createRecord({ data: {
				module: moduleKey,
				values
			} });
		},
		onSuccess: async () => {
			toast.success(editing ? "Record updated." : "Record created.");
			setDialogOpen(false);
			setEditing(null);
			await queryClient.invalidateQueries({ queryKey: ["module"] });
			await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (err) => toast.error(errorMessage(err))
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => deleteRecord({ data: {
			module: moduleKey,
			id
		} }),
		onSuccess: async () => {
			toast.success("Record deleted.");
			setPendingDelete(null);
			await queryClient.invalidateQueries({ queryKey: ["module"] });
			await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (err) => toast.error(errorMessage(err))
	});
	const rows = listQuery.data ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return rows;
		return rows.filter((row) => module.searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q)));
	}, [
		rows,
		search,
		module.searchKeys
	]);
	function openCreate() {
		setEditing(null);
		setForm(emptyForm(module.fields));
		setDialogOpen(true);
	}
	function openEdit(row) {
		setEditing(row);
		setForm(rowToForm(row, module.fields));
		setDialogOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: module.title,
		description: module.description,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: openCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: `Search ${module.title.toLowerCase()}…`,
						className: "pl-10"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "hidden text-sm tabular-nums text-muted sm:block",
					children: [filtered.length, " records"]
				})]
			}),
			listQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-surface p-8 text-sm text-muted",
				children: "Loading records…"
			}) : listQuery.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-surface p-8 text-sm text-danger",
				children: errorMessage(listQuery.error)
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface px-6 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(module.icon, { className: "mx-auto size-8 text-subtle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 text-base font-semibold",
						children: ["No ", module.title.toLowerCase()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Create a ",
							module.singular,
							" to start this inventory."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-5",
						onClick: openCreate,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
							"New ",
							module.singular
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-hidden rounded-xl border border-border bg-surface md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[640px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-surface-2/60 text-xs tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [module.columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: col.label
							}, col.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-28 px-4 py-3 font-medium",
								children: "Actions"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 last:border-0",
							children: [module.columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: col.mono ? "px-4 py-3 font-mono text-[13px] text-fg" : "px-4 py-3 text-fg",
								children: displayCell(row, col.key, col.badge)
							}, col.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-10",
										onClick: () => openEdit(row),
										"aria-label": "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-10 text-danger hover:text-danger",
										onClick: () => setPendingDelete(row),
										"aria-label": "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})
							})]
						}, row.id)) })]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:hidden",
				children: filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: module.columns.slice(0, 4).map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: col.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: col.mono ? "text-right font-mono text-sm" : "text-right text-sm",
								children: displayCell(row, col.key, col.badge)
							})]
						}, col.key))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => openEdit(row),
							children: "Edit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "text-danger",
							onClick: () => setPendingDelete(row),
							children: "Delete"
						})]
					})]
				}, row.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: editing ? `Edit ${module.singular}` : `New ${module.singular}`,
					description: "Required relationships must already exist in their modules.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (event) => {
							event.preventDefault();
							saveMutation.mutate();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordForm, {
							moduleKey,
							fields: module.fields,
							form,
							setForm,
							related: relatedQueries.data ?? {}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 border-t border-border px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setDialogOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: saveMutation.isPending,
								children: saveMutation.isPending ? "Saving…" : "Save"
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: pendingDelete != null,
				onOpenChange: (open) => !open && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					title: `Delete ${module.singular}?`,
					description: "Related records will block this if the database still references it.",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-4 text-sm text-muted",
						children: "This cannot be undone. Foreign keys stay enforced."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 border-t border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setPendingDelete(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							disabled: deleteMutation.isPending,
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: deleteMutation.isPending ? "Deleting…" : "Delete"
						})]
					})]
				})
			})
		]
	});
}
function ModuleRoute() {
	const { module } = Route.useParams();
	if (!isModuleKey(module)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, { moduleKey: module });
}
//#endregion
export { ModuleRoute as component };
