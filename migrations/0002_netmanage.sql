-- NetManage schema + Northline University sample inventory

create table if not exists app_users (
  id serial primary key,
  username varchar(64) not null unique,
  full_name varchar(120) not null,
  email varchar(160) not null unique,
  role varchar(32) not null check (role in ('ADMIN', 'TECHNICIAN', 'VIEWER')),
  status varchar(32) not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz not null default now()
);

create table if not exists device_types (
  id serial primary key,
  name varchar(80) not null unique,
  description text
);

create table if not exists locations (
  id serial primary key,
  name varchar(120) not null,
  building varchar(80),
  floor varchar(40),
  room varchar(40),
  address varchar(200),
  notes text
);

create table if not exists vlans (
  id serial primary key,
  vlan_number integer not null unique check (vlan_number between 1 and 4094),
  name varchar(80) not null,
  description text,
  status varchar(32) not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE'))
);

create table if not exists devices (
  id serial primary key,
  hostname varchar(120) not null unique,
  manufacturer varchar(80) not null,
  model varchar(80) not null,
  serial_number varchar(80) not null unique,
  status varchar(32) not null default 'ACTIVE'
    check (status in ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'DECOMMISSIONED')),
  purchase_date date,
  device_type_id integer not null references device_types (id),
  location_id integer not null references locations (id),
  notes text
);

create table if not exists interfaces (
  id serial primary key,
  name varchar(80) not null,
  type varchar(32) not null check (type in ('ETHERNET', 'FIBER', 'WIFI', 'LOOPBACK', 'VLAN')),
  mac_address varchar(17) unique,
  status varchar(32) not null default 'UP' check (status in ('UP', 'DOWN', 'DISABLED')),
  device_id integer not null references devices (id),
  vlan_id integer references vlans (id),
  unique (device_id, name)
);

create table if not exists subnets (
  id serial primary key,
  network_address varchar(45) not null,
  cidr integer not null check (cidr between 0 and 32),
  subnet_mask varchar(45) not null,
  description text,
  vlan_id integer not null references vlans (id),
  unique (network_address, cidr)
);

create table if not exists ip_addresses (
  id serial primary key,
  address varchar(45) not null unique,
  status varchar(32) not null default 'AVAILABLE'
    check (status in ('ALLOCATED', 'AVAILABLE', 'RESERVED')),
  subnet_id integer not null references subnets (id),
  interface_id integer unique references interfaces (id)
);

create table if not exists maintenance_records (
  id serial primary key,
  title varchar(160) not null,
  description text,
  maintenance_type varchar(32) not null
    check (maintenance_type in ('PREVENTIVE', 'CORRECTIVE', 'UPGRADE', 'INSPECTION')),
  status varchar(32) not null default 'SCHEDULED'
    check (status in ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  scheduled_date date not null,
  completed_date date,
  device_id integer not null references devices (id),
  user_id integer not null references app_users (id)
);

insert into app_users (username, full_name, email, role, status)
select * from (values
  ('a.nkurunziza', 'Aline Nkurunziza', 'aline.nkurunziza@northline.example', 'ADMIN', 'ACTIVE'),
  ('j.mwangi', 'James Mwangi', 'james.mwangi@northline.example', 'TECHNICIAN', 'ACTIVE'),
  ('s.uwase', 'Sandrine Uwase', 'sandrine.uwase@northline.example', 'TECHNICIAN', 'ACTIVE'),
  ('p.okello', 'Peter Okello', 'peter.okello@northline.example', 'VIEWER', 'ACTIVE')
) as v(username, full_name, email, role, status)
where not exists (select 1 from app_users);

insert into device_types (name, description)
select * from (values
  ('Router', 'Edge and core routing platforms'),
  ('Switch', 'Access and distribution switching'),
  ('Firewall', 'Perimeter and segmentation firewalls'),
  ('Access Point', 'Campus wireless radios'),
  ('Server', 'Infrastructure and application hosts')
) as v(name, description)
where not exists (select 1 from device_types);

insert into locations (name, building, floor, room, address, notes)
select * from (values
  ('HQ Core MDF', 'Administration', 'B1', 'MDF-01', '12 Campus Way, Northline', 'Primary campus meet-me room'),
  ('Science IDF', 'Science Block', '2', 'IDF-2E', '4 Faraday Lane', 'Serves labs and faculty offices'),
  ('Library IDF', 'Main Library', '1', 'IDF-1N', '1 Archive Court', 'Public and staff wireless'),
  ('Student Center', 'Student Union', 'G', 'COMMS-G', '9 Union Plaza', 'High-density wireless and POS')
) as v(name, building, floor, room, address, notes)
where not exists (select 1 from locations);

insert into vlans (vlan_number, name, description, status)
select * from (values
  (10, 'Management', 'OOB and device management', 'ACTIVE'),
  (20, 'Staff', 'Faculty and administration', 'ACTIVE'),
  (30, 'Students', 'Residence and classroom users', 'ACTIVE'),
  (40, 'Servers', 'Data center and appliance segment', 'ACTIVE'),
  (50, 'Guest', 'Isolated visitor wireless', 'ACTIVE'),
  (100, 'Voice', 'IP telephony', 'ACTIVE')
) as v(vlan_number, name, description, status)
where not exists (select 1 from vlans);

insert into devices (hostname, manufacturer, model, serial_number, status, purchase_date, device_type_id, location_id, notes)
select v.hostname, v.manufacturer, v.model, v.serial_number, v.status, v.purchase_date::date, dt.id, loc.id, v.notes
from (values
  ('core-rtr-01', 'Cisco', 'ISR 4451', 'FTX2411A9K1', 'ACTIVE', '2023-03-12', 'Router', 'HQ Core MDF', 'Campus default gateway and WAN handoff'),
  ('dist-sw-01', 'Cisco', 'Catalyst 9300', 'FOC2448X12Q', 'ACTIVE', '2023-06-01', 'Switch', 'HQ Core MDF', 'Distribution switch for east campus'),
  ('fw-edge-01', 'Fortinet', 'FortiGate 200F', 'FG200FTB22001234', 'ACTIVE', '2022-11-18', 'Firewall', 'HQ Core MDF', 'North-south perimeter'),
  ('access-sw-sci-01', 'Cisco', 'Catalyst 9200', 'FOC2511M88C', 'ACTIVE', '2024-01-09', 'Switch', 'Science IDF', 'Science block access'),
  ('ap-lib-01', 'Ubiquiti', 'U6 Pro', 'U6P-24A81C', 'ACTIVE', '2024-04-22', 'Access Point', 'Library IDF', 'Reading hall west'),
  ('ap-sc-01', 'Ubiquiti', 'U6 Pro', 'U6P-24A92D', 'MAINTENANCE', '2024-04-22', 'Access Point', 'Student Center', 'Atrium, radio 5 GHz flapping'),
  ('srv-dns-01', 'Dell', 'PowerEdge R750', 'DLLR750-88421', 'ACTIVE', '2023-09-15', 'Server', 'HQ Core MDF', 'Recursive DNS / AD-integrated'),
  ('srv-dir-01', 'Dell', 'PowerEdge R750', 'DLLR750-88422', 'ACTIVE', '2023-09-15', 'Server', 'HQ Core MDF', 'Directory services')
) as v(hostname, manufacturer, model, serial_number, status, purchase_date, type_name, loc_name, notes)
join device_types dt on dt.name = v.type_name
join locations loc on loc.name = v.loc_name
where not exists (select 1 from devices d where d.hostname = v.hostname);

insert into interfaces (name, type, mac_address, status, device_id, vlan_id)
select v.name, v.type, v.mac_address, v.status, d.id, vl.id
from (values
  ('GigabitEthernet0/0/0', 'ETHERNET', '00:1A:2B:10:00:01', 'UP', 'core-rtr-01', 10),
  ('GigabitEthernet0/0/1', 'FIBER', '00:1A:2B:10:00:02', 'UP', 'core-rtr-01', 40),
  ('Loopback0', 'LOOPBACK', null, 'UP', 'core-rtr-01', 10),
  ('GigabitEthernet1/0/1', 'ETHERNET', '00:1A:2B:20:00:01', 'UP', 'dist-sw-01', 10),
  ('GigabitEthernet1/0/24', 'FIBER', '00:1A:2B:20:00:18', 'UP', 'dist-sw-01', 20),
  ('wan1', 'ETHERNET', '08:5B:0E:AA:00:01', 'UP', 'fw-edge-01', null),
  ('internal', 'ETHERNET', '08:5B:0E:AA:00:02', 'UP', 'fw-edge-01', 10),
  ('GigabitEthernet1/0/1', 'ETHERNET', '00:1A:2B:30:00:01', 'UP', 'access-sw-sci-01', 20),
  ('GigabitEthernet1/0/12', 'ETHERNET', '00:1A:2B:30:00:0C', 'DOWN', 'access-sw-sci-01', 30),
  ('wlan0', 'WIFI', '24:5A:4C:11:00:01', 'UP', 'ap-lib-01', 30),
  ('wlan0', 'WIFI', '24:5A:4C:11:00:02', 'DOWN', 'ap-sc-01', 50),
  ('eth0', 'ETHERNET', 'A4:BB:6D:01:00:01', 'UP', 'srv-dns-01', 40)
) as v(name, type, mac_address, status, hostname, vlan_number)
join devices d on d.hostname = v.hostname
left join vlans vl on vl.vlan_number = v.vlan_number
where not exists (
  select 1 from interfaces i where i.device_id = d.id and i.name = v.name
);

insert into subnets (network_address, cidr, subnet_mask, description, vlan_id)
select v.network_address, v.cidr, v.subnet_mask, v.description, vl.id
from (values
  ('10.10.10.0', 24, '255.255.255.0', 'Device management', 10),
  ('10.20.0.0', 22, '255.255.252.0', 'Staff wired and wireless', 20),
  ('10.30.0.0', 22, '255.255.252.0', 'Student access', 30),
  ('10.40.0.0', 24, '255.255.255.0', 'Servers and appliances', 40),
  ('10.50.0.0', 24, '255.255.255.0', 'Guest wireless', 50)
) as v(network_address, cidr, subnet_mask, description, vlan_number)
join vlans vl on vl.vlan_number = v.vlan_number
where not exists (
  select 1 from subnets s where s.network_address = v.network_address and s.cidr = v.cidr
);

insert into ip_addresses (address, status, subnet_id, interface_id)
select v.address, v.status, s.id, i.id
from (values
  ('10.10.10.1', 'ALLOCATED', '10.10.10.0', 24, 'core-rtr-01', 'GigabitEthernet0/0/0'),
  ('10.10.10.2', 'ALLOCATED', '10.10.10.0', 24, 'dist-sw-01', 'GigabitEthernet1/0/1'),
  ('10.10.10.3', 'ALLOCATED', '10.10.10.0', 24, 'fw-edge-01', 'internal'),
  ('10.10.10.4', 'RESERVED', '10.10.10.0', 24, null, null),
  ('10.40.0.1', 'ALLOCATED', '10.40.0.0', 24, 'core-rtr-01', 'GigabitEthernet0/0/1'),
  ('10.40.0.10', 'ALLOCATED', '10.40.0.0', 24, 'srv-dns-01', 'eth0'),
  ('10.40.0.11', 'RESERVED', '10.40.0.0', 24, null, null),
  ('10.20.0.10', 'AVAILABLE', '10.20.0.0', 22, null, null),
  ('10.30.0.25', 'ALLOCATED', '10.30.0.0', 22, 'ap-lib-01', 'wlan0'),
  ('10.50.0.1', 'RESERVED', '10.50.0.0', 24, null, null)
) as v(address, status, network_address, cidr, hostname, ifname)
join subnets s on s.network_address = v.network_address and s.cidr = v.cidr
left join devices d on d.hostname = v.hostname
left join interfaces i on i.device_id = d.id and i.name = v.ifname
where not exists (select 1 from ip_addresses a where a.address = v.address);

insert into maintenance_records (title, description, maintenance_type, status, scheduled_date, completed_date, device_id, user_id)
select v.title, v.description, v.maintenance_type, v.status, v.scheduled_date::date, v.completed_date::date, d.id, u.id
from (values
  ('Replace atrium AP radio', '5 GHz radio flapping during peak hours', 'CORRECTIVE', 'IN_PROGRESS', '2026-09-28', null, 'ap-sc-01', 'j.mwangi'),
  ('Core router IOS-XE patch', 'Scheduled firmware window', 'UPGRADE', 'SCHEDULED', '2026-10-12', null, 'core-rtr-01', 'a.nkurunziza'),
  ('Science switch port audit', 'Label and disable unused access ports', 'INSPECTION', 'COMPLETED', '2026-09-02', '2026-09-03', 'access-sw-sci-01', 's.uwase'),
  ('Firewall policy review', 'Quarterly rulebase hygiene', 'PREVENTIVE', 'SCHEDULED', '2026-10-20', null, 'fw-edge-01', 'j.mwangi'),
  ('DNS host disk check', 'SMART warnings on bay 2', 'INSPECTION', 'COMPLETED', '2026-08-19', '2026-08-19', 'srv-dns-01', 's.uwase')
) as v(title, description, maintenance_type, status, scheduled_date, completed_date, hostname, username)
join devices d on d.hostname = v.hostname
join app_users u on u.username = v.username
where not exists (
  select 1 from maintenance_records m where m.title = v.title and m.device_id = d.id
);
