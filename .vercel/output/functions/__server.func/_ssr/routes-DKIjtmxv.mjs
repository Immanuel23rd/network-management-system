import { _ as ArrowUpRight, g as Cable, h as Hash, n as Wrench, s as Server } from "../_libs/lucide-react.mjs";
import { n as NAV_ITEMS } from "./modules-CtP3kGuK.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as StatusBadge, s as getDashboard, t as AppShell } from "./status-badge-Db1eJErN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DKIjtmxv.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, hint, module }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/$module",
		params: { module },
		className: "group rounded-xl border border-border bg-surface p-4 transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-subtle transition-colors group-hover:text-primary" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-3xl font-medium tabular-nums tracking-tight",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
function Home() {
	const query = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard()
	});
	const stats = query.data?.stats;
	const recent = query.data?.recentMaintenance ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Overview",
		description: "Northline University network inventory",
		children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-surface p-8 text-sm text-muted",
			children: "Loading inventory…"
		}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border border-border bg-surface p-8 text-sm text-danger",
			children: query.error instanceof Error ? query.error.message : "Could not load dashboard."
		}) : stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Devices",
						value: stats.devices,
						hint: `${stats.devicesActive} active · ${stats.devicesMaintenance} in maintenance`,
						module: "devices"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Interfaces",
						value: stats.interfaces,
						hint: stats.interfacesDown ? `${stats.interfacesDown} down` : "All reported up or disabled",
						module: "interfaces"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "IP addresses",
						value: stats.ipAddresses,
						hint: `${stats.ipAvailable} available`,
						module: "ip-addresses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open maintenance",
						value: stats.maintenanceOpen,
						hint: "Scheduled or in progress",
						module: "maintenance"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: "VLANs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular-nums",
							children: stats.vlans
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: "Subnets"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular-nums",
							children: stats.subnets
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: "Locations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular-nums",
							children: stats.locations
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: "Operators"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-2xl tabular-nums",
							children: stats.users
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Recent maintenance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Latest work against registered devices"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4 text-subtle" })]
					}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 py-8 text-sm text-muted",
						children: "No maintenance records yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1 border-b border-border/70 px-5 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted",
								children: [
									item.hostname,
									" · ",
									item.technician
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-subtle",
								children: item.scheduledDate
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: item.status })]
						})]
					}, item.id)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Modules"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Jump to a CRUD register"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "p-2",
						children: NAV_ITEMS.filter((item) => item.key !== "dashboard").map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/$module",
								params: { module: item.key },
								className: "flex h-11 items-center gap-2.5 rounded-md px-3 text-sm text-fg transition-colors hover:bg-surface-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5 text-subtle" })
								]
							}) }, item.path);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "How records connect"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-3xl text-sm text-muted",
						children: "Device types and locations describe equipment. Devices own interfaces. VLANs group interfaces and subnets. IP addresses belong to a subnet and may bind to one interface. Maintenance is logged against a device and an operator."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-3.5" }), " Device"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "→"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { className: "size-3.5" }), " Interface"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "→"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "size-3.5" }), " IP address"]
							})
						]
					})
				]
			})
		] }) : null
	});
}
//#endregion
export { Home as component };
