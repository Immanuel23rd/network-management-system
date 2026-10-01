package netmanage.app.seed;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.AppUser;
import netmanage.app.entity.Device;
import netmanage.app.entity.DeviceType;
import netmanage.app.entity.IpAddress;
import netmanage.app.entity.Location;
import netmanage.app.entity.MaintenanceRecord;
import netmanage.app.entity.NetInterface;
import netmanage.app.entity.Subnet;
import netmanage.app.entity.Vlan;
import netmanage.app.repository.AppUserRepository;
import netmanage.app.repository.DeviceRepository;
import netmanage.app.repository.DeviceTypeRepository;
import netmanage.app.repository.IpAddressRepository;
import netmanage.app.repository.LocationRepository;
import netmanage.app.repository.MaintenanceRecordRepository;
import netmanage.app.repository.NetInterfaceRepository;
import netmanage.app.repository.SubnetRepository;
import netmanage.app.repository.VlanRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final DeviceTypeRepository deviceTypeRepository;
    private final LocationRepository locationRepository;
    private final VlanRepository vlanRepository;
    private final DeviceRepository deviceRepository;
    private final NetInterfaceRepository netInterfaceRepository;
    private final SubnetRepository subnetRepository;
    private final IpAddressRepository ipAddressRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public DataSeeder(AppUserRepository appUserRepository,
                      DeviceTypeRepository deviceTypeRepository,
                      LocationRepository locationRepository,
                      VlanRepository vlanRepository,
                      DeviceRepository deviceRepository,
                      NetInterfaceRepository netInterfaceRepository,
                      SubnetRepository subnetRepository,
                      IpAddressRepository ipAddressRepository,
                      MaintenanceRecordRepository maintenanceRecordRepository) {
        this.appUserRepository = appUserRepository;
        this.deviceTypeRepository = deviceTypeRepository;
        this.locationRepository = locationRepository;
        this.vlanRepository = vlanRepository;
        this.deviceRepository = deviceRepository;
        this.netInterfaceRepository = netInterfaceRepository;
        this.subnetRepository = subnetRepository;
        this.ipAddressRepository = ipAddressRepository;
        this.maintenanceRecordRepository = maintenanceRecordRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (appUserRepository.count() > 0) {
            return;
        }
        seedUsers();
        seedDeviceTypes();
        seedLocations();
        seedVlans();
        seedDevices();
        seedInterfaces();
        seedSubnets();
        seedIpAddresses();
        seedMaintenance();
    }

    private void seedUsers() {
        appUserRepository.save(new AppUser(
                "evoss", "Elena Voss", "elena.voss@northline.example",
                AppUser.Role.ADMIN, AppUser.Status.ACTIVE));
        appUserRepository.save(new AppUser(
                "mchen", "Marcus Chen", "marcus.chen@northline.example",
                AppUser.Role.TECHNICIAN, AppUser.Status.ACTIVE));
        appUserRepository.save(new AppUser(
                "pnair", "Priya Nair", "priya.nair@northline.example",
                AppUser.Role.TECHNICIAN, AppUser.Status.ACTIVE));
        appUserRepository.save(new AppUser(
                "jhale", "Jonah Hale", "jonah.hale@northline.example",
                AppUser.Role.VIEWER, AppUser.Status.ACTIVE));
    }

    private void seedDeviceTypes() {
        deviceTypeRepository.save(new DeviceType("Router", "Campus edge and distribution routers"));
        deviceTypeRepository.save(new DeviceType("Switch", "Access and core Ethernet switches"));
        deviceTypeRepository.save(new DeviceType("Firewall", "Perimeter and datacenter firewalls"));
        deviceTypeRepository.save(new DeviceType("Access Point", "Wireless access points"));
        deviceTypeRepository.save(new DeviceType("Server", "Infrastructure and application servers"));
    }

    private void seedLocations() {
        locationRepository.save(new Location(
                "HQ Core MDF", "Administration Building", "B1", "MDF-01",
                "100 Northline Ave, Core Plant",
                "Primary campus MDF. Dual power feeds and fiber entrance."));
        locationRepository.save(new Location(
                "Science IDF", "Science Building", "2", "IDF-201",
                "40 Faraday Hall",
                "Serves labs and faculty offices on floors 1-3."));
        locationRepository.save(new Location(
                "Library IDF", "University Library", "1", "IDF-110",
                "12 Stacks Court",
                "Public wireless and staff VLAN termination."));
        locationRepository.save(new Location(
                "Student Center", "Student Center", "1", "NET-105",
                "8 Commons Way",
                "High-density wireless and guest access."));
    }

    private void seedVlans() {
        vlanRepository.save(new Vlan(10, "Mgmt", "Out-of-band and in-band device management", Vlan.Status.ACTIVE));
        vlanRepository.save(new Vlan(20, "Staff", "Faculty and administrative workstations", Vlan.Status.ACTIVE));
        vlanRepository.save(new Vlan(30, "Students", "Residence and classroom student access", Vlan.Status.ACTIVE));
        vlanRepository.save(new Vlan(40, "Servers", "Datacenter and application servers", Vlan.Status.ACTIVE));
        vlanRepository.save(new Vlan(50, "Guest", "Isolated visitor wireless", Vlan.Status.ACTIVE));
        vlanRepository.save(new Vlan(100, "Voice", "Campus IP telephony", Vlan.Status.ACTIVE));
    }

    private void seedDevices() {
        DeviceType router = type("Router");
        DeviceType sw = type("Switch");
        DeviceType fw = type("Firewall");
        DeviceType ap = type("Access Point");
        DeviceType srv = type("Server");

        Location hq = loc("HQ Core MDF");
        Location sci = loc("Science IDF");
        Location lib = loc("Library IDF");
        Location sc = loc("Student Center");

        saveDevice("nl-core-rtr-01", "Cisco", "ISR 4451", "ISR4451-NL-0001",
                Device.Status.ACTIVE, LocalDate.of(2022, 6, 15),
                "Campus core router. Default gateway for management.", router, hq);
        saveDevice("nl-core-sw-01", "Cisco", "Catalyst 9300", "C9300-NL-0044",
                Device.Status.ACTIVE, LocalDate.of(2023, 1, 10),
                "Core distribution switch in the HQ MDF.", sw, hq);
        saveDevice("nl-fw-01", "Palo Alto", "PA-3220", "PA3220-NL-0019",
                Device.Status.ACTIVE, LocalDate.of(2023, 4, 2),
                "Northbound campus firewall.", fw, hq);
        saveDevice("nl-sci-sw-01", "Cisco", "Catalyst 9200", "C9200-NL-0112",
                Device.Status.ACTIVE, LocalDate.of(2023, 8, 21),
                "Science building access/distribution switch.", sw, sci);
        saveDevice("nl-lib-ap-01", "Aruba", "AP-535", "AP535-NL-0881",
                Device.Status.ACTIVE, LocalDate.of(2024, 2, 14),
                "Library reading-room high-density AP.", ap, lib);
        saveDevice("nl-sc-ap-01", "Aruba", "AP-535", "AP535-NL-0904",
                Device.Status.ACTIVE, LocalDate.of(2024, 2, 14),
                "Student Center atrium AP.", ap, sc);
        saveDevice("nl-srv-dc-01", "Dell", "PowerEdge R750", "R750-NL-2201",
                Device.Status.ACTIVE, LocalDate.of(2023, 11, 5),
                "Directory and inventory application host.", srv, hq);
        saveDevice("nl-sci-rtr-01", "Cisco", "ISR 4331", "ISR4331-NL-0033",
                Device.Status.MAINTENANCE, LocalDate.of(2021, 9, 30),
                "Science building router pending inspection.", router, sci);
    }

    private void seedInterfaces() {
        Vlan mgmt = vlan(10);
        Vlan staff = vlan(20);
        Vlan students = vlan(30);
        Vlan servers = vlan(40);
        Vlan guest = vlan(50);

        saveIface(dev("nl-core-rtr-01"), "GigabitEthernet0/0/0", NetInterface.Type.ETHERNET,
                "00:1A:2B:3C:4D:10", NetInterface.Status.UP, mgmt);
        saveIface(dev("nl-core-rtr-01"), "GigabitEthernet0/0/1", NetInterface.Type.FIBER,
                "00:1A:2B:3C:4D:11", NetInterface.Status.UP, staff);
        saveIface(dev("nl-core-rtr-01"), "Loopback0", NetInterface.Type.LOOPBACK,
                null, NetInterface.Status.UP, mgmt);

        saveIface(dev("nl-core-sw-01"), "GigabitEthernet1/0/1", NetInterface.Type.ETHERNET,
                "00:1B:44:11:3A:01", NetInterface.Status.UP, mgmt);
        saveIface(dev("nl-core-sw-01"), "GigabitEthernet1/0/24", NetInterface.Type.FIBER,
                "00:1B:44:11:3A:18", NetInterface.Status.UP, servers);
        saveIface(dev("nl-core-sw-01"), "Vlan10", NetInterface.Type.VLAN,
                "00:1B:44:11:3A:B0", NetInterface.Status.UP, mgmt);

        saveIface(dev("nl-fw-01"), "ethernet1/1", NetInterface.Type.ETHERNET,
                "00:86:9C:10:00:01", NetInterface.Status.UP, mgmt);
        saveIface(dev("nl-fw-01"), "ethernet1/2", NetInterface.Type.FIBER,
                "00:86:9C:10:00:02", NetInterface.Status.UP, guest);

        saveIface(dev("nl-sci-sw-01"), "GigabitEthernet1/0/1", NetInterface.Type.ETHERNET,
                "00:1C:73:90:01:01", NetInterface.Status.UP, staff);
        saveIface(dev("nl-sci-sw-01"), "GigabitEthernet1/0/48", NetInterface.Type.FIBER,
                "00:1C:73:90:01:30", NetInterface.Status.UP, mgmt);

        saveIface(dev("nl-lib-ap-01"), "wlan0", NetInterface.Type.WIFI,
                "00:4E:35:88:10:01", NetInterface.Status.UP, students);
        saveIface(dev("nl-sc-ap-01"), "wlan0", NetInterface.Type.WIFI,
                "00:4E:35:88:11:01", NetInterface.Status.UP, guest);
        saveIface(dev("nl-srv-dc-01"), "eth0", NetInterface.Type.ETHERNET,
                "00:21:9B:44:10:0A", NetInterface.Status.UP, servers);
    }

    private void seedSubnets() {
        saveSubnet("10.10.0.0", 24, "255.255.255.0", "Management network", vlan(10));
        saveSubnet("10.20.0.0", 24, "255.255.255.0", "Staff workstations", vlan(20));
        saveSubnet("10.30.0.0", 22, "255.255.252.0", "Student access", vlan(30));
        saveSubnet("10.40.0.0", 24, "255.255.255.0", "Server VLAN", vlan(40));
        saveSubnet("10.50.0.0", 24, "255.255.255.0", "Guest wireless", vlan(50));
    }

    private void seedIpAddresses() {
        saveIp("10.10.0.1", IpAddress.Status.ALLOCATED, subnet("10.10.0.0"),
                iface("nl-core-rtr-01", "GigabitEthernet0/0/0"));
        saveIp("10.10.0.2", IpAddress.Status.ALLOCATED, subnet("10.10.0.0"),
                iface("nl-core-sw-01", "Vlan10"));
        saveIp("10.10.0.3", IpAddress.Status.ALLOCATED, subnet("10.10.0.0"),
                iface("nl-fw-01", "ethernet1/1"));
        saveIp("10.10.0.50", IpAddress.Status.RESERVED, subnet("10.10.0.0"), null);
        saveIp("10.20.0.10", IpAddress.Status.ALLOCATED, subnet("10.20.0.0"),
                iface("nl-sci-sw-01", "GigabitEthernet1/0/1"));
        saveIp("10.20.0.50", IpAddress.Status.AVAILABLE, subnet("10.20.0.0"), null);
        saveIp("10.30.0.10", IpAddress.Status.AVAILABLE, subnet("10.30.0.0"), null);
        saveIp("10.40.0.10", IpAddress.Status.ALLOCATED, subnet("10.40.0.0"),
                iface("nl-srv-dc-01", "eth0"));
        saveIp("10.40.0.11", IpAddress.Status.RESERVED, subnet("10.40.0.0"), null);
        saveIp("10.50.0.1", IpAddress.Status.ALLOCATED, subnet("10.50.0.0"),
                iface("nl-fw-01", "ethernet1/2"));
    }

    private void seedMaintenance() {
        AppUser marcus = user("mchen");
        AppUser priya = user("pnair");
        LocalDate today = LocalDate.now();

        saveMaint("Core switch firmware upgrade",
                "Plan Catalyst 9300 software train to the approved campus image.",
                MaintenanceRecord.MaintenanceType.UPGRADE,
                MaintenanceRecord.Status.SCHEDULED,
                today.plusDays(14), null, dev("nl-core-sw-01"), marcus);

        saveMaint("Science router inspection",
                "Hardware health check and IOS image audit on ISR 4331.",
                MaintenanceRecord.MaintenanceType.INSPECTION,
                MaintenanceRecord.Status.IN_PROGRESS,
                today.minusDays(2), null, dev("nl-sci-rtr-01"), priya);

        saveMaint("Firewall policy review",
                "Quarterly review of northbound security rules and object groups.",
                MaintenanceRecord.MaintenanceType.PREVENTIVE,
                MaintenanceRecord.Status.COMPLETED,
                today.minusDays(21), today.minusDays(18), dev("nl-fw-01"), marcus);

        saveMaint("Library AP radio check",
                "Corrective investigation of 5 GHz channel contention in the reading room.",
                MaintenanceRecord.MaintenanceType.CORRECTIVE,
                MaintenanceRecord.Status.COMPLETED,
                today.minusDays(10), today.minusDays(9), dev("nl-lib-ap-01"), priya);

        saveMaint("Server disk replacement",
                "Replace predicted-fail disk in RAID 5 array on nl-srv-dc-01.",
                MaintenanceRecord.MaintenanceType.CORRECTIVE,
                MaintenanceRecord.Status.SCHEDULED,
                today.plusDays(5), null, dev("nl-srv-dc-01"), marcus);
    }

    private void saveDevice(String hostname, String manufacturer, String model, String serial,
                            Device.Status status, LocalDate purchased, String notes,
                            DeviceType type, Location location) {
        Device device = new Device();
        device.setHostname(hostname);
        device.setManufacturer(manufacturer);
        device.setModel(model);
        device.setSerialNumber(serial);
        device.setStatus(status);
        device.setPurchaseDate(purchased);
        device.setNotes(notes);
        device.setDeviceType(type);
        device.setLocation(location);
        deviceRepository.save(device);
    }

    private void saveIface(Device device, String name, NetInterface.Type type, String mac,
                           NetInterface.Status status, Vlan vlan) {
        NetInterface iface = new NetInterface();
        iface.setDevice(device);
        iface.setName(name);
        iface.setType(type);
        iface.setMacAddress(mac);
        iface.setStatus(status);
        iface.setVlan(vlan);
        netInterfaceRepository.save(iface);
    }

    private void saveSubnet(String network, int cidr, String mask, String description, Vlan vlan) {
        Subnet subnet = new Subnet();
        subnet.setNetworkAddress(network);
        subnet.setCidr(cidr);
        subnet.setSubnetMask(mask);
        subnet.setDescription(description);
        subnet.setVlan(vlan);
        subnetRepository.save(subnet);
    }

    private void saveIp(String address, IpAddress.Status status, Subnet subnet, NetInterface iface) {
        IpAddress ip = new IpAddress();
        ip.setAddress(address);
        ip.setStatus(status);
        ip.setSubnet(subnet);
        ip.setNetInterface(iface);
        ipAddressRepository.save(ip);
    }

    private void saveMaint(String title, String description, MaintenanceRecord.MaintenanceType type,
                           MaintenanceRecord.Status status, LocalDate scheduled, LocalDate completed,
                           Device device, AppUser user) {
        MaintenanceRecord record = new MaintenanceRecord();
        record.setTitle(title);
        record.setDescription(description);
        record.setMaintenanceType(type);
        record.setStatus(status);
        record.setScheduledDate(scheduled);
        record.setCompletedDate(completed);
        record.setDevice(device);
        record.setUser(user);
        maintenanceRecordRepository.save(record);
    }

    private DeviceType type(String name) {
        return deviceTypeRepository.findAll().stream()
                .filter(item -> name.equals(item.getName()))
                .findFirst()
                .orElseThrow();
    }

    private Location loc(String name) {
        return locationRepository.findAll().stream()
                .filter(item -> name.equals(item.getName()))
                .findFirst()
                .orElseThrow();
    }

    private Vlan vlan(int number) {
        return vlanRepository.findAll().stream()
                .filter(item -> item.getVlanNumber() != null && item.getVlanNumber() == number)
                .findFirst()
                .orElseThrow();
    }

    private Device dev(String hostname) {
        return deviceRepository.findAll().stream()
                .filter(item -> hostname.equals(item.getHostname()))
                .findFirst()
                .orElseThrow();
    }

    private NetInterface iface(String hostname, String name) {
        return netInterfaceRepository.findAll().stream()
                .filter(item -> hostname.equals(item.getDevice().getHostname()) && name.equals(item.getName()))
                .findFirst()
                .orElseThrow();
    }

    private Subnet subnet(String network) {
        return subnetRepository.findAll().stream()
                .filter(item -> network.equals(item.getNetworkAddress()))
                .findFirst()
                .orElseThrow();
    }

    private AppUser user(String username) {
        return appUserRepository.findAll().stream()
                .filter(item -> username.equals(item.getUsername()))
                .findFirst()
                .orElseThrow();
    }
}
