-- Northline University sample inventory
-- Run after schema.sql (or after Hibernate has created the tables).

INSERT INTO app_users (id, username, full_name, email, role, status) VALUES
(1, 'evoss', 'Elena Voss',  'elena.voss@northline.example',  'ADMIN',      'ACTIVE'),
(2, 'mchen', 'Marcus Chen', 'marcus.chen@northline.example', 'TECHNICIAN', 'ACTIVE'),
(3, 'pnair', 'Priya Nair',  'priya.nair@northline.example',  'TECHNICIAN', 'ACTIVE'),
(4, 'jhale', 'Jonah Hale',  'jonah.hale@northline.example',  'VIEWER',     'ACTIVE');

INSERT INTO device_types (id, name, description) VALUES
(1, 'Router',       'Campus edge and distribution routers'),
(2, 'Switch',       'Access and core Ethernet switches'),
(3, 'Firewall',     'Perimeter and datacenter firewalls'),
(4, 'Access Point', 'Wireless access points'),
(5, 'Server',       'Infrastructure and application servers');

INSERT INTO locations (id, name, building, floor, room, address, notes) VALUES
(1, 'HQ Core MDF',    'Administration Building', 'B1', 'MDF-01',  '100 Northline Ave, Core Plant', 'Primary campus MDF. Dual power feeds and fiber entrance.'),
(2, 'Science IDF',    'Science Building',        '2',  'IDF-201', '40 Faraday Hall',               'Serves labs and faculty offices on floors 1-3.'),
(3, 'Library IDF',    'University Library',      '1',  'IDF-110', '12 Stacks Court',               'Public wireless and staff VLAN termination.'),
(4, 'Student Center', 'Student Center',          '1',  'NET-105', '8 Commons Way',                 'High-density wireless and guest access.');

INSERT INTO vlans (id, vlan_number, name, description, status) VALUES
(1, 10,  'Mgmt',     'Out-of-band and in-band device management', 'ACTIVE'),
(2, 20,  'Staff',    'Faculty and administrative workstations',   'ACTIVE'),
(3, 30,  'Students', 'Residence and classroom student access',    'ACTIVE'),
(4, 40,  'Servers',  'Datacenter and application servers',        'ACTIVE'),
(5, 50,  'Guest',    'Isolated visitor wireless',                 'ACTIVE'),
(6, 100, 'Voice',    'Campus IP telephony',                       'ACTIVE');

INSERT INTO devices (id, hostname, manufacturer, model, serial_number, status, purchase_date, notes, device_type_id, location_id) VALUES
(1, 'nl-core-rtr-01', 'Cisco',     'ISR 4451',       'ISR4451-NL-0001', 'ACTIVE',      '2022-06-15', 'Campus core router. Default gateway for management.',     1, 1),
(2, 'nl-core-sw-01',  'Cisco',     'Catalyst 9300',  'C9300-NL-0044',   'ACTIVE',      '2023-01-10', 'Core distribution switch in the HQ MDF.',               2, 1),
(3, 'nl-fw-01',       'Palo Alto', 'PA-3220',        'PA3220-NL-0019',  'ACTIVE',      '2023-04-02', 'Northbound campus firewall.',                           3, 1),
(4, 'nl-sci-sw-01',   'Cisco',     'Catalyst 9200',  'C9200-NL-0112',   'ACTIVE',      '2023-08-21', 'Science building access/distribution switch.',          2, 2),
(5, 'nl-lib-ap-01',   'Aruba',     'AP-535',         'AP535-NL-0881',   'ACTIVE',      '2024-02-14', 'Library reading-room high-density AP.',                 4, 3),
(6, 'nl-sc-ap-01',    'Aruba',     'AP-535',         'AP535-NL-0904',   'ACTIVE',      '2024-02-14', 'Student Center atrium AP.',                             4, 4),
(7, 'nl-srv-dc-01',   'Dell',      'PowerEdge R750', 'R750-NL-2201',    'ACTIVE',      '2023-11-05', 'Directory and inventory application host.',             5, 1),
(8, 'nl-sci-rtr-01',  'Cisco',     'ISR 4331',       'ISR4331-NL-0033', 'MAINTENANCE', '2021-09-30', 'Science building router pending inspection.',           1, 2);

INSERT INTO interfaces (id, name, type, mac_address, status, device_id, vlan_id) VALUES
(1,  'GigabitEthernet0/0/0',  'ETHERNET', '00:1A:2B:3C:4D:10', 'UP', 1, 1),
(2,  'GigabitEthernet0/0/1',  'FIBER',    '00:1A:2B:3C:4D:11', 'UP', 1, 2),
(3,  'Loopback0',             'LOOPBACK', NULL,                'UP', 1, 1),
(4,  'GigabitEthernet1/0/1',  'ETHERNET', '00:1B:44:11:3A:01', 'UP', 2, 1),
(5,  'GigabitEthernet1/0/24', 'FIBER',    '00:1B:44:11:3A:18', 'UP', 2, 4),
(6,  'Vlan10',                'VLAN',     '00:1B:44:11:3A:B0', 'UP', 2, 1),
(7,  'ethernet1/1',           'ETHERNET', '00:86:9C:10:00:01', 'UP', 3, 1),
(8,  'ethernet1/2',           'FIBER',    '00:86:9C:10:00:02', 'UP', 3, 5),
(9,  'GigabitEthernet1/0/1',  'ETHERNET', '00:1C:73:90:01:01', 'UP', 4, 2),
(10, 'GigabitEthernet1/0/48', 'FIBER',    '00:1C:73:90:01:30', 'UP', 4, 1),
(11, 'wlan0',                 'WIFI',     '00:4E:35:88:10:01', 'UP', 5, 3),
(12, 'wlan0',                 'WIFI',     '00:4E:35:88:11:01', 'UP', 6, 5),
(13, 'eth0',                  'ETHERNET', '00:21:9B:44:10:0A', 'UP', 7, 4);

INSERT INTO subnets (id, network_address, cidr, subnet_mask, description, vlan_id) VALUES
(1, '10.10.0.0', 24, '255.255.255.0', 'Management network',  1),
(2, '10.20.0.0', 24, '255.255.255.0', 'Staff workstations',  2),
(3, '10.30.0.0', 22, '255.255.252.0', 'Student access',      3),
(4, '10.40.0.0', 24, '255.255.255.0', 'Server VLAN',         4),
(5, '10.50.0.0', 24, '255.255.255.0', 'Guest wireless',      5);

INSERT INTO ip_addresses (id, address, status, subnet_id, interface_id) VALUES
(1,  '10.10.0.1',  'ALLOCATED', 1, 1),
(2,  '10.10.0.2',  'ALLOCATED', 1, 6),
(3,  '10.10.0.3',  'ALLOCATED', 1, 7),
(4,  '10.10.0.50', 'RESERVED',  1, NULL),
(5,  '10.20.0.10', 'ALLOCATED', 2, 9),
(6,  '10.20.0.50', 'AVAILABLE', 2, NULL),
(7,  '10.30.0.10', 'AVAILABLE', 3, NULL),
(8,  '10.40.0.10', 'ALLOCATED', 4, 13),
(9,  '10.40.0.11', 'RESERVED',  4, NULL),
(10, '10.50.0.1',  'ALLOCATED', 5, 8);

INSERT INTO maintenance_records (id, title, description, maintenance_type, status, scheduled_date, completed_date, device_id, user_id) VALUES
(1, 'Core switch firmware upgrade', 'Plan Catalyst 9300 software train to the approved campus image.',           'UPGRADE',     'SCHEDULED',   CURRENT_DATE + 14, NULL,                 2, 2),
(2, 'Science router inspection',    'Hardware health check and IOS image audit on ISR 4331.',                    'INSPECTION',  'IN_PROGRESS', CURRENT_DATE - 2,  NULL,                 8, 3),
(3, 'Firewall policy review',       'Quarterly review of northbound security rules and object groups.',          'PREVENTIVE',  'COMPLETED',   CURRENT_DATE - 21, CURRENT_DATE - 18,    3, 2),
(4, 'Library AP radio check',       'Corrective investigation of 5 GHz channel contention in the reading room.', 'CORRECTIVE',  'COMPLETED',   CURRENT_DATE - 10, CURRENT_DATE - 9,     5, 3),
(5, 'Server disk replacement',      'Replace predicted-fail disk in RAID 5 array on nl-srv-dc-01.',              'CORRECTIVE',  'SCHEDULED',   CURRENT_DATE + 5,  NULL,                 7, 2);

SELECT setval('app_users_id_seq',            (SELECT MAX(id) FROM app_users));
SELECT setval('device_types_id_seq',         (SELECT MAX(id) FROM device_types));
SELECT setval('locations_id_seq',            (SELECT MAX(id) FROM locations));
SELECT setval('vlans_id_seq',                (SELECT MAX(id) FROM vlans));
SELECT setval('devices_id_seq',              (SELECT MAX(id) FROM devices));
SELECT setval('interfaces_id_seq',           (SELECT MAX(id) FROM interfaces));
SELECT setval('subnets_id_seq',              (SELECT MAX(id) FROM subnets));
SELECT setval('ip_addresses_id_seq',         (SELECT MAX(id) FROM ip_addresses));
SELECT setval('maintenance_records_id_seq',  (SELECT MAX(id) FROM maintenance_records));
