import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as NAV_ITEMS } from "./modules-CtP3kGuK.mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as record, c as unknown, i as object, o as string, r as number, t as _enum } from "../_libs/zod.mjs";
import { a as DialogOverlay, c as Slot, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-Db1eJErN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,background-color,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			danger: "bg-danger text-bg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
function SheetContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-surface p-4", "transition-transform duration-200 ease-out data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-sm font-semibold tracking-tight",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "rounded-md p-2 text-muted hover:bg-surface-2 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
function BrandMark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "size-8 shrink-0",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "32",
					height: "32",
					rx: "7",
					className: "fill-surface-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "16",
					cy: "16",
					r: "3.1",
					className: "fill-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "8",
					cy: "10",
					r: "2",
					className: "fill-fg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "24",
					cy: "10",
					r: "2",
					className: "fill-fg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "8",
					cy: "22",
					r: "2",
					className: "fill-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "24",
					cy: "22",
					r: "2",
					className: "fill-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M9.8 11.2 13.4 14.4M22.2 11.2 18.6 14.4M9.8 20.8 13.4 17.6M22.2 20.8 18.6 17.6",
					className: "stroke-primary",
					strokeWidth: "1.2",
					fill: "none",
					strokeLinecap: "round"
				})
			]
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold tracking-tight",
				children: "NetManage"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] tracking-wide text-subtle uppercase",
				children: "Infrastructure registry"
			})]
		})]
	});
}
function NavList({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5",
		children: NAV_ITEMS.map((item) => {
			const active = item.path === "/" ? pathname === "/" : pathname === item.path;
			const Icon = item.icon;
			if (item.key === "dashboard") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/70 hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.title]
			}, item.path);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/$module",
				params: { module: item.key },
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2/70 hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), item.title]
			}, item.path);
		})
	});
}
function AppShell({ title, description, action, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-surface/80 px-3 py-5 md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-auto px-3 pt-6 text-[11px] leading-relaxed text-subtle",
					children: "Northline University campus inventory. CRUD records only."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:pl-60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Open navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
							title: "NetManage",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onNavigate: () => setOpen(false) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate text-lg font-semibold tracking-tight md:text-xl",
							children: title
						}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-muted",
							children: description
						}) : null]
					}),
					action
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-4 py-6 md:px-8 md:py-8",
				children
			})]
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboard = createServerFn({ method: "GET" }).handler(createSsrRpc("d375dda9da4a119dbb92713999c82cd4c0ef89426ce3a60a64a8e1c8a694d41a"));
var moduleKeySchema = _enum([
	"users",
	"device-types",
	"locations",
	"devices",
	"interfaces",
	"vlans",
	"subnets",
	"ip-addresses",
	"maintenance"
]);
var listRecords = createServerFn({ method: "GET" }).validator((input) => object({ module: moduleKeySchema }).parse(input)).handler(createSsrRpc("307104e541bea5469a6e5c4ee287b83c7511d573b27e3e02f08cff24a622b7b7"));
var payloadSchema = object({
	module: moduleKeySchema,
	values: record(string(), unknown())
});
var updateSchema = payloadSchema.extend({ id: number().int().positive() });
var createRecord = createServerFn({ method: "POST" }).validator((input) => payloadSchema.parse(input)).handler(createSsrRpc("e7e6e3eec5c4eeae23f9abc3f74d1b9b22204f0ef7f30cff4a3173fa7ab7c5e9"));
var updateRecord = createServerFn({ method: "POST" }).validator((input) => updateSchema.parse(input)).handler(createSsrRpc("b8565fa2ab1d182bf5c0aace9c578a43fbb2bdff5e1e010204dfc18507a9e421"));
var deleteRecord = createServerFn({ method: "POST" }).validator((input) => object({
	module: moduleKeySchema,
	id: number().int().positive()
}).parse(input)).handler(createSsrRpc("4e135624922ae6db65170a3aa3d8ce7b06496df23322e1d810b5e3766c0e3ba7"));
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		neutral: "bg-surface-2 text-muted",
		primary: "bg-primary/15 text-primary",
		success: "bg-success/15 text-success",
		warn: "bg-warn/15 text-warn",
		danger: "bg-danger/15 text-danger"
	} },
	defaultVariants: { tone: "neutral" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var TONES = {
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
	DOWN: "danger"
};
var LABELS = { IN_PROGRESS: "In progress" };
function StatusBadge({ value }) {
	if (value == null || value === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-subtle",
		children: "—"
	});
	const raw = String(value);
	const tone = TONES[raw] ?? "neutral";
	const label = LABELS[raw] ?? raw.replaceAll("_", " ").toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: tone === "success" ? "size-1.5 rounded-full bg-success" : tone === "danger" ? "size-1.5 rounded-full bg-danger" : tone === "warn" ? "size-1.5 rounded-full bg-warn" : "size-1.5 rounded-full bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "capitalize",
			children: label
		})]
	});
}
//#endregion
export { createRecord as a, listRecords as c, cn as i, updateRecord as l, Button as n, deleteRecord as o, StatusBadge as r, getDashboard as s, AppShell as t };
