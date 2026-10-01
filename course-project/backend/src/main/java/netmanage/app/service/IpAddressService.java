package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.IpAddress;
import netmanage.app.entity.NetInterface;
import netmanage.app.entity.Subnet;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.IpAddressRepository;
import netmanage.app.repository.NetInterfaceRepository;
import netmanage.app.repository.SubnetRepository;

@Service
@Transactional
public class IpAddressService {

    private final IpAddressRepository ipAddressRepository;
    private final SubnetRepository subnetRepository;
    private final NetInterfaceRepository netInterfaceRepository;

    public IpAddressService(IpAddressRepository ipAddressRepository,
                            SubnetRepository subnetRepository,
                            NetInterfaceRepository netInterfaceRepository) {
        this.ipAddressRepository = ipAddressRepository;
        this.subnetRepository = subnetRepository;
        this.netInterfaceRepository = netInterfaceRepository;
    }

    @Transactional(readOnly = true)
    public List<IpAddress> findAll() {
        return ipAddressRepository.findAll();
    }

    @Transactional(readOnly = true)
    public IpAddress findById(Long id) {
        return ipAddressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("IpAddress", id));
    }

    public IpAddress create(IpAddress ipAddress) {
        ipAddress.setId(null);
        applyRelations(ipAddress, ipAddress);
        return ipAddressRepository.save(ipAddress);
    }

    public IpAddress update(Long id, IpAddress incoming) {
        IpAddress existing = findById(id);
        existing.setAddress(incoming.getAddress());
        existing.setStatus(incoming.getStatus());
        applyRelations(existing, incoming);
        return ipAddressRepository.save(existing);
    }

    public void delete(Long id) {
        IpAddress existing = findById(id);
        ipAddressRepository.delete(existing);
    }

    private void applyRelations(IpAddress target, IpAddress source) {
        if (source.getSubnet() == null || source.getSubnet().getId() == null) {
            throw new IllegalArgumentException("Subnet is required");
        }
        Long subnetId = source.getSubnet().getId();
        Subnet subnet = subnetRepository.findById(subnetId)
                .orElseThrow(() -> new ResourceNotFoundException("Subnet", subnetId));
        target.setSubnet(subnet);

        if (source.getNetInterface() == null || source.getNetInterface().getId() == null) {
            target.setNetInterface(null);
        } else {
            Long interfaceId = source.getNetInterface().getId();
            NetInterface netInterface = netInterfaceRepository.findById(interfaceId)
                    .orElseThrow(() -> new ResourceNotFoundException("Interface", interfaceId));
            target.setNetInterface(netInterface);
        }
    }
}
