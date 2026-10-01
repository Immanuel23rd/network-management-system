import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import type {
  AppUser,
  DashboardStats,
  Device,
  DeviceType,
  IpAddress,
  Location,
  MaintenanceRecord,
  ModuleKey,
  NetInterface,
  RecentMaintenance,
  RecordRow,
  Subnet,
  Vlan,
} from "./types";

function throwDb(err: unknown): never {
  const raw = err instanceof Error ? err.message : String(err);
  const msg = raw.toLowerCase();
  if (msg.includes("unique") || msg.includes("duplicate")) {
    throw new Error(
      "That value is already in use. Unique fields include hostname, serial number, IP, MAC, and VLAN number.",
    );
  }
  if (msg.includes("foreign key") || msg.includes("referenc") || msg.includes("constraint")) {
    if (msg.includes("check constraint")) {
      throw new Error("One of the values is not allowed. Check status, type, or numeric ranges.");
    }
    throw new Error("This record is still referenced by related inventory and cannot be removed.");
  }
  if (msg.includes("not-null") || msg.includes("null value")) {
    throw new Error("A required relationship or field is missing.");
  }
  throw err instanceof Error ? err : new Error(raw);
}

function num(value: unknown): number {
  return Number(value);
}

function str(value: unknown): string {
  if (value == null) return "";
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return s;
}

function strNull(value: unknown): string | null {
  if (value == null || value === "") return null;
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return s;
}

function numNull(value: unknown): number | null {
  if (value == null || value === "") return null;
  return Number(value);
}

export const getDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
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
  `);
  const r = rows[0] ?? {};
  const stats: DashboardStats = {
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
    maintenanceOpen: num(r.maintenance_open),
  };
  const recent = await sql.query<Record<string, unknown>>(`
    select m.id, m.title, m.status, m.scheduled_date, d.hostname, u.full_name
    from maintenance_records m
    join devices d on d.id = m.device_id
    join app_users u on u.id = m.user_id
    order by m.scheduled_date desc, m.id desc
    limit 6
  `);
  const recentMaintenance: RecentMaintenance[] = recent.map((row) => ({
    id: num(row.id),
    title: str(row.title),
    status: str(row.status) as RecentMaintenance["status"],
    scheduledDate: str(row.scheduled_date),
    hostname: str(row.hostname),
    technician: str(row.full_name),
  }));
  return { stats, recentMaintenance };
});

async function listUsers(): Promise<AppUser[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    `select id, username, full_name, email, role, status, created_at from app_users order by username`,
  );
  return rows.map((r) => ({
    id: num(r.id),
    username: str(r.username),
    fullName: str(r.full_name),
    email: str(r.email),
    role: str(r.role) as AppUser["role"],
    status: str(r.status) as AppUser["status"],
    createdAt: strNull(r.created_at),
  }));
}

async function listDeviceTypes(): Promise<DeviceType[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    `select id, name, description from device_types order by name`,
  );
  return rows.map((r) => ({
    id: num(r.id),
    name: str(r.name),
    description: strNull(r.description),
  }));
}

async function listLocations(): Promise<Location[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    `select id, name, building, floor, room, address, notes from locations order by name`,
  );
  return rows.map((r) => ({
    id: num(r.id),
    name: str(r.name),
    building: strNull(r.building),
    floor: strNull(r.floor),
    room: strNull(r.room),
    address: strNull(r.address),
    notes: strNull(r.notes),
  }));
}

async function listVlans(): Promise<Vlan[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(
    `select id, vlan_number, name, description, status from vlans order by vlan_number`,
  );
  return rows.map((r) => ({
    id: num(r.id),
    vlanNumber: num(r.vlan_number),
    name: str(r.name),
    description: strNull(r.description),
    status: str(r.status) as Vlan["status"],
  }));
}

async function listDevices(): Promise<Device[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
    select d.id, d.hostname, d.manufacturer, d.model, d.serial_number, d.status,
           d.purchase_date, d.device_type_id, dt.name as device_type_name,
           d.location_id, l.name as location_name, d.notes
    from devices d
    join device_types dt on dt.id = d.device_type_id
    join locations l on l.id = d.location_id
    order by d.hostname
  `);
  return rows.map((r) => ({
    id: num(r.id),
    hostname: str(r.hostname),
    manufacturer: str(r.manufacturer),
    model: str(r.model),
    serialNumber: str(r.serial_number),
    status: str(r.status) as Device["status"],
    purchaseDate: strNull(r.purchase_date),
    deviceTypeId: num(r.device_type_id),
    deviceTypeName: str(r.device_type_name),
    locationId: num(r.location_id),
    locationName: str(r.location_name),
    notes: strNull(r.notes),
  }));
}

async function listInterfaces(): Promise<NetInterface[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
    select i.id, i.name, i.type, i.mac_address, i.status, i.device_id, d.hostname,
           i.vlan_id, v.name as vlan_name
    from interfaces i
    join devices d on d.id = i.device_id
    left join vlans v on v.id = i.vlan_id
    order by d.hostname, i.name
  `);
  return rows.map((r) => ({
    id: num(r.id),
    name: str(r.name),
    type: str(r.type) as NetInterface["type"],
    macAddress: strNull(r.mac_address),
    status: str(r.status) as NetInterface["status"],
    deviceId: num(r.device_id),
    hostname: str(r.hostname),
    vlanId: numNull(r.vlan_id),
    vlanName: strNull(r.vlan_name),
  }));
}

async function listSubnets(): Promise<Subnet[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
    select s.id, s.network_address, s.cidr, s.subnet_mask, s.description, s.vlan_id, v.name as vlan_name
    from subnets s
    join vlans v on v.id = s.vlan_id
    order by s.network_address
  `);
  return rows.map((r) => ({
    id: num(r.id),
    networkAddress: str(r.network_address),
    cidr: num(r.cidr),
    subnetMask: str(r.subnet_mask),
    description: strNull(r.description),
    vlanId: num(r.vlan_id),
    vlanName: str(r.vlan_name),
  }));
}

async function listIps(): Promise<IpAddress[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
    select a.id, a.address, a.status, a.subnet_id,
           (s.network_address || '/' || s.cidr::text) as subnet_cidr,
           a.interface_id, i.name as interface_name, d.hostname
    from ip_addresses a
    join subnets s on s.id = a.subnet_id
    left join interfaces i on i.id = a.interface_id
    left join devices d on d.id = i.device_id
    order by a.address
  `);
  return rows.map((r) => ({
    id: num(r.id),
    address: str(r.address),
    status: str(r.status) as IpAddress["status"],
    subnetId: num(r.subnet_id),
    subnetCidr: str(r.subnet_cidr),
    interfaceId: numNull(r.interface_id),
    interfaceName: strNull(r.interface_name),
    hostname: strNull(r.hostname),
  }));
}

async function listMaintenance(): Promise<MaintenanceRecord[]> {
  const sql = await getSql();
  const rows = await sql.query<Record<string, unknown>>(`
    select m.id, m.title, m.description, m.maintenance_type, m.status,
           m.scheduled_date, m.completed_date, m.device_id, d.hostname,
           m.user_id, u.full_name as technician
    from maintenance_records m
    join devices d on d.id = m.device_id
    join app_users u on u.id = m.user_id
    order by m.scheduled_date desc, m.id desc
  `);
  return rows.map((r) => ({
    id: num(r.id),
    title: str(r.title),
    description: strNull(r.description),
    maintenanceType: str(r.maintenance_type) as MaintenanceRecord["maintenanceType"],
    status: str(r.status) as MaintenanceRecord["status"],
    scheduledDate: str(r.scheduled_date),
    completedDate: strNull(r.completed_date),
    deviceId: num(r.device_id),
    hostname: str(r.hostname),
    userId: num(r.user_id),
    technician: str(r.technician),
  }));
}

const moduleKeySchema = z.enum([
  "users",
  "device-types",
  "locations",
  "devices",
  "interfaces",
  "vlans",
  "subnets",
  "ip-addresses",
  "maintenance",
]);

export const listRecords = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ module: moduleKeySchema }).parse(input))
  .handler(async ({ data }): Promise<RecordRow[]> => {
    switch (data.module) {
      case "users":
        return listUsers() as Promise<RecordRow[]>;
      case "device-types":
        return listDeviceTypes() as Promise<RecordRow[]>;
      case "locations":
        return listLocations() as Promise<RecordRow[]>;
      case "devices":
        return listDevices() as Promise<RecordRow[]>;
      case "interfaces":
        return listInterfaces() as Promise<RecordRow[]>;
      case "vlans":
        return listVlans() as Promise<RecordRow[]>;
      case "subnets":
        return listSubnets() as Promise<RecordRow[]>;
      case "ip-addresses":
        return listIps() as Promise<RecordRow[]>;
      case "maintenance":
        return listMaintenance() as Promise<RecordRow[]>;
    }
  });

const payloadSchema = z.object({
  module: moduleKeySchema,
  values: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
});

const updateSchema = payloadSchema.extend({ id: z.number().int().positive() });

function n(values: Record<string, unknown>, key: string): number {
  const v = values[key];
  if (v == null || v === "") throw new Error(`${key} is required.`);
  return Number(v);
}

function nOpt(values: Record<string, unknown>, key: string): number | null {
  const v = values[key];
  if (v == null || v === "") return null;
  return Number(v);
}

function t(values: Record<string, unknown>, key: string): string {
  const v = values[key];
  if (v == null || String(v).trim() === "") throw new Error(`${key} is required.`);
  return String(v).trim();
}

function tOpt(values: Record<string, unknown>, key: string): string | null {
  const v = values[key];
  if (v == null || String(v).trim() === "") return null;
  return String(v).trim();
}

export const createRecord = createServerFn({ method: "POST" })
  .validator((input: unknown) => payloadSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      await insertModule(data.module, data.values);
      return { ok: true as const };
    } catch (err) {
      throwDb(err);
    }
  });

export const updateRecord = createServerFn({ method: "POST" })
  .validator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      await updateModule(data.module, data.id, data.values);
      return { ok: true as const };
    } catch (err) {
      throwDb(err);
    }
  });

export const deleteRecord = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ module: moduleKeySchema, id: z.number().int().positive() }).parse(input),
  )
  .handler(async ({ data }) => {
    try {
      const sql = await getSql();
      const table = tableFor(data.module);
      const rows = await sql.query(`delete from ${table} where id = $1 returning id`, [data.id]);
      if (!rows.length) throw new Error("Record not found.");
      return { ok: true as const };
    } catch (err) {
      throwDb(err);
    }
  });

function tableFor(module: ModuleKey): string {
  switch (module) {
    case "users":
      return "app_users";
    case "device-types":
      return "device_types";
    case "locations":
      return "locations";
    case "devices":
      return "devices";
    case "interfaces":
      return "interfaces";
    case "vlans":
      return "vlans";
    case "subnets":
      return "subnets";
    case "ip-addresses":
      return "ip_addresses";
    case "maintenance":
      return "maintenance_records";
  }
}

async function insertModule(module: ModuleKey, values: Record<string, unknown>) {
  const sql = await getSql();
  switch (module) {
    case "users":
      await sql.query(
        `insert into app_users (username, full_name, email, role, status) values ($1,$2,$3,$4,$5)`,
        [t(values, "username"), t(values, "fullName"), t(values, "email"), t(values, "role"), t(values, "status")],
      );
      return;
    case "device-types":
      await sql.query(`insert into device_types (name, description) values ($1,$2)`, [
        t(values, "name"),
        tOpt(values, "description"),
      ]);
      return;
    case "locations":
      await sql.query(
        `insert into locations (name, building, floor, room, address, notes) values ($1,$2,$3,$4,$5,$6)`,
        [
          t(values, "name"),
          tOpt(values, "building"),
          tOpt(values, "floor"),
          tOpt(values, "room"),
          tOpt(values, "address"),
          tOpt(values, "notes"),
        ],
      );
      return;
    case "vlans":
      await sql.query(
        `insert into vlans (vlan_number, name, description, status) values ($1,$2,$3,$4)`,
        [n(values, "vlanNumber"), t(values, "name"), tOpt(values, "description"), t(values, "status")],
      );
      return;
    case "devices":
      await sql.query(
        `insert into devices (hostname, manufacturer, model, serial_number, status, purchase_date, device_type_id, location_id, notes)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          t(values, "hostname"),
          t(values, "manufacturer"),
          t(values, "model"),
          t(values, "serialNumber"),
          t(values, "status"),
          tOpt(values, "purchaseDate"),
          n(values, "deviceTypeId"),
          n(values, "locationId"),
          tOpt(values, "notes"),
        ],
      );
      return;
    case "interfaces":
      await sql.query(
        `insert into interfaces (name, type, mac_address, status, device_id, vlan_id) values ($1,$2,$3,$4,$5,$6)`,
        [
          t(values, "name"),
          t(values, "type"),
          tOpt(values, "macAddress"),
          t(values, "status"),
          n(values, "deviceId"),
          nOpt(values, "vlanId"),
        ],
      );
      return;
    case "subnets":
      await sql.query(
        `insert into subnets (network_address, cidr, subnet_mask, description, vlan_id) values ($1,$2,$3,$4,$5)`,
        [
          t(values, "networkAddress"),
          n(values, "cidr"),
          t(values, "subnetMask"),
          tOpt(values, "description"),
          n(values, "vlanId"),
        ],
      );
      return;
    case "ip-addresses":
      await sql.query(
        `insert into ip_addresses (address, status, subnet_id, interface_id) values ($1,$2,$3,$4)`,
        [t(values, "address"), t(values, "status"), n(values, "subnetId"), nOpt(values, "interfaceId")],
      );
      return;
    case "maintenance":
      await sql.query(
        `insert into maintenance_records (title, description, maintenance_type, status, scheduled_date, completed_date, device_id, user_id)
         values ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          t(values, "title"),
          tOpt(values, "description"),
          t(values, "maintenanceType"),
          t(values, "status"),
          t(values, "scheduledDate"),
          tOpt(values, "completedDate"),
          n(values, "deviceId"),
          n(values, "userId"),
        ],
      );
  }
}

async function updateModule(module: ModuleKey, id: number, values: Record<string, unknown>) {
  const sql = await getSql();
  let rows: unknown[] = [];
  switch (module) {
    case "users":
      rows = await sql.query(
        `update app_users set username=$1, full_name=$2, email=$3, role=$4, status=$5 where id=$6 returning id`,
        [t(values, "username"), t(values, "fullName"), t(values, "email"), t(values, "role"), t(values, "status"), id],
      );
      break;
    case "device-types":
      rows = await sql.query(`update device_types set name=$1, description=$2 where id=$3 returning id`, [
        t(values, "name"),
        tOpt(values, "description"),
        id,
      ]);
      break;
    case "locations":
      rows = await sql.query(
        `update locations set name=$1, building=$2, floor=$3, room=$4, address=$5, notes=$6 where id=$7 returning id`,
        [
          t(values, "name"),
          tOpt(values, "building"),
          tOpt(values, "floor"),
          tOpt(values, "room"),
          tOpt(values, "address"),
          tOpt(values, "notes"),
          id,
        ],
      );
      break;
    case "vlans":
      rows = await sql.query(
        `update vlans set vlan_number=$1, name=$2, description=$3, status=$4 where id=$5 returning id`,
        [n(values, "vlanNumber"), t(values, "name"), tOpt(values, "description"), t(values, "status"), id],
      );
      break;
    case "devices":
      rows = await sql.query(
        `update devices set hostname=$1, manufacturer=$2, model=$3, serial_number=$4, status=$5, purchase_date=$6, device_type_id=$7, location_id=$8, notes=$9 where id=$10 returning id`,
        [
          t(values, "hostname"),
          t(values, "manufacturer"),
          t(values, "model"),
          t(values, "serialNumber"),
          t(values, "status"),
          tOpt(values, "purchaseDate"),
          n(values, "deviceTypeId"),
          n(values, "locationId"),
          tOpt(values, "notes"),
          id,
        ],
      );
      break;
    case "interfaces":
      rows = await sql.query(
        `update interfaces set name=$1, type=$2, mac_address=$3, status=$4, device_id=$5, vlan_id=$6 where id=$7 returning id`,
        [
          t(values, "name"),
          t(values, "type"),
          tOpt(values, "macAddress"),
          t(values, "status"),
          n(values, "deviceId"),
          nOpt(values, "vlanId"),
          id,
        ],
      );
      break;
    case "subnets":
      rows = await sql.query(
        `update subnets set network_address=$1, cidr=$2, subnet_mask=$3, description=$4, vlan_id=$5 where id=$6 returning id`,
        [
          t(values, "networkAddress"),
          n(values, "cidr"),
          t(values, "subnetMask"),
          tOpt(values, "description"),
          n(values, "vlanId"),
          id,
        ],
      );
      break;
    case "ip-addresses":
      rows = await sql.query(
        `update ip_addresses set address=$1, status=$2, subnet_id=$3, interface_id=$4 where id=$5 returning id`,
        [t(values, "address"), t(values, "status"), n(values, "subnetId"), nOpt(values, "interfaceId"), id],
      );
      break;
    case "maintenance":
      rows = await sql.query(
        `update maintenance_records set title=$1, description=$2, maintenance_type=$3, status=$4, scheduled_date=$5, completed_date=$6, device_id=$7, user_id=$8 where id=$9 returning id`,
        [
          t(values, "title"),
          tOpt(values, "description"),
          t(values, "maintenanceType"),
          t(values, "status"),
          t(values, "scheduledDate"),
          tOpt(values, "completedDate"),
          n(values, "deviceId"),
          n(values, "userId"),
          id,
        ],
      );
      break;
  }
  if (!rows.length) throw new Error("Record not found.");
}
