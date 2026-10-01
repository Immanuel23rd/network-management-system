package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.Device;
import netmanage.app.entity.NetInterface;
import netmanage.app.entity.Vlan;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.DeviceRepository;
import netmanage.app.repository.NetInterfaceRepository;
import netmanage.app.repository.VlanRepository;

@Service
@Transactional
public class NetInterfaceService {

    private final NetInterfaceRepository netInterfaceRepository;
    private final DeviceRepository deviceRepository;
    private final VlanRepository vlanRepository;

    public NetInterfaceService(NetInterfaceRepository netInterfaceRepository,
                               DeviceRepository deviceRepository,
                               VlanRepository vlanRepository) {
        this.netInterfaceRepository = netInterfaceRepository;
        this.deviceRepository = deviceRepository;
        this.vlanRepository = vlanRepository;
    }

    @Transactional(readOnly = true)
    public List<NetInterface> findAll() {
        return netInterfaceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public NetInterface findById(Long id) {
        return netInterfaceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interface", id));
    }

    public NetInterface create(NetInterface netInterface) {
        netInterface.setId(null);
        applyRelations(netInterface, netInterface);
        blankToNull(netInterface);
        return netInterfaceRepository.save(netInterface);
    }

    public NetInterface update(Long id, NetInterface incoming) {
        NetInterface existing = findById(id);
        existing.setName(incoming.getName());
        existing.setType(incoming.getType());
        existing.setMacAddress(incoming.getMacAddress());
        existing.setStatus(incoming.getStatus());
        applyRelations(existing, incoming);
        blankToNull(existing);
        return netInterfaceRepository.save(existing);
    }

    public void delete(Long id) {
        NetInterface existing = findById(id);
        netInterfaceRepository.delete(existing);
    }

    private void applyRelations(NetInterface target, NetInterface source) {
        if (source.getDevice() == null || source.getDevice().getId() == null) {
            throw new IllegalArgumentException("Device is required");
        }
        Long deviceId = source.getDevice().getId();
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Device", deviceId));
        target.setDevice(device);

        if (source.getVlan() == null || source.getVlan().getId() == null) {
            target.setVlan(null);
        } else {
            Long vlanId = source.getVlan().getId();
            Vlan vlan = vlanRepository.findById(vlanId)
                    .orElseThrow(() -> new ResourceNotFoundException("VLAN", vlanId));
            target.setVlan(vlan);
        }
    }

    private void blankToNull(NetInterface netInterface) {
        if (netInterface.getMacAddress() != null && netInterface.getMacAddress().isBlank()) {
            netInterface.setMacAddress(null);
        }
    }
}
