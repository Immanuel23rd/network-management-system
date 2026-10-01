export type UserRole = "ADMIN" | "TECHNICIAN" | "VIEWER";
export type ActiveStatus = "ACTIVE" | "INACTIVE";
export type DeviceStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DECOMMISSIONED";
export type InterfaceType = "ETHERNET" | "FIBER" | "WIFI" | "LOOPBACK" | "VLAN";
export type InterfaceStatus = "UP" | "DOWN" | "DISABLED";
export type IpStatus = "ALLOCATED" | "AVAILABLE" | "RESERVED";
export type MaintenanceType = "PREVENTIVE" | "CORRECTIVE" | "UPGRADE" | "INSPECTION";
export type MaintenanceStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type AppUser = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: ActiveStatus;
  createdAt: string | null;
};

export type DeviceType = {
  id: number;
  name: string;
  description: string | null;
};

export type Location = {
  id: number;
  name: string;
  building: string | null;
  floor: string | null;
  room: string | null;
  address: string | null;
  notes: string | null;
};

export type Vlan = {
  id: number;
  vlanNumber: number;
  name: string;
  description: string | null;
  status: ActiveStatus;
};

export type Device = {
  id: number;
  hostname: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  status: DeviceStatus;
  purchaseDate: string | null;
  deviceTypeId: number;
  deviceTypeName: string;
  locationId: number;
  locationName: string;
  notes: string | null;
};

export type NetInterface = {
  id: number;
  name: string;
  type: InterfaceType;
  macAddress: string | null;
  status: InterfaceStatus;
  deviceId: number;
  hostname: string;
  vlanId: number | null;
  vlanName: string | null;
};

export type Subnet = {
  id: number;
  networkAddress: string;
  cidr: number;
  subnetMask: string;
  description: string | null;
  vlanId: number;
  vlanName: string;
};

export type IpAddress = {
  id: number;
  address: string;
  status: IpStatus;
  subnetId: number;
  subnetCidr: string;
  interfaceId: number | null;
  interfaceName: string | null;
  hostname: string | null;
};

export type MaintenanceRecord = {
  id: number;
  title: string;
  description: string | null;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate: string | null;
  deviceId: number;
  hostname: string;
  userId: number;
  technician: string;
};

export type DashboardStats = {
  users: number;
  deviceTypes: number;
  locations: number;
  devices: number;
  devicesActive: number;
  devicesMaintenance: number;
  interfaces: number;
  interfacesDown: number;
  vlans: number;
  subnets: number;
  ipAddresses: number;
  ipAvailable: number;
  maintenanceOpen: number;
};

export type RecentMaintenance = {
  id: number;
  title: string;
  status: MaintenanceStatus;
  scheduledDate: string;
  hostname: string;
  technician: string;
};

export type ModuleKey =
  | "users"
  | "device-types"
  | "locations"
  | "devices"
  | "interfaces"
  | "vlans"
  | "subnets"
  | "ip-addresses"
  | "maintenance";

export type RecordRow = {
  id: number;
} & Record<string, string | number | boolean | null>;
