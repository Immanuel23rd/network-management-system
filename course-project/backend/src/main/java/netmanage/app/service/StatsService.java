package netmanage.app.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.repository.AppUserRepository;
import netmanage.app.repository.DeviceRepository;
import netmanage.app.repository.DeviceTypeRepository;
import netmanage.app.repository.IpAddressRepository;
import netmanage.app.repository.LocationRepository;
import netmanage.app.repository.MaintenanceRecordRepository;
import netmanage.app.repository.NetInterfaceRepository;
import netmanage.app.repository.SubnetRepository;
import netmanage.app.repository.VlanRepository;

@Service
@Transactional(readOnly = true)
public class StatsService {

    private final AppUserRepository appUserRepository;
    private final DeviceTypeRepository deviceTypeRepository;
    private final LocationRepository locationRepository;
    private final DeviceRepository deviceRepository;
    private final NetInterfaceRepository netInterfaceRepository;
    private final VlanRepository vlanRepository;
    private final SubnetRepository subnetRepository;
    private final IpAddressRepository ipAddressRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public StatsService(AppUserRepository appUserRepository,
                        DeviceTypeRepository deviceTypeRepository,
                        LocationRepository locationRepository,
                        DeviceRepository deviceRepository,
                        NetInterfaceRepository netInterfaceRepository,
                        VlanRepository vlanRepository,
                        SubnetRepository subnetRepository,
                        IpAddressRepository ipAddressRepository,
                        MaintenanceRecordRepository maintenanceRecordRepository) {
        this.appUserRepository = appUserRepository;
        this.deviceTypeRepository = deviceTypeRepository;
        this.locationRepository = locationRepository;
        this.deviceRepository = deviceRepository;
        this.netInterfaceRepository = netInterfaceRepository;
        this.vlanRepository = vlanRepository;
        this.subnetRepository = subnetRepository;
        this.ipAddressRepository = ipAddressRepository;
        this.maintenanceRecordRepository = maintenanceRecordRepository;
    }

    public Map<String, Long> dashboardCounts() {
        Map<String, Long> counts = new LinkedHashMap<>();
        counts.put("users", appUserRepository.count());
        counts.put("deviceTypes", deviceTypeRepository.count());
        counts.put("locations", locationRepository.count());
        counts.put("devices", deviceRepository.count());
        counts.put("interfaces", netInterfaceRepository.count());
        counts.put("vlans", vlanRepository.count());
        counts.put("subnets", subnetRepository.count());
        counts.put("ipAddresses", ipAddressRepository.count());
        counts.put("maintenanceRecords", maintenanceRecordRepository.count());
        return counts;
    }
}
