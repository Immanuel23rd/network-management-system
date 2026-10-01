package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.Device;
import netmanage.app.entity.DeviceType;
import netmanage.app.entity.Location;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.DeviceRepository;
import netmanage.app.repository.DeviceTypeRepository;
import netmanage.app.repository.LocationRepository;

@Service
@Transactional
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final DeviceTypeRepository deviceTypeRepository;
    private final LocationRepository locationRepository;

    public DeviceService(DeviceRepository deviceRepository,
                         DeviceTypeRepository deviceTypeRepository,
                         LocationRepository locationRepository) {
        this.deviceRepository = deviceRepository;
        this.deviceTypeRepository = deviceTypeRepository;
        this.locationRepository = locationRepository;
    }

    @Transactional(readOnly = true)
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Device findById(Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Device", id));
    }

    public Device create(Device device) {
        device.setId(null);
        device.setDeviceType(requireDeviceType(device));
        device.setLocation(requireLocation(device));
        return deviceRepository.save(device);
    }

    public Device update(Long id, Device incoming) {
        Device existing = findById(id);
        existing.setHostname(incoming.getHostname());
        existing.setManufacturer(incoming.getManufacturer());
        existing.setModel(incoming.getModel());
        existing.setSerialNumber(incoming.getSerialNumber());
        existing.setStatus(incoming.getStatus());
        existing.setPurchaseDate(incoming.getPurchaseDate());
        existing.setNotes(incoming.getNotes());
        existing.setDeviceType(requireDeviceType(incoming));
        existing.setLocation(requireLocation(incoming));
        return deviceRepository.save(existing);
    }

    public void delete(Long id) {
        Device existing = findById(id);
        deviceRepository.delete(existing);
    }

    private DeviceType requireDeviceType(Device device) {
        if (device.getDeviceType() == null || device.getDeviceType().getId() == null) {
            throw new IllegalArgumentException("Device type is required");
        }
        Long typeId = device.getDeviceType().getId();
        return deviceTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("DeviceType", typeId));
    }

    private Location requireLocation(Device device) {
        if (device.getLocation() == null || device.getLocation().getId() == null) {
            throw new IllegalArgumentException("Location is required");
        }
        Long locationId = device.getLocation().getId();
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new ResourceNotFoundException("Location", locationId));
    }
}
