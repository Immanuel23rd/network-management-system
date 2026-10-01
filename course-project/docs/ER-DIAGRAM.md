# NetManage Entity-Relationship Diagram

Campus network inventory model used by the Spring Boot JPA entities and `database/schema.sql`.

```mermaid
erDiagram
    APP_USERS ||--o{ MAINTENANCE_RECORDS : assigned
    DEVICE_TYPES ||--o{ DEVICES : classifies
    LOCATIONS ||--o{ DEVICES : houses
    DEVICES ||--o{ INTERFACES : has
    DEVICES ||--o{ MAINTENANCE_RECORDS : tracked-by
    VLANS ||--o{ INTERFACES : tags
    VLANS ||--o{ SUBNETS : contains
    SUBNETS ||--o{ IP_ADDRESSES : allocates
    INTERFACES ||--o| IP_ADDRESSES : binds

    APP_USERS {
        bigint id PK
        varchar username UK
        varchar full_name
        varchar email UK
        varchar role
        varchar status
    }

    DEVICE_TYPES {
        bigint id PK
        varchar name UK
        varchar description
    }

    LOCATIONS {
        bigint id PK
        varchar name UK
        varchar building
        varchar floor
        varchar room
        varchar address
        text notes
    }

    DEVICES {
        bigint id PK
        varchar hostname UK
        varchar manufacturer
        varchar model
        varchar serial_number UK
        varchar status
        date purchase_date
        text notes
        bigint device_type_id FK
        bigint location_id FK
    }

    INTERFACES {
        bigint id PK
        varchar name
        varchar type
        varchar mac_address UK
        varchar status
        bigint device_id FK
        bigint vlan_id FK
    }

    VLANS {
        bigint id PK
        int vlan_number UK
        varchar name
        varchar description
        varchar status
    }

    SUBNETS {
        bigint id PK
        varchar network_address
        int cidr
        varchar subnet_mask
        varchar description
        bigint vlan_id FK
    }

    IP_ADDRESSES {
        bigint id PK
        varchar address UK
        varchar status
        bigint subnet_id FK
        bigint interface_id FK UK
    }

    MAINTENANCE_RECORDS {
        bigint id PK
        varchar title
        text description
        varchar maintenance_type
        varchar status
        date scheduled_date
        date completed_date
        bigint device_id FK
        bigint user_id FK
    }
```

## Cardinality notes

| Parent | Child | Cardinality |
| --- | --- | --- |
| DeviceType | Device | 1 : N |
| Location | Device | 1 : N |
| Device | Interface | 1 : N |
| VLAN | Interface | 1 : N (optional on the interface) |
| VLAN | Subnet | 1 : N |
| Subnet | IPAddress | 1 : N |
| Interface | IPAddress | 1 : 0..1 (`interface_id` is unique and nullable) |
| Device | MaintenanceRecord | 1 : N |
| User (`app_users`) | MaintenanceRecord | 1 : N |
