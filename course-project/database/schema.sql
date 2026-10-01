-- NetManage PostgreSQL schema
-- Matches the JPA model in netmanage.app.entity (serial/identity primary keys).

CREATE DATABASE netmanage;
\c netmanage

CREATE TABLE app_users (
    id              BIGSERIAL PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL UNIQUE,
    full_name       VARCHAR(120) NOT NULL,
    email           VARCHAR(120) NOT NULL UNIQUE,
    role            VARCHAR(20)  NOT NULL,
    status          VARCHAR(20)  NOT NULL,
    CONSTRAINT chk_app_users_role   CHECK (role IN ('ADMIN', 'TECHNICIAN', 'VIEWER')),
    CONSTRAINT chk_app_users_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
);

CREATE TABLE device_types (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(80)  NOT NULL UNIQUE,
    description     VARCHAR(500)
);

CREATE TABLE locations (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(120) NOT NULL UNIQUE,
    building        VARCHAR(120),
    floor           VARCHAR(40),
    room            VARCHAR(40),
    address         VARCHAR(255),
    notes           TEXT
);

CREATE TABLE vlans (
    id              BIGSERIAL PRIMARY KEY,
    vlan_number     INTEGER      NOT NULL UNIQUE,
    name            VARCHAR(80)  NOT NULL,
    description     VARCHAR(500),
    status          VARCHAR(20)  NOT NULL,
    CONSTRAINT chk_vlans_number CHECK (vlan_number BETWEEN 1 AND 4094),
    CONSTRAINT chk_vlans_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
);

CREATE TABLE devices (
    id              BIGSERIAL PRIMARY KEY,
    hostname        VARCHAR(100) NOT NULL UNIQUE,
    manufacturer    VARCHAR(100),
    model           VARCHAR(100),
    serial_number   VARCHAR(80)  NOT NULL UNIQUE,
    status          VARCHAR(20)  NOT NULL,
    purchase_date   DATE,
    notes           TEXT,
    device_type_id  BIGINT       NOT NULL REFERENCES device_types (id),
    location_id     BIGINT       NOT NULL REFERENCES locations (id),
    CONSTRAINT chk_devices_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'DECOMMISSIONED'))
);

CREATE TABLE interfaces (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(80)  NOT NULL,
    type            VARCHAR(20)  NOT NULL,
    mac_address     VARCHAR(17)  UNIQUE,
    status          VARCHAR(20)  NOT NULL,
    device_id       BIGINT       NOT NULL REFERENCES devices (id),
    vlan_id         BIGINT       REFERENCES vlans (id),
    CONSTRAINT chk_interfaces_type   CHECK (type IN ('ETHERNET', 'FIBER', 'WIFI', 'LOOPBACK', 'VLAN')),
    CONSTRAINT chk_interfaces_status CHECK (status IN ('UP', 'DOWN', 'DISABLED'))
);

CREATE TABLE subnets (
    id               BIGSERIAL PRIMARY KEY,
    network_address  VARCHAR(45) NOT NULL,
    cidr             INTEGER     NOT NULL,
    subnet_mask      VARCHAR(45) NOT NULL,
    description      VARCHAR(500),
    vlan_id          BIGINT      NOT NULL REFERENCES vlans (id),
    CONSTRAINT chk_subnets_cidr CHECK (cidr BETWEEN 0 AND 32)
);

CREATE TABLE ip_addresses (
    id              BIGSERIAL PRIMARY KEY,
    address         VARCHAR(45) NOT NULL UNIQUE,
    status          VARCHAR(20) NOT NULL,
    subnet_id       BIGINT      NOT NULL REFERENCES subnets (id),
    interface_id    BIGINT      UNIQUE REFERENCES interfaces (id),
    CONSTRAINT chk_ip_addresses_status CHECK (status IN ('ALLOCATED', 'AVAILABLE', 'RESERVED'))
);

CREATE TABLE maintenance_records (
    id                 BIGSERIAL PRIMARY KEY,
    title              VARCHAR(160) NOT NULL,
    description        TEXT,
    maintenance_type   VARCHAR(20)  NOT NULL,
    status             VARCHAR(20)  NOT NULL,
    scheduled_date     DATE         NOT NULL,
    completed_date     DATE,
    device_id          BIGINT       NOT NULL REFERENCES devices (id),
    user_id            BIGINT       NOT NULL REFERENCES app_users (id),
    CONSTRAINT chk_maintenance_type   CHECK (maintenance_type IN ('PREVENTIVE', 'CORRECTIVE', 'UPGRADE', 'INSPECTION')),
    CONSTRAINT chk_maintenance_status CHECK (status IN ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'))
);

CREATE INDEX idx_devices_device_type_id ON devices (device_type_id);
CREATE INDEX idx_devices_location_id    ON devices (location_id);
CREATE INDEX idx_interfaces_device_id   ON interfaces (device_id);
CREATE INDEX idx_interfaces_vlan_id     ON interfaces (vlan_id);
CREATE INDEX idx_subnets_vlan_id        ON subnets (vlan_id);
CREATE INDEX idx_ip_addresses_subnet_id ON ip_addresses (subnet_id);
CREATE INDEX idx_maintenance_device_id  ON maintenance_records (device_id);
CREATE INDEX idx_maintenance_user_id    ON maintenance_records (user_id);
