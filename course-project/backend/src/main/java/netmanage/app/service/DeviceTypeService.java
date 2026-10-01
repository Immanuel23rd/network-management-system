package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.DeviceType;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.DeviceTypeRepository;

@Service
@Transactional
public class DeviceTypeService {

    private final DeviceTypeRepository deviceTypeRepository;

    public DeviceTypeService(DeviceTypeRepository deviceTypeRepository) {
        this.deviceTypeRepository = deviceTypeRepository;
    }

    @Transactional(readOnly = true)
    public List<DeviceType> findAll() {
        return deviceTypeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public DeviceType findById(Long id) {
        return deviceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DeviceType", id));
    }

    public DeviceType create(DeviceType deviceType) {
        deviceType.setId(null);
        return deviceTypeRepository.save(deviceType);
    }

    public DeviceType update(Long id, DeviceType incoming) {
        DeviceType existing = findById(id);
        existing.setName(incoming.getName());
        existing.setDescription(incoming.getDescription());
        return deviceTypeRepository.save(existing);
    }

    public void delete(Long id) {
        DeviceType existing = findById(id);
        deviceTypeRepository.delete(existing);
    }
}
