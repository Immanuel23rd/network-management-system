package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.AppUser;
import netmanage.app.entity.Device;
import netmanage.app.entity.MaintenanceRecord;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.AppUserRepository;
import netmanage.app.repository.DeviceRepository;
import netmanage.app.repository.MaintenanceRecordRepository;

@Service
@Transactional
public class MaintenanceRecordService {

    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final DeviceRepository deviceRepository;
    private final AppUserRepository appUserRepository;

    public MaintenanceRecordService(MaintenanceRecordRepository maintenanceRecordRepository,
                                    DeviceRepository deviceRepository,
                                    AppUserRepository appUserRepository) {
        this.maintenanceRecordRepository = maintenanceRecordRepository;
        this.deviceRepository = deviceRepository;
        this.appUserRepository = appUserRepository;
    }

    @Transactional(readOnly = true)
    public List<MaintenanceRecord> findAll() {
        return maintenanceRecordRepository.findAll();
    }

    @Transactional(readOnly = true)
    public MaintenanceRecord findById(Long id) {
        return maintenanceRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MaintenanceRecord", id));
    }

    public MaintenanceRecord create(MaintenanceRecord record) {
        record.setId(null);
        applyRelations(record, record);
        return maintenanceRecordRepository.save(record);
    }

    public MaintenanceRecord update(Long id, MaintenanceRecord incoming) {
        MaintenanceRecord existing = findById(id);
        existing.setTitle(incoming.getTitle());
        existing.setDescription(incoming.getDescription());
        existing.setMaintenanceType(incoming.getMaintenanceType());
        existing.setStatus(incoming.getStatus());
        existing.setScheduledDate(incoming.getScheduledDate());
        existing.setCompletedDate(incoming.getCompletedDate());
        applyRelations(existing, incoming);
        return maintenanceRecordRepository.save(existing);
    }

    public void delete(Long id) {
        MaintenanceRecord existing = findById(id);
        maintenanceRecordRepository.delete(existing);
    }

    private void applyRelations(MaintenanceRecord target, MaintenanceRecord source) {
        if (source.getDevice() == null || source.getDevice().getId() == null) {
            throw new IllegalArgumentException("Device is required");
        }
        Long deviceId = source.getDevice().getId();
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device", deviceId));
        target.setDevice(device);

        if (source.getUser() == null || source.getUser().getId() == null) {
            throw new IllegalArgumentException("Assigned user is required");
        }
        Long userId = source.getUser().getId();
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        target.setUser(user);
    }
}
