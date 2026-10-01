import { a as record, c as unknown, i as object, o as string, r as number, t as _enum } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CWp2O-NG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_netmanage_default = "-- NetManage schema + Northline University sample inventory\n\ncreate table if not exists app_users (\n  id serial primary key,\n  username varchar(64) not null unique,\n  full_name varchar(120) not null,\n  email varchar(160) not null unique,\n  role varchar(32) not null check (role in ('ADMIN', 'TECHNICIAN', 'VIEWER')),\n  status varchar(32) not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists device_types (\n  id serial primary key,\n  name varchar(80) not null unique,\n  description text\n);\n\ncreate table if not exists locations (\n  id serial primary key,\n  name varchar(120) not null,\n  building varchar(80),\n  floor varchar(40),\n  room varchar(40),\n  address varchar(200),\n  notes text\n);\n\ncreate table if not exists vlans (\n  id serial primary key,\n  vlan_number integer not null unique check (vlan_number between 1 and 4094),\n  name varchar(80) not null,\n  description text,\n  status varchar(32) not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE'))\n);\n\ncreate table if not exists devices (\n  id serial primary key,\n  hostname varchar(120) not null unique,\n  manufacturer varchar(80) not null,\n  model varchar(80) not null,\n  serial_number varchar(80) not null unique,\n  status varchar(32) not null default 'ACTIVE'\n    check (status in ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'DECOMMISSIONED')),\n  purchase_date date,\n  device_type_id integer not null references device_types (id),\n  location_id integer not null references locations (id),\n  notes text\n);\n\ncreate table if not exists interfaces (\n  id serial primary key,\n  name varchar(80) not null,\n  type varchar(32) not null check (type in ('ETHERNET', 'FIBER', 'WIFI', 'LOOPBACK', 'VLAN')),\n  mac_address varchar(17) unique,\n  status varchar(32) not null default 'UP' check (status in ('UP', 'DOWN', 'DISABLED')),\n  device_id integer not null references devices (id),\n  vlan_id integer references vlans (id),\n  unique (device_id, name)\n);\n\ncreate table if not exists subnets (\n  id serial primary key,\n  network_address varchar(45) not null,\n  cidr integer not null check (cidr between 0 and 32),\n  subnet_mask varchar(45) not null,\n  description text,\n  vlan_id integer not null references vlans (id),\n  unique (network_address, cidr)\n);\n\ncreate table if not exists ip_addresses (\n  id serial primary key,\n  address varchar(45) not null unique,\n  status varchar(32) not null default 'AVAILABLE'\n    check (status in ('ALLOCATED', 'AVAILABLE', 'RESERVED')),\n  subnet_id integer not null references subnets (id),\n  interface_id integer unique references interfaces (id)\n);\n\ncreate table if not exists maintenance_records (\n  id serial primary key,\n  title varchar(160) not null,\n  description text,\n  maintenance_type varchar(32) not null\n    check (maintenance_type in ('PREVENTIVE', 'CORRECTIVE', 'UPGRADE', 'INSPECTION')),\n  status varchar(32) not null default 'SCHEDULED'\n    check (status in ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),\n  scheduled_date date not null,\n  completed_date date,\n  device_id integer not null references devices (id),\n  user_id integer not null references app_users (id)\n);\n\ninsert into app_users (username, full_name, email, role, status)\nselect * from (values\n  ('a.nkurunziza', 'Aline Nkurunziza', 'aline.nkurunziza@northline.example', 'ADMIN', 'ACTIVE'),\n  ('j.mwangi', 'James Mwangi', 'james.mwangi@northline.example', 'TECHNICIAN', 'ACTIVE'),\n  ('s.uwase', 'Sandrine Uwase', 'sandrine.uwase@northline.example', 'TECHNICIAN', 'ACTIVE'),\n  ('p.okello', 'Peter Okello', 'peter.okello@northline.example', 'VIEWER', 'ACTIVE')\n) as v(username, full_name, email, role, status)\nwhere not exists (select 1 from app_users);\n\ninsert into device_types (name, description)\nselect * from (values\n  ('Router', 'Edge and core routing platforms'),\n  ('Switch', 'Access and distribution switching'),\n  ('Firewall', 'Perimeter and segmentation firewalls'),\n  ('Access Point', 'Campus wireless radios'),\n  ('Server', 'Infrastructure and application hosts')\n) as v(name, description)\nwhere not exists (select 1 from device_types);\n\ninsert into locations (name, building, floor, room, address, notes)\nselect * from (values\n  ('HQ Core MDF', 'Administration', 'B1', 'MDF-01', '12 Campus Way, Northline', 'Primary campus meet-me room'),\n  ('Science IDF', 'Science Block', '2', 'IDF-2E', '4 Faraday Lane', 'Serves labs and faculty offices'),\n  ('Library IDF', 'Main Library', '1', 'IDF-1N', '1 Archive Court', 'Public and staff wireless'),\n  ('Student Center', 'Student Union', 'G', 'COMMS-G', '9 Union Plaza', 'High-density wireless and POS')\n) as v(name, building, floor, room, address, notes)\nwhere not exists (select 1 from locations);\n\ninsert into vlans (vlan_number, name, description, status)\nselect * from (values\n  (10, 'Management', 'OOB and device management', 'ACTIVE'),\n  (20, 'Staff', 'Faculty and administration', 'ACTIVE'),\n  (30, 'Students', 'Residence and classroom users', 'ACTIVE'),\n  (40, 'Servers', 'Data center and appliance segment', 'ACTIVE'),\n  (50, 'Guest', 'Isolated visitor wireless', 'ACTIVE'),\n  (100, 'Voice', 'IP telephony', 'ACTIVE')\n) as v(vlan_number, name, description, status)\nwhere not exists (select 1 from vlans);\n\ninsert into devices (hostname, manufacturer, model, serial_number, status, purchase_date, device_type_id, location_id, notes)\nselect v.hostname, v.manufacturer, v.model, v.serial_number, v.status, v.purchase_date::date, dt.id, loc.id, v.notes\nfrom (values\n  ('core-rtr-01', 'Cisco', 'ISR 4451', 'FTX2411A9K1', 'ACTIVE', '2023-03-12', 'Router', 'HQ Core MDF', 'Campus default gateway and WAN handoff'),\n  ('dist-sw-01', 'Cisco', 'Catalyst 9300', 'FOC2448X12Q', 'ACTIVE', '2023-06-01', 'Switch', 'HQ Core MDF', 'Distribution switch for east campus'),\n  ('fw-edge-01', 'Fortinet', 'FortiGate 200F', 'FG200FTB22001234', 'ACTIVE', '2022-11-18', 'Firewall', 'HQ Core MDF', 'North-south perimeter'),\n  ('access-sw-sci-01', 'Cisco', 'Catalyst 9200', 'FOC2511M88C', 'ACTIVE', '2024-01-09', 'Switch', 'Science IDF', 'Science block access'),\n  ('ap-lib-01', 'Ubiquiti', 'U6 Pro', 'U6P-24A81C', 'ACTIVE', '2024-04-22', 'Access Point', 'Library IDF', 'Reading hall west'),\n  ('ap-sc-01', 'Ubiquiti', 'U6 Pro', 'U6P-24A92D', 'MAINTENANCE', '2024-04-22', 'Access Point', 'Student Center', 'Atrium, radio 5 GHz flapping'),\n  ('srv-dns-01', 'Dell', 'PowerEdge R750', 'DLLR750-88421', 'ACTIVE', '2023-09-15', 'Server', 'HQ Core MDF', 'Recursive DNS / AD-integrated'),\n  ('srv-dir-01', 'Dell', 'PowerEdge R750', 'DLLR750-88422', 'ACTIVE', '2023-09-15', 'Server', 'HQ Core MDF', 'Directory services')\n) as v(hostname, manufacturer, model, serial_number, status, purchase_date, type_name, loc_name, notes)\njoin device_types dt on dt.name = v.type_name\njoin locations loc on loc.name = v.loc_name\nwhere not exists (select 1 from devices d where d.hostname = v.hostname);\n\ninsert into interfaces (name, type, mac_address, status, device_id, vlan_id)\nselect v.name, v.type, v.mac_address, v.status, d.id, vl.id\nfrom (values\n  ('GigabitEthernet0/0/0', 'ETHERNET', '00:1A:2B:10:00:01', 'UP', 'core-rtr-01', 10),\n  ('GigabitEthernet0/0/1', 'FIBER', '00:1A:2B:10:00:02', 'UP', 'core-rtr-01', 40),\n  ('Loopback0', 'LOOPBACK', null, 'UP', 'core-rtr-01', 10),\n  ('GigabitEthernet1/0/1', 'ETHERNET', '00:1A:2B:20:00:01', 'UP', 'dist-sw-01', 10),\n  ('GigabitEthernet1/0/24', 'FIBER', '00:1A:2B:20:00:18', 'UP', 'dist-sw-01', 20),\n  ('wan1', 'ETHERNET', '08:5B:0E:AA:00:01', 'UP', 'fw-edge-01', null),\n  ('internal', 'ETHERNET', '08:5B:0E:AA:00:02', 'UP', 'fw-edge-01', 10),\n  ('GigabitEthernet1/0/1', 'ETHERNET', '00:1A:2B:30:00:01', 'UP', 'access-sw-sci-01', 20),\n  ('GigabitEthernet1/0/12', 'ETHERNET', '00:1A:2B:30:00:0C', 'DOWN', 'access-sw-sci-01', 30),\n  ('wlan0', 'WIFI', '24:5A:4C:11:00:01', 'UP', 'ap-lib-01', 30),\n  ('wlan0', 'WIFI', '24:5A:4C:11:00:02', 'DOWN', 'ap-sc-01', 50),\n  ('eth0', 'ETHERNET', 'A4:BB:6D:01:00:01', 'UP', 'srv-dns-01', 40)\n) as v(name, type, mac_address, status, hostname, vlan_number)\njoin devices d on d.hostname = v.hostname\nleft join vlans vl on vl.vlan_number = v.vlan_number\nwhere not exists (\n  select 1 from interfaces i where i.device_id = d.id and i.name = v.name\n);\n\ninsert into subnets (network_address, cidr, subnet_mask, description, vlan_id)\nselect v.network_address, v.cidr, v.subnet_mask, v.description, vl.id\nfrom (values\n  ('10.10.10.0', 24, '255.255.255.0', 'Device management', 10),\n  ('10.20.0.0', 22, '255.255.252.0', 'Staff wired and wireless', 20),\n  ('10.30.0.0', 22, '255.255.252.0', 'Student access', 30),\n  ('10.40.0.0', 24, '255.255.255.0', 'Servers and appliances', 40),\n  ('10.50.0.0', 24, '255.255.255.0', 'Guest wireless', 50)\n) as v(network_address, cidr, subnet_mask, description, vlan_number)\njoin vlans vl on vl.vlan_number = v.vlan_number\nwhere not exists (\n  select 1 from subnets s where s.network_address = v.network_address and s.cidr = v.cidr\n);\n\ninsert into ip_addresses (address, status, subnet_id, interface_id)\nselect v.address, v.status, s.id, i.id\nfrom (values\n  ('10.10.10.1', 'ALLOCATED', '10.10.10.0', 24, 'core-rtr-01', 'GigabitEthernet0/0/0'),\n  ('10.10.10.2', 'ALLOCATED', '10.10.10.0', 24, 'dist-sw-01', 'GigabitEthernet1/0/1'),\n  ('10.10.10.3', 'ALLOCATED', '10.10.10.0', 24, 'fw-edge-01', 'internal'),\n  ('10.10.10.4', 'RESERVED', '10.10.10.0', 24, null, null),\n  ('10.40.0.1', 'ALLOCATED', '10.40.0.0', 24, 'core-rtr-01', 'GigabitEthernet0/0/1'),\n  ('10.40.0.10', 'ALLOCATED', '10.40.0.0', 24, 'srv-dns-01', 'eth0'),\n  ('10.40.0.11', 'RESERVED', '10.40.0.0', 24, null, null),\n  ('10.20.0.10', 'AVAILABLE', '10.20.0.0', 22, null, null),\n  ('10.30.0.25', 'ALLOCATED', '10.30.0.0', 22, 'ap-lib-01', 'wlan0'),\n  ('10.50.0.1', 'RESERVED', '10.50.0.0', 24, null, null)\n) as v(address, status, network_address, cidr, hostname, ifname)\njoin subnets s on s.network_address = v.network_address and s.cidr = v.cidr\nleft join devices d on d.hostname = v.hostname\nleft join interfaces i on i.device_id = d.id and i.name = v.ifname\nwhere not exists (select 1 from ip_addresses a where a.address = v.address);\n\ninsert into maintenance_records (title, description, maintenance_type, status, scheduled_date, completed_date, device_id, user_id)\nselect v.title, v.description, v.maintenance_type, v.status, v.scheduled_date::date, v.completed_date::date, d.id, u.id\nfrom (values\n  ('Replace atrium AP radio', '5 GHz radio flapping during peak hours', 'CORRECTIVE', 'IN_PROGRESS', '2026-09-28', null, 'ap-sc-01', 'j.mwangi'),\n  ('Core router IOS-XE patch', 'Scheduled firmware window', 'UPGRADE', 'SCHEDULED', '2026-10-12', null, 'core-rtr-01', 'a.nkurunziza'),\n  ('Science switch port audit', 'Label and disable unused access ports', 'INSPECTION', 'COMPLETED', '2026-09-02', '2026-09-03', 'access-sw-sci-01', 's.uwase'),\n  ('Firewall policy review', 'Quarterly rulebase hygiene', 'PREVENTIVE', 'SCHEDULED', '2026-10-20', null, 'fw-edge-01', 'j.mwangi'),\n  ('DNS host disk check', 'SMART warnings on bay 2', 'INSPECTION', 'COMPLETED', '2026-08-19', '2026-08-19', 'srv-dns-01', 's.uwase')\n) as v(title, description, maintenance_type, status, scheduled_date, completed_date, hostname, username)\njoin devices d on d.hostname = v.hostname\njoin app_users u on u.username = v.username\nwhere not exists (\n  select 1 from maintenance_records m where m.title = v.title and m.device_id = d.id\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_netmanage.sql": _0002_netmanage_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
function throwDb(err) {
	const raw = err instanceof Error ? err.message : String(err);
	const msg = raw.toLowerCase();
	if (msg.includes("unique") || msg.includes("duplicate")) throw new Error("That value is already in use. Unique fields include hostname, serial number, IP, MAC, and VLAN number.");
	if (msg.includes("foreign key") || msg.includes("referenc") || msg.includes("constraint")) {
		if (msg.includes("check constraint")) throw new Error("One of the values is not allowed. Check status, type, or numeric ranges.");
		throw new Error("This record is still referenced by related inventory and cannot be removed.");
	}
	if (msg.includes("not-null") || msg.includes("null value")) throw new Error("A required relationship or field is missing.");
	throw err instanceof Error ? err : new Error(raw);
}
function num(value) {
	return Number(value);
}
function str(value) {
	return value == null ? "" : String(value);
}
function strNull(value) {
	if (value == null || value === "") return null;
	return String(value);
}
function numNull(value) {
	if (value == null || value === "") return null;
	return Number(value);
}
var getDashboard_createServerFn_handler = createServerRpc({
	id: "d375dda9da4a119dbb92713999c82cd4c0ef89426ce3a60a64a8e1c8a694d41a",
	name: "getDashboard",
	filename: "src/lib/netmanage/api.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).handler(getDashboard_createServerFn_handler, async () => {
	const sql = await getSql();
	const r = (await sql.query(`
    select
      (select count(*) from app_users) as users,
      (select count(*) from device_types) as device_types,
      (select count(*) from locations) as locations,
      (select count(*) from devices) as devices,
      (select count(*) from devices where status = 'ACTIVE') as devices_active,
      (select count(*) from devices where status = 'MAINTENANCE') as devices_maintenance,
      (select count(*) from interfaces) as interfaces,
      (select count(*) from interfaces where status = 'DOWN') as interfaces_down,
      (select count(*) from vlans) as vlans,
      (select count(*) from subnets) as subnets,
      (select count(*) from ip_addresses) as ip_addresses,
      (select count(*) from ip_addresses where status = 'AVAILABLE') as ip_available,
      (select count(*) from maintenance_records where status in ('SCHEDULED', 'IN_PROGRESS')) as maintenance_open
  `))[0] ?? {};
	return {
		stats: {
			users: num(r.users),
			deviceTypes: num(r.device_types),
			locations: num(r.locations),
			devices: num(r.devices),
			devicesActive: num(r.devices_active),
			devicesMaintenance: num(r.devices_maintenance),
			interfaces: num(r.interfaces),
			interfacesDown: num(r.interfaces_down),
			vlans: num(r.vlans),
			subnets: num(r.subnets),
			ipAddresses: num(r.ip_addresses),
			ipAvailable: num(r.ip_available),
			maintenanceOpen: num(r.maintenance_open)
		},
		recentMaintenance: (await sql.query(`
    select m.id, m.title, m.status, m.scheduled_date, d.hostname, u.full_name
    from maintenance_records m
    join devices d on d.id = m.device_id
    join app_users u on u.id = m.user_id
    order by m.scheduled_date desc, m.id desc
    limit 6
  `)).map((row) => ({
			id: num(row.id),
			title: str(row.title),
			status: str(row.status),
			scheduledDate: str(row.scheduled_date),
			hostname: str(row.hostname),
			technician: str(row.full_name)
		}))
	};
});
async function listUsers() {
	return (await (await getSql()).query(`select id, username, full_name, email, role, status, created_at from app_users order by username`)).map((r) => ({
		id: num(r.id),
		username: str(r.username),
		fullName: str(r.full_name),
		email: str(r.email),
		role: str(r.role),
		status: str(r.status),
		createdAt: strNull(r.created_at)
	}));
}
async function listDeviceTypes() {
	return (await (await getSql()).query(`select id, name, description from device_types order by name`)).map((r) => ({
		id: num(r.id),
		name: str(r.name),
		description: strNull(r.description)
	}));
}
async function listLocations() {
	return (await (await getSql()).query(`select id, name, building, floor, room, address, notes from locations order by name`)).map((r) => ({
		id: num(r.id),
		name: str(r.name),
		building: strNull(r.building),
		floor: strNull(r.floor),
		room: strNull(r.room),
		address: strNull(r.address),
		notes: strNull(r.notes)
	}));
}
async function listVlans() {
	return (await (await getSql()).query(`select id, vlan_number, name, description, status from vlans order by vlan_number`)).map((r) => ({
		id: num(r.id),
		vlanNumber: num(r.vlan_number),
		name: str(r.name),
		description: strNull(r.description),
		status: str(r.status)
	}));
}
async function listDevices() {
	return (await (await getSql()).query(`
    select d.id, d.hostname, d.manufacturer, d.model, d.serial_number, d.status,
           d.purchase_date, d.device_type_id, dt.name as device_type_name,
           d.location_id, l.name as location_name, d.notes
    from devices d
    join device_types dt on dt.id = d.device_type_id
    join locations l on l.id = d.location_id
    order by d.hostname
  `)).map((r) => ({
		id: num(r.id),
		hostname: str(r.hostname),
		manufacturer: str(r.manufacturer),
		model: str(r.model),
		serialNumber: str(r.serial_number),
		status: str(r.status),
		purchaseDate: strNull(r.purchase_date),
		deviceTypeId: num(r.device_type_id),
		deviceTypeName: str(r.device_type_name),
		locationId: num(r.location_id),
		locationName: str(r.location_name),
		notes: strNull(r.notes)
	}));
}
async function listInterfaces() {
	return (await (await getSql()).query(`
    select i.id, i.name, i.type, i.mac_address, i.status, i.device_id, d.hostname,
           i.vlan_id, v.name as vlan_name
    from interfaces i
    join devices d on d.id = i.device_id
    left join vlans v on v.id = i.vlan_id
    order by d.hostname, i.name
  `)).map((r) => ({
		id: num(r.id),
		name: str(r.name),
		type: str(r.type),
		macAddress: strNull(r.mac_address),
		status: str(r.status),
		deviceId: num(r.device_id),
		hostname: str(r.hostname),
		vlanId: numNull(r.vlan_id),
		vlanName: strNull(r.vlan_name)
	}));
}
async function listSubnets() {
	return (await (await getSql()).query(`
    select s.id, s.network_address, s.cidr, s.subnet_mask, s.description, s.vlan_id, v.name as vlan_name
    from subnets s
    join vlans v on v.id = s.vlan_id
    order by s.network_address
  `)).map((r) => ({
		id: num(r.id),
		networkAddress: str(r.network_address),
		cidr: num(r.cidr),
		subnetMask: str(r.subnet_mask),
		description: strNull(r.description),
		vlanId: num(r.vlan_id),
		vlanName: str(r.vlan_name)
	}));
}
async function listIps() {
	return (await (await getSql()).query(`
    select a.id, a.address, a.status, a.subnet_id,
           (s.network_address || '/' || s.cidr::text) as subnet_cidr,
           a.interface_id, i.name as interface_name, d.hostname
    from ip_addresses a
    join subnets s on s.id = a.subnet_id
    left join interfaces i on i.id = a.interface_id
    left join devices d on d.id = i.device_id
    order by a.address
  `)).map((r) => ({
		id: num(r.id),
		address: str(r.address),
		status: str(r.status),
		subnetId: num(r.subnet_id),
		subnetCidr: str(r.subnet_cidr),
		interfaceId: numNull(r.interface_id),
		interfaceName: strNull(r.interface_name),
		hostname: strNull(r.hostname)
	}));
}
async function listMaintenance() {
	return (await (await getSql()).query(`
    select m.id, m.title, m.description, m.maintenance_type, m.status,
           m.scheduled_date, m.completed_date, m.device_id, d.hostname,
           m.user_id, u.full_name as technician
    from maintenance_records m
    join devices d on d.id = m.device_id
    join app_users u on u.id = m.user_id
    order by m.scheduled_date desc, m.id desc
  `)).map((r) => ({
		id: num(r.id),
		title: str(r.title),
		description: strNull(r.description),
		maintenanceType: str(r.maintenance_type),
		status: str(r.status),
		scheduledDate: str(r.scheduled_date),
		completedDate: strNull(r.completed_date),
		deviceId: num(r.device_id),
		hostname: str(r.hostname),
		userId: num(r.user_id),
		technician: str(r.technician)
	}));
}
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
var listRecords_createServerFn_handler = createServerRpc({
	id: "307104e541bea5469a6e5c4ee287b83c7511d573b27e3e02f08cff24a622b7b7",
	name: "listRecords",
	filename: "src/lib/netmanage/api.ts"
}, (opts) => listRecords.__executeServer(opts));
var listRecords = createServerFn({ method: "GET" }).validator((input) => object({ module: moduleKeySchema }).parse(input)).handler(listRecords_createServerFn_handler, async ({ data }) => {
	switch (data.module) {
		case "users": return listUsers();
		case "device-types": return listDeviceTypes();
		case "locations": return listLocations();
		case "devices": return listDevices();
		case "interfaces": return listInterfaces();
		case "vlans": return listVlans();
		case "subnets": return listSubnets();
		case "ip-addresses": return listIps();
		case "maintenance": return listMaintenance();
	}
});
var payloadSchema = object({
	module: moduleKeySchema,
	values: record(string(), unknown())
});
var updateSchema = payloadSchema.extend({ id: number().int().positive() });
function n(values, key) {
	const v = values[key];
	if (v == null || v === "") throw new Error(`${key} is required.`);
	return Number(v);
}
function nOpt(values, key) {
	const v = values[key];
	if (v == null || v === "") return null;
	return Number(v);
}
function t(values, key) {
	const v = values[key];
	if (v == null || String(v).trim() === "") throw new Error(`${key} is required.`);
	return String(v).trim();
}
function tOpt(values, key) {
	const v = values[key];
	if (v == null || String(v).trim() === "") return null;
	return String(v).trim();
}
var createRecord_createServerFn_handler = createServerRpc({
	id: "e7e6e3eec5c4eeae23f9abc3f74d1b9b22204f0ef7f30cff4a3173fa7ab7c5e9",
	name: "createRecord",
	filename: "src/lib/netmanage/api.ts"
}, (opts) => createRecord.__executeServer(opts));
var createRecord = createServerFn({ method: "POST" }).validator((input) => payloadSchema.parse(input)).handler(createRecord_createServerFn_handler, async ({ data }) => {
	try {
		await insertModule(data.module, data.values);
		return { ok: true };
	} catch (err) {
		throwDb(err);
	}
});
var updateRecord_createServerFn_handler = createServerRpc({
	id: "b8565fa2ab1d182bf5c0aace9c578a43fbb2bdff5e1e010204dfc18507a9e421",
	name: "updateRecord",
	filename: "src/lib/netmanage/api.ts"
}, (opts) => updateRecord.__executeServer(opts));
var updateRecord = createServerFn({ method: "POST" }).validator((input) => updateSchema.parse(input)).handler(updateRecord_createServerFn_handler, async ({ data }) => {
	try {
		await updateModule(data.module, data.id, data.values);
		return { ok: true };
	} catch (err) {
		throwDb(err);
	}
});
var deleteRecord_createServerFn_handler = createServerRpc({
	id: "4e135624922ae6db65170a3aa3d8ce7b06496df23322e1d810b5e3766c0e3ba7",
	name: "deleteRecord",
	filename: "src/lib/netmanage/api.ts"
}, (opts) => deleteRecord.__executeServer(opts));
var deleteRecord = createServerFn({ method: "POST" }).validator((input) => object({
	module: moduleKeySchema,
	id: number().int().positive()
}).parse(input)).handler(deleteRecord_createServerFn_handler, async ({ data }) => {
	try {
		const sql = await getSql();
		const table = tableFor(data.module);
		if (!(await sql.query(`delete from ${table} where id = $1 returning id`, [data.id])).length) throw new Error("Record not found.");
		return { ok: true };
	} catch (err) {
		throwDb(err);
	}
});
function tableFor(module) {
	switch (module) {
		case "users": return "app_users";
		case "device-types": return "device_types";
		case "locations": return "locations";
		case "devices": return "devices";
		case "interfaces": return "interfaces";
		case "vlans": return "vlans";
		case "subnets": return "subnets";
		case "ip-addresses": return "ip_addresses";
		case "maintenance": return "maintenance_records";
	}
}
async function insertModule(module, values) {
	const sql = await getSql();
	switch (module) {
		case "users":
			await sql.query(`insert into app_users (username, full_name, email, role, status) values ($1,$2,$3,$4,$5)`, [
				t(values, "username"),
				t(values, "fullName"),
				t(values, "email"),
				t(values, "role"),
				t(values, "status")
			]);
			return;
		case "device-types":
			await sql.query(`insert into device_types (name, description) values ($1,$2)`, [t(values, "name"), tOpt(values, "description")]);
			return;
		case "locations":
			await sql.query(`insert into locations (name, building, floor, room, address, notes) values ($1,$2,$3,$4,$5,$6)`, [
				t(values, "name"),
				tOpt(values, "building"),
				tOpt(values, "floor"),
				tOpt(values, "room"),
				tOpt(values, "address"),
				tOpt(values, "notes")
			]);
			return;
		case "vlans":
			await sql.query(`insert into vlans (vlan_number, name, description, status) values ($1,$2,$3,$4)`, [
				n(values, "vlanNumber"),
				t(values, "name"),
				tOpt(values, "description"),
				t(values, "status")
			]);
			return;
		case "devices":
			await sql.query(`insert into devices (hostname, manufacturer, model, serial_number, status, purchase_date, device_type_id, location_id, notes)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [
				t(values, "hostname"),
				t(values, "manufacturer"),
				t(values, "model"),
				t(values, "serialNumber"),
				t(values, "status"),
				tOpt(values, "purchaseDate"),
				n(values, "deviceTypeId"),
				n(values, "locationId"),
				tOpt(values, "notes")
			]);
			return;
		case "interfaces":
			await sql.query(`insert into interfaces (name, type, mac_address, status, device_id, vlan_id) values ($1,$2,$3,$4,$5,$6)`, [
				t(values, "name"),
				t(values, "type"),
				tOpt(values, "macAddress"),
				t(values, "status"),
				n(values, "deviceId"),
				nOpt(values, "vlanId")
			]);
			return;
		case "subnets":
			await sql.query(`insert into subnets (network_address, cidr, subnet_mask, description, vlan_id) values ($1,$2,$3,$4,$5)`, [
				t(values, "networkAddress"),
				n(values, "cidr"),
				t(values, "subnetMask"),
				tOpt(values, "description"),
				n(values, "vlanId")
			]);
			return;
		case "ip-addresses":
			await sql.query(`insert into ip_addresses (address, status, subnet_id, interface_id) values ($1,$2,$3,$4)`, [
				t(values, "address"),
				t(values, "status"),
				n(values, "subnetId"),
				nOpt(values, "interfaceId")
			]);
			return;
		case "maintenance": await sql.query(`insert into maintenance_records (title, description, maintenance_type, status, scheduled_date, completed_date, device_id, user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8)`, [
			t(values, "title"),
			tOpt(values, "description"),
			t(values, "maintenanceType"),
			t(values, "status"),
			t(values, "scheduledDate"),
			tOpt(values, "completedDate"),
			n(values, "deviceId"),
			n(values, "userId")
		]);
	}
}
async function updateModule(module, id, values) {
	const sql = await getSql();
	let rows = [];
	switch (module) {
		case "users":
			rows = await sql.query(`update app_users set username=$1, full_name=$2, email=$3, role=$4, status=$5 where id=$6 returning id`, [
				t(values, "username"),
				t(values, "fullName"),
				t(values, "email"),
				t(values, "role"),
				t(values, "status"),
				id
			]);
			break;
		case "device-types":
			rows = await sql.query(`update device_types set name=$1, description=$2 where id=$3 returning id`, [
				t(values, "name"),
				tOpt(values, "description"),
				id
			]);
			break;
		case "locations":
			rows = await sql.query(`update locations set name=$1, building=$2, floor=$3, room=$4, address=$5, notes=$6 where id=$7 returning id`, [
				t(values, "name"),
				tOpt(values, "building"),
				tOpt(values, "floor"),
				tOpt(values, "room"),
				tOpt(values, "address"),
				tOpt(values, "notes"),
				id
			]);
			break;
		case "vlans":
			rows = await sql.query(`update vlans set vlan_number=$1, name=$2, description=$3, status=$4 where id=$5 returning id`, [
				n(values, "vlanNumber"),
				t(values, "name"),
				tOpt(values, "description"),
				t(values, "status"),
				id
			]);
			break;
		case "devices":
			rows = await sql.query(`update devices set hostname=$1, manufacturer=$2, model=$3, serial_number=$4, status=$5, purchase_date=$6, device_type_id=$7, location_id=$8, notes=$9 where id=$10 returning id`, [
				t(values, "hostname"),
				t(values, "manufacturer"),
				t(values, "model"),
				t(values, "serialNumber"),
				t(values, "status"),
				tOpt(values, "purchaseDate"),
				n(values, "deviceTypeId"),
				n(values, "locationId"),
				tOpt(values, "notes"),
				id
			]);
			break;
		case "interfaces":
			rows = await sql.query(`update interfaces set name=$1, type=$2, mac_address=$3, status=$4, device_id=$5, vlan_id=$6 where id=$7 returning id`, [
				t(values, "name"),
				t(values, "type"),
				tOpt(values, "macAddress"),
				t(values, "status"),
				n(values, "deviceId"),
				nOpt(values, "vlanId"),
				id
			]);
			break;
		case "subnets":
			rows = await sql.query(`update subnets set network_address=$1, cidr=$2, subnet_mask=$3, description=$4, vlan_id=$5 where id=$6 returning id`, [
				t(values, "networkAddress"),
				n(values, "cidr"),
				t(values, "subnetMask"),
				tOpt(values, "description"),
				n(values, "vlanId"),
				id
			]);
			break;
		case "ip-addresses":
			rows = await sql.query(`update ip_addresses set address=$1, status=$2, subnet_id=$3, interface_id=$4 where id=$5 returning id`, [
				t(values, "address"),
				t(values, "status"),
				n(values, "subnetId"),
				nOpt(values, "interfaceId"),
				id
			]);
			break;
		case "maintenance": rows = await sql.query(`update maintenance_records set title=$1, description=$2, maintenance_type=$3, status=$4, scheduled_date=$5, completed_date=$6, device_id=$7, user_id=$8 where id=$9 returning id`, [
			t(values, "title"),
			tOpt(values, "description"),
			t(values, "maintenanceType"),
			t(values, "status"),
			t(values, "scheduledDate"),
			tOpt(values, "completedDate"),
			n(values, "deviceId"),
			n(values, "userId"),
			id
		]);
	}
	if (!rows.length) throw new Error("Record not found.");
}
//#endregion
export { createRecord_createServerFn_handler, deleteRecord_createServerFn_handler, getDashboard_createServerFn_handler, listRecords_createServerFn_handler, updateRecord_createServerFn_handler };
