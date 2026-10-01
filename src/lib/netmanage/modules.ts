import type { LucideIcon } from "lucide-react";
import {
  Cable,
  Hash,
  Layers,
  MapPin,
  Network,
  Server,
  Tags,
  Users,
  Wrench,
} from "lucide-react";
import type { ModuleKey } from "./types";

export type FieldType = "text" | "textarea" | "number" | "date" | "select" | "relation";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  relation?: ModuleKey;
  relationLabel?: string;
  defaultValue?: string | number | null;
};

export type ColumnConfig = {
  key: string;
  label: string;
  mono?: boolean;
  badge?: boolean;
};

export type ModuleConfig = {
  key: ModuleKey;
  title: string;
  singular: string;
  description: string;
  icon: LucideIcon;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  searchKeys: string[];
};

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "TECHNICIAN", label: "Technician" },
  { value: "VIEWER", label: "Viewer" },
];
const active = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
const deviceStatus = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "DECOMMISSIONED", label: "Decommissioned" },
];
const ifTypes = [
  { value: "ETHERNET", label: "Ethernet" },
  { value: "FIBER", label: "Fiber" },
  { value: "WIFI", label: "Wi-Fi" },
  { value: "LOOPBACK", label: "Loopback" },
  { value: "VLAN", label: "VLAN" },
];
const ifStatus = [
  { value: "UP", label: "Up" },
  { value: "DOWN", label: "Down" },
  { value: "DISABLED", label: "Disabled" },
];
const ipStatus = [
  { value: "ALLOCATED", label: "Allocated" },
  { value: "AVAILABLE", label: "Available" },
  { value: "RESERVED", label: "Reserved" },
];
const maintTypes = [
  { value: "PREVENTIVE", label: "Preventive" },
  { value: "CORRECTIVE", label: "Corrective" },
  { value: "UPGRADE", label: "Upgrade" },
  { value: "INSPECTION", label: "Inspection" },
];
const maintStatus = [
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const MODULES: Record<ModuleKey, ModuleConfig> = {
  users: {
    key: "users",
    title: "Users",
    singular: "user",
    description: "Operators who own maintenance work.",
    icon: Users,
    searchKeys: ["username", "fullName", "email", "role"],
    columns: [
      { key: "username", label: "Username", mono: true },
      { key: "fullName", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role", badge: true },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true, placeholder: "j.mwangi" },
      { name: "fullName", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true, placeholder: "name@northline.example" },
      { name: "role", label: "Role", type: "select", required: true, options: roles, defaultValue: "TECHNICIAN" },
      { name: "status", label: "Status", type: "select", required: true, options: active, defaultValue: "ACTIVE" },
    ],
  },
  "device-types": {
    key: "device-types",
    title: "Device types",
    singular: "device type",
    description: "Categories such as router, switch, and firewall.",
    icon: Tags,
    searchKeys: ["name", "description"],
    columns: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, placeholder: "Switch" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  locations: {
    key: "locations",
    title: "Locations",
    singular: "location",
    description: "Buildings, floors, and comms rooms.",
    icon: MapPin,
    searchKeys: ["name", "building", "room", "address"],
    columns: [
      { key: "name", label: "Name" },
      { key: "building", label: "Building" },
      { key: "floor", label: "Floor" },
      { key: "room", label: "Room", mono: true },
      { key: "address", label: "Address" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "building", label: "Building", type: "text" },
      { name: "floor", label: "Floor", type: "text" },
      { name: "room", label: "Room", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  devices: {
    key: "devices",
    title: "Devices",
    singular: "device",
    description: "Physical and virtual network equipment.",
    icon: Server,
    searchKeys: ["hostname", "manufacturer", "model", "serialNumber", "deviceTypeName", "locationName"],
    columns: [
      { key: "hostname", label: "Hostname", mono: true },
      { key: "deviceTypeName", label: "Type" },
      { key: "manufacturer", label: "Manufacturer" },
      { key: "model", label: "Model", mono: true },
      { key: "locationName", label: "Location" },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "hostname", label: "Hostname", type: "text", required: true, placeholder: "core-rtr-01" },
      { name: "manufacturer", label: "Manufacturer", type: "text", required: true },
      { name: "model", label: "Model", type: "text", required: true },
      { name: "serialNumber", label: "Serial number", type: "text", required: true },
      { name: "status", label: "Status", type: "select", required: true, options: deviceStatus, defaultValue: "ACTIVE" },
      { name: "purchaseDate", label: "Purchase date", type: "date" },
      { name: "deviceTypeId", label: "Device type", type: "relation", required: true, relation: "device-types", relationLabel: "name" },
      { name: "locationId", label: "Location", type: "relation", required: true, relation: "locations", relationLabel: "name" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  interfaces: {
    key: "interfaces",
    title: "Interfaces",
    singular: "interface",
    description: "Device ports, WLANs, and loopbacks.",
    icon: Cable,
    searchKeys: ["name", "type", "macAddress", "hostname", "vlanName"],
    columns: [
      { key: "hostname", label: "Device", mono: true },
      { key: "name", label: "Interface", mono: true },
      { key: "type", label: "Type", badge: true },
      { key: "macAddress", label: "MAC", mono: true },
      { key: "vlanName", label: "VLAN" },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "deviceId", label: "Device", type: "relation", required: true, relation: "devices", relationLabel: "hostname" },
      { name: "name", label: "Interface name", type: "text", required: true, placeholder: "GigabitEthernet1/0/1" },
      { name: "type", label: "Type", type: "select", required: true, options: ifTypes, defaultValue: "ETHERNET" },
      { name: "macAddress", label: "MAC address", type: "text", placeholder: "00:1A:2B:00:00:01" },
      { name: "status", label: "Status", type: "select", required: true, options: ifStatus, defaultValue: "UP" },
      { name: "vlanId", label: "VLAN", type: "relation", relation: "vlans", relationLabel: "name" },
    ],
  },
  vlans: {
    key: "vlans",
    title: "VLANs",
    singular: "VLAN",
    description: "Layer-2 segments used by interfaces and subnets.",
    icon: Layers,
    searchKeys: ["name", "description", "vlanNumber"],
    columns: [
      { key: "vlanNumber", label: "ID", mono: true },
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "vlanNumber", label: "VLAN number", type: "number", required: true, hint: "1–4094" },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "select", required: true, options: active, defaultValue: "ACTIVE" },
    ],
  },
  subnets: {
    key: "subnets",
    title: "Subnets",
    singular: "subnet",
    description: "IPv4 prefixes associated with a VLAN.",
    icon: Network,
    searchKeys: ["networkAddress", "subnetMask", "description", "vlanName"],
    columns: [
      { key: "networkAddress", label: "Network", mono: true },
      { key: "cidr", label: "CIDR", mono: true },
      { key: "subnetMask", label: "Mask", mono: true },
      { key: "vlanName", label: "VLAN" },
      { key: "description", label: "Description" },
    ],
    fields: [
      { name: "networkAddress", label: "Network address", type: "text", required: true, placeholder: "10.10.10.0" },
      { name: "cidr", label: "CIDR", type: "number", required: true, hint: "0–32" },
      { name: "subnetMask", label: "Subnet mask", type: "text", required: true, placeholder: "255.255.255.0" },
      { name: "vlanId", label: "VLAN", type: "relation", required: true, relation: "vlans", relationLabel: "name" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  "ip-addresses": {
    key: "ip-addresses",
    title: "IP addresses",
    singular: "IP address",
    description: "Host addresses bound to a subnet and optionally an interface.",
    icon: Hash,
    searchKeys: ["address", "status", "subnetCidr", "interfaceName", "hostname"],
    columns: [
      { key: "address", label: "Address", mono: true },
      { key: "subnetCidr", label: "Subnet", mono: true },
      { key: "hostname", label: "Device", mono: true },
      { key: "interfaceName", label: "Interface", mono: true },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "address", label: "IP address", type: "text", required: true, placeholder: "10.10.10.10" },
      { name: "status", label: "Status", type: "select", required: true, options: ipStatus, defaultValue: "AVAILABLE" },
      { name: "subnetId", label: "Subnet", type: "relation", required: true, relation: "subnets", relationLabel: "networkAddress" },
      { name: "interfaceId", label: "Interface", type: "relation", relation: "interfaces", relationLabel: "name", hint: "Optional. One IP per interface." },
    ],
  },
  maintenance: {
    key: "maintenance",
    title: "Maintenance",
    singular: "maintenance record",
    description: "Work against devices, assigned to an operator.",
    icon: Wrench,
    searchKeys: ["title", "maintenanceType", "hostname", "technician", "status"],
    columns: [
      { key: "title", label: "Title" },
      { key: "hostname", label: "Device", mono: true },
      { key: "technician", label: "Owner" },
      { key: "maintenanceType", label: "Type", badge: true },
      { key: "scheduledDate", label: "Scheduled", mono: true },
      { key: "status", label: "Status", badge: true },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "maintenanceType", label: "Type", type: "select", required: true, options: maintTypes, defaultValue: "PREVENTIVE" },
      { name: "status", label: "Status", type: "select", required: true, options: maintStatus, defaultValue: "SCHEDULED" },
      { name: "scheduledDate", label: "Scheduled date", type: "date", required: true },
      { name: "completedDate", label: "Completed date", type: "date" },
      { name: "deviceId", label: "Device", type: "relation", required: true, relation: "devices", relationLabel: "hostname" },
      { name: "userId", label: "Assigned user", type: "relation", required: true, relation: "users", relationLabel: "fullName" },
    ],
  },
};

export const NAV_ITEMS: { key: ModuleKey | "dashboard"; title: string; path: string; icon: LucideIcon }[] = [
  { key: "dashboard", title: "Overview", path: "/", icon: Network },
  { key: "devices", title: "Devices", path: "/devices", icon: Server },
  { key: "interfaces", title: "Interfaces", path: "/interfaces", icon: Cable },
  { key: "ip-addresses", title: "IP addresses", path: "/ip-addresses", icon: Hash },
  { key: "subnets", title: "Subnets", path: "/subnets", icon: Network },
  { key: "vlans", title: "VLANs", path: "/vlans", icon: Layers },
  { key: "locations", title: "Locations", path: "/locations", icon: MapPin },
  { key: "device-types", title: "Device types", path: "/device-types", icon: Tags },
  { key: "maintenance", title: "Maintenance", path: "/maintenance", icon: Wrench },
  { key: "users", title: "Users", path: "/users", icon: Users },
];

export function isModuleKey(value: string): value is ModuleKey {
  return value in MODULES;
}

export function relationDisplay(
  row: Record<string, string | number | boolean | null>,
  field: FieldConfig,
): string {
  if (field.relation === "subnets" && row.networkAddress != null) {
    return `${row.networkAddress}/${row.cidr}`;
  }
  if (field.relation === "vlans" && row.vlanNumber != null) {
    return `${row.vlanNumber} · ${row.name ?? ""}`;
  }
  if (field.relation === "interfaces") {
    return [row.hostname, row.name].filter(Boolean).join(" · ") || String(row.id);
  }
  const labelKey = field.relationLabel;
  if (labelKey && row[labelKey] != null) return String(row[labelKey]);
  return String(row.name ?? row.hostname ?? row.fullName ?? row.id);
}
